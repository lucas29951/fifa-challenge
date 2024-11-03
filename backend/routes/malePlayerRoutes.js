const express = require('express');
const router = express.Router();
const malePlayerController = require('../controllers/malePlayerController');

router.get('/', malePlayerController.getMalePlayers);
router.post('/', malePlayerController.createMalePlayer);

module.exports = router;
