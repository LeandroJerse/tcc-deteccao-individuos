# Ciclo de pequenos — rounds1 a5 — 19/10/2026

Estado: 30 lotes concluídos e auditados. Métricas, imagens, modelos e PDFs
conferidos; auditoria final terminou com exit0. As seis trilhas permaneceram
independentes: limiarização, Blobs e Watershed, cada uma clássica e híbrida.

## Resultado principal

O ciclo não demonstrou a melhora ampla desejada na localização dos pequenos.
A limiarização melhorou o F1 agrupado; o Blobs híbrido piorou na avaliação
aninhada; o Watershed híbrido ganhou F1, mas perdeu pequenos. Nenhum modelo
foi promovido automaticamente e nenhum controle anterior foi apagado.

Comparação dentro do round5, nos mesmos 133 quadros de nove participantes:

| Trilha | F1 controle k1 | F1 procedimento de seleção | Diferença | Classe2 localizada, controle → procedimento |
|---|---:|---:|---:|---:|
| Limiarização clássica | 0,059867 | 0,212209 | +0,152341 | 3/93 → 10/93 |
| Limiarização híbrida | 0,401698 | 0,479215 | +0,077517 | 15/93 → 16/93 |
| Blobs clássico | 0,449558 | 0,462502 | +0,012944 | 3/93 → 3/93 |
| Blobs híbrido | 0,641857 | 0,630213 | −0,011644 | 1/93 → 1/93 |
| Watershed clássico | 0,410825 | 0,410825 | 0 | 9/93 → 9/93 |
| Watershed híbrido | 0,496406 | 0,527976 | +0,031570 | 6/93 → 1/93 |

“Procedimento” agrega as previsões do participante externo de cada fold;
não representa necessariamente uma única configuração nem um modelo final.
Os 93 casos são ocorrências anotadas em quadros, não 93 indivíduos biológicos
independentes. O maior F1 desta comparação continua sendo o controle Blobs
híbrido, 0,641857, que ainda encontra apenas um pequeno.

| Trilha, procedimento | TP | FP | FN | Precisão | Recall |
|---|---:|---:|---:|---:|---:|
| Limiarização clássica | 1507 | 9731 | 1458 | 0,1341 | 0,5083 |
| Limiarização híbrida | 1660 | 2303 | 1305 | 0,4189 | 0,5599 |
| Blobs clássico | 1514 | 2068 | 1451 | 0,4227 | 0,5106 |
| Blobs híbrido | 1919 | 1206 | 1046 | 0,6141 | 0,6472 |
| Watershed clássico | 1427 | 2555 | 1538 | 0,3584 | 0,4813 |
| Watershed híbrido | 1557 | 1376 | 1408 | 0,5309 | 0,5251 |

## Protocolo e treinamento

Métrica principal: classes0 e2 agrupadas, pareamento exclusivo com IoU≥0,50,
máxima cardinalidade e depois máxima soma de IoU. TP/FP/FN são somados antes
de calcular F1. Troca0/2 corretamente localizada é TP de localização; erro
de subtipo é separado quando o modelo distingue classes. Blobs híbrido tem
saída binária, portanto não recebe uma classificação de subtipo fictícia.
Classe1 e métricas por classe são diagnósticos.

Desenvolvimento: participantes11,15,19,21,22,23,35,36,60; 133 quadros;
2872 anotações0, 93 anotações2 e94 anotações1. Os painéis de seleção e final
não foram usados nesta execução. Originais e rótulos foram preservados.

- Round1: seis perfis espaciais por família e controle. Filtros híbridos
  históricos congelados, com runtime compatível; resultado não OOF.
- Round2: duas propostas selecionadas por cobertura, escalas de caixa1,0,
  0,75 e0,90, mais controle. Não confundir escala espacial com número de frames.
- Round3: até três candidatas e controle; nos híbridos, validação LOGO por
  participante para escolher C e corte. O F1 usado na própria escolha é OOF
  aparente. Nos clássicos, nenhuma etapa de treinamento SVM.
- Round4: contraste entre propostas antigas/novas, k1/entrada temporal
  previamente escolhida e peso1/2 dos positivos pequenos nos híbridos.
