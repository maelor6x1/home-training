import sys
sys.path.insert(0,'/mnt/data/v14work')
import generate_animations_v2 as g
import math

# Specialized, exercise-specific pose generators. They intentionally model the actual movement path rather than reusing a generic pose.
def stand_base(q=0):
    return dict(head=(180,74),neck=(180,93),shoulder=(180,110),hip=(180,170),kneeL=(150,225),kneeR=(210,225),ankleL=(148,285),ankleR=(212,285),elbowL=(145,135),wristL=(122,160),elbowR=(215,135),wristR=(238,160))

def arm_circles(t):
    a=2*math.pi*t; r1=42; r2=86
    sh=(180,110); hip=(180,170)
    elL=(180-r1*math.cos(a),110-r1*math.sin(a)); wrL=(180-r2*math.cos(a),110-r2*math.sin(a))
    elR=(180+r1*math.cos(a),110-r1*math.sin(a)); wrR=(180+r2*math.cos(a),110-r2*math.sin(a))
    j=stand_base(); j.update(shoulder=sh,hip=hip,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR); return j

def calf(t,single=False,tib=False):
    q=g.cyc(t); j=stand_base()
    if tib:
        # toes lift, heels planted
        j['ankleL']=(148,285); j['ankleR']=(212,285); j['wristL']=(122,155); j['wristR']=(238,155)
    else:
        lift=24*q
        j['ankleL']=(148,285-lift); j['ankleR']=(212,285-lift if not single else 285)
        j['kneeL']=(150,225-lift*.15); j['kneeR']=(210,225)
    return j

def quad_base():
    return dict(head=(92,203),neck=(105,211),shoulder=(125,218),hip=(220,238),elbowL=(115,246),wristL=(105,287),elbowR=(145,246),wristR=(155,287),kneeL=(215,270),kneeR=(230,270),ankleL=(270,300),ankleR=(285,300))

def bird_dog(t):
    q=g.cyc(t); j=quad_base();
    # opposite arm/leg extend, then return
    j['wristR']=(155+70*q,287-60*q); j['ankleL']=(270+60*q,300-40*q)
    j['elbowR']=(145+45*q,246-40*q); j['kneeL']=(215+40*q,270-28*q)
    return j

def cat_cow(t):
    q=g.cyc(t); j=quad_base();
    # spine moves between neutral/arched and rounded; limbs stay grounded
    j['hip']=(220,238-18*q); j['shoulder']=(125,218+12*q); j['head']=(92,203+22*q); j['neck']=(105,211+16*q)
    return j

def child_pose(t):
    q=0.5-0.5*math.cos(2*math.pi*t); j=quad_base();
    j['head']=(105+28*q,255+8*q); j['shoulder']=(125+25*q,235+12*q); j['hip']=(215,250+10*q)
    j['elbowL']=(95,270); j['wristL']=(75,292); j['elbowR']=(135,270); j['wristR']=(115,292)
    j['kneeL']=(190,280); j['kneeR']=(205,280); j['ankleL']=(220,305); j['ankleR']=(235,305); return j

def hinge_stretch(t):
    q=g.e(t); j=stand_base();
    j['shoulder']=(180,110+65*q); j['neck']=(175,105+65*q); j['head']=(170,88+65*q); j['hip']=(180,170+18*q)
    j['kneeL']=(150,225); j['kneeR']=(210,225); j['ankleL']=(148,285); j['ankleR']=(212,285)
    j['elbowL']=(155,180+55*q); j['wristL']=(160,225+60*q); j['elbowR']=(205,180+55*q); j['wristR']=(200,225+60*q); return j

def quad_stretch(t):
    q=g.e(t); j=stand_base(); j['kneeR']=(210,225-25*q); j['ankleR']=(205-30*q,215-45*q); j['wristR']=(225-25*q,185-40*q); j['elbowR']=(215,150); return j

def hip_flexor(t):
    return g.lunge(t)

def chest_stretch(t):
    q=g.e(t); j=stand_base();
    j['elbowL']=(135,120-18*q); j['wristL']=(118,105-28*q); j['elbowR']=(225,120-18*q); j['wristR']=(242,105-28*q); return j

