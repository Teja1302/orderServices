const { Sequelize } = require('sequelize');
const sequelize = require('../config/dbconfig');
const User = require('./userModel');

const Cart = sequelize.define('Cart', {
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
    allowNull: false,
  },
});

User.hasOne(Cart, { foreignKey: 'userId' });
Cart.belongsTo(User, { foreignKey: 'userId' });

module.exports = Cart;