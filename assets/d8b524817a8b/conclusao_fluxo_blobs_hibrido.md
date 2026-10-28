# Blobs híbrido: execução concluída até vídeos finais

## Resultado principal

As etapas autorizadas foram concluídas: rounds2–5, seleção de30 configurações em60 imagens,20 vídeos de seleção e20 vídeos finais. Os resultados e PDFs dos rounds0–1 foram preservados. A execução está conferida; o desempenho ainda é insuficiente para afirmar superioridade geral ou recomendar o híbrido como solução concluída para detecção de indivíduos.

| Etapa | Modelo | F1 indivíduos | Precisão | Recall | TP | FP | FN | Pequenos localizados |
|---|---|---:|---:|---:|---:|---:|---:|---:|
| Imagens de seleção | s004 | 0,717425 | 0,709627 | 0,725397 | 914 | 374 | 346 | 7/60 |
| Vídeos de seleção | s004 | 0,712458 | 0,703906 | 0,721221 | 88.897 | 37.394 | 34.362 | 555/5.973 |
| Vídeos finais | s004 | 0,506888 | 0,535873 | 0,480878 | 76.677 | 66.411 | 82.775 | 3/2.936 |

São ocorrências de anotações ao longo dos quadros, não indivíduos únicos rastreados. A escolha s004 foi fixada antes de abrir os vídeos finais, em `congelamento_final.json` no batch das imagens. As cinco candidatas seguiram sem ajuste ou retreino. Dados historicamente expostos, sem alegação de teste inédito.

## Comparação justa com os clássicos

Nos vídeos de seleção, o melhor clássico foi s052:F1 0,668702. O híbrido s004 obteve0,712458, principalmente reduzindo FP53.098→37.394, com TP88.583→88.897. Pequenos pioraram574→555.

Nos vídeos finais:

| Modelo | Papel | F1 | TP | FP | FN | Pequenos |
|---|---|---:|---:|---:|---:|---:|
| Híbrido s004 | Escolhido antes do final | 0,506888 | 76.677 | 66.411 | 82.775 | 3/2.936 |
| Clássico s052 | Maior F1 nos vídeos de seleção | 0,489895 | 76.736 | 77.087 | 82.716 | 30/2.936 |
| Clássico s103 | Maior F1 observado no final, retrospectivo | 0,656233 | 95.453 | 36.007 | 63.999 | 0/2.936 |

O híbrido supera s052 por0,0170 de F1, mas encontra59 ocorrências individuais a menos e27 pequenos a menos; o ganho veio da redução de10.676 FP. Frente ao melhor clássico final s103, fica0,1493 abaixo em F1 e encontra18.776 ocorrências a menos. Portanto, a meta principal de encontrar mais indivíduos não foi alcançada. O primeiro lugar entre híbridos não muda esse diagnóstico.

F1 final s004 por participante:14=0,3015;24=0,5469;38=0,6910;82=0,4053. Há forte variação entre vídeos. Não tratar frames como amostras independentes nem interpretar diferenças como significância estatística.

## O que os rounds demonstraram

Round2 selecionou área mínima16; round3 HOG/linear C1; round4 corte1,5; round5 reproduziu integralmente round4. F1 OOF passou de0,570547 no round1 para0,607737, porém essas mudanças perderam para variantes do round0 na seleção separada. Top5:s004,s012,s008,s011,s007. Todas usam margem6, área mínima32 e atributos compactos; variam C e corte.

s004: SimpleBlobDetector claro, sem pré-processamento, área32–500, inércia mínima0,4, distância mínima12, margem6; atributos compactos20, SVM linear C0,1, corte1. O modelo é `algoritmos/hibridos/modelos/blobs/selecao/batch__20261005T225439100380Z/s004/`.

## Por que o ganho não se sustentou

O treinamento separou participantes, ajustou scalers dentro dos folds e manteve finais fora do treino. Isso evita vazamento direto, mas não garante generalização. A busca reutilizou dois folds e apenas nove participantes; a escolha OOF não se sustentou nas imagens de seleção. A mudança de ranking é evidência dessa instabilidade, não prova de uma causa única.

A SVM aceita/rejeita e classifica caixas já produzidas; não recupera objetos sem proposta e não corrige a geometria. O suporte de pequenos foi muito baixo nos treinos dos rounds (apenas duas propostas pequenas no ajuste escolhido do round5), limitando aprendizado dessa classe. Folds com uma única classe positiva usam classificador constante na segunda etapa; não se deve descrevê-los como SVM multiclasses treinada em todas as classes. A filtragem reduziu FP, mas agravou a recuperação de pequenos na escolha final.

A sequência atual explorou geometria, área, atributos, kernel e corte sobre o gerador SimpleBlob existente. Não foi uma busca exaustiva entre SimpleBlob, LoG e DoG. O melhor clássico final s103 é DoG; esse resultado não autoriza reajustar o modelo e reutilizar o mesmo final como teste independente.

## Arquivos e conferências

- [Galeria única:40 MP4s e todos os PDFs](../resultados/videos/blobs_hibrido/assistir.html).
- [Seleção em imagens](../resultados/frame-to-frame/blobs_hibrido/selecao/batch__20261005T225439100380Z/relatorio.pdf).
- [Vídeos de seleção](../resultados/videos/blobs_hibrido/selecao/batch__20261005T225705304439Z/relatorio.pdf).
- [Vídeos finais](../resultados/videos/blobs_hibrido/final/batch__20261005T230730548818Z/relatorio.pdf).
- [Comparação numérica com hashes](comparacao_fluxo_blobs_hibrido.json).
- [Auditoria dos rounds2–5](verificacao_rounds2_5_blobs_hibrido.json).
- [Auditoria da seleção](verificacao_fluxo_blobs_hibrido_selecao.json).
- [Auditoria final](verificacao_fluxo_blobs_hibrido_final.json).
- [Conferência das mídias e links](verificacao_midias_blobs_hibrido.json).

2.394 avaliações OOF,180 externas,1.800 imagens de seleção e58.800 avaliações de vídeo recalculadas das caixas:63.174 verificações experimentais nesta continuação.40 MP4s H264 com decodificação integral, FPS e dimensões conferidos. Sete PDFs,27 páginas renderizadas e inspecionadas. Quatro testes direcionados passaram; não foi repetida a bateria geral. Originais e fontes congeladas conferidos por hashes. Nenhuma alteração em algoritmos de inferência, nenhum commit e nenhum código em resultados/analise.

Implementação nova: `scripts/hibridos/blobs_sequencia.py`, `plano_blobs_sequencia.py`, `fluxo_blobs.py`, `versoes.py` e `test_blobs_sequencia.py`; relatórios, auditoria e consolidação em `scripts/analise/`. Os módulos e modelos continuam em `algoritmos/hibridos/`. Fontes arquivadas fora de resultados. README e estado da pesquisa atualizados.

## Próxima decisão do pesquisador

Não promover este híbrido como superior. Se for autorizado outro ciclo, priorizar cobertura e geometria de propostas pequenas e diversidade por participante, contrastando os geradores nativos no treino. Definir nova avaliação que reconheça a exposição deste final. Não iniciar automaticamente novos treinos ou rounds para perseguir o resultado final já observado. Watershed permanece fora desta continuação.
