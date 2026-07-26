# Roteiro de Falas do Apresentador — Aula 01: Fundamentos de Deep Learning & Neurônio Artificial

**Curso:** Redes Neurais Profundas (Deep Learning e Visão Computacional)  
**Instituição:** Faculdade Infnet  
**Data:** 27 de Julho de 2026  

---

## Slide 1: Capa — Fundamentos de Deep Learning & Neurônio Artificial
**Falas do Apresentador:**
> "Olá a todos! Sejam muito bem-vindos à nossa primeira aula sobre Redes Neurais Profundas com PyTorch na Faculdade Infnet.
> 
> Hoje daremos o primeiro passo fundamental para compreender a base de toda a revolução moderna da Inteligência Artificial. Entenderemos a unidade atômica da aprendizagem profunda: o Perceptron. Veremos suas equações, como ele toma decisões lineares, a necessidade matemática das funções de ativação e aplicaremos esses conceitos em um estudo de caso prático de nutrição esportiva envolvendo consumo de creatina e rendimento de atletas."

---

## Slide 2: Apresentação do Professor
**Falas do Apresentador:**
> "Olá a todos! Deixem-me me apresentar rapidamente antes de começarmos o conteúdo técnico.
> 
> Meu nome é **Allan Spadini**. Sou Doutor em Geofísica, tenho pós-graduação em Ciência de Dados e atuo profissionalmente como Pesquisador em Inteligência Artificial, focado no desenvolvimento e pesquisa de agentes inteligentes.
> 
> É um imenso prazer estar com vocês nesta jornada sobre PyTorch na Faculdade Infnet!"

---
## Slide 3: Roteiro & Objetivos da Aula
**Falas do Apresentador:**
> "Nossa aula de hoje está dividida em 4 blocos principais:
> 
> 1. **Perceptron & Decisão Linear:** Vamos dissecar a estrutura do neurônio artificial — entradas, pesos, viés e a geometria da reta no espaço cartesiano.
> 2. **Funções de Ativação:** Entenderemos como transformar o potencial linear z em probabilidades e por que a ReLU desbancou a Sigmoid nas camadas ocultas.
> 3. **Limitações & MLPs:** Analisaremos o célebre problema do XOR e por que precisamos encadear neurônios em camadas ocultas para curvar o espaço de decisão.
> 4. **Planilha & Transição PyTorch:** Faremos um ajuste manual de pesos na planilha `simulacao_perceptron.xlsx` e concluiremos com os 3 pilares do PyTorch."

---

## Slide 4: O Universo da Inteligência Artificial (Diagrama de Inclusão)
**Falas do Apresentador:**
> "Observem o diagrama interativo na tela. É muito comum haver confusão entre estes três termos:
> 
> - **Inteligência Artificial (IA):** É o campo abrangente de fora, criado na década de 1950, focado em qualquer sistema que simule aspectos do raciocínio humano (como sistemas baseados em regras e lógica).
> - **Machine Learning (ML):** É o subconjunto azul. Em vez de programar regras estritas na mão, alimentamos os algoritmos com dados para que eles aprendam os padrões estatísticos por conta própria.
> - **Deep Learning (DL):** É o núcleo verde. É um subcampo do ML baseado em redes neurais profundas que aprendem automaticamente representações hierárquicas de dados brutos e complexos, como imagens e linguagem natural."

---

## Slide 5: Machine Learning Clássico vs. Deep Learning
**Falas do Apresentador:**
> "Vejam a comparação entre a abordagem tradicional de Machine Learning e o Deep Learning:
> 
> No ML clássico (como Regressão Logística ou Random Forest), o gargalo é o *Feature Engineering*. Um especialista humano precisa gastar semanas criando colunas e estatísticas manuais a partir dos dados.
> 
> No Deep Learning, a grande revolução é a aprendizagem *End-to-End* (fim a fim). Inserimos o dado bruto (como os pixels de uma imagem) e a própria rede neural profunda se encarrega de extrair as características mais relevantes camada por camada."

---

## Slide 6: A Origem: O Perceptron de Rosenblatt (1957)
**Falas do Apresentador:**
> "Em 1957, Frank Rosenblatt criou o Perceptron, inspirado na neurobiologia:
> 
> - Os **Dendritos** correspondem aos nossos sinais de entrada $x_1, x_2$.
> - As **Sinapses** correspondem aos pesos $w_1, w_2$, que regulam a intensidade do sinal.
> - O **Corpo Celular** realiza o somatório ponderado mais o viés $b$.
> - O **Axônio** aplica a função de ativação para transmitir o disparo elétrico final."

---

## Slide 7: Fluxo de Processamento de um Neurônio
**Falas do Apresentador:**
> "Internamente, todo neurônio artificial executa exatamente duas etapas:
> 
> 1. **Combinação Linear (z):** Multiplica cada entrada pelo seu peso correspondente, soma os resultados e adiciona o viés: $z = w_1 x_1 + w_2 x_2 + b$.
> 2. **Ativação ($\hat{y}$):** Passa o valor $z$ por uma função $f(z)$ para determinar a resposta ou probabilidade predita final."

