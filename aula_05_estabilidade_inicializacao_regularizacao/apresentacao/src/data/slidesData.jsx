import React from 'react';
import { SymmetryCollapseVisualizer, SymmetryBreakingVisualizer } from '../components/interactive/SymmetryVisuals';
import WeightInitComparison from '../components/interactive/WeightInitComparison';
import CovariateShiftVisualizer from '../components/interactive/CovariateShiftVisualizer';
import TensorNormGeometryVisualizer from '../components/interactive/TensorNormGeometryVisualizer';
import TrainEvalModeVisualizer from '../components/interactive/TrainEvalModeVisualizer';
import CoadaptationVisualizer from '../components/interactive/CoadaptationVisualizer';
import DropoutAndSchedulerLab from '../components/interactive/DropoutAndSchedulerLab';
import IrisCaseStudyVisualizer from '../components/interactive/IrisCaseStudyVisualizer';
import QuizWidget from '../components/interactive/QuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Estabilidade de Treinamento: Inicializações, Normalizações e Regularização',
    subtitle: 'Aula 05 — A Física Interna do Treinamento Estável em PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa quinta aula de Redes Neurais Profundas!

Nas aulas anteriores, aprendemos a construir arquiteturas e estruturar pipelines de dados com Datasets e DataLoaders. Hoje, abriremos o capô da rede para entender a física interna do treinamento estável.

Por que redes profundas muitas vezes não convergem ou travam em platôs? Como a inicialização incorreta de pesos pode matar o fluxo do gradiente logo na primeira época? Qual é a diferença matemática e prática entre BatchNorm1d e LayerNorm? E como o Inverted Dropout impede o sobreajuste e a co-adaptação de neurônios?

Veremos esses conceitos de forma visual, intuitiva e prática, conectando os fundamentos teóricos com os laboratórios práticos da nossa disciplina. Vamos começar!`
  },

  // Slide 2: Custom - Symmetry Collapse
  {
    id: 2,
    type: 'custom',
    title: 'O Colapso de Simetria: O Desastre dos Pesos Nulos',
    subtitle: 'Por que inicializar W = 0 e b = 0 reduz 1.000 neurônios a apenas 1',
    component: <SymmetryCollapseVisualizer />,
    notes: `Vejam com atenção o visual interativo na tela. Em regressão linear simples com uma reta y = wx + b, começar com w = 0 funciona sem problemas. Porém, em uma rede neural profunda com camadas densas, pesos zerados causam o infame Colapso de Simetria.

Acompanhem os passos no simulador:
No Passo 1, todas as sinapses da camada intermediária partem de zero.
No Passo 2, realizamos o Forward Pass: para qualquer ponto de entrada (x₁, x₂), a combinação linear z = w₁x₁ + w₂x₂ dá sempre 0. A função de ativação, seja Sigmoid gerando 0.5 ou ReLU gerando 0, produz exatamente a mesma saída para h₁, h₂ e h₃. Todos os neurônios duplicam o mesmo sinal!
No Passo 3, entra o Backward Pass: a derivada da perda em relação a cada peso depende da saída do neurônio e do gradiente retropropagado. Como todos os neurônios da camada calcularam o mesmo valor e têm as mesmas conexões de saída, todos recebem RIGOROSAMENTE o mesmo gradiente!
No Passo 4, quando o otimizador aplica o gradiente descendente W ← W - η∇W, todos os pesos da camada são atualizados para um número idêntico. Eles nunca se diferenciam! Você poderia colocar 1.000 ou 10.000 neurônios nessa camada intermediária: a rede continuará agindo matematicamente como se tivesse apenas UM neurônio!`
  },

  // Slide 3: Custom - Symmetry Breaking
  {
    id: 3,
    type: 'custom',
    title: 'A Quebra de Simetria: Inicialização Calibrada',
    subtitle: 'Como o ruído estocástico controlado viabiliza detectores especializados',
    component: <SymmetryBreakingVisualizer />,
    notes: `Agora observem a contrapartida: a Quebra de Simetria através de inicialização com pequenas perturbações aleatórias.

