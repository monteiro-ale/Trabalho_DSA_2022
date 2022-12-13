const lendService = require('../service/lending_service.js');


exports.lendOut = (req, res) => {
    const livro = req.body;
  
    lendService.lendBook(livro, 
      function(err, produtoInserido) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.status(201).json(produtoInserido);
        }
      });  
}
