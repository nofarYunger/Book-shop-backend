const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  const Category=sequelize.define("Category", {

    keyword: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
  });
};


