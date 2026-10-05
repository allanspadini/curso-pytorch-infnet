# Plano de Aula — Aula 11: Arquiteturas com Portões (LSTM & GRU), Engenharia Cíclica e Estudo de Caso Prático

## 1. Identificação
- **Curso:** Graduação em Inteligência Artificial e Ciência de Dados
- **Disciplina:** Redes Neurais Profundas (Deep Learning)
- **Instituição:** Instituto Infnet
- **Aula:** 11 de 11 (Módulo de Modelagem Sequencial e Séries Temporais)
- **Carga Horária:** 1h30 (90 minutos)
- **Dataset de Referência:** *Hourly Energy Consumption & Weather* (Kaggle) / *Jena Climate*

---

## 2. Objetivos de Aprendizagem
Ao final desta aula, o estudante de graduação será capaz de:
1. Compreender a motivação das redes com portões (*gated recurrent units*) como solução definitiva para a preservação de memórias de longo prazo e mitigação do *Vanishing Gradient*.
2. Explicar a arquitetura da célula **LSTM (Long Short-Term Memory)**, identificando a *Cell State* ($C_t$) como uma "rodovia expressa aditiva" e o *Hidden State* ($h_t$) como memória de trabalho imediata.
3. Descrever matematicamente e conceitualmente a atuação dos 3 portões da LSTM: *Forget Gate* ($f_t$), *Input Gate* ($i_t$ e candidato $\tilde{C}_t$) e *Output Gate* ($o_t$).
4. Entender a importância da inicialização positiva do bias do Forget Gate ($b_f \approx +1.0$) para evitar o esquecimento prematuro no início do treino.
5. Analisar a arquitetura da célula **GRU (Gated Recurrent Unit)**, compreendendo a fusão de estados e o funcionamento dos 2 portões (*Reset Gate* $r_t$ e *Update Gate* $z_t$), quantificando a redução de ~25% de parâmetros.
6. Aplicar **Engenharia de Variáveis Cíclicas** com projeções trigonométricas $(\sin, \cos)$ no círculo unitário para horas do dia (0–23) e meses (1–12), eliminando descontinuidades numéricas artificiais.
7. Implementar **Gradient Clipping** (`torch.nn.utils.clip_grad_norm_`) e agendamento de taxa de aprendizado com `ReduceLROnPlateau` para assegurar convergência estável.
8. Reconhecer os riscos do uso inadvertido de camadas bidirecionais (*Bidirectional RNNs*) em séries temporais causais, prevenindo o vazamento de informações futuras (*data leakage*).
9. Calcular e interpretar métricas robustas de avaliação em séries temporais: **MAE**, **RMSE** e especialmente **WAPE** (imunidade a divisões por zero).
10. Treinar e comparar modelos com `nn.LSTM` e `nn.GRU` em PyTorch no estudo de caso multivariado de clima e energia (conclusão do Estudo de Caso 3 e base para o Projeto 2).

---

## 3. Conteúdo Programático
1. **A Célula LSTM e a Rodovia Aditiva de Informação:**
   - O gargalo da Vanilla RNN e a necessidade de fluxo linear de gradiente.
   - A *Cell State* ($C_t$): atualização aditiva $C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t$.
   - A álgebra dos portões com funções Sigmoid $[0, 1]$ e Tanh $[-1, 1]$.
   - Por que o gradiente não desaparece: $\frac{\partial C_t}{\partial C_{t-1}} \approx f_t$.
2. **A Célula GRU: Eficiência Paramétrica:**
   - Simplificação da arquitetura: sem Cell State separada, apenas $h_t$.
   - Portão de Reset ($r_t$) e Portão de Atualização ($z_t$).
   - Trade-offs: poder expressivo da LSTM vs agilidade e economia da GRU (~25% menos pesos).
3. **Engenharia de Features Temporais & Variáveis Cíclicas:**
   - A falha de variáveis temporais lineares ($23\text{h} \to 0\text{h}$ como salto numérico de 23 unidades).
   - O círculo unitário e projeções trigonométricas: $\sin\left(\frac{2\pi \cdot t}{T}\right)$ e $\cos\left(\frac{2\pi \cdot t}{T}\right)$.
   - Construção de matrizes multivariadas ricas com lags e variáveis ambientais.
4. **Treinamento Robusto no PyTorch:**
   - Diagnóstico e contenção de gradientes com `clip_grad_norm_`.
   - Ajuste dinâmico de taxa com `torch.optim.lr_scheduler.ReduceLROnPlateau`.
   - Causalidade temporal: por que não usar Bi-LSTM em inferência em tempo real.
5. **Métricas de Negócio e Estudo de Caso Completo:**
   - Métricas: MAE, RMSE e WAPE (Weighted Absolute Percentage Error).
   - Treinamento comparativo de LSTM vs GRU no dataset de previsão energética horária e clima.
   - Alinhamento com os critérios de avaliação do Estudo de Caso 3 e Projeto 2.

---

## 4. Distribuição do Tempo (Aula de 90 Minutos)

| Bloco | Duração | Tema | Atividades |
| :--- | :---: | :--- | :--- |
| **Abertura & Motivação** | 10 min | O salto da Vanilla RNN para Células com Portões | Recapitulação rápida do Vanishing Gradient da Aula 10 e apresentação da analogia da esteira de bagagens / rodovia expressa. |
| **Teoria & Simulação 1** | 25 min | Anatomia Completa da LSTM | Funcionamento dos 3 portões, equações matemáticas e exploração interativa no `LSTMGateExplorer` (testando presets de spike, reset e estabilidade). |
| **Teoria & Simulação 2** | 20 min | Célula GRU & Comparação Paramétrica | Estrutura dos 2 portões, equações da GRU e simulação no `LSTMvsGRUComparator` calculando parâmetros e memória GPU. |
| **Engenharia & Estabilidade** | 15 min | Features Cíclicas e Gradient Clipping | Transformação trigonométrica $(\sin, \cos)$ no círculo unitário, perigos da Bi-LSTM e controle de gradiente com `clip_grad_norm_`. |
| **Hands-on & Métricas** | 20 min | Estudo de Caso Prático PyTorch & Quiz | Demonstração do notebook de demanda de energia/clima, métricas WAPE/RMSE e consolidação conceitual via `SequentialQuizWidget`. |

---

## 5. Recursos Didáticos & Ferramentas
- **Apresentação Interativa em React + KaTeX (`aula_11_lstms_grus_features_ciclicas/apresentacao/`):**
  - Slides 16:9 de baixa densidade textual com badges, cards comparativos e fórmulas KaTeX.
  - Simulador 1: `LSTMGateExplorer` (manipulação de $x_t, h_{t-1}, c_{t-1}, b_f$ e visualização dos 3 portões).
  - Simulador 2: `LSTMvsGRUComparator` (dimensionamento dinâmico de tensores, contagem de parâmetros e memória).
  - Simulador 3: `DemandForecastingSimulator` (análise de lookback, sazonalidade e métricas MAE, RMSE e WAPE).
  - Diagramas Arquiteturais: `SequentialDiagrams` (LSTM Cell, GRU Cell, Sliding Window).
  - Quiz de Consolidação: `SequentialQuizWidget` (3 desafios conceituais comentados).
- **Roteiro de Narração Slide a Slide:** `falas_apresentador.md`.
- **Notebooks PyTorch:**
  - `aula_11_lstms_grus_features_ciclicas.ipynb` (Estudo de caso completo multivariado de clima e energia).
  - `aula_11_bonus_completador_frases_piratas_lstm.ipynb` (NLP básico com LSTM a nível de caractere).
