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
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h4 style={{ color: '#0A345D', fontSize: '1.35rem', fontWeight: '800' }}>
          🧠 Teste Rápido de Fixação de Conceitos
        </h4>
        {submitted && (
          <span style={{ background: '#7CB342', color: '#FFF', fontWeight: '800', padding: '6px 18px', borderRadius: '24px', fontSize: '1.15rem' }}>
            Pontuação: {calculateScore()} / {questions.length}
          </span>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', overflowY: 'auto', flex: 1, paddingRight: '8px' }}>
        {questions.map((q) => {
          const selected = answers[q.id];
          const isCorrect = selected === q.correct;

          return (
            <div key={q.id} style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '20px' }}>
              <p style={{ fontWeight: '800', color: '#0A345D', fontSize: '1.18rem', marginBottom: '12px', lineHeight: '1.4' }}>
                {q.question}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
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
                        border: `2px solid ${btnBorder}`,
                        color: txtColor,
                        borderRadius: '10px',
                        padding: '12px 18px',
                        textAlign: 'left',
                        fontSize: '1.08rem',
                        fontWeight: selected === idx ? '700' : '500',
                        lineHeight: '1.45',
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
                <div style={{ marginTop: '12px', fontSize: '1.05rem', color: isCorrect ? '#03543F' : '#9B1C1C', fontWeight: '700', lineHeight: '1.4' }}>
                  {isCorrect ? '✅ Correto! ' : '❌ Incorreto. '} {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '14px' }}>
        {!submitted ? (
          <button
            onClick={() => setSubmitted(true)}
            disabled={Object.keys(answers).length < questions.length}
            style={{
              background: Object.keys(answers).length === questions.length ? '#7CB342' : '#CBD5E1',
              color: '#FFFFFF',
              border: 'none',
              padding: '12px 26px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '1.1rem',
              cursor: Object.keys(answers).length === questions.length ? 'pointer' : 'not-allowed',
              boxShadow: Object.keys(answers).length === questions.length ? '0 4px 14px rgba(124, 179, 66, 0.35)' : 'none'
            }}
          >
            Verificar Respostas
          </button>
        ) : (
          <button
            onClick={() => { setAnswers({}); setSubmitted(false); }}
            style={{ background: '#0A345D', color: '#FFFFFF', border: 'none', padding: '12px 26px', borderRadius: '12px', fontWeight: '800', fontSize: '1.1rem', cursor: 'pointer', boxShadow: '0 4px 14px rgba(10, 52, 93, 0.35)' }}
          >
            Refazer Quiz
          </button>
        )}
      </div>
    </div>
  );
}
