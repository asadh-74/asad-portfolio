// This site serves frontend + backend from the same Render service, so the
// frontend should always call the API on its own domain - no separate URL
// needed. (If you ever split them onto different hosts, set an absolute URL
// here instead, e.g. window.API_BASE_URL = 'https://your-backend.onrender.com';)
window.API_BASE_URL = '';