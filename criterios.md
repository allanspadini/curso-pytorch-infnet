Uso de IAs: Sinal Verde 🟢
Neste trabalho, os alunos são incentivados a explorar o uso de ferramentas baseadas em IA para concluir as tarefas. Todas as fontes, incluindo ferramentas de IA, devem ser devidamente citadas. O uso de IA sem a devida citação será considerado má conduta acadêmica e estará sujeito à aplicação do código disciplinar. Observe que os resultados da IA podem ser tendenciosos e imprecisos. É sua responsabilidade garantir que as informações que você usa da IA sejam precisas. Aprender como usar ferramentas baseadas em IA de maneira cuidadosa e estratégica contribui para o desenvolvimento das habilidades, refinamento de seu trabalho e prepara o aluno para sua futura carreira.

Abrir o capô de uma rede neural e construí-la do zero, camada por camada, acompanhando cada gradiente que passa: é o que esta disciplina propõe. Você vai entender como um modelo aprende (backpropagation, gradientes, inicialização de pesos), como controlar esse aprendizado (otimizadores, regularização, scheduling de LR) e como saber se ele está funcionando (curvas de loss, métricas, diagnóstico de treinamento). O PyTorch é o framework ao longo de todo o percurso.

O projeto está organizado em três partes. Nos Projetos 1 e 2 você constrói e diagnostica seus próprios modelos. Nos Estudos de Caso você atua como engenheiro de IA revisando implementações com problemas reais: identificando o que está errado, explicando por que e propondo correções.

Projeto 1: Pipeline MLP
O primeiro projeto cobre o pipeline fundamental de deep learning de ponta a ponta. Você escolhe um problema aplicado, constrói um MLP do zero em PyTorch e o leva até um estado de treinamento estável e diagnosticado.

O ponto de partida é o ambiente: PyTorch, Jupyter (ou Google Colab) e TensorBoard configurados e verificados antes de qualquer treinamento. A partir daí, você implementa o MLP usando nn.Module, definindo explicitamente cada camada, função de ativação e forward pass, sem abstrações de alto nível como PyTorch Lightning. A arquitetura não é arbitrária: você justifica a escolha de profundidade e largura em relação ao problema, analisa empiricamente o efeito de pelo menos duas funções de ativação diferentes nas curvas de loss e documenta o impacto da inicialização de pesos (Xavier ou He) comparada à inicialização padrão do PyTorch.

O training loop deve incluir DataLoader, ciclo de validação por época e checkpointing via state_dict que permite recarregar o melhor modelo e reproduzir predições. Além do problema de classificação, você implementa uma variante de regressão com MSE loss e avalia com MAE, RMSE e R². A estabilidade do treinamento é tratada como requisito, não como bônus: você analisa gradient norms para diagnosticar vanishing ou exploding gradients, implementa BatchNorm ou LayerNorm comparando o efeito nas curvas de loss, aplica Dropout verificando o impacto no gap treino/validação e configura Adam ou AdamW com learning rate scheduling monitorado no TensorBoard.

O relatório cobre o diagnóstico completo do treinamento. Para as métricas, use o conjunto de teste, não o de validação, e documente um baseline não trivial para referência. As curvas de loss devem ser analisadas com nome explícito para o fenômeno observado (overfitting, underfitting, instabilidade ou convergência). Ao menos um problema real identificado nos seus experimentos deve ser descrito com hipótese formulada antes da correção, correção aplicada e efeito medido: gradient norm, spike de loss ou distribuição de ativações como evidência objetiva. Para classificação, inclua a interpretação da matriz de confusão com hipótese sobre os padrões de erro observados no seu dado específico.

Projeto 2: Arquitetura Especializada
No Projeto 1 você dominou o pipeline fundamental em redes densas. O Projeto 2 parte de um problema novo e aplica esse mesmo pipeline a uma arquitetura especializada, com todas as decisões de design, diagnóstico e avaliação que você já praticou, agora sobre um tipo de dado estruturado: imagens ou sequências temporais.

Você escolhe o problema e a arquitetura. A escolha deve ser deliberada: o problema precisa de estrutura espacial ou temporal que torne a arquitetura escolhida a opção mais adequada. A justificativa dessa decisão é parte do projeto. O pipeline de treinamento é o mesmo do Projeto 1, mas os hiperparâmetros precisam ser reavaliados para o novo domínio, pois não há valores padrão transferíveis automaticamente.

