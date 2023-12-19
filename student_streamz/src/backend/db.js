const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const port = 3002;
const db = new sqlite3.Database('./likes.db');

const app = express();

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Movie Likes API',
            version: '1.0.0',
            description: 'API for managing movie likes and dislikes',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['db.js'],
};

const swaggerDocs = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(cors());
app.use(express.json());

function initializeDatabase() {
    db.serialize(() => {
        db.run('CREATE TABLE IF NOT EXISTS likes (imdbID TEXT PRIMARY KEY, likeStatus TEXT)');
    });
}

initializeDatabase();

/**
 * @swagger
 * tags:
 *   name: Likes
 *   description: Movie likes and dislikes
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Like:
 *       type: object
 *       properties:
 *         imdbID:
 *           type: string
 *         likeStatus:
 *           type: string
 *       example:
 *         imdbID: "tt123456"
 *         likeStatus: "like"
 */

/**
 * @swagger
 * /api/likes/{imdbID}:
 *   get:
 *     summary: Get likes for a movie
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: imdbID
 *         required: true
 *         description: IMDb ID of the movie
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Like'
 */

app.get('/api/likes/:imdbID', (req, res) => {
    const { imdbID } = req.params;

    const getLikesCallback = (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(row || { imdbID, likes: 0, dislikes: 0 });
        }
    };

    db.get('SELECT * FROM likes WHERE imdbID = ?', [imdbID], getLikesCallback);
});

/**
 * @swagger
 * /api/likes/{imdbID}:
 *   post:
 *     summary: Update likes for a movie
 *     tags: [Likes]
 *     parameters:
 *       - in: path
 *         name: imdbID
 *         required: true
 *         description: IMDb ID of the movie
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Like'
 *     responses:
 *       200:
 *         description: Successful response
 *       500:
 *         description: Internal Server Error
 */

app.post('/api/likes/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    const { likeStatus } = req.body;

    console.log(`Received like/dislike update for ${imdbID}: ${likeStatus}`);

    const updateLikesCallback = (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('OK');
        }
    };

    db.run('INSERT OR REPLACE INTO likes (imdbID, likeStatus) VALUES (?, ?)', [imdbID, likeStatus], updateLikesCallback);
});

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });




