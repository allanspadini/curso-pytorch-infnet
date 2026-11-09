# Plano de Aula - Aula 06: Introdução à Visão Computacional e Redes Convolucionais (CNNs)

**Tema**: Fundamentos de visão computacional, representação matricial de imagens digitais, limitações do estiramento (*flattening*) na MLP, a operação matemática da Convolução 2D, kernels como extratores automáticos de características (filtros de Sobel e relevo), padding, stride, pooling (Max vs Average) e construção da primeira CNN no PyTorch (MNIST).  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Prepara diretamente a **Etapa 2 do Projeto 2: Análise de Alternativas Arquiteturais** (comparação analítica entre MLP com Flattening vs Convoluções com preservação espacial).

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Estrutura da Imagem Digital**: Interpretar imagens em escala de cinza como matrizes bidimensionais de números discretos entre 0 (preto) e 255 (branco) e convertê-las em tensores normalizados `(1, H, W)`.
2. **Criticar as Limitações do Flattening**: Demonstrar por que transformar uma matriz 2D em um vetor unidimensional quebra a localidade espacial dos pixels vizinhos e causa explosão desnecessária de parâmetros em camadas `nn.Linear`.
3. **Calcular a Operação de Convolução 2D**: Explicar matematicamente o produto elemento a elemento e a soma deslizante entre um filtro (*kernel*) e a matriz de entrada.
4. **Analisar Kernels como Extratores de Bordas**: Demonstrar como matrizes simples $3 \times 3$ realizam detecção de bordas horizontais, verticais e detalhes de textura sem necessidade de pesos aprendidos manualmente.
5. **Dominar Hiperparâmetros Convolucionais**: Aplicar a fórmula de dimensão espacial $O = \lfloor\frac{W - K + 2P}{S}\rfloor + 1$, compreendendo o papel do preenchimento (*Padding*) na manutenção do tamanho da imagem e do passo (*Stride*) na subamostragem.
6. **Explicar o Papel do Pooling**: Diferenciar *Max Pooling* de *Average Pooling*, identificando como o Max Pooling introduz invariância a pequenas translações e reduz a carga computacional das camadas subsequentes.
7. **Construir e Treinar uma CNN no PyTorch**: Implementar e avaliar uma arquitetura convolucional completa (`nn.Conv2d`, `nn.MaxPool2d`, `nn.Linear`) no dataset MNIST.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-25 min: Base da MLP & A Imagem Digital] ──> [25-45 min: Convolução 2D, Kernels & Padding]
                                                                          │
                                                                          ▼
[70-90 min: Treinamento CNN vs MLP no MNIST] <────── [45-70 min: Max Pooling & Invariância Espacial] <┘
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–25 min) — Da Base da MLP (Forward/Loss/Backward) à Imagem Digital**:
   - Recapitulação da topologia MLP (2 entradas, 1 saída), equações do forward pass, minimização da função objetivo por época (erro dado pela diferença $y - \hat{y}$) e atualização de pesos via backpropagation.
   - A imagem digital como matriz 2D de intensidades discretas [0, 255].
   - Por que o *Flattening* para alimentar redes densas quebra a vizinhança 2D e explode conexões.
   - Demonstrações interativas no `SimpleMlpArchitecture`, `LossMinimizationVisualizer` e `GrayMatrixExploration`.

2. **Bloco 2 (20–45 min) — A Mecânica da Convolução 2D & Filtros**:
   - O conceito de janela deslizante (*sliding window*).
   - Multiplicação elemento a elemento e soma acumulada.
   - Filtros clássicos de visão: detectores de borda Sobel, nitidez e relevo.
   - Hiperparâmetros: Tamanho do Kernel ($K$), Preenchimento (*Padding*: válido vs mesmo) e Passo (*Stride*).
   - Demonstração interativa no `Conv1DSimulator` e `Conv2DMatrixStepSimulator`.

3. **Bloco 3 (45–70 min) — Subamostragem & Invariância com Pooling**:
   - Por que precisamos de pooling: redução de resolução espacial e foco nas características salientes.
   - *Max Pooling* ($2 \times 2$, stride 2): selecionando a ativação mais forte.
   - Invariância translacional: por que a rede reconhece um traço mesmo se o dígito for desenhado alguns pixels ao lado.
   - Demonstração interativa no `PoolingSimulator`.

4. **Bloco 4 (70–90 min) — Laboratório Prático: MLP vs CNN no MNIST**:
   - Execução guiada do notebook `aula_06_introducao_visao_computacional_convolucoes.ipynb`.
   - Comparação direta de acurácia, número de parâmetros e tempo de treino entre `MNISTMLP` e `MNISTCNN`.
   - Perguntas, síntese e conexão com a Aula 07 (Otimização Avançada, Diagnóstico e TensorBoard) e Aula 08 (Imagens RGB e PlantVillage).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 19 slides visuais com simuladores de matrizes de pixels, topologia MLP (2 entradas, 1 saída), minimização da perda e operações de convolução passo a passo.
- **Simuladores Interativos:**
  1. *GrayMatrixExploration*: Inspeção de pixels 0-255 e demonstração visual da matriz de imagem.
  2. *SimpleMlpArchitecture*: Topologia de um Perceptron Multicamadas com 2 entradas e 1 saída com simulação de forward pass.
  3. *LossMinimizationVisualizer*: Curva convexa de minimização da perda demonstrando a redução do erro residual por época.
  4. *BackpropagationExplodedView*: Ajuste do peso via erro residual e cálculo formal da derivada no canto separado.
  5. *Conv1DSimulator*: Intuição unidimensional de filtragem de sinais locais.
  6. *Conv2DMatrixStepSimulator*: Passo a passo da janela deslizante do kernel calculando o mapa de ativação.
  7. *PoolingSimulator*: Comparação visual de Max Pooling vs Average Pooling.
  8. *CNNQuizWidget*: Quiz de fixação de cálculos de dimensão e conceitos de visão.
- **Ativos Visuais:** `gato_matriz_cinza.png`, `conv2dgato.png`, `conv2dbeagle.png`.
- **Jupyter Notebook Prático:** `aula_06_introducao_visao_computacional_convolucoes.ipynb`.
