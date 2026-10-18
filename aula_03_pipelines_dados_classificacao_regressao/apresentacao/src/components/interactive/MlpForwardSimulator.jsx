import React, { useState } from 'react';

export default function MlpForwardSimulator() {
  const samples = [
    { name: 'Iris Setosa', x: [5.1, 3.5, 1.4, 0.2], target: 0 },
    { name: 'Iris Versicolor', x: [6.4, 3.2, 4.5, 1.5], target: 1 },
    { name: 'Iris Virginica', x: [6.3, 3.3, 6.0, 2.5], target: 2 }
  ];

  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [layerStep, setLayerStep] = useState(2); // 0: Input, 1: Hidden ReLU, 2: Output Softmax

  const sample = samples[selectedSampleIdx];
  const [x1, x2, x3, x4] = sample.x;

  const W1 = [
    [0.15, -0.22, 0.45],
    [0.25, 0.35, -0.12],
    [-0.40, 0.50, 0.80],
    [-0.10, 0.65, 0.90]
  ];
  const b1 = [0.05, -0.10, 0.20];

  const z1 = [0, 1, 2].map(j => x1 * W1[0][j] + x2 * W1[1][j] + x3 * W1[2][j] + x4 * W1[3][j] + b1[j]);
  const a1 = z1.map(val => Math.max(0, val));

  const W2 = [
    [0.8, -0.4, -0.3],
    [-0.5, 0.6, 0.1],
    [0.9, -0.2, 0.4]
  ];
  const b2 = [0.1, 0.0, -0.1];

  const logits = [0, 1, 2].map(k => a1[0] * W2[0][k] + a1[1] * W2[1][k] + a1[2] * W2[2][k] + b2[k]);
  const expLogits = logits.map(l => Math.exp(l));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  const probs = expLogits.map(e => e / sumExp);

  const inY = [45, 105, 165, 225];
  const hidY = [65, 135, 205];
  const outY = [65, 135, 205];

  return (
    <div style={{ background: '#061F38', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '16px', color: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Bar: Sample Selector & Layer Step */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSampleIdx(idx)}
              style={{
                padding: '6px 12px',
                borderRadius: '18px',
                border: selectedSampleIdx === idx ? '2px solid #1BB5D8' : '1px solid #334155',
                background: selectedSampleIdx === idx ? '#0A345D' : 'transparent',
                color: '#FFFFFF',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '700'
              }}
            >
              🌸 {s.name}
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {['1. Entradas (X)', '2. Oculta (ReLU)', '3. Saída (Logits/Probs)'].map((label, idx) => (
            <button
              key={idx}
              onClick={() => setLayerStep(idx)}
              style={{
                padding: '6px 12px',
                borderRadius: '18px',
                border: 'none',
                background: layerStep === idx ? '#7CB342' : 'rgba(255,255,255,0.08)',
                color: layerStep === idx ? '#FFFFFF' : '#CBD5E1',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '800'
              }}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Neural Network Graph SVG */}
      <svg viewBox="0 0 920 265" style={{ width: '100%', maxHeight: '275px' }}>
        {/* Connections Input -> Hidden */}
        {layerStep >= 1 && inY.map((iy, i) =>
          hidY.map((hy, j) => (
            <line
              key={`w1-${i}-${j}`}
              x1="180"
              y1={iy}
              x2="450"
              y2={hy}
              stroke={a1[j] > 0 ? '#1BB5D8' : '#334155'}
              strokeWidth={a1[j] > 0 ? '2' : '1'}
              opacity={a1[j] > 0 ? 0.65 : 0.25}
            />
          ))
        )}

        {/* Connections Hidden -> Output */}
        {layerStep >= 2 && hidY.map((hy, j) =>
          outY.map((oy, k) => (
            <line
              key={`w2-${j}-${k}`}
              x1="490"
              y1={hy}
              x2="730"
              y2={oy}
              stroke={k === sample.target ? '#7CB342' : '#64748B'}
              strokeWidth={k === sample.target ? '2.8' : '1.2'}
              opacity={0.7}
            />
          ))
        )}

        {/* Layer 0: Input Nodes */}
        <text x="160" y="20" textAnchor="middle" fill="#64D9EF" fontSize="13" fontWeight="800">Camada de Entrada (4)</text>
        {['Sépala C.', 'Sépala L.', 'Pétala C.', 'Pétala L.'].map((label, i) => (
          <g key={i}>
            <text x="115" y={inY[i] + 5} textAnchor="end" fill="#CBD5E1" fontSize="12" fontWeight="600">{label}</text>
            <circle cx="160" cy={inY[i]} r="20" fill="#0B2545" stroke="#1BB5D8" strokeWidth="2.5" />
            <text x="160" y={inY[i] + 4} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              {sample.x[i]}
            </text>
          </g>
        ))}

        {/* Layer 1: Hidden ReLU Nodes */}
        <g style={{ opacity: layerStep >= 1 ? 1 : 0.18, transition: 'all 0.3s' }}>
          <text x="470" y="20" textAnchor="middle" fill="#AED581" fontSize="13" fontWeight="800">Oculta + ReLU (3)</text>
          {a1.map((val, j) => (
            <g key={j}>
              <circle
                cx="470"
                cy={hidY[j]}
                r="24"
                fill={val > 0 ? '#0A345D' : '#1E293B'}
                stroke={val > 0 ? '#7CB342' : '#FF7043'}
                strokeWidth="3"
              />
              <text x="470" y={hidY[j] + 5} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                {val.toFixed(1)}
              </text>
            </g>
          ))}
        </g>

        {/* Layer 2: Output Nodes */}
        <g style={{ opacity: layerStep >= 2 ? 1 : 0.18, transition: 'all 0.3s' }}>
          <text x="750" y="20" textAnchor="middle" fill="#E9D5FF" fontSize="13" fontWeight="800">Saída Softmax (3)</text>
          {['Setosa', 'Versicolor', 'Virginica'].map((name, k) => {
            const isTarget = k === sample.target;
            return (
              <g key={k}>
                <circle
                  cx="750"
                  cy={outY[k]}
                  r="24"
                  fill={isTarget ? 'rgba(124,179,66,0.25)' : '#0B2545'}
                  stroke={isTarget ? '#7CB342' : '#64D9EF'}
                  strokeWidth={isTarget ? '3.5' : '2'}
                />
                <text x="750" y={outY[k] + 5} textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {(probs[k] * 100).toFixed(0)}%
                </text>
                <text x="785" y={outY[k] + 5} fill={isTarget ? '#AED581' : '#94A3B8'} fontSize="13" fontWeight="700">
                  {name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{
        background: '#081D33',
        borderLeft: '4px solid #1BB5D8',
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '0.88rem',
        fontWeight: '600',
        color: '#E2E8F0'
      }}>
        {layerStep === 0 && 'Passo 1: As 4 medidas da flor entram como um tensor float32 na camada inicial.'}
        {layerStep === 1 && 'Passo 2: A camada linear multiplica pelos pesos W1 e a ReLU zera ativações negativas.'}
        {layerStep === 2 && `Passo 3: A camada de saída gera os logits para as 3 espécies (Alvo real: ${sample.name}).`}
      </div>
    </div>
  );
}
