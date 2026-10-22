/* Progressive observation outline. In-memory fields only; mailto is opened only by the visitor. */
(()=>{'use strict';
 const section=document.getElementById('start'),form=document.getElementById('consultancy-enquiry'),controls=document.getElementById('intake-controls');
 if(!section?.classList.contains('g0-intake')||!form||!controls||!window.GinovaIntakeCopy)return;
 const $=id=>document.getElementById(id),steps=[...form.querySelectorAll('[data-intake-step]')];
 const answers=[0,1,2,3].map(i=>$('intake-answer-'+i)),unknowns=[...form.querySelectorAll('[data-intake-unknown]')];
 const summary=$('intake-summary'),next=$('intake-next'),back=$('intake-back'),openEmail=$('intake-open-email'),error=$('intake-error');
 let step=0,locale='',summaryEdited=false,summarySource='',hasSummary=false,clearanceFrame=0;
 const language=()=>{const code=(document.documentElement.dataset.locale||document.documentElement.lang||'en').split('-')[0];return window.GinovaIntakeCopy[code]?code:'en'};
 const words=()=>window.GinovaIntakeCopy[language()];
 const fingerprint=()=>JSON.stringify(answers.map((field,i)=>[field.value,unknowns[i].checked]));
 function clearError(){error.hidden=true;error.textContent='';answers.forEach(field=>field.removeAttribute('aria-invalid'));summary.removeAttribute('aria-invalid')}
 function showError(message,field){error.textContent=message;error.hidden=false;field.setAttribute('aria-invalid','true');field.focus()}
 function validStep(){if(step===4)return validSummary();if(answers[step].value.trim()||unknowns[step].checked){clearError();return true}showError(words().validation,answers[step]);return false}
 function validSummary(){if(summary.value.trim()&&summary.value.length<=2500){clearError();return true}showError(words().summaryValidation,summary);return false}
 function updateEmail(){
  const value=summary.value.trim(),valid=value.length>0&&value.length<=2500;
  $('intake-summary-count').textContent=summary.value.length+' / 2500';
  openEmail.setAttribute('aria-disabled',String(!valid));
  if(valid)openEmail.href='mailto:satis@ginova.org?subject='+encodeURIComponent(words().subject)+'&body='+encodeURIComponent(value);else openEmail.removeAttribute('href');
 }
 function rebuild(){
  const t=words();summary.value=[t.summaryHeading,'',...answers.flatMap((field,i)=>[(i+1)+'. '+t.prompts[i],field.value.trim()||t.unknown,'']),t.summaryFooter].join('\n');
  summaryEdited=false;summarySource=fingerprint();hasSummary=true;$('intake-summary-preserved').hidden=true;updateEmail();
 }
 function review(){
  if(!hasSummary||!summaryEdited)rebuild();
  else{$('intake-summary-preserved').hidden=summarySource===fingerprint();updateEmail()}
 }
 function display(focus){
  const t=words();steps.forEach((element,i)=>element.hidden=i!==step);
  form.querySelectorAll('[data-intake-step-name]').forEach((element,i)=>{if(i===step)element.setAttribute('aria-current','step');else element.removeAttribute('aria-current')});
  $('intake-progress').value=step+1;$('intake-progress').setAttribute('aria-label',t.progress+' '+(step+1)+' / 5');
  $('intake-progress-text').textContent=t.progress+' '+(step+1)+' / 5';
  back.hidden=step===0;next.hidden=step===4;openEmail.hidden=step!==4;next.textContent=step===3?t.review:t.next;
  if(focus)$('intake-heading-'+step).focus();
  scheduleClearance();
 }
 function render(){
  const nextLocale=language(),changed=locale!==nextLocale;locale=nextLocale;const t=words();
  section.querySelectorAll('[data-intake]').forEach(element=>{const value=t[element.dataset.intake];if(typeof value==='string')element.textContent=value});
  section.querySelectorAll('[data-intake-prompt]').forEach(element=>element.textContent=t.prompts[Number(element.dataset.intakePrompt)]);
  section.querySelectorAll('[data-intake-hint]').forEach(element=>element.textContent=t.hints[Number(element.dataset.intakeHint)]);
  section.querySelectorAll('[data-intake-step-name]').forEach(element=>element.textContent=t.steps[Number(element.dataset.intakeStepName)]);
  form.querySelector('.g0-intake-steps').setAttribute('aria-label',t.stepLabel);
  if(changed&&hasSummary&&!summaryEdited)rebuild();
  if(!error.hidden)error.textContent=step===4?t.summaryValidation:t.validation;
  display(false);updateEmail();
 }
 form.addEventListener('submit',event=>{event.preventDefault();if(step===4)return;if(!validStep())return;step++;if(step===4)review();display(true)});
 back.addEventListener('click',()=>{if(step>0){clearError();step--;display(true)}});
 answers.forEach((field,i)=>field.addEventListener('input',()=>{if(field.value.trim())unknowns[i].checked=false;if(step===i)clearError()}));
 unknowns.forEach((field,i)=>field.addEventListener('change',()=>{if(step===i&&field.checked)clearError()}));
 summary.addEventListener('input',()=>{summaryEdited=true;clearError();updateEmail()});
 $('intake-rebuild').addEventListener('click',()=>{rebuild();summary.focus()});
 openEmail.addEventListener('click',event=>{if(!validSummary())event.preventDefault();else updateEmail()});
 function clearance(){
  clearanceFrame=0;const nav=document.querySelector('.section-elevator');if(!nav)return;
  const a=nav.getBoundingClientRect(),b=form.getBoundingClientRect();
  const overlap=a.width>0&&a.height>0&&b.width>0&&a.left<b.right&&a.right>b.left&&a.top<b.bottom&&a.bottom>b.top;
  nav.classList.toggle('g0-intake-overlap',overlap);
 }
 function scheduleClearance(){if(!clearanceFrame)clearanceFrame=requestAnimationFrame(()=>{clearanceFrame=requestAnimationFrame(clearance)})}
 addEventListener('scroll',scheduleClearance,{passive:true});addEventListener('resize',scheduleClearance);
 if('ResizeObserver'in window)new ResizeObserver(scheduleClearance).observe(form);
 document.addEventListener('ginova-language',render);
 // The HTML fieldset starts disabled. Only enable entry after listeners and
 // localized rendering succeed, so a blocked/missing script cannot native-GET answers.
 render();controls.disabled=false;const fallback=$('intake-fallback');if(fallback)fallback.hidden=true;
})();
