const {Client} = require('pg');

const {conexao} = require('./conexao');

let qtde = Number;


function lendBook(lending, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO emprestimos (idlivro, idaluno, dataemprestimo, idusuario) VALUES ($1, $2, $3, $4) RETURNING *"
    const values = [lending.idlivro, lending.idaluno, lending.dataemprestimo, lending.idusuario];

    bookDisponibility(lending.idlivro, function(err, res){
        if (err) {
            console.log("Erro ao consultar")
        }
        else{
            qtde = res.qtdelivrodisponivel;
            if(qtde == 0) {
                console.log("Não tem quantidade disponível para empréstimo");
                cliente.end();
            } else {
                qtde -= 1;
                cliente.query(sql, values, 
                    function(err, res){
                    console.log("Livro emprestado!")
                    const sqlReduzQtdeLivro = "UPDATE livros SET qtdelivrodisponivel = $1 WHERE idlivro = $2 RETURNING *";
                    let qtdesql = [qtde, lending.idlivro];
                    cliente.query(sqlReduzQtdeLivro, qtdesql, function(err, res){
                    console.log("Livros atualizados com sucesso.");
                    cliente.end();
                    const mensagem = "O livro " + lending.idLivro + " foi emprestado para o usuário " + lending.idAluno;
                    callback(err, res.rows[0]); 
                });
                });
            }
        }
    });
}


function bookDisponibility(id, callbackPesquisa){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "SELECT qtdelivrodisponivel FROM livros WHERE idlivro = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            let qtde = 0
            let qtdeDisponivel = []; 
            if(err) {
                callbackPesquisa(err, qtdeDisponivel);                
            }
            else if (res.rows && res.rows.length > 0) {
                callbackPesquisa(err,res.rows[0])
                qtdeDisponivel = res.rows;
                qtde = qtdeDisponivel[0].qtdelivrodisponivel

            }
            else {
                console.log("Produto nao encontrado");
            }
            cliente.end();
            return qtde
        }
    )    
}

module.exports = {lendBook}

