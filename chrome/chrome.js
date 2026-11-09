/* GiNOVA shared chrome: language engine, header menu, footer horizon and music.
   Language works the way ginova.org does: ?lang=xx in the address, English by default, the select pushes the URL,
   <html lang dir> follow, links marked data-route carry the language to the next GiNOVA site, and a 'ginova-language'
   event tells the page to re-render. The GiNOVA.NET languages are eight, in three groups: English, Italian, German, Spanish | Turkish, Azerbaijani | Arabic, Chinese. */
(function(){
'use strict';
var LANGS={tr:{htmlLang:'tr',dir:'ltr'},az:{htmlLang:'az',dir:'ltr'},en:{htmlLang:'en',dir:'ltr'},de:{htmlLang:'de',dir:'ltr'},it:{htmlLang:'it',dir:'ltr'},ar:{htmlLang:'ar',dir:'rtl'},es:{htmlLang:'es',dir:'ltr'},zh:{htmlLang:'zh-Hans',dir:'ltr'}};

/* Chrome strings (header and footer). Footer wording and Turkish forms are those of ginova.org. */
var C={
 en:{skip:'Skip to content',home:'GiNOVA home',menu:'Menu',primary:'Primary',language:'Language',
  'title.engineering':'Engineering','title.decision':'Decision Systems','title.medialab':'MediaLab™','title.academy':'Academy','title.ventures':'Ventures',
  'long.decision':'Consultancy &\nDecision Systems','here':'You are here','close':'Close','menu.page':'On this page','sites.h':'GiNOVA.NET','open':'Open site','links':'Connections','d.engineering':'Production systems, feasibility, and product and process development, including food.','d.decision':'Consulting, data and AI: one decision question, a fixed fee, one Investment Decision File.','d.medialab':'Web, film, sound and brand communication, made to commission.','d.academy':'The Academy Council: senior experts, research and teaching.','d.ventures':'Brands and partnerships that grow out of this work.','nav.academy':'Academy','nav.ventures':'Ventures','sites':'GiNOVA.NET sites','motto.engineering':'“Innovation brought to life through engineering”','motto.decision':'“Engineering better decisions.”','motto.medialab':'“Sound. Motion. Expression.”','motto.academy':'“Senior experts. Research. Teaching.”','motto.ventures':'“Brands. Partnerships. Growth.”','nav.engineering':'Engineering','nav.decision':'Decision Systems','nav.medialab':'MediaLab™','nav.about':'About','nav.contact':'Contact',
  motto:'Before the future arrives, you are ready.',fields:'Fields',company:'Company',overview:'Overview',constitution:'Constitution',commitments:'Commitments',decide:'How we decide',research:'Research',people:'People',
  academy:'The Academy Council: senior experts, research and teaching.',ventures:'Brands and partnerships that grow out of this work.',
  legal:'GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.',sales:'Sales enquiries',music:'Music'},
 tr:{skip:'İçeriğe geç',home:'GiNOVA ana sayfa',menu:'Menü',primary:'Ana gezinme',language:'Dil',
  'title.engineering':'Mühendislik','title.decision':'Karar Sistemleri','title.medialab':'MediaLab™','title.academy':'Akademi','title.ventures':'Girişimler',
  'long.decision':'Danışmanlık &\nKarar Sistemleri','here':'Buradasınız','close':'Kapat','menu.page':'Bu sayfada','sites.h':'GiNOVA.NET','open':'Siteyi aç','links':'Bağlantılar','d.engineering':'Üretim sistemleri, fizibilite, gıda dahil ürün ve proses geliştirme.','d.decision':'Danışmanlık, veri ve yapay zekâ: tek karar sorusu, sabit ücret, tek Yatırım Karar Dosyası.','d.medialab':'Sipariş üzerine web, film, ses ve marka iletişimi.','d.academy':'Akademi Kurulu: kıdemli uzmanlar, araştırma ve eğitim.','d.ventures':'Bu işlerden doğan markalar ve ortaklıklar.','nav.academy':'Akademi','nav.ventures':'Girişimler','sites':'GiNOVA.NET siteleri','motto.engineering':'“Yenilik, mühendislikle hayat bulur”','motto.decision':'“Daha iyi kararların mühendisliği.”','motto.medialab':'“Ses. Hareket. İfade.”','motto.academy':'“Kıdemli uzmanlar. Araştırma. Eğitim.”','motto.ventures':'“Markalar. Ortaklıklar. Büyüme.”','nav.engineering':'Mühendislik','nav.decision':'Karar Sistemleri','nav.medialab':'MediaLab™','nav.about':'Hakkımızda','nav.contact':'İletişim',
  motto:'Gelecek gelmeden, siz hazırsınız.',fields:'Çalışma alanları',company:'Kurumsal',overview:'Genel bakış',constitution:'Anayasa',commitments:'Taahhütler',decide:'Nasıl karar veririz',research:'Araştırma',people:'İnsanlar',
  academy:'Akademi Kurulu: kıdemli uzmanlar, araştırma ve eğitim.',ventures:'Bu işlerden doğan markalar ve ortaklıklar.',
  legal:'GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.',sales:'Satış talepleri',music:'Müzik'},
 az:{skip:'Məzmuna keç',home:'GiNOVA ana səhifə',menu:'Menyu',primary:'Əsas',language:'Dil',
  'title.engineering':'Mühəndislik','title.decision':'Qərar Sistemləri','title.medialab':'MediaLab™','title.academy':'Akademiya','title.ventures':'Ventures',
  'long.decision':'Məsləhətçilik &\nQərar Sistemləri','here':'Buradasınız','open':'Saytı aç','close':'Bağla','menu.page':'Bu səhifədə','sites.h':'GiNOVA.NET','links':'Bağlantılar',
  'd.engineering':'İstehsal sistemləri, texniki-iqtisadi əsaslandırma, qida daxil məhsul və proses inkişafı.','d.decision':'Məsləhətçilik, data və süni intellekt: bir qərar sualı, sabit haqq, bir İnvestisiya Qərar Faylı.','d.medialab':'Sifarişlə veb, film, səs və brend kommunikasiyası.','d.academy':'Akademiya Şurası: təcrübəli mütəxəssislər, tədqiqat və təhsil.','d.ventures':'Bu işdən doğan brendlər və tərəfdaşlıqlar.',
  'sites':'GiNOVA.NET saytları','nav.engineering':'Mühəndislik','nav.decision':'Qərar Sistemləri','nav.medialab':'MediaLab™','nav.academy':'Akademiya','nav.ventures':'Ventures','nav.about':'Haqqımızda','nav.contact':'Əlaqə',
  'motto.engineering':'“Mühəndislik innovasiyalara həyat verir”','motto.decision':'“Daha yaxşı qərarların mühəndisliyi.”','motto.medialab':'“Səs. Hərəkət. İfadə.”','motto.academy':'“Təcrübəli mütəxəssislər. Tədqiqat. Təhsil.”','motto.ventures':'“Brendlər. Tərəfdaşlıqlar. Böyümə.”',
  motto:'Gələcək gəlmədən, siz hazırsınız.',fields:'Sahələr',company:'Şirkət',overview:'Ümumi baxış',constitution:'Konstitusiya',commitments:'Öhdəliklər',decide:'Necə qərar veririk',research:'Tədqiqat',people:'İnsanlar',
  academy:'Akademiya Şurası: təcrübəli mütəxəssislər, tədqiqat və təhsil.',ventures:'Bu işdən doğan brendlər və tərəfdaşlıqlar.',
  legal:'GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.',sales:'Satış sorğuları',music:'Musiqi'},
 de:{"skip": "Zum Inhalt springen", "menu": "Menü", "close": "Schließen", "language": "Sprache", "home": "GiNOVA", "nav.about": "Über uns", "nav.contact": "Kontakt", "sales": "Vertrieb kontaktieren", "nav.engineering": "Ingenieurwesen", "nav.decision": "Entscheidungssysteme", "nav.medialab": "MediaLab™", "nav.ventures": "Ventures", "nav.academy": "Akademie", "here": "Sie sind hier", "open": "Website öffnen", "menu.page": "Auf dieser Seite", "long.decision": "Beratung &\nEntscheidungssysteme", "sites": "GiNOVA.NET-Websites", "sites.h": "GiNOVA.NET", "music": "Musik", "d.engineering": "Produktionssysteme, Machbarkeit sowie Produkt- und Prozessentwicklung, auch für Lebensmittel.", "d.decision": "Beratung, Daten und KI: eine Entscheidungsfrage, ein Festpreis, eine Investitionsentscheidungsakte.", "d.medialab": "Web, Film, Klang und Markenkommunikation im Auftrag.", "d.academy": "Der Akademierat: erfahrene Fachleute, Forschung und Lehre.", "d.ventures": "Marken und Partnerschaften, die aus dieser Arbeit entstehen.", "motto.engineering": "“Ingenieurarbeit erweckt Innovationen zum Leben”", "motto.decision": "“Bessere Entscheidungen, ingenieurmäßig.”", "motto.medialab": "“Klang. Bewegung. Ausdruck.”", "motto.academy": "“Erfahrene Fachleute. Forschung. Lehre.”", "motto.ventures": "“Marken. Partnerschaften. Wachstum.”", "motto": "Bevor die Zukunft kommt, sind Sie bereit.", "fields": "Bereiche", "company": "Unternehmen", "overview": "Überblick", "constitution": "Verfassung", "commitments": "Verpflichtungen", "decide": "Wie wir entscheiden", "research": "Forschung", "people": "Menschen", "academy": "Der Akademierat: erfahrene Fachleute, Forschung und Lehre.", "ventures": "Marken und Partnerschaften, die aus dieser Arbeit entstehen.", "legal": "GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.", "links": "Verbindungen"},
 it:{"skip": "Vai al contenuto", "menu": "Menu", "close": "Chiudi", "language": "Lingua", "home": "GiNOVA", "nav.about": "Chi siamo", "nav.contact": "Contatti", "sales": "Richieste commerciali", "nav.engineering": "Ingegneria", "nav.decision": "Sistemi Decisionali", "nav.medialab": "MediaLab™", "nav.ventures": "Ventures", "nav.academy": "Accademia", "here": "Sei qui", "open": "Apri il sito", "menu.page": "In questa pagina", "long.decision": "Consulenza e\nSistemi Decisionali", "sites": "Siti GiNOVA.NET", "sites.h": "GiNOVA.NET", "music": "Musica", "d.engineering": "Sistemi produttivi, fattibilità, sviluppo di prodotto e di processo, anche alimentare.", "d.decision": "Consulenza, dati e IA: una domanda decisionale, un compenso fisso, un Fascicolo di Decisione d’Investimento.", "d.medialab": "Web, film, suono e comunicazione di marca, su commissione.", "d.academy": "Il Consiglio dell’Accademia: esperti senior, ricerca e formazione.", "d.ventures": "Marchi e partnership che nascono da questo lavoro.", "motto.engineering": "“L’innovazione prende vita grazie all’ingegneria”", "motto.decision": "“Progettare decisioni migliori.”", "motto.medialab": "“Suono. Movimento. Espressione.”", "motto.academy": "“Esperti senior. Ricerca. Insegnamento.”", "motto.ventures": "“Marchi. Partnership. Crescita.”", "motto": "Prima che arrivi il futuro, siete pronti.", "fields": "Aree", "company": "Azienda", "overview": "Panoramica", "constitution": "Costituzione", "commitments": "Impegni", "decide": "Come decidiamo", "research": "Ricerca", "people": "Persone", "academy": "Il Consiglio dell’Accademia: esperti senior, ricerca e formazione.", "ventures": "Marchi e partnership che nascono da questo lavoro.", "legal": "GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.", "links": "Collegamenti"},
 ar:{"skip": "انتقل إلى المحتوى", "menu": "القائمة", "close": "إغلاق", "language": "اللغة", "home": "GiNOVA", "nav.about": "من نحن", "nav.contact": "تواصل معنا", "sales": "استفسارات المبيعات", "nav.engineering": "الهندسة", "nav.decision": "أنظمة القرار", "nav.medialab": "MediaLab™", "nav.ventures": "Ventures", "nav.academy": "الأكاديمية", "here": "أنت هنا", "open": "افتح الموقع", "menu.page": "في هذه الصفحة", "long.decision": "الاستشارات\nوأنظمة القرار", "sites": "مواقع GiNOVA.NET", "sites.h": "GiNOVA.NET", "music": "موسيقى", "d.engineering": "أنظمة الإنتاج ودراسات الجدوى وتطوير المنتجات والعمليات، بما في ذلك الغذائية.", "d.decision": "الاستشارات والبيانات والذكاء الاصطناعي: سؤال قرار واحد، رسوم ثابتة، ملف قرار استثماري واحد.", "d.medialab": "الويب والأفلام والصوت واتصالات العلامة التجارية حسب الطلب.", "d.academy": "مجلس الأكاديمية: خبراء كبار وبحث وتعليم.", "d.ventures": "علامات وشراكات تنشأ من هذا العمل.", "motto.engineering": "“الابتكار ينبض بالحياة بفضل الهندسة”", "motto.decision": "“هندسة قرارات أفضل.”", "motto.medialab": "“الصوت. الحركة. التعبير.”", "motto.academy": "“خبراء متمرسون. بحث. تعليم.”", "motto.ventures": "“علامات تجارية. شراكات. نمو.”", "motto": "قبل أن يأتي المستقبل، تكون مستعدًا.", "fields": "المجالات", "company": "الشركة", "overview": "نظرة عامة", "constitution": "الدستور", "commitments": "الالتزامات", "decide": "كيف نقرر", "research": "البحث", "people": "الأشخاص", "academy": "مجلس الأكاديمية: خبراء كبار وبحث وتعليم.", "ventures": "علامات وشراكات تنشأ من هذا العمل.", "legal": "شركة GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.", "links": "الروابط"},
 es:{"skip": "Saltar al contenido", "home": "Inicio de GiNOVA", "menu": "Menú", "primary": "Principal", "language": "Idioma", "title.engineering": "Ingeniería", "title.decision": "Sistemas de Decisión", "title.medialab": "MediaLab™", "title.academy": "Academia", "title.ventures": "Ventures", "long.decision": "Consultoría y\nSistemas de Decisión", "here": "Está aquí", "close": "Cerrar", "menu.page": "En esta página", "sites.h": "GiNOVA.NET", "open": "Abrir sitio", "links": "Conexiones", "d.engineering": "Sistemas de producción, viabilidad y desarrollo de productos y procesos, incluida la alimentación.", "d.decision": "Consultoría, datos e IA: una pregunta de decisión, una tarifa fija, un Expediente de Decisión de Inversión.", "d.medialab": "Web, cine, sonido y comunicación de marca, por encargo.", "d.academy": "El Consejo de la Academia: expertos senior, investigación y docencia.", "d.ventures": "Marcas y alianzas que nacen de este trabajo.", "nav.academy": "Academia", "nav.ventures": "Ventures", "sites": "Sitios de GiNOVA.NET", "motto.engineering": "“La innovación cobra vida a través de la ingeniería”", "motto.decision": "“Ingeniería de mejores decisiones.”", "motto.medialab": "“Sonido. Movimiento. Expresión.”", "motto.academy": "“Expertos senior. Investigación. Docencia.”", "motto.ventures": "“Marcas. Alianzas. Crecimiento.”", "nav.engineering": "Ingeniería", "nav.decision": "Sistemas de Decisión", "nav.medialab": "MediaLab™", "nav.about": "Nosotros", "nav.contact": "Contacto", "motto": "Antes de que llegue el futuro, usted ya está preparado.", "fields": "Ámbitos", "company": "Empresa", "overview": "Visión general", "constitution": "Constitución", "commitments": "Compromisos", "decide": "Cómo decidimos", "research": "Investigación", "people": "Personas", "academy": "El Consejo de la Academia: expertos senior, investigación y docencia.", "ventures": "Marcas y alianzas que nacen de este trabajo.", "legal": "GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.", "sales": "Consultas comerciales", "music": "Música"},
 zh:{"skip": "跳到内容", "home": "GiNOVA 首页", "menu": "菜单", "primary": "主导航", "language": "语言", "title.engineering": "工程", "title.decision": "决策系统", "title.medialab": "MediaLab™", "title.academy": "学院", "title.ventures": "创投", "long.decision": "咨询与\n决策系统", "here": "您在这里", "close": "关闭", "menu.page": "本页内容", "sites.h": "GiNOVA.NET", "open": "打开网站", "links": "关联", "d.engineering": "生产系统、可行性研究，以及包括食品在内的产品与工艺开发。", "d.decision": "咨询、数据与人工智能：一个决策问题，固定费用，一份投资决策档案。", "d.medialab": "网站、影像、声音与品牌传播，按需定制。", "d.academy": "学院理事会：资深专家、研究与教学。", "d.ventures": "由这项工作孕育的品牌与合作伙伴关系。", "nav.academy": "学院", "nav.ventures": "创投", "sites": "GiNOVA.NET 网站", "motto.engineering": "“以工程让创新成为现实”", "motto.decision": "“用工程方法做出更好的决策。”", "motto.medialab": "“声音。动态。表达。”", "motto.academy": "“资深专家。研究。教学。”", "motto.ventures": "“品牌。合作。成长。”", "nav.engineering": "工程", "nav.decision": "决策系统", "nav.medialab": "MediaLab™", "nav.about": "关于我们", "nav.contact": "联系我们", "motto": "未来到来之前，您已做好准备。", "fields": "领域", "company": "公司", "overview": "概览", "constitution": "章程", "commitments": "承诺", "decide": "我们如何决策", "research": "研究", "people": "团队", "academy": "学院理事会：资深专家、研究与教学。", "ventures": "由这项工作孕育的品牌与合作伙伴关系。", "legal": "GiNOVA Mühendislik ve İleri Teknolojiler A.Ş.", "sales": "销售咨询", "music": "音乐"}
};

var lang=initial(), listeners=[];
function pick(v){var b=String(v||'').trim().replace(/_/g,'-').toLowerCase().split('-')[0];return LANGS[b]?b:null}
function initial(){var r=new URL(location.href).searchParams.get('lang');return r!==null?(pick(r)||'en'):(pick(window.GN_LANG)||'en')}

/* t(): page strings come from window.GN_PAGE = {en:{key:text}, tr:{...}}; falls back to English, then the key. */
function t(key,vars){
  var P=window.GN_PAGE||{},s=(P[lang]&&P[lang][key]);
  if(s===undefined) s=(P.en&&P.en[key]);
  if(s===undefined) s=(C[lang]&&C[lang][key]);
  if(s===undefined) s=(C.en[key]);
  if(s===undefined) return key;
  if(vars) for(var k in vars) s=s.split('{'+k+'}').join(vars[k]);
  return s;
}

function setMotto(el){
  var m=t('motto'),i=m.search(/[,،，]/);
  el.textContent='';
  if(i>0){el.append(m.slice(0,i+1)+' ');var b=document.createElement('b');b.className='gw-m2';b.textContent=m.slice(i+1).trim();el.append(b)}
  else el.textContent=m;
}
function render(){
  var L=LANGS[lang],d=document.documentElement;
  d.lang=L.htmlLang;d.dir=L.dir;d.dataset.locale=lang;
  document.querySelectorAll('[data-c]').forEach(function(e){var k=e.dataset.c;if(k==='motto')setMotto(e);else e.textContent=t(k)});
  document.querySelectorAll('[data-ca]').forEach(function(e){e.setAttribute('aria-label',t(e.dataset.ca))});
  document.querySelectorAll('[data-t]').forEach(function(e){e.textContent=t(e.dataset.t)});
  document.querySelectorAll('[data-th]').forEach(function(e){e.innerHTML=t(e.dataset.th)});   /* page dictionary only, never user input */
  document.querySelectorAll('[data-tph]').forEach(function(e){e.setAttribute('placeholder',t(e.dataset.tph))});
  document.querySelectorAll('[data-taria]').forEach(function(e){e.setAttribute('aria-label',t(e.dataset.taria))});
  var sel=document.getElementById('language-select');
  if(sel){sel.value=lang;sel.setAttribute('aria-label',t('language'))}
  document.querySelectorAll('[data-route]').forEach(function(e){var u=new URL(e.dataset.route,location.href);u.searchParams.set('lang',lang);e.href=u.href});
  if(document.documentElement.dataset.titleKey) document.title=t(document.documentElement.dataset.titleKey);
  var mdesc=document.querySelector('meta[name="description"]');if(mdesc&&t('meta.desc')!=='meta.desc')mdesc.content=t('meta.desc');
  document.dispatchEvent(new Event('ginova-language'));
}
window.GN={t:t,lang:function(){return lang},onLang:function(fn){document.addEventListener('ginova-language',fn)},render:render};

var sel=document.getElementById('language-select');
if(sel) sel.addEventListener('change',function(){
  lang=sel.value;
  var next=new URL(location.href);
  if(next.searchParams.get('lang')!==lang){next.searchParams.set('lang',lang);history.pushState(history.state,'',next)}
  render();
});
addEventListener('popstate',function(){lang=initial();render()});

/* Menu: a full-screen overlay. Hover or focus on a site previews its background; the current site is plain text. */
var mb=document.getElementById('gnMenuBtn'),ov=document.getElementById('gnOverlay'),hd=document.getElementById('gnHeader');
if(mb&&ov&&hd){
  var cur=ov.getAttribute('data-cur'),lbl=mb.querySelector('.lbl'),leaveT=0,lastFocus=null;
  var isOpen=function(){return ov.classList.contains('is-on')};
  var inertOthers=function(v){[].slice.call(document.querySelectorAll('main,footer.gn-world,.gn-skip')).forEach(function(e){if(v)e.setAttribute('inert','');else e.removeAttribute('inert')})};
  var setLbl=function(k){lbl.setAttribute('data-c',k);lbl.textContent=t(k)};
  /* the "On this page" panel ends just below the current site's row (so the layer reads as one shape), never taller than it needs;
     without script it simply stretches to the full column */
  var fitPanel=function(){var li=ov.querySelector('li.is-cur'),pg=ov.querySelector('.gn-ovpage');if(!li||!pg)return;
    pg.style.minHeight='';pg.style.alignSelf='';if(matchMedia('(max-width:900px)').matches)return;
    pg.style.alignSelf='start';var need=li.offsetTop+li.offsetHeight-(pg.offsetTop-pg.offsetParent.offsetTop)+30;
    var r=li.getBoundingClientRect(),p=pg.getBoundingClientRect();need=Math.max(need,r.bottom-p.top+30-(li.style.transform?0:0));
    if(need>pg.offsetHeight)pg.style.minHeight=need+'px'};
  var focusables=function(){return [].slice.call(document.querySelectorAll('#gnHeader button,#gnHeader a[href],#gnHeader .language-trigger,#gnOverlay a[href],#gnOverlay button')).filter(function(e){return e.offsetParent!==null||e===mb})};
  function openMenu(){
    lastFocus=document.activeElement;ov.classList.add('is-on');hd.classList.add('is-open');mb.setAttribute('aria-expanded','true');
    document.documentElement.classList.add('gn-lock');inertOthers(true);setLbl('close');ov.setAttribute('data-site',cur);
    ov.setAttribute('tabindex','-1');setTimeout(function(){ov.focus({preventScroll:true})},60);setTimeout(fitPanel,700);   /* focus the dialog itself so no site is previewed until the visitor points at one */
  }
  function closeMenu(returnFocus){
    ov.classList.remove('is-on');hd.classList.remove('is-open');mb.setAttribute('aria-expanded','false');
    document.documentElement.classList.remove('gn-lock');inertOthers(false);setLbl('menu');
    if(returnFocus)(lastFocus&&lastFocus.focus?lastFocus:mb).focus({preventScroll:true});
  }
  mb.addEventListener('click',function(){isOpen()?closeMenu(true):openMenu()});
  addEventListener('resize',function(){if(isOpen())fitPanel()});
  document.addEventListener('keydown',function(e){
    if(!isOpen())return;
    if(e.key==='Escape'&&!document.querySelector('.language-panel:not([hidden])')){e.preventDefault();closeMenu(true);mb.focus();return}
    if(e.key==='Tab'){var f=focusables();if(!f.length)return;var i=f.indexOf(document.activeElement);
      if(e.shiftKey&&(i<=0)){e.preventDefault();f[f.length-1].focus()}else if(!e.shiftKey&&(i===f.length-1)){e.preventDefault();f[0].focus()}}
  });
  [].slice.call(ov.querySelectorAll('a.gn-row')).forEach(function(a){
    var k=a.getAttribute('data-s');
    a.addEventListener('pointerenter',function(){clearTimeout(leaveT);ov.setAttribute('data-site',k)});
    a.addEventListener('focus',function(){clearTimeout(leaveT);ov.setAttribute('data-site',k)});
  });
  var back=function(){clearTimeout(leaveT);leaveT=setTimeout(function(){ov.setAttribute('data-site',cur)},160)};
  ov.querySelector('.gn-ovsites').addEventListener('pointerleave',back);
  ov.querySelector('.gn-ovsites').addEventListener('focusout',function(e){if(!ov.querySelector('.gn-ovsites').contains(e.relatedTarget))back()});
  [].slice.call(ov.querySelectorAll('.gn-pl,.gn-all')).forEach(function(a){a.addEventListener('click',function(){closeMenu(false)})});
  /* on a phone, Contact and the language field live at the foot of the overlay so the bar stays clean */
  var foot=document.getElementById('gnOvFoot'),links=document.getElementById('gnLinks'),narrow=matchMedia('(max-width:760px)');
  var place=function(){var co=document.getElementById('gnCompany'),c=document.getElementById('gnContact'),l=document.querySelector('.language-switcher'),m=document.getElementById('gnMenuBtn');if(!c||!l||!co||!m)return;
    if(narrow.matches){foot.appendChild(co);foot.appendChild(c);foot.appendChild(l)}else{links.insertBefore(co,m);links.insertBefore(c,m);links.appendChild(l)}};
  place();if(narrow.addEventListener)narrow.addEventListener('change',place);
}
/* Chapter marker: the section in view, quietly centred in the header, and a hairline that fills as the page is read.
   Hidden on the opening screen and while the menu is open. Decorative: the menu already lists the sections for assistive technology. */
(function(){
  var secs=[].slice.call(document.querySelectorAll('main section[data-nav]')),mk=document.querySelector('.gn-sec'),prog=document.querySelector('.gn-prog i');
  if(!secs.length||!mk)return;
  var mn=mk.querySelector('.n'),mt=mk.querySelector('.t'),curIdx=-1,queued=false;
  var label=function(i){mn.textContent=('0'+(i+1)).slice(-2);mt.textContent=t(secs[i].getAttribute('data-nav'))};
  var update=function(){
    queued=false;var y=window.innerHeight*.45,idx=0;
    secs.forEach(function(s,i){if(s.getBoundingClientRect().top<=y)idx=i});
    var show=window.scrollY>window.innerHeight*.35;
    mk.classList.toggle('on',show);
    if(idx!==curIdx){curIdx=idx;label(idx);if(show){mk.classList.remove('swap');void mk.offsetWidth;mk.classList.add('swap')}}
    if(prog){var h=document.documentElement.scrollHeight-window.innerHeight;prog.style.setProperty('--p',h>0?Math.min(1,window.scrollY/h):0)}
  };
  var req=function(){if(!queued){queued=true;requestAnimationFrame(update)}};
  addEventListener('scroll',req,{passive:true});addEventListener('resize',req);
  document.addEventListener('ginova-language',function(){if(curIdx>=0)label(curIdx)});
  update();
})();
/* Flag bar: every rectangle is the same whole number of device pixels long at any zoom or screen scaling (12 css px rounded to physical pixels). */
(function(){
  var set=function(){var d=window.devicePixelRatio||1;document.documentElement.style.setProperty('--seg',(Math.max(1,Math.round(12*d))/d)+'px')};
  set();addEventListener('resize',set);
})();
/* the page's own script may add strings before or after this; render now and again once the page is ready */
render();
document.addEventListener('DOMContentLoaded',render);
})();

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
let lastGroup=null;const options=Array.from(native.options).map(option=>{
 if(lastGroup!==null&&option.dataset.group!==lastGroup){const sep=document.createElement('div');sep.className='language-sep';sep.setAttribute('role','separator');panel.append(sep)}lastGroup=option.dataset.group;
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

/* Shared footer behaviour, from ginova.org's limb.js without the home page's gate tones.
   The light orb on the horizon pauses off-screen, in hidden tabs and for reduced motion.
   Footer music: Kunter's own tracks, a small list. Nothing loads or plays until a visitor opens the list and picks a track. */
(function(){
var svg=document.querySelector('.gw-limb');
if(svg&&svg.pauseAnimations){
  var rm=matchMedia('(prefers-reduced-motion: reduce)'),seen=true;
  var apply=function(){(seen&&!document.hidden&&!rm.matches)?svg.unpauseAnimations():svg.pauseAnimations()};
  if('IntersectionObserver' in window)new IntersectionObserver(function(e){seen=e[0].isIntersecting;apply()}).observe(svg);
  document.addEventListener('visibilitychange',apply);if(rm.addEventListener)rm.addEventListener('change',apply);apply();
}
var A=(window.GN_AUDIO_BASE)||'https://ginova.org/assets/evolution-20261105/audio/';
var TRACKS=[['Quindici','quindici',227],['Dove Sei, Papà','dove-sei-papa',291],['Un Bacio a Pozzuoli','un-bacio-a-pozzuoli',232],['Sangue Azzurro','sangue-azzurro',162],['Campi Flegrei','campi-flegrei',357],['Regina del Golfo','regina-del-golfo',206],['La Trattoria di Ischia','la-trattoria-di-ischia',246],['End of the Century','end-of-the-century',213]];
var btn=document.querySelector('.gw-snd'),base=document.querySelector('.gw-base');if(!btn||!base)return;
var mmss=function(s){return Math.floor(s/60)+':'+String(s%60).padStart(2,'0')};
var panel=document.createElement('div');panel.className='gw-tracks';panel.id='gw-tracks';panel.hidden=true;panel.setAttribute('role','group');
var rows=TRACKS.map(function(r,i){var b=document.createElement('button');b.type='button';b.className='gw-trk';b.innerHTML='<span class="gw-trk-dot" aria-hidden="true"></span><span class="gw-trk-t"></span><span class="gw-trk-d"></span>';
  b.querySelector('.gw-trk-t').textContent=r[0];b.querySelector('.gw-trk-d').textContent=mmss(r[2]);b.dataset.i=i;panel.append(b);return b});
base.append(panel);btn.setAttribute('aria-haspopup','true');btn.setAttribute('aria-expanded','false');btn.setAttribute('aria-controls','gw-tracks');
var label=function(){panel.setAttribute('aria-label',btn.getAttribute('aria-label')||'Music')};label();document.addEventListener('ginova-language',label);
var audio=null,cur=-1,open=false;
var mark=function(){var playing=!!audio&&!audio.paused;btn.setAttribute('aria-pressed',String(playing));rows.forEach(function(r,i){r.classList.toggle('is-on',i===cur);r.setAttribute('aria-pressed',String(i===cur&&playing))})};
function play(i){if(!audio){audio=new Audio();audio.preload='none';audio.volume=.5;audio.addEventListener('ended',function(){play((cur+1)%TRACKS.length)});audio.addEventListener('pause',mark);audio.addEventListener('play',mark)}
  if(i===cur){audio.paused?audio.play().catch(mark):audio.pause();return}
  cur=i;audio.src=A+TRACKS[i][1]+'.mp3';audio.play().catch(mark);mark()}
var setOpen=function(v){open=v;panel.hidden=!v;btn.setAttribute('aria-expanded',String(v))};
btn.addEventListener('click',function(){setOpen(!open)});
panel.addEventListener('click',function(e){var r=e.target.closest('.gw-trk[data-i]');if(r)play(+r.dataset.i)});
document.addEventListener('pointerdown',function(e){if(open&&!panel.contains(e.target)&&!btn.contains(e.target))setOpen(false)});
document.addEventListener('keydown',function(e){if(open&&e.key==='Escape'){setOpen(false);btn.focus()}});
})();