Etapa 1: Implementação

Escolha uma arquitetura entre CNN, LSTM e GRU:

Arquitetura	Tipo de dado	Domínios típicos
CNN	Imagens 2D ou sinais 1D com estrutura espacial	Classificação de imagens médicas, detecção de padrões em espectrogramas
LSTM	Séries temporais com dependências de longo prazo	Previsão de demanda, análise de anomalias em logs, classificação de sequências
GRU	Séries temporais onde eficiência computacional importa	Previsão de sinal, monitoramento de sensores, sequências curtas a médias
Você deve:

Implementar a arquitetura escolhida em PyTorch com design justificado: número de filtros ou hidden units, profundidade, stride/padding ou window size devem ter razões técnicas conectadas ao problema e ao dado.
Aplicar o mesmo pipeline de treinamento do Projeto 1: DataLoader, validação por época, checkpoint do melhor modelo, LR scheduling e TensorBoard. Os hiperparâmetros devem ser adaptados ao novo tipo de dado (não copiados do Projeto 1).
Calcular métricas adequadas ao problema e compará-las com um baseline não trivial.
Diagnóstico e Avaliação (mesmos critérios do Projeto 1):

Calcular métricas no conjunto de teste com baseline comparativo documentado.
Analisar curvas de loss e nomear o comportamento de treinamento observado.
Diagnosticar pelo menos um problema real com hipótese e medição do efeito da correção.
Interpretar erros do modelo por classe (classificação) ou por padrão temporal e espacial (regressão), com hipótese sobre a causa.
Etapa 2: Análise de Alternativas Arquiteturais

Em contextos profissionais, a escolha de arquitetura é uma decisão de design com trade-offs explícitos, não uma escolha automática pelo tipo de dado. CNNs foram aplicadas com sucesso a séries temporais (detecção de padrões locais com filtros 1D), LSTMs foram usadas em classificação de imagens linha a linha e GRUs competem com LSTMs em tarefas de texto e sinal. Compreender quando uma arquitetura não canônica é viável, e quando não é, faz parte da competência de um engenheiro de IA.

Você deve:

Escreva uma análise de 400 a 600 palavras respondendo às seguintes questões:

Proposta alternativa: para o mesmo problema que você resolveu na Etapa 1, descreva como uma arquitetura de uma família diferente poderia abordá-lo. Se escolheu CNN, proponha LSTM ou GRU para o mesmo dado. Se escolheu LSTM ou GRU, proponha CNN 1D. A proposta deve especificar como o dado seria estruturado para a arquitetura alternativa (ex: imagem tratada como sequência de linhas; série temporal tratada como sinal 1D com janela fixa).
Trade-offs: quais propriedades da arquitetura alternativa são vantajosas para este problema específico e quais são limitantes? A comparação deve ser técnica: mencione inductive bias, capacidade de capturar dependências de longo prazo vs. padrões locais, custo computacional ou requisitos de dados.
Referência: cite um artigo ou trabalho publicado que demonstre a abordagem alternativa sendo aplicada em um contexto semelhante (não necessariamente o mesmo domínio). Inclua título, autores e DOI ou URL.
Exemplos de propostas esperadas (ilustrativos, não prescritivos):

CNN para imagens médicas → LSTM processando linhas da imagem como sequência temporal, comparando a capacidade de capturar correlações entre linhas vs. filtros 2D que capturam correlações espaciais bidimensionais.
LSTM para séries temporais → CNN 1D com filtros de tamanhos variados detectando padrões locais em múltiplas escalas, discutindo quando a suposição de invariância translacional é válida em dados temporais.
GRU para sequências → CNN 1D no estilo TextCNN com filtros de 32, 64 e 128 timesteps, analisando o trade-off entre receptive field fixo vs. memória adaptativa do GRU.
Estudos de Caso: Diagnóstico de Projetos em Campo
Como engenheiro de IA, você frequentemente receberá projetos em andamento para revisar, auditar ou assumir. A capacidade de ler uma implementação existente, identificar o que está errado e propor correções fundamentadas é tão importante quanto saber implementar do zero.

Para cada estudo de caso a seguir, você receberá o contexto do problema, a arquitetura implementada, a configuração de treinamento e os resultados obtidos. Sua tarefa, para cada caso:

