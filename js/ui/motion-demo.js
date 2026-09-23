/* Home Training Motion Engine V16
   Procedural SVG human: connected joints, smooth interpolation, no external GIFs.
   The renderer intentionally uses one continuous rig so limbs cannot detach between frames. */

const W=360,H=360;
const C={skin:'#f2b18a',skin2:'#d98f69',shirt:'#74e06b',shirt2:'#3f9f4a',shorts:'#202936',shoe:'#e9eef5',joint:'#ffd0b2',floor:'#26303b',accent:'#8cf080'};

const base=()=>({
 head:[180,58],neck:[180,83],sl:[149,96],sr:[211,96],el:[125,137],er:[235,137],hl:[111,174],hr:[249,174],
 hlp:[158,185],hrp:[202,185],kl:[145,255],kr:[215,255],fl:[132,326],fr:[228,326]
});
function clone(p){return Object.fromEntries(Object.entries(p).map(([k,v])=>[k,[v[0],v[1]]]));}
function pose(ch={}){return Object.assign(base(),ch)}
function lerp(a,b,t){return a+(b-a)*t}
function interp(a,b,t){const o={};for(const k of Object.keys(a)){const av=a[k],bv=b[k]||av;o[k]=[lerp(av[0],bv[0],t),lerp(av[1],bv[1],t)]}return o}
function smooth(t){return t*t*(3-2*t)}
function cycle(frames,t){t=((t%1)+1)%1;const n=frames.length;const x=t*n;const i=Math.floor(x)%n;const f=x-Math.floor(x);return interp(frames[i],frames[(i+1)%n],smooth(f))}
function sidePose({push=0,leg=0,head=0}={}){
 const p={head:[98,88+head],neck:[112,106],sl:[127,112],sr:[139,116],el:[161,132],er:[164,143],hl:[186,151],hr:[188,157],hlp:[218,172],hrp:[224,176],kl:[258,224+leg],kr:[263,229+leg],fl:[306,289],fr:[310,292]};
 return p;
}
function squat(t, pause=false){
 const a=pose({head:[180,72],neck:[180,94],sl:[149,106],sr:[211,106],el:[124,145],er:[236,145],hl:[109,177],hr:[251,177],kl:[150,263],kr:[210,263],fl:[128,326],fr:[232,326]});
 const b=pose({head:[180,86],neck:[180,108],sl:[145,116],sr:[215,116],el:[119,157],er:[241,157],hl:[157,205],hr:[203,205],kl:[132,270],kr:[228,270],fl:[124,326],fr:[236,326]});
 return cycle(pause?[a,b,b,a]:[a,b],t);
}
function lunge(t,reverse=false){
 const a=pose({head:[180,70],neck:[180,92],sl:[149,104],sr:[211,104],el:[122,145],er:[238,145],hl:[110,175],hr:[250,175],kl:[149,253],kr:[211,253],fl:[130,325],fr:[230,325]});
 const b=reverse?pose({head:[184,80],neck:[184,101],sl:[151,112],sr:[214,112],el:[127,151],er:[241,150],hl:[112,181],hr:[255,181],kl:[220,245],kr:[137,260],fl:[268,325],fr:[112,325]}):pose({head:[180,78],neck:[180,100],sl:[149,112],sr:[211,112],el:[122,151],er:[238,151],hl:[108,180],hr:[252,180],kl:[218,244],kr:[140,258],fl:[270,325],fr:[106,325]});
 return cycle([a,b],t);
}
function pushup(t,wide=0){
 const a=sidePose({push:0});a.head=[95,98];a.neck=[111,108];a.sl=[126,114];a.sr=[133,116];a.el=[154,146];a.er=[160,151];a.hl=[188,164];a.hr=[192,167];a.hlp=[222,170];a.hrp=[226,173];a.kl=[258,207];a.kr=[262,210];a.fl=[309,273];a.fr=[312,276];
 const b=clone(a);b.head=[100,120];b.neck=[114,128];b.el=[145,172];b.er=[151,177];b.hl=[188,180];b.hr=[193,183];b.hlp=[220,190];b.hrp=[225,193];
 if(wide){a.el[0]-=10;a.er[0]+=10;b.el[0]-=8;b.er[0]+=8}
 return cycle([a,b],t);
}
function plank(t,side=false){
 if(side){const a=sidePose();a.head=[102,105];a.neck=[117,115];a.sl=[131,120];a.sr=[139,122];a.el=[111,154];a.er=[116,158];a.hl=[181,169];a.hr=[186,171];a.hlp=[219,173];a.hrp=[224,176];a.kl=[262,224];a.kr=[266,227];a.fl=[307,286];a.fr=[312,289];const b=clone(a);b.hlp[1]+=3;b.hrp[1]+=3;return cycle([a,b],t)}
 return pushup(t,0)
}
function bridge(t,single=false){
 const a=pose({head:[102,273],neck:[115,267],sl:[135,261],sr:[161,264],el:[125,288],er:[174,288],hl:[189,281],hr:[199,283],kl:[144,246],kr:[215,246],fl:[122,217],fr:[232,217]});
 const b=clone(a);b.hlp=[190,228];b.hrp=[201,230];b.kl=[145,207];b.kr=[214,210];b.fl=[122,179];b.fr=[232,181];
 if(single){b.kl=[145,205];b.fl=[115,168]}
 return cycle([a,b],t)
}
function quadruped(t,kind='bird'){ 
 const a=pose({head:[82,176],neck:[101,182],sl:[120,188],sr:[137,191],el:[111,224],er:[148,226],hl:[195,202],hr:[214,205],kl:[207,241],kr:[233,239],fl:[203,287],fr:[246,286]});
 const b=clone(a);
 if(kind==='donkey'){b.kl=[207,235];b.fl=[211,166];b.kr=[233,239];b.fr=[246,286]}
 else if(kind==='hydrant'){b.kl=[206,235];b.fl=[211,286];b.kr=[271,207];b.fr=[294,174]}
 else {b.hl=[188,196];b.hlp=[171,181];b.fl=[133,151];b.fr=[246,286];b.el=[111,224]}
 return cycle([a,b],t)
}
function jack(t){const a=pose();const b=pose({sl:[120,83],sr:[240,83],el:[92,62],er:[268,62],hl:[76,50],hr:[284,50],kl:[124,270],kr:[236,270],fl:[72,326],fr:[288,326]});return cycle([a,b],t)}
function run(t,high=false,butt=false){const a=pose({sl:[157,104],sr:[203,104],el:[126,141],er:[234,139],hl:[112,169],hr:[248,169],kl:[158,251],kr:[214,270],fl:[126,326],fr:[264,292]});const b=pose({sl:[151,104],sr:[209,104],el:[121,137],er:[239,143],hl:[105,170],hr:[255,170],kl:high?[145,210]:[210,268],kr:high?[218,260]:[155,245],fl:high?[128,274]:[264,325],fr:high?[258,325]:[124,318]}); if(butt){b.kl=[148,220];b.fl=[130,177];b.kr=[216,263];b.fr=[257,325]} return cycle([a,b],t)}
function pullup(t){const a=pose({head:[180,83],neck:[180,104],sl:[150,112],sr:[210,112],el:[128,84],er:[232,84],hl:[108,62],hr:[252,62],hlp:[158,178],hrp:[202,178],kl:[145,252],kr:[215,252],fl:[145,326],fr:[215,326]});const b=clone(a);b.head=[180,45];b.neck=[180,68];b.sl=[150,78];b.sr=[210,78];b.el=[132,58];b.er=[228,58];b.hl=[112,42];b.hr=[248,42];b.hlp=[158,166];b.hrp=[202,166];return cycle([a,b],t)}
function row(t){const a=pose({head:[176,74],neck:[180,95],sl:[147,106],sr:[211,106],el:[127,147],er:[233,147],hl:[114,178],hr:[246,178],hlp:[160,207],hrp:[202,207],kl:[143,267],kr:[217,267],fl:[130,326],fr:[230,326]});const b=clone(a);b.el=[151,132];b.er=[209,132];b.hl=[164,118];b.hr=[196,118];return cycle([a,b],t)}
function curl(t,raise=false,press=false){const a=pose();const b=clone(a);b.el=[125,132];b.er=[235,132];b.hl=[118,120];b.hr=[242,120];if(raise){b.el=[125,90];b.er=[235,90];b.hl=[122,62];b.hr=[238,62]}if(press){b.el=[138,72];b.er=[222,72];b.hl=[146,42];b.hr=[214,42]}return cycle([a,b],t)}
function dip(t){const a=pose({head:[180,86],neck:[180,108],sl:[148,119],sr:[212,119],el:[121,153],er:[239,153],hl:[112,186],hr:[248,186],hlp:[157,190],hrp:[203,190],kl:[145,263],kr:[215,263],fl:[132,326],fr:[228,326]});const b=clone(a);b.head=[180,108];b.neck=[180,128];b.sl=[145,138];b.sr=[215,138];b.el=[125,175];b.er=[235,175];b.hl=[116,206];b.hr=[244,206];b.hlp=[157,203];b.hrp=[203,203];return cycle([a,b],t)}
function calf(t){const a=pose();const b=clone(a);b.fl=[132,306];b.fr=[228,306];b.kl=[145,240];b.kr=[215,240];b.hlp=[158,175];b.hrp=[202,175];return cycle([a,b],t)}
function crunch(t,reverse=false){const a=pose({head:[110,282],neck:[125,276],sl:[145,270],sr:[172,274],el:[128,301],er:[181,300],hl:[195,286],hr:[211,288],kl:[234,244],kr:[254,244],fl:[274,207],fr:[292,211]});const b=clone(a);b.head=reverse?[126,250]:[120,250];b.neck=[137,255];b.sl=[154,247];b.sr=[179,250];b.el=[136,275];b.er=[187,275];b.kl=[222,225];b.kr=[245,228];b.fl=[265,190];b.fr=[285,195];return cycle([a,b],t)}
function bicycle(t){const a=crunch(0);const b=crunch(0);b.head=[120,248];b.neck=[137,254];b.sl=[153,247];b.sr=[180,250];b.el=[112,238];b.er=[190,271];b.hl=[217,226];b.hr=[252,221];b.kl=[270,183];b.kr=[235,206];b.fl=[304,169];b.fr=[205,239];return cycle([a,b],t)}
function stretch(t,type){
 if(type==='arm'){const a=pose();const b=pose({el:[130,82],er:[230,82],hl:[122,53],hr:[238,53]});return cycle([a,b],t)}
 if(type==='quad'){const a=pose();const b=pose({hl:[122,158],hr:[238,158],kl:[143,246],kr:[217,246],fl:[112,183],fr:[248,183]});return cycle([a,b],t)}
 if(type==='ham'){const a=pose();const b=pose({head:[166,112],neck:[172,132],sl:[148,140],sr:[205,140],el:[118,175],er:[228,175],hl:[151,188],hr:[209,188],kl:[145,260],kr:[215,260],fl:[126,326],fr:[230,326]});return cycle([a,b],t)}
 if(type==='child'){const a=quadruped(0);const b=pose({head:[100,280],neck:[116,274],sl:[136,269],sr:[164,272],el:[109,302],er:[186,303],hl:[204,276],hr:[218,279],kl:[250,258],kr:[270,260],fl:[260,220],fr:[286,224]});return cycle([a,b],t)}
 if(type==='cat'){const a=quadruped(0);const b=clone(a);b.head=[88,164];b.neck=[103,173];b.sl=[119,181];b.sr=[137,184];b.hlp=[197,187];b.hrp=[216,189];return cycle([a,b],t)}
 return squat(t)
}

