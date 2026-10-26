import React from 'react';
import {
  DataSplitVisualizer,
  TrainingCycleVisualizer,
  ClassificationVsRegressionVisualizer,
  TrainVsEvalVisualizer,
  NotebooksRoadmapVisualizer,
  SummaryAndNextStepsVisualizer
} from '../components/interactive/Aula04Visuals';

export const slidesData = [
  // Slide 1: Capa / Título
  {
    id: 1,
    type: 'title',
    title: 'Ciclo de Treinamento, Particionamento e Modelagem Prática',
    subtitle: 'Aula 04 — Repasse Prático: Divisão Treino/Teste, o Loop de Otimização e Diferenciação entre Classificação e Regressão',
    instructor: 'Prof. Allan Spadini',
    course: 'Redes Neurais Profundas | Graduação Faculdade Infnet',
    notes: `Olá a todos e sejam muito bem-vindos à nossa quarta aula de Redes Neurais Profundas com PyTorch!

Na aula anterior, fomos apresentados a uma série de conceitos de ingestão de dados, carregadores de lote e modelagem tabular. Hoje, faremos uma pausa estratégica essencial: esta aula é dedicada a repassar e consolidar na prática os fundamentos que sustentam todo projeto profissional de Deep Learning.

Vamos revisitar com calma e rigor a regra de ouro da divisão entre treino e teste para blindar nossos modelos contra o vazamento de dados. Em seguida, dissecaremos as cinco etapas sagradas do loop de treinamento canônico do PyTorch. Logo depois, consolidaremos as diferenças arquiteturais entre classificação multiclasse e regressão contínua.

E, principalmente: dedicaremos a maior parte do nosso tempo de aula para repassar e executar juntos os notebooks da aula anterior, garantindo que ninguém fique com dúvidas antes de avançarmos para técnicas de estabilização de redes mais profundas. Vamos começar!`
  },

  // Slide 2: Divisão Treino e Teste
  {
    id: 2,
    type: 'custom',
    title: 'A Regra de Ouro do Particionamento',
    subtitle: 'Isolamento estatístico entre Treino e Teste para eliminação total de Data Leakage',
    component: <DataSplitVisualizer />,
    notes: `Prestem muita atenção neste slide, pois este é o erro silencioso número um cometido por quem está começando em Aprendizado de Máquina e Deep Learning: o vazamento de dados, ou Data Leakage.

Observem as quatro etapas no diagrama acima.
Na primeira etapa, nós temos o dataset bruto. Muitos iniciantes cometem a ingenuidade de aplicar um StandardScaler logo de cara sobre todo o arquivo CSV. O que acontece se fizermos isso? A média e o desvio padrão de todo o dataset serão calculados conjuntamente, o que significa que informações estatísticas do teste vazaram para o treino antes mesmo de começarmos a modelar!

A regra de ouro é inflexível: Etapa 2, dividimos primeiro os dados em Treino e Teste cego.
Em seguida, na Etapa 3, ajustamos o Scaler com .fit_transform() única e exclusivamente sobre as variáveis de treino. É dali que saem a média e o desvio padrão que serão gravados no transformador.
Por fim, na Etapa 4, aplicamos apenas o .transform() no conjunto de teste. O teste não ajusta parâmetros; ele apenas se submete à transformação aprendida no treino, simulando exatamente o cliente que chegará amanhã no seu sistema em produção!`
  },

  // Slide 3: O Ciclo Canônico de Treinamento
  {
    id: 3,
    type: 'custom',
    title: 'O Ciclo Canônico de Treinamento no PyTorch',
    subtitle: 'As 5 etapas fundamentais executadas estritamente em cada mini-batch',
    component: <TrainingCycleVisualizer />,
    notes: `Agora vamos abrir o capô do PyTorch e entender a espinha dorsal de qualquer script de treinamento: o loop canônico de otimização em 5 passos.

O primeiro passo é o Forward Pass: passamos o mini-batch X pelo modelo (y_pred = model(X)). Aqui, os tensores viajam pelas camadas e o grafo computacional é gerado dinamicamente na memória.

O segundo passo é o cálculo da perda: loss = criterion(y_pred, y_batch). O critério mede numericamente a discrepância entre a predição da rede e os rótulos verdadeiros, produzindo um tensor escalar.

O terceiro passo é onde muitos alunos tropeçam: optimizer.zero_grad(). Por que isso existe? No PyTorch, por conveniência de certos modelos (como RNNs e acumulação de gradientes em GPUs pequenas), os gradientes NÃO são sobrescritos automaticamente; eles são somados! Se você esquecer o zero_grad(), o gradiente do batch atual será somado ao do anterior, e o modelo desgovernará em pouquíssimas iterações.

O quarto passo é o Backward Pass: loss.backward(). O Autograd percorre o grafo computacional de trás para frente pela Regra da Cadeia, calculando a derivada parcial da perda em relação a cada peso e preenchendo o atributo param.grad.

E finalmente, o quinto passo: optimizer.step(). O otimizador pega os gradientes recém-calculados e ajusta os pesos segundo a regra de descida de gradiente. Memorizem essa sequência: Forward, Loss, Zero Grad, Backward e Step!`
  },

  // Slide 4: Classificação vs Regressão
  {
    id: 4,
    type: 'custom',
    title: 'Classificação vs. Regressão no PyTorch',
    subtitle: 'Fronteiras de decisão discretas vs. curvas contínuas de ajuste e resíduos',
    component: <ClassificationVsRegressionVisualizer />,
    notes: `Prestem atenção especial aos dois gráficos interativos na tela: eles ilustram a intuição geométrica que separa classificação de regressão.

Olhem primeiro para o gráfico da esquerda: Classificação.
O objetivo geométrico da classificação é encontrar uma Fronteira de Decisão (Decision Boundary). O espaço de atributos é dividido em regiões coloridas. Vejam os círculos azuis (Classe 0) e os losangos laranjas (Classe 1). Se vocês clicarem em qualquer ponto do gráfico, nós colocamos uma nova amostra representada pela estrela roxa. Se a estrela cai na região azul, a rede produz logits com valor mais alto para a Classe 0; se cai na região laranja, o logit da Classe 1 se torna dominante! No PyTorch, temos C neurônios de saída e usamos nn.CrossEntropyLoss, avaliando com Acurácia e Matriz de Confusão.

Agora olhem para o gráfico da direita: Regressão.
Aqui o objetivo não é traçar uma barreira divisória, mas sim ajustar uma Curva Contínua através dos pontos. Cada ponto azul-marinho é um dado real (ex: idade de um paciente e o custo do plano de saúde em reais). Reparem nas linhas verticais tracejadas em vermelho: elas são os Resíduos, ou seja, a distância vertical exata entre o dado real e a curva da rede (y - ŷ).
O trabalho do PyTorch no nn.MSELoss é encurtar ao máximo essas linhazinhas vermelhas! Se vocês clicarem ou arrastarem o cursor pelo eixo X, verão a estimativa contínua ŷ = f(X) calculando o valor exato em reais para aquela idade. A saída tem apenas 1 neurônio linear sem ativação, e avaliamos com MAE, RMSE e R².`
  },

  // Slide 5: Modo Treino vs Avaliação
  {
    id: 5,
    type: 'custom',
    title: 'Modo Treino vs. Modo Avaliação',
    subtitle: 'O impacto de model.train(), model.eval() e with torch.no_grad()',
    component: <TrainVsEvalVisualizer />,
    notes: `Ao alternar entre o treinamento e a validação/teste, nós precisamos instruir o PyTorch explicitamente sobre o que deve e o que não deve acontecer.

Quando chamamos model.train(), nós ativamos comportamentos estocásticos projetados para o aprendizado. Por exemplo, o Dropout desativa neurônios aleatoriamente a cada batch para forçar os neurônios restantes a aprenderem representações redundantes e combater o overfitting. Da mesma forma, camadas como BatchNorm calculam médias e variâncias pontuais do lote.

Porém, quando vamos avaliar no conjunto de teste, o modelo precisa ser determinístico e justo! Chamamos model.eval(), o que desativa o Dropout imediatamente e faz o BatchNorm utilizar as médias móveis consolidadas durante o treino.

E combinamos sempre o model.eval() com o bloco 'with torch.no_grad():'. Esse bloco desliga o motor Autograd. Como não faremos backward() no teste, o PyTorch não precisa salvar nenhuma ativação intermediária na memória RAM ou da GPU. O resultado? A inferência consome menos da metade da memória e roda muito mais rápido!`
  },

  // Slide 6: Roteiro dos Notebooks
  {
    id: 6,
    type: 'custom',
    title: 'Roteiro de Repasse dos Notebooks da Aula',
    subtitle: 'Estrutura dos 3 ambientes práticos que executaremos juntos hoje',
    component: <NotebooksRoadmapVisualizer />,
    notes: `Agora entramos na parte mais importante da nossa aula síncrona: a execução prática mão na massa dos nossos três notebooks.

O primeiro notebook é a 'prática_primeira_rede_iris.ipynb'. Ele foi estruturado como um laboratório de aquecimento, com trechos de código para preenchimento. Nele, vocês verão que uma única camada linear é incapaz de separar as 3 espécies de flores, e como a adição de uma camada intermediária com ativação ReLU resolve o problema instantaneamente. Vocês também têm o arquivo de gabarito correspondente.

O segundo notebook é o 'aula_04_pipelines_dados_simples.ipynb'. Ele é uma ponte didática: simplifica a ingestão com TensorDataset, faz o particionamento treino/teste sem vazamento e treina tanto a classificação de clientes de e-commerce quanto a regressão de seguros de saúde de forma limpa e direta.

E o terceiro notebook é o 'aula_04_pipelines_dados_classificacao_regressao.ipynb', que é o nosso pipeline profissional completo, utilizando classes customizadas de Dataset com __len__ e __getitem__, DataLoaders estocásticos e comparação contra baselines de média e classe majoritária.

Vamos agora abrir o ambiente do Jupyter e rodar cada bloco juntos!`
  },

  // Slide 7: Síntese e Próximos Passos
  {
    id: 7,
    type: 'custom',
    title: 'Síntese da Aula & Próximos Passos',
    subtitle: 'Consolidação do pipeline básico e conexão com a estabilidade de treinamento na Aula 05',
    component: <SummaryAndNextStepsVisualizer />,
    notes: `Excelente trabalho a todos! Hoje consolidamos com total segurança os alicerces práticos do PyTorch:
1. Blindamos nossos dados dividindo Treino e Teste antes de qualquer normalização estatística;
2. Dominamos o loop canônico com suas 5 etapas: Forward, Loss, zero_grad(), Backward e step();
3. Entendemos a distinção cirúrgica entre cabeças de classificação (logits + CrossEntropyLoss) e regressão (saída 1D + MSELoss);
4. E garantimos que todo mundo compreenda a alternância entre model.train() e model.eval() com torch.no_grad().

Tudo o que praticamos hoje constitui mais de 60% dos requisitos do nosso Projeto 1 de MLP!

Na nossa próxima aula — Aula 05 —, daremos um passo além na maturidade técnica: investigaremos o que acontece quando aumentamos o número de camadas e nos deparamos com gradientes que explodem ou desaparecem. Veremos inicializações de pesos de Xavier e He, compararemos BatchNorm1d com LayerNorm, e aprenderemos a controlar o overfitting com Dropout e decaimento da taxa de aprendizado.

Pratiquem nos notebooks, façam suas anotações e até a nossa próxima aula!`
  }
];
