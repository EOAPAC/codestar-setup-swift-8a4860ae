# Cards de artigo clicáveis na página Winner's Feature

Só em /winner-feature, seção "Already published for 2026 winners". Nada mais muda.

## O que muda
- Cada um dos quatro cards vira um botão clicável inteiro (imagem + publicação + nome).
- Ao clicar, a captura abre grande por cima da página, ocupando quase toda a tela, com fundo escurecido.
- Fechar: botão "Close" no canto, tecla Esc ou clique fora da imagem.
- Uma linha discreta "View larger" no card indica que dá para abrir.
- Em celulares a imagem aberta ocupa a largura da tela e pode ser rolada se for alta.
- Foco visível no card ao navegar pelo teclado; o foco volta ao card ao fechar.

## Detalhes técnicos
- `PublishedSnippets` em `src/routes/winner-feature.tsx`: envolver o conteúdo do card em `<button>` e controlar o item aberto com `useState`.
- Overlay com o `Dialog` do shadcn já existente (Esc, foco e fechar inclusos), imagem em tamanho natural com `max-w`/`max-h` e rolagem.
- A rolagem lateral no celular e o layout 2x2 no computador ficam iguais.
- Checar em 1440px e 390px: abrir, fechar com botão e Esc.
