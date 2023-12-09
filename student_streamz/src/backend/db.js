const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3002;

const db = new sqlite3.Database('./likes.db');

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS likes (imdbID TEXT PRIMARY KEY, likeStatus TEXT)');
});

app.use(cors());
app.use(express.json());

app.get('/api/likes/:imdbID', (req, res) => {
    const { imdbID } = req.params;

    db.get('SELECT * FROM likes WHERE imdbID = ?', [imdbID], (err, row) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.json(row || { imdbID, likes: 0, dislikes: 0 });
        }
    });
});

app.post('/api/likes/:imdbID', (req, res) => {
    const { imdbID } = req.params;
    const { likeStatus } = req.body;

    console.log(`Received like/dislike update for ${imdbID}: ${likeStatus}`);

    db.run('INSERT OR REPLACE INTO likes (imdbID, likeStatus) VALUES (?, ?)', [imdbID, likeStatus], (err) => {
        if (err) {
            console.error(err.message);
            res.status(500).send('Internal Server Error');
        } else {
            res.status(200).send('OK');
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

