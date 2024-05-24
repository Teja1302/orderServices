const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbconfig');
const Cart = require('./cartModel');
const Product = require('./productModel');

const CartProduct = sequelize.define('CartProduct', {
  cartId: {
    type: Sequelize.INTEGER,
    references: {
      model: Cart,
      key: 'id',
    },
    allowNull: false,
  },
  productId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
    },
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    min: 1,
  },
});

Cart.belongsToMany(Product, { through: CartProduct, foreignKey: 'cartId' });
Product.belongsToMany(Cart, { through: CartProduct, foreignKey: 'productId' });

module.exports = CartProduct;