import React from 'react';
import DataLeakageSimulator from '../components/interactive/DataLeakageSimulator';
import DataLoaderShuffleVisualizer from '../components/interactive/DataLoaderShuffleVisualizer';
import MlpForwardSimulator from '../components/interactive/MlpForwardSimulator';
import QuizWidget from '../components/interactive/QuizWidget';

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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Sólida base quantitativa, modelagem física e matemática aplicada.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Ciência de Dados e IA', desc: 'Especialista em análise estatística, aprendizado profundo e Big Data.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Desenvolvimento e arquitetura de redes neurais e agentes inteligentes.' }
    ],
    notes: `Para quem está ingressando agora, meu nome é Allan Spadini. Minha formação é focada em modelagem matemática e física, com atuação contínua em pesquisa de IA. Nesta aula, nosso foco é 100% aplicado à engenharia de dados e modelagem prática com PyTorch, preparando a base exata exigida no Projeto 1 da disciplina.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas estratégicas para dominar pipelines supervisionados',
    steps: [
      { num: '01', title: 'Integridade & Leakage', desc: 'Prevenção de contaminação estatística antes do split.' },
      { num: '02', title: 'Dataset & DataLoader', desc: 'A anatomia do carregador de dados oficial do PyTorch.' },
      { num: '03', title: 'Batching & Shuffle', desc: 'Mini-batches estocásticos e paralelismo com workers.' },
      { num: '04', title: 'Classificação Multiclasse', desc: 'Modelagem com CrossEntropyLoss no dataset de E-commerce.' },
      { num: '05', title: 'Regressão Contínua', desc: 'Modelagem com MSELoss e métricas MAE, RMSE e R² (Insurance).' }
    ],
    notes: `Nosso roteiro de 90 minutos está dividido em 5 etapas claras:
Primeiro, o conceito vital de integridade de dados e prevenção de Data Leakage.
Segundo, a criação de classes customizadas herdadas de torch.utils.data.Dataset.
Terceiro, a configuração otimizada do DataLoader com mini-batches e embaralhamento estocástico.
Quarto, a implementação prática de classificação multiclasse com CrossEntropyLoss.
E quinto, a modelagem de regressão com MSELoss e avaliação por MAE, RMSE e R².`
  },

  // Slide 4: Comparison - The Golden Rule of Splitting
  {
    id: 4,
    type: 'comparison',
    title: 'A Regra de Ouro do Particionamento',
    subtitle: 'Evitando contaminação estatística entre treino, validação e teste',
    cardLeft: {
      badge: 'ERRO COMUM: LEAKAGE',
      title: 'Normalizar Antes de Dividir',
      bullets: [
        'Calcular média (μ) e desvio (σ) sobre TODO o dataset.',
        'A informação do teste contamina as amostras de treino.',
        'Resulta em perda artificialmente baixa durante o desenvolvimento.',
        'Falha catastrófica quando o modelo entra em produção real.'
      ]
    },
    cardRight: {
      badge: 'PRÁTICA PROFISSIONAL',
      title: 'Split Estrito Primeiro',
      bullets: [
        'Dividir os dados: 70% Treino, 15% Validação, 15% Teste.',
        'Ajustar os escaladores (.fit_transform) APENAS no Treino.',
        'Aplicar (.transform) estritamente na Validação e no Teste.',
        'Garante avaliação cega, realista e sem contaminação.'
      ]
    },
    notes: `Prestem muita atenção neste slide, pois este é um dos erros mais frequentes na indústria.
Se você normalizar todo o seu conjunto de dados antes de dividi-lo em treino e teste, o desvio padrão e a média global do conjunto de teste estarão vazando para o conjunto de treino!
A regra é taxativa: primeiro separamos os conjuntos. Depois, calculamos a média e o desvio padrão exclusivamente sobre o conjunto de treino (.fit_transform) e simplesmente usamos esses parâmetros fixos para transformar validação e teste (.transform).`
  },

  // Slide 5: Custom - Data Leakage Simulator
  {
    id: 5,
    type: 'custom',
    title: 'Simulador Interativo: Detecção de Data Leakage',
    subtitle: 'Compare o comportamento do modelo com vs. sem vazamento de dados',
    component: <DataLeakageSimulator />,
    notes: `Utilizem o simulador interativo na tela.
