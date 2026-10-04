# Asad Hussain — Embedded Systems Portfolio

Live: https://asad-portfolio-flax-pi.vercel.app/

A responsive portfolio for embedded systems, firmware, PCB design, RF/DSP, and connected devices. The companion software portfolio is https://automation-portfolio-steel.vercel.app/.

## Frontend

Static HTML, CSS, and JavaScript in `frontend/`, with self-hosted Nimbus fonts. No frontend build step or CDN dependency.

- `index.html`: home, projects, architecture explorer, about, experience, credentials, and contact.
- `embedded.css`: responsive design, accessible focus states, reduced-motion support.
- `embedded.js`: category/search filters, shareable URLs, project dialogs, certificate previews, navigation, and optional AI assistant.
- `portfolio-data.js`: 32 projects and 11 certificates. Preserve original evidence links; label simulations, concepts, and ongoing research accurately.
- `projects.html`: redirects old archive links to the complete interactive project catalog.
- `AsadHussain_CV.pdf`: engineering CV; direct view and download links work without the backend.
- `certs/`: original certificate images and available PDFs. FlyRank and CodeAlpha copies also appear in Automation-Portfolio.

Local frontend preview:

```sh
python3 -m http.server 8000 --directory frontend
```

Open http://localhost:8000. The optional assistant requires the backend; its unavailable state directs visitors to email.

## Backend and deployment

The existing Express backend is deployed through `vercel.json`. Static requests map to `frontend/`; `/api/*` maps to `backend/server.js`. Existing contact, project, certificate, resume, and chat routes remain available.

```sh
cd backend
npm ci
npm start
```

The assistant uses server-side `GEMINI_API_KEY` and optional `GEMINI_MODEL`; no secret is sent to the frontend. Without configuration it returns a clear unavailable response. Its portfolio facts are in `backend/routes/chat.js` (also mirrored in the legacy `backend/chat.js`). Responses are informational; reports and original certificates remain primary references. The contact section uses email links and does not claim to submit or store a message.

Project API data lives in `backend/data/projects.json`; certificate API data lives in `backend/data/certificates.json`. Keep these aligned with `frontend/portfolio-data.js`. `backend/certificates.json` is a legacy mirror. The frontend catalog is static and does not depend on API availability.

Vercel deploys from the repository's main branch. Keep the existing root Vercel configuration. Validate desktop/mobile layouts, dialogs, filters, all local assets, and PDF links before pushing.
