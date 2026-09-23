const GIF={
 closePushup:'https://fitexercisedb.com/marketplace/preview/0259.gif',
 inclinePushup:'https://fitexercisedb.com/marketplace/preview/0493.gif',
 chairDip:'https://fitexercisedb.com/marketplace/preview/0129.gif',
 row:'https://fitexercisedb.com/marketplace/preview/0499.gif',
 pullup:'https://static.exercisedb.dev/media/lBDjFxJ.gif',
 curl:'https://static.exercisedb.dev/media/NbVPDMW.gif',
 squatJump:'https://fitexercisedb.com/marketplace/preview/0514.gif',
 hipRaise:'https://fitexercisedb.com/marketplace/preview/0484.gif',
 mountain:'https://fitexercisedb.com/marketplace/preview/0630.gif',
 plankTwist:'https://fitexercisedb.com/marketplace/preview/0464.gif',
 burpee:'https://fitexercisedb.com/marketplace/preview/0501.gif'
};
export const EXERCISES=[
 {id:'pike-pushup',name:'Flexão pike',body:'Ombros',target:'Deltoides • Tríceps',equipment:'none',level:'intermediate',type:'reps',base:8,sets:3,rest:60,desc:'Eleve o quadril e desça a cabeça em direção ao chão mantendo o controle.',media:null,poster:'https://raw.githubusercontent.com/yuhonas/free-exercise-db/main/exercises/Pike_Push-Up/0.jpg'},
 {id:'pushup',name:'Flexão fechada',body:'Peito',target:'Peitoral • Tríceps',equipment:'none',level:'beginner',type:'reps',base:10,sets:3,rest:60,desc:'Mantenha o corpo alinhado e desça com controle.',media:GIF.closePushup},
 {id:'incline-pushup',name:'Flexão inclinada',body:'Peito',target:'Peitoral',equipment:'chair',level:'beginner',type:'reps',base:12,sets:3,rest:45,desc:'Use uma superfície firme e estável.',media:GIF.inclinePushup},
 {id:'chair-dip',name:'Tríceps na cadeira',body:'Braços',target:'Tríceps',equipment:'chair',level:'beginner',type:'reps',base:10,sets:3,rest:60,desc:'Apoie-se em uma cadeira firme e estável.',media:GIF.chairDip},
 {id:'backpack-row',name:'Remada com mochila',body:'Costas',target:'Dorsais • Bíceps',equipment:'backpack',level:'beginner',type:'reps',base:12,sets:3,rest:60,desc:'Carregue a mochila com uma carga segura e puxe em direção ao tronco.',media:GIF.row,mediaNote:'A animação mostra a mecânica de uma remada; a carga usada no treino é a mochila.'},
 {id:'row',name:'Remada invertida',body:'Costas',target:'Dorsais • Bíceps',equipment:'none',level:'intermediate',type:'reps',base:8,sets:3,rest:75,desc:'Use apenas uma superfície baixa e muito estável. Não improvise apoios frágeis.',media:GIF.row},
 {id:'pullup',name:'Barra fixa',body:'Costas',target:'Dorsais • Bíceps',equipment:'bar',level:'intermediate',type:'reps',base:6,sets:3,rest:90,desc:'Comece com assistência se necessário.',media:GIF.pullup},
 {id:'backpack-curl',name:'Rosca com mochila',body:'Braços',target:'Bíceps',equipment:'backpack',level:'beginner',type:'reps',base:12,sets:3,rest:60,desc:'Segure a mochila com firmeza e evite balançar o corpo.',media:GIF.curl,mediaNote:'A animação demonstra a mesma mecânica com halter; no treino você usa mochila.'},
 {id:'curl',name:'Rosca com halteres',body:'Braços',target:'Bíceps',equipment:'dumbbell',level:'beginner',type:'reps',base:12,sets:3,rest:60,desc:'Mantenha os cotovelos próximos ao corpo.',media:GIF.curl},
 {id:'squat',name:'Agachamento com salto',body:'Pernas',target:'Quadríceps • Glúteos',equipment:'none',level:'intermediate',type:'reps',base:10,sets:3,rest:60,desc:'Aterre suavemente e mantenha os joelhos acompanhando os pés.',media:GIF.squatJump},
 {id:'hip-thrust',name:'Elevação pélvica',body:'Glúteos',target:'Glúteos • Posteriores',equipment:'none',level:'beginner',type:'reps',base:15,sets:3,rest:45,desc:'Contraia os glúteos no topo do movimento.',media:GIF.hipRaise},
 {id:'plank',name:'Prancha com rotação',body:'Core',target:'Abdômen • Ombros',equipment:'none',level:'intermediate',type:'time',base:30,sets:3,rest:45,desc:'Mantenha o tronco firme e controle a rotação.',media:GIF.plankTwist},
 {id:'mountain',name:'Mountain climber',body:'Cardio',target:'Core • Cardio',equipment:'none',level:'intermediate',type:'time',base:30,sets:3,rest:45,desc:'Alterne os joelhos sem perder o alinhamento do tronco.',media:GIF.mountain},
 {id:'burpee',name:'Burpee leve',body:'Cardio',target:'Corpo inteiro',equipment:'none',level:'beginner',type:'time',base:25,sets:1,rest:0,desc:'Use um ritmo confortável para elevar a temperatura corporal.',media:GIF.burpee},
 {id:'arm-circles',name:'Mobilidade de ombros',body:'Ombros',target:'Ombros',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Faça círculos lentos e confortáveis.',media:null},
 {id:'hip-mobility',name:'Mobilidade de quadril',body:'Mobilidade',target:'Quadril',equipment:'none',level:'beginner',type:'time',base:40,sets:1,rest:0,desc:'Movimente-se lentamente dentro de uma amplitude confortável.',media:null},
 {id:'chest-stretch',name:'Alongamento de peito',body:'Mobilidade',target:'Peitoral',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Alongamento leve; não force até a dor.',media:null},
 {id:'quad-stretch',name:'Alongamento de quadríceps',body:'Mobilidade',target:'Quadríceps',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Segure o alongamento com respiração tranquila.',media:null}
];
export const EXERCISE_BY_ID=Object.fromEntries(EXERCISES.map(e=>[e.id,e]));
