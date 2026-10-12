/* Consultancy: muted autoplay + continuous loop, human-controlled sound.
   No session gate, storage, tracking, or change to the other branches' films. */
(()=>{'use strict';
const film=document.querySelector('[data-welcome-base]');if(!film)return;
const video=film.querySelector('video'),play=film.querySelector('[data-welcome-play]'),pause=film.querySelector('[data-welcome-pause]'),sound=film.querySelector('[data-welcome-sound]'),status=film.querySelector('.welcome-status');
const reduced=matchMedia('(prefers-reduced-motion: reduce)');let state='ready',manualPause=false,inView=true;
video.loop=true;video.muted=true;video.defaultMuted=true;video.playsInline=true;
if(reduced.matches)video.removeAttribute('autoplay');
function render(){const locale=GinovaI18n.current(),t=GinovaI18n.runtime[locale];play.textContent=t.play;pause.textContent=t.pause;sound.textContent=video.muted?t.unmute:t.mute;sound.setAttribute('aria-pressed',String(video.muted));status.hidden=state==='playing';status.textContent=state==='playing'?'':t[state]||t.ready;}
function load(){if(!video.getAttribute('src')){video.src=film.dataset.welcomeBase+'decision.mp4';video.load();}}
async function start(manual=false){if(!manual&&(reduced.matches||document.hidden||manualPause||!inView))return;load();if(video.ended)video.currentTime=0;if(manual){manualPause=false;video.muted=false;}try{await video.play()}catch(e){state='blocked';render();}}
play.addEventListener('click',()=>start(true));pause.addEventListener('click',()=>{manualPause=true;video.pause()});sound.addEventListener('click',()=>{video.muted=!video.muted;render()});
video.addEventListener('play',()=>{document.querySelectorAll('audio,video').forEach(other=>{if(other!==video)other.pause()});state='playing';render()});video.addEventListener('pause',()=>{state='paused';render()});video.addEventListener('error',()=>{state='error';render()});video.addEventListener('volumechange',render);
document.querySelectorAll('audio,video').forEach(other=>{if(other!==video)other.addEventListener('play',()=>{manualPause=true;video.pause()})});
document.addEventListener('visibilitychange',()=>{if(document.hidden)video.pause();else start()});addEventListener('pagehide',()=>video.pause());addEventListener('pageshow',()=>start());reduced.addEventListener('change',()=>{if(reduced.matches){video.removeAttribute('autoplay');video.pause()}else{video.setAttribute('autoplay','');start()}});
if('IntersectionObserver'in window)new IntersectionObserver(entries=>{inView=entries.some(entry=>entry.isIntersecting);if(inView)start();else video.pause()},{threshold:.1}).observe(film);
new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});
// Deep links into secondary material open their containing disclosure, without losing URL state.
function revealHash(){let target;try{target=document.getElementById(decodeURIComponent(location.hash.slice(1)))}catch(e){}if(!target)return;let parent=target.parentElement;while(parent){if(parent.tagName==='DETAILS')parent.open=true;parent=parent.parentElement}}
addEventListener('hashchange',revealHash);revealHash();render();start();
})();
