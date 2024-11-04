const express = require('express');
const router = express.Router();
const femalePlayerController = require('../controllers/femalePlayerController');

router.post('/', femalePlayerController.createFemalePlayer);
router.get('/', femalePlayerController.getFemalePlayers);
router.get('/id/:id', femalePlayerController.getPlayerByID);
router.get('/name/:name', femalePlayerController.getPlayerByName);
router.get('/club/:club', femalePlayerController.getPlayersByClub);
router.get('/country/:country', femalePlayerController.getPlayersByCountry);
router.get('/pagination', femalePlayerController.getPlayersPaginated);
router.get('/last-version', femalePlayerController.getPlayersByLastVersion);

module.exports = router;
