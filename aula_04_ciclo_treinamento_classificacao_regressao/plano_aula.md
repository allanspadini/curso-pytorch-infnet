# Plano de Aula - Aula 04: Ciclo de Treinamento, Particionamento Treino/Teste e Modelagem Prática

**Tema**: Consolidação prática do ciclo de treinamento em PyTorch, divisão treino/teste sem vazamento de dados (*Data Leakage*), diferenciação fundamental entre problemas de Classificação e Regressão, e repasse dos notebooks práticos aplicados.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Consolidação essencial dos pilares do **Projeto 1: Pipeline MLP** (ingestão tabular com `Dataset`/`DataLoader`, loop de treino/validação/teste, classificação com `CrossEntropyLoss` e regressão com `MSELoss`).

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Dominar o Particionamento Treino/Teste**: Compreender o isolamento estatístico absoluto dos dados e a regra de ouro: ajustar transformações (`.fit_transform()`) exclusivamente no treino e apenas aplicá-las (`.transform()`) no teste para evitar *Data Leakage*.
2. **Executar o Ciclo de Treinamento Canônico do PyTorch**: Entender a ordem estrita e o significado das 5 etapas fundamentais de cada batch:
   - Forward pass: $\hat{y} = \text{model}(X)$
   - Cálculo da função de perda: $\mathcal{L} = \text{criterion}(\hat{y}, y)$
   - Limpeza de gradientes acumulados: $\text{optimizer.zero\_grad}()$
   - Backpropagation (diferenciação automática): $\mathcal{L}\text{.backward}()$
   - Atualização dos parâmetros: $\text{optimizer.step}()$
3. **Diferenciar Classificação e Regressão na Prática**:
   - Identificar a estrutura correta da camada final (Logits $C$-dimensionais vs 1 saída contínua).
   - Selecionar a função de perda adequada (`nn.CrossEntropyLoss` sem Softmax explícito vs `nn.MSELoss`).
   - Avaliar com as métricas corretas (Acurácia/F1/Matriz de Confusão vs MAE/RMSE/$R^2$).
4. **Dominar o Repasse dos Notebooks da Aula**:
   - Praticar a implementação passo a passo da rede simples no dataset Iris.
   - Analisar o pipeline tabular completo no dataset de E-commerce (classificação multiclasse) e Seguro Saúde (regressão contínua).

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-15 min: Abertura & Divisão Treino/Teste] ──> [15-30 min: O Ciclo Canônico de Treinamento]
                                                                        │
                                                                        ▼
[60-90 min: Repasse Prático dos Notebooks] <──── [30-45 min: Classificação vs. Regressão]
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–15 min) — Particionamento Estruturado & Integridade**:
   - Por que dividimos dados em Treino e Teste antes de qualquer pré-processamento.
   - Como o vazamento de dados contamina a avaliação e cria modelos ilusórios.
2. **Bloco 2 (15–30 min) — Anatomia do Loop de Treinamento PyTorch**:
   - Análise detalhada das 5 linhas de ouro do loop de treino.
   - O papel do `zero_grad()` e a acumulação natural de gradientes no PyTorch.
   - Modo treino (`model.train()`) vs modo avaliação (`model.eval()` com `torch.no_grad()`).
3. **Bloco 3 (30–45 min) — Matriz Comparativa: Classificação vs. Regressão**:
   - O que muda na cabeça da rede e o que permanece idêntico no extrator de features.
   - Por que o PyTorch combina LogSoftmax + NLLLoss no `CrossEntropyLoss`.
   - Comparação das métricas de negócio para cada tipo de problema.
4. **Bloco 4 (45–85 min) — Repasse Prático Guiado nos Notebooks**:
   - Execução do notebook introdutório `pratica_primeira_rede_iris.ipynb` e análise do gabarito.
   - Acompanhamento do notebook `aula_04_pipelines_dados_simples.ipynb` e do pipeline completo em `aula_04_pipelines_dados_classificacao_regressao.ipynb`.
   - Discussão de erros comuns enfrentados pelos alunos (dimensões de tensores, tipos `LongTensor` vs `FloatTensor`).
5. **Bloco 5 (85–90 min) — Síntese & Conexão com a Próxima Aula**:
   - Resumo das melhores práticas.
   - Conexão com a Aula 05 (Estabilidade de Treinamento, Inicialização de Pesos e Normalização com BatchNorm/LayerNorm).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** Slides visuais e progressivos com animação do ciclo de treinamento e comparação dinâmica de arquiteturas.
- **Datasets Reais:**
  - `iris.csv` / Scikit-Learn Iris: Classificação em 3 classes para fixação imediata.
  - `E-commerce Customer Behavior - Sheet1.csv`: 350 clientes para classificação multiclasse.
  - `insurance.csv`: 1.338 beneficiários de planos de saúde para regressão de custos.
- **Jupyter Notebooks Práticos:**
  - `pratica_primeira_rede_iris.ipynb` & `pratica_primeira_rede_iris_gabarito.ipynb`
  - `aula_04_pipelines_dados_simples.ipynb`
  - `aula_04_pipelines_dados_classificacao_regressao.ipynb`
