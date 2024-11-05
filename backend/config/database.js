const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');
dotenv.config();

const sequelizeFemale = new Sequelize(process.env.DB_FEMALE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST_F,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
    retry: {
        max: 10,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

const sequelizeMale = new Sequelize(process.env.DB_MALE_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST_M,
    dialect: 'mysql',
    port: process.env.DB_PORT,
    logging: false,
    retry: {
        max: 10,
    },
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

module.exports = { sequelizeFemale, sequelizeMale };