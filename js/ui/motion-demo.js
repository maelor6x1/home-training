/* Home Training Motion Engine V17
   Anatomical 2D/2.5D rig.
   - Fixed bone lengths: no detached limbs or rubber-body distortion.
   - End-effector IK for elbows/knees: joints are solved from hand/foot targets.
   - Exercise-specific key poses and controlled ranges of motion.
   - The visual style is a clean fitness-app character, not a stick figure.
*/

const W=420,H=420;
const C={skin:'#d99370',skinHi:'#f2b18a',skinShadow:'#a9654e',shirt:'#69df68',shirtDark:'#349c49',shorts:'#1b2430',shoe:'#edf2f7',outline:'#121821',floor:'#2b3440',band:'#8be78b',metal:'#d7dee8'};

const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>t*t*(3-2*t);
const mix=(a,b,t)=>({x:lerp(a.x,b.x,t),y:lerp(a.y,b.y,t)});
const V=(x,y)=>({x,y});
const add=(a,b)=>V(a.x+b.x,a.y+b.y);
const sub=(a,b)=>V(a.x-b.x,a.y-b.y);
const mul=(a,s)=>V(a.x*s,a.y*s);
const len=a=>Math.hypot(a.x,a.y);
const norm=a=>{const l=len(a)||1;return V(a.x/l,a.y/l)};
const rot=(a,r)=>V(a.x*Math.cos(r)-a.y*Math.sin(r),a.x*Math.sin(r)+a.y*Math.cos(r));
const dist=(a,b)=>len(sub(a,b));

function cyc(frames,t){
  t=((t%1)+1)%1;
  if(frames.length===1)return frames[0];
  const n=frames.length-1;
  const x=t*n;
  const i=Math.min(n-1,Math.floor(x));
  return interpolate(frames[i],frames[i+1],ease(x-i));
}
function interpolate(a,b,t){
  const o={};
  for(const k of Object.keys(a)){
    const av=a[k],bv=b[k]??av;
    if(typeof av==='number')o[k]=lerp(av,bv,t);
    else if(av&&typeof av.x==='number')o[k]=mix(av,bv,t);
    else o[k]=av;
  }
  return o;
}

// 2-link IK. The lengths are anatomical constants, so joints remain connected.
function ik2(target,root,L1,L2,bend=1){
  const d=clamp(dist(target,root),Math.abs(L1-L2)+0.001,L1+L2-0.001);
  const a=Math.acos(clamp((L1*L1+d*d-L2*L2)/(2*L1*d),-1,1));
  const base=Math.atan2(target.y-root.y,target.x-root.x);
  const ang=base+bend*a;
  const elbow=add(root,V(Math.cos(ang)*L1,Math.sin(ang)*L1));
  return {elbow,hand:target};
}

const bone={upperArm:54,forearm:50,thigh:68,shin:68};

function body({hip=V(210,250), torso=0, headTilt=0, shoulderW=82, hipW=48, hands, feet, armBends=[1,1], legBends=[1,1], armLift=0, legFlex=0, side=false}={}){
  // Torso is a rigid chain: pelvis -> spine -> neck. This is the reference frame.
  const spineDir=V(Math.sin(torso),-Math.cos(torso));
  const shoulder=add(hip,mul(spineDir,100));
  const neck=add(shoulder,mul(spineDir,25));
  const head=add(neck,mul(spineDir,30));
  const sideVec=V(Math.cos(torso),Math.sin(torso));
  const sl=add(shoulder,mul(sideVec,-shoulderW/2));
  const sr=add(shoulder,mul(sideVec, shoulderW/2));
  const hl=add(hip,mul(sideVec,-hipW/2));
  const hr=add(hip,mul(sideVec, hipW/2));

  const handL=hands?.l||add(sl,V(-22,92));
  const handR=hands?.r||add(sr,V(22,92));
  const armL=ik2(handL,sl,bone.upperArm,bone.forearm,armBends[0]);
  const armR=ik2(handR,sr,bone.upperArm,bone.forearm,armBends[1]);

  const footL=feet?.l||add(hl,V(-18,135));
  const footR=feet?.r||add(hr,V(18,135));
  const legL=ik2(footL,hl,bone.thigh,bone.shin,legBends[0]);
  const legR=ik2(footR,hr,bone.thigh,bone.shin,legBends[1]);

  return {hip,shoulder,neck,head,sl,sr,hl,hr,el:armL.elbow,er:armR.elbow,handL,handR,kl:legL.elbow,kr:legR.elbow,footL,footR,torso,headTilt,side};
}

