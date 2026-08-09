import React, { useState } from 'react';
import { CheckCircle2, XCircle, RotateCcw } from 'lucide-react';

export default function QuizWidget() {
  const questions = [
    {
      id: 1,
      question: 'Por que executamos otimizador.zero_grad() no início de cada época no PyTorch?',
      options: [
        'Para zerar os pesos e reiniciar a rede neural do zero.',
        'Porque por padrão o PyTorch acumula gradientes em .grad a cada chamada backward.',
        'Para apagar os dados de entrada da memória GPU.',
        'Para reiniciar a taxa de aprendizado (learning rate).'
      ],
      correct: 1,
      explanation: 'Exato! No PyTorch, os gradientes são acumulados por padrão para suportar grafos complexos ou mini-batches. Zerar os gradientes evita acumular gradientes de épocas anteriores.'
    },
    {
      id: 2,
      question: 'Qual é o papel do motor Autograd durante a execução de loss.backward()?',
      options: [
        'Ajustar os pesos diretamente somando a taxa de aprendizado.',
        'Calcular a acurácia do modelo no conjunto de teste.',
        'Percorrer o Grafo Direcionado Acíclico (DAG) no sentido inverso calculando derivadas via Regra da Cadeia.',
        'Converter os tensores em arrays do NumPy.'
      ],
      correct: 2,
      explanation: 'Correto! O Autograd percorre o DAG criado durante o forward pass no sentido inverso, aplicando a Regra da Cadeia do cálculo para computar as derivadas parciais exatas em .grad.'
    },
    {
      id: 3,
      question: 'O que acontece quando definimos uma Taxa de Aprendizado (Learning Rate) excessivamente alta (ex: lr = 10.0)?',
      options: [
        'O modelo converge instantaneamente para a acurácia máxima.',
        'Os gradientes são zerados automaticamente.',
        'O modelo oscila descontroladamente, pula o mínimo de perda e diverge.',
        'A camada ocultas da MLP para de responder.'
      ],
      correct: 2,
      explanation: 'Exato! Um learning rate alto faz com que os passos no gradiente descendente sejam gigantescos, pulando o mínimo da função de perda e fazendo o erro explodir.'
    }
  ];

  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleSelectOption = (qId, optionIdx) => {
    if (submitted) return;
    setSelectedAnswers(prev => ({ ...prev, [qId]: optionIdx }));
  };

  const handleSubmit = () => {
    setSubmitted(true);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setSubmitted(false);
  };

  const calculateScore = () => {
    let score = 0;
    questions.forEach(q => {
      if (selectedAnswers[q.id] === q.correct) {
        score += 1;
      }
    });
    return score;
  };

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
            🏆 Teste Seus Conhecimentos: Autograd & Treinamento de Redes Neurais
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Responda às questões abaixo para consolidar os conceitos aprendidos nesta aula.
          </p>
        </div>
        {submitted && (
          <button 
            onClick={handleReset}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#64748B' }}
          >
            <RotateCcw size={16} /> Tentar Novamente
          </button>
        )}
      </div>

      {/* Questions list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {questions.map((q, qIdx) => {
          const userAns = selectedAnswers[q.id];
          const isCorrect = userAns === q.correct;
          return (
            <div key={q.id} style={{ background: '#FFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontSize: '1rem', fontWeight: '800', color: '#0A345D', marginBottom: '12px' }}>
                Questão {qIdx + 1}: {q.question}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAns === optIdx;
                  let borderClr = '#CBD5E1';
                  let bgClr = '#FFF';
                  let textClr = '#334155';

                  if (submitted) {
                    if (optIdx === q.correct) {
                      borderClr = '#22C55E';
                      bgClr = '#DCFCE7';
                      textClr = '#15803D';
                    } else if (isSelected && !isCorrect) {
                      borderClr = '#EF4444';
                      bgClr = '#FEE2E2';
                      textClr = '#B91C1C';
                    }
                  } else if (isSelected) {
                    borderClr = '#1BB5D8';
                    bgClr = '#E0F7FA';
                    textClr = '#0A345D';
                  }

                  return (
                    <div
                      key={optIdx}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      style={{
                        padding: '10px 14px',
                        borderRadius: '8px',
                        border: `1.5px solid ${borderClr}`,
                        background: bgClr,
                        color: textClr,
                        fontSize: '0.92rem',
                        fontWeight: isSelected ? '700' : '500',
                        cursor: submitted ? 'default' : 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      <span>{String.fromCharCode(65 + optIdx)}) {opt}</span>
                      {submitted && optIdx === q.correct && <CheckCircle2 size={18} color="#22C55E" />}
                      {submitted && isSelected && !isCorrect && <XCircle size={18} color="#EF4444" />}
                    </div>
                  );
                })}
              </div>

              {submitted && (
                <div style={{ marginTop: '12px', padding: '10px 14px', borderRadius: '8px', background: '#F8FAFC', borderLeft: `4px solid ${isCorrect ? '#22C55E' : '#EF4444'}`, fontSize: '0.85rem', color: '#334155' }}>
                  💡 {q.explanation}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Submit Bar */}
      {!submitted ? (
        <button
          onClick={handleSubmit}
          disabled={Object.keys(selectedAnswers).length < questions.length}
          style={{
            padding: '14px',
            borderRadius: '10px',
            border: 'none',
            background: Object.keys(selectedAnswers).length < questions.length ? '#CBD5E1' : '#7CB342',
            color: '#FFF',
            fontWeight: '800',
            fontSize: '1rem',
            cursor: Object.keys(selectedAnswers).length < questions.length ? 'not-allowed' : 'pointer',
            textAlign: 'center',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          Finalizar Quiz e Ver Resultado
        </button>
      ) : (
        <div style={{ background: '#0A345D', color: '#FFF', padding: '16px', borderRadius: '12px', textAlign: 'center', fontSize: '1.2rem', fontWeight: '800' }}>
          🎉 Você acertou {calculateScore()} de {questions.length} questões! ({Math.round((calculateScore() / questions.length) * 100)}%)
        </div>
      )}
    </div>
  );
}
