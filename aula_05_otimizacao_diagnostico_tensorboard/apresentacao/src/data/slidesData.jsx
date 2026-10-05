import React from 'react';
import LROptimizerSimulator from '../components/interactive/LROptimizerSimulator';
import TrainingDiagnosticsWidget from '../components/interactive/TrainingDiagnosticsWidget';
import GradientFlowSimulator from '../components/interactive/GradientFlowSimulator';
import QuizWidget from '../components/interactive/QuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Otimização Avançada, Diagnóstico de Gradientes e TensorBoard',
    subtitle: 'Aula 05 — O Motor de Aprendizado, Monitoramento Visual e Checkpoints em PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa quinta aula de Redes Neurais Profundas!

Hoje fecharemos o ciclo fundamental de modelagem densa e treinamento supervisionado, completando todos os requisitos de entrega do Projeto 1 da disciplina.

Exploraremos o coração do aprendizado de máquina: o otimizador. Entenderemos por que o SGD puro muitas vezes fica preso em ravinas, como o Momentum adiciona física e inércia à descida, e por que o AdamW se tornou o padrão absoluto da indústria ao desacoplar a penalização de norma L2.

Além disso, aprenderemos a diagnosticar a saúde da rede inspecionando a Norma dos Gradientes, aplicar Gradient Clipping para conter instabilidades numéricas, salvar o melhor modelo com state_dict e monitorar experimentos em tempo real usando o TensorBoard. Vamos em frente!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Sólida base matemática em cálculo multivariado e otimização não-linear.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Ciência de Dados e IA', desc: 'Especialista em pipelines de Deep Learning e diagnósticos de gradientes.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Desenvolvimento e monitoramento de arquiteturas neurais em escala.' }
    ],
    notes: `Meu nome é Allan Spadini. Na aula de hoje, compartilharei com vocês as práticas essenciais que os engenheiros de IA utilizam no dia a dia para garantir que modelos complexos convirjam com rapidez, sem explosão de gradientes e com total rastreabilidade.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas para dominar o ciclo de otimização profissional',
    steps: [
      { num: '01', title: 'Família de Otimizadores', desc: 'Do SGD puro ao Momentum, RMSprop, Adam e AdamW.' },
      { num: '02', title: 'LR Schedulers', desc: 'Decaimento dinâmico da taxa de aprendizado em platôs.' },
      { num: '03', title: 'Diagnóstico de Gradientes', desc: 'Rastreamento de normas e aplicação de Gradient Clipping.' },
      { num: '04', title: 'Checkpoints & TensorBoard', desc: 'Salvamento de pesos com state_dict e visualização ao vivo.' },
      { num: '05', title: 'Optuna & Projeto 1', desc: 'Otimização bayesiana e checklist de entrega da avaliação.' }
    ],
    notes: `Nosso roteiro de 90 minutos está estruturado em cinco blocos:
Primeiro, entenderemos os mecanismos internos dos algoritmos de otimização modernos.
Segundo, veremos como desacelerar a taxa de aprendizado com Schedulers para refinar os mínimos.
Terceiro, diagnosticaremos a saúde numérica calculando Gradient Norms e aplicando Clipping.
Quarto, implementaremos o monitoramento profissional com TensorBoard e salvamento de checkpoints.
E quinto, realizaremos a busca bayesiana com Optuna e revisaremos a entrega do Projeto 1.`
  },

  // Slide 4: Comparison - The Optimizer Landscape
  {
    id: 4,
    type: 'comparison',
    title: 'A Evolução dos Otimizadores',
    subtitle: 'Comparando a dinâmica dos algoritmos na superfície de perda',
    cardLeft: {
      badge: 'MOMENTUM & INÉRCIA',
      title: 'SGD com Momentum (Polyak / Nesterov)',
      bullets: [
        'Adiciona um termo de velocidade: v = β·v + ∇L.',
        'Acumula velocidade em direções consistentes de declive.',
        'Cancela oscilações transversais em ravinas estreitas.',
        'Convergência muito mais rápida do que o SGD clássico.'
      ]
    },
    cardRight: {
      badge: 'TAXAS ADAPTATIVAS',
      title: 'Adam & AdamW (Loshchilov & Hutter)',
      bullets: [
        'Mantém médias móveis de 1ª ordem (média) e 2ª ordem (variância).',
        'Cada peso possui sua própria taxa de aprendizado individualizada.',
        'AdamW desacopla o Weight Decay do passo de gradiente escalonado.',
        'Otimizador padrão em visão, NLP e redes profundas modernas.'
      ]
    },
    notes: `O SGD puro sofre com superfícies de perda reais, que contêm ravinas onde o gradiente aponta quase perpendicularmente ao vale do mínimo.
