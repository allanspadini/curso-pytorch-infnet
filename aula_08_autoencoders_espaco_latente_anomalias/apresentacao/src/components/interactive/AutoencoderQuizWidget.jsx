import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function AutoencoderQuizWidget() {
  const questions = [
    {
      id: 1,
      question: 'Qual é o papel fundamental do "Bottleneck" (gargalo latente) em um Autoencoder?',
      options: [
        'Aumentar o número de parâmetros da rede para memorizar todas as imagens.',
        'Forçar a rede a comprimir os dados, retendo apenas as características essenciais e eliminando ruídos.',
        'Classificar a imagem de entrada em categorias pré-definidas com Softmax.',
        'Evitar que o gradiente desapareça durante a retropropagação.'
      ],
      correct: 1,
      explanation: 'O Bottleneck restringe a capacidade da rede, obrigando-a a aprender um manifold compacto dos dados sem memorizar ruídos.'
    },
    {
      id: 2,
      question: 'O que acontece se a dimensão do espaço latente (Z) for maior do que o tamanho da imagem de entrada (X)?',
      options: [
        'O modelo alcança a compressão máxima sem perda de informação.',
        'O modelo ganha capacidade excessiva, agindo quase como uma função identidade e memorizando o input sem aprender representações úteis.',
        'O tempo de treinamento diminui drasticamente.',
        'A perda MSE se torna exatamente zero em todas as imagens.'
      ],
      correct: 1,
      explanation: 'Sem um gargalo menor que o input, o Autoencoder perde sua restrição de capacidade e passa a apenas copiar a entrada para a saída.'
    },
    {
      id: 3,
      question: 'Por que o ConvAutoencoder é superior ao Autoencoder Denso (MLP) para processamento de imagens?',
      options: [
        'Porque camadas lineares não conseguem processar valores numéricos entre 0 e 1.',
        'Porque Conv2D preserva a vizinhança espacial 2D da imagem e exige significativamente menos parâmetros graças ao compartilhamento de pesos.',
        'Porque Autoencoders Densos só funcionam com imagens em escala de cinza.',
        'Porque a convolução garante que a reconstrução seja sempre 100% perfeita.'
      ],
      correct: 1,
      explanation: 'Conv2D evita o estiramento (flattening) 1D, mantendo a topologia 2D e economizando milhões de parâmetros em relação a camadas lineares.'
    },
    {
      id: 4,
      question: 'Como um Autoencoder treinado APENAS com imagens normais detecta uma anomalia em teste?',
      options: [
        'Calculando a probabilidade da classe anômala na última camada Softmax.',
        'Ao receber uma amostra anômala, o modelo tenta projetá-la no manifold normal e falha em reconstruir o padrão anômalo, gerando um Erro MSE de reconstrução elevado.',
        'Reconstruindo a anomalia com erro zero e a imagem normal com erro alto.',
        'Parando o treinamento automaticamente assim que detecta um parasita.'
      ],
      correct: 1,
      explanation: 'Como o modelo só aprendeu a reconstruir dados normais, ele falha ao tentar reconstruir padrões anômalos que não conhece, elevando o MSE.'
    },
    {
      id: 5,
      question: 'Por que a regra estática "Threshold = mean(train) + 2 * std(train)" é inadequada para triagem médica de anomalias?',
      options: [
        'Porque ela ignora a distribuição dos erros nas amostras anômalas e pode resultar em baixíssimo Recall (muitos Falsos Negativos perigosos).',
        'Porque desvios padrões não podem ser calculados em tensores do PyTorch.',
        'Porque ela sempre resulta em 100% de Precisão.',
        'Porque o conjunto de treino já possui imagens anômalas rotuladas.'
      ],
      correct: 0,
      explanation: 'O threshold de treino ignora a distribuição anômala real. Em aplicações médicas, ajustamos o threshold em validação focado em alto Recall (Sensibilidade).'
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (idx) => {
    if (showAnswer) return;
    setSelectedOpt(idx);
  };

  const handleConfirm = () => {
    if (selectedOpt === null) return;
    setShowAnswer(true);
    if (selectedOpt === q.correct) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setShowAnswer(false);
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
    } else {
      setIsFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowAnswer(false);
    setScore(0);
    setIsFinished(false);
  };

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <HelpCircle size={20} color="#1BB5D8" />
          <h3 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: 700 }}>
            Quiz Interativo: Autoencoders e Detecção de Anomalias
          </h3>
        </div>
        <span className="card-header-badge" style={{ background: 'rgba(27,181,216,0.15)', color: '#0E7490' }}>
          Questão {currentIdx + 1} de {questions.length}
        </span>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px', width: '100%' }}>
        {!isFinished ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <h4 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: 700 }}>
              {q.question}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {q.options.map((opt, idx) => {
                let btnStyle = {
                  background: '#F8FAFC',
                  border: '1px solid #CBD5E1',
                  color: '#1E293B',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  textAlign: 'left',
                  cursor: 'pointer',
                  fontSize: '0.9rem',
                  transition: 'all 0.15s ease',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                };

                if (selectedOpt === idx) {
                  btnStyle.background = '#E0F2FE';
                  btnStyle.borderColor = '#1BB5D8';
                  btnStyle.color = '#0A345D';
                  btnStyle.fontWeight = '600';
                }

                if (showAnswer) {
                  if (idx === q.correct) {
                    btnStyle.background = '#DCFCE7';
                    btnStyle.borderColor = '#22C55E';
                    btnStyle.color = '#15803D';
                    btnStyle.fontWeight = '700';
                  } else if (selectedOpt === idx && idx !== q.correct) {
                    btnStyle.background = '#FEE2E2';
                    btnStyle.borderColor = '#EF4444';
                    btnStyle.color = '#B91C1C';
                  }
                }

                return (
                  <button
                    key={idx}
                    style={btnStyle}
                    onClick={() => handleSelect(idx)}
                    disabled={showAnswer}
                  >
                    <span>{String.fromCharCode(65 + idx)})</span>
                    <span style={{ flex: 1 }}>{opt}</span>
                    {showAnswer && idx === q.correct && <CheckCircle size={18} color="#166534" />}
                    {showAnswer && selectedOpt === idx && idx !== q.correct && <XCircle size={18} color="#991B1B" />}
                  </button>
                );
              })}
            </div>

            {showAnswer && (
              <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '12px', borderRadius: '8px', fontSize: '0.85rem', color: '#0369A1' }}>
                💡 <strong>Explicação:</strong> {q.explanation}
              </div>
            )}

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
              {!showAnswer ? (
                <button
                  className="btn-interactive active"
                  onClick={handleConfirm}
                  disabled={selectedOpt === null}
                >
                  Confirmar Resposta
                </button>
              ) : (
                <button className="btn-interactive active" onClick={handleNext}>
                  {currentIdx < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                </button>
              )}
            </div>
          </div>
        ) : (
          <div style={{ textAlignment: 'center', width: '100%', padding: '20px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '14px' }}>
            <h3 style={{ color: '#0A345D', fontSize: '1.4rem', fontWeight: 800 }}>
              🎉 Quiz Concluído!
            </h3>
            <p style={{ fontSize: '1.1rem', color: '#475569' }}>
              Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> questões ({((score / questions.length) * 100).toFixed(0)}%).
            </p>
            <button className="btn-interactive active" onClick={handleRestart} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <RotateCcw size={16} /> Reiniciar Quiz
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
