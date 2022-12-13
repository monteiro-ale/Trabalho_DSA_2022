const userPersistence = require('../persistence/user_persistence.js');


function insert(usuario, callback) {
    if(!usuario || !usuario.nomeusuario || !usuario.senhausuario){
        const erro = { 
            mensagem: "Todos os campos devem ser preenchidos corretamente!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        userPersistence.resgisterUser(usuario, callback);
    }  
}

function listUser(callback) {
    userPersistence.listUser(callback);
}


function searchById(id, callback){
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else { 
        userPersistence.searchById(id, callback);
    }
}

function validateUser(usuario, callback) {
    if(!usuario || !usuario.nomeusuario || !usuario.senhausuario){
        const erro = { 
            mensagem: "Todos os campos devem ser preenchidos corretamente!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        userPersistence.validateUser(usuario, callback); 
    }  
}


module.exports = {
    insert, listUser, searchById, validateUser
}
