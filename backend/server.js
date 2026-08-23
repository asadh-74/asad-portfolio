require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const projectsRouter = require('./routes/projects');
const certificatesRouter = require('./routes/certificates');
const contactRouter = require('./routes/contact');
const chatRouter = require('./routes/chat');

const app = express();
const PORT = process.env.PORT || 5000;

// Required behind a reverse proxy (Vercel, Render, etc.) so Express reads the
// real client IP from X-Forwarded-For correctly instead of throwing a
// validation error inside express-rate-limit on every request.
app.set('trust proxy', 1);

const allowedOrigins = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow same-origin/non-browser requests (no Origin header) and any
      // explicitly whitelisted origin. If no whitelist is configured, allow all
      // (handy for local development).
      if (!origin || allowedOrigins.length === 0 || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error('Not allowed by CORS'));
    },
  })
);

app.use(express.json({ limit: '10kb' }));

// Basic rate limiting so the contact form / API can't be spammed.
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', apiLimiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/projects', projectsRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/contact', contactRouter);
app.use('/api/chat', chatRouter);

// Serve the built frontend as well, so the whole site can be deployed as a
// single Node service if you don't want to host frontend/backend separately.
const frontendDir = path.join(__dirname, '..', 'frontend');
app.use(express.static(frontendDir));
app.get('*', (req, res, next) => {
  if (req.path.startsWith('/api')) return next();
  res.sendFile(path.join(frontendDir, 'index.html'));
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Internal server error' });
});

// On a normal Node host (Render, Railway, local dev) this file is run
// directly, so it should start listening. On Vercel, this file is imported
// by the serverless runtime instead, which calls the exported app itself,
// so app.listen() must be skipped there.
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Portfolio API + site running on http://localhost:${PORT}`);
  });
}

module.exports = app;
