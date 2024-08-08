const express = require('express');
const router = express.Router();
const {
    getAllAutomobiles,
    getAutomobileById,
    createAutomobile,
    updateAutomobile,
    deleteAutomobile,
} = require('../controllers/automobileController');
const { ensureAuthenticated } = require('../middleware/authMiddleware');

/**
 * @swagger
 * components:
 *   schemas:
 *     Automobile:
 *       type: object
 *       required:
 *         - make
 *         - model
 *         - price
 *       properties:
 *         id:
 *           type: integer
 *           description: Unique ID of the automobile
 *         make:
 *           type: string
 *           description: Make of the automobile
 *         model:
 *           type: string
 *           description: Model of the automobile
 *         year:
 *           type: integer
 *           description: Year of the automobile
 *         price:
 *           type: number
 *           description: Price of the automobile
 *         bodyStyle:
 *           type: string
 *           description: Body style of the automobile
 *       example:
 *         id: 1
 *         make: Toyota
 *         model: Corolla
 *         year: 2021
 *         price: 20000
 *         bodyStyle: Sedan
 */

/**
 * @swagger
 * tags:
 *   name: Automobiles
 *   description: Management of automobiles
 */

/**
 * @swagger
 * /api/automobiles:
 *   get:
 *     summary: Retrieves all automobiles with pagination, filters, and sorting
 *     tags: [Automobiles]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number to retrieve
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *       - in: query
 *         name: make
 *         schema:
 *           type: string
 *         description: Filter by automobile make
 *       - in: query
 *         name: bodyStyle
 *         schema:
 *           type: string
 *         description: Filter by body style
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: integer
 *         description: Minimum price of the automobile
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: integer
 *         description: Maximum price of the automobile
 *       - in: query
 *         name: sortBy
 *         schema:
 *           type: string
 *         description: Field to sort results by
 *       - in: query
 *         name: sortOrder
 *         schema:
 *           type: string
 *           enum: [ASC, DESC]
 *         description: Ascending or descending order
 *     responses:
 *       200:
 *         description: List of all automobiles
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 automobiles:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Automobile'
 *                 totalPages:
 *                   type: integer
 *                   description: Total number of pages
 *                 currentPage:
 *                   type: integer
 *                   description: Current page
 *                 totalItems:
 *                   type: integer
 *                   description: Total number of automobiles
 */
router.get('/automobiles', ensureAuthenticated, getAllAutomobiles);

/**
 * @swagger
 * /api/automobiles/{id}:
 *   get:
 *     summary: Retrieves an automobile by ID
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the automobile
 *     responses:
 *       200:
 *         description: Automobile found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automobile'
 *       404:
 *         description: Automobile not found
 */
router.get('/automobiles/:id', ensureAuthenticated, getAutomobileById);

/**
 * @swagger
 * /api/automobiles:
 *   post:
 *     summary: Creates a new automobile
 *     tags: [Automobiles]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Automobile'
 *     responses:
 *       201:
 *         description: Automobile successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automobile'
 *       400:
 *         description: Error creating the automobile
 */
router.post('/automobiles', ensureAuthenticated, createAutomobile);

/**
 * @swagger
 * /api/automobiles/{id}:
 *   put:
 *     summary: Updates an existing automobile
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the automobile
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Automobile'
 *     responses:
 *       200:
 *         description: Automobile successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Automobile'
 *       400:
 *         description: Error updating the automobile
 *       404:
 *         description: Automobile not found
 */
router.put('/automobiles/:id', ensureAuthenticated, updateAutomobile);

/**
 * @swagger
 * /api/automobiles/{id}:
 *   delete:
 *     summary: Deletes an existing automobile
 *     tags: [Automobiles]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID of the automobile
 *     responses:
 *       200:
 *         description: Automobile successfully deleted
 *       404:
 *         description: Automobile not found
 */
router.delete('/automobiles/:id', ensureAuthenticated, deleteAutomobile);

module.exports = router;