O Momentum introduz o conceito físico de uma bola de boliche descendo a ladeira: ela ganha velocidade na direção consistente e amortece as oscilações laterais.
O AdamW vai além: estima individualmente a variância de cada gradiente para dar passos menores onde o gradiente varia muito e passos maiores onde o gradiente é suave. O AdamW é a escolha padrão recomendada para a maioria das arquiteturas.`
  },

  // Slide 5: Custom - LROptimizerSimulator
  {
    id: 5,
    type: 'custom',
    title: 'Simulador Interativo: Trajetórias de Otimização',
    subtitle: 'Observe a trajetória de SGD, Momentum e Adam em uma ravina não-convexa',
    component: <LROptimizerSimulator />,
    notes: `Utilizem o simulador na tela.
Vocês podem clicar em diferentes pontos do relevo e disparar a otimização com SGD, Momentum e Adam.
Notem como o SGD fica oscilando entre as paredes da ravina avançando muito devagar, enquanto o Adam se orienta suavemente pelo fundo do cânion até o mínimo global.`
  },

  // Slide 6: Roadmap - LR Schedulers
  {
    id: 6,
    type: 'roadmap',
    title: 'Agendadores de Taxa de Aprendizado (LR Schedulers)',
    subtitle: 'Por que uma taxa de aprendizado estática raramente atinge o melhor mínimo',
    steps: [
      { num: '01', title: 'Fase Inicial (Exploração)', desc: 'LR alto (ex: 1e-3) para atravessar platôs e escapar de mínimos rasos.' },
      { num: '02', title: 'Fase Intermediária (Aproximação)', desc: 'Redução sistemática para se estabilizar na bacia de atração do mínimo.' },
      { num: '03', title: 'Fase Final (Refinamento Fino)', desc: 'LR minúsculo (ex: 1e-5) para encontrar o ponto exato de menor erro sem oscilar.' }
    ],
    notes: `Manter a mesma taxa de aprendizado do início ao fim é como tentar estacionar um carro a 100 km/h: você passará batido pela vaga!
Os agendadores de taxa (LR Schedulers) reduzem gradativamente a taxa de aprendizado à medida que o treinamento evolui, garantindo que o modelo pouse com precisão cirúrgica no fundo do vale.`
  },

  // Slide 7: Comparison - StepLR vs ReduceLROnPlateau
  {
    id: 7,
    type: 'comparison',
    title: 'StepLR vs. ReduceLROnPlateau',
    subtitle: 'Decaimento pré-programado por época vs. decaimento adaptativo orientado por feedback',
    cardLeft: {
      badge: 'DECAIMENTO POR TEMPO',
      title: 'torch.optim.lr_scheduler.StepLR',
      bullets: [
        'Multiplica o LR por gamma a cada step_size épocas fixas.',
        'Exemplo: step_size=10, gamma=0.5 corta a taxa pela metade a cada 10 épocas.',
        'Previsível e simples, mas cego ao comportamento real da perda.'
      ]
    },
    cardRight: {
      badge: 'DECAIMENTO POR FEEDBACK',
      title: 'ReduceLROnPlateau',
      bullets: [
        'Monitora diretamente a perda de validação: scheduler.step(val_loss).',
        'Se a val_loss parar de cair por patience épocas, reduz o LR.',
        'Altamente responsivo: só desacelera quando o modelo realmente precisa.'
      ]
    },
    notes: `Comparando os dois principais agendadores do PyTorch:
