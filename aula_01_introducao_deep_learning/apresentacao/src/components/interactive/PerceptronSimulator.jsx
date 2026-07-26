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
  const width = 460;
  const height = 360;
  const margin = 42;

  const scaleX = (val) => margin + (val / 12) * (width - 2 * margin);
  const scaleY = (val) => height - margin - (val / 20) * (height - 2 * margin);

  // Line points x1=0 to x1=12
  const yAt0 = w2 !== 0 ? (-b) / w2 : 0;
  const yAt12 = w2 !== 0 ? (-w1 * 12 - b) / w2 : 0;

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr', gap: '28px', height: '100%', alignItems: 'stretch' }}>
      {/* Controls Column */}
      <div className="interactive-widget-box" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontWeight: '800', color: '#0A345D', fontSize: '1.25rem' }}>⚙️ Parâmetros do Neurônio</span>
          <span style={{ 
            background: accuracy >= 90 ? '#DEF7EC' : accuracy >= 60 ? '#FEF08A' : '#FDE8E8',
            color: accuracy >= 90 ? '#03543F' : accuracy >= 60 ? '#713F12' : '#9B1C1C',
            fontWeight: '800', padding: '6px 16px', borderRadius: '20px', fontSize: '1.05rem'
          }}>
            Acurácia: {accuracy}%
          </span>
        </div>

        <div className="slider-group" style={{ margin: '4px 0' }}>
          <div className="slider-label" style={{ fontSize: '1.1rem' }}>
            <span>Peso W₁ (Creatina):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#1BB5D8' }}>{w1.toFixed(2)}</span>
          </div>
          <input type="range" min="-3" max="3" step="0.1" value={w1} onChange={e => setW1(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="slider-group" style={{ margin: '4px 0' }}>
          <div className="slider-label" style={{ fontSize: '1.1rem' }}>
            <span>Peso W₂ (Horas Treino):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#1BB5D8' }}>{w2.toFixed(2)}</span>
          </div>
          <input type="range" min="-3" max="3" step="0.1" value={w2} onChange={e => setW2(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="slider-group" style={{ margin: '4px 0' }}>
          <div className="slider-label" style={{ fontSize: '1.1rem' }}>
            <span>Viés (Bias - b):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#0A345D' }}>{b.toFixed(1)}</span>
          </div>
          <input type="range" min="-25" max="5" step="0.5" value={b} onChange={e => setB(parseFloat(e.target.value))} className="custom-range" />
        </div>

        <div className="math-box" style={{ fontSize: '1.15rem', margin: '4px 0', padding: '14px 18px', borderLeftWidth: '5px' }}>
          z = ({w1.toFixed(1)} × x₁) + ({w2.toFixed(1)} × x₂) + ({b.toFixed(1)})
        </div>

        <button 
          onClick={() => { setW1(1.2); setW2(0.9); setB(-11.5); }}
          style={{ background: '#0A345D', color: '#FFF', border: 'none', padding: '12px 20px', borderRadius: '10px', fontWeight: '800', fontSize: '1.05rem', cursor: 'pointer', marginTop: '4px', boxShadow: 'var(--shadow-sm)' }}
        >
          🔄 Resetar para Solução Ótima
        </button>
      </div>

      {/* SVG Graph Column */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #CBD5E1', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <h4 style={{ color: '#0A345D', fontSize: '1.15rem', fontWeight: '800', marginBottom: '14px', textAlign: 'center' }}>
          Fronteira de Decisão: {w1.toFixed(1)}·x₁ + {w2.toFixed(1)}·x₂ + ({b.toFixed(1)}) = 0
        </h4>

        <svg width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', maxHeight: '370px' }}>
          {/* Axis Grid */}
          <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2.5" />
          <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2.5" />

          <text x={width - margin} y={height - 12} fill="#64748B" fontSize="12" fontWeight="bold" textAnchor="end">Creatina (g)</text>
          <text x={12} y={margin - 14} fill="#64748B" fontSize="12" fontWeight="bold" textAnchor="start">Treino (h)</text>

          {/* Decision Line */}
          {w2 !== 0 && (
            <line 
              x1={scaleX(0)} 
              y1={scaleY(yAt0)} 
              x2={scaleX(12)} 
              y2={scaleY(yAt12)} 
              stroke="#1BB5D8" 
              strokeWidth="3.5" 
              strokeDasharray="5,5"
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
                  r={isCorrect ? "9" : "11"} 
                  fill={fillColor}
                  stroke={isCorrect ? "#FFFFFF" : "#000000"} 
                  strokeWidth={isCorrect ? "2.5" : "3.5"}
                />
                {!isCorrect && (
                  <text x={scaleX(a.x1)} y={scaleY(a.x2) - 14} fill="#DC2626" fontSize="12" fontWeight="bold" textAnchor="middle">❌</text>
                )}
              </g>
            );
          })}
        </svg>

        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '1.02rem', fontWeight: '700' }}>
          <span style={{ color: '#7CB342' }}>● Alta Performance (1)</span>
          <span style={{ color: '#EF4444' }}>● Regular (0)</span>
          <span style={{ color: '#1BB5D8' }}>-- Reta z = 0</span>
        </div>
      </div>
    </div>
  );
}
