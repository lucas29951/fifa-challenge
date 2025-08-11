const femalePlayer = require('../models/femalePlayer');

exports.createFemalePlayer = async (req, res) => {
  try {
    const player = await femalePlayer.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getFemalePlayers = async (req, res) => {
  try {
    const players = await femalePlayer.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayerByID = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await femalePlayer.findByPk(id);
    if (!player) return res.status(404).json({ message: 'Player not found.' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayerByName = async (req, res) => {
  const { name } = req.params;
  try {
    const player = await femalePlayer.findOne({ where: { long_name: name } });
    if (!player) return res.status(404).json({ message: 'Player not found.' });
    res.json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersByClub = async (req, res) => {
  const { club } = req.params;
  try {
    const players = await femalePlayer.findAll({ where: { club_name: club } });
    if (players.length === 0) return res.status(404).json({ message: 'No players found for this club' });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersByCountry = async (req, res) => {
  const { country } = req.params;
  try {
    const players = await femalePlayer.findAll({ where: { nationality_name: country } });
    if (players.length === 0) return res.status(404).json({ message: 'No players found for this country' });
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersPaginated = async (req, res) => {
  const { page, limit } = req.query;

  try {
    const limitInt = parseInt(limit);
    const offset = (parseInt(page) - 1) * limitInt;

    const { rows: players } = await femalePlayer.findAndCountAll({
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
    const players = await femalePlayer.findAll({
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

exports.updateFemalePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await femalePlayer.findByPk(id);
    if (!player) return res.status(404).json({ message: 'Player not found.' });

    await player.update(req.body);
    res.json({ message: 'Player updated successfully!', player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHighlightsPlayers = async (req, res) => {
  try {
    const players = await femalePlayer.findAll({
      order: [['overall', 'DESC']],
      limit: 10
    });

    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPlayersFiltered = async (req, res) => {
  try {
    const {
      gender,
      club,
      country,
      minOverall,
      maxOverall,
      position,
      page = 1,
      limit = 20
    } = req.query;

    const offset = (page - 1) * limit;

    let models = [];
    if (!gender || gender === 'female') models.push(femalePlayer);

    let allPlayers = [];

    for (const Model of models) {
      const where = {};

      if (club) where.club_name = { [Op.like]: `%${club}%`};
      if (country) where.nationality_name = { [Op.like]: `%${country}%` };
      if (minOverall || maxOverall) {
        where.overall = {};
        if (minOverall) where.overall[Op.gte] = parseInt(minOverall);
        if (maxOverall) where.overall[Op.gte] = parseInt(maxOverall);
      }
      if (position) where.player_positions = { [Op.like]: `%${position}%` };

      const { count, rows } = await Model.findAndCountAll({
        where,
        limit: parseInt(limit),
        offset,
        order: [['long_name', 'ASC']]
      });

      allPlayers = [...allPlayers, ...rows];
    }

    //allPlayers.sort((a, b) => a.long_name.localCompare(b.long_name));

    res.json({
      total: allPlayers.length,
      page: parseInt(page),
      limit: parseInt(limit),
      totalPages: Math.ceil(allPlayers.length / limit),
      data: allPlayers
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};