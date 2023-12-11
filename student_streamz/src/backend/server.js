const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();    // allows us to use SQLite as our DB
const bcrypt = require('bcrypt');   // used for our password encryption
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = new sqlite.Database('users.db');


const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Login/signup API',
            version: '1.0.0',
            description: 'API for signing up and logining into student_streamz',
        },
        servers: [
            {
                url: `http://localhost:${port}`,
                description: 'Development server',
            },
        ],
    },
    apis: ['server.js'],
};

const swaggerDocs = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstname TEXT, lastname TEXT, birthday DATE, 
            gender TEXT, username TEXT, password TEXT)`)
});

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User information for registration
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               firstname:
 *                 type: string
 *               lastname:
 *                 type: string
 *               birthday:
 *                 type: string
 *                 format: date
 *               gender:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *       500:
 *         description: Failed attempt to register a new user
 */
app.post('/register', async (request, response) => {
    const {firstname, lastname, birthday, gender, username, password} = request.body;

    // Hash and Salt password for protection of each user who registers
    const hashedAndSaltedPassword = await bcrypt.hash(password, 10);

    db.run(`INSERT INTO users 
            (firstname, lastname, birthday, gender, username, password) VALUES (?, ?, ?, ?, ?, ?)`, 
            [firstname, lastname, birthday, gender, username, hashedAndSaltedPassword], (err) => {
                if (err) {
                    return response.status(500).json({ERROR: "Failed Attempt to Register New User."});
                }
                response.status(201).json({SUCCESS: "User was Registered to the website successfully."});
    });
});

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Log in a user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       description: User login information
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: User logged in successfully
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Failed attempt to retrieve the user
 */
app.post('/login', async (request, response) => {
    const {username, password} = request.body;

    db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, row) => {
        if (err) {
            return response.status(500).json({ERROR: "Failed Attempt at Retrieving the User."});
        }
        if (!row) {
            return response.status(401).json({ERROR: "Invalid Username or Password. Please try again."});
        }

        const isAValidPassword = await bcrypt.compare(password, row.password);

        if (!isAValidPassword) {
            return response.status(401).json({ERROR: "Invalid Password. Please ensure it's typed correctly and try again."});
        }

        response.status(201).json({SUCCESS: "User was Logged In Successfully."});
    });
});

app.listen(port, () => {
    console.log(`Server is running on post ${port}.`);
});