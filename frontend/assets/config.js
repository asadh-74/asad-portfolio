// Central place to point the frontend at the backend API.
//
// Frontend and backend are deployed together on the same Vercel project
// (see vercel.json at the repo root), so API calls always use the current
// origin - no separate backend URL needed. If you ever split them across
// two hosts again, set an absolute URL here instead of ''.
window.API_BASE_URL = '';
