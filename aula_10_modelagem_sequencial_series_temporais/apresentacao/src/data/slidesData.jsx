import React from 'react';
import RNNStepByStepSimulator from '../components/interactive/RNNStepByStepSimulator';
import RNNUnrolledStepDiagram from '../components/interactive/RNNUnrolledStepDiagram';
import RNNVanishingGradientSimulator from '../components/interactive/RNNVanishingGradientSimulator';
import DemandForecastingSimulator from '../components/interactive/DemandForecastingSimulator';
import SequentialQuizWidget from '../components/interactive/SequentialQuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Modelagem de Dados Sequenciais & Redes Recorrentes (RNNs)',
    subtitle: 'Aula 10 — Da Falência da Hipótese I.I.D. ao Desenrolamento Temporal no PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa décima aula de Redes Neurais Profundas!

Hoje iniciamos nosso módulo final: a modelagem de dados sequenciais e temporais.

Até agora, trabalhamos com dados tabulares e imagens sob a premissa de que cada amostra é independente das outras. Mas no mundo real — cotações financeiras, demanda de vendas, sinais de sensores médicos, áudio e linguagem natural —, a ordem temporal é tudo!

Veremos por que a hipótese estatística I.I.D. falha em séries temporais, aprenderemos o algoritmo de janelamento deslizante para transformar sequências em pares supervisionados sem vazamento de dados, dominaremos a convenção de tensores 3D no PyTorch e exploraremos a anatomia da Rede Neural Recorrente Básica (Vanilla RNN), seu estado oculto ht e por que ela sofre terrivelmente com o desaparecimento do gradiente ao longo do tempo. Vamos começar!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Séries temporais geofísicas, análise espectral e modelagem de ondas no tempo.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Modelos Sequenciais', desc: 'Redes recorrentes, LSTMs, GRUs e arquiteturas temporais profundas.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Previsão de séries temporais não-estacionárias de alta complexidade.' }
    ],
    notes: `Meu nome é Allan Spadini. Modelar o tempo é um dos maiores desafios matemáticos da computação. Hoje construiremos a base sólida para entender como redes neurais processam a dimensão temporal.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas para dominar dados sequenciais',
    steps: [
      { num: '01', title: 'A Quebra do I.I.D.', desc: 'Autocorrelação temporal e a proibição de embaralhamento aleatório.' },
      { num: '02', title: 'Janelamento Deslizante', desc: 'Técnica Sliding Window para gerar pares supervisionados (X, y).' },
      { num: '03', title: 'Tensores 3D no PyTorch', desc: 'A convenção batch_first=True: (batch, seq_len, features).' },
      { num: '04', title: 'A Vanilla RNN', desc: 'O estado oculto ht como memória de trabalho e recorrência.' },
      { num: '05', title: 'O Algoritmo BPTT', desc: 'Backpropagation Through Time e as raízes do Vanishing Gradient.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá:
Primeiro, a quebra da independência amostral em séries temporais.
Segundo, a conversão de séries contínuas em tensores pelo algoritmo de Janelamento Deslizante.
Terceiro, a manipulação de tensores tridimensionais no PyTorch.
Quarto, a mecânica matemática do estado oculto da Vanilla RNN.
E quinto, o algoritmo BPTT e a demonstração da causa do desaparecimento do gradiente.`
  },

  // Slide 4: Comparison - The IID Breakdown
  {
    id: 4,
    type: 'comparison',
    title: 'A Falência da Hipótese I.I.D.',
    subtitle: 'Independência e Idêntica Distribuição não se aplicam ao tempo',
    cardLeft: {
      badge: 'DADOS TABULARES / VISÃO',
      title: 'Hipótese I.I.D. Válida',
      bullets: [
        'A foto do gato hoje não depende da foto do gato de ontem.',
        'Embaralhar o dataset (shuffle=True) é uma excelente prática.',
        'A ordem das linhas no arquivo não carrega nenhuma informação física.'
      ]
    },
    cardRight: {
      badge: 'SÉRIES TEMPORAIS / SEQUÊNCIAS',
      title: 'Forte Autocorrelação Temporal',
      bullets: [
        'O valor no minuto t depende fortemente do valor no minuto t-1.',
        'Embaralhar as amostras (shuffle=True) destrói completamente a física do problema!',
        'A partição treino/teste DEVE ser rigorosamente cronológica.'
      ]
    },
    notes: `Em estatística, I.I.D. significa variáveis Independentes e Identicamente Distribuídas.
Em séries temporais, isso é falso! A temperatura de hoje está altamente correlacionada com a de ontem. Se você usar shuffle=True em uma série temporal, você estará usando o futuro para prever o passado — o vazamento temporal mais grave da IA.`
  },

  // Slide 5: Comparison - Why MLPs Fail for Time Series
  {
    id: 5,
    type: 'comparison',
    title: 'Por Que MLPs Falham em Sequências?',
    subtitle: 'Os três gargalos estruturais das redes totalmente conectadas para o tempo',
    cardLeft: {
      badge: 'RIGIDEZ DIMENSIONAL',
      title: 'Janela de Tamanho Estático',
      bullets: [
        'Uma MLP treinada para janela de 7 dias não pode receber 8 ou 10 dias.',
        'Não aceita sequências de comprimento variável.',
        'Cada passo temporal exige um conjunto totalmente separado de pesos lineares.'
      ]
    },
    cardRight: {
      badge: 'FALTA DE INVARIÂNCIA TEMPORAL',
      title: 'Incapacidade de Generalizar Padrões',
      bullets: [
        'Se um pico de demanda ocorrer no dia 2 em vez do dia 5, a MLP precisa reaprender tudo!',
        'Não possui o conceito de memória ou fluxo de estados contínuos.',
        'Explosão de parâmetros ao esticar sequências longas em vetores.'
      ]
    },
    notes: `Uma MLP padrão é rígida: seus pesos são estáticos e fixos para cada entrada.
Se você passar uma janela de 10 dias, a rede aprende pesos separados para o dia 1, dia 2, até dia 10. Se o mesmo padrão acontecer deslocado por dois dias, a MLP não percebe a semelhança! Precisamos de modelos que compreendam a passagem do tempo.`
  },

  // Slide 6: Custom - DemandForecastingSimulator
  {
    id: 6,
    type: 'custom',
    title: 'Simulador Interativo: Janelamento Deslizante',
    subtitle: 'Veja a conversão de uma série temporal contínua em tensores de treino e teste',
    component: <DemandForecastingSimulator />,
    notes: `Usem o simulador na tela.
Vocês podem alterar o tamanho da janela de lookback (ex: 4 passos) e ver a janela amarela deslizando pela série histórica.
Os pontos dentro da janela formam o vetor de entrada X, e o ponto imediatamente seguinte é o alvo y que a rede deve prever!`
  },

  // Slide 7: Formula - Sliding Window Algorithm
  {
    id: 7,
    type: 'formula',
    title: 'O Algoritmo de Janelamento Deslizante',
    subtitle: 'Criando pares supervisionados (X, y) preservando a seta do tempo',
    formula: 'X_t = [x_{t - w}, \\; x_{t - w + 1}, \\; \\dots, \\; x_{t - 1}], \\qquad y_t = x_t',
    variables: [
      { name: 'w', desc: 'Lookback Window (tamanho da janela de memória histórica).' },
      { name: 'X_t', desc: 'Sequência de passos passados usados como entrada da rede.' },
      { name: 'y_t', desc: 'Valor no passo t a ser previsto pelo modelo (horizonte de 1 passo à frente).' },
      { name: 'Divisão Temporal', desc: 'Treino: 70% primeiros meses; Validação: 15% seguintes; Teste: 15% finais.' }
    ],
    notes: `A técnica de Sliding Window é o algoritmo padrão que converte qualquer série temporal bruta em uma matriz de pares supervisionados (X, y).
Com janela w=12 em dados mensais, olhamos os 12 meses anteriores para prever o mês seguinte, avançando o relógio de passo em passo.`
  },

  // Slide 8: Comparison - 3D Tensors in PyTorch
  {
    id: 8,
    type: 'comparison',
    title: 'A Convenção de Tensores 3D no PyTorch',
    subtitle: 'batch_first=True: O padrão universal para redes sequenciais',
    cardLeft: {
      badge: 'FORMATO PADRÃO (batch_first=True)',
      title: 'Tensor (Batch, Seq_Len, Features)',
      bullets: [
        'Batch (Dimensão 0): número de janelas temporais por lote (ex: 32).',
        'Seq_Len (Dimensão 1): passos de tempo da sequência histórica (ex: 12 meses).',
        'Features (Dimensão 2): atributos medidos em cada passo (ex: 1 para univariado, ou N para multivariado).'
      ]
    },
    cardRight: {
      badge: 'RETORNOS DO PYTORCH',
      title: 'output, hn = rnn(x)',
      bullets: [
        'output: estados ocultos de TODOS os passos temporais (Batch, Seq_Len, Hidden_Dim).',
        'hn: último estado oculto final do último passo (1, Batch, Hidden_Dim).',
        'Para prever o próximo passo (Many-to-One), usamos hn ou output[:, -1, :].'
      ]
    },
    notes: `Memorizem a convenção batch_first=True no PyTorch:
O tensor de entrada é sempre tridimensional: (Lote, Passos no Tempo, Quantidade de Atributos).
Ao chamar output, hn = model(x), a variável hn contém o estado oculto consolidado no último instante da sequência, perfeito para passar em uma camada densa e gerar a previsão!`
  },

  // Slide 9: Formula - Vanilla RNN Core Equation
  {
    id: 9,
    type: 'formula',
    title: 'A Equação Central da Vanilla RNN',
    subtitle: 'A fusão da nova observação com a memória do passo anterior',
    formula: 'h_t = \\tanh(W_{ih} x_t + W_{hh} h_{t-1} + b_{ih} + b_{hh})',
    variables: [
      { name: 'x_t', desc: 'Vetor de atributos de entrada no instante atual t.' },
      { name: 'h_{t-1}', desc: 'Estado oculto herdado do instante imediatamente anterior (a memória acumulada).' },
      { name: 'W_{ih}, W_{hh}', desc: 'Matrizes de pesos aprendidas (conexão entrada-oculto e oculto-oculto).' },
      { name: '\\tanh', desc: 'Função de ativação não-linear que comprime os valores de memória entre -1 e +1.' }
    ],
    notes: `Esta é a equação que define uma Rede Neural Recorrente!
No instante t, a rede recebe o novo dado x_t e a memória passada h_{t-1}.
Ela calcula uma soma ponderada de ambos, aplica a tangente hiperbólica e gera o novo estado de memória h_t. É exatamente como um cérebro humano que junta o que acabou de ver com o que já sabia!`
  },

  // Slide 10: Custom - RNNStepByStepSimulator
  {
    id: 10,
    type: 'custom',
    title: 'Simulador Interativo: O Passo a Passo da Recorrência',
    subtitle: 'Altere as entradas e veja como o estado oculto ht evolui ao longo do tempo',
    component: <RNNStepByStepSimulator />,
    notes: `Neste simulador na tela, vocês podem clicar em 'Avançar Passo'.
Vejam como a cada novo instante de tempo t, o vetor h_{t-1} é realimentado na célula junto com a nova entrada x_t. A memória vai sendo continuamente sintetizada e atualizada.`
  },

  // Slide 11: Comparison - Parameter Sharing in Time
  {
    id: 11,
    type: 'comparison',
    title: 'Compartilhamento de Pesos no Tempo',
    subtitle: 'A mesma regra de transição aplicada de t = 1 até t = T',
    cardLeft: {
      badge: 'ECONOMIA DE PESOS',
      title: 'Matriz Whh Universal',
      bullets: [
        'A mesma matriz Whh é reutilizada em absolutamente todos os passos de tempo.',
        'Se a sequência tiver 10 passos ou 1.000 passos, o número de parâmetros é idêntico!',
        'Invariância temporal: se um padrão atrasar 3 dias, a regra de detecção funciona igual.'
      ]
    },
    cardRight: {
      badge: 'ANALOGIA COM CNNS',
      title: 'Filtro Convolucional no Tempo',
      bullets: [
        'Assim como um kernel convolucional varre o espaço 2D com pesos compartilhados...',
        '...a RNN varre o tempo 1D com matrizes recorrentes compartilhadas!',
        'Permite processar sequências de qualquer tamanho sem mudar o modelo.'
      ]
    },
    notes: `A grande elegância da RNN é que as matrizes de pesos W_ih e W_hh não mudam de um passo para outro.
A mesma regra de atualização é aplicada no passo 1, no passo 2 e no passo 100. Isso garante que a rede aprenda a física geral da transição temporal sem precisar de novos pesos para cada dia do calendário.`
  },

  // Slide 12: Custom - RNNUnrolledStepDiagram
  {
    id: 12,
    type: 'custom',
    title: 'Visualizador Interativo: O Grafo Desenrolado no Tempo',
    subtitle: 'Desenrole a recorrência em uma cadeia computacional horizontal (Unrolling)',
    component: <RNNUnrolledStepDiagram />,
    notes: `Vejam o diagrama interativo na tela.
Uma rede recorrente é, na verdade, uma rede muito profunda desenrolada na horizontal!
Cada passo temporal funciona como se fosse uma camada de uma rede profunda. Se temos 50 passos temporais, é o equivalente a treinar uma rede de 50 camadas em cascata!`
  },

  // Slide 13: Formula - BPTT Algorithm
  {
    id: 13,
    type: 'formula',
    title: 'O Algoritmo BPTT (Backpropagation Through Time)',
    subtitle: 'A propagação reversa do erro através de toda a história da sequência',
    formula: '\\frac{\\partial L_t}{\\partial W_{hh}} = \\sum_{k=1}^{t} \\frac{\\partial L_t}{\\partial h_t} \\left( \\prod_{j=k+1}^{t} \\frac{\\partial h_j}{\\partial h_{j-1}} \\right) \\frac{\\partial h_k}{\\partial W_{hh}}',
    variables: [
      { name: 'L_t', desc: 'Perda calculada na predição do passo temporal t.' },
      { name: '\\prod \\frac{\\partial h_j}{\\partial h_{j-1}}', desc: 'Produto em cadeia de derivadas parciais do estado oculto através de todos os passos intermediários.' },
      { name: '\\frac{\\partial h_j}{\\partial h_{j-1}} = W_{hh}^T \\cdot \\text{diag}(1 - h_j^2)', desc: 'Matriz Jacobiana que multiplica o peso Whh repetidamente a cada passo retrocedido.' }
    ],
    notes: `Esta equação revela a maior fraqueza da Vanilla RNN.
Para saber quanto o peso W_hh deve ser ajustado para diminuir o erro no final da sequência, precisamos retroceder no tempo multiplicando a matriz Jacobiana passo a passo.
Esse produtório contínuo é o calcanhar de Aquiles das redes recorrentes básicas!`
  },

  // Slide 14: Custom - RNNVanishingGradientSimulator
  {
    id: 14,
    type: 'custom',
    title: 'Simulador Interativo: Desaparecimento do Gradiente no Tempo',
    subtitle: 'Veja o gradiente encolher exponencialmente conforme recua do passo T até o passo 1',
    component: <RNNVanishingGradientSimulator />,
    notes: `Experimentem o simulador na tela.
Vejam a barra de força do gradiente no instante T: ela começa cheia e potente.
Conforme o algoritmo retrocede pelos passos anteriores, o gradiente vai diminuindo exponencialmente. Ao chegar no início da sequência, o gradiente vale 0.00001! A rede é incapaz de aprender memórias de longo prazo.`
  },

  // Slide 15: Comparison - Why Vanilla RNN Collapses
  {
    id: 15,
    type: 'comparison',
    title: 'O Colapso da Memória na Vanilla RNN',
    subtitle: 'A barreira matemática que impediu o avanço de séries longas por décadas',
    cardLeft: {
      badge: 'SE AUTOVALORES DE Whh < 1',
      title: 'Vanishing Gradients Exponencial',
      bullets: [
        'Multiplicações sucessivas por números menores que 1 levam o sinal a zero.',
        'A derivada da tanh é sempre menor ou igual a 1.0, agravando o decaimento.',
        'A rede esquece completamente tudo o que aconteceu há mais de 10 passos atrás.'
      ]
    },
    cardRight: {
      badge: 'SE AUTOVALORES DE Whh > 1',
      title: 'Exploding Gradients Incontrolável',
      bullets: [
        'Multiplicações sucessivas explodem os gradientes para valores gigantescos.',
        'Provoca instabilidade numérica imediata e perda transformando-se em NaN.',
        'Necessidade de arquiteturas especializadas com rodovias lineares protegidas!'
      ]
    },
    notes: `Se os maiores autovalores da matriz W_hh forem menores que 1, a norma do gradiente desvanece exponencialmente para zero.
Se forem maiores que 1, ela explode para infinito!
Por causa desse gargalo matemático, a Vanilla RNN só consegue lembrar de 5 a 10 passos recentes. Para sequências de longo prazo, precisaremos de células com portões de proteção!`
  },

  // Slide 16: Custom - Quiz
  {
    id: 16,
    type: 'custom',
    title: 'Quiz de Fixação: Séries Temporais & RNNs',
    subtitle: 'Teste seus conhecimentos sobre o IID, tensores 3D, unrolling e BPTT',
    component: <SequentialQuizWidget />,
    notes: `Vamos testar nosso domínio sobre o tempo!
Respondam às questões interativas sobre a ordem das dimensões em tensores 3D, o compartilhamento de pesos e as causas do desaparecimento de gradiente no algoritmo BPTT.`
  },

  // Slide 17: Roadmap - Synthesis of Lesson 10
  {
    id: 17,
    type: 'roadmap',
    title: 'Síntese da Aula 10',
    subtitle: 'Os fundamentos da modelagem sequencial dominados',
    steps: [
      { num: '01', title: 'Ordem Cronológica', desc: 'Divisão estrita sem shuffle para preservar a seta causal do tempo.' },
      { num: '02', title: 'Sliding Window', desc: 'Conversão algorítmica de séries contínuas em tensores supervisionados.' },
      { num: '03', title: 'Estado Oculto', desc: 'ht como vetor dinâmico de memória compartilhada ao longo do tempo.' },
      { num: '04', title: 'O Limite da Vanilla RNN', desc: 'Compreensão matemática exata de por que precisamos de células LSTM e GRU.' }
    ],
    notes: `Neste resumo, fechamos a fundação conceitual:
Vocês agora compreendem por que o tempo exige ferramentas específicas, como fatiar séries em tensores 3D e exatamente por que a Vanilla RNN perde fôlego em sequências longas.`
  },

  // Slide 18: Next Steps
  {
    id: 18,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 11 (Encerramento)',
    subtitle: 'Arquiteturas com Portões (LSTM & GRU), Engenharia Cíclica e Estudo de Caso 3',
    steps: [
      { num: '01', title: 'A Célula LSTM', desc: 'Os 3 portões (Forget, Input, Output) e a rodovia linear do Cell State.' },
      { num: '02', title: 'A Unidade GRU', desc: 'Economia de 25% de parâmetros e convergência acelerada.' },
      { num: '03', title: 'Features Cíclicas', desc: 'Codificação contínua de horas e meses com funções seno e cosseno.' },
      { num: '04', title: 'Gabarito Estudo de Caso 3', desc: 'Previsão de temperatura em Jena Climate e entrega final do Projeto 2.' }
    ],
    notes: `Na nossa décima primeira e última aula — Aula 11 —, resolveremos o problema do desaparecimento de gradiente através das lendárias células LSTM e GRU!
Veremos a engenharia de variáveis cíclicas com seno e cosseno, aplicaremos Gradient Clipping e resolveremos o Estudo de Caso 3 (Jena Climate). Até a nossa aula final!`
  }
];
