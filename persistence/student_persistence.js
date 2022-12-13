const {Client} = require('pg');

const {conexao} = require('./conexao');

function registerStudent(aluno, callback){
    const cliente = new Client(conexao)
    cliente.connect();

    const sql = "INSERT INTO alunos (matriculaaluno, nomealuno, telefonealuno) VALUES ($1, $2, $3) RETURNING *";
    const values = [aluno.matriculaaluno, aluno.nomealuno, aluno.telefonealuno];

    cliente.query(sql,values,function(err, res){
        callback(err, res.rows[0]);
        cliente.end();
    })
}


module.exports = {
    registerStudent
}