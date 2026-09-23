import {$,$$} from '../core/utils.js';
export function showScreen(id){$$('.screen').forEach(s=>s.classList.toggle('hidden',s.dataset.screen!==id));$$('.tab').forEach(t=>t.classList.toggle('active',t.dataset.tab===id));window.scrollTo?.(0,0)}
export function bindTabs(){ $$('.tab').forEach(t=>t.addEventListener('click',()=>showScreen(t.dataset.tab))) }
