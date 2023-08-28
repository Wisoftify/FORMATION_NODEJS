const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  "database",
  "root",
  "password", //process.env.DB_PASSWORD,
  {
    host: "mysql.m2i.wisoftify.fr",
    port: "3301",
    dialect: "mysql"
  }
)

module.exports = sequelize;