def pike(t):
    q=g.e(t); j=g.pushup(t); j['shoulder']=(135,170); j['hip']=(190,125); j['head']=(112,195); j['neck']=(125,180); j['elbowL']=(140,220+12*q); j['elbowR']=(140,220+12*q); j['wristL']=(135,270); j['wristR']=(135,270); j['kneeL']=(235,230); j['kneeR']=(235,230); j['ankleL']=(300,295); j['ankleR']=(300,295); return j

def hanging(t):
    q=g.e(t); y=0
    sh=(180,115+30*q); hip=(180,205+45*q); head=(180,80+30*q)
    elL=(150+25*q,145+45*q); elR=(210-25*q,145+45*q); wrL=(145,110); wrR=(215,110)
    return dict(head=head,neck=(180,98+30*q),shoulder=sh,elbowL=elL,wristL=wrL,elbowR=elR,wristR=wrR,hip=hip,kneeL=(155,255+25*q),kneeR=(205,255+25*q),ankleL=(150,305),ankleR=(210,305))

def wall_handstand(t):
    q=g.e(t); return dict(head=(180,278-4*q),neck=(180,260),shoulder=(180,235),elbowL=(155,250),wristL=(145,305),elbowR=(205,250),wristR=(215,305),hip=(180,175),kneeL=(165,125),kneeR=(195,125),ankleL=(165,70),ankleR=(195,70))

def chair_dip(t):
    q=g.e(t); j=stand_base();
    j['head']=(190,150+15*q); j['neck']=(190,168+15*q); j['shoulder']=(190,185+15*q); j['hip']=(225,235+22*q)
    j['elbowL']=(215,205+30*q); j['wristL']=(265,205+30*q); j['elbowR']=(215,205+30*q); j['wristR']=(265,205+30*q)
    j['kneeL']=(270,250); j['kneeR']=(270,250); j['ankleL']=(315,290); j['ankleR']=(315,290); return j

def floor_press(t):
    q=g.e(t); sh=(125,220); hip=(200,235); head=(90,210); elbowL=(125,180+40*q); elbowR=(125,180+40*q); wristL=(125,135+5*q); wristR=(125,135+5*q)
    return dict(head=head,neck=(105,215),shoulder=sh,elbowL=elbowL,wristL=wristL,elbowR=elbowR,wristR=wristR,hip=hip,kneeL=(235,260),kneeR=(250,260),ankleL=(270,300),ankleR=(285,300))

def crunch(t):
    q=g.e(t); sh=(120,225-25*q); hip=(185,230); head=(80,205-25*q); elbowL=(105,235-25*q); wristL=(82,245-25*q); elbowR=(145,235-25*q); wristR=(170,245-25*q); kneeL=(220,245); kneeR=(235,245); ankleL=(255,292); ankleR=(270,292)
    return dict(head=head,neck=(100,215-25*q),shoulder=sh,elbowL=elbowL,wristL=wristL,elbowR=elbowR,wristR=wristR,hip=hip,kneeL=kneeL,kneeR=kneeR,ankleL=ankleL,ankleR=ankleR)

def hollow(t):
    q=0.5-0.5*math.cos(2*math.pi*t); sh=(110,225); hip=(180,245); head=(80,220); lift=16*q
    return dict(head=head,neck=(95,222),shoulder=sh,elbowL=(85,200-lift),wristL=(55,185-lift),elbowR=(115,195-lift),wristR=(145,180-lift),hip=hip,kneeL=(230,235),kneeR=(240,235),ankleL=(285,225),ankleR=(295,225))

def superman(t):
    q=g.cyc(t); sh=(120,235-10*q); hip=(200,245); head=(85,225-8*q)
    return dict(head=head,neck=(102,230-8*q),shoulder=sh,elbowL=(80,220-25*q),wristL=(50,205-35*q),elbowR=(145,215-25*q),wristR=(175,195-35*q),hip=hip,kneeL=(235,250-18*q),kneeR=(245,250-18*q),ankleL=(285,235-30*q),ankleR=(295,235-30*q))

def side_plank(t):
    q=g.e(t); sh=(125,205); hip=(205,205); head=(95,190); elbow=(130,245); wrist=(130,285); knee=(245,260); ankle=(305,285)
    return dict(head=head,neck=(108,198),shoulder=sh,elbowL=elbow,elbowR=elbow,wristL=wrist,wristR=wrist,hip=hip,kneeL=knee,kneeR=knee,ankleL=ankle,ankleR=ankle)

