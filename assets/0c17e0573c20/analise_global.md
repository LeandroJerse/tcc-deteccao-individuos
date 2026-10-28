# Análise global — detecção de indivíduos

Data: 28/10/2026. Consolidação de predições e resumos existentes; nenhuma nova inferência, seleção ou treinamento.

## Base comum e limites da comparação

O objetivo principal é localizar classes 0 e 2 como indivíduos. F1 = 2TP/(2TP+FP+FN), com contagens somadas. Pareamento exclusivo, IoU ≥ 0,50, máxima cardinalidade e depois soma de IoU. Trocas 0/2 não retiram TP de localização. Aglomerados são diagnóstico separado.
Os sete sistemas abaixo compartilham quadros, anotações e avaliador nos painéis recentes. As auditorias anteriores verificaram IDs e caixas anotadas; esta síntese reconcilia contagens por participante, denominadores e fórmula do F1. Igualdade de avaliação não significa igualdade de orçamento de treinamento.
Históricos de F1 classe 0, médias por classe, resultados OOF e mAP não entram no mesmo ranking. Um F1 agregado histórico não permite recuperar F1 0+2 sem caixas ou contagens adequadas. As reavaliações recentes fornecem a base comum das escolhas congeladas, não de todas as candidatas históricas.

## Resultados comparáveis por etapa

### selection_images

|Sistema|TP|FP|FN|Precisão|Recall|F1 micro|F1 macro participante|Classe 2 localizada/GT|
|---|---:|---:|---:|---:|---:|---:|---:|---:|
|YOLO|836|467|424|0.641596|0.663492|0.652361|0.498820|7/60|
|Limiar clássico|355|1059|905|0.251061|0.281746|0.265520|0.144498|3/60|
|Limiar híbrido|693|206|567|0.770857|0.550000|0.641964|0.490348|0/60|
|Blobs clássico|904|551|356|0.621306|0.717460|0.665930|0.537998|7/60|
|Blobs híbrido|669|538|591|0.554267|0.530952|0.542359|0.549836|4/60|
|Watershed clássico|393|654|867|0.375358|0.311905|0.340702|0.345632|3/60|
|Watershed híbrido|310|268|950|0.536332|0.246032|0.337323|0.363479|0/60|
### selection

|Sistema|TP|FP|FN|Precisão|Recall|F1 micro|F1 macro participante|Classe 2 localizada/GT|
|---|---:|---:|---:|---:|---:|---:|---:|---:|
|YOLO|80469|48040|42790|0.626174|0.652845|0.639231|0.486676|564/5973|
|Limiar clássico|33832|105958|89427|0.242020|0.274479|0.257230|0.139914|265/5973|
|Limiar híbrido|66643|21523|56616|0.755881|0.540675|0.630417|0.476125|105/5973|
|Blobs clássico|88971|53591|34288|0.624086|0.721822|0.669405|0.539027|571/5973|
|Blobs híbrido|65065|53022|58194|0.550992|0.527872|0.539184|0.563232|417/5973|
|Watershed clássico|38232|64529|85027|0.372048|0.310176|0.338306|0.340955|133/5973|
|Watershed híbrido|31063|26733|92196|0.537459|0.252014|0.343133|0.375785|42/5973|
### final

|Sistema|TP|FP|FN|Precisão|Recall|F1 micro|F1 macro participante|Classe 2 localizada/GT|
|---|---:|---:|---:|---:|---:|---:|---:|---:|
|YOLO|130739|31845|28713|0.804132|0.819927|0.811953|0.707772|0/2936|
|Limiar clássico|3360|181380|156092|0.018188|0.021072|0.019524|0.010684|0/2936|
|Limiar híbrido|59031|42087|100421|0.583783|0.370212|0.453091|0.458583|3/2936|
|Blobs clássico|77829|76173|81623|0.505377|0.488103|0.496590|0.468426|27/2936|
|Blobs híbrido|120460|28163|38992|0.810507|0.755462|0.782017|0.767267|2/2936|
|Watershed clássico|92520|68505|66932|0.574569|0.580237|0.577389|0.549126|445/2936|
|Watershed híbrido|81753|27824|77699|0.746078|0.512712|0.607763|0.582104|0/2936|

## Interpretação científica

YOLO lidera no micro, mas Blobs híbrido lidera no macro por participante (0,767267 contra 0,707772). YOLO supera Blobs híbrido em dois dos quatro participantes finais. Seleção é dado usado na escolha e não estimativa independente.
YOLO lidera o F1 micro final (0,811953), contra 0,782017 do Blobs híbrido. A diferença é 0,029935, mas o IC95% exploratório pareado por participante [-0,199929; 0,080612] inclui zero. Apenas quatro participantes e exposição histórica impedem uma conclusão confirmatória.
YOLO não lidera os vídeos de seleção: 0,639231 contra 0,6694 do Blobs clássico. Ranking varia entre populações. A confiança 0,20 foi fixada nas imagens e não reajustada no final.
O final contém 159452 ocorrências individuais: 156516 classe 0 e 2936 classe 2 (1,84%). Todos os pequenos finais pertencem ao participante 82. Assim, F1 micro elevado pode coexistir com cobertura zero dos pequenos; não significa capacidade de detectar qualquer espermatozoide.
YOLO localiza 0/2936 pequenos; Blobs híbrido 2/2936; Watershed clássico 445/2936. Cobertura por classe não é F1 de classe: não atribuímos falsos positivos do detector binário a um subtipo que ele não prevê.

