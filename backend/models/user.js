const { DataTypes } = require('sequelize');
const { sequelizeMale, sequelizeFemale } = require('../config/database');

const UsuarioM = sequelizeMale.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: 'usuario' }
}, {
    tableName: 'usuarios',
    timestamps: false
});

const UsuarioF = sequelizeFemale.define('Usuario', {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nombre: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    rol: { type: DataTypes.STRING, allowNull: false, defaultValue: 'usuario' }
}, {
    tableName: 'usuarios',
    timestamps: false
});

module.exports = { UsuarioM, UsuarioF };