const G='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const DIRECT={
 pushup:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pushups.gif',
 squat:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Squats.gif',
 pullup:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Pullup.gif',
 burpee:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Burpee.gif',
 'jumping-jack':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Jumpingjacks.gif',
 plank:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Plank_exercise.svg',
 lunge:'https://commons.wikimedia.org/wiki/Special:Redirect/file/Lunge-CDC_strength_training_for_older_adults.gif',
 'chair-dip':'https://commons.wikimedia.org/wiki/Special:Redirect/file/Tricep-dips-1.gif'
};
const SLUGS={
 'narrow-pushup':['chest','close-grip-push-up'],'wide-pushup':['chest','wide-hand-push-up'],'decline-pushup':['chest','decline-push-up'],'incline-pushup':['chest','incline-push-up'],'archer-pushup':['chest','archer-push-up'],'diamond-pushup':['chest','diamond-push-up'],'knee-pushup':['chest','knee-push-up'],
 'pike-pushup':['shoulders','pike-push-up'],'wall-handstand':['shoulders','handstand'],'lateral-raise':['shoulders','dumbbell-lateral-raise'],'front-raise':['shoulders','dumbbell-front-raise'],'shoulder-tap':['shoulders','shoulder-tap'],'pike-hold':['shoulders','pike-push-up'],
 'dip':['triceps','bench-dip'],'triceps-extension':['triceps','dumbbell-overhead-triceps-extension'],'diamond-floor':['triceps','diamond-push-up'],
 'chinup':['back','chin-up'],'backpack-row':['back','bent-over-row'],'one-arm-row':['back','dumbbell-one-arm-row'],'band-row':['back','band-row'],'reverse-snow-angel':['back','reverse-snow-angel'],'superman':['back','superman'],
 'backpack-curl':['biceps','barbell-curl'],'curl':['biceps','dumbbell-curl'],'hammer-curl':['biceps','hammer-curl'],'band-curl':['biceps','band-biceps-curl'],'reverse-curl':['biceps','reverse-curl'],
 'pause-squat':['legs','bodyweight-squat'],'jump-squat':['legs','jump-squat'],'reverse-lunge':['legs','reverse-lunge'],'split-squat':['legs','bulgarian-split-squat'],'step-up':['legs','step-up'],'wall-sit':['legs','wall-sit'],'sissy-squat':['legs','sissy-squat'],
 'hip-thrust':['glutes','hip-thrust'],'single-leg-bridge':['glutes','single-leg-glute-bridge'],'donkey-kick':['glutes','donkey-kick'],'fire-hydrant':['glutes','fire-hydrant'],
 'good-morning':['hamstrings','good-morning'],'hamstring-bridge':['hamstrings','hamstring-bridge'],
 'calf-raise':['calves','standing-calf-raise'],'single-calf':['calves','single-leg-calf-raise'],'tibialis-raise':['calves','tibialis-raise'],
 'side-plank':['abs','side-plank'],'dead-bug':['abs','dead-bug'],'bird-dog':['abs','bird-dog'],'reverse-crunch':['abs','reverse-crunch'],'bicycle':['abs','bicycle-crunch'],'leg-raise':['abs','leg-raise'],'hollow-hold':['abs','hollow-body-hold'],
 'high-knees':['cardio','high-knees'],'mountain':['cardio','mountain-climber'],'skater':['cardio','skater'],'fast-feet':['cardio','fast-feet'],'butt-kicks':['cardio','butt-kicks'],'plank-jack':['cardio','plank-jack'],'squat-thrust':['cardio','squat-thrust'],
 'arm-circles':['shoulders','arm-circles'],'dynamic-lunge':['legs','forward-lunge'],'cat-cow':['back','cat-cow'],'worlds-greatest':['legs','worlds-greatest-stretch'],'chest-stretch':['chest','chest-stretch'],'quad-stretch':['legs','standing-quadriceps-stretch'],'hamstring-stretch':['hamstrings','standing-hamstring-stretch'],'child-pose':['back','child-pose'],'hip-flexor-stretch':['legs','hip-flexor-stretch'],
 'backpack-squat':['legs','goblet-squat'],'backpack-rdl':['hamstrings','romanian-deadlift'],'backpack-lunge':['legs','dumbbell-lunge'],'band-squat':['legs','band-squat'],'band-lateral-walk':['glutes','band-side-step'],'dumbbell-floor-press':['chest','dumbbell-floor-press'],'dumbbell-row':['back','dumbbell-row'],'dumbbell-shoulder-press':['shoulders','dumbbell-shoulder-press']
};
export async function resolveMedia(ex){if(ex.media)return ex.media;if(DIRECT[ex.id])return DIRECT[ex.id];const m=SLUGS[ex.id];return m?`${G}/${m[0]}/${m[1]}.gif`:null}
export function mediaCredits(){return [{name:'ExerciseGymGifsDB',url:'https://github.com/JahelCuadrado/ExerciseGymGifsDB',note:'GIFs servidos por CDN; confira a licença e atribuição da fonte antes de redistribuir.'},{name:'Wikimedia Commons',url:'https://commons.wikimedia.org/',note:'Algumas demonstrações individuais vêm de arquivos com licenças próprias.'}]}
