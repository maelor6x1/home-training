import {APP} from '../config.js';import {SPLITS} from '../data/plans.js';import {state,commit} from '../core/state.js';import {today,dateDiff} from '../core/utils.js';
export class WorkoutEngine{
 constructor(items,split='A'){this.items=items;this.split=split;this.index=0;this.set=1;this.done=0;this.sessionSets=0;this.started=Date.now();this.finished=false}
 get current(){return this.items[this.index]}
 get isWarmup(){return this.index<2}
 get isCooldown(){return this.index>=this.items.length-2}
 completeRep(){this.done=Math.min(this.current.target,this.done+1);return this.done}
 changeRep(delta){this.done=Math.max(0,Math.min(this.current.target,this.done+delta));return this.done}
 canAdvance(){return this.current.type==='time'?true:this.done>=this.current.target}
 finishSet(){this.sessionSets++;state.sets++;this.done=0;if(this.set<this.current.sets){this.set++;commit();return {rest:this.current.rest,done:false}}this.index++;this.set=1;if(this.index>=this.items.length){this.finish();return {done:true}}return {rest:this.current.rest,done:false}}
 skip(){this.index++;this.set=1;this.done=0;if(this.index>=this.items.length){this.finish();return true}return false}
 replace(ex){this.items[this.index]={...ex};this.set=1;this.done=0}
 finish(){if(this.finished)return;this.finished=true;const minutes=Math.max(1,Math.round((Date.now()-this.started)/60000));const xp=80+this.sessionSets*10;const t=today();state.workouts++;state.minutes+=minutes;state.xp+=xp;if(state.lastWorkout!==t){state.streak=state.lastWorkout&&dateDiff(state.lastWorkout,t)===1?state.streak+1:1}state.lastWorkout=t;if(!state.completedSplits.includes(this.split))state.completedSplits.push(this.split);state.history.unshift({date:t,split:this.split,name:SPLITS[this.split]?.name||'Treino',minutes,sets:this.sessionSets,xp});state.history=state.history.slice(0,APP.maxHistory);commit();this.result={minutes,xp,sets:this.sessionSets,split:this.split,completed:true}}
}
