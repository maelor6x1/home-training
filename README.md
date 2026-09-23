# Home Training — V4 Architecture

Esta versão reestrutura o protótipo anterior para uma arquitetura modular, sem limitar o projeto a poucos arquivos.

## Estrutura

- `index.html` — shell das telas e modais
- `css/` — tokens, base, componentes, telas, treino e responsividade
- `js/data/` — perguntas, exercícios, planos e conquistas
- `js/core/` — estado, armazenamento e utilitários
- `js/services/` — personalização e motor de treino
- `js/ui/` — onboarding, home, descobrir, diário, perfil, treino e recompensas
- `assets/` — espaço reservado para assets locais

## Funcionalidades estruturais

- Questionário com múltipla escolha para objetivos, equipamentos e foco
- Mochila como equipamento próprio
- Personalização por objetivo + nível + equipamentos + frequência + duração + foco
- Preparação de 30 segundos antes do aquecimento
- Motor de treino separado da interface
- Séries, repetições, exercícios por tempo e descanso
- Troca de exercício compatível
- XP, níveis, sequência e conquistas
- Histórico e armazenamento local
- Biblioteca com filtros
- GIFs reais externos cadastrados por exercício

## Mídia

Os GIFs atuais são URLs de previews de bibliotecas externas de exercícios. Antes de uma publicação comercial, confirme as licenças ou substitua os arquivos por mídia própria/licenciada e coloque-os em `assets/gifs/`.

## Deploy

Projeto estático: pode ser publicado no GitHub e Vercel sem build obrigatório.
