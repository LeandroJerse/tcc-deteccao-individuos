# Watershed: análise da avaliação final em vídeos

Revisão: 03/10/2026. Batch: `batch__20261003T173630992371Z`.

Protocolo: indivíduos 0 e 2 juntos, pareamento exclusivo com IoU mínimo 0,50; F1 das contagens somadas. Aglomerados separados. As quatro páginas originais do PDF foram preservadas, com paginação atualizada, seguidas desta análise.

## Ranking final e influência dos vídeos

s098 tem o maior F1 agregado de indivíduos: 0,587248. A diferença para s063 é 0,009858 (0,986 ponto percentual). É um resultado descritivo, sem demonstração de superioridade estatística.

| ID | F1 seleção vídeos | F1 final | Precisão final | Recall final |
| --- | --- | --- | --- | --- |
| s098 | 0,291061 | 0,587248 | 0,614931 | 0,561950 |
| s063 | 0,338306 | 0,577389 | 0,574569 | 0,580237 |
| s064 | 0,336495 | 0,576326 | 0,588403 | 0,564734 |
| s061 | 0,317409 | 0,313266 | 0,319208 | 0,307541 |
| s062 | 0,301701 | 0,298025 | 0,335608 | 0,268012 |

A mudança entre partições não é ganho de treinamento: os parâmetros são os mesmos e os vídeos diferem. s098 passou do quinto para o primeiro posto; s063 apresentou o maior recall final de indivíduos.

Sensibilidade descritiva: retirar um vídeo por vez e recalcular F1 das contagens restantes. Não é validação cruzada, novo critério de seleção ou ajuste de parâmetros.

| Retirado | s098 | s063 | s064 | s061 | s062 | Líder |
| --- | --- | --- | --- | --- | --- | --- |
| 14 | 0,612515 | 0,615164 | 0,614362 | 0,331533 | 0,314475 | s063 |
| 24 | 0,605674 | 0,565329 | 0,566242 | 0,370114 | 0,375241 | s098 |
| 38 | 0,551355 | 0,546073 | 0,544280 | 0,286820 | 0,269911 | s098 |
| 82 | 0,587236 | 0,576464 | 0,574803 | 0,281017 | 0,251127 | s098 |

A liderança muda em 1 das quatro retiradas. s098 lidera nos vídeos 14, 38 e 82; s063 lidera em 24. Nenhuma configuração vence todos os vídeos. As cinco permanecem registradas; o teste final não escolhe automaticamente uma configuração para uso.

## Cobertura, classificação e diagnóstico das perdas

Referência: 156.516 normais, 2.936 pequenos e 6.601 aglomerados. São ocorrências por quadro. Todos os pequenos anotados estão no vídeo 82; aglomerados estão somente em 14 e 24. Essas classes têm suporte em menos vídeos que o agregado.

| ID | Pequenos localizados | Classe 2 correta | F1 aglomerados |
| --- | --- | --- | --- |
| s098 | 87/2936 (2,96%) | 6 | 0,023713 |
| s063 | 445/2936 (15,16%) | 8 | 0,010669 |
| s064 | 445/2936 (15,16%) | 8 | 0,009486 |
| s061 | 536/2936 (18,26%) | 3 | 0,052975 |
| s062 | 536/2936 (18,26%) | 3 | 0,092691 |

A acurácia condicional exclui os indivíduos perdidos e é dominada pelos normais. O mínimo de área 120 e a classe pequeno até 120 restringem essa previsão a regiões de exatamente 120 pixels. Aglomerados têm baixo F1 em todas as configurações finais.

Diagnóstico exclusivo dos 69.848 FN de s098. na ordem abaixo. usando todas as caixas emitidas no mesmo quadro:

| Diagnóstico | FN | % dos FN |
| --- | --- | --- |
| Caixa individual suficiente, disputada no pareamento | 278 | 0,40 |
| Sem caso anterior; caixa de aglomerado suficiente | 0 | 0,00 |
| Sobreposição com caixa emitida; IoU menor que 0,50 | 64052 | 91,70 |
| Nenhuma sobreposição com caixa emitida | 5518 | 7,90 |

Nas sobreposições insuficientes: IoU mediana 0,2725; razão mediana área da caixa emitida/anotada 3,2087; 4661 caixas menores. Área de caixa difere de área segmentada.

Regiões rejeitadas não têm geometria completa salva nos vídeos. Ausência de sobreposição emitida não prova ausência de candidato, nem permite estimar o ganho de alterar filtros ou caixas. Nenhuma alteração foi realizada.

## Integridade, tempos e conclusão do Watershed

Conferidos 138 hashes de saídas e 5975 de entradas/origens, sem divergência. Código arquivado: 52 arquivos. PDF original: quatro páginas e 88 fontes verificadas.

Reconciliadas as 29.550 avaliações: caixas, índices, exclusividade, IoU, classes, pares, pendentes, TP/FP/FN, cobertura e matriz 0/2. Cardinalidade máxima conferida independentemente nos dois grupos, quadro a quadro. O desempate pela soma de IoUs não foi recalculado.

Os vinte MP4s foram conferidos por hash e registros de decodificação integral do executor. Esta análise não reexecutou detecção, não decodificou novamente os MP4s e não inspecionou visualmente todos os seus quadros. A conferência não valida biologicamente as anotações.

| ID | Média ms/quadro | Mediana ms/quadro | P95 ms/quadro |
| --- | --- | --- | --- |
| s098 | 40,295 | 40,318 | 47,096 |
| s063 | 42,211 | 42,820 | 49,705 |
| s064 | 42,356 | 42,462 | 51,048 |
| s061 | 53,768 | 51,995 | 95,538 |
| s062 | 53,979 | 52,515 | 95,982 |

Tempos descritivos do detector; excluem decodificação, avaliação, desenho e gravação. Ambiente e ordem da execução limitam diferenças finas. Não representam velocidade integral nem benchmark controlado.

O ciclo de desenvolvimento, seleção e avaliação final do Watershed está documentado. s098 apresenta o maior F1 final; s063 oferece maior recall. A variação entre vídeos e a baixa cobertura/classificação de pequenos e aglomerados limitam o método.

Quatro vídeos e dependência temporal não sustentam tratar 29.550 avaliações como réplicas independentes. Não foram introduzidos testes de significância, intervalos de confiança ou nova busca. A partição final não implica dados historicamente inéditos.

Próxima etapa proposta: consolidar a comparação com limiarização e blobs, mediante autorização e preservando os critérios. Nenhum novo algoritmo ou experimento foi iniciado.

## Arquivos e reprodução

- [PDF de sete páginas](relatorios/watershed_videos_final_20261003/analise_videos_final_watershed.pdf).
- [Estatísticas e auditoria](estatisticas_videos_final_watershed.json): resultados por vídeo, sensibilidade, tempos, falhas sem TP e diagnóstico.
- `auditar_videos_final_watershed.py`: auditoria sobre os arquivos salvos, sem detector.
- `gerar_analise_videos_final_watershed.py`: composição deste documento e do PDF.

```powershell
.venv/Scripts/python.exe -B -X utf8 analise/auditar_videos_final_watershed.py
.venv/Scripts/python.exe -B -X utf8 analise/gerar_analise_videos_final_watershed.py
```

Os resultados experimentais e os dados originais foram preservados. As saídas desta análise ficam fora do batch.
