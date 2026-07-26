import React, { useState } from 'react';

export default function ActivationPlotter() {
  const [fnType, setFnType] = useState('sigmoid');
  const [zVal, setZVal] = useState(1.5);

  const funcs = {
    sigmoid: {
      name: 'Sigmoid',
      formula: 'σ(z) = 1 / (1 + e⁻ᶻ)',
      derivFormula: "σ'(z) = σ(z) × (1 - σ(z))",
      range: '[0, 1]',
      calc: (z) => 1 / (1 + Math.exp(-z)),
      calcDeriv: (z) => {
        const s = 1 / (1 + Math.exp(-z));
        return s * (1 - s);
      },
      color: '#1BB5D8',
      desc: 'Achata qualquer entrada para [0, 1]. Excelente para probabilidades no final de classificações binárias.'
    },
    tanh: {
      name: 'Tanh (Tangente Hiperbólica)',
      formula: 'tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)',
      derivFormula: "tanh'(z) = 1 - tanh²(z)",
      range: '[-1, 1]',
      calc: (z) => Math.tanh(z),
      calcDeriv: (z) => 1 - Math.pow(Math.tanh(z), 2),
      color: '#AB47BC',
      desc: 'Centrada em zero [-1, 1], facilitando a convergência com média nula nas camadas intermediárias.'
    },
    relu: {
      name: 'ReLU (Rectified Linear Unit)',
      formula: 'f(z) = max(0, z)',
      derivFormula: "f'(z) = 1 (se z > 0) senão 0",
      range: '[0, +∞)',
      calc: (z) => Math.max(0, z),
      calcDeriv: (z) => (z > 0 ? 1 : 0),
      color: '#7CB342',
      desc: 'Função padrão em redes modernas. Gradiente constante igual a 1 para z > 0 combate o vanishing gradient.'
    },
    leaky_relu: {
      name: 'Leaky ReLU',
      formula: 'f(z) = max(0.1z, z)',
      derivFormula: "f'(z) = 1 (se z > 0) senão 0.1",
      range: '(-∞, +∞)',
      calc: (z) => (z > 0 ? z : 0.1 * z),
      calcDeriv: (z) => (z > 0 ? 1 : 0.1),
      color: '#FF7043',
      desc: 'Corrige o problema do "neurônio morto" da ReLU permitindo um pequeno vazamento de gradiente (0.1) para z < 0.'
    }
  };

  const current = funcs[fnType];
  const outputVal = current.calc(zVal);
  const derivVal = current.calcDeriv(zVal);

  // SVG dimensions
  const width = 460;
  const height = 340;
  const margin = 35;

  const scaleX = (z) => margin + ((z + 6) / 12) * (width - 2 * margin);
  const scaleY = (y) => {
    const minY = -1.5;
    const maxY = 2.5;
    return height - margin - ((y - minY) / (maxY - minY)) * (height - 2 * margin);
  };

  // Generate curve path points
  const points = [];
  const derivPoints = [];
  for (let z = -6; z <= 6; z += 0.2) {
    points.push(`${scaleX(z)},${scaleY(current.calc(z))}`);
    derivPoints.push(`${scaleX(z)},${scaleY(current.calcDeriv(z))}`);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '28px', height: '100%', alignItems: 'stretch' }}>
      {/* Interactive Controls & Info */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
        {/* Function selector tabs */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          {Object.keys(funcs).map((key) => (
            <button
              key={key}
              onClick={() => setFnType(key)}
              style={{
                background: fnType === key ? funcs[key].color : '#F1F5F9',
                color: fnType === key ? '#FFFFFF' : '#334155',
                border: 'none',
                padding: '10px 14px',
                borderRadius: '10px',
                fontWeight: '800',
                fontSize: '1.05rem',
                cursor: 'pointer',
                boxShadow: fnType === key ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
                transition: 'all 0.2s ease'
              }}
            >
              {funcs[key].name.split(' ')[0]}
            </button>
          ))}
        </div>

        {/* Input slider */}
        <div className="interactive-widget-box" style={{ padding: '20px' }}>
          <div className="slider-label" style={{ fontSize: '1.15rem' }}>
            <span>Entrada (z):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: current.color, fontSize: '1.25rem' }}>
              {zVal.toFixed(2)}
            </span>
          </div>
          <input
            type="range"
            min="-6"
            max="6"
            step="0.1"
            value={zVal}
            onChange={(e) => setZVal(parseFloat(e.target.value))}
            className="custom-range"
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginTop: '12px' }}>
            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <span style={{ fontSize: '0.88rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Saída f(z):</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: current.color, fontSize: '1.25rem' }}>
                {outputVal.toFixed(4)}
              </span>
            </div>

            <div style={{ background: '#FFFFFF', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', textAlign: 'center' }}>
              <span style={{ fontSize: '0.88rem', color: '#64748B', display: 'block', fontWeight: '600' }}>Gradiente f'(z):</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: '800', color: '#E11D48', fontSize: '1.25rem' }}>
                {derivVal.toFixed(4)}
              </span>
            </div>
          </div>
        </div>

        <div className="content-card" style={{ padding: '22px', borderColor: current.color }}>
          <h4 style={{ color: current.color, fontWeight: '800', fontSize: '1.3rem', marginBottom: '8px' }}>
            {current.name} (Intervalo: {current.range})
          </h4>
          <p style={{ fontSize: '1.12rem', color: '#334155', lineHeight: '1.5' }}>
            {current.desc}
          </p>
        </div>
      </div>

      {/* SVG Plot Column */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #CBD5E1', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '12px', fontSize: '1.05rem', fontWeight: '800' }}>
          <span style={{ color: current.color }}>— f(z)</span>
          <span style={{ color: '#E11D48' }}>- - Derivada f'(z)</span>
        </div>

        <svg width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', maxHeight: '350px' }}>
          {/* Axes */}
          <line x1={margin} y1={scaleY(0)} x2={width - margin} y2={scaleY(0)} stroke="#CBD5E1" strokeWidth="2.5" />
          <line x1={scaleX(0)} y1={margin} x2={scaleX(0)} y2={height - margin} stroke="#CBD5E1" strokeWidth="2.5" />

          {/* Function Curve */}
          <polyline fill="none" stroke={current.color} strokeWidth="4" points={points.join(' ')} />

          {/* Derivative Curve */}
          <polyline fill="none" stroke="#E11D48" strokeWidth="2.5" strokeDasharray="5,5" points={derivPoints.join(' ')} />

          {/* Active Point Indicator */}
          <circle cx={scaleX(zVal)} cy={scaleY(outputVal)} r="8" fill={current.color} stroke="#FFFFFF" strokeWidth="2.5" />
          <circle cx={scaleX(zVal)} cy={scaleY(derivVal)} r="7" fill="#E11D48" stroke="#FFFFFF" strokeWidth="2.5" />
        </svg>

        <div className="math-box" style={{ width: '100%', fontSize: '1.15rem', padding: '12px 18px', margin: '14px 0 0 0', borderLeftWidth: '5px' }}>
          {current.formula}
        </div>
      </div>
    </div>
  );
}
