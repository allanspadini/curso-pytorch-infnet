import React, { useState } from 'react';
import { HelpCircle, CheckCircle2, XCircle, RotateCcw, ArrowRight, Award } from 'lucide-react';

export default function QuizWidget() {
  const [currentQ, setCurrentQ] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);

  const questions = [
    {
      question: '1. O que ocorre se inicializarmos todos os pesos e bias de uma MLP com zero (W = 0, b = 0)?',
      options: [
        { text: 'A) Colapso de Simetria: todos os neurônios calculam saídas idênticas, recebem gradientes iguais e a camada age como 1 único neurônio.', correct: true },
        { text: 'B) O treinamento converge mais rápido, pois o ponto inicial tem perda zero.', correct: false },
        { text: 'C) O PyTorch dispara automaticamente um erro de divisão por zero.', correct: false },
        { text: 'D) A rede aprende normalmente, contanto que a taxa de aprendizado seja alta.', correct: false }
      ],
      explanation: 'Pesos idênticos mantêm gradientes perfeitamente simétricos durante o backward pass. Nenhum neurônio consegue se especializar em uma feature distinta.'
    },
    {
      question: '2. Qual é a diferença geométrica de eixo entre BatchNorm1d e LayerNorm?',
      options: [
        { text: 'A) BatchNorm1d normaliza verticalmente pelas amostras do batch N; LayerNorm normaliza horizontalmente pelas features C de uma única amostra.', correct: true },
        { text: 'B) LayerNorm depende fortemente do batch size, enquanto BatchNorm1d opera com batch size = 1.', correct: false },
        { text: 'C) BatchNorm1d é exclusiva para imagens, enquanto LayerNorm só aceita dados 1D.', correct: false },
        { text: 'D) Não há diferença matemática; são apenas nomes comerciais diferentes.', correct: false }
      ],
      explanation: 'BatchNorm1d fatia através de todas as amostras do mini-batch para uma feature específica. LayerNorm fatia através de todas as features de uma única amostra, funcionando até com N=1.'
    },
    {
      question: '3. Por que a inicialização Kaiming He (Normal) dobra a variância inicial para ativações ReLU?',
      options: [
        { text: 'A) Porque a ReLU zera 50% dos sinais negativos, necessitando de Var(W) = 2/fan_in para manter o equilíbrio energético.', correct: true },
        { text: 'B) Porque força todos os pesos a serem estritamente números pares.', correct: false },
        { text: 'C) Porque funciona exclusivamente com Tanh e Sigmoide.', correct: false },
        { text: 'D) Para eliminar a necessidade de bias em camadas densas.', correct: false }
      ],
      explanation: 'Como a ReLU joga fora metade das ativações (tudo que for menor que zero), a variância do sinal cai pela metade. A constante 2 restabelece o fluxo contínuo do sinal.'
    },
    {
      question: '4. Por que o PyTorch adota o Inverted Dropout multiplicando por 1/(1-p) no treino?',
      options: [
        { text: 'A) Para manter o valor esperado inalterado, tornando a inferência em model.eval() uma identidade direta sem custo (y = x).', correct: true },
        { text: 'B) Para apagar neurônios apenas durante a avaliação de teste.', correct: false },
        { text: 'C) Para inverter o sentido dos gradientes no retropropagar.', correct: false },
        { text: 'D) Para dobrar a taxa de aprendizado automaticamente.', correct: false }
      ],
      explanation: 'Reescalar no treinamento por 1/(1-p) garante que na produção não precisamos fazer nenhuma multiplicação corretiva de pesos, acelerando a inferência!'
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
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%'
    }}>
      {!showResult ? (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{ fontSize: '0.85rem', color: '#0E4E8A', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '6px' }}>
                <HelpCircle size={16} /> Questão {currentQ + 1} de {questions.length}
              </span>
              <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
                Pontuação: <strong style={{ color: '#0A345D' }}>{score}</strong> / {questions.length}
              </span>
            </div>

            <h4 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.05rem', margin: '0 0 12px 0', color: 'var(--infnet-dark-blue)' }}>
              {q.question}
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '12px' }}>
              {q.options.map((opt, idx) => {
                const isSelected = selectedOpt === idx;
                let bg = '#F8FAFC';
                let border = '#CBD5E1';
                let textColor = '#334155';

                if (selectedOpt !== null) {
                  if (opt.correct) {
                    bg = '#F0FDF4';
                    border = '#16A34A';
                    textColor = '#15803D';
                  } else if (isSelected) {
                    bg = '#FEF2F2';
                    border = '#DC2626';
                    textColor = '#991B1B';
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
                      color: textColor,
                      textAlign: 'left',
                      fontSize: '0.86rem',
                      fontWeight: isSelected || (selectedOpt !== null && opt.correct) ? '700' : '500',
                      cursor: selectedOpt === null ? 'pointer' : 'default',
                      transition: 'all 0.15s ease',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between'
                    }}
                  >
                    <span>{opt.text}</span>
                    {selectedOpt !== null && opt.correct && <CheckCircle2 size={16} color="#16A34A" />}
                    {selectedOpt !== null && isSelected && !opt.correct && <XCircle size={16} color="#DC2626" />}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            {selectedOpt !== null && (
              <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '10px 14px', borderRadius: '8px', marginBottom: '10px' }}>
                <div style={{ fontWeight: '800', color: '#0369A1', fontSize: '0.82rem', marginBottom: '2px' }}>
                  EXPLICAÇÃO TÉCNICA:
                </div>
                <div style={{ fontSize: '0.82rem', color: '#1E293B', lineHeight: '1.4' }}>
                  {q.explanation}
                </div>
              </div>
            )}

            {selectedOpt !== null && (
              <div style={{ textAlign: 'right' }}>
                <button 
                  onClick={handleNext}
                  style={{
                    background: 'var(--infnet-dark-blue)',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '8px 20px',
                    fontWeight: '800',
                    cursor: 'pointer',
                    fontSize: '0.85rem',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px'
                  }}
                >
                  {currentQ < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultado Final'}
                  <ArrowRight size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', gap: '12px' }}>
          <Award size={48} color="#0284C7" />
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.4rem', color: 'var(--infnet-dark-blue)', margin: 0 }}>
            Quiz de Fixação Concluído!
          </h3>
          <p style={{ fontSize: '1.05rem', color: '#475569', margin: 0 }}>
            Você acertou <strong>{score}</strong> de <strong>{questions.length}</strong> questões ({Math.round((score / questions.length) * 100)}%).
          </p>

          <button 
            onClick={() => {
              setCurrentQ(0);
              setSelectedOpt(null);
              setShowResult(false);
              setScore(0);
            }}
            style={{
              background: 'var(--infnet-cyan)',
              color: 'var(--infnet-dark-blue)',
              border: 'none',
              borderRadius: '8px',
              padding: '10px 24px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              marginTop: '8px'
            }}
          >
            <RotateCcw size={15} /> Tentar Novamente
          </button>
        </div>
      )}
    </div>
  );
}
