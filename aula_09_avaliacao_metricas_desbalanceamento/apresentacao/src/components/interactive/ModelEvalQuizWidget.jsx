import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, ArrowRight, RotateCcw } from 'lucide-react';

const quizQuestions = [
  {
    question: "Por que em cenários de desbalanceamento severo (ex: 99.8% negativos, 0.2% positivos) o ROC-AUC pode ser enganoso em comparação ao PR-AUC?",
    options: [
      "Porque o ROC-AUC calcula a média aritmética simples sem considerar os falsos positivos.",
      "Porque o denominador da Taxa de Falsos Positivos (FPR = FP / (FP + TN)) é dominado pelo enorme número de TNs, mantendo o FPR artificialmente baixo mesmo com centenas de alarmes falsos.",
      "Porque o ROC-AUC só funciona para problemas de regressão e não aceita saídas contínuas da sigmoide.",
      "Porque o PR-AUC ignora completamente os verdadeiros positivos da classe minoritária."
    ],
    correctAnswer: 1,
    explanation: "Exato! Na curva ROC, o eixo X é FPR = FP / (FP + TN). Com uma classe negativa gigantesca, mesmo uma grande quantidade de falsos positivos gera um FPR minúsculo (ex: 50 / 99800 = 0.0005), dando a ilusão de um modelo excelente. Já o PR-AUC compara Precisão e Recall diretamente na classe de interesse."
  },
  {
    question: "Ao avaliar um modelo de Deep Learning para triagem de câncer em estágio inicial, qual métrica F-Beta reflete melhor a prioridade clínica?",
    options: [
      "F0.5-Score, pois prioriza Precisão para nunca incomodar o paciente com exames complementares.",
      "F1-Score clássico, pois qualquer ponderação assimétrica é estatisticamente inválida em medicina.",
      "F2-Score (ou superior), pois atribui o dobro de peso ao Recall, penalizando severamente os Falsos Negativos (deixar um paciente doente sem tratamento).",
      "Accuracy tradicional, desde que seja superior a 90%."
    ],
    correctAnswer: 2,
    explanation: "Perfeito! O parâmetro Beta define o peso relativo do Recall sobre a Precisão. Na área médica ou de segurança crítica, um Falso Negativo pode custar uma vida. Portanto, F2 (ou F-beta com beta > 1) prioriza maximizar o Recall."
  },
  {
    question: "Qual o objetivo e o efeito prático de aplicar Temperature Scaling (logits / T) em uma rede neural profunda para classificação?",
    options: [
      "Acelerar a convergência do algoritmo Adam durante o backward pass.",
      "Aumentar a acurácia Top-1 do modelo em até 15% alterando os pesos convolucionais.",
      "Calibrar as probabilidades da Softmax para refletirem a incerteza real do modelo sem alterar em nada o ranking Top-1 ou a acurácia.",
      "Reduzir a dimensionalidade do vetor latente no espaço de embeddings."
    ],
    correctAnswer: 2,
    explanation: "Exato! Redes neurais modernas tendem a ser superconfiantes (ex: prever 99% de certeza quando a chance real de acerto é 75%). O Temperature Scaling ajusta a escala dos logits dividindo por T > 1, reduzindo o Expected Calibration Error (ECE) sem alterar as predições de classe final."
  },
  {
    question: "Por que não podemos otimizar diretamente a acurácia (0-1 loss) ou o F1-Score clássico utilizando o algoritmo de Backpropagation no PyTorch?",
    options: [
      "Porque o PyTorch só permite calcular tensores em GPU com matrizes quadradas.",
      "Porque métricas baseadas em limiares rígidos (degraus) têm derivada zero (∇ = 0) quase em todos os pontos, impedindo o fluxo de gradientes para atualizar os pesos.",
      "Porque o F1-Score é sempre negativo, impossibilitando encontrar mínimos globais.",
      "Porque o otimizador SGD só aceita números inteiros."
    ],
    correctAnswer: 1,
    explanation: "Corretíssimo! A função degrau de decisão gera derivadas nulas (∇ = 0) em quase todo o domínio. Sem gradientes contínuos, os otimizadores baseados em gradiente não conseguem aprender. Por isso usamos Surrogate Losses suaves (como Cross-Entropy, Focal Loss ou Soft-Dice Loss)."
  }
];

