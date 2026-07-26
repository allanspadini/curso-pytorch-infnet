import React, { useState } from 'react';

export default function QuizWidget() {
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const questions = [
    {
      id: 'q1',
      question: '1. Qual é a principal função do Viés (Bias - b) no Perceptron?',
      options: [
        'Aumentar o número de parâmetros da GPU sem utilidade prática.',
        'Deslocar a reta/plano de decisão para que ela não seja forçada a passar pela origem (0,0).',
        'Garantir que a saída do neurônio seja sempre um número inteiro entre 0 e 100.'
      ],
      correct: 1,
      explanation: 'O Bias desloca a fronteira de decisão. Sem ele, a reta de decisão seria obrigada a passar pela origem (0,0).'
    },
    {
      id: 'q2',
      question: '2. Por que a ReLU superou a Sigmoid nas camadas ocultas de redes profundas?',
      options: [
        'Sua derivada é constante e igual a 1 para entradas positivas, combatendo o desvanecimento do gradiente.',
        'A ReLU produz probabilidades entre 0 e 1 perfeitamente calibradas.',
        'A ReLU é uma função complexa que exige cálculo exponencial pesado.'
      ],
      correct: 0,
      explanation: 'Para z > 0, f\'(z) = 1.0. Isso permite que o sinal do erro flua sem atenuação no backpropagation!'
    },
    {
      id: 'q3',
      question: '3. Por que um Perceptron único não consegue resolver o problema do XOR?',
      options: [
        'Porque o XOR exige mais de 1 milhão de amostras para treinar.',
        'Porque os dados do XOR são linearmente não-separáveis por uma única reta.',
        'Porque a função Sigmoid não aceita valores negativos.'
      ],
      correct: 1,
      explanation: 'O XOR posiciona as duas classes em quadrantes opostos em 2D. Nenhuma linha reta consegue separar as duas classes sem cometer erros.'
    }
  ];

  const handleSelect = (qId, optionIdx) => {
    if (submitted) return;
    setAnswers({ ...answers, [qId]: optionIdx });
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (answers[q.id] === q.correct) score++;
    });
    return score;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#0A345D', fontSize: '1.1rem', fontWeight: '700' }}>
          🧠 Teste Rápido de Fixação de Conceitos
        </h4>
        {submitted && (
          <span style={{ background: '#7CB342', color: '#FFF', fontWeight: '800', padding: '4px 14px', borderRadius: '20px', fontSize: '0.9rem' }}>
            Pontuação: {calculateScore()} / {questions.length}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', overflowY: 'auto', flex: 1, paddingRight: '6px' }}>
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correct;

          return (
            <div key={q.id} style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '14px' }}>
              <p style={{ fontWeight: '700', color: '#0A345D', fontSize: '0.92rem', marginBottom: '8px' }}>
                {q.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {q.options.map((opt, idx) => {
                  let btnBg = '#FFFFFF';
                  let btnBorder = '#CBD5E1';
                  let txtColor = '#334155';

                  if (selected === idx) {
                    btnBg = '#E0F2FE';
                    btnBorder = '#0284C7';
                    txtColor = '#0369A1';
                  }

                  if (submitted) {
                    if (idx === q.correct) {
                      btnBg = '#DEF7EC';
                      btnBorder = '#31C48D';
                      txtColor = '#03543F';
                    } else if (selected === idx && !isCorrect) {
                      btnBg = '#FDE8E8';
                      btnBorder = '#F05252';
                      txtColor = '#9B1C1C';
                    }
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelect(q.id, idx)}
                      style={{
                        background: btnBg,
                        border: `1.5px solid ${btnBorder}`,
                        color: txtColor,
                        borderRadius: '6px',
                        padding: '8px 12px',
                        textAlign: 'left',
                        fontSize: '0.85rem',
                        fontWeight: selected === idx ? '700' : '500',
                        cursor: submitted ? 'default' : 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>

              {submitted && (
                <div style={{ marginTop: '8px', fontSize: '0.8rem', color: isCorrect ? '#03543F' : '#9B1C1C', fontWeight: '600' }}>
                  {isCorrect ? '✅ Correto! ' : '❌ Incorreto. '} {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            style={{
              background: Object.keys(answers).length === questions.length ? '#7CB342' : '#CBD5E1',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 20px',
              borderRadius: '8px',
              fontWeight: '700',
              cursor: Object.keys(answers).length === questions.length ? 'pointer' : 'not-allowed'
            }}
          >
            Verificar Respostas
          </button>
        ) : (
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            style={{ background: '#0A345D', color: '#FFFFFF', border: 'none', padding: '8px 20px', borderRadius: '8px', fontWeight: '700', cursor: 'pointer' }}
          >
            Refazer Quiz
          </button>
        )}
      </div>
    </div>
  );
}
