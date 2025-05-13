// Load environment variables
require('dotenv').config();

const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// Connect to MySQL using environment variables
const db = mysql.createConnection({
  host: process.env.DB_HOST,     // 'localhost' for Namecheap
  user: process.env.DB_USER,     // e.g., 'novapild_shelfadmin'
  password: process.env.DB_PASS, // your MySQL user password
  database: process.env.DB_NAME  // e.g., 'novapild_shelfxpress'
});

// Verify connection
db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    process.exit(1);
  }
  console.log('✅ Connected to MySQL database.');
});

// Example endpoint: Get all books
app.get('/api/books', (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('Error fetching books:', err);
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(results);
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
