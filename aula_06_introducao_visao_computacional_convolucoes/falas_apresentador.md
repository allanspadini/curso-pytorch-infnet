# Roteiro de Narração do Apresentador — Aula 06
## Introdução à Visão Computacional e Redes Convolucionais (CNNs)

**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Professor**: Allan Spadini  

---

### Slide 1: Título & Abertura
> "Olá a todos e sejam muito bem-vindos à nossa sexta aula de Redes Neurais Profundas!
>
> Hoje iniciamos nosso módulo de Visão Computacional. Até a aula passada, tratávamos cada dado como uma lista de números tabulares independentes. Mas quando olhamos para uma imagem, os pixels não são independentes: eles possuem uma geometria espacial bidimensional sagrada!
>
> Veremos por que achatar uma imagem com Flattening para alimentar uma rede densa comum é um erro estrutural grave. Em seguida, descobriremos como a operação de Convolução 2D, os Kernels detectores de bordas e as camadas de Pooling transformaram a visão por computador, permitindo que máquinas reconheçam formas e objetos com alta precisão e baixíssimo consumo de parâmetros. Vamos começar!"

---

### Slide 2: Arquitetura do Perceptron Multicamadas (MLP)
> "Para compreender a revolução das convoluções, começamos recapitulando a arquitetura elementar de um Perceptron Multicamadas (MLP):
> Na tela, temos uma rede densa com 2 entradas (x1 e x2).
> Essas duas entradas conectam-se integralmente aos 2 neurônios da camada oculta (h1 e h2). Notem que cada linha sináptica possui um peso dedicado (w11, w12, w21, w22) e cada neurônio conta com um bias de deslocamento.
> Por fim, as ativações dos neurônios intermediários são combinadas pelos pesos v1 e v2 para gerar a predição estimada final ŷ.
> Experimentem clicar nos neurônios para inspecionar suas operações e acionem 'Simular Forward' para acompanhar a propagação do sinal."

---

### Slide 3: Como as Contas se Conectam: O Forward Pass
> "Vejam como a conta é simples e direta, exatamente como as funções do ensino médio!
> Para cada neurônio da camada oculta, fazemos apenas 3 passos:
> 1. Multiplicamos a primeira entrada pelo seu peso: w11 vezes x1.
> 2. Multiplicamos a segunda entrada pelo seu peso: w21 vezes x2.
> 3. Somamos tudo, adicionamos um número extra chamado bias (b1), e passamos o resultado por uma função f(·).
> Essa função f é a função de ativação. Ela apenas decide o que passar para frente.
> Na saída, repetimos a mesma lógica: pegamos as respostas h1 e h2, multiplicamos pelos pesos v1 e v2, somamos o bias da saída e aplicamos a função f para encontrar a estimativa final ŷ. Isso é o Forward Pass: a informação andando para frente!"

---

### Slide 4: Minimização da Função Objetivo por Época
> "Agora, como a rede aprende? Como sabemos se a estimativa ŷ está boa ou ruim?
> A resposta é a Função Objetivo (Loss). Ela mede exatamente a 'diferença' entre o que conhecemos nos dados de treino (o gabarito y) e o que o modelo acabou de estimar (ŷ).
> Usem o simulador na tela:
> Na Época 1, o gabarito real y vale 1.0, mas a rede estimou apenas 0.15. A diferença é enorme (0.85), e por isso a bolinha laranja está lá no alto da curva de perda!
> Ao avançar as épocas, o otimizador ajusta os parâmetros. Na Época 5, a estimativa já sobe para 0.68 e a diferença cai para 0.32.
> Na Época 25, a estimativa chega a 0.98: a diferença praticamente zera e a bolinha atinge o ponto de mínimo no fundo da bacia parabólica! Treinar uma rede é simplesmente fazer essa diferença convergir a zero."

---

### Slide 5: Como os Pesos Aprendem: O Backpropagation
> "E como a rede melhora a cada época? Como ela sabe para onde mexer nos pesos?
> No lado esquerdo da tela, vocês veem a intuição simplificada:
> Primeiro, calculamos o Erro: y menos ŷ. Se a rede acertou em cheio, o erro é zero e ninguém precisa mudar!
> Segundo, o novo peso é o peso antigo mais um ajuste Delta w.
> Agora olhem para o canto direito separado: o ajuste Delta w não é uma mágica inventada. Ele é calculado formalmente pela Regra da Cadeia e pela derivada da função de perda!
> O ajuste é igual à taxa de aprendizado vezes o erro (y - ŷ), vezes a derivada da ativação f'(z), vezes o valor da entrada x.
> No PyTorch, não precisamos fazer essa conta na mão: quando chamamos perda.backward(), o motor do Autograd calcula essa derivada exata para cada peso da rede!"

---

### Slide 6: O Que é Uma Imagem Digital?
> "Agora que temos consolidada a mecânica da MLP em dados vetoriais, como lidamos quando os dados são imagens?
> Para um computador, uma imagem em escala de cinza nada mais é do que uma grade bidimensional de números!
> Cada célula é um pixel variando de 0 (preto absoluto) a 255 (branco absoluto). No PyTorch, dividimos por 255.0 para obter números float entre 0.0 e 1.0, estabilizando os gradientes."

---

