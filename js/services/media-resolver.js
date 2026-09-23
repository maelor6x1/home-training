const BASE='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const cache=new Map();
const sources={
 'pike-pushup':['delts',['pike push up','pike push-up','pike pushup']],
 'pushup':['pectorals',['close push up','close-grip push-up','close grip push up','push up']],
 'incline-pushup':['pectorals',['incline push up','incline push-up']],
 'chair-dip':['triceps',['bench dip','chair dip','triceps dip']],
 'backpack-row':['lats',['bent over row','dumbbell bent over row','barbell bent over row','one arm dumbbell row']],
 'row':['lats',['inverted row','bodyweight row','body row']],
 'pullup':['lats',['pull up','pull-up','pullups']],
 'backpack-curl':['biceps',['dumbbell biceps curl','dumbbell curl','biceps curl']],
 'curl':['biceps',['dumbbell biceps curl','dumbbell curl']],
 'squat':['quads',['jump squat','bodyweight squat','squat']],
 'hip-thrust':['glutes',['hip thrust','glute bridge']],
 'plank':['abs',['plank','side plank','plank twist']],
 'mountain':['cardio',['mountain climber','mountain climbers']],
 'burpee':['cardio',['burpee','burpees']],
 'arm-circles':['delts',['arm circles','shoulder circles']],
 'hip-mobility':['glutes',['hip mobility','hip circles','hip opener']],
 'chest-stretch':['pectorals',['chest stretch','standing chest stretch','doorway chest stretch']],
 'quad-stretch':['quads',['standing quadriceps stretch','quadriceps stretch','quad stretch']]
};
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
async function getMuscle(muscle){if(cache.has(muscle))return cache.get(muscle);const promise=fetch(`${BASE}/api/en/muscles/${muscle}.json`,{cache:'force-cache'}).then(r=>{if(!r.ok)throw new Error('media api '+r.status);return r.json()}).catch(()=>({exercises:[]}));cache.set(muscle,promise);return promise}
function score(item,aliases){const n=norm(item.name+' '+item.slug);let best=0;for(const a of aliases){const x=norm(a);if(n===x)return 1000;if(n.includes(x))best=Math.max(best,500+x.length);const words=x.split(' ');const hits=words.filter(w=>n.includes(w)).length;best=Math.max(best,hits*20)}return best}
export async function resolveMedia(ex){const cfg=sources[ex.id];if(!cfg)return null;const [muscle,aliases]=cfg;const data=await getMuscle(muscle);const list=data.exercises||[];let best=null,bestScore=0;for(const item of list){const sc=score(item,aliases);if(sc>bestScore){bestScore=sc;best=item}}return bestScore>=40?best?.gifUrl:null}
export async function preloadWorkoutMedia(exercises){return Promise.all(exercises.map(async ex=>{if(ex.media)return ex;const url=await resolveMedia(ex);if(url)ex.media=url;return ex}))}
