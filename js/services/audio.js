let ctx=null, master=null, ambientGain=null, ambientTimer=null, enabled=true;
function getCtx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!ctx){ctx=new C();master=ctx.createGain();master.gain.value=.8;master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
export function setAudioEnabled(v){enabled=!!v;if(!enabled){stopAmbient();if(master)master.gain.value=.0001}else if(master){master.gain.value=.8}}
export function isAudioEnabled(){return enabled}
export function playTone(kind='tap'){
 if(!enabled)return;const c=getCtx();if(!c)return;
 const notes=kind==='success'?[523,659,784]:kind==='start'?[392,523,659]:kind==='rest'?[330,392]:[420];
 notes.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type=kind==='tap'?'sine':'triangle';o.frequency.value=f;const t=c.currentTime+i*.08;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(kind==='success'?.08:.045,t+.012);g.gain.exponentialRampToValueAtTime(.0001,t+.18);o.connect(g);g.connect(master);o.start(t);o.stop(t+.2)})
}
function chord(){
 if(!enabled)return;const c=getCtx();if(!c)return;const notes=[196,246.94,293.66];
 notes.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain();o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,c.currentTime);g.gain.exponentialRampToValueAtTime(.012,c.currentTime+.7);g.gain.exponentialRampToValueAtTime(.0001,c.currentTime+4.2);o.connect(g);g.connect(ambientGain);o.start();o.stop(c.currentTime+4.3)});
}
export function startAmbient(){
 if(!enabled||ambientTimer)return;const c=getCtx();if(!c)return;
 ambientGain=c.createGain();ambientGain.gain.value=.18;ambientGain.connect(master);chord();ambientTimer=setInterval(chord,3600)
}
export function stopAmbient(){if(ambientTimer){clearInterval(ambientTimer);ambientTimer=null}if(ambientGain){try{ambientGain.gain.exponentialRampToValueAtTime(.0001,(ctx?.currentTime||0)+.25)}catch{}ambientGain=null}}
