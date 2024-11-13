// server.js
const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Initialize SQLite Database
const db = new sqlite3.Database('./votes.db', (err) => {
  if (err) {
    console.error(err.message);
  } else {
    db.run(`CREATE TABLE IF NOT EXISTS votes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      vote_option TEXT NOT NULL
    )`);
    console.log('Connected to the votes database.');
  }
});

// Middleware to Authenticate Requests
function authenticate(req, res, next) {
    const token = req.headers['x-access-token'];
    if (token === '1234') {
      next();
    } else {
      res.status(403).send({ message: 'Forbidden' });
    }
  }

// Route to Handle Vote Submission
app.post('/for-imod', (req, res) => {
  const voteOption = req.body.voteOption;

  if (voteOption === 'for' || voteOption === 'against') {
    db.run(`INSERT INTO votes(vote_option) VALUES(?)`, [voteOption], function(err) {
      if (err) {
        return res.status(500).send({ message: 'An error occurred' });
      }
      return res.status(200).send({ message: 'Vote recorded' });
    });
  } else {
    res.status(400).send({ message: 'Invalid vote option' });
  }
});

// Protected Route to Get Vote Counts
app.get('/vote-counts', authenticate, (req, res) => {
  db.all(`SELECT vote_option, COUNT(*) AS vote_count FROM votes GROUP BY vote_option`, [], (err, rows) => {
    if (err) {
      return res.status(500).send({ message: 'An error occurred' });
    }
    res.status(200).send(rows);
  });
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});