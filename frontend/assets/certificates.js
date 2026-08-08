// Loads certificate cards from the backend and makes each one clickable,
// opening a lightbox with the certificate image (or a verify link / credential
// ID if no image has been uploaded for it yet). Falls back to the static
// cards already in the HTML if the API is unreachable.

async function loadCertificates() {
  const grid = document.getElementById('certs-grid');
  if (!grid) return;

  try {
    const res = await fetch(`${window.API_BASE_URL || ''}/api/certificates`);
    if (!res.ok) throw new Error('Bad response from /api/certificates');
    const certs = await res.json();

    if (!Array.isArray(certs) || certs.length === 0) return;

    grid.innerHTML = certs.map(certCardHTML).join('');
    observeRevealsCerts(grid.querySelectorAll('.reveal'));
    attachCertClickHandlers(certs);
  } catch (err) {
    console.warn('Could not load certificates from API, keeping static fallback cards.', err);
    // Even the static fallback cards should still be clickable.
    attachCertClickHandlers(null);
  }
}

function certCardHTML(cert) {
  const thumb = cert.imageUrl
    ? `<div class="cert-thumb"><img src="${escapeCertHTML(cert.imageUrl)}" alt="${escapeCertHTML(cert.title)}" loading="lazy"></div>`
    : `<div class="cert-icon"><i class="fas ${escapeCertHTML(cert.icon || 'fa-certificate')}"></i></div>`;

  return `
    <div class="cert-card reveal" data-cert-id="${escapeCertHTML(cert.id)}" tabindex="0" role="button" aria-label="View ${escapeCertHTML(cert.title)} certificate">
        ${thumb}
        <div class="cert-title">${escapeCertHTML(cert.title)}</div>
        <div class="cert-org">${escapeCertHTML(cert.org)}</div>
        <div class="cert-date">${escapeCertHTML(cert.date)}</div>
        <div class="cert-id">ID: ${escapeCertHTML(cert.credentialId)}</div>
        <div class="cert-view-hint"><i class="fas fa-expand"></i> View certificate</div>
    </div>`;
}

function escapeCertHTML(str) {
  const div = document.createElement('div');
  div.textContent = String(str ?? '');
  return div.innerHTML;
}

function observeRevealsCerts(elements) {
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

function attachCertClickHandlers(certs) {
  const cards = document.querySelectorAll('#certs-grid .cert-card');
  cards.forEach((card, i) => {
    const cert = certs ? certs[i] : null;
    const open = () => openCertModal(cert, card);
    card.addEventListener('click', open);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        open();
      }
    });
  });
}

function openCertModal(cert, cardEl) {
  const modal = document.getElementById('cert-modal');
  const body = document.getElementById('cert-modal-body');
  if (!modal || !body) return;

  const title = cert?.title || cardEl.querySelector('.cert-title')?.textContent || 'Certificate';
  const org = cert?.org || cardEl.querySelector('.cert-org')?.textContent || '';
  const imageUrl = cert?.imageUrl || cardEl.querySelector('.cert-thumb img')?.getAttribute('src');
  const verifyUrl = cert?.verifyUrl;

  if (imageUrl) {
    body.innerHTML = `
      <img src="${escapeCertHTML(imageUrl)}" alt="${escapeCertHTML(title)} certificate" class="cert-modal-image">
      <h3>${escapeCertHTML(title)}</h3>
      <p>${escapeCertHTML(org)}</p>
      ${verifyUrl ? `<a href="${escapeCertHTML(verifyUrl)}" target="_blank" rel="noopener" class="cert-modal-verify">Verify credential <i class="fas fa-external-link-alt"></i></a>` : ''}
    `;
  } else {
    // No image uploaded for this certificate yet.
    body.innerHTML = `
      <div class="cert-modal-placeholder"><i class="fas fa-certificate"></i></div>
      <h3>${escapeCertHTML(title)}</h3>
      <p>${escapeCertHTML(org)}</p>
      ${verifyUrl ? `<a href="${escapeCertHTML(verifyUrl)}" target="_blank" rel="noopener" class="cert-modal-verify">Verify credential <i class="fas fa-external-link-alt"></i></a>` : '<p class="cert-modal-note">Certificate image not uploaded yet.</p>'}
    `;
  }

  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeCertModal() {
  const modal = document.getElementById('cert-modal');
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

document.addEventListener('DOMContentLoaded', () => {
  loadCertificates();

  document.getElementById('cert-modal-close')?.addEventListener('click', closeCertModal);
  document.getElementById('cert-modal-backdrop')?.addEventListener('click', closeCertModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeCertModal();
  });
});
