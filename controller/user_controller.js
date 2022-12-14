const userService = require('../service/user_service.js');


exports.insert = (req, res) => {
    const user = req.body;
  
    userService.insert(user, 
      function(err, usuarioInserido) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.status(201).json(usuarioInserido);
        }
      });  
}

exports.validateUser = (req, res) => {
    const usuario = req.body;
  
    userService.validateUser(usuario, 
      function(err, usuarioVerificado) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.status(201).json(usuarioVerificado);
          console.log(usuarioVerificado);
        }
      });  
  }

exports.listUser = (req, res) => {
    userService.listUser(function (err, usuarios) {
      if(err) {
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(usuarios);
      }
    })
}

exports.validateUser = (req, res) => {
    const usuario = req.body;
  
    userService.validateUser(usuario, 
      function(err, usuarioVerificado) {
        if(err){
          res.status(err.numero).json({erro: err.mensagem});
        }
        else {
          res.status(201).json(usuarioVerificado);
          console.log(usuarioVerificado);
        }
      });  
  }
  
exports.searchById = (req, res) => {
    const id = req.params.id;

    userService.searchById(id, function (err, usuario){
      if(err) {
        res.status(err.numero).json({erro: err.mensagem});
      }
      else {
        res.json(usuario);
      }
    });
}