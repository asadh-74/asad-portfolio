// Central place to point the frontend at the backend API.
//
// - When the site is opened on localhost, it talks to your local backend.
// - Otherwise, it uses PRODUCTION_API_URL below - update this once you've
//   deployed the backend (see backend/README section in the repo README).
const PRODUCTION_API_URL = 'https://your-backend-service.onrender.com';

const IS_LOCAL = ['localhost', '127.0.0.1', ''].includes(window.location.hostname);

// If the backend is serving the frontend itself (single-deploy setup),
// same-origin '/api' just works, so we default to that on localhost too.
window.API_BASE_URL = IS_LOCAL ? '' : PRODUCTION_API_URL;
