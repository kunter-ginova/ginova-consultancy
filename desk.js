/* The Desk: four small agents read, tag and rank sector headlines.
   Honest by design: headlines and links only; topics and scores come from the fixed rules below.
   All visible text goes through GN.t() so the desk follows the page language. */
(function(){
'use strict';
var root=document.getElementById('deskRoot'); if(!root||!window.GN) return;
var T=GN.t;
var $=function(s,r){return (r||root).querySelector(s)};
var reduce=window.matchMedia('(prefers-reduced-motion: reduce)').matches;

var LANE_KEYS=['decision','ai','world','engineering','food','media'];
var LEAD=window.GN_DESK_LEAD||'decision';   /* the site's own field ranks first */
var LANE_BASE={decision:2,ai:2,world:1.5,engineering:2,food:1.5,media:1};LANE_BASE[LEAD]=3;
/* Topic rules match English headlines (the feeds are English); labels come from the dictionary. */
var TOPICS=[
  {w:3,   re:/\b(AI|A\.I\.)\b|\b(agent|agents|agentic|LLM|LLMs|MCP|generative|chatbot|copilot|machine learning)\b/i},
  {w:2,   re:/data cent|compute|\bchips?\b|GPU|semiconductor|energy|power grid|nuclear|electric|battery|datacenter/i},
  {w:2.5, re:/regulat|\blaws?\b|tariff|\bban(s|ned)?\b|compliance|cyber|breach|security|\brisk|governance|\bfines?\b|lawsuit|court|policy|\bFDA\b|recall|sanction/i},
  {w:1.5, re:/layoff|hiring|\bhires?\b|workforce|\bjobs?\b|labor|talent|executive|\bCEO\b|\bnames?\b.*\b(VP|chief|head)\b|appoint/i},
  {w:1.5, re:/acqui|\bbuys?\b|bought|merger|\bdeals?\b|invest|funding|raises?\b|\bIPO\b|stake|valuation|revenue|earnings|profit|\bsales?\b/i},
  {w:1,   re:/\bfoods?\b|label|ingredient|protein|beverage|supply chain|crops?\b|farm|\bmeat\b|dairy|grocery|brew|GLP-1|nutrition|snack/i},
  {w:.5,  re:/\bfilms?\b|documentary|music|album|streaming|series|netflix|studio|box office|artist|design|brand|festival/i},
  {w:0,   re:/./},
  {w:2,   re:/geopolit|sanction|tariff|trade war|export control|embargo|\bNATO\b|Ukrain|Russia|China|Chinese|Taiwan|Middle East|\bIran|Israel|Gaza|Red Sea|\bstrait\b|ceasefire|summit|diplomat|central bank|currenc|\bdollar\b|inflation|\bOPEC\b|\bG7\b|\bG20\b|\bEU\b|T[uü]rkiye|Turkey|BRICS|rare earth/i}
];
var TOPIC_ORDER=[0,1,8,2,3,4,5,6,7];   /* match order; the last topic (General) is the fallback. Index 7 = General, 8 = Geopolitics and trade (added later, so it keeps its own number) */
var HORIZON_H=168, LOGMAX=8, STALE_H=36, DISPLAY=150;   /* the radar draws the 150 highest-scoring headlines; the rest are one click away */
var BASE=window.GN_NEWS_BASE||'data/';   /* later: https://ginova.org/data/ , written daily by the news job */
var TRL={};   /* lang -> {url -> {en,t}}: translated headlines (news.<lang>.json), applied only while the English headline is unchanged */
var TICKS=[1,6,24,72,168];

var state={items:[],byUrl:{},updated:null,lane:'all',passes:0,paused:false,checkedAt:null,hover:null,replaying:true,showAll:false,stateKey:'state.connecting',offlineMeta:false};
var el={
  plot:$('#plot'),radar:$('#radar'),tip:$('#tip'),rank:$('#rank'),log:$('#deskLog'),
  live:$('#deskLive'),stateTxt:$('#deskState'),meta:$('#deskMeta'),pause:$('#deskPause'),filters:$('#deskFilters'),all:$('#deskAll'),
  agent:function(a){return $('#agents [data-a="'+a+'"]')}
};
var sweepEl=null,rowEls=[],tickEls=[],nowTxt={};   /* nowTxt: current key+vars per agent, re-rendered on language change */

/* ---------- helpers ---------- */
function ageH(it){return Math.max(0,(Date.now()-it.t)/36e5)}
function xOf(h){h=Math.min(h,HORIZON_H);return 1-Math.log(1+h)/Math.log(1+HORIZON_H)}
function ago(h){
  if(h<1) return T('ago.min',{n:Math.max(1,Math.round(h*60))});
  if(h<48) return T('ago.h',{n:Math.round(h)});
  return T('ago.d',{n:Math.round(h/24)});
}
function topicOf(title){for(var k=0;k<TOPIC_ORDER.length;k++){var i=TOPIC_ORDER[k];if(TOPICS[i].re.test(title)) return i}return 7}
function topicName(i){return T('topic.'+i)}
function score(it){
  var raw=(LANE_BASE[it.lane]+TOPICS[it.topic].w)*(0.35+0.65*Math.exp(-ageH(it)/36));
  return Math.min(100,raw/6.2*100);
}
function locale(){return ({tr:'tr-TR',az:'az-AZ',de:'de-DE',fr:'fr-FR',it:'it-IT',es:'es-ES',ru:'ru-RU',ar:'ar',zh:'zh-CN'})[GN.lang()]||'en-GB'}
function hhmmss(d){return d.toLocaleTimeString(locale(),{hour12:false})}
function clip(s,n){return s.length>n?s.slice(0,n-1)+'…':s}
function trOf(it){var m=TRL[GN.lang()],x=m&&m[it.url];return x&&x.en===it.title?x.t:null}
function shown(it){return trOf(it)||it.title}
function translated(it){return trOf(it)!==null}
function agentName(a){return T('agent.'+a)}
function paintNow(a){var li=el.agent(a),n=nowTxt[a]; if(!li||!n) return; $('[data-now]',li).textContent=n.it?clip(shown(n.it),44):(n.raw!==undefined?n.raw:T(n.key,n.vars))}
function setNowItem(a,it,working){nowTxt[a]={it:it};paintNow(a);var li=el.agent(a);if(li)li.classList.toggle('work',!!working)}
function setNow(a,key,vars,working,raw){
  nowTxt[a]=raw!==undefined?{raw:raw}:{key:key,vars:vars};
  paintNow(a);
  var li=el.agent(a); if(li) li.classList.toggle('work',!!working);
}
function setN(a,n){var li=el.agent(a); if(li) $('[data-n]',li).textContent=n}
function log(agent,key,vars){
  var li=document.createElement('li');
  li.innerHTML='<time>'+hhmmss(new Date())+'</time><b></b>';
  li.querySelector('b').textContent=agentName(agent);
  li.appendChild(document.createTextNode(T(key,vars)));
  el.log.insertBefore(li,el.log.firstChild);
  while(el.log.children.length>LOGMAX) el.log.removeChild(el.log.lastChild);
}
function setState(key){state.stateKey=key;el.stateTxt.textContent=T(key)}
/* honest status: "On shift" only while the feed is recent; otherwise say it is not updated */
function freshness(){
  var h=(Date.now()-new Date(state.updated).getTime())/36e5, ok=!isNaN(h)&&h<=STALE_H;
  el.live.classList.toggle('on',ok); setState(ok?'state.on':'state.stale');
}

/* ---------- data ---------- */
function ingest(json){
  var fresh=[];
  LANE_KEYS.forEach(function(lane){
    (json[lane]||[]).forEach(function(r){
      if(state.byUrl[r.u]) return;
      var it={t:new Date(r.d).getTime(),title:r.t,src:r.s,url:r.u,lane:lane};
      if(isNaN(it.t)) return;
      it.topic=topicOf(it.title);
      state.byUrl[r.u]=it; state.items.push(it); fresh.push(it);
    });
  });
  return fresh;
}
function loadTr(){
  var l=GN.lang();if(l==='en'||TRL[l]!==undefined)return Promise.resolve();
  return fetch(BASE+'news.'+l+'.json?t='+Date.now(),{cache:'no-store'}).then(function(r){return r.ok?r.json():null}).then(function(j){TRL[l]=(j&&j.items)||{}}).catch(function(){TRL[l]={}});
}
function load(){
  return fetch(BASE+'news.json?t='+Date.now(),{cache:'no-store'}).then(function(r){
    if(!r.ok) throw new Error(r.status); return r.json();
  });
}

/* ---------- display cap: the 150 highest-scoring headlines are drawn; "show all" draws the rest ---------- */
function shortlist(){
  var by=state.items.slice().sort(function(a,b){return score(b)-score(a)});
  by.forEach(function(it,i){it.vis=state.showAll||i<DISPLAY});
}
function paintAll(){
  var b=el.all; if(!b) return;
  var many=state.items.length>DISPLAY; b.hidden=!many; if(!many) return;
  b.setAttribute('aria-pressed',state.showAll);
  b.textContent=T(state.showAll?'desk.top':'desk.all',{n:state.showAll?DISPLAY:state.items.length});
}
function applyVisibility(){
  state.items.forEach(function(it){
    if(it.vis&&!it.el){var d=placeDot(it); d.style.setProperty('--d',sizeOf(it)); void d.offsetWidth; d.classList.add('in')}
    else if(!it.vis&&it.el){it.el.remove(); it.el=null}
  });
  refreshDots();
}

/* ---------- radar ---------- */
function buildGrid(){
  el.plot.innerHTML=''; rowEls=[]; tickEls=[];
  var n=TOPICS.length;
  TOPICS.forEach(function(t,i){
    var r=document.createElement('div'); r.className='row';
    r.style.top=(i/n*100)+'%'; r.style.height=(100/n)+'%';
    r.innerHTML='<span></span>';
    el.plot.appendChild(r); rowEls.push(r);
  });
  TICKS.forEach(function(h){
    var x=xOf(h)*100;
    var l=document.createElement('div'); l.className='tickline'; l.style.left=x+'%'; el.plot.appendChild(l);
    var tk=document.createElement('div'); tk.className='tick'; tk.style.left=x+'%'; tk.dataset.k='tick.'+h; el.plot.appendChild(tk); tickEls.push(tk);
  });
  var now=document.createElement('div'); now.className='tick'; now.style.left='100%'; now.style.transform='translateX(-100%)'; now.dataset.k='tick.now'; el.plot.appendChild(now); tickEls.push(now);
  sweepEl=document.createElement('div'); sweepEl.className='sweep'; sweepEl.hidden=reduce; el.plot.appendChild(sweepEl);
  relabelGrid();
}
function relabelGrid(){
  rowEls.forEach(function(r,i){r.firstChild.textContent=topicName(i)});
  tickEls.forEach(function(tk){tk.textContent=T(tk.dataset.k)});
}
function placeDot(it){
  var d=document.createElement('a');
  d.className='dot'; d.href=it.url; d.target='_blank'; d.rel='noopener noreferrer';
  var x=xOf(ageH(it)), n=TOPICS.length;
  var j=((hash(it.url)%100)/100)*0.62+0.19;
  d.style.left=(x*100)+'%'; d.style.top=((it.topic+j)/n*100)+'%';
  d.style.setProperty('--c','var(--l-'+it.lane+')');
  it.el=d; it.x=x; labelDot(it);
  d.addEventListener('mouseenter',function(){hover(it,true)});
  d.addEventListener('focus',function(){hover(it,true)});
  d.addEventListener('mouseleave',function(){hover(it,false)});
  d.addEventListener('blur',function(){hover(it,false)});
  el.plot.appendChild(d);
  return d;
}
function labelDot(it){if(it.el) it.el.setAttribute('aria-label',shown(it)+', '+it.src+', '+ago(ageH(it))+', '+topicName(it.topic))}
function hash(s){var h=0;for(var i=0;i<s.length;i++){h=(h*31+s.charCodeAt(i))|0}return Math.abs(h)}
function sizeOf(it){return (9+score(it)/100*10).toFixed(1)+'px'}
function refreshDots(){
  state.items.forEach(function(it){
    if(!it.el) return;
    it.el.style.setProperty('--d',sizeOf(it));
    it.el.classList.toggle('fresh',ageH(it)<6&&!reduce);
    it.el.classList.toggle('dim',state.lane!=='all'&&it.lane!==state.lane);
  });
  rowEls.forEach(function(r,i){
    r.classList.toggle('has',state.items.some(function(it){return it.topic===i&&(state.lane==='all'||it.lane===state.lane)}));
  });
}
function hover(it,on){
  state.hover=on?it:null;
  if(it.el) it.el.classList.toggle('hl',on);
  var li=el.rank.querySelector('[data-u="'+cssEsc(it.url)+'"]'); if(li) li.classList.toggle('hl',on);
  if(!on){el.tip.hidden=true;return}
  el.tip.innerHTML='<b></b><span></span>';
  el.tip.firstChild.textContent=shown(it);
  el.tip.lastChild.textContent=T('tip.meta',{src:it.src,age:ago(ageH(it)),topic:topicName(it.topic),p:Math.round(score(it))});
  if(translated(it)){var o=document.createElement('span');o.style.display='block';o.style.marginTop='6px';o.textContent=T('tip.orig',{t:it.title});el.tip.appendChild(o)}
  el.tip.hidden=false;
  var rr=el.radar.getBoundingClientRect(), dr=it.el.getBoundingClientRect();
  var w=el.tip.offsetWidth, h=el.tip.offsetHeight;
  var left=dr.left-rr.left+dr.width/2-w/2; left=Math.max(8,Math.min(rr.width-w-8,left));
  var top=dr.top-rr.top-h-12; if(top<8) top=dr.bottom-rr.top+12;
  el.tip.style.left=left+'px'; el.tip.style.top=top+'px';
}
function cssEsc(s){return s.replace(/"/g,'\\"')}

/* ---------- ranking (FLIP via transforms) ---------- */
var rankRows={};
function ranking(){
  var pool=state.items.filter(function(it){return state.lane==='all'||it.lane===state.lane});
  pool.sort(function(a,b){return score(b)-score(a)});
  var h=el.rank.clientHeight||480, rowH=82, n=Math.max(3,Math.min(7,Math.floor(h/rowH)));
  rowH=Math.max(rowH,Math.floor(h/n));
  var top;
  if(state.lane==='all'){   /* diversity: at most two per field, so one busy field cannot fill the whole list */
    var cnt={}; top=[]; pool.forEach(function(it){ if(top.length<n&&(cnt[it.lane]||0)<2){top.push(it);cnt[it.lane]=(cnt[it.lane]||0)+1} });
    pool.forEach(function(it){ if(top.length<n&&top.indexOf(it)<0) top.push(it) });
  } else top=pool.slice(0,n);
  var keep={};
  top.forEach(function(it,i){
    keep[it.url]=1;
    var li=rankRows[it.url];
    if(!li){
      li=document.createElement('li'); li.dataset.u=it.url;
      li.innerHTML='<span class="n"></span><a target="_blank" rel="noopener noreferrer"></a><span class="m"></span><span class="bar"><i></i></span>';
      li.style.transform='translateY('+(n*rowH)+'px)'; li.style.opacity='0';
      el.rank.appendChild(li); rankRows[it.url]=li;
      li.addEventListener('mouseenter',function(){hover(it,true)});
      li.addEventListener('mouseleave',function(){hover(it,false)});
      void li.offsetWidth;
    }
    li.style.opacity='1';
    li.style.transform='translateY('+(i*rowH)+'px)';
    li.querySelector('.n').textContent=i+1;
    var a=li.querySelector('a'); a.textContent=shown(it); a.href=it.url;
    li.querySelector('.m').textContent=score(it).toFixed(1)+' \u00b7 '+it.src+' · '+ago(ageH(it))+' · '+topicName(it.topic);
    var b=li.querySelector('.bar i'); b.style.setProperty('--w',score(it).toFixed(1)+'%'); b.style.setProperty('--c','var(--l-'+it.lane+')');
  });
  Object.keys(rankRows).forEach(function(u){
    if(!keep[u]){var li=rankRows[u]; li.style.opacity='0'; li.style.transform='translateY('+(n*rowH+40)+'px)'; (function(l){setTimeout(function(){if(l.parentNode)l.parentNode.removeChild(l)},700)})(li); delete rankRows[u];}
  });
  return top;
}

/* ---------- choreography ---------- */
var sweepStart=0, prevX=0, SWEEP_MS=24000, running=false, pingedOnPass={}, raf=0;
var sorted=[];
function resort(){sorted=state.items.slice().sort(function(a,b){return a.x-b.x})}
function nSources(){var s={};state.items.forEach(function(i){s[i.src]=1});return Object.keys(s).length}

function replay(){
  state.replaying=true;
  var items=state.items.slice().sort(function(a,b){return a.t-b.t});
  var total=items.length, nsrc=nSources();
  setNow('scout','a.scout.reading',null,true);
  log('scout','log.opened',{n:total,s:nsrc});
  var step=reduce?0:Math.min(70,Math.round(2200/Math.max(1,total))), i=0;   /* the whole replay takes about two seconds, however many headlines */
  function tick(){
    if(i>=total){ finishReplay(total,nsrc); return }
    var it=items[i++];
    if(it.vis&&!it.el) placeDot(it);
    refreshDots();
    if(it.el){void it.el.offsetWidth; it.el.classList.add('in')}
    setN('scout',i); setN('reader',i); setN('sorter',i);
    setNowItem('reader',it,true);
    setNow('sorter',null,null,true,topicName(it.topic));
    if(i%6===0) log('sorter','log.filed',{i:i,n:total,topic:topicName(it.topic)});
    if(step) setTimeout(tick,step); else tick();
  }
  tick();
}
function finishReplay(total,nsrc){
  state.replaying=false;
  setNow('scout','a.scout.summary',{n:total,s:nsrc},false);
  setNow('reader','a.reader.done',null,false);
  var used={}; state.items.forEach(function(i){used[i.topic]=1});
  var nu=Object.keys(used).length;
  setNow('sorter','a.sorter.topics',{n:nu},false);
  setN('sorter',nu); setN('reader',state.items.length);
  setNow('editor','a.editor.ranking',null,true);
  refreshDots(); resort();
  var top=ranking();
  setN('editor',state.passes);
  log('editor','log.ranked',{p:Math.round(score(top[0]))});
  startSweep();
}
function startSweep(){
  if(reduce){setNow('editor','a.editor.reduced',null,false);return}
  running=true; sweepStart=performance.now(); prevX=0; pingedOnPass={};
  cancelAnimationFrame(raf); raf=requestAnimationFrame(frame);
}
function frame(){
  if(!running){return}
  var now=performance.now(), dt=now-(frame.last||now); frame.last=now;
  if(state.paused){raf=requestAnimationFrame(frame);sweepStart+=dt;return}
  var p=Math.max(0,((now-sweepStart)%SWEEP_MS)/SWEEP_MS);
  var w=el.plot.clientWidth;
  sweepEl.style.transform='translateX('+(p*w)+'px)';
  if(p<prevX){ // wrapped: a pass ended
    state.passes++; setN('editor',state.passes); pingedOnPass={};
    resort(); refreshDots(); ranking();
    setNow('editor','a.editor.pass',{n:state.passes},false);
    log('editor','log.pass',{n:state.passes});
  }
  for(var i=0;i<sorted.length;i++){
    var it=sorted[i];
    if(it.x>prevX && it.x<=p && !pingedOnPass[it.url]){
      pingedOnPass[it.url]=1;
      if(state.lane==='all'||it.lane===state.lane) ping(it);
    }
  }
  prevX=p;
  raf=requestAnimationFrame(frame);
}
function ping(it){
  if(!it.el) return;
  it.el.classList.remove('ping'); void it.el.offsetWidth; it.el.classList.add('ping');
  setTimeout(function(){it.el&&it.el.classList.remove('ping')},950);
  setNowItem('reader',it,true);
  setNow('sorter',null,null,true,topicName(it.topic));
  setNow('editor','a.editor.priority',{p:score(it).toFixed(1)},true);
  log('editor','log.reread',{src:it.src,title:clip(shown(it),52),topic:topicName(it.topic),p:score(it).toFixed(1)});
  setTimeout(function(){['reader','sorter','editor'].forEach(function(a){var li=el.agent(a); if(li) li.classList.remove('work')})},500);
}

/* ---------- polling ---------- */
function fmtUtc(iso){
  var d=new Date(iso); if(isNaN(d)) return T('earlier');
  return d.toLocaleString(locale(),{day:'2-digit',month:GN.lang()==='az'?'2-digit':'short',hour:'2-digit',minute:'2-digit',timeZone:'UTC'})+' UTC';
}
function poll(){
  loadTr().then(load).then(function(json){
    state.checkedAt=Date.now();
    if(json.updated===state.updated){
      setNow('scout','a.scout.nochange',{t:fmtUtc(state.updated)},false);
      log('scout','log.nochange',{t:fmtUtc(state.updated)});
      return;
    }
    var fresh=ingest(json); state.updated=json.updated; freshness(); shortlist(); paintAll();
    fresh.forEach(function(it){if(!it.vis)return; var d=placeDot(it); void d.offsetWidth; d.classList.add('in','arrive')});
    resort(); refreshDots(); ranking();
    setN('scout',state.items.length); setN('reader',state.items.length);
    log('scout',fresh.length===1?'log.new1':'log.newn',{n:fresh.length});
    setNow('scout','a.scout.new',{n:fresh.length},false);
    meta();
  }).catch(function(){
    log('scout','log.unreachable');
  });
}
function meta(){
  if(state.offlineMeta){el.meta.textContent=T('meta.offline');return}
  var s=Math.max(0,Math.round((Date.now()-state.checkedAt)/1000));
  el.meta.textContent=T('meta.feed',{built:fmtUtc(state.updated),m:Math.floor(s/60),s:('0'+(s%60)).slice(-2)});
}

/* ---------- controls ---------- */
el.filters.addEventListener('click',function(e){
  var b=e.target.closest('button'); if(!b) return;
  state.lane=b.dataset.lane;
  Array.prototype.forEach.call(el.filters.children,function(x){x.setAttribute('aria-pressed',x===b?'true':'false')});
  refreshDots(); ranking();
  log('editor','log.showing',{x:T('lane.'+state.lane)});
});
if(el.all) el.all.addEventListener('click',function(){
  state.showAll=!state.showAll; shortlist(); paintAll(); applyVisibility(); resort(); ranking();
  log('editor','log.showing',{x:T(state.showAll?'desk.all':'desk.top',{n:state.showAll?state.items.length:DISPLAY})});
});
/* Focused news request: a native dialog; the request is prepared as an email draft in the visitor's own mail app (nothing is sent from this page). */
(function(){
  var dlg=document.getElementById('subDlg'),open=document.getElementById('deskGet'),form=document.getElementById('subForm'),close=document.getElementById('subClose');
  if(!dlg||!open||!form) return;
  open.addEventListener('click',function(){ if(dlg.showModal) dlg.showModal(); else dlg.setAttribute('open','') });
  close.addEventListener('click',function(){ dlg.close() });
  dlg.addEventListener('click',function(e){ if(e.target===dlg) dlg.close() });
  form.addEventListener('submit',function(e){
    e.preventDefault();
    function vals(n){return Array.prototype.map.call(form.querySelectorAll('input[name="'+n+'"]:checked'),function(i){return i.value})}
    var fields=vals('f').map(function(v){return T('lane.'+v)}),
        ch={email:T('sub.ch.email'),whatsapp:T('sub.ch.wa'),desktop:T('sub.ch.desk')},
        chans=[T('sub.ch.page')].concat(vals('c').map(function(v){return ch[v]})),
        note=(document.getElementById('subNote').value||'').trim();
    var body=[T('sub.what')+': '+(fields.join(', ')||T('mail.nonec')),
              T('sub.where')+': '+chans.join(', '),
              T('sub.note')+' '+(note||T('mail.nonec')),
              'Language: '+GN.lang()].join('\n\n');
    location.href='mailto:satis@ginova.org?subject='+encodeURIComponent(T('sub.subject'))+'&body='+encodeURIComponent(body);
  });
})();
el.pause.addEventListener('click',function(){
  state.paused=!state.paused;
  el.pause.setAttribute('aria-pressed',state.paused);
  el.pause.textContent=T(state.paused?'btn.resume':'btn.pause');
  document.body.classList.toggle('still',state.paused);
});
window.addEventListener('resize',function(){if(!state.replaying&&state.items.length)ranking()});

/* language change: everything the page re-renders itself is repainted here */
GN.onLang(function(){
  loadTr().then(repaintLang);
  repaintLang();
});
function repaintLang(){
  el.pause.textContent=T(state.paused?'btn.resume':'btn.pause');
  el.stateTxt.textContent=T(state.stateKey);
  paintAll();
  ['scout','reader','sorter','editor'].forEach(paintNow);
  if(state.updated||state.offlineMeta) meta();
  if(rowEls.length){relabelGrid(); state.items.forEach(labelDot); if(!state.replaying&&state.items.length) ranking()}
}

/* The sources we read: names only, taken from the feed's own source list (so it can never name a source we do not check). */
function sources(h){
  var line=$('#deskSrcLine'),track=$('#deskSrc'),seen={},names=[];
  state.items.slice().sort(function(a,b){return LANE_KEYS.indexOf(a.lane)-LANE_KEYS.indexOf(b.lane)}).forEach(function(it){if(!seen[it.src]){seen[it.src]=1;names.push(it.src)}});   /* only sources that gave headlines, in field order */
  if(!line||!track||!names.length||track.childNodes.length)return;
  function list(hidden){var ul=document.createElement('ul');if(hidden)ul.setAttribute('aria-hidden','true');
    names.forEach(function(n){var li=document.createElement('li');li.textContent=n;ul.appendChild(li)});return ul}
  track.appendChild(list(false));track.appendChild(list(true));
  track.style.setProperty('--dur',Math.max(42,names.length*3.4)+'s');
  line.hidden=false;
}

/* start only when the desk is on screen; saves work and makes the replay visible */
function boot(){
  setState('state.connecting');
  loadTr().then(load).then(function(json){
    state.checkedAt=Date.now();
    state.updated=json.updated; ingest(json);
    if(!state.items.length){ setState('state.none'); return }
    sources(json.health);
    shortlist(); paintAll();
    buildGrid();
    state.items.forEach(function(it){it.x=xOf(ageH(it))});
    freshness();
    meta(); setInterval(meta,1000);
    setInterval(poll,90000);
    setInterval(function(){if(!state.replaying){refreshDots();freshness()}},60000);
    replay();
  }).catch(function(err){
    setState('state.off'); state.offlineMeta=true; meta();
    log('scout','log.fail',{e:err.message});
  });
}
if('IntersectionObserver' in window){
  var started=false;
  new IntersectionObserver(function(es,o){
    es.forEach(function(e){ if(e.isIntersecting&&!started){started=true;o.disconnect();boot()} });
  },{threshold:.35}).observe(root);
}else boot();
})();
