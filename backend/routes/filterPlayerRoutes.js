const express = require('express');
const router = express.Router();
const filterPlayerController = require('../controllers/filterPlayerController');

router.get('/', filterPlayerController.filterPlayers);

module.exports = router;