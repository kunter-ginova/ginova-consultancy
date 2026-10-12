/* Keep chapter sizing and anchor placement tied to the real sticky header.
   ResizeObserver also covers translated labels, font loading and text zoom. */
(()=>{'use strict';
  const root=document.documentElement,header=document.querySelector('header');
  if(!header)return;
  let height=0,frame=0;
  function measure(){
    frame=0;
    const next=Math.ceil(header.getBoundingClientRect().height);
    if(next>0&&next!==height){height=next;root.style.setProperty('--ds-header-height',next+'px')}
  }
  function schedule(){if(!frame)frame=requestAnimationFrame(measure)}
  measure();
  if('ResizeObserver' in window)new ResizeObserver(schedule).observe(header);
  window.addEventListener('resize',schedule,{passive:true});
  window.addEventListener('pageshow',schedule);
  document.addEventListener('ginova-language',schedule);
  if(document.fonts?.ready)document.fonts.ready.then(schedule);
})();
