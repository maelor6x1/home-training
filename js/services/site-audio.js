import {playTone,unlockAudio} from './audio.js';
let lastClick=0;
function toneFor(button){
  if(button.disabled)return null;
  if(button.matches('.danger,[id="resetData"]'))return 'danger';
  if(button.matches('.tab'))return 'nav';
  if(button.matches('.question-card,.feedback-option,.chip,.day-card'))return 'select';
  if(button.matches('.round-button'))return 'tap';
  return 'tap';
}
export function initSiteAudio(){
  document.addEventListener('pointerdown',()=>unlockAudio(),{capture:true,passive:true});
  document.addEventListener('click',e=>{
    const button=e.target.closest('button');
    if(!button)return;
    const now=performance.now();
    if(now-lastClick<35)return;
    lastClick=now;
    const tone=toneFor(button);
    if(tone)playTone(tone);
  },true);
}
