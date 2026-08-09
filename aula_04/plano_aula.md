# Plano de Aula - Aula 04: Normalização, Inicialização, Regularização e Estabilidade no PyTorch

**Tema**: Prevenção de Data Leakage, dinamismo de DataLoaders, normalização de camadas (BatchNorm1d vs LayerNorm), estratégias de inicialização de pesos (Xavier Uniform vs Kaiming Normal), diagnóstico e controle de Exploding/Vanishing Gradients, Inverted Dropout e Learning Rate Schedulers.  
**Carga Horária Equivalente**: 8 horas  
**Modalidade**: EAD Pós-Graduação (Faculdade Infnet)  

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Prevenir Data Leakage no Pré-Processamento**: Identificar a contaminação de dados ao aplicar normalizadores antes de `train_test_split` e implementar pipelines estritamente isolados (`.fit_transform()` no treino e `.transform()` no teste).
2. **Configurar DataLoaders de Forma Adequada**: Compreender o impacto do `shuffle=True` na variância dos mini-batches e no combate ao viés sequencial de classe durante o SGD.
3. **Dominar Normalização de Camadas (BatchNorm1d vs LayerNorm)**: Distinguir a normalização ao longo da dimensão $N$ (batch) da normalização ao longo das $C$ features de uma amostra, operando corretamente entre os modos `model.train()` e `model.eval()`.
4. **Calibrar Inicializações de Pesos**: Explicar por que pesos zerados geram simetria indesejada e aplicar `nn.init.xavier_uniform_` (para Tanh/Sigmoid) e `nn.init.kaiming_normal_` (para ReLU/LeakyReLU) para preservar a variância dos sinais.
5. **Diagnosticar e Mitigar Exploding/Vanishing Gradients**: Identificar visualmente e matematicamente o colapso dos gradientes na Regra da Cadeia e aplicar Gradient Clipping (`torch.nn.utils.clip_grad_norm_`) e funções não-saturantes.
6. **Aplicar Regularização e LR Decay**: Implementar Inverted Dropout (`nn.Dropout`) para eliminar a co-adaptação de neurônios e configurar schedulers (`ReduceLROnPlateau`, `StepLR`) para garantir convergência fina no mínimo global.

---

## 🧭 Divisão da Carga Horária Equivalente (8 Horas)

```
[Módulo 1: Integridade & Data Leakage] ──> [Módulo 2: DataLoaders & Shuffle] ──> [Módulo 3: BatchNorm1d vs LayerNorm]
       (1.5 horas)                                   (1.5 horas)                                  (1.5 horas)
                                                                                                         │
                                                                                                         ▼
[Módulo 6: Consolidacao & Quiz] <── [Módulo 5: Dropout & LR Schedulers] <── [Módulo 4: Init Pesos & Gradientes]
       (1.0 hora)                                    (1.5 horas)                                  (1.0 hora)
```

### Detalhamento dos Módulos:
- **Módulo 1 (1.5h)**: Conceito e diagnóstico de Data Leakage no pré-processamento tabular. Pipeline correto de isolamento com `StandardScaler` e `train_test_split`.
- **Módulo 2 (1.5h)**: Amostragem e mini-batching em PyTorch `DataLoader`. Dinâmica do Stochastic Gradient Descent com `shuffle=True` (treino) vs `shuffle=False` (teste).
- **Módulo 3 (1.5h)**: Eixos matemáticos de normalização em tensores ($N \times C$). Comparativo prático de **BatchNorm1d** (com comportamento em `train` vs `eval` e limitação de batch unitário) vs **LayerNorm**.
- **Módulo 4 (1.0h)**: Análise matemática da Regra da Cadeia em redes profundas. Patologias de **Vanishing Gradients** e **Exploding Gradients**. Inicialização calibrada com **Xavier Uniform** ($\text{Var}(W) = 2 / (n_{in} + n_{out})$) e **Kaiming Normal** ($\text{Var}(W) = 2 / n_{in}$).
- **Módulo 5 (1.5h)**: Combate ao overfitting com **Inverted Dropout** (`nn.Dropout`) e escala $1/(1-p)$. Decaimento de taxa de aprendizado com Schedulers (`StepLR`, `ReduceLROnPlateau`, `CosineAnnealingLR`).
- **Módulo 6 (1.0h)**: Síntese prática em notebook PyTorch, simulação interativa e avaliação de fixação com Quiz.

---

## 🛠️ Recursos e Arquivos da Aula
*   **Jupyter Notebook Prático**: [`aula_04_classificacao.ipynb`](aula_04_classificacao.ipynb) e [`aula_04_regressao_optuna.ipynb`](aula_04_regressao_optuna.ipynb)
*   **Apresentação Interativa React**: [`apresentacao/`](apresentacao/) (Slides interativos 16:9 em React + Vite com 6 simuladores interativos e infográficos visuais)
*   **Roteiro de Falas do Professor**: [`falas_apresentador.md`](falas_apresentador.md)
