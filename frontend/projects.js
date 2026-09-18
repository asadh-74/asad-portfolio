// Fetches project cards from the backend and renders them into #projects-grid.
// Falls back to whatever static cards are already in the HTML if the API
// is unreachable (e.g. viewing index.html directly with no backend running).

async function loadProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  try {
    const res = await fetch(`${window.API_BASE_URL || ''}/api/projects`);
    if (!res.ok) throw new Error('Bad response from /api/projects');
    const projects = await res.json();

    if (!Array.isArray(projects) || projects.length === 0) return;

    grid.innerHTML = projects.map(projectCardHTML).join('');
    observeReveals(grid.querySelectorAll('.reveal'));
  } catch (err) {
    console.warn('Could not load projects from API, keeping static fallback cards.', err);
  }
}

function projectCardHTML(project) {
  const tags = (project.tags || [])
    .map((t) => `<span class="project-tag">${escapeHTML(t)}</span>`)
    .join('');

  const codeLink = project.codeUrl
    ? `<a href="${escapeHTML(project.codeUrl)}" target="_blank" rel="noopener"><i class="fab fa-github"></i> Code</a>`
    : `<a href="#contact"><i class="fab fa-github"></i> Ask for code</a>`;

  const demoLink = project.demoUrl
    ? `<a href="${escapeHTML(project.demoUrl)}" target="_blank" rel="noopener"><i class="fas fa-external-link-alt"></i> Demo</a>`
    : '';

  return `
    <div class="project-card reveal">
        <div class="project-image"><i class="fas ${escapeHTML(project.icon || 'fa-code')}"></i></div>
        <div class="project-content">
            <div class="project-tags">${tags}</div>
            <h3 class="project-title">${escapeHTML(project.title)}</h3>
            <p class="project-desc">${escapeHTML(project.description)}</p>
            <div class="project-links">${codeLink}${demoLink}</div>
        </div>
    </div>`;
}

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

// Re-attach the scroll-reveal IntersectionObserver to newly injected cards.
function observeReveals(elements) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add('active');
      });
    },
    { threshold: 0.1 }
  );
  elements.forEach((el) => observer.observe(el));
}

document.addEventListener('DOMContentLoaded', loadProjects);