### Slide 7: Explorador Interativo de Matrizes de Pixels
> "Usem o simulador interativo na tela.
> Ao passar o mouse sobre a imagem do gato, vocês conseguem ver os valores exatos de cada pixel.
> Notem o botão de Flattening: ao esticarmos essa matriz 2D em um vetor unidimensional para entrar na MLP comum, pixels vizinhos verticalmente são afastados por centenas de posições! A geometria espacial é quebrada e a quantidade de pesos explode. É por isso que precisamos das Convoluções!"

---

### Slide 8: Intuição Unidimensional da Convolução
> "Antes de irmos para 2D, vejam a intuição 1D na tela.
> Temos um filtro com 3 pesos. Ele desliza sobre o sinal fazendo a multiplicação e soma.
> Notem que os MESMOS pesos são reutilizados em todas as posições: isso é o Compartilhamento de Parâmetros (*Parameter Sharing*)!"

---

### Slide 9: A Matemática da Convolução 2D
> "A equação parece densa, mas a mecânica é muito simples:
> Posicionamos o filtro (por exemplo, 3x3) sobre um pedaço da imagem.
> Multiplicamos cada pixel pelo seu peso correspondente no filtro, somamos tudo e geramos um único número no mapa de saída. Depois, deslizamos a janela para o lado e repetimos!"

---

### Slide 10: Simulador Passo a Passo da Convolução 2D
> "Neste simulador, vocês podem clicar em 'Próximo Passo' e ver a janela amarela se movimentando.
> Observem a conta matemática sendo resolvida no painel lateral em tempo real: multiplicação elemento a elemento seguida pela soma. Cada célula do mapa de saída resume um pedaço local da imagem."

---

### Slide 11: Kernels Clássicos de Processamento de Imagens
> "Na computação clássica, engenheiros passavam meses projetando filtros manuais de Sobel ou Gabor.
> A grande revolução do Deep Learning é que os valores do kernel não são fixos: eles são os tensores de parâmetros da rede! É a própria retropropagação que descobre quais filtros são mais úteis para resolver a tarefa."

---

### Slide 12: Cálculo da Dimensão de Saída Convolucional
> "Memorizem esta fórmula geométrica: ela é necessária para calcular a transição exata das camadas convolucionais para a camada densa `nn.Linear`.
> Se temos uma imagem 28x28, com kernel 3x3, padding 0 e stride 1:
> $(28 - 3 + 0)/1 + 1 = 26$. A imagem de saída terá dimensão 26x26!"

---

### Slide 13: Padding (Preenchimento) & Stride (Passo)
> "O Padding resolve o problema do encolhimento: sem padding, após algumas camadas sua imagem de 28x28 vira 1x1! Com padding='same', a imagem mantém seu tamanho espacial.
> Já o Stride define o ritmo: stride=2 faz a janela pular de 2 em 2 pixels, realizando uma redução de resolução embutida."

---

### Slide 14: Simulador Interativo: Max Pooling vs. Average Pooling
> "Experimentem o simulador de Pooling na tela.
> Em uma janela 2x2 com stride 2:
> O Max Pooling pega o maior valor da janela. Ele atua como um detector de presença: 'se a característica foi detectada em qualquer um dos 4 pixels, passe adiante!'
> O Average Pooling calcula a média, tendendo a suavizar e diluir contrastes fortes."

---

### Slide 15: Por Que o Max Pooling Domina?
> "O Max Pooling possui dois superpoderes:
> Primeiro, invariância a pequenas translações: não importa em qual dos 4 pixels a borda apareceu, o valor máximo sai intacto.
> Segundo, economia brutal de computação: ao reduzir pela metade altura e largura, ele corta em 4 vezes o número de cálculos da próxima camada, sem acrescentar um único peso treinável!"

---

### Slide 16: A Arquitetura da Primeira CNN em PyTorch
> "Esta é a estrutura clássica de uma CNN:
> Na primeira fase, usamos blocos de Convolução + ReLU + Pooling para extrair características visuais ricas (bordas, curvas, círculos).
> Apenas na saída, quando os mapas já estão pequenos e altamente conceituais, aplicamos o Flattening e passamos por uma camada linear simples para gerar os 10 logits de saída!"

---

### Slide 17: Quiz de Fixação: Fundamentos de CNNs
> "Vamos testar nosso domínio sobre convoluções!
> Respondam às questões interativas sobre cálculo de dimensões, as falhas do flattening e o funcionamento das camadas de subamostragem."

---

### Slide 18: Síntese da Aula & Conexão com o Projeto 2
> "Neste resumo, conectamos a aula de hoje com a Etapa 2 do Projeto 2:
> A justificativa de por que escolher uma CNN em vez de uma MLP para dados visuais repousa sobre três pilares: viés indutivo de localidade 2D, compartilhamento de parâmetros e invariância translacional."

---

### Slide 19: Próximos Passos: Aula 07
> "Na nossa próxima aula — Aula 07 —, dominaremos o motor de otimização e diagnóstico de treinamento no PyTorch:
> Veremos como usar o AdamW, configurar LR Schedulers para destravar platôs, monitorar a norma dos gradientes com Gradient Clipping e rastrear tudo ao vivo no TensorBoard — ferramentas essenciais tanto para fechar o Projeto 1 quanto para treinar nossas CNNs profundas em imagens RGB reais na Aula 08. Parabéns pelo foco de hoje e até a próxima aula!"