Diagnóstico: identifique todos os problemas que você encontrou: arquiteturais, de dados, de configuração de treinamento ou de avaliação. Para cada problema, cite a linha de código, o valor de configuração ou o resultado que o evidencia.
Proposta de correção: para cada problema identificado, proponha uma mudança concreta com justificativa técnica. Nomeie o parâmetro ou componente a alterar e o valor ou estratégia que você usaria.
Estimativa de impacto: para pelo menos dois problemas, estime quantitativamente o que você esperaria ver após a correção. Por exemplo: "redução do gap train/test de ~25pp para ~5pp com adição de Dropout 0.4 e BatchNorm" ou "aumento da Sensibilidade de 57% para ≥ 80% com class weights na CrossEntropyLoss".
Estudo de Caso 1: CNN para Triagem de Malária em Imagens de Células Sanguíneas
Contexto clínico

O diagnóstico de malária por microscopia é o padrão ouro da OMS: uma amostra de sangue é espalhada em lâmina de vidro (esfregaço sanguíneo), corada e examinada sob microscópio para identificar células infectadas pelo parasita Plasmodium. Em regiões endêmicas da África subsaariana, esse processo é feito manualmente por microscopistas treinados: análise lenta, sujeita a erro humano e dependente de infraestrutura laboratorial.

Sistemas de visão computacional automatizados têm potencial para acelerar triagem em campo, mas para uso clínico aprovado precisam atingir critérios de diagnóstico estabelecidos. Para ferramentas de triagem de malária, o limiar clínico exigido é:

Sensibilidade ≥ 95%: a fração de casos positivos (parasitados) corretamente identificados. Sensibilidade baixa significa parasitemia não detectada e transmissão sem tratamento.
Especificidade ≥ 95%: a fração de casos negativos (não infectados) corretamente identificados. Especificidade baixa significa tratamento desnecessário com antimaláricos, que têm efeitos colaterais relevantes.
O projeto

Um engenheiro desenvolveu um classificador de células sanguíneas. O dataset contém 16.279 imagens de células individuais, sendo 13.779 não infectadas e 2.500 parasitadas (proporção aproximada de 85%/15%), divididas em 80% treino e 20% teste. Cada imagem tem dimensão 3×112×112 pixels.

Ao final do desenvolvimento, o engenheiro reportou:

"Acurácia de 88,3% no conjunto de teste. O sistema está pronto para avaliação de certificação."

Implementação:

class MalariaClassifier(nn.Module):
    def __init__(self):
        super().__init__()
        self.features = nn.Sequential(
            nn.Conv2d(3, 32, kernel_size=7, padding=3), # sem BatchNorm
            nn.ReLU(),
            nn.MaxPool2d(2), # -> 56x56
            nn.Conv2d(32, 64, kernel_size=7, padding=3), # sem BatchNorm
            nn.ReLU(),
            nn.MaxPool2d(2), # -> 28x28
            nn.Conv2d(64, 128, kernel_size=7, padding=3), # sem BatchNorm
            nn.ReLU(),
            nn.MaxPool2d(2), # -> 14x14
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(128 * 14 * 14, 2048), # sem Dropout
            nn.ReLU(),
            nn.Linear(2048, 2),
        )

    def forward(self, x):
        return self.classifier(self.features(x))
Configuração de treinamento:

optimizer = torch.optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
criterion = nn.CrossEntropyLoss() # sem class_weight
# batch_size=64, epochs=30
# Sem LR scheduler
# Sem loop de validação (apenas loss de treino monitorada)
# Pré-processamento: ToTensor() + Normalize() apenas, sem data augmentation
Log de treinamento (conjunto de treino apenas):

Época	train_loss	train_acc
1	0.631	0.71
5	0.398	0.84
10	0.281	0.88
20	0.164	0.91
30	0.092	0.94
Avaliação no conjunto de teste (3.256 imagens: 2.756 não infectadas + 500 parasitadas):

Métrica	Valor
Acurácia	88,3%
F1 (parasitada)	0.60
Matriz de confusão (teste):

Previsto: Não infectada	Previsto: Parasitada
Real: Não infectada	2.589 (TN)	167 (FP)
Real: Parasitada	213 (FN)	287 (TP)
Tarefa:

