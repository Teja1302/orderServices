const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbconfig');

const Product = sequelize.define('Product', {
  productName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  quantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.FLOAT,
    allowNull: false,
  },
});
 
module.exports = Product;