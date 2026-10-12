/* Previous/next logical section, with a single interruptible eased journey. */
(()=>{'use strict';
 const main=document.querySelector('main');
 if(!main||main.classList.contains('portal-stage'))return;
 const root=document.documentElement,header=document.querySelector('header');
 const reduce=matchMedia('(prefers-reduced-motion: reduce)');
 const copy={"az":["Bölmələr üzrə naviqasiya","Əvvəlki bölmə","Növbəti bölmə"],"fr":["Navigation entre les sections","Section précédente","Section suivante"],
  en:['Section navigation','Previous section','Next section'],
  es:['Navegación por secciones','Sección anterior','Sección siguiente'],
  de:['Abschnittsnavigation','Vorheriger Abschnitt','Nächster Abschnitt'],
  it:['Navigazione tra le sezioni','Sezione precedente','Sezione successiva'],
  ar:['التنقل بين الأقسام','القسم السابق','القسم التالي'],
  ru:['Навигация по разделам','Предыдущий раздел','Следующий раздел'],
  tr:['Bölümler arası gezinme','Önceki bölüm','Sonraki bölüm'],
  zh:['章节导航','上一节','下一节']
 };
 const nav=document.createElement('nav');nav.className='section-elevator';nav.hidden=true;
 const up=document.createElement('button'),down=document.createElement('button');
 up.type=down.type='button';
 up.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 12 5-5 5 5"/></svg>';
 down.innerHTML='<svg viewBox="0 0 20 20" aria-hidden="true"><path d="m5 8 5 5 5-5"/></svg>';
 const status=document.createElement('span');status.className='elevator-status';status.setAttribute('aria-live','polite');status.setAttribute('aria-atomic','true');
 nav.append(up,down,status);document.body.append(nav);
 let frame=0,updateFrame=0,journey=null;
 function locale(){const tag=(root.dataset.locale||root.lang||'en').split('-')[0];return copy[tag]||copy.en}
 function headerOffset(){
  if(!header)return 0;
  const position=getComputedStyle(header).position;
  return position==='sticky'||position==='fixed'?Math.ceil(header.getBoundingClientRect().height):0;
 }
 function stops(){
  const sections=[...main.children].filter(e=>e.tagName==='SECTION'&&!e.hidden&&e.getBoundingClientRect().height>1&&getComputedStyle(e).display!=='none');
  const footer=document.querySelector('body>footer');if(footer&&footer.getBoundingClientRect().height>1)sections.push(footer);
  const max=Math.max(0,document.documentElement.scrollHeight-innerHeight),offset=headerOffset();
  return sections.map(element=>({element,top:Math.max(0,Math.min(max,element.getBoundingClientRect().top+scrollY-offset))})).filter((stop,index,list)=>index===0||Math.abs(stop.top-list[index-1].top)>3);
 }
 function indexAt(list){let at=0;list.forEach((s,i)=>{if(scrollY>=s.top-4)at=i});return at}
 function overlaps(a,b){return a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top}
 function place(){
  // Keep the arrows clear of actual media/form/footer controls and fixed banners.
  const blockers=[...document.querySelectorAll('video,audio,iframe[src*="youtube"],iframe[src*="vimeo"],.proposal-form button,.proposal-form input,.proposal-form textarea,footer a,[data-cookie-banner],.cookie-banner')].filter(e=>!e.hidden&&getComputedStyle(e).visibility!=='hidden').map(e=>e.getBoundingClientRect()).filter(r=>r.width&&r.height&&r.bottom>0&&r.top<innerHeight);
  const right=Math.max(10,innerWidth-nav.getBoundingClientRect().right||10);let bottom=18,clear=false;
  for(;bottom<Math.min(innerHeight*.5,420);bottom+=48){const box={left:innerWidth-right-44,right:innerWidth-right,top:innerHeight-bottom-88,bottom:innerHeight-bottom};if(!blockers.some(r=>overlaps(box,r))){clear=true;break;}}
  nav.style.setProperty('--elevator-bottom',bottom+'px');if(!clear)nav.hidden=true;
 }
 function update(){
  updateFrame=0;const list=stops(),at=journey?Math.max(0,list.findIndex(s=>s.element===journey.element)):indexAt(list),labels=locale();
  const overlay=document.querySelector('dialog[open],[aria-modal="true"]:not([hidden]),.nav.menu-open,.menu-toggle[aria-expanded="true"]');
  nav.hidden=list.length<2||!!overlay||root.scrollHeight<=innerHeight+4;
  nav.setAttribute('aria-label',labels[0]);up.setAttribute('aria-label',labels[1]);up.title=labels[1];down.setAttribute('aria-label',labels[2]);down.title=labels[2];
  up.disabled=!list.length||at===0;down.disabled=!list.length||at===list.length-1;
  if(!nav.hidden)place();
 }
 function schedule(){if(!updateFrame)updateFrame=requestAnimationFrame(update)}
 function cancel(){if(frame)cancelAnimationFrame(frame);frame=0;journey=null;root.classList.remove('elevator-travelling');schedule()}
 function go(direction,event){
  const list=stops();if(list.length<2)return;
  const at=journey?list.findIndex(s=>s.element===journey.element):indexAt(list);
  const index=Math.max(0,Math.min(list.length-1,at+direction));
  const destination=list[index];cancel();
  const start=scrollY,distance=destination.top-start;
  const complete=()=>{
   journey=null;frame=0;root.classList.remove('elevator-travelling');
   const heading=destination.element.querySelector('h1,h2,h3');status.textContent=heading?.textContent.trim()||locale()[direction<0?1:2];
   if(event.detail===0&&heading){if(!heading.hasAttribute('tabindex'))heading.tabIndex=-1;heading.focus({preventScroll:true})}
   update();
  };
  if(reduce.matches||Math.abs(distance)<2){scrollTo({top:destination.top,behavior:'instant'});complete();return}
  journey={element:destination.element};root.classList.add('elevator-travelling');update();
  const duration=Math.min(700,500+Math.abs(distance)*.045);let begun;
  function step(time){
   if(!journey)return;if(begun===undefined)begun=time;
   const t=Math.min(1,(time-begun)/duration),eased=1-Math.pow(1-t,4);
   scrollTo({top:start+distance*eased,behavior:'instant'});
   if(t<1)frame=requestAnimationFrame(step);else complete();
  }
  frame=requestAnimationFrame(step);
 }
 up.addEventListener('click',e=>go(-1,e));down.addEventListener('click',e=>go(1,e));
 addEventListener('scroll',schedule,{passive:true});
 addEventListener('wheel',cancel,{passive:true});addEventListener('touchstart',e=>{if(!nav.contains(e.target))cancel()},{passive:true});
 document.addEventListener('pointerdown',e=>{if(!nav.contains(e.target))cancel()},{passive:true});
 document.addEventListener('click',e=>{if(e.target.closest('a[href]'))cancel()});
 addEventListener('keydown',e=>{if(e.key==='Escape'||(['PageUp','PageDown','Home','End','ArrowUp','ArrowDown',' '].includes(e.key)&&!nav.contains(e.target)))cancel()});
 addEventListener('resize',()=>{cancel();schedule()});addEventListener('pagehide',cancel);
 document.addEventListener('ginova-language',()=>{cancel();schedule()});
 reduce.addEventListener('change',cancel);
 if('ResizeObserver'in window){const observer=new ResizeObserver(schedule);observer.observe(main);if(header)observer.observe(header)}
 if('MutationObserver'in window)new MutationObserver(records=>{if(records.some(record=>!nav.contains(record.target)))schedule()}).observe(document.body,{subtree:true,attributes:true,attributeFilter:['hidden','open','aria-expanded']});
 if(document.fonts?.ready)document.fonts.ready.then(schedule);
 schedule();
})();
