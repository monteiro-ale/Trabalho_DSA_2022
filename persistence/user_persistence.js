const {Client} = require('pg');
const {conexao} = require('./conexao');


function resgisterUser(usuarios, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "INSERT INTO usuarios (nomeusuario, senhausuario) VALUES ($1, $2) returning *";
    const values = [usuarios.nomeusuario, usuarios.senhausuario];

    cliente.query(sql, values, function(err, res){
        callback(err,res.rows[0]);
        cliente.end();
    })
}


function listUser(callback) {
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM usuarios ORDER BY idusuario;";
    cliente.query(sql, 
        function (err, res) {
            if(err) {
                callback(err.message, undefined);
            }
            else {
                let usuarios = res.rows;
                callback(undefined, usuarios);     
            }
            cliente.end();
        }
    )    
}


function searchById(id, callback){
    const cliente = new Client(conexao);
    cliente.connect();
    
    const sql = "SELECT * FROM usuarios WHERE idusuario = $1";
    const values = [id];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0) {
                let usuario = res.rows[0];
                callback(undefined, usuario);
            }
            else {
                const error = "Usuario nao encontrado";
                callback(error, undefined);
            }

            cliente.end();
        }
    )    
}


function validateUser(usuario, callback){
    const cliente = new Client(conexao);
    cliente.connect();

    const sql = "SELECT * FROM USUARIOS WHERE nomeusuario = $1";
    const values = [usuario.nomeusuario];

    cliente.query(sql, values,
        function (err, res) {
            if(err) {
                callback(err.message, undefined);                
            }
            else if (res.rows && res.rows.length > 0 && res.rows[0].nomeusuario == usuario.nomeusuario && res.rows[0].senhausuario == usuario.senhausuario) {
                callback(err, res.rows[0]);
            }
            else if (res.rows && res.rows.length > 0 && res.rows[0].nomeusuario == usuario.nomeusuario && res.rows[0].senhausuario != usuario.senhausuario) {
                const error = "Senha Incorreta!";
                console.log(error);
                callback(error, undefined);
            }
            else {
                const error = "Usuario nao encontrado";
                callback(error, undefined);
            }
            cliente.end();

        }
    )
}


module.exports = {
    resgisterUser, listUser, searchById, validateUser
}