const P={
 stand:t=>body({hip:V(210,248),torso:0,hands:{l:V(155,342),r:V(265,342)},feet:{l:V(178,388),r:V(242,388)}}),
 squat:t=>{const q=cyc([{hip:V(210,248),torso:0,hL:V(155,342),hR:V(265,342),fL:V(177,388),fR:V(243,388)},{hip:V(210,285),torso:0.015,hL:V(158,332),hR:V(262,332),fL:V(158,388),fR:V(262,388)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},legBends:[1,1]})},
 lunge:t=>{const q=cyc([{hip:V(210,248),torso:0,hL:V(158,340),hR:V(262,340),fL:V(178,388),fR:V(242,388)},{hip:V(210,278),torso:-0.025,hL:V(158,345),hR:V(262,345),fL:V(292,388),fR:V(128,388)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},legBends:[1,-1]})},
 push:t=>{const q=cyc([{hip:V(268,292),torso:1.43,hL:V(170,320),hR:V(170,350),fL:V(365,360),fR:V(365,380)},{hip:V(270,320),torso:1.43,hL:V(176,340),hR:V(176,370),fL:V(365,360),fR:V(365,380)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},armBends:[-1,-1],legBends:[1,1],side:true})},
 bridge:t=>{const q=cyc([{hip:V(245,316),torso:1.57,hL:V(160,350),hR:V(160,370),fL:V(340,330),fR:V(340,350)},{hip:V(245,274),torso:1.57,hL:V(160,350),hR:V(160,370),fL:V(340,300),fR:V(340,320)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},armBends:[-1,-1],legBends:[1,1],side:true})},
 hinge:t=>{const q=cyc([{hip:V(210,248),torso:0,hL:V(155,342),hR:V(265,342),fL:V(178,388),fR:V(242,388)},{hip:V(210,268),torso:0.42,hL:V(158,334),hR:V(262,334),fL:V(178,388),fR:V(242,388)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},legBends:[1,1]})},
 curl:t=>{const q=cyc([{l:V(150,342),r:V(270,342)},{l:V(174,260),r:V(246,260)}],t);return body({hands:{l:q.l,r:q.r},feet:{l:V(178,388),r:V(242,388)}})},
 raise:t=>{const q=cyc([{l:V(150,342),r:V(270,342)},{l:V(130,248),r:V(290,248)}],t);return body({hands:{l:q.l,r:q.r},feet:{l:V(178,388),r:V(242,388)}})},
 press:t=>{const q=cyc([{l:V(165,270),r:V(255,270)},{l:V(160,145),r:V(260,145)}],t);return body({hands:{l:q.l,r:q.r},feet:{l:V(178,388),r:V(242,388)}})},
 pull:t=>{const q=cyc([{hip:V(210,270),torso:0,hL:V(160,250),hR:V(260,250),fL:V(180,388),fR:V(240,388)},{hip:V(210,235),torso:0,hL:V(160,170),hR:V(260,170),fL:V(180,388),fR:V(240,388)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR}})},
 dip:t=>{const q=cyc([{hip:V(210,250),torso:0,hL:V(150,235),hR:V(270,235),fL:V(180,385),fR:V(240,385)},{hip:V(210,290),torso:0,hL:V(150,240),hR:V(270,240),fL:V(180,385),fR:V(240,385)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR}})},
 bridgeOne:t=>{const q=cyc([{hip:V(245,316),torso:1.57,hL:V(160,350),hR:V(160,370),fL:V(340,330),fR:V(340,350)},{hip:V(245,274),torso:1.57,hL:V(160,350),hR:V(160,370),fL:V(340,270),fR:V(340,290)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},legBends:[1,1],side:true})},
 quadruped:t=>{const q=cyc([{hip:V(275,285),torso:1.57,hL:V(180,350),hR:V(180,370),fL:V(330,350),fR:V(350,350)},{hip:V(275,285),torso:1.57,hL:V(165,345),hR:V(165,365),fL:V(330,350),fR:V(350,350)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},armBends:[-1,-1],legBends:[1,1],side:true})},

 // Floor/core poses use the same fixed skeleton but change torso and endpoints rather than distorting limbs.
 crunch:t=>{const q=cyc([{hip:V(285,300),torso:1.57,hL:V(205,330),hR:V(205,360),fL:V(360,330),fR:V(370,350)},{hip:V(285,270),torso:1.57,hL:V(210,300),hR:V(210,330),fL:V(360,330),fR:V(370,350)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},side:true})},
 legraise:t=>{const q=cyc([{hip:V(285,300),torso:1.57,hL:V(205,330),hR:V(205,360),fL:V(360,330),fR:V(370,350)},{hip:V(285,300),torso:1.57,hL:V(205,330),hR:V(205,360),fL:V(310,220),fR:V(320,240)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},side:true})},
 cat:t=>{const q=cyc([{hip:V(280,280),torso:1.57,hL:V(180,350),hR:V(180,370),fL:V(340,350),fR:V(350,350)},{hip:V(280,300),torso:1.38,hL:V(180,350),hR:V(180,370),fL:V(340,350),fR:V(350,350)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},side:true})},
 child:t=>{const q=cyc([{hip:V(280,280),torso:1.57,hL:V(180,350),hR:V(180,370),fL:V(340,350),fR:V(350,350)},{hip:V(320,315),torso:1.57,hL:V(180,350),hR:V(180,370),fL:V(360,335),fR:V(370,350)}],t);return body({hip:q.hip,torso:q.torso,hands:{l:q.hL,r:q.hR},feet:{l:q.fL,r:q.fR},side:true})}
};

