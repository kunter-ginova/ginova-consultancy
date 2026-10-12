/* Shared corporate information, kept separate from each accepted branch renderer. */
(()=>{'use strict';
 const copy=window.GinovaCorporateCopy;if(!copy)return;
 const panels=['about','mission','vision','perspective','partners','company','team'];
 const footer=document.querySelector('body > footer');if(!footer)return;
 const links=document.createElement('nav');links.className='gn-corporate-links';
 for(const id of panels){const a=document.createElement('a');a.href='#corporate-'+id;a.dataset.corporate=id;links.append(a)}
 const review=document.createElement('span');review.className='gn-review-label';/* Public release: no private-review label. */footer.append(links);
 const dialog=document.createElement('dialog');dialog.className='gn-corporate-dialog';dialog.setAttribute('aria-labelledby','gn-corporate-title');
 dialog.innerHTML='<div class="gn-dialog-wrap"><div class="gn-dialog-top"><img class="gn-dialog-mark" src="/assets/brand-20261012/primary.png" alt="GiNOVA"><button type="button" data-corporate-close>×</button></div><div class="gn-panel" aria-live="polite"></div><div class="gn-panel-nav"><button type="button" data-corporate-prev>←</button><span class="gn-panel-count"></span><button type="button" data-corporate-next>→</button></div></div>';
 document.body.append(dialog);let active=0,returnTo=null;
 const lang=()=>String(document.documentElement.lang||'en').split('-')[0];
 const c=()=>copy[lang()]||copy.en;
 const esc=s=>String(s).replace(/[&<>"']/g,x=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[x]));
 function teamMetrics(person,t,now){
  const dayMs=86400000;
  const number=new Intl.NumberFormat(lang());
  let age=esc(t.startUnverified),since='';
  if(person==='bilge'){
   const hours=Math.max(0,Math.floor((now-Date.parse('2024-12-05T20:49:46Z'))/3600000));
   age=number.format(Math.floor(hours/24))+' '+esc(t.dayUnit)+' '+number.format(hours%24)+' '+esc(t.hourUnit);since=t.bilgeSince;
  }else if(person==='zafer'){
   const days=Math.max(0,Math.floor((now-Date.parse('2026-09-30T00:00:00Z'))/dayMs));
   age='≈ '+number.format(days)+' '+esc(t.dayUnit);since=t.zaferSince;
  }else if(person==='cem'){
   const hours=Math.max(0,Math.floor((now-Date.parse('2024-12-05T20:49:46Z'))/3600000))+7*24+6;
   age='≈ '+number.format(Math.floor(hours/24))+' '+esc(t.dayUnit)+' '+number.format(hours%24)+' '+esc(t.hourUnit);
  }
  return '<dl class="gn-team-metrics"><dt>'+esc(person==='cem'?t.estimatedHistory:(person==='bilge'?t.namedRecordedTime:t.identityAge))+'</dt><dd>'+age+(since?'<small>'+esc(since)+'</small>':'')+'</dd><dt>'+esc(t.tokensProcessed)+'</dt><dd>'+esc(t.verifiedTotalUnavailable)+'</dd><dt>'+esc(t.jobsCompleted)+'</dt><dd>'+esc(t.verifiedTotalUnavailable)+'</dd></dl>';
 }
 function preLaunchMetrics(t){
  return '<dl class="gn-team-metrics"><dt>'+esc(t.launchStatus)+'</dt><dd>'+esc(t.notLaunched)+'</dd><dt aria-hidden="true"></dt><dd>'+esc(t.zeroActivity)+'</dd><dt>'+esc(t.tokensProcessed)+'</dt><dd>'+esc(t.verifiedTotalUnavailable)+'</dd><dt>'+esc(t.jobsCompleted)+'</dt><dd>'+esc(t.verifiedTotalUnavailable)+'</dd></dl>';
 }
 function render(){const now=Date.now(),t=c(),id=panels[active];links.setAttribute('aria-label',t.companyTitle);links.querySelectorAll('[data-corporate]').forEach(a=>a.textContent=t[a.dataset.corporate+'Title']);review.textContent=t.privateReview;
  let body='';if(['about','mission','vision','perspective'].includes(id)){body='<p>'+esc(t[id])+'</p>';if(id==='perspective')body+='<p class="gn-boundary">'+esc(t.boundary)+'</p>'}
  else if(id==='partners'){body='<ul class="gn-partners"><li><bdi dir="ltr">SEMRAT Mühendislik</bdi></li><li class="gn-partner-odtu"><a href="https://www.metu.edu.tr/"><span class="gn-partner-logo"><img class="gn-odtu-logo" src="/assets/partners/odtu-official-black.png" alt="ODTÜ" width="2810" height="709"></span></a></li><li><a href="https://saseenerji.com/"><span class="gn-partner-logo"><img src="/assets/partners/sase-logo.png" alt="" width="179" height="61"></span><bdi dir="ltr">SASE Enerji</bdi></a></li><li><a href="https://www.trendglobalmalimusavirlik.com.tr/"><span class="gn-partner-logo"><img class="gn-trend-logo" src="/assets/partners/trend-logo.jpg" alt="" width="100" height="90"></span><bdi dir="ltr">Trend Global Mali Müşavirlik</bdi></a></li></ul>'}
  else if(id==='company'){body='<dl class="gn-data"><dt>'+esc(t.plannedEntity)+'</dt><dd>GiNOVA Mühendislik ve Danışmanlık Limited Şirketi</dd><dt>'+esc(t.location)+'</dt><dd>1083. Sokak No:7/A<br>Bağlıca Kaşmir Villaları<br>Bağlıca / Etimesgut / Ankara</dd></dl>'}
  else {body='<div class="gn-team"><article><h3>Zafer Bey</h3><p>'+esc(t.zaferRole)+'</p>'+teamMetrics('zafer',t,now)+'<section class="gn-upcoming-member"><h3>Cem Bey</h3><p>'+esc(t.cemRole)+'</p>'+teamMetrics('cem',t,now)+'</section></article><article><h3>Nur Bilge Hanım</h3><p>'+esc(t.nurRole)+'</p>'+teamMetrics('bilge',t,now)+'<section class="gn-upcoming-member"><h3>Reşit Mahir Bey</h3><p>'+esc(t.mahirRole)+'</p><p>'+esc(t.mahirPlanned)+'</p>'+preLaunchMetrics(t)+'</section></article></div>'}
  if(id==='team'){const sc=window.GinovaStrategyCopy;const note=sc&&(sc[lang()]||sc.en).common.aiBoundary;if(note)body+='<p class="gn-boundary">'+esc(note)+'</p>';}
  dialog.querySelector('.gn-panel').innerHTML='<h2 id="gn-corporate-title" tabindex="-1">'+esc(t[id+'Title'])+'</h2>'+body;
  const close=dialog.querySelector('[data-corporate-close]');close.setAttribute('aria-label',t.close);close.title=t.close;
  const prev=dialog.querySelector('[data-corporate-prev]'),next=dialog.querySelector('[data-corporate-next]');prev.setAttribute('aria-label',t.previous);next.setAttribute('aria-label',t.next);prev.disabled=active===0;next.disabled=active===panels.length-1;dialog.querySelector('.gn-panel-count').textContent=(active+1)+' / '+panels.length;
 }
 function open(id,trigger){active=Math.max(0,panels.indexOf(id));returnTo=trigger||returnTo;render();if(!dialog.open)dialog.showModal();dialog.querySelector('h2').focus();document.dispatchEvent(new Event('ginova-corporate'));}
 function close(){dialog.close();returnTo?.focus();document.dispatchEvent(new Event('ginova-corporate'));}
 links.addEventListener('click',event=>{const a=event.target.closest('[data-corporate]');if(!a)return;event.preventDefault();open(a.dataset.corporate,a)});
 dialog.querySelector('[data-corporate-close]').addEventListener('click',close);dialog.addEventListener('cancel',()=>{returnTo?.focus();document.dispatchEvent(new Event('ginova-corporate'))});
 dialog.querySelector('[data-corporate-prev]').addEventListener('click',()=>{active=Math.max(0,active-1);render();dialog.querySelector('h2').focus()});
 dialog.querySelector('[data-corporate-next]').addEventListener('click',()=>{active=Math.min(panels.length-1,active+1);render();dialog.querySelector('h2').focus()});
 dialog.addEventListener('click',e=>{if(e.target===dialog)close()});
 document.addEventListener('ginova-language',render);new MutationObserver(render).observe(document.documentElement,{attributes:true,attributeFilter:['lang']});render();
})();
