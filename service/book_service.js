const bookPersistence = require('../persistence/book_persistence.js');



function insertBook(livro, callback) {
    if(!livro || !livro.isbnlivro || !livro.titulolivro || !livro.idautor || !livro.editoralivro || !livro.anolivro || !livro.qtdelivrodisponivel){
        const erro = { 
            mensagem: "Todos os campos devem ser preenchidos corretamente!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else {
        bookPersistence.registerBook(livro, callback);
    }  
}

function listBook(callback) {
    bookPersistence.listBook(callback);
}

function searchById(id, callback){
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        console.log(id);
        callback(erro, undefined);
    }
    else { 
        bookPersistence.searchById(id, callback);
    }
}

function bookDisponibility(id, callback){
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else { 
        bookPersistence.bookDisponibility(id, callback);
    }
}

function updateBook(id, livro, callback) {
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else if(!livro || !livro.isbnlivro || !livro.titulolivro || !livro.idautor || !livro.editoralivro || !livro.anolivro || !livro.qtdelivrodisponivel) {
        const erro = { 
            mensagem: "Todos os campos devem ser preenchidos corretamente!",
            numero: 400
        };
        callback(erro, undefined)
    }
    else { 
        bookPersistence.updateBook(id, livro, callback);
    }
}

function deleteBook(id, callback) {
    if(!id || isNaN(id)){
        const erro = { 
            mensagem: "Identificador Invalido!",
            numero: 400
        }
        callback(erro, undefined);
    }
    else {
        bookPersistence.deleteBook(id,callback);
    }
}



module.exports = {
    insertBook, listBook, searchById, bookDisponibility, updateBook, deleteBook
}



