import React from 'react';
import { AutoencoderTripartiteFunnel } from '../components/interactive/AutoencoderTripartiteFunnel';
import LatentBottleneckSimulator from '../components/interactive/LatentBottleneckSimulator';
import LatentSpaceVisualizer from '../components/interactive/LatentSpaceVisualizer';
import AnomalyThresholdSimulator from '../components/interactive/AnomalyThresholdSimulator';
import AutoencoderQuizWidget from '../components/interactive/AutoencoderQuizWidget';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Autoencoders Convolucionais & Detecção de Anomalias',
    subtitle: 'Aula 08 — Compressão Latente, Reconstrução Espacial e Gabarito do Estudo de Caso 2',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa oitava aula de Redes Neurais Profundas!

Nas aulas anteriores, treinamos modelos supervisionados, onde tínhamos rótulos explícitos para cada exemplo. Mas o que fazer quando temos milhões de dados e quase nenhum rótulo? Ou quando queremos detectar defeitos em peças industriais, fraudes financeiras ou anomalias médicas onde os casos anômalos são raríssimos?

Hoje exploraremos o aprendizado auto-supervisionado com Autoencoders. Entenderemos a arquitetura tripartida formada por Encoder, Bottleneck e Decoder, descobriremos por que a restrição de capacidade do gargalo é essencial para evitar funções identidade banais, projetaremos representações com t-SNE e PCA, e construiremos um sistema completo de detecção de anomalias por erro de reconstrução.

