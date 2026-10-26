# Roteiro de Narração do Apresentador — Aula 09
## Avaliação Crítica & Métricas sob Desbalanceamento (Gabarito Estudo de Caso 1)

**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Professor**: Allan Spadini  

---

### Slide 1: Título & Abertura
> "Olá a todos e sejam muito bem-vindos à nossa nona aula de Redes Neurais Profundas!
>
> Hoje entraremos em uma das áreas mais críticas da Inteligência Artificial aplicada: a avaliação honesta de modelos e o tratamento de classes raras.
>
> Muitos projetos de IA celebram acurácias de 88% ou 95% sem perceber que seus modelos são completamente inúteis e perigosos. Em aplicações médicas, detecção de fraudes financeiras e inspeção de falhas industriais, os eventos de interesse representam apenas 1% a 15% do total.
>
> Aprenderemos por que a acurácia é uma armadilha, dominaremos a Matriz de Confusão, calcularemos Sensibilidade (Recall) e Especificidade com rigor matemático, descobriremos por que a curva PR-AUC é muito superior à ROC-AUC em dados raros, implementaremos perdas ponderadas com class_weights no PyTorch e resolveremos todos os problemas do Estudo de Caso 1 da nossa disciplina: a triagem de malária em células sanguíneas. Vamos começar!"

---

### Slide 2: Apresentação do Professor
> "Meu nome é Allan Spadini. Na ciência e na medicina, uma previsão errada tem custos humanos reais. Hoje aprenderemos a pensar como engenheiros seniores de IA que auditam sistemas críticos antes que eles cheguem aos usuários finais."

---

### Slide 3: Roteiro & Objetivos da Aula
> "Nosso roteiro de 90 minutos cobrirá:
> Primeiro, a demonstração matemática da falácia da acurácia.
> Segundo, as métricas clínicas fundamentais derivadas da Matriz de Confusão.
> Terceiro, o confronto técnico entre curvas ROC e Precision-Recall.
> Quarto, as ferramentas de correção no PyTorch: `class_weights` e threshold tuning.
> E quinto, a resolução completa do Estudo de Caso 1 da disciplina."

---

### Slide 4: A Falácia da Acurácia em Dados Raros
> "Prestem atenção máxima neste exemplo do Estudo de Caso 1:
> O engenheiro declarou: 'Temos 88,3% de acurácia, o sistema está pronto!'
> Mas o dataset tem 85% de casos não infectados. Se colocássemos uma pedra em cima do teclado respondendo sempre 'não infectado', a acurácia seria de 85%!
> Quando calculamos a Sensibilidade real, o modelo encontrou apenas 287 dos 500 parasitados: Sensibilidade de míseros 57,4%. Isso significa liberar 213 pessoas infectadas sem remédio. Um desastre clínico!"

---

### Slide 5: A Anatomia da Matriz de Confusão 2×2
> "Na Matriz de Confusão 2x2, cada previsão cai em um de 4 quadrantes.
> Em problemas de saúde e risco, o Falso Negativo (FN) é infinitamente mais grave que o Falso Positivo (FP).
> Se tivermos um falso positivo, o paciente fará um exame confirmatório. Se tivermos um falso negativo, o paciente vai para casa e pode falecer por falta de tratamento!"

---

### Slide 6: Simulador Interativo: Limiar de Decisão & Matriz 2×2
> "Usem o simulador interativo na tela.
> Vocês podem mover a linha de corte de probabilidade (Threshold).
> Reparem que por padrão o PyTorch usa corte em 0.5. Mas ao reduzir o corte para 0.25 ou 0.20, o número de Falsos Negativos cai drasticamente e a Sensibilidade salta para cima de 95%, atingindo o requisito da OMS!"

---

### Slide 7: Sensibilidade vs. Especificidade: O Padrão OMS
> "A Organização Mundial da Saúde estabelece dois critérios rigorosos para triagem automatizada de malária:
> Sensibilidade maior ou igual a 95% para não deixar ninguém sem tratamento.
> E Especificidade maior ou igual a 95% para não sobrecarregar farmácias nem intoxicar pessoas sadias com medicamentos pesados."

---

### Slide 8: O F-Beta Score: Ponderando Prioridades
> "Quando um gestor perguntar se deve usar F1-Score em medicina, a resposta é NÃO: use F2-Score!
> Com $\beta = 2.0$, a fórmula harmônica penaliza severamente modelos que tenham Recall baixo, forçando os algoritmos a priorizarem a captura de todos os casos positivos."

