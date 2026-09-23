export const $=s=>document.querySelector(s);export const $$=s=>[...document.querySelectorAll(s)];
export const today=()=>{const d=new Date();return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`};
export const dateDiff=(a,b)=>Math.floor((new Date(`${b}T12:00:00`)-new Date(`${a}T12:00:00`))/86400000);
export const formatSeconds=s=>`${String(Math.floor(s/60)).padStart(2,'0')}:${String(Math.max(0,s%60)).padStart(2,'0')}`;
export const escapeHTML=s=>String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));
export const formatDate=x=>new Date(`${x}T12:00:00`).toLocaleDateString('pt-BR',{day:'2-digit',month:'short'}).replace('.','');
export const clamp=(n,min,max)=>Math.max(min,Math.min(max,n));
