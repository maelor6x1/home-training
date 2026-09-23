const DATA={
 questions:[
  {key:'goal',title:'O que você quer alcançar?',sub:'Seu objetivo muda a prioridade de volume, força e condicionamento.',options:[['💪','Hipertrofia','Ganhar massa muscular'],['🏋️','Força','Ficar mais forte'],['🤸','Calistenia','Evoluir no peso corporal'],['🔥','Condicionamento','Mais resistência e disposição']]},
  {key:'level',title:'Qual é seu nível?',sub:'A dificuldade e as progressões serão adaptadas a você.',options:[['🟢','Iniciante','Estou começando ou voltando'],['🟡','Intermediário','Já treino com frequência'],['🔴','Avançado','Tenho bastante experiência']]},
  {key:'equipment',title:'O que você tem em casa?',sub:'Você só verá exercícios compatíveis com seu equipamento.',options:[['🧍','Nenhum','Peso corporal e objetos seguros'],['🎒','Básicos','Mochila, cadeira, elástico ou halteres'],['🏋️','Completos','Barra, halteres e acessórios']]},
  {key:'frequency',title:'Quantos dias por semana?',sub:'Vamos distribuir o volume para caber na sua rotina.',options:[['2️⃣','2 dias','Full body'],['3️⃣','3 dias','Divisão A / B / C'],['4️⃣','4 dias','Mais volume semanal'],['5️⃣','5 dias','Rotina frequente']]},
  {key:'duration',title:'Quanto tempo você tem?',sub:'O plano será dimensionado para esse limite.',options:[['⚡','10–20 min','Sessões rápidas'],['⏱️','20–35 min','Equilibrado'],['🔥','35–50 min','Sessões completas'],['🏆','50+ min','Sessões longas']]},
  {key:'focus',title:'Tem alguma prioridade?',sub:'Isso dá o último ajuste ao seu plano.',options:[['🫀','Corpo inteiro','Distribuição equilibrada'],['🦵','Pernas e glúteos','Mais volume para inferiores'],['💪','Parte superior','Peito, costas e braços'],['🧘','Mobilidade','Movimento e controle']]}
 ],
 exercises:[
  {id:'pushup',name:'Flexão de braço',body:'Peito',target:'Peitoral • Tríceps',equipment:'none',level:'beginner',type:'reps',base:10,sets:3,rest:60,desc:'Mantenha o corpo alinhado e desça com controle.',media:null},
  {id:'incline-pushup',name:'Flexão inclinada',body:'Peito',target:'Peitoral',equipment:'basic',level:'beginner',type:'reps',base:12,sets:3,rest:45,desc:'Use uma superfície firme e estável.',media:null},
  {id:'pike',name:'Pike push-up',body:'Ombros',target:'Deltoides • Tríceps',equipment:'none',level:'intermediate',type:'reps',base:8,sets:3,rest:75,desc:'Quadril elevado, cabeça em direção ao chão.',media:null},
  {id:'chair-dip',name:'Tríceps na cadeira',body:'Braços',target:'Tríceps',equipment:'basic',level:'beginner',type:'reps',base:10,sets:3,rest:60,desc:'Apoie-se em uma cadeira firme.',media:null},
  {id:'backpack-row',name:'Remada com mochila',body:'Costas',target:'Dorsais • Bíceps',equipment:'basic',level:'beginner',type:'reps',base:12,sets:3,rest:60,desc:'Puxe a mochila em direção ao tronco sem girar.',media:null},
  {id:'pullup',name:'Barra fixa',body:'Costas',target:'Dorsais • Bíceps',equipment:'full',level:'intermediate',type:'reps',base:6,sets:3,rest:90,desc:'Comece com assistência se necessário.',media:'https://static.exercisedb.dev/media/lBDjFxJ.gif'},
  {id:'backpack-curl',name:'Rosca com mochila',body:'Braços',target:'Bíceps',equipment:'basic',level:'beginner',type:'reps',base:12,sets:3,rest:60,desc:'Evite balançar o corpo.',media:null},
  {id:'squat',name:'Agachamento',body:'Pernas',target:'Quadríceps • Glúteos',equipment:'none',level:'beginner',type:'reps',base:15,sets:3,rest:60,desc:'Joelhos acompanham a direção dos pés.',media:null},
  {id:'lunge',name:'Afundo',body:'Pernas',target:'Quadríceps • Glúteos',equipment:'none',level:'beginner',type:'reps',base:10,sets:3,rest:60,desc:'Desça mantendo o tronco estável.',media:null},
  {id:'hip-thrust',name:'Elevação pélvica',body:'Glúteos',target:'Glúteos • Posteriores',equipment:'none',level:'beginner',type:'reps',base:15,sets:3,rest:45,desc:'Contraia os glúteos no topo.',media:null},
  {id:'plank',name:'Prancha',body:'Core',target:'Abdômen',equipment:'none',level:'beginner',type:'time',base:30,sets:3,rest:45,desc:'Mantenha o tronco firme e respire.',media:null},
  {id:'mountain',name:'Mountain climber',body:'Cardio',target:'Core • Cardio',equipment:'none',level:'intermediate',type:'time',base:30,sets:3,rest:45,desc:'Traga os joelhos alternadamente sem perder a postura.',media:null},
  {id:'jumping-jack',name:'Polichinelos',body:'Cardio',target:'Corpo inteiro',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Aqueça com movimento contínuo e confortável.',media:null},
  {id:'arm-circles',name:'Círculos com os braços',body:'Ombros',target:'Ombros',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Faça círculos controlados, sem dor.',media:null},
  {id:'hip-mobility',name:'Mobilidade de quadril',body:'Mobilidade',target:'Quadril',equipment:'none',level:'beginner',type:'time',base:40,sets:1,rest:0,desc:'Movimente-se lentamente dentro de uma amplitude confortável.',media:null},
  {id:'chest-stretch',name:'Alongamento de peito',body:'Mobilidade',target:'Peitoral',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Alongamento leve; não force até a dor.',media:null},
  {id:'quad-stretch',name:'Alongamento de quadríceps',body:'Mobilidade',target:'Quadríceps',equipment:'none',level:'beginner',type:'time',base:30,sets:1,rest:0,desc:'Segure o alongamento com respiração tranquila.',media:null}
 ],
 splits:{A:{name:'Empurrar',focus:'Peito • Ombros • Tríceps',ids:['pushup','pike','chair-dip']},B:{name:'Puxar',focus:'Costas • Bíceps',ids:['backpack-row','pullup','backpack-curl']},C:{name:'Pernas + Core',focus:'Pernas • Glúteos • Abdômen',ids:['squat','lunge','hip-thrust','plank']},FULL:{name:'Corpo inteiro',focus:'Corpo inteiro',ids:['squat','pushup','backpack-row','hip-thrust','plank']}},
 badges:[
  {id:'first',icon:'🔥',name:'Primeiro fogo',desc:'Complete 1 treino',need:1},
  {id:'three',icon:'⚡',name:'Ritmo',desc:'Complete 3 treinos',need:3},
  {id:'seven',icon:'🏆',name:'Constante',desc:'Complete 7 treinos',need:7},
  {id:'fifteen',icon:'💪',name:'Guerreiro',desc:'Complete 15 treinos',need:15},
  {id:'thirty',icon:'👑',name:'Lenda',desc:'Complete 30 treinos',need:30},
  {id:'hundred',icon:'💯',name:'Centena',desc:'Complete 100 séries',sets:100}
 ]
};
