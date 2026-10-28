# Seleção e vídeos — ciclo de pequenos — 20/10/2026

Seis trilhas independentes: limiarização, Blobs e Watershed, cada uma clássica e híbrida.
Critério principal: F1 de localização das classes 0 e 2 agrupadas, IoU ≥ 0,50 e pareamento exclusivo.
Troca 0/2 corretamente localizada permanece TP de indivíduo; classificação é diagnóstico separado.

Conferidos: 18 painéis, 144 MP4, 3864 imagens comparativas, 18 PDFs/108 páginas e 211680 frames codificados nas comparações.
Nenhum novo treinamento experimental: modelos completos do round4, ajustados nos nove participantes de desenvolvimento.
As referências anteriores usam predições históricas conferidas e vídeos reexportados sobre os pixels originais.

[Abrir vídeos, galerias e PDFs](../resultados/paineis_pequenos_20261020.html)

## Vídeos de seleção e congelamento

| Trilha | F1 referência | F1 controle k1 | Candidata | F1 candidata | Pequenos referência → candidata | Decisão |
|---|---:|---:|---|---:|---|---|
| limiarizacao_classico | 0.2572 | 0.2572 | r4c01 | 0.2103 | 265/5973 → 265/5973 | frozen |
| limiarizacao_hibrido | 0.6304 | 0.5952 | r4c05 | 0.5156 | 105/5973 → 8/5973 | frozen |
| blobs_classico | 0.6694 | 0.6687 | r4c01 | 0.6694 | 571/5973 → 571/5973 | frozen |
| blobs_hibrido | 0.5392 | 0.5143 | r4c06 | 0.5330 | 417/5973 → 431/5973 | frozen |
| watershed_classico | 0.3383 | 0.3383 | r4c01 | 0.1548 | 133/5973 → 344/5973 | frozen |
| watershed_hibrido | 0.3411 | 0.3411 | r4c01 | 0.3431 | 44/5973 → 42/5973 | r4c01 |

Promovidas: watershed_hibrido.
A decisão foi congelada nas seis trilhas antes de despachar qualquer vídeo final. Empate mantém a referência.
Os controles não foram escolhidos retroativamente como candidatas. Perdas e condições não promovidas permanecem disponíveis.

## Painel final histórico — sem nova seleção

| Trilha | Condição | Precisão | Recall | F1 0+2 | TP | FP | FN | Pequenos localizados/GT | Congelada |
|---|---|---:|---:|---:|---:|---:|---:|---|---|
| limiarizacao_classico | frozen | 0.0182 | 0.0211 | 0.0195 | 3360 | 181380 | 156092 | 0/2936 | sim |
| limiarizacao_classico | k1 | 0.0182 | 0.0211 | 0.0195 | 3360 | 181380 | 156092 | 0/2936 | não |
| limiarizacao_classico | r4c01 | 0.2209 | 0.5699 | 0.3184 | 90868 | 320409 | 68584 | 1/2936 | não |
| limiarizacao_hibrido | frozen | 0.5838 | 0.3702 | 0.4531 | 59031 | 42087 | 100421 | 3/2936 | sim |
| limiarizacao_hibrido | k1 | 0.5932 | 0.3347 | 0.4279 | 53370 | 36600 | 106082 | 3/2936 | não |
| limiarizacao_hibrido | r4c05 | 0.5464 | 0.6301 | 0.5852 | 100463 | 83414 | 58989 | 4/2936 | não |
| blobs_classico | frozen | 0.5054 | 0.4881 | 0.4966 | 77829 | 76173 | 81623 | 27/2936 | sim |
| blobs_classico | k1 | 0.4989 | 0.4812 | 0.4899 | 76736 | 77087 | 82716 | 30/2936 | não |
| blobs_classico | r4c01 | 0.5054 | 0.4881 | 0.4966 | 77829 | 76173 | 81623 | 27/2936 | não |
| blobs_hibrido | frozen | 0.8105 | 0.7555 | 0.7820 | 120460 | 28163 | 38992 | 2/2936 | sim |
| blobs_hibrido | k1 | 0.8130 | 0.7247 | 0.7663 | 115550 | 26584 | 43902 | 0/2936 | não |
| blobs_hibrido | r4c06 | 0.7974 | 0.7309 | 0.7627 | 116551 | 29608 | 42901 | 4/2936 | não |
| watershed_classico | frozen | 0.5746 | 0.5802 | 0.5774 | 92520 | 68505 | 66932 | 445/2936 | sim |
| watershed_classico | k1 | 0.5746 | 0.5802 | 0.5774 | 92520 | 68505 | 66932 | 445/2936 | não |
| watershed_classico | r4c01 | 0.2387 | 0.7186 | 0.3584 | 114579 | 365443 | 44873 | 445/2936 | não |
| watershed_hibrido | frozen | 0.7487 | 0.5118 | 0.6079 | 81600 | 27394 | 77852 | 1/2936 | não |
| watershed_hibrido | k1 | 0.7487 | 0.5118 | 0.6079 | 81600 | 27394 | 77852 | 1/2936 | não |
| watershed_hibrido | r4c01 | 0.7461 | 0.5127 | 0.6078 | 81753 | 27824 | 77699 | 0/2936 | sim |

## Interpretação e limites

Os resultados são exploratórios: os dados já foram vistos historicamente e a shortlist foi adaptada no desenvolvimento. O painel final não deve ser descrito como teste inédito ou confirmação independente.
Os denominadores contam ocorrências anotadas em quadros, não espermatozoides únicos. Não há rastreamento. Os gráficos de classe2 permitem verificar se um F1 agrupado melhor esconde perda dos pequenos.
Os intervalos dos PDFs usam bootstrap pareado por participante, com 2.000 réplicas; quatro participantes oferecem pouca precisão e esse procedimento não corrige exposição prévia ou seleção adaptativa.
No Blobs clássico, r4c01 é exatamente a referência temporal k9. A emenda operacional certifica código, parâmetros e inventário antes de compartilhar as predições. Seus resultados iguais não são duas replicações independentes. Tempos de replay são N/A.
As propostas voltadas aos pequenos devem ser julgadas pelos falsos positivos, pelo F1 e pela cobertura de pequenos em conjunto. Maior recall isolado não demonstra melhora do detector.
Nenhuma configuração foi ajustada a partir dos vídeos finais. Este fechamento não inicia treinamento de YOLO.

## Evidências

- [Auditoria final](auditoria_paineis_pequenos_20261020.json)
- [Revisão visual](verificacao_visual_paineis_pequenos_20261020.json)
- [Execução, falhas preservadas e emenda operacional](execucao_paineis_pequenos_20261020.md)
- [Equivalência do replay idêntico](equivalencia_reuso_blobs_20261020.json)
- [Tabela de métricas rastreável](tabela_paineis_pequenos_20261020.json)
