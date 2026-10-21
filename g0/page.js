(() => {
  'use strict';
  const $ = s => document.querySelector(s);
  const $$ = s => [...document.querySelectorAll(s)];
  const escape = text => String(text).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const data = window.G0DATA;
  if (!data) return;
  let lang = new URLSearchParams(location.search).get('lang') === 'en' ? 'en' : 'tr';
  let dimension = 0, lens = 0, trace = 0, dossier = 0, actor = 0, time = '2016';
  const dimensions = {
    tr: [
      'Neyi anlamaya çalışıyoruz? Kapsamı, zaman ufkunu ve bağlamın sınırlarını belirleriz.',
      'Kimler etkiliyor, kimler etkileniyor? Çıkarları, yetkileri, baskıları ve eksik sesleri birlikte görürüz.',
      'Hangi parça hangisine bağlı? Teknik, ekonomik, kurumsal ve çevresel ilişkileri birlikte izleriz.',
      'Neyi, hangi kaynaktan biliyoruz? Tarihi, kapsamı, birimi ve karşı kanıtı iddiayla birlikte taşırız.',
      'Aynı olayı başka ne açıklayabilir? Rakip yorumları, fırsatları ve riskleri aynı özenle inceleriz.',
      'Ne hâlâ bilinmiyor? Kör noktaları, kapsam dışını ve öğrenilmesi gereken ilişkileri görünür kılarız.'
    ],
    en: [
      'What are we trying to understand? Define the scope, time horizon and boundaries of the context.',
      'Who influences the subject, and who is affected? Map interests, authority, pressures and missing voices.',
      'What depends on what? Connect technical, economic, institutional and environmental relationships.',
      'What do we know, and from which source? Keep dates, scope, units and counterevidence attached to claims.',
      'What else could explain the same observation? Examine rival interpretations, opportunities and risks with equal care.',
      'What remains unknown? Make blind spots, exclusions and relationships still to be understood explicit.'
    ]
  };
  $$('[data-en]').forEach(el => el.dataset.tr = el.innerHTML);
  function sourceLink(item) {
    return item.source ? `<a class="source-link" href="${escape(item.source)}" target="_blank" rel="noopener noreferrer">${escape(item.sourceLabel || (lang === 'tr' ? 'Kaynağı incele' : 'Inspect source'))} ↗</a>` : '';
  }
  function setButtons(selector,markup,key,active){
    const container=$(selector);
    if(container.dataset.renderLanguage!==lang){container.innerHTML=markup;container.dataset.renderLanguage=lang;}
    container.querySelectorAll(`[data-${key}]`).forEach((b,i)=>b.setAttribute('aria-pressed',String(i===active)));
  }
  function renderDimension() {
    $('#dimension-index').textContent = `${String(dimension + 1).padStart(2,'0')} / 06`;
    $('#dimension-text').textContent = dimensions[lang][dimension];
    $$('[data-dimension]').forEach((b,i) => b.setAttribute('aria-pressed', String(i === dimension)));
    $$('[data-point]').forEach((p,i) => p.classList.toggle('active', i === dimension));
  }
  function renderLens() {
    const items = data[lang].lenses;
    setButtons('#lens-buttons',items.map((x,i) => `<button type="button" data-lens="${i}" aria-pressed="${i === lens}" title="${escape(x.title)}" aria-label="${escape(x.title)}">${String(i+1).padStart(2,'0')}</button>`).join(''),'lens',lens);
    $('#lens-detail').innerHTML = `<h3>${escape(items[lens].title)}</h3><p>${escape(items[lens].body)}</p>`;
    $('#lens-number').textContent = String(lens+1).padStart(2,'0');
    $$('[data-petal]').forEach((x,i) => x.classList.toggle('active',i===lens));
  }
  function renderCase() {
    const item = data[lang]['case'+time];
    $('#case-panel').innerHTML = `<h3>${escape(item.title)}</h3><p>${escape(item.intro)}</p><div class="facts count-${item.facts.length}">${item.facts.map(f => `<article class="fact"><p class="fact-label">${escape(f.label)}</p><strong class="fact-value">${escape(f.value)}</strong><span class="fact-unit">${escape(f.unit)}</span><p class="fact-note">${escape(f.note)}</p>${sourceLink(f)}</article>`).join('')}</div><p class="case-lesson">${escape(item.lesson)}</p>`;
    $$('[data-time]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.time===time)));
  }
  function renderTrace() {
    const items = data[lang].trace;
    setButtons('#trace-buttons',items.map((x,i) => `<button type="button" data-trace="${i}" aria-pressed="${i===trace}"><span>${String(i+1).padStart(2,'0')}</span>${escape(x.label.replace(/^\d+\s*·\s*/,''))}</button>`).join(''),'trace',trace);
    const item = items[trace];
    $('#trace-detail').innerHTML = `<span class="trace-index">${String(trace+1).padStart(2,'0')}</span><div><h3>${escape(item.title)}</h3><p>${escape(item.body)}</p>${sourceLink(item)}</div>`;
  }
  function renderDossier() {
    const items = data[lang].dossier;
    setButtons('#dossier-tabs',items.map((x,i) => `<button type="button" data-dossier="${i}" aria-pressed="${i===dossier}"><span>${String(i+1).padStart(2,'0')}</span>${escape(x.label)}</button>`).join(''),'dossier',dossier);
    const item = items[dossier];
    $('#paper-index').textContent = `${String(dossier+1).padStart(2,'0')} / 04`;
    $('#dossier-content').innerHTML = `<h3>${escape(item.title)}</h3><p>${escape(item.body)}</p><ul>${item.bullets.map(b => `<li>${escape(b)}</li>`).join('')}</ul>`;
  }
  function renderLearning() {
    $('#learning-steps').innerHTML = data[lang].learning.map((item,i) => `<article class="learning-step"><span>${String(i+1).padStart(2,'0')} /</span><h3>${escape(item.title)}</h3><p>${escape(item.body)}</p></article>`).join('');
  }
  function renderActors() {
    const items = data[lang].actors;
    if(!items || !$('#actor-buttons'))return;
    setButtons('#actor-buttons',items.map((x,i)=>`<button type="button" data-actor="${i}" aria-pressed="${i===actor}"><span>${String(i+1).padStart(2,'0')}</span>${escape(x.label)}</button>`).join(''),'actor',actor);
    const item=items[actor];
    $('#actor-detail').innerHTML=`<h3>${escape(item.title)}</h3><p>${escape(item.body)}</p><div class="readings"><div><span>${lang==='tr'?'BAKIŞ A':'READING A'}</span><p>${escape(item.readingA)}</p></div><div><span>${lang==='tr'?'BAKIŞ B':'READING B'}</span><p>${escape(item.readingB)}</p></div></div><p class="actor-question">${escape(item.openQuestion)}</p>${sourceLink(item)}`;
    $$('[data-branch]').forEach((x,i)=>x.classList.toggle('active',i===actor));
  }
  function renderLanguage() {
    document.documentElement.lang = lang;
    $$('[data-en]').forEach(el => el.innerHTML = el.dataset[lang]);
    $$('[data-lang]').forEach(b => b.setAttribute('aria-pressed',String(b.dataset.lang===lang)));
    document.title = lang === 'tr' ? 'GiNOVA G-0 | Önce, bağlam.' : 'GiNOVA G-0 | Context. Before everything.';
    $('#contact-mail').href = 'mailto:satis@ginova.org?subject='+encodeURIComponent(lang==='tr'?'GiNOVA G-0 | Bağlam görüşmesi':'GiNOVA G-0 | Context conversation');
    const labels=lang==='tr'?['Temsili bağlam haritası','Disiplinler','Bilgi penceresi','Kanıt izi','Dosya kesitleri','Aktörler']:['Illustrative context map','Disciplines','Information window','Evidence trace','Dossier excerpts','Actors'];
    ['.observatory','#lens-buttons','.time-switch','#trace-buttons','#dossier-tabs','#actor-buttons'].forEach((s,i)=>{if($(s))$(s).setAttribute('aria-label',labels[i]);});
    $('#map-title').textContent=lang==='tr'?'G-0 bağlam alanı':'G-0 context field';
    $('#map-desc').textContent=lang==='tr'?'Ortak bir konuyu çevreleyen altı boyut: misyon, aktörler, sistemler, kanıt, bakış açıları ve bilinmeyenler. Temsili harita.':'Six dimensions surround a shared subject: mission, actors, systems, evidence, perspectives and unknowns. Illustrative map.';
    renderDimension();renderLens();renderCase();renderTrace();renderDossier();renderLearning();renderActors();renderMotion();
  }
  function renderMotion() {
    const paused = document.body.classList.contains('paused');
    $('#motion-toggle').textContent = lang==='tr' ? (paused?'Hareketi sürdür':'Hareketi durdur') : (paused?'Resume motion':'Pause motion');
    $('#motion-toggle').setAttribute('aria-pressed',String(paused));
  }
  document.addEventListener('click', e => {
    const b = e.target.closest('button'); if(!b)return;
    if(b.dataset.lang){lang=b.dataset.lang;const u=new URL(location.href);u.searchParams.set('lang',lang);history.replaceState(null,'',u);renderLanguage();}
    if(b.dataset.dimension!==undefined){dimension=Number(b.dataset.dimension);renderDimension();}
    if(b.dataset.lens!==undefined){lens=Number(b.dataset.lens);renderLens();$(`[data-lens="${lens}"]`).focus({preventScroll:true});}
    if(b.dataset.time){time=b.dataset.time;renderCase();}
    if(b.dataset.trace!==undefined){trace=Number(b.dataset.trace);renderTrace();$(`[data-trace="${trace}"]`).focus({preventScroll:true});}
    if(b.dataset.dossier!==undefined){dossier=Number(b.dataset.dossier);renderDossier();$(`[data-dossier="${dossier}"]`).focus({preventScroll:true});}
    if(b.dataset.actor!==undefined){actor=Number(b.dataset.actor);renderActors();$(`[data-actor="${actor}"]`).focus({preventScroll:true});}
    if(b.id==='motion-toggle'){document.body.classList.toggle('paused');renderMotion();}
  });
  document.addEventListener('keydown', e => {
    if(e.ctrlKey || e.metaKey || e.altKey)return;
    if(!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown','Home','End'].includes(e.key))return;
    const b=e.target.closest('button');if(!b)return;
    const key=['dimension','lens','time','trace','dossier','actor','lang'].find(k=>b.dataset[k]!==undefined);if(!key)return;
    const buttons=$$(`[data-${key}]`), index=buttons.indexOf(b);if(index<0)return;
    const next=e.key==='Home'?0:e.key==='End'?buttons.length-1:(index+(e.key==='ArrowRight'||e.key==='ArrowDown'?1:-1)+buttons.length)%buttons.length;
    e.preventDefault();buttons[next].click();$$(`[data-${key}]`)[next].focus({preventScroll:true});
  });
  renderLanguage();
})();
