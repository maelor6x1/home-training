# Home Training V14

Base modular do Home Training, com foco mobile-first e treino em casa.

## Estrutura
- `css/` — tokens, base, componentes, telas, treino e responsividade.
- `js/core/` — estado, armazenamento e utilitários.
- `js/data/` — perguntas, exercícios e planos.
- `js/services/` — personalização, motor de treino, progressão, feedback, áudio e mídia.
- `js/ui/` — onboarding, home, descoberta, diário, perfil, treino e recompensas.
- `assets/exercises/` — demonstrações animadas locais dos exercícios.

## Mídia dos exercícios — V14

A biblioteca anterior de GIFs remotos de academia foi removida. Agora existem **82 GIFs locais**, um para cada exercício da biblioteca atual.

As animações foram desenhadas especificamente para o contexto **Home Training**: peso corporal, chão, movimentos com cadeira/mochila/elástico quando aplicável e sem depender de máquinas, cabos ou equipamentos de academia.

O carregamento da mídia é local e não depende de API/CDN externa. Isso elimina tanto os GIFs de academia inadequados quanto o problema anterior de um exercício receber a animação de outro.

## Treino e progressão
- Progressão adaptativa por exercício.
- Séries, repetições, tempo e descanso.
- Aquecimento e finalização.
- Substituição de exercícios.
- Feedback pós-treino e ajuste da sessão seguinte.
- XP, sequência, recompensas e níveis.

## Áudio
- Sons de interação.
- Contagem regressiva 3/2/1.
- Sons de início, descanso, conclusão e recompensa.
- Ambiente sonoro durante o treino.

## V15 — animações de exercícios

As demonstrações dos exercícios foram substituídas por animações locais específicas para o Home Training. A versão V15 não usa o catálogo remoto como fallback para as demonstrações principais.

- 82 exercícios com animação local própria.
- Figura humana vetorial com cabeça, tronco, articulações, braços e pernas separados.
- Movimento interpolado em vários frames, com ciclos suaves.
- Trajetórias específicas para flexões, agachamentos, avanços, remadas, curls, elevações, prancha, core, mobilidade, HIIT e alongamentos.
- Equipamentos domésticos representados quando aplicável: cadeira, mochila, elástico e halteres.
- A animação de um exercício nunca é escolhida aleatoriamente a partir de outro exercício.


## V16 — Motion Engine

As demonstrações de exercícios foram migradas de GIFs para um motor vetorial SVG procedural com um rig humano articulado. O corpo é reconstruído a partir de articulações conectadas e interpolação suave entre poses, evitando troca de GIFs incorretos e membros desconectados. A tela de treino anima apenas o exercício atual; a grade de descoberta usa quadros estáticos para preservar desempenho em celulares.
