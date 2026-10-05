# Plano de Aula - Aula 02: Grafos de Computação, Autograd e a Primeira MLP (Previsão de Churn em SaaS)

**Tema**: Grafos de computação, Autograd e a primeira MLP (Multi-Layer Perceptron) para previsão de Churn de clientes em um SaaS de assinatura com `nn.Module`.  
**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. Explicar como o PyTorch utiliza Grafos de Computação (DAG) e o motor **Autograd** para calcular diferenciação automática via `.backward()`.
2. Implementar o ciclo estruturado de treinamento de redes neurais em 5 passos (`zero_grad`, `forward`, `loss`, `backward`, `step`).
3. Avaliar empiricamente a influência da taxa de aprendizado (*learning rate*) na convergência da curva de perda.
4. Projetar e treinar uma arquitetura de Rede Neural Multicamadas (MLP) utilizando `nn.Module`, `nn.Linear`, `nn.ReLU` e `nn.Sigmoid`.
5. Resolver um problema prático de classificação binária de Churn de clientes em uma empresa de SaaS.

---

## 🧭 Roteiro da Aula Síncrona (90 Minutos)

```
[00-20 min: Grafos & Autograd] ──> [20-40 min: Ciclo em 5 Passos] ──> [40-60 min: Lab Learning Rate]
                                                                                   │
                                                                                   ▼
[75-90 min: Avaliação & Churn] <──── [60-75 min: Arquitetura MLP SaaS] <──────────┘
```

---

## 🛠️ Recursos e Arquivos de Apoio
*   **Jupyter Notebook de Nivelamento (Prática ML)**: [aula_02_introducao_machine_learning.ipynb](aula_02_introducao_machine_learning.ipynb)
*   **Jupyter Notebook Principal**: [aula_02_autograd_mlp_churn.ipynb](aula_02_autograd_mlp_churn.ipynb)
*   **Ambiente Técnico recomendado**: Python 3.10+, PyTorch 2.0+, `uv` gerenciador de pacotes.

