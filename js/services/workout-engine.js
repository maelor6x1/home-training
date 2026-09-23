import {APP} from '../config.js';import {SPLITS} from '../data/plans.js';import {state,commit} from '../core/state.js';import {today,dateDiff} from '../core/utils.js';import {recordExerciseSet,completeExercise} from './progression.js';
export class WorkoutEngine{
 constructor(items,split='A'){this.items=items;this.split=split;this.index=0;this.set=1;this.done=0;this.sessionSets=0;this.started=Date.now();this.finished=false;this.completedIds=new Set()}
 get current(){return this.items[this.index]}
 get isWarmup(){return this.current?.phase==='warmup'||this.index<2}
 get isCooldown(){return this.current?.phase==='cooldown'||this.index>=this.items.length-2}
 completeRep(){this.done=Math.min(this.current.target,this.done+1);return this.done}
 changeRep(delta){this.done=Math.max(0,Math.min(this.current.target,this.done+delta));return this.done}
 canAdvance(){return true}
 finishSet(){const ex=this.current;if(!ex)return {done:true};const target=ex.type==='time'?ex.target:Math.max(this.done,ex.target);this.done=target;this.sessionSets++;state.sets++;recordExerciseSet(ex,target);this.done=0;
   if(this.set<ex.sets){this.set++;commit();return {rest:ex.rest,done:false}}
   completeExercise(ex);this.completedIds.add(ex.id);this.index++;this.set=1;commit();
   if(this.index>=this.items.length){this.finish();return {done:true}}
   return {rest:ex.rest,done:false}
 }
 skip(){this.index++;this.set=1;this.done=0;if(this.index>=this.items.length){this.finish();return true}return false}
 replace(ex){this.items[this.index]={...ex};this.set=1;this.done=0}
 finish(){if(this.finished)return;this.finished=true;const minutes=Math.max(1,Math.round((Date.now()-this.started)/60000));const xp=80+this.sessionSets*10+Math.max(0,this.completedIds.size-5)*5;const t=today();state.workouts++;state.minutes+=minutes;state.xp+=xp;if(state.lastWorkout!==t){state.streak=state.lastWorkout&&dateDiff(state.lastWorkout,t)===1?state.streak+1:1}state.lastWorkout=t;if(!state.completedSplits.includes(this.split))state.completedSplits.push(this.split);state.history.unshift({date:t,split:this.split,name:SPLITS[this.split]?.name||'Treino',minutes,sets:this.sessionSets,xp,exercises:this.completedIds.size});state.history=state.history.slice(0,APP.maxHistory);commit();this.result={minutes,xp,sets:this.sessionSets,split:this.split,completed:true,exercises:this.completedIds.size}}
}
