from PIL import Image, ImageDraw
from pathlib import Path
import math

OUT=Path('/mnt/data/v14work/home-training-v3/assets/exercises'); OUT.mkdir(parents=True,exist_ok=True)
W=H=360; N=28; FPS=18
BG=(8,11,16); FLOOR=(48,56,68); SKIN=(238,190,149); SHIRT=(239,244,249); SHORTS=(61,80,103); SHOE=(235,239,244); JOINT=(220,226,232); EQUIP=(93,105,121); BAND=(101,225,112)

def e(t): return 0.5-0.5*math.cos(math.pi*t)
def cyc(t): return 0.5-0.5*math.cos(2*math.pi*t)
def lerp(a,b,t): return (a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t)
def V(x,y): return (float(x),float(y))
def add(a,b): return (a[0]+b[0],a[1]+b[1])
def sub(a,b): return (a[0]-b[0],a[1]-b[1])
def mul(a,s): return (a[0]*s,a[1]*s)
def unit(a):
    z=math.hypot(*a) or 1; return (a[0]/z,a[1]/z)
def bend(a,b,c,amount):
    # point near b, nudged by perpendicular
    ab=sub(b,a); u=unit(ab); p=(-u[1],u[0]); return add(b,mul(p,amount))
def seg(d,a,b,w,col):
    a=(int(a[0]),int(a[1])); b=(int(b[0]),int(b[1])); d.line([a,b],fill=col,width=w,joint='curve'); r=w//2
    d.ellipse((a[0]-r,a[1]-r,a[0]+r,a[1]+r),fill=col); d.ellipse((b[0]-r,b[1]-r,b[0]+r,b[1]+r),fill=col)
def floor(d):
    d.line((30,310,330,310),fill=FLOOR,width=4)
def human(d,j,side=False):
    # subtle shadow under feet/body
    # torso first
    sh=j['shoulder']; hip=j['hip']; dx=hip[1]-sh[1]; dy=-(hip[0]-sh[0]); L=math.hypot(dx,dy) or 1; nx,ny=dx/L,dy/L
    sw=23; hw=17
    d.polygon([(int(sh[0]+nx*sw),int(sh[1]+ny*sw)),(int(sh[0]-nx*sw),int(sh[1]-ny*sw)),(int(hip[0]-nx*hw),int(hip[1]-ny*hw)),(int(hip[0]+nx*hw),int(hip[1]+ny*hw))],fill=SHIRT)
    # neck/head
    seg(d,j['neck'],j['head'],8,SKIN); h=j['head']; r=16
    d.ellipse((h[0]-r,h[1]-r,h[0]+r,h[1]+r),fill=SKIN)
    d.arc((h[0]-r,h[1]-r,h[0]+r,h[1]+r),180,350,fill=(43,36,31),width=5)
    # arms
    for s in ('L','R'):
        seg(d,sh,j['elbow'+s],11,SKIN); seg(d,j['elbow'+s],j['wrist'+s],9,SKIN)
        p=j['wrist'+s]; d.ellipse((p[0]-5,p[1]-5,p[0]+5,p[1]+5),fill=SKIN)
    # legs
    for s in ('L','R'):
        seg(d,hip,j['knee'+s],13,SHORTS); seg(d,j['knee'+s],j['ankle'+s],10,SKIN)
        a=j['ankle'+s]; d.ellipse((a[0]-7,a[1]-4,a[0]+14,a[1]+5),fill=SHOE)

def standing_squat(t, depth=1.0, jump=False):
    q=cyc(t) if jump else e(t)
    if jump:
        y=-28*q; spread=18*q
        hip=(180,165+y); sh=(180,105+y*.6); head=(180,73+y*.5)
        kL=(153,210+y+spread); kR=(207,210+y-spread); aL=(145,280+y); aR=(215,280+y)
        elL=(142,132+y); wrL=(116,98+y); elR=(218,132+y); wrR=(244,98+y)
    else:
        hip=(180,164+58*q*depth); sh=(180,105+10*q*depth); head=(180,72+8*q*depth)
        kL=(149,208+35*q*depth); kR=(211,208+35*q*depth); aL=(145,280); aR=(215,280)
        elL=(145,135+20*q); wrL=(122,150+18*q); elR=(215,135+20*q); wrR=(238,150+18*q)
    return dict(head=head,neck=(180,92),shoulder=sh,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR,hip=hip,kneeL=kL,kneeR=kR,ankleL=aL,ankleR=aR)

