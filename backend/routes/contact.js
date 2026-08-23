const express = require('express');
const fs = require('fs');
const path = require('path');
const nodemailer = require('nodemailer');

const router = express.Router();
const MESSAGES_PATH = path.join(__dirname, '..', 'data', 'messages.json');

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function saveMessageLocally(message) {
  let existing = [];
  try {
    existing = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf-8'));
  } catch (e) {
    existing = [];
  }
  existing.push(message);
  fs.writeFileSync(MESSAGES_PATH, JSON.stringify(existing, null, 2));
}

async function sendEmail(message) {
  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO_EMAIL } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    return false; // no SMTP configured - message was still saved locally
  }

  const port = Number(SMTP_PORT) || 465;
  const transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465, // true for 465 (implicit TLS), false for 587/others (STARTTLS)
    auth: { user: SMTP_USER, pass: SMTP_PASS },
    connectionTimeout: 10000,
  });

  await transporter.sendMail({
    from: `"Portfolio Contact Form" <${SMTP_USER}>`,
    to: CONTACT_TO_EMAIL || SMTP_USER,
    replyTo: message.email,
    subject: `New portfolio message from ${message.name}`,
    text: message.message,
    html: `<p><strong>From:</strong> ${message.name} (${message.email})</p><p>${message.message.replace(/\n/g, '<br>')}</p>`,
  });

  return true;
}

// POST /api/contact  { name, email, message }
router.post('/', async (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Name, email, and message are all required.' });
  }
  if (!isValidEmail(email)) {
    return res.status(400).json({ error: 'Please provide a valid email address.' });
  }
  if (String(message).length > 5000) {
    return res.status(400).json({ error: 'Message is too long.' });
  }

  const entry = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  // Saving to a local JSON file only works on a host with a writable,
  // persistent filesystem (e.g. Render). On serverless hosts like Vercel the
  // filesystem is read-only, so this is best-effort and must never block the
  // request — email (below) is the reliable delivery path there.
  let savedLocally = false;
  try {
    saveMessageLocally(entry);
    savedLocally = true;
  } catch (err) {
    console.error('Contact form: could not save message locally (expected on read-only hosts like Vercel):', err.message);
  }

  let emailed = false;
  try {
    emailed = await sendEmail(entry);
  } catch (err) {
    console.error('Contact form error (sending email):', err.message);
  }

  if (!savedLocally && !emailed) {
    return res.status(500).json({
      error: 'Could not deliver your message right now. Please email directly instead.',
    });
  }

  res.json({
    success: true,
    emailed,
    note: emailed ? 'Message sent by email.' : 'Message saved. Configure SMTP env vars to also send email.',
  });
});

module.exports = router;
