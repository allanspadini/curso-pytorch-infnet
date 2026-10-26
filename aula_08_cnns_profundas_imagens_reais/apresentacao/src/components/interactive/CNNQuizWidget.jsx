import React, { useState } from 'react';

export default function CNNQuizWidget() {
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 1,
      question: "1. O que acontece com as conexões de vizinhança espacial quando aplicamos 'Flattening' direto em uma imagem 2D?",
      options: [
        "A) As vizinhanças são mantidas perfeitamente intactas.",
        "B) Os pixels vizinhos verticais são separados e distanciados no vetor 1D.",
        "C) O tamanho da imagem é duplicado.",
        "D) A imagem é convertida em um vetor com 3 canais de cor."
      ],
      correct: 1,
      explanation: "No Flattening, a imagem 2D é estirada linha por linha. O pixel do canto inferior perde o contato com seu vizinho da linha de cima no vetor 1D."
    },
    {
      id: 2,
      question: "2. Dada uma entrada 1D de tamanho N = 10 e um Kernel de tamanho K = 3 (com stride 1 e sem padding), quantas amostras terá a saída?",
      options: [
        "A) 10 amostras",
        "B) 8 amostras (N - K + 1 = 10 - 3 + 1)",
        "C) 7 amostras",
        "D) 30 amostras"
      ],
      correct: 1,
      explanation: "A fórmula para saída da convolução 1D sem padding é N_out = N - K + 1. Logo, 10 - 3 + 1 = 8 amostras."
    },
    {
      id: 3,
      question: "3. No PyTorch, qual é o formato correto do Tensor de uma imagem colorida RGB?",
      options: [
        "A) (Height, Width, Channels)",
        "B) (Channels, Height, Width)",
        "C) (Height * Width, Channels)",
        "D) (Channels, Height * Width)"
      ],
      correct: 1,
      explanation: "PyTorch utiliza a convenção NCHW / CHW (Channels, Height, Width). Por exemplo: torch.Size([3, 224, 224])."
    },
    {
      id: 4,
      question: "4. Qual é a principal função de uma camada de Max Pooling 2x2 com stride 2?",
      options: [
        "A) Aumentar a resolução da imagem para HD.",
        "B) Reduzir o número de parâmetros ajustáveis na camada convolucional.",
        "C) Reduzir a dimensão espacial pela metade extraindo a característica mais forte (máxima) de cada região.",
        "D) Somar os valores de todos os canais de cor em um só."
      ],
      correct: 2,
      explanation: "O Max Pooling 2x2 com stride 2 reduz a altura e a largura pela metade, retendo apenas o valor máximo da janela e fornecendo invariância espacial a pequenas translações."
    }
  ];

  const handleSelect = (qId, optIdx) => {
    if (submitted) return;
    setSelectedAnswers((prev) => ({ ...prev, [qId]: optIdx }));
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach((q) => {
      if (selectedAnswers[q.id] === q.correct) {
        score++;
      }
    });
    return score;
  };

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Consolidação de Conhecimento</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Quiz Interativo: Visão Computacional & CNNs
          </h3>
        </div>
        <div>
          {submitted ? (
            <button 
              className="btn-interactive" 
              onClick={() => { setSubmitted(false); setSelectedAnswers({}); }}
            >
              🔄 Refazer Quiz
            </button>
          ) : (
            <button 
              className="btn-interactive active" 
              onClick={() => setSubmitted(true)}
              disabled={Object.keys(selectedAnswers).length < questions.length}
            >
              ✅ Enviar Respostas
            </button>
          )}
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px', overflowY: 'auto', maxHeight: '480px' }}>
        {submitted && (
          <div style={{ background: '#ECFDF5', border: '2px solid #10B981', padding: '14px', borderRadius: '8px', color: '#065F46', textAlign: 'center', fontWeight: '700', fontSize: '1.1rem' }}>
            🎉 Você acertou {calculateScore()} de {questions.length} perguntas!
          </div>
        )}

        {questions.map((q) => {
          const selected = selectedAnswers[q.id];
          const isCorrect = selected === q.correct;

          return (
            <div 
              key={q.id} 
              style={{ 
                background: '#F8FAFC', 
                border: '1px solid #CBD5E1', 
                padding: '16px', 
                borderRadius: '8px', 
                display: 'flex', 
                flexDirection: 'column', 
                gap: '10px' 
              }}
            >
              <div style={{ fontWeight: '700', color: '#0A345D', fontSize: '0.95rem' }}>
                {q.question}
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {q.options.map((opt, idx) => {
                  const isThisSelected = selected === idx;
                  let btnBg = '#FFFFFF';
                  let btnBorder = '#CBD5E1';
                  let btnColor = '#1E293B';

                  if (isThisSelected) {
                    btnBg = '#0A345D';
                    btnBorder = '#1BB5D8';
                    btnColor = '#FFFFFF';
                  }

                  if (submitted) {
                    if (idx === q.correct) {
                      btnBg = '#10B981';
                      btnBorder = '#059669';
                      btnColor = '#FFFFFF';
                    } else if (isThisSelected && !isCorrect) {
                      btnBg = '#EF4444';
                      btnBorder = '#DC2626';
                      btnColor = '#FFFFFF';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      style={{
                        background: btnBg,
                        border: `2px solid ${btnBorder}`,
                        color: btnColor,
                        padding: '10px 14px',
                        borderRadius: '6px',
                        textAlign: 'left',
                        cursor: submitted ? 'default' : 'pointer',
                        fontSize: '0.85rem',
                        fontWeight: isThisSelected ? '700' : '500',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div style={{ background: isCorrect ? '#F0FDF4' : '#FEF2F2', borderLeft: `4px solid ${isCorrect ? '#10B981' : '#EF4444'}`, padding: '8px 12px', borderRadius: '4px', fontSize: '0.82rem', color: '#334155' }}>
                  <strong>Explicação:</strong> {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
