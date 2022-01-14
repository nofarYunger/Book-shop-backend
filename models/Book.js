
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define("Book", {
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    description: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    subtitles: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    author: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    pageCount: {
      allowNull: false,
      type: DataTypes.INTEGER,
      validate: {
        isNumeric: true,
      },
      isOnSale: {
        allowNull: false,
        type: DataTypes.BOOLEAN,
      },
    },
    thumbnail: {
      allowNull: false,
      type: DataTypes.TEXT,
    },
    quantity: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  });

  Book.associate = function ({ CartItem }) {
    Book.hasMany(CartItem);
    console.log("cacacacacacacacacacaacacaca");
  };
  return Book;
};

// which models can live on its own? thats the one who doent need a forien key