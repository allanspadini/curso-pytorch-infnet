import React, { useState } from 'react';

export default function LearningRateLab() {
  const [selectedLr, setSelectedLr] = useState(0.1);

  const lrOptions = [
    { lr: 10.0, label: 'lr = 10.0 (Explosão / Oscilação)', color: '#EF4444', desc: 'Passo gigante demais! O modelo diverge, pula o mínimo global e o erro explode.' },
    { lr: 0.1, label: 'lr = 0.1 (Ideal / Rápido)', color: '#10B981', desc: 'Taxa ótima! O modelo converge de forma rápida e estável para a perda mínima.' },
    { lr: 0.01, label: 'lr = 0.01 (Suave / Seguro)', color: '#3B82F6', desc: 'Passos pequenos e conservadores. O treinamento é seguro, mas requer mais épocas.' },
    { lr: 0.0001, label: 'lr = 0.0001 (Lentidão Extrema)', color: '#8B5CF6', desc: 'Passos microscópicos. O modelo parece travado e estagna muito longe da solução.' }
  ];

  // Generate loss curve values dynamically for the selected learning rate over 50 epochs
  const generateLossCurve = (lr) => {
    const points = [];
    let w = 5.0; // initial weight far from optimal w=0
    for (let epoch = 0; epoch < 40; epoch++) {
      const loss = w * w; // Loss = w^2
      points.push(Math.min(loss, 30)); // cap for display
      const grad = 2 * w; // dLoss/dw = 2w
      if (lr >= 5.0) {
        // Divergence oscillation
        w = -w * (lr / 2);
      } else {
        w = w - lr * grad;
      }
    }
    return points;
  };

  const lossCurve = generateLossCurve(selectedLr);
  const currentOption = lrOptions.find(o => o.lr === selectedLr);

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div>
        <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
          🧪 Laboratório de Hiperparâmetros: O Impacto do Learning Rate (η)
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Selecione uma Taxa de Aprendizado para observar o comportamento da curva de erro (Loss) durante a otimização.
        </p>
      </div>

      {/* Selector Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px' }}>
        {lrOptions.map((opt) => {
          const isSelected = selectedLr === opt.lr;
          return (
            <button
              key={opt.lr}
              onClick={() => setSelectedLr(opt.lr)}
              style={{
                padding: '12px',
                borderRadius: '10px',
                border: isSelected ? `2px solid ${opt.color}` : '1px solid #CBD5E1',
                background: isSelected ? '#FFF' : '#F1F5F9',
                cursor: 'pointer',
                textAlign: 'center',
                boxShadow: isSelected ? '0 4px 12px rgba(0,0,0,0.1)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ fontSize: '0.95rem', fontWeight: '800', color: opt.color }}>{opt.label.split(' ')[0]} {opt.label.split(' ')[1]} {opt.label.split(' ')[2]}</div>
              <div style={{ fontSize: '0.75rem', color: '#64748B', marginTop: '4px' }}>{opt.label.split('(')[1].replace(')', '')}</div>
            </button>
          );
        })}
      </div>

      {/* Plot Area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 0.8fr', gap: '20px', background: '#FFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        {/* Loss Curve Graph SVG */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            📉 Curva de Perda (Loss) vs Épocas de Treinamento
          </div>
          <svg viewBox="0 0 400 180" style={{ width: '100%', height: '180px', background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
            {/* Grid lines */}
            <line x1="40" y1="20" x2="380" y2="20" stroke="#E2E8F0" strokeDasharray="4" />
            <line x1="40" y1="70" x2="380" y2="70" stroke="#E2E8F0" strokeDasharray="4" />
            <line x1="40" y1="120" x2="380" y2="120" stroke="#E2E8F0" strokeDasharray="4" />
            <line x1="40" y1="150" x2="380" y2="150" stroke="#CBD5E1" strokeWidth="2" />
            <line x1="40" y1="20" x2="40" y2="150" stroke="#CBD5E1" strokeWidth="2" />

            {/* Labels */}
            <text x="15" y="25" fontSize="10" fill="#64748B">Loss High</text>
            <text x="15" y="150" fontSize="10" fill="#64748B">Loss 0</text>
            <text x="40" y="170" fontSize="10" fill="#64748B">Época 0</text>
            <text x="360" y="170" fontSize="10" fill="#64748B">Época 40</text>

            {/* Path */}
            <polyline
              fill="none"
              stroke={currentOption.color}
              strokeWidth="3"
              points={lossCurve.map((val, idx) => {
                const x = 40 + (idx / 39) * 340;
                const normalizedY = Math.max(0, Math.min(val, 25));
                const y = 150 - (normalizedY / 25) * 130;
                return `${x},${y}`;
              }).join(' ')}
            />

            {/* Data dots */}
            {lossCurve.map((val, idx) => {
              if (idx % 4 !== 0) return null;
              const x = 40 + (idx / 39) * 340;
              const normalizedY = Math.max(0, Math.min(val, 25));
              const y = 150 - (normalizedY / 25) * 130;
              return <circle key={idx} cx={x} cy={y} r="4" fill={currentOption.color} />;
            })}
          </svg>
        </div>

        {/* Diagnosis Box */}
        <div style={{ background: '#F1F5F9', padding: '16px', borderRadius: '12px', display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center', borderLeft: `6px solid ${currentOption.color}` }}>
          <h4 style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0A345D' }}>
            Diagnóstico do Aprendizado:
          </h4>
          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5' }}>
            {currentOption.desc}
          </p>
          <div style={{ background: '#FFF', padding: '10px 12px', borderRadius: '8px', fontSize: '0.85rem', fontWeight: '700', color: currentOption.color, border: '1px solid #CBD5E1' }}>
            💡 Dica prática: Comece otimizadores como Adam com lr = 0.001 ou SGD com lr = 0.01 / 0.1 e monitore a curva de perda!
          </div>
        </div>
      </div>
    </div>
  );
}
