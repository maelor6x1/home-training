let ctx=null, master=null, ambientGain=null, ambientTimer=null, enabled=true;
function getCtx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!ctx){ctx=new C();master=ctx.createGain();master.gain.value=.82;master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
export function setAudioEnabled(v){enabled=!!v;if(!enabled){stopAmbient();if(master)master.gain.value=.0001}else if(master)master.gain.value=.82}
export function isAudioEnabled(){return enabled}
function blip(freq=520,dur=.11,type='sine',gain=.055,delay=0){const c=getCtx();if(!c||!enabled)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.02)}
export function playTone(kind='tap',value){if(!enabled)return;const c=getCtx();if(!c)return;
 if(kind==='countdown'){const n=Number(value);blip(n===1?880:660,n===1?.22:.13,n===1?'triangle':'sine',n===1?.11:.075);if(n===1)blip(1320,.16,'triangle',.055,.07);return}
 if(kind==='finish'){[523,659,784,1046].forEach((f,i)=>blip(f,.16,'triangle',.075,i*.07));return}
 if(kind==='success'){[523,659,784].forEach((f,i)=>blip(f,.18,'triangle',.08,i*.08));return}
 if(kind==='rest-start'){blip(392,.16,'sine',.06);blip(330,.18,'sine',.045,.08);return}
 if(kind==='rest-end'){blip(660,.12,'triangle',.07);blip(880,.18,'triangle',.09,.08);return}
 if(kind==='set'){blip(440,.1,'sine',.055);blip(554,.13,'sine',.055,.07);return}
 if(kind==='start'){[392,523,659].forEach((f,i)=>blip(f,.18,'triangle',.07,i*.08));return}
 blip(kind==='tap'?420:500,.08,'sine',.045);
}
function chord(){if(!enabled)return;const c=getCtx();if(!c||!ambientGain)return;const notes=[196,246.94,293.66,369.99];notes.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+i*.08;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.018,t+.55);g.gain.exponentialRampToValueAtTime(.0001,t+3.6);o.connect(g);g.connect(ambientGain);o.start(t);o.stop(t+3.8)})}
export function startAmbient(){if(!enabled||ambientTimer)return;const c=getCtx();if(!c)return;ambientGain=c.createGain();ambientGain.gain.value=.30;ambientGain.connect(master);chord();ambientTimer=setInterval(chord,3200)}
export function stopAmbient(){if(ambientTimer){clearInterval(ambientTimer);ambientTimer=null}if(ambientGain){try{ambientGain.gain.exponentialRampToValueAtTime(.0001,(ctx?.currentTime||0)+.25)}catch{}ambientGain=null}}
