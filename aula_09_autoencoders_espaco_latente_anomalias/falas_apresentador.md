# Roteiro de Narração do Apresentador — Aula 08
## Autoencoders Convolucionais, Espaço Latente e Detecção de Anomalias

**Duração da Aula Síncrona**: 1h30 (90 minutos)  
**Modalidade**: Graduação EAD (Faculdade Infnet)  
**Professor**: Allan Spadini  

---

### Slide 1: Título & Abertura
> "Olá a todos e sejam muito bem-vindos à nossa oitava aula de Redes Neurais Profundas!
>
> Nas aulas anteriores, treinamos modelos supervisionados, onde tínhamos rótulos explícitos para cada exemplo. Mas o que fazer quando temos milhões de dados e quase nenhum rótulo? Ou quando queremos detectar defeitos em peças industriais, fraudes financeiras ou anomalias médicas onde os casos anômalos são raríssimos?
>
> Hoje exploraremos o aprendizado auto-supervisionado com Autoencoders. Entenderemos a arquitetura tripartida formada por Encoder, Bottleneck e Decoder, descobriremos por que a restrição de capacidade do gargalo é essencial para evitar funções identidade banais, projetaremos representações com t-SNE e PCA, e construiremos um sistema completo de detecção de anomalias por erro de reconstrução.
>
> Esta aula fornece todo o embasamento teórico e prático para resolver o Estudo de Caso 2 da disciplina. Vamos começar!"

---

### Slide 2: Apresentação do Professor
> "Meu nome é Allan Spadini. Trabalhar com dados sem rótulos é uma das áreas mais valiosas da IA moderna. Hoje veremos como extrair representações semânticas ricas sem supervisão humana."

---

### Slide 3: Roteiro & Objetivos da Aula
> "Nosso roteiro de 90 minutos cobrirá:
> Primeiro, o conceito de tarefa auto-supervisionada onde o alvo é a própria entrada.
> Segundo, a função crítica do gargalo de informação.
> Terceiro, como descompactar imagens com Convoluções Transpostas.
> Quarto, como inspecionar o espaço latente com t-SNE.
> E quinto, como transformar erro de reconstrução em um detector de anomalias, resolvendo os problemas do Estudo de Caso 2."

---

### Slide 4: Supervisionado vs. Auto-Supervisionado
> "A grande sacada dos Autoencoders é eliminar a dependência de anotação manual.
> Ao definir o objetivo de perda como o erro de reconstrução entre a entrada original $x$ e a saída $\hat{x}$, criamos uma tarefa auto-supervisionada gratuita que força a rede a aprender os padrões essenciais da distribuição."

---

### Slide 5: A Estrutura Tripartida do Autoencoder
> "Vejam na tela o famoso formato de ampulheta (ou funil duplo):
> O Encoder pega uma imagem grande e vai comprimindo progressivamente suas dimensões.
> No centro está o Bottleneck (espaço latente $Z$): um vetor compacto de baixa dimensão.
> Em seguida, o Decoder pega esse vetor comprimido e tenta reconstruir a imagem original em alta resolução."

---

### Slide 6: O Perigo da Expansão no Bottleneck
> "Este é o primeiro grande problema do Estudo de Caso 2 da disciplina:
> O engenheiro declarou que construiu um Autoencoder, mas a saída do seu encoder tinha 8.192 neurônios para uma entrada de apenas 4.096 pixels!
> Em vez de um afunilamento, ele criou uma expansão de duas vezes. A rede simplesmente memorizou os valores por transporte direto sem aprender representações úteis."

---

### Slide 7: Simulador Interativo: Dimensão do Bottleneck
> "Utilizem este simulador interativo na tela.
> Vocês podem arrastar o slider do tamanho do vetor latente $Z$ de 2 até 512.
> Notem o equilíbrio delicado: se $Z$ for muito pequeno (ex: 2), a imagem reconstruída fica borrada. Se $Z$ for gigante (ex: 512), a compressão é fraca. O ponto ótimo comprime drasticamente os dados preservando contornos semânticos nítidos."

---

### Slide 8: Autoencoder Denso vs. Convolucional
> "Assim como aprendemos na Aula 06, esticar imagens para MLPs densas é ineficiente.
> No Autoencoder Convolucional, preservamos a geometria 2D do início ao fim: o Encoder reduz a resolução espacial com convoluções, e o Decoder a restaura com Convoluções Transpostas."

