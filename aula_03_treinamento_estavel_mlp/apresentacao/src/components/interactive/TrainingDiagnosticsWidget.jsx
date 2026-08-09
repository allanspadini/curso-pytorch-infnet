import React, { useState } from 'react';
import { BarChart2, ShieldAlert, CheckCircle2, RefreshCw } from 'lucide-react';

export default function TrainingDiagnosticsWidget() {
  const [normType, setNormType] = useState('batchnorm');
  const [useDropout, setUseDropout] = useState(true);

  // Generate synthetic loss curves based on selected techniques
  const generateCurves = () => {
    const trainLoss = [];
    const valLoss = [];
    const gradNorms = [];

    for (let epoch = 1; epoch <= 40; epoch++) {
      let tLoss = 1.6 * Math.exp(-epoch / 10) + 0.15;
      let vLoss = 1.6 * Math.exp(-epoch / 12) + 0.20;
      let gNorm = 4.5 * Math.exp(-epoch / 15) + 0.5;

      // BatchNorm accelerates convergence and reduces gradient spikes
      if (normType === 'batchnorm') {
        tLoss *= 0.85;
        vLoss *= 0.85;
        gNorm *= 0.7;
      } else if (normType === 'layernorm') {
        tLoss *= 0.90;
        vLoss *= 0.90;
        gNorm *= 0.8;
      } else {
        // No norm -> instability spikes
        if (epoch % 7 === 0) {
          vLoss += 0.35;
          gNorm += 3.2;
        }
      }

      // Dropout prevents overfitting (reduces train/val gap)
      if (!useDropout) {
        // Without dropout -> overfitting gap widens after epoch 15
        if (epoch > 15) {
          vLoss += (epoch - 15) * 0.025;
        }
      } else {
        vLoss *= 0.95;
      }

      trainLoss.push(Math.max(0.1, tLoss));
      valLoss.push(Math.max(0.1, vLoss));
      gradNorms.push(Math.max(0.2, gNorm));
    }

    return { trainLoss, valLoss, gradNorms };
  };

  const { trainLoss, valLoss, gradNorms } = generateCurves();

  const finalTrainLoss = trainLoss[trainLoss.length - 1];
  const finalValLoss = valLoss[valLoss.length - 1];
  const gap = Math.abs(finalValLoss - finalTrainLoss);

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
          <BarChart2 size={20} /> Dashboard Interativo de Diagnóstico de Treinamento
        </h3>

        <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
          {/* Norm selector */}
          <div style={{ display: 'flex', gap: '4px' }}>
            {['none', 'batchnorm', 'layernorm'].map(type => (
              <button
                key={type}
                onClick={() => setNormType(type)}
                style={{
                  padding: '5px 10px',
                  borderRadius: '5px',
                  border: normType === type ? '1.5px solid #1BB5D8' : '1px solid rgba(255,255,255,0.2)',
                  background: normType === type ? 'rgba(27, 181, 216, 0.2)' : 'transparent',
                  color: normType === type ? '#64D9EF' : '#A0AEC0',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                  fontWeight: 'bold'
                }}
              >
                {type === 'none' ? 'Sem Norm' : type.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Dropout toggle */}
          <label style={{ fontSize: '0.8rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <input
              type="checkbox"
              checked={useDropout}
              onChange={e => setUseDropout(e.target.checked)}
              style={{ accentColor: '#7CB342' }}
            />
            <span style={{ color: useDropout ? '#7CB342' : '#FF7043', fontWeight: 'bold' }}>
              {useDropout ? 'Dropout (0.3)' : 'Sem Dropout'}
            </span>
          </label>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
        {/* Plot 1: Loss Curves */}
        <div style={{ background: '#041527', padding: '10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#64D9EF', fontWeight: 'bold' }}>Curvas de Loss (Treino vs Validação)</span>
          <svg viewBox="0 0 300 150" style={{ width: '100%', height: '140px', marginTop: '5px' }}>
            {/* Train Path */}
            <path
              d={`M ${trainLoss.map((val, idx) => `${(idx / 39) * 280 + 10},${140 - (val / 1.8) * 120}`).join(' L ')}`}
              fill="none"
              stroke="#0A345D"
              strokeWidth="2.5"
            />
            <path
              d={`M ${trainLoss.map((val, idx) => `${(idx / 39) * 280 + 10},${140 - (val / 1.8) * 120}`).join(' L ')}`}
              fill="none"
              stroke="#1BB5D8"
              strokeWidth="2"
            />

            {/* Val Path */}
            <path
              d={`M ${valLoss.map((val, idx) => `${(idx / 39) * 280 + 10},${140 - (val / 1.8) * 120}`).join(' L ')}`}
              fill="none"
              stroke="#FF7043"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', fontSize: '0.75rem' }}>
            <span style={{ color: '#1BB5D8', fontWeight: 'bold' }}>─ Loss Treino ({finalTrainLoss.toFixed(3)})</span>
            <span style={{ color: '#FF7043', fontWeight: 'bold' }}>┈ Loss Validação ({finalValLoss.toFixed(3)})</span>
          </div>
        </div>

        {/* Plot 2: Gradient Norms */}
        <div style={{ background: '#041527', padding: '10px', borderRadius: '8px' }}>
          <span style={{ fontSize: '0.8rem', color: '#7CB342', fontWeight: 'bold' }}>Norma dos Gradientes (Gradient Norms L2)</span>
          <svg viewBox="0 0 300 150" style={{ width: '100%', height: '140px', marginTop: '5px' }}>
            <path
              d={`M ${gradNorms.map((val, idx) => `${(idx / 39) * 280 + 10},${140 - (val / 5) * 120}`).join(' L ')}`}
              fill="none"
              stroke="#7CB342"
              strokeWidth="2"
            />
          </svg>
          <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#A0AEC0' }}>
            Estabilidade: <strong style={{ color: '#7CB342' }}>{normType !== 'none' ? 'Gradientes Suaves' : 'Spikes Detectados!'}</strong>
          </div>
        </div>
      </div>

      {/* Diagnostic Summary */}
      <div style={{
        marginTop: '12px',
        padding: '10px',
        background: gap > 0.3 ? 'rgba(255, 112, 67, 0.15)' : 'rgba(124, 179, 66, 0.15)',
        border: `1px solid ${gap > 0.3 ? '#FF7043' : '#7CB342'}`,
        borderRadius: '8px',
        display: 'flex',
        alignItems: 'center',
        justify: 'space-between',
        fontSize: '0.85rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {gap > 0.3 ? <ShieldAlert color="#FF7043" size={20} /> : <CheckCircle2 color="#7CB342" size={20} />}
          <span>
            Gap Treino/Validação: <strong>{gap.toFixed(3)}</strong> 
            {gap > 0.3 ? ' ⚠️ Alerta de Overfitting (Ative Dropout!)' : ' ✅ Treinamento Estável e Generalizado'}
          </span>
        </div>
      </div>
    </div>
  );
}
