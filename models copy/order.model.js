const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {});

  Order.associate = function ({ CartItem, User }) {
    Order.hasMany(CartItem);
    Order.belongsTo(User);
    console.log('order association are fine ');
    console.log('-----------------------------------------------------------------------------');
  };



};