Vocês podem alternar entre a abordagem Ingênua (com Data Leakage) e a abordagem Profissional (com Isolamento Estrito).
Notem como o Data Leakage mascara o verdadeiro desempenho, gerando um gap inesperado quando o modelo enfrenta dados verdadeiramente inéditos. Com o pipeline isolado, o comportamento em teste reflete a realidade operacional.`
  },

  // Slide 6: Flow - Dataset PyTorch Anatomy
  {
    id: 6,
    type: 'roadmap',
    title: 'Anatomia da Classe Dataset',
    subtitle: 'Como o PyTorch padroniza o acesso aos dados em memória ou disco',
    steps: [
      { num: '01', title: '__init__(self, X, y)', desc: 'Recebe os tensores convertidos e armazena os atributos e rótulos.' },
      { num: '02', title: '__len__(self)', desc: 'Retorna a quantidade total de amostras disponíveis: return len(self.X).' },
      { num: '03', title: '__getitem__(self, idx)', desc: 'Indexação direta: recupera o par (amostra_x, alvo_y) na posição idx.' }
    ],
    notes: `No ecossistema PyTorch, todo dataset é representado por uma classe que herda de torch.utils.data.Dataset.
Ela precisa implementar apenas 3 métodos:
O __init__, onde guardamos nossos tensores em memória;
O __len__, que responde quantas linhas temos no total;
E o __getitem__, que recebe um índice inteiro e devolve o par (X, y) correspondente. Com esses 3 métodos, o PyTorch ganha o poder de iterar e fatiar qualquer tipo de dado.`
  },

  // Slide 7: Comparison - DataLoader & Batching
  {
    id: 7,
    type: 'comparison',
    title: 'O Papel Estratégico do DataLoader',
    subtitle: 'Por que não treinamos com o dataset inteiro de uma só vez?',
    cardLeft: {
      badge: 'BATCH GRADIENT DESCENT',
      title: 'Passar Tudo de Uma Vez',
      bullets: [
        'Exige memória RAM/VRAM gigantesca para carregar tudo.',
        'Calcula um único gradiente por época completa.',
        'Convergência extremamente lenta em vales planos.',
        'Fácil de ficar preso em mínimos locais ou pontos de sela.'
      ]
    },
    cardRight: {
      badge: 'MINI-BATCH SGD',
      title: 'DataLoader com Mini-Batches',
      bullets: [
        'Divide os dados em lotes (ex: 32, 64, 128 amostras).',
        'Atualiza os pesos dezenas de vezes a cada época.',
        'O ruído estocástico ajuda a escapar de mínimos locais.',
        'shuffle=True no treino evita viés de ordem de classes.'
      ]
    },
    notes: `Por que utilizamos o DataLoader em vez de alimentar tensores gigantescos na GPU?
Primeiro: economia de memória. Em datasets de milhões de linhas ou imagens de alta resolução, carregar tudo de uma vez estoura a memória.
Segundo: dinâmica do gradiente. Atualizar os pesos após cada mini-batch introduz um ruído estocástico saudável que auxilia a rede a escapar de vales planos e mínimos locais rasos!`
  },

  // Slide 8: Custom - DataLoader Shuffle Visualizer
  {
    id: 8,
    type: 'custom',
    title: 'Visualizador Interativo: O Efeito do Shuffle',
    subtitle: 'Observe a distribuição das classes por mini-batch a cada nova época',
    component: <DataLoaderShuffleVisualizer />,
    notes: `Neste simulador, observem como o parâmetro shuffle=True altera a composição dos lotes.
