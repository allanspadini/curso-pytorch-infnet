import React from 'react';
import GrayMatrixExploration from '../components/interactive/GrayMatrixExploration';
import Conv1DSimulator from '../components/interactive/Conv1DSimulator';
import Conv2DMatrixStepSimulator from '../components/interactive/Conv2DMatrixStepSimulator';
import RGBChannelsVisualizer from '../components/interactive/RGBChannelsVisualizer';
import PoolingSimulator from '../components/interactive/PoolingSimulator';
import CNNQuizWidget from '../components/interactive/CNNQuizWidget';

export const slidesData = [
  // Slide 1
  {
    id: 1,
    type: 'title',
    title: 'Aula 5: Introdução a Visão Computacional com CNNs',
    subtitle: 'Convolução, Pooling, Canais RGB e Representação de Imagens no PyTorch',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Infnet',
    notes: `Olá alunos! Sejam muito bem-vindos à nossa Aula 5 do curso de Redes Neurais Profundas no Instituto Infnet.
Nesta aula daremos um grande salto pedagógico: sairemos do domínio dos dados tabulares e entraremos no fascinante universo da Visão Computacional.
Hoje vamos compreender exatamente como computadores enxergam imagens através de matrizes numéricas, o problema de estirar matrizes para redes neurais tradicionais (MLPs), e como as camadas de Convolução 1D, Convolução 2D e Pooling revolucionaram o aprendizado de máquinas!`
  },

  // Slide 2
  {
    id: 2,
    type: 'roadmap',
    title: 'Roteiro da Aula 5: Da Matriz de Pixels às CNNs',
    subtitle: 'Conceitos fundamentais da arquitetura convolucional',
    steps: [
      { num: '01', title: 'Imagens & Pixels', desc: 'Representação em retículas, matrizes 0-255 e o estiramento (flattening).' },
      { num: '02', title: 'Convolução 1D', desc: 'Filtros em vetores e a redução matemática de amostras.' },
      { num: '03', title: 'Convolução 2D', desc: 'Janelas deslizantes 2D e produto escalar em matrizes.' },
      { num: '04', title: 'Espaço RGB', desc: 'Tensores 3D (3, H, W) e geração de múltiplos Feature Maps.' },
      { num: '05', title: 'Pooling Layers', desc: 'Subamostragem (Max Pooling vs Avg Pooling) e invariância.' }
    ],
    notes: `Aqui está o mapa da nossa jornada de hoje.
Começaremos inspecionando como uma foto de jornal vista de perto revela uma retícula de pontos discretos, introduzindo como os computadores enxergam imagens em escala de cinza de 0 a 255.
Em seguida, veremos o que acontece se tentarmos estirar essa matriz diretamente para uma rede densa.
Depois, construiremos a intuição da Convolução 1D e 2D passo a passo, entenderemos os 3 canais de cor RGB e as camadas de Pooling.`
  },

  // Slide 3 - Image Large (NOVO POSICIONAMENTO: Foto do Jornal de Perto)
  {
    id: 3,
    type: 'image-large',
    title: 'Como os Computadores Enxergam: A Foto de Jornal de Perto',
    subtitle: 'Da ilusão de uma imagem contínua à grade de pontos e retículas discretas',
    image: '/gato_jornal.png',
    caption: 'Foto de Jornal Ampliada em Detalhe: Uma imagem aparente contínua é composta por pontos e retículas discretas',
    notes: `Observem esta imagem na tela. Ao olharmos uma foto impressa em um jornal à distância, enxergamos a figura fofinha de um gato de forma contínua.
Porém, ao aproximar uma lupa ou olhar bem de perto, descobrimos que a imagem é composta por milhares de pequenos pontos e retículas pretas e cinzas espaçadas em uma grade.
O computador enxerga imagens digitais exatamente da mesma forma: como uma grade discreta de pontos de luz chamados pixels!`
  },

  // Slide 4 - Image Large
  {
    id: 4,
    type: 'image-large',
    title: 'Imagem em Escala de Cinza: Matriz de 0 a 255',
    subtitle: 'Valores de intensidade de brilho por pixel',
    image: '/gato_matriz_cinza.png',
    caption: 'Representação Numérica de uma Imagem em Escala de Cinza (Grid 2D de Pixels 0-255)',
    notes: `Com a analogia do jornal em mente, observem esta matriz na tela. Para o olho humano, vemos o gato. Mas para o computador e para o PyTorch, essa foto nada mais é do que uma matriz bidimensional de números inteiros variando entre 0 e 255.
O valor 0 representa a cor preta absoluta (ausência de luz), enquanto 255 representa o branco puro (máxima intensidade). Qualquer valor intermediário representa um tom de cinza.`
  },

  // Slide 5 - Custom Interactive
  {
    id: 5,
    type: 'custom',
    title: 'Explorador Interativo de Matrizes & Intensidade de Pixels',
    subtitle: 'Inspeção dinâmica de valores numéricos de brilho',
    component: <GrayMatrixExploration />,
    notes: `Usem o simulador interativo na tela! Passe o cursor pelos pixels da matriz 6x6.
Notem como o fundo escuro possui valores baixos (como 20) e as regiões claras do miolo e orelhas possuem valores altos (como 200 e 255).
Quando treinamos um modelo de Deep Learning em imagens, a rede neural aprende a ler esses padrões numéricos para reconhecer formatos e contornos.`
  },

  // Slide 6 - Custom Interactive
  {
    id: 6,
    type: 'custom',
    title: 'O Estiramento (Flatten) para Redes Neurais Densas (MLP)',
    subtitle: 'Transformação da matriz 2D em um vetor unidimensional',
    component: <GrayMatrixExploration />,
    notes: `Agora, clique no botão "Vetor Estirado 1D (36)" no canto superior do simulador.
Antes das redes convolucionais existirem, os cientistas tentavam alimentar redes densas (Perceptrons de Múltiplas Camadas) estirando a matriz 2D de altura H x largura W em um único vetor longo de tamanho H*W.
No nosso exemplo 6x6, viramos um vetor de 36 posições. No entanto, observem atentamente: o pixel da linha 2, coluna 1 agora ficou extremamente longe do seu vizinho da linha 1, coluna 1!`
  },

  // Slide 7 - Comparison
  {
    id: 7,
    type: 'comparison',
    title: 'Matriz 2D Espacial vs Vetor 1D Estirado',
    subtitle: 'Por que o Flattening falha na Visão Computacional?',
    cardLeft: {
      badge: '⚠️ Limitação do Flattening (MLP)',
      title: 'Perda de Estrutura Espacial',
      bullets: [
        'Destrói a vizinhança topológica vertical dos pixels.',
        'Sensível a translações: se o objeto mover 2 pixels para a esquerda, a rede não o reconhece.',
        'Explosão de Parâmetros: Uma imagem HD de 1000x1000 pixels geraria 1.000.000 de entradas na primeira camada!'
      ]
    },
    cardRight: {
      badge: '💡 Solução das CNNs',
      title: 'Convoluções Locais (2D)',
      bullets: [
        'Preservam a grade 2D original da imagem.',
        'Compartilhamento de Pesos: O mesmo filtro varre toda a imagem buscando o mesmo padrão.',
        'Invariância a Translação: Encontra bordas e formatos onde quer que estejam na imagem.'
      ]
    },
    notes: `Este slide resume perfeitamente a virada de chave da Visão Computacional.
Redes totalmente conectadas sofrem da maldição da dimensionalidade com imagens grandes e perdem a relação espacial entre pixels vizinhos.
As Redes Neurais Convolucionais (CNNs) resolvem isso processando a matriz 2D diretamente através de janelas deslizantes chamadas Filtros Convolucionais!`
  },

  // Slide 8 - Custom Interactive
  {
    id: 8,
    type: 'custom',
    title: 'Convolução 1D: Filtros & Redução de Amostras',
    subtitle: 'Entendendo a mecânica do kernel e a fórmula N_out = N - K + 1',
    component: <Conv1DSimulator />,
    notes: `Para entender a convolução 2D, primeiro vamos fixar o conceito em 1D com o simulador na tela.
Um filtro ou kernel é um pequeno vetor de pesos (ex: [-1, 0, 1]) que desliza sobre o sinal de entrada.
A cada passo, multiplicamos os pesos pelos valores da entrada e somamos os resultados.
Atenção ao detalhe crucial: se o sinal de entrada possui N=14 amostras e o filtro tem tamanho K=3, a saída terá apenas N - K + 1 = 12 amostras! Ocorre uma redução natural no número de amostras.`
  },

  // Slide 9 - Comparison
  {
    id: 9,
    type: 'comparison',
    title: 'Tipos de Filtros Convolucionais 1D em Ação',
    subtitle: 'Como diferentes combinações de pesos extraem diferentes características',
    cardLeft: {
      badge: '🔍 Filtro de Borda [-1, 0, 1]',
      title: 'Detecção de Transições',
      bullets: [
        'Produz valor ZERO em regiões onde o sinal é constante.',
        'Produz um PICO POSITIVO na subida de intensidade (borda).',
        'Produz um PICO NEGATIVO na descida de intensidade.'
      ]
    },
    cardRight: {
      badge: '🌊 Filtro de Suavização [1/3, 1/3, 1/3]',
      title: 'Filtro Média Móvel (Passa-Baixas)',
      bullets: [
        'Calcula a média aritmética local de 3 vizinhos consecutivos.',
        'Elimina ruídos pontuais de alta frequência.',
        'Suaviza picos abruptos gerando uma curva mais uniforme.'
      ]
    },
    notes: `Vejam como a escolha dos pesos do filtro altera dramaticamente o resultado.
O filtro [-1, 0, 1] é um detector de bordas: se os valores forem iguais, a soma dá zero; se houver uma mudança brusca, ele gera um pico.
Já o filtro de média móvel atenua ruídos. Em Deep Learning, a grande mágica é que NÓS NÃO DEFINIMOS ESSES PESOS À MÃO! O PyTorch aprende os pesos ideais via Backpropagation!`
  },

  // Slide 10 - Custom Interactive
  {
    id: 10,
    type: 'custom',
    title: 'Operação de Convolução 2D Passo a Passo',
    subtitle: 'Simulador matricial com janela 3x3 deslizando sobre matriz 5x5',
    component: <Conv2DMatrixStepSimulator />,
    notes: `Agora expandimos o conceito para 2 dimensões!
No simulador, temos uma matriz de entrada 5x5 (em tons de cinza) e um filtro Kernel 3x3.
Clique em 'Animar Convolução 2D' ou navegue com as setas para ver a janela laranja 3x3 deslizando pixel por pixel.
Em cada posição, fazemos a soma dos produtos elemento a elemento entre a imagem e o filtro, gerando uma posição da matriz de saída (Feature Map) 3x3.`
  },

  // Slide 11 - Image Large
  {
    id: 11,
    type: 'image-large',
    title: 'Imagens Coloridas & Espaço de Cores RGB',
    subtitle: 'Representação de 3 canais de cor (Red, Green, Blue)',
    image: '/rgb.jpeg',
    caption: 'Decomposição de uma Imagem Colorida nos Canais Vermelho, Verde e Azul',
    notes: `Até agora analisamos imagens em escala de cinza, que possuem apenas 1 canal de cor.
No entanto, a grande maioria das imagens do mundo real (como as fotos do dataset de saúde foliar ou detecção de pragas) são coloridas.
Uma imagem colorida é representada pelo modelo RGB, sendo composta por 3 matrizes sobrepostas: a matriz do canal Vermelho (R), do canal Verde (G) e do canal Azul (B).`
  },

  // Slide 12 - Custom Interactive
  {
    id: 12,
    type: 'custom',
    title: 'Explorador Interativo de Canais RGB & Tensores',
    subtitle: 'Visualização da decomposição em formato PyTorch (3, Height, Width)',
    component: <RGBChannelsVisualizer />,
    notes: `Experimentem os botões no simulador de canais RGB.
Se selecionarmos apenas o canal Vermelho, vemos a matriz contendo apenas os níveis de brilho de vermelho por pixel.
No PyTorch, a estrutura de tensores para imagens segue a ordem (Canais, Altura, Largura), ou seja, um tensor de formato (3, H, W). Se tivermos um batch de 32 imagens, o formato será (32, 3, H, W).`
  },

  // Slide 13 - Custom Interactive
  {
    id: 13,
    type: 'comparison',
    title: 'Convoluções Multicanais no PyTorch: nn.Conv2d',
    subtitle: 'Como a camada nn.Conv2d lida com entradas de 3 canais e gera múltiplos filtros',
    cardLeft: {
      badge: '⚙️ Sintaxe PyTorch',
      title: 'nn.Conv2d(in_channels, out_channels, kernel_size)',
      bullets: [
        'in_channels = 3: Recebe os 3 canais de entrada (R, G, B).',
        'out_channels = 16: Aplica 16 filtros diferentes simultaneamente.',
        'kernel_size = 3: Cada filtro tem tamanho 3x3x3 (3 canais profundos).'
      ]
    },
    cardRight: {
      badge: '🚀 O Que Acontece na Prática?',
      title: 'Geração de Múltiplos Feature Maps',
      bullets: [
        'Cada um dos 16 filtros aprende a detectar algo diferente (linhas horizontais, curvas, texturas).',
        'A saída da camada não é 1 imagem, mas um conjunto de 16 Feature Maps!',
        'Formato da Saída: (Batch, 16, H_out, W_out).'
      ]
    },
    notes: `No PyTorch, definimos camadas convolucionais com a classe nn.Conv2d.
Quando passamos in_channels=3 e out_channels=16, cada filtro possui internamente 3 matrizes (uma para cada canal de cor) que são somadas para gerar 1 mapa de características.
Ao final da primeira camada convolucional, geramos 16 imagens/mapas de características com informações visuais filtradas!`
  },

  // Slide 14 - Image Large
  {
    id: 14,
    type: 'image-large',
    title: 'Múltiplas Imagens Geradas por Convoluções 2D no PyTorch',
    subtitle: 'Resultado de uma camada nn.Conv2d gerando múltiplos mapas de características',
    image: '/conv2dgato.png',
    caption: 'Conjunto de Feature Maps Gerados por Filtros Distintos sobre a Foto do Gato',
    notes: `Vejam esta imagem impressionante exibindo a saída de uma camada convolucional do PyTorch na prática!
A partir de uma única foto de entrada, a rede gerou dezenas de pequenas imagens de saída.
Notem como alguns filtros destacam o fundo claro, outros destacam o pelo escuro, outros focam apenas nas bordas dos olhos. Cada filtro virou um especialista visual!`
  },

  // Slide 15 - Image Large
  {
    id: 15,
    type: 'image-large',
    title: 'Extração de Características Visuais no PyTorch',
    subtitle: 'Visualização de mapas de ativação convolucional',
    image: '/conv2dbeagle.png',
    caption: 'Mapas de Ativação Convolucional Extraídos por Diferentes Kernels em Imagem de Cão Beagle',
    notes: `Aqui temos outro exemplo clássico com um cão Beagle.
Observem a diversidade de mapas de ativação. As primeiras camadas de uma CNN funcionam exatamente como detectores de características de baixo nível (Low-Level Features): bordas, cantos, linhas diagonais e contrastes de cor.
Conforme avançamos para camadas mais profundas, a rede combina essas bordas simples para formar olhos, focinhos, folhas, pragas ou rodas!`
  },

  // Slide 16 - Custom Interactive
  {
    id: 16,
    type: 'custom',
    title: 'Camadas de Pooling: Max Pooling vs Average Pooling',
    subtitle: 'Redução de dimensionalidade espacial e invariância a translações',
    component: <PoolingSimulator />,
    notes: `Depois que aplicamos a Convolução e a função de ativação ReLU, entra em cena a camada de Pooling (Subamostragem).
No simulador na tela, vemos uma matriz 4x4 sendo reduzida para 2x2 via Max Pooling com janela 2x2 e Stride 2.
No Max Pooling, dividimos a matriz em blocos 2x2 e pegamos apenas o valor MÁXIMO de cada bloco. Isso reduz o tamanho da imagem pela metade sem perder a característica mais forte daquela região!`
  },

  // Slide 17 - Comparison
  {
    id: 17,
    type: 'comparison',
    title: 'Max Pooling vs Average Pooling em CNNs',
    subtitle: 'Comparativo das duas estratégias mais utilizadas no PyTorch',
    cardLeft: {
      badge: '🔥 Max Pooling (nn.MaxPool2d)',
      title: 'Foco na Ativação Mais Forte',
      bullets: [
        'Extrai o valor máximo da janela de busca.',
        'Captura a presença de bordas e texturas marcantes.',
        'É a opção padrão e mais utilizada na grande maioria das arquiteturas clássicas (ResNet, VGG).'
      ]
    },
    cardRight: {
      badge: '⚖️ Average Pooling (nn.AvgPool2d)',
      title: 'Suavização por Média Aritmética',
      bullets: [
        'Calcula a média dos valores da janela.',
        'Preserva informações de fundo e contexto suave.',
        'Muito utilizada na camada final de redes profundas (Global Average Pooling).'
      ]
    },
    notes: `Esta comparação é essencial para a prova e para os projetos práticos no PyTorch.
O Max Pooling destaca o pico mais intenso (ideal para detectar a presença de uma borda ou praga em uma folha), enquanto o Average Pooling suaviza a informação.
Lembrem-se: o Pooling NÃO possui parâmetros treináveis! Ele é uma operação matemática fixa de subamostragem.`
  },

  // Slide 18 - Roadmap / Flow Diagram
  {
    id: 18,
    type: 'roadmap',
    title: 'Arquitetura Completa de uma CNN',
    subtitle: 'Do pixel bruto à classificação final',
    steps: [
      { num: '01', title: 'Entrada 3D', desc: 'Imagem RGB de formato (3, H, W).' },
      { num: '02', title: 'Conv2D + ReLU', desc: 'Filtros extraem mapas de bordas e ativam não-linearidade.' },
      { num: '03', title: 'MaxPool2d', desc: 'Subamostragem espacial reduz altura e largura pela metade.' },
      { num: '04', title: 'Flatten', desc: 'Vetorização dos mapas de alta abstração para a camada densa.' },
      { num: '05', title: 'Linear + Softmax', desc: 'Classificação final das classes de saída.' }
    ],
    notes: `Unindo todas as peças que aprendemos hoje, chegamos ao fluxo completo de uma Rede Neural Convolucional!
A imagem RGB (3, H, W) passa por camadas alternadas de Conv2D + ReLU + MaxPool2d.
As primeiras camadas aprendem bordas; as intermediárias aprendem texturas e formas; no final, fazemos o Flatten dos mapas de alta abstração e passamos por camadas Lineares para classificar a imagem!`
  },

  // Slide 19 - Custom Quiz Widget
  {
    id: 19,
    type: 'custom',
    title: 'Quiz Interativo: Consolidando Visão Computacional & CNNs',
    subtitle: 'Verifique seus conhecimentos sobre a aula de hoje',
    component: <CNNQuizWidget />,
    notes: `Chegamos ao momento do nosso Quiz Interativo!
Respondam às 4 questões na tela para testar o conhecimento adquirido sobre o estiramento de matrizes, a fórmula do tamanho da saída em convoluções 1D, o formato de tensores no PyTorch e a função do Max Pooling.`
  },

  // Slide 20 - Summary / Roadmap
  {
    id: 20,
    type: 'roadmap',
    title: 'Resumo da Aula & Próximos Passos no Notebook',
    subtitle: 'Preparações para o laboratório prático com PyTorch e PlantVillage',
    steps: [
      { num: '01', title: 'Matrizes & RGB', desc: 'Entendemos a representação 0-255 e o formato Tensor (3, H, W).' },
      { num: '02', title: 'Convoluções 1D e 2D', desc: 'Dominamos a mecânica do kernel e a redução de amostras.' },
      { num: '03', title: 'Pooling Layers', desc: 'Compreendemos o Max Pooling para redução de resolução.' },
      { num: '04', title: 'Prática Notebook', desc: 'Construção da primeira CNN com PyTorch no dataset PlantVillage.' },
      { num: '05', title: 'Desafio SaaS AgriTech', desc: 'Classificação automatizada de doenças e pragas em folhas.' }
    ],
    notes: `Parabéns a todos por concluírem a parte teórica da Aula 5!
Agora estamos prontos para abrir nosso Jupyter Notebook aula_05_visao_computacional_cnns.ipynb, importar o PyTorch e construir nossa primeira arquitetura CNN completa para resolver um problema real do mundo real: detecção de pragas agrícolas em imagens de folhas com o dataset PlantVillage!`
  }
];
