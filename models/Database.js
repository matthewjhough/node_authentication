const Sequelize = require("sequelize");
const config = require("../config");

var sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    dialect: config.DATABASE_DIALECT,
    host: config.DATABASE_HOST,
    port: config.DATABASE_PORT,
    logging: msg => console.log(msg)
    // dialectOptions: {
    //   requestTimeout: 30000,
    //   instanceName: config.DATABASE_NAME
    // }
  }
);

module.exports = sequelize;
