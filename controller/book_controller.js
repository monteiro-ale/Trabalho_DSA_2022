const bookService = require('../service/book_service.js');


exports.insert = (req, res) => {
    const livro = req.body;
  
    bookService.insertBook(livro, 
      function(err, produtoInserido) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.status(201).json(produtoInserido);
        }
      });  
}

exports.listBook = (req, res) => {
    bookService.listBook(function (err, livros) {
      if(err) {
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(livros);
      }
    })
}

exports.searchById = (req, res) => {
    const id = req.params.id;

    bookService.searchById(id, function (err, livro){
      if(err) {
        console.log(err);
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(livro);
      }
    });
}

exports.updateBook = (req, res) => {
    const id = req.params.id;
    const livro = req.body;
    bookService.updateBook(id, livro, 
      function(err, livroAlterado) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.json(livroAlterado);
        }
      });
}

exports.deleteBook = (req, res) => {
    const id = req.params.id;
    bookService.deleteBook(id, function (err, livro){
        if(err) {
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.json(livro);
        }
      });
}