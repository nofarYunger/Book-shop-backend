const { Sequelize } = require("sequelize/dist");

const database = process.env.MYSQL_DATABASE;
const password = process.env.MYSQL_PASSWORD;


var sequelize = new Sequelize(database, username, [password]);

