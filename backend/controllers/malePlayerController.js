const { Op, Sequelize } = require('sequelize');
const malePlayer = require('../models/malePlayer');

exports.createMalePlayer = async (req, res) => {
  try {
    const player = await malePlayer.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getMalePlayers = async (req, res) => {
  try {
    const players = await malePlayer.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayerByID = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await malePlayer.findByPk(id);
    if (!player) return res.status(404).json({ message: 'Player not found.' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayerByName = async (req, res) => {
  const { name } = req.params;
  try {
    const player = await malePlayer.findOne({ where: { long_name: name } });
    if (!player) return res.status(404).json({ message: 'Player not found.' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersByClub = async (req, res) => {
  const { club } = req.params;
  try {
    const players = await malePlayer.findAll({ where: { club_name: club } });
    if (players.length === 0) return res.status(404).json({ message: 'No players found for this club' });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersByCountry = async (req, res) => {
  const { country } = req.params;
  try {
    const players = await malePlayer.findAll({ where: { nationality_name: country } });
    if (players.length === 0) return res.status(404).json({ message: 'No players found for this country' });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersPaginated = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;

  try {
    const limitInt = parseInt(limit);
    const offset = (parseInt(page) - 1) * limitInt;

    const { rows: players } = await malePlayer.findAndCountAll({
      limit: limitInt,
      offset
    });

    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersByLastVersion = async (req, res) => {
  try {
    const players = await malePlayer.findAll({
      group: ['long_name'],
      order: [[Sequelize.fn('MAX', Sequelize.col('fifa_version')), 'DESC']],
      where: {
        fifa_version: {
          [Op.not]: null
        }
      }
    });

    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};