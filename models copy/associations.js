function applyAssociations(sequelize) {
  const { User, Order, Category, CartItem, Book,AuthToken } = sequelize.models;

  CartItem.belongsTo(Order);
  Order.hasMany(CartItem);
  Order.belongsTo(User);
  User.hasMany(AuthToken);
  AuthToken.belongsTo(User);


  // Book.belongsToMany(Category, { through: "BookCategory" });
}

module.exports = { applyAssociations };
