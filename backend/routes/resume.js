const express = require('express');
const path = require('path');

const router = express.Router();
const RESUME_PATH = path.join(__dirname, '..', '..', 'frontend', 'AsadHussain_CV.pdf');

// GET /api/resume -> forces a download named AsadHussain_CV.pdf,
// regardless of what the source file on disk is called.
router.get('/', (req, res) => {
  res.download(RESUME_PATH, 'AsadHussain_CV.pdf', (err) => {
    if (err) {
      console.error('Resume download error:', err);
      if (!res.headersSent) res.status(404).json({ error: 'Resume not found' });
    }
  });
});

module.exports = router;
