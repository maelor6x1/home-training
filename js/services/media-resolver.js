const BASE='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
let catalogPromise=null;
const norm=s=>String(s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,' ').trim();
const slug=s=>norm(s).replace(/ /g,'-');

async function loadCatalog(){
  if(!catalogPromise){
    catalogPromise=fetch(`${BASE}/api/en/exercises.json`,{cache:'force-cache'})
      .then(r=>{if(!r.ok)throw new Error(`media catalog ${r.status}`);return r.json()})
      .then(d=>Array.isArray(d?.exercises)?d.exercises:Array.isArray(d)?d:[])
      .catch(()=>[]);
  }
  return catalogPromise;
}

export async function resolveMedia(ex){
  const list=await loadCatalog();
  if(list.length){
    const localSlug=slug(ex?.id||'');
    const localName=norm(ex?.name||'');
    const target=slug(ex?.id||'');
    let hit=list.find(x=>x.slug===localSlug||x.id===localSlug||x.file?.replace(/\.gif$/,'')===localSlug);
    if(!hit) hit=list.find(x=>slug(x.slug)===localSlug);
    if(!hit&&localName) hit=list.find(x=>norm(x.name)===localName);
    if(!hit&&localName) hit=list.find(x=>norm(x.name).includes(localName)||localName.includes(norm(x.name)));
    if(hit?.gifUrl)return hit.gifUrl;
    if(hit?.file)return `${BASE}/${hit.file}`;
  }
  // Fallback: the V8/V9 catalog URLs are retained only as a last resort.
  return ex?.media||null;
}
export function preloadMedia(){return loadCatalog()}
export function mediaCredits(){return [{name:'ExerciseGymGifsDB',url:'https://github.com/JahelCuadrado/ExerciseGymGifsDB',note:'Demonstrações carregadas individualmente via CDN. Confira a licença da fonte.'}]}
