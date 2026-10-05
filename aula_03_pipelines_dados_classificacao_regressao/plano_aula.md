# Plano de Aula - Aula 03: Pipelines de Dados Tabulares, Datasets e Modelagem Multitarefa (Classificação e Regressão)

**Tema**: Construção de pipelines de dados profissionais no PyTorch, prevenção de Data Leakage, classes customizadas de `Dataset` e `DataLoader`, modelagem de classificação multiclasse (E-commerce) e regressão contínua (Custos Médicos).  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Prepara a fundação técnica do **Projeto 1: Pipeline MLP** (ingestão tabular, split sem vazamento, classificação com CrossEntropy e regressão com MSE).

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Prevenir Data Leakage no Pré-Processamento**: Compreender por que transformações estatísticas (escalonamento, codificação) devem ser ajustadas estritamente nos dados de treino (`.fit_transform()`) e apenas aplicadas (`.transform()`) em validação e teste.
2. **Implementar a Tríade de Dados do PyTorch**: Converter DataFrames brutos do Pandas em tensores estruturados através de classes herdadas de `torch.utils.data.Dataset` (`__len__` e `__getitem__`).
3. **Configurar DataLoaders de Forma Otimizada**: Configurar mini-batches, paralelização de carregamento (`num_workers`) e compreender o impacto do embaralhamento estocástico (`shuffle=True` no treino e `shuffle=False` no teste).
4. **Construir Modelos MLP para Classificação Multiclasse**: Projetar uma rede neural para categorização de satisfação de clientes de E-commerce com `nn.CrossEntropyLoss` e saída sem ativação (logits).
5. **Construir Modelos MLP para Regressão Contínua**: Projetar uma rede neural para estimativa de custos médicos (`insurance.csv`) com `nn.MSELoss` e calcular métricas de negócio: $MAE$, $RMSE$ e $R^2$.
6. **Avaliar no Teste Cego com Baselines Não-Triviais**: Interpretar matrizes de confusão e comparar os resultados contra regras ingênuas (previsão pela média ou classe majoritária).

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Integridade & Data Leakage] ──> [20-40 min: Datasets & DataLoaders PyTorch] ──> [40-65 min: Classificação Multiclasse]
                                                                                                        │
                                                                                                        ▼
[80-90 min: Avaliação & Baselines] <──── [65-80 min: Regressão Contínua (Insurance)] <────────────────┘
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — Integridade de Dados & O Perigo do Data Leakage**:
   - O que é vazamento de dados e por que modelos com leakage geram métricas irreais que falham em produção.
   - Demonstração visual interativa no `DataLeakageSimulator`.
   - Regra de ouro: dividir antes de qualquer normalização estatística.

2. **Bloco 2 (20–40 min) — Ingestão no PyTorch: `Dataset` & `DataLoader`**:
   - A anatomia da classe `torch.utils.data.Dataset`: métodos mágicos `__init__`, `__len__` e `__getitem__`.
   - O papel do `DataLoader`: mini-batches, economia de memória RAM e variância do gradiente com `shuffle=True`.
   - Demonstração no `DataLoaderShuffleVisualizer`.

3. **Bloco 3 (40–65 min) — Modelagem de Classificação Multiclasse (E-commerce)**:
   - Apresentação do dataset `E-commerce Customer Behavior`.
   - Arquitetura `EcommerceMLP` com `nn.Module`.
   - Função de perda `nn.CrossEntropyLoss` (por que não aplicar Softmax manual no PyTorch).
   - Treinamento guiado e curvas de perda.

4. **Bloco 4 (65–80 min) — Modelagem de Regressão Contínua (`insurance.csv`)**:
   - Da classificação para a regressão: saída linear de dimensão 1.
   - Função de perda `nn.MSELoss` e cálculo de resíduos.
   - Métricas fundamentais: $MAE$ (erro médio absoluto em dólares), $RMSE$ (penalização de grandes desvios) e $R^2$ (proporção da variância explicada).

5. **Bloco 5 (80–90 min) — Avaliação Final & Baselines de Referência**:
   - Avaliação no conjunto de teste independente (cego).
   - Comparação contra baseline da classe mais frequente (classificação) e baseline da média (regressão).
   - Perguntas, síntese e conexão com a Aula 04 (Estabilidade e Inicialização de Pesos).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 17 slides visuais com cards, badges e atalhos de navegação.
- **Simuladores Interativos:**
  1. *DataLeakageSimulator*: Demonstração interativa de contaminação prévia vs pipeline isolado.
  2. *DataLoaderShuffleVisualizer*: Comparação visual entre batches ordenados vs aleatórios e seu efeito na convergência.
  3. *MlpForwardSimulator*: Inspeção do fluxo direto de entradas tabulares através das camadas ocultas.
  4. *QuizWidget*: Verificação imediata de fixação de conceitos ao final da aula.
- **Datasets Reais da Indústria:**
  - `E-commerce Customer Behavior - Sheet1.csv`: 350 clientes e múltiplos atributos comportamentais.
  - `insurance.csv`: 1.338 registros de perfil e custos de seguro de saúde.
- **Jupyter Notebook Prático:** `aula_03_pipelines_dados_classificacao_regressao.ipynb`.