---

## Slide 8: Caso Prático: O Problema da Creatina
**Falas do Apresentador:**
> "Para tornar isso concreto, imaginem um problema de classificação esportiva em uma academia:
> 
> Queremos prever se um atleta atingirá **Alta Performance (1)** ou **Performance Regular (0)**.
> 
> Nossas entradas são:
> - $x_1$: Consumo diário de Creatina (em gramas).
> - $x_2$: Horas de Treino semanais.
> 
> Nosso objetivo é encontrar os pesos $w_1, w_2$ e o viés $b$ ideais para separar esses dois grupos."

---

## Slide 9: A Equação da Decisão Linear
**Falas do Apresentador:**
> "A equação $z = w_1 x_1 + w_2 x_2 + b$ define a fronteira de decisão geométrica no plano 2D.
> 
> - **$z$:** Potencial linear. Se $z > 0$, favorece a classe 1. Se $z < 0$, favorece a classe 0.
> - **$w_1, w_2$:** Ajustam a inclinação da reta no gráfico.
> - **$b$ (Viés):** Desloca a reta paralelamente. Sem o viés $b$, seríamos forçados a passar a reta pela origem $(0,0)$, o que nos impediria de separar dados cuja fronteira esteja deslocada do centro."

---

## Slide 10: Simulador Interativo do Perceptron
**Falas do Apresentador:**
> "Usem os controles no slide para alterar os valores de $w_1$, $w_2$ e $b$. Observem em tempo real como a linha tracejada azul se movimenta no gráfico dos atletas.
> 
> Experimentem ajustar o peso da creatina para $1.2$, o peso do treino para $0.9$ e o viés para $-11.5$. Reparem como a acurácia atinge 100% ao separar perfeitamente os atletas verdes dos vermelhos!"

---

## Slide 11: Necessidade de Probabilidades: A Função Sigmoid
**Falas do Apresentador:**
> "O valor linear $z$ pode variar de $-\infty$ a $+\infty$. No entanto, para tomar decisões em negócios ou diagnósticos, precisamos de uma probabilidade entre $0$ e $1$ ($0\%$ a $100\%$).
> 
> Aplicamos a função **Sigmoid**: $\hat{y} = \sigma(z) = \frac{1}{1 + e^{-z}}$.
> 
> **Regra de Decisão:** Se $\hat{y} \ge 0.5$ (50%), a classe predita é 1 (Alta Performance). Se $\hat{y} < 0.5$, a classe é 0."

---

## Slide 12: Plotter Interativo da Sigmoid
**Falas do Apresentador:**
> "Arrastem o slider do potencial $z$ neste plotter interativo.
> 
> Note que quando $z = 0$, a Sigmoid resulta exatamente em $0.5$. Para valores altamente positivos (ex: $z = 5$), a probabilidade aproxima-se de $1.0$. Para valores muito negativos (ex: $z = -5$), aproxima-se de $0.0$."

---

## Slide 13: Por Que Precisamos de Não-Linearidades?
**Falas do Apresentador:**
> "Se não usássemos funções de ativação não-lineares nas redes neurais, o que aconteceria?
> 
> Multiplicar uma matriz de pesos por outra matriz de pesos resulta em apenas mais uma transformação linear! Como demonstra a equação $y = W_2(W_1 x + b_1) + b_2 = W_{eq} x + b_{eq}$, uma rede de 100 camadas sem não-linearidades seria matematicamente idêntica a 1 único neurônio linear!"

---

## Slide 14: Visão Geral das Funções de Ativação
**Falas do Apresentador:**
> "Analisem o gráfico comparativo das quatro funções principais:
> 
> - **Sigmoid:** [0, 1], ideal para a saída em classificação binária.
> - **Tanh:** [-1, 1], centrada em zero, facilitando a convergência em camadas internas de redes recorrentes.
> - **ReLU:** $f(z) = \max(0, z)$, a campeã incontestável das camadas ocultas.
> - **Leaky ReLU:** Evita neurônios mortos permitindo uma pequena inclinação em valores negativos."

---

## Slide 15: A Função ReLU (Rectified Linear Unit)
**Falas do Apresentador:**
> "A ReLU é definida por $f(z) = \max(0, z)$.
> 
> Se $z$ for menor ou igual a zero, a saída é 0. Se $z$ for positivo, a saída é o próprio $z$.
> 
> Olhem para a linha tracejada vermelha no gráfico: para qualquer valor positivo $z > 0$, a derivada da ReLU é constante e igual a $1.0$! Isso é crucial para a aprendizagem em redes profundas."

---

