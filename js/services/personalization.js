import {EXERCISES,EXERCISE_BY_ID} from '../data/exercises.js';import {SPLITS} from '../data/plans.js';import {LABELS} from '../config.js';import {state} from '../core/state.js';import {getAdaptiveTarget,getAdaptiveSets} from './progression.js';import {nextWorkoutAdjustment,consumeFeedbackAdjustment} from './feedback.js';
const LEVEL={beginner:1,intermediate:2,advanced:3};
export function planSummary(){const goals=state.answers.goal||[];const names=goals.map(g=>LABELS.goal[g]).filter(Boolean);const map={hypertrophy:'Construtor de Massa',strength:'Força em Casa',calisthenics:'Calistenia Progressiva',conditioning:'Condicionamento em Casa',mobility:'Mobilidade e Flexibilidade'};return {name:goals.length===1?(map[goals[0]]||'Plano personalizado'):'Plano personalizado',desc:`Treinos combinando ${names.join(' + ')||'suas metas'} com sua rotina e equipamentos.`}}
export function hasEquipment(required){const have=state.answers.equipment||['none'];if(required==='none')return true;return have.includes(required)}
export function compatible(ex){return hasEquipment(ex.equipment)&&LEVEL[ex.level]<=LEVEL[state.answers.level]+1}
export function targetFor(ex){return getAdaptiveTarget(ex)}
export function setsFor(ex){return getAdaptiveSets(ex)}
function goalBoost(ex){const goals=state.answers.goal||[];return (ex.goals||[]).some(g=>goals.includes(g))}
function goalSplit(){const goals=state.answers.goal||[];if(goals.includes('mobility')&&!goals.some(g=>['hypertrophy','strength','conditioning','calisthenics'].includes(g)))return 'MOBILITY';if(goals.includes('conditioning')&&!goals.some(g=>['hypertrophy','strength','calisthenics'].includes(g)))return 'HIIT';return null}
export function splitForFrequency(){const n=Number(state.answers.frequency);const goals=state.answers.goal||[];if(goals.includes('mobility')&&goals.length===1)return ['MOBILITY','MOBILITY'];if(goals.includes('conditioning')&&goals.length===1)return ['HIIT','HIIT','HIIT'];if(n===2)return ['FULL','FULL'];if(n>=4)return ['A','B','C','FULL'];return ['A','B','C']}
export function recommendedSplit(){const special=goalSplit();if(special&&state.workouts===0)return special;const seq=splitForFrequency();return seq[Math.max(0,state.workouts%seq.length)]}
export function buildWorkout(split){const plan=SPLITS[split]||SPLITS.FULL;const selected=[];const add=(x)=>{if(x&&compatible(x)&&!selected.some(y=>y.id===x.id))selected.push(x)};
  // Primeiro preenche o esqueleto do split, preservando os grupos musculares corretos.
  for(const id of plan.ids)add(EXERCISE_BY_ID[id]);
  const adj=nextWorkoutAdjustment();
  const difficultyScore=(x)=>{const order={beginner:1,intermediate:2,advanced:3};const user=order[state.answers.level]||1;const lv=order[x.level]||1;return adj<0?Math.abs(lv-Math.max(1,user-1)):adj>0?Math.abs(lv-Math.min(3,user+1)):Math.abs(lv-user)};
  const shuffle=(arr)=>arr.sort(()=>Math.random()-.5).sort((a,b)=>difficultyScore(a)-difficultyScore(b));
  const focused=shuffle(EXERCISES.filter(x=>!x.phase&&plan.bodies.includes(x.body)&&compatible(x)&&goalBoost(x)));
  for(const x of focused)add(x);
  const neutral=shuffle(EXERCISES.filter(x=>!x.phase&&plan.bodies.includes(x.body)&&compatible(x)));
  for(const x of neutral)add(x);
  const limit=split==='HIIT'?7:split==='MOBILITY'?6:6;
  const main=selected.slice(0,limit);
  const warmIds=['arm-circles','dynamic-lunge','cat-cow'];
  const coolIds=['chest-stretch','quad-stretch','hamstring-stretch'];
  const warm=warmIds.map(id=>EXERCISE_BY_ID[id]).filter(Boolean).slice(0,2);
  const cool=coolIds.map(id=>EXERCISE_BY_ID[id]).filter(Boolean).slice(0,2);
  const workout=[...warm,...main,...cool].filter(Boolean).map(x=>({...x,target:targetFor(x),sets:setsFor(x)}));
  consumeFeedbackAdjustment();
  return workout;
}
