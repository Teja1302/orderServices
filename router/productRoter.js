const express = require('express');
const{ addMultipleProducts ,searchProducts} = require('../controller/productController');

const Productrouter = express.Router();

Productrouter.post('/add-multiple', addMultipleProducts);


Productrouter.get('/search',searchProducts);

module.exports = Productrouter;