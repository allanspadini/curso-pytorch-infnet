import React from 'react';
import RGBChannelsVisualizer from '../components/interactive/RGBChannelsVisualizer';
import DeepCNNArchitectureViewer from '../components/interactive/DeepCNNArchitectureViewer';
import CNNQuizWidget from '../components/interactive/CNNQuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Arquiteturas Convolucionais Profundas para Imagens RGB',
    subtitle: 'Aula 07 — Da Teoria dos Filtros à Aplicação Real em Agritech (PlantVillage)',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa sétima aula de Redes Neurais Profundas!

Na aula anterior, entendemos a matemática fundamental da convolução e do pooling em matrizes 2D simples do MNIST. Hoje, damos o salto para o mundo real da Visão Computacional moderna: fotos coloridas com 3 canais de cor RGB, resolução real, iluminação variável e ruído de campo.

Aprenderemos como o PyTorch organiza tensores 4D multicanais no padrão NCHW, como os filtros convolucionais operam em 3 dimensões para sintetizar informações de cor e forma, como criar pipelines de Data Augmentation com torchvision.transforms para imunizar a rede contra overfitting, e construiremos uma CNN profunda completa para diagnosticar doenças agrícolas no dataset PlantVillage.

Esta aula é a referência direta e gabarito prático para quem escolher a Opção CNN no Projeto 2. Vamos começar!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Processamento de imagens digitais multiespectrais e sensoriamento remoto.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Visão Computacional', desc: 'Arquiteturas convolucionais profundas aplicadas à classificação e detecção.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Modelos de visão para diagnóstico em dados reais de alta complexidade.' }
    ],
    notes: `Meu nome é Allan Spadini. Trabalhar com imagens reais é muito diferente de datasets didáticos de laboratório. Hoje veremos os cuidados indispensáveis de engenharia de software e pré-processamento que tornam uma CNN capaz de rodar com sucesso em produção no campo.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas para dominar CNNs em imagens RGB reais',
    steps: [
      { num: '01', title: 'Tensores RGB', desc: 'Estrutura 4D no formato PyTorch (N, C=3, H, W).' },
      { num: '02', title: 'Convolução 3D', desc: 'Operação de filtros multicanal somando canais de cor.' },
      { num: '03', title: 'Data Augmentation', desc: 'Transformações estocásticas com torchvision.transforms.' },
      { num: '04', title: 'Arquitetura Profunda', desc: 'Blocos Conv2d + BatchNorm2d + MaxPool2d + Dropout.' },
      { num: '05', title: 'PlantVillage & Projeto 2', desc: 'Treinamento real em Agritech e entrega do Projeto 2.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá:
Primeiro, a anatomia de imagens coloridas e o formato padrão de tensores 4D no PyTorch.
Segundo, como a convolução opera simultaneamente sobre os 3 canais de cor.
Terceiro, técnicas profissionais de Data Augmentation para combater o sobreajuste.
Quarto, a arquitetura modular profunda com BatchNorm2d e Dropout.
E quinto, o treinamento e avaliação no dataset PlantVillage como base direta para o Projeto 2.`
  },

  // Slide 4: Comparison - Grayscale vs RGB
  {
    id: 4,
    type: 'comparison',
    title: 'Da Escala de Cinza para o RGB Multicanal',
    subtitle: 'Como o PyTorch representa a tridimensionalidade da cor',
    cardLeft: {
      badge: 'ESCALA DE CINZA (MNIST)',
      title: 'Tensor Monocanal (1, H, W)',
      bullets: [
        'Apenas 1 matriz 2D com intensidade luminosa.',
        'Valores entre 0.0 (preto) e 1.0 (branco).',
        'Cada filtro convolucional opera em uma matriz 2D plana.'
      ]
    },
    cardRight: {
      badge: 'IMAGEM COLORIDA (RGB)',
      title: 'Tensor Multicanal (3, H, W)',
      bullets: [
        '3 matrizes 2D alinhadas: Vermelho (R), Verde (G) e Azul (B).',
        'No PyTorch: formato NCHW (Batch, Channels, Height, Width).',
        'Cuidado: OpenCV e Matplotlib usam formato HWC por padrão!'
      ]
    },
    notes: `Enquanto no MNIST tínhamos apenas 1 canal de intensidade, imagens do mundo real trazem 3 camadas sobrepostas: Red, Green e Blue.
Atenção à convenção de dimensões: o PyTorch exige estritamente o formato NCHW (Lote, Canais, Altura, Largura). Se você carregar uma imagem com PIL ou OpenCV no formato HWC, precisa transpor os eixos antes de alimentar o modelo!`
  },

  // Slide 5: Custom - RGBChannelsVisualizer
  {
    id: 5,
    type: 'custom',
    title: 'Visualizador Interativo: Decomposição de Canais RGB',
    subtitle: 'Isole cada canal de cor e veja como diferentes comprimentos de onda revelam características distintas',
    component: <RGBChannelsVisualizer />,
    notes: `Usem o simulador na tela.
Vocês podem ligar e desligar individualmente os canais Vermelho, Verde e Azul da imagem.
Reparem que uma folha verde apresenta alta intensidade no canal G e baixa nos canais R e B. Quando uma folha adoece e desenvolve manchas amarelas ou marrons, os valores nos canais R e B disparam! A combinação dos canais é a chave do diagnóstico.`
  },

  // Slide 6: Comparison - Multichannel Convolutions
  {
    id: 6,
    type: 'comparison',
    title: 'Convoluções Através de Múltiplos Canais',
    subtitle: 'Como um filtro 3D gera um mapa de características 2D',
    cardLeft: {
      badge: 'O FILTRO CONVOLUCIONAL',
      title: 'Kernel com Profundidade 3D',
      bullets: [
        'Se a entrada tem 3 canais, o filtro DEVE ter 3 canais: (3, Kh, Kw).',
        'Possui uma matriz de pesos específica para o Vermelho, outra para o Verde e outra para o Azul.',
        'Cada canal é convolvido isoladamente e os resultados são SOMADOS pixel a pixel.'
      ]
    },
    cardRight: {
      badge: 'A SAÍDA DE CADA FILTRO',
      title: '1 Mapa 2D por Filtro',
      bullets: [
        '1 filtro produz exatamente 1 mapa de ativação 2D de saída.',
        'Se quisermos 32 mapas de saída, criamos 32 filtros tridimensionais independentes!',
        'Em PyTorch: nn.Conv2d(in_channels=3, out_channels=32, kernel_size=3).'
      ]
    },
    notes: `Uma dúvida comum entre alunos: se a entrada tem 3 canais, a saída também terá 3? Não!
Cada filtro convolucional possui a mesma profundidade da entrada (3 fatias de 3x3). Ele convoluciona cada canal, soma os 3 resultados e adiciona um viés, produzindo 1 único mapa 2D.
Portanto, o número de canais de saída é exatamente o número de filtros que nós escolhermos criar!`
  },

  // Slide 7: Formula - Multichannel Equation
  {
    id: 7,
    type: 'formula',
    title: 'A Matemática da Convolução Multicanal',
    subtitle: 'Somatório sobre canais de entrada com viés compartilhado',
    formula: 'O_{j}(x, y) = \\sum_{c=1}^{C_{in}} (I_c * K_{j, c})(x, y) + b_j',
    variables: [
      { name: 'C_{in}', desc: 'Número de canais da entrada (ex: 3 para RGB, ou 64 em camadas internas).' },
      { name: 'K_{j, c}', desc: 'Filtro específico do j-ésimo mapa de saída operando sobre o c-ésimo canal de entrada.' },
      { name: 'b_j', desc: 'Termo de viés escalar do j-ésimo filtro.' },
      { name: 'O_j', desc: 'O j-ésimo feature map bidimensional resultante da camada.' }
    ],
    notes: `A equação formal mostra a soma estendida:
Para cada um dos C_in canais, aplicamos a convolução 2D com a fatia correspondente do filtro K.
Somamos todas as contribuições e somamos o viés b_j. É assim que a rede cruza informações de cor, contraste e textura simultaneamente.`
  },

  // Slide 8: Roadmap - torchvision.transforms
  {
    id: 8,
    type: 'roadmap',
    title: 'Pipelines com torchvision.transforms',
    subtitle: 'A esteira de pré-processamento obrigatória para imagens reais',
    steps: [
      { num: '01', title: 'Resize / Crop', desc: 'transforms.Resize((224, 224)) para uniformizar dimensões de câmera.' },
      { num: '02', title: 'Data Augmentation', desc: 'RandomHorizontalFlip() e RandomRotation(15) estocásticos.' },
      { num: '03', title: 'ToTensor', desc: 'Converte imagem PIL [0, 255] em tensor PyTorch float [0.0, 1.0].' },
      { num: '04', title: 'Normalize', desc: 'Padronização com médias e desvios do ImageNet para estabilizar gradientes.' }
    ],
    notes: `Imagens reais chegam com tamanhos arbitrários e formatos diferentes.
O módulo torchvision.transforms organiza a linha de montagem: redimensiona as fotos para um tamanho fixo, aplica aumento de dados, converte em tensores float e normaliza as ativações.`
  },

  // Slide 9: Comparison - Data Augmentation
  {
    id: 9,
    type: 'comparison',
    title: 'Data Augmentation: Treino vs. Validação',
    subtitle: 'Ensinando invariâncias sem alterar o rótulo da imagem',
    cardLeft: {
      badge: 'MODO TREINO (ESTOCÁSTICO)',
      title: 'Aumento de Dados Ativo',
      bullets: [
        'A cada época, a mesma imagem é ligeiramente alterada.',
        'Espelhamento horizontal, pequenas rotações e ajustes de brilho.',
        'Uma folha de tomate com praga continua com praga de ponta-cabeça!',
        'Multiplica virtualmente o tamanho do dataset e destrói o overfitting.'
      ]
    },
    cardRight: {
      badge: 'MODO VALIDAÇÃO & TESTE (DETERMINÍSTICO)',
      title: 'Sem Transformações Aleatórias',
      bullets: [
        'Apenas Resize e Normalize.',
        'Nenhum espelhamento ou rotação estocástica.',
        'Garante que a avaliação seja 100% reproduzível e justa.'
      ]
    },
    notes: `Prestem muita atenção: Data Augmentation é aplicado EXCLUSIVAMENTE no conjunto de treinamento!
Se rodarmos transformações aleatórias na validação ou no teste, a cada execução o resultado mudará ligeiramente. A validação deve medir o desempenho determinístico sobre as imagens puras.`
  },

  // Slide 10: Formula - ImageNet Normalization
  {
    id: 10,
    type: 'formula',
    title: 'A Normalização Padrão ImageNet',
    subtitle: 'Alinhando os canais RGB com a distribuição de milhões de imagens reais',
    formula: 'x_{norm} = \\frac{x - \\mu}{\\sigma}, \\quad \\mu = [0.485, 0.456, 0.406], \\quad \\sigma = [0.229, 0.224, 0.225]',
    variables: [
      { name: '\\mu', desc: 'Médias empíricas dos canais R, G e B calculadas sobre mais de 1 milhão de fotos do ImageNet.' },
      { name: '\\sigma', desc: 'Desvios padrão empíricos dos canais R, G e B no ImageNet.' },
      { name: 'Convergência', desc: 'Centraliza as ativações em zero e acelera o SGD em redes profundas pré-treinadas ou do zero.' }
    ],
    notes: `Estes números mágicos de média e desvio padrão foram calculados sobre milhões de imagens do ImageNet.
Ao aplicar transforms.Normalize com esses valores, garantimos que as ativações de entrada de cada canal de cor fiquem centradas em zero e com variância unitária, eliminando assimetrias de iluminação entre câmeras diferentes.`
  },

  // Slide 11: Comparison - Deep CNN Anatomy
  {
    id: 11,
    type: 'comparison',
    title: 'A Anatomia da CNN Profunda Moderna',
    subtitle: 'Composição de blocos Conv2D, BatchNorm2d, ReLU e MaxPool2d',
    cardLeft: {
      badge: 'BLOCO CONVOLUCIONAL MODULAR',
      title: 'Estrutura Repetível',
      bullets: [
        'nn.Conv2d(in, out, kernel_size=3, padding=1)',
        'nn.BatchNorm2d(out): normaliza ativações espaciais.',
        'nn.ReLU(): não-linearidade clássica não-saturante.',
        'nn.MaxPool2d(2, 2): reduz resolução pela metade.',
        'Padrão: dobrar canais (32 → 64 → 128) enquanto reduz o tamanho espacial.'
      ]
    },
    cardRight: {
      badge: 'CABEÇA DE CLASSIFICAÇÃO',
      title: 'Transição Densa com Dropout',
      bullets: [
        'nn.AdaptiveAvgPool2d((1, 1)) ou Flattening direto.',
        'nn.Dropout(p=0.4): previne memorização de folhas específicas.',
        'nn.Linear: mapeia features abstratas para o número de classes.',
        'Saída com logits puros para nn.CrossEntropyLoss().'
      ]
    },
    notes: `Observem o padrão arquitetural clássico:
Conforme a rede se aprofunda, o tamanho espacial (largura e altura) diminui com o pooling, enquanto o número de canais aumenta (de 3 para 32, depois 64, depois 128).
Isso reflete a hierarquia da visão: no início, mapas grandes detectam bordas simples. No fim, mapas pequenos e profundos detectam conceitos semânticos ricos!`
  },

  // Slide 12: Custom - Upsampling & Architectures
  {
    id: 12,
    type: 'custom',
    title: 'Visualizador de Arquiteturas Convolucionais',
    subtitle: 'Acompanhe a redução da resolução espacial e o aumento na profundidade de canais',
    component: <DeepCNNArchitectureViewer />,
    notes: `Neste diagrama interativo, visualizem como as representações mudam de forma geométrica:
A imagem começa espaçosa e rasa (3 canais RGB) e gradualmente se estreita até se tornar um vetor latente compacto e denso em semântica.`
  },

  // Slide 13: Formula - Linear Layer Calculation
  {
    id: 13,
    type: 'formula',
    title: 'Cálculo da Transição Espacial para nn.Linear',
    subtitle: 'Como saber a dimensão exata de entrada da camada densa sem errar',
    formula: '\\text{Entrada Densa} = C_{final} \\times H_{final} \\times W_{final}',
    variables: [
      { name: 'Imagem Inicial', desc: 'Exemplo: 3 × 128 × 128.' },
      { name: 'Após 3 Poolings (2x2)', desc: '128 → 64 → 32 → 16 pixels de altura e largura.' },
      { name: 'Canais Finais', desc: 'Se o último bloco tem 128 filtros: dimensão = 128 × 16 × 16 = 32.768.' },
      { name: 'nn.Linear', desc: 'Primeira camada densa: nn.Linear(32768, 512).' }
    ],
    notes: `Um dos erros mais comuns de iniciantes é errar o número de neurônios da primeira camada densa após o Flattening.
Para nunca errar: calcule quantas vezes o MaxPool2d(2, 2) foi aplicado. Se sua imagem tem 128x128 e passou por 3 poolings, a dimensão espacial caiu para 16x16. Multiplique pelo número de canais da última convolução e você terá a entrada exata!`
  },

  // Slide 14: Comparison - The PlantVillage Study
  {
    id: 14,
    type: 'comparison',
    title: 'Estudo de Caso Agritech: Dataset PlantVillage',
    subtitle: 'Diagnóstico precoce de pragas e doenças em folhas agrícolas',
    cardLeft: {
      badge: 'O PROBLEMA REAL',
      title: 'Segurança Alimentar & Perdas',
      bullets: [
        'Pragas foliares destroem até 40% das colheitas agrícolas no mundo.',
        'Pequenos agricultores não têm acesso frequente a agrônomos especialistas.',
        'Diagnóstico precoce via smartphone previne propagação em larga escala.'
      ]
    },
    cardRight: {
      badge: 'A SOLUÇÃO CONVOLUCIONAL',
      title: 'PlantVillageCNN no PyTorch',
      bullets: [
        'Milhares de imagens de folhas saudáveis e com múltiplas patologias.',
        'A CNN aprende a diferenciar ferrugem, míldio, queimadura e folhas sadias.',
        'Acurácia > 90% em campo com validação cruzada independente.'
      ]
    },
    notes: `O PlantVillage é um marco no uso de Visão Computacional para o bem social.
Ele reúne fotos de folhas de tomate, batata, milho e maçã com diagnósticos rotulados por patologistas de plantas. Nosso modelo aprende a identificar a textura e manchas foliares antes mesmo do olho humano perceber a infecção!`
  },

  // Slide 15: Custom - Quiz
  {
    id: 15,
    type: 'custom',
    title: 'Quiz de Fixação: CNNs em Imagens RGB Reais',
    subtitle: 'Teste seus conhecimentos sobre tensores NCHW, transforms e cálculo dimensional',
    component: <CNNQuizWidget />,
    notes: `Hora do nosso teste de fixação!
Respondam às perguntas interativas sobre a ordem das dimensões no PyTorch, o uso correto de Data Augmentation e o cálculo de transição para camadas lineares.`
  },

  // Slide 16: Roadmap - Checklist Projeto 2 (CNN)
  {
    id: 16,
    type: 'roadmap',
    title: 'Checklist de Entrega: Projeto 2 (Opção CNN)',
    subtitle: 'Requisitos formais da rubrica de avaliação para imagens',
    steps: [
      { num: '01', title: 'Dataset & Transforms', desc: 'Ingestão de imagens reais RGB com Data Augmentation no treino.' },
      { num: '02', title: 'Arquitetura Convolucional', desc: 'nn.Conv2d, nn.BatchNorm2d, nn.MaxPool2d, cálculo correto para Linear.' },
      { num: '03', title: 'Treinamento & Diagnóstico', desc: 'Loss de treino e validação, detecção de overfitting e baseline documentado.' },
      { num: '04', title: 'Matriz de Confusão', desc: 'Interpretação detalhada dos erros entre classes na avaliação cega de teste.' }
    ],
    notes: `Se você escolher a Opção CNN no Projeto 2, este é o seu roteiro de entrega!
O notebook da Aula 07 foi construído exatamente para servir como gabarito de engenharia, contendo a ingestão com transforms, os blocos convolucionais com BatchNorm2d e a análise detalhada de matriz de confusão.`
  },

  // Slide 17: Next Steps
  {
    id: 17,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 08',
    subtitle: 'Autoencoders Convolucionais, Espaço Latente & Detecção de Anomalias',
    steps: [
      { num: '01', title: 'Aprendizado Não-Supervisionado', desc: 'Treinando redes sem rótulos através de tarefas de reconstrução.' },
      { num: '02', title: 'O Gargalo (Bottleneck)', desc: 'Compressão dimensional e projeção do espaço latente com t-SNE e PCA.' },
      { num: '03', title: 'Convolução Transposta', desc: 'Reconstrução de imagens em alta resolução com nn.ConvTranspose2d.' },
      { num: '04', title: 'Detecção de Anomalias', desc: 'Gabarito prático e conceitual do Estudo de Caso 2 da disciplina.' }
    ],
    notes: `Na próxima aula — Aula 08 —, mudaremos de paradigma: o que fazer quando não temos rótulos?
Veremos os Autoencoders Convolucionais, a matemática da compressão no espaço latente e resolveremos o Estudo de Caso 2 (Detecção de Anomalias sem supervisão).`
  },

  // Slide 18: Synthesis
  {
    id: 18,
    type: 'roadmap',
    title: 'Síntese da Aula 07',
    subtitle: 'Dominando Visão Computacional Profunda no PyTorch',
    steps: [
      { num: '01', title: 'Tensores NCHW', desc: 'Compreensão completa do fluxo de batches e canais RGB.' },
      { num: '02', title: 'Generalização em Campo', desc: 'Data Augmentation e normalização ImageNet como barreiras ao sobreajuste.' },
      { num: '03', title: 'Robustez Arquitetural', desc: 'BatchNorm2d e Dropout estabilizando filtros profundos.' },
      { num: '04', title: 'Prática Concluída', desc: 'Modelo funcional pronto para execução e inspeção em notebook.' }
    ],
    notes: `Com isso concluímos nossa sétima aula! Vocês agora dominam o pipeline moderno de redes convolucionais para imagens coloridas do mundo real. Muito obrigado a todos e até a próxima aula!`
  }
];
