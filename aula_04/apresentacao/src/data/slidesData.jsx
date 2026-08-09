import React from 'react';
import DataLoaderShuffleVisualizer from '../components/interactive/DataLoaderShuffleVisualizer';
import NormComparisonInteractive from '../components/interactive/NormComparisonInteractive';
import GradientFlowSimulator from '../components/interactive/GradientFlowSimulator';
import DropoutAndSchedulerLab from '../components/interactive/DropoutAndSchedulerLab';
import QuizWidget from '../components/interactive/QuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Normalização, Inicialização, Regularização e Estabilidade em PyTorch',
    subtitle: 'Aula 04 — Boas Práticas Avançadas de Treinamento em Deep Learning',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Pós-Graduação Faculdade Infnet',
    notes: `Sejam muito bem-vindos à nossa quarta aula do módulo de Redes Neurais Profundas!

Nas aulas anteriores, construímos nossas primeiras MLPs e implementamos o loop de treinamento fundamental no PyTorch. Hoje vamos dominar as ferramentas essenciais para tornar o treinamento de redes neurais 100% estável, reprodutível e robusto: a amostragem aleatória com shuffle em DataLoaders, a normalização de camadas com BatchNorm1d e LayerNorm, a matemática por trás da inicialização de pesos com Xavier Uniforme e Kaiming Normal, o diagnóstico visual de Exploding e Vanishing Gradients, o funcionamento do Inverted Dropout e a importância estratégica do decaimento da taxa de aprendizado (Learning Rate Schedulers). Vamos iniciar!`
  },

  // Slide 2: DataLoader Shuffle Visualizer (Previous Slide 8)
  {
    id: 2,
    type: 'custom',
    title: 'Visualizador Interativo: DataLoader & Shuffle Matrix',
    subtitle: 'Simule o impacto do embaralhamento no balanceamento de batches',
    component: <DataLoaderShuffleVisualizer />,
    notes: `Neste simulador interativo, vocês podem observar o comportamento dos mini-batches no PyTorch em tempo real.

Experimentem alternar entre 'shuffle=False' e 'shuffle=True' e cliquem no botão '🚀 Nova Época'. 

Observem que sem o shuffle, os primeiros batches ficam 100% concentrados na classe Legítima, enquanto os últimos ficam 100% na classe Fraude. Com o shuffle ativado, cada batch recebe uma mistura equilibrada de amostras de ambas as classes, estabilizando os gradientes calculados a cada iteração!`
  },

  // Slide 3: Internal Covariate Shift (Previous Slide 9)
  {
    id: 3,
    type: 'roadmap',
    title: 'Normalização em Redes Profundas',
    subtitle: 'Combatendo o Internal Covariate Shift',
    steps: [
      { num: '1', title: 'O Problema', desc: 'Conforme os pesos das primeiras camadas mudam, a distribuição de entrada das camadas profundas se altera a cada época.' },
      { num: '2', title: 'A Consequência', desc: 'A rede precisa se reajustar continuamente a distribuições instáveis, exigindo learning rates minúsculos.' },
      { num: '3', title: 'A Solução', desc: 'Aplicar camadas de normalização (BatchNorm ou LayerNorm) para fixar a média em zero e o desvio padrão em um.' }
    ],
    notes: `Entrando no nosso tema de Normalização de Camadas.

Quando encadeamos várias camadas lineares em uma rede profunda, deparamos com o fenômeno chamado 'Internal Covariate Shift'. À medida que a primeira camada atualiza seus pesos durante o treinamento, a distribuição das saídas que chegam na segunda camada muda radicalmente de uma época para a outra.

Isso obriga as camadas profundas a tentarem aprender sobre um 'alvo móvel'. Para estabilizar essa oscilação interna, introduzimos camadas de normalização que forçam as ativações intermediárias a manterem média 0 e desvio padrão 1.`
  },

  // Slide 4: BatchNorm vs LayerNorm Image (Previous Slide 10)
  {
    id: 4,
    type: 'image-text',
    title: 'BatchNorm1d vs LayerNorm: Entendendo os Eixos',
    subtitle: 'Como a média e a variância são calculadas no Tensor',
    image: '/batchnorm_layernorm.jpg',
    badge: 'ARQUITETURA',
    bullets: [
      ' BatchNorm1d (Batch Normalization): Normaliza ao longo da dimensão N (batch) para CADA feature C de forma independente.',
      ' Dependência do Batch Size: Como utiliza estatísticas do mini-batch, o BatchNorm exige batches de tamanho razoável (ex: N ≥ 16).',
      ' LayerNorm (Layer Normalization): Normaliza ao longo da dimensão C (features) para CADA exemplo N de forma isolada.',
      ' Independência do Batch Size: Funciona perfeitamente mesmo quando N = 1, sendo a norma padrão em Transformers e RNNs.'
    ],
    notes: `Esta ilustração comparativa é fundamental para entender as diferenças entre BatchNorm1d e LayerNorm.

No BatchNorm1d (lado esquerdo), a normalização é feita na vertical: pegamos uma única feature (coluna) e calculamos a média e o desvio padrão considerando todas as amostras N presentes naquele mini-batch. Por isso, a estatística depende do tamanho do batch!

No LayerNorm (lado direito), a normalização é feita na horizontal: para um único exemplo do batch, pegamos todas as suas features C e calculamos a média e o desvio padrão daquele exemplo. Ele não precisa saber nada sobre os outros exemplos do batch!`
  },

  // Slide 5: BatchNorm in PyTorch (Previous Slide 11)
  {
    id: 5,
    type: 'comparison',
    title: 'BatchNorm1d em PyTorch: Treino vs Avaliação',
    subtitle: 'O papel crucial dos parâmetros aprendidos e running statistics',
    cardLeft: {
      title: '🏋️ Durante o Treino (model.train())',
      badge: 'ESTATÍSTICA DINÂMICA',
      bullets: [
        'Calcula $\\mu_B$ e $\\sigma^2_B$ do mini-batch atual.',
        'Normaliza: $\\hat{x} = \\frac{x - \\mu_B}{\\sqrt{\\sigma^2_B + \\epsilon}}$',
        'Aplica parâmetros treináveis: $y = \\gamma \\hat{x} + \\beta$',
        'Atualiza médias móveis acumuladas (running_mean e running_var).'
      ]
    },
    cardRight: {
      title: '🔍 Durante a Inferência (model.eval())',
      badge: 'ESTATÍSTICA FIXA',
      bullets: [
        '🔒 Congela o cálculo de médias por batch.',
        'Utiliza as médias móveis salvas (running_mean / running_var).',
        'Garante previsões idênticas e determinísticas seja para 1 ou 1000 amostras.',
        '⚠️ Esquecer model.eval() causa erros em predições unitárias!'
      ]
    },
    notes: `Um detalhe prático de extrema importância no PyTorch: o comportamento do BatchNorm1d nos modos de treino e teste.

Durante o treino (model.train()), o BatchNorm1d calcula a média e a variância do batch atual para normalizar o sinal. Em seguida, ele escala e desloca o resultado usando dois parâmetros aprendidos via backpropagation: gamma e beta. Simultaneamente, ele atualiza internamente uma média móvel (running_mean e running_var).

Quando mudamos o modelo para o modo de avaliação (model.eval()), o BatchNorm1d para de calcular estatísticas do batch e passa a usar a running_mean acumulada no treino. É por isso que se você esquecer de chamar model.eval() ao fazer predições no ambiente real, o BatchNorm tentará calcular estatísticas em um batch de 1 exemplo e gerará saídas completamente distorcidas!`
  },

  // Slide 6: Interactive Norm Comparison Inspector (Previous Slide 12)
  {
    id: 6,
    type: 'custom',
    title: 'Inspetor Interativo: BatchNorm1d vs LayerNorm',
    subtitle: 'Visualise as operações na matriz de ativações',
    component: <NormComparisonInteractive />,
    notes: `Vamos agora explorar visualmente esse conceito no nosso simulador interativo!

Alterne entre os botões 'BatchNorm1d' e 'LayerNorm'. Teste também mudar o tamanho do batch para N = 1 e alternar entre Modo Treino e Modo Eval.

Reparem que ao selecionar BatchNorm1d com N = 1, o sistema exibe um alerta de risco, pois a variância de um único número é zero! Já ao selecionar LayerNorm, a normalização por features continua operando perfeitamente mesmo com N = 1.`
  },

  // Slide 7: Exploding vs Vanishing Gradients Image (Previous Slide 13)
  {
    id: 7,
    type: 'image-text',
    title: 'Exploding e Vanishing Gradients',
    subtitle: 'As duas grandes patologias da propagação de gradientes',
    image: '/exploding_vanishing.jpg',
    badge: 'DIAGNÓSTICO DE REDES',
    bullets: [
      ' Regra da Cadeia em Redes Profundas: Os gradientes das primeiras camadas são o produto das derivadas de todas as camadas subsequentes.',
      ' Vanishing Gradients (Desaparecimento): Se as derivadas parciais forem menores que 1.0 (ex: Sigmoide saturada), o gradiente decai exponencialmente até zero.',
      ' Exploding Gradients (Explosão): Se as derivadas forem maiores que 1.0, o gradiente cresce exponencialmente, resultando em estouro numérico (NaN).',
      ' Sintoma Prático: Loss que trava totalmente ou se transforma em NaN nas primeiras épocas de treino.'
    ],
    notes: `Passando para a dinâmica dos gradientes em redes profundas.

Como vimos na aula de Autograd, o cálculo do gradiente em uma rede neural profunda é uma sucessão de multiplicações encadeadas pela Regra da Cadeia.

Conforme ilustrado na figura: se as matrizes de pesos ou as derivadas das funções de ativação forem ligeiramente menores que 1 (por exemplo 0.8), após 10 camadas $0.8^{10} \\approx 0.107$, o gradiente diminui drasticamente até desaparecer (Vanishing Gradients). As primeiras camadas simplesmente param de aprender.

Por outro lado, se as derivadas forem maiores que 1 (por exemplo 1.5), $1.5^{10} \\approx 57.6$, o gradiente cresce exponencialmente (Exploding Gradients) até estourar a precisão de ponto flutuante e gerar os temidos erros 'NaN' (Not a Number) no PyTorch.`
  },

  // Slide 8: Mathematical Chain Rule & Formulations (Previous Slide 14)
  {
    id: 8,
    type: 'comparison',
    title: 'A Matemática por Trás do Colapso do Gradiente',
    subtitle: 'Analisando a multiplicação acumulada na Regra da Cadeia',
    cardLeft: {
      title: ' Derivada em uma Rede de L Camadas',
      badge: 'REGRA DA CADEIA',
      bullets: [
        'O gradiente na primeira camada $W_1$ é dado por:',
        '$\\frac{\\partial \\mathcal{L}}{\\partial W_1} = \\frac{\\partial \\mathcal{L}}{\\partial a_L} \\cdot \\prod_{l=2}^{L} \\frac{\\partial a_l}{\\partial a_{l-1}} \\cdot \\frac{\\partial a_1}{\\partial W_1}$',
        'Se $\\left| \\frac{\\partial a_l}{\\partial a_{l-1}} \\right| < 1 \\implies \\lim_{L \\to \\infty} \\frac{\\partial \\mathcal{L}}{\\partial W_1} = 0$',
        'Se $\\left| \\frac{\\partial a_l}{\\partial a_{l-1}} \\right| > 1 \\implies \\lim_{L \\to \\infty} \\frac{\\partial \\mathcal{L}}{\\partial W_1} = \\infty$'
      ]
    },
    cardRight: {
      title: '🛠️ Soluções Práticas de Engenharia',
      badge: 'ESTABILIZAÇÃO',
      bullets: [
        '1. Inicialização Adequada de Pesos: Xavier/Glorot e Kaiming/He Normal.',
        '2. Funções de Ativação Não-Saturantes: Substituir Sigmoide/Tanh por ReLU / LeakyReLU.',
        '3. Layer & Batch Normalization: Manter a variância das ativações em 1.0.',
        '4. Gradient Clipping: Limitar o valor máximo do gradiente (torch.nn.utils.clip_grad_norm_).'
      ]
    },
    notes: `Vejam a formulação matemática exata deste problema no card da esquerda.

O gradiente em relação aos pesos da primeira camada W1 é um produto do termo de erro final multiplicado por todas as derivadas jacobianas das camadas intermediárias. O comportamento desse produtório exponencial dita o destino do treinamento.

Para resolver essas patologias, a engenharia de Deep Learning desenvolveu 4 soluções essenciais, descritas no card da direita: inicialização calibrada dos pesos, uso de ativações como ReLU, normalização de camadas e o uso de Gradient Clipping (clipar normas de gradiente no PyTorch antes do optimizer.step()).`
  },

  // Slide 9: Weight Initialization Concept (Previous Slide 15)
  {
    id: 9,
    type: 'image-text',
    title: 'Inicialização de Pesos: Preservando a Variância',
    subtitle: 'Por que zerar ou usar distribuições genéricas destrói o aprendizado',
    image: '/weight_initialization.jpg',
    badge: 'INICIALIZAÇÃO',
    bullets: [
      ' Pesos Zerados (Zeros): Todos os neurônios da camada calculam exatamente a mesma saída e o mesmo gradiente. A rede sofre de simetria e perde a capacidade de aprender representações distintas.',
      ' Randomização Genérica Descalibrada: Pesos muito grandes causam Exploding Gradients; pesos muito pequenos causam Vanishing Gradients.',
      ' O Objetivo da Inicialização Moderna: Garantir que a variância das ativações e dos gradientes se mantenha constante ao longo de todas as camadas da rede.'
    ],
    notes: `Como inicializar corretamente as matrizes de pesos no PyTorch.

Se inicializarmos todos os pesos de uma camada linear com zero (W = 0), a combinação linear gerará a mesma saída para todos os neurônios. Durante o backpropagation, todas as derivadas serão idênticas e os neurônios atualizarão de forma simétrica, transformando uma camada de 100 neurônios em um único neurônio redundante.

Por outro lado, se sortearmos valores aleatórios sem calibração com a quantidade de conexões de entrada, a variância das ativações explodirá ou colapsará à medida que o sinal avança pelas camadas.`
  },

  // Slide 10: Xavier vs Kaiming (Previous Slide 16)
  {
    id: 10,
    type: 'comparison',
    title: 'Xavier/Glorot Uniform vs Kaiming/He Normal',
    subtitle: 'Escolhendo a inicialização correta para a sua função de ativação',
    cardLeft: {
      title: ' Xavier / Glorot Uniform',
      badge: 'TANH & SIGMOID',
      bullets: [
        'Indicado para: Ativações simétricas e lineares (Tanh, Sigmoide).',
        'Fórmula da Variância: $\\text{Var}(W) = \\frac{2}{n_{in} + n_{out}}$',
        'Amostragem Uniforme: $W \\sim U\\left(-\\sqrt{\\frac{6}{n_{in}+n_{out}}}, \\sqrt{\\frac{6}{n_{in}+n_{out}}}\\right)$',
        'Código PyTorch: nn.init.xavier_uniform_(layer.weight)'
      ]
    },
    cardRight: {
      title: '🚀 Kaiming / He Normal',
      badge: 'RELU & LEAKY RELU',
      bullets: [
        'Indicado para: Ativações não-lineares rectificadas (ReLU, LeakyReLU).',
        'Compensação do Zero-Out: Como a ReLU zera 50% dos neurônios, a variância é dobrada: $\\text{Var}(W) = \\frac{2}{n_{in}}$',
        'Amostragem Normal: $W \\sim \\mathcal{N}\\left(0, \\sqrt{\\frac{2}{n_{in}}}\\right)$',
        'Código PyTorch: nn.init.kaiming_normal_(layer.weight, nonlinearity=\'relu\')'
      ]
    },
    notes: `Aqui temos a comparação entre as duas estratégias de inicialização mais importantes da literatura de Deep Learning.

Xavier Uniform (desenvolvida por Xavier Glorot e Yoshua Bengio) assume que a função de ativação é aproximadamente linear em torno de zero (como Tanh). Ela calibra a variância dos pesos considerando tanto o número de entradas (fan_in) quanto o número de saídas (fan_out).

Kaiming Normal (desenvolvida por Kaiming He) foi criada especificamente para resolver a ReLU. Como a ReLU zera todas as entradas negativas, ela efetivamente desativa metade dos neurônios a cada passo. Kaiming He provou matematicamente que para manter a variância constante, precisamos dobrar o fator de escala para 2 / fan_in. Em PyTorch, usamos nn.init.kaiming_normal_() para redes com ReLU!`
  },

  // Slide 11: Interactive Gradient Flow Simulator (Previous Slide 17)
  {
    id: 11,
    type: 'custom',
    title: 'Simulador Interativo: Fluxo de Gradientes & Weights Init',
    subtitle: 'Observe o comportamento do gradiente através das camadas',
    component: <GradientFlowSimulator />,
    notes: `Vamos experimentar a propagação de gradientes no nosso simulador interativo!

Selecione entre as estratégias de inicialização: 'Pesos Zerados', 'Exploding Gradients', 'Vanishing Gradients', 'Xavier Uniform' e 'Kaiming Normal'. Em seguida, clique no botão '⚡ Disparar Backpropagation'.

Observem como nas opções descalibradas os gradientes estouram para NaN ou somem até 0.00, enquanto em Xavier e Kaiming a norma do gradiente se mantém estável em torno de 1.0 ao longo de todas as 10 camadas!`
  },

  // Slide 12: Dropout & Inverted Dropout Image (Previous Slide 18)
  {
    id: 12,
    type: 'image-text',
    title: 'Regularização com Dropout (Inverted Dropout)',
    subtitle: 'Prevenindo a co-adaptação excessiva de neurônios',
    image: '/dropout_learning_rate.jpg',
    badge: 'REGULARIZAÇÃO',
    bullets: [
      ' O Mecanismo do Dropout: Durante cada passo de treino, desativa aleatoriamente uma fração p de neurônios (ex: p = 0.5), zerando suas saídas.',
      ' Combate à Co-adaptação: Força a rede a aprender representações redundantes e robustas, sem depender excessivamente de nenhum neurônio individual.',
      ' Inverted Dropout em PyTorch: Para evitar alterar o código na inferência (eval()), o PyTorch escala as ativações ativas por $\\frac{1}{1-p}$ durante o treino.',
      ' Na Inferência (model.eval()): Todos os neurônios ficam ativos sem necessidade de reajuste de escala.'
    ],
    notes: `Técnicas de regularização e schedulers.

O Dropout é uma das técnicas de regularização mais eficientes em redes neurais profundas. A ideia é simples: a cada iteração do treino, "desligamos" aleatoriamente uma porcentagem p dos neurônios da camada.

Isso previne a chamada 'co-adaptação de neurônios' — situação onde um neurônio apenas corrige o erro de outro neurônio específico. Com o Dropout, cada neurônio é forçado a aprender características autônomas e úteis.

O PyTorch utiliza o 'Inverted Dropout': ele multiplica os neurônios restantes por 1/(1-p) durante o treino. Assim, quando colocamos o modelo em model.eval() no teste, não precisamos multiplicar por nenhum fator, mantendo a inferência rápida.`
  },

  // Slide 13: Learning Rate Schedulers (Previous Slide 19)
  {
    id: 13,
    type: 'comparison',
    title: 'Importância da Redução da Taxa de Aprendizado',
    subtitle: 'Ajustando o tamanho do passo para alcançar o Mínimo Global',
    cardLeft: {
      title: ' LR Constante (Problema)',
      badge: 'OSCILAÇÃO',
      bullets: [
        'LR Alto Fixo: Permite exploração rápida inicial, mas oscila permanentemente ao redor do mínimo sem conseguir entrar no vale.',
        'LR Baixo Fixo: Demora épocas demais para avançar e pode ficar preso em mínimos locais rasos ou pontos de sela.'
      ]
    },
    cardRight: {
      title: '📈 LR Schedulers em PyTorch (Solução)',
      badge: 'CONVERGÊNCIA FINA',
      bullets: [
        'StepLR: Reduz o LR por um fator gamma a cada N épocas (ex: step_size=10, gamma=0.1).',
        'ReduceLROnPlateau: Monitora a loss de validação e reduz o LR apenas quando a métrica parar de melhorar por M épocas.',
        'CosineAnnealingLR: Suaviza a queda da taxa seguindo uma curva cosenoidal.'
      ]
    },
    notes: `Neste slide, tratamos da importância estratégica da taxa de aprendizado (Learning Rate).

Manter uma taxa de aprendizado constante durante todo o treinamento é subótimo. No início do treino, queremos um Learning Rate relativamente alto (ex: 0.01 ou 0.001) para navegar rapidamente pelo espaço de parâmetros. No entanto, quando a rede se aproxima do vale de perda mínima, um passo grande faz com que o otimizador "salte" por cima do fundo do vale.

Para resolver isso, utilizamos os Learning Rate Schedulers do módulo torch.optim.lr_scheduler. O ReduceLROnPlateau, por exemplo, monitora a loss do conjunto de validação e reduz o learning rate automaticamente apenas quando percebe que a rede estagnou!`
  },

  // Slide 14: Interactive Lab & Quiz (Previous Slide 20)
  {
    id: 14,
    type: 'custom',
    title: 'Laboratório Interativo & Quiz de Fixação',
    subtitle: 'Consolide seus conhecimentos práticos sobre a Aula 04',
    component: (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <DropoutAndSchedulerLab />
        <QuizWidget />
      </div>
    ),
    notes: `Chegamos ao nosso momento final de consolidação prática da Aula 04!

Nesta última tela, disponibilizamos dois módulos: no topo, o Laboratório Interativo de Dropout e Schedulers de Learning Rate, onde vocês podem testar a geração de máscaras de Dropout e ver a bola de otimização descendo no vale de perda com o decaimento do LR.

Na parte inferior, temos o Quiz de Fixação com 4 questões conceituais para testar tudo o que aprendemos hoje sobre DataLoaders, Normalização, Inicialização e Regularização.

Parabéns pelo excelente trabalho em mais esta aula e nos vemos na próxima prática com notebooks!`
  }
];
