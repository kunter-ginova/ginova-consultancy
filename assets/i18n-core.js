(()=>{'use strict';
const pack=window.GinovaLocaleData,manifest=pack.manifest,byCode=Object.fromEntries(manifest.map(x=>[x.code,x]));
const normalize=value=>{const raw=String(value||'').toLowerCase();if(/^zh(?:$|-cn$|-sg$|-hans(?:-|$))/.test(raw))return'zh';if(raw.startsWith('zh'))return null;const base=raw.split('-')[0];return byCode[base]?base:null};
const initial=()=>normalize(new URLSearchParams(location.search).get('lang'))||'en';
const current=()=>normalize(document.documentElement.lang)||'en';
const lookup=new Map();Object.entries(pack.catalog).forEach(([id,row])=>{lookup.set(row.source.trim(),id);lookup.set(row.translations.en.trim(),id)});
const bindings=[];const walker=document.createTreeWalker(document.documentElement,NodeFilter.SHOW_TEXT);let node;
while(node=walker.nextNode()){if(node.parentElement?.closest('script,style,svg,[data-t],[data-t-html],[translate="no"],.language-switcher'))continue;const id=lookup.get(node.nodeValue.trim());if(id)bindings.push({node,id,prefix:node.nodeValue.match(/^\s*/)[0],suffix:node.nodeValue.match(/\s*$/)[0]})}
document.querySelectorAll('*').forEach(el=>{for(const attr of ['alt','aria-label','placeholder','title']){const val=el.getAttribute(attr);const id=val&&lookup.get(val.trim());if(id)bindings.push({el,attr,id})}if(el.matches('meta[name="description"]')){const id=lookup.get(el.content.trim());if(id)bindings.push({el,attr:'content',id})}});
function apply(code){if(!byCode[code])throw new Error('Unsupported locale: '+code);const m=byCode[code];document.documentElement.lang=m.htmlLang;document.documentElement.dir=m.dir;for(const b of bindings){const value=pack.catalog[b.id].translations[code];if(typeof value!=='string')throw new Error('Missing locale '+code+'/'+b.id);if(b.node)b.node.nodeValue=b.prefix+value+b.suffix;else b.el.setAttribute(b.attr,value)}const select=document.getElementById('language-select');if(select){select.value=code;select.setAttribute('aria-label',pack.portal[code].languageLabel)}}
function route(el,code){const url=new URL(el.dataset.route,location.href);url.searchParams.set('lang',code);if(el.dataset.sample)url.searchParams.set('sample',el.dataset.sample);if(el.dataset.anchor)url.hash=el.dataset.anchor;el.href=url.href}
function navigate(code){const url=new URL(location.href);url.searchParams.set('lang',code);if(url.href!==location.href)history.pushState(history.state,'',url.pathname+url.search+url.hash)}
const key=event=>document.documentElement.dir==='rtl'&&['ArrowLeft','ArrowRight'].includes(event.key)?(event.key==='ArrowLeft'?'ArrowRight':'ArrowLeft'):event.key;
window.GinovaI18n={key,normalize,initial,current,apply,route,navigate,manifest,runtime:pack.runtime,portal:pack.portal,staticText:(source,code=current())=>{const id=lookup.get(source);if(!id)throw new Error('Unmapped text '+source);return pack.catalog[id].translations[code]}};
})();
