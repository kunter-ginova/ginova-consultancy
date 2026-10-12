(()=>{'use strict';
const button=document.querySelector('[data-header-contact]');
if(!button)return;
const labels={"az":"Əlaqə","fr":"Contact",en:'Contact',es:'Contacto',de:'Kontakt',it:'Contatti',ar:'تواصل معنا',ru:'Связаться',tr:'İletişim',zh:'联系'};
function update(){const code=document.documentElement.lang.split('-')[0];const label=labels[code]||labels.en;button.setAttribute('aria-label',label);button.setAttribute('title',label);button.querySelector('.header-contact-tooltip').textContent=label;}
update();document.addEventListener('ginova-language',update);document.getElementById('language-select')?.addEventListener('change',update);addEventListener('pageshow',update);
})();
