# Conclusão — watershed híbrido, classe 0

Concluído em 18/10/2026: reavaliação do round0, rounds1–5, seleção em imagens
e vídeos, congelamento e vídeos finais. Código e resultados anteriores preservados.

## Resultado e decisão

O controle multiclasse `s000` venceu a seleção em vídeos, com F1 **0,357360**,
contra 0,346535 (`s001`) e 0,354014 (`s002`). Os candidatos novos não foram
promovidos. O melhor F1 interno de 0,481355 não se confirmou como vantagem
na seleção. Aumentar o corte do SVM reduziu falsos positivos e também recall.

Nos mesmos 5.910 quadros finais, usando classe original 0, IoU ≥ 0,50 e
pareamento exclusivo:

| Condição | Precisão | Recall | F1 | TP | FP | FN |
|---|---:|---:|---:|---:|---:|---:|
| Híbrido preservado `s000` | 0,646810 | 0,583991 | **0,613798** | 91404 | 49911 | 65112 |
| Melhor clássico final descritivo `s098` | 0,615011 | 0,571552 | 0,592485 | 89457 | 55999 | 67059 |

Diferença de F1: **+2,1312 pontos percentuais**. O híbrido teve 1.947 TP a
mais e 6.088 FP a menos que `s098`. Isso é desempenho do controle preservado,
não evidência de melhora causada pelos novos treinamentos deste ciclo.
O clássico `s063` teve recall ligeiramente maior (0,588061), mas F1 menor
(0,580265). As tabelas completas mantêm todos os cinco clássicos.

O F1 do híbrido varia por participante: 14 = 0,232919; 24 = 0,606019; 38 = 0,848852; 82 = 0,611940.
Valores arredondados; JSON/PDF são a referência.
Vídeo 38 é um exemplo favorável; vídeo 14 deve acompanhar a apresentação como
exemplo de falha. Não apresentar somente o caso favorável.

Os dados têm exposição experimental anterior. Não alegar teste inédito,
generalização garantida nem significância estatística do ganho final. São
contagens de detecções por quadro, não indivíduos únicos rastreados.

## Entrega

- [Índice de PDFs, imagens e vídeos](../resultados/frame-to-frame/watershed_hibrido/classe0.html).
- [PDF consolidado](../resultados/frame-to-frame/watershed_hibrido/conclusao_classe0/relatorio.pdf).
- [Metodologia detalhada](metodologia_watershed_classe0_20261018.md).
- [Índice de execução e modelos](../resultados/frame-to-frame/watershed_hibrido/ciclo_classe0.json).

## Conferências de encerramento

- [x] Plano e métrica anteriores à execução; nenhum ajuste com os vídeos finais.
- [x] 291 ajustes de modelos, dentro do orçamento de 450; partições por participante.
- [x] Reavaliação histórica sem retreino; originais e anotações preservados por hashes.
- [x] 35 testes relevantes aprovados; revisão independente dos pontos de entrega.
- [x] 4.075 imagens comparativas verificadas; anotações à esquerda e detecções à direita.
- [x] 12 MP4s de seleção e 4 finais, H.264, integralmente decodificados.
- [x] Todas as 23.460 avaliações híbridas dos vídeos reconstruídas das caixas;
  resumos idênticos. Cinco clássicos reavaliados nos mesmos quadros finais.
- [x] Dez PDFs, 80 páginas, renderizados e visualmente conferidos; gráficos de
  F1 para todas as configurações, precisão/recall por participante e parâmetros.
- [x] Índices e alvos locais conferidos. Interação de navegador não foi testada.
- [x] Falhas de caminho Windows/POSIX e título da galeria corrigidas e registradas,
  sem repetir treinamento ou detecção para corrigir apresentação.

## Código entregue

Algoritmo: `algoritmos/hibridos/watershed_classe0.py` (candidato binário).
O controle permanece em `algoritmos/hibridos/watershed.py`.
Executores: `scripts/hibridos/ciclo_watershed_classe0.py` e
`scripts/hibridos/videos_watershed_classe0.py`.
Em `scripts/analise/`: `reavaliar_watershed_classe0.py`,
`reavaliar_videos_watershed_classe0.py`, `imagens_watershed_classe0.py`,
`relatorio_watershed_classe0.py` e `concluir_watershed_classe0.py`.
Testes: `scripts/testes/test_watershed_classe0.py` e `test_watershed_delivery.py`.
Nenhum código-fonte foi colocado nos resultados.

## Próxima hipótese, não executada

Revisar a geração de propostas e a geometria das caixas antes de ampliar a
busca do SVM: o teto de cobertura das propostas no treino ficou próximo de
49%. A filtragem sozinha não recupera indivíduos sem propostas adequadas.
Um novo ciclo exige novo plano autorizado; este ciclo está encerrado.