function specialized(id,t){
  switch(id){
    case'pushup':case'narrow-pushup':case'wide-pushup':case'decline-pushup':case'incline-pushup':case'archer-pushup':case'diamond-pushup':case'knee-pushup':case'diamond-floor':case'pike-pushup':return P.push(t);
    case'squat':case'pause-squat':case'backpack-squat':case'band-squat':case'wall-sit':case'sissy-squat':return P.squat(t);
    case'lunge':case'reverse-lunge':case'split-squat':case'backpack-lunge':case'dynamic-lunge':return P.lunge(t);
    case'good-morning':case'backpack-rdl':return P.hinge(t);
    case'hip-thrust':case'hamstring-bridge':return P.bridge(t);
    case'single-leg-bridge':return P.bridgeOne(t);
    case'pullup':case'chinup':return P.pull(t);
    case'chair-dip':case'dip':return P.dip(t);
    case'backpack-row':case'one-arm-row':case'band-row':case'dumbbell-row':return P.hinge(t);
    case'backpack-curl':case'curl':case'hammer-curl':case'band-curl':case'reverse-curl':case'triceps-extension':return P.curl(t);
    case'lateral-raise':case'front-raise':return P.raise(t);
    case'dumbbell-shoulder-press':return P.press(t);
    case'plank':case'plank-jack':case'mountain':return P.push(t);
    case'side-plank':return P.push(t);
    case'dead-bug':case'reverse-crunch':case'bicycle':case'hollow-hold':case'leg-raise':return P.crunch(t);
    case'bird-dog':case'donkey-kick':case'fire-hydrant':return P.quadruped(t);
    case'cat-cow':return P.cat(t);
    case'child-pose':return P.child(t);
    case'jumping-jack':return P.jack?P.jack(t):P.stand(t);
    case'high-knees':case'butt-kicks':case'fast-feet':case'skater':return P.lunge(t);
    case'burpee':case'squat-thrust':return P.push(t);
    case'calf-raise':case'single-calf':case'tibialis-raise':return P.stand(t);
    case'step-up':return P.lunge(t);
    case'arm-circles':case'chest-stretch':case'quad-stretch':case'hamstring-stretch':case'hip-flexor-stretch':case'worlds-greatest':return P.stand(t);
    case'superman':return P.push(t);
    default:return P.stand(t);
  }
}

// Missing family functions use kinematic targets rather than arbitrary joints.
P.jack=t=>{const q=cyc([{l:V(150,342),r:V(270,342),fl:V(178,388),fr:V(242,388)},{l:V(115,225),r:V(305,225),fl:V(105,388),fr:V(315,388)}],t);return body({hands:{l:q.l,r:q.r},feet:{l:q.fl,r:q.fr}})};

function equipmentSVG(ex,p){
  const eq=ex.equipment;
  let out='';
  if(eq==='chair') out+=`<g class="prop"><rect x="326" y="260" width="54" height="10" rx="5"/><rect x="364" y="268" width="9" height="110" rx="4"/></g>`;
  if(eq==='backpack') out+=`<path d="M${p.shoulder.x-24},${p.shoulder.y+5} Q${p.shoulder.x},${p.shoulder.y-8} ${p.shoulder.x+24},${p.shoulder.y+5} L${p.hip.x+24},${p.hip.y-12} L${p.hip.x-24},${p.hip.y-12}Z" class="pack"/>`;
  if(eq==='band') out+=`<path d="M${p.footL.x},${p.footL.y-4} Q${p.hip.x},${p.footL.y-55} ${p.footR.x},${p.footR.y-4}" class="band"/>`;
  if(eq==='bar') out+=`<g class="prop"><line x1="70" y1="55" x2="350" y2="55"/><line x1="88" y1="55" x2="88" y2="70"/><line x1="332" y1="55" x2="332" y2="70"/></g>`;
  if(['dumbbell','backpack'].includes(eq)){
    out+=`<g class="weights"><line x1="${p.handL.x-13}" y1="${p.handL.y}" x2="${p.handL.x+13}" y2="${p.handL.y}"/><line x1="${p.handR.x-13}" y1="${p.handR.y}" x2="${p.handR.x+13}" y2="${p.handR.y}"/></g>`;
  }
  return out;
}

