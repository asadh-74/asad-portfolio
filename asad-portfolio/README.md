# Asad Hussain — Portfolio (Frontend + Backend)

Personal portfolio site for Asad Hussain, Electrical Engineering student at SEECS, NUST.
Built as a static frontend plus a small Node/Express API that powers the projects grid
and the contact form.

```
asad-portfolio/
├── frontend/            # Static site (HTML/CSS/JS, no build step needed)
│   ├── index.html
│   └── assets/
│       ├── style.css
│       ├── main.js        # animations, nav, contact form submit logic
│       ├── projects.js    # fetches project cards from the API
│       ├── config.js      # points the frontend at the right API URL
│       └── images/
└── backend/              # Express API
    ├── server.js
    ├── routes/
    │   ├── projects.js   # GET  /api/projects
    │   ├── contact.js    # POST /api/contact
    │   └── chat.js       # POST /api/chat  (AI assistant, optional)
    └── data/
        ├── projects.json  # <- add new projects here
        └── messages.json  # contact form submissions land here
```

## Why a backend at all?

Two things needed to be real instead of fake:

1. **The contact form** used to just show a JS `alert()` — messages went nowhere.
   Now it POSTs to `/api/contact`, which validates the input, saves it to
   `backend/data/messages.json`, and (optionally) emails it to you if you set
   SMTP credentials.
2. **The projects grid** is now data-driven. Add a new project by editing
   `backend/data/projects.json` — no HTML editing required. If the API is
   unreachable, the page falls back to the static cards already in `index.html`,
   so the site still works with zero backend (e.g. GitHub Pages only).

## Run it locally

**Backend**
```bash
cd backend
cp .env.example .env      # fill in SMTP details if you want emailed messages
npm install
npm start                 # http://localhost:5000
```
This also serves the frontend at `http://localhost:5000`, so for local dev you
usually only need this one command.

**Frontend only** (if you want to edit without restarting the backend)
Open `frontend/index.html` directly, or serve it with any static server, e.g.
```bash
cd frontend
npx serve .                # http://localhost:3000
```
The frontend auto-detects `localhost` and calls `http://localhost:5000` — no
extra config needed for local dev. `frontend/assets/config.js` falls back to a
same-origin `/api` call on localhost, which matches the single-command backend
setup above.

## Making the contact form actually send email

Right now the form saves every message to `backend/data/messages.json` on the
server no matter what — nothing is ever lost. To also get an email the moment
someone submits, set these environment variables (in Render's dashboard, or
in a local `.env` copied from `.env.example`):

```
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your.email@gmail.com
SMTP_PASS=your_16_character_app_password
CONTACT_TO_EMAIL=your.email@gmail.com
```

`SMTP_PASS` is **not** your regular Gmail password — Google blocks that.
Generate an "App Password" instead:
1. Turn on 2-Step Verification on the Google account: myaccount.google.com/security
2. Go to myaccount.google.com/apppasswords
3. Create one for "Mail" / "Other" — Google gives you a 16-character code
4. Use that code as `SMTP_PASS`

On Render: open your service → **Environment** tab → add each variable →
save. Render redeploys automatically. Watch the Logs tab; a successful test
submission logs a request to `/api/contact` and (if SMTP is configured) sends
the email with no error in the log.

## Adding certificate images (click-to-view)

Certificate cards under **Certificates** are clickable and open a full-size
image in a lightbox — once you give them an image. Edit
`backend/data/certificates.json`:

```json
{
  "id": "codealpha-ml",
  "title": "Machine Learning Internship",
  "org": "CodeAlpha",
  "date": "June – July 2026",
  "credentialId": "CA/DF1/160558",
  "icon": "fa-brain",
  "imageUrl": "assets/images/certs/codealpha-ml.jpg",
  "verifyUrl": ""
}
```