Se shuffle=False, lotes inteiros podem conter apenas amostras de uma mesma categoria, enviesando o cálculo dos gradientes daquela iteração. Com shuffle=True, cada batch recebe uma amostra representativa e equilibrada da população.`
  },

  // Slide 9: Custom - MLP Forward Simulator
  {
    id: 9,
    type: 'custom',
    title: 'Simulador do Forward Pass Tabular',
    subtitle: 'Acompanhe a propagação dos atributos pelas camadas lineares e ativações',
    component: <MlpForwardSimulator />,
    notes: `Aqui temos o fluxo direto de dados (Forward Pass) em ação.
Os atributos normalizados entram pela camada de entrada, sofrem combinações lineares ponderadas pelos pesos w, são ativados por funções não-lineares (como ReLU) e chegam na camada de saída com o resultado predito.`
  },

  // Slide 10: Comparison - Classification vs Regression
  {
    id: 10,
    type: 'comparison',
    title: 'Classificação vs. Regressão em PyTorch',
    subtitle: 'Ajustando a camada de saída e a função de custo para cada tarefa',
    cardLeft: {
      badge: 'CLASSIFICAÇÃO MULTICLASSE',
      title: 'E-commerce Satisfaction (3 Classes)',
      bullets: [
        'Camada de saída: nn.Linear(hidden_dim, 3).',
        'Saída bruta: Logits reais (sem Softmax manual).',
        'Função de Perda: nn.CrossEntropyLoss().',
        'Métricas: Acurácia, Precision, Recall e Matriz de Confusão.'
      ]
    },
    cardRight: {
      badge: 'REGRESSÃO CONTÍNUA',
      title: 'Custos Médicos de Seguros (Insurance)',
      bullets: [
        'Camada de saída: nn.Linear(hidden_dim, 1).',
        'Saída bruta: Escalar contínuo em dólares ($).',
        'Função de Perda: nn.MSELoss() ou nn.HuberLoss().',
        'Métricas: MAE, RMSE e Coeficiente R².'
      ]
    },
    notes: `Comparem lado a lado os dois grandes paradigmas da modelagem tabular supervisionada:
Em classificação multiclasse, nossa saída possui o mesmo número de neurônios que o número de classes (3 classes: Low, Medium, High). Usamos CrossEntropyLoss, que internamente combina LogSoftmax com NLLLoss.
Em regressão contínua, nossa saída tem dimensão 1, pois prevê um valor numérico direto. Usamos MSELoss para calcular o erro quadrático médio.`
  },

  // Slide 11: Formula - CrossEntropyLoss
  {
    id: 11,
    type: 'formula',
    title: 'A Matemática da Entropia Cruzada',
    subtitle: 'Por que o PyTorch não utiliza Softmax explícito na última camada',
    formula: '\\mathcal{L}_{CE} = -\\sum_{c=1}^{C} y_c \\log(\\hat{p}_c) = -\\log\\left(\\frac{e^{z_y}}{\\sum_j e^{z_j}}\\right)',
    variables: [
      { name: 'y_c', desc: 'Rótulo verdadeiro em one-hot (1 para a classe correta, 0 para as demais).' },
      { name: '\\hat{p}_c', desc: 'Probabilidade estimada pela rede para a classe c.' },
      { name: 'z_y', desc: 'Logit bruto gerado pela camada linear final para a classe correta.' },
      { name: 'Estabilidade Numérica', desc: 'O PyTorch usa o Log-Sum-Exp trick para evitar underflow numérico de exponenciais.' }
    ],
    notes: `Uma dica de ouro em PyTorch: nunca coloque uma camada nn.Softmax() no final da sua rede se for usar nn.CrossEntropyLoss().
