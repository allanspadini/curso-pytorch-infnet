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
        { text: 'A) Vazamento de Dados (Data Leakage), pois as estatísticas (média/desvio) do teste influenciam o treino.', correct: true },
        { text: 'B) O treinamento fica mais rápido, pois o scaler é executado uma única vez.', correct: false },
        { text: 'C) O modelo aprende melhor, pois vê a distribuição real inteira.', correct: false },
        { text: 'D) O PyTorch dispara um erro de runtime ao criar o DataLoader.', correct: false }
      ],
      explanation: 'Vazamento de dados ocorre quando informações do conjunto de validação/teste contaminam o treino, gerando métricas de validação ilusoriamente altas que despencam em produção real.'
    },
    {
      question: '2. Qual a diferença fundamental de eixo entre BatchNorm1d e LayerNorm?',
      options: [
        { text: 'A) BatchNorm1d normaliza ao longo do eixo de batch N; LayerNorm normaliza ao longo das features C de uma única amostra.', correct: true },
        { text: 'B) LayerNorm depende fortemente do batch size, enquanto BatchNorm1d funciona com batch size = 1.', correct: false },
        { text: 'C) BatchNorm1d é aplicada apenas em imagens, enquanto LayerNorm é para dados tabulares.', correct: false },
        { text: 'D) Não existe diferença; ambos calculam a mesma média e desvio padrão.', correct: false }
      ],
      explanation: 'BatchNorm1d calcula média e desvio padrão ao longo da dimensão N (batch), enquanto LayerNorm calcula ao longo da dimensão C (features) para cada exemplo individualmente.'
    },
    {
      question: '3. Por que a inicialização Kaiming (He) Normal é preferida para ativações ReLU?',
      options: [
        { text: 'A) Porque compensa o fato da ReLU zerar 50% dos neurônios (entradas negativas), dobrando a variância inicial.', correct: true },
        { text: 'B) Porque força todos os pesos a serem estritamente positivos.', correct: false },
        { text: 'C) Porque funciona apenas com Tanh e Sigmoide.', correct: false },
        { text: 'D) Porque zera todos os viéses (biases) da rede neural.', correct: false }
      ],
      explanation: 'Como a ReLU zera todas as entradas negativas, metade do sinal é perdido. Kaiming Normal usa Var(W) = 2/fan_in para manter a variância das ativações constante em redes profundas.'
    },
    {
      question: '4. O que é o Inverted Dropout implementado nativamente no PyTorch (nn.Dropout)?',
      options: [
        { text: 'A) Zera neurônios no treino com prob p e multiplica os restantes por 1/(1-p), eliminando ajustes no teste (model.eval()).', correct: true },
        { text: 'B) Zera neurônios apenas durante o teste de produção.', correct: false },
        { text: 'C) Inverte o sinal dos gradientes durante o backward pass.', correct: false },
        { text: 'D) Multiplica os pesos por zero para prevenir overfitting.', correct: false }
      ],
      explanation: 'Inverted Dropout dimensiona as ativações no treino por 1/(1-p). Assim, na inferência (eval()), nenhum multiplicador precisa ser aplicado, mantendo o tempo de execução veloz.'
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
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      {!showResult ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
            <span style={{ fontSize: '0.88rem', color: '#64D9EF', fontWeight: '700' }}>
              ❓ Quiz de Fixação: Questão {currentQ + 1} de {questions.length}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
              Pontuação: {score} / {questions.length}
            </span>
          </div>

          <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.1rem', marginBottom: '14px', color: '#FFFFFF' }}>
            {q.question}
          </h4>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '14px' }}>
            {q.options.map((opt, idx) => {
              const isSelected = selectedOpt === idx;
              let bg = '#041221';
              let border = '#1E3A5F';

              if (selectedOpt !== null) {
                if (opt.correct) {
                  bg = 'rgba(124, 179, 66, 0.2)';
                  border = '#7CB342';
                } else if (isSelected) {
                  bg = 'rgba(255, 112, 67, 0.2)';
                  border = '#FF7043';
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelect(idx)}
                  style={{
                    background: bg,
                    border: `1.5px solid ${border}`,
                    borderRadius: '8px',
                    padding: '10px 14px',
                    color: '#FFFFFF',
                    textAlign: 'left',
                    fontSize: '0.88rem',
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
            <div style={{ background: '#041221', padding: '12px', borderRadius: '8px', border: '1px solid #1E293B', marginBottom: '12px' }}>
              <div style={{ fontWeight: '700', color: '#64D9EF', fontSize: '0.85rem', marginBottom: '2px' }}>💡 Explicação:</div>
              <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>{q.explanation}</div>
            </div>
          )}

          {selectedOpt !== null && (
            <div style={{ textAlign: 'right' }}>
              <button 
                onClick={handleNext}
                style={{ background: '#1BB5D8', color: '#0A345D', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: '800', cursor: 'pointer', fontSize: '0.85rem' }}
              >
                {currentQ < questions.length - 1 ? 'Próxima Questão ➔' : 'Ver Resultado Final 🏆'}
              </button>
            </div>
          )}
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '20px' }}>
          <div style={{ fontSize: '2.5rem', marginBottom: '8px' }}>🏆</div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', color: '#64D9EF', marginBottom: '6px' }}>
            Quiz Concluído!
          </h3>
          <p style={{ fontSize: '1.1rem', color: '#FFFFFF', marginBottom: '14px' }}>
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> questões ({Math.round((score / questions.length) * 100)}%).
          </p>

          <button 
            onClick={() => {
              setCurrentQ(0);
              setSelectedOpt(null);
              setShowResult(false);
              setScore(0);
            }}
            style={{ background: '#7CB342', color: '#FFF', border: 'none', borderRadius: '20px', padding: '8px 22px', fontWeight: '800', cursor: 'pointer', fontSize: '0.88rem' }}
          >
            🔄 Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