Avalie se a conclusão do engenheiro ("pronto para certificação") é tecnicamente defensável. Use a matriz de confusão para calcular as métricas clínicas relevantes, compare com os critérios exigidos e identifique todos os problemas que você encontrou na implementação (de avaliação, de treinamento e de arquitetura). Para cada problema, aponte a evidência concreta que o sustenta.
Para cada problema identificado, proponha uma correção específica com justificativa técnica. Ao menos duas propostas devem incluir uma estimativa quantitativa do impacto esperado nas métricas clínicas.
O projeto foi desenvolvido sem loop de validação. Descreva como você instrumentaria o treinamento para monitorar as métricas clínicas relevantes por época e como usaria esse sinal para checkpoint e early stopping.
Estudo de Caso 2: Autoencoder Convolucional para Detecção de Anomalias em Células
Contexto

Continuando no mesmo domínio de diagnóstico de malária, um segundo engenheiro propôs uma abordagem não supervisionada: treinar um autoencoder convolucional apenas com células não infectadas e usar o erro de reconstrução como sinal de anomalia. A hipótese é que o modelo aprende a reconstruir bem células normais e células parasitadas (que ele nunca viu no treino) terão erro de reconstrução sistematicamente maior.

As imagens foram convertidas para escala de cinza (1 canal) e redimensionadas para 64×64 pixels.

Implementação:

class CellAutoencoder(nn.Module):
    def __init__(self):
        super().__init__()
        self.encoder = nn.Sequential(
            nn.Conv2d(1, 16, kernel_size=3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2), # -> 16 x 32 x 32
            nn.Conv2d(16, 32, kernel_size=3, padding=1), nn.ReLU(),
            nn.MaxPool2d(2), # -> 32 x 16 x 16
        )
        self.decoder = nn.Sequential(
            nn.ConvTranspose2d(32, 16, kernel_size=2, stride=2), nn.ReLU(),
            nn.ConvTranspose2d(16, 1, kernel_size=2, stride=2),
            nn.Sigmoid(),
        )

    def forward(self, x):
        return self.decoder(self.encoder(x))
Configuração de treinamento:

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.MSELoss()
# Treinado apenas com 6.889 células não infectadas
# batch_size=32, epochs=30
# Sem loop de validação
# Threshold: mean(train_loss) + 2 * std(train_loss)
Log de treinamento:

Época	train_loss
1	0.1823
5	0.0641
10	0.0412
20	0.0289
30	0.0243
Threshold calculado ao final do treino: 0.0243 + 2 × 0.0041 = 0.0325

Avaliação (500 não infectadas + 500 parasitadas):

Grupo	Reconstruction loss médio	Desvio padrão
Não infectadas	0.0261	0.0038
Parasitadas	0.0308	0.0049
Com threshold = 0.0325:

Métrica	Valor
Precision	0.66
Recall	0.37
F1	0.48
Tarefa:

Calcule as dimensões do espaço latente e compare com as dimensões do input. O que esse cálculo revela sobre o papel do "bottleneck" nesta arquitetura?
Explique como o tamanho do espaço latente afeta a capacidade do modelo de discriminar células normais de anômalas. Por que a diferença entre os erros de reconstrução (0.0261 vs. 0.0308) é tão pequena?
Proponha uma arquitetura revisada com um espaço latente de dimensão adequada. Justifique a escolha da nova dimensão com base na relação entre complexidade do dado e nível de compressão desejado.
O threshold foi definido como mean + 2σ sobre o conjunto de treino. Proponha uma estratégia de seleção de threshold mais robusta para uso clínico, explicando por que a abordagem atual é inadequada.
O engenheiro não visualizou o espaço latente. Descreva o que você esperaria ver em uma visualização t-SNE ou UMAP do espaço latente de um autoencoder bem treinado para esta tarefa e o que a ausência dessa análise deixa sem resposta.
Estudo de Caso 3: LSTM para Previsão de Temperatura (Jena Climate Dataset)
Contexto

O Jena Climate Dataset contém medições horárias de 14 variáveis meteorológicas coletadas na estação climática de Jena, Alemanha, cobrindo vários anos de dados. A temperatura no dataset varia de aproximadamente −22°C a +37°C (amplitude de 59°C).

A tarefa é prever a temperatura (T em °C) das próximas 24 horas com base em uma janela de 720 timesteps (30 dias de dados horários). Um sistema assim tem aplicação direta em planejamento energético, onde erros de previsão acima de 2–3°C impactam diretamente o despacho de energia e os custos operacionais de distribuidoras.

