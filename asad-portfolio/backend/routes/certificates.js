const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'certificates.json');

// GET /api/certificates -> all certificates
router.get('/', (req, res) => {
  fs.readFile(DATA_PATH, 'utf-8', (err, raw) => {
    if (err) return res.status(500).json({ error: 'Could not read certificates data' });
    res.json(JSON.parse(raw));
  });
});

module.exports = router;