O PyTorch espera receber os Logits puros (valores reais sem restrição). Internamente, ele aplica a função LogSoftmax combinada com a perda de forma numericamente estável através do truque Log-Sum-Exp, evitando que exponenciais muito grandes estourem para infinito ou valores pequenos virem zero!`
  },

  // Slide 12: Comparison - Insurance Regression Features
  {
    id: 12,
    type: 'comparison',
    title: 'Modelando Regressão: O Caso do Seguro Saúde',
    subtitle: 'Prevendo custos anuais de pacientes a partir de características biométricas',
    cardLeft: {
      badge: 'ATRIBUTOS DE ENTRADA (X)',
      title: 'Variáveis Demográficas & Saúde',
      bullets: [
        'Idade (Age) e Índice de Massa Corporal (BMI).',
        'Número de Dependentes (Children).',
        'Fumante ou Não Fumante (Smoker: yes/no).',
        'Região geográfica (Northeast, Northwest, etc.).'
      ]
    },
    cardRight: {
      badge: 'VARIÁVEL ALVO (Y)',
      title: 'Despesas Médicas em Dólares ($)',
      bullets: [
        'Distribuição altamente assimétrica com cauda longa à direita.',
        'Média de ~$13.270, mas com pacientes ultrapassando $60.000.',
        'Exige normalização rigorosa das features de entrada.',
        'Penalização quadrática (MSE) para erros graves de subestimação.'
      ]
    },
    notes: `No nosso segundo problema prático, analisamos o dataset real de seguros de saúde.
Temos atributos numéricos como idade e índice de massa corporal, e categóricos como status de fumante. O alvo contínuo são as despesas médicas. Como a distribuição tem uma cauda longa de custos altíssimos para casos graves, a rede precisa ponderar adequadamente a escala dos erros.`
  },

  // Slide 13: Formula - Regression Metrics
  {
    id: 13,
    type: 'formula',
    title: 'Métricas Essenciais de Regressão',
    subtitle: 'Avaliando a qualidade de predição além da função de perda de treino',
    formula: 'MAE = \\frac{1}{N}\\sum |y - \\hat{y}|, \\quad RMSE = \\sqrt{\\frac{1}{N}\\sum (y - \\hat{y})^2}, \\quad R^2 = 1 - \\frac{\\sum (y - \\hat{y})^2}{\\sum (y - \\bar{y})^2}',
    variables: [
      { name: 'MAE', desc: 'Erro Médio Absoluto: magnitude média do erro na mesma unidade ($).' },
      { name: 'RMSE', desc: 'Raiz do Erro Quadrático Médio: penaliza erros desproporcionais e outliers.' },
      { name: 'R²', desc: 'Coeficiente de Determinação: percentual da variância dos dados explicada pelo modelo.' }
    ],
    notes: `Para avaliar regressão, a perda MSELoss serve para guiar o SGD, mas para o negócio precisamos de métricas interpretáveis:
O MAE expressa o erro médio direto em dólares: 'nosso modelo erra em média $2.500 para mais ou para menos'.
O RMSE penaliza fortemente erros grandes, servindo de alerta se houver previsões grotescas.
E o R² indica quanto da variabilidade dos custos médicos foi efetivamente capturada pela arquitetura (um R² de 0.85 indica 85% de variância explicada).`
  },

  // Slide 14: Comparison - The Non-Trivial Baseline
  {
    id: 14,
    type: 'comparison',
    title: 'A Necessidade de Baselines Não-Triviais',
    subtitle: 'Como provar cientificamente que sua rede neural realmente aprendeu',
    cardLeft: {
      badge: 'BASELINE EM CLASSIFICAÇÃO',
      title: 'Preditor Majoritário (Dummy)',
      bullets: [
        'Chutar sempre a classe mais comum no dataset.',
        'Exemplo: Se 70% dos clientes são satisfeitos, acurácia baseline = 70%.',
        'Se sua rede obtiver 72%, ela quase não superou o chute ingênuo!',
        'Exige cálculo de Precision, Recall e ganho sobre a classe majoritária.'
      ]
    },
    cardRight: {
      badge: 'BASELINE EM REGRESSÃO',
      title: 'Preditor da Média Global',
      bullets: [
        'Chutar sempre a média aritmética das despesas (ȳ).',
        'Por definição matemática, o preditor da média tem R² = 0.0.',
        'Se o modelo obtiver R² ≤ 0, ele é pior do que uma régua fixa!',
        'Sua rede deve apresentar MAE e RMSE substancialmente inferiores à média.'
      ]
    },
    notes: `Uma exigência central do Projeto 1 e da prática científica de IA é o Baseline Não-Trivial.
