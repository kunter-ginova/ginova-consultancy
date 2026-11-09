(function(){
'use strict';
/* opening: plays once at load (decided in <head>); any input skips it */
var root=document.documentElement,end=0;
function finishIntro(){clearTimeout(end);root.classList.remove('intro-play');root.classList.add('intro-skip')}
if(root.classList.contains('intro-play')){
  end=setTimeout(function(){root.classList.remove('intro-play')},2800);
  ['wheel','touchstart','keydown'].forEach(function(ev){addEventListener(ev,function once(){removeEventListener(ev,once);setTimeout(function(){if(root.classList.contains('intro-play'))finishIntro()},400)},{passive:true})});
}
/* the blue card steps aside when the shared footer arrives */
var ft=document.getElementById('gn-contact');
if(ft&&'IntersectionObserver' in window) new IntersectionObserver(function(es){document.body.classList.toggle('at-foot',es[0].isIntersecting)},{threshold:0,rootMargin:'0px 0px -35% 0px'}).observe(ft);
/* method steps: tabs with arrow-key support; text comes from the page dictionary so it follows the language */
var tabs=[].slice.call(document.querySelectorAll('#steps [role=tab]'));
var panel=document.getElementById('stepPanel'),tt=document.getElementById('stepTitle'),tb=document.getElementById('stepBody'),fill=document.getElementById('trackFill');
var cur=0;
function paintStep(){tt.textContent=GN.t('step.'+cur+'.t');tb.textContent=GN.t('step.'+cur+'.b')}
function pick(i,focus){
  cur=i;
  tabs.forEach(function(t,k){t.setAttribute('aria-selected',k===i);t.tabIndex=k===i?0:-1});
  paintStep();
  panel.setAttribute('aria-labelledby','t'+i);
  fill.style.width=((i+1)*20)+'%';
  if(focus)tabs[i].focus();
}
tabs.forEach(function(t,i){
  t.addEventListener('click',function(){pick(i)});
  t.addEventListener('keydown',function(e){
    var n=-1;
    if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%tabs.length;
    else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+tabs.length-1)%tabs.length;
    else if(e.key==='Home')n=0;else if(e.key==='End')n=tabs.length-1;
    if(n>=0){e.preventDefault();pick(n,true)}
  });
});
if(tabs.length){pick(0);GN.onLang(paintStep)}

/* tab sets with static panels: every panel's text is in the HTML, so crawlers read all of it */
[].slice.call(document.querySelectorAll('[data-tabset]')).forEach(function(set){
  var ts=[].slice.call(set.querySelectorAll('[role=tab]'));
  var show=function(i,focus){ts.forEach(function(t,k){var on=k===i;t.setAttribute('aria-selected',on);t.tabIndex=on?0:-1;t.getAttribute('aria-controls').split(' ').forEach(function(id){document.getElementById(id).hidden=!on})});if(focus)ts[i].focus();set.dispatchEvent(new CustomEvent('gn-tab',{detail:i}))};
  ts.forEach(function(t,i){
    t.addEventListener('click',function(){show(i)});
    t.addEventListener('keydown',function(e){var n=-1;
      if(e.key==='ArrowRight'||e.key==='ArrowDown')n=(i+1)%ts.length;else if(e.key==='ArrowLeft'||e.key==='ArrowUp')n=(i+ts.length-1)%ts.length;else if(e.key==='Home')n=0;else if(e.key==='End')n=ts.length-1;
      if(n>=0){e.preventDefault();show(n,true)}});
  });
  show(0);
});

/* welcome film: optional, opens on request in a native dialog (focus trap, Escape and backdrop come with it); never autoplays */
var fo=document.getElementById('filmOpen'),fd=document.getElementById('filmDlg'),fv=document.getElementById('filmVideo'),fc=document.getElementById('filmClose');
if(fo&&fd&&fv){
  fo.addEventListener('click',function(){if(fd.showModal)fd.showModal();else fd.setAttribute('open','');var pr=fv.play();if(pr&&pr.catch)pr.catch(function(){})});
  var fclose=function(){fv.pause();if(fd.open)fd.close()};
  if(fc)fc.addEventListener('click',fclose);
  fd.addEventListener('click',function(e){if(e.target===fd)fclose()});
  fd.addEventListener('close',function(){fv.pause();fo.focus()});
}
/* request form: opens a draft in the visitor's own email app (nothing is sent or stored here). With a calendar link in
   window.GN_BOOKING_URL the same button books a call instead. */
var startBtn=document.getElementById('startBtn');
function paintBtn(){if(startBtn)startBtn.textContent=GN.t(window.GN_BOOKING_URL?'start.book':'start.btn')}
paintBtn();GN.onLang(paintBtn);
document.getElementById('startForm').addEventListener('submit',function(e){
  e.preventDefault();
  if(window.GN_BOOKING_URL){window.open(window.GN_BOOKING_URL,'_blank','noopener');return}
  var v=function(id){var el=document.getElementById(id);return el?el.value.trim():''};
  var T=GN.t,form=e.currentTarget,subj=form.getAttribute('data-subject')||'mail.subject',parts=[T('mail.s1')+': '+(v('f1')||T('mail.none'))];
  if(document.getElementById('f2'))parts.push(T('mail.s2')+': '+(v('f2')||T('mail.open')));
  parts.push(T('mail.s3')+': '+(v('f3')||T('mail.nonec')),T('mail.s4')+': '+(v('f4')||T('mail.nonec')),T('mail.foot'));
  var body=parts.join('\n\n');
  location.href='mailto:satis@ginova.org?subject='+encodeURIComponent(T(subj))+'&body='+encodeURIComponent(body);
});
})();
