const G='https://cdn.jsdelivr.net/gh/JahelCuadrado/ExerciseGymGifsDB@v1.1.0';
const gif=(muscle,slug)=>`${G}/${muscle}/${slug}.gif`;
const localMedia=(id)=>`assets/exercises/${id}.gif`;
const e=(id,name,body,target,equipment,level,type,base,sets,rest,goals,desc,media=null,extra={})=>({id,name,body,target,equipment,level,type,base,sets,rest,goals,desc,media:localMedia(id),...extra});

export const EXERCISES=[
// PEITO
 e('pushup','Flexão tradicional','Peito','Peitoral • Tríceps','none','beginner','reps',10,3,60,['hypertrophy','strength','calisthenics'],'Corpo alinhado, desça com controle.',gif('chest','push-up')),
 e('narrow-pushup','Flexão fechada','Peito','Peitoral • Tríceps','none','intermediate','reps',8,3,60,['hypertrophy','strength','calisthenics'],'Mantenha os cotovelos próximos ao corpo.',gif('chest','close-grip-push-up')),
 e('wide-pushup','Flexão aberta','Peito','Peitoral','none','beginner','reps',10,3,60,['hypertrophy','strength','calisthenics'],'Use uma abertura confortável e controle a descida.',gif('chest','wide-hand-push-up')),
 e('decline-pushup','Flexão declinada','Peito','Peitoral superior • Ombros','chair','intermediate','reps',8,3,75,['hypertrophy','strength'],'Pés elevados em superfície firme.',gif('chest','decline-push-up')),
 e('incline-pushup','Flexão inclinada','Peito','Peitoral • Tríceps','chair','beginner','reps',12,3,45,['hypertrophy','strength'],'Use apoio firme e estável.',gif('chest','incline-push-up')),
 e('archer-pushup','Flexão arqueiro','Peito','Peitoral • Tríceps','none','advanced','reps',5,3,90,['strength','calisthenics'],'Desloque o peso para um lado mantendo o outro braço mais estendido.',gif('chest','archer-push-up')),
 e('diamond-pushup','Flexão diamante','Peito','Tríceps • Peitoral','none','intermediate','reps',8,3,60,['hypertrophy','strength','calisthenics'],'Mãos próximas formando um triângulo.',gif('chest','diamond-push-up')),
 e('knee-pushup','Flexão com joelhos','Peito','Peitoral • Tríceps','none','beginner','reps',12,3,45,['hypertrophy','strength'],'Regressão para construir força.',gif('chest','knee-push-up')),
// OMBROS
 e('pike-pushup','Flexão pike','Ombros','Deltoides • Tríceps','none','intermediate','reps',8,3,75,['strength','calisthenics'],'Eleve o quadril e leve a cabeça em direção ao chão.',gif('shoulders','pike-push-up')),
 e('wall-handstand','Parada de mãos na parede','Ombros','Deltoides • Core','none','advanced','time',20,3,90,['strength','calisthenics'],'Só faça com espaço seguro e controle.',gif('shoulders','handstand')),
 e('lateral-raise','Elevação lateral','Ombros','Deltoide lateral','dumbbell','beginner','reps',12,3,60,['hypertrophy'],'Suba os braços até uma amplitude confortável.',gif('shoulders','dumbbell-lateral-raise')),
 e('front-raise','Elevação frontal','Ombros','Deltoide anterior','dumbbell','beginner','reps',12,3,60,['hypertrophy'],'Evite balanço do tronco.',gif('shoulders','dumbbell-front-raise')),
 e('shoulder-tap','Toque no ombro','Ombros','Core • Deltoides','none','beginner','reps',16,3,45,['strength','conditioning','calisthenics'],'Mantenha o quadril o mais estável possível.',gif('shoulders','shoulder-tap')),
 e('pike-hold','Isometria pike','Ombros','Ombros • Core','none','intermediate','time',20,3,45,['strength','calisthenics'],'Mantenha a posição com respiração contínua.',gif('shoulders','pike-push-up')),
// TRÍCEPS
 e('chair-dip','Tríceps na cadeira','Tríceps','Tríceps','chair','beginner','reps',10,3,60,['hypertrophy','strength'],'Use cadeira firme e estável.',gif('triceps','bench-dip')),
 e('dip','Tríceps banco','Tríceps','Tríceps','chair','intermediate','reps',8,3,60,['hypertrophy','strength'],'Desça com controle e sem dor nos ombros.',gif('triceps','bench-dip')),
 e('triceps-extension','Tríceps acima da cabeça','Tríceps','Tríceps','backpack','beginner','reps',12,3,60,['hypertrophy'],'Estenda os cotovelos sem balançar.',gif('triceps','dumbbell-overhead-triceps-extension')),
 e('diamond-floor','Tríceps no chão','Tríceps','Tríceps • Peitoral','none','intermediate','reps',8,3,60,['strength','calisthenics'],'Mantenha o corpo firme durante a descida.',gif('triceps','diamond-push-up')),
// COSTAS
 e('pullup','Barra fixa','Costas','Dorsais • Bíceps','bar','intermediate','reps',6,3,90,['strength','calisthenics'],'Comece com assistência se necessário.',gif('back','pull-up')),
 e('chinup','Barra supinada','Costas','Dorsais • Bíceps','bar','intermediate','reps',6,3,90,['strength','hypertrophy','calisthenics'],'Pegada supinada e subida controlada.',gif('back','chin-up')),
 e('backpack-row','Remada com mochila','Costas','Dorsais • Bíceps','backpack','beginner','reps',12,3,60,['hypertrophy','strength'],'Puxe a mochila em direção ao tronco.',gif('back','bent-over-row')),
 e('one-arm-row','Remada unilateral','Costas','Dorsais • Bíceps','dumbbell','beginner','reps',10,3,60,['hypertrophy','strength'],'Apoie-se e mantenha a coluna neutra.',gif('back','dumbbell-one-arm-row')),
 e('band-row','Remada com elástico','Costas','Dorsais • Romboides','band','beginner','reps',12,3,60,['hypertrophy','strength'],'Puxe o elástico sem compensar com o tronco.',gif('back','band-row')),
 e('reverse-snow-angel','Anjo reverso','Costas','Parte superior das costas','none','beginner','reps',12,2,45,['strength','mobility'],'Movimento lento para controle escapular.',gif('back','reverse-snow-angel')),
 e('superman','Superman','Costas','Lombar • Glúteos','none','beginner','reps',12,3,45,['strength','conditioning'],'Eleve braços e pernas sem forçar a lombar.',gif('back','superman')),
// BÍCEPS / ANTEBRAÇO
 e('backpack-curl','Rosca com mochila','Bíceps','Bíceps','backpack','beginner','reps',12,3,60,['hypertrophy','strength'],'Mantenha os cotovelos próximos ao corpo.',gif('biceps','barbell-curl')),
 e('curl','Rosca com halteres','Bíceps','Bíceps','dumbbell','beginner','reps',12,3,60,['hypertrophy','strength'],'Suba e desça com controle.',gif('biceps','dumbbell-curl')),
 e('hammer-curl','Rosca martelo','Bíceps','Bíceps • Braquiorradial','dumbbell','beginner','reps',12,3,60,['hypertrophy','strength'],'Palmas voltadas uma para a outra.',gif('biceps','hammer-curl')),
 e('band-curl','Rosca com elástico','Bíceps','Bíceps','band','beginner','reps',15,3,60,['hypertrophy'],'Mantenha tensão durante todo o movimento.',gif('biceps','band-biceps-curl')),
 e('reverse-curl','Rosca inversa','Bíceps','Bíceps • Antebraço','dumbbell','intermediate','reps',10,3,60,['hypertrophy','strength'],'Use pegada pronada.',gif('biceps','reverse-curl')),
// PERNAS / QUADRÍCEPS
 e('squat','Agachamento','Pernas','Quadríceps • Glúteos','none','beginner','reps',12,3,60,['hypertrophy','strength','conditioning'],'Desça com controle e mantenha estabilidade.',gif('legs','bodyweight-squat')),
 e('pause-squat','Agachamento com pausa','Pernas','Quadríceps • Glúteos','none','intermediate','reps',10,3,60,['hypertrophy','strength'],'Pause brevemente no ponto mais baixo confortável.',gif('legs','bodyweight-squat')),
 e('jump-squat','Agachamento com salto','Pernas','Quadríceps • Glúteos','none','intermediate','reps',10,3,60,['conditioning','strength'],'Aterre suavemente.',gif('legs','jump-squat')),
 e('lunge','Avanço alternado','Pernas','Quadríceps • Glúteos','none','beginner','reps',10,3,45,['hypertrophy','strength','conditioning'],'Alterne as pernas com estabilidade.',gif('legs','forward-lunge')),
 e('reverse-lunge','Avanço reverso','Pernas','Quadríceps • Glúteos','none','beginner','reps',10,3,45,['hypertrophy','strength'],'Dê o passo para trás e mantenha o joelho alinhado.',gif('legs','reverse-lunge')),
 e('split-squat','Agachamento búlgaro','Pernas','Quadríceps • Glúteos','chair','intermediate','reps',8,3,60,['hypertrophy','strength'],'Pé traseiro apoiado em superfície firme.',gif('legs','bulgarian-split-squat')),
 e('step-up','Step-up','Pernas','Quadríceps • Glúteos','chair','beginner','reps',10,3,60,['hypertrophy','strength','conditioning'],'Suba em apoio muito firme e baixo.',gif('legs','step-up')),
 e('wall-sit','Cadeira na parede','Pernas','Quadríceps • Glúteos','none','beginner','time',30,3,45,['strength','conditioning'],'Mantenha a posição sem dor.',gif('legs','wall-sit')),
 e('sissy-squat','Sissy squat assistido','Pernas','Quadríceps','chair','advanced','reps',6,3,75,['hypertrophy','strength'],'Use apoio e amplitude controlada.',gif('legs','sissy-squat')),
// POSTERIORES / GLÚTEOS
 e('hip-thrust','Elevação pélvica','Glúteos','Glúteos • Posteriores','none','beginner','reps',15,3,45,['hypertrophy','strength'],'Contraia os glúteos no topo.',gif('glutes','hip-thrust')),
 e('single-leg-bridge','Elevação pélvica unilateral','Glúteos','Glúteos • Posteriores','none','intermediate','reps',10,3,60,['hypertrophy','strength'],'Mantenha a pelve estável.',gif('glutes','single-leg-glute-bridge')),
 e('good-morning','Good morning','Posteriores','Posteriores • Glúteos','backpack','beginner','reps',12,3,60,['strength','hypertrophy'],'Incline o quadril mantendo coluna neutra.',gif('hamstrings','good-morning')),
 e('hamstring-bridge','Ponte para posteriores','Posteriores','Posteriores • Glúteos','chair','intermediate','reps',10,3,60,['hypertrophy','strength'],'Calcanhares apoiados e quadril estável.',gif('hamstrings','hamstring-bridge')),
 e('donkey-kick','Coice de glúteo','Glúteos','Glúteos','none','beginner','reps',15,3,45,['hypertrophy'],'Evite girar a pelve.',gif('glutes','donkey-kick')),
 e('fire-hydrant','Abdução em quatro apoios','Glúteos','Glúteo médio','none','beginner','reps',15,3,45,['hypertrophy','mobility'],'Abra o joelho sem girar o tronco.',gif('glutes','fire-hydrant')),
// PANTURRILHAS / TIBIAL
 e('calf-raise','Elevação de panturrilha','Panturrilhas','Gastrocnêmio • Sóleo','none','beginner','reps',15,3,40,['hypertrophy','strength'],'Suba e desça lentamente.',gif('calves','standing-calf-raise')),
 e('single-calf','Panturrilha unilateral','Panturrilhas','Gastrocnêmio','none','intermediate','reps',12,3,45,['hypertrophy','strength'],'Use apoio para equilíbrio.',gif('calves','single-leg-calf-raise')),
 e('tibialis-raise','Elevação de ponta dos pés','Panturrilhas','Tibial anterior','none','beginner','reps',15,3,40,['strength'],'Encoste as costas na parede e levante a ponta dos pés.',gif('calves','tibialis-raise')),
// CORE
 e('plank','Prancha','Core','Abdômen • Ombros','none','beginner','time',30,3,45,['strength','conditioning'],'Mantenha cabeça, tronco e quadril alinhados.',gif('abs','plank')),
 e('side-plank','Prancha lateral','Core','Oblíquos • Core','none','beginner','time',25,3,45,['strength','conditioning'],'Mantenha o quadril elevado.',gif('abs','side-plank')),
 e('dead-bug','Dead bug','Core','Abdômen profundo','none','beginner','reps',10,3,45,['strength','mobility'],'Mantenha a lombar confortável no chão.',gif('abs','dead-bug')),
 e('bird-dog','Bird dog','Core','Core • Lombar','none','beginner','reps',10,3,45,['strength','mobility'],'Alcance braço e perna opostos sem girar o tronco.',gif('abs','bird-dog')),
 e('reverse-crunch','Abdominal reverso','Core','Abdômen inferior','none','intermediate','reps',12,3,45,['hypertrophy','strength'],'Enrole a pelve com controle.',gif('abs','reverse-crunch')),
 e('bicycle','Abdominal bicicleta','Core','Abdômen • Oblíquos','none','intermediate','reps',16,3,45,['conditioning','strength'],'Alterne os lados sem puxar o pescoço.',gif('abs','bicycle-crunch')),
 e('leg-raise','Elevação de pernas','Core','Abdômen inferior','none','intermediate','reps',10,3,60,['strength','hypertrophy'],'Evite arquear excessivamente a lombar.',gif('abs','leg-raise')),
 e('hollow-hold','Hollow hold','Core','Abdômen','none','advanced','time',20,3,60,['strength','calisthenics'],'Mantenha a posição com controle.',gif('abs','hollow-body-hold')),
// HIIT / CARDIO
 e('jumping-jack','Polichinelo','HIIT','Cardio • Corpo inteiro','none','beginner','time',30,2,30,['conditioning'],'Movimente braços e pernas em ritmo constante.',gif('cardio','jumping-jack')),
 e('high-knees','Joelhos altos','HIIT','Cardio • Core','none','beginner','time',30,3,30,['conditioning'],'Corra parado elevando os joelhos.',gif('cardio','high-knees')),
 e('burpee','Burpee','HIIT','Corpo inteiro • Cardio','none','intermediate','time',25,3,45,['conditioning'],'Agache, vá ao chão e retorne com controle.',gif('cardio','burpee')),
 e('mountain','Mountain climber','HIIT','Core • Cardio','none','intermediate','time',30,3,30,['conditioning'],'Alterne joelhos mantendo o quadril estável.',gif('cardio','mountain-climber')),
 e('skater','Skater','HIIT','Pernas • Cardio','none','intermediate','time',30,3,30,['conditioning'],'Salte lateralmente com aterrissagem controlada.',gif('cardio','skater')),
 e('fast-feet','Passos rápidos','HIIT','Cardio • Pernas','none','beginner','time',30,3,30,['conditioning'],'Passos curtos e rápidos no lugar.',gif('cardio','fast-feet')),
 e('butt-kicks','Calcanhar no glúteo','HIIT','Cardio • Posteriores','none','beginner','time',30,2,30,['conditioning'],'Ritmo contínuo e leve.',gif('cardio','butt-kicks')),
 e('plank-jack','Prancha com abertura','HIIT','Core • Cardio','none','intermediate','time',25,3,30,['conditioning','strength'],'Abra e feche os pés mantendo o tronco firme.',gif('cardio','plank-jack')),
 e('squat-thrust','Agachamento com extensão','HIIT','Corpo inteiro','none','intermediate','time',30,3,30,['conditioning'],'Versão de baixo impacto do burpee.',gif('cardio','squat-thrust')),
// MOBILIDADE / FLEXIBILIDADE
 e('arm-circles','Círculos de braços','Mobilidade','Ombros','none','beginner','time',30,1,0,['mobility'],'Círculos lentos e confortáveis.',gif('shoulders','arm-circles'),{phase:'warmup'}),
 e('dynamic-lunge','Avanço dinâmico','Mobilidade','Quadril • Pernas','none','beginner','time',30,1,0,['mobility','conditioning'],'Movimente-se suavemente.',gif('legs','forward-lunge'),{phase:'warmup'}),
 e('cat-cow','Gato-vaca','Mobilidade','Coluna • Core','none','beginner','time',40,1,0,['mobility'],'Alterne flexão e extensão suaves da coluna.',gif('back','cat-cow'),{phase:'warmup'}),
 e('worlds-greatest','World’s greatest stretch','Mobilidade','Quadril • Torácica','none','beginner','time',40,1,0,['mobility'],'Movimento amplo sem forçar.',gif('legs','worlds-greatest-stretch'),{phase:'warmup'}),
 e('chest-stretch','Alongamento de peito','Mobilidade','Peitoral','none','beginner','time',30,1,0,['mobility'],'Alongue sem chegar à dor.',gif('chest','chest-stretch'),{phase:'cooldown'}),
 e('quad-stretch','Alongamento de quadríceps','Mobilidade','Quadríceps','none','beginner','time',30,1,0,['mobility'],'Respire de forma tranquila.',gif('legs','standing-quadriceps-stretch'),{phase:'cooldown'}),
 e('hamstring-stretch','Alongamento de posteriores','Mobilidade','Posteriores','none','beginner','time',30,1,0,['mobility'],'Incline-se apenas até sentir tensão leve.',gif('hamstrings','standing-hamstring-stretch'),{phase:'cooldown'}),
 e('child-pose','Postura da criança','Mobilidade','Costas • Quadril','none','beginner','time',40,1,0,['mobility'],'Respiração lenta e confortável.',gif('back','child-pose'),{phase:'cooldown'}),
 e('hip-flexor-stretch','Alongamento do flexor do quadril','Mobilidade','Flexores do quadril','none','beginner','time',30,1,0,['mobility'],'Mantenha a pelve neutra.',gif('legs','hip-flexor-stretch'),{phase:'cooldown'}),
// MOCHILA / ELÁSTICO / PESOS
 e('backpack-squat','Agachamento com mochila','Pernas','Quadríceps • Glúteos','backpack','beginner','reps',10,3,60,['hypertrophy','strength'],'Mochila bem fechada e carga segura.',gif('legs','goblet-squat')),
 e('backpack-rdl','Levantamento romeno com mochila','Posteriores','Posteriores • Glúteos','backpack','beginner','reps',12,3,60,['hypertrophy','strength'],'Empurre o quadril para trás com coluna neutra.',gif('hamstrings','romanian-deadlift')),
 e('backpack-lunge','Avanço com mochila','Pernas','Quadríceps • Glúteos','backpack','intermediate','reps',10,3,60,['hypertrophy','strength'],'Segure a mochila de modo estável.',gif('legs','dumbbell-lunge')),
 e('band-squat','Agachamento com elástico','Pernas','Quadríceps • Glúteos','band','beginner','reps',12,3,60,['hypertrophy','strength'],'Mantenha tensão constante no elástico.',gif('legs','band-squat')),
 e('band-lateral-walk','Caminhada lateral com elástico','Glúteos','Glúteo médio','band','beginner','reps',12,3,45,['hypertrophy','conditioning'],'Passos curtos mantendo tensão.',gif('glutes','band-side-step')),
 e('dumbbell-floor-press','Supino no chão','Peito','Peitoral • Tríceps','dumbbell','beginner','reps',10,3,75,['hypertrophy','strength'],'Use halteres leves/moderados e controle.',gif('chest','dumbbell-floor-press')),
 e('dumbbell-row','Remada com halter','Costas','Dorsais • Bíceps','dumbbell','beginner','reps',10,3,60,['hypertrophy','strength'],'Puxe o cotovelo para trás.',gif('back','dumbbell-row')),
 e('dumbbell-shoulder-press','Desenvolvimento com halteres','Ombros','Deltoides • Tríceps','dumbbell','beginner','reps',10,3,75,['hypertrophy','strength'],'Pressione acima da cabeça com controle.',gif('shoulders','dumbbell-shoulder-press'))
];

export const EXERCISE_BY_ID=Object.fromEntries(EXERCISES.map(x=>[x.id,x]));
