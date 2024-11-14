// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
require('dotenv').config(); // Load environment variables

const { Client } = require('pg');

const app = express();
const port = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://kamillodev.github.io',
}));
app.use(express.static('public')); // Serve static files from 'public' directory

// Initialize PostgreSQL Client
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

client.connect()
  .then(() => console.log('Connected to PostgreSQL'))
  .catch(err => console.error('Connection error', err.stack));

// Admin Authentication Middleware using Basic Auth
function adminAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    return res.status(401).send('Authentication required.');
  }

  const base64Credentials = authHeader.split(' ')[1];
  const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
  const [username, password] = credentials.split(':');

  if (password === process.env.ADMIN_PASSWORD) {
    next();
  } else {
    res.setHeader('WWW-Authenticate', 'Basic realm="Admin Area"');
    res.status(401).send('Access denied.');
  }
}

// Route to Handle Vote Submission
app.post('/for-imod', (req, res) => {
  const voteOption = req.body.voteOption;

  if (voteOption === 'for' || voteOption === 'against') {
    client.query('INSERT INTO votes(vote_option) VALUES($1)', [voteOption], (err) => {
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
app.get('/vote-counts', adminAuth, (req, res) => {
  client.query(
    'SELECT vote_option, COUNT(*) AS vote_count FROM votes GROUP BY vote_option',
    [],
    (err, result) => {
      if (err) {
        return res.status(500).send({ message: 'An error occurred' });
      }
      res.status(200).json(result.rows);
    }
  );
});

// Admin Route to View Votes
app.get('/admin', adminAuth, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

// Start Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