1. Drop the certificate image file into `frontend/assets/images/certs/`
   (create that folder if it doesn't exist)
2. Set `imageUrl` to that relative path
3. Optionally set `verifyUrl` to a public verification link if the issuer
   provides one (it'll show as a "Verify credential" link in the lightbox)

Until an `imageUrl` is set, clicking the card still opens the lightbox with
the title, org, and credential ID — it just shows a placeholder icon instead
of an image, so nothing looks broken while you're still collecting the files.

## Adding the resume download

The navbar and hero section link to `frontend/assets/resume.pdf`. That file
is not included in the repo (a resume is personal, so it isn't generated for
you). To make the link work:

1. Export the resume as a PDF.
2. Save it as `frontend/assets/resume.pdf`, replacing any existing placeholder.
3. Commit and push. No code changes are needed since the link already points
   there.

## AI assistant widget

The chat bubble in the bottom right corner lets visitors ask questions about
Asad's projects, skills, and experience. It is answered by the small,
factual system prompt in `backend/routes/chat.js`, which only knows what is
written in that file, so it will not invent projects or dates that are not
already on the site.

To turn it on:
1. Get an API key from the [Anthropic Console](https://console.anthropic.com/).
2. Set `ANTHROPIC_API_KEY` in `backend/.env` (or the host's environment
   variables) to that key.
3. Restart the backend.

If `ANTHROPIC_API_KEY` is not set, the widget still renders but replies with
a friendly message asking the visitor to use the contact form instead, so
the rest of the site is unaffected either way.

To keep the assistant's answers accurate, update the `SYSTEM_PROMPT` text in
`backend/routes/chat.js` whenever the projects, experience, or skills on the
site change.

## Adding a new project

Edit `backend/data/projects.json` and add an object like:
```json
{
  "id": "my-new-project",
  "title": "My New Project",
  "description": "One or two sentences on what it does and how.",
  "tags": ["Embedded", "C++"],
  "icon": "fa-microchip",
  "codeUrl": "https://github.com/asadh-74/my-new-project",
  "demoUrl": ""
}
```
`icon` is any [Font Awesome](https://fontawesome.com/icons) solid icon name.
No frontend changes needed — the grid re-renders from this file on page load.

## Deploying for real

You have two options:

### Option A — one Node service (simplest)
Deploy the whole `backend/` folder (it serves `frontend/` too) to a Node host:
- **Render** (free tier): New → Web Service → connect this repo → root
  directory `backend` → build command `npm install` → start command `npm start`.
- **Railway**, **Fly.io**, or a VPS work the same way.

Set the environment variables from `backend/.env.example` in the host's
dashboard (SMTP is optional — without it, messages are still saved to
`messages.json`, just not emailed).

### Option B — separate frontend/backend (matches the Azure Static Web Apps
setup already used for the site)
1. Deploy `backend/` to Render/Railway as above — note the public URL.
2. In `frontend/assets/config.js`, set `PRODUCTION_API_URL` to that URL.
3. Deploy `frontend/` as a static site:
   ```bash
   az staticwebapp create \
     --name asad-portfolio \
     --resource-group <your-resource-group> \
     --source frontend \
     --location "eastus2" \
     --branch main \
     --app-location "/" \
     --output-location "."
   ```
   (Or connect the GitHub repo to Static Web Apps in the Azure portal for
   automatic deploys on every push.)
4. In `backend/.env` (or the host's env settings), set `ALLOWED_ORIGINS` to
   your Static Web App's URL so CORS allows the contact form to reach the API.

## Pushing this to GitHub

```bash
cd asad-portfolio
git init
git add .
git commit -m "Portfolio: add backend API, wire up contact form and dynamic projects"
git branch -M main
git remote add origin https://github.com/asadh-74/asad-portfolio.git
git push -u origin main
```

## Stack

- **Frontend:** HTML5, CSS3 (custom, no framework), vanilla JS
- **Backend:** Node.js, Express, Nodemailer (optional email), express-rate-limit
- **Data:** flat JSON files (no database needed for this scale — easy to swap
  for a real DB later if the message volume grows)