O StepLR é programado por relógio: a cada X épocas, ele reduz a taxa.
Já o ReduceLROnPlateau é reativo e inteligente: ele observa a perda de validação. Se o modelo parar de evoluir por 3 ou 5 épocas consecutivas, ele detecta o platô e reduz a taxa de aprendizado pela metade, permitindo que a rede destrave!`
  },

  // Slide 8: Formula - Gradient Norm
  {
    id: 8,
    type: 'formula',
    title: 'A Matemática da Norma dos Gradientes',
    subtitle: 'O termômetro numérico da saúde de treinamento de uma rede profunda',
    formula: '\\|\\nabla_{\\theta} L\\|_2 = \\sqrt{\\sum_{p \\in \\theta} \\sum_i \\left(\\frac{\\partial L}{\\partial p_i}\\right)^2}',
    variables: [
      { name: '\\theta', desc: 'Conjunto de todos os tensores de parâmetros da rede com requires_grad=True.' },
      { name: '\\|\\nabla L\\|_2', desc: 'Norma euclidiana total (comprimento do vetor combinado de todos os gradientes).' },
      { name: 'Norma Saudável', desc: 'Tipicamente oscila de forma suave entre 0.1 e 3.0 durante o treinamento.' },
      { name: 'Norma Problemática', desc: '< 1e-4 indica Vanishing Gradients; > 10.0 indica risco iminente de explosão.' }
    ],
    notes: `A Norma do Gradiente é a ferramenta de diagnóstico mais poderosa que você pode implementar no seu training loop.
Ela condensa os milhões de derivadas parciais da rede em um único número escalar positivo: o comprimento total do passo de gradiente.
Se a norma cair abaixo de 10⁻⁴, a rede parou de aprender. Se ela disparar acima de 10 ou 15, uma atualização gigante pode catapultar os pesos para longe do mínimo e gerar NaNs!`
  },

  // Slide 9: Custom - GradientFlowSimulator
  {
    id: 9,
    type: 'custom',
    title: 'Simulador Interativo: Fluxo de Gradiente por Camada',
    subtitle: 'Inspecione a magnitude do gradiente da saída até as primeiras camadas de entrada',
    component: <GradientFlowSimulator />,
    notes: `Neste simulador, podemos inspecionar o fluxo de gradiente em cada camada da rede.
Observem como em redes mal configuradas o gradiente vai enfraquecendo exponencialmente conforme caminha de volta para a entrada. Quando o gradiente chega na camada 1, ele é insignificante! Com boas escolhas de arquitetura e normalização, o fluxo se mantém equilibrado.`
  },

  // Slide 10: Comparison - Vanishing vs Exploding
  {
    id: 10,
    type: 'comparison',
    title: 'Vanishing vs. Exploding Gradients',
    subtitle: 'Os dois extremos patológicos da diferenciação automática em redes profundas',
    cardLeft: {
      badge: 'GRADIENTE DESVANECENTE',
      title: 'Vanishing Gradients (Norma → 0)',
      bullets: [
        'Causa: Funções saturantes (Sigmoid/Tanh) e pesos com variância decrescente.',
        'Sintoma: Loss estagnada desde as primeiras épocas; camadas iniciais não mudam.',
        'Remédio: Ativações não-saturantes (ReLU/GELU), inicialização He e BatchNorm.'
      ]
    },
    cardRight: {
      badge: 'GRADIENTE EXPLOSIVO',
      title: 'Exploding Gradients (Norma > 10)',
      bullets: [
        'Causa: Pesos grandes e multiplicações sucessivas em cadeias profundas/temporais.',
        'Sintoma: Spikes gigantes de loss, pesos infinitos e perda transformando-se em NaN.',
        'Remédio: Gradient Clipping e redução imediata da taxa de aprendizado.'
      ]
    },
    notes: `Temos aqui o dilema clássico da retropropagação:
