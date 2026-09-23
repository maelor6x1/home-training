const BASE='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const RAW='https://raw.githubusercontent.com/JahelCuadrado/ExerciseGymGifsDB/main';
let catalogPromise=null;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const slug=s=>norm(s).replace(/ /g,'-');
const candidates=(ex)=>{
  const out=[];
  if(ex?.media) out.push(ex.media);
  if(ex?.mediaUrl) out.push(ex.mediaUrl);
  if(ex?.video) out.push(ex.video);
  if(ex?.videoUrl) out.push(ex.videoUrl);
  if(Array.isArray(ex?.mediaUrls)) out.push(...ex.mediaUrls);
  return [...new Set(out.filter(Boolean))];
};
async function loadCatalog(){
  if(!catalogPromise){
    catalogPromise=fetch(`${BASE}/api/en/exercises.json`,{cache:'force-cache'})
      .then(r=>{if(!r.ok)throw new Error(`media catalog ${r.status}`);return r.json()})
      .then(d=>Array.isArray(d?.exercises)?d.exercises:Array.isArray(d)?d:[])
      .catch(()=>[]);
  }
  return catalogPromise;
}
function score(ex,hit){
  if(!hit) return -1;
  const id=slug(ex?.id), name=norm(ex?.name), body=slug(ex?.body);
  const hs=slug(hit.slug), hi=slug(hit.id), hn=norm(hit.name), hm=slug(hit.muscle);
  let s=0;
  if(id && (hs===id || hi===id || hi.endsWith('/'+id))) s+=100;
  if(name && hn===name) s+=90;
  if(name && (hn.includes(name)||name.includes(hn))) s+=45;
  if(body && hm===body) s+=20;
  return s;
}
export async function resolveMedia(ex){
  // Explicit per-exercise URLs are preferred. This lets GIF and MP4 coexist.
  const direct=candidates(ex);
  if(direct.length) return direct[0];
  const list=await loadCatalog();
  if(!list.length) return null;
  const ranked=list.map(x=>({x,s:score(ex,x)})).sort((a,b)=>b.s-a.s);
  const hit=ranked[0]?.s>20?ranked[0].x:null;
  if(!hit) return null;
  if(hit.gifUrl) return hit.gifUrl;
  if(hit.file) return `${BASE}/${hit.file}`;
  return null;
}
export async function resolveMediaCandidates(ex){
  const direct=candidates(ex);
  const list=await loadCatalog();
  const ranked=list.map(x=>({x,s:score(ex,x)})).sort((a,b)=>b.s-a.s);
  const hit=ranked[0]?.s>20?ranked[0].x:null;
  const urls=[...direct];
  if(hit?.gifUrl) urls.push(hit.gifUrl);
  if(hit?.file){urls.push(`${BASE}/${hit.file}`,`${RAW}/${hit.file}`)}
  urls.push(...urls.filter(u=>u.includes('cdn.jsdelivr.net')).map(u=>u.replace(BASE,RAW)));
  return [...new Set(urls)];
}
export function preloadMedia(){return loadCatalog()}
export function mediaCredits(){return [{name:'ExerciseGymGifsDB',url:'https://github.com/JahelCuadrado/ExerciseGymGifsDB',note:'Demonstrações carregadas individualmente via CDN; confira a licença da fonte.'}]}
