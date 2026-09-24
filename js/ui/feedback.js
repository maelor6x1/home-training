import {$} from '../core/utils.js';
import {saveFeedback} from '../services/feedback.js';
import {showReward} from './reward.js';

let pending=null;
export function showFeedback(result){
  pending=result;
  $('#feedbackModal').classList.remove('hidden');
  document.querySelectorAll('[data-feeling]').forEach(b=>b.classList.remove('selected'));
  $('#feedbackComment').value='';
  $('#feedbackError').textContent='';
  $('#feedbackContinue').textContent='Continuar';
  $('#feedbackContinue').disabled=true;
}
function submit(){
  const selected=document.querySelector('[data-feeling].selected');
  if(!selected||!pending)return;
  const entry=saveFeedback({feeling:selected.dataset.feeling,comment:$('#feedbackComment').value,result:pending});
  $('#feedbackModal').classList.add('hidden');
  window.__pendingWorkoutResult=null;
  showReward(pending,entry);
  pending=null;
}
export function initFeedback(){
  document.querySelectorAll('[data-feeling]').forEach(b=>b.onclick=()=>{
    document.querySelectorAll('[data-feeling]').forEach(x=>x.classList.remove('selected'));
    b.classList.add('selected');
    $('#feedbackContinue').disabled=false;
  });
  $('#feedbackContinue').onclick=submit;
  $('#feedbackSkip').onclick=()=>{if(!pending)return;$('#feedbackModal').classList.add('hidden');const r=pending;pending=null;showReward(r,null)};
}
