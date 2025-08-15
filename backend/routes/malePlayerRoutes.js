const express = require('express');
const router = express.Router();
const malePlayerController = require('../controllers/malePlayerController');

/**
 * @swagger
 * tags:
 *   name: Male Players
 *   description: Gestión de jugadores masculinos
 */

/**
 * @swagger
 * /api/players/male:
 *   get:
 *     summary: Obtener todos los jugadores masculinos
 *     tags: [Male Players]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Número de página
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Cantidad de resultados por página
 *     responses:
 *       200:
 *         description: Lista de jugadores masculinos
 */
router.get('/', malePlayerController.getMalePlayers);

/**
 * @swagger
 * /api/player/male/id/{id}:
 *   get:
 *     summary: Obtener un jugador masculino por ID
 *     tags: [Male Players]
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
router.get('/id/:id', malePlayerController.getPlayerByID);

/**
 * @swagger
 * /api/players/male:
 *   post:
 *     summary: Crear un nuevo jugador masculino
 *     tags: [MalePlayers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             example:
 *               long_name: Lionel Messi
 *               club_name: Inter Miami
 *               nationality_name: Argentina
 *               overall: 93
 *     responses:
 *       201:
 *         description: Jugador creado correctamente
 *       400:
 *         description: Error de validación
 */
router.post('/', malePlayerController.createMalePlayer);

/**
 * @swagger
 * /api/players/male/name/{name}:
 *   get:
 *     summary: Obtener jugador masculino por nombre
 *     tags: [MalePlayers]
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
router.get('/name/:name', malePlayerController.getPlayerByName);

/**
 * @swagger
 * /api/players/male/club/{club}:
 *   get:
 *     summary: Obtener jugadores masculinos por club
 *     tags: [MalePlayers]
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
router.get('/club/:club', malePlayerController.getPlayersByClub);

/**
 * @swagger
 * /api/players/male/country/{country}:
 *   get:
 *     summary: Obtener jugadores masculinos por país
 *     tags: [MalePlayers]
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
router.get('/country/:country', malePlayerController.getPlayersByCountry);

/**
 * @swagger
 * /api/players/male/pagination:
 *   get:
 *     summary: Obtener jugadores masculinos paginados
 *     tags: [MalePlayers]
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
router.get('/pagination', malePlayerController.getPlayersPaginated);

/**
 * @swagger
 * /api/players/male/last-version:
 *   get:
 *     summary: Obtener jugadores masculinos de la última versión
 *     tags: [MalePlayers]
 *     responses:
 *       200:
 *         description: Lista de jugadores
 */
router.get('/last-version', malePlayerController.getPlayersByLastVersion);

/**
 * @swagger
 * /api/players/male/{id}:
 *   put:
 *     summary: Actualizar un jugador masculino
 *     tags: [MalePlayers]
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
router.put('/:id', malePlayerController.updateMalePlayer);

/**
 * @swagger
 * /api/players/male/highlights:
 *   get:
 *     summary: Obtener jugadores masculinos destacados
 *     tags: [MalePlayers]
 *     responses:
 *       200:
 *         description: Lista de jugadores destacados
 */
router.get('/highlights', malePlayerController.getHighlightsPlayers);

/**
 * @swagger
 * /api/players/male/search:
 *   get:
 *     summary: Buscar jugadores masculinos
 *     tags: [MalePlayers]
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
router.get('/search', malePlayerController.searchPlayers);

/**
 * @swagger
 * /api/players/male/id/{id}:
 *   delete:
 *     summary: Eliminar un jugador masculino por ID
 *     tags: [MalePlayers]
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
router.delete('/id/:id', malePlayerController.deletePlayer);

module.exports = router;