Você nunca deve comemorar uma acurácia de 75% antes de saber qual é a proporção da classe majoritária. Se a classe mais frequente representa 75% dos dados, um modelo cego que responda sempre o mesmo valor atinge 75% sem aprender nada!
Da mesma forma, na regressão, sua rede neural precisa superar expressivamente o preditor da média global.`
  },

  // Slide 15: Custom - Quiz
  {
    id: 15,
    type: 'custom',
    title: 'Quiz de Fixação: Pipelines & Modelagem Tabular',
    subtitle: 'Teste seus conhecimentos sobre Data Leakage, DataLoaders e Funções de Perda',
    component: <QuizWidget />,
    notes: `Vamos testar nosso aprendizado!
Respondam às questões interativas na tela sobre as boas práticas de particionamento de dados, a configuração de mini-batches e os requisitos de camadas de saída para classificação e regressão.`
  },

  // Slide 16: Roadmap - Synthesis & Project 1
  {
    id: 16,
    type: 'roadmap',
    title: 'Síntese da Aula & Conexão com o Projeto 1',
    subtitle: 'Checklist de entrega do pipeline fundamental em PyTorch',
    steps: [
      { num: '01', title: 'Pipeline Seguro', desc: 'Split estratificado antes de qualquer ajuste de transformações estatísticas.' },
      { num: '02', title: 'Dataset & DataLoader', desc: 'Implementação com __len__, __getitem__, batch_size e shuffle=True no treino.' },
      { num: '03', title: 'Modelagem Dupla', desc: 'Domínio de pipelines tanto para classificação multiclasse quanto para regressão.' },
      { num: '04', title: 'Avaliação Honesta', desc: 'Métricas mensuradas no teste cego contra baselines documentados.' }
    ],
    notes: `Neste resumo, revisamos o checklist do Projeto 1 da disciplina:
Vocês já têm todo o conhecimento para importar dados reais, garantir que não há vazamento estatístico, criar classes de Dataset customizadas, iterar com DataLoaders e treinar redes neurais tanto para tarefas de classificação quanto de regressão, comparando com baselines!`
  },

  // Slide 17: Next Steps
  {
    id: 17,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 04',
    subtitle: 'A física interna do treinamento: Estabilidade, Inicialização & Normalização',
    steps: [
      { num: '01', title: 'Simetria de Pesos', desc: 'Por que inicializar pesos com zero impede o aprendizado da rede.' },
      { num: '02', title: 'Xavier & Kaiming', desc: 'Calibração da variância das ativações para Sigmoid, Tanh e ReLU.' },
      { num: '03', title: 'BatchNorm & LayerNorm', desc: 'Combate ao Internal Covariate Shift e aceleração da convergência.' },
      { num: '04', title: 'Inverted Dropout', desc: 'Regularização e eliminação da co-adaptação entre neurônios.' }
    ],
    notes: `Na nossa próxima aula — Aula 04 —, abriremos o capô das redes profundas para dominar a Estabilidade de Treinamento.
Veremos por que pesos aleatórios mal calibrados podem estagnar o gradiente, como inicializações científicas como Xavier e Kaiming He salvam o treino, e como camadas de BatchNorm1d e Dropout impedem o colapso e o sobreajuste. Parabéns a todos pelo empenho de hoje e até a próxima aula!`
  }
];
