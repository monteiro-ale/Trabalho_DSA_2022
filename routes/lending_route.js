const express = require('express');
const route = express.Router();


const lendingController = require('../controller/lending_controller');

route.post('/', lendingController.lendOut);

module.exports = route;