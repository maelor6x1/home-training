const BASE='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@main';
const RAW='https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main';
let catalogPromise=null;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const compact=s=>norm(s).replace(/\s+/g,'');
const tokens=s=>norm(s).split(/\s+/).filter(Boolean);
const directCandidates=ex=>[ex?.media,ex?.mediaUrl,ex?.video,ex?.videoUrl,...(Array.isArray(ex?.mediaUrls)?ex.mediaUrls:[])].filter(Boolean);
async function loadCatalog(){
  if(!catalogPromise){
    catalogPromise=Promise.all([
      fetch(`${BASE}/api/en/exercises.json`,{cache:'force-cache'}).then(r=>r.ok?r.json():null).catch(()=>null),
      fetch(`${BASE}/api/es/exercises.json`,{cache:'force-cache'}).then(r=>r.ok?r.json():null).catch(()=>null)
    ]).then(all=>{
      const merged=new Map();
      for(const d of all){for(const x of (Array.isArray(d?.exercises)?d.exercises:[])){if(x?.id&&!merged.has(x.id))merged.set(x.id,x)}}
      return [...merged.values()];
    }).catch(()=>[]);
  }
  return catalogPromise;
}
function score(ex,hit){
  if(!hit)return -1;
  const exId=compact(ex?.id), exName=norm(ex?.name), exBody=norm(ex?.body), exTarget=norm(ex?.target), exMedia=compact(directCandidates(ex)[0]||'');
  const hId=compact(hit.id), hSlug=compact(hit.slug), hName=norm(hit.name), hMuscle=norm(hit.muscle), hBody=norm(hit.bodyPart), hCat=norm(hit.category);
  let s=0;
  if(exId && (hId===exId || hSlug===exId || hId.endsWith(exId) || hSlug.endsWith(exId))) s+=180;
  if(exId && (hId.includes(exId)||exId.includes(hId)||hSlug.includes(exId)||exId.includes(hSlug))) s+=90;
  if(exName && hName===exName)s+=160;
  if(exName && (hName.includes(exName)||exName.includes(hName)))s+=70;
  if(exMedia && (exMedia.includes(hSlug)||exMedia.includes(hId.replace(/\//g,''))))s+=120;
  const idParts=tokens(ex.id||'');
  const hitParts=new Set(tokens(`${hit.slug} ${hit.name}`));
  for(const t of idParts){if(t.length>2&&hitParts.has(t))s+=12}
  if(exBody && (hMuscle===exBody||hBody===exBody))s+=35;
  if(exBody && hMuscle.includes(exBody))s+=15;
  // Prefer stretching animations for mobility/cooldown entries.
  if(ex?.body==='Mobilidade' && hCat==='stretching')s+=60;
  if(ex?.body!=='Mobilidade' && hCat==='strength')s+=10;
  // Equipment is useful but should never overpower an exact movement match.
  const eq=norm(ex?.equipment);
  if(eq==='dumbbell'&&hMuscle==='dumbbell')s+=8;
  if(eq==='band'&&hMuscle==='band')s+=8;
  return s;
}
function pick(ex,list){
  if(!list.length)return null;
  const ranked=list.map(x=>({x,s:score(ex,x)})).sort((a,b)=>b.s-a.s);
  if(ranked[0]?.s>=70)return ranked[0].x;
  // Guaranteed visual fallback: choose an animation from the same muscle/body area,
  // preferring bodyweight and then the correct category. It is better than a broken GIF.
  const body=norm(ex?.body), stretch=ex?.body==='Mobilidade';
  const pool=list.filter(x=>(norm(x.muscle)===body||norm(x.bodyPart)===body) && (!stretch||x.category==='stretching'));
  return (pool.length?pool:list.filter(x=>stretch?x.category==='stretching':x.category==='strength'))[0]||list[0];
}
function urlsFor(hit){
  if(!hit)return [];
  const out=[];
  if(hit.gifUrl)out.push(hit.gifUrl.replace(/@[^/]+\//,'@main/'));
  if(hit.file){out.push(`${BASE}/${hit.file}`,`${RAW}/${hit.file}`)}
  return out;
}
export async function resolveMedia(ex){
  const list=await loadCatalog();
  const hit=pick(ex,list);
  const exact=urlsFor(hit);
  const direct=directCandidates(ex);
  return [...new Set([...exact,...direct])][0]||null;
}
export async function resolveMediaCandidates(ex){
  const list=await loadCatalog();
  const hit=pick(ex,list);
  const exact=urlsFor(hit);
  const direct=directCandidates(ex);
  return [...new Set([...exact,...direct])];
}
export function preloadMedia(){return loadCatalog()}
export function mediaCredits(){return [{name:'ExerciseGymGifsDB',url:'https://github.com/JahelCuadrado/ExerciseGymGifsDB',note:'Demonstrações carregadas individualmente via CDN; confira os termos/licença da fonte.'}]}
