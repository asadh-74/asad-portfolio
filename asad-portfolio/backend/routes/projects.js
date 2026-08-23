const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const DATA_PATH = path.join(__dirname, '..', 'data', 'projects.json');

// GET /api/projects  -> all projects
// GET /api/projects?tag=ML  -> filter by tag
router.get('/', (req, res) => {
  fs.readFile(DATA_PATH, 'utf-8', (err, raw) => {
    if (err) return res.status(500).json({ error: 'Could not read projects data' });

    let projects = JSON.parse(raw);
    const { tag } = req.query;
    if (tag) {
      const needle = tag.toLowerCase();
      projects = projects.filter((p) => p.tags.some((t) => t.toLowerCase() === needle));
    }
    res.json(projects);
  });
});

module.exports = router;
