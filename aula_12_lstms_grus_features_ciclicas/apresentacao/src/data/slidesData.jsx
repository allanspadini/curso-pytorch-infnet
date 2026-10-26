import React from 'react';
import LSTMGateExplorer from '../components/interactive/LSTMGateExplorer';
import LSTMvsGRUComparator from '../components/interactive/LSTMvsGRUComparator';
import DemandForecastingSimulator from '../components/interactive/DemandForecastingSimulator';
import SequentialQuizWidget from '../components/interactive/SequentialQuizWidget';
import { LSTMArchitectureDiagram, GRUArchitectureDiagram } from '../components/interactive/SequentialDiagrams';

export const slidesData = [
  // Slide 1: Title
  {
    id: 1,
    type: 'title',
    title: 'Arquiteturas com Portões (LSTM & GRU), Engenharia Cíclica e Estudo de Caso',
    subtitle: 'Aula 11 — Domínio de Memória Longa, Projeções Trigonométricas e Séries Temporais Multivariadas',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá, alunos e alunas! Sejam muito bem-vindos à nossa décima primeira e conclusiva aula do bloco de Redes Neurais Profundas da graduação Infnet. Na aula passada, desvendamos como os dados sequenciais quebram a premissa clássica de observações independentes e idênticas, desenrolamos a Vanilla RNN no tempo e testemunhamos a fragilidade matemática da retropropagação temporal com o Vanishing Gradient. Hoje, daremos o salto definitivo: compreenderemos a engenharia elegante por trás das redes com portões — a lendária LSTM e a ágil GRU —, aprenderemos a transformar o tempo linear em círculos trigonométricos contínuos e dominaremos o treinamento robusto e sem vazamentos com um estudo de caso real de clima e demanda energética. Vamos começar!`
  },

  // Slide 2: Instructor
  {
    id: 2,
    type: 'instructor',
    title: 'Corpo Docente & Contexto Curricular',
    subtitle: 'Formação Prática Orientada a Soluções de Engenharia de Machine Learning',
    name: 'Allan Spadini',
    role: 'Professor & Pesquisador em IA',
    photo: '/allan_spadini.jpg',
    highlights: [
      { badge: 'FORMAÇÃO', title: 'Doutor em Geofísica', desc: 'Séries temporais físicas, processamento de sinais e ondas no tempo.' },
      { badge: 'ESPECIALIZAÇÃO', title: 'Modelos Sequenciais Profundos', desc: 'LSTMs, GRUs, transformações trigonométricas e otimização de gradientes.' },
      { badge: 'APLICAÇÃO', title: 'Inteligência Artificial Aplicada', desc: 'Previsão de demanda, séries multivariadas e métricas robustas de negócio.' }
    ],
    notes: `Para quem está acompanhando nosso curso de graduação, sou o professor Allan Spadini. Nosso compromisso na Infnet é aliar rigor conceitual com aplicabilidade profissional imediata. Todo o conteúdo que veremos nesta aula foi projetado para capacitar vocês a resolver problemas reais de mercado — desde previsão de demanda em varejistas e consumo elétrico em distribuidoras de energia até modelagem climática e processos industriais complexos. Tenham sempre em mente que redes neurais não são caixas pretas: dominando o fluxo dos gradientes e a semântica de cada portão, vocês adquirem o discernimento necessário para diagnosticar e otimizar qualquer modelo sequencial.`
  },

  // Slide 3: Roadmap
  {
    id: 3,
    type: 'roadmap',
    title: 'Roteiro da Aula 11',
    subtitle: 'Da Limitação da Recorrência Simples ao Treinamento Estável de Modelos Multivariados',
    steps: [
      { num: '01', title: 'A Revolução dos Portões', desc: 'Superação do Vanishing Gradient com fluxos aditivos lineares.' },
      { num: '02', title: 'Anatomia da LSTM', desc: 'Cell State, Forget Gate, Input Gate e Output Gate.' },
      { num: '03', title: 'A Célula GRU', desc: 'Fusão de estados, Reset Gate e economia de 25% de parâmetros.' },
      { num: '04', title: 'Features Cíclicas (sin/cos)', desc: 'Continuidade de horas e meses projetados no círculo unitário.' },
      { num: '05', title: 'Estabilidade & Estudo de Caso', desc: 'Gradient Clipping, ReduceLROnPlateau, WAPE e prática PyTorch.' }
    ],
    notes: `Vejam o mapa da nossa jornada de 90 minutos de hoje. Primeiro, revisitaremos a raiz do problema do gradiente evanescente e entenderemos por que precisamos de mecanismos de portão. Em seguida, dissecaremos a anatomia da célula LSTM e sua famosa rodovia aditiva de informação. Depois, analisaremos a célula GRU, comparando sua agilidade matemática e economia de 25% de parâmetros. Na sequência, entraremos na engenharia de dados sequenciais: por que representar horas e meses como números lineares é uma armadilha e como o seno e cosseno resolvem isso com perfeição. Por fim, exploraremos técnicas vitais de estabilização como Gradient Clipping e métricas robustas de negócio como o WAPE, encerrando com nossa prática no PyTorch e nosso quiz interativo.`
  },

  // Slide 4: Comparison - Crise Vanilla RNN vs Solução Gated
  {
    id: 4,
    type: 'comparison',
    title: 'O Gargalo da Recorrência Simples vs A Revolução dos Portões',
    subtitle: 'Por que Multiplicações Matriciais Sucessivas Destroem a Memória de Longo Prazo',
    cardLeft: {
      badge: 'VANILLA RNN (FRÁGIL)',
      title: 'Atenuação Exponencial Destrutiva',
      items: [
        'Sobrescrita Forçada: O estado ht-1 é violentamente transformado por W_hh e tanh a cada novo passo t.',
        'Multiplicação em Cadeia: O gradiente de longo prazo depende de ∏_{j=t+1}^T (W_hh^T · diag(1 - h_j^2)).',
        'Amnésia Prática: Dependências temporais superiores a 10 ou 15 passos desaparecem por completo.',
        'Gradiente Explosivo: Autovalores > 1 causam NaN nos pesos durante o treino.'
      ]
    },
    cardRight: {
      badge: 'ARQUITETURAS COM PORTÕES',
      title: 'Fluxo Aditivo Protegido',
      items: [
        'Rodovia Linear (Cell State): A informação transita por somas e multiplicações pontuais protegidas.',
        'Portões Seletivos (Gates): Sigmoides [0, 1] dosam exatamente o que reter, atualizar e emitir.',
        'Persistência Gradiente: Se o portão de esquecimento f_t ≈ 1, o gradiente flui intacto por 100+ passos.',
        'Estabilidade Dinâmica: Menor sensibilidade à profundidade temporal e convergência robusta.'
      ]
    },
    notes: `Lembram-se de quando derivamos o BPTT na aula anterior? Quando tentamos propagar um sinal de erro por 50 ou 100 passos em uma Vanilla RNN, o gradiente passa repetidamente pela transposta da matriz de pesos recorrentes multiplicada pela derivada da tangente hiperbólica. Se os autovalores dessa matriz forem menores que 1, a atenuação é exponencial: em poucos passos, o gradiente se aproxima de zero absoluto. O modelo sofre de amnésia matemática, incapaz de lembrar o que aconteceu no início do mês ou do dia. Para quebrar esse ciclo vicioso, pesquisadores criaram os mecanismos de portão: estruturas capazes de abrir e fechar a passagem de informação usando operações aditivas lineares, mantendo o gradiente vivo ao longo de centenas de passos temporais.`
  },

  // Slide 5: Flow - Anatomia LSTM
  {
    id: 5,
    type: 'flow',
    title: 'A Célula LSTM (Long Short-Term Memory)',
    subtitle: 'A Rodovia de Informação Aditiva e a Separação Entre Memória de Longo e Curto Prazo',
    steps: [
      {
        num: '01',
        title: 'Cell State (C_t) — Longo Prazo',
        desc: 'Esteira rolante de informação com modificações puramente aditivas lineares. Permite ao gradiente fluir sem multiplicação destrutiva de matrizes.'
      },
      {
        num: '02',
        title: 'Hidden State (h_t) — Memória de Trabalho',
        desc: 'Vetor emitido para a camada seguinte e próximo passo temporal, representando o contexto imediato filtrado pelo Output Gate.'
      },
      {
        num: '03',
        title: 'Três Portões de Controle (Gates)',
        desc: 'Forget Gate (quanto esquecer do passado), Input Gate (o que gravar do presente) e Output Gate (o que revelar ao próximo passo).'
      }
    ],
    notes: `Proposta por Hochreiter e Schmidhuber em 1997, a LSTM introduziu uma distinção arquitetural genial: ela separa o estado em dois vetores distintos. O primeiro é a Cell State, C_t, que chamamos de 'rodovia expressa de informação' ou 'esteira rolante'. O segundo é o Hidden State, h_t, que é a memória de trabalho imediata. Enquanto na Vanilla RNN cada passo sobrescreve violentamente o estado anterior por meio de uma tangente hiperbólica, na LSTM a Cell State é modificada através de somas lineares: C_t é igual ao estado anterior multiplicado elemento a elemento por um portão de esquecimento, mais as novas informações autorizadas por um portão de entrada. Como a derivada de uma soma aditiva não gera produtos de matrizes destrutivos, o gradiente flui livremente pela rodovia no tempo.`
  },

  // Slide 6: Formula - Equações da LSTM
  {
    id: 6,
    type: 'formula',
    title: 'A Matemática dos Portões da LSTM',
    subtitle: 'A Álgebra Precisa das Funções Sigmoid [0, 1] e Tanh [-1, 1]',
    formula: `\\begin{aligned}
f_t &= \\sigma(W_f x_t + U_f h_{t-1} + b_f) && \\text{(Forget Gate: o que descartar)} \\\\[4pt]
i_t &= \\sigma(W_i x_t + U_i h_{t-1} + b_i) && \\text{(Input Gate: o que gravar)} \\\\[4pt]
\\tilde{C}_t &= \\tanh(W_c x_t + U_c h_{t-1} + b_c) && \\text{(Candidato: novos fatos)} \\\\[4pt]
C_t &= f_t \\odot C_{t-1} + i_t \\odot \\tilde{C}_t && \\text{(Atualização Linear da Cell State)} \\\\[4pt]
o_t &= \\sigma(W_o x_t + U_o h_{t-1} + b_o) && \\text{(Output Gate: o que emitir)} \\\\[4pt]
h_t &= o_t \\odot \\tanh(C_t) && \\text{(Novo Hidden State)}
\\end{aligned}`,
    variables: [
      { name: 'f_t', desc: 'Portão de esquecimento: escala a Cell State anterior elemento a elemento em [0, 1].' },
      { name: 'i_t, C̃_t', desc: 'Portão de entrada e proposta candidata em [-1, +1] para adicionar novos fatos.' },
      { name: 'C_t', desc: 'Nova Cell State obtida por soma direta protegida: ∂C_t / ∂C_{t-1} = f_t.' },
      { name: 'o_t, h_t', desc: 'Portão de saída e Hidden State revelado para o próximo passo ou camada superior.' }
    ],
    notes: `Vamos inspecionar a matemática dos três portões da LSTM. O Forget Gate, f_t, recebe a entrada atual x_t e o estado oculto anterior h_{t-1}, passando por uma função Sigmoid. Se a saída for próxima de 1, mantemos a memória; se for 0, descartamos. O Input Gate, i_t, também com Sigmoid, decide quais dimensões serão atualizadas, enquanto C_tilde_t, modulado por Tanh entre -1 e +1, propõe novos candidatos a fatos. A atualização da Cell State é linear: f_t vezes C_{t-1} mais i_t vezes C_tilde_t. Por fim, o Output Gate, o_t, filtra quanto do estado de célula atualizado — passado por uma Tanh — será exposto como o novo Hidden State h_t para a próxima camada ou passo temporal. É um controle de fluxo de informação perfeito e diferenciável.`
  },

  // Slide 7: Custom - LSTMGateExplorer Interactive
  {
    id: 7,
    type: 'custom',
    title: 'Laboratório Interativo da Célula LSTM',
    subtitle: 'Manipule Entradas, Estados Anteriores e o Bias de Esquecimento em Tempo Real',
    component: <LSTMGateExplorer />,
    notes: `Agora convido vocês a interagirem com o nosso simulador interativo na tela. Notem os seletores de entrada x_t, estado oculto anterior h_{t-1}, estado de célula anterior C_{t-1} e o bias do Forget Gate. Ao clicar no botão 'Pico / Evento Novo', percebam como o Input Gate se eleva rapidamente para absorver o novo dado, enquanto a rodovia C_t absorve a novidade sem perder a base anterior. No preset 'Esquecimento Brusco', vejam como uma alteração forçada no Forget Gate reduz o valor de f_t para próximo de zero, resetando a Cell State instantaneamente. Essa flexibilidade matemática é o que permite à LSTM aprender quando manter um contexto por 30 passos e quando descartá-lo ao final de uma frase ou de um ciclo diário.`
  },

  // Slide 8: Comparison - Bias do Forget Gate (+1.0)
  {
    id: 8,
    type: 'comparison',
    title: 'O Segredo da Inicialização do Bias de Esquecimento',
    subtitle: 'Por que Definir b_f ≈ +1.0 no Início do Treinamento é uma Regra de Ouro',
    cardLeft: {
      badge: 'INICIALIZAÇÃO PADRÃO (b_f = 0)',
      title: 'Perda Precoce de Memória',
      items: [
        'Com b_f = 0, a sigmoide inicializa em σ(0) = 0.5.',
        'A Cell State é multiplicada por 0.5 a cada passo temporal.',
        'Em 10 passos: 0.5^10 ≈ 0.00097 (memória quase 100% destruída).',
        'A rede esquece o início da série antes mesmo de aprender o que é útil.'
      ]
    },
    cardRight: {
      badge: 'BOA PRÁTICA (b_f ≈ +1.0 ou +2.0)',
      title: 'Lembrar por Padrão (Remember by Default)',
      items: [
        'Com b_f = +1.0 a +2.0, a sigmoide inicia em σ(1) ≈ 0.73 a 0.88.',
        'O fluxo de informação da Cell State transita intacto desde a Época 1.',
        'A rede começa o treinamento com memória longa perfeita.',
        'O algoritmo aprende gradualmente apenas o que vale a pena esquecer.'
      ]
    },
    notes: `Aqui reside um dos segredos práticos mais valiosos de Deep Learning: a inicialização do bias do Forget Gate, b_f. Em 2015, Rafal Jozefowicz e sua equipe demonstraram que inicializar os biases da rede neural aleatoriamente próximos de zero faz com que a Sigmoid do Forget Gate comece em 0.5. Isso significa que, a cada passo temporal, o modelo multiplica a Cell State por 0.5, reduzindo a memória em 50%! Em 10 passos, a memória cai para quase zero logo na época 1. Por isso, a boa prática de engenharia é inicializar o bias do Forget Gate com um valor positivo, como +1.0 ou +2.0. Isso força f_t a começar próximo de 0.88 ou 0.95, garantindo que o modelo comece o treino lembrando de tudo e aprenda gradualmente apenas o que vale a pena esquecer.`
  },

  // Slide 9: Flow - A Célula GRU
  {
    id: 9,
    type: 'flow',
    title: 'A Célula GRU (Gated Recurrent Unit)',
    subtitle: 'Eficiência Computacional e Fusão de Estados sem Perda de Capacidade',
    steps: [
      {
        num: '01',
        title: 'Fusão de Estados (Apenas h_t)',
        desc: 'Elimina o vetor de Cell State (C_t) separado. O próprio Hidden State h_t atua simultaneamente como memória de longo e curto prazo.'
      },
      {
        num: '02',
        title: 'Reset Gate (r_t)',
        desc: 'Decide o quanto do estado oculto anterior h_{t-1} deve ser combinado com a nova entrada x_t para gerar o candidato.'
      },
      {
        num: '03',
        title: 'Update Gate (z_t) — Interpolação Convexa',
        desc: 'Controla a média ponderada linear entre o estado antigo e o novo candidato: h_t = (1 - z_t) · h_{t-1} + z_t · h̃_t.'
      }
    ],
    notes: `Em 2014, Kyunghyun Cho e seus colaboradores propuseram uma simplificação engenhosa da LSTM: a GRU. Eles se perguntaram: precisamos realmente de dois estados separados, C_t e h_t? E precisamos de três portões independentes? A resposta foi não para a maioria das tarefas práticas. A GRU funde a Cell State e o Hidden State em um único vetor h_t e reduz a arquitetura para apenas dois portões: o Reset Gate, r_t, que controla quanto do passado afeta a nova proposta candidata, e o Update Gate, z_t, que atua como uma interpolação linear convexa direta entre o estado passado e o novo candidato. Com isso, a GRU alcança desempenho frequentemente idêntico ao da LSTM consumindo cerca de 25% menos parâmetros e computação mais rápida.`
  },

  // Slide 10: Formula - Equações da GRU
  {
    id: 10,
    type: 'formula',
    title: 'A Matemática Elegante da GRU',
    subtitle: 'O Equilíbrio Convexo entre o Estado Passado e o Novo Candidato',
    formula: `\\begin{aligned}
z_t &= \\sigma(W_z x_t + U_z h_{t-1} + b_z) && \\text{(Update Gate: ponderação de retenção)} \\\\[5pt]
r_t &= \\sigma(W_r x_t + U_r h_{t-1} + b_r) && \\text{(Reset Gate: filtro do passado)} \\\\[5pt]
\\tilde{h}_t &= \\tanh(W_h x_t + U_h (r_t \\odot h_{t-1}) + b_h) && \\text{(Candidato com passado modulado)} \\\\[5pt]
h_t &= (1 - z_t) \\odot h_{t-1} + z_t \\odot \\tilde{h}_t && \\text{(Interpolação Convexa Final)}
\\end{aligned}`,
    variables: [
      { name: 'z_t', desc: 'Portão de atualização: atua como seletor contínuo entre memória anterior e novidade.' },
      { name: 'r_t', desc: 'Portão de reset: se r_t ≈ 0, o modelo ignora o passado recente ao formular o candidato.' },
      { name: 'h̃_t', desc: 'Novo candidato modulado pelo passado filtrado via tangente hiperbólica [-1, +1].' },
      { name: 'h_t', desc: 'Interpolação direta sem matriz de saída extra. Economia de 25% de matrizes.' }
    ],
    notes: `Observem as equações da GRU na tela. O Update Gate, z_t, usa uma Sigmoid para atuar como um seletor deslizante entre 0 e 1. Quando calculamos o candidato h_tilde_t, usamos a Tanh multiplicada pelo Reset Gate r_t vezes h_{t-1}: se r_t for zero, o modelo lê apenas a entrada atual x_t, ignorando o passado imediato. E na atualização final de h_t, a equação é uma média ponderada linear: (1 - z_t) vezes h_{t-1} mais z_t vezes h_tilde_t. Reparem na elegância: não existe uma multiplicação adicional por matriz de pesos para a saída. Se z_t for próximo de 0, o estado anterior é copiado integralmente sem sofrer nenhuma distorção matemática, permitindo que a GRU propague gradientes a longas distâncias com extrema facilidade.`
  },

  // Slide 11: Custom - LSTMvsGRUComparator Interactive
  {
    id: 11,
    type: 'custom',
    title: 'Comparador Dimensional & Paramétrico',
    subtitle: 'Cálculo Rigoroso de Matrizes de Peso, Contagem de Parâmetros e Memória de GPU',
    component: <LSTMvsGRUComparator />,
    notes: `Vejam na tela o nosso comparador paramétrico dinâmico. Vocês podem alterar a dimensão das features de entrada, o número de neurônios ocultos e a quantidade de camadas empilhadas. Notem que para uma entrada de 10 dimensões e 64 neurônios com 2 camadas, a LSTM requer 4 matrizes de projeção por camada, totalizando dezenas de milhares de parâmetros. A GRU utiliza 3 matrizes de projeção, gerando uma economia de exatamente 25% no número de pesos! Em aplicações em borda (Edge AI), smartphones ou quando precisamos treinar modelos recorrentes em dezenas de milhares de séries temporais paralelas de SKU em e-commerce, essa redução de 25% de memória e processamento pode significar a viabilidade econômica do projeto.`
  },

  // Slide 12: Comparison - O Paradoxo das Variáveis Temporais Lineares
  {
    id: 12,
    type: 'comparison',
    title: 'O Paradoxo das Variáveis Temporais Lineares',
    subtitle: 'Por que Tratar Horas (0 a 23) e Meses (1 a 12) como Escalares Prejudica Redes Neurais',
    cardLeft: {
      badge: 'REPRESENTAÇÃO LINEAR (FALHA)',
      title: 'Descontinuidade Numérica Artificial',
      items: [
        'Hora 23h e Hora 00h têm distância numérica de 23 unidades (|23 - 0| = 23).',
        'A rede neural aprende que a virada da noite é a maior distância possível.',
        'Mês 12 (Dezembro) e Mês 1 (Janeiro) parecem polos opostos no espaço.',
        'O gradiente sofre com saltos abruptos artificiais a cada início de ciclo.'
      ]
    },
    cardRight: {
      badge: 'NATUREZA REAL DO TEMPO',
      title: 'Ciclos Contínuos e Periódicos',
      items: [
        'A transição das 23h59 para as 00h00 é suave e imediata no mundo real.',
        'Dezembro e Janeiro compartilham a mesma estação climática (verão/inverno).',
        'O tempo opera em círculos fechados (24h/dia, 7 dias/semana, 12 meses/ano).',
        'Exige uma representação com distância euclidiana contínua e uniforme.'
      ]
    },
    notes: `Agora entramos em um tópico crucial de engenharia de dados que muitos profissionais iniciantes negligenciam. Suponham que vocês estejam prevendo o consumo de energia da cidade a cada hora. Se vocês passarem a hora do dia como um número inteiro de 0 a 23, qual é a distância matemática entre as 23h da noite e as 00h da madrugada seguinte? Para a rede neural, a distância entre 23 e 0 é de 23 unidades! O modelo interpretará que meia-noite é o ponto mais distante e oposto possível das 23h, quando na realidade é o segundo seguinte. O mesmo erro ocorre com meses do ano: dezembro (12) e janeiro (1) parecem polos opostos, quando na verdade formam uma transição sazonal contínua de verão ou inverno.`
  },

  // Slide 13: Formula - Features Cíclicas Trigonométricas
  {
    id: 13,
    type: 'formula',
    title: 'Projeção no Círculo Unitário com Seno e Cosseno',
    subtitle: 'A Solução Trigonométrica para Continuidade Periódica de Calendário',
    formula: `\\begin{aligned}
x_{\\sin} &= \\sin\\left(\\frac{2\\pi \\cdot t}{T}\\right) \\\\[8pt]
x_{\\cos} &= \\cos\\left(\\frac{2\\pi \\cdot t}{T}\\right) \\\\[8pt]
\\| (x_{\\sin}, x_{\\cos}) \\| &= \\sin^2(\\theta) + \\cos^2(\\theta) = 1.0
\\end{aligned}`,
    variables: [
      { name: 't', desc: 'Valor temporal atual (ex: hora 0..23, dia da semana 0..6, mês 1..12).' },
      { name: 'T', desc: 'Período total do ciclo temporal (T=24 para horas, T=7 para dias, T=12 para meses).' },
      { name: 'x_sin, x_cos', desc: 'Par de coordenadas cartesianas no círculo unitário garantindo distância uniforme em 2D.' },
      { name: 'Continuidade', desc: 'A distância euclidiana entre 23h e 00h passa a ser exatamente igual à de 14h para 15h!' }
    ],
    notes: `A solução elegante da ciência de dados para esse paradoxo é a transformação cíclica no círculo unitário através do seno e cosseno. Para qualquer variável periódica com período T — por exemplo, T=24 para horas ou T=12 para meses —, calculamos duas novas features: x_sin igual ao seno de 2 pi vezes t dividido por T, e x_cos igual ao cosseno de 2 pi vezes t dividido por T. Por que precisamos de ambas? Porque o seno sozinho teria valores idênticos em quadrantes diferentes (por exemplo, às 6h da manhã e às 18h da tarde). Com as duas projeções simultâneas, cada momento do dia ou do ano recebe uma coordenada única no plano bidimensional, e a distância euclidiana entre 23h e 00h torna-se exatamente a mesma distância infinitesimal de qualquer outra transição de uma hora.`
  },

  // Slide 14: Flow - Estabilidade Numérica: Gradient Clipping e Schedulers
  {
    id: 14,
    type: 'flow',
    title: 'Estabilidade em Séries Longas: Gradient Clipping & Schedulers',
    subtitle: 'Blindagem contra Explosão de Gradiente e Ajuste Fino em Platôs de Perda',
    steps: [
      {
        num: '01',
        title: 'Retropropagação e Acúmulo de Gradiente',
        desc: 'loss.backward() calcula os gradientes em todas as etapas temporais do BPTT, podendo gerar picos em batches ruidosos.'
      },
      {
        num: '02',
        title: 'Gradient Clipping por Norma (Teto Global)',
        desc: 'torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) reescala o vetor gradiente mantendo sua direção exata.'
      },
      {
        num: '03',
        title: 'LR Scheduler Adaptativo (ReduceLROnPlateau)',
        desc: 'Monitora a perda de validação. Caso estacione por N épocas (patience), reduz o learning rate em 50% para refinar os pesos.'
      }
    ],
    notes: `Mesmo com LSTMs e GRUs, quando lidamos com sequências de 72 ou 168 passos temporais em lotes grandes, picos abruptos nos dados podem induzir o temido Exploding Gradient, gerando pesos NaN e colapsando o modelo. A blindagem definitiva do PyTorch é o Gradient Clipping por norma: executamos torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0) logo após o loss.backward() e antes do optimizer.step(). Se a norma global dos gradientes ultrapassar o teto, todos os gradientes são reescalados proporcionalmente sem alterar sua direção geométrica. Complementamos isso com o ReduceLROnPlateau, que monitora o erro de validação e diminui a taxa de aprendizado em 50% quando o modelo estaciona em um platô.`
  },

  // Slide 15: Comparison - Armadilha da RNN Bidirecional
  {
    id: 15,
    type: 'comparison',
    title: 'Armadilhas Práticas: O Risco Causal da RNN Bidirecional',
    subtitle: 'Por que Bidirectional=True Gera Vazamento Grave em Previsões Futuras em Tempo Real',
    cardLeft: {
      badge: 'NLP & PROCESSAMENTO OFFLINE',
      title: 'Contexto Futuro Permitido',
      items: [
        'Na tradução de idiomas ou análise de sentimento, o texto completo já existe.',
        'O modelo pode ler a frase do início ao fim e do fim ao início simultaneamente.',
        'A Bi-LSTM enriquece a representação contextual de cada palavra perfeitamente.',
        'Válido apenas quando o "futuro" já está registrado e fixo.'
      ]
    },
    cardRight: {
      badge: 'FORECASTING TEMPORAL ONLINE',
      title: 'Vazamento Causal Destrutivo',
      items: [
        'Na previsão de amanhã (t+1), o dado futuro AINDA NÃO EXISTE no mundo real.',
        'A camada reversa da Bi-LSTM trapaceia lendo o final da janela histórica de treino.',
        'O modelo decora padrões baseados no futuro artificial da amostra.',
        'Em produção no dia a dia, a inferência falha com erro altíssimo.'
      ]
    },
    notes: `Cuidado com o uso automático de RNNs Bidirecionais em séries temporais! Em tarefas de Processamento de Linguagem Natural, como tradução de texto ou análise de sentimento, você possui a frase inteira disponível de antemão: faz todo sentido ler da esquerda para a direita e da direita para a esquerda. Porém, em forecasting de séries temporais causais em tempo real — como prever a demanda de vendas ou a temperatura de amanhã —, o futuro ainda não aconteceu! Se você treinar uma BiLSTM em uma janela histórica, a camada reversa lerá do final da janela para o começo, aprendendo padrões espúrios baseados no futuro da janela. Na hora do deploy real em produção, essa informação futura inexiste, e o modelo falha catastroficamente.`
  },

  // Slide 16: Custom - DemandForecastingSimulator Interactive
  {
    id: 16,
    type: 'custom',
    title: 'Previsão de Demanda e Métricas de Negócio: WAPE vs MAPE',
    subtitle: 'Simule Janelas de Lookback, Modelos e Avalie Métricas Imunes à Divisão por Zero',
    component: <DemandForecastingSimulator />,
    notes: `Como avaliar o sucesso do nosso modelo de séries temporais? O MAE (Mean Absolute Error) e o RMSE (Root Mean Squared Error) são clássicos, mas dependem da escala absoluta das grandezas. O MAPE (Mean Absolute Percentage Error) é percentual, porém tem uma falha fatal: se um item tiver venda zero em determinado dia (y_t = 0), a fórmula tenta dividir por zero, explodindo para o infinito! A solução da indústria é o WAPE (Weighted Absolute Percentage Error): somamos todos os erros absolutos do lote e dividimos pela soma de todas as demandas reais observadas. O WAPE é naturalmente imune à divisão por zero, pondera automaticamente o impacto dos itens de maior volume financeiro e expressa o erro percentual global de forma clara e intuitiva para os gestores.`
  },

  // Slide 17: Quiz - Validação Conceitual
  {
    id: 17,
    type: 'quiz',
    title: 'Desafios de Fixação & Validação Conceitual',
    subtitle: 'Teste seus Conhecimentos em Mecanismos de Portão, Causalidade e Métricas',
    component: <SequentialQuizWidget />,
    notes: `Chegamos ao nosso momento de fixação ativa! Na tela, temos 3 questões reflexivas cruciais. Na primeira, avaliem por que a atualização da Cell State na LSTM previne o desaparecimento do gradiente. Na segunda, reflitam sobre a armadilha do uso de arquiteturas bidirecionais em previsões causais de produção. E na terceira, identifiquem a vantagem matemática do WAPE sobre o MAPE em cenários de demanda esparsa com vendas nulas. Selecionem suas respostas, analisem o feedback detalhado de cada opção e consolidem esses fundamentos que são frequentemente cobrados em entrevistas técnicas para vagas de Engenharia de Machine Learning e Cientista de Dados.`
  },

  // Slide 18: Roadmap - Conclusão do Módulo
  {
    id: 18,
    type: 'roadmap',
    title: 'Conclusão do Bloco de Redes Neurais Profundas',
    subtitle: 'O Domínio Completo dos Fundamentos, Conexão com o EC3 e Transição Curricular',
    steps: [
      { num: 'A1-A2', title: 'Fundamentos & Grafos', desc: 'Tensores, perceptron, grafos dinâmicos, Autograd e primeiras MLPs.' },
      { num: 'A3-A5', title: 'Pipelines & Otimização', desc: 'DataLoaders, regularização, inicializações, TensorBoard e Projeto 1.' },
      { num: 'A6-A8', title: 'Visão & Autoencoders', desc: 'Convoluções 2D, CNNs profundas (PlantVillage), espaço latente e anomalias.' },
      { num: 'A9', title: 'Avaliação & Métricas', desc: 'Desbalanceamento, PR-AUC, Brier score e diagnóstico crítico.' },
      { num: 'A10-A11', title: 'Modelos Sequenciais', desc: 'Séries temporais, Vanilla RNNs, LSTMs, GRUs e Estudo de Caso 3.' }
    ],
    notes: `Parabéns a todos! Com esta décima primeira aula, encerramos com chave de ouro o bloco de Redes Neurais Profundas da nossa graduação. Percorremos uma trajetória fantástica: partimos dos tensores e do neurônio artificial na Aula 1, dominamos o Autograd e MLPs, aprendemos pipelines de dados tabulares e regularizações, investigamos diagnósticos de gradientes no TensorBoard, mergulhamos nas convoluções e imagens com CNNs e Autoencoders, superamos desbalanceamentos com métricas avançadas e, finalmente, dominamos a modelagem temporal com RNNs, LSTMs e GRUs. Utilizem todo o código desenvolvido no notebook de hoje como base sólida para o Estudo de Caso 3 e para a entrega do Projeto 2. Continuem praticando, explorando os notebooks e até nosso próximo módulo!`
  }
];