---

### Slide 9: Curva ROC vs. Curva Precision-Recall (PR-AUC)
> "Memorizem isto para entrevistas e projetos:
> A curva ROC divide os falsos positivos pelo total de negativos (TN). Se você tiver 100.000 amostras sadias, o denominador é enorme e o FPR parece zero, inflando artificialmente a ROC-AUC!
> Já a curva Precision-Recall olha apenas para os positivos. Se houver falsos alarmes, a curva despenca na hora. Em desbalanceamento severo, confie sempre na PR-AUC."

---

### Slide 10: Ponderação de Classes em PyTorch
> "No Estudo de Caso 1, o engenheiro utilizou `nn.CrossEntropyLoss()` sem o argumento `weight`.
> Como 85% das amostras eram sadias, a rede aprendeu que ignorar os parasitados era o caminho mais fácil para baixar a loss!
> A solução é injetar o vetor de pesos inversamente proporcional à frequência: um erro na classe rara gera um empurrão de gradiente mais de 5 vezes mais forte, obrigando os neurônios a aprenderem as características do parasita."

---

### Slide 11: Visualizador Interativo: Métricas Degrau vs Perdas Contínuas
> "Por que não usamos a própria acurácia ou recall como função de perda?
> Vejam no gráfico: métricas de contagem têm derivadas nulas (gradiente zero) em quase todo lugar e saltam bruscamente em degraus!
> Usamos funções substitutas (Surrogate Losses) como CrossEntropy e Focal Loss porque elas são suaves e diferenciáveis, fornecendo vetores de gradiente contínuos para o SGD."

---

### Slide 12: Superconfiança de Redes Neurais & Calibração (ECE)
> "Redes neurais modernas têm um vício de personalidade: elas são superconfiantes!
> Ao passar por dezenas de camadas e otimização por entropia cruzada, os logits tornam-se gigantescos e o Softmax cospe probabilidades de 99.8% mesmo quando a imagem está borrada.
> O Temperature Scaling suaviza os logits dividindo por uma temperatura T aprendida na validação, transformando números brutos em probabilidades honestas e calibradas."

---

### Slide 13: Visualizador Interativo: Gráfico de Calibração (Reliability Diagram)
> "Utilizem o simulador de calibração na tela.
> A linha diagonal pontilhada representa a calibração perfeita: em 10 previsões com 70% de confiança, a rede deve acertar exatamente 7.
> Ajustem o slider de temperatura T: vejam como as barras se alinham à diagonal e o ECE cai para valores saudáveis."

---

### Slide 14: Simulador Interativo: Intervalos de Confiança via Bootstrap
> "Nunca relatem uma métrica de teste como um número único estático (ex: 'Recall = 91.2%') sem intervalo de confiança.
> Através de reamostragem Bootstrap (1.000 iterações com reposição), construímos o intervalo de confiança de 95%: 'Recall = 91.2% (95% CI: 88.4% - 93.8%)'. Isso prova cientificamente a estabilidade do modelo!"

---

### Slide 15: Auditoria Crítica: Os 5 Erros do Estudo de Caso 1
> "Este slide consolida o gabarito completo do Estudo de Caso 1:
> Os 5 erros:
> 1. Sem `class_weights` na perda.
> 2. Acurácia mascarando a falha em Falsos Negativos.
> 3. Sem `BatchNorm2d` nem `Dropout`.
> 4. Kernels $7 \times 7$ gigantescos.
> 5. Camada densa com 25 mil conexões sem regularização.
> Com a correção dos pesos e do limiar, a Sensibilidade sobe para o patamar exigido pela OMS."

---

### Slide 16: Quiz de Fixação: Avaliação e Métricas de Risco
> "Vamos fixar os conceitos!
> Respondam às perguntas interativas sobre o cálculo de Sensibilidade, a fragilidade da acurácia e a seleção de class_weights no PyTorch."

---

### Slide 17: Síntese da Aula & Requisitos do Estudo de Caso 1
> "Neste resumo, revisamos como estruturar seu texto para o Estudo de Caso 1:
> Identifique os erros com citação de código, proponha a correção com a função PyTorch adequada e estime o impacto quantitativo esperado."

---

### Slide 18: Próximos Passos: Aula 10
> "Na nossa próxima aula — Aula 10 —, iniciaremos o último grande módulo da disciplina: Modelagem de Dados Sequenciais e Séries Temporais com Redes Recorrentes (RNNs, LSTMs e GRUs). Muito obrigado e até lá!"
