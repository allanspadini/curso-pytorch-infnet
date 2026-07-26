export const slidesData = [
  {
    id: 1,
    type: 'title',
    title: 'Fundamentos de Deep Learning & Neurônio Artificial',
    subtitle: 'Aula 01: O Perceptron, Ativações e o Caso da Creatina',
    stage: 'Redes Neurais Profundas (Deep Learning e Visão Computacional)',
    institution: 'Faculdade Infnet',
    date: '2026-07-27',
    notes: 'Boas-vindas à nossa primeira aula! Hoje iniciaremos nossa jornada nos fundamentos do Deep Learning. Vamos entender a unidade básica de inteligência artificial, o Perceptron, suas equações matemáticas, por que ativá-lo com não-linearidades e aplicar estes conceitos na prática com um caso de estudo sobre consumo de creatina e rendimento esportivo.'
  },
  {
    id: 2,
    type: 'instructor',
    title: 'Apresentação do Professor',
    subtitle: 'Conheça quem estará com você nesta jornada',
    name: 'Allan Spadini',
    role: 'Professor & Pesquisador em IA',
    photo: '/allan_spadini.jpg',
    highlights: [
      { badge: 'DOUTORADO', title: 'Doutor em Geofísica', desc: 'Sólida formação quantitativa, modelagem física e matemática aplicada.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Pós em Ciência de Dados', desc: 'Especialista em análise estatística, aprendizado de máquina e dados massivos.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Desenvolvimento e pesquisa em agentes inteligentes.' }
    ],
    notes: 'Olá a todos! Deixem-me me apresentar rapidamente antes de começarmos nosso conteúdo. Meu nome é Allan Spadini, sou Doutor em Geofísica, tenho pós-graduação em Ciência de Dados e atuo como Pesquisador em Inteligência Artificial focado em agentes inteligentes. É um grande prazer estar com vocês nesta disciplina sobre Redes Neurais Profundas e PyTorch na Faculdade Infnet!'
  },
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Quatro blocos essenciais para dominar a fundação do Deep Learning',
    steps: [
      { num: '01', title: 'Perceptron & Decisão Linear', desc: 'Entradas, Pesos, Viés e a Geometria do espaço cartesiano.' },
      { num: '02', title: 'Funções de Ativação', desc: 'Sigmoid, Tanh, ReLU, Leaky ReLU e o combate ao desvanecimento do gradiente.' },
      { num: '03', title: 'Limitações & MLPs', desc: 'O histórico problema do XOR e a solução através de camadas ocultas.' },
      { num: '04', title: 'Planilha & Transição PyTorch', desc: 'Ajuste manual na planilha excel e introdução às abstrações do PyTorch.' }
    ],
    notes: 'Nossa aula está estruturada em 4 etapas lógicas. Começaremos com a matemática do Perceptron de um único neurônio. Em seguida, veremos como transformamos números brutos em probabilidades com funções de ativação. Depois entenderemos o porquê de precisarmos de redes multicamadas (MLP) para o problema do XOR, terminando com uma atividade na planilha e a transição para o PyTorch.'
  },
  {
    id: 4,
    type: 'custom',
    component: 'VennDiagram',
    title: 'O Universo da Inteligência Artificial',
    subtitle: 'Entendendo a hierarquia: IA vs Machine Learning vs Deep Learning',
    notes: 'Observem o diagrama interativo na tela. Inteligência Artificial é a grande área guarda-chuva. Machine Learning é um subconjunto focado em aprender estatisticamente a partir de dados. E o Deep Learning é o núcleo onde utilizamos arquiteturas profundas para aprender representações complexas automaticamente sem necessidade de feature engineering manual.'
  },
  {
    id: 5,
    type: 'comparison',
    title: 'ML Clássico vs. Deep Learning',
    subtitle: 'A revolução do aprendizado automático de representações',
    cardLeft: {
      badge: 'MACHINE LEARNING CLÁSSICO',
      title: 'Feature Engineering Manual',
      items: [
        'Engenheiros extraem características manualmente.',
        'Depende fortemente do conhecimento de domínio.',
        'Algoritmos simples (SVM, Random Forest, Regressão).',
        'Desempenho estagna em grandes volumes de dados.'
      ]
    },
    cardRight: {
      badge: 'DEEP LEARNING',
      title: 'Aprendizado Fim-a-Fim (End-to-End)',
      items: [
        'Dados brutos (pixels, texto, áudio) entram diretamente.',
        'Camadas ocultas aprendem representações abstratas.',
        'Escala massiva com grandes quantidades de dados e GPUs.',
        'Elimina a necessidade de extração manual de atributos.'
      ]
    },
    notes: 'A grande diferença do Deep Learning para o Machine Learning tradicional reside na extração de características. Em ML clássico, um especialista precisa extrair bordas ou estatísticas manualmente. Em Deep Learning, as primeiras camadas da rede aprendem sozinhas as bordas e formas geométricas mais relevantes.'
  },
  {
    id: 6,
    type: 'custom',
    component: 'BiologicalNeuronToggle',
    title: 'A Origem Biológica do Perceptron',
    subtitle: 'Clique nas partes do neurônio para ver a analogia entre biologia e matemática',
    notes: 'Em 1957, Frank Rosenblatt criou o Perceptron se inspirando diretamente na anatomia do neurônio humano biológico. Na tela, vocês podem clicar em cada estrutura do neurônio (Dendritos, Sinapses, Soma e Axônio) para entender como os impulsos elétricos foram traduzidos em equações matemáticas.'
  },
  {
    id: 7,
    type: 'flow',
    title: 'Fluxo de Processamento de um Neurônio',
    subtitle: 'As duas etapas internas essenciais de cálculo',
    steps: [
      { step: '1. Soma Ponderada (z)', formula: 'z = w₁x₁ + w₂x₂ + ... + wₙxₙ + b', desc: 'Combinação linear das entradas multiplicadas pelos pesos mais o viés.' },
      { step: '2. Ativação (ŷ)', formula: 'ŷ = f(z)', desc: 'Aplicação de uma função f(z) para decidir o nível de saída do neurônio.' }
    ],
    notes: 'Dentro de todo neurônio artificial acontecem rigorosamente duas etapas: primeiro, uma soma ponderada linear "z". Segundo, a aplicação de uma função de ativação "f(z)" que transforma o valor linear na saída predita y-chapéu.'
  },
  {
    id: 8,
    type: 'image-text',
    title: 'Caso Prático: O Problema da Creatina',
    subtitle: 'Classificando atletas de Alta Performance vs Regular',
    imageSrc: '/imagens/perceptron_aplicado.jpg',
    imageAlt: 'Perceptron Aplicado',
    bulletPoints: [
      'Entrada x₁: Consumo diário de Creatina (em gramas).',
      'Entrada x₂: Horas de Treino por semana.',
      'Saída y: Performance (1 = Alta Performance, 0 = Regular).',
      'Objetivo: Encontrar os pesos w₁, w₂ e o viés b que separem os atletas.'
    ],
    notes: 'Vamos aplicar essa teoria a um caso palpável de nutrição esportiva. Queremos prever se um atleta terá Alta Performance (1) ou Performance Regular (0) com base no consumo de Creatina (x1) e nas Horas de Treino por semana (x2).'
  },
  {
    id: 9,
    type: 'math-focus',
    title: 'A Equação da Decisão Linear',
    subtitle: 'Entendendo a geometria do Potencial Linear (z)',
    equation: 'z = w_1 x_1 + w_2 x_2 + b',
    explanations: [
      { term: 'z (Potencial)', desc: 'Valor numérico sem limite. Se z > 0, o neurônio tende à classe 1.' },
      { term: 'w₁, w₂ (Pesos)', desc: 'Determinam a inclinação da reta no gráfico cartesiano.' },
      { term: 'b (Viés / Bias)', desc: 'Permite deslocar a reta. Sem "b", a reta passaria obrigatoriamente pela origem (0,0).' }
    ],
    notes: 'Esta é a equação central da nossa reta de decisão z = w1*x1 + w2*x2 + b. Os pesos w1 e w2 definem a inclinação da reta no gráfico de Creatina por Treino. E o viés "b" é fundamental: sem ele, seríamos forçados a passar a reta na origem (0,0), o que impediria separar conjuntos de dados afastados do centro.'
  },
  {
    id: 10,
    type: 'custom',
    component: 'PerceptronSimulator',
    title: 'Simulador Interativo do Perceptron',
    subtitle: 'Ajuste os sliders de w₁, w₂ e b para encontrar a reta divisória perfeita!',
    notes: 'Agora é com vocês! Na tela temos o gráfico cartesiano com 12 atletas. Os pontos verdes são atletas de Alta Performance e os vermelhos são de Performance Regular. Ajustem os sliders de W1, W2 e Bias até a linha tracejada separar perfeitamente os dois grupos atingindo 100% de acurácia.'
  },
  {
    id: 11,
    type: 'math-focus',
    title: 'Necessidade de Probabilidades: A Função Sigmoid',
    subtitle: 'Convertendo a soma ponderada z para o intervalo de probabilidade [0, 1]',
    equation: '\\hat{y} = \\sigma(z) = \\frac{1}{1 + e^{-z}}',
    explanations: [
      { term: 'Intervalo [0, 1]', desc: 'Mapeia qualquer valor z entre -∞ e +∞ para um valor entre 0.0 (0%) e 1.0 (100%).' },
      { term: 'Regra de Decisão', desc: 'Se ŷ ≥ 0.5 (50%), classificamos como Alta Performance (1). Caso contrário, Regular (0).' },
      { term: 'Fronteira em z = 0', desc: 'Quando z = 0, a Sigmoid retorna exatamente σ(0) = 0.5.' }
    ],
    notes: 'A soma linear "z" pode dar valores como 45.2 ou -18.7. Para um problema de negócios ou saúde, precisamos de probabilidades. A função Sigmoid comprime qualquer número z para o intervalo [0, 1]. Se y-chapéu for maior ou igual a 0.5, classificamos como 1.'
  },
  {
    id: 12,
    type: 'custom',
    component: 'ActivationPlotter',
    title: 'Plotter Interativo da Sigmoid',
    subtitle: 'Arraste o slider de z e observe o achatamento da curva em S',
    notes: 'Usem este plotter interativo para arrastar o valor de z de -6 a +6. Reparem como para z muito negativo a probabilidade zera, e para z muito positivo a probabilidade aproxima-se de 1. No ponto central z = 0, a curva cruza exatamente em 0.5.'
  },
  {
    id: 13,
    type: 'math-focus',
    title: 'Por Que Precisamos de Não-Linearidades?',
    subtitle: 'O colapso matemático de redes profundas sem funções de ativação',
    equation: 'y = W_2 (W_1 x + b_1) + b_2 = (W_2 W_1) x + (W_2 b_1 + b_2) = W_{eq} x + b_{eq}',
    explanations: [
      { term: 'Colapso Linear', desc: 'Multiplicar matrizes lineares produz apenas outra matriz linear equivalente.' },
      { term: 'Rede de 100 Camadas', desc: 'Sem funções de ativação não-lineares, uma rede de 100 camadas é matematicamente idêntica a 1 único neurônio!' },
      { term: 'Poder de Representação', desc: 'Ativações atuam como "dobradiças" que curvam o espaço cartesiano.' }
    ],
    notes: 'Por que precisamos dessas funções? Se não usássemos nenhuma função de ativação entre as camadas, multiplicar pesos por pesos resultaria apenas numa combinação linear equivalente. Como demonstrado na equação, uma rede de 100 camadas sem ativação teria a exata mesma capacidade limitada de um único neurônio linear!'
  },
  {
    id: 14,
    type: 'custom',
    component: 'ActivationFunctionsGrid',
    title: 'Visão Geral das Funções de Ativação',
    subtitle: 'Comparativo dos 4 modelos fundamentais em gráficos vetoriais de alta resolução',
    notes: 'Neste slide comparativo vemos as quatro principais funções de ativação em gráficos vetoriais lado a lado: Sigmoid, Tanh, ReLU e Leaky ReLU. Reparem como a Sigmoid e Tanh saturam em valores extremos, enquanto a ReLU mantém o gradiente constante de 1.0 para z positivo.'
  },
  {
    id: 15,
    type: 'image-text',
    title: 'A Função ReLU (Rectified Linear Unit)',
    subtitle: 'A ativação mais popular do Deep Learning moderno',
    imageSrc: '/imagens/relu.png',
    imageAlt: 'ReLU',
    bulletPoints: [
      'Definição Matemática: f(z) = max(0, z).',
      'Se z ≤ 0, a saída é 0. Se z > 0, a saída é o próprio z.',
      'Derivada f\'(z): É igual a 0 para z < 0, e igual a 1.0 para z > 0.',
      'Gradiente constante igual a 1.0 evita o desvanecimento do gradiente.'
    ],
    notes: 'A ReLU é surpreendentemente simples: f(z) é max(0, z). Se for negativo vira zero, se for positivo mantém o valor. Observem a linha tracejada vermelha no gráfico: para qualquer z positivo, o gradiente da ReLU é exatamente 1.0!'
  },
  {
    id: 16,
    type: 'grid-cards',
    title: 'As 3 Vantagens Cruciais da ReLU',
    subtitle: 'Por que a ReLU desbancou a Sigmoid nas camadas ocultas?',
    cards: [
      { badge: '1. EFICIÊNCIA', title: 'Simplicidade Computacional', text: 'Exige apenas comparar if (z > 0), economizando bilhões de operações exponenciais pesadas em GPUs.' },
      { badge: '2. APRENDIZADO', title: 'Gradiente Constante (1.0)', text: 'Com derivada igual a 1.0 para z > 0, o sinal do erro flui sem atenuação no backpropagation, combatendo o Vanishing Gradient.' },
      { badge: '3. REPRESENTAÇÃO', title: 'Esparsidade de Ativação', text: 'Zera neurônios inativos (z ≤ 0), fazendo com que a rede ative apenas as características realmente relevantes.' }
    ],
    notes: 'São três motivos que fizeram a ReLU revolucionar o Deep Learning: 1. Velocidade em GPUs; 2. O gradiente constante de 1.0 que permite treinar redes de centenas de camadas sem o desvanecimento do gradiente; 3. Esparsidade de representação.'
  },
  {
    id: 17,
    type: 'comparison',
    title: 'Neurônio Morto & Leaky ReLU',
    subtitle: 'Superando a limitação da ReLU tradicional',
    cardLeft: {
      badge: 'PROBLEMA: DYING RELU',
      title: 'O Neurônio Morto',
      items: [
        'Se z for consistentemente negativo (z < 0), a saída será 0.',
        'O gradiente f\'(z) também torna-se 0.',
        'Com gradiente zero, os pesos NUNCA mais se atualizam.',
        'O neurônio fica "morto" permanentemente.'
      ]
    },
    cardRight: {
      badge: 'SOLUÇÃO: LEAKY RELU',
      title: 'Pequeno Vazamento (α = 0.1)',
      items: [
        'Formula: f(z) = max(0.1z, z).',
        'Para valores negativos, mantêm uma pequena inclinação (0.1).',
        'O gradiente para z < 0 passa a ser 0.1 em vez de zero.',
        'Permite que o neurônio continue aprendendo e se recupere.'
      ]
    },
    notes: 'Porém, a ReLU tem um ponto fraco: o "Neurônio Morto". Se a entrada for negativa, o gradiente zera e o neurônio para de aprender. A Leaky ReLU resolve isso introduzindo um pequeno vazamento (ex: 0.1z) para entradas negativas.'
  },
  {
    id: 18,
    type: 'custom',
    component: 'ActivationPlotter',
    title: 'Laboratório Interativo de Ativações',
    subtitle: 'Explore o comportamento e os gradientes de cada função em tempo real',
    notes: 'Neste laboratório vocês podem alternar entre as 4 funções de ativação, alterar a entrada z e observar simultaneamente o valor retornado e a derivada f\'(z).'
  },
  {
    id: 19,
    type: 'image-text',
    title: 'O Limite do Perceptron: O Problema do XOR',
    subtitle: 'Por que um único neurônio não resolve problemas não-lineares',
    imageSrc: '/imagens/problema_nao_linear.png',
    imageAlt: 'Problema Não Linear',
    bulletPoints: [
      'No gráfico da esquerda: Um Perceptron linear falha ao tentar separar o XOR com uma reta.',
      'Classes cruzadas em quadrantes não aceitam nenhuma linha reta sem cometer erros.',
      'Minsky & Papert (1969) provaram essa limitação, iniciando o primeiro "Inverno da IA".',
      'Solução: Adicionar camadas ocultas com funções de ativação não-lineares!'
    ],
    notes: 'Em 1969, Minsky e Papert provaram que o Perceptron de 1 camada não consegue resolver a função lógica XOR. Nenhuma reta consegue separar as duas classes cruzadas em quadrantes. Foi necessária a criação das redes multicamadas (MLP).'
  },
  {
    id: 20,
    type: 'custom',
    component: 'XorVisualizer',
    title: 'Curvando o Espaço: Solução Não-Linear',
    subtitle: 'Veja como a não-linearidade curva o espaço para resolver o XOR',
    notes: 'Observem a demonstração interativa na tela. No modo Linear (neurônio único), erramos metade dos pontos. Ao mudar para o modo MLP Não-Linear, a ativação curva o espaço cartesiano permitindo criar uma fronteira de decisão perfeita.'
  },
  {
    id: 21,
    type: 'custom',
    component: 'MlpNetworkDiagram',
    title: 'Redes Multi-Camadas (MLP)',
    subtitle: 'Multi-Layer Perceptron: Combinando neurônios em camadas',
    notes: 'Para resolver tarefas complexas, conectamos os neurônios em camadas: Camada de Entrada (x), Camada Oculta (h) e Camada de Saída (y). Cliquem no botão "Simular Propagação" para visualizar o fluxo dos dados pela rede.'
  },
  {
    id: 22,
    type: 'math-focus',
    title: 'Matemática da MLP: Camadas Ocultas e Saída',
    subtitle: 'Como as equações se encadeiam através das camadas',
    equation: 'h_1 = \\sigma(w_{11} x_1 + w_{21} x_2 + b_{h1}), \\quad \\hat{y} = \\sigma(v_1 h_1 + v_2 h_2 + b_o)',
    explanations: [
      { term: 'Camada Oculta (h₁, h₂)', desc: 'Cada neurônio oculto processa as mesmas entradas x, aprendendo sub-fronteiras de decisão independentes.' },
      { term: 'Camada de Saída (ŷ)', desc: 'Trata as saídas h₁ e h₂ como novas entradas e combina-as para gerar a decisão final.' }
    ],
    notes: 'Cada neurônio da camada oculta (h1 e h2) é um Perceptron completo. Ele processa as entradas x1 e x2. Em seguida, o neurônio da camada de saída pega o resultado de h1 e h2 e faz uma combinação final.'
  },
  {
    id: 23,
    type: 'grid-cards',
    title: 'Dinâmica com Planilha Excel',
    subtitle: 'Sentindo o ajuste dos pesos na prática (`simulacao_perceptron.xlsx`)',
    cards: [
      { badge: 'PASSO 1', title: 'Abrir a Planilha', text: 'Abram o arquivo simulacao_perceptron.xlsx na pasta da aula 1.' },
      { badge: 'PASSO 2', title: 'Alterar os Pesos', text: 'Modifiquem manualmente os valores de W₁, W₂ e Bias nas células destacadas.' },
      { badge: 'PASSO 3', title: 'Minimizar a Perda', text: 'Observem a Loss (Erro) despencar à medida que a reta se ajusta aos 20 atletas.' }
    ],
    notes: 'Preparamos uma planilha chamada simulacao_perceptron.xlsx. Nela vocês vão ajustar os pesos W1, W2 e Bias manualmente para ver a Loss cair a zero e entender o que o otimizador fará automaticamente.'
  },
  {
    id: 24,
    type: 'grid-cards',
    title: 'Transição para o PyTorch',
    subtitle: 'Do cálculo manual para o framework de Deep Learning',
    cards: [
      { badge: 'PILAR 1', title: 'Tensores (`torch.Tensor`)', text: 'Arrays multidimensionais otimizados para aceleração paralela em GPUs.' },
      { badge: 'PILAR 2', title: 'Autograd (`loss.backward()`)', text: 'Diferenciação automática que calcula todas as derivadas parciais instantaneamente.' },
      { badge: 'PILAR 3', title: 'Otimizadores (`torch.optim`)', text: 'Algoritmos como SGD e Adam que atualizam os pesos automaticamente sem ajuste manual.' }
    ],
    notes: 'No PyTorch, o ajuste manual da planilha é substituído por 3 pilares: Tensores em GPU, Autograd para calcular derivadas automaticamente e Otimizadores (como SGD e Adam) para ajustar os pesos.'
  },
  {
    id: 25,
    type: 'custom',
    component: 'QuizWidget',
    title: 'Quiz de Fixação & Próximos Passos',
    subtitle: 'Testem seus conhecimentos antes de abrir o Jupyter Notebook!',
    notes: 'Para fechar nossa apresentação com chave de ouro, respondam a estas 3 perguntas de fixação. Em seguida, abriremos o nosso Jupyter Notebook aula_01_introducao_deep_learning.ipynb para colocar a mão no código com PyTorch!'
  }
];