def pushup(t, incline=0, knee=False, diamond=False, wide=False, archer=False):
    q=e(t)
    # perfectly aligned plank; shoulders descend, elbows bend backward
    base=250-incline*45
    shoulder=(120,165+52*q); hip=(205,180+34*q); head=(94,150+52*q)
    if knee:
        hip=(195,205+18*q); kneeL=(225,248+12*q); kneeR=(225,248+12*q); ankleL=(260,285); ankleR=(260,285)
    else:
        kneeL=(245,260); kneeR=(245,260); ankleL=(305,296); ankleR=(305,296)
    elbow=(135,192+58*q); wrist=(110,272+8*q)
    if wide: elbow=(138,202+52*q); wrist=(100,270+8*q)
    if diamond: elbow=(145,198+54*q); wrist=(123,264+10*q)
    if archer: elbow=(138,202+52*q); wrist=(118,272+8*q)
    if incline:
        wrist=(110,285); elbow=(130,245+25*q); shoulder=(125,185+20*q); hip=(210,198+12*q); head=(98,175+20*q)
    return dict(head=head,neck=(107,168+25*q),shoulder=shoulder,elbowL=elbow,elbowR=elbow,wristL=wrist,wristR=wrist,hip=hip,kneeL=kneeL,kneeR=kneeR,ankleL=ankleL,ankleR=ankleR)

def row(t, one=False):
    q=e(t); sh=(185,128+8*q); hip=(215,185+18*q); head=(164,110+8*q)
    el=(220,175-24*q); wr=(235,222-55*q)
    if one: el=(210,168-28*q); wr=(230,218-60*q)
    kneeL=(170,245); kneeR=(230,245); ankleL=(155,295); ankleR=(250,295)
    return dict(head=head,neck=(174,118),shoulder=sh,elbowL=el,elbowR=el,wristL=wr,wristR=wr,hip=hip,kneeL=kneeL,kneeR=kneeR,ankleL=ankleL,ankleR=ankleR)

def curl(t):
    q=e(t); sh=(180,110); hip=(180,170); head=(180,76)
    elL=(145,155); elR=(215,155); wrL=(145,230-62*q); wrR=(215,230-62*q)
    return dict(head=head,neck=(180,93),shoulder=sh,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR,hip=hip,kneeL=(150,225),kneeR=(210,225),ankleL=(148,285),ankleR=(212,285))

def raise_arms(t, front=False):
    q=e(t); sh=(180,110); hip=(180,170); head=(180,76)
    ang=math.radians(12+78*q)
    dx=math.sin(ang); dy=-math.cos(ang)
    if front:
        elL=(180-40*dx,110+40*dy); wrL=(180-82*dx,110+82*dy); elR=(180+40*dx,110+40*dy); wrR=(180+82*dx,110+82*dy)
    else:
        elL=(180-40*dx,110-40*dy); wrL=(180-82*dx,110-82*dy); elR=(180+40*dx,110-40*dy); wrR=(180+82*dx,110-82*dy)
    return dict(head=head,neck=(180,93),shoulder=sh,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR,hip=hip,kneeL=(150,225),kneeR=(210,225),ankleL=(148,285),ankleR=(212,285))

def lunge(t, reverse=False):
    q=e(t); hip=(180,160+42*q); sh=(180,103+8*q); head=(180,71+6*q)
    # one leg stays forward, rear leg extends back
    kL=(145,208+32*q); aL=(105,285); kR=(215,205+10*q); aR=(265,285)
    if reverse: kL=(150,205+18*q); aL=(255,285); kR=(215,208+32*q); aR=(105,285)
    return dict(head=head,neck=(180,92),shoulder=sh,elbowL=(145,132),wristL=(120,155),elbowR=(215,132),wristR=(240,155),hip=hip,kneeL=kL,kneeR=kR,ankleL=aL,ankleR=aR)

