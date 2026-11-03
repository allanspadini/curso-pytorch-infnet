# Plano de Aula - Aula 05: Estabilidade de Treinamento: Inicializações, Normalizações e Regularização

**Tema**: Estabilidade de redes profundas no PyTorch, quebra de simetria de pesos, inicializações científicas (Xavier/Glorot vs He/Kaiming), normalização de ativações (`BatchNorm1d` vs `LayerNorm`), regularização com Inverted Dropout e simulação prática no dataset Iris.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Critério de Avaliação**: Avaliação formativa contínua baseada em frequência e participação ativa nas aulas síncronas e atividades práticas de laboratório (disciplina de graduação sem entrega de projeto somativo).

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Falha da Simetria Inicial**: Explicar por que inicializar pesos com zeros ou valores constantes faz com que todos os neurônios calculem o mesmo gradiente, colapsando a capacidade representacional da rede.
2. **Aplicar Inicializações Calibradas (Xavier e He)**: Escolher a estratégia correta de inicialização baseando-se na função de ativação (`xavier_uniform_` para Tanh/Sigmoid e `kaiming_normal_` para ReLU) para manter a variância constante ao longo das camadas.
3. **Dominar a Normalização em Mini-Batch (`nn.BatchNorm1d`)**: Explicar como a normalização ao longo do batch ($N$) combate o *Internal Covariate Shift*, acelera o aprendizado e como operar corretamente entre `model.train()` e `model.eval()`.
4. **Dominar a Normalização de Camada (`nn.LayerNorm`)**: Diferenciar a normalização intra-amostra (ao longo das features $C$) da normalização de batch, compreendendo sua robustez para amostras isoladas e lotes pequenos.
5. **Implementar Regularização com Inverted Dropout**: Compreender como zerar neurônios aleatoriamente no treino com fator de escala $1/(1-p)$ elimina a co-adaptação e fecha o gap entre loss de treino e teste.
6. **Explorar a Dinâmica na Planilha (Iris)**: Manipular pesos, ativações e fronteiras de decisão na planilha interativa `simulacao_mlp_iris.xlsx`.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Simetria & Inicialização Xavier/He] ──> [20-45 min: Normalizações: BatchNorm vs LayerNorm]
                                                                     │
                                                                     ▼
[70-90 min: Mão na Massa PyTorch & Iris] <──── [45-70 min: Inverted Dropout & Prática na Planilha] <──┘
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — O Desafio da Estabilidade & Inicialização de Pesos**:
   - Por que redes profundas explodem ou desvanecem sinais.
   - O perigo da simetria: por que pesos zerados nunca aprendem características distintas.
   - A matemática da variância: Xavier/Glorot ($Var(W) = 2/(n_{in} + n_{out})$) vs He/Kaiming ($Var(W) = 2/n_{in}$).
   - Demonstração no `WeightInitComparison`.

2. **Bloco 2 (20–45 min) — Normalização de Camadas (`BatchNorm1d` vs `LayerNorm`)**:
   - O fenômeno do *Internal Covariate Shift*.
   - `BatchNorm1d`: normalizando através do mini-batch; médias e variâncias móveis (*running stats*); por que o modo `eval()` é obrigatório em inferência.
   - `LayerNorm`: normalizando dentro de cada amostra individual.
   - Demonstração interativa no `NormComparisonInteractive`.

3. **Bloco 3 (45–70 min) — Regularização & Dinâmica na Planilha**:
   - Overfitting e co-adaptação entre neurônios.
   - O funcionamento do Inverted Dropout (`p = 0.2` a `0.5`): mascaramento booleano e reescalonamento dinâmico.
   - Demonstração no `DropoutAndSchedulerLab`.
   - Exploração prática da planilha `simulacao_mlp_iris.xlsx`.

4. **Bloco 4 (70–90 min) — Laboratório Prático no PyTorch**:
   - Execução do notebook `aula_05_estabilidade_inicializacao_regularizacao.ipynb`.
   - Classificação no dataset real do Kaggle (*Pima Indians Diabetes*).
   - Divisão em Treino (70%), Validação (15%) e Teste Cego (15%).
   - Comparação empírica das curvas de loss e acurácia: Modelo Base vs Modelo Robusto (com `BatchNorm1d`, `Dropout` e inicialização Kaiming He).
   - Avaliação na partição de Teste Cego com matriz de confusão e simulação de inferência clínica.
   - Perguntas, síntese e conexão com a Aula 06.

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 13 slides visuais sem sobrecarga textual, com simuladores interativos e KaTeX.
- **Simuladores Interativos nos Slides:**
  1. *SymmetryCollapseVisualizer* & *SymmetryBreakingVisualizer*: Visualização da quebra de simetria e colapso de gradientes.
  2. *WeightInitComparison*: Comparativo interativo entre pesos zerados, aleatórios ingênuos e Xavier/Kaiming.
  3. *CovariateShiftVisualizer*: Demonstração dinâmica da deriva de distribuição entre camadas.
  4. *TensorNormGeometryVisualizer*: Visualização 3D da geometria dos tensores para BatchNorm vs LayerNorm.
  5. *TrainEvalModeVisualizer*: Painel de comportamento em tempo de execução dos modos `train()` e `eval()`.
  6. *CoadaptationVisualizer*: Rede profunda de 4 camadas demonstrando o Dropout e a quebra de co-adaptação.
  7. *DropoutAndSchedulerLab*: Simulação da regularização e controle do gap treino/teste.
  8. *QuizWidget*: Perguntas de fixação conceitual imediata.
- **Planilha Interativa Sem Código:** `simulacao_mlp_iris.xlsx`.
- **Modelos e Checkpoints Salvos:** `melhor_modelo_robusto.pt`.
- **Jupyter Notebook Prático:** `aula_05_estabilidade_inicializacao_regularizacao.ipynb`.
