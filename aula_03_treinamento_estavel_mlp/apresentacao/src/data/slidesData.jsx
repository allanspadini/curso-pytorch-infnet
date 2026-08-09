import React from 'react';
import ActivationFunctionVisualizer from '../components/interactive/ActivationFunctionVisualizer';
import MlpForwardSimulator from '../components/interactive/MlpForwardSimulator';
import WeightInitComparison from '../components/interactive/WeightInitComparison';
import TrainingDiagnosticsWidget from '../components/interactive/TrainingDiagnosticsWidget';
import QuizWidget from '../components/interactive/QuizWidget';

export const slidesData = [
  {
    id: 1,
    type: 'title',
    title: 'Ciclo de Treinamento Estável e Arquiteturas MLP',
    subtitle: 'Perceptron de Múltiplas Camadas, Ativações, Normalização, Regularização e Diagnóstico no PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas com PyTorch',
    institution: 'Faculdade Infnet',
    notes: `Olá a todos, sejam muito bem-vindos à nossa terceira aula do curso de PyTorch! Hoje vamos dar um salto gigantesco na nossa jornada de Deep Learning. Nas aulas anteriores aprendemos a trabalhar com tensores, grafos de computação e construímos nossa primeira rede de camada única. Hoje, vamos aprender a projetar redes neurais multicamadas, entender como as funções de ativação geram capacidade de representação não-linear e, acima de tudo, aprender a construir um pipeline de treinamento verdadeiramente estável e profissional. Vamos começar!`
  },
  {
    id: 2,
    type: 'roadmap',
    title: 'Agenda & Roteiro de Aprendizagem',
    subtitle: 'Divisão em 5 Módulos Práticos (Carga Horária Equivalente: 8h)',
    steps: [
      { num: '01', title: 'Iris & MLP Fundamentos', desc: 'Introdução com Perceptron de Múltiplas Camadas e não-linearidades.' },
      { num: '02', title: 'Dataset Tabular Fintech', desc: 'Estruturação de Dataset, DataLoader e splits Treino/Val/Teste.' },
      { num: '03', title: 'Classificação vs Regressão', desc: 'Comparativo multiclasse (CrossEntropy) e regressão (MSE, MAE, RMSE, R²).' },
      { num: '04', title: 'Estabilidade & Normalização', desc: 'Inicialização (Xavier/He), BatchNorm1d, LayerNorm e Gradient Norms.' },
      { num: '05', title: 'TensorBoard & Checkpointing', desc: 'Monitoramento contínuo, Dropout, state_dict e avaliação no Teste.' }
    ],
    notes: `Nossa aula de hoje está dividida em cinco momentos chave. Começaremos com uma introdução prática ao Perceptron de Múltiplas Camadas (MLP) utilizando o clássico dataset Iris. Em seguida, vamos migrar para um problema real da indústria: a categorização de transações financeiras em uma Fintech. Na terceira parte, exploraremos as duas principais modalidades da MLP: classificação multiclasse e regressão. Na quarta etapa, trataremos do coração técnico do treinamento estável: inicialização de pesos, normalização com BatchNorm e LayerNorm, regularização com Dropout e monitoramento de Gradient Norms. Por fim, vamos dominar o uso do TensorBoard, salvamento de checkpoints com state_dict e avaliação rigorosa em conjuntos de teste.`
  },
  {
    id: 3,
    type: 'comparison',
    title: 'De Onde Viemos: Do Perceptron Simples para a MLP',
    subtitle: 'Superando a limitação de separabilidade linear em problemas complexos',
    cardLeft: {
      tag: 'Perceptron Simples (Camada Única)',
      title: 'Fronteira Linear Rígida',
      items: [
        'Apenas uma transformação linear y = σ(W · x + b)',
        'Incapaz de resolver problemas com não-linearidade (ex: XOR)',
        'Limite de representação em dados tabulares complexos'
      ]
    },
    cardRight: {
      tag: 'Multi-Layer Perceptron (MLP)',
      title: 'Aproximação Universal de Funções',
      items: [
        'Empilhamento de camadas ocultas (Hidden Layers)',
        'Combinação de transformações lineares e ativações não-lineares',
        'Capacidade de aprender superfícies de decisão arbitrárias'
      ]
    },
    notes: `Na aula 2, vimos o Perceptron de camada única. Ele funciona muito bem para problemas linearmente separáveis. Mas o que acontece quando os dados possuem fronteiras complexas e não-lineares? Um Perceptron de camada única simplesmente falha. Para resolver isso, precisamos empilhar múltiplas camadas de neurônios — formando o Multi-Layer Perceptron (MLP). Cada camada intermediária, chamada de camada oculta, extrai representações de mais alto nível a partir das entradas originais.`
  },
  {
    id: 4,
    type: 'flow',
    title: 'O Dataset Iris: O "Hello World" Multicamadas',
    subtitle: 'Estrutura dos dados de classificação de espécies de flores',
    steps: [
      { title: '4 Atributos de Entrada (X)', desc: 'Comprimento e Largura de Sépala + Comprimento e Largura de Pétala (cm)' },
      { title: 'Normalização Standard', desc: 'Escalamento dos atributos para média 0 e variância 1 (StandardScaler)' },
      { title: 'Camada Oculta (Hidden)', desc: 'Mapeamento de 4 entradas para N neurônios ocultos com ReLU' },
      { title: '3 Classes de Saída (y)', desc: '0: Iris-setosa, 1: Iris-versicolor, 2: Iris-virginica' }
    ],
    notes: `Para ilustrar a transição para a MLP, vamos utilizar o dataset Iris. Ele possui 150 amostras divididas em três espécies de flores: Setosa, Versicolor e Virginica. Cada amostras possui quatro atributos: comprimento e largura da sépala e da pétala. Apesar de ser um dataset pequeno e limpo, ele é perfeito para demonstrarmos como o PyTorch lida com classificação multiclasse e como as camadas ocultas transformam o espaço de atributos.`
  },
  {
    id: 5,
    type: 'formula',
    title: 'Por que Múltiplas Camadas? A Matéria-Prima da Não-Linearidade',
    subtitle: 'A prova matemática do colapso de transformações lineares sucessivas',
    formula: 'y = W_2 \\cdot (W_1 \\cdot x + b_1) + b_2 = (W_2 W_1) \\cdot x + (W_2 b_1 + b_2) = W_{equiv} \\cdot x + b_{equiv}',
    variables: [
      { name: 'W_1, W_2', desc: 'Matrizes de pesos das camadas 1 e 2' },
      { name: 'W_{equiv}', desc: 'Matriz equivalente (produto W_2 * W_1)' },
      { name: 'Conclusão', desc: 'Sem função de ativação entre W1 e W2, a rede colapsa em uma simples transformação linear!' }
    ],
    notes: `Aqui está um conceito matemático fundamental: se você empilhar dez camadas lineares W1, W2 até W10 sem utilizar funções de ativação entre elas, o resultado final é matematicamente equivalente a uma única matriz Wequiv = W10 * W9 ... W1. Em outras palavras, sem funções de ativação não-lineares, sua rede neural profunda é apenas uma regressão linear disfarçada! A não-linearidade é a verdadeira matéria-prima que permite às redes neurais aprenderem superfícies de decisão arbitrárias.`
  },
  {
    id: 6,
    type: 'custom',
    title: 'Funções de Ativação Interativas',
    subtitle: 'Explore o comportamento e gradientes de ReLU, LeakyReLU, Tanh e Sigmoid',
    component: <ActivationFunctionVisualizer />,
    notes: `Vamos analisar as principais funções de ativação. A Sigmoid mapeia valores para o intervalo (0, 1), mas sofre com o problema de gradientes desvanecentes em valores extremos. A Tanh é centrada no zero (-1, 1), ajudando na convergência. A ReLU (max(0, x)) revolucionou o Deep Learning por ser extremamente rápida e não saturar para valores positivos, mas pode sofrer com neurônios mortos se o valor for negativo. Por isso, a LeakyReLU adiciona uma pequena inclinação para entradas negativas. No nosso simulador interativo na tela, vocês podem testar cada uma e observar suas derivadas!`
  },
  {
    id: 7,
    type: 'custom',
    title: 'Simulador do Forward Pass no Dataset Iris',
    subtitle: 'Acompanhe a propagação dos dados através dos pesos, bias e Softmax',
    component: <MlpForwardSimulator />,
    notes: `Como implementamos essa arquitetura no PyTorch? Herdamos da classe nn.Module. No método __init__, declaramos as camadas nn.Linear(input_dim, hidden_dim) e as ativações como nn.ReLU(). No método forward(self, x), definimos explicitamente como os dados fluem da entrada até a saída. Reparem que não estamos usando abstrações ocultas de alto nível: cada passo é explícito e transparente.`
  },
  {
    id: 8,
    type: 'flow',
    title: 'Do Iris ao Mundo Real: Categorização de Transações (Fintech)',
    subtitle: 'Aplicação tabular de classificação multiclasse de despesas bancárias',
    steps: [
      { title: 'Atributos Tabulares', desc: 'Valor da transação, hora do dia, dia da semana, canal digital, score do comerciante' },
      { title: 'Engenharia de Features', desc: 'Padronização z-score dos atributos contínuos e transformação logarítmica do valor' },
      { title: '5 Categorias Alvo', desc: '0: Alimentação, 1: Transporte, 2: Saúde, 3: Moradia, 4: Lazer' },
      { title: 'Meta de Negócio', desc: 'Classificação automática em tempo real no app da Fintech com alta precisão' }
    ],
    notes: `Agora que entendemos os fundamentos no Iris, vamos para a prática com dados da indústria! Imagine que trabalhamos em uma Fintech de gestão financeira e precisamos classificar automaticamente as transações bancárias dos usuários em categorias como Alimentação, Transporte, Saúde, Moradia e Lazer. Recebemos atributos como valor da transação, hora do dia, dia da semana, canal utilizado e score de confiabilidade do estabelecimento.`
  },
  {
    id: 9,
    type: 'comparison',
    title: 'Estruturação do Pipeline de Dados',
    subtitle: 'Separação rigorosa dos conjuntos Treino, Validação e Teste',
    cardLeft: {
      tag: 'Divisão de Dados',
      title: 'Splits Estratificados',
      items: [
        'Treino (70%): Atualização direta dos pesos do modelo',
        'Validação (15%): Ajuste de hiperparâmetros e checkpointing',
        'Teste (15%): Avaliação final sem vazamento de informação'
      ]
    },
    cardRight: {
      tag: 'PyTorch Data Pipeline',
      title: 'Dataset & DataLoader',
      items: [
        'Classe customizada FintechDataset (torch.utils.data.Dataset)',
        'DataLoader com suporte a minibatches (batch_size=32/64)',
        'Embaralhamento (shuffle=True) para romper correlações temporais'
      ]
    },
    notes: `Em um projeto sério, a organização dos dados é vital. Dividimos nosso dataset em três conjuntos disjuntos: Treino (70%) para atualizar os pesos, Validação (15%) para ajustar hiperparâmetros e monitorar a generalização, e Teste (15%) reservado exclusivamente para a avaliação final. Criamos uma classe FintechDataset herdando de torch.utils.data.Dataset e envelopamos em DataLoader com suporte a minibatches e shuffle no treino.`
  },
  {
    id: 10,
    type: 'comparison',
    title: 'Duas Faces da MLP: Classificação vs Regressão',
    subtitle: 'Flexibilidade de arquitetura para diferentes objetivos de aprendizado',
    cardLeft: {
      tag: 'Classificação Multiclasse',
      title: 'CrossEntropyLoss',
      items: [
        'Saída com N logits (5 categorias de despesas)',
        'Função de Perda: CrossEntropyLoss (combina LogSoftmax + NLLLoss)',
        'Métricas: Acurácia, F1-Score e Matriz de Confusão'
      ]
    },
    cardRight: {
      tag: 'Variante de Regressão',
      title: 'MSE Loss',
      items: [
        'Saída com 1 escalar (previsão de gasto estimado)',
        'Função de Perda: MSELoss (Erro Quadrático Médio)',
        'Métricas de Regressão: MAE (R$), RMSE (R$) e Coeficiente R²'
      ]
    },
    notes: `Uma grande vantagem da arquitetura MLP é sua flexibilidade. Se trocarmos a camada final para emitir 5 logits e aplicarmos nn.CrossEntropyLoss(), temos um classificador de categorias. Se trocarmos para 1 neurônio de saída e aplicarmos nn.MSELoss(), transformamos o modelo em um regressor para prever o valor financeiro estimado da transação! Para avaliar a regressão, usamos métricas consagradas: MAE (Erro Médio Absoluto), RMSE (Raiz do Erro Quadrático Médio) e R² (Coeficiente de Determinação).`
  },
  {
    id: 11,
    type: 'custom',
    title: 'Inicialização de Pesos: Padrão vs Xavier vs He',
    subtitle: 'Impacto da variância inicial dos pesos na convergência das camadas',
    component: <WeightInitComparison />,
    notes: `Como os pesos da rede devem começar antes do primeiro passo de gradiente? Se inicializarmos todos com zero, os neurônios aprendem exatamente as mesmas representações em paralelo (simetria). Se usarmos valores muito grandes, os gradientes explodem. A inicialização Xavier/Glorot é ideal para funções simétricas como Tanh/Sigmoid, mantendo a variância constante entre camadas. Já a inicialização He/Kaiming foi desenhada especialmente para compensar a metade nula da ReLU.`
  },
  {
    id: 12,
    type: 'formula',
    title: 'Estabilidade de Treinamento: Gradientes em Redes Profundas',
    subtitle: 'Entendendo os fenômenos de Vanishing e Exploding Gradients',
    formula: '\\frac{\\partial L}{\\partial W^{(1)}} = \\frac{\\partial L}{\\partial z^{(L)}} \\cdot W^{(L)} \\cdot f\'(z^{(L-1)}) \\cdot \\dots \\cdot W^{(2)} \\cdot f\'(z^{(1)})',
    variables: [
      { name: 'Vanishing Gradients', desc: 'Derivadas < 1.0 multiplicadas em sequência fazem o gradiente tender a zero nas primeiras camadas.' },
      { name: 'Exploding Gradients', desc: 'Pesos/Derivadas > 1.0 geram produtos gigantescos, causando oscilações e NaNs na loss.' }
    ],
    notes: `Durante o backpropagation, a regra da cadeia multiplica os gradientes camada por camada. Em redes profundas, se as derivadas forem menores que 1.0, o gradiente encolhe exponencialmente até chegar a zero nas primeiras camadas — o fenômeno dos Gradientes Desvanecentes (Vanishing Gradients). Por outro lado, se forem maiores que 1.0, os gradientes crescem descontroladamente — os Gradientes Explosivos (Exploding Gradients), causando spikes e instabilidade na loss.`
  },
  {
    id: 13,
    type: 'flow',
    title: 'Monitoramento de Gradient Norms no PyTorch',
    subtitle: 'Diagnóstico empírico e objetivo da saúde dos gradientes',
    steps: [
      { title: '1. Backward Pass', desc: 'Execução de loss.backward() para acumular gradientes em p.grad' },
      { title: '2. Cálculo da Norma L2', desc: 'Soma dos quadrados dos gradientes de todos os parâmetros ||∇L||_2' },
      { title: '3. Registro Por Época', desc: 'Monitoramento no TensorBoard para identificar anomalias' },
      { title: '4. Gradient Clipping', desc: 'Aplicação de torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm)' }
    ],
    notes: `Como diagnosticamos a saúde dos gradientes durante o treinamento? Nós calculamos a norma L2 da soma de todos os gradientes do modelo ao final de cada minibatch. Se a norma dos gradientes despencar para próximo de zero ou disparar para milhares, temos um diagnóstico empírico objetivo de instabilidade! Se necessário, podemos aplicar o Gradient Clipping (torch.nn.utils.clip_grad_norm_) para limitar o teto máximo dos gradientes.`
  },
  {
    id: 14,
    type: 'comparison',
    title: 'Normalização: BatchNorm1d vs LayerNorm',
    subtitle: 'Estabilizando o Internal Covariate Shift entre camadas ocultas',
    cardLeft: {
      tag: 'Batch Normalization (BatchNorm1d)',
      title: 'Normalização por Coluna (Batch)',
      items: [
        'Calcula média e variância ao longo das amostras do batch',
        'Acelera fortemente a convergência em dados tabulares e imagens',
        'Depende de batch_size > 1 para estimativas estatísticas estáveis'
      ]
    },
    cardRight: {
      tag: 'Layer Normalization (LayerNorm)',
      title: 'Normalização por Linha (Amostra)',
      items: [
        'Calcula média e variância ao longo dos atributos de cada amostra',
        'Independente do tamanho do batch (funciona até com batch=1)',
        'Padrão da indústria para modelos sequenciais e Transformers'
      ]
    },
    notes: `Para estabilizar as distribuições internas de ativação ao longo das camadas (o chamado Internal Covariate Shift), utilizamos camadas de normalização. O BatchNorm1d normaliza os valores ao longo do batch (coluna a coluna), sendo ideal para dados tabulares e visão computacional com batches moderados. O LayerNorm normaliza os atributos dentro de cada amostra individual (linha a linha), sendo a escolha padrão para dados sequenciais e arquiteturas Transformer.`
  },
  {
    id: 15,
    type: 'comparison',
    title: 'Regularização com Dropout',
    subtitle: 'Prevenindo overfitting e reduzindo o gap treino/validação',
    cardLeft: {
      tag: 'Sem Dropout',
      title: 'Co-Adaptação Excessiva',
      items: [
        'Neurônios criam dependências mútuas rígidas',
        'Modelo memoriza ruídos do conjunto de treinamento',
        'Gap acentuado entre a loss de treino (baixa) e validação (alta)'
      ]
    },
    cardRight: {
      tag: 'Com Dropout (nn.Dropout(p=0.3))',
      title: 'Redundância Robusta',
      items: [
        'Zera aleatoriamente p% dos neurônios durante o treino',
        'Força a rede a aprender representações distribuídas',
        'Melhora drástica na generalização do modelo'
      ]
    },
    notes: `Quando nossa MLP tem capacidade de sobra, ela pode memorizar o conjunto de treino, criando um grande gap entre a curva de loss de treino e a de validação — o clássico Overfitting. O Dropout resolve isso desativando aleatoriamente uma porcentagem de neurônios (ex: 30%) a cada passo de treinamento. Isso força a rede a aprender representações redundantes e robustas, sem depender de nenhum neurônio específico.`
  },
  {
    id: 16,
    type: 'flow',
    title: 'Otimizadores Modernos & Learning Rate Schedulers',
    subtitle: 'Estratégias para navegação otimizada no espaço de perda',
    steps: [
      { title: 'Otimizador AdamW', desc: 'Adam com desacoplamento correto do Weight Decay (L2 regularization)' },
      { title: 'Momentum Adaptativo', desc: 'Manutenção de momentos de 1ª ordem (direção) e 2ª ordem (escala de gradiente)' },
      { title: 'StepLR Scheduler', desc: 'Decaimento periódico da taxa de aprendizado (ex: lr * 0.5 a cada 15 épocas)' },
      { title: 'ReduceLROnPlateau', desc: 'Redução automática do LR ao detectar estagnação da loss de validação' }
    ],
    notes: `Em vez do SGD simples, utilizaremos Adam e AdamW (Adam com Weight Decay desacoplado), que mantêm momentos de primeira e segunda ordem para cada peso individual. Além disso, aplicamos um Learning Rate Scheduler como o StepLR ou ReduceLROnPlateau para decair a taxa de aprendizado à medida que o treinamento avança, permitindo passos largos no início e pequenos ajustes finos no final.`
  },
  {
    id: 17,
    type: 'custom',
    title: 'Diagnóstico de Treinamento com TensorBoard',
    subtitle: 'Dashboard interativo de curvas de loss, gradient norms e controle de overfitting',
    component: <TrainingDiagnosticsWidget />,
    notes: `Um engenheiro de Deep Learning não treina no escuro. Utilizamos a integração nativa do PyTorch com o TensorBoard via torch.utils.tensorboard.SummaryWriter. Registramos em tempo real as curvas de Loss de Treino e Validação, a evolução da norma dos gradientes e o valor corrente do Learning Rate. Isso nos permite identificar visualmente se o modelo está convergindo, sofrendo overfitting ou estagnando.`
  },
  {
    id: 18,
    type: 'formula',
    title: 'Checkpointing & Reprodução com state_dict',
    subtitle: 'Garantindo o salvamento e recarregamento do melhor modelo histórico',
    formula: 'torch.save(model.state_dict(), "best_model.pt") \\quad \\longrightarrow \\quad model.load_state_dict(torch.load("best_model.pt"))',
    variables: [
      { name: 'state_dict', desc: 'Dicionário Python contendo todos os tensores de pesos (weight) e viéses (bias) do modelo.' },
      { name: 'Best Val Loss Checkpoint', desc: 'Atualização do arquivo salvo sempre que a loss de validação atinge um novo mínimo histórico.' }
    ],
    notes: `Ao longo do treinamento por 50 ou 100 épocas, a menor loss de validação geralmente ocorre antes da última época. Por isso, implementamos um sistema de Checkpointing: a cada época em que a loss de validação atinge um novo mínimo histórico, salvamos o dicionário de parâmetros do modelo via torch.save(model.state_dict(), 'best_model.pt'). Mais tarde, recarregamos o estado ideal com model.load_state_dict() para reproduzir predicações com máxima precisão.`
  },
  {
    id: 19,
    type: 'comparison',
    title: 'Avaliação Final no Conjunto de Teste & Baseline',
    subtitle: 'Diagnóstico transparente de desempenho e matriz de confusão',
    cardLeft: {
      tag: 'Conjunto de Teste',
      title: 'Métricas Não-Viciadas',
      items: [
        'Avaliação final realizada estritamente em dados inéditos (Teste)',
        'Análise da Matriz de Confusão para padrões de erro entre categorias',
        'Métricas de Regressão: MAE, RMSE e R² reportados em valores reais (R$)'
      ]
    },
    cardRight: {
      tag: 'Baseline Ingênuo',
      title: 'Referência de Comparação',
      items: [
        'Modelo Dummy (predição da classe majoritária no treino)',
        'Comprova o valor preditivo real gerado pela arquitetura MLP',
        'Garante justificativa de performance técnica'
      ]
    },
    notes: `Nunca declare vitória usando o conjunto de validação! A avaliação final é realizada estritamente no conjunto de Teste com o modelo recarregado do checkpoint. Além das métricas agregadas (Acurácia, F1-Score), analisamos a Matriz de Confusão para identificar padrões específicos de erro (ex: se despesas de Lazer estão sendo confundidas com Alimentação). E sempre comparamos o resultado contra um Baseline ingênuo (como um modelo trivial de classe majoritária) para comprovar o valor real da nossa MLP.`
  },
  {
    id: 20,
    type: 'custom',
    title: 'Quiz Interativo de Fixação',
    subtitle: 'Teste seus conhecimentos sobre MLPs, estabilidade e boas práticas no PyTorch',
    component: <QuizWidget />,
    notes: `Para finalizar nossa aula, vamos responder juntas a algumas perguntas interativas de fixação. Parabéns a todos pelo excelente trabalho de hoje! Agora vocês dominam a arquitetura MLP, a criação de pipelines tabulares, o diagnóstico de gradientes e as melhores práticas de estabilização de redes neurais no PyTorch. Nos vemos na próxima aula!`
  }
];
