const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Chemin relatif à votre fichier de configuration Sequelize

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

User.sync();

module.exports = User;