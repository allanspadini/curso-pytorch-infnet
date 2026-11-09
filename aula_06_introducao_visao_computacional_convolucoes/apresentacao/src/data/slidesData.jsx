import React from 'react';
import GrayMatrixExploration from '../components/interactive/GrayMatrixExploration';
import SimpleMlpArchitecture from '../components/interactive/SimpleMlpArchitecture';
import LossMinimizationVisualizer from '../components/interactive/LossMinimizationVisualizer';
import BackpropagationExplodedView from '../components/interactive/BackpropagationExplodedView';
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

  // Slide 2: Custom - SimpleMlpArchitecture
  {
    id: 2,
    type: 'custom',
    title: 'Arquitetura do Perceptron Multicamadas (MLP)',
    subtitle: 'Topologia elementar: 2 entradas, camada oculta não-linear e 1 saída estimada',
    component: <SimpleMlpArchitecture />,
    notes: `Para compreender a revolução das convoluções, começamos recapitulando a arquitetura elementar de um Perceptron Multicamadas (MLP):
Na tela, temos uma rede densa com 2 entradas (x1 e x2).
Essas duas entradas conectam-se integralmente aos 2 neurônios da camada oculta (h1 e h2). Notem que cada linha sináptica possui um peso dedicado (w11, w12, w21, w22) e cada neurônio conta com um bias de deslocamento.
Por fim, as ativações dos neurônios intermediários são combinadas pelos pesos v1 e v2 para gerar a predição estimada final ŷ.
Experimentem clicar nos neurônios para inspecionar suas operações e acionem 'Simular Forward' para acompanhar a propagação do sinal.`
  },

  // Slide 3: Formula - Forward Pass
  {
    id: 3,
    type: 'formula',
    title: 'Como as Contas se Conectam: O Forward Pass',
    subtitle: 'Apenas três passos: multiplicar pelo peso, somar o bias e passar pela função f',
    formula: '\\begin{aligned} h_1 &= f(w_{11} \\cdot x_1 + w_{21} \\cdot x_2 + b_1) \\\\[6pt] h_2 &= f(w_{12} \\cdot x_1 + w_{22} \\cdot x_2 + b_2) \\\\[10pt] \\hat{y} &= f(v_1 \\cdot h_1 + v_2 \\cdot h_2 + b_o) \\end{aligned}',
    variables: [
      { name: 'x_1, x_2', desc: 'As 2 entradas que chegam na rede (ex: duas medições ou dois pixels).' },
      { name: 'w, v', desc: 'Pesos multiplicadores: a importância que a rede dá a cada conexão.' },
      { name: 'b', desc: 'Bias (viés): número somado para deslocar a reta de decisão.' },
      { name: 'f(\\cdot)', desc: 'Função de ativação: transforma o valor obtido (ex: zera valores negativos).' },
      { name: '\\hat{y}', desc: 'O resultado final estimado pela rede para aquela amostra.' }
    ],
    notes: `Vejam como a conta é simples e direta, exatamente como as funções do ensino médio!
Para cada neurônio da camada oculta, fazemos apenas 3 passos:
1. Multiplicamos a primeira entrada pelo seu peso: w11 vezes x1.
2. Multiplicamos a segunda entrada pelo seu peso: w21 vezes x2.
3. Somamos tudo, adicionamos um número extra chamado bias (b1), e passamos o resultado por uma função f(·).
Essa função f é a função de ativação. Ela apenas decide o que passar para frente.
Na saída, repetimos a mesma lógica: pegamos as respostas h1 e h2, multiplicamos pelos pesos v1 e v2, somamos o bias da saída e aplicamos a função f para encontrar a estimativa final ŷ. Isso é o Forward Pass: a informação andando para frente!`
  },

  // Slide 4: Custom - LossMinimizationVisualizer
  {
    id: 4,
    type: 'custom',
    title: 'Minimização da Função Objetivo por Época',
    subtitle: 'A perda é a diferença entre o que se conhece no treino (y) e o que está sendo estimado (ŷ)',
    component: <LossMinimizationVisualizer />,
    notes: `Agora, como a rede aprende? Como sabemos se a estimativa ŷ está boa ou ruim?
A resposta é a Função Objetivo (Loss). Ela mede exatamente a 'diferença' entre o que conhecemos nos dados de treino (o gabarito y) e o que o modelo acabou de estimar (ŷ).
Usem o simulador na tela:
Na Época 1, o gabarito real y vale 1.0, mas a rede estimou apenas 0.15. A diferença é enorme (0.85), e por isso a bolinha laranja está lá no alto da curva de perda!
Ao avançar as épocas, o otimizador ajusta os parâmetros. Na Época 5, a estimativa já sobe para 0.68 e a diferença cai para 0.32.
Na Época 25, a estimativa chega a 0.98: a diferença praticamente zera e a bolinha atinge o ponto de mínimo no fundo da bacia parabólica! Treinar uma rede é simplesmente fazer essa diferença convergir a zero.`
  },

  // Slide 5: Custom - BackpropagationExplodedView
  {
    id: 5,
    type: 'custom',
    title: 'Como os Pesos Aprendem: O Backpropagation',
    subtitle: 'Ajuste do peso pelo erro com cálculo formal da derivada no canto separado',
    component: <BackpropagationExplodedView />,
    notes: `E como a rede melhora a cada época? Como ela sabe para onde mexer nos pesos?
No lado esquerdo da tela, vocês veem a intuição simplificada:
Primeiro, calculamos o Erro: y menos ŷ. Se a rede acertou em cheio, o erro é zero e ninguém precisa mudar!
Segundo, o novo peso é o peso antigo mais um ajuste Delta w.
Agora olhem para o canto direito separado: o ajuste Delta w não é uma mágica inventada. Ele é calculado formalmente pela Regra da Cadeia e pela derivada da função de perda!
O ajuste é igual à taxa de aprendizado vezes o erro (y - ŷ), vezes a derivada da ativação f'(z), vezes o valor da entrada x.
No PyTorch, não precisamos fazer essa conta na mão: quando chamamos perda.backward(), o motor do Autograd calcula essa derivada exata para cada peso da rede!`
  },

  // Slide 6: Comparison - The Digital Image
  {
    id: 6,
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
    notes: `Agora que temos consolidada a mecânica da MLP em dados vetoriais, como lidamos quando os dados são imagens?
Para um computador, uma imagem em escala de cinza nada mais é do que uma grade bidimensional de números!
Cada célula é um pixel variando de 0 (preto absoluto) a 255 (branco absoluto). No PyTorch, dividimos por 255.0 para obter números float entre 0.0 e 1.0, estabilizando os gradientes.`
  },

  // Slide 7: Custom - GrayMatrixExploration
  {
    id: 7,
    type: 'custom',
    title: 'Explorador Interativo de Matrizes de Pixels',
    subtitle: 'Passe o mouse sobre os pixels para ver seus valores numéricos e o efeito do Flattening',
    component: <GrayMatrixExploration />,
    notes: `Usem o simulador interativo na tela.
Ao passar o mouse sobre a imagem do gato, vocês conseguem ver os valores exatos de cada pixel.
Notem o botão de Flattening: ao esticarmos essa matriz 2D em um vetor unidimensional para entrar na MLP comum, pixels vizinhos verticalmente são afastados por centenas de posições! A geometria espacial é quebrada e a quantidade de pesos explode. É por isso que precisamos das Convoluções!`
  },

  // Slide 8: Custom - Conv1DSimulator
  {
    id: 8,
    type: 'custom',
    title: 'Intuição Unidimensional da Convolução',
    subtitle: 'Como um filtro deslizante detecta padrões locais através de pesos compartilhados',
    component: <Conv1DSimulator />,
    notes: `Antes de irmos para 2D, vejam a intuição 1D na tela.
Temos um filtro com 3 pesos. Ele desliza sobre o sinal fazendo a multiplicação e soma.
Notem que os MESMOS pesos são reutilizados em todas as posições: isso é o Compartilhamento de Parâmetros (Parameter Sharing)!`
  },

  // Slide 9: Formula - 2D Convolution Formula
  {
    id: 9,
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

  // Slide 10: Custom - Conv2DMatrixStepSimulator
  {
    id: 10,
    type: 'custom',
    title: 'Simulador Passo a Passo da Convolução 2D',
    subtitle: 'Acompanhe o kernel deslizando sobre a matriz e gerando o feature map',
    component: <Conv2DMatrixStepSimulator />,
    notes: `Neste simulador, vocês podem clicar em 'Próximo Passo' e ver a janela amarela se movimentando.
Observem a conta matemática sendo resolvida no painel lateral em tempo real: multiplicação elemento a elemento seguida pela soma. Cada célula do mapa de saída resume um pedaço local da imagem.`
  },

  // Slide 11: Comparison - Classic Kernels
  {
    id: 11,
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

  // Slide 12: Formula - Output Dimension Formula
  {
    id: 12,
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

  // Slide 13: Comparison - Padding & Stride
  {
    id: 13,
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

  // Slide 14: Custom - PoolingSimulator
  {
    id: 14,
    type: 'custom',
    title: 'Simulador Interativo: Max Pooling vs. Average Pooling',
    subtitle: 'Compare a extração da ativação mais forte contra a suavização pela média',
    component: <PoolingSimulator />,
    notes: `Experimentem o simulador de Pooling na tela.
Em uma janela 2x2 com stride 2:
O Max Pooling pega o maior valor da janela. Ele atua como um detector de presença: 'se a característica foi detectada em qualquer um dos 4 pixels, passe adiante!'
O Average Pooling calcula a média, tendendo a suavizar e diluir contrastes fortes.`
  },

  // Slide 15: Comparison - Why MaxPooling Domina
  {
    id: 15,
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

  // Slide 16: Comparison - The MNIST CNN Architecture
  {
    id: 16,
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

  // Slide 17: Custom - Quiz
  {
    id: 17,
    type: 'custom',
    title: 'Quiz de Fixação: Fundamentos de CNNs',
    subtitle: 'Teste seus conhecimentos sobre kernels, padding, stride e pooling',
    component: <CNNQuizWidget />,
    notes: `Vamos testar nosso domínio sobre convoluções!
Respondam às questões interativas sobre cálculo de dimensões, as falhas do flattening e o funcionamento das camadas de subamostragem.`
  },

  // Slide 18: Roadmap - Synthesis & Project 2
  {
    id: 18,
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

  // Slide 19: Next Steps
  {
    id: 19,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 07',
    subtitle: 'Otimização Avançada, Diagnóstico de Gradientes e TensorBoard',
    steps: [
      { num: '01', title: 'Família de Otimizadores', desc: 'Do SGD com Momentum ao AdamW com Weight Decay desacoplado.' },
      { num: '02', title: 'LR Schedulers', desc: 'Agendamento dinâmico da taxa de aprendizado em platôs.' },
      { num: '03', title: 'Gradient Norms & Clipping', desc: 'Diagnóstico numérico de gradientes para treinar MLPs e CNNs profundas.' },
      { num: '04', title: 'TensorBoard & Checkpoints', desc: 'Monitoramento em tempo real com SummaryWriter e salvamento via state_dict.' }
    ],
    notes: `Na nossa próxima aula — Aula 07 —, dominaremos o motor de otimização e diagnóstico de treinamento no PyTorch:
Veremos como usar o AdamW, configurar LR Schedulers para destravar platôs, monitorar a norma dos gradientes com Gradient Clipping e rastrear tudo ao vivo no TensorBoard — ferramentas essenciais tanto para fechar o Projeto 1 quanto para treinar nossas CNNs profundas em imagens RGB reais na Aula 08. Parabéns pelo foco de hoje e até a próxima aula!`
  }
];