---

### Slide 9: A Convolução Transposta no PyTorch
> "A camada `nn.ConvTranspose2d` faz o caminho inverso da convolução comum:
> Se uma `Conv2d` com stride 2 divide a resolução por 2, a `ConvTranspose2d` com stride 2 multiplica a resolução por 2! Ela insere zeros entre os pixels e aplica o filtro de pesos aprendidos para preencher os detalhes com suavidade."

---

### Slide 10: Inspeção do Espaço Latente com PCA e t-SNE
> "O vetor latente $Z$ vive em um espaço de 32 ou 64 dimensões que o olho humano não consegue enxergar.
> Para auditar se a rede realmente aprendeu conceitos inteligentes, usamos algoritmos de projeção como PCA ou t-SNE. Quando plotamos os pontos em 2D, descobrimos que dígitos iguais ou folhas saudáveis se agrupam naturalmente em ilhas semânticas!"

---

### Slide 11: Visualizador Interativo: O Espaço Latente 2D
> "Neste simulador na tela, observem como os dados normais se agrupam em clusters definidos.
> Agora notem os pontos vermelhos (anomalias): eles caem em regiões vazias do espaço latente, longe das variedades normais aprendidas pelo modelo."

---

### Slide 12: A Hipótese da Variedade Normal
> "Aqui está o princípio fundamental da detecção de anomalias com Autoencoders:
> Se você treinar a rede apenas com peças perfeitas, o modelo se torna um especialista em reconstruir peças perfeitas.
> Quando uma peça rachada ou manchada entra na rede, o gargalo não sabe representar a rachadura. O decoder tenta 'consertar' a peça, gerando uma diferença gigante entre entrada e saída. Esse erro elevado é o nosso alarme de anomalia!"

---

### Slide 13: O Escore de Anomalia por Erro MSE
> "O escore de anomalia é simplesmente a média dos erros quadráticos de todos os pixels da imagem.
> Definimos um limiar $\tau$: qualquer imagem cujo erro de reconstrução ultrapasse $\tau$ é classificada como anomalia. Mas como escolher esse limiar $\tau$? Esse é o cerne da discussão a seguir."

---

### Slide 14: Simulador Interativo: Calibração de Thresholds
> "Utilizem o simulador na tela.
> Vejam as duas distribuições sobrepostas: a curva azul representa os erros das amostras normais e a curva vermelha representa os erros das anomalias.
> Mexam na linha do threshold: se colocarem a linha muito para a direita, muitos defeitos passarão despercebidos (falsos negativos). Se colocarem muito para a esquerda, peças normais serão descartadas (falsos positivos)."

---

### Slide 15: Crítica à Regra Ingênua: $\mu + 2\sigma$
> "Atenção total para o Estudo de Caso 2:
> O engenheiro do caso calculou o limiar usando $\mu + 2\sigma$ apenas sobre as perdas do conjunto de treino.
> Isso é um erro metodológico grave: o treino não contém anomalias! A regra pressupõe arbitrariamente que 95% dos dados são normais e os 5% da cauda são defeitos. O resultado foi um desastre: Recall de apenas 37%, deixando 63% das peças com defeito passarem livres para os clientes!"

---

### Slide 16: Quiz de Fixação: Autoencoders & Detecção de Anomalias
> "Vamos testar nosso domínio!
> Respondam às perguntas interativas sobre a razão de compressão do gargalo, a camada correta de upsampling e a melhor estratégia para escolher limiares de decisão."

---

### Slide 17: Gabarito Síntese: Estudo de Caso 2
> "Aqui está o resumo definitivo do que vocês devem argumentar no Estudo de Caso 2:
> 1. O bottleneck era uma expansão de 2x ($8.192 > 4.096$).
> 2. Não houve inspeção latente via t-SNE.
> 3. O limiar $\mu + 2\sigma$ foi calculado de forma ingênua sobre o treino.
> 4. A correção eleva o Recall de 37% para mais de 90%, protegendo o negócio de falhas catastróficas."

---

### Slide 18: Próximos Passos: Aula 09
> "Na nossa próxima aula — Aula 09 —, abordaremos a Avaliação Crítica e Métricas em Datasets Desbalanceados, resolvendo o Estudo de Caso 1 (Triagem de Malária). Muito obrigado a todos e até a próxima!"
