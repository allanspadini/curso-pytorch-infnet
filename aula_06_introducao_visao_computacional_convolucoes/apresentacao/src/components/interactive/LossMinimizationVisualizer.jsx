import React, { useState } from 'react';
import { ArrowRight, RotateCcw } from 'lucide-react';

export default function LossMinimizationVisualizer() {
  const epochData = [
    { epoch: 1,  yReal: 1.0, yEst: 0.15, diff: 0.85, loss: 0.361, ballX: 80,  ballY: 45,  tangentAngle: -45, note: 'Início do treino: predição distante do gabarito real. Erro e perda elevados.' },
    { epoch: 2,  yReal: 1.0, yEst: 0.35, diff: 0.65, loss: 0.211, ballX: 135, ballY: 85,  tangentAngle: -35, note: 'Gradiente empurra os pesos: predição sobe e a diferença diminui sensivelmente.' },
    { epoch: 5,  yReal: 1.0, yEst: 0.68, diff: 0.32, loss: 0.051, ballX: 205, ballY: 140, tangentAngle: -22, note: 'Convergência acelerada: modelo já estima mais da metade do valor real.' },
    { epoch: 10, yReal: 1.0, yEst: 0.88, diff: 0.12, loss: 0.007, ballX: 265, ballY: 175, tangentAngle: -10, note: 'Aproximação fina: o erro residual é mínimo e a curva se aplaina perto do fundo.' },
    { epoch: 25, yReal: 1.0, yEst: 0.98, diff: 0.02, loss: 0.0002, ballX: 300, ballY: 185, tangentAngle: 0,   note: 'Mínimo da Função Objetivo atingido: predição estimada coincide com o valor real!' }
  ];

  const [epochIndex, setEpochIndex] = useState(0);
  const current = epochData[epochIndex];

  const handleNext = () => {
    setEpochIndex((prev) => (prev + 1) % epochData.length);
  };

  const handleReset = () => {
    setEpochIndex(0);
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      {/* Left: Loss Curve & Parabola Viewport */}
      <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #CBD5E1', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#D84315', background: 'rgba(255,112,67,0.15)', padding: '3px 10px', borderRadius: '12px' }}>
              SUPERFÍCIE DE PERDA E PONTO DE MÍNIMO
            </span>
            <h4 style={{ color: '#0A345D', fontSize: '1.1rem', fontWeight: '800', marginTop: '4px' }}>
              Minimização da Função Objetivo por Época
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={handleReset}
              style={{
                padding: '6px 12px',
                borderRadius: '16px',
                border: '1px solid #CBD5E1',
                background: '#FFF',
                color: '#64748B',
                fontWeight: '700',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RotateCcw size={14} /> Reiniciar
            </button>
            <button
              onClick={handleNext}
              style={{
                padding: '6px 14px',
                borderRadius: '16px',
                border: 'none',
                background: '#0A345D',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '0.78rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                boxShadow: '0 2px 8px rgba(10,52,93,0.25)'
              }}
            >
              Próxima Época <ArrowRight size={14} />
            </button>
          </div>
        </div>

        {/* Parabola SVG Canvas */}
        <svg viewBox="0 0 460 220" style={{ width: '100%', height: '200px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '8px' }}>
          {/* Grid lines */}
          <line x1="50" y1="20" x2="420" y2="20" stroke="#E2E8F0" strokeDasharray="3" />
          <line x1="50" y1="80" x2="420" y2="80" stroke="#E2E8F0" strokeDasharray="3" />
          <line x1="50" y1="140" x2="420" y2="140" stroke="#E2E8F0" strokeDasharray="3" />
          <line x1="50" y1="190" x2="420" y2="190" stroke="#CBD5E1" strokeWidth="2" />
          <line x1="50" y1="20" x2="50" y2="190" stroke="#CBD5E1" strokeWidth="2" />

          {/* Axis Labels */}
          <text x="56" y="32" fontSize="11" fill="#64748B" fontWeight="600">Perda L(w)</text>
          <text x="360" y="206" fontSize="11" fill="#64748B" fontWeight="600">Parâmetro (Peso w)</text>

          {/* Convex Loss Parabola */}
          <path
            d="M 70 35 Q 300 240 410 40"
            fill="none"
            stroke="#0284C7"
            strokeWidth="3.5"
          />

          {/* Minimum Point Marker */}
          <circle cx="300" cy="186" r="6" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />
          <text x="300" y="210" fontSize="10" fill="#2E7D32" fontWeight="bold" textAnchor="middle">MÍNIMO GLOBAL (L ≈ 0)</text>

          {/* Current State Ball (Rolling down the loss curve) */}
          <circle
            cx={current.ballX}
            cy={current.ballY}
            r="12"
            fill="#FF7043"
            stroke="#FFFFFF"
            strokeWidth="3"
            style={{ transition: 'all 0.4s ease', filter: 'drop-shadow(0px 3px 6px rgba(255,112,67,0.4))' }}
          />

          {/* Tangent slope vector */}
          <line
            x1={current.ballX - 25}
            y1={current.ballY - 25 * Math.tan((current.tangentAngle * Math.PI) / 180)}
            x2={current.ballX + 25}
            y2={current.ballY + 25 * Math.tan((current.tangentAngle * Math.PI) / 180)}
            stroke="#D84315"
            strokeWidth="2.5"
            strokeDasharray="4"
          />

          {/* Current Ball Badge */}
          <text
            x={current.ballX}
            y={current.ballY - 16}
            fontSize="11"
            fill="#D84315"
            fontWeight="bold"
            textAnchor="middle"
          >
            Época {current.epoch}
          </text>
        </svg>

        {/* Epoch Stepper Bar */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px', marginTop: '10px' }}>
          {epochData.map((d, idx) => (
            <button
              key={d.epoch}
              onClick={() => setEpochIndex(idx)}
              style={{
                padding: '6px 4px',
                borderRadius: '8px',
                border: epochIndex === idx ? '2px solid #0A345D' : '1px solid #E2E8F0',
                background: epochIndex === idx ? '#E0F2FE' : '#FFFFFF',
                color: epochIndex === idx ? '#0A345D' : '#64748B',
                cursor: 'pointer',
                textAlign: 'center',
                fontWeight: '700',
                fontSize: '0.75rem'
              }}
            >
              Época {d.epoch}
            </button>
          ))}
        </div>
      </div>

      {/* Right: Difference (Ground Truth vs Estimate) Card */}
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
        <div>
          <span className="card-header-badge" style={{ background: 'rgba(2,132,199,0.15)', color: '#0284C7', marginBottom: '8px' }}>
            A PERDA É A DIFERENÇA (RESÍDUO)
          </span>

          <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '12px', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: '800', color: '#475569', marginBottom: '4px' }}>
              FUNÇÃO DE PERDA (DIFERENÇA AO QUADRADO):
            </div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontWeight: '700', color: '#0A345D', fontSize: '1.05rem', textAlign: 'center' }}>
              Perda = (y - ŷ)²
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'center', marginTop: '3px' }}>
              (Valor Real no Treino − Valor Estimado pela Rede)²
            </div>
          </div>

          {/* Visual comparison of y vs y_hat */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '14px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>
                <span style={{ color: '#2E7D32' }}>🟢 Conhecido no Treino (Gabarito y):</span>
                <span style={{ color: '#2E7D32' }}>{current.yReal.toFixed(2)}</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: '#E2E8F0', borderRadius: '7px', overflow: 'hidden' }}>
                <div style={{ width: '100%', height: '100%', background: '#7CB342' }} />
              </div>
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', fontWeight: '700', marginBottom: '4px' }}>
                <span style={{ color: '#0E7490' }}>🔵 Estimado pelo Modelo (Predição ŷ):</span>
                <span style={{ color: '#0E7490' }}>{current.yEst.toFixed(2)}</span>
              </div>
              <div style={{ width: '100%', height: '14px', background: '#E2E8F0', borderRadius: '7px', overflow: 'hidden' }}>
                <div style={{ width: `${current.yEst * 100}%`, height: '100%', background: '#1BB5D8', transition: 'width 0.3s ease' }} />
              </div>
            </div>

            {/* Gap Difference */}
            <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '8px', padding: '10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '800', color: '#D84315' }}>
                Diferença (y - ŷ):
              </span>
              <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '1rem', fontWeight: '800', color: '#D84315' }}>
                {current.diff.toFixed(2)} ➔ Loss: {current.loss.toFixed(4)}
              </span>
            </div>
          </div>

          <p style={{ fontSize: '0.88rem', color: '#334155', lineHeight: '1.45', background: '#F1F5F9', padding: '10px', borderRadius: '8px' }}>
            {current.note}
          </p>
        </div>

        <div style={{ background: '#F0FDF4', borderRadius: '8px', padding: '8px 12px', border: '1px solid #BBF7D0', marginTop: '8px' }}>
          <div style={{ fontSize: '0.78rem', color: '#15803D', fontWeight: '600' }}>
            🎯 <strong>Regra de Ouro:</strong> Treinar a rede é ajustar os pesos de modo que a diferença entre o que se conhece (treino) e o que se estima (predição) convirja para zero.
          </div>
        </div>
      </div>
    </div>
  );
}
