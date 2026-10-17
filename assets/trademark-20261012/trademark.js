/* Add visual marks without rewriting URLs, emails, translation catalogs or media. */
(()=>{'use strict';const skip='script,style,noscript,textarea,input,option,select,svg,canvas,video,audio,iframe,code,pre,.gn-tm-text,.ginova-wordmark-frame,.gn-tm-image';let queued=0;
function brandText(){const walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT),nodes=[];while(walker.nextNode()){const n=walker.currentNode;if(n.parentElement&&!n.parentElement.closest(skip)&&/ginova|medialab/i.test(n.nodeValue))nodes.push(n);}for(const node of nodes){const value=node.nodeValue,re=/\b(?:ginova|medialab)\b/gi,parts=[];let match,last=0;while((match=re.exec(value))){const before=value[match.index-1]||'',after=value[re.lastIndex]||'',tail=value.slice(re.lastIndex);if(/[\w@./]/.test(before)||(/[\w@/]/.test(after)||/^\.[a-z0-9]/i.test(tail))||/^\s*[™®]/.test(tail))continue;parts.push(document.createTextNode(value.slice(last,match.index)));const span=document.createElement('span');span.className='gn-tm-text';span.textContent=match[0];parts.push(span);last=re.lastIndex;}if(last){parts.push(document.createTextNode(value.slice(last)));node.replaceWith(...parts);}}}
function logos(){document.querySelectorAll('img[src*="/brand-20261012/primary.png"]').forEach(img=>{const frame=img.closest('.ginova-wordmark-frame');if(frame){frame.classList.add('gn-tm-logo');return;}if(img.parentElement?.classList.contains('gn-tm-image'))return;const wrap=document.createElement('span');wrap.className='gn-tm-image';img.before(wrap);wrap.append(img);});}

function markMediaLab(value, suffix='') {
 return value.replace(/\bmedialab\b/gi,(brand,offset,source)=>{
  const before=source[offset-1]||'',after=source[offset+brand.length]||'',tail=source.slice(offset+brand.length)+suffix;
  if(/[\w@./]/.test(before)||/[\w@/=]/.test(after)||/^\.[a-z0-9]/i.test(tail)||/^\s*(?:[™®]|&trade;|&#(?:8482|x2122);)/i.test(tail))return brand;
  return brand+'™';
 });
}
function metadata(){const title=markMediaLab(document.title);if(title!==document.title)document.title=title;document.querySelectorAll('[aria-label],[title],[placeholder],img[alt],meta[name="description"],meta[property="og:title"],meta[property="og:description"],meta[property="og:site_name"],meta[name="twitter:title"],meta[name="twitter:description"]').forEach(element=>{for(const name of ['aria-label','title','placeholder','alt','content']){const old=element.getAttribute(name);if(old!==null){const value=markMediaLab(old);if(value!==old)element.setAttribute(name,value);}}});document.querySelectorAll('option').forEach(option=>{const value=markMediaLab(option.textContent);if(value!==option.textContent)option.textContent=value;});}
function apply(){queued=0;observer.disconnect();logos();brandText();metadata();observer.observe(document.body,{childList:true,subtree:true,characterData:true});}
function schedule(){if(!queued)queued=requestAnimationFrame(apply);}
const observer=new MutationObserver(schedule);apply();document.addEventListener('ginova-language',schedule);document.addEventListener('ginova-preview-scene',schedule);})();