No Passo 1, sorteamos pesos de uma distribuição gaussiana de média zero e variância controlada: alguns pesos são positivos, outros negativos, uns mais fortes e outros mais sutis.
No Passo 2, o Forward Pass já é imediatamente diversificado: cada neurônio projeta as entradas sob um ângulo geométrico distinto. O neurônio h₁ dispara forte para uma característica, enquanto h₂ pode ficar inibido e h₃ foca em outro aspecto.
No Passo 3, o Backward Pass retropropaga gradientes únicos para cada sinapse. Cada neurônio recebe uma 'ordem de ajuste' independente e especializada.
E reparem no Passo 4 no diagrama à direita: no espaço de features 2D, cada neurônio traça uma reta de corte diferente. Ao combinarmos as 3 retas na camada de saída, a rede consegue fechar um triângulo ou polígono convexo, separando classes não-lineares como as espécies do dataset Iris!
A inicialização aleatória quebra a simetria e destrava 100% do potencial representacional da sua arquitetura.`
  },

  // Slide 4: Formula - Xavier & He
  {
    id: 4,
    type: 'formula',
    title: 'A Matemática de Xavier e Kaiming He',
    subtitle: 'Calibrando a variância dos pesos para manter o fluxo de sinal estável',
    formula: 'Var(W)_{Xavier} = \\frac{2}{n_{in} + n_{out}}, \\qquad Var(W)_{He} = \\frac{2}{n_{in}}',
    variables: [
      { name: 'n_{in}', desc: 'Número de conexões de entrada (fan-in da camada).' },
      { name: 'n_{out}', desc: 'Número de neurônios de saída (fan-out da camada).' },
      { name: 'Xavier (Glorot)', desc: 'Ideal para funções lineares ou simétricas: Tanh e Sigmoid.' },
      { name: 'Kaiming He', desc: 'Desenvolvida para ReLU e LeakyReLU, compensando o fato de que metade das entradas vira zero.' }
    ],
    notes: `Para que o sinal não desapareça nem exploda ao atravessar dezenas de camadas, a variância das saídas deve ser igual à variância das entradas.
Xavier Glorot provou em 2010 que para Tanh e Sigmoid, a variância ótima é 2 dividido pela soma de fan-in e fan-out.
Mais tarde, em 2015, Kaiming He notou que a ReLU joga fora todas as ativações negativas (50% do sinal!), dividindo a variância por 2. Por isso, a inicialização He multiplica a escala por 2/fan-in para restabelecer o equilíbrio energético da rede!`
  },

  // Slide 5: Custom - WeightInitComparison
  {
    id: 5,
    type: 'custom',
    title: 'Comparador Interativo de Inicialização de Pesos',
    subtitle: 'Veja a distribuição das ativações através de 5 camadas profundas',
    component: <WeightInitComparison />,
    notes: `Experimentem este simulador interativo na tela.
Um ponto de atenção crucial: os números e barras na esquerda representam a VARIÂNCIA AMOSTRAL DAS ATIVAÇÕES Var(a), e NÃO o valor individual dos pesos. Os pesos em si — que vocês podem conferir na caixa de exemplos à direita — são variáveis aleatórias sem nenhuma ordem, flutuando livremente entre valores positivos e negativos com média zero.
O que Xavier e Kaiming He garantem é que a variância estatística dessas ativações permaneça equilibrada em torno de 1.0 ao longo das camadas (com pequenas flutuações amostrais normais), impedindo que o sinal exploda exponencialmente para centenas como na inicialização padrão N(0, 1) ou colapse a zero.`
  },

  // Slide 6: Custom - Covariate Shift Visualizer
  {
    id: 6,
    type: 'custom',
    title: 'O Fenômeno do Internal Covariate Shift',
    subtitle: 'Por que treinar redes profundas sem normalização é como mirar em um alvo móvel',
    component: <CovariateShiftVisualizer />,
    notes: `O conceito de Internal Covariate Shift descreve como a distribuição das entradas de uma camada profunda oscila continuamente enquanto as camadas anteriores estão aprendendo.
