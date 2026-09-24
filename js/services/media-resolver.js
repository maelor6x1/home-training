// V16: exercise demonstrations are rendered by the procedural SVG motion engine.
export async function resolveMediaCandidates(ex){ return ex ? [`motion:${ex.id}`] : []; }
export async function resolveMedia(ex){ return ex ? `motion:${ex.id}` : null; }
export function preloadMedia(){return Promise.resolve(true)}
export function mediaCredits(){return [{name:'Home Training — Motion Engine',url:'',note:'Demonstrações vetoriais procedurais com rig articulado, renderizadas localmente no navegador.'}]}