- Round5: nove folds externos. Para cada participante externo, oito grupos
  ficam disponíveis; C/corte/configuração são escolhidos por LOGO interno
  nesses oito, com modelos internos treinados em sete. O modelo escolhido
  é treinado nos oito e avaliado no participante externo. O controle k1
  recebe o mesmo procedimento interno de ajuste. Nos clássicos, seleciona-se
  configuração nos oito participantes, sem SVM.

O treino usa LinearSVC e C∈{0,1;1;10}, características previstas no controle
da família, normalização ajustada somente nos dados de treino de cada fold,
amostragem determinística de fundo e seed42. Rótulos ambíguos não são tratados
como negativos confirmados. O peso2, quando presente, afeta apenas a cabeça
binária de aceitação dos positivos classe2; não altera a normalização,
a classificação de subtipos nem a métrica. Falta de convergência interrompe
o ajuste, em vez de ser silenciosamente ignorada.

Condições que ultrapassaram 2048 propostas em algum quadro foram registradas
como não executáveis por inteiro. Não se truncaram caixas nem se excluíram
quadros difíceis para melhorar métricas.

## O que os contrastes mostraram

**Limiarização:** Otsu com área mínima8 foi útil para o F1, enquanto perfis
adaptativos produziram excesso de propostas em parte da grade. No clássico,
a escolha foi r4c01 nos nove folds. O recall cresceu, porém9731 falsos positivos
mantêm a precisão baixa. No híbrido, r4c04 foi escolhido oito vezes e r4c05
uma vez: proposta nova, caixa0,90, k1; a diferença entre esses dois é o peso
dos pequenos. Os 16 acertos classe2 ficaram todos no participante35.
O ganho em pequenos sobre o controle aninhado foi de apenas uma ocorrência.

**Blobs:** LoG/DoG adicionais multiplicaram propostas sem resolver sua
geometria. O diagnóstico salvo mostra mediana19×17px nas caixas anotadas2 e
medianas de melhor IoU aproximadamente0,07–0,14 para os novos perfis do round1.
Diminuir caixas já pequenas não resolve esse desencontro. Isso é evidência
diagnóstica, não prova causal exclusiva; fundo, contraste e supressão também
podem contribuir. No clássico, todos os folds escolheram r4c01, o controle
temporal k9 já conhecido: o ganho não deve ser atribuído às novas propostas.
No híbrido, escolhas: k1 quatro vezes, r4c06 três, r4c07 uma e r4c01 uma.
O ganho aparente máximo do round4 (0,6461 contra0,6451) não se sustentou no
round5: houve menosTP e maisFP. O único pequeno localizado pertence ao35.

**Watershed:** novos marcadores e máscaras aumentaram a cobertura bruta em
algumas condições, mas o filtro eliminou boa parte dos pequenos. O clássico
escolheu k1 em todos os folds. No híbrido, r4c02 foi escolhido cinco vezes e
r4c03 quatro; são propostas Otsu com distância6, área mínima4, caixa1,0 e k1,
variando peso1/2. A localização de classe0 aumentou de1306 para1556, enquanto
a classe2 caiu de6 para1. Logo, F1 maior aqui não comprova sucesso nos pequenos.

Os melhores números de rounds1/2 não podem ser comparados diretamente com
rounds3–5: transferência de filtro completo, seleção OOF aparente e avaliação
aninhada têm papéis diferentes. As comparações acima usam controles do próprio
round5. Também não são comparáveis diretamente ao F1 do painel final do ciclo
temporal anterior, pois o conjunto e o regime de treinamento são diferentes.

## Incerteza e limites

Bootstrap pareado por participante, 2000 réplicas, seed42; IC95% exploratório
da diferença de F1 contra k1:

| Trilha | IC95% da diferença |
|---|---:|
| Limiarização clássica | [+0,032544; +0,265687] |
| Limiarização híbrida | [−0,007996; +0,198968] |
| Blobs clássico | [+0,006573; +0,019284] |
| Blobs híbrido | [−0,027971; −0,001115] |
| Watershed clássico | [0; 0] |
| Watershed híbrido | [−0,010939; +0,081615] |

Os intervalos dos ganhos híbridos de limiarização e Watershed incluem zero.
A perda do Blobs híbrido aparece em todo o intervalo exploratório. Esses
intervalos não corrigem a escolha adaptativa das candidatas nem a exposição
histórica dos dados, e não demonstram generalização confirmatória.