Se as derivadas forem menores que 1, a multiplicação em cascata leva a zero (desvanecimento).
Se as derivadas forem maiores que 1, a multiplicação em cascata leva a infinito (explosão).
Para mitigar explosões repentinas durante o treinamento, o PyTorch oferece uma ferramenta cirúrgica chamada Gradient Clipping.`
  },

  // Slide 11: Formula - Gradient Clipping
  {
    id: 11,
    type: 'formula',
    title: 'A Matemática do Gradient Clipping',
    subtitle: 'Preservando a direção correta da descida enquanto limita a magnitude do passo',
    formula: 'g \\leftarrow g \\cdot \\frac{\\text{max\\_norm}}{\\max(\\|g\\|_2, \\; \\text{max\\_norm})}',
    variables: [
      { name: 'g', desc: 'Vetor de gradientes calculado pelo backpropagation (loss.backward()).' },
      { name: '\\|g\\|_2', desc: 'Norma euclidiana calculada sobre todos os parâmetros.' },
      { name: 'max_norm', desc: 'Teto máximo permitido (tipicamente configurado entre 1.0 e 5.0).' },
      { name: 'torch.nn.utils', desc: 'clip_grad_norm_(model.parameters(), max_norm=1.0) aplicado antes de optimizer.step().' }
    ],
    notes: `Prestem atenção no elegance do Gradient Clipping por norma:
Ele não simplesmente corta os valores maiores individualmente. Ele calcula a norma total do vetor e, se ela ultrapassar o teto max_norm, divide todo o vetor por um fator proporcional.
Isso significa que a DIREÇÃO do gradiente é preservada com 100% de exatidão! Apenas a velocidade do passo é contida para evitar desastres numéricos.`
  },

  // Slide 12: Custom - TrainingDiagnosticsWidget
  {
    id: 12,
    type: 'custom',
    title: 'Painel Interativo de Diagnóstico de Treinamento',
    subtitle: 'Monitore em tempo real as curvas de Loss, Gradient Norms e Taxa de Aprendizado',
    component: <TrainingDiagnosticsWidget />,
    notes: `Este widget interativo simula exatamente a tela de monitoramento que vocês acompanharão em seus notebooks.
Observem a correlação direta: quando o modelo atinge um platô, o scheduler entra em ação reduzindo a taxa de aprendizado, a norma do gradiente cai para valores finos e a loss de validação dá um novo salto positivo de convergência!`
  },

  // Slide 13: Comparison - Checkpoints with state_dict
  {
    id: 13,
    type: 'comparison',
    title: 'Checkpoints Seguros com state_dict',
    subtitle: 'A prática profissional de salvamento e recuperação do melhor modelo',
    cardLeft: {
      badge: 'MÁ PRÁTICA: SALVAR OBJETO',
      title: 'torch.save(model, path)',
      bullets: [
        'Serializa a classe Python inteira via Pickle.',
        'Quebra se a estrutura do código ou caminhos de pastas mudarem.',
        'Problemas graves de compatibilidade entre versões de PyTorch e SO.'
      ]
    },
    cardRight: {
      badge: 'BOA PRÁTICA: SALVAR STATE_DICT',
      title: 'torch.save(model.state_dict(), path)',
      bullets: [
        'Salva apenas o dicionário de tensores de pesos e viés calibrados.',
        'Totalmente desacoplado do código-fonte e portável.',
        'Permite carregar pesos com model.load_state_dict(torch.load(path)).'
      ]
    },
    notes: `Nunca salvem a instância inteira da classe da sua rede neural com torch.save(model). Salvem sempre apenas o model.state_dict().
