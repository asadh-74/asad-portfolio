// Keep the original, report-linked cards as the source of truth.
// Filtering works offline and never replaces the page with stale API entries.
(() => {
 const grid=document.querySelector('[data-project-grid]');if(!grid)return;
 const cards=[...grid.querySelectorAll('.project-card')],search=document.getElementById('project-search');
 const buttons=[...document.querySelectorAll('[data-filter]')],count=document.getElementById('project-results-count'),empty=document.getElementById('project-empty');
 let area='all',query='';
 function render(){let visible=0;cards.forEach(card=>{const matches=(area==='all'||card.dataset.area===area)&&card.textContent.toLowerCase().includes(query.toLowerCase().trim());card.hidden=!matches;if(matches){visible++;card.classList.add('active');}});count.textContent=`${visible} of ${cards.length} projects`;empty.hidden=visible>0;buttons.forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.filter===area)));}
 function readURL(){const p=new URLSearchParams(location.search);area=buttons.some(b=>b.dataset.filter===p.get('area'))?p.get('area'):'all';query=p.get('q')||'';search.value=query;render();}
 function updateURL(){const u=new URL(location.href);area==='all'?u.searchParams.delete('area'):u.searchParams.set('area',area);query?u.searchParams.set('q',query):u.searchParams.delete('q');history.replaceState(null,'',u);}
 buttons.forEach(b=>b.addEventListener('click',()=>{area=b.dataset.filter;render();updateURL();}));
 search.addEventListener('input',()=>{query=search.value;render();updateURL();});
 document.getElementById('reset-projects').addEventListener('click',()=>{area='all';query='';search.value='';render();updateURL();search.focus();});
 addEventListener('popstate',readURL);readURL();
})();