export default function ModelEvalQuizWidget() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = quizQuestions[currentIdx];

  const handleSelect = (idx) => {
    if (selectedOpt !== null) return;
    setSelectedOpt(idx);
    setShowExplanation(true);
    if (idx === q.correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOpt(null);
      setShowExplanation(false);
    } else {
      setFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setShowExplanation(false);
    setScore(0);
    setFinished(false);
  };

  if (finished) {
    return (
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', gap: '16px' }}>
        <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#DCFCE7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#16A34A' }}>
          <CheckCircle size={36} />
        </div>
        <h2 style={{ fontSize: '1.6rem', color: '#0A345D' }}>Quiz Concluído com Sucesso!</h2>
        <p style={{ fontSize: '1.1rem', color: '#475569' }}>
          Sua pontuação final: <strong style={{ color: '#16A34A', fontSize: '1.3rem' }}>{score} / {quizQuestions.length}</strong> acertos ({((score / quizQuestions.length) * 100).toFixed(0)}%)
        </p>
        <button
          onClick={handleRestart}
          className="btn-interactive"
          style={{ padding: '8px 20px', fontSize: '0.85rem' }}
        >
          <RotateCcw size={16} /> Refazer Quiz
        </button>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
      {/* Header do Quiz */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #E2E8F0', paddingBottom: '6px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.95rem' }}>
          <HelpCircle size={18} color="#1BB5D8" /> Quiz de Fixação • Questão {currentIdx + 1} de {quizQuestions.length}
        </div>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#64748B' }}>
          Pontuação: {score}
        </div>
      </div>

      {/* Pergunta */}
      <div style={{ fontSize: '0.96rem', fontWeight: 700, color: '#1E293B', lineHeight: '1.4' }}>
        {q.question}
      </div>

      {/* Opções */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {q.options.map((opt, idx) => {
          let bg = '#FFFFFF';
          let border = '#CBD5E1';
          let color = '#334155';

          if (selectedOpt !== null) {
            if (idx === q.correctAnswer) {
              bg = '#DCFCE7';
              border = '#16A34A';
              color = '#14532D';
            } else if (idx === selectedOpt) {
              bg = '#FEE2E2';
              border = '#EF4444';
              color = '#991B1B';
            }
          }

          return (
            <div
              key={idx}
              onClick={() => handleSelect(idx)}
              style={{
                background: bg,
                border: `1.5px solid ${border}`,
                borderRadius: '8px',
                padding: '10px 14px',
                fontSize: '0.84rem',
                fontWeight: selectedOpt === idx ? 600 : 500,
                color: color,
                cursor: selectedOpt === null ? 'pointer' : 'default',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.15s'
              }}
            >
              <span>{opt}</span>
              {selectedOpt !== null && idx === q.correctAnswer && <CheckCircle size={18} color="#16A34A" />}
              {selectedOpt !== null && idx === selectedOpt && idx !== q.correctAnswer && <XCircle size={18} color="#EF4444" />}
            </div>
          );
        })}
      </div>

      {/* Explicação e Próximo */}
      {showExplanation && (
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
          <div style={{ fontSize: '0.8rem', color: '#334155', lineHeight: '1.35', flex: 1 }}>
            <strong>Explicação:</strong> {q.explanation}
          </div>
          <button
            onClick={handleNext}
            className="btn-interactive"
            style={{ padding: '6px 14px', fontSize: '0.8rem', whiteSpace: 'nowrap' }}
          >
            {currentIdx < quizQuestions.length - 1 ? 'Próxima Questão' : 'Ver Resultado'} <ArrowRight size={14} />
          </button>
        </div>
      )}
    </div>
  );
}
