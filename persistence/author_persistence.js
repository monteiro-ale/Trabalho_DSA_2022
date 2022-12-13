const {Client} = require('pg');

const {conexao} = require('./conexao');


function registerAuthor(autor, callback) {
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO autor (nomeautor, nacionalidadeautor) VALUES ($1, $2) RETURNING *";
    const values = [autor.nomeautor, autor.nacionalidade];

    cliente.query(sql, values, 
        function (err, res){
            callback(err, res.rows[0]);
            cliente.end();
        })
}


module.exports = {
    registerAuthor
};

