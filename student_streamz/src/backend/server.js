const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3001;

app.use(express.json());
app.use(cors());

const db = new sqlite.Database('users.db');

db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS users 
            (id INTEGER PRIMARY KEY AUTOINCREMENT, 
            firstname TEXT, lastname TEXT, birthday DATE, 
            gender TEXT, username TEXT, password TEXT)`)
});

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