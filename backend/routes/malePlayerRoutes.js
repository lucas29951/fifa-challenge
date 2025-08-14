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
router.put('/:id', malePlayerController.updateMalePlayer);
router.get('/highlights', malePlayerController.getHighlightsPlayers);
router.get('/filter', malePlayerController.getPlayersFiltered);
router.get('/search', malePlayerController.searchPlayers);
router.delete('/id/:id', malePlayerController.deletePlayer);

module.exports = router;
