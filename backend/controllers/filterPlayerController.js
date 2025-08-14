const malePlayer = require('../models/malePlayer');
const femalePlayer = require('../models/femalePlayer');
const { Op, Sequelize } = require('sequelize');

exports.filterPlayers = async (req, res) => {
    try {
        const { genre = 'all', position, nationality, club, limit = 20, offset = 0 } = req.query;

        const whereClause = {};
        if (position) whereClause.player_positions = { [Op.like]: `%${position}%` };
        if (nationality) whereClause.nationality_name = { [Op.like]: `%${nationality}%` };
        if (club) whereClause.club_name = { [Op.like]: `%${club}%` };

        let results = [];

        if (genre === 'male' || genre === 'all') {
            const playersMale = await malePlayer.findAll({ where: whereClause, limit: +limit, offset: +offset });
            results = results.concat(playersMale.map(p => ({ ...p.toJSON(), genre: 'male' })));
        }

        if (genre === 'female' || genre === 'all') {
            const playersFemale = await femalePlayer.findAll({ where: whereClause, limit: +limit, offset: +offset });
            results = results.concat(playersFemale.map(p => ({ ...p.toJSON(), genre: 'female' })));
        }

        results.sort((a, b) => a.long_name.localeCompare(b.long_name));

        res.json(results);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error to filtered players' });
    }
};