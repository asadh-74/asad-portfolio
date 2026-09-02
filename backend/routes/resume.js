const express = require('express');
const path = require('path');

const router = express.Router();
const RESUME_PATH = path.join(__dirname, '..', 'data', 'resume.pdf');

// GET /api/resume -> forces a download named Asad_Hussain_Resume.pdf,
// regardless of what the source file on disk is called.
router.get('/', (req, res) => {
  res.download(RESUME_PATH, 'Asad_Hussain_Resume.pdf', (err) => {
    if (err) {
      console.error('Resume download error:', err);
      if (!res.headersSent) res.status(404).json({ error: 'Resume not found' });
    }
  });
});

module.exports = router;
