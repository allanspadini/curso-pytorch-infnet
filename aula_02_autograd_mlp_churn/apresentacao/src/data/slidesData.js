export const slidesData = [
  {
    id: 1,
    type: 'title',
    title: 'Fundamentos da Retropropagação, Norma do Erro & Primeira MLP',
    subtitle: 'Aula 02: Como Redes Neurais Aprendem com Seus Erros e Previsão de Churn',
    stage: 'Redes Neurais Profundas (Deep Learning e Visão Computacional)',
    institution: 'Faculdade Infnet',
    date: '2026-07-29',
    notes: 'Boas-vindas à nossa segunda aula! Hoje vamos entender o coração de toda rede neural profunda: a Retropropagação (Backpropagation). Vamos aprender de maneira bem calma e intuitiva como uma rede pega os dados, faz uma estimativa, calcula a norma do erro para medir a distância do resultado desejado, e depois viaja de volta ajustando cada peso. Em seguida, veremos como o PyTorch automatiza esse processo e treinaremos nossa primeira MLP!'
  },
  {
    id: 2,
    type: 'roadmap',
    title: 'Roteiro & Objetivos da Aula',
    subtitle: 'Quatro blocos fundamentais para dominar como as redes aprendem',
    steps: [
      { num: '01', title: 'O Conceito de Retropropagação', desc: 'Entendendo a ideia intuitiva do aprendizado por correção de erros.' },
      { num: '02', title: 'A Norma do Erro (Demonstração)', desc: 'Simulações visuais da régua de distância e do perigo do cancelamento.' },
      { num: '03', title: 'Ciclo em 5 Passos no PyTorch', desc: 'Do conceito teórico às 5 linhas de código do loop de treinamento.' },
      { num: '04', title: 'Primeira MLP (SaaS Churn)', desc: 'Construindo uma rede multicamadas para prever cancelamentos.' }
    ],
    notes: 'Nossa aula está estruturada em 4 fases calmas: primeiro, entenderemos a ideia da retropropagação sem complicações técnicas. Em seguida, veremos a demonstração visual da norma do erro para saber o tamanho da divergência. Depois, conectaremos isso aos 5 passos do PyTorch e finalizaremos treinando um modelo real de previsão de Churn em SaaS.'
  },
  {
    id: 3,
    type: 'flow',
    title: 'O Conceito Intuitivo da Retropropagação (Backpropagation)',
    subtitle: 'Como uma rede neural aprende corrigindo os próprios erros passo a passo',
    steps: [
      { step: '1. Passagem Direta (Forward)', formula: '\\hat{y} = f(X, w)', desc: 'O modelo recebe as entradas e gera um palpite ou estimativa inicial.' },
      { step: '2. Medição do Erro (Norma)', formula: 'e = \\|y - \\hat{y}\\|', desc: 'Comparamos a estimativa com a resposta real para saber o tamanho do desvio.' },
      { step: '3. Retropropagação (Backward)', formula: '\\text{Atribuição de Culpa}', desc: 'Caminhamos do fim para o início identificando a contribuição de cada peso no erro.' },
      { step: '4. Ajuste dos Pesos', formula: 'w_{\\text{novo}} = w - \\text{ajuste}', desc: 'Modificamos os pesos para que o próximo palpite seja mais preciso.' }
    ],
    notes: 'Pensem na retropropagação como um processo de tentativa e erro guiado. Primeiro, a rede tenta adivinhar a resposta na passagem direta (Forward). Depois, medimos a distância entre o palpite e a realidade. Por fim, fazemos o caminho inverso (Backward): percorremos a rede do fim para o começo perguntando a cada peso: "Quanto você contribuiu para esse erro?". Sabendo a resposta, ajustamos os pesos para errar menos na próxima vez!'
  },
  {
    id: 4,
    type: 'custom',
    component: 'ErrorNormVisualizer',
    title: 'Visualizando a Norma do Erro: A Régua de Distância',
    subtitle: 'Mova a estimativa (ŷ) para ver em tempo real como a norma mede a gravidade da diferença',
    notes: 'Vejam na tela a primeira demonstração visual! A norma do erro funciona como uma régua de distância entre o palpite do modelo e a realidade. Ao mover a barra da estimativa, notem como o velocímetro calcula a norma em tempo real. Se o desvio é pequeno, o sinal fica verde (ajuste sutil); se o desvio cresce, o sinal fica vermelho (forte impulso de correção nos pesos)!'
  },
  {
    id: 5,
    type: 'custom',
    component: 'ErrorNormCancellationDemo',
    title: 'Por Que Usamos a Norma? A Armadilha do Cancelamento',
    subtitle: 'Compare a soma simples sem norma vs. o diagnóstico real com a norma do erro',
    notes: 'Esta demonstração visual revela por que a norma é absolutamente obrigatória! Se apenas somássemos os erros brutos dos dois clientes (+0.60 e -0.60), a soma daria zero! O modelo entraria na ilusão perigosa de achar que está perfeito quando na verdade errou os dois clientes! Aplicando a norma (valores absolutos ou quadrados), o diagnóstico correto de 1.20 aciona a retropropagação.'
  },
  {
    id: 6,
    type: 'flow',
    title: 'A Mecânica da Retropropagação em 3 Etapas Calmas',
    subtitle: 'Entendendo a transmissão do sinal de erro da saída até as entradas',
    steps: [
      { step: 'Etapa 1: Erro na Camada de Saída', formula: 'E_{\\text{saída}} = \\text{Norma}(y, \\hat{y})', desc: 'Calculamos a diferença final entre a estimativa e o objetivo real.' },
      { step: 'Etapa 2: Distribuição de Responsabilidade', formula: '\\text{Sinal de Erro} \\rightarrow \\text{Camadas Ocultas}', desc: 'O erro é repartido entre os neurônios que geraram a saída proporcionalmente a seus pesos.' },
      { step: 'Etapa 3: Atualização Local dos Pesos', formula: '\\Delta w \\propto \\text{Entrada} \\times \\text{Erro do Neurônio}', desc: 'Cada peso individual é ajustado de acordo com seu papel no erro final.' }
    ],
    notes: 'Vamos acompanhar o fluxo devagar: na Etapa 1, calculamos a norma do erro na saída. Na Etapa 2, o sinal desse erro começa a viajar para trás. Os neurônios que tinham pesos maiores e ativaram mais forte recebem uma parcela maior da responsabilidade pelo erro. Na Etapa 3, usamos essa responsabilidade para recalibrar cada conexão individual.'
  },
  {
    id: 7,
    type: 'formula',
    title: 'A Ferramenta Matemática: A Regra da Cadeia',
    subtitle: 'Como multiplicamos pequenas reações locais para encontrar o ajuste final',
    formula: '\\frac{\\partial \\text{Erro}}{\\partial w} = \\underbrace{\\frac{\\partial \\text{Erro}}{\\partial \\hat{y}}}_{\\text{Norma do Erro}} \\cdot \\underbrace{\\frac{\\partial \\hat{y}}{\\partial z}}_{\\text{Efeito da Ativação}} \\cdot \\underbrace{\\frac{\\partial z}{\\partial w}}_{\\text{Sinal de Entrada (x)}}',
    variables: [
      { name: '\\partial \\text{Erro} / \\partial \\hat{y}', desc: 'Norma da distância: quanto o erro geral muda se a estimativa final mudar.' },
      { name: '\\partial \\hat{y} / \\partial z', desc: 'Ativação: quanto a estimativa muda quando variamos o resultado bruto do neurônio.' },
      { name: '\\partial z / \\partial w', desc: 'Entrada x: a contribuição direta do peso w na combinação linear z = w·x + b.' }
    ],
    notes: 'Não se assustem com os símbolos! A Regra da Cadeia é apenas uma multiplicação de respostas simples. Imagine uma linha de montagem: se o produto final saiu com defeito (Norma do Erro), queremos saber o quanto o peso w lá no começo afetou esse defeito. Multiplicamos a taxa de erro na saída pelo efeito da função de ativação e pelo sinal de entrada x. O produto dessas três partes dá o gradiente exato!'
  },
  {
    id: 8,
    type: 'custom',
    component: 'AutogradGraphVisualizer',
    title: 'Simulador Interativo: Passagem Direta vs. Retropropagação',
    subtitle: 'Altere x, w e b para ver a geração do valor z, a norma y e o cálculo dos gradientes',
    notes: 'Vejam o simulador na tela. Na aba "Passagem Direta", ajustem o peso w e o viés b para ver o cálculo do valor intermediário z e o resultado final da perda y (a norma do erro). Depois, cliquem em "Propagação (Backward)" para observar as setas laranjas mostrando os gradientes calculados pela Regra da Cadeia retornando para cada parâmetro!'
  },
  {
    id: 9,
    type: 'flow',
    title: 'O Ciclo Sagrado de Treinamento (5 Passos)',
    subtitle: 'A sequência exata que você escreverá em 100% dos projetos em PyTorch',
    steps: [
      { step: '1. otimizador.zero_grad()', formula: 'Zera gradientes acumulados', desc: 'Limpa os gradientes calculados na época anterior.' },
      { step: '2. pred = modelo(X)', formula: 'Passagem Direta (Forward)', desc: 'Passa os dados pela rede para gerar a estimativa ŷ.' },
      { step: '3. loss = criterio(pred, Y)', formula: 'Norma do Erro (Calcula Loss)', desc: 'Mede a norma da distância entre a estimativa ŷ e a meta Y.' },
      { step: '4. loss.backward()', formula: 'Retropropagação (Backward)', desc: 'Executa a Regra da Cadeia trazendo o erro da saída para os pesos.' },
      { step: '5. otimizador.step()', formula: 'Atualização dos Pesos', desc: 'Ajusta os pesos: w = w - learning_rate * gradiente.' }
    ],
    notes: 'Gravem estes 5 passos com carinho! Eles traduzem rigorosamente tudo o que discutimos hoje: 1) Limpar o passado com zero_grad; 2) Fazer a estimativa no forward; 3) Medir a norma do erro com a função de Loss; 4) Fazer a retropropagação com loss.backward(); e 5) Atualizar os pesos com otimizador.step().'
  },
  {
    id: 10,
    type: 'custom',
    component: 'TrainingLoopStepByStep',
    title: 'Simulador Interativo do Loop de Treinamento',
    subtitle: 'Clique em "Avançar Passo" e acompanhe a transição dos tensores nas 5 etapas',
    notes: 'No simulador na tela, vocês podem acompanhar interativamente a execução dos 5 passos. Observem como no Passo 3 a norma da Loss é calculada, no Passo 4 o gradiente é preenchido nos tensores, e no Passo 5 o peso é efetivamente alterado.'
  },
  {
    id: 11,
    type: 'formula',
    title: 'Função de Perda Binária: Binary Cross-Entropy',
    subtitle: 'A norma probabilística para medir erros em problemas de classificação (0 ou 1)',
    formula: 'L(y, \\hat{y}) = - \\left[ y \\log(\\hat{y}) + (1 - y) \\log(1 - \\hat{y}) \\right]',
    variables: [
      { name: 'y', desc: 'Rótulo real da amostra (0 para cliente ativo, 1 para Churn/cancelado).' },
      { name: '\\hat{y}', desc: 'Probabilidade prevista pela rede neural (estimativa da saída, entre 0 e 1).' },
      { name: 'nn.BCELoss()', desc: 'Implementação em PyTorch da norma de perda por Entropia Cruzada Binária.' }
    ],
    notes: 'Para medir a norma do erro em tarefas binárias (como saber se o cliente vai cancelar ou não), usamos a Entropia Cruzada Binária (BCELoss). Se o cliente cancelou (y=1) e a rede previu 99% (ŷ=0.99), a perda é quase zero. Mas se a rede previu 1% (ŷ=0.01), a norma da perda dispara para um valor gigante, acionando uma retropropagação forte!'
  },
  {
    id: 12,
    type: 'flow',
    title: 'O Otimizador: Gradiente Descendente Estocástico',
    subtitle: 'Como o optim.SGD usa o gradiente da retropropagação para ajustar os pesos',
    steps: [
      { step: '1. Direção Oposta ao Gradiente', formula: '-\\nabla L(w)', desc: 'O gradiente indica para onde o erro cresce; por isso andamos na direção contrária.' },
      { step: '2. Escalonamento pela Taxa de Aprendizado (η)', formula: '\\eta \\cdot \\text{Gradiente}', desc: 'A taxa de aprendizado (learning rate) controla o tamanho do passo de ajuste.' },
      { step: '3. Atualização do Peso', formula: 'w_{\\text{novo}} = w_{\\text{atual}} - \\eta \\cdot \\text{Gradiente}', desc: 'O peso é atualizado para reduzir a norma do erro na próxima época.' }
    ],
    notes: 'O otimizador é quem dá o passo de ajuste. Ele pega o gradiente calculated na retropropagação, multiplica pela taxa de aprendizado (learning rate) e subtrai do peso atual. Assim, a cada época, a norma do erro diminui um pouco mais.'
  },
  {
    id: 13,
    type: 'comparison',
    title: 'Laboratório de Learning Rate: Hiperparâmetro Crítico',
    subtitle: 'O que acontece quando a taxa de aprendizado (η) é grande ou pequena demais?',
    cardLeft: {
      badge: 'TAXA MUITO ALTA (ex: lr = 10.0)',
      title: 'Passos Gigantes & Divergência',
      items: [
        'O passo de ajuste pula o ponto de erro mínimo.',
        'A norma da perda (Loss) começa a CRESCER em vez de diminuir.',
        'O modelo desestabiliza e pode gerar erros numéricos (NaN).',
        'Impossibilita o aprendizado da rede.'
      ]
    },
    cardRight: {
      badge: 'TAXA MUITO BAIXA (ex: lr = 0.0001)',
      title: 'Passos Microscópicos & Lentidão',
      items: [
        'Os ajustes nos pesos são tão pequenos que o erro quase não cai.',
        'O modelo exige milhares de épocas e horas de treinamento.',
        'Pode ficar preso em valas rasas de erro (mínimos locais).',
        'Desperdício de tempo de computação.'
      ]
    },
    notes: 'A taxa de aprendizado (learning rate) é a velocidade com que ajustamos os pesos a cada passo. Se colocarmos um valor muito alto, a rede dá saltos gigantescos e passa do ponto ideal, fazendo o erro aumentar! Se for muito pequeno, a rede demora uma eternidade para aprender.'
  },
  {
    id: 14,
    type: 'custom',
    component: 'LearningRateLab',
    title: 'Laboratório Interativo: Curvas de Aprendizado',
    subtitle: 'Selecione a Taxa de Aprendizado (lr) e analise a queda da norma da Loss',
    notes: 'Testem no painel interativo os valores de learning rate. Observem como com lr=0.1 a curva de perda desce suavemente até perto de zero, enquanto com lr=10.0 a curva salta para o topo e diverge!'
  },
  {
    id: 15,
    type: 'image-text',
    title: 'Caso Prático de Negócios: Previsão de Churn em SaaS',
    subtitle: 'Identificando antecipadamente clientes com alto risco de cancelamento',
    imageSrc: '/cartoon_cancel_plan.jpg',
    imageAlt: 'Cliente tentando cancelar plano de celular',
    bullets: [
      '**O Desafio Corporativo**: Cancelamentos (Churn) reduzem a receita recorrente da empresa de software.',
      '**Variável Alvo (Y)**: `Churn` (1 = Cancelou a assinatura, 0 = Cliente Continua Ativo).',
      '**Variáveis de Entrada (X)**: Tempo de Contrato (meses), Faturamento ($), Chamados ao Suporte e Dias Inativo.',
      '**Objetivo**: Treinar uma MLP para estimar a probabilidade de Churn e alertar o time comercial.'
    ],
    notes: 'Vamos aplicar tudo isso em um problema real e de grande valor comercial: prever quais clientes de uma empresa de SaaS estão prestes a cancelar a assinatura. Usaremos 4 dados do cliente para que a nossa MLP estime a probabilidade de Churn!'
  },
  {
    id: 16,
    type: 'flow',
    title: 'Arquitetura da Primeira MLP (Multi-Layer Perceptron)',
    subtitle: 'Encadeando camadas ocultas para aprender padrões complexos de Churn',
    steps: [
      { step: 'Camada de Entrada (Input)', formula: 'X \\in \\mathbb{R}^4', desc: '4 atributos do cliente (Contrato, Faturamento, Suporte, Dias Inativo).' },
      { step: 'Camada Oculta (Hidden)', formula: 'h = \\text{ReLU}(W_1 X + b_1) \\in \\mathbb{R}^8', desc: '8 neurônios ocultos com ativação ReLU para capturar combinatórias não-lineares.' },
      { step: 'Camada de Saída (Output)', formula: '\\hat{y} = \\text{Sigmoid}(W_2 h + b_2) \\in [0, 1]', desc: '1 neurônio com Sigmoid gerando a estimativa de probabilidade de Churn.' }
    ],
    notes: 'Nossa primeira MLP terá 3 etapas de processamento: 4 características na entrada, uma camada oculta com 8 neurônios ativados pela função ReLU, e uma saída de 1 neurônio com a função Sigmoid para garantir que a estimativa seja uma probabilidade entre 0% e 100%.'
  },
  {
    id: 17,
    type: 'custom',
    component: 'SaasChurnMlpSimulator',
    title: 'Simulador Interativo da MLP de Churn SaaS',
    subtitle: 'Mova os sliders do perfil do cliente e veja a ativação dos neurônios e o risco estimado',
    notes: 'No simulador na tela, vocês podem ajustar os hábitos do cliente. Observem que quando o cliente acumula muitos chamados de suporte e dias inativos, os neurônios da camada oculta disparam e a estimativa de Churn vai para a zona vermelha!'
  },
  {
    id: 18,
    type: 'formula',
    title: 'Implementação da Classe MLPChurn em PyTorch',
    subtitle: 'Código Python claro e estruturado herdeiro de nn.Module',
    formula: 'class\\ MLPChurn(nn.Module):',
    variables: [
      { name: 'self.camada_oculta', desc: 'nn.Linear(in_features=4, out_features=8)' },
      { name: 'self.relu', desc: 'nn.ReLU() - função de ativação não-linear da camada oculta' },
      { name: 'self.camada_saida', desc: 'nn.Linear(in_features=8, out_features=1)' },
      { name: 'self.sigmoid', desc: 'nn.Sigmoid() - comprime a saída em uma probabilidade entre 0 e 1' }
    ],
    notes: 'Vejam como a escrita em PyTorch fica limpa! No construtor __init__, declaramos as duas camadas lineares e as funções de ativação. No método forward, passamos os dados X pela camada oculta com ReLU e depois pela saída com Sigmoid.'
  },
  {
    id: 19,
    type: 'roadmap',
    title: 'Resultados do Treinamento no Dataset Telco Churn',
    subtitle: 'Acompanhando a queda da norma do erro e a evolução da acurácia',
    steps: [
      { num: '01', title: 'Padronização dos Dados', desc: 'Transformação Z-score nas entradas para equilibrar as escalas dos atributos.' },
      { num: '02', title: 'Otimizador Adam', desc: 'Uso do optim.Adam(lr=0.01) com adaptação automática de taxa de aprendizado.' },
      { num: '03', title: 'Queda da Norma do Erro', desc: 'A Loss (BCELoss) caiu de 0.69 para menos de 0.25 ao longo das épocas.' },
      { num: '04', title: 'Acurácia Alcançada', desc: 'O modelo atingiu mais de 88% de acertos na classificação dos clientes.' }
    ],
    notes: 'Ao treinar nossa MLP por 300 épocas, a norma do erro (Loss) caiu drasticamente de 0.69 para menos de 0.25! Como resultado dessa retropropagação contínua, o modelo alcançou uma acurácia superior a 88% na identificação de clientes prestes a cancelar.'
  },
  {
    id: 20,
    type: 'custom',
    component: 'QuizWidget',
    title: 'Teste de Consolidação & Próximos Passos',
    subtitle: 'Valide seu aprendizado sobre retropropagação, norma do erro e MLPs',
    notes: 'Parabéns por chegarem até aqui! Respondam ao quiz na tela para consolidar os conceitos de retropropagação e norma do erro. Na próxima aula (Aula 03), aprenderemos sobre divisão de dados em treino/validação e como evitar overfitting!'
  }
];
