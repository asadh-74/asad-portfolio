'use strict';
(() => {
 const $ = s => document.querySelector(s);
 const projects = window.ENGINEERING_PROJECTS || [];
 const certificates = window.ENGINEERING_CERTIFICATES || [];
 const areaNames = {embedded:'EMBEDDED & IoT',signal:'RF & SIGNAL PROCESSING',circuits:'PCB & ANALOG',control:'DIGITAL & CONTROL',software:'APPLIED AI & SOFTWARE'};
 const escape = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const ext = (href,text,cls='button') => `<a class="${cls}" href="${escape(href)}" target="_blank" rel="noopener">${escape(text)} ↗</a>`;
 function illustration(area) {
  const grid='<path d="M0 40H400M0 80H400M0 120H400M40 0V200M80 0V200M120 0V200M160 0V200M200 0V200M240 0V200M280 0V200M320 0V200M360 0V200" stroke="#78929e" opacity=".1"/>';
  const shapes={
   embedded:'<g stroke="#a8bfc8" stroke-width="1.5"><path d="M45 142h62l31-46h67l36 34h107" stroke-dasharray="5 5"/><circle cx="107" cy="142" r="5" fill="#a8bfc8"/><circle cx="241" cy="130" r="5" fill="#a8bfc8"/><rect x="142" y="61" width="58" height="66" rx="5" fill="#334851"/><path d="M156 51v10m14-10v10m14-10v10m-28 66v10m14-10v10m14-10v10M152 75h38v38h-38zM277 65a30 30 0 0 1 44 0m-38 8a20 20 0 0 1 32 0m-24 8a10 10 0 0 1 16 0"/><circle cx="299" cy="91" r="3" fill="#a8bfc8"/></g>',
   signal:'<g stroke="#d4a182" stroke-width="2"><path d="M35 112h330" opacity=".2"/><path d="M35 112q12-4 20 0t20 0l8-14 9 28 10-36 10 49 11-69 11 81 11-104 12 120 12-125 12 122 12-99 11 83 11-67 11 42 10-35 10 25 11-16q12 10 20 10h60"/><path d="M35 159h330" stroke-dasharray="3 5" opacity=".3"/></g>',
   circuits:'<g stroke="#afc2c4" stroke-width="1.5"><rect x="135" y="55" width="122" height="105" rx="7"/><rect x="165" y="80" width="62" height="55" fill="#34454b"/><path d="M35 77h50l35 30h45M35 145h55l25-25h50M227 94h43l35-30h55M227 120h49l33 32h51M183 80V35m20 45V35m-20 100v46m20-46v46"/><circle cx="35" cy="77" r="4"/><circle cx="35" cy="145" r="4"/><circle cx="360" cy="64" r="4"/><circle cx="360" cy="152" r="4"/></g>',
   control:'<g stroke="#b3c3c1" stroke-width="1.5"><path d="M40 100h40m70 0h40m70 0h85M303 100v60H110v-44"/><path d="m73 94 7 6-7 6m110-12 7 6-7 6m138-12 7 6-7 6"/><rect x="80" y="72" width="70" height="56" rx="4"/><rect x="190" y="72" width="70" height="56" rx="4"/><path d="M95 112V90h11v22h11V90h16M202 112l10-23 10 16 10-14 16 21"/></g>',
   software:'<g stroke="#afbaca" stroke-width="1.5"><rect x="74" y="47" width="252" height="128" rx="6"/><path d="M74 69h252"/><circle cx="88" cy="59" r="2"/><circle cx="99" cy="59" r="2"/><circle cx="110" cy="59" r="2"/><path d="m125 93-22 20 22 20m43-40 22 20-22 20m-17-50-12 60M218 98h78m-78 15h49m-49 15h64m-64 15h33"/></g>'
  };
  return `<svg viewBox="0 0 400 200" fill="none" aria-hidden="true">${grid}${shapes[area]}</svg>`;
 }
 const components={
  firmware:{title:'Firmware & control',description:'Embedded C/C++ turns measurements into decisions, manages device state, and coordinates the hardware.'},
  sensors:{title:'Sensing & interfaces',description:'Sensors translate physical conditions into data. UART, SPI, I²C, and ADC interfaces connect the measurements to firmware.'},
  connectivity:{title:'Communication & telemetry',description:'A device becomes part of a system through reliable communication—Wi-Fi, Bluetooth, or cellular links, with telemetry such as MQTT.'},
  power:{title:'Power & reliability',description:'Regulation, power distribution, and battery management support dependable device operation. The power path is part of the system design.'}
 };
 document.querySelectorAll('[data-component]').forEach(b=>b.addEventListener('click',()=>{
  const id=b.dataset.component,c=components[id];$('.drawing-sheet').dataset.active=id;$('#component-title').textContent=c.title;$('#component-description').textContent=c.description;
  document.querySelectorAll('[data-component]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.component===id)));
 }));
 let area='all', query='', expanded=false;
 function readURL(){const p=new URLSearchParams(location.search);area=areaNames[p.get('area')]?p.get('area'):'all';query=p.get('q')||'';expanded=p.get('view')==='all';$('#project-search').value=query;}
 function syncURL(){const u=new URL(location.href);area==='all'?u.searchParams.delete('area'):u.searchParams.set('area',area);query?u.searchParams.set('q',query):u.searchParams.delete('q');expanded?u.searchParams.set('view','all'):u.searchParams.delete('view');history.replaceState(null,'',u);}
 function renderProjects(){
  const matches=projects.filter(p=>(area==='all'||p.area===area)&&[p.title,p.summary,...p.tags].join(' ').toLowerCase().includes(query.toLowerCase().trim()));
  const visible=expanded||area!=='all'||query?matches:matches.slice(0,4);
  $('#project-grid').innerHTML=visible.map(p=>`<article class="project-card area-${p.area}" data-project="${p.id}"><div class="entry-meta"><span class="entry-number">ENTRY ${String(projects.indexOf(p)+1).padStart(2,'0')}</span><span>${areaNames[p.area]}</span></div><div class="project-art">${illustration(p.area)}<span class="art-index">AH / ${String(projects.indexOf(p)+1).padStart(2,'0')}</span></div><div class="project-content"><p class="project-status">${escape(p.status)}</p><h3>${escape(p.title)}</h3><p class="project-summary">${escape(p.summary)}</p><div class="tags">${p.tags.map(t=>`<span>${escape(t)}</span>`).join('')}</div><div class="card-bottom"><button class="project-open" data-project-open="${p.id}">Read the project <span>↗</span></button>${p.links.length?ext(p.links[0].url,'Report','report-link'):'<span class="mono" style="font-size:8px;color:var(--dim)">FIELD NOTES</span>'}</div></div></article>`).join('');
  $('#result-count').textContent=`${visible.length} of ${matches.length} projects${area==='all'?'':` · ${areaNames[area]}`}`;
  $('#show-more').hidden=visible.length===matches.length;$('#empty-state').hidden=matches.length>0;
  document.querySelectorAll('[data-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===area)));
 }
 document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{area=b.dataset.filter;expanded=false;renderProjects();syncURL();}));
 $('#project-search').addEventListener('input',e=>{query=e.target.value;renderProjects();syncURL();});
 $('#clear-filters').addEventListener('click',()=>{area='all';query='';expanded=false;$('#project-search').value='';renderProjects();syncURL();$('#project-search').focus();});
 $('#show-more').addEventListener('click',()=>{expanded=true;renderProjects();syncURL();document.querySelectorAll('[data-project-open]')[4]?.focus({preventScroll:true});});
 addEventListener('popstate',()=>{readURL();renderProjects();});readURL();renderProjects();
 document.addEventListener('click',event=>{
  const b=event.target.closest('[data-project-open]');if(!b)return;
  const p=projects.find(p=>p.id===b.dataset.projectOpen);if(!p)return;
  $('#detail-title').textContent=p.title;$('#detail-status').textContent=p.status;$('#detail-description').textContent=p.description;
  $('#detail-tags').innerHTML=p.tags.map(t=>`<span>${escape(t)}</span>`).join('');
  $('#detail-links').innerHTML=p.links.length?p.links.map(l=>ext(l.url,l.label)).join(''):ext(`mailto:asadh1521@gmail.com?subject=${encodeURIComponent('Question about '+p.title)}`,'Ask about this project');
  $('#detail-dialog').showModal();
 });
 // Native dialogs provide Escape handling, focus containment and return focus.
 document.querySelectorAll('dialog').forEach(d=>{d.querySelector('.dialog-close').addEventListener('click',()=>d.close());d.addEventListener('click',e=>{if(e.target!==d)return;const r=d.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)d.close();});});
 const architectures={
  fleet:{status:'INTERNSHIP PROJECT',stages:[['Sense','GPS location + RFID driver identity'],['Process','ESP32 firmware + device state'],['Connect','LTE / MQTT → Flask / SQL Server dashboard']],note:'A complete device-to-dashboard path: capture location and driver identity, manage device behavior, and communicate telemetry over cellular connectivity.'},
  semantic:{status:'ONGOING RESEARCH',stages:[['Encode','Input → semantic representation'],['Protect & transmit','FEC → planned radio link'],['Reconstruct','Decode useful information at the receiver']],note:'The final-year project is in progress. Encoder experiments come first; DSP and radio integration are planned. This diagram describes the intended architecture.'},
  battery:{status:'ONGOING RESEARCH',stages:[['Measure','Battery measurements and operating conditions'],['Estimate','Explore state and range estimation methods'],['Understand','Analyze battery behavior and monitoring needs']],note:'A research direction for EV battery management. Circuitry and estimation methods are being explored; this is not a completed, validated BMS product.'}
 };
 function showArchitecture(id){const a=architectures[id];$('#architecture-status').textContent=a.status;$('#architecture-stages').innerHTML=a.stages.map((s,i)=>`<div class="architecture-stage"><span class="stage-num">0${i+1}</span><div><span class="stage-name">${s[0]}</span><span class="stage-detail">${s[1]}</span></div></div>`).join('');$('#architecture-note').textContent=a.note;document.querySelectorAll('[data-architecture]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.architecture===id)));}
 document.querySelectorAll('[data-architecture]').forEach(b=>b.addEventListener('click',()=>showArchitecture(b.dataset.architecture)));showArchitecture('fleet');
 let certArea='all',certExpanded=false;
 function renderCertificates(){const all=certificates.filter(c=>certArea==='all'||(c.category==='internship'?'internship':'course')===certArea);const shown=certExpanded||certArea!=='all'?all:all.slice(0,6);$('#certificate-grid').innerHTML=shown.map(c=>`<button class="certificate-card" data-certificate="${c.id}" aria-label="Open ${escape(c.title)} certificate"><span class="certificate-thumbnail"><img src="/${escape(c.imageUrl)}" alt="${escape(c.org)} certificate" loading="lazy" width="600" height="420"></span><span class="certificate-info"><span class="mono">${escape(c.org)}</span><h3>${escape(c.title)}</h3><p>${escape(c.date)} <span class="certificate-arrow">↗</span></p></span></button>`).join('');$('#more-certificates').hidden=shown.length===all.length;document.querySelectorAll('[data-credential-filter]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.credentialFilter===certArea)));}
 document.querySelectorAll('[data-credential-filter]').forEach(b=>b.addEventListener('click',()=>{certArea=b.dataset.credentialFilter;certExpanded=false;renderCertificates();}));
 $('#more-certificates').addEventListener('click',()=>{certExpanded=true;renderCertificates();$('#certificate-grid').querySelectorAll('button')[6]?.focus({preventScroll:true});});renderCertificates();
 document.addEventListener('click',e=>{const b=e.target.closest('[data-certificate]');if(!b)return;const c=certificates.find(c=>c.id===b.dataset.certificate);if(!c)return;$('#certificate-title').textContent=c.title;$('#certificate-meta').textContent=`${c.org} · ${c.date}${c.credentialId?' · '+c.credentialId:''}`;$('#certificate-image').src='/'+c.imageUrl;$('#certificate-image').alt=`${c.title} — Asad Hussain`;$('#certificate-links').innerHTML=ext('/'+c.imageUrl,'Open full image')+(c.documentUrl?ext('/'+c.documentUrl,'Original PDF'):'')+(c.verifyUrl?ext(c.verifyUrl,'Verify credential'):'');$('#certificate-dialog').showModal();});
 const menu=$('.menu-toggle'),nav=$('#navigation');function closeMenu(){nav.classList.remove('open');menu.setAttribute('aria-expanded','false');}
 menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));nav.classList.toggle('open',open);});
 nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));document.addEventListener('keydown',e=>{if(e.key==='Escape'&&nav.classList.contains('open')){closeMenu();menu.focus();}});
 document.addEventListener('click',e=>{if(!e.target.closest('.site-header'))closeMenu();});
 const observer=new IntersectionObserver(entries=>{entries.forEach(e=>{if(e.isIntersecting){nav.querySelectorAll('a[href^="#"]').forEach(a=>a.classList.toggle('active',a.hash==='#'+e.target.id));}});},{rootMargin:'-20% 0px -60% 0px'});['home','projects','lab','about','credentials','contact'].forEach(id=>observer.observe(document.getElementById(id)));
 $('#copy-email').addEventListener('click',async()=>{try{await navigator.clipboard.writeText('asadh1521@gmail.com');$('#copy-email').textContent='Email copied ✓';$('#contact-status').textContent='Email address copied to clipboard.';}catch{$('#contact-status').textContent='Copy unavailable. Select asadh1521@gmail.com above.';$('#copy-email').textContent='Select the email address above';}});
 const messages=[],log=$('#ai-messages');$('#ai-toggle').addEventListener('click',()=>{$('#ai-panel').showModal();$('#ai-input').focus();});
 function chatMessage(text,role){const p=document.createElement('p');p.className='ai-message ai-message-'+role;p.textContent=text;log.append(p);log.scrollTop=log.scrollHeight;return p;}
 $('#ai-form').addEventListener('submit',async e=>{e.preventDefault();const input=$('#ai-input'),text=input.value.trim();if(!text||$('#ai-send').disabled)return;input.value='';messages.push({role:'user',content:text});chatMessage(text,'user');const pending=chatMessage('Thinking…','bot');$('#ai-send').disabled=true;
  try{const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),25000);let response;try{response=await fetch('/api/chat',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({messages:messages.slice(-9)}),signal:controller.signal});}finally{clearTimeout(timer);}const data=await response.json();if(!response.ok||typeof data.reply!=='string')throw new Error(data.error||'The assistant could not respond.');pending.textContent=data.reply;messages.push({role:'assistant',content:data.reply});}
  catch(error){pending.textContent='The assistant is unavailable right now. Please email asadh1521@gmail.com or explore the project reports.';pending.classList.add('ai-message-error');messages.pop();}
  finally{$('#ai-send').disabled=false;log.scrollTop=log.scrollHeight;input.focus();}
 });
})();
