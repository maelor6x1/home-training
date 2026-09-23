import {state,commit} from '../core/state.js';

const LEVEL_CAP={beginner:1,intermediate:2,advanced:3};
const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
function feedbackAdjustment(){return Math.max(-2,Math.min(1,Number(state.feedback?.adjustment)||0))}

export function getProgress(id){
  return state.progress?.[id] || {sessions:0,sets:0,bestTarget:0,lastTarget:0};
}

export function getAdaptiveTarget(ex){
  const p=getProgress(ex.id);
  const level=LEVEL_CAP[state.answers.level]||1;
  const levelBonus=level===3?3:level===2?2:0;
  let target=ex.base+levelBonus;
  const feedback=feedbackAdjustment();
  if(feedback>0) target += ex.type==='time'?5:1;
  if(feedback<0) target -= ex.type==='time'?5:Math.abs(feedback);
  if(feedback<=-2) target -= ex.type==='time'?5:1;
  if(p.sessions>=2) target += ex.type==='time'?5:1;
  if(p.sessions>=4) target += ex.type==='time'?5:1;
  if(p.sessions>=7) target += ex.type==='time'?5:1;
  if(ex.type==='time') return clamp(target,15,90);
  return clamp(target,3,30);
}

export function getAdaptiveSets(ex){
  const p=getProgress(ex.id);
  let sets=ex.sets||3;
  if(p.sessions>=6 && !['warmup','cooldown'].includes(ex.phase)) sets=Math.min(4,sets+1);
  return sets;
}

export function recordExerciseSet(ex,target){
  if(!ex?.id)return;
  const p=getProgress(ex.id);
  p.sets=(p.sets||0)+1;
  p.lastTarget=target;
  p.bestTarget=Math.max(p.bestTarget||0,target);
  state.progress[ex.id]=p;
  commit();
}

export function completeExercise(ex){
  if(!ex?.id)return;
  const p=getProgress(ex.id);
  p.sessions=(p.sessions||0)+1;
  state.progress[ex.id]=p;
  commit();
}

export function progressLabel(ex){
  const p=getProgress(ex.id);
  if(!p.sessions)return 'Base';
  return ex.type==='time'?`+${Math.max(0,getAdaptiveTarget(ex)-ex.base)}s`:`+${Math.max(0,getAdaptiveTarget(ex)-ex.base)} reps`;
}