O state_dict é um dicionário limpo que mapeia o nome de cada camada aos seus tensores de pesos calibrados. Isso garante máxima portabilidade, segurança e compatibilidade entre diferentes ambientes e sistemas operacionais.`
  },

  // Slide 14: Roadmap - TensorBoard Integration
  {
    id: 14,
    type: 'roadmap',
    title: 'Rastreamento com TensorBoard',
    subtitle: 'Auditoria visual de experimentos em tempo real com SummaryWriter',
    steps: [
      { num: '01', title: 'Inicialização', desc: 'writer = SummaryWriter(log_dir="runs/experimento_1")' },
      { num: '02', title: 'Registro Escalar', desc: 'writer.add_scalar("Loss/Train", train_loss, epoch)' },
      { num: '03', title: 'Histograma de Pesos', desc: 'writer.add_histogram("Pesos/Camada1", model.fc1.weight, epoch)' },
      { num: '04', title: 'Painel Web', desc: 'tensorboard --logdir=runs acessível diretamente no navegador.' }
    ],
    notes: `O TensorBoard é a central de comando do engenheiro de Deep Learning.
Com poucas linhas de código usando o SummaryWriter, vocês podem registrar curvas de loss de treino e validação, acompanhar decaimentos de taxa de aprendizado e inspecionar a distribuição de ativações através de histogramas dinâmicos.`
  },

  // Slide 15: Custom - Quiz
  {
    id: 15,
    type: 'custom',
    title: 'Quiz de Fixação: Otimização & Diagnóstico',
    subtitle: 'Teste seus conhecimentos sobre AdamW, Gradient Clipping e Checkpoints',
    component: <QuizWidget />,
    notes: `Vamos testar a fixação dos conceitos de hoje!
Respondam às perguntas interativas sobre a vantagem do AdamW, o papel do Gradient Clipping e a forma correta de salvar checkpoints em PyTorch.`
  },

  // Slide 16: Roadmap - Checklist Projeto 1
  {
    id: 16,
    type: 'roadmap',
    title: 'Checklist Definitivo: Entrega do Projeto 1',
    subtitle: 'Tudo o que você precisa para obter pontuação máxima na rubrica de avaliação',
    steps: [
      { num: '01', title: 'Arquitetura nn.Module', desc: 'MLP modular com forward explícito para classificação e regressão.' },
      { num: '02', title: 'Inicialização & Norms', desc: 'Comparação empírica de Kaiming/Xavier vs padrão e BatchNorm vs LayerNorm.' },
      { num: '03', title: 'Diagnóstico de Gradientes', desc: 'Gráfico de evolução da norma ||∇L|| e aplicação justificada de clipping.' },
      { num: '04', title: 'TensorBoard & Checkpoint', desc: 'Logs de treinamento em tempo real e salvamento do melhor modelo via state_dict.' }
    ],
    notes: `Atenção especial a este slide: este é o checklist completo do Projeto 1 da disciplina.
Ao final desta aula, vocês têm exatamente todo o ferramental teórico e prático para concluir o Projeto 1 com nota máxima: a arquitetura modular, a prevenção de vazamento de dados, as comparações de estabilização, o diagnóstico de gradientes e o monitoramento via TensorBoard.`
  },

  // Slide 17: Next Steps
  {
    id: 17,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 06',
    subtitle: 'Entrando no Universo da Visão Computacional com Redes Convolucionais',
    steps: [
      { num: '01', title: 'A Imagem Digital', desc: 'Pixels, canais e a representação de imagens como matrizes e tensores.' },
      { num: '02', title: 'Falha do Flattening', desc: 'Por que esticar imagens para MLPs quebra a localidade espacial.' },
      { num: '03', title: 'Convolução 2D & Kernels', desc: 'Filtros como detectores automáticos de bordas, cantos e texturas.' },
      { num: '04', title: 'Primeira CNN no MNIST', desc: 'Construção da primeira arquitetura convolucional completa em PyTorch.' }
    ],
    notes: `Na nossa próxima aula — Aula 06 —, daremos início ao módulo de Visão Computacional!
Deixaremos os dados tabulares 1D e entraremos no mundo das imagens bidimensionais, descobrindo por que as redes convolucionais revolucionaram a visão artificial. Parabéns pelo excelente trabalho até aqui e nos vemos na Aula 06!`
  }
];
