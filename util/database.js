const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('node-complete','root','Zclassic@80',{dialect: 'mysql',host: 'localhost'});

module.exports = sequelize;