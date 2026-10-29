'use strict';
(()=>{
 const dlg=document.getElementById('review-dialog');const body=document.getElementById('review-dialog-content');
 function show(content){body.replaceChildren();if(typeof content==='string'){const p=document.createElement('p');p.textContent=content;body.append(p)}else body.append(content);dlg.showModal()}
 function order(){show('Это локальная копия для обсуждения сайта. Отправка заявок отключена; данные никуда не отправляются.')}
 document.getElementById('review-close').addEventListener('click',()=>dlg.close());
 dlg.addEventListener('click',e=>{if(e.target===dlg){const r=dlg.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dlg.close()}});
 document.addEventListener('submit',e=>{e.preventDefault();order()});
 document.addEventListener('click',e=>{
  const lesson=e.target.closest('[data-lesson]');if(lesson){const t=document.getElementById('lesson-'+lesson.dataset.lesson);if(t)show(t.content.cloneNode(true));return}
  const orderButton=e.target.closest('.order-btn,.review-disabled-order,.msg-btn');if(orderButton){e.preventDefault();order();return}
  const video=e.target.closest('[data-video]');if(video){e.preventDefault();const f=document.createElement('iframe');f.src=video.dataset.video;f.title='Видео Сальса Плюс';f.className='review-video-player';f.allow='fullscreen; picture-in-picture';f.referrerPolicy='strict-origin-when-cross-origin';f.setAttribute('allowfullscreen','');video.replaceWith(f);return}
  if(e.target.closest('#show-mobile-menu')){e.preventDefault();document.getElementById('mob-menu')?.classList.add('review-menu-open');return}
  if(e.target.closest('#mob-menu .close')){document.getElementById('mob-menu')?.classList.remove('review-menu-open');return}
  const go=e.target.closest('.goto');if(go){const target=document.getElementById(go.dataset.href);if(target){e.preventDefault();target.scrollIntoView()}}
 });
 const slides=[...document.querySelectorAll('.review-banner')];if(slides.length>1){let at=0;const controls=document.createElement('div');controls.className='review-banner-controls';for(const [label,delta] of [['←',-1],['→',1]]){const b=document.createElement('button');b.type='button';b.textContent=label;b.setAttribute('aria-label',delta<0?'Предыдущий баннер':'Следующий баннер');b.onclick=()=>{slides[at].style.display='none';at=(at+delta+slides.length)%slides.length;slides[at].style.display='block'};controls.append(b)}slides[0].parentElement.append(controls)}
 document.querySelectorAll('.review-morning').forEach(b=>b.addEventListener('click',()=>{const open=b.getAttribute('aria-expanded')!=='true';b.setAttribute('aria-expanded',String(open));b.textContent=open?'Вечернее расписание':'Утреннее расписание';b.closest('.review-timetable').classList.toggle('review-show-morning',open)}));
 document.getElementById('show-mobile-menu')?.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('mob-menu')?.classList.add('review-menu-open')}});
 const filters=[...document.querySelectorAll('[data-schedule-filter]')];const slots=[...document.querySelectorAll('.review-slot')];
 const attr={PREPOD:'prepod',LEVEL:'level',STYLE_FILTR:'styleFiltr',TYPE:'type'};
 function filter(){for(const slot of slots){slot.hidden=!filters.every(f=>!f.value||(slot.dataset[attr[f.dataset.scheduleFilter]]||'').split(' ').includes(f.value))}}
 const query=new URLSearchParams(location.search);for(const f of filters){const key=f.dataset.scheduleFilter;const value=key==='PREPOD'?query.get('prepod'):key==='STYLE_FILTR'?query.get('style'):null;if(value&&[...f.options].some(o=>o.value===value))f.value=value;f.addEventListener('change',filter)}filter();
 document.getElementById('review-reset')?.addEventListener('click',()=>{filters.forEach(f=>f.value='');filter()});
 const search=document.getElementById('review-search');if(search){const rows=[...document.querySelectorAll('#review-page-index li')];const count=document.getElementById('review-search-count');function update(){const q=search.value.toLocaleLowerCase('ru');let n=0;for(const row of rows){row.hidden=!row.textContent.toLocaleLowerCase('ru').includes(q);if(!row.hidden)n++}count.textContent='Найдено страниц: '+n}search.addEventListener('input',update);update()}
 // Only the local preview server is queried. A changed page or stylesheet refreshes this tab.
 /* Local refresh removed for hosted preview. */
})();

// Section edges are defined by the shared CSS container, independent of the logo.

(function(){function sizeDirectionNav(){var hero=document.querySelector('.directions-intro .dp-hero');if(!hero)return;var nav=hero.querySelector('.dp-index-wrap'),actions=hero.querySelector('.dp-actions');if(!nav||!actions)return;var height=actions.getBoundingClientRect().bottom-nav.getBoundingClientRect().top;if(height>0)hero.style.setProperty('--direction-nav-height',height+'px');}window.addEventListener('resize',sizeDirectionNav);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sizeDirectionNav);else sizeDirectionNav();if(document.fonts)document.fonts.ready.then(sizeDirectionNav);})();

(function(){function fitAppCopy(){document.querySelectorAll('.hp-app-panel').forEach(function(panel){var features=panel.querySelector('.hp-app-features');if(features)panel.style.setProperty('--app-copy-height',features.getBoundingClientRect().height+'px');});}window.addEventListener('resize',fitAppCopy);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',fitAppCopy);else fitAppCopy();if(document.fonts)document.fonts.ready.then(fitAppCopy);})();

(function(){function bindTeamScroll(){var track=document.getElementById('home-teacher-carousel');if(!track)return;var buttons=document.querySelectorAll('[data-team-scroll]');function update(){buttons.forEach(function(b){b.disabled=b.getAttribute('data-team-scroll')==='-1'?track.scrollLeft<=1:track.scrollLeft+track.clientWidth>=track.scrollWidth-1;});}buttons.forEach(function(b){b.addEventListener('click',function(){track.scrollBy({left:Number(b.getAttribute('data-team-scroll'))*track.clientWidth,behavior:window.matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth'});});});track.addEventListener('scroll',update);window.addEventListener('resize',update);update();}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',bindTeamScroll);else bindTeamScroll();})();