Um engenheiro desenvolveu o modelo abaixo. Além das 14 variáveis originais do dataset, ele extraiu hora_do_dia (0–23) e mes (1–12) a partir do timestamp e os incluiu como features adicionais, totalizando input_size=16. Ambas foram usadas como inteiros sem transformação adicional.

Implementação:

class TemperatureForecaster(nn.Module):
    def __init__(self):
        super().__init__()
        self.lstm = nn.LSTM(
            input_size=16,
            hidden_size=128,
            num_layers=3,
            dropout=0.2,
            batch_first=True,
        )
        self.fc = nn.Linear(128, 1)

    def forward(self, x):
        out, _ = self.lstm(x)
        return self.fc(out[:, -1, :])
Configuração de treinamento:

optimizer = torch.optim.Adam(model.parameters(), lr=0.001)
criterion = nn.MSELoss()
# Janela: 720 timesteps; stride: 1
# Split temporal: 70% treino / 15% val / 15% teste (ordem cronológica preservada)
# batch_size=256, epochs=50
# Sem gradient clipping
# Sem LR scheduling
Log de treinamento:

Época	train_loss	val_loss	Gradient norm máximo
1	0.841	0.923	14.73
5	0.382	0.410	3.41
10	0.213	0.388	1.82
20	0.146	0.381	0.93
30	0.102	0.380	0.71
50	0.081	0.380	0.62
Avaliação no conjunto de teste:

Métrica	Valor
MAE	3.8°C
RMSE	5.1°C
Observações registradas pelo engenheiro:

"O modelo captura a tendência geral da temperatura, mas falha consistentemente nos picos de calor no verão e nos vales mais frios do inverno."

"A validação loss parou de melhorar por volta da época 10, mas deixei o treinamento continuar até a 50."

"Nas primeiras épocas houve muita instabilidade no loss."

Tarefa:

O engenheiro usou hora_do_dia (0–23) e mes (1–12) como inteiros lineares. Explique o problema de representação que isso cria para o modelo e como corrigi-lo. Forneça a transformação matemática e os novos nomes de features resultantes.
O gradient norm atingiu 14.73 na época 1. Identifique o problema, cite a técnica padrão para tratá-lo e especifique o valor que você configuraria para este problema.
A val_loss praticamente não mudou entre a época 10 (0.388) e a época 50 (0.380). Qual técnica de treinamento teria permitido um refinamento mais eficiente após a convergência inicial? Descreva a configuração que você usaria.
O modelo tem 3 camadas LSTM com hidden_size=128. Avalie se essa complexidade é proporcional ao problema, considerando o gap entre train_loss (0.081) e val_loss (0.380). Proponha uma alternativa justificada.
Proponha a substituição do LSTM por GRU: quais linhas de código mudam, quais parâmetros se alteram e qual impacto você esperaria nas métricas de teste e no tempo de treinamento para este problema específico?
Entregáveis
Código (Projetos 1 e 2)

Repositório Git ou pacote compactado com todos os notebooks e scripts para reproduzir os dois projetos:

Executa do início ao fim sem modificações manuais (exceto o caminho do dataset)
Inclui requirements.txt ou environment.yml com versões
Estrutura clara separando Projeto 1 e Projeto 2
Arquivos de checkpoint (.pt) dos melhores modelos ou instruções de reprodução
Relatório técnico (PDF)

Documento estruturado cobrindo:

Projeto 1: definição do problema, decisões de arquitetura e sua justificativa, resultados, seção de diagnóstico com pelo menos um problema identificado e corrigido
Projeto 2, Implementação: arquitetura escolhida, decisões de design, resultados, diagnóstico
Projeto 2, Análise de Alternativas: proposta cross-paradigma de 400 a 600 palavras com referência publicada
Estudos de Caso: respostas estruturadas aos três casos (diagnóstico, proposta, estimativa de impacto)
Nome do arquivo: nome_sobrenome_deep-learning-and-vision_deep-neural-networks.pdf

Logs do TensorBoard

Arquivo runs/ cobrindo os treinamentos dos Projetos 1 e 2, com curvas de loss de treino e validação, learning rate e pelo menos uma métrica de performance por época.

