# 🎓 Redes Neurais Profundas com PyTorch — Graduação EAD (Faculdade Infnet)

Este repositório contém todo o material pedagógico, códigos, notebooks práticos, apresentações interativas em React e estudos de caso para a disciplina **Redes Neurais Profundas (Deep Learning)** do curso de **Graduação em Inteligência Artificial e Ciência de Dados** da **Faculdade Infnet**.

O currículo foi especialmente estruturado em **11 aulas de 1h30 (90 minutos)**, garantindo fundamentação matemática acessível (baseada no ensino médio e cálculo intuitivo), simulações visuais em tempo real, exemplos práticos com dados reais (Kaggle e Hugging Face) e foco em engenharia com PyTorch puro.

---

## 🗺️ Estrutura Curricular das 11 Aulas

| Aula | Tema Central | Notebook(s) & Dados | Apresentação & Simuladores Interativos |
| :---: | :--- | :--- | :--- |
| **01** | **Fundamentos de Deep Learning & O Neurônio Artificial** | `aula_01_introducao_deep_learning.ipynb`<br>• `simulacao_neuronio_artificial.xlsx` | • Perceptron & Funções de Ativação<br>• KaTeX & Visualizador de Tensores |
| **02** | **Grafos de Computação, Autograd & Primeira MLP** | `aula_02_autograd_mlp_churn.ipynb`<br>• Dataset Churn Telecom | • Grafo Computacional & Autograd<br>• Simulador de Backprop & MLP Churn |
| **03** | **Pipelines de Dados Tabulares: Datasets & DataLoaders** | `aula_03_pipelines_dados_classificacao_regressao.ipynb`<br>• `insurance.csv` & E-commerce | • DataLeakageSimulator<br>• DataLoaderShuffleVisualizer & MlpForward |
| **04** | **Estabilidade de Treinamento: Init, Norms & Regularização** | `aula_04_estabilidade_inicializacao_regularizacao.ipynb`<br>• `simulacao_mlp_iris.xlsx` & Checkpoints | • WeightInitComparison<br>• NormComparison (BatchNorm vs LayerNorm)<br>• DropoutAndSchedulerLab |
| **05** | **Otimização Avançada, TensorBoard & Diagnóstico** | `aula_05_otimizacao_diagnostico_tensorboard.ipynb`<br>• Conclusão do **Projeto 1** | • LROptimizerSimulator (AdamW vs SGD)<br>• TrainingDiagnosticsWidget & TensorBoard<br>• GradientFlowSimulator |
| **06** | **Introdução à Visão Computacional & Convoluções** | `aula_06_introducao_visao_computacional_convolucoes.ipynb`<br>• MNIST MLP vs CNN | • GrayMatrixExploration<br>• Conv1DSimulator & Conv2DMatrixStep<br>• PoolingSimulator |
| **07** | **CNNs Profundas em Imagens RGB do Mundo Real** | `aula_07_cnns_profundas_imagens_reais.ipynb`<br>• PlantVillage RGB (Base **Projeto 2 CNN**) | • DeepCNNArchitectureViewer<br>• RGBChannelsVisualizer & Data Augmentation |
| **08** | **Autoencoders Convolucionais & Detecção de Anomalias** | `aula_08_autoencoders_espaco_latente_anomalias.ipynb`<br>• Bonus VAE (Gabarito **EC2**) | • AutoencoderTripartiteFunnel<br>• LatentBottleneck & LatentSpaceVisualizer<br>• AnomalyThresholdSimulator |
| **09** | **Avaliação Crítica sob Desbalanceamento Severo** | `aula_09_avaliacao_metricas_desbalanceamento.ipynb`<br>• Malaria Blood Cells (Gabarito **EC1**) | • ConfusionThresholdSimulator<br>• CalibrationVisualizer (ECE & Brier)<br>• BootstrapSimulator & SurrogateLoss |
| **10** | **Modelagem de Dados Sequenciais & Vanilla RNNs** | `aula_10_modelagem_sequencial_series_temporais.ipynb`<br>• AirPassengers & Demanda | • RNNStepByStepSimulator<br>• RNNUnrolledStepDiagram<br>• RNNVanishingGradientSimulator |
| **11** | **Arquiteturas com Portões (LSTM & GRU) & Features Cíclicas** | `aula_11_lstms_grus_features_ciclicas.ipynb`<br>• Clima & Energia (Gabarito **EC3** & Base **Projeto 2 LSTM**) | • LSTMGateExplorer & Cell State Highway<br>• LSTMvsGRUComparator (Matrizes e GPU)<br>• DemandForecastingSimulator (WAPE) |

