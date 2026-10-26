# Plano de Aula - Aula 09: Avaliação Crítica de Modelos e Métricas sob Desbalanceamento

**Tema**: A falácia da acurácia em problemas desbalanceados, matriz de confusão, métricas clínicas de risco (Sensibilidade/Recall, Especificidade, PR-AUC, $F_\beta$ com $\beta = 2.0$), função de perda com ponderação de classes em `torch.nn.CrossEntropyLoss(weight=...)`, calibração de probabilidades (ECE e Temperature Scaling), ajuste fino de limiares (*Threshold Tuning*) e resolução conceitual do Estudo de Caso 1 (Triagem de Malária).  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Gabarito conceitual e prático completo do **Estudo de Caso 1: CNN para Triagem de Malária em Células Sanguíneas**.

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Desmascarar a Falácia da Acurácia**: Explicar analiticamente por que uma acurácia de 88,3% pode mascarar uma Sensibilidade desastrosa de 57,4% quando o dataset tem 85% de casos negativos e 15% de casos positivos.
2. **Dominar Métricas da Matriz de Confusão**: Calcular e interpretar Verdadeiros/Falsos Positivos e Negativos, distinguindo formalmente **Sensibilidade / Recall** (prioridade clínica $\ge 95\%$) de **Especificidade**.
3. **Comparar Curvas ROC-AUC vs Precision-Recall (PR-AUC)**: Compreender por que a curva ROC é excessivamente otimista sob desbalanceamento severo e por que a curva PR-AUC é a ferramenta adequada para eventos raros.
4. **Ponderar Perdas no Treinamento**: Implementar pesos de classe inversamente proporcionais à frequência em `torch.nn.CrossEntropyLoss(weight=class_weights)`.
5. **Calibrar o Limiar de Decisão (*Threshold Tuning*)**: Mover a linha de corte de probabilidade da regra ingênua ($0.5$) para atender critérios rigorosos de segurança e matrizes de custo.
6. **Diagnosticar Superconfiança e Calibrar Probabilidades**: Explicar o Expected Calibration Error (ECE) e aplicar Temperature Scaling para transformar logits em probabilidades honestas.
7. **Resolver o Estudo de Caso 1 (Triagem de Malária)**: Identificar os 5 erros críticos do projeto original e propor as correções quantitativas com impacto esperado.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: A Falácia da Acurácia & Matriz de Confusão] ──> [20-45 min: Sensibilidade, Especificidade & PR-AUC]
                                                                                │
                                                                                ▼
[70-90 min: Gabarito Estudo de Caso 1 (Malária)] <──── [45-70 min: Perda Ponderada, Threshold Tuning & ECE]
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — A Falácia da Acurácia & O Dilema Clínico**:
   - O que acontece quando 85% das amostras são negativas: o modelo que chuta sempre "sadio" atinge 85% de acurácia sem salvar ninguém.
   - Anatomia da Matriz de Confusão 2x2: TP, FP, FN, TN.
   - Demonstração no `ConfusionThresholdSimulator`.

2. **Bloco 2 (20–45 min) — Métricas Rigorosas sob Desbalanceamento**:
   - A exigência da OMS para malária: Sensibilidade $\ge 95\%$ e Especificidade $\ge 95\%$.
   - O perigo do falso negativo (paciente infectado liberado sem remédio) vs falso positivo (remédio desnecessário).
   - $F_\beta$ Score: quando Recall importa mais que Precision ($\beta = 2.0$).
   - PR-AUC vs ROC-AUC.

3. **Bloco 3 (45–70 min) — Mitigação no PyTorch: Class Weights & Thresholds**:
   - Configurando `weight = [1.0, 5.67]` no `CrossEntropyLoss`.
   - Movendo o limiar de corte de 0.5 para 0.25 para capturar casos raros.
   - Calibração de probabilidades (ECE) e Temperature Scaling.
   - Demonstração no `CalibrationVisualizer` e `SurrogateLossVisualizer`.

4. **Bloco 4 (70–90 min) — Gabarito do Estudo de Caso 1 (Malária)**:
   - Diagnóstico dos 5 erros: dataset desbalanceado sem peso, falta de loop de validação, ausência de BatchNorm/Dropout, kernels $7 \times 7$ gigantes e camada densa superdimensionada.
   - Proposta de arquitetura corrigida e estimativa de impacto quantitativo (Sensibilidade saltando de 57,4% para $\ge 95\%$).
   - Perguntas, síntese e transição para o módulo de Dados Sequenciais (Aula 10).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 18 slides visuais com simuladores de threshold e diagramas de calibração.
- **Simuladores Interativos:**
  1. *ConfusionThresholdSimulator*: Ajuste interativo do limiar de probabilidade e observação em tempo real do trade-off Sensibilidade vs Especificidade.
  2. *CalibrationVisualizer*: Gráficos de calibração e diagnóstico de Expected Calibration Error (ECE).
  3. *BootstrapSimulator*: Reamostragem com intervalos de confiança de 95% para métricas de teste.
  4. *SurrogateLossVisualizer*: Demonstração do dilema $\nabla = 0$ em métricas degrau vs perdas contínuas.
  5. *ModelEvalQuizWidget*: Quiz de fixação com foco nas armadilhas de avaliação clínica.
- **Jupyter Notebook Prático:** `aula_09_avaliacao_metricas_desbalanceamento.ipynb` (Gabarito do EC1).