## Slide 16: As 3 Vantagens Cruciais da ReLU
**Falas do Apresentador:**
> "Por que a ReLU desbancou a Sigmoid nas camadas ocultas?
> 
> 1. **Simplicidade Computacional:** Exige apenas checar `if (z > 0)`, economizando bilhões de operações exponenciais pesadas em GPUs.
> 2. **Gradiente Constante (1.0):** Como a derivada é $1.0$ para $z > 0$, o sinal do erro flui sem atenuação durante o backpropagation, eliminando o problema do desvanecimento do gradiente (*Vanishing Gradient*).
> 3. **Esparsidade:** Zera neurônios inativos, gerando representações mais limpas e eficientes."

---

## Slide 17: Neurônio Morto & A Variante Leaky ReLU
**Falas do Apresentador:**
> "Contudo, a ReLU possui uma vulnerabilidade chamada 'Neurônio Morto' (*Dying ReLU*). Se durante o treino a entrada de um neurônio for sempre negativa, sua saída e seu gradiente serão sempre zero, impedindo a atualização dos pesos.
> 
> A **Leaky ReLU** resolve isso ao introduzir um pequeno vazamento ($\alpha = 0.1$) para $z < 0$, garantindo que mesmo neurônios inativos recebam um pequeno fluxo de gradiente e possam voltar a aprender."

---

## Slide 18: Laboratório Interativo de Ativações
**Falas do Apresentador:**
> "Aproveitem este laboratório interativo para testar os valores de entrada e observar simultaneamente o comportamento das curvas e das derivadas de cada uma das quatro funções de ativação."

---

## Slide 19: O Limite do Neurônio Único: O Problema do XOR
**Falas do Apresentador:**
> "Em 1969, Minsky e Papert publicaram um livro demonstrando que um único Perceptron é incapaz de resolver o problema lógico XOR.
> 
> Como vemos no gráfico, as duas classes estão organizadas em quadrantes cruzados. Nenhuma reta no plano 2D consegue separar os pontos verdes dos vermelhos sem cometer pelo menos 50% de erros. Para resolver problemas não-lineares, precisamos de Redes Neurais Multicamadas (MLP)."

---

## Slide 20: Curvando o Espaço: A Solução Não-Linear
**Falas do Apresentador:**
> "Alternem entre o modo 'Perceptron Único' e 'MLP Não-Linear' na tela.
> 
> Ao combinarmos múltiplos neurônios com funções de ativação não-lineares na camada oculta, a rede ganha a capacidade de 'curvar' e distorcer o espaço cartesiano, criando fronteiras de decisão flexíveis e separando perfeitamente o XOR!"

---

## Slide 21: Redes Multi-Camadas (MLP)
**Falas do Apresentador:**
> "Esta é a arquitetura da MLP (Multi-Layer Perceptron):
> 
> 1. **Camada de Entrada:** Recebe os recursos brutos ($x_1, x_2, x_3$).
> 2. **Camada Oculta:** Neurônios intermediários ($h_1, h_2$) que extraem representações não-lineares independentes.
> 3. **Camada de Saída:** O neurônio final ($\hat{y}$) combina essas representações para gerar a predição."

---

## Slide 22: Matemática da MLP: Camadas Ocultas e Saída
**Falas do Apresentador:**
> "Matematicamente, cada neurônio da camada oculta é um Perceptron completo:
> $h_1 = \sigma(w_{11}x_1 + w_{21}x_2 + b_{h1})$  
> $h_2 = \sigma(w_{12}x_1 + w_{22}x_2 + b_{h2})$
> 
> E a camada de saída trata os valores $h_1$ e $h_2$ como suas novas entradas:  
> $\hat{y} = \sigma(v_1 h_1 + v_2 h_2 + b_o)$."

---

## Slide 23: Dinâmica com Planilha Excel
**Falas do Apresentador:**
> "Abram o arquivo `simulacao_perceptron.xlsx` que está na pasta da nossa aula 1.
> 
> Vocês verão os dados de 20 atletas. Alterem manualmente as células de $W_1$, $W_2$ e $Bias$ para ver a linha divisória se movimentar e a perda (*Loss*) despencar à medida que acertamos os palpites."

---

## Slide 24: Transição para o PyTorch
**Falas do Apresentador:**
> "No PyTorch, não precisamos ajustar pesos manualmente nem calcular derivadas na mão. O framework nos fornece 3 pilares:
> 
> 1. **Tensores (`torch.Tensor`):** Estrutura de dados otimizada para execução em GPUs.
> 2. **Autograd (`loss.backward()`):** Diferenciação automática que calcula todas as derivadas parciais instantaneamente.
> 3. **Otimizadores (`torch.optim`):** Algoritmos como SGD e Adam que ajustam os pesos automaticamente."

---

## Slide 25: Quiz Interativo & Próximos Passos
**Falas do Apresentador:**
> "Para finalizar nossa parte teórica com chave de ouro, convido todos a responderem as 3 perguntas do Quiz de fixação na tela.
> 
> Em seguida, abriremos nosso Jupyter Notebook `aula_01_introducao_deep_learning.ipynb` para colocar a mão no código em PyTorch! Muito obrigado e bom aprendizado!"
