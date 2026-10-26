# Plano de Aula - Aula 04: Estabilidade de Treinamento: Inicializações, Normalizações e Regularização

**Tema**: Estabilidade de redes profundas no PyTorch, quebra de simetria de pesos, inicializações científicas (Xavier/Glorot vs He/Kaiming), normalização de ativações (`BatchNorm1d` vs `LayerNorm`), regularização com Inverted Dropout e simulação prática no dataset Iris.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Requisito essencial do **Projeto 1: Pipeline MLP** (comparação de inicialização de pesos, BatchNorm vs LayerNorm e aplicação de Dropout).

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
   - Execução do notebook `aula_04_estabilidade_inicializacao_regularizacao.ipynb`.
   - Comparação empírica das curvas de loss com pesos padrão vs Kaiming, e com/sem BatchNorm.
   - Perguntas, síntese e conexão com a Aula 05 (Otimizadores e TensorBoard).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 17 slides visuais sem sobrecarga textual, com cards conceituais e KaTeX.
- **Simuladores Interativos:**
  1. *WeightInitComparison*: Comparativo interativo entre pesos zerados, aleatórios ingênuos e Xavier/Kaiming.
  2. *NormComparisonInteractive*: Visualização 3D da normalização ao longo do batch vs da camada.
  3. *DropoutAndSchedulerLab*: Simulação da quebra de co-adaptação e controle do gap treino/teste.
  4. *QuizWidget*: Perguntas de fixação conceitual imediata.
- **Planilha Interativa Sem Código:** `simulacao_mlp_iris.xlsx`.
- **Modelos e Checkpoints Salvos:** `model_Sem_Normalizacao.pt`, `model_Com_BatchNorm1d.pt`, `model_Com_LayerNorm.pt`, etc.
- **Jupyter Notebook Prático:** `aula_04_estabilidade_inicializacao_regularizacao.ipynb`.
