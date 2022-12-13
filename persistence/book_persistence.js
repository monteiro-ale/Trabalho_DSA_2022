const {Client} = require('pg');
const {conexao} = require('./conexao');


function registerBook(livro, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO livros (isbnlivro, titulolivro, idautor, editoralivro, anolivro, qtdelivrodisponivel) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *";
    const values = [livro.isbnlivro, livro.titulolivro, livro.idautor, livro.editoralivro, livro.anolivro, livro.qtdelivrodisponivel];

    cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })
}

function listBook(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT livros.idlivro, livros.isbnlivro, livros.titulolivro, autor.nomeautor as autor,livros.editoralivro, livros.anolivro, qtdelivrodisponivel FROM livros, autor WHERE livros.idautor = autor.idautor ORDER BY idlivro;";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let livros = res.rows;
                callback(undefined, livros);     
            }
            cliente.end();
        }
    )    
}

function searchById(id, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT livros.idlivro, livros.isbnlivro, livros.titulolivro, autor.nomeautor as autor,livros.editoralivro, livros.anolivro, qtdelivrodisponivel FROM livros, autor WHERE livros.idautor = autor.idautor AND livros.idlivro = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let livro = res.rows[0];
                callback(undefined, livro);
            }
            else {
                const error = "Livro nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}

function bookDisponibility(id, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "SELECT qtdelivrodisponivel FROM livros WHERE idlivro = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            let qtdeDisponivel = []; 
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                qtdeDisponivel = res.rows;
                callback(err, qtdeDisponivel);
            }
            else {
                const error = "Livro nao encontrado";
                callback(error, undefined);
            }
            cliente.end();
        }
    )    
}

function updateBook(idlivro,livro, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "UPDATE livros SET isbnlivro=$1, titulolivro=$2, idautor=$3, editoralivro=$4, anolivro=$5, qtdelivrodisponivel=$6 WHERE idlivro=$7 RETURNING *"
    const values = [livro.isbnlivro, livro.titulolivro, livro.idautor, livro.editoralivro, livro.anolivro, livro.qtdelivrodisponivel, idlivro];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let livro = res.rows[0];
            callback(undefined, livro);
        }
        else {
            const error = "Produto nao encontrado";
            callback(error, undefined);
        }

        cliente.end();        
    })
}

function deleteBook(id, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "DELETE FROM livros WHERE idlivro=$1 RETURNING *"
    const values = [id];

    cliente.query(sql, values, function(err, res) {
        if(err) {
            callback(err.message, undefined);                
        }
        else if (res.rows && res.rows.length > 0) {
            let livro = res.rows[0];
            callback(undefined, livro);
        }
        else {
            const error = "Livro não encontrado";
            callback(error, undefined);
        }
        cliente.end();        
    })

}


module.exports = {
    registerBook, bookDisponibility, listBook, searchById, updateBook, deleteBook
};