def mountain(t):
    a=2*math.pi*t; j=g.pushup(0); j['kneeL']=(200+45*math.cos(a),205+35*math.sin(a)); j['kneeR']=(200-45*math.cos(a),205-35*math.sin(a)); j['ankleL']=(270,295); j['ankleR']=(300,295); return j

def plank_jack(t):
    a=g.cyc(t); j=g.pushup(0); j['ankleL']=(305+25*a,296); j['ankleR']=(305-25*a,296); return j

def burpee(t):
    # phase: stand -> squat -> plank -> return
    if t<.25: return g.standing_squat(t*4)
    if t<.5: return g.pushup(0)
    if t<.75: return g.pushup(0.9)
    return g.standing_squat(1-(t-.75)*4)

def high_knees(t):
    a=2*math.pi*t; j=stand_base(); q=(math.sin(a)+1)/2; side=math.sin(a)
    j['kneeL']=(150,225-70*max(0,side)); j['kneeR']=(210,225-70*max(0,-side)); j['ankleL']=(145,285); j['ankleR']=(215,285); return j

def butt_kicks(t):
    a=2*math.pi*t; j=stand_base(); side=math.sin(a); j['ankleL']=(148,245-45*max(0,side)); j['ankleR']=(212,245-45*max(0,-side)); j['kneeL']=(150,220); j['kneeR']=(210,220); return j

def skater(t):
    a=2*math.pi*t; s=math.sin(a); j=stand_base(); j['hip']=(180,170); j['kneeL']=(150,235); j['kneeR']=(210+35*s,235); j['ankleL']=(140,290); j['ankleR']=(250+45*s,290); j['elbowL']=(135,145); j['wristL']=(100+45*s,175); j['elbowR']=(225,145); j['wristR']=(260-45*s,175); return j

def step_up(t):
    q=g.e(t); j=stand_base(); j['kneeL']=(150,225-65*q); j['ankleL']=(150,285-65*q); j['kneeR']=(210,225); j['ankleR']=(210,285); return j

def band_walk(t):
    s=math.sin(2*math.pi*t); j=stand_base(); j['kneeL']=(150-18*s,225); j['ankleL']=(148-30*s,285); j['kneeR']=(210+18*s,225); j['ankleR']=(212+30*s,285); return j

def shoulder_tap(t):
    q=math.sin(2*math.pi*t); j=g.pushup(0); j['wristL']=(145+28*max(0,q),260); j['wristR']=(115+28*max(0,-q),260); return j

# Specialized map
S={
'arm-circles':arm_circles,'bird-dog':bird_dog,'cat-cow':cat_cow,'child-pose':child_pose,'hamstring-stretch':hinge_stretch,'quad-stretch':quad_stretch,'hip-flexor-stretch':hip_flexor,'chest-stretch':chest_stretch,'worlds-greatest':hip_flexor,'dynamic-lunge':lambda t:g.lunge(t),
'calf-raise':calf,'single-calf':lambda t:calf(t,True),'tibialis-raise':lambda t:calf(t,tib=True),
'pike-pushup':pike,'pike-hold':pike,'pullup':hanging,'chinup':hanging,'wall-handstand':wall_handstand,'chair-dip':chair_dip,'dip':chair_dip,
'dumbbell-floor-press':floor_press,'reverse-crunch':crunch,'bicycle':lambda t:g.core(t,'bicycle'),'leg-raise':lambda t:g.core(t,'legraise'),'hollow-hold':hollow,'superman':superman,'reverse-snow-angel':superman,'side-plank':side_plank,'plank':lambda t:g.pushup(.05),'shoulder-tap':shoulder_tap,
'donkey-kick':bird_dog,'fire-hydrant':bird_dog,'mountain':mountain,'plank-jack':plank_jack,'burpee':burpee,'squat-thrust':burpee,'high-knees':high_knees,'butt-kicks':butt_kicks,'skater':skater,'step-up':step_up,'band-lateral-walk':band_walk,
}
for n,fn in S.items():
    eq=None
    if n in ('chair-dip','dip'): eq='chair'
    if n=='dumbbell-floor-press': eq='dumbbells'
    if n=='band-lateral-walk': eq='band'
    g.make(n,fn,eq)
print('patched',len(S))
