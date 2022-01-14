
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define("Category", {
    keyword: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  });
    return Category
};


