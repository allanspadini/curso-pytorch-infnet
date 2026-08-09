# Plano de Aula - Aula 03: Ciclo de Treinamento Estável, MLP Multicamadas e Diagnóstico no PyTorch

**Tema**: Perceptron de Múltiplas Camadas (MLP), funções de ativação, estabilidade de treinamento, diagnósticos de gradientes, regularização e pipeline completo de Deep Learning no PyTorch.  
**Carga Horária Equivalente**: 8 horas  
**Modalidade**: EAD Pós-Graduação (Faculdade Infnet)  

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Arquitetura MLP**: Justificar a necessidade de múltiplas camadas oculta e funções de ativação não-lineares (`ReLU`, `Sigmoid`, `Tanh`, `LeakyReLU`) para resolver problemas não-linearmente separáveis, começando pelo dataset Iris.
2. **Construir Redes Neurais com `nn.Module`**: Definir explicitamente camadas (`nn.Linear`), inicialização de pesos (Xavier/Glorot, He/Kaiming vs. padrão PyTorch) e o fluxo *forward pass*.
3. **Implementar Pipelines de Treinamento Tabulares**: Construir `Dataset` customizado, `DataLoader`, divisão Treino/Validação/Teste e loop completo de treinamento (Forward, Loss, Backward, Step).
4. **Dominar Variantes de Classificação e Regressão**: Treinar uma MLP para classificação multiclasse de transações financeiras (CrossEntropyLoss) e uma variante para regressão de valores com MSE Loss, avaliando com MAE, RMSE e $R^2$.
5. **Garantir Estabilidade e Diagnosticar o Treinamento**: Monitorar *gradient norms* para identificar *vanishing/exploding gradients*, comparar o impacto de **BatchNorm1d** e **LayerNorm**, aplicar **Dropout** para controle do gap treino/validação, configurar otimizadores (**Adam/AdamW**) com *learning rate schedulers* e registrar métricas no **TensorBoard**.
6. **Gerenciar Checkpoints e Avaliação**: Salvar e carregar o melhor estado do modelo via `state_dict`, interpretar matrizes de confusão e comparar os resultados finais no conjunto de teste contra baselines de referência.

---

## 🧭 Divisão da Carga Horária Equivalente (8 Horas)

```
[Módulo 1: Iris & MLP Fundamentos] ──> [Módulo 2: Dataset Tabular & DataLoaders] ──> [Módulo 3: Regressão vs. Classificação]
       (1.5 horas)                                   (1.5 horas)                                  (1.5 horas)
                                                                                                        │
                                                                                                        ▼
[Módulo 6: Checkpoints & Teste] <── [Módulo 5: Diagnóstico & TensorBoard] <── [Módulo 4: Estabilidade, Init & Norm]
       (1.0 hora)                                    (1.5 horas)                                  (1.0 hora)
```

### Detalhamento dos Módulos:
- **Módulo 1 (1.5h)**: Introdução ao Perceptron de Múltiplas Camadas com o dataset Iris. Comparação de fronteiras de decisão lineares vs. não-lineares. Funções de ativação (ReLU, Sigmoid, Tanh, LeakyReLU).
- **Módulo 2 (1.5h)**: Transição para dados reais da indústria (Fintech - Categorização de Transações Bancárias). Criação de `Dataset` PyTorch, `DataLoader` com batches e divisão Treino/Validação/Teste.
- **Módulo 3 (1.5h)**: Implementação das duas modalidades: Classificação Multiclasse e Regressão de Valores de Transações. Métricas de avaliação ($MAE$, $RMSE$, $R^2$, Acurácia).
- **Módulo 4 (1.0h)**: Inicialização de pesos (Xavier Uniforme/Normal, He Normal) vs. padrão PyTorch. Diagnóstico de gradientes (*Gradient Norms*) e técnicas de normalização (**BatchNorm1d** vs. **LayerNorm**).
- **Módulo 5 (1.5h)**: Prevenção de *overfitting* com **Dropout**. Configuração de otimizadores (**AdamW**) e *Learning Rate Schedulers* (`StepLR`). Integração completa com **TensorBoard** (`SummaryWriter`).
- **Módulo 6 (1.0h)**: Prática de salvamento e recarregamento do melhor modelo via `state_dict`. Avaliação no conjunto de teste final, interpretação da Matriz de Confusão e comparação com baseline ingênuo.

---

## 🛠️ Recursos e Arquivos da Aula
*   **Planilha de Simulação Matemática**: [`simulacao_mlp_iris.xlsx`](simulacao_mlp_iris.xlsx) (Cálculos de forward pass, ativação e loss na planilha)
*   **Jupyter Notebook Prático**: [`aula_03_treinamento_estavel_mlp.ipynb`](aula_03_treinamento_estavel_mlp.ipynb) (Código PyTorch completo)
*   **Apresentação Interativa React**: [`apresentacao/`](apresentacao/) (Slides interativos com simuladores e visualizadores KaTeX)
*   **Roteiro de Falas do Professor**: [`falas_apresentador.md`](falas_apresentador.md)
