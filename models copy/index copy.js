const { Sequelize } = require("sequelize");
const { applyAssociations } = require("./associations");

require("dotenv").config();

const database = process.env.MYSQL_DATABASE;
const password = process.env.MYSQL_PASSWORD;

var sequelize = new Sequelize(database, "root", password, { dialect: "mysql" });

const modelDefiners = [
  require("./User"),
  require("../models/Book"),
  require("../models/Order"),
  require("../models/CartItem"),
  require("../models/Category"),
  require("./bookToCategory.model"),
  require("../models/AuthToken"),
];

// We define all models according to their files.
for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

// We execute any extra setup after the models are defined, such as adding associations.
applyAssociations(sequelize);

//We create the models in the database
// sequelize.sync();

// ( If we want to overwrite the old tables
sequelize.sync({ force: true });

// We export the sequelize connection instance to be used around our app.
module.exports = sequelize;
