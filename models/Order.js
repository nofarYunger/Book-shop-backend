
module.exports = (sequelize) => {
  const Order = sequelize.define("Order", {});

  Order.associate = function ({ CartItem, User }) {
    Order.hasMany(CartItem);
    Order.belongsTo(User);
  }
    

  return Order;
};