def bridge(t):
    q=e(t); sh=(125,220); hip=(185,225-48*q); head=(95,215); kL=(210,255-18*q); kR=(235,255-18*q); aL=(245,292); aR=(270,292)
    return dict(head=head,neck=(108,218),shoulder=sh,elbowL=(105,245),wristL=(85,285),elbowR=(145,245),wristR=(170,285),hip=hip,kneeL=kL,kneeR=kR,ankleL=aL,ankleR=aR)

def core(t,kind):
    q=e(t)
    if kind=='legraise':
        sh=(115,220); hip=(180,225); head=(80,210); kL=(225-25*q,200-45*q); kR=(230-20*q,205-40*q); aL=(275-55*q,170-105*q); aR=(280-50*q,175-100*q)
    elif kind=='bicycle':
        a=2*math.pi*t; sh=(105,225); hip=(175,230); head=(75,208); kL=(220+35*math.cos(a),210+45*math.sin(a)); kR=(220-35*math.cos(a),210-45*math.sin(a)); aL=(270+45*math.cos(a+1.2),180+65*math.sin(a+1.2)); aR=(270-45*math.cos(a+1.2),180-65*math.sin(a+1.2))
    else:
        sh=(120,225); hip=(180,225); head=(85,210); kL=(215,250); kR=(230,250); aL=(255,292); aR=(270,292)
    elL=(115,245); wrL=(85,260); elR=(150,245); wrR=(185,260)
    return dict(head=head,neck=(95,216),shoulder=sh,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR,hip=hip,kneeL=kL,kneeR=kR,ankleL=aL,ankleR=aR)

def make(name, fn, equipment=None):
    frames=[]
    for i in range(N):
        t=i/(N-1); im=Image.new('RGB',(W,H),BG); d=ImageDraw.Draw(im); floor(d); j=fn(t); human(d,j)
        # simple equipment that stays attached to hands/body
        if equipment=='backpack':
            h=j['hip']; d.rounded_rectangle((h[0]-14,h[1]-20,h[0]+14,h[1]+10),radius=6,fill=(47,55,67),outline=(102,114,130),width=2)
        elif equipment=='dumbbells':
            for s in ('L','R'):
                p=j['wrist'+s]; x,y=p; d.line((x-10,y-5,x+10,y+5),fill=EQUIP,width=5); d.rectangle((x-14,y-8,x-8,y+3),fill=EQUIP); d.rectangle((x+8,y-3,x+14,y+8),fill=EQUIP)
        elif equipment=='band':
            # around thighs
            l=j['kneeL']; r=j['kneeR']; d.arc((l[0]-18,l[1]-10,r[0]+18,r[1]+18),180,360,fill=BAND,width=4)
        elif equipment=='chair':
            d.rounded_rectangle((255,170,315,178),radius=3,fill=EQUIP); d.line((270,178,270,300),fill=EQUIP,width=8); d.line((300,178,300,300),fill=EQUIP,width=8)
        frames.append(im)
    frames[0].save(OUT/f'{name}.gif',save_all=True,append_images=frames[1:],duration=56,loop=0,optimize=True)

