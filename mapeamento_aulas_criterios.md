# 🗺️ Guia de Apoio: Mapeamento de Notebooks por Etapa dos Critérios de Avaliação

Este documento correlaciona os requisitos de entrega, projetos e estudos de caso descritos em [`criterios.md`](criterios.md) com os notebooks práticos e materiais das **11 aulas** do curso de graduação. O objetivo é orientar os alunos sobre quais notebooks servem como base direta e referência de código para cada parte do trabalho prático e avaliações.

---

## 📊 1. Matriz Síntese de Apoio

| Etapa / Entregável (`criterios.md`) | Aula e Notebook Principal Recomendado | Notebooks Complementares | O que o aluno encontra pronto como base |
| :--- | :--- | :--- | :--- |
| **Projeto 1: Pipeline MLP**<br>*(Classificação, Regressão, Estabilidade e TensorBoard)* | [`aula_04_estabilidade_inicializacao_regularizacao.ipynb`](aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb) | [`aula_03_pipelines_dados_classificacao_regressao.ipynb`](aula_03_pipelines_dados_classificacao_regressao/aula_03_pipelines_dados_classificacao_regressao.ipynb)<br>[`aula_05_otimizacao_diagnostico_tensorboard.ipynb`](aula_05_otimizacao_diagnostico_tensorboard/aula_05_otimizacao_diagnostico_tensorboard.ipynb) | • Pipeline em PyTorch puro (`nn.Module`)<br>• Inicializações (Xavier / He vs Padrão)<br>• BatchNorm1d vs LayerNorm vs Dropout<br>• Otimizador AdamW + Schedulers (`StepLR`/Plateau)<br>• Diagnóstico de *Gradient Norms* ($\|\nabla L\|$)<br>• Salvamento e carga via `state_dict`<br>• Integração completa com **TensorBoard** |
| **Projeto 2: Opção CNN**<br>*(Visão Computacional / Imagens)* | [`aula_07_cnns_profundas_imagens_reais.ipynb`](aula_07_cnns_profundas_imagens_reais/aula_07_cnns_profundas_imagens_reais.ipynb) | [`aula_06_introducao_visao_computacional_convolucoes.ipynb`](aula_06_introducao_visao_computacional_convolucoes/aula_06_introducao_visao_computacional_convolucoes.ipynb)<br>[`aula_09_extra_validacao_cruzada_imagens_eurosat.ipynb`](aula_09_avaliacao_metricas_desbalanceamento/aula_09_extra_validacao_cruzada_imagens_eurosat.ipynb) | • Ingestão e `Dataset` para imagens RGB (PlantVillage)<br>• Pré-processamento com `torchvision.transforms`<br>• `nn.Conv2d`, `nn.BatchNorm2d`, `nn.MaxPool2d`<br>• Visualização de filtros e ativações<br>• Matriz de confusão e métricas multiclasse no teste |
| **Projeto 2: Opção LSTM / GRU**<br>*(Séries Temporais / Sequências)* | [`aula_11_lstms_grus_features_ciclicas.ipynb`](aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb) | [`aula_10_modelagem_sequencial_series_temporais.ipynb`](aula_10_modelagem_sequencial_series_temporais/aula_10_modelagem_sequencial_series_temporais.ipynb) | • Janelamento deslizante (*Sliding Window*)<br>• Tensores 3D `(batch, seq_len, features)`<br>• Codificação cíclica com $\sin/\cos$<br>• Modelos comparativos `nn.LSTM` vs `nn.GRU`<br>• Métricas temporais ($MAE$, $RMSE$, $WAPE$) |
| **Projeto 2: Análise de Alternativas**<br>*(Trade-offs e Inductive Bias)* | [`aula_06_introducao_visao_computacional_convolucoes.ipynb`](aula_06_introducao_visao_computacional_convolucoes/aula_06_introducao_visao_computacional_convolucoes.ipynb) | [`aula_10_modelagem_sequencial_series_temporais.ipynb`](aula_10_modelagem_sequencial_series_temporais/aula_10_modelagem_sequencial_series_temporais.ipynb) | • Comparação de achatamento (*Flattening*) vs Convoluções espaciais<br>• Memória de longo prazo vs Receptive Field fixo |
| **Estudo de Caso 1 (EC1)**<br>*(CNN para Triagem de Malária)* | [`aula_09_avaliacao_metricas_desbalanceamento.ipynb`](aula_09_avaliacao_metricas_desbalanceamento/aula_09_avaliacao_metricas_desbalanceamento.ipynb) | [`aula_07_cnns_profundas_imagens_reais.ipynb`](aula_07_cnns_profundas_imagens_reais/aula_07_cnns_profundas_imagens_reais.ipynb) | • Cálculo de Sensibilidade e Especificidade da Matriz de Confusão<br>• Ponderação de classes em `CrossEntropyLoss(weight=...)`<br>• Calibração de limiar (*Threshold Tuning*)<br>• Loops de validação com *Early Stopping* |
| **Estudo de Caso 2 (EC2)**<br>*(Autoencoder & Anomalias)* | [`aula_08_autoencoders_espaco_latente_anomalias.ipynb`](aula_08_autoencoders_espaco_latente_anomalias/aula_08_autoencoders_espaco_latente_anomalias.ipynb) | [`aula_08_bonus_vae_colorization.ipynb`](aula_08_autoencoders_espaco_latente_anomalias/aula_08_bonus_vae_colorization.ipynb) | • **Gabarito prático completo do EC2:**<br>• Cálculo da razão de compressão ($\text{Dim}(Z)/\text{Dim}(X)$)<br>• Projeção do espaço latente com **t-SNE / PCA**<br>• Crítica da regra $\mu + 2\sigma$ vs Curvas ROC/PR |
| **Estudo de Caso 3 (EC3)**<br>*(LSTM Previsão de Temperatura)* | [`aula_11_lstms_grus_features_ciclicas.ipynb`](aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb) | [`aula_04_estabilidade_inicializacao_regularizacao.ipynb`](aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb) | • **Gabarito prático completo do EC3:**<br>• Engenharia de features cíclicas ($\sin/\cos$ de hora e mês)<br>• **Gradient Clipping** (`torch.nn.utils.clip_grad_norm_`)<br>• Schedulers em platô (`ReduceLROnPlateau`)<br>• Refatoração direta de `nn.LSTM` para `nn.GRU` |

