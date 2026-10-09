# Asad Hussain — Electrical & Embedded Engineering Portfolio

Live: https://asad-portfolio-flax-pi.vercel.app/

The original purple-and-cyan portfolio design is restored from commit `99a1c38c2796bf58a4dd0ef859b175901446ab8c`, preserving its portrait hero, horizontal navigation, experience timeline, skills, project cards, certificates, memberships, testimonials, and contact section.

## Focused enhancements

- Responsive mobile navigation with keyboard and Escape support.
- Search and discipline filters for the 8 featured projects and the original 30-project archive. Filter state is reflected in the URL.
- The RDC/HIT fleet project has a dedicated case study with original prototype photographs and a locally hosted professional internship report. Other original report links remain in place. Placeholder links invite an email enquiry.
- All 10 certificates are available without an API round trip. The original lightbox gains focus containment and focus restoration, while retaining full-size, download, PDF, and verification links.
- Consistent engineering CV links and a repaired `/api/resume` endpoint.
- The original Inter, Space Grotesk, and Font Awesome assets are served locally from `frontend/vendor/`, with their licenses.
- No artificial preloader delay; reduced-motion support and readable content when JavaScript is disabled.
- Corrected internship dates and outdated project/final-year-project descriptions. Project concepts and simulations are not counted as completed builds.

The independent redesigns have been reverted in a new commit; Git history remains available.

## Local preview

```sh
python3 -m http.server 8000 --directory frontend
```

Open http://localhost:8000. No frontend build step is required. The optional assistant requires the backend.

```sh
cd backend
npm ci
npm start
```

`vercel.json` preserves the original deployment: static requests resolve to `frontend/`, and `/api/*` requests reach `backend/server.js`. Existing API routes remain available. The assistant uses server-side `GEMINI_API_KEY` and optional `GEMINI_MODEL`. No secrets are included in the frontend.

## Editing

- `frontend/index.html`: homepage content and embedded certificate metadata.
- `frontend/projects.html`: complete project archive and original report links.
- `frontend/style.css`: original visual design.
- `frontend/enhancements.css`, `enhancements.js`: targeted responsive and accessibility improvements.
- `frontend/projects.js`: browser filtering; it does not replace curated cards with API results.
- `frontend/certificates.js`: original certificate gallery/lightbox behavior.
- `backend/data/projects.json`: featured project API data; keep it aligned with the homepage.
- `backend/data/certificates.json`: certificate API records; keep them aligned with the homepage metadata. `backend/certificates.json` is a legacy mirror.

Validate both pages at desktop and mobile sizes, filters, certificates, CV links, and the assistant's unavailable state before deployment.

## RDC and HIT report

`frontend/rdc-hit.html` documents the fleet project and links to the revised PDF in `frontend/reports/`. The report separates source evidence, isolated software checks and planned system acceptance tests. Original prototype photos are in `frontend/assets/rdc-hit/`. No raw application source, credentials, infrastructure addresses or operational route data are included in this addition.