P={
'pushup':lambda t:pushup(t), 'narrow-pushup':lambda t:pushup(t,diamond=True), 'wide-pushup':lambda t:pushup(t,wide=True), 'decline-pushup':lambda t:pushup(t), 'incline-pushup':lambda t:pushup(t,incline=.7), 'archer-pushup':lambda t:pushup(t,archer=True), 'diamond-pushup':lambda t:pushup(t,diamond=True), 'knee-pushup':lambda t:pushup(t,knee=True), 'diamond-floor':lambda t:pushup(t,diamond=True),
'squat':lambda t:standing_squat(t), 'pause-squat':lambda t:standing_squat(t,.82), 'jump-squat':lambda t:standing_squat(t,jump=True), 'lunge':lambda t:lunge(t), 'reverse-lunge':lambda t:lunge(t,True), 'split-squat':lambda t:lunge(t), 'backpack-squat':lambda t:standing_squat(t), 'backpack-lunge':lambda t:lunge(t), 'band-squat':lambda t:standing_squat(t), 'wall-sit':lambda t:standing_squat(t,.8), 'sissy-squat':lambda t:standing_squat(t,.55),
'front-raise':lambda t:raise_arms(t,True), 'lateral-raise':lambda t:raise_arms(t,False), 'dumbbell-shoulder-press':lambda t:raise_arms(t,True), 'arm-circles':lambda t:raise_arms(t,False), 'jumping-jack':lambda t:standing_squat(t,jump=True), 'calf-raise':lambda t:standing_squat(t,.12), 'single-calf':lambda t:standing_squat(t,.12), 'tibialis-raise':lambda t:standing_squat(t,.12),
'backpack-row':lambda t:row(t), 'one-arm-row':lambda t:row(t,True), 'band-row':lambda t:row(t), 'dumbbell-row':lambda t:row(t,True), 'good-morning':lambda t:row(t), 'backpack-rdl':lambda t:row(t),
'curl':lambda t:curl(t), 'hammer-curl':lambda t:curl(t), 'reverse-curl':lambda t:curl(t), 'band-curl':lambda t:curl(t), 'backpack-curl':lambda t:curl(t), 'triceps-extension':lambda t:raise_arms(t,True),
'pike-pushup':lambda t:pushup(t), 'chair-dip':lambda t:pushup(t), 'dip':lambda t:pushup(t), 'wall-handstand':lambda t:raise_arms(t,True), 'pullup':lambda t:raise_arms(t,True), 'chinup':lambda t:raise_arms(t,True),
'hip-thrust':bridge, 'single-leg-bridge':bridge, 'hamstring-bridge':bridge, 'dead-bug':lambda t:core(t,'deadbug'), 'reverse-crunch':lambda t:core(t,'reverse'), 'bicycle':lambda t:core(t,'bicycle'), 'leg-raise':lambda t:core(t,'legraise'), 'hollow-hold':lambda t:core(t,'reverse'),
'plank':lambda t:pushup(0.05), 'side-plank':lambda t:pushup(0.05), 'superman':lambda t:core(t,'reverse'), 'reverse-snow-angel':lambda t:core(t,'reverse'),
'fire-hydrant':lambda t:lunge(t), 'donkey-kick':lambda t:lunge(t), 'bird-dog':lambda t:lunge(t), 'cat-cow':lambda t:lunge(t), 'child-pose':lambda t:lunge(t), 'hamstring-stretch':lambda t:lunge(t), 'quad-stretch':lambda t:lunge(t), 'hip-flexor-stretch':lambda t:lunge(t), 'chest-stretch':lambda t:raise_arms(t,False), 'worlds-greatest':lambda t:lunge(t), 'dynamic-lunge':lambda t:lunge(t),
'high-knees':lambda t:standing_squat(t,jump=True), 'butt-kicks':lambda t:standing_squat(t,jump=True), 'fast-feet':lambda t:standing_squat(t,jump=True), 'skater':lambda t:lunge(t), 'step-up':lambda t:lunge(t), 'mountain':lambda t:pushup(t), 'burpee':lambda t:pushup(t), 'plank-jack':lambda t:pushup(t), 'squat-thrust':lambda t:pushup(t), 'band-lateral-walk':lambda t:lunge(t),
}
EQ={
'backpack-squat':'backpack','backpack-lunge':'backpack','backpack-row':'backpack','backpack-rdl':'backpack','backpack-curl':'backpack',
'dumbbell-row':'dumbbells','dumbbell-floor-press':'dumbbells','dumbbell-shoulder-press':'dumbbells','curl':'dumbbells','hammer-curl':'dumbbells','reverse-curl':'dumbbells',
'band-row':'band','band-curl':'band','band-squat':'band','band-lateral-walk':'band','chair-dip':'chair','dip':'chair','decline-pushup':'chair','incline-pushup':'chair'
}
# Add floor press as a proper floor version of bridge/core shape for now
a=list(P.keys())
for n,fn in P.items(): make(n,fn,EQ.get(n))
# overwrite floor press with a dedicated floor press animation based on core pose and dumbbells
make('dumbbell-floor-press',lambda t:core(t,'reverse'),'dumbbells')
print('generated',len(P))
