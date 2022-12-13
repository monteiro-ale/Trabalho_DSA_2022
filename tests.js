const cadastroautor = require('./persistence/author_persistence.js');

const cadastroLivro = require('./service/book_service.js');

const cadastroAluno = require('./persistence/student_persistence.js');

const cadastroUsuario = require('./persistence/user_persistence.js');

const emprestimoDeLivro = require('./service/lending_service.js');


//Insert Author

cadastroautor.registerAuthor({nomeautor: "Sergio Pinto Marins", nacionalidade:'Brasileiro'}, function(err, autorInserido) {
        console.log("")
            if(err) {
            console.log("Sistema esta com problemas");
            console.log(err);
        }
        else {
            console.log("Autor cadastrado com sucesso.");
            console.log(autorInserido);
        }
    }
);



//Insert Student

cadastroAluno.registerStudent({matriculaaluno: 123, nomealuno: "Aureliano Buendia", telefonealuno: '51999887766'}, function(err, alunoinserido){
    if (err) {
        console.log("Erro ao inserir o aluno.")
    }
    else{
        console.log(alunoinserido)
    }
})



//Insert User

cadastroUsuario.resgisterUser({nomeusuario: "Wagner", senhausuario: 12345}, function(err,res){
    if (err) {
        console.log("Cadastro de usuários com problemas");
    }
    else{
        console.log(res)
    }
})


//Insert Book

cadastroLivro.insertBook({isbnlivro: '9788522453757',titulolivro: 'Direito do trabalho', idautor: 9, editoralivro: 'Atlas', anolivro: '2009-01-01', qtdelivrodisponivel: 1}, function(err, livroInserido){
    console.log("Inserindo livro...")
    if(err){
        console.log("Erro ao cadastrar livro");
        console.log(err)
    }
    else {
        console.log(livroInserido)
    }
})



//List all

cadastroLivro.listBook(
    function(err, livro) {
        console.log("Listar: ");
        if(err) {
            console.log("Sistema esta com problemas");
            console.log(err);
        }
        else {
            console.log(livro);

        }
    }
);



//Search By id

cadastroLivro.searchById(9, 
    function(erro, livros) {
        console.log("BuscarPorId(2): ");
        if(erro) {
            console.log("Sistema está com problemas");
            console.log(erro);
        }
        else {
            console.log(livros);
        }
});



//Disponibility

cadastroLivro.bookDisponibility(9, function (err, res){
    console.log("consultando quantidade de livro disponível do id 3");
    if(err){
        console.log("Erro ao consultar livro");
        console.log(err);
    } 
    else {
        console.log(res)
    }
})



//Update Book

cadastroLivro.updateBook(8, {isbnlivro: '9788566250121', titulolivro: 'Agile Desenvolvimento de software com entregas frequentes e foco no valor de negócio edição atualizada', idautor: 4, editoralivro: 'Casa do Código', anolivro: '2013-01-01', qtdelivrodisponivel: 1}, 
    function(erro, produto) {
        console.log("Atualizar Produto(1): ");
        if(erro) {
            console.log("Erro ao atualizar livro");
            console.log(err);
        }
        else {
            console.log(produto);
        }
});



//Delete By Id

cadastroLivro.deleteBook(7, function(erro, livro) {
    console.log("Livro deletado (7): ");
    if(erro) {
        console.log("Sistema está com problemas");
        console.log(erro);
    }
    else {
        console.log(livro);
    }
});


//Lend Out

emprestimoDeLivro.lendOut({idlivro: 5, idaluno: 1, dataemprestimo:'2022-06-13', idusuario: 1}, function(err, res){
    if (err) {
        console.log("Erro no emprestimo");
        console.log(err);
    }
    else{
        console.log(res)
    }
})