---

## 🎯 2. Detalhamento por Entregável

---

### 📌 Projeto 1: Pipeline MLP

O **Projeto 1** exige a implementação do pipeline fundamental de Deep Learning do zero em PyTorch com `nn.Module` (sem frameworks de alto nível tipo Lightning), cobrindo tarefas de **classificação** e **regressão**, inicialização de pesos, normalização de camadas, regularização, diagnóstico de gradientes e logs no TensorBoard.

*   🌟 **Notebook de Referência Principal**: [`aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb`](aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb)
    *   **Arquitetura `nn.Module`**: Estrutura completa de classes com `__init__` e `forward`.
    *   **Inicialização Calibrada**: Comparações com `torch.nn.init.xavier_uniform_` e `torch.nn.init.kaiming_normal_` frente ao padrão.
    *   **Normalização e Regularização**: Experimentos comparando a rede sem normalização vs `nn.BatchNorm1d` vs `nn.LayerNorm` e aplicação de `nn.Dropout`.
    *   **Diagnóstico de Gradientes**: Função utilitária para inspeção de *Gradient Norms* ($\|\nabla L\|$), identificando vanishing ou exploding gradients.
    *   **Checkpoints**: Salvamento e recarregamento do melhor modelo via `model.state_dict()`.

*   📚 **Notebooks Complementares**:
    *   [`aula_03_pipelines_dados_classificacao_regressao/aula_03_pipelines_dados_classificacao_regressao.ipynb`](aula_03_pipelines_dados_classificacao_regressao/aula_03_pipelines_dados_classificacao_regressao.ipynb): Detalha a prevenção de **Data Leakage** no pré-processamento tabular (`.fit_transform()` no treino e `.transform()` no teste/validação), classificação multiclasse e regressão.
    *   [`aula_05_otimizacao_diagnostico_tensorboard/aula_05_otimizacao_diagnostico_tensorboard.ipynb`](aula_05_otimizacao_diagnostico_tensorboard/aula_05_otimizacao_diagnostico_tensorboard.ipynb): Demonstração aprofundada de otimizadores (AdamW), rastreamento com **TensorBoard** (`SummaryWriter`) e sintonia fina de hiperparâmetros com Optuna.