function superman(t){
 const a=pose({head:[108,250],neck:[122,253],sl:[141,257],sr:[170,258],el:[111,233],er:[198,232],hl:[209,257],hr:[225,259],hlp:[245,269],hrp:[258,270],kl:[276,286],kr:[292,289],fl:[320,302],fr:[334,304]});
 const b=clone(a);b.head=[104,235];b.neck=[119,240];b.sl=[139,244];b.sr=[170,245];b.el=[91,219];b.er=[207,217];b.hl=[229,247];b.hr=[242,249];b.hlp=[267,232];b.hrp=[280,234];b.kl=[295,255];b.kr=[307,258];b.fl=[330,273];b.fr=[343,277];return cycle([a,b],t);
}
function burpee(t){
 const stand=pose();
 const low=pushup(.98);
 const squatp=squat(.98);
 const x=t<.28?interp(stand,squatp,smooth(t/.28)):t<.55?interp(squatp,low,smooth((t-.28)/.27)):t<.78?interp(low,squatp,smooth((t-.55)/.23)):interp(squatp,stand,smooth((t-.78)/.22));
 return x;
}
function mountain(t){
 const a=pushup(0);const b=clone(a);b.kl=[218,185];b.fl=[249,167];b.kr=[263,211];b.fr=[312,276];return cycle([a,b],t);
}
function pike(t){
 const a=pushup(0);a.head=[105,111];a.neck=[119,119];a.sl=[132,122];a.sr=[140,125];a.el=[151,151];a.er=[160,154];a.hl=[183,156];a.hr=[190,158];a.hlp=[214,126];a.hrp=[226,129];a.kl=[250,191];a.kr=[267,194];a.fl=[309,274];a.fr=[318,277];
 const b=clone(a);b.head=[110,144];b.neck=[122,145];b.sl=[136,137];b.sr=[145,140];b.el=[151,168];b.er=[161,171];b.hlp=[207,113];b.hrp=[220,116];b.kl=[250,175];b.kr=[268,178];return cycle([a,b],t);
}
function handstand(t){
 const a=pose({head:[180,288],neck:[180,264],sl:[154,251],sr:[206,251],el:[135,215],er:[225,215],hl:[112,179],hr:[248,179],hlp:[160,180],hrp:[200,180],kl:[150,112],kr:[210,112],fl:[146,45],fr:[214,45]});
 const b=clone(a);b.head=[180,292];b.neck=[180,268];b.el=[134,219];b.er=[226,219];b.kl=[145,116];b.kr=[215,116];return cycle([a,b],t);
}
function step(t){
 const a=pose();const b=clone(a);b.kl=[151,222];b.fl=[160,178];b.kr=[215,255];b.fr=[232,326];b.hlp=[158,184];b.hrp=[202,184];return cycle([a,b],t);
}
function bandwalk(t){
 const a=pose({kl:[151,260],kr:[209,260],fl:[128,326],fr:[228,326]});const b=clone(a);b.kl=[139,258];b.kr=[224,258];b.fl=[108,326];b.fr=[247,326];return cycle([a,b],t);
}
function goodMorning(t){
 const a=pose();const b=pose({head:[165,113],neck:[170,133],sl:[145,142],sr:[202,143],el:[118,174],er:[226,174],hl:[149,193],hr:[207,193],kl:[143,260],kr:[217,260],fl:[130,326],fr:[230,326]});return cycle([a,b],t);
}

