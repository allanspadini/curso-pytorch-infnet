import React, { useState } from 'react';

export default function QuizWidget() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: '1. O que ocorre se aplicarmos o StandardScaler ANTES da divisão train_test_split?',
      options: [
        { text: 'A) Vazamento de Dados (Data Leakage), pois a média e o desvio do teste contaminam o treino.', correct: true },
        { text: 'B) O treinamento fica mais estável, pois usa a distribuição completa.', correct: false },
        { text: 'C) O PyTorch bloqueia a criação do DataLoader.', correct: false },
        { text: 'D) Não há impacto algum nas métricas de produção.', correct: false }
      ],
      explanation: 'Ajustar (.fit) o escalador antes do split contamina o treino com informações do teste, gerando acurácia ilusória que cai em produção.'
    },
    {
      question: '2. Quais são os 3 métodos obrigatórios em uma classe que herda de torch.utils.data.Dataset?',
      options: [
        { text: 'A) __init__, __len__ e __getitem__', correct: true },
        { text: 'B) __init__, forward e backward', correct: false },
        { text: 'C) fit, transform e fit_transform', correct: false },
        { text: 'D) zero_grad, step e eval', correct: false }
      ],
      explanation: '__init__ armazena os tensores, __len__ retorna o total de amostras e __getitem__(idx) busca um par (X[idx], y[idx]).'
    },
    {
      question: '3. Por que NÃO colocamos nn.Softmax() na última camada ao usar nn.CrossEntropyLoss()?',
      options: [
        { text: 'A) Porque a nn.CrossEntropyLoss já aplica LogSoftmax internamente sobre os logits brutos com estabilidade numérica.', correct: true },
        { text: 'B) Porque redes multiclasse usam Sigmoid na saída.', correct: false },
        { text: 'C) Porque o DataLoader já normaliza as probabilidades.', correct: false },
        { text: 'D) Porque o PyTorch só aceita saídas entre -1 e 1.', correct: false }
      ],
      explanation: 'Passar Softmax antes da CrossEntropyLoss aplicaria a exponencial duas vezes e prejudicaria a estabilidade numérica do gradiente.'
    },
    {
      question: '4. Na regressão contínua, o que significa um modelo obter R² = 0.0 no conjunto de teste?',
      options: [
        { text: 'A) O modelo tem o mesmo erro de um baseline trivial que chuta sempre a média global (ȳ).', correct: true },
        { text: 'B) O modelo acertou 100% das previsões sem nenhum resíduo.', correct: false },
        { text: 'C) O erro absoluto médio (MAE) foi exatamente zero dólares.', correct: false },
        { text: 'D) O DataLoader estava com shuffle=True no teste.', correct: false }
      ],
      explanation: 'Por definição matemática, R² = 0 equivale a chutar sempre a média ȳ. Nossa rede neural precisa superar expressivamente esse baseline!'
    }
  ];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    if (questions[currentQ].options[idx].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setSelectedOpt(null);
    } else {
      setShowResult(true);
    }
  };

  const q = questions[currentQ];

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '20px', color: '#1E293B' }}>
      {!showResult ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.88rem', color: '#0284C7', fontWeight: '800' }}>
              ❓ Questão {currentQ + 1} de {questions.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#475569', fontWeight: '700' }}>
              Pontuação: {score} / {questions.length}
            </span>
          </div>

          <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', marginBottom: '14px', color: '#0A345D' }}>
            {q.question}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              let bg = '#FFFFFF';
              let border = '#CBD5E1';
              let textColor = '#1E293B';

              if (selectedOpt !== null) {
                if (opt.correct) {
                  bg = '#F0FDF4';
                  border = '#16A34A';
                  textColor = '#166534';
                } else if (isSelected) {
                  bg = '#FFF7ED';
                  border = '#FF7043';
                  textColor = '#9A3412';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{
                    background: bg,
                    border: `2px solid ${border}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: textColor,
                    fontWeight: '600',
                    textAlign: 'left',
                    fontSize: '0.9rem',
                    cursor: selectedOpt === null ? 'pointer' : 'default',
                    transition: 'all 0.15s ease'
                  }}
                >
                  {opt.text}
                </button>
              );
            })}
          </div>

          {selectedOpt !== null && (
            <div style={{ background: '#EFF6FF', padding: '12px', borderRadius: '8px', borderLeft: '4px solid #0284C7', marginBottom: '12px' }}>
              <div style={{ fontWeight: '800', color: '#0A345D', fontSize: '0.85rem', marginBottom: '2px' }}>💡 Feedback:</div>
              <div style={{ fontSize: '0.85rem', color: '#1E293B' }}>{q.explanation}</div>
            </div>
          )}

          {selectedOpt !== null && (
            <div style={{ textAlign: 'right' }}>
              <button
                onClick={handleNext}
                style={{ background: '#0284C7', color: '#FFFFFF', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {currentQ < questions.length - 1 ? 'Próxima Questão ➔' : 'Ver Resultado Final 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', color: '#0A345D', marginBottom: '6px' }}>
            Quiz Concluído!
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#334155', marginBottom: '14px' }}>
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> questões ({Math.round((score / questions.length) * 100)}%).
          </p>

          <button
            onClick={() => {
              setCurrentQ(0);
              setSelectedOpt(null);
              setShowResult(false);
              setScore(0);
            }}
            style={{ background: '#16A34A', color: '#FFFFFF', border: 'none', borderRadius: '20px', padding: '8px 22px', fontWeight: '800', cursor: 'pointer', fontSize: '0.88rem' }}
          >
            🔄 Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
