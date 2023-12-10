const express = require('express');
const cors = require('cors');
const sqlite = require('sqlite3').verbose();    // allows us to use SQLite as our DB
const bcrypt = require('bcrypt');   // used for our password encryption

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

// POST (URI = "/register") processes the user information passed on the registration page
//                          and sends to DB allowing user to create an account to login/use.
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

// POST (URI = "/login") processes the user's login information passed on the login page
//                       and sends to 'app' as a POST, but ultimately GET from the DB 
//                       which will send appropriate response to user if or not allowed to log in.
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