---

### 📌 Projeto 2: Arquitetura Especializada

O **Projeto 2** exige a escolha e justificativa de uma arquitetura especializada (CNN, LSTM ou GRU) para dados com estrutura espacial ou temporal, aplicando o mesmo rigor de treinamento, diagnóstico e avaliação do Projeto 1, seguido de uma análise comparativa cross-paradigma.

#### Opção A: Visão Computacional com CNN (Imagens)
*   🌟 **Notebook de Referência Principal**: [`aula_07_cnns_profundas_imagens_reais/aula_07_cnns_profundas_imagens_reais.ipynb`](aula_07_cnns_profundas_imagens_reais/aula_07_cnns_profundas_imagens_reais.ipynb)
    *   **Ingestão de Imagens**: Criação de `Dataset` PyTorch e `DataLoader` para imagens RGB multicanais (PlantVillage).
    *   **Arquitetura Convolucional**: Uso de `nn.Conv2d`, `nn.BatchNorm2d`, `nn.MaxPool2d`, `nn.Dropout` e cálculo correto das dimensões pós-convolução para `nn.Linear`.
    *   **Visualização de Filtros**: Análise de pesos convolucionais aprendidos e mapas de ativação.
    *   **Avaliação e Diagnóstico**: Matriz de confusão, métricas por classe e curvas de loss de treino e validação.
*   📚 **Notebooks Complementares**:
    *   [`aula_06_introducao_visao_computacional_convolucoes/aula_06_introducao_visao_computacional_convolucoes.ipynb`](aula_06_introducao_visao_computacional_convolucoes/aula_06_introducao_visao_computacional_convolucoes.ipynb) para fundamentos de convoluções 1D e 2D.
    *   [`aula_09_avaliacao_metricas_desbalanceamento/aula_09_extra_validacao_cruzada_imagens_eurosat.ipynb`](aula_09_avaliacao_metricas_desbalanceamento/aula_09_extra_validacao_cruzada_imagens_eurosat.ipynb) para estratégias avançadas de particionamento e validação cruzada.

#### Opção B: Séries Temporais com LSTM ou GRU (Sequências)
*   🌟 **Notebook de Referência Principal**: [`aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb`](aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb)
    *   **Janelamento Deslizante**: Transformação de séries temporais em tensores 3D supervisionados `(batch_size, seq_len, input_size)`.
    *   **Implementação Comparativa**: Código para `nn.LSTM` e `nn.GRU` sob a convenção `batch_first=True`.
    *   **Métricas de Séries Temporais**: Avaliação com $MAE$, $RMSE$ e métricas imunes à divisão por zero como $WAPE$.
*   📚 **Notebook Complementar**: [`aula_10_modelagem_sequencial_series_temporais/aula_10_modelagem_sequencial_series_temporais.ipynb`](aula_10_modelagem_sequencial_series_temporais/aula_10_modelagem_sequencial_series_temporais.ipynb) para a mecânica de tensores 3D e Vanilla RNNs.