const MAP={
 pushup:'pushup', 'narrow-pushup':'pushup','wide-pushup':'widepush','decline-pushup':'pushup','incline-pushup':'pushup','archer-pushup':'pushup','diamond-pushup':'pushup','knee-pushup':'pushup',
 'pike-pushup':'pushup','pike-hold':'pike','wall-handstand':'handstand','shoulder-tap':'plank',
 'chair-dip':'dip','dip':'dip','diamond-floor':'pushup','pullup':'pullup','chinup':'pullup','backpack-row':'row','one-arm-row':'row','band-row':'row','reverse-snow-angel':'snow','superman':'superman',
 'backpack-curl':'curl','curl':'curl','hammer-curl':'curl','band-curl':'curl','reverse-curl':'curl','lateral-raise':'raise','front-raise':'raise','dumbbell-shoulder-press':'press','triceps-extension':'curl',
 'squat':'squat','pause-squat':'pause-squat','jump-squat':'jump','lunge':'lunge','reverse-lunge':'reverse-lunge','split-squat':'lunge','step-up':'step','wall-sit':'wallsit','sissy-squat':'sissy','backpack-squat':'squat','band-squat':'squat','backpack-lunge':'lunge','backpack-rdl':'row',
 'hip-thrust':'bridge','single-leg-bridge':'singlebridge','good-morning':'goodmorning','hamstring-bridge':'bridge','donkey-kick':'quadruped','fire-hydrant':'hydrant','band-lateral-walk':'bandwalk',
 'calf-raise':'calf','single-calf':'calf','tibialis-raise':'calf',
 'plank':'plank','side-plank':'sideplank','dead-bug':'deadbug','bird-dog':'bird','reverse-crunch':'reversecrunch','bicycle':'bicycle','leg-raise':'legraise','hollow-hold':'hollow',
 'jumping-jack':'jack','high-knees':'highknees','burpee':'burpee','mountain':'mountain','skater':'skater','fast-feet':'fastfeet','butt-kicks':'buttkicks','plank-jack':'plankjack','squat-thrust':'burpee',
 'arm-circles':'arm','dynamic-lunge':'lunge','cat-cow':'cat','worlds-greatest':'greatest','chest-stretch':'chest','quad-stretch':'quad','hamstring-stretch':'ham','child-pose':'child','hip-flexor-stretch':'hip'
};