---

## 📁 Estrutura de Cada Pasta de Aula (`aula_XX_<tema>/`)

Cada aula possui uma pasta dedicada seguindo o padrão oficial da Faculdade Infnet:
```
aula_XX_<nome_da_aula>/
├── apresentacao/                  # Aplicação React + Vite (Slides interativos 16:9)
│   ├── src/
│   │   ├── components/            # Header, Footer, Controls, MathView
│   │   │   └── interactive/       # 3 a 5 Simuladores interativos React
│   │   └── data/slidesData.jsx    # Matriz de slides e script completo em notes
│   ├── package.json
│   └── vite.config.js
├── falas_apresentador.md          # Roteiro completo de narração slide a slide
├── plano_aula.md                  # Plano pedagógico detalhado (90 minutos)
├── aula_XX_<nome_da_aula>.ipynb   # Jupyter Notebook prático para o aluno
└── simulacao_<tema>.xlsx          # Simulação matemática em planilha (quando aplicável)
```

---

## 🚀 Instalação e Execução

### 🐍 Ambiente Python (Gerenciador `uv`)
Este projeto utiliza o gerenciador de pacotes ultra-rápido **`uv`**. Para configurar o ambiente e executar os notebooks:

```bash
# Instalar uv caso não possua
curl -LsSf https://astral.sh/uv/install.sh | sh

# Instalar dependências do projeto
uv pip install torch torchvision torchaudio numpy pandas matplotlib scikit-learn jupyterlab optuna kagglehub

# Iniciar o ambiente JupyterLab
uv run jupyter lab
```

### 🖥️ Apresentações Interativas em React (Vite)
As apresentações dos slides foram construídas em React + Vite com renderização matemática KaTeX e componentes visuais modernos:

```bash
# Instalar dependências base
cd aula_01_introducao_deep_learning/apresentacao
npm install
cd ../..

# Executar apresentação de qualquer aula em modo desenvolvimento:
npm run dev:aula01
npm run dev:aula02
# ... até
npm run dev:aula11

# Construir todas as 11 apresentações para produção:
npm run build:all
```

### ⌨️ Atalhos de Teclado nas Apresentações
- `Seta Direita` / `Espaço` / `PageDown`: Avançar slide.
- `Seta Esquerda` / `PageUp`: Voltar slide.
- `Home` / `End`: Ir para o primeiro / último slide.
- `N`: Abrir/Fechar Gaveta com o Script de Falas do Professor (`NotesDrawer`).
- `G`: Abrir Grid com Miniaturas de Todos os Slides (`OverviewModal`).
- `F`: Entrar/Sair do modo Tela Cheia (*Fullscreen*).

---

## 🎯 Relação com Avaliações e Critérios

Para consultar o mapeamento detalhado entre as 11 aulas e os requisitos do **Projeto 1**, **Projeto 2** e **Estudos de Caso (EC1, EC2, EC3)**, consulte o documento:
👉 [`mapeamento_aulas_criterios.md`](mapeamento_aulas_criterios.md)

---

## 👨‍🏫 Autor & Instituição
- **Docente:** Prof. Allan Spadini (Doutor em Geofísica, Pesquisador em Inteligência Artificial)
- **Instituição:** Instituto Infnet — Graduação em Inteligência Artificial e Ciência de Dados
- **Licença:** Material didático exclusivo para os alunos do Instituto Infnet.
