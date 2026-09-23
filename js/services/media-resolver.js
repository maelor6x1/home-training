// V14 — mídia local, criada especificamente para a versão Home Training.
// A biblioteca não usa mais um GIF genérico de academia como fallback.
// Cada exercício aponta para sua própria animação local, com demonstração
// pensada para treino em casa (peso corporal, chão, cadeira/mochila quando aplicável).

function localUrl(path){
  if(!path || typeof path!=='string') return null;
  if(!path.startsWith('assets/')) return null;
  try{return new URL(path,document.baseURI).href}catch{return path}
}

function directCandidates(ex){
  const local=localUrl(ex?.media);
  return [local,ex?.mediaUrl,ex?.videoUrl,...(Array.isArray(ex?.mediaUrls)?ex.mediaUrls:[])].filter(Boolean);
}

export async function resolveMediaCandidates(ex){
  return [...new Set(directCandidates(ex))];
}

export async function resolveMedia(ex){
  return (await resolveMediaCandidates(ex))[0]||null;
}

// Mantido para compatibilidade com app.js; não há catálogo remoto para baixar.
export function preloadMedia(){return Promise.resolve(true)}

export function mediaCredits(){
  return [{
    name:'Home Training — animações próprias',
    url:'',
    note:'Animações locais criadas para demonstrar os movimentos em contexto de treino em casa.'
  }];
}
