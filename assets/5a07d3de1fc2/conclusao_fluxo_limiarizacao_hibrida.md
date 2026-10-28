# Conclusão: seleção e vídeos da limiarização híbrida

05/10/2026. Fluxo autorizado: imagens → vídeos de seleção → congelamento → vídeos finais.
## Resultado e interpretação

Os cinco modelos foram mantidos entre seleção e final. S017 liderou imagens e vídeos de seleção (F1 0,599001), sendo registrado como referência em `congelamento_final.json` antes da execução final. No final, caiu para F1 0,448025. S004 obteve o maior F1 final, 0,628425, mas esse resultado é descritivo: não substitui retrospectivamente a escolha prévia.

Há uma candidata superior ao melhor clássico registrado no conjunto final (0,566796), porém o procedimento de seleção não escolheu essa candidata como primeira. Não declarar superioridade generalizável do modelo escolhido. Nenhuma configuração foi ajustada com os resultados finais.
## Assistir e localizar

- [Galeria dos 40 MP4s](../resultados/videos/limiarizacao_hibrido/assistir.html): controles, tela cheia, prévias e links diretos.
- [Seleção em imagens e PDF](../resultados/frame-to-frame/limiarizacao_hibrido/selecao/batch__20261005T203812339611Z/relatorio.pdf).
- [selecao: galeria](../resultados/videos/limiarizacao_hibrido/selecao/batch__20261005T204316319914Z/assistir.html) · [PDF](../resultados/videos/limiarizacao_hibrido/selecao/batch__20261005T204316319914Z/relatorio.pdf) · [CSV](../resultados/videos/limiarizacao_hibrido/selecao/batch__20261005T204316319914Z/resumo_configuracoes.csv).
- [final: galeria](../resultados/videos/limiarizacao_hibrido/final/batch__20261005T210821249542Z/assistir.html) · [PDF](../resultados/videos/limiarizacao_hibrido/final/batch__20261005T210821249542Z/relatorio.pdf) · [CSV](../resultados/videos/limiarizacao_hibrido/final/batch__20261005T210821249542Z/resumo_configuracoes.csv).

Vídeos H.264/yuv420p, 1280×584, FPS e duração originais; anotações à esquerda e detecções à direita. Arquivos originais preservados. Os rounds0–5 continuam sendo experimentos em imagens; estes vídeos pertencem às etapas de seleção/final.
## Treinamento e escolhas

36 configurações distintas dos rounds0–5 foram treinadas nos mesmos 133 quadros dos participantes 11, 15, 19, 21, 22, 23, 35, 36 e 60. Cada modelo mantém SVM de aceitação e classificação, com normalização ajustada somente no treino. Negativos homogêneos distantes das anotações e exclusão de exemplos ambíguos seguem o protocolo anterior. Não se acrescentaram vídeos de seleção/final ao treino.

As 60 imagens clássicas de seleção são dos vídeos 13, 29, 52 e 54. As cinco maiores pontuações de F1 de indivíduos avançaram; não houve empate na quinta posição. As mesmas cinco foram avaliadas nos 5.850 quadros completos de seleção e depois nos 5.910 finais (14, 24, 38 e 82).

| Modelo | Margem | SVM | C | Corte | Origem |
|---|---:|---|---:|---:|---|
| s017 | 5 | linear | 0.1 | 1.0 | r1c06 |
| s016 | 4 | linear | 0.1 | 1.0 | r1c05 |
| s004 | 3 | linear | 0.1 | 1.0 | round0, r1c01 |
| s012 | 3 | linear | 10.0 | 1.0 | round0 |
| s008 | 3 | linear | 1.0 | 1.0 | round0 |

Todos usam Sauvola e atributos compactos. Modelos completos e hashes: [congelamento](../resultados/frame-to-frame/limiarizacao_hibrido/selecao/batch__20261005T203812339611Z/congelamento.json); decisão anterior ao final: [congelamento final](../resultados/frame-to-frame/limiarizacao_hibrido/selecao/batch__20261005T203812339611Z/congelamento_final.json). Pesos ficam em `algoritmos/hibridos/modelos/limiarizacao/selecao/batch__20261005T203812339611Z/<id>/`.

## Métricas: selecao

| ID | Precisão | Recall | F1 | TP | FP | FN | Pequenos localizados/anotados |
|---|---:|---:|---:|---:|---:|---:|---:|
| s017 | 0.507047 | 0.731695 | 0.599001 | 90188 | 87681 | 33071 | 818/5973 |
| s016 | 0.449807 | 0.657980 | 0.534334 | 81102 | 99202 | 42157 | 556/5973 |
| s004 | 0.324582 | 0.495290 | 0.392164 | 61049 | 127036 | 62210 | 293/5973 |
| s012 | 0.314063 | 0.496053 | 0.384616 | 61143 | 133541 | 62116 | 297/5973 |
| s008 | 0.311307 | 0.495964 | 0.382516 | 61132 | 135240 | 62127 | 298/5973 |

| ID | F1 vídeo 13 | F1 vídeo 29 | F1 vídeo 52 | F1 vídeo 54 |
|---|---:|---:|---:|---:|
| s017 | 0.856341 | 0.056282 | 0.397549 | 0.469653 |
| s016 | 0.754281 | 0.164241 | 0.405579 | 0.394066 |
| s004 | 0.553582 | 0.217743 | 0.398133 | 0.235916 |
| s012 | 0.552882 | 0.217554 | 0.379287 | 0.230086 |
| s008 | 0.553011 | 0.207819 | 0.373020 | 0.229782 |

## Métricas: final

