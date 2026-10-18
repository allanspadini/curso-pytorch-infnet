import React from 'react';
import DataLeakageSimulator from '../components/interactive/DataLeakageSimulator';
import DataLoaderShuffleVisualizer from '../components/interactive/DataLoaderShuffleVisualizer';
import MlpForwardSimulator from '../components/interactive/MlpForwardSimulator';
import QuizWidget from '../components/interactive/QuizWidget';
import {
  RoadmapVisual,
  SplitRuleDiagram,
  DatasetAnatomyDiagram,
  BatchGradientTrajectoryChart,
  TaskHeadComparisonDiagram,
  CrossEntropyVisualChart,
  InsuranceDistributionChart,
  RegressionMetricsChart,
  BaselineComparisonChart,
  PipelineChecklistVisual,
  NextClassPreviewVisual
} from '../components/interactive/Aula03Visuals';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Pipelines de Dados Tabulares, Datasets e Modelagem Multitarefa',
    subtitle: 'Aula 03 — Ingestão de Dados, Prevenção de Data Leakage, Classificação & Regressão no PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa terceira aula de Redes Neurais Profundas com PyTorch!

Hoje vamos dar um salto profissional fundamental: sairemos dos dados sintéticos e aprenderemos a construir pipelines de dados robustos para datasets do mundo real.

Aprenderemos a prevenir o famigerado Data Leakage — o vazamento de dados que engana cientistas de dados com métricas fantásticas no treino que quebram na produção. Em seguida, dominaremos a estrutura oficial do PyTorch para lidar com dados: a classe Dataset e o DataLoader.

Por fim, implementaremos duas arquiteturas supervisionadas completas: um classificador multiclasse para prever o comportamento de clientes de E-commerce e um regressor contínuo para estimar custos médicos de seguros. Vamos começar!`
  },

  // Slide 2: Roadmap Visual Progressivo
  {
    id: 2,
    type: 'custom',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas visuais para dominar pipelines supervisionados',
    component: <RoadmapVisual />,
    notes: `Nosso roteiro de 90 minutos está dividido em 5 etapas claras:
Primeiro, o conceito vital de integridade de dados e prevenção de Data Leakage.
Segundo, a criação de classes customizadas herdadas de torch.utils.data.Dataset.
Terceiro, a configuração otimizada do DataLoader com mini-batches e embaralhamento estocástico.
Quarto, a implementação prática de classificação multiclasse com CrossEntropyLoss.
E quinto, a modelagem de regressão com MSELoss e avaliação por MAE, RMSE e R².`
  },

  // Slide 3: Regra de Ouro do Particionamento
  {
    id: 3,
    type: 'custom',
    title: 'A Regra de Ouro do Particionamento',
    subtitle: 'Isolamento estatístico passo a passo entre Treino, Validação e Teste',
    component: <SplitRuleDiagram />,
    notes: `Prestem muita atenção neste slide, pois este é um dos erros mais frequentes na indústria.
Se você normalizar todo o seu conjunto de dados antes de dividi-lo em treino e teste, o desvio padrão e a média global do conjunto de teste estarão vazando para o conjunto de treino!
A regra é taxativa: primeiro separamos os conjuntos. Depois, calculamos a média e o desvio padrão exclusivamente sobre o conjunto de treino (.fit_transform) e simplesmente usamos esses parâmetros fixos para transformar validação e teste (.transform).`
  },

  // Slide 4: Simulador Interativo de Data Leakage
  {
    id: 4,
    type: 'custom',
    title: 'Simulador Visual: Detecção de Data Leakage',
    subtitle: 'Construa a distribuição normalizada com vs. sem vazamento de dados',
    component: <DataLeakageSimulator />,
    notes: `Utilizem o simulador interativo na tela.
Vocês podem alternar entre a abordagem Ingênua (com Data Leakage) e a abordagem Profissional (com Isolamento Estrito).
Notem como o Data Leakage mascara o verdadeiro desempenho, gerando um gap inesperado quando o modelo enfrenta dados verdadeiramente inéditos. Com o pipeline isolado, o comportamento em teste reflete a realidade operacional.`
  },

  // Slide 5: Anatomia da Classe Dataset
  {
    id: 5,
    type: 'custom',
    title: 'Anatomia da Classe Dataset no PyTorch',
    subtitle: 'Os 3 métodos fundamentais construídos passo a passo',
    component: <DatasetAnatomyDiagram />,
    notes: `No ecossistema PyTorch, todo dataset é representado por uma classe que herda de torch.utils.data.Dataset.