Vejam a demonstração interativa: na Etapa 1 e 2, observem a curva em vermelho se deslocando de época para época. A média salta de -1.8 para +4.2 e a variância se alarga. A camada seguinte nunca consegue consolidar seu aprendizado porque o chão sob os pés dela está sempre se movendo!
Na Etapa 3 e 4, ativamos a normalização: a curva é ancorada rigidamente em média 0 e desvio 1. Em seguida, os parâmetros aprendíveis gama (escala) e beta (deslocamento) devolvem flexibilidade representacional para a rede, garantindo convergência estável e muito mais rápida.`
  },

  // Slide 7: Custom - TensorNormGeometryVisualizer
  {
    id: 7,
    type: 'custom',
    title: 'BatchNorm1d vs. LayerNorm: Geometria dos Tensores',
    subtitle: 'Duas formas complementares de fatiar o tensor 2D [N Amostras × C Features]',
    component: <TensorNormGeometryVisualizer />,
    notes: `Prestem atenção na diferença geométrica fundamental entre as duas técnicas:
O BatchNorm1d faz um corte 'VERTICAL': ele pega uma mesma feature e calcula a média e desvio ao longo de todas as amostras do mini-batch. Por isso, o BatchNorm depende de um batch_size razoável (≥ 32) e precisa calcular médias móveis (running_mean) para usar na hora do teste.
Já o LayerNorm faz um corte 'HORIZONTAL': ele pega UMA única amostra isolada e calcula a média e desvio ao longo de todos os seus neurônios. Por isso o LayerNorm funciona perfeitamente mesmo com Batch Size = 1 e não precisa de running stats! É a escolha padrão absoluta em Transformers, processamento de linguagem e séries temporais.`
  },

  // Slide 8: Custom - TrainEvalModeVisualizer
  {
    id: 8,
    type: 'custom',
    title: 'O Modo Crucial: model.train() vs model.eval()',
    subtitle: 'A alternância de estado que previne os maiores bugs silenciosos em PyTorch',
    component: <TrainEvalModeVisualizer />,
    notes: `Esta é uma das fontes de bugs mais silenciosas e catastróficas em PyTorch.
Clique no botão 'model.train()' e depois em 'model.eval()':
No modo treino (train), o BatchNorm calcula médias do lote atual e atualiza running stats, enquanto o Dropout sorteia uma máscara Bernoulli apagando metade dos neurônios estocasticamente.
No modo avaliação (eval), o BatchNorm congela suas estatísticas móveis e o Dropout é COMPLETAMENTE DESLIGADO, passando o sinal intacto (y = x).
Se você esquecer de chamar model.eval() antes do teste, suas predições serão aleatórias porque o Dropout continuará apagando neurônios a cada clique!`
  },

  // Slide 9: Custom - CoadaptationVisualizer
  {
    id: 9,
    type: 'custom',
    title: 'O Que é Co-adaptação de Neurônios?',
    subtitle: 'Como o sobreajuste surge em um Perceptron Multicamadas (MLP)',
    component: <CoadaptationVisualizer />,
    notes: `Vejam na tela a arquitetura completa de um Perceptron de Múltiplas Camadas (MLP) com entradas, duas camadas ocultas densas e saída.