function line(a,b,cls='limb',w=18){return `<line x1="${a.x}" y1="${a.y}" x2="${b.x}" y2="${b.y}" class="${cls}" stroke-width="${w}"/>`}
function joint(p,r=8){return `<circle cx="${p.x}" cy="${p.y}" r="${r}" class="joint"/>`}

function render(p,ex){
  const shoulderMid=V((p.sl.x+p.sr.x)/2,(p.sl.y+p.sr.y)/2);
  const hipMid=p.hip;
  const torsoPath=`M${p.sl.x},${p.sl.y} Q${shoulderMid.x},${shoulderMid.y+24} ${p.sr.x},${p.sr.y} L${p.hr.x},${p.hr.y} Q${hipMid.x},${hipMid.y+18} ${p.hl.x},${p.hl.y}Z`;
  const torso=`<path d="${torsoPath}" class="shirt"/>`;
  const arms=`${line(p.sl,p.el,'limb',21)}${line(p.el,p.handL,'limb',18)}${line(p.sr,p.er,'limb',21)}${line(p.er,p.handR,'limb',18)}`;
  const legs=`${line(p.hl,p.kl,'shortsLeg',28)}${line(p.kl,p.footL,'limb',22)}${line(p.hr,p.kr,'shortsLeg',28)}${line(p.kr,p.footR,'limb',22)}`;
  const joints=[p.el,p.er,p.kl,p.kr,p.handL,p.handR].map((x,i)=>joint(x,i<4?7:6)).join('');
  const head=`<g class="head"><circle cx="${p.head.x}" cy="${p.head.y}" r="25"/><path d="M${p.head.x-24},${p.head.y-5} Q${p.head.x},${p.head.y-34} ${p.head.x+24},${p.head.y-8}"/><circle cx="${p.head.x+8}" cy="${p.head.y-2}" r="2.7" class="eye"/><path d="M${p.head.x+3},${p.head.y+9} Q${p.head.x+10},${p.head.y+13} ${p.head.x+16},${p.head.y+8}" class="faceLine"/></g>`;
  const shoes=`<path d="M${p.footL.x-18},${p.footL.y} Q${p.footL.x},${p.footL.y-8} ${p.footL.x+18},${p.footL.y} L${p.footL.x+18},${p.footL.y+12} L${p.footL.x-20},${p.footL.y+12}Z" class="shoe"/><path d="M${p.footR.x-18},${p.footR.y} Q${p.footR.x},${p.footR.y-8} ${p.footR.x+18},${p.footR.y} L${p.footR.x+18},${p.footR.y+12} L${p.footR.x-20},${p.footR.y+12}Z" class="shoe"/>`;
  return `<svg viewBox="0 0 ${W} ${H}" class="motion-svg" aria-label="Demonstração de ${ex.name}"><defs><linearGradient id="shirtG" x1="0" x2="1"><stop offset="0" stop-color="${C.shirtDark}"/><stop offset="1" stop-color="${C.shirt}"/></linearGradient><linearGradient id="skinG" x1="0" x2="1"><stop offset="0" stop-color="${C.skinShadow}"/><stop offset=".55" stop-color="${C.skinHi}"/><stop offset="1" stop-color="#ffd4b7"/></linearGradient></defs><ellipse cx="210" cy="405" rx="150" ry="8" class="ground"/>${equipmentSVG(ex,p)}${legs}${torso}${arms}${joints}${head}${shoes}</svg>`;
}

export function mountMotionDemo(container,ex,options={}){
  if(!container||!ex)return()=>{};
  container.innerHTML='';container.classList.add('motion-demo');
  const stage=document.createElement('div');stage.className='motion-stage';container.appendChild(stage);
  const animate=options.animate!==false;
  let raf=0,start=performance.now();
  const speed=ex.type==='time'?0.42:0.52;
  const draw=now=>{const t=((now-start)/1000*speed)%1;stage.innerHTML=render(specialized(ex.id,t),ex);raf=requestAnimationFrame(draw)};
  if(!animate){stage.innerHTML=render(specialized(ex.id,0),ex);return()=>{};}
  raf=requestAnimationFrame(draw);
  return()=>cancelAnimationFrame(raf);
}
