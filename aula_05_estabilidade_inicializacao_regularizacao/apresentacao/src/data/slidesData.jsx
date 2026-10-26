import React from 'react';
import WeightInitComparison from '../components/interactive/WeightInitComparison';
import NormComparisonInteractive from '../components/interactive/NormComparisonInteractive';
import DropoutAndSchedulerLab from '../components/interactive/DropoutAndSchedulerLab';
import QuizWidget from '../components/interactive/QuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Estabilidade de Treinamento: Inicializações, Normalizações e Regularização',
    subtitle: 'Aula 04 — A Física Interna do Treinamento Estável em PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa quarta aula de Redes Neurais Profundas!

Nas aulas anteriores, aprendemos a construir arquiteturas e estruturar pipelines de dados com Datasets e DataLoaders. Hoje, abriremos o capô da rede para entender a física interna do treinamento estável.

Por que redes profundas muitas vezes não convergem ou travam em platôs? Como a inicialização incorreta de pesos pode matar o fluxo do gradiente logo na primeira época? Qual é a diferença matemática e prática entre BatchNorm1d e LayerNorm? E como o Inverted Dropout impede o sobreajuste e a co-adaptação de neurônios?

Veremos esses conceitos de forma visual, intuitiva e prática, conectando diretamente com as exigências do Projeto 1 da nossa disciplina. Vamos começar!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Foco em modelagem quantitativa, álgebra linear e propagação de ondas.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Ciência de Dados e IA', desc: 'Especialista em pipelines de Deep Learning e otimização numérica.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Desenvolvimento e arquitetura de redes neurais profundas.' }
    ],
    notes: `Meu nome é Allan Spadini. Minha trajetória combina métodos quantitativos e pesquisa em Inteligência Artificial. Hoje, vamos nos concentrar nos fatores que separam um modelo amador que diverge de uma rede neural profissional, estável e pronta para ser treinada em centenas de épocas.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco pilares da estabilidade em redes profundas',
    steps: [
      { num: '01', title: 'Simetria & Inicialização', desc: 'Por que pesos zerados falham e as soluções Xavier e He.' },
      { num: '02', title: 'Covariate Shift', desc: 'A instabilidade da distribuição interna conforme camadas mudam.' },
      { num: '03', title: 'BatchNorm vs LayerNorm', desc: 'Normalização ao longo do batch vs dentro da amostra.' },
      { num: '04', title: 'Inverted Dropout', desc: 'Eliminação da co-adaptação e fechamento do gap de generalização.' },
      { num: '05', title: 'Laboratório Iris & PyTorch', desc: 'Simulação na planilha e experimentos empíricos de convergência.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá os cinco pilares da estabilidade:
Primeiro, a quebra de simetria e calibração de variância de pesos com Xavier e Kaiming He.
Segundo, a compreensão do Internal Covariate Shift.
Terceiro, o confronto técnico entre BatchNorm1d e LayerNorm.
Quarto, o mecanismo do Inverted Dropout.
E quinto, a exploração prática na planilha e no notebook com o dataset Iris.`
  },

  // Slide 4: Comparison - Weight Symmetry
  {
    id: 4,
    type: 'comparison',
    title: 'O Problema da Simetria Inicial',
    subtitle: 'Por que inicializar pesos com zero impede o aprendizado?',
    cardLeft: {
      badge: 'PESOS NULOS (W = 0)',
      title: 'Colapso de Simetria',
      bullets: [
        'Todos os neurônios da camada calculam exatamente a mesma saída.',
        'No backward, todos recebem exatamente o mesmo gradiente.',
        'Todos os neurônios são atualizados de forma idêntica a cada época.',
        'A camada inteira se comporta como se tivesse apenas 1 único neurônio!'
      ]
    },
    cardRight: {
      badge: 'INICIALIZAÇÃO CALIBRADA',
      title: 'Quebra de Simetria',
      bullets: [
        'Pesos amostrados de distribuições com variância controlada.',
        'Cada neurônio responde a diferentes facetas e padrões dos dados.',
        'Gradientes diversificados permitem especialização de features.',
        'Preserva a magnitude do sinal sem explodir nem desvanecer.'
      ]
    },
    notes: `Em modelos de regressão linear simples, começar com pesos zero funciona. Mas em redes neurais profundas, pesos zerados causam um desastre: o Colapso de Simetria.
Como todos os neurônios recebem as mesmas entradas multiplicadas por zero, todos produzem a mesma ativação e recebem o mesmo gradiente no backward. Eles nunca se diferenciam, desperdiçando toda a capacidade da rede!`
  },

  // Slide 5: Formula - Xavier & He
  {
    id: 5,
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

  // Slide 6: Custom - WeightInitComparison
  {
    id: 6,
    type: 'custom',
    title: 'Comparador Interativo de Inicialização de Pesos',
    subtitle: 'Veja a distribuição das ativações através de 5 camadas profundas',
    component: <WeightInitComparison />,
    notes: `Experimentem este simulador interativo na tela.
Vejam o que acontece com uma inicialização aleatória ingênua: após 5 camadas, os sinais ou colapsam em zero (desvanecimento) ou saturam em extremos.
Agora selecionem Xavier ou Kaiming He: a distribuição das ativações se mantém com formato saudável e variância preservada em todas as camadas!`
  },

  // Slide 7: Roadmap - Covariate Shift
  {
    id: 7,
    type: 'roadmap',
    title: 'O Fenômeno do Internal Covariate Shift',
    subtitle: 'Por que treinar redes profundas sem normalização é como mirar em um alvo móvel',
    steps: [
      { num: '01', title: 'Atualização de Pesos', desc: 'A camada 1 atualiza seus pesos a cada mini-batch para reduzir o erro.' },
      { num: '02', title: 'Mudança de Distribuição', desc: 'As saídas da camada 1 mudam de média e escala radicalmente de uma época para outra.' },
      { num: '03', title: 'Desestabilização', desc: 'A camada 2 precisa se readaptar continuamente a entradas imprevisíveis.' },
      { num: '04', title: 'Solução: Normalização', desc: 'Fixar média em 0 e desvio em 1 entre as camadas traz estabilidade imediata.' }
    ],
    notes: `O conceito de Internal Covariate Shift descreve como a distribuição das entradas de uma camada profunda oscila continuamente enquanto as camadas anteriores estão aprendendo.
É como tentar chutar uma bola para o gol enquanto o goleiro e as traves estão se movendo continuamente! Camadas de normalização como BatchNorm e LayerNorm 'ancoram' as traves no lugar.`
  },

  // Slide 8: Comparison - BatchNorm vs LayerNorm
  {
    id: 8,
    type: 'comparison',
    title: 'BatchNorm1d vs. LayerNorm',
    subtitle: 'Duas geometrias distintas de normalização no espaço de tensores',
    cardLeft: {
      badge: 'BATCHNORM1D (AO LONGO DO BATCH)',
      title: 'Média sobre o Eixo N (Batch)',
      bullets: [
        'Normaliza cada feature isoladamente através das amostras do batch.',
        'Depende de batch_size representativo (ideal ≥ 32).',
        'Calcula running_mean e running_var durante o treino.',
        'Introduz leve regularização por ruído amostral do mini-batch.'
      ]
    },
    cardRight: {
      badge: 'LAYERNORM (AO LONGO DA CAMADA)',
      title: 'Média sobre o Eixo C (Features)',
      bullets: [
        'Normaliza todas as features de UMA única amostra independentemente.',
        'Comportamento idêntico seja batch_size = 1 ou 1000.',
        'Padrão em Processamento de Linguagem Natural, Transformers e Séries.',
        'Não depende de estatísticas móveis acumuladas.'
      ]
    },
    notes: `Prestem atenção na diferença geométrica:
O BatchNorm calcula a média 'vertical': pega a mesma feature e calcula a média ao longo de todas as amostras do mini-batch.
O LayerNorm calcula a média 'horizontal': pega uma amostra isolada e calcula a média de todos os neurônios daquela camada. Por isso o LayerNorm funciona até mesmo para um único exemplo de teste!`
  },

  // Slide 9: Custom - NormComparisonInteractive
  {
    id: 9,
    type: 'custom',
    title: 'Visualizador Interativo: Geometria das Normalizações',
    subtitle: 'Explore visualmente a direção de corte dos tensores 2D e 3D',
    component: <NormComparisonInteractive />,
    notes: `Utilizem o visualizador interativo para alternar entre BatchNorm e LayerNorm.
Observem os planos destacados: no BatchNorm, a lâmina de corte fatia ao longo da dimensão N (amostras). No LayerNorm, a lâmina corta ao longo da dimensão C (canais/features).`
  },

  // Slide 10: Comparison - Train vs Eval in BatchNorm
  {
    id: 10,
    type: 'comparison',
    title: 'O Modo Crucial: model.train() vs model.eval()',
    subtitle: 'O perigo de esquecer a chave de modo ao avaliar o modelo',
    cardLeft: {
      badge: 'MODO TREINO: model.train()',
      title: 'Estatísticas do Mini-Batch',
      bullets: [
        'Média e variância calculadas sobre as amostras do lote atual.',
        'Parâmetros running_mean e running_var são atualizados por média móvel.',
        'Dropout está ATIVO, desligando neurônios estocasticamente.'
      ]
    },
    cardRight: {
      badge: 'MODO AVALIAÇÃO: model.eval()',
      title: 'Estatísticas Congeladas',
      bullets: [
        'Usa running_mean e running_var aprendidos durante o treino.',
        'Dropout é DESATIVADO (todos os neurônios operam a 100%).',
        'Garante predições determinísticas e idênticas para a mesma entrada.'
      ]
    },
    notes: `Esta é uma das fontes de bugs mais silenciosas em PyTorch:
Se você esquecer de chamar model.eval() antes do conjunto de teste, o BatchNorm tentará calcular a média do batch do teste (ou pior, quebrará se tiver só 1 amostra), e o Dropout continuará apagando neurônios!
Lembrem-se: antes de validar ou testar, sempre invoquem model.eval() e com torch.no_grad().`
  },

  // Slide 11: Comparison - Overfitting & Co-adaptation
  {
    id: 11,
    type: 'comparison',
    title: 'O Que é Co-adaptação de Neurônios?',
    subtitle: 'Como o sobreajuste surge quando neurônios criam dependências mútuas',
    cardLeft: {
      badge: 'REDE SEM REGULARIZAÇÃO',
      title: 'Neurônios Co-dependentes',
      bullets: [
        'Um neurônio comete um erro sistemático para certo padrão.',
        'Neurônios vizinhos aprendem a compensar exatamente esse erro.',
        'A rede decora ruídos específicos do conjunto de treino.',
        'Gera alto gap entre loss de treino baixa e loss de validação alta.'
      ]
    },
    cardRight: {
      badge: 'REDE COM DROPOUT',
      title: 'Neurônios Autônomos',
      bullets: [
        'A cada passo, uma fração p dos neurônios é desligada aleatoriamente.',
        'Nenhum neurônio pode confiar na presença do seu vizinho.',
        'Cada neurônio é forçado a aprender características robustas e úteis.',
        'Equivale ao treinamento conjunto de um comitê gigante de sub-redes.'
      ]
    },
    notes: `Quando uma rede neural treina sem regularização, certos neurônios tornam-se dependentes de outros: se um neurônio produz um pico espúrio, outro neurônio aprende a subtrair aquele pico. Eles formam uma dependência frágil chamada co-adaptação.
O Dropout quebra essa camaradagem: ao apagar aleatoriamente neurônios a cada batch, cada unidade é forçada a ser autônoma e aprender padrões verdadeiros do dado!`
  },

  // Slide 12: Formula - Inverted Dropout
  {
    id: 12,
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

  // Slide 13: Custom - DropoutAndSchedulerLab
  {
    id: 13,
    type: 'custom',
    title: 'Laboratório Interativo: Dropout & Generalização',
    subtitle: 'Ajuste a taxa de dropout e observe o fechamento do gap de overfitting',
    component: <DropoutAndSchedulerLab />,
    notes: `Neste laboratório interativo, observem as curvas de perda de treino e validação.
Com Dropout = 0.0, notem como a perda de treino despenca enquanto a validação começa a subir (overfitting clássico).
Aumentem o Dropout para 0.3 ou 0.4: o treino sofre um pouco mais, mas a perda de validação converge para um valor muito mais baixo, fechando o gap de generalização!`
  },

  // Slide 14: Comparison - Practical Iris Study
  {
    id: 14,
    type: 'comparison',
    title: 'Estudo de Caso: Classificação no Dataset Iris',
    subtitle: 'Validando o impacto de ativações e estabilização na planilha e em código',
    cardLeft: {
      badge: 'PLANILHA SEM CÓDIGO',
      title: 'simulacao_mlp_iris.xlsx',
      bullets: [
        'Ajuste de pesos em 3 camadas densas com entradas de pétalas e sépalas.',
        'Observação manual da fronteira de decisão entre espécies.',
        'Constatação visual da incapacidade de retas simples separarem classes não-lineares.'
      ]
    },
    cardRight: {
      badge: 'EXPERIMENTOS EM PYTORCH',
      title: 'aula_04_estabilidade.ipynb',
      bullets: [
        'Comparativo de curvas de loss: Sem Norm vs BatchNorm vs LayerNorm.',
        'Comparativo de inicializações: Padrão vs Xavier vs Kaiming He.',
        'Rastreamento empírico da variância de gradientes em cada época.'
      ]
    },
    notes: `Reunimos a intuição manual e o rigor do código:
Na planilha simulacao_mlp_iris.xlsx, vocês podem inspecionar cada multiplicação matricial de uma MLP para flores de Iris sem escrever uma linha de código.
E no notebook prático, executamos o comparativo sistemático registrando o ganho real de acurácia com Kaiming He e BatchNorm!`
  },

  // Slide 15: Custom - Quiz
  {
    id: 15,
    type: 'custom',
    title: 'Quiz de Fixação: Estabilidade e Regularização',
    subtitle: 'Teste seus conhecimentos sobre simetria de pesos, BatchNorm e Dropout',
    component: <QuizWidget />,
    notes: `Hora de verificar o domínio dos conceitos de hoje!
Respondam às perguntas interativas sobre a escolha entre Xavier e He, a operação de model.eval() com BatchNorm e a função do Inverted Dropout.`
  },

  // Slide 16: Roadmap - Synthesis & Project 1
  {
    id: 16,
    type: 'roadmap',
    title: 'Síntese da Aula & Requisitos do Projeto 1',
    subtitle: 'Como aplicar a estabilidade na entrega do seu trabalho prático',
    steps: [
      { num: '01', title: 'Inicialização Justificada', desc: 'Comparar formalmente pesos padrão vs Kaiming/Xavier no relatório.' },
      { num: '02', title: 'Normalização Comparada', desc: 'Plotar curvas de loss comparando rede sem normalização vs BatchNorm vs LayerNorm.' },
      { num: '03', title: 'Dropout Calibrado', desc: 'Testar taxas de dropout (ex: 0.2 a 0.5) para controlar o gap treino/validação.' },
      { num: '04', title: 'Controle de Modos', desc: 'Garantir uso estrito de model.train() e model.eval() no loop de treinamento.' }
    ],
    notes: `Lembrem-se da rubrica do Projeto 1:
A estabilidade não é um detalhe estético; é um requisito formal avaliado. Vocês precisarão documentar em gráficos o impacto da inicialização e a diferença no comportamento das curvas de loss com BatchNorm e Dropout.`
  },

  // Slide 17: Next Steps
  {
    id: 17,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 05',
    subtitle: 'Otimização Avançada, Diagnóstico de Gradientes e TensorBoard',
    steps: [
      { num: '01', title: 'Além do SGD', desc: 'Momentum, RMSprop, Adam e AdamW com weight decay desacoplado.' },
      { num: '02', title: 'Learning Rate Schedulers', desc: 'StepLR, Cosine Annealing e decaimento em platô.' },
      { num: '03', title: 'Gradient Norms', desc: 'Diagnóstico visual de Vanishing e Exploding Gradients com Gradient Clipping.' },
      { num: '04', title: 'Monitoramento TensorBoard', desc: 'Painéis interativos em tempo real para curvas de loss e histogramas.' }
    ],
    notes: `Na próxima aula — Aula 05 —, fecharemos o ciclo do Projeto 1 explorando o motor de otimização: os algoritmos AdamW, agendadores de taxa de aprendizado, diagnóstico visual de gradientes com Gradient Clipping e a integração completa com o TensorBoard. Muito obrigado a todos e até a próxima!`
  }
];