Ela precisa implementar apenas 3 métodos:
O __init__, onde guardamos nossos tensores em memória;
O __len__, que responde quantas linhas temos no total;
E o __getitem__, que recebe um índice inteiro e devolve o par (X, y) correspondente. Com esses 3 métodos, o PyTorch ganha o poder de iterar e fatiar qualquer tipo de dado.`
  },

  // Slide 6: O Papel Estratégico do DataLoader
  {
    id: 6,
    type: 'custom',
    title: 'O Papel Estratégico do DataLoader',
    subtitle: 'Trajetória de otimização: Batch Completo vs. Mini-Batch SGD',
    component: <BatchGradientTrajectoryChart />,
    notes: `Por que utilizamos o DataLoader em vez de alimentar tensores gigantescos na GPU?
Primeiro: economia de memória. Em datasets de milhões de linhas ou imagens de alta resolução, carregar tudo de uma vez estoura a memória.
Segundo: dinâmica do gradiente. Atualizar os pesos após cada mini-batch introduz um ruído estocástico saudável que auxilia a rede a escapar de vales planos e mínimos locais rasos!`
  },

  // Slide 7: Visualizador do Efeito do Shuffle
  {
    id: 7,
    type: 'custom',
    title: 'Visualizador Interativo: O Efeito do Shuffle',
    subtitle: 'Composição dos mini-batches e estabilidade do vetor gradiente',
    component: <DataLoaderShuffleVisualizer />,
    notes: `Neste simulador, observem como o parâmetro shuffle=True altera a composição dos lotes.
Se shuffle=False, lotes inteiros podem conter apenas amostras de uma mesma categoria, enviesando o cálculo dos gradientes daquela iteração. Com shuffle=True, cada batch recebe uma amostra representativa e equilibrada da população.`
  },

  // Slide 8: Simulador do Forward Pass Tabular
  {
    id: 8,
    type: 'custom',
    title: 'Simulador do Forward Pass Tabular',
    subtitle: 'Propagação camada por camada no Dataset Iris',
    component: <MlpForwardSimulator />,
    notes: `Aqui temos o fluxo direto de dados (Forward Pass) em ação.
Os atributos normalizados entram pela camada de entrada, sofrem combinações lineares ponderadas pelos pesos w, são ativados por funções não-lineares (como ReLU) e chegam na camada de saída com o resultado predito.`
  },

  // Slide 9: Classificação vs. Regressão em PyTorch
  {
    id: 9,
    type: 'custom',
    title: 'Classificação vs. Regressão em PyTorch',
    subtitle: 'Mesmo tronco extrator, diferentes cabeças de saída e funções de perda',
    component: <TaskHeadComparisonDiagram />,
    notes: `Comparem lado a lado os dois grandes paradigmas da modelagem tabular supervisionada:
Em classificação multiclasse, nossa saída possui o mesmo número de neurônios que o número de classes (3 classes: Low, Medium, High). Usamos CrossEntropyLoss, que internamente combina LogSoftmax com NLLLoss.
Em regressão contínua, nossa saída tem dimensão 1, pois prevê um valor numérico direto. Usamos MSELoss para calcular o erro quadrático médio.`
  },

  // Slide 10: A Matemática da Entropia Cruzada
  {
    id: 10,
    type: 'custom',
    title: 'A Matemática Visual da Entropia Cruzada',
    subtitle: 'De Logits brutos à penalidade logarítmica sem Softmax explícito',
    component: <CrossEntropyVisualChart />,
    notes: `Uma dica de ouro em PyTorch: nunca coloque uma camada nn.Softmax() no final da sua rede se for usar nn.CrossEntropyLoss().
