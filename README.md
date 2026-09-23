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
