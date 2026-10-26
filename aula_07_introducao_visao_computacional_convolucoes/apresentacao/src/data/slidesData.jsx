import React from 'react';
import GrayMatrixExploration from '../components/interactive/GrayMatrixExploration';
import Conv1DSimulator from '../components/interactive/Conv1DSimulator';
import Conv2DMatrixStepSimulator from '../components/interactive/Conv2DMatrixStepSimulator';
import PoolingSimulator from '../components/interactive/PoolingSimulator';
import CNNQuizWidget from '../components/interactive/CNNQuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Introdução à Visão Computacional e Redes Convolucionais',
    subtitle: 'Aula 06 — Da Ruptura do Flattening à Geometria dos Filtros 2D no PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa sexta aula de Redes Neurais Profundas!

Hoje iniciamos nosso módulo de Visão Computacional. Até a aula passada, tratávamos cada dado como uma lista de números tabulares independentes. Mas quando olhamos para uma imagem, os pixels não são independentes: eles possuem uma geometria espacial bidimensional sagrada!

Veremos por que achatar uma imagem com Flattening para alimentar uma rede densa comum é um erro estrutural grave. Em seguida, descobriremos como a operação de Convolução 2D, os Kernels detectores de bordas e as camadas de Pooling transformaram a visão por computador, permitindo que máquinas reconheçam formas e objetos com alta precisão e baixíssimo consumo de parâmetros. Vamos começar!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Processamento de sinais multidimensionais, filtragem e convolução física.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Visão Computacional', desc: 'Arquiteturas convolucionais profundas, detecção e segmentação de padrões.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Modelos profundos de extração e aprendizado de representações visuais.' }
    ],
    notes: `Meu nome é Allan Spadini. Na geofísica e na computação, a convolução é a ferramenta central de análise de sinais e imagens há décadas. Hoje, desmistificaremos essa operação matemática para que vocês dominem como o PyTorch enxerga matrizes de pixels.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco etapas da jornada convolucional',
    steps: [
      { num: '01', title: 'A Imagem Digital', desc: 'Matrizes de pixels discretos [0, 255] e tensores de imagem.' },
      { num: '02', title: 'Falha do Flattening', desc: 'Por que esticar imagens quebra a localidade e explode parâmetros.' },
      { num: '03', title: 'A Convolução 2D', desc: 'A matemática da janela deslizante e detectores de borda.' },
      { num: '04', title: 'Padding & Stride', desc: 'Cálculo geométrico exato das dimensões de mapas de features.' },
      { num: '05', title: 'Max Pooling & MNIST', desc: 'Invariância translacional e primeira CNN completa no PyTorch.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá:
Primeiro, como o computador interpreta uma imagem como matriz de intensidade de luz.
Segundo, os três motivos técnicos pelos quais redes MLP comuns falham ao processar imagens.
Terceiro, o mecanismo do kernel convolucional como detector de bordas.
Quarto, a fórmula de dimensionamento com padding e stride.
E quinto, o papel do Max Pooling e a construção da nossa primeira CNN no dataset MNIST.`
  },

  // Slide 4: Comparison - The Digital Image
  {
    id: 4,
    type: 'comparison',
    title: 'O Que é Uma Imagem Digital?',
    subtitle: 'Uma matriz bidimensional de intensidades luminosas',
    cardLeft: {
      badge: 'VISÃO HUMANA',
      title: 'Percepção Visual Contínua',
      bullets: [
        'Enxergamos formas, contornos, objetos e rostos.',
        'Percebemos imediatamente a relação entre pontos vizinhos.',
        'Reconhecemos um padrão mesmo que ele mude de posição.'
      ]
    },
    cardRight: {
      badge: 'VISÃO DA MÁQUINA',
      title: 'Matriz Numérica Discreta',
      bullets: [
        'Uma grade 2D de números inteiros entre 0 (preto) e 255 (branco).',
        'Em PyTorch, convertemos para tensores float no intervalo [0.0, 1.0].',
        'Formato em escala de cinza: (1, Altura, Largura).'
      ]
    },
    notes: `Para um computador, uma imagem em escala de cinza nada mais é do que uma planilha de números!
Cada célula é um pixel variando de 0 (ausência de luz, preto absoluto) até 255 (intensidade máxima, branco absoluto). No PyTorch, dividimos por 255.0 para obter números entre 0 e 1, facilitando a convergência dos gradientes.`
  },

  // Slide 5: Custom - GrayMatrixExploration
  {
    id: 5,
    type: 'custom',
    title: 'Explorador Interativo de Matrizes de Pixels',
    subtitle: 'Passe o mouse sobre os pixels para ver seus valores numéricos e o efeito do Flattening',
    component: <GrayMatrixExploration />,
    notes: `Usem o simulador interativo na tela.
Ao passar o mouse sobre a imagem do gato, vocês conseguem ver os valores exatos de cada pixel.
Notem o botão de Flattening: ao esticarmos essa imagem em uma linha contínua, o pixel logo abaixo da orelha vai parar centenas de posições à frente no vetor! A conexão de vizinhança é perdida.`
  },

  // Slide 6: Comparison - Why Flattening Fails
  {
    id: 6,
    type: 'comparison',
    title: 'Por Que o Flattening Falha em Imagens?',
    subtitle: 'Os três gargalos fundamentais das MLPs em visão computacional',
    cardLeft: {
      badge: 'QUEBRA ESPACIAL & TRANSLADAÇÃO',
      title: 'Ausência de Invariância',
      bullets: [
        'Destrói a relação 2D de proximidade entre linhas adjacentes.',
        'Vulnerável a translação: se o gato se mover 2 pixels, a entrada muda totalmente.',
        'A MLP precisa reaprender o mesmo gato em cada coordenada da imagem.'
      ]
    },
    cardRight: {
      badge: 'EXPLOSÃO DE PESOS',
      title: 'Parâmetros Excessivos',
      bullets: [
        'Imagem 100x100 com 3 canais = 30.000 entradas.',
        'Uma camada densa com 1000 neurônios gera 30.000.000 de conexões!',
        'Custo de memória absurdo e propensão massiva a overfitting.'
      ]
    },
    notes: `Este é o argumento central que vocês utilizarão na Etapa 2 do Projeto 2:
Primeiro, o flattening quebra a vizinhança espacial.
Segundo, ele carece de invariância translacional: a rede não percebe que um olho desenhado no canto é o mesmo olho desenhado no centro.
E terceiro, a quantidade de pesos em camadas densas explode descontroladamente, tornando o treino inviável em resoluções reais.`
  },

  // Slide 7: Custom - Conv1DSimulator
  {
    id: 7,
    type: 'custom',
    title: 'Intuição Unidimensional da Convolução',
    subtitle: 'Como um filtro deslizante detecta padrões locais através de pesos compartilhados',
    component: <Conv1DSimulator />,
    notes: `Antes de irmos para 2D, vejam a intuição 1D na tela.
Temos um filtro com 3 pesos. Ele desliza sobre o sinal fazendo a multiplicação e soma.
Notem que os MESMOS pesos são reutilizados em todas as posições: isso é o Compartilhamento de Parâmetros (Parameter Sharing)!`
  },

  // Slide 8: Formula - 2D Convolution Formula
  {
    id: 8,
    type: 'formula',
    title: 'A Matemática da Convolução 2D',
    subtitle: 'O produto interno deslizante entre o kernel e o campo receptivo local',
    formula: '(I * K)(i, j) = \\sum_{m=0}^{k_h - 1} \\sum_{n=0}^{k_w - 1} I(i + m, \\; j + n) \\cdot K(m, n)',
    variables: [
      { name: 'I', desc: 'Matriz da imagem de entrada (ou mapa de ativações da camada anterior).' },
      { name: 'K', desc: 'Filtro (Kernel) convolucional com pesos aprendidos pelo backpropagation.' },
      { name: '(i, j)', desc: 'Coordenada espacial no mapa de características de saída.' },
      { name: 'Inductive Bias', desc: 'Suposição arquitetural de que pixels próximos contêm informações correlacionadas.' }
    ],
    notes: `A equação parece densa, mas a mecânica é muito simples:
Posicionamos o filtro (por exemplo, 3x3) sobre um pedaço da imagem.
Multiplicamos cada pixel pelo seu peso correspondente no filtro, somamos tudo e geramos um único número no mapa de saída. Depois, deslizamos a janela para o lado e repetimos!`
  },

  // Slide 9: Custom - Conv2DMatrixStepSimulator
  {
    id: 9,
    type: 'custom',
    title: 'Simulador Passo a Passo da Convolução 2D',
    subtitle: 'Acompanhe o kernel deslizando sobre a matriz e gerando o feature map',
    component: <Conv2DMatrixStepSimulator />,
    notes: `Neste simulador, vocês podem clicar em 'Próximo Passo' e ver a janela amarela se movimentando.
Observem a conta matemática sendo resolvida no painel lateral em tempo real: multiplicação elemento a elemento seguida pela soma. Cada célula do mapa de saída resume um pedaço local da imagem.`
  },

  // Slide 10: Comparison - Classic Kernels
  {
    id: 10,
    type: 'comparison',
    title: 'Kernels Clássicos de Processamento de Imagens',
    subtitle: 'Filtros fixos que a rede convolucional aprende a construir automaticamente',
    cardLeft: {
      badge: 'DETECÇÃO DE BORDAS',
      title: 'Filtros de Sobel',
      bullets: [
        'Sobel Horizontal: detecta variações de luz de cima para baixo.',
        'Sobel Vertical: detecta transições de luz da esquerda para a direita.',
        'Realça contornos e formas geométricas essenciais dos objetos.'
      ]
    },
    cardRight: {
      badge: 'TRANSFORMAÇÃO ESPACIAL',
      title: 'Nitidez e Relevo',
      bullets: [
        'Filtro de Nitidez (Sharpen): amplifica diferenças locais de contraste.',
        'Filtro Gaussiano (Blur): suaviza ruídos e reduz detalhes em alta frequência.',
        'Em PyTorch, a rede aprende os números do kernel automaticamente via SGD!'
      ]
    },
    notes: `Na computação clássica, engenheiros passavam meses projetando filtros manuais de Sobel ou Gabor.
A grande revolução do Deep Learning é que os valores do kernel não são fixos: eles são os tensores de parâmetros da rede! É a própria retropropagação que descobre quais filtros são mais úteis para resolver a tarefa.`
  },

  // Slide 11: Formula - Output Dimension Formula
  {
    id: 11,
    type: 'formula',
    title: 'Cálculo da Dimensão de Saída Convolucional',
    subtitle: 'A fórmula geométrica para determinar o tamanho dos mapas de características',
    formula: 'O = \\left\\lfloor \\frac{W - K + 2P}{S} \\right\\rfloor + 1',
    variables: [
      { name: 'W', desc: 'Largura ou altura da entrada espacial (ex: 28 no MNIST).' },
      { name: 'K', desc: 'Tamanho do filtro / kernel (ex: 3 para um kernel 3x3).' },
      { name: 'P', desc: 'Preenchimento com zeros nas bordas (Padding).' },
      { name: 'S', desc: 'Passo do deslizamento do kernel (Stride).' }
    ],
    notes: `Memorizem esta fórmula geométrica: ela é necessária para calcular a transição exata das camadas convolucionais para a camada densa nn.Linear.
Se temos uma imagem 28x28, com kernel 3x3, padding 0 e stride 1:
(28 - 3 + 0)/1 + 1 = 26. A imagem de saída terá dimensão 26x26!`
  },

  // Slide 12: Comparison - Padding & Stride
  {
    id: 12,
    type: 'comparison',
    title: 'Padding (Preenchimento) & Stride (Passo)',
    subtitle: 'Controlando as fronteiras e a velocidade de redução espacial',
    cardLeft: {
      badge: 'PADDING (PREENCHIMENTO COM ZEROS)',
      title: 'Preservando Bordas (Same Padding)',
      bullets: [
        'Padding = 0 (Válido): a imagem encolhe a cada camada convolucional.',
        'Padding = (K-1)/2 (Same): a saída tem EXATAMENTE o mesmo tamanho da entrada.',
        'Garante que pixels nas bordas e cantos participem do mesmo número de convoluções.'
      ]
    },
    cardRight: {
      badge: 'STRIDE (PASSO DE DESLIZAMENTO)',
      title: 'Subamostragem Acelerada',
      bullets: [
        'Stride = 1: o kernel anda de 1 em 1 pixel (resolução máxima).',
        'Stride = 2: o kernel pula de 2 em 2 pixels, cortando a resolução pela metade.',
        'Substitui camadas de pooling em arquiteturas mais modernas (ex: ResNets).'
      ]
    },
    notes: `O Padding resolve o problema do encolhimento: sem padding, após algumas camadas sua imagem de 28x28 vira 1x1! Com padding='same', a imagem mantém seu tamanho espacial.
Já o Stride define o ritmo: stride=2 faz a janela pular de 2 em 2 pixels, realizando uma redução de resolução embutida.`
  },

  // Slide 13: Custom - PoolingSimulator
  {
    id: 13,
    type: 'custom',
    title: 'Simulador Interativo: Max Pooling vs. Average Pooling',
    subtitle: 'Compare a extração da ativação mais forte contra a suavização pela média',
    component: <PoolingSimulator />,
    notes: `Experimentem o simulador de Pooling na tela.
Em uma janela 2x2 com stride 2:
O Max Pooling pega o maior valor da janela. Ele atua como um detector de presença: 'se a característica foi detectada em qualquer um dos 4 pixels, passe adiante!'
O Average Pooling calcula a média, tendendo a suavizar e diluir contrastes fortes.`
  },

  // Slide 14: Comparison - Why MaxPooling Dominates
  {
    id: 14,
    type: 'comparison',
    title: 'Por Que o Max Pooling Domina?',
    subtitle: 'Compressão dimensional e conquista da invariância translacional',
    cardLeft: {
      badge: 'INVARIÂNCIA ESPACIAL',
      title: 'Tolerância a Pequenos Deslocamentos',
      bullets: [
        'Se o objeto na imagem se deslocar 1 ou 2 pixels, o valor máximo ainda é capturado.',
        'Permite reconhecer dígitos ou objetos com leves variações de escrita e ângulo.',
        'Cria uma hierarquia: camadas profundas enxergam regiões cada vez maiores.'
      ]
    },
    cardRight: {
      badge: 'COMPRESSÃO EFICIENTE',
      title: 'Redução de Carga Computacional',
      bullets: [
        'Um pooling 2x2 reduz a área da imagem em 75% (corta altura e largura pela metade).',
        'Diminui drasticamente o número de conexões para as camadas seguintes.',
        'Não possui nenhum parâmetro treinável (custo zero de pesos aprendidos).'
      ]
    },
    notes: `O Max Pooling possui dois superpoderes:
Primeiro, invariância a pequenas translações: não importa em qual dos 4 pixels a borda apareceu, o valor máximo sai intacto.
Segundo, economia brutal de computação: ao reduzir pela metade altura e largura, ele corta em 4 vezes o número de cálculos da próxima camada, sem acrescentar um único peso treinável!`
  },

  // Slide 15: Comparison - The MNIST CNN Architecture
  {
    id: 15,
    type: 'comparison',
    title: 'A Arquitetura da Primeira CNN em PyTorch',
    subtitle: 'Composição de blocos Conv2D, Ativações e Pooling para o MNIST',
    cardLeft: {
      badge: 'EXTRATOR DE CARACTERÍSTICAS',
      title: 'Bloco Convolucional',
      bullets: [
        'nn.Conv2d(1, 16, kernel_size=3, padding=1): de 1 para 16 feature maps.',
        'nn.ReLU(): ativação não-linear para cada pixel do feature map.',
        'nn.MaxPool2d(2, 2): reduz resolução de 28x28 para 14x14.',
        'nn.Conv2d(16, 32, kernel_size=3, padding=1) + MaxPool2d: reduz para 7x7.'
      ]
    },
    cardRight: {
      badge: 'CLASSIFICADOR DENSO',
      title: 'Transição para nn.Linear',
      bullets: [
        'Dimensão resultante: 32 canais de tamanho 7x7 = 1.568 valores.',
        'nn.Flatten(): lineariza apenas as representações abstratas profundas.',
        'nn.Linear(1568, 64) -> nn.ReLU() -> nn.Linear(64, 10).',
        'Atinge > 98.5% de acurácia no MNIST com uma fração dos pesos da MLP!'
      ]
    },
    notes: `Esta é a estrutura clássica de uma CNN:
Na primeira fase, usamos blocos de Convolução + ReLU + Pooling para extrair características visuais ricas (bordas, curvas, círculos).
Apenas na saída, quando os mapas já estão pequenos e altamente conceituais, aplicamos o Flattening e passamos por uma camada linear simples para gerar os 10 logits de saída!`
  },

  // Slide 16: Custom - Quiz
  {
    id: 16,
    type: 'custom',
    title: 'Quiz de Fixação: Fundamentos de CNNs',
    subtitle: 'Teste seus conhecimentos sobre kernels, padding, stride e pooling',
    component: <CNNQuizWidget />,
    notes: `Vamos testar nosso domínio sobre convoluções!
Respondam às questões interativas sobre cálculo de dimensões, as falhas do flattening e o funcionamento das camadas de subamostragem.`
  },

  // Slide 17: Roadmap - Synthesis & Project 2
  {
    id: 17,
    type: 'roadmap',
    title: 'Síntese da Aula & Conexão com o Projeto 2',
    subtitle: 'Base para a Análise de Alternativas Arquiteturais',
    steps: [
      { num: '01', title: 'Localidade Espacial', desc: 'Convoluções exploram a correlação 2D entre pixels vizinhos via receptive field.' },
      { num: '02', title: 'Parameter Sharing', desc: 'O mesmo filtro desliza sobre toda a imagem, economizando milhões de pesos.' },
      { num: '03', title: 'Invariância Translacional', desc: 'Max Pooling garante reconhecimento mesmo com pequenos deslocamentos espaciais.' },
      { num: '04', title: 'Trade-off MLP vs CNN', desc: 'Fundamentação completa para o ensaio comparativo exigido no Projeto 2.' }
    ],
    notes: `Neste resumo, conectamos a aula de hoje com a Etapa 2 do Projeto 2:
A justificativa de por que escolher uma CNN em vez de uma MLP para dados visuais repousa sobre três pilares: viés indutivo de localidade 2D, compartilhamento de parâmetros e invariância translacional.`
  },

  // Slide 18: Next Steps
  {
    id: 18,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 07',
    subtitle: 'Convoluções Profundas para Imagens RGB do Mundo Real',
    steps: [
      { num: '01', title: 'Imagens Coloridas RGB', desc: 'Manipulação de tensores 4D multicanal (N, C, H, W) no PyTorch.' },
      { num: '02', title: 'torchvision.transforms', desc: 'Pipelines de aumento de dados (Data Augmentation) e normalização.' },
      { num: '03', title: 'PlantVillage Agritech', desc: 'Classificação de doenças foliares em lavouras do mundo real.' },
      { num: '04', title: 'Base do Projeto 2 (CNN)', desc: 'Pipeline completo pronto para servir de base direta ao trabalho.' }
    ],
    notes: `Na nossa próxima aula — Aula 07 —, daremos o passo definitivo em Visão Computacional:
Sairemos das imagens simples em preto e branco do MNIST e trabalharemos com fotos coloridas reais de alta resolução com 3 canais RGB, aumento de dados e diagnóstico de doenças agrícolas no dataset PlantVillage. Parabéns pelo foco de hoje e até a próxima aula!`
  }
];
