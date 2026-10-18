Este é um projeto de aulas sobre PyTorch para um curso de graduação EAD da Faculdade Infnet.
Para as aulas, o foco principal é construir exemplos práticos com dados reais do mundo real (fontes como Kaggle e Hugging Face).

---

### 📁 Estrutura Obrigatória de Cada Aula (`aula_XX_<nome_da_aula>/`)

Cada aula deve ficar em uma pasta dedicada contendo a seguinte estrutura de arquivos:
- `apresentacao/` (Aplicação React + Vite com os slides interativos)
- `falas_apresentador.md` (Roteiro de narração slide por slide para o professor)
- `plano_aula.md` (Plano pedagógico da aula)
- `aula_XX_<nome_da_aula>.ipynb` (Jupyter Notebook para prática de código em PyTorch)
- `simulacao_<tema>.xlsx` (Planilha de simulação matemática sem código, quando aplicável)

---

### 💻 Apresentações das Aulas (`apresentacao/`)

Para criar, editar, revisar ou exportar apresentações da Faculdade Infnet (`apresentacao/` e `falas_apresentador.md`), **utilize obrigatoriamente a skill global `infnet-presentations`** (`/home/allan/.gemini/config/plugins/infnet-presentations/skills/infnet-presentations/SKILL.md`).

---

### 🧠 Nível dos Blocos e Conteúdo Pedagógico

Observe que o bloco **Redes Neurais Profundas (Deep Learning e Visão Computacional)** é introdutório:
- Para os fundamentos matemáticos, pegue bem leve (público de graduação particular que só tem ensino médio como base).
- Utilize exemplos visuais e simulações em planilha (ex: Excel) antes da implementação em código.
- Tópicos do bloco Redes Neurais Profundas:
  1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch.
  2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch.
  3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais.
  4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging.
  5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais.

*Nota:* O bloco avançado de **Visão Computacional com CNNs e Transformers** será coberto no módulo seguinte, devendo o primeiro bloco focar nos fundamentos sólidos de Deep Learning e arquiteturas base.
