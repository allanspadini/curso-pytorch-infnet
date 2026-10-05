# Plano de Aula - Aula 07: Arquiteturas Convolucionais Profundas para Imagens RGB do Mundo Real

**Tema**: Visão computacional com imagens coloridas (RGB), convoluções multicanal (3D), pré-processamento e aumento de dados com `torchvision.transforms`, cálculo geométrico de transição para camadas densas, construção da arquitetura `PlantVillageCNN` com `BatchNorm2d` e classificação multiclasse no dataset PlantVillage.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: É a referência direta e gabarito prático para a **Opção CNN do Projeto 2: Arquitetura Especializada**.

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Estrutura de Tensores RGB**: Manipular tensores 4D no formato PyTorch $(N, C=3, H, W)$, entendendo a separação e combinação dos canais Vermelho, Verde e Azul.
2. **Explicar Convoluções Através dos Canais**: Demonstrar matematicamente como um filtro convolucional opera em profundidade 3D (largura $\times$ altura $\times$ canais de entrada) somando as contribuições para produzir um único mapa 2D.
3. **Construir Pipelines de Data Augmentation**: Utilizar `torchvision.transforms` para aplicar transformações estocásticas no treino (`RandomHorizontalFlip`, `RandomRotation`, `ColorJitter`) e normalização com estatísticas do ImageNet (`mean=[0.485, 0.456, 0.406]`, `std=[0.229, 0.224, 0.225]`).
4. **Calcular a Transição Espacial para Camadas Lineares**: Determinar analiticamente o número exato de neurônios de entrada para `nn.Linear` após múltiplas camadas de convolução e pooling sem tentativa e erro.
5. **Implementar a Arquitetura `PlantVillageCNN`**: Estruturar blocos modulares (`nn.Conv2d` -> `nn.BatchNorm2d` -> `nn.ReLU` -> `nn.MaxPool2d`) e camada de regularização `nn.Dropout`.
6. **Treinar e Avaliar em Problema Agritech Real**: Conduzir o loop de treinamento com `nn.CrossEntropyLoss`, otimizador `AdamW` e avaliar a matriz de confusão multiclasse para identificar confusões entre doenças foliares.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Da Escala de Cinza ao RGB Multicanal] ──> [20-40 min: Data Augmentation & Transforms]
                                                                        │
                                                                        ▼
[70-90 min: Avaliação, Matriz de Confusão & Projeto 2] <── [40-70 min: Arquitetura PlantVillageCNN]
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — Imagens Coloridas & Tensores NCHW**:
   - Da matriz 2D para o volume 3D: os 3 canais de cor RGB.
   - O formato padrão do PyTorch: `(Batch, Channels, Height, Width)` vs formatos de bibliotecas como OpenCV/Matplotlib `(H, W, C)`.
   - Demonstração no `RGBChannelsVisualizer`.

2. **Bloco 2 (20–40 min) — Pré-Processamento & Data Augmentation**:
   - Por que imagens do mundo real exigem aumento de dados: iluminação variável, rotação de câmera e sombras.
   - O pipeline `torchvision.transforms`: transformações aleatórias apenas no treino vs transformações determinísticas na validação/teste.
   - Normalização com médias e desvios padrão globais do ImageNet.

3. **Bloco 3 (40–70 min) — Construção da CNN Profunda no PyTorch**:
   - Blocos convolucionais modernos: `Conv2d` seguido de `BatchNorm2d` e `ReLU`.
   - Cálculo do receptive field e transição geométrica da última saída de pooling para a camada `nn.Linear`.
   - Demonstração no `UpsamplingComparisonDiagrams`.

4. **Bloco 4 (70–90 min) — Treinamento, Avaliação & Conexão com o Projeto 2**:
   - Treinamento no dataset `PlantVillage` via Hugging Face.
   - Leitura da Matriz de Confusão multiclasse: identificando patologias semelhantes.
   - Checklist de entrega da Opção CNN no Projeto 2.
   - Síntese pedagógica e transição para Autoencoders (Aula 08).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 18 slides visuais com decomposição de canais RGB e diagramas arquiteturais.
- **Simuladores Interativos:**
  1. *RGBChannelsVisualizer*: Separação interativa dos canais R, G e B e visualização dos planos de cor.
  2. *UpsamplingComparisonDiagrams*: Visualização do fluxo de representações espaciais profundas.
  3. *CNNQuizWidget*: Quiz de fixação sobre tensores 4D, transforms e camadas convolucionais.
- **Dataset do Mundo Real:** `PlantVillage` (doenças em folhas agrícolas via Hugging Face).
- **Jupyter Notebook Prático:** `aula_07_cnns_profundas_imagens_reais.ipynb` (Base direta do Projeto 2).
