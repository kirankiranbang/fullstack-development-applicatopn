
const { DataTypes } = require('sequelize');


const sequelize = require('../util/database'); // Assuming you have a separate file for configuring Sequelize

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phoneNumber: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'signups', // Name of your MySQL table
  timestamps: true, // If you want Sequelize to manage createdAt and updatedAt fields
});
console.log("table name is  in models-user");
module.exports = User;