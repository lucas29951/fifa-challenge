const express = require('express');
const router = express.Router();
const malePlayerController = require('../controllers/malePlayerController');

router.post('/', malePlayerController.createMalePlayer);
router.get('/', malePlayerController.getMalePlayers);
router.get('/id/:id', malePlayerController.getPlayerByID);
router.get('/name/:name', malePlayerController.getPlayerByName);
router.get('/club/:club', malePlayerController.getPlayersByClub);
router.get('/country/:country', malePlayerController.getPlayersByCountry);
router.get('/pagination', malePlayerController.getPlayersPaginated);
router.get('/last-version', malePlayerController.getPlayersByLastVersion);

module.exports = router;
