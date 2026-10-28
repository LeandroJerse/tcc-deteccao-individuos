# YOLO — seleção e vídeos concluídos

Confiança escolhida:0.20. Classes0/2 agrupadas; IoU≥0,50; pareamento exclusivo.

| Etapa | TP | FP | FN | Precisão | Recall | F1 | Pequenos localizados/GT |
|---|---:|---:|---:|---:|---:|---:|---:|
|Imagens de seleção|836|467|424|0.6416|0.6635|0.6524|7/60|
|Vídeos de seleção|80469|48040|42790|0.6262|0.6528|0.6392|564/5973|
|Vídeos finais|130739|31845|28713|0.8041|0.8199|0.8120|0/2936|

Comparação final das escolhas previamente congeladas:

| Sistema | F1 |
|---|---:|
|YOLO|0.8120|
|Limiar clássico|0.0195|
|Limiar híbrido|0.4531|
|Blobs clássico|0.4966|
|Blobs híbrido|0.7820|
|Watershed clássico|0.5774|
|Watershed híbrido|0.6078|

Não foram ajustados pesos, confiança ou NMS pelo final. Intervalos exploratórios estão em incerteza.json e nos PDFs; quatro participantes não sustentam conclusões amplas.
No final, o ganho agregado sobre Blobs híbrido foi de 2,99 pontos percentuais, mas o IC95% exploratório da diferença inclui zero (−0,1999 a +0,0806). Nos vídeos de seleção, Blobs clássico superou o YOLO (F1 0,6694 contra 0,6392). Não há demonstração de superioridade geral.
Limitação principal: nenhum dos 2936 registros anotados como pequenos (classe 2) foi localizado no final. O F1 agrupado elevado é sustentado pela classe 0. São ocorrências por quadro, não indivíduos únicos; não há rastreamento.
O YOLO recebeu mais imagens supervisionadas e pré-treino externo; comparação de sistemas, não ablação causal. Classe1 não-alvo; originais preservados. Sem rastreamento.
[Abrir vídeos, PDFs e imagens](../resultados/modernos/yolo/index.html)