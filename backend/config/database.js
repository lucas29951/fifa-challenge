const { Sequelize } = require('sequelize');

const sequelizeMale = new Sequelize(process.env.DB_MALE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

const sequelizeFemale = new Sequelize(process.env.DB_FEMALE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
});

module.exports = { sequelizeMale, sequelizeFemale };