# Plano Pedagógico de Aula - Aula 05

## 🎯 Informações Gerais
- **Curso:** Redes Neurais Profundas (Deep Learning e Visão Computacional)
- **Instituição:** Instituto Infnet
- **Tema Central:** Introdução a Visão Computacional com CNNs: Convolução, Pooling, Canais RGB e Representação de Imagens no PyTorch
- **Carga Horária:** 8 Horas / Aula
- **Dataset de Referência:** PlantVillage (Hugging Face / Kaggle) - Classificação de Pragas e Doenças Agrícolas em Folhas (SaaS AgriTech)

---

## 💡 Objetivos de Aprendizagem
1. Compreender a representação matemática de imagens digitais como matrizes numéricas em escala de cinza (0 a 255) e tensores multicanais RGB `(3, H, W)`.
2. Identificar a limitação estrutural e a perda de vizinhança espacial decorrente do estiramento (*flattening*) de imagens para MLPs tradicionais.
3. Compreender a mecânica matemática das Convoluções 1D e 2D, utilizando janelas deslizantes (kernels), produtos escalares locais e calculando a redução do número de amostras/resolução (`N_out = N - K + 1`).
4. Analisar o papel dos filtros convolucionais como extratores automáticos de características (*feature extractors*: bordas, cantos, texturas).
5. Explicar a função das camadas de subamostragem (*Pooling*), diferenciando *Max Pooling* de *Average Pooling* e compreendendo seu papel na invariância espacial e redução de parâmetros.
6. Construir e treinar uma arquitetura CNN no PyTorch (`nn.Conv2d`, `nn.ReLU`, `nn.MaxPool2d`, `nn.Linear`) aplicada a um problema real de Agritech (PlantVillage).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 20 slides interativos com suporte a KaTeX, 5 simuladores interativos e navegação via teclado.
- **Simuladores Interativos:**
  1. *GrayMatrixExploration*: Inspeção de matrizes 0-255 e demonstração da ruptura de vizinhança espacial no Flattening.
  2. *Conv1DSimulator*: Convolução 1D com escolha de filtros (Borda, Média Móvel, Sharpen) e cálculo da redução de amostras.
  3. *Conv2DMatrixStepSimulator*: Animação 2D passo a passo com cálculo de produto escalar entre matriz 5x5 e kernel 3x3.
  4. *RGBChannelsVisualizer*: Decomposição de imagem colorida nos 3 canais e formato de tensor `(3, H, W)`.
  5. *PoolingSimulator*: Operação de Max Pooling vs Average Pooling em janelas 2x2 stride 2.
  6. *CNNQuizWidget*: Quiz interativo para consolidação dos conceitos.
- **Jupyter Notebook (`aula_05_visao_computacional_cnns.ipynb`):** Prática com PyTorch e torchvision.

---

## 📋 Estrutura da Aula (Cronograma da Sessão)
| Bloco | Duração | Conteúdo / Atividade |
| :--- | :--- | :--- |
| **Bloco 1** | 60 min | **Representação de Imagens e o Problema do Flattening:** Matriz 0-255, escala de cinza e o porquê de MLPs falharem com imagens. |
| **Bloco 2** | 90 min | **Fundamentos da Convolução 1D e 2D:** Operação de kernel, produto escalar local, filtros de bordas e redução de amostras. |
| **Bloco 3** | 60 min | **Espaço RGB e Multicanais no PyTorch:** Tensores `(3, H, W)`, `nn.Conv2d` e geração de múltiplos Feature Maps. |
| **Bloco 4** | 60 min | **Camadas de Pooling:** Subamostragem espacial, Max Pooling vs Average Pooling e invariância a translações. |
| **Bloco 5** | 150 min | **Prática de Código no PyTorch:** Construção da primeira CNN do zero para o dataset PlantVillage. |
| **Bloco 6** | 60 min | **Avaliação e Consolidação:** Discussão de resultados, métricas de classificação foliar e encerramento. |