#### Etapa 2: Análise de Alternativas Arquiteturais (400 a 600 palavras)
*   Para comparar **MLP vs CNN** (imagens): Consulte [`aula_06_introducao_visao_computacional_convolucoes.ipynb`](aula_06_introducao_visao_computacional_convolucoes/aula_06_introducao_visao_computacional_convolucoes.ipynb), destacando a quebra de localidade espacial pelo *Flattening* versus a invariância translacional e compartilhamento de pesos dos filtros convolucionais.
*   Para comparar **CNN 1D vs LSTM/GRU** (séries temporais): Consulte os conceitos das Aulas 10 e 11, contrastando o *Receptive Field* fixo da convolução 1D com a capacidade de memória adaptativa dos portões (*gates*) das RNNs.

---

### 📌 Estudos de Caso: Diagnóstico de Projetos em Campo

---

#### 🔬 Estudo de Caso 1: CNN para Triagem de Malária em Células Sanguíneas
*   **Problemas levantados no enunciado**:
    1. Dataset desbalanceado (85% não infectadas / 15% parasitadas) avaliado apenas por acurácia geral (88,3%).
    2. Sensibilidade clínica obtida de apenas **57,4%** ($\frac{287}{287 + 213}$), muito abaixo do limiar exigido pela OMS ($\ge 95\%$).
    3. `CrossEntropyLoss()` utilizada sem o argumento `weight`.
    4. Ausência de `BatchNorm2d`, `Dropout`, *LR Scheduler* e loop de validação por época.
    5. Kernels excessivamente grandes ($7 \times 7$) e camada densa inicial superdimensionada ($128 \times 14 \times 14 \rightarrow 2048$).
*   🌟 **Notebook de Referência**: [`aula_09_avaliacao_metricas_desbalanceamento/aula_09_avaliacao_metricas_desbalanceamento.ipynb`](aula_09_avaliacao_metricas_desbalanceamento/aula_09_avaliacao_metricas_desbalanceamento.ipynb)
    *   Cálculo e interpretação detalhada de **Sensibilidade** (Recall), **Especificidade**, **Precision-Recall AUC** e Matriz de Confusão.
    *   Configuração de pesos para classes raras em `torch.nn.CrossEntropyLoss(weight=class_weights)`.
    *   Implementação de loop de validação por época e rastreamento de métricas clínicas para *Early Stopping*.

---

#### 🧬 Estudo de Caso 2: Autoencoder Convolucional para Detecção de Anomalias
*   **Problemas levantados no enunciado**:
    1. Entrada: $1 \times 64 \times 64 = 4.096$ pixels; Saída do Encoder: $32 \times 16 \times 16 = \mathbf{8.192}$ valores. O "bottleneck" é, na verdade, uma **expansão dimensional de 2x**, permitindo que a rede aja como função identidade sem aprender representações compactas.
    2. Diferença mínima entre erro de reconstrução normal ($0,0261$) e anômalo ($0,0308$), gerando baixo Recall ($0,37$).
    3. Limiar (*threshold*) ingênuo $\mu + 2\sigma$ calculado apenas sobre a perda de treino.
    4. Falta de inspeção do espaço latente via t-SNE ou PCA.
*   🌟 **Notebook de Referência**: [`aula_08_autoencoders_espaco_latente_anomalias/aula_08_autoencoders_espaco_latente_anomalias.ipynb`](aula_08_autoencoders_espaco_latente_anomalias/aula_08_autoencoders_espaco_latente_anomalias.ipynb)
    *   **Cálculo da Compressão do Bottleneck**: Demonstra como dimensionar o vetor $Z$ para garantir uma compressão efetiva ($\text{Dim}(Z) \ll \text{Dim}(X)$).
    *   **Visualização t-SNE / PCA**: Código pronto para extrair representações latentes e plotar o agrupamento de dados normais vs anômalos.
    *   **Calibração de Threshold**: Mostra como selecionar o limiar ótimo a partir de curvas ROC / Precision-Recall com base na Sensibilidade clínica requerida.

---

