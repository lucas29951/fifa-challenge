const express = require('express');
const router = express.Router();
const filterPlayerController = require('../controllers/filterPlayerController');

/**
 * @swagger
 * tags:
 *   name: Filters
 *   description: API para filtrar jugadores (hombres y mujeres)
 */

/**
 * @swagger
 * /api/players/filter:
 *   get:
 *     summary: Filtrar jugadores (masculinos y femeninos)
 *     tags: [Filters]
 *     parameters:
 *       - in: query
 *         name: gender
 *         schema:
 *           type: string
 *           enum: [male, female, all]
 *         description: Género de los jugadores
 *       - in: query
 *         name: club
 *         schema:
 *           type: string
 *         description: Nombre del club
 *       - in: query
 *         name: country
 *         schema:
 *           type: string
 *         description: País del jugador
 *       - in: query
 *         name: minOverall
 *         schema:
 *           type: integer
 *         description: Valor mínimo de overall
 *       - in: query
 *         name: maxOverall
 *         schema:
 *           type: integer
 *         description: Valor máximo de overall
 *       - in: query
 *         name: position
 *         schema:
 *           type: string
 *         description: Posición del jugador
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Página de resultados
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Límite de resultados por página
 *     responses:
 *       200:
 *         description: Lista de jugadores filtrados
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   long_name:
 *                     type: string
 *                   club_name:
 *                     type: string
 *                   nationality_name:
 *                     type: string
 *                   overall:
 *                     type: integer
 *       400:
 *         description: Parámetros inválidos
 */
router.get('/', filterPlayerController.filterPlayers);

module.exports = router;