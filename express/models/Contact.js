const { DataTypes } = require('sequelize');
const sequelize = require("../database");

const Contact = sequelize.define("Contact", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
  },
  surname: {
    type: DataTypes.STRING,
  }
})

Contact.sync();

module.exports = Contact;