O PyTorch espera receber os Logits puros (valores reais sem restrição). Internamente, ele aplica a função LogSoftmax combinada com a perda de forma numericamente estável através do truque Log-Sum-Exp, evitando que exponenciais muito grandes estourem para infinito ou valores pequenos virem zero!`
  },

  // Slide 11: Modelando Regressão: O Caso do Seguro Saúde
  {
    id: 11,
    type: 'custom',
    title: 'Modelando Regressão: O Caso do Seguro Saúde',
    subtitle: 'Atributos de entrada (X) e assimetria de cauda longa nos custos ($)',
    component: <InsuranceDistributionChart />,
    notes: `No nosso segundo problema prático, analisamos o dataset real de seguros de saúde.
Temos atributos numéricos como idade e índice de massa corporal, e categóricos como status de fumante. O alvo contínuo são as despesas médicas. Como a distribuição tem uma cauda longa de custos altíssimos para casos graves, a rede precisa ponderar adequadamente a escala dos erros.`
  },

  // Slide 12: Métricas Essenciais de Regressão
  {
    id: 12,
    type: 'custom',
    title: 'Métricas Essenciais de Regressão',
    subtitle: 'Construção geométrica de MAE, RMSE e Coeficiente R²',
    component: <RegressionMetricsChart />,
    notes: `Para avaliar regressão, a perda MSELoss serve para guiar o SGD, mas para o negócio precisamos de métricas interpretáveis:
O MAE expressa o erro médio direto em dólares: 'nosso modelo erra em média $2.500 para mais ou para menos'.
O RMSE penaliza fortemente erros grandes, servindo de alerta se houver previsões grotescas.
E o R² indica quanto da variabilidade dos custos médicos foi efetivamente capturada pela arquitetura (um R² de 0.85 indica 85% de variância explicada).`
  },

  // Slide 13: A Necessidade de Baselines Não-Triviais
  {
    id: 13,
    type: 'custom',
    title: 'A Necessidade de Baselines Não-Triviais',
    subtitle: 'Comprovando visualmente que a rede neural superou o chute ingênuo',
    component: <BaselineComparisonChart />,
    notes: `Uma exigência central do Projeto 1 e da prática científica de IA é o Baseline Não-Trivial.
Você nunca deve comemorar uma acurácia de 75% antes de saber qual é a proporção da classe majoritária. Se a classe mais frequente representa 75% dos dados, um modelo cego que responda sempre o mesmo valor atinge 75% sem aprender nada!
Da mesma forma, na regressão, sua rede neural precisa superar expressivamente o preditor da média global.`
  },

  // Slide 14: Quiz de Fixação
  {
    id: 14,
    type: 'custom',
    title: 'Quiz de Fixação: Pipelines & Modelagem Tabular',
    subtitle: 'Valide seu domínio sobre Data Leakage, DataLoaders e Funções de Perda',
    component: <QuizWidget />,
    notes: `Vamos testar nosso aprendizado!
Respondam às questões interativas na tela sobre as boas práticas de particionamento de dados, a configuração de mini-batches e os requisitos de camadas de saída para classificação e regressão.`
  },

  // Slide 15: Síntese da Aula & Conexão com o Projeto 1
  {
    id: 15,
    type: 'custom',
    title: 'Síntese da Aula & Conexão com o Projeto 1',
    subtitle: 'Fluxo completo de engenharia de dados e validação no PyTorch',
    component: <PipelineChecklistVisual />,
    notes: `Neste resumo, revisamos o checklist do Projeto 1 da disciplina:
Vocês já têm todo o conhecimento para importar dados reais, garantir que não há vazamento estatístico, criar classes de Dataset customizadas, iterar com DataLoaders e treinar redes neurais tanto para tarefas de classificação quanto de regressão, comparando com baselines!`
  },

  // Slide 16: Próximos Passos: Aula 04
  {
    id: 16,
    type: 'custom',
    title: 'Próximos Passos: Aula 04',
    subtitle: 'Estabilidade de Treinamento: Inicialização, Normalização & Dropout',
    component: <NextClassPreviewVisual />,
    notes: `Na nossa próxima aula — Aula 04 —, abriremos o capô das redes profundas para dominar a Estabilidade de Treinamento.
Veremos por que pesos aleatórios mal calibrados podem estagnar o gradiente, como inicializações científicas como Xavier e Kaiming He salvam o treino, e como camadas de BatchNorm1d e Dropout impedem o colapso e o sobreajuste. Parabéns a todos pelo empenho de hoje e até a próxima aula!`
  }
];
