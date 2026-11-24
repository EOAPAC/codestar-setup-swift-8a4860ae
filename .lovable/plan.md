# Artigos abrem como na página real da publicação

Só em /winner-feature, seção "Already published for 2026 winners".

## O que muda
- O card inteiro é o clique. Sem "View larger" e sem imagem ampliada.
- Ao clicar, abre uma janela grande (tela cheia no celular) que parece a página da publicação:
  - Topo no estilo da publicação (logo USA Today, AP ou Business Insider, faixa de menu simples, como na captura).
  - Título, subtítulo, data e "Press release", foto do vencedor, texto completo do artigo, imagem do troféu e "Additional Information", com o texto real de cada vencedor.
  - Rolagem natural dentro da janela, texto em tamanho confortável para leitura.
- Fechar: botão × fixo no canto, Esc ou clique fora (no computador).
- No fim do artigo, um botão "Order the Winner's Feature" com o mesmo link de pagamento.
- O card ganha um destaque leve ao passar o mouse e foco visível no teclado.

## Detalhes técnicos
- Cada card busca seu artigo em `FEATURES` pelo `winnerSlug` (Adam, Nimisha, Gabriel, Ashton já existem).
- Extrair o conteúdo do artigo atual do `RealFeaturePreview` para um componente `FeatureArticle` reutilizado pelos dois overlays, com um cabeçalho por publicação (logo, cor de faixa).
- Mesma estrutura de `Dialog` do "Read the full Feature" (tela cheia no celular, até 820px no computador, `overflow-y-auto`).
- Checar em 1440px e 390px: clicar em cada card, rolar até o fim, fechar com × e Esc.
