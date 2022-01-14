const { DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");

module.exports = (sequelize) => {
  const User = sequelize.define("User", {
    fullName: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    hashedPassword: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notEmpty: true,
      },
    },
  });

  User.associate = function ({ AuthToken,Order }) {
    User.hasMany(AuthToken);
    User.hasMany(Order);

  };

  User.authenticate = async function (email, password) {
    const user = await User.findOne({ where: { email } });
    // bcrypt is a one-way hashing algorithm that allows us to
    // store strings on the database rather than the raw
    // passwords.
    if (bcrypt.compareSync(password, user.hashedPassword)) {
      return user.authorize();
    }

    throw new Error("invalid password");
  };

  User.prototype.authorize = async function () {
    const { authToken } = sequelize.models;
    const user = this;
    // create a new auth token associated to 'this' user
    // by calling the AuthToken class method we created earlier
    // and passing it the user id
    const token = await authToken.generate(this.id);
    // addAuthToken is a generated method provided by
    // sequelize which is made for any 'hasMany' relationships
    await user.addAuthToken(token);

    return { user, token };
  };

  User.prototype.logout = async function (token) {
    // destroy the auth token that matches the passed token
    sequelize.models.authToken.destroy({ where: { token } });
  };
  return User
};