| ID | Precisão | Recall | F1 | TP | FP | FN | Pequenos localizados/anotados |
|---|---:|---:|---:|---:|---:|---:|---:|
| s017 | 0.423444 | 0.475635 | 0.448025 | 75841 | 103264 | 83611 | 807/2936 |
| s016 | 0.533680 | 0.610761 | 0.569625 | 97387 | 85095 | 62065 | 658/2936 |
| s004 | 0.578958 | 0.687135 | 0.628425 | 109565 | 79680 | 49887 | 482/2936 |
| s012 | 0.557177 | 0.685912 | 0.614879 | 109370 | 86923 | 50082 | 482/2936 |
| s008 | 0.557901 | 0.686558 | 0.615579 | 109473 | 86750 | 49979 | 482/2936 |

| ID | F1 vídeo 14 | F1 vídeo 24 | F1 vídeo 38 | F1 vídeo 82 |
|---|---:|---:|---:|---:|
| s017 | 0.206819 | 0.503397 | 0.478972 | 0.392943 |
| s016 | 0.291003 | 0.606701 | 0.739934 | 0.504491 |
| s004 | 0.343832 | 0.646642 | 0.823081 | 0.589291 |
| s012 | 0.319484 | 0.635281 | 0.818911 | 0.572443 |
| s008 | 0.330466 | 0.636120 | 0.813559 | 0.571793 |

## Comparação com registros clássicos

As definições completas dos vídeos, anotações e referências de alinhamento coincidem com os planos clássicos. As contagens anotadas também coincidem: 123.259 indivíduos na seleção e 159.452 no final. Os clássicos abaixo são resultados existentes, não reexecutados nesta entrega.

| Partição | Referência clássica | F1 clássico | Híbrido | F1 híbrido | Interpretação |
|---|---|---:|---|---:|---|
| Seleção | s068, maior F1 registrado | 0,257230 | s017 | 0,599001 | Ganho na seleção |
| Final | s099/s101, maior F1 registrado | 0,566796 | s017 | 0,448025 | Escolha prévia não supera a referência |
| Final | s099/s101, maior F1 registrado | 0,566796 | s004 | 0,628425 | Melhor resultado descritivo entre candidatas congeladas |

S004 final: 109.565 TP contra 89.460 do clássico s099; também mais FP (79.680 contra 66.757). Pequenos: 482/2.936 contra 0/2.936 de s099. S017 recupera mais pequenos (807), mas perde mais indivíduos no total. Não reduzir a decisão ao maior F1 nem afirmar solução satisfatória para pequenos.

Fontes clássicas: [seleção](../resultados/videos/limiarizacao/selecao/batch__20260920T023832151694Z/resumo_configuracoes.csv) e [final](../resultados/videos/limiarizacao/final/batch__20260920T030805588232Z/resumo_configuracoes.csv).

## Verificação da entrega

- 60 testes passaram: 49 do fluxo clássico de vídeos e 11 de integração,
  arquitetura, treino e exportação H.264 dos híbridos.
- Reavaliação das caixas salvas: 2.160 avaliações em imagens, 29.250 em
  vídeos de seleção e 29.550 em vídeos finais; total de 60.960. Contagens,
  pares e métricas coincidem com os resumos.
- Quarenta MP4s decodificados integralmente, com FPS, dimensões, quantidade
  de quadros e hashes conferidos. Galeria única com 84 links locais verificados.
- Onze páginas de três PDFs renderizadas e inspecionadas. Prévias dos oito
  vídeos do s017, quadros intermediários/finais de vídeos 13/14, quadro
  intermediário de 29 e prévias do s004 nos vídeos 24/82 revisados visualmente.
- Modelos e código mantiveram os hashes congelados; fontes originais foram
  conferidas novamente após cada etapa. Blobs e watershed não foram executados.
- Uma tentativa recebeu caminho relativo e falhou antes da detecção; seu
  manifesto foi preservado. O executor exige caminho absoluto em `--selecao`.

Auditorias: [seleção](verificacao_fluxo_limiarizacao_hibrida_selecao.json) e
[final](verificacao_fluxo_limiarizacao_hibrida_final.json).
Código novo: executor `scripts/hibridos/fluxo_limiarizacao.py`, relatório
`analise/relatorio_selecao_videos_hibrido.py`, auditor
`analise/auditar_fluxo_hibrido_videos.py`, exportador de CSVs
`analise/exportar_tabelas_fluxo_hibrido.py` e testes
`scripts/testes/test_fluxo_hibrido_videos.py`. Dependência de mídia declarada
em `scripts/hibridos/requirements-videos.txt`.

## Limitações e conclusão metodológica

A margem 5 favoreceu a seleção, enquanto margem 3 favoreceu os vídeos finais. S017 e s004 mantêm kernel, C, atributos e corte, mas a margem altera caixas e atributos extraídos. Isso mostra sensibilidade à geometria e à composição da partição; não isola uma vantagem causal do SVM em relação ao clássico.

O F1 agregado pesa ocorrências anotadas, não igualmente participantes. Quadros consecutivos são dependentes; as contagens são ocorrências por quadro, não indivíduos únicos. Não foram calculados intervalos supondo independência dos quadros. Os dados já eram historicamente expostos: a separação atual não constitui um teste inédito. Acurácia 0/2 nos PDFs é condicionada aos pares localizados e não substitui recall. Aglomerados permanecem separados.

A próxima decisão deve ser revisar visualmente s017 e s004, discutir representatividade da seleção e definir um novo experimento independente antes de qualquer ajuste. Não houve round6, troca do modelo por resultado final nem execução de blobs/watershed nesta etapa.
