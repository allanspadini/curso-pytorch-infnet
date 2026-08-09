import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RotateCcw } from 'lucide-react';

export default function QuizWidget() {
  const questions = [
    {
      question: "Por que funções de ativação não-lineares (como ReLU ou Tanh) são indispensáveis entre camadas lineares de uma MLP?",
      options: [
        "Para acelerar a velocidade de execução da GPU durante o forward pass.",
        "Sem elas, o empilhamento de múltiplas camadas lineares se reduz a uma única transformação linear equivalente.",
        "Para garantir que todos os pesos sejam inicializados obrigatoriamente com zero.",
        "Para converter tensores de ponto flutuante em números inteiros."
      ],
      correct: 1,
      explanation: "A combinação de duas matrizes lineares W2 * W1 é apenas outra matriz linear W. A não-linearidade é a única responsável pela capacidade da rede em aprender fronteiras complexas."
    },
    {
      question: "Qual método de inicialização de pesos foi especificamente formulado para compensar a metade nula da função de ativação ReLU?",
      options: [
        "Inicialização com Zeros (nn.init.zeros_)",
        "Inicialização Xavier / Glorot (nn.init.xavier_uniform_)",
        "Inicialização He / Kaiming (nn.init.kaiming_normal_)",
        "Inicialização Uniforme Simples U(-1, 1)"
      ],
      correct: 2,
      explanation: "Como a ReLU zera a metade negativa das entradas (diminuindo a variância pela metade), a inicialização He/Kaiming multiplica o fator de escala por √(2/n_in) para preservar a variância das ativações."
    },
    {
      question: "Qual técnica de regularização desativa aleatoriamente uma porcentagem de neurônios durante cada passo de treinamento para evitar overfitting?",
      options: [
        "Batch Normalization",
        "Dropout",
        "Gradient Clipping",
        "Learning Rate Decay"
      ],
      correct: 1,
      explanation: "O Dropout (nn.Dropout) força a rede a aprender representações redundantes sem depender de co-adaptações excessivas entre neurônios específicos."
    },
    {
      question: "Por que as métricas de desempenho final devem ser avaliadas exclusivamente no conjunto de TESTE e nunca no conjunto de validação?",
      options: [
        "Porque o conjunto de teste é utilizado para calcular o gradiente do backpropagation.",
        "Porque o conjunto de validação é usado para tomar decisões de hiperparâmetros (checkpointing), podendo sofrer vazamento sutil de informação.",
        "Porque o conjunto de teste é sempre menor que o de validação.",
        "Não existe diferença; ambos os conjuntos podem ser intercalados livremente."
      ],
      correct: 1,
      explanation: "Como ajustamos os hiperparâmetros e selecionamos o melhor modelo baseado na loss de validação, a validação fica levemente 'viciada'. O conjunto de teste é o único avaliador 100% neutro."
    }
  ];

  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [completed, setCompleted] = useState(false);

  const q = questions[currentIdx];

  const handleSelect = (idx) => {
    if (showResult) return;
    setSelectedOpt(idx);
    setShowResult(true);
    if (idx === q.correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
      setSelectedOpt(null);
      setShowResult(false);
    } else {
      setCompleted(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowResult(false);
    setScore(0);
    setCompleted(false);
  };

  return (
    <div style={{
      background: 'rgba(6, 31, 56, 0.85)',
      border: '1px solid rgba(27, 181, 216, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      color: '#FFFFFF'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1BB5D8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
          <HelpCircle size={20} /> Quiz de Fixação de Conhecimentos
        </h3>
        {!completed && (
          <span style={{ fontSize: '0.85rem', color: '#A0AEC0', fontWeight: 'bold' }}>
            Pergunta {currentIdx + 1} de {questions.length}
          </span>
        )}
      </div>

      {!completed ? (
        <div>
          <h4 style={{ margin: '0 0 15px 0', fontSize: '1rem', color: '#E2E8F0', lineHeight: '1.4' }}>
            {q.question}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '15px' }}>
            {q.options.map((opt, idx) => {
              let btnStyle = {
                padding: '10px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                background: 'rgba(255, 255, 255, 0.04)',
                color: '#CBD5E0',
                textAlign: 'left',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              };

              if (showResult) {
                if (idx === q.correct) {
                  btnStyle.background = 'rgba(124, 179, 66, 0.25)';
                  btnStyle.border = '1px solid #7CB342';
                  btnStyle.color = '#FFFFFF';
                } else if (idx === selectedOpt) {
                  btnStyle.background = 'rgba(255, 112, 67, 0.25)';
                  btnStyle.border = '1px solid #FF7043';
                  btnStyle.color = '#FFFFFF';
                }
              }

              return (
                <button key={idx} onClick={() => handleSelect(idx)} style={btnStyle}>
                  {opt}
                </button>
              );
            })}
          </div>

          {showResult && (
            <div style={{
              padding: '12px',
              borderRadius: '8px',
              background: selectedOpt === q.correct ? 'rgba(124, 179, 66, 0.15)' : 'rgba(255, 112, 67, 0.15)',
              border: `1px solid ${selectedOpt === q.correct ? '#7CB342' : '#FF7043'}`,
              marginBottom: '15px'
            }}>
              <strong style={{ color: selectedOpt === q.correct ? '#7CB342' : '#FF7043', display: 'flex', alignItems: 'center', gap: '6px' }}>
                {selectedOpt === q.correct ? <CheckCircle size={16} /> : <XCircle size={16} />}
                {selectedOpt === q.correct ? 'Resposta Correta!' : 'Resposta Incorreta.'}
              </strong>
              <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#CBD5E0' }}>{q.explanation}</p>
            </div>
          )}

          {showResult && (
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
                onClick={handleNext}
                style={{
                  padding: '8px 18px',
                  borderRadius: '6px',
                  background: '#1BB5D8',
                  color: '#0A345D',
                  fontWeight: 'bold',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                {currentIdx + 1 < questions.length ? 'Próxima Pergunta →' : 'Ver Resultado Final'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <h3 style={{ color: '#7CB342', margin: '0 0 10px 0' }}>Parabéns! Quiz Concluído!</h3>
          <p style={{ fontSize: '1.1rem', color: '#E2E8F0' }}>
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> perguntas.
          </p>
          <button
            onClick={handleRestart}
            style={{
              marginTop: '15px',
              padding: '10px 20px',
              borderRadius: '6px',
              background: '#1BB5D8',
              color: '#0A345D',
              fontWeight: 'bold',
              border: 'none',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <RotateCcw size={16} /> Reiniciar Quiz
          </button>
        </div>
      )}
    </div>
  );
}
