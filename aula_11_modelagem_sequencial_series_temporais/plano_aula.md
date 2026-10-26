# Plano de Aula - Aula 10: Modelagem de Dados Sequenciais, Séries Temporais e Redes Recorrentes (RNNs)

**Tema**: A quebra da hipótese I.I.D. em dados temporais, autocorrelação, limitações de MLPs em sequências, o algoritmo de Janelamento Deslizante (*Sliding Window*), tensores 3D `(batch, seq_len, features)`, arquitetura da Vanilla RNN, conceito de estado oculto ($h_t$), desenrolamento no tempo (*Unrolling*), Backpropagation Through Time (BPTT) e o dilema matemático do desaparecimento/explosão do gradiente.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Estabelece os fundamentos teóricos e matemáticos para a **Opção LSTM/GRU do Projeto 2** e para a análise do **Estudo de Caso 3**.

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Falência da Hipótese I.I.D.**: Identificar por que séries temporais violam a suposição de independência estatística (autocorrelação, tendências e sazonalidades) e como prevenir vazamento temporal em partições cronológicas.
2. **Criticar os Gargalos da MLP para Sequências**: Demonstrar a rigidez de janelas fixas, a falta de invariância temporal e a explosão de pesos ao achatar passos temporais.
3. **Dominar o Algoritmo de Janelamento Deslizante (*Sliding Window*)**: Converter séries temporais brutas em pares supervisionados $(X, y)$ preservando estritamente a ordem cronológica.
4. **Manipular Tensores 3D no PyTorch**: Dominar a convenção `batch_first=True` `(batch_size, seq_len, input_size)`, interpretando as dimensões de entrada e retornos de camadas recorrentes.
5. **Compreender a Mecânica da Vanilla RNN**: Explicar a recorrência temporal através da equação do estado oculto $h_t = \tanh(W_{ih} x_t + W_{hh} h_{t-1} + b)$ e o compartilhamento de pesos ao longo de todos os passos temporais.
6. **Analisar o Algoritmo BPTT e a Instabilidade de Gradientes**: Demonstrar como a regra da cadeia desenrolada no tempo envolve multiplicações em cadeia de matrizes $\prod W_{hh}^T$, causando inevitavelmente o desaparecimento (*Vanishing*) ou a explosão (*Exploding*) do gradiente em sequências longas.
7. **Treinar e Avaliar Modelos no Dataset AirPassengers**: Construir o pipeline em PyTorch e avaliar o desempenho através de métricas de negócio ($MAE$, $RMSE$ e $WAPE$).

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: A Falha do I.I.D. & Janelamento Deslizante] ──> [20-45 min: Tensores 3D & Anatomia da Vanilla RNN]
                                                                                │
                                                                                ▼
[75-90 min: AirPassengers & Conexão Projeto 2] <────── [45-75 min: Desenrolamento (Unrolling), BPTT & Gradientes]
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — O Desafio Sequencial & Janelamento Deslizante**:
   - Por que o tempo não pode ser embaralhado: o perigo do `shuffle=True` em séries temporais.
   - Autocorrelação e dependência temporal.
   - O algoritmo de janelas deslizantes (*Lookback*): criando tensores supervisionados a partir de séries brutas.
   - Demonstração no `DemandForecastingSimulator`.

2. **Bloco 2 (20–45 min) — Tensores 3D & A Rede Recorrente Básica (Vanilla RNN)**:
   - A tridimensionalidade do tempo: Lote $\times$ Passos Temporais $\times$ Features.
   - O conceito biológico e matemático de memória de trabalho: o Estado Oculto ($h_t$).
   - A equação central de recorrência com ativação $\tanh$.
   - Compartilhamento de pesos no tempo: por que $W_{hh}$ é o mesmo para $t=1$ até $t=T$.
   - Demonstração no `RNNStepByStepSimulator`.

3. **Bloco 3 (45–75 min) — Desenrolamento no Tempo & As Falhas do BPTT**:
   - O grafo computacional desenrolado: visualizando a RNN como uma rede muito profunda na horizontal.
   - Backpropagation Through Time: derivando a perda acumulada no tempo.
   - A causa raiz do desaparecimento do gradiente: por que potências sucessivas $W_{hh}^k$ colapsam gradientes de dependências distantes.
   - Demonstração no `RNNUnrolledStepDiagram` e `RNNVanishingGradientSimulator`.

4. **Bloco 4 (75–90 min) — Laboratório Prático & Conexão com o Projeto 2**:
   - Execução do notebook `aula_10_modelagem_sequencial_series_temporais.ipynb`.
   - Comparação empírica da Regressão Linear vs Vanilla RNN no AirPassengers.
   - Perguntas, síntese pedagógica e ponte para a Aula 11 (LSTMs, GRUs e Estudo de Caso 3).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 18 slides visuais com grafos desenrolados no tempo e simuladores de recorrência.
- **Simuladores Interativos:**
  1. *RNNStepByStepSimulator*: Execução passo a passo da equação de estado oculto com sliders de entrada.
  2. *RNNUnrolledStepDiagram*: Visualização do grafo no tempo desenrolado com fluxo direto e reverso.
  3. *RNNVanishingGradientSimulator*: Demonstração interativa do decaimento exponencial do gradiente no BPTT.
  4. *DemandForecastingSimulator*: Janelamento deslizante e previsão de demanda temporal.
  5. *SequentialQuizWidget*: Quiz de fixação de tensores 3D e conceitos de BPTT.
- **Dataset de Referência:** `AirPassengers` (histórico de passageiros aéreos).
- **Jupyter Notebook Prático:** `aula_10_modelagem_sequencial_series_temporais.ipynb`.
