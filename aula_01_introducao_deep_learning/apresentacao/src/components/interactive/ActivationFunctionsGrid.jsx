import React, { useState } from 'react';

export default function ActivationFunctionsGrid() {
  const [selectedFn, setSelectedFn] = useState(null);

  const functionsData = [
    {
      id: 'sigmoid',
      name: 'Sigmoid',
      badge: 'PROBABILIDADE BINÁRIA',
      formula: 'σ(z) = 1 / (1 + e⁻ᶻ)',
      range: 'Intervalo: [0, 1]',
      color: '#1BB5D8',
      calc: (z) => 1 / (1 + Math.exp(-z)),
      desc: 'Usada na camada final de classificação binária.'
    },
    {
      id: 'tanh',
      name: 'Tanh (Tangente Hiperbólica)',
      badge: 'CENTRADOS EM ZERO',
      formula: 'tanh(z) = (eᶻ - e⁻ᶻ) / (eᶻ + e⁻ᶻ)',
      range: 'Intervalo: [-1, 1]',
      color: '#AB47BC',
      calc: (z) => Math.tanh(z),
      desc: 'Facilita a convergência nas camadas ocultas intermediárias.'
    },
    {
      id: 'relu',
      name: 'ReLU',
      badge: 'PADRÃO OURO DEEP LEARNING',
      formula: 'f(z) = max(0, z)',
      range: 'Intervalo: [0, +∞)',
      color: '#7CB342',
      calc: (z) => Math.max(0, z),
      desc: 'Super rápida em GPUs e evita o Vanishing Gradient.'
    },
    {
      id: 'leaky_relu',
      name: 'Leaky ReLU',
      badge: 'PREVINE NEURÔNIO MORTO',
      formula: 'f(z) = max(0.1z, z)',
      range: 'Intervalo: (-∞, +∞)',
      color: '#FF7043',
      calc: (z) => (z > 0 ? z : 0.1 * z),
      desc: 'Vazamento α = 0.1 para que z < 0 continue aprendendo.'
    }
  ];

  const generatePoints = (calcFn) => {
    const pts = [];
    const width = 220;
    const height = 130;
    const margin = 20;

    const scaleX = (z) => margin + ((z + 5) / 10) * (width - 2 * margin);
    const scaleY = (y) => {
      const minY = -1.2;
      const maxY = 2.2;
      return height - margin - ((y - minY) / (maxY - minY)) * (height - 2 * margin);
    };

    for (let z = -5; z <= 5; z += 0.25) {
      pts.push(`${scaleX(z)},${scaleY(calcFn(z))}`);
    }
    return { pointsStr: pts.join(' '), scaleX, scaleY, width, height, margin };
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      {functionsData.map((fn) => {
        const { pointsStr, scaleX, scaleY, width, height, margin } = generatePoints(fn.calc);
        const isSelected = selectedFn === fn.id;

        return (
          <div
            key={fn.id}
            onClick={() => setSelectedFn(isSelected ? null : fn.id)}
            className="content-card"
            style={{
              borderColor: isSelected ? fn.color : '#CBD5E1',
              borderWidth: isSelected ? '3px' : '1px',
              boxShadow: isSelected ? `0 8px 24px ${fn.color}35` : 'var(--shadow-sm)',
              padding: '18px 22px',
              display: 'flex',
              flexDirection: 'column',
              justify: 'space-between',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              background: isSelected ? 'linear-gradient(180deg, #FFFFFF 0%, #F8FAFC 100%)' : '#FFFFFF'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span className="card-header-badge" style={{ background: `${fn.color}20`, color: fn.color, fontSize: '0.92rem', margin: 0 }}>
                {fn.badge}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: '700', color: '#64748B' }}>
                {fn.range}
              </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '16px', alignItems: 'center', flex: 1 }}>
              {/* Left Column: Title & Formulas */}
              <div>
                <h3 style={{ color: '#0A345D', fontSize: '1.45rem', fontWeight: '800', marginBottom: '6px' }}>
                  {fn.name}
                </h3>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '1.05rem', fontWeight: '700', color: fn.color, marginBottom: '8px' }}>
                  {fn.formula}
                </div>
                <p style={{ fontSize: '1.02rem', color: '#334155', lineHeight: '1.4' }}>
                  {fn.desc}
                </p>
              </div>

              {/* Right Column: High-Res SVG Vector Chart */}
              <div style={{ background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', padding: '8px', display: 'flex', justifyContent: 'center' }}>
                <svg width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} style={{ maxHeight: '140px' }}>
                  {/* Axis */}
                  <line x1={margin} y1={scaleY(0)} x2={width - margin} y2={scaleY(0)} stroke="#CBD5E1" strokeWidth="2" />
                  <line x1={scaleX(0)} y1={margin} x2={scaleX(0)} y2={height - margin} stroke="#CBD5E1" strokeWidth="2" />

                  {/* Function Curve */}
                  <polyline fill="none" stroke={fn.color} strokeWidth="4" points={pointsStr} />

                  {/* Center Dot */}
                  <circle cx={scaleX(0)} cy={scaleY(fn.calc(0))} r="5" fill={fn.color} stroke="#FFFFFF" strokeWidth="2" />
                </svg>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