Embora o round5 separe participantes para ajustar os modelos, sua lista de
candidatas veio dos rounds anteriores nos mesmos nove grupos. É avaliação
aninhada condicional à shortlist adaptativa; não é um teste independente.
Não se afirma ausência absoluta de viés de seleção. Não houve mistura de
participantes entre treino e avaliação dentro dos ajustes auditados.

Apenas sete participantes têm anotações2. Nos três híbridos, os pequenos
localizados no round5 ficaram exclusivamente no35. O conjunto disponível é
insuficiente para afirmar recuperação consistente dessa população. Não se
altera a base nem o critério principal para encobrir essa limitação.

## Arquivos e continuidade

Inventário calculado, com conferência final registrada na auditoria vinculada:

| Round | Lotes | Condições com previsões | Imagens | PDFs / páginas | Ajustes de pipeline SVM |
|---|---:|---:|---:|---:|---:|
| round1 | 6 | 24 | 3192 | 6 / 36 | 0 |
| round2 | 6 | 42 | 5586 | 6 / 36 | 0 |
| round3 | 6 | 24 | 3192 | 6 / 36 | 336 |
| round4 | 6 | 28 | 3724 | 6 / 36 | 560 |
| round5 | 6 | 12 | 1596 | 6 / 36 | 1346 |
| Total novo | 30 | 130 | 17290 | 30 / 180 | 2242 |

As12 condições de saída do round5 são controle/procedimento em cada trilha;
as candidatas internas e suas escolhas constam dos manifestos e folds.
Round1 tinha42 condições planejadas;18 ultrapassaram o orçamento de propostas
e ficaram explicitamente registradas como não executáveis. Os2242 ajustes
de pipeline correspondem a3702 ajustes de cabeças SVM, pois limiarização e
Watershed também têm classificação de subtipo. Não confundir fits com número
de configurações ou com modelos finais promovidos.

Verificação funcional:39 testes passaram novamente nesta etapa
(`.venv/Scripts/python.exe -m unittest discover -s scripts/testes -p test_pequenos_*.py`).
Auditoria pública de32 modelos completos:288 verificações, um quadro por
participante e modelo, com caixas/classes iguais e escores dentro de1e-12
em relação ao executor. É equivalência de inferência do mesmo modelo, não
comparação entre modelo completo e OOF. A auditoria estrutural recalcula
métricas das previsões, decodifica todas as imagens e verifica hashes,
participantes, pesos e documentação. A interação dos filtros no navegador
não foi testada nesta etapa; as galerias foram verificadas em disco.

- [Índice de todos os PDFs e galerias](../resultados/ciclo_pequenos_20261019.html).
- [Síntese numérica do round5](sintese_pequenos_round5_20261019.json).
- [Auditoria dos rounds1–5](auditoria_pequenos_round1_5_20261019.json).
- [Conferência visual por hash de página](verificacao_visual_pequenos_ciclo.json).
- [Inferência pública dos modelos completos](verificacao_modelos_pequenos_20261019.json).
- [Registro de execução e correções](execucao_pequenos_20261019.md).
- [Diagnóstico geométrico do Blobs](diagnostico_geometria_pequenos_round1_20261019.json).

Implementação: algoritmos/classicos/pequenos.py; algoritmos/hibridos/pequenos.py
e treino_pequenos.py; executores em scripts/pequenos/; geradores em
scripts/analise/, com revisões documentais isoladas em scripts/analise/revisoes/.
Modelos estão em algoritmos/hibridos/modelos/<família>/pequenos/cycle_20261019/.
Resultados contêm artefatos, não código-fonte. Os32 modelos completos dos
rounds3/4 são candidatos, não um conjunto final já congelado para vídeos.

Os15 PDFs clássicos tiveram texto de treinamento corrigido sem novos treinos
ou inferências; versões anteriores e hashes foram preservados. Os planos
aprovados foram mantidos como registro histórico, sem reescrever seu estado
original ou invalidar a proveniência dos experimentos.

A próxima etapa do plano é seleção em imagens e vídeos, seguida de congelamento
e painel final. Ainda não foi executada neste ciclo. Deve carregar controles
anteriores, expor perdas dos pequenos e não promover candidatos apenas porque
lideraram alguma tabela de desenvolvimento. Nenhum novo treino YOLO começou;
o planejamento desse modelo e o comando para execução pelo pesquisador ficam
para a etapa posterior solicitada.
