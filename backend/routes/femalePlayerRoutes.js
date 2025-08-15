const express = require('express');
const router = express.Router();
const femalePlayerController = require('../controllers/femalePlayerController');

/**
 * @swagger
 * tags:
 *   name: Female Players
 *   description: Gestión de jugadoras femeninas
 */

/**
 * @swagger
 * /api/players/female:
 *   get:
 *     summary: Obtener todas las jugadoras femeninas
 *     tags: [Female Players]
 *     responses:
 *       200:
 *         description: Lista de jugadoras
 */
router.get('/', femalePlayerController.getFemalePlayers);

/**
 * @swagger
 * /api/players/female:
 *   post:
 *     summary: Crear un nuevo jugador femenino
 *     tags: [FemalePlayers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               long_name: Carla Costas
 *               club_name: FC Barcelona
 *               nationality_name: España
 *               overall: 93
 *     responses:
 *       201:
 *         description: Jugador creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', femalePlayerController.createFemalePlayer);

/**
 * @swagger
 * /api/player/female/id/{id}:
 *   get:
 *     summary: Obtener un jugador femenino por ID
 *     tags: [Female Players]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID del jugador
 *     responses:
 *       200:
 *         description: Datos del jugador
 */
router.get('/id/:id', femalePlayerController.getPlayerByID);

/**
 * @swagger
 * /api/players/female/name/{name}:
 *   get:
 *     summary: Obtener jugador femenino por nombre
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: path
 *         name: name
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre o parte del nombre del jugador
 *     responses:
 *       200:
 *         description: Jugador encontrado
 *       404:
 *         description: Jugador no encontrado
 */
router.get('/name/:name', femalePlayerController.getPlayerByName);

/**
 * @swagger
 * /api/players/female/club/{club}:
 *   get:
 *     summary: Obtener jugadores femeninos por club
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: path
 *         name: club
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del club
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/club/:club', femalePlayerController.getPlayersByClub);

/**
 * @swagger
 * /api/players/female/country/{country}:
 *   get:
 *     summary: Obtener jugadores femeninos por país
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: path
 *         name: country
 *         required: true
 *         schema:
 *           type: string
 *         description: Nombre del país
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/country/:country', femalePlayerController.getPlayersByCountry);

/**
 * @swagger
 * /api/players/female/pagination:
 *   get:
 *     summary: Obtener jugadores femeninos paginados
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista paginada de jugadores
 */
router.get('/pagination', femalePlayerController.getPlayersPaginated);

/**
 * @swagger
 * /api/players/female/last-version:
 *   get:
 *     summary: Obtener jugadores femeninos de la última versión
 *     tags: [FemalePlayers]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/last-version', femalePlayerController.getPlayersByLastVersion);

/**
 * @swagger
 * /api/players/female/{id}:
 *   put:
 *     summary: Actualizar un jugador femenino
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Jugador actualizado
 *       404:
 *         description: Jugador no encontrado
 */
router.put('/:id', femalePlayerController.updateFemalePlayer);

/**
 * @swagger
 * /api/players/female/highlights:
 *   get:
 *     summary: Obtener jugadores femeninos destacados
 *     tags: [FemalePlayers]
 *     responses:
 *       200:
 *         description: Lista de jugadores destacados
 */
router.get('/highlights', femalePlayerController.getHighlightsPlayers);

/**
 * @swagger
 * /api/players/female/search:
 *   get:
 *     summary: Buscar jugadores femeninos
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: query
 *         name: q
 *         schema:
 *           type: string
 *         description: Texto de búsqueda (nombre, club, país)
 *     responses:
 *       200:
 *         description: Lista de jugadores encontrados
 */
router.get('/search', femalePlayerController.searchPlayers);

/**
 * @swagger
 * /api/players/female/id/{id}:
 *   delete:
 *     summary: Eliminar un jugador femenino por ID
 *     tags: [FemalePlayers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Jugador eliminado
 *       404:
 *         description: Jugador no encontrado
 */
router.delete('/id/:id', femalePlayerController.deletePlayer);

module.exports = router;
