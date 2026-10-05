// Small improvements shared by the original homepage and project archive.
(() => {
 const toggle=document.querySelector('.menu-toggle'),nav=document.getElementById('navigation-links');
 function closeMenu(){nav.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','Open navigation');}
 toggle.addEventListener('click',()=>{const open=toggle.getAttribute('aria-expanded')!=='true';nav.classList.toggle('menu-open',open);toggle.setAttribute('aria-expanded',String(open));toggle.setAttribute('aria-label',open?'Close navigation':'Open navigation');});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('click',e=>{if(!e.target.closest('#navbar'))closeMenu();});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('menu-open')){closeMenu();toggle.focus();}});
 // The original certificate lightbox retains its look and gains keyboard focus containment.
 document.addEventListener('keydown',e=>{
  if(e.key!=='Tab')return;
  const modal=document.querySelector('#cert-modal.open')||document.querySelector('#ai-panel.open');if(!modal)return;
  const nodes=[...modal.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),[tabindex="0"]')].filter(n=>n.getClientRects().length);
  if(!nodes.length)return;const first=nodes[0],last=nodes[nodes.length-1];
  if(e.shiftKey&&(document.activeElement===first||!modal.contains(document.activeElement))){e.preventDefault();last.focus();}
  else if(!e.shiftKey&&(document.activeElement===last||!modal.contains(document.activeElement))){e.preventDefault();first.focus();}
 });
})();
