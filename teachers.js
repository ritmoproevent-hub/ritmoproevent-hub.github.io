'use strict';
(()=>{
 const filters=[...document.querySelectorAll('[data-teacher-filter]')];
 const cards=[...document.querySelectorAll('[data-teacher-categories]')];
 const names={all:'Все преподаватели',salsa:'Сальса',bachata:'Бачата',kizomba:'Кизомба',music:'Ритмика и перкуссия'};
 const status=document.getElementById('teachers-result');
 function choose(category,save){
  if(!Object.hasOwn(names,category))category='all';let count=0;
  for(const card of cards){const visible=category==='all'||card.dataset.teacherCategories.split(' ').includes(category);card.hidden=!visible;if(visible)count++}
  for(const filter of filters)if(filter.hasAttribute('aria-pressed'))filter.setAttribute('aria-pressed',String(filter.dataset.teacherFilter===category));
  if(status)status.textContent=names[category]+' · '+count;
  const empty=document.getElementById('teachers-empty');if(empty)empty.hidden=count!==0;
  if(save){const u=new URL(location.href);if(category==='all')u.searchParams.delete('direction');else u.searchParams.set('direction',category);history.replaceState(null,'',u)}
 }
 if(cards.length){choose(new URLSearchParams(location.search).get('direction')||'all',false);filters.forEach(b=>b.addEventListener('click',()=>choose(b.dataset.teacherFilter,true)))}
 document.querySelectorAll('[data-teacher-book]').forEach(b=>b.addEventListener('click',()=>{
  const template=document.getElementById('teacher-book-'+b.dataset.teacherBook);const dialog=document.getElementById('review-dialog');const content=document.getElementById('review-dialog-content');
  if(!template||!dialog||!content)return;content.replaceChildren(template.content.cloneNode(true));dialog.showModal();
 }));
})();
