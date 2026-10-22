/* Consultancy content controls. Local drafts only; no requests or storage. */
(()=>{'use strict';
 const root=document.documentElement;
 let lang=GinovaI18n.initial(),service=0,proposal=0;
 const $=id=>document.getElementById(id),words=()=>D[lang].s;
 const closeMenu=()=>{document.querySelector('.nav').classList.remove('menu-open');document.querySelector('.menu-toggle').setAttribute('aria-expanded','false')};
 window.goStart=()=>{closeMenu();$('start').scrollIntoView();const h=$('start').querySelector('h2');h.tabIndex=-1;h.focus({preventScroll:true})};
 function bindTabs(kind,items,selected){
  const host=$(kind+'-tabs'),picker=$(kind+'-select');host.replaceChildren();picker.replaceChildren();
  items.forEach((item,i)=>{
   const button=document.createElement('button');button.type='button';button.id=kind+'-tab-'+i;button.setAttribute('role','tab');button.setAttribute('aria-selected',String(i===selected));button.setAttribute('aria-controls',kind+'-panel');button.tabIndex=i===selected?0:-1;
   const number=document.createElement('span');number.className='tab-number';number.setAttribute('aria-hidden','true');number.textContent=String(i+1).padStart(2,'0');
   const label=document.createElement('span');label.textContent=item.name;button.append(number,label);
   button.addEventListener('click',()=>choose(kind,i,true));button.addEventListener('keydown',event=>{
    const key=GinovaI18n.key(event);let next;
    if(['ArrowRight','ArrowDown'].includes(key))next=selected+1;else if(['ArrowLeft','ArrowUp'].includes(key))next=selected-1;else if(key==='Home')next=0;else if(key==='End')next=items.length-1;else return;
    event.preventDefault();choose(kind,(next+items.length)%items.length,true);
   });host.append(button);
   const option=document.createElement('option');option.value=String(i);option.textContent=item.name;option.selected=i===selected;picker.append(option);
  });
  $(kind+'-panel').setAttribute('aria-labelledby',kind+'-tab-'+selected);
  $(kind+'-name').dataset.t=kind+'s.'+selected+'.name';$(kind+'-name').textContent=items[selected].name;$(kind+'-body').textContent=items[selected].body;
  document.querySelector('.'+kind+'-index').textContent=String(selected+1).padStart(2,'0')+' / '+String(items.length).padStart(2,'0');
  if(kind==='service'){$('service-output').textContent=items[selected].output;$('service-responsibility').textContent=items[selected].responsibility;}
 }
 function choose(kind,index,focus=false){if(kind==='service')service=index;else proposal=index;renderTabs();if(focus)$(kind+'-tab-'+index).focus({preventScroll:true})}
 function renderTabs(){bindTabs('service',words().services,service)}
 $('service-select').addEventListener('change',e=>choose('service',Number(e.target.value)));
 // Unapproved proposal section removed; no missing-element listener.
 function render(){
  GinovaI18n.apply(lang);root.dataset.locale=lang;
  const t=words();document.querySelectorAll('[data-t]').forEach(el=>{if(typeof t[el.dataset.t]==='string')el.textContent=t[el.dataset.t]});
  document.querySelectorAll('[data-t-html]').forEach(el=>{if(typeof t[el.dataset.tHtml]==='string')el.innerHTML=t[el.dataset.tHtml]});
  document.querySelectorAll('[data-alt]').forEach(el=>el.alt=t[el.dataset.alt]);document.querySelectorAll('[data-aria]').forEach(el=>el.setAttribute('aria-label',t[el.dataset.aria]));
  document.querySelectorAll('[data-route]').forEach(el=>GinovaI18n.route(el,lang));
  document.querySelector('meta[name=description]').content=t.meta;document.title=t['branch.name'];
  $('primaryNav').setAttribute('aria-label',GinovaI18n.runtime[lang].primary);document.querySelector('.brand').setAttribute('aria-label',GinovaI18n.portal[lang].homeLabel);
  renderTabs();document.dispatchEvent(new Event('ginova-language'));
 }
 $('language-select').addEventListener('change',e=>{lang=e.target.value;GinovaI18n.navigate(lang);render()});
 addEventListener('popstate',()=>{lang=GinovaI18n.initial();render()});
 const menu=document.querySelector('.menu-toggle');menu.addEventListener('click',()=>{const open=menu.getAttribute('aria-expanded')!=='true';menu.setAttribute('aria-expanded',String(open));document.querySelector('.nav').classList.toggle('menu-open',open)});
 document.querySelectorAll('.navlinks a').forEach(a=>a.addEventListener('click',closeMenu));
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&menu.getAttribute('aria-expanded')==='true'){closeMenu();menu.focus();e.preventDefault()}});
 document.addEventListener('pointerdown',e=>{if(menu.getAttribute('aria-expanded')==='true'&&!e.target.closest('header,.language-panel'))closeMenu()});
 const compact=matchMedia('(max-width:900px), (max-height:700px)'),film=document.querySelector('.welcome-film');
 function filmPlacement(){const host=compact.matches?document.querySelector('.welcome-mobile-host'):document.querySelector('.hero-media');if(film.parentElement!==host)host.append(film);$('welcome-chapter').hidden=!compact.matches;document.dispatchEvent(new Event('ginova-language'))}
 compact.addEventListener('change',filmPlacement);
 const narrow=matchMedia('(max-width:900px)'),motion=document.querySelector('.motion-demo'),motionOrigin=document.getElementById('ds-intelligence');
 function motionPlacement(){const host=narrow.matches?document.querySelector('.workflow-mobile-host'):motionOrigin;if(motion.parentElement!==host)host.append(motion);$('workflow-chapter').hidden=!narrow.matches;document.dispatchEvent(new Event('ginova-language'))}
 narrow.addEventListener('change',motionPlacement);
 // Homepage-only guided intake owns the local email-draft interaction.
 document.querySelectorAll('audio,video').forEach(media=>{media.addEventListener('play',()=>document.querySelectorAll('audio,video').forEach(other=>{if(other!==media)other.pause()}));media.addEventListener('error',()=>{const box=media.parentElement.querySelector('.media-error');if(box)box.hidden=false})});
 render();filmPlacement();motionPlacement();
})();
