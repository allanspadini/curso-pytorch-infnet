import React from 'react';
import ConfusionThresholdSimulator from '../components/interactive/ConfusionThresholdSimulator';
import CalibrationVisualizer from '../components/interactive/CalibrationVisualizer';
import BootstrapSimulator from '../components/interactive/BootstrapSimulator';
import SurrogateLossVisualizer from '../components/interactive/SurrogateLossVisualizer';
import ModelEvalQuizWidget from '../components/interactive/ModelEvalQuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Avaliação Crítica & Métricas sob Desbalanceamento',
    subtitle: 'Aula 09 — Da Falácia da Acurácia ao Padrão Clínico da OMS (Gabarito Estudo de Caso 1)',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa nona aula de Redes Neurais Profundas!

Hoje entraremos em uma das áreas mais críticas da Inteligência Artificial aplicada: a avaliação honesta de modelos e o tratamento de classes raras.

Muitos projetos de IA celebram acurácias de 88% ou 95% sem perceber que seus modelos são completamente inúteis e perigosos. Em aplicações médicas, detecção de fraudes financeiras e inspeção de falhas industriais, os eventos de interesse representam apenas 1% a 15% do total.

Aprenderemos por que a acurácia é uma armadilha, dominaremos a Matriz de Confusão, calcularemos Sensibilidade (Recall) e Especificidade com rigor matemático, descobriremos por que a curva PR-AUC é muito superior à ROC-AUC em dados raros, implementaremos perdas ponderadas com class_weights no PyTorch e resolveremos todos os problemas do Estudo de Caso 1 da nossa disciplina: a triagem de malária em células sanguíneas. Vamos começar!`
  },

  // Slide 2: Instructor
  {
    id: 2,
    type: 'instructor',
    title: 'Apresentação do Professor',
    subtitle: 'Conheça quem estará com você nesta jornada',
    name: 'Allan Spadini',
    role: 'Professor & Pesquisador em IA',
    photo: '/allan_spadini.jpg',
    highlights: [
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Análise de incerteza estatística, calibração bayesiana e inferência de risco.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Auditoria de Modelos de IA', desc: 'Métricas de segurança clínica, testes de robustez e prevenção de leakage.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Sistemas inteligentes com alta tolerância a falhas e calibração de incerteza.' }
    ],
    notes: `Meu nome é Allan Spadini. Na ciência e na medicina, uma previsão errada tem custos humanos reais. Hoje aprenderemos a pensar como engenheiros seniores de IA que auditam sistemas críticos antes que eles cheguem aos usuários finais.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco pilares para auditoria rigorosa de modelos',
    steps: [
      { num: '01', title: 'A Falácia da Acurácia', desc: 'Como datasets desbalanceados enganam métricas ingênuas.' },
      { num: '02', title: 'Matriz de Confusão', desc: 'Cálculo de Sensibilidade (Recall) e Especificidade clínica.' },
      { num: '03', title: 'ROC vs PR-AUC', desc: 'Por que PR-AUC é a ferramenta correta para classes minoritárias.' },
      { num: '04', title: 'Class Weights & Cutoff', desc: 'Perda ponderada no PyTorch e calibração de limiares (Thresholds).' },
      { num: '05', title: 'Gabarito Caso 1', desc: 'Auditoria completa da CNN de triagem de malária.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá:
Primeiro, a demonstração matemática da falácia da acurácia.
Segundo, as métricas clínicas fundamentais derivadas da Matriz de Confusão.
Terceiro, o confronto técnico entre curvas ROC e Precision-Recall.
Quarto, as ferramentas de correção no PyTorch: class_weights e threshold tuning.
E quinto, a resolução completa do Estudo de Caso 1 da disciplina.`
  },

  // Slide 4: Comparison - The Accuracy Fallacy
  {
    id: 4,
    type: 'comparison',
    title: 'A Falácia da Acurácia em Dados Raros',
    subtitle: 'O paradoxo do classificador cego no Estudo de Caso 1',
    cardLeft: {
      badge: 'O RELATÓRIO DO ENGENHEIRO (CASO 1)',
      title: '"Acurácia de 88,3%: Pronto para Produção!"',
      bullets: [
        'Dataset com 85% de células sadias e 15% de células parasitadas.',
        'Um modelo simplório que responda "SADIA" para todas as amostras atinge 85%!',
        'A acurácia reportada de 88,3% está apenas 3,3 pontos acima do chute cego.',
        'Ignora completamente a quantidade de pessoas doentes não diagnosticadas.'
      ]
    },
    cardRight: {
      badge: 'A REALIDADE CLÍNICA',
      title: 'Sensibilidade de Apenas 57,4%',
      bullets: [
        'De 500 pacientes infectados com malária, a rede detectou apenas 287.',
        'Deixou 213 pessoas infectadas sem tratamento (Falsos Negativos).',
        'Risco de morte e propagação acelerada da doença na comunidade.',
        'Completamente reprovado no limiar da OMS (Sensibilidade ≥ 95%).'
      ]
    },
    notes: `Prestem atenção máxima neste exemplo do Estudo de Caso 1:
O engenheiro declarou: 'Temos 88,3% de acurácia, o sistema está pronto!'
Mas o dataset tem 85% de casos não infectados. Se colocássemos uma pedra em cima do teclado respondendo sempre 'não infectado', a acurácia seria de 85%!
Quando calculamos a Sensibilidade real, o modelo encontrou apenas 287 dos 500 parasitados: Sensibilidade de míseros 57,4%. Isso significa liberar 213 pessoas infectadas sem remédio. Um desastre clínico!`
  },

  // Slide 5: Formula - Confusion Matrix
  {
    id: 5,
    type: 'formula',
    title: 'A Anatomia da Matriz de Confusão 2×2',
    subtitle: 'Decompondo as decisões em Verdadeiros e Falsos Positivos e Negativos',
    formula: '\\text{Sensibilidade (Recall)} = \\frac{TP}{TP + FN}, \\qquad \\text{Especificidade} = \\frac{TN}{TN + FP}',
    variables: [
      { name: 'TP (Verdadeiro Positivo)', desc: 'Célula infectada com malária corretamente classificada como parasitada (287 no caso).' },
      { name: 'FN (Falso Negativo)', desc: 'Célula infectada diagnosticada erroneamente como sadia (213 pacientes sem remédio!).' },
      { name: 'TN (Verdadeiro Negativo)', desc: 'Célula sadia corretamente identificada como não infectada.' },
      { name: 'FP (Falso Positivo)', desc: 'Célula sadia classificada erroneamente como infectada (remédio desnecessário).' }
    ],
    notes: `Na Matriz de Confusão 2x2, cada previsão cai em um de 4 quadrantes.
Em problemas de saúde e risco, o Falso Negativo (FN) é infinitamente mais grave que o Falso Positivo (FP).
Se tivermos um falso positivo, o paciente fará um exame confirmatório. Se tivermos um falso negativo, o paciente vai para casa e pode falecer por falta de tratamento!`
  },

  // Slide 6: Custom - ConfusionThresholdSimulator
  {
    id: 6,
    type: 'custom',
    title: 'Simulador Interativo: Limiar de Decisão & Matriz 2×2',
    subtitle: 'Ajuste o limiar de probabilidade e observe a gangorra entre Sensibilidade e Especificidade',
    component: <ConfusionThresholdSimulator />,
    notes: `Usem o simulador interativo na tela.
Vocês podem mover a linha de corte de probabilidade (Threshold).
Reparem que por padrão o PyTorch usa corte em 0.5. Mas ao reduzir o corte para 0.25 ou 0.20, o número de Falsos Negativos cai drasticamente e a Sensibilidade salta para cima de 95%, atingindo o requisito da OMS!`
  },

  // Slide 7: Comparison - Sensitivity vs Specificity
  {
    id: 7,
    type: 'comparison',
    title: 'Sensibilidade vs. Especificidade: O Padrão OMS',
    subtitle: 'Os dois pilares regulatórios para certificação de ferramentas de triagem',
    cardLeft: {
      badge: 'SENSIBILIDADE (RECALL) ≥ 95%',
      title: 'Protegendo os Doentes',
      bullets: [
        'Mede a proporção de casos infectados que o modelo consegue capturar.',
        'Sensibilidade baixa = pacientes infectados liberados sem tratamento.',
        'A OMS exige Sensibilidade ≥ 95% para ferramentas de triagem populacional.'
      ]
    },
    cardRight: {
      badge: 'ESPECIFICIDADE ≥ 95%',
      title: 'Evitando Super-Medicação',
      bullets: [
        'Mede a proporção de indivíduos sadios corretamente liberados.',
        'Especificidade baixa = uso excessivo de antimaláricos com fortes efeitos colaterais.',
        'O modelo ideal precisa atingir ambos os limiares simultaneamente!'
      ]
    },
    notes: `A Organização Mundial da Saúde estabelece dois critérios rigorosos para triagem automatizada de malária:
Sensibilidade maior ou igual a 95% para não deixar ninguém sem tratamento.
E Especificidade maior ou igual a 95% para não sobrecarregar farmácias nem intoxicar pessoas sadias com medicamentos pesados.`
  },

  // Slide 8: Formula - F-Beta Score
  {
    id: 8,
    type: 'formula',
    title: 'O F-Beta Score: Ponderando Prioridades',
    subtitle: 'Ajustando o equilíbrio harmônico quando Recall é mais crítico que Precision',
    formula: 'F_\\beta = (1 + \\beta^2) \\cdot \\frac{\\text{Precision} \\cdot \\text{Recall}}{(\\beta^2 \\cdot \\text{Precision}) + \\text{Recall}}, \\qquad \\beta = 2.0',
    variables: [
      { name: '\\beta = 1.0', desc: 'F1-Score tradicional: dá pesos exatamente iguais para Precision e Recall.' },
      { name: '\\beta = 2.0 (F_2)', desc: 'Dá 2 vezes mais importância para o Recall (tolerância quase zero para Falsos Negativos).' },
      { name: '\\beta = 0.5 (F_{0.5})', desc: 'Dá 2 vezes mais peso para Precision (quando falsos alarmes geram custos financeiros proibitivos).' }
    ],
    notes: `Quando um gestor perguntar se deve usar F1-Score em medicina, a resposta é NÃO: use F2-Score!
Com beta=2.0, a fórmula harmônica penaliza severamente modelos que tenham Recall baixo, forçando os algoritmos a priorizarem a captura de todos os casos positivos.`
  },

  // Slide 9: Comparison - ROC-AUC vs PR-AUC
  {
    id: 9,
    type: 'comparison',
    title: 'Curva ROC vs. Curva Precision-Recall (PR-AUC)',
    subtitle: 'Por que a curva ROC é traiçoeira em datasets desbalanceados',
    cardLeft: {
      badge: 'CURVA ROC-AUC',
      title: 'Plota True Positive Rate vs. False Positive Rate',
      bullets: [
        'FPR = FP / (FP + TN). Como a classe negativa (TN) é gigantesca, o FPR permanece minúsculo!',
        'Cria uma falsa sensação de perfeição: áreas sob a curva de 0.95 mesmo com modelos medíocres.',
        'Não reflete a queda real de precisão quando a classe positiva é rara.'
      ]
    },
    cardRight: {
      badge: 'CURVA PRECISION-RECALL (PR-AUC)',
      title: 'Plota Precision vs. Recall',
      bullets: [
        'Foca exclusivamente na classe minoritária de interesse.',
        'Não é inflacionada pelo tamanho absoluto dos Verdadeiros Negativos.',
        'Métrica padrão-ouro internacional para detecção de fraudes, anomalias e triagem clínica.'
      ]
    },
    notes: `Memorizem isto para entrevistas e projetos:
A curva ROC divide os falsos positivos pelo total de negativos (TN). Se você tiver 100.000 amostras sadias, o denominador é enorme e o FPR parece zero, inflando artificialmente a ROC-AUC!
Já a curva Precision-Recall olha apenas para os positivos. Se houver falsos alarmes, a curva despenca na hora. Em desbalanceamento severo, confie sempre na PR-AUC.`
  },

  // Slide 10: Formula - Class Weights in CrossEntropy
  {
    id: 10,
    type: 'formula',
    title: 'Ponderação de Classes em PyTorch',
    subtitle: 'Multiplicando a penalização do gradiente para classes minoritárias',
    formula: 'w_c = \\frac{N}{C \\times N_c}, \\qquad \\mathcal{L} = -\\sum_{c} w_c \\cdot y_c \\log(\\hat{p}_c)',
    variables: [
      { name: 'N', desc: 'Número total de amostras do dataset de treino.' },
      { name: 'N_c', desc: 'Número de amostras pertencentes à classe c.' },
      { name: 'CrossEntropyLoss', desc: 'torch.nn.CrossEntropyLoss(weight=torch.tensor([1.0, 5.67]).to(device))' },
      { name: 'Efeito Prático', desc: 'Errar uma célula infectada gera um gradiente 5.67 vezes maior do que errar uma sadia!' }
    ],
    notes: `No Estudo de Caso 1, o engenheiro utilizou nn.CrossEntropyLoss() sem o argumento weight.
Como 85% das amostras eram sadias, a rede aprendeu que ignorar os parasitados era o caminho mais fácil para baixar a loss!
A solução é injetar o vetor de pesos inversamente proporcional à frequência: um erro na classe rara gera um empurrão de gradiente mais de 5 vezes mais forte, obrigando os neurônios a aprenderem as características do parasita.`
  },

  // Slide 11: Custom - SurrogateLossVisualizer
  {
    id: 11,
    type: 'custom',
    title: 'Visualizador Interativo: Métricas Degrau vs Perdas Contínuas',
    subtitle: 'Por que não podemos otimizar acurácia ou recall diretamente via SGD',
    component: <SurrogateLossVisualizer />,
    notes: `Por que não usamos a própria acurácia ou recall como função de perda?
Vejam no gráfico: métricas de contagem têm derivadas nulas (gradiente zero) em quase todo lugar e saltam bruscamente em degraus!
Usamos funções substitutas (Surrogate Losses) como CrossEntropy e Focal Loss porque elas são suaves e diferenciáveis, fornecendo vetores de gradiente contínuos para o SGD.`
  },

  // Slide 12: Comparison - Overconfidence & ECE
  {
    id: 12,
    type: 'comparison',
    title: 'Superconfiança de Redes Neurais & Calibração (ECE)',
    subtitle: 'Quando a rede diz ter 99% de certeza mas erra 20% das vezes',
    cardLeft: {
      badge: 'O PROBLEMA DA SUPERCONFIANÇA',
      title: 'Probabilidades Descalibradas',
      bullets: [
        'Redes profundas modernas com BatchNorm e Dropout tornam-se arrogantes.',
        'Seus logits empurram as probabilidades para 0.999 mesmo em casos limítrofes.',
        'Expected Calibration Error (ECE): mede a diferença entre confiança e acurácia real.'
      ]
    },
    cardRight: {
      badge: 'A SOLUÇÃO: TEMPERATURE SCALING',
      title: 'Pós-Processamento com Parâmetro T',
      bullets: [
        'Ajusta a temperatura: p̂ = Softmax(z / T).',
        'T > 1 suaviza a distribuição sem alterar o ranking das classes.',
        'Garante que se o modelo afirma 80% de probabilidade, ele realmente acerte 80% das vezes.'
      ]
    },
    notes: `Redes neurais modernas têm um vício de personalidade: elas são superconfiantes!
Ao passar por dezenas de camadas e otimização por entropia cruzada, os logits tornam-se gigantescos e o Softmax cospe probabilidades de 99.8% mesmo quando a imagem está borrada.
O Temperature Scaling suaviza os logits dividindo por uma temperatura T aprendida na validação, transformando números brutos em probabilidades honestas e calibradas.`
  },

  // Slide 13: Custom - CalibrationVisualizer
  {
    id: 13,
    type: 'custom',
    title: 'Visualizador Interativo: Gráfico de Calibração (Reliability Diagram)',
    subtitle: 'Ajuste a temperatura T e observe a redução do erro de calibração (ECE)',
    component: <CalibrationVisualizer />,
    notes: `Utilizem o simulador de calibração na tela.
A linha diagonal pontilhada representa a calibração perfeita: em 10 previsões com 70% de confiança, a rede deve acertar exatamente 7.
Ajustem o slider de temperatura T: vejam como as barras se alinham à diagonal e o ECE cai para valores saudáveis.`
  },

  // Slide 14: Custom - BootstrapSimulator
  {
    id: 14,
    type: 'custom',
    title: 'Simulador Interativo: Intervalos de Confiança via Bootstrap',
    subtitle: 'Estime a variabilidade estatística da acurácia e recall com 1.000 reamostragens',
    component: <BootstrapSimulator />,
    notes: `Nunca relatem uma métrica de teste como um número único estático (ex: 'Recall = 91.2%') sem intervalo de confiança.
Através de reamostragem Bootstrap (1.000 iterações com reposição), construímos o intervalo de confiança de 95%: 'Recall = 91.2% (95% CI: 88.4% - 93.8%)'. Isso prova cientificamente a estabilidade do modelo!`
  },

  // Slide 15: Comparison - Case Study 1 Full Diagnosis
  {
    id: 15,
    type: 'comparison',
    title: 'Auditoria Crítica: Os 5 Erros do Estudo de Caso 1',
    subtitle: 'O checklist completo dos problemas arquiteturais e metodológicos',
    cardLeft: {
      badge: 'FALHAS DETECTADAS',
      title: 'Diagnóstico da Implementação Original',
      bullets: [
        '1. Desbalanceamento severo (85/15) ignorado sem class_weights.',
        '2. Acurácia usada como métrica única, mascarando Sensibilidade de 57,4%.',
        '3. Ausência de BatchNorm2d e Dropout (alto risco de overfitting).',
        '4. Kernels 7x7 desnecessariamente grandes e caros.',
        '5. Camada linear gigante (128×14×14 = 25.088 → 2048 neurônios sem regularização).'
      ]
    },
    cardRight: {
      badge: 'PROPOSTAS DE CORREÇÃO',
      title: 'Plano de Ação Técnico com Estimativa de Impacto',
      bullets: [
        '1. Adicionar weight=[1.0, 5.67] em CrossEntropyLoss() e Threshold Tuning.',
        '2. Adotar Sensibilidade (Recall) ≥ 95% como critério de parada da validação.',
        '3. Inserir BatchNorm2d após cada Conv2d e Dropout(0.4) antes da Linear.',
        '4. Substituir filtros 7x7 por pilhas eficientes de filtros 3x3.',
        '5. Impacto esperado: Sensibilidade saltando de 57,4% para ≥ 95% com especificidade controlada.'
      ]
    },
    notes: `Este slide consolida o gabarito completo do Estudo de Caso 1:
Os 5 erros:
1. Sem class_weights na perda.
2. Acurácia mascarando a falha em Falsos Negativos.
3. Sem BatchNorm nem Dropout.
4. Kernels 7x7 gigantescos.
5. Camada densa com 25 mil conexões sem regularização.
Com a correção dos pesos e do limiar, a Sensibilidade sobe para o patamar exigido pela OMS.`
  },

  // Slide 16: Custom - Quiz
  {
    id: 16,
    type: 'custom',
    title: 'Quiz de Fixação: Avaliação e Métricas de Risco',
    subtitle: 'Teste seus conhecimentos sobre matriz de confusão, PR-AUC e o caso da malária',
    component: <ModelEvalQuizWidget />,
    notes: `Vamos fixar os conceitos!
Respondam às perguntas interativas sobre o cálculo de Sensibilidade, a fragilidade da acurácia e a seleção de class_weights no PyTorch.`
  },

  // Slide 17: Roadmap - Synthesis & Case Study 1
  {
    id: 17,
    type: 'roadmap',
    title: 'Síntese da Aula & Requisitos do Estudo de Caso 1',
    subtitle: 'Checklist para redação do relatório técnico de auditoria',
    steps: [
      { num: '01', title: 'Cálculo de Sensibilidade', desc: 'Demonstrar analiticamente: 287 / (287 + 213) = 57,4% vs limiar de 95% da OMS.' },
      { num: '02', title: 'Class Weights', desc: 'Propor torch.nn.CrossEntropyLoss(weight=...) proporcional ao desbalanceamento.' },
      { num: '03', title: 'Refatoração da CNN', desc: 'Adicionar BatchNorm2d, Dropout, kernels 3x3 e loop de validação por época.' },
      { num: '04', title: 'Estimativa de Impacto', desc: 'Estimar aumento quantitativo de Sensibilidade para ≥ 95% e controle de gap treino/teste.' }
    ],
    notes: `Neste resumo, revisamos como estruturar seu texto para o Estudo de Caso 1:
Identifique os erros com citação de código, proponha a correção com a função PyTorch adequada e estime o impacto quantitativo esperado.`
  },

  // Slide 18: Next Steps
  {
    id: 18,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 10',
    subtitle: 'Modelagem de Dados Sequenciais, Séries Temporais & RNNs',
    steps: [
      { num: '01', title: 'A Falha da Hipótese I.I.D.', desc: 'Por que dados sequenciais e temporais quebram a independência amostral.' },
      { num: '02', title: 'Janelamento Deslizante', desc: 'Transformando séries em tensores 3D com a técnica Sliding Window.' },
      { num: '03', title: 'Redes Recorrentes (RNNs)', desc: 'Conceito de Hidden State (ht) e desenrolamento no tempo (Unrolling).' },
      { num: '04', title: 'O Algoritmo BPTT', desc: 'Backpropagation Through Time e as raízes da instabilidade temporal.' }
    ],
    notes: `Na nossa próxima aula — Aula 10 —, iniciaremos o último grande módulo da disciplina: Modelagem de Dados Sequenciais e Séries Temporais com Redes Recorrentes (RNNs, LSTMs e GRUs). Muito obrigado e até lá!`
  }
];