function getPose(id,t){const m=MAP[id]||'squat';switch(m){
 case'pushup':return pushup(t);case'widepush':return pushup(t,1);case'squat':return squat(t);case'pause-squat':return squat(t,true);case'jump':return run(t,true);case'lunge':return lunge(t);case'reverse-lunge':return lunge(t,true);case'pullup':return pullup(t);case'row':return row(t);case'curl':return curl(t);case'raise':return curl(t,true);case'press':return curl(t,false,true);case'dip':return dip(t);case'calf':return calf(t);case'plank':return plank(t);case'sideplank':return plank(t,true);case'bridge':return bridge(t);case'singlebridge':return bridge(t,true);case'quadruped':return quadruped(t);case'bird':return quadruped(t,'bird');case'hydrant':return quadruped(t,'hydrant');case'jack':return jack(t);case'highknees':return run(t,true);case'buttkicks':return run(t,false,true);case'fastfeet':return run(t);case'bicycle':return bicycle(t);case'reversecrunch':return crunch(t,true);case'deadbug':return crunch(t);case'legraise':return crunch(t);case'hollow':return plank(t);case'burpee':return burpee(t);case'mountain':return mountain(t);case'skater':return lunge(t);case'plankjack':return mountain(t);case'arm':return stretch(t,'arm');case'quad':return stretch(t,'quad');case'ham':return stretch(t,'ham');case'child':return stretch(t,'child');case'cat':return stretch(t,'cat');case'hip':return lunge(t);case'chest':return stretch(t,'arm');case'greatest':return lunge(t);case'goodmorning':return goodMorning(t);case'bandwalk':return bandwalk(t);case'step':return step(t);case'wall-sit':case'wallsit':return squat(Math.min(.999,t),true);case'sissy':return squat(t);case'pike':return pike(t);case'handstand':return handstand(t);case'superman':return superman(t);case'snow':return stretch(t,'arm');default:return squat(t)}}

