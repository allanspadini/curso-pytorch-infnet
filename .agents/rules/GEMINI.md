Este é um projeto de aulas sobre PyTorch para um curso de pós-graduação EAD da Faculdade Infnet.
Para as aulas, o foco principal é construir exemplos práticos com dados reais do mundo real (fontes como Kaggle e Hugging Face).

Dentro do arquivo `cronograma.csv` temos o cronograma oficial das aulas.

---

### 📁 Estrutura Obrigatória de Cada Aula (`aula_XX_<nome_da_aula>/`)

Cada aula deve ficar em uma pasta dedicada contendo a seguinte estrutura de arquivos:
- `apresentacao/` (Aplicação React + Vite com os slides interativos)
- `falas_apresentador.md` (Roteiro de narração slide por slide para o professor)
- `plano_aula.md` (Plano pedagógico da aula)
- `aula_XX_<nome_da_aula>.ipynb` (Jupyter Notebook para prática de código em PyTorch)
- `simulacao_<tema>.xlsx` (Planilha de simulação matemática sem código, quando aplicável)

---

### 💻 Padrão para Apresentações em React (`apresentacao/`)

Para a criação de apresentações, utilizaremos o framework **React** com **Vite**, seguindo estritamente a identidade visual do `Template de Slides para Aulas.odp` / `.pdf` localizado na raiz do projeto.

#### 1. Tecnologias & Dependências
- **React + Vite SPA** (`package.json`, `index.html`, `vite.config.js`).
- **KaTeX** (`katex`): Renderização de expressões matemáticas em LaTeX.
- **Lucide React** (`lucide-react`): Ícones modernos para interface.
- **Vanilla CSS / CSS Tokens**: Definição no `src/index.css` (evitar Tailwind a menos que solicitado).

#### 2. Estrutura de Componentes & Arquivos
```
apresentacao/
├── public/
│   ├── infnet_logo.png
│   └── (imagens da apresentação)
└── src/
    ├── main.jsx
    ├── index.css (tokens de cores, fontes, viewport 16:9 e animações)
    ├── App.jsx (gerenciamento de estado, atalhos de teclado e navegação)
    ├── data/
    │   └── slidesData.js (matriz central com todos os slides e propriedades)
    ├── components/
    │   ├── Header.jsx (Onda SVG cyan superior, logo da Infnet, título e subtítulo)
    │   ├── Footer.jsx (Nome do curso/instituição, atalhos, contador Slide X/Y)
    │   ├── Controls.jsx (Botões Anterior/Próximo e Autoplay)
    │   ├── NotesDrawer.jsx (Drawer lateral com falas do autor - atalho 'N')
    │   ├── OverviewModal.jsx (Grid visual com miniaturas de todos os slides - atalho 'G')
    │   ├── MathView.jsx (Renderizador de KaTeX inline e block)
    │   └── interactive/ (Componentes interativos React por aula)
    └── utils/
        └── assetHelper.js (Tratamento de caminhos de imagens)
```

#### 3. Identidade Visual & Design System (`index.css`)
- **Cores Oficiais Infnet**:
  - Dark Blue / Branding: `--infnet-dark-blue` (`#0A345D`)
  - Deep Navy / Fundo App: `--infnet-navy-deep` (`#061F38`)
  - Cyan Accent / Detalhes: `--infnet-cyan` (`#1BB5D8`) e `--infnet-cyan-light` (`#64D9EF`)
  - Green Accent / Destaques: `--infnet-green-accent` (`#7CB342`)
  - Orange / Alertas: `--infnet-orange` (`#FF7043`)
  - Purple / Variáveis: `--infnet-purple` (`#AB47BC`)
- **Tipografia**:
  - Títulos: Google Fonts `'Outfit'`, sans-serif.
  - Corpo / Textos: Google Fonts `'Inter'`, sans-serif.
  - Código / Matemática: Google Fonts `'Fira Code'`, monospace.
- **Viewport dos Slides**:
  - Moldura fixa em proporção 16:9 (`.slide-viewport`, max 1366x768px).
  - Suporte a Fullscreen puro no navegador via tecla `F` sem barras pretas.

#### 4. Recursos & Atalhos de Navegação
- `Seta Direita` / `Espaço` / `PageDown`: Próximo slide.
- `Seta Esquerda` / `PageUp`: Slide anterior.
- `Home` / `End`: Ir para o primeiro / último slide.
- `N`: Abrir/Fechar Gaveta de Falas do Apresentador (`NotesDrawer`).
- `G`: Abrir/Fechar Visão Geral / Grid de Slides (`OverviewModal`).
- `F`: Alternar modo Tela Cheia (Fullscreen).

#### 5. Formato dos Dados dos Slides (`slidesData.js`)
Cada slide no arquivo `slidesData.js` deve possuir:
- `id`: Número sequencial do slide.
- `type`: Tipo de layout (`title`, `instructor`, `roadmap`, `comparison`, `flow`, `image-text`, `formula`, `custom`, `quiz`).
- `title` e `subtitle`: Título e subtítulo do slide.
- `notes`: Texto com a fala completa do apresentador para o slide (deve ser idêntico ao arquivo `falas_apresentador.md`).
- Propriedades específicas do tipo (`steps`, `cardLeft`/`cardRight`, `component`, `formula`, `variables`, `quizQuestions`).

#### 6. Componentes Interativos (`src/components/interactive/`)
- Toda apresentação **deve conter de 3 a 5 componentes interativos React** para ilustrar os conceitos da aula (ex: simuladores de neurônio/pesos, gráficos de funções de ativação com sliders, diagramas de arquitetura com destaque visual, testes/quizzes ao final).

#### 7. Diretrizes de Qualidade dos Slides
- **Baixa densidade de texto por slide**: Prefira tópicos curtos, cards visuais, badges e ícones.
- **Vários slides por aula**: Divida o conteúdo em 15 a 25 slides por apresentação.
- **Verificação ao final**: Sempre revise o resultado final slide por slide no navegador para conferir que não existe **nenhuma informação cortada ou estourando a área visual**.
- **Acompanhamento por falas**: Todo slide deve ser acompanhado do script no `falas_apresentador.md` e na drawer `notes`.

---

### 🧠 Nível dos Blocos e Conteúdo Pedagógico

Observe que o bloco **Redes Neurais Profundas (Deep Learning e Visão Computacional)** é introdutório:
- Para os fundamentos matemáticos, pegue bem leve (público de pós-graduação particular).
- Utilize exemplos visuais e simulações em planilha (ex: Excel) antes da implementação em código.
- Tópicos do bloco Redes Neurais Profundas:
  1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch.
  2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch.
  3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais.
  4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging.
  5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais.

*Nota:* O bloco avançado de **Visão Computacional com CNNs e Transformers** será coberto no módulo seguinte, devendo o primeiro bloco focar nos fundamentos sólidos de Deep Learning e arquiteturas base.
 
