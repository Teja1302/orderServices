const express = require('express');
const { addToCart, getCart, deleteFromCart, updateCartProductQuantity } = require('../controller/cartController');

const Orderrouter = express.Router();

Orderrouter.post('/add',addToCart);
Orderrouter.get('/:userId', getCart);
Orderrouter.delete('/delete', deleteFromCart);
Orderrouter.put('/update', updateCartProductQuantity);

module.exports = Orderrouter;