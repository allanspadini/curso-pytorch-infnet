import React, { useState } from 'react';
import { Cpu, ArrowRight, CheckCircle } from 'lucide-react';

export default function MlpForwardSimulator() {
  const samples = [
    { name: 'Setosa (Classe 0)', x: [5.1, 3.5, 1.4, 0.2], target: 0 },
    { name: 'Versicolor (Classe 1)', x: [6.4, 3.2, 4.5, 1.5], target: 1 },
    { name: 'Virginica (Classe 2)', x: [6.3, 3.3, 6.0, 2.5], target: 2 }
  ];

  const [selectedSampleIdx, setSelectedSampleIdx] = useState(0);
  const [useActivation, setUseActivation] = useState(true);

  const sample = samples[selectedSampleIdx];
  const [x1, x2, x3, x4] = sample.x;

  // Fixed weights for demonstration
  // Layer 1: 4 inputs -> 3 hidden neurons
  const W1 = [
    [0.15, -0.22, 0.45],
    [0.25, 0.35, -0.12],
    [-0.40, 0.50, 0.80],
    [-0.10, 0.65, 0.90]
  ];
  const b1 = [0.05, -0.10, 0.20];

  // Hidden layer calculation
  const z1 = [0, 1, 2].map(j => {
    return x1 * W1[0][j] + x2 * W1[1][j] + x3 * W1[2][j] + x4 * W1[3][j] + b1[j];
  });

  const a1 = z1.map(val => (useActivation ? Math.max(0, val) : val));

  // Layer 2: 3 hidden -> 3 classes logits
  const W2 = [
    [0.8, -0.4, -0.3],
    [-0.5, 0.6, 0.1],
    [0.9, -0.2, 0.4]
  ];
  const b2 = [0.1, 0.0, -0.1];

  const logits = [0, 1, 2].map(k => {
    return a1[0] * W2[0][k] + a1[1] * W2[1][k] + a1[2] * W2[2][k] + b2[k];
  });

  // Softmax
  const expLogits = logits.map(l => Math.exp(l));
  const sumExp = expLogits.reduce((a, b) => a + b, 0);
  const probs = expLogits.map(e => e / sumExp);

  // Cross Entropy Loss
  const loss = -Math.log(Math.max(probs[sample.target], 1e-7));

  return (
    <div style={{
      background: 'rgba(6, 31, 56, 0.85)',
      border: '1px solid rgba(27, 181, 216, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      color: '#FFFFFF'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1BB5D8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
          <Cpu size={20} /> Simulador do Forward Pass da MLP no Dataset Iris
        </h3>

        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <label style={{ fontSize: '0.85rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              checked={useActivation}
              onChange={e => setUseActivation(e.target.checked)}
              style={{ accentColor: '#1BB5D8' }}
            />
            <span style={{ color: useActivation ? '#64D9EF' : '#FF7043', fontWeight: 'bold' }}>
              {useActivation ? 'Com ReLU (Não-Linear)' : 'Sem Ativação (Linear)'}
            </span>
          </label>
        </div>
      </div>

      {/* Sample selector */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        {samples.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedSampleIdx(idx)}
            style={{
              flex: 1,
              padding: '8px',
              borderRadius: '6px',
              border: selectedSampleIdx === idx ? '2px solid #1BB5D8' : '1px solid rgba(255,255,255,0.15)',
              background: selectedSampleIdx === idx ? 'rgba(27, 181, 216, 0.2)' : 'rgba(255,255,255,0.05)',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '0.85rem',
              fontWeight: 'bold'
            }}
          >
            {s.name}
          </button>
        ))}
      </div>

      {/* Network Pipeline Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: '10px', alignItems: 'center' }}>
        {/* Layer 0: Inputs */}
        <div style={{ background: '#041527', padding: '12px', borderRadius: '8px', border: '1px solid #1A365D' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>Entradas X (4)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', fontSize: '0.8rem' }}>
            <div>Sépala Comp: <strong style={{ color: '#64D9EF' }}>{x1}</strong></div>
            <div>Sépala Larg: <strong style={{ color: '#64D9EF' }}>{x2}</strong></div>
            <div>Pétala Comp: <strong style={{ color: '#64D9EF' }}>{x3}</strong></div>
            <div>Pétala Larg: <strong style={{ color: '#64D9EF' }}>{x4}</strong></div>
          </div>
        </div>

        <ArrowRight color="#1BB5D8" size={20} />

        {/* Layer 1: Hidden Neurons */}
        <div style={{ background: '#041527', padding: '12px', borderRadius: '8px', border: '1px solid #1A365D' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>Camada Oculta (ReLU)</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', fontSize: '0.8rem' }}>
            {a1.map((val, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '8px' }}>
                <span>h{idx + 1}:</span>
                <span style={{ color: val > 0 ? '#7CB342' : '#FF7043', fontWeight: 'bold' }}>
                  {val.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>

        <ArrowRight color="#1BB5D8" size={20} />

        {/* Layer 2: Output Probabilities */}
        <div style={{ background: '#041527', padding: '12px', borderRadius: '8px', border: '1px solid #1A365D' }}>
          <span style={{ fontSize: '0.75rem', color: '#718096', textTransform: 'uppercase', fontWeight: 'bold' }}>Softmax Probabilidades</span>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '8px', fontSize: '0.8rem' }}>
            {['Setosa (0)', 'Versicolor (1)', 'Virginica (2)'].map((label, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', gap: '10px' }}>
                <span style={{ color: idx === sample.target ? '#7CB342' : '#A0AEC0', fontWeight: idx === sample.target ? 'bold' : 'normal' }}>
                  {label}:
                </span>
                <strong style={{ color: idx === sample.target ? '#7CB342' : '#FFFFFF' }}>
                  {(probs[idx] * 100).toFixed(1)}%
                </strong>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Loss Summary Footer */}
      <div style={{
        marginTop: '15px',
        padding: '10px 15px',
        background: 'rgba(10, 52, 93, 0.8)',
        borderRadius: '8px',
        display: 'flex',
        justify: 'space-between',
        alignItems: 'center'
      }}>
        <div style={{ fontSize: '0.85rem' }}>
          Classe Real Alvo: <strong style={{ color: '#7CB342' }}>{sample.name}</strong>
        </div>
        <div style={{ fontSize: '0.9rem' }}>
          Cross Entropy Loss: <strong style={{ color: loss < 0.5 ? '#7CB342' : '#FF7043' }}>{loss.toFixed(4)}</strong>
        </div>
      </div>
    </div>
  );
}
