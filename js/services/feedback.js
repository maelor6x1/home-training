import {state,commit} from '../core/state.js';
import {clamp,today} from '../core/utils.js';

const WORDS={
  easy:['fácil','facil','leve','tranquilo','tranquila','sobrou','poderia mais','muito fácil','muito facil','sem esforço','folgado'],
  hard:['difícil','dificil','pesado','pesada','cansativo','cansativa','exausto','exausta','muito intenso','intenso demais','não consegui','nao consegui','quase não consegui','quase nao consegui','difícil demais','dificil demais'],
  caution:['dor','dores','machuquei','machucado','lesão','lesao','tontura','tontura','enjoo','náusea','nausea','falta de ar','mal estar','mal-estar']
};
const has=(text,arr)=>arr.some(w=>text.includes(w));

export function analyzeFeedback(feeling,comment=''){
  const text=`${feeling} ${comment}`.toLowerCase().trim();
  let adjustment=0,reason='Treino mantido';
  if(feeling==='easy') adjustment=1;
  if(feeling==='hard') adjustment=-1;
  if(has(text,WORDS.easy)) adjustment=Math.max(adjustment,1);
  if(has(text,WORDS.hard)) adjustment=Math.min(adjustment,-1);
  if(has(text,WORDS.caution)){adjustment=Math.min(adjustment,-2);reason='Redução preventiva após o feedback';}
  else if(adjustment>0) reason='Aumentar levemente a progressão';
  else if(adjustment<0) reason='Reduzir levemente a carga do próximo treino';
  return {adjustment:clamp(adjustment,-2,1),reason,flags:{caution:has(text,WORDS.caution)}};
}

export function saveFeedback({feeling,comment='',result}){
  const analysis=analyzeFeedback(feeling,comment);
  const entry={date:today(),feeling,comment:comment.trim().slice(0,500),adjustment:analysis.adjustment,reason:analysis.reason,flags:analysis.flags,split:result?.split||null};
  state.feedback.history.unshift(entry);
  state.feedback.history=state.feedback.history.slice(0,20);
  state.feedback.last=entry;
  state.feedback.adjustment=analysis.adjustment;
  state.feedback.reason=analysis.reason;
  state.feedback.updatedAt=Date.now();
  commit();
  return entry;
}

export function feedbackSummary(){
  const f=state.feedback?.last;
  if(!f)return null;
  return f;
}

export function nextWorkoutAdjustment(){return clamp(Number(state.feedback?.adjustment)||0,-2,1)}

export function consumeFeedbackAdjustment(){ const value=nextWorkoutAdjustment(); if(state.feedback) { state.feedback.adjustment=0; state.feedback.reason=''; commit(); } return value; }
