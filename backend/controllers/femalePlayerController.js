const femalePlayer = require('../models/femalePlayer');

exports.getFemalePlayers = async (req, res) => {
  try {
    const players = await femalePlayer.findAll();
    res.json(players);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createFemalePlayer = async (req, res) => {
  try {
    const player = await femalePlayer.create(req.body);
    res.status(201).json(player);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
