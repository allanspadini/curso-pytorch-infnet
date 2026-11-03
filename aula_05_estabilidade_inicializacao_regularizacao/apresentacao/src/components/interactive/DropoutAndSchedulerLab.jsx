import React, { useState } from 'react';
import { Sliders, ShieldCheck, AlertTriangle, TrendingDown, RefreshCw, Zap } from 'lucide-react';

export default function DropoutAndSchedulerLab() {
  const [dropoutRate, setDropoutRate] = useState(0.3); // 0.0 to 0.7
  const [isTrainMode, setIsTrainMode] = useState(true);
  const [seed, setSeed] = useState(0);

  // Calcula valores dinâmicos de Loss e gap com base em p
  const getSimulatedCurves = () => {
    // 10 épocas
    const trainPoints = [];
    const valPoints = [];

    for (let e = 1; e <= 10; e++) {
      // Treino decai
      const t = 1.0 / (1 + e * (0.8 - dropoutRate * 0.4));
      // Validação depende de dropout:
      // se p = 0, overfitting forte (val sobe após época 4)
      // se p = 0.3, converge suavemente junto com treino
      // se p = 0.7, underfitting
      let v;
      if (dropoutRate < 0.15) {
        v = (1.0 / (1 + e * 0.5)) + (e > 3 ? (e - 3) * 0.12 : 0);
      } else if (dropoutRate <= 0.45) {
        v = t + 0.04 + (Math.sin(e) * 0.02);
      } else {
        v = t + 0.25;
      }

      trainPoints.push(Math.max(0.02, t));
      valPoints.push(Math.max(0.05, v));
    }

    return { trainPoints, valPoints };
  };

  const { trainPoints, valPoints } = getSimulatedCurves();
  const finalTrain = trainPoints[trainPoints.length - 1];
  const finalVal = valPoints[valPoints.length - 1];
  const gap = finalVal - finalTrain;

  // Estado dos 6 neurônios
  const neurons = Array.from({ length: 6 }, (_, i) => {
    if (!isTrainMode) return true; // eval mode: todos ativos
    // train mode: desliga com prob p
    const pseudoRand = Math.abs(Math.sin((seed + 1) * 7.3 + i * 4.9));
    return pseudoRand >= dropoutRate;
  });

  const scaleFactor = dropoutRate < 1 ? (1 / (1 - dropoutRate)).toFixed(2) : '∞';

  // SVG path builder
  const toSvgPath = (points, width = 360, height = 150) => {
    return points.map((p, idx) => {
      const x = 30 + (idx / (points.length - 1)) * (width - 50);
      const y = height - 20 - (p / 1.1) * (height - 40);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(10, y).toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%'
    }}>
      {/* Header with Slider and Mode Switch */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--infnet-dark-blue)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="var(--infnet-cyan)" /> Laboratório: Dropout & Fechamento do Gap de Generalização
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#64748B' }}>
            Ajuste a probabilidade de descarte (p) e veja a resposta imediata nas curvas de loss
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button
            onClick={() => setIsTrainMode(!isTrainMode)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              border: 'none',
              background: isTrainMode ? '#D84315' : '#16A34A',
              color: '#FFFFFF',
              fontWeight: '800',
              fontSize: '0.82rem',
              cursor: 'pointer'
            }}
          >
            {isTrainMode ? 'Modo Treino (Ativo)' : 'Modo Eval (Desativado)'}
          </button>
          {isTrainMode && (
            <button
              onClick={() => setSeed(prev => prev + 1)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#F8FAFC',
                color: '#0A345D',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <RefreshCw size={13} /> Novo Lote
            </button>
          )}
        </div>
      </div>

      {/* Main Grid: Left = Interactive Curves; Right = Neurons & Diagnostics */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '20px', flex: 1, alignItems: 'stretch' }}>
        {/* Left: Dynamic Curves */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          padding: '14px 18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          {/* Slider */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.84rem', fontWeight: '800', color: '#0A345D' }}>
              Taxa de Dropout: <strong style={{ color: 'var(--infnet-cyan)' }}>p = {dropoutRate.toFixed(2)}</strong>
            </span>
            <span style={{ fontSize: '0.78rem', color: '#64748B', fontFamily: 'Fira Code, monospace' }}>
              Escala Inverted: {isTrainMode ? `${scaleFactor}x` : '1.0x'}
            </span>
          </div>

          <input
            type="range"
            min="0.0"
            max="0.7"
            step="0.05"
            value={dropoutRate}
            onChange={(e) => setDropoutRate(parseFloat(e.target.value))}
            style={{ width: '100%', cursor: 'pointer', marginBottom: '10px' }}
          />

          {/* SVG Loss Curves */}
          <div style={{ height: '140px', position: 'relative' }}>
            <svg viewBox="0 0 360 140" style={{ width: '100%', height: '100%' }}>
              <line x1="30" y1="120" x2="340" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="30" y1="15" x2="30" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="340" y="132" textAnchor="end" fill="#64748B" fontSize="9">Épocas (1 → 10)</text>
              <text x="25" y="18" textAnchor="end" fill="#64748B" fontSize="9">Loss</text>

              {/* Train Loss (Blue) */}
              <path d={toSvgPath(trainPoints, 360, 140)} fill="none" stroke="#0284C7" strokeWidth="2.5" />
              {/* Val Loss (Orange/Green) */}
              <path 
                d={toSvgPath(valPoints, 360, 140)} 
                fill="none" 
                stroke={gap > 0.3 ? '#DC2626' : '#16A34A'} 
                strokeWidth="2.5" 
                strokeDasharray="4 2" 
              />
            </svg>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', fontWeight: '700', marginTop: '6px' }}>
            <span style={{ color: '#0284C7' }}>— Loss Treino: {finalTrain.toFixed(2)}</span>
            <span style={{ color: gap > 0.3 ? '#DC2626' : '#16A34A' }}>
              --- Loss Validação: {finalVal.toFixed(2)} ({gap > 0.3 ? 'Overfitting Alto!' : 'Gap Fechado ✓'})
            </span>
          </div>
        </div>

        {/* Right: Neuron Grid & Diagnosis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          {/* 6 Neurons visualization */}
          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '12px', padding: '12px' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: '#0A345D', marginBottom: '8px' }}>
              Estado dos Neurônios Ocultos no Lote Atual:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '6px' }}>
              {neurons.map((active, i) => (
                <div
                  key={i}
                  style={{
                    background: active ? '#ECFDF5' : '#F1F5F9',
                    border: `1.5px solid ${active ? '#10B981' : '#CBD5E1'}`,
                    borderRadius: '8px',
                    padding: '8px 4px',
                    textAlign: 'center',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div style={{ fontSize: '1.1rem' }}>{active ? '⚡' : '✕'}</div>
                  <div style={{ fontSize: '0.7rem', fontWeight: '800', color: active ? '#047857' : '#94A3B8' }}>
                    h{i + 1}
                  </div>
                  <div style={{ fontSize: '0.65rem', color: active ? '#065F46' : '#94A3B8' }}>
                    {active ? `${scaleFactor}x` : '0.0'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Diagnostic Card */}
          <div style={{
            background: gap > 0.3 ? '#FEF2F2' : '#F0FDF4',
            border: `1.5px solid ${gap > 0.3 ? '#FECACA' : '#BBF7D0'}`,
            borderRadius: '12px',
            padding: '12px 14px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
              {gap > 0.3 ? <AlertTriangle color="#DC2626" size={18} /> : <ShieldCheck color="#16A34A" size={18} />}
              <strong style={{ fontSize: '0.88rem', color: gap > 0.3 ? '#991B1B' : '#166534' }}>
                {dropoutRate < 0.15 
                  ? 'p muito baixo (Overfitting)' 
                  : dropoutRate <= 0.45 
                  ? 'p ideal (Equilíbrio & Generalização)' 
                  : 'p muito alto (Underfitting)'}
              </strong>
            </div>
            <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: '1.4' }}>
              {dropoutRate < 0.15 
                ? 'Sem dropout suficiente, a rede decora o treino e a perda de validação volta a subir.'
                : dropoutRate <= 0.45 
                ? 'A rede aprende representações robustas e o gap entre treino e teste permanece mínimo.'
                : 'Muitos neurônios desligados enfraquecem a capacidade da rede de aprender o problema.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
