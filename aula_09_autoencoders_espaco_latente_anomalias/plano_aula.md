# Plano de Aula - Aula 08: Autoencoders Convolucionais, Espaço Latente e Detecção de Anomalias

**Tema**: Aprendizado de representações auto-supervisionado, arquitetura tripartida (Encoder, Bottleneck, Decoder), Convoluções Transpostas (`nn.ConvTranspose2d`), visualização do espaço latente com PCA e t-SNE, formulação da detecção de anomalias por erro de reconstrução MSE e crítica rigorosa aos limiares de decisão ($\mu + 2\sigma$ vs curvas ROC/PR).  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Gabarito conceitual e prático completo do **Estudo de Caso 2 (Autoencoder Convolucional & Anomalias)**.

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Compreender a Arquitetura Fundamental de Autoencoders**: Diferenciar *Encoder* (compressão), *Bottleneck* (espaço latente $Z$) e *Decoder* (descompressão), analisando o fluxo de reconstrução de imagens.
2. **Avaliar o Papel Crítico do Bottleneck**: Calcular a razão de compressão dimensional ($\text{Dim}(Z) / \text{Dim}(X)$) e compreender como a restrição de capacidade impede a rede de agir como uma função identidade genérica (problema central do Estudo de Caso 2).
3. **Dominar Convoluções Transpostas**: Explicar como camadas `nn.ConvTranspose2d` realizam a reconstrução espacial (*upsampling*) de mapas latentes para alta resolução.
4. **Analisar o Espaço Latente com PCA e t-SNE**: Extrair o vetor latente $Z$ e projetá-lo em 2D para verificar o agrupamento natural (*clustering*) de classes sem a presença de rótulos durante o treino.
5. **Formular a Detecção de Anomalias por Reconstrução**: Explicar por que uma rede treinada apenas com dados normais gera erro quadrático de reconstrução ($MSE$) elevado ao receber padrões anômalos.
6. **Criticar a Seleção de Limiares (Thresholds)**: Demonstrar a fragilidade da regra ingênua $\mu + 2\sigma$ sobre os dados de treino e calibrar limiares orientados pela Sensibilidade alvo requerida através de curvas ROC e Precision-Recall em conjunto rotulado.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Aprendizado Não-Supervisionado & Bottleneck] ──> [20-40 min: ConvTranspose2d & Upsampling]
                                                                                │
                                                                                ▼
[70-90 min: Gabarito Estudo de Caso 2 & Anomalias] <──── [40-70 min: Espaço Latente (t-SNE/PCA) & MSE]
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — Paradigma Auto-Supervisionado & O Gargalo de Informação**:
   - Por que treinar sem rótulos manuais: $y = x$.
   - A anatomia tripartida: Encoder $\to$ Gargalo ($Z$) $\to$ Decoder.
   - O risco do falso gargalo: o que acontece quando $\text{Dim}(Z) > \text{Dim}(X)$ (expansão dimensional em vez de compressão).
   - Demonstração no `LatentBottleneckSimulator`.

2. **Bloco 2 (20–40 min) — Autoencoders Convolucionais & Convolução Transposta**:
   - Por que autoencoders densos falham em imagens de alta resolução.
   - A operação de `nn.ConvTranspose2d`: reconstrução com stride e padding.
   - Demonstração no `AutoencoderTripartiteFunnel`.

3. **Bloco 3 (40–70 min) — Espaço Latente & Detecção de Anomalias**:
   - Extração do vetor latente $Z$ de amostras não vistas.
   - Projeção em 2D com PCA e t-SNE: clusters semânticos naturais.
   - A hipótese da variedade normal (*normal manifold*): por que anomalias não conseguem ser reconstruídas fielmente.
   - Demonstração no `LatentSpaceVisualizer`.

4. **Bloco 4 (70–90 min) — O Dilema dos Limiares & Gabarito do Estudo de Caso 2**:
   - O erro da regra empírica $\mu + 2\sigma$: por que ela ignora o trade-off de falsos negativos.
   - Curvas ROC e Precision-Recall aplicadas ao erro de reconstrução.
   - Resolução guiada dos 4 problemas do Estudo de Caso 2.
   - Síntese pedagógica e transição para Avaliação e Métricas Clínicas (Aula 09).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 18 slides visuais com funis de compressão e simuladores de threshold.
- **Simuladores Interativos:**
  1. *LatentBottleneckSimulator*: Ajuste interativo da dimensão latente $Z$, cálculo da razão de compressão e impacto na fidelidade visual.
  2. *AutoencoderTripartiteFunnel*: Visualização esquemática da compressão e expansão com contagem de neurônios.
  3. *LatentSpaceVisualizer*: Simulação 2D de agrupamentos no espaço latente via t-SNE / PCA.
  4. *AnomalyThresholdSimulator*: Simulação da distribuição de erro de reconstrução (Normal vs Anômalo) e calibração de limiares.
  5. *AutoencoderQuizWidget*: Quiz de fixação conceitual com feedback imediato.
- **Jupyter Notebook Prático:** `aula_08_autoencoders_espaco_latente_anomalias.ipynb` (Gabarito do EC2).
- **Jupyter Notebook Bônus:** `aula_08_bonus_vae_colorization.ipynb` (VAEs e colorização).
