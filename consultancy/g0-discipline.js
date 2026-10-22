/* Only the homepage loads this enhancement; no client records, storage or network. */
(()=>{'use strict';
 const section=document.getElementById('g0-discipline');if(!section)return;
 function render(){
  const lang=(document.documentElement.dataset.locale||document.documentElement.lang||'en').split('-')[0];
  const words=window.GinovaDisciplineCopy?.[lang]||window.GinovaDisciplineCopy?.en;if(!words)return;
  section.querySelectorAll('[data-discipline]').forEach(el=>{const text=words[el.dataset.discipline];if(typeof text==='string')el.textContent=text});
  section.querySelectorAll('[data-route]').forEach(el=>window.GinovaI18n?.route(el,lang));
 }
 document.addEventListener('ginova-language',render);render();
})();
