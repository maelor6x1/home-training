let ctx=null,master=null,ambientGain=null,ambientTimer=null,enabled=true;
function getCtx(){const C=window.AudioContext||window.webkitAudioContext;if(!C)return null;if(!ctx){ctx=new C();master=ctx.createGain();master.gain.value=.9;master.connect(ctx.destination)}if(ctx.state==='suspended')ctx.resume().catch(()=>{});return ctx}
export function unlockAudio(){const c=getCtx();if(c?.state==='suspended')c.resume().catch(()=>{});return !!c}
export function setAudioEnabled(v){enabled=!!v;if(!enabled){stopAmbient();if(master)master.gain.value=.0001}else{getCtx();if(master)master.gain.value=.9}}
export function isAudioEnabled(){return enabled}
function blip(freq=520,dur=.11,type='sine',gain=.07,delay=0){const c=getCtx();if(!c||!enabled)return;const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+delay;o.type=type;o.frequency.setValueAtTime(freq,t);g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(gain,t+.008);g.gain.exponentialRampToValueAtTime(.0001,t+dur);o.connect(g);g.connect(master);o.start(t);o.stop(t+dur+.02)}
export function playTone(kind='tap',value){if(!enabled)return;getCtx();
 if(kind==='countdown'){const n=Number(value);if(n===3){blip(520,.12,'sine',.09);blip(780,.12,'sine',.06,.12)}else if(n===2){blip(620,.14,'triangle',.1);blip(930,.14,'triangle',.07,.12)}else{blip(880,.2,'triangle',.13);blip(1320,.18,'triangle',.08,.08)}return}
 if(kind==='finish'){[523,659,784,1046].forEach((f,i)=>blip(f,.16,'triangle',.09,i*.07));return}
 if(kind==='success'){[523,659,784].forEach((f,i)=>blip(f,.18,'triangle',.1,i*.08));return}
 if(kind==='rest-start'){blip(392,.16,'sine',.08);blip(330,.18,'sine',.06,.08);return}
 if(kind==='rest-end'){blip(660,.12,'triangle',.09);blip(880,.18,'triangle',.11,.08);return}
 if(kind==='set'){blip(440,.1,'sine',.075);blip(554,.13,'sine',.075,.07);return}
 if(kind==='start'){[392,523,659,784].forEach((f,i)=>blip(f,.18,'triangle',.09,i*.08));return}
 if(kind==='nav'){blip(360,.07,'sine',.055);blip(540,.08,'sine',.04,.045);return}
 if(kind==='select'){blip(500,.06,'triangle',.065);return}
 if(kind==='danger'){blip(180,.12,'sawtooth',.07);return}
 blip(kind==='tap'?430:500,.085,'sine',.06);
}
function chord(){if(!enabled)return;const c=getCtx();if(!c||!ambientGain)return;const notes=[196,246.94,293.66,369.99];notes.forEach((f,i)=>{const o=c.createOscillator(),g=c.createGain(),t=c.currentTime+i*.08;o.type='sine';o.frequency.value=f;g.gain.setValueAtTime(.0001,t);g.gain.exponentialRampToValueAtTime(.055,t+.45);g.gain.exponentialRampToValueAtTime(.0001,t+3.1);o.connect(g);g.connect(ambientGain);o.start(t);o.stop(t+3.25)})}
export function startAmbient(){if(!enabled)return;const c=getCtx();if(!c)return;if(ambientTimer)return;if(ambientGain){ambientGain.gain.value=.55}else{ambientGain=c.createGain();ambientGain.gain.value=.55;ambientGain.connect(master)}chord();ambientTimer=setInterval(chord,3200)}
export function stopAmbient(){if(ambientTimer){clearInterval(ambientTimer);ambientTimer=null}if(ambientGain){try{ambientGain.gain.exponentialRampToValueAtTime(.0001,(ctx?.currentTime||0)+.18)}catch{}setTimeout(()=>{try{ambientGain?.disconnect()}catch{}},250);ambientGain=null}}
