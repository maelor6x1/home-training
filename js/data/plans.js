export const SPLITS={
 A:{name:'Treino A',focus:'Peito • Ombros • Tríceps',bodies:['Peito','Ombros','Tríceps'],ids:['pushup','wide-pushup','narrow-pushup','pike-pushup','incline-pushup','diamond-pushup','chair-dip','lateral-raise','front-raise']},
 B:{name:'Treino B',focus:'Costas • Bíceps',bodies:['Costas','Bíceps'],ids:['pullup','chinup','backpack-row','one-arm-row','band-row','backpack-curl','curl','hammer-curl','band-curl']},
 C:{name:'Treino C',focus:'Pernas • Glúteos • Core',bodies:['Pernas','Glúteos','Posteriores','Panturrilhas','Core'],ids:['squat','pause-squat','lunge','reverse-lunge','split-squat','hip-thrust','single-leg-bridge','calf-raise','plank','dead-bug']},
 HIIT:{name:'HIIT',focus:'Cardio • Resistência • Corpo inteiro',bodies:['HIIT'],ids:['jumping-jack','high-knees','burpee','mountain','skater','fast-feet','butt-kicks','plank-jack','squat-thrust']},
 MOBILITY:{name:'Mobilidade',focus:'Flexibilidade • Mobilidade',bodies:['Mobilidade'],ids:['arm-circles','dynamic-lunge','cat-cow','worlds-greatest','chest-stretch','quad-stretch','hamstring-stretch','child-pose','hip-flexor-stretch']},
 FULL:{name:'Corpo inteiro',focus:'Corpo inteiro',bodies:['Peito','Costas','Ombros','Pernas','Glúteos','Core','HIIT'],ids:['squat','pushup','backpack-row','pike-pushup','hip-thrust','plank','jumping-jack']}
};
export const BADGES=[
{id:'first',icon:'🔥',name:'Primeiro fogo',desc:'Complete 1 treino',need:1},{id:'three',icon:'⚡',name:'Ritmo',desc:'Complete 3 treinos',need:3},{id:'seven',icon:'🏆',name:'Constante',desc:'Complete 7 treinos',need:7},{id:'fifteen',icon:'💪',name:'Guerreiro',desc:'Complete 15 treinos',need:15},{id:'thirty',icon:'👑',name:'Lenda',desc:'Complete 30 treinos',need:30},{id:'hundred',icon:'💯',name:'Centena',desc:'Complete 100 séries',sets:100},{id:'variety',icon:'🧩',name:'Versátil',desc:'Use 20 exercícios diferentes',exercises:20},{id:'progress',icon:'📈',name:'Evolução',desc:'Progrida 5 exercícios',progress:5}
];