Na Aba 1, observem o fenômeno da Co-adaptação entre camadas: se um neurônio da Camada 1 comete um erro sistemático respondendo a um ruído do treino, os neurônios da Camada 2 ajustam suas sinapses para anular e mascarar exatamente esse erro. A rede cria uma teia frágil de dependência mútua entre camadas que decora o conjunto de treino, mas quebra no teste.
Agora cliquem na Aba 2 para ver o Dropout em ação nas múltiplas camadas: cliquem no botão de sortear nova sub-rede. Notem como a cada passo, diferentes neurônios da Camada 1 e da Camada 2 são desligados. Como a Camada 2 nunca sabe qual neurônio da Camada 1 estará presente, nenhum neurônio pode depender do colega! Cada unidade é forçada a extrair características robustas e autônomas. Além disso, essa rede com dropout equivale a treinar um comitê de até 2^(5+4) = 512 sub-redes distintas compartilhando parâmetros!`
  },

  // Slide 10: Formula - Inverted Dropout
  {
    id: 10,
    type: 'formula',
    title: 'A Matemática do Inverted Dropout',
    subtitle: 'Por que o PyTorch reescala os sinais durante o treinamento',
    formula: 'y = \\frac{m \\odot x}{1 - p}, \\qquad m \\sim \\text{Bernoulli}(1 - p)',
    variables: [
      { name: 'm', desc: 'Máscara binária onde cada elemento é 1 com probabilidade (1-p) e 0 com probabilidade p.' },
      { name: 'p', desc: 'Taxa de dropout (ex: p = 0.3 desliga 30% dos neurônios).' },
      { name: '1 / (1 - p)', desc: 'Fator de amplificação para compensar a energia dos neurônios desligados no treino.' },
      { name: 'Inferência sem Custo', desc: 'Na avaliação, o PyTorch não precisa multiplicar por nada (y = x direto).' }
    ],
    notes: `No Dropout tradicional proposto em 2012, no treino os neurônios eram desligados e no teste os pesos eram multiplicados por (1-p).
O PyTorch adota o Inverted Dropout: durante o treino, os neurônios que sobrevivem são imediatamente multiplicados por 1/(1-p).
Assim, o valor esperado da soma se mantém inalterado e, na hora da inferência em produção, não precisamos fazer absolutamente nenhuma operação extra!`
  },

  // Slide 11: Custom - DropoutAndSchedulerLab
  {
    id: 11,
    type: 'custom',
    title: 'Laboratório Interativo: Dropout & Generalização',
    subtitle: 'Ajuste a taxa de dropout e observe o fechamento do gap de overfitting',
    component: <DropoutAndSchedulerLab />,
    notes: `Neste laboratório interativo, arrastem o slider de taxa de dropout:
Com p = 0.00, notem a curva azul de treino despencando enquanto a curva tracejada de validação começa a subir: overfitting clássico e gap aberto.
Ajustem para p = 0.30 ou 0.40: vejam como as duas curvas convergem juntas para patamares saudáveis, fechando o gap de generalização.
Se exagerarem para p = 0.70, verão o underfitting: a rede perde capacidade de aprendizado e ambas as perdas ficam altas.`
  },

  // Slide 12: Custom - IrisCaseStudyVisualizer
  {
    id: 12,
    type: 'custom',
    title: 'Estudo de Caso: Classificação no Dataset Iris',
    subtitle: 'Comparando o impacto da estabilização na planilha e em código PyTorch',
    component: <IrisCaseStudyVisualizer />,
    notes: `Neste estudo de caso prático, unimos a planilha sem código ao rigor do notebook:
Na aba de Experimentos PyTorch, cliquem nos 3 botões para comparar as curvas de loss reais:
Sem normalização, a rede oscila e estagna com 86% de acurácia.
Com BatchNorm1d, a convergência é abrupta e a acurácia salta para 96%.
E combinando BatchNorm com Dropout de 0.3, atingimos 98.3% de acerto com generalização perfeita!
E na aba da Planilha simulacao_mlp_iris.xlsx, vocês podem inspecionar cada multiplicação matricial de uma MLP para flores de Iris sem escrever uma linha de código.`
  },

  // Slide 13: Custom - Quiz
  {
    id: 13,
    type: 'custom',
    title: 'Quiz de Fixação: Estabilidade e Regularização',
    subtitle: 'Teste seus conhecimentos sobre simetria de pesos, BatchNorm e Dropout',
    component: <QuizWidget />,
    notes: `Hora de verificar o domínio dos conceitos de hoje!
Respondam às perguntas interativas sobre a escolha entre Xavier e He, a operação de model.eval() com BatchNorm e a função do Inverted Dropout.`
  }
];
