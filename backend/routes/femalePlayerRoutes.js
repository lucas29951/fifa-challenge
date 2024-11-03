const express = require('express');
const router = express.Router();
const femalePlayerController = require('../controllers/femalePlayerController');

router.get('/', femalePlayerController.getFemalePlayers);
router.post('/', femalePlayerController.createFemalePlayer);

module.exports = router;