#### 🌡️ Estudo de Caso 3: LSTM para Previsão de Temperatura (Jena Climate)
*   **Problemas levantados no enunciado**:
    1. Features cíclicas `hora_do_dia` (0–23) e `mes` (1–12) usadas como inteiros contínuos lineares, criando saltos artificiais (ex: da hora 23 para 00h).
    2. Pico de *Gradient Norm* de **14.73** na época 1 (risco de *Exploding Gradients*).
    3. Estagnação da `val_loss` da época 10 ($0,388$) até a 50 ($0,380$) sem mecanismo de decaimento de taxa de aprendizado.
    4. Capacidade excessiva e overfitting (3 camadas LSTM com 128 unidades) gerando gap entre treino ($0,081$) e validação ($0,380$).
    5. Proposta de substituição do LSTM por GRU para ganho de eficiência.
*   🌟 **Notebook de Referência**: [`aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb`](aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb)
    *   **Transformação Cíclica**: Implementação das fórmulas trigonométricas de codificação temporal:
        $$\text{hora\_sin} = \sin\left(\frac{2\pi \cdot t}{24}\right), \quad \text{hora\_cos} = \cos\left(\frac{2\pi \cdot t}{24}\right)$$
    *   **Gradient Clipping**: Uso de `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)` para conter picos de gradiente.
    *   **LR Schedulers em Platô**: Configuração de `torch.optim.lr_scheduler.ReduceLROnPlateau(optimizer, mode='min', patience=3, factor=0.5)`.
    *   **Refatoração para GRU**: Substituição de `nn.LSTM` por `nn.GRU`, eliminando a manipulação do *Cell State* ($C_t$) e demonstrando a redução de parâmetros e ganho computacional.

---

## 🏆 3. Mapeamento Direto com a Rubrica de Avaliação

| Dimensão da Rubrica | Requisito Avaliado | Notebooks Recomendados para Estudo e Código |
| :--- | :--- | :--- |
| **1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch** | • Implementação de MLP em `nn.Module` com forward explícito<br>• Comparação empírica de funções de ativação e fluxo de gradiente<br>• Inicialização Xavier/He vs padrão<br>• Justificativa de profundidade e largura | [`aula_04_estabilidade_inicializacao_regularizacao.ipynb`](aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb)<br>[`aula_01_introducao_deep_learning.ipynb`](aula_01_introducao_deep_learning/aula_01_introducao_deep_learning.ipynb) |
| **2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch** | • Loop com DataLoader, validação por época e checkpoint via `state_dict`<br>• Comparação de estabilização (BatchNorm vs LayerNorm vs Dropout)<br>• AdamW com LR Scheduling e curvas no TensorBoard<br>• Diagnóstico e correção de gradientes problemáticos | [`aula_04_estabilidade_inicializacao_regularizacao.ipynb`](aula_04_estabilidade_inicializacao_regularizacao/aula_04_estabilidade_inicializacao_regularizacao.ipynb)<br>[`aula_05_otimizacao_diagnostico_tensorboard.ipynb`](aula_05_otimizacao_diagnostico_tensorboard/aula_05_otimizacao_diagnostico_tensorboard.ipynb) |
| **3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais** | • Métricas no teste comparadas com baseline não trivial<br>• Análise de curvas de loss/accuracy com identificação de fenômenos<br>• Diagnóstico de problema real com hipótese e teste empírico<br>• Matriz de confusão com interpretação de erros por classe | [`aula_07_cnns_profundas_imagens_reais.ipynb`](aula_07_cnns_profundas_imagens_reais/aula_07_cnns_profundas_imagens_reais.ipynb)<br>[`aula_08_autoencoders_espaco_latente_anomalias.ipynb`](aula_08_autoencoders_espaco_latente_anomalias/aula_08_autoencoders_espaco_latente_anomalias.ipynb) |
| **4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging** | • **EC1**: Cálculo de Sensibilidade/Especificidade e mitigação do desbalanceamento via `class_weight`<br>• **EC2**: Diagnóstico do bottleneck como expansão dimensional ($8.192 > 4.096$)<br>• **EC2**: Proposta de dimensão latente adequada, threshold via ROC/PR e espaço latente t-SNE | [`aula_09_avaliacao_metricas_desbalanceamento.ipynb`](aula_09_avaliacao_metricas_desbalanceamento/aula_09_avaliacao_metricas_desbalanceamento.ipynb)<br>[`aula_08_autoencoders_espaco_latente_anomalias.ipynb`](aula_08_autoencoders_espaco_latente_anomalias/aula_08_autoencoders_espaco_latente_anomalias.ipynb) |
| **5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais** | • **EC3**: Codificação de features cíclicas com $\sin/\cos$<br>• **EC3**: Gradient clipping com `max_norm` justificado<br>• **EC3**: Diagnóstico do platô de loss e configuração de scheduler<br>• **EC3**: Avaliação da proporcionalidade de camadas e refatoração para GRU | [`aula_11_lstms_grus_features_ciclicas.ipynb`](aula_11_lstms_grus_features_ciclicas/aula_11_lstms_grus_features_ciclicas.ipynb) |