Esta aula fornece todo o embasamento teórico e prático para resolver o Estudo de Caso 2 da disciplina. Vamos começar!`
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
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Inversão não-linear, redução de dimensionalidade e reconstrução de sinais.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Deep Learning Não-Supervisionado', desc: 'Autoencoders, VAEs, aprendizado de representações e detecção de anomalias.' },
      { badge: 'ATUAÇÃO', title: 'Pesquisador em Inteligência Artificial', desc: 'Arquiteturas generativas e auditoria de modelos industriais.' }
    ],
    notes: `Meu nome é Allan Spadini. Trabalhar com dados sem rótulos é uma das áreas mais valiosas da IA moderna. Hoje veremos como extrair representações semânticas ricas sem supervisão humana.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Cinco blocos estratégicos para dominar Autoencoders',
    steps: [
      { num: '01', title: 'Auto-Supervisão', desc: 'O alvo é a própria entrada: reconstruir x a partir de x.' },
      { num: '02', title: 'O Gargalo (Bottleneck)', desc: 'Compressão dimensional Dim(Z) << Dim(X) e razão de compressão.' },
      { num: '03', title: 'Convolução Transposta', desc: 'Reconstrução de mapas espaciais com nn.ConvTranspose2d.' },
      { num: '04', title: 'Espaço Latente', desc: 'Inspeção de agrupamentos semânticos com PCA e t-SNE.' },
      { num: '05', title: 'Anomalias & Caso 2', desc: 'Detecção por erro de reconstrução e calibração de thresholds.' }
    ],
    notes: `Nosso roteiro de 90 minutos cobrirá:
Primeiro, o conceito de tarefa auto-supervisionada onde o alvo é a própria entrada.
Segundo, a função crítica do gargalo de informação.
Terceiro, como descompactar imagens com Convoluções Transpostas.
Quarto, como inspecionar o espaço latente com t-SNE.
E quinto, como transformar erro de reconstrução em um detector de anomalias, resolvendo os problemas do Estudo de Caso 2.`
  },

  // Slide 4: Comparison - Supervised vs Self-Supervised
  {
    id: 4,
    type: 'comparison',
    title: 'Supervisionado vs. Auto-Supervisionado',
    subtitle: 'Mudando a natureza do objetivo de otimização',
    cardLeft: {
      badge: 'APRENDIZADO SUPERVISIONADO',
      title: 'Mapeamento Entrada → Rótulo (X → y)',
      bullets: [
        'Exige anotação humana cara e lenta para cada imagem.',
        'A rede aprende apenas a separar as classes fornecidas.',
        'Se uma classe nova ou defeito inédito surgir, o modelo falha.'
      ]
    },
    cardRight: {
      badge: 'AUTOENCODER (AUTO-SUPERVISIONADO)',
      title: 'Mapeamento Entrada → Reconstrução (X → X̂)',
      bullets: [
        'O alvo é a própria entrada: perda L = ||x - x̂||².',
        'Não requer nenhuma anotação manual.',
        'A rede é forçada a aprender a estrutura e anatomia dos dados normais.'
      ]
    },
    notes: `A grande sacada dos Autoencoders é eliminar a dependência de anotação manual.
Ao definir o objetivo de perda como o erro de reconstrução entre a entrada original x e a saída x̂, criamos uma tarefa auto-supervisionada gratuita que força a rede a aprender os padrões essenciais da distribuição.`
  },

  // Slide 5: Custom - AutoencoderTripartiteFunnel
  {
    id: 5,
    type: 'custom',
    title: 'A Estrutura Tripartida do Autoencoder',
    subtitle: 'Encoder (Compressão) → Bottleneck (Espaço Latente Z) → Decoder (Reconstrução)',
    component: <AutoencoderTripartiteFunnel />,
    notes: `Vejam na tela o famoso formato de ampulheta (ou funil duplo):
O Encoder pega uma imagem grande e vai comprimindo progressivamente suas dimensões.
No centro está o Bottleneck (espaço latente Z): um vetor compacto de baixa dimensão.
Em seguida, o Decoder pega esse vetor comprimido e tenta reconstruir a imagem original em alta resolução.`
  },

  // Slide 6: Comparison - The Bottleneck Pitfall
  {
    id: 6,
    type: 'comparison',
    title: 'O Perigo da Expansão no Bottleneck',
    subtitle: 'O erro conceitual fatal diagnosticado no Estudo de Caso 2',
    cardLeft: {
      badge: 'PROJETO DEFEITUOSO (CASO 2)',
      title: 'Falso Bottleneck: Expansão de 2x',
      bullets: [
        'Entrada: 1 × 64 × 64 = 4.096 pixels.',
        'Saída do Encoder: 32 × 16 × 16 = 8.192 valores!',
        'Dim(Z) > Dim(X): a rede tem o dobro da capacidade da entrada.',
        'A rede vira uma função identidade preguiçosa: decora sem comprimir.'
      ]
    },
    cardRight: {
      badge: 'PROJETO CORRETO',
      title: 'Compressão Efetiva (Dim(Z) << Dim(X))',
      bullets: [
        'Entrada: 4.096 pixels.',
        'Espaço Latente Z: vetor com 32 a 64 dimensões.',
        'Taxa de compressão de 64x a 128x.',
        'Força a rede a reter apenas as features geradoras essenciais.'
      ]
    },
    notes: `Este é o primeiro grande problema do Estudo de Caso 2 da disciplina:
O engenheiro declarou que construiu um Autoencoder, mas a saída do seu encoder tinha 8.192 neurônios para uma entrada de apenas 4.096 pixels!
Em vez de um afunilamento, ele criou uma expansão de duas vezes. A rede simplesmente memorizou os valores por transporte direto sem aprender representações úteis.`
  },

  // Slide 7: Custom - LatentBottleneckSimulator
  {
    id: 7,
    type: 'custom',
    title: 'Simulador Interativo: Dimensão do Bottleneck',
    subtitle: 'Altere o tamanho de Z e observe a razão de compressão e a fidelidade da reconstrução',
    component: <LatentBottleneckSimulator />,
    notes: `Utilizem este simulador interativo na tela.
Vocês podem arrastar o slider do tamanho do vetor latente Z de 2 até 512.
Notem o equilíbrio delicado: se Z for muito pequeno (ex: 2), a imagem reconstruída fica borrada. Se Z for gigante (ex: 512), a compressão é fraca. O ponto ótimo comprime drasticamente os dados preservando contornos semânticos nítidos.`
  },

  // Slide 8: Comparison - Dense vs Conv Autoencoder
  {
    id: 8,
    type: 'comparison',
    title: 'Autoencoder Denso vs. Convolucional',
    subtitle: 'Por que camadas convolucionais superam redes totalmente conectadas',
    cardLeft: {
      badge: 'AUTOENCODER DENSO (MLP)',
      title: 'Camadas nn.Linear Esticadas',
      bullets: [
        'Exige nn.Flatten() na entrada e nn.Unflatten() na saída.',
        'Perde correlação 2D entre pixels vizinhos.',
        'Milhões de parâmetros em camadas gigantescas.',
        'Gera reconstruções borradas e propensas a ruído estocástico.'
      ]
    },
    cardRight: {
      badge: 'CONV AUTOENCODER',
      title: 'Preservação Espacial Contínua',
      bullets: [
        'Encoder usa nn.Conv2d + nn.MaxPool2d.',
        'Decoder usa nn.ConvTranspose2d (upsampling aprendido).',
        'Pesos compartilhados: fração dos parâmetros de uma MLP.',
        'Reconstrói bordas e detalhes de alta frequência com fidelidade.'
      ]
    },
    notes: `Assim como aprendemos na Aula 06, esticar imagens para MLPs densas é ineficiente.
No Autoencoder Convolucional, preservamos a geometria 2D do início ao fim: o Encoder reduz a resolução espacial com convoluções, e o Decoder a restaura com Convoluções Transpostas.`
  },

  // Slide 9: Formula - ConvTranspose2d
  {
    id: 9,
    type: 'formula',
    title: 'A Convolução Transposta no PyTorch',
    subtitle: 'Como o Decoder aumenta a resolução espacial aprendendo filtros de upsampling',
    formula: 'H_{out} = (H_{in} - 1) \\times S - 2P + K, \\qquad \\text{nn.ConvTranspose2d}',
    variables: [
      { name: 'H_{in}', desc: 'Altura da imagem comprimida de entrada no bloco do decoder.' },
      { name: 'S', desc: 'Stride da convolução transposta (fator de ampliação espacial, ex: S=2 dobra o tamanho).' },
      { name: 'P', desc: 'Padding aplicado internamente na expansão.' },
      { name: 'K', desc: 'Tamanho do kernel do filtro reconstrutor.' }
    ],
    notes: `A camada nn.ConvTranspose2d faz o caminho inverso da convolução comum:
Se uma Conv2d com stride 2 divide a resolução por 2, a ConvTranspose2d com stride 2 multiplica a resolução por 2! Ela insere zeros entre os pixels e aplica o filtro de pesos aprendidos para preencher os detalhes com suavidade.`
  },

  // Slide 10: Roadmap - Latent Space Inspection
  {
    id: 10,
    type: 'roadmap',
    title: 'Inspeção do Espaço Latente com PCA e t-SNE',
    subtitle: 'Projetando vetores multidimensionais em 2D para auditar a semântica aprendida',
    steps: [
      { num: '01', title: 'Extração de Z', desc: 'Passar dados de teste pelo Encoder: z = encoder(x).' },
      { num: '02', title: 'Redução Dimensional', desc: 'Aplicar PCA (linear) ou t-SNE (não-linear) para mapear Z em 2 coordenadas.' },
      { num: '03', title: 'Visualização de Clusters', desc: 'Plotar pontos coloridos por classe para verificar agrupamentos naturais.' },
      { num: '04', title: 'Diagnóstico de Outliers', desc: 'Verificar se dados anômalos caem isolados longe das nuvens normais.' }
    ],
    notes: `O vetor latente Z vive em um espaço de 32 ou 64 dimensões que o olho humano não consegue enxergar.
Para auditar se a rede realmente aprendeu conceitos inteligentes, usamos algoritmos de projeção como PCA ou t-SNE. Quando plotamos os pontos em 2D, descobrimos que dígitos iguais ou folhas saudáveis se agrupam naturalmente em ilhas semânticas!`
  },

  // Slide 11: Custom - LatentSpaceVisualizer
  {
    id: 11,
    type: 'custom',
    title: 'Visualizador Interativo: O Espaço Latente 2D',
    subtitle: 'Observe o agrupamento natural das classes e o isolamento dos pontos anômalos',
    component: <LatentSpaceVisualizer />,
    notes: `Neste simulador na tela, observem como os dados normais se agrupam em clusters definidos.
Agora notem os pontos vermelhos (anomalias): eles caem em regiões vazias do espaço latente, longe das variedades normais aprendidas pelo modelo.`
  },

  // Slide 12: Comparison - Normal Manifold Hypothesis
  {
    id: 12,
    type: 'comparison',
    title: 'A Hipótese da Variedade Normal',
    subtitle: 'Por que o erro de reconstrução detecta anomalias sem precisar de rótulos',
    cardLeft: {
      badge: 'DADO NORMAL (TREINADO)',
      title: 'Reconstrução de Baixo Erro',
      bullets: [
        'A rede viu milhares de exemplos normais semelhantes no treino.',
        'O bottleneck consegue codificar perfeitamente suas variações.',
        'A imagem reconstruída x̂ é quase idêntica à original x.',
        'Erro de Reconstrução MSE: ||x - x̂||² ≈ 0.'
      ]
    },
    cardRight: {
      badge: 'DADO ANÔMALO (INÉDITO)',
      title: 'Reconstrução de Alto Erro',
      bullets: [
        'O defeito ou formato estranho nunca foi visto no treino.',
        'O bottleneck não possui capacidade para codificar essa deformação.',
        'O decoder tenta forçar o dado a se parecer com um padrão normal.',
        'Erro de Reconstrução MSE dispara para valores elevados!'
      ]
    },
    notes: `Aqui está o princípio fundamental da detecção de anomalias com Autoencoders:
Se você treinar a rede apenas com peças perfeitas, o modelo se torna um especialista em reconstruir peças perfeitas.
Quando uma peça rachada ou manchada entra na rede, o gargalo não sabe representar a rachadura. O decoder tenta 'consertar' a peça, gerando uma diferença gigante entre entrada e saída. Esse erro elevado é o nosso alarme de anomalia!`
  },

  // Slide 13: Formula - Reconstruction Error MSE
  {
    id: 13,
    type: 'formula',
    title: 'O Escore de Anomalia por Erro MSE',
    subtitle: 'Calculando a distância pixel a pixel entre o original e a reconstrução',
    formula: 'e(x) = \\frac{1}{H \\times W \\times C} \\sum_{i=1}^{H} \\sum_{j=1}^{W} \\sum_{c=1}^{C} \\left( x_{i,j,c} - \\hat{x}_{i,j,c} \\right)^2',
    variables: [
      { name: 'x', desc: 'Imagem original de teste apresentada ao modelo.' },
      { name: '\\hat{x}', desc: 'Imagem reconstruída na saída do decoder.' },
      { name: 'e(x)', desc: 'Escore escalar de anomalia: quanto maior o valor, maior a probabilidade de ser um defeito.' },
      { name: 'Regra de Decisão', desc: 'Se e(x) > \\tau \\Rightarrow \\text{Classificar como Anomalia; caso contrário, Normal.}' }
    ],
    notes: `O escore de anomalia é simplesmente a média dos erros quadráticos de todos os pixels da imagem.
Definimos um limiar tau: qualquer imagem cujo erro de reconstrução ultrapasse tau é classificada como anomalia. Mas como escolher esse limiar tau? Esse é o cerne da discussão a seguir.`
  },

  // Slide 14: Custom - AnomalyThresholdSimulator
  {
    id: 14,
    type: 'custom',
    title: 'Simulador Interativo: Calibração de Thresholds',
    subtitle: 'Compare a regra empírica μ + 2σ com a curva ROC/PR orientada por Recall',
    component: <AnomalyThresholdSimulator />,
    notes: `Utilizem o simulador na tela.
Vejam as duas distribuições sobrepostas: a curva azul representa os erros das amostras normais e a curva vermelha representa os erros das anomalias.
Mexam na linha do threshold: se colocarem a linha muito para a direita, muitos defeitos passarão despercebidos (falsos negativos). Se colocarem muito para a esquerda, peças normais serão descartadas (falsos positivos).`
  },

  // Slide 15: Comparison - The Threshold Dilemma
  {
    id: 15,
    type: 'comparison',
    title: 'Crítica à Regra Ingênua: μ + 2σ',
    subtitle: 'O segundo erro conceitual gravíssimo do Estudo de Caso 2',
    cardLeft: {
      badge: 'REGRA INGÊNUA (μ + 2σ)',
      title: 'Calculada Sobre o Treino',
      bullets: [
        'Calcula média (μ) e desvio (σ) dos erros do treino.',
        'Supõe cegamente uma distribuição perfeitamente normal gaussiana.',
        'Ignora completamente a distribuição real dos defeitos e anomalias.',
        'No Caso 2: resultou em Recall de míseros 37% (63% dos defeitos vazaram!).'
      ]
    },
    cardRight: {
      badge: 'CALIBRAÇÃO PROFISSIONAL',
      title: 'Curvas ROC / PR no Validação',
      bullets: [
        'Utiliza um pequeno conjunto de validação com anomalias rotuladas.',
        'Plota a curva Precision-Recall e a curva ROC.',
        'Fixa o limiar de acordo com a Sensibilidade clínica/industrial exigida (ex: Recall ≥ 95%).',
        'Garante controle quantitativo sobre o impacto financeiro de falsos alarmes.'
      ]
    },
    notes: `Atenção total para o Estudo de Caso 2:
O engenheiro do caso calculou o limiar usando mu + 2*sigma apenas sobre as perdas do conjunto de treino.
Isso é um erro metodológico grave: o treino não contém anomalias! A regra pressupõe arbitrariamente que 95% dos dados são normais e os 5% da cauda são defeitos. O resultado foi um desastre: Recall de apenas 37%, deixando 63% das peças com defeito passarem livres para os clientes!`
  },

  // Slide 16: Custom - Quiz
  {
    id: 16,
    type: 'custom',
    title: 'Quiz de Fixação: Autoencoders & Detecção de Anomalias',
    subtitle: 'Teste seus conhecimentos sobre bottlenecks, ConvTranspose2d e seleção de limiares',
    component: <AutoencoderQuizWidget />,
    notes: `Vamos testar nosso domínio!
Respondam às perguntas interativas sobre a razão de compressão do gargalo, a camada correta de upsampling e a melhor estratégia para escolher limiares de decisão.`
  },

  // Slide 17: Roadmap - Case Study 2 Synthesis
  {
    id: 17,
    type: 'roadmap',
    title: 'Gabarito Síntese: Estudo de Caso 2',
    subtitle: 'Checklist completo das falhas e correções a documentar no seu relatório',
    steps: [
      { num: '01', title: 'Falso Bottleneck', desc: 'Diagnosticar que 8.192 > 4.096 é expansão dimensional e propor vetor Z compacto.' },
      { num: '02', title: 'Inspeção Latente', desc: 'Citar a ausência de t-SNE / PCA e propor visualização 2D de agrupamento.' },
      { num: '03', title: 'Erro de Threshold', desc: 'Criticar a regra μ + 2σ calculada no treino e substituir por curva ROC/PR em validação.' },
      { num: '04', title: 'Impacto Estimado', desc: 'Estimar aumento substancial de Sensibilidade/Recall de 0.37 para ≥ 0.90.' }
    ],
    notes: `Aqui está o resumo definitivo do que vocês devem argumentar no Estudo de Caso 2:
1. O bottleneck era uma expansão de 2x (8192 > 4096).
2. Não houve inspeção latente via t-SNE.
3. O limiar mu + 2 sigma foi calculado de forma ingênua sobre o treino.
4. A correção eleva o Recall de 37% para mais de 90%, protegendo o negócio de falhas catastróficas.`
  },

  // Slide 18: Next Steps
  {
    id: 18,
    type: 'roadmap',
    title: 'Próximos Passos: Aula 09',
    subtitle: 'Avaliação Crítica de Modelos & Métricas sob Desbalanceamento',
    steps: [
      { num: '01', title: 'A Falácia da Acurácia', desc: 'Por que acurácia de 88% esconde sistemas médicos perigosos.' },
      { num: '02', title: 'Métricas Clínicas', desc: 'Sensibilidade (Recall) vs Especificidade e a exigência de 95% da OMS.' },
      { num: '03', title: 'Perda Ponderada', desc: 'Configuração de class_weights em torch.nn.CrossEntropyLoss().' },
      { num: '04', title: 'Estudo de Caso 1', desc: 'Gabarito conceitual completo da Triagem de Malária em células sanguíneas.' }
    ],
    notes: `Na nossa próxima aula — Aula 09 —, abordaremos a Avaliação Crítica e Métricas em Datasets Desbalanceados, resolvendo o Estudo de Caso 1 (Triagem de Malária). Muito obrigado a todos e até a próxima!`
  }
];
