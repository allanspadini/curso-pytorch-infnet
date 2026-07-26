# Plano de Aula - Aula 02: Grafos de Computação, Autograd e a Primeira MLP (Previsão de Churn em SaaS)

**Tema**: Grafos de computação, Autograd e a primeira MLP (Multi-Layer Perceptron) para previsão de Churn de clientes em um SaaS de assinatura com `nn.Module`.  
**Carga Horária Equivalente**: 8 horas  
**Modalidade**: EAD Pós-Graduação  

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. Explicar como o PyTorch utiliza Grafos de Computação (DAG) e o motor **Autograd** para calcular diferenciação automática via `.backward()`.
2. Implementar o ciclo estruturado de treinamento de redes neurais em 5 passos (`zero_grad`, `forward`, `loss`, `backward`, `step`).
3. Avaliar empiricamente a influência da taxa de aprendizado (*learning rate*) na convergência da curva de perda.
4. Projetar e treinar uma arquitetura de Rede Neural Multicamadas (MLP) utilizando `nn.Module`, `nn.Linear`, `nn.ReLU` e `nn.Sigmoid`.
5. Resolver um problema prático de classificação binária de Churn de clientes em uma empresa de SaaS.

---

## 🧭 Divisão da Carga Horária Equivalente (8 Horas)

```
[Módulo 1: Grafos & Autograd] ──> [Módulo 2: Treinamento do Perceptron] ──> [Módulo 3: Lab Learning Rate]
       (2.0 horas)                         (2.0 horas)                         (1.5 horas)
                                                                                    │
                                                                                    ▼
[Módulo 5: Avaliação & Churn] <── [Módulo 4: Arquitetura MLP SaaS] <────────────────┘
       (1.0 hora)                          (1.5 horas)
```

---

## 🛠️ Recursos e Arquivos de Apoio
*   **Jupyter Notebook de Prática**: [aula_02_autograd_mlp_churn.ipynb](aula_02_autograd_mlp_churn.ipynb)
*   **Ambiente Técnico recomendado**: Python 3.10+, PyTorch 2.0+, `uv` gerenciador de pacotes.