---

## 📂 4. Guia Rápido dos Arquivos por Aula

```
curso-pytorch-infnet-graduacao/
├── aula_01_introducao_deep_learning/
│   └── aula_01_introducao_deep_learning.ipynb    # Tensores, forward pass manual e neurônio artificial
├── aula_02_autograd_mlp_churn/
│   └── aula_02_autograd_mlp_churn.ipynb          # Autograd, ciclo de 5 passos e primeira MLP
├── aula_03_pipelines_dados_classificacao_regressao/
│   └── aula_03_pipelines_dados_classificacao_regressao.ipynb # DataLoaders, sem leakage, classificação e regressão
├── aula_04_estabilidade_inicializacao_regularizacao/
│   └── aula_04_estabilidade_inicializacao_regularizacao.ipynb # BASE PROJETO 1: Init, Norms e Regularização
├── aula_05_otimizacao_diagnostico_tensorboard/
│   └── aula_05_otimizacao_diagnostico_tensorboard.ipynb # BASE PROJETO 1: AdamW, Schedulers, TensorBoard e Optuna
├── aula_06_introducao_visao_computacional_convolucoes/
│   └── aula_06_introducao_visao_computacional_convolucoes.ipynb # Convoluções 1D/2D, Pooling e primeira CNN
├── aula_07_cnns_profundas_imagens_reais/
│   └── aula_07_cnns_profundas_imagens_reais.ipynb # BASE PROJETO 2 (CNN): Imagens RGB (PlantVillage)
├── aula_08_autoencoders_espaco_latente_anomalias/
│   ├── aula_08_autoencoders_espaco_latente_anomalias.ipynb # BASE ESTUDO CASO 2: Bottleneck, t-SNE, Anomalias
│   └── aula_08_bonus_vae_colorization.ipynb      # VAE e espaço latente contínuo
├── aula_09_avaliacao_metricas_desbalanceamento/
│   ├── aula_09_avaliacao_metricas_desbalanceamento.ipynb # BASE ESTUDO CASO 1: Métricas clínicas e Class Weights
│   └── aula_09_extra_validacao_cruzada_imagens_eurosat.ipynb # Validação cruzada com imagens
├── aula_10_modelagem_sequencial_series_temporais/
│   └── aula_10_modelagem_sequencial_series_temporais.ipynb # Quebra de IID, Sliding Window, Tensores 3D e Vanilla RNN
└── aula_11_lstms_grus_features_ciclicas/
    ├── aula_11_lstms_grus_features_ciclicas.ipynb # BASE ESTUDO CASO 3 & PROJETO 2 (LSTM/GRU): Clima & Energia
    └── aula_11_bonus_completador_frases_piratas_lstm.ipynb # NLP e geração de sequências com LSTM
```