function line(a,b,w,cls='skin'){const st=cls==='skin'?'#f2b18a':cls==='shorts'?'#202936':cls==='weight'?'#d9dee7':'#58b95f';return `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${st}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`}
function circle(p,r,cls){const fill=cls==='joint'?'#ffd0b2':cls==='head'?'#f2b18a':'#f2b18a';return `<circle cx="${p[0]}" cy="${p[1]}" r="${r}" fill="${fill}" stroke="#d98f69" stroke-width="2"/>`}
function renderPose(p,ex){
 const torso=`<line x1="${(p.sl[0]+p.sr[0])/2}" y1="${(p.sl[1]+p.sr[1])/2}" x2="${(p.hlp[0]+p.hrp[0])/2}" y2="${(p.hlp[1]+p.hrp[1])/2}" stroke="#58b95f" stroke-width="52" stroke-linecap="round"/>`;
 const back=ex.equipment==='backpack'?`<rect x="150" y="104" width="60" height="73" rx="14" class="pack"/>`:'';
 const chair=['chair'].includes(ex.equipment)?`<g class="prop"><rect x="278" y="210" width="42" height="9" rx="4"/><rect x="310" y="214" width="8" height="105" rx="4"/></g>`:'';
 const bar=ex.equipment==='bar'?`<g class="prop"><line x1="65" y1="38" x2="295" y2="38" stroke-width="9"/><line x1="78" y1="38" x2="78" y2="50" stroke-width="5"/><line x1="282" y1="38" x2="282" y2="50" stroke-width="5"/></g>`:'';
 const dumb=(ex.equipment==='dumbbell'||ex.equipment==='backpack')&&MAP[ex.id]&&['curl','raise','press','row'].includes(MAP[ex.id]);
 const weights=dumb?`${line([p.hl[0]-8,p.hl[1]],[p.hl[0]+8,p.hl[1]],7,'weight')}${line([p.hr[0]-8,p.hr[1]],[p.hr[0]+8,p.hr[1]],7,'weight')}`:'';
 const band=ex.equipment==='band'?`<path class="band" d="M${p.fl[0]},${p.fl[1]-2} Q180,${p.fl[1]-28} ${p.fr[0]},${p.fr[1]-2}"/>`:'';
 return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Demonstração de ${ex.name}"><defs><linearGradient id="shirtG" x1="0" x2="1"><stop offset="0" stop-color="${C.shirt2}"/><stop offset="1" stop-color="${C.shirt}"/></linearGradient><linearGradient id="skinG" x1="0" x2="1"><stop offset="0" stop-color="${C.skin2}"/><stop offset=".55" stop-color="${C.skin}"/><stop offset="1" stop-color="#ffd1b2"/></linearGradient><filter id="shadow"><feDropShadow dx="0" dy="8" stdDeviation="8" flood-color="#000" flood-opacity=".28"/></filter></defs><ellipse cx="180" cy="334" rx="126" ry="8" fill="#000" opacity=".28"/>${chair}${bar}${back}${band}${torso}
 ${line(p.sl,p.el,22,'skin')}${line(p.el,p.hl,20,'skin')}${line(p.sr,p.er,22,'skin')}${line(p.er,p.hr,20,'skin')}
 ${line(p.hlp,p.kl,28,'shorts')}${line(p.kl,p.fl,22,'skin')}${line(p.hrp,p.kr,28,'shorts')}${line(p.kr,p.fr,22,'skin')}
 ${circle(p.el,11,'joint')}${circle(p.er,11,'joint')}${circle(p.kl,12,'joint')}${circle(p.kr,12,'joint')}${circle(p.hl,7,'joint')}${circle(p.hr,7,'joint')}${weights}
 ${circle(p.head,24,'head')}${circle(p.neck,11,'skin')}
 <path d="M${p.fl[0]-18},${p.fl[1]+4} Q${p.fl[0]},${p.fl[1]-2} ${p.fl[0]+18},${p.fl[1]+4} L${p.fl[0]+17},${p.fl[1]+13} L${p.fl[0]-19},${p.fl[1]+13}Z" class="shoe"/><path d="M${p.fr[0]-18},${p.fr[1]+4} Q${p.fr[0]},${p.fr[1]-2} ${p.fr[0]+18},${p.fr[1]+4} L${p.fr[0]+17},${p.fr[1]+13} L${p.fr[0]-19},${p.fr[1]+13}Z" class="shoe"/>
 <circle cx="${p.head[0]-7}" cy="${p.head[1]-5}" r="3" fill="#1c2026"/><path d="M${p.head[0]-22},${p.head[1]-6} Q${p.head[0]},${p.head[1]-31} ${p.head[0]+22},${p.head[1]-8}" fill="#1d2229" opacity=".9"/>
 </svg>`;
}

export function mountMotionDemo(container,ex,options={}){
 if(!container||!ex)return()=>{};
 container.innerHTML='';container.classList.add('motion-demo');
 const stage=document.createElement('div');stage.className='motion-stage';container.appendChild(stage);
 let raf=0,start=performance.now();const speed=ex.type==='time'?0.72:0.6;
 const animate=options.animate!==false;
 if(!animate){stage.innerHTML=renderPose(getPose(ex.id,0),ex);return()=>{};}
 function frame(now){const t=((now-start)/1000*speed)%1;stage.innerHTML=renderPose(getPose(ex.id,t),ex);raf=requestAnimationFrame(frame)}
 raf=requestAnimationFrame(frame);
 return()=>cancelAnimationFrame(raf);
}
