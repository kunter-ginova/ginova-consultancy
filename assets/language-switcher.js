/* Enhance the working native select only after each page's localization is ready. */
(()=>{'use strict';
const host=document.querySelector('.language-switcher'),native=document.getElementById('language-select');
if(!host||!native)return;
const svg=path=>'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">'+path+'</svg>';
const trigger=document.createElement('button');trigger.type='button';trigger.className='language-trigger';trigger.id='language-trigger';trigger.setAttribute('aria-haspopup','menu');trigger.setAttribute('aria-expanded','false');trigger.setAttribute('aria-controls','language-menu');
trigger.innerHTML=svg('<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z"/>')+'<span class="language-current language-name"></span>'+svg('<path d="m6 9 6 6 6-6"/>');
trigger.firstElementChild.classList.add('language-globe');trigger.lastElementChild.classList.add('language-chevron');
const current=trigger.querySelector('.language-current'),panel=document.createElement('div');panel.className='language-panel';panel.id='language-menu';panel.hidden=true;panel.dataset.languageTheme=host.dataset.languageTheme;panel.setAttribute('role','menu');panel.setAttribute('aria-labelledby','language-heading');
const heading=document.createElement('div');heading.className='language-heading';heading.id='language-heading';heading.setAttribute('role','presentation');panel.append(heading);
const options=Array.from(native.options).map(option=>{
 const button=document.createElement('button');button.type='button';button.className='language-option';button.dataset.language=option.value;button.setAttribute('role','menuitemradio');button.setAttribute('aria-checked','false');button.tabIndex=-1;
 const name=document.createElement('span');name.className='language-name';name.lang=option.lang;name.dir=option.dir;name.textContent=option.textContent;
 const code=document.createElement('span');code.className='language-code';code.dir='ltr';code.textContent=option.value.toUpperCase();code.setAttribute('aria-hidden','true');
 button.append(name,code);button.insertAdjacentHTML('beforeend',svg('<path d="m5 12 4 4L19 6"/>'));button.lastElementChild.classList.add('language-check');panel.append(button);return button;
});
let opened=false,active=0,search='',searchTimer=0;
const focusOption=index=>{active=(index+options.length)%options.length;options.forEach((option,i)=>option.tabIndex=i===active?0:-1);options[active].focus({preventScroll:true});options[active].scrollIntoView({block:'nearest'})};
function position(){
 if(!opened)return;
 const rect=trigger.getBoundingClientRect(),viewport=window.visualViewport;
 const left=viewport?.offsetLeft||0,top=viewport?.offsetTop||0,width=viewport?.width||innerWidth,height=viewport?.height||innerHeight;
 const margin=12,gap=8,panelWidth=Math.min(232,width-margin*2),rtl=document.documentElement.dir==='rtl';
 panel.style.width=panelWidth+'px';
 panel.style.left=Math.max(left+margin,Math.min(rtl?rect.left:rect.right-panelWidth,left+width-panelWidth-margin))+'px';
 const below=top+height-rect.bottom-gap-margin,above=rect.top-top-gap-margin;
 const upward=below<300&&above>below;
 panel.style.maxHeight=Math.max(96,upward?above:below)+'px';
 panel.style.top=upward?Math.max(top+margin,rect.top-gap-panel.getBoundingClientRect().height)+'px':rect.bottom+gap+'px';
}
function sync(){
 const option=native.selectedOptions[0]||native.options[0],label=native.getAttribute('aria-label')||'Language';
 current.textContent=option.textContent;current.lang=option.lang;current.dir=option.dir;
 trigger.setAttribute('aria-label',label+': '+option.textContent);heading.textContent=label;panel.dir=document.documentElement.dir||'ltr';
 options.forEach(button=>button.setAttribute('aria-checked',String(button.dataset.language===option.value)));
 position();
}
function close(returnFocus=false){
 if(!opened)return;opened=false;panel.hidden=true;trigger.setAttribute('aria-expanded','false');options.forEach(option=>option.tabIndex=-1);search='';clearTimeout(searchTimer);
 if(returnFocus)trigger.focus({preventScroll:true});
}
function open(edge){
 opened=true;panel.hidden=false;trigger.setAttribute('aria-expanded','true');sync();
 const selected=options.findIndex(option=>option.dataset.language===native.value);focusOption(edge==='first'?0:edge==='last'?options.length-1:Math.max(0,selected));
}
trigger.addEventListener('click',()=>opened?close():open());
trigger.addEventListener('keydown',event=>{
 if(['ArrowDown','ArrowUp','Home','End'].includes(event.key)){event.preventDefault();open(event.key==='Home'?'first':event.key==='End'?'last':undefined)}
});
options.forEach(button=>button.addEventListener('click',()=>{
 native.value=button.dataset.language;native.dispatchEvent(new Event('change',{bubbles:true}));sync();close(true);
}));
panel.addEventListener('keydown',event=>{
 const index=options.indexOf(document.activeElement);let next=null;
 if(event.key==='ArrowDown')next=index+1;else if(event.key==='ArrowUp')next=index-1;else if(event.key==='Home')next=0;else if(event.key==='End')next=options.length-1;
 if(next!==null){event.preventDefault();focusOption(next);return}
 if(event.key==='Tab'){close(true);return}
 if(event.key.length!==1||event.ctrlKey||event.altKey||event.metaKey||event.key===' ')return;
 const normalize=value=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLocaleLowerCase();
 search+=normalize(event.key);clearTimeout(searchTimer);searchTimer=setTimeout(()=>search='',600);
 const match=options.findIndex(option=>normalize(option.querySelector('.language-name').textContent).startsWith(search)||option.dataset.language.startsWith(search));
 if(match>=0){event.preventDefault();focusOption(match)}
});
// Capture Escape before the containing navigation menu handles it.
document.addEventListener('keydown',event=>{if(opened&&event.key==='Escape'){event.preventDefault();event.stopPropagation();close(true)}},true);
document.addEventListener('pointerdown',event=>{if(!host.contains(event.target)&&!panel.contains(event.target))close(panel.contains(document.activeElement))});
document.addEventListener('focusin',event=>{if(!host.contains(event.target)&&!panel.contains(event.target))close()});
document.addEventListener('ginova-language',sync);
addEventListener('popstate',()=>{sync();close(panel.contains(document.activeElement))});addEventListener('pagehide',()=>close());addEventListener('blur',()=>close());
addEventListener('resize',position,{passive:true});addEventListener('scroll',position,{passive:true,capture:true});
window.visualViewport?.addEventListener('resize',position);window.visualViewport?.addEventListener('scroll',position);
native.addEventListener('change',sync);host.append(trigger);document.body.append(panel);sync();native.hidden=true;
})();
