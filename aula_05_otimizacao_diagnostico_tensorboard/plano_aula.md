# Plano de Aula - Aula 05: Otimização Avançada, Diagnóstico de Gradientes e TensorBoard

**Tema**: Motores de otimização em Deep Learning (SGD com Momentum, RMSprop, Adam e AdamW), agendamento de taxa de aprendizado (LR Schedulers), diagnóstico quantitativo de normas de gradientes ($\|\nabla L\|_2$), Gradient Clipping, persistência de checkpoints via `state_dict` e monitoramento visual profissional com o TensorBoard.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Conexão com a Avaliação**: Fecha todos os requisitos de entrega do **Projeto 1: Pipeline MLP** (Adam/AdamW com LR scheduling, diagnóstico de gradientes, checkpoints de pesos e gráficos no TensorBoard).

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. **Diferenciar Algoritmos de Otimização**: Explicar como Momentum e taxas adaptativas superam ravinas de curvatura patológica no espaço de perda, dominando as vantagens do **AdamW** com desacoplamento do *Weight Decay*.
2. **Configurar Agendadores de Taxa de Aprendizado (LR Schedulers)**: Implementar estratégias de decaimento dinâmico (`StepLR` e `ReduceLROnPlateau`) para permitir passos grandes no início do treino e refinamento no mínimo global.
3. **Calcular e Diagnosticar Gradient Norms**: Implementar rotinas para medição de $\|\nabla_\theta L\|_2$ por época, identificando precocemente riscos de *Vanishing* ou *Exploding Gradients*.
4. **Aplicar Gradient Clipping**: Utilizar `torch.nn.utils.clip_grad_norm_` para conter saltos desproporcionais causados por lotes anômalos.
5. **Gerenciar Checkpoints com `state_dict`**: Salvar pesos do melhor modelo baseado na menor perda de validação e restabelecer o estado completo para inferência determinística.
6. **Integrar o TensorBoard**: Rastrear curvas de loss de treino e validação, evolução de LR, histogramas de pesos e normas de gradientes em tempo real via `SummaryWriter`.
7. **Aplicar Otimização Bayesiana com Optuna**: Estruturar estudos automatizados para encontrar a melhor combinação de hiperparâmetros.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Da Inércia ao AdamW] ──> [20-40 min: LR Schedulers & Platôs] ──> [40-65 min: Diagnóstico de Gradientes & Clipping]
                                                                                                 │
                                                                                                 ▼
[80-90 min: Optuna & Síntese Projeto 1] <──── [65-80 min: Checkpoints & TensorBoard na Prática] <┘
```

### Detalhamento dos Blocos:
1. **Bloco 1 (00–20 min) — A Física da Otimização: Do SGD ao AdamW**:
   - Por que o SGD puro oscila em vales estreitos.
   - O conceito de inércia física do Momentum.
   - Taxas de aprendizado adaptativas (RMSprop e Adam).
   - A correção matemática do AdamW: por que desacoplar a penalização $L_2$.
   - Demonstração no `LROptimizerSimulator`.

2. **Bloco 2 (20–40 min) — Agendamento de Taxa de Aprendizado (LR Schedulers)**:
   - A importância de desacelerar: por que uma taxa fixa perde o mínimo global.
   - `StepLR`: redução em intervalos regulares de épocas.
   - `ReduceLROnPlateau`: redução orientada pela estagnação da perda de validação.

3. **Bloco 3 (40–65 min) — Diagnóstico de Gradientes & Gradient Clipping**:
   - Medição da norma euclidiana $\|\nabla L\|_2$ de todos os parâmetros.
   - Diagnóstico: quando o gradiente desvanece ($\to 0$) vs quando explode ($> 10$).
   - O remédio para picos: `torch.nn.utils.clip_grad_norm_(model.parameters(), max_norm=1.0)`.
   - Demonstração no `TrainingDiagnosticsWidget` e `GradientFlowSimulator`.

4. **Bloco 4 (65–80 min) — Checkpointing e Monitoramento com TensorBoard**:
   - Salvamento seguro: `torch.save(model.state_dict(), 'best_model.pt')`.
   - Inicialização do `SummaryWriter(log_dir='runs/...')`.
   - Rastreamento em tempo real de curvas de loss, LR e gradientes.

5. **Bloco 5 (80–90 min) — Introdução ao Optuna & Checklist do Projeto 1**:
   - Amostragem bayesiana de hiperparâmetros com TPE.
   - Checklist definitivo de entrega do Projeto 1.
   - Síntese pedagógica e transição para o módulo de Visão Computacional (Aula 06).

---

## 🛠️ Recursos Didáticos & Tecnologias
- **Apresentação Interativa em React + Vite (`apresentacao/`):** 17 slides dinâmicos com diagramas e visualizadores de convergência.
- **Simuladores Interativos:**
  1. *LROptimizerSimulator*: Comparativo da trajetória de SGD, Momentum e Adam sobre superfícies de perda não-convexas.
  2. *TrainingDiagnosticsWidget*: Monitoramento de curvas de gradientes e métricas em tempo real.
  3. *GradientFlowSimulator*: Inspeção do fluxo de gradientes camada por camada.
  4. *QuizWidget*: Perguntas de fixação sobre otimização e diagnóstico.
- **Ferramentas de Engenharia:** PyTorch, TensorBoard (`SummaryWriter`), Optuna.
- **Jupyter Notebook Prático:** `aula_05_otimizacao_diagnostico_tensorboard.ipynb`.
