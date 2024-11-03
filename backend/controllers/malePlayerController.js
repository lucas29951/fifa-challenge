const malePlayer = require('../models/malePlayer');

exports.getMalePlayers = async (req, res) => {
  try {
    const players = await malePlayer.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createMalePlayer = async (req, res) => {
  try {
    const player = await malePlayer.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