## Evolução e escolha anterior ao final

O ciclo temporal avaliou k=1 contra agregações de k frames. Foram mantidos limiar clássico e ambos Watershed em k1. Limiar híbrido adotou mediana alinhada k7; Blobs clássico, mediana alinhada k9; Blobs híbrido, máximo k3. O maior F1 observado no final não pode substituir retrospectivamente essas escolhas.
O ciclo de pequenos executou round0–5 nas seis trilhas. Round5 usa nove folds externos e escolha LOGO interna. Ele estima o procedimento de escolha, não uma configuração única. Rounds iniciais e OOF usado na escolha são resultados de desenvolvimento, não teste independente.
Nos vídeos de seleção do ciclo de pequenos, somente Watershed híbrido promoveu a candidata r4c01 (0,3411→0,3431); seu F1 final ficou praticamente igual (0,6079→0,6078). A limiarização candidata melhora no final, mas perdeu na seleção e não foi promovida. Nenhuma melhoria ampla dos pequenos foi demonstrada.

## Treinamento e justiça

Clássicos usam parâmetros selecionados, sem treinamento supervisionado de pesos. Híbridos usam propostas clássicas e filtros SVM, com normalização aprendida no treino. O ciclo recente empregou 133 quadros de nove participantes; o round5 aninhado separou participantes externos e internos.
YOLO11s usa pré-treino externo, 1312 imagens de treino e 444 de validação, e uma classe derivada indivíduo para 0/2. A comparação mede sistemas completos; não isola arquitetura nem benefício causal da aprendizagem profunda. Os dados originais são preservados.
Participantes de desenvolvimento: 11,15,19,21,22,23,35,36,60. Validação YOLO: 12,30,47. Seleção: 13,29,52,54. Final: 14,24,38,82. São contagens por quadro, não indivíduos únicos; quadros adjacentes são dependentes.

## Históricos fora do ranking principal

Limiar clássico s099/s101: máximo final descritivo 0,566796; escolha por seleção s068: 0,019524. Blobs clássico s103: máximo final descritivo 0,656233; s052 escolhido pela seleção: 0,489895. Esses máximos respondem a outra pergunta e não são escolhas prospectivas.
Primeiro limiar híbrido: s017 escolhido antes do final 0,448025; s004 máximo final descritivo 0,628425. Primeiro Blobs híbrido: s004 final 0,506888. Watershed híbrido no ciclo classe0: 0,613798 sob métrica classe0, portanto não comparável diretamente a F1 0+2. Novos painéis agrupados substituem essa comparação apenas para seus controles explicitamente reavaliados.

## Conclusão e próximos contrastes

Há evidência descritiva favorável ao YOLO e ao Blobs híbrido no agregado final, sem solução satisfatória para pequenos. A diferença entre micro e macro e a variação por participante devem acompanhar o ranking.
Um próximo estudo deve fixar protocolo e orçamento antes dos experimentos, usar avaliação agrupada por participante, comparar resolução/recortes com controle de falsos positivos e reservar dados realmente novos. Não reajustar pelo painel final já observado. Essas propostas não foram executadas nesta análise.

## Fontes

- resultados/modernos/yolo/indice.json; SHA256 2dcb2417f454959d8bdafaa0fe115aae6b27bc246d3b5a2359a101669c9e83a7
- analise/conclusao_ciclo_temporal_20261018.json; SHA256 0da2ee3941b8874a668673cd26d771f40fea0d2953dcc7748bdeab5035a6f06c
- analise/tabela_paineis_pequenos_20261020.json; SHA256 a475605a893db9a20afd5401baf7b533087c69c4f81f4c4189a765698f75afe7
- [Registro conclusao_limiarizacao.md](../conclusao_limiarizacao.md)
- [Registro conclusao_blobs.md](../conclusao_blobs.md)
- [Registro conclusao_fluxo_limiarizacao_hibrida.md](../conclusao_fluxo_limiarizacao_hibrida.md)
- [Registro conclusao_fluxo_blobs_hibrido.md](../conclusao_fluxo_blobs_hibrido.md)
- [Registro conclusao_watershed_hibrido_classe0.md](../conclusao_watershed_hibrido_classe0.md)
- [Registro analise_pequenos_round1_5_20261019.md](../analise_pequenos_round1_5_20261019.md)
- [Registro analise_paineis_pequenos_20261020.md](../analise_paineis_pequenos_20261020.md)
- [Registro conclusao_yolo_20261026.md](../conclusao_yolo_20261026.md)