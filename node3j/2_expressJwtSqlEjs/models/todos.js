const { DataTypes } = require("sequelize");
const sequelize = require("../config/database"); // Chemin relatif à votre fichier de configuration Sequelize

const Todo = sequelize.define("Todo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Todo.sync();

module.exports = Todo;