import React, { useState } from 'react';

export default function PerceptronSimulator() {
  const [w1, setW1] = useState(1.2);
  const [w2, setW2] = useState(0.9);
  const [b, setB] = useState(-11.5);

  // Sample Athletes Dataset (x1 = Creatina (g), x2 = Treino (h), y = Label)
  const athletes = [
    { id: 1, x1: 2.0, x2: 4.0, label: 0 },
    { id: 2, x1: 1.5, x2: 6.0, label: 0 },
    { id: 3, x1: 3.0, x2: 3.5, label: 0 },
    { id: 4, x1: 1.0, x2: 8.0, label: 0 },
    { id: 5, x1: 4.0, x2: 2.0, label: 0 },
    { id: 6, x1: 2.5, x2: 5.0, label: 0 },
    { id: 7, x1: 6.0, x2: 12.0, label: 1 },
    { id: 8, x1: 8.0, x2: 10.0, label: 1 },
    { id: 9, x1: 5.0, x2: 15.0, label: 1 },
    { id: 10, x1: 9.0, x2: 14.0, label: 1 },
    { id: 11, x1: 7.5, x2: 16.0, label: 1 },
    { id: 12, x1: 10.0, x2: 11.0, label: 1 }
  ];

  // Sigmoid activation
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  // Compute accuracy & predictions
  let correctCount = 0;
  const processed = athletes.map(a => {
    const z = w1 * a.x1 + w2 * a.x2 + b;
    const prob = sigmoid(z);
    const pred = prob >= 0.5 ? 1 : 0;
    if (pred === a.label) correctCount++;
    return { ...a, z, prob, pred };
  });

  const accuracy = Math.round((correctCount / athletes.length) * 100);

  // Map graph coordinates to SVG (x1: 0..12, x2: 0..20)
  const width = 360;
  const height = 260;
  const margin = 35;

  const scaleX = (val) => margin + (val / 12) * (width - 2 * margin);
  const scaleY = (val) => height - margin - (val / 20) * (height - 2 * margin);

  // Line points x1=0 to x1=12
  const yAt0 = w2 !== 0 ? (-b) / w2 : 0;
  const yAt12 = w2 !== 0 ? (-w1 * 12 - b) / w2 : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '20px', alignItems: 'center' }}>
      {/* Controls Column */}
      <div className="interactive-widget-box">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '800', color: '#0A345D', fontSize: '1rem' }}>⚙️ Parâmetros do Neurônio</span>
          <span style={{ 
            background: accuracy >= 90 ? '#DEF7EC' : accuracy >= 60 ? '#FEF08A' : '#FDE8E8',
            color: accuracy >= 90 ? '#03543F' : accuracy >= 60 ? '#713F12' : '#9B1C1C',
            fontWeight: '800', padding: '4px 12px', borderRadius: '16px', fontSize: '0.85rem'
          }}>
            Acurácia: {accuracy}%
          </span>
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <span>Peso W₁ (Creatina):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{w1.toFixed(2)}</span>
          </div>
          <input type="range" min="-3" max="3" step="0.1" value={w1} onChange={e => setW1(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <span>Peso W₂ (Horas Treino):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{w2.toFixed(2)}</span>
          </div>
          <input type="range" min="-3" max="3" step="0.1" value={w2} onChange={e => setW2(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="slider-group">
          <div className="slider-label">
            <span>Viés (Bias - b):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '700' }}>{b.toFixed(1)}</span>
          </div>
          <input type="range" min="-25" max="5" step="0.5" value={b} onChange={e => setB(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="math-box" style={{ fontSize: '0.9rem', margin: 0, padding: '10px' }}>
          z = ({w1.toFixed(1)} × x₁) + ({w2.toFixed(1)} × x₂) + ({b.toFixed(1)})
        </div>

        <button 
          onClick={() => { setW1(1.2); setW2(0.9); setB(-11.5); }}
          style={{ background: '#0A345D', color: '#FFF', border: 'none', padding: '8px 14px', borderRadius: '6px', fontWeight: '700', fontSize: '0.85rem', cursor: 'pointer' }}
        >
          🔄 Resetar para Solução Ótima
        </button>
      </div>

      {/* SVG Graph Column */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{ color: '#0A345D', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
          Fronteira de Decisão: {w1.toFixed(1)}·x₁ + {w2.toFixed(1)}·x₂ + ({b.toFixed(1)}) = 0
        </h4>

        <svg width={width} height={height} style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          {/* Axis Grid */}
          <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2" />
          <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2" />

          <text x={width - margin} y={height - 10} fill="#64748B" fontSize="10" textAnchor="end">Creatina (g)</text>
          <text x={10} y={margin - 10} fill="#64748B" fontSize="10" textAnchor="start">Treino (h)</text>

          {/* Decision Line */}
          {w2 !== 0 && (
            <line 
              x1={scaleX(0)} 
              y1={scaleY(yAt0)} 
              x2={scaleX(12)} 
              y2={scaleY(yAt12)} 
              stroke="#1BB5D8" 
              strokeWidth="3" 
              strokeDasharray="4,4"
            />
          )}

          {/* Athlete Dots */}
          {processed.map(a => {
            const isCorrect = a.pred === a.label;
            const fillColor = a.label === 1 ? '#7CB342' : '#EF4444';
            return (
              <g key={a.id}>
                <circle 
                  cx={scaleX(a.x1)} 
                  cy={scaleY(a.x2)} 
                  r={isCorrect ? "7" : "9"} 
                  fill={fillColor}
                  stroke={isCorrect ? "#FFFFFF" : "#000000"} 
                  strokeWidth={isCorrect ? "2" : "3"}
                />
                {!isCorrect && (
                  <text x={scaleX(a.x1)} y={scaleY(a.x2) - 10} fill="#DC2626" fontSize="10" fontWeight="bold" textAnchor="middle">❌</text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
          <span style={{ color: '#7CB342' }}>● Alta Performance (1)</span>
          <span style={{ color: '#EF4444' }}>● Regular (0)</span>
          <span style={{ color: '#1BB5D8' }}>-- Linha z = 0</span>
        </div>
      </div>
    </div>
  );
}
