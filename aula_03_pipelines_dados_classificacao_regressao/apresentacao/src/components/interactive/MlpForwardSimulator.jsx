import React, { useState } from 'react';

export default function MlpForwardSimulator() {
  const samples = [
    { name: 'Iris Setosa', x: [5.1, 3.5, 1.4, 0.2], target: 0 },
    { name: 'Iris Versicolor', x: [6.4, 3.2, 4.5, 1.5], target: 1 },
    { name: 'Iris Virginica', x: [6.3, 3.3, 6.0, 2.5], target: 2 }
  ];

  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [layerStep, setLayerStep] = useState(2);

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

  const inY = [48, 106, 164, 222];
  const hidY = [65, 135, 205];
  const outY = [65, 135, 205];

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '16px', color: '#1E293B', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
        <div style={{ display: 'flex', gap: '6px' }}>
          {samples.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedSampleIdx(idx)}
              style={{
                padding: '6px 12px',
                borderRadius: '18px',
                border: selectedSampleIdx === idx ? '2px solid #0284C7' : '1px solid #CBD5E1',
                background: selectedSampleIdx === idx ? '#E0F2FE' : '#FFFFFF',
                color: '#0A345D',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: '800'
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
                border: `1.5px solid ${layerStep === idx ? '#16A34A' : '#CBD5E1'}`,
                background: layerStep === idx ? '#F0FDF4' : '#FFFFFF',
                color: layerStep === idx ? '#15803D' : '#475569',
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

      <svg viewBox="0 0 920 260" style={{ width: '100%', maxHeight: '270px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        {layerStep >= 1 && inY.map((iy, i) =>
          hidY.map((hy, j) => (
            <line
              key={`w1-${i}-${j}`}
              x1="180"
              y1={iy}
              x2="446"
              y2={hy}
              stroke={a1[j] > 0 ? '#0284C7' : '#CBD5E1'}
              strokeWidth={a1[j] > 0 ? '2.2' : '1.2'}
              opacity={a1[j] > 0 ? 0.65 : 0.4}
            />
          ))
        )}

        {layerStep >= 2 && hidY.map((hy, j) =>
          outY.map((oy, k) => (
            <line
              key={`w2-${j}-${k}`}
              x1="494"
              y1={hy}
              x2="726"
              y2={oy}
              stroke={k === sample.target ? '#16A34A' : '#94A3B8'}
              strokeWidth={k === sample.target ? '2.8' : '1.2'}
              opacity={0.75}
            />
          ))
        )}

        <text x="160" y="22" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">Camada de Entrada (4)</text>
        {['Sépala C.', 'Sépala L.', 'Pétala C.', 'Pétala L.'].map((label, i) => (
          <g key={i}>
            <text x="115" y={inY[i] + 5} textAnchor="end" fill="#334155" fontSize="12" fontWeight="700">{label}</text>
            <circle cx="160" cy={inY[i]} r="20" fill="#E0F2FE" stroke="#0284C7" strokeWidth="2.5" />
            <text x="160" y={inY[i] + 4} textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              {sample.x[i]}
            </text>
          </g>
        ))}

        <g style={{ opacity: layerStep >= 1 ? 1 : 0.2, transition: 'all 0.3s' }}>
          <text x="470" y="22" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="800">Oculta + ReLU (3)</text>
          {a1.map((val, j) => (
            <g key={j}>
              <circle
                cx="470"
                cy={hidY[j]}
                r="24"
                fill={val > 0 ? '#F0FDF4' : '#FFF7ED'}
                stroke={val > 0 ? '#16A34A' : '#EA580C'}
                strokeWidth="3"
              />
              <text x="470" y={hidY[j] + 5} textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                {val.toFixed(1)}
              </text>
            </g>
          ))}
        </g>

        <g style={{ opacity: layerStep >= 2 ? 1 : 0.2, transition: 'all 0.3s' }}>
          <text x="750" y="22" textAnchor="middle" fill="#6B21A8" fontSize="13" fontWeight="800">Saída Softmax (3)</text>
          {['Setosa', 'Versicolor', 'Virginica'].map((name, k) => {
            const isTarget = k === sample.target;
            return (
              <g key={k}>
                <circle
                  cx="750"
                  cy={outY[k]}
                  r="24"
                  fill={isTarget ? '#DCFCE7' : '#F8FAFC'}
                  stroke={isTarget ? '#16A34A' : '#0284C7'}
                  strokeWidth={isTarget ? '3.5' : '2'}
                />
                <text x="750" y={outY[k] + 5} textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {(probs[k] * 100).toFixed(0)}%
                </text>
                <text x="785" y={outY[k] + 5} fill={isTarget ? '#15803D' : '#475569'} fontSize="13" fontWeight="800">
                  {name}
                </text>
              </g>
            );
          })}
        </g>
      </svg>

      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderLeft: '4px solid #0284C7',
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '0.88rem',
        fontWeight: '600',
        color: '#1E293B'
      }}>
        {layerStep === 0 && 'Passo 1: As 4 medidas da flor entram como um tensor float32 na camada inicial.'}
        {layerStep === 1 && 'Passo 2: A camada linear multiplica pelos pesos W1 e a ReLU zera ativações negativas.'}
        {layerStep === 2 && `Passo 3: A camada de saída gera os logits para as 3 espécies (Alvo real: ${sample.name}).`}
      </div>
    </div>
  );
}
