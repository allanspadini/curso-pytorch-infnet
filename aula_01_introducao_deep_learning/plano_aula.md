# Plano de Aula - Aula 01: Fundamentos de Deep Learning, Neurônio Artificial & Funções de Ativação

**Tema**: Conceitos de DL e Neurônio Artificial: Perceptron, ativações e combinação linear. Funcionamento na planilha com caso prático (Consumo de Creatina em Esportes) e Tensores no PyTorch.  
**Carga Horária Equivalente**: 8 horas  
**Modalidade**: EAD Pós-Graduação  

---

## 🎯 Objetivos de Aprendizagem
Ao final desta aula, o aluno será capaz de:
1. Configurar um ambiente de desenvolvimento Python moderno usando o gerenciador de pacotes `uv` e instalar o PyTorch.
2. Explicar a estrutura matemática do Perceptron (combinação linear $z = Wx + b$ e funções de ativação).
3. Demonstrar intuitivamente como funções de ativação (**Sigmoid, ReLU**) permitem resolver problemas não-lineares.
4. Demonstrar intuitivamente a importância do viés ($bias$) na movimentação da fronteira de decisão (reta linear) em um plano 2D.
5. Executar operações fundamentais de tensores no PyTorch, dominando conceitos de dimensionalidade, *broadcasting*, *slicing* e álgebra linear.
6. Programar o *Forward Pass* manual do neurônio artificial com álgebra de tensores em PyTorch.

> **Nota de Organização**: Todo o módulo prático de treinamento automático de redes neurais (usando `nn.Module`, `Autograd`, funções de perda e otimizadores) foi transferido para a **Aula 02**.

---

## 🧭 Divisão da Carga Horária Equivalente (8 Horas)

A carga horária desta aula é distribuída em 5 módulos de estudo teórico-prático autônomo, projetados para aprofundar o domínio técnico do aluno:

```
[Módulo 1: Setup Local] ──> [Módulo 2: Matemática & Planilha] ──> [Módulo 3: Funções de Ativação]
       (1.5 horas)                     (1.5 horas)                         (2.0 horas)
                                                                                │
                                                                                ▼
[Módulo 5: Forward Pass Manual] <── [Módulo 4: Bootcamp Tensores] <──────────────┘
       (1.0 hora)                      (2.0 horas)
```

---

### Módulo 1: Setup do Ambiente de Desenvolvimento (1.5 horas)
*   **Foco Prático**: Preparação de um ambiente isolado, limpo e profissional para projetos de Deep Learning.
*   **Atividades**:
    1.  Instalação do **`uv`**, gerenciador de dependências em Rust de alta performance.
    2.  Inicialização de um ambiente virtual isolado local (`uv venv`).
    3.  Instalação dos pacotes de ciência de dados e IA necessários: `torch`, `torchvision`, `pandas`, `numpy`, `matplotlib` e `ipykernel` para Jupyter.
    4.  Configuração da IDE (VS Code ou cursor) e vinculação do Kernel do Jupyter ao ambiente virtual gerado.

### Módulo 2: Matemática do Neurônio e Dinâmica da Planilha (1.5 horas)
*   **Foco Prático**: Construção da intuição geométrica da classificação linear.
*   **Planilha Utilizada**: [simulacao_perceptron.xlsx](simulacao_perceptron.xlsx)
*   **Atividades**:
    1.  **Estudo Teórico**: Análise do fluxo do Perceptron (entradas, pesos, bias, combinação linear e o limitador de probabilidade Sigmoid).
    2.  **Laboratório Manual (Planilha)**: Ajustar os pesos $W_1$, $W_2$ e o viés $b$ para zerar o erro dos 20 atletas e minimizar a Loss Total.
    3.  **Desafio Analítico**: O aluno deve tentar separar os dados forçando $b = 0$ e constatar a ancoragem na origem $(0,0)$.

### Módulo 3: Funções de Ativação e Resolução de Problemas Não-Lineares (2.0 horas)
*   **Foco Prático**: Entender por que redes profundas necessitam de não-linearidade.
*   **Atividades**:
    1.  **Estudo das Ativações**: Análise comparativa entre Sigmoid, Tanh, ReLU e Leaky ReLU.
    2.  **A Função ReLU**: Compreender por que a ReLU se tornou o padrão em Deep Learning (simplicidade computacional e combate ao desvanecimento de gradiente).
    3.  **Demonstração Gráfica**: Visualizar em código a incapacidade de modelos lineares puros em resolver dados no formato XOR vs. o sucesso de fronteiras não-lineares ativadas.

### Módulo 4: Bootcamp de Tensores no PyTorch (2.0 horas)
*   **Foco Prático**: Manipulação profissional de estruturas de dados multidimensionais.
*   **Atividades**:
    1.  **Fundamentos**: Criação de tensores, inspeção de tipos (`dtype`), dispositivos de hardware (`device`) e dimensões (`shape`).
    2.  **Operações Complexas**: *Slicing*, *Broadcasting*, e manipulação de shapes (`view()`, `unsqueeze()`).
    3.  **Álgebra de Matrizes**: Multiplicação de matrizes com o operador `@` e `torch.matmul`.

### Módulo 5: Forward Pass Manual em PyTorch (1.0 hora)
*   **Foco Prático**: Execução da inferência manual usando PyTorch sem biblioteca de otimização.
*   **Atividades**:
    1.  Conversão do DataFrame em tensores.
    2.  Execução da combinação linear $z = X @ W + b$ e da função Sigmoid.
    3.  Cálculo de acurácia manual.

---

## 🛠️ Recursos e Arquivos de Apoio
*   **Guia de Aula e Planilha**: [simulacao_perceptron.xlsx](simulacao_perceptron.xlsx)
*   **Jupyter Notebook de Prática**: [aula_01_introducao_deep_learning.ipynb](aula_01_introducao_deep_learning.ipynb)
*   **Apresentação Quarto/Reveal.js**: [apresentacao.qmd](apresentacao.qmd)
*   **Ambiente Técnico recomendado**: Python 3.10+, PyTorch 2.0+, `uv` gerenciador de pacotes.
