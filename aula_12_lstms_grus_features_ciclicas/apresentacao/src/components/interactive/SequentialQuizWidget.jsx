import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight } from 'lucide-react';
import MathView from '../MathView';

export default function SequentialQuizWidget() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState({});

  const questions = [
    {
      id: 1,
      question: "Qual é o mecanismo central que impede que a LSTM sofra de Vanishing Gradient em sequências longas?",
      options: [
        { id: 'A', text: "O uso exclusivo de funções de ativação ReLU dentro de todos os portões internos." },
        { id: 'B', text: "A atualização aditiva da Cell State (C_t = f_t ⊙ C_{t-1} + i_t ⊙ C̃_t), cuja derivada ∂C_t / ∂C_{t-1} = f_t flui no tempo sem multiplicação destrutiva de matrizes.", correct: true },
        { id: 'C', text: "O desligamento do algoritmo Backpropagation Through Time (BPTT) após 5 passos." },
        { id: 'D', text: "A duplicação automática da taxa de aprendizado a cada novo passo temporal." }
      ],
      explanation: "Exatamente! A 'rodovia de informação' da Cell State (C_t) é governada por operações aditivas lineares. Se o Forget Gate f_t ≈ 1.0, o gradiente viaja dezenas de passos no tempo sem sofrer a atenuação exponencial típica de matrizes W_{hh}^T da Vanilla RNN."
    },
    {
      id: 2,
      question: "Em um SaaS de previsão de vendas futuras (Demand Forecasting) em tempo real, por que NÃO devemos usar uma arquitetura Bidirecional (BiLSTM / BiGRU)?",
      options: [
        { id: 'A', text: "Porque a BiLSTM consome menos memória na GPU que a LSTM unidirecional." },
        { id: 'B', text: "Porque a camada reversa necessita da sequência futura (t = T ➔ 1) para gerar a previsão, o que causaria vazamento causal grave já que os dados de amanhã não existem na inferência real.", correct: true },
        { id: 'C', text: "Porque o PyTorch gera erro de compilação ao usar bidirectional=True com batch_first=True." },
        { id: 'D', text: "Porque redes recorrentes bidirecionais só podem ser treinadas para classificação binária." }
      ],
      explanation: "Perfeito! Em forecasting em tempo real, a inferência ocorre no momento t=Hoje. O futuro ainda não aconteceu. Usar BiLSTM durante o treino faz o modelo 'trapacear' olhando vendas de dias futuros que não estarão disponíveis na produção."
    },
    {
      id: 3,
      question: "Em problemas de previsão de demanda com produtos de cauda longa e muitos dias de venda zero (y_t = 0), por que o WAPE é superior ao MAPE tradicional?",
      options: [
        { id: 'A', text: "Porque o WAPE divide a soma total dos erros absolutos pela soma total das vendas reais (∑ |y - ŷ| / ∑ y), sendo imune à divisão por zero e ponderando pelo volume de receita.", correct: true },
        { id: 'B', text: "Porque o WAPE converte a série temporal em um problema de classificação binária." },
        { id: 'C', text: "Porque o WAPE descarta automaticamente todos os outliers do conjunto de teste." },
        { id: 'D', text: "Porque o WAPE sempre resulta em um valor exatamente 10 vezes menor que o RMSE." }
      ],
      explanation: "Correto! O MAPE clássico divide individualmente por cada y_t (gerando erro de divisão por zero quando a venda é 0). O WAPE resolve isso somando todo o volume no denominador, sendo a métrica favorita em Supply Chain e Gestão de Estoques!"
    }
  ];

  const q = questions[currentQ];
  const isAnswered = answeredQuestions[currentQ] !== undefined;

  const handleSelect = (idx, isCorrect) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setShowExplanation(true);
    setAnsweredQuestions(prev => ({ ...prev, [currentQ]: { selected: idx, isCorrect } }));
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const nextQuestion = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(prev => prev + 1);
      setSelectedOpt(answeredQuestions[currentQ + 1]?.selected ?? null);
      setShowExplanation(answeredQuestions[currentQ + 1] !== undefined);
    }
  };

  const prevQuestion = () => {
    if (currentQ > 0) {
      setCurrentQ(prev => prev - 1);
      setSelectedOpt(answeredQuestions[currentQ - 1]?.selected ?? null);
      setShowExplanation(answeredQuestions[currentQ - 1] !== undefined);
    }
  };

  const resetQuiz = () => {
    setCurrentQ(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setAnsweredQuestions({});
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '16px', height: '100%' }}>
      {/* Question Panel */}
      <div className="content-card" style={{ padding: '16px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span className="card-header-badge pill-cyan">
              Questão {currentQ + 1} de {questions.length}
            </span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: 600 }}>
              Pontuação: {score} / {Object.keys(answeredQuestions).length}
            </span>
          </div>

          <h3 style={{ fontSize: '1.05rem', color: '#0A345D', lineHeight: '1.35', marginBottom: '14px' }}>
            {q.question}
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {q.options.map((opt, idx) => {
              let btnStyle = {
                background: '#F8FAFC',
                border: '1px solid #E2E8F0',
                color: '#1E293B',
                textAlign: 'left',
                padding: '10px 14px',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: isAnswered ? 'default' : 'pointer',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '10px',
                transition: 'all 0.2s'
              };

              if (isAnswered) {
                if (opt.correct) {
                  btnStyle.background = '#DCFCE7';
                  btnStyle.border = '1.5px solid #16A34A';
                  btnStyle.color = '#14532D';
                  btnStyle.fontWeight = '600';
                } else if (selectedOpt === idx) {
                  btnStyle.background = '#FEE2E2';
                  btnStyle.border = '1.5px solid #DC2626';
                  btnStyle.color = '#7F1D1D';
                }
              } else if (selectedOpt === idx) {
                btnStyle.border = '1.5px solid #1BB5D8';
                btnStyle.background = '#E0F2FE';
              }

              return (
                <button
                  key={opt.id}
                  style={btnStyle}
                  onClick={() => handleSelect(idx, !!opt.correct)}
                  disabled={isAnswered}
                >
                  <span style={{ fontWeight: 700, minWidth: '18px' }}>{opt.id})</span>
                  <span>{opt.text}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Navigation buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px', paddingTop: '10px', borderTop: '1px solid #E2E8F0' }}>
          <button
            className="btn-interactive"
            onClick={prevQuestion}
            disabled={currentQ === 0}
            style={{ opacity: currentQ === 0 ? 0.4 : 1 }}
          >
            ← Anterior
          </button>

          <div style={{ display: 'flex', gap: '6px' }}>
            {questions.map((_, idx) => (
              <span
                key={idx}
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: currentQ === idx ? '#0A345D' : answeredQuestions[idx] ? (answeredQuestions[idx].isCorrect ? '#16A34A' : '#DC2626') : '#CBD5E1'
                }}
              />
            ))}
          </div>

          {currentQ < questions.length - 1 ? (
            <button
              className="btn-interactive"
              onClick={nextQuestion}
              style={{ background: 'var(--infnet-dark-blue)', color: '#fff' }}
            >
              Próxima ➔
            </button>
          ) : (
            <button
              className="btn-interactive"
              onClick={resetQuiz}
              style={{ background: '#7CB342', color: '#fff' }}
            >
              <RefreshCw size={14} /> Refazer
            </button>
          )}
        </div>
      </div>

      {/* Explanation / Score Panel */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        <div className="content-card" style={{ padding: '14px', flex: 1, borderTop: '4px solid #1BB5D8' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <HelpCircle size={16} color="#0A345D" />
            <h4 style={{ fontSize: '0.88rem', color: '#0A345D', margin: 0 }}>Gabarito Comentado</h4>
          </div>

          {showExplanation ? (
            <div style={{ fontSize: '0.78rem', color: '#334155', lineHeight: '1.45', background: '#F8FAFC', padding: '10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
              <div style={{ fontWeight: 700, color: answeredQuestions[currentQ]?.isCorrect ? '#166534' : '#991B1B', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                {answeredQuestions[currentQ]?.isCorrect ? <CheckCircle size={14} /> : <XCircle size={14} />}
                {answeredQuestions[currentQ]?.isCorrect ? 'Resposta Correta!' : 'Resposta Incorreta'}
              </div>
              {q.explanation}
            </div>
          ) : (
            <div style={{ fontSize: '0.76rem', color: '#64748B', fontStyle: 'italic', textAlign: 'center', marginTop: '20px' }}>
              Selecione uma alternativa ao lado para conferir a explicação pedagógica detalhada.
            </div>
          )}
        </div>

        {/* Score box */}
        <div style={{ background: '#0A345D', color: '#FFFFFF', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.72rem', color: '#64D9EF', textTransform: 'uppercase', fontWeight: 700 }}>Aproveitamento no Módulo</div>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, margin: '4px 0', fontFamily: 'var(--font-mono)' }}>
            {score} / {questions.length}
          </div>
          <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
            {score === questions.length ? '🎉 Domínio Total dos Conceitos!' : 'Continue revisando os portões e tensores.'}
          </div>
        </div>
      </div>
    </div>
  );
}
