import React, { useState } from 'react';
import { AlertTriangle, Zap, ShieldCheck, RefreshCw, Layers } from 'lucide-react';
import MathView from '../MathView';

export default function RNNVanishingGradientSimulator() {
  const [seqLength, setSeqLength] = useState(15);
  const [wRecurrent, setWRecurrent] = useState(0.85);
  const [tanhFactor, setTanhFactor] = useState(0.65);
  const [useClipping, setUseClipping] = useState(false);
  const [clipThreshold, setClipThreshold] = useState(1.0);

  // Calculate gradient magnitude at each timestep backwards from T to 1
  const effectiveBase = wRecurrent * tanhFactor;
  
  const timesteps = [];
  let maxGrad = 1.0;
  for (let t = seqLength; t >= 1; t--) {
    const stepsBack = seqLength - t;
    let grad = Math.pow(effectiveBase, stepsBack);
    if (useClipping && grad > clipThreshold) {
      grad = clipThreshold;
    }
    if (grad > maxGrad) maxGrad = grad;
    timesteps.push({
      step: t,
      stepsBack,
      grad,
      isInitial: t === seqLength,
      isStart: t === 1
    });
  }

  // Reverse so step 1 is on the left, step T on the right
  const sortedTimesteps = [...timesteps].sort((a, b) => a.step - b.step);
  const earliestGrad = sortedTimesteps[0].grad;

  let statusType = 'stable';
  if (effectiveBase > 1.05 && !useClipping) {
    statusType = 'exploding';
  } else if (effectiveBase < 0.9) {
    statusType = 'vanishing';
  }

  return (
    <div className="sim-container">
      {/* Controls Panel */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
          <Layers size={18} color="#0A345D" />
          <h3 style={{ fontSize: '0.92rem', color: '#0A345D', margin: 0 }}>Parâmetros da BPTT</h3>
        </div>

        <div className="control-group">
          <label>
            <span>Comprimento da Sequência (<MathView math="T" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{seqLength} passos</span>
          </label>
          <input
            type="range"
            min="3"
            max="25"
            step="1"
            value={seqLength}
            onChange={(e) => setSeqLength(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Peso Recorrente (<MathView math="W_{hh}" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{wRecurrent.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.30"
            max="1.80"
            step="0.05"
            value={wRecurrent}
            onChange={(e) => setWRecurrent(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
            &gt; 1.0 tende a explodir; &lt; 1.0 tende a desvanecer.
          </div>
        </div>

        <div className="control-group">
          <label>
            <span>Derivada da Ativação (<MathView math="\tanh'" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{tanhFactor.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.20"
            max="1.00"
            step="0.05"
            value={tanhFactor}
            onChange={(e) => setTanhFactor(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
            <MathView math="\tanh'(z) = 1 - \tanh^2(z) \le 1.0" />
          </div>
        </div>

        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={useClipping}
              onChange={(e) => setUseClipping(e.target.checked)}
            />
            <span>Ativar Gradient Clipping (<MathView math="\text{clip\_norm}" />)</span>
          </label>
          {useClipping && (
            <div style={{ fontSize: '0.7rem', color: '#166534', fontWeight: 600 }}>
              Gradiente limitado em no máximo {clipThreshold.toFixed(1)}!
            </div>
          )}
        </div>

        {/* Quick Presets */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: 'auto' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Cenários Pré-Configurados:</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px' }}>
            <button
              className="btn-interactive"
              style={{ fontSize: '0.7rem', justifyContent: 'center' }}
              onClick={() => { setSeqLength(20); setWRecurrent(0.8); setTanhFactor(0.6); setUseClipping(false); }}
            >
              Desvanecimento
            </button>
            <button
              className="btn-interactive"
              style={{ fontSize: '0.7rem', justifyContent: 'center' }}
              onClick={() => { setSeqLength(15); setWRecurrent(1.6); setTanhFactor(0.9); setUseClipping(false); }}
            >
              Explosão
            </button>
          </div>
        </div>
      </div>

      {/* Display Panel */}
      <div className="sim-display-panel">
        {/* Header Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div className="metric-val-box">
            <div className="metric-label">Base Efetiva (<MathView math="W \cdot \tanh'" />)</div>
            <div className="metric-num" style={{ color: effectiveBase < 0.9 ? '#D84315' : effectiveBase > 1.1 ? '#C2410C' : '#166534' }}>
              {effectiveBase.toFixed(3)}
            </div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">Gradiente no Passo 1 (<MathView math="\frac{\partial \mathcal{L}}{\partial h_1}" />)</div>
            <div className="metric-num" style={{ color: earliestGrad < 0.01 ? '#D84315' : '#0A345D' }}>
              {earliestGrad < 0.0001 ? earliestGrad.toExponential(2) : earliestGrad.toFixed(4)}
            </div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">Retenção de Sinal</div>
            <div className="metric-num" style={{ color: (earliestGrad * 100) < 1 ? '#D84315' : '#166534' }}>
              {Math.min(100, Math.max(0, earliestGrad * 100)).toFixed(1)}%
            </div>
          </div>
        </div>

        {/* Status Banner */}
        {statusType === 'vanishing' && (
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertTriangle size={18} color="#991B1B" />
            <div style={{ fontSize: '0.78rem', color: '#991B1B' }}>
              <strong>Vanishing Gradient Ativo:</strong> O gradiente chegou a menos de <strong>{(earliestGrad * 100).toFixed(2)}%</strong> no início da sequência. A Vanilla RNN não consegue aprender dependências de longo prazo!
            </div>
          </div>
        )}

        {statusType === 'exploding' && (
          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Zap size={18} color="#92400E" />
            <div style={{ fontSize: '0.78rem', color: '#92400E' }}>
              <strong>Exploding Gradient Ativo:</strong> O gradiente acumulou <MathView math={`> ${maxGrad.toFixed(1)}`} />. Ative o Gradient Clipping ou diminua os pesos para evitar valores <MathView math="\text{NaN}" />.
            </div>
          </div>
        )}

        {statusType === 'stable' && (
          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '6px', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ShieldCheck size={18} color="#166534" />
            <div style={{ fontSize: '0.78rem', color: '#166534' }}>
              <strong>Propagação Estável:</strong> O gradiente mantém magnitude controlada ao longo de todos os {seqLength} passos temporais.
            </div>
          </div>
        )}

        {/* Visual Chart of Gradient Decay */}
        <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>
              Magnitude do Gradiente por Passo Temporal (<MathView math="t = 1 \dots T" />):
            </span>
            <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
              Retropropagação: Direita (<MathView math="\mathcal{L}_T" />) ➔ Esquerda (<MathView math="h_1" />)
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '4px', height: '140px', padding: '0 4px', borderBottom: '2px solid #CBD5E1' }}>
            {sortedTimesteps.map((item) => {
              // normalize height against maxGrad (cap at 140px)
              const heightPercent = Math.min(100, Math.max(4, (item.grad / Math.max(1, maxGrad)) * 100));
              const isDead = item.grad < 0.02;
              return (
                <div key={item.step} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'flex-end' }}>
                  <div
                    style={{
                      width: '100%',
                      maxWidth: '28px',
                      height: `${heightPercent}%`,
                      background: item.isInitial 
                        ? '#0A345D' 
                        : isDead 
                          ? '#EF4444' 
                          : item.grad > 1.2 
                            ? '#F59E0B' 
                            : '#1BB5D8',
                      borderRadius: '3px 3px 0 0',
                      transition: 'height 0.2s ease',
                      boxShadow: item.isInitial ? '0 2px 6px rgba(10,52,93,0.3)' : 'none'
                    }}
                    title={`Passo ${item.step}: Gradiente = ${item.grad.toFixed(4)}`}
                  />
                  <span style={{ fontSize: '0.62rem', color: item.isStart || item.isInitial ? '#0A345D' : '#94A3B8', fontWeight: item.isStart || item.isInitial ? 700 : 400, marginTop: '4px' }}>
                    t={item.step}
                  </span>
                </div>
              );
            })}
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginTop: '6px' }}>
            <span>← Início da Série (<MathView math="h_1" />)</span>
            <span style={{ color: '#0E7490', fontWeight: 600 }}>Fluxo do Gradiente: Multiplicações Sucessivas</span>
            <span>Ponto da Perda (<MathView math="\mathcal{L}_T" />) →</span>
          </div>
        </div>
      </div>
    </div>
  );
}
