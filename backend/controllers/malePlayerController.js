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
  const { page, limit } = req.query;

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

exports.updateMalePlayer = async (req, res) => {
  const { id } = req.params;
  try {
    const player = await malePlayer.findByPk(id);
    if (!player) return res.status(404).json({ message: 'Player not found.' });

    await player.update(req.body);
    res.json({ message: 'Player updated successfully!', player });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHighlightsPlayers = async (req, res) => {
  try {
    const players = await malePlayer.findAll({
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
    if (!gender || gender === 'male') models.push(malePlayer);

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

      // const { count, rows } = await Model.findAndCountAll({
      const players = await Model.findAll({
        where,
        limit: parseInt(limit),
        offset,
        order: [['long_name', 'ASC']]
      });

      // allPlayers = [...allPlayers, ...rows];
    }

    //allPlayers.sort((a, b) => a.long_name.localCompare(b.long_name));

    // res.json({
    //   total: allPlayers.length,
    //   page: parseInt(page),
    //   limit: parseInt(limit),
    //   totalPages: Math.ceil(allPlayers.length / limit),
    //   data: allPlayers
    // });

    res.json(players);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const ALLOWED_FIELDS = [
  'fifa_version','fifa_update','player_face_url','long_name','player_positions',
  'club_name','nationality_name','overall','potential','value_eur','wage_eur','age',
  'height_cm','weight_kg','preferred_foot','weak_foot','skill_moves','international_reputation',
  'work_rate','body_type','pace','shooting','passing','dribbling','defending','physic',
  'attacking_crossing','attacking_finishing','attacking_heading_accuracy','attacking_short_passing',
  'attacking_volleys','skill_dribbling','skill_curve','skill_fk_accuracy','skill_long_passing','skill_ball_control',
  'movement_acceleration','movement_sprint_speed','movement_agility','movement_reactions','movement_balance',
  'power_shot_power','power_jumping','power_stamina','power_strength','power_long_shots',
  'mentality_aggression','mentality_interceptions','mentality_positioning','mentality_vision','mentality_penalties','mentality_composure',
  'defending_marking','defending_standing_tackle','defending_sliding_tackle',
  'goalkeeping_diving','goalkeeping_handling','goalkeeping_kicking','goalkeeping_positioning','goalkeeping_reflexes','goalkeeping_speed',
  'player_traits'
];

function pickAllowed(body) {
  const out = {};
  ALLOWED_FIELDS.forEach(f => {
    if (Object.prototype.hasOwnProperty.call(body, f) && body[f] !== undefined) {
      out[f] = body[f];
    }
  });
  return out;
}

exports.createPlayer = async (req, res) => {
  try {
    const { genero } = req.body;
    if (!genero || !['male','female'].includes(genero)) {
      return res.status(400).json({ message: "Campo 'genero' requerido: 'hombre' or 'mujer'." });
    }

    const payload = pickAllowed(req.body);

    // Sanitize algunos campos numéricos opcionales
    const intFields = ['overall','potential','value_eur','wage_eur','age','height_cm','weight_kg',
      'weak_foot','skill_moves','pace','shooting','passing','dribbling','defending','physic'];
    intFields.forEach(k => {
      if (payload[k] !== undefined && payload[k] !== null && payload[k] !== '') {
        const parsed = parseInt(payload[k], 10);
        payload[k] = Number.isNaN(parsed) ? null : parsed;
      }
    });

    let nuevo;
    if (genero === 'male') {
      nuevo = await malePlayer.create(payload);
    }// else {
    //   nuevo = await JugadoraMujer.create(payload);
    // }

    return res.status(201).json({ message: 'Jugador creado', jugador: nuevo });
  } catch (error) {
    console.error('createJugador error:', error);
    return res.status(500).json({ message: error.message });
  }
};