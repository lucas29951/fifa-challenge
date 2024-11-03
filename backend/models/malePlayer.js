const { DataTypes } = require('sequelize');
const { sequelizeMale } = require('../config/database');

const malePlayer = sequelizeMale.define('malePlayer', {
    long_name: { type: DataTypes.STRING, allowNull: false },
    player_positions: { type: DataTypes.STRING, allowNull: false },
    club_name: { type: DataTypes.STRING, allowNull: false },
    nationality_name: { type: DataTypes.STRING, allowNull: false },
    age: { type: DataTypes.INTEGER, allowNull: false },
    skill_moves: { type: DataTypes.JSON, allowNull: false }
});

module.exports = malePlayer;