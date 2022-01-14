

module.exports = (sequelize, DataTypes) => {
  const CartItem = sequelize.define("CartItem", {
    quantity: {
      allowNull: false,
      defaultValue: 1,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
    },
  });
  CartItem.associate = function ({ Order, Book }) {
    console.log("cart item association ");
    CartItem.belongsTo(Order);
    CartItem.belongsTo(Book);
  };

  CartItem.prototype.getOrderItems = async function (orderId) {
    const cartItems = await sequelize.models.CartItem.findAll({
      where: { orderId },
    });
    return cartItems;
  };

  CartItem.prototype.deleteOrder = async function (orderId) {
    // destroy all the cart items that matches the passed orderId
    sequelize.models.CartItem.destroy({ where: { orderId } });
  };
  return CartItem
};
