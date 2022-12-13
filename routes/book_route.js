const express = require('express');
const route = express.Router();
const bookController = require('../controller/book_controller.js');


route.post('/', bookController.insert);

route.get('/', bookController.listBook);

route.get('/:id', bookController.searchById);

route.put('/:id', bookController.updateBook);

route.delete('/:id', bookController.deleteBook);

module.exports = route;