Sumário de avaliação
Oculto para estudantes	Não
Participantes	49
Enviado	0
Precisa de avaliação	0
Data de entrega	segunda, 24 ago 2026, 23:59
Tempo restante	5 dias 7 horas
Status da entrega
Número da tentativa	Esta é a tentativa 1 (2 tentativas permitidas).
Status da entrega	Nenhuma tentativa
Status da avaliação	Não avaliado
Data de entrega	segunda, 24 ago 2026, 23:59
Tempo restante	5 dias 7 horas
Rubrica	
Template de Rubrica para ser utilizado com a extensão Rubricator

1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch
 O aluno implementou um MLP completo em PyTorch com nn.Module, forward pass explícita e training loop manual sem frameworks de alto nível?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch
 O aluno analisou o impacto de funções de ativação diferentes no fluxo de gradientes com comparação empírica?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch
 O aluno implementou inicialização de pesos Xavier ou He e documentou o efeito no treinamento comparado à inicialização padrão?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch
 O aluno projetou a arquitetura do MLP com justificativa explícita para profundidade e largura conectada ao problema específico?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
1. Projetar redes neurais profundas do zero com fundamentos matemáticos e PyTorch
 O aluno demonstrou compreensão do ciclo forward→loss→backward→step descrevendo o fluxo com suas próprias palavras e referenciando comportamentos observados?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch
 O aluno implementou o training loop com DataLoader, validação por época e checkpoint do melhor modelo via state_dict?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch
 O aluno comparou pelo menos duas técnicas de estabilização de treinamento com evidência nas curvas de loss do TensorBoard?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch
 O aluno configurou Adam ou AdamW com learning rate scheduling e mostrou o efeito do decaimento nas curvas de treinamento?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch
 O aluno diagnosticou gradientes problemáticos no seu experimento com medição objetiva e aplicou correção documentada?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
2. Implementar o ciclo de treinamento estável de redes neurais com PyTorch
 O aluno aplicou o pipeline de treinamento profissional à arquitetura do Projeto 2 com hiperparâmetros adaptados ao novo domínio?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais
 O aluno calculou métricas adequadas ao tipo de problema no conjunto de teste, com baseline comparativo não trivial documentado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais
 O aluno analisou curvas de loss e accuracy nomeando explicitamente o fenômeno observado com referência a gráficos reais?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais
 O aluno diagnosticou pelo menos um problema real com hipótese formulada antes da correção e medição do efeito após?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
3. Construir arquiteturas convolucionais e autoencoders para extração de representações visuais
 O aluno interpretou a matriz de confusão identificando padrões de erro por classe com hipótese sobre a causa específica ao seu dado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging
 O aluno calculou Sensibilidade e Especificidade a partir da matriz de confusão do EC1 e avaliou corretamente se os critérios clínicos foram atingidos?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging
 O aluno identificou a causa raiz da baixa Sensibilidade no EC1 (CrossEntropyLoss sem class_weight em dataset desequilibrado) e propôs pelo menos duas soluções com mecanismo técnico explicado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging
 O aluno diagnosticou que o "bottleneck" do EC2 é uma expansão dimensional (32×16×16=8.192 > 1×64×64=4.096) e explicou a consequência para a tarefa de detecção de anomalias?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging
 O aluno propôs uma dimensão de espaço latente adequada para o EC2 e justificou com base na relação entre complexidade do dado e nível de compressão desejado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
4. Avaliar o treinamento de redes neurais com métricas e ferramentas de debugging
 O aluno propôs estratégia de threshold mais robusta para o EC2 e descreveu o que esperaria ver em uma visualização t-SNE do espaço latente de um autoencoder bem treinado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais
 O aluno identificou o problema de representação de features cíclicas no EC3 e forneceu a transformação sin/cos correta com os valores das fórmulas?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais
 O aluno identificou os picos de gradient norm no EC3, nomeou o problema e propôs gradient clipping com o valor de max_norm justificado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais
 O aluno diagnosticou o plateau de val_loss e propôs LR scheduling com o tipo e hiperparâmetros do scheduler especificados?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais
 O aluno avaliou a proporcionalidade da arquitetura (3 camadas LSTM) ao problema e propôs alternativa fundamentada no gap train/val observado?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
5. Implementar redes recorrentes LSTM e GRU para modelagem de dados sequenciais
 O aluno propôs a substituição por GRU com as mudanças de código corretas e analisou o impacto esperado para o problema específico de previsão climática?	
Não demonstrou o item de rubrica
Demonstrou o item de rubrica
