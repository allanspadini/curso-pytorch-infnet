import React, { useState } from 'react';
import { Activity, AlertTriangle, Target, CheckCircle } from 'lucide-react';

export default function AnomalyThresholdSimulator() {
  // Threshold value in range [0.015, 0.045]
  const [threshold, setThreshold] = useState(0.0325);

  // Simulated reconstruction loss distributions
  // Normal: mean 0.025, std 0.004 (500 samples)
  // Anomaly: mean 0.031, std 0.005 (500 samples)
  
  // Calculate simulated TP, FP, TN, FN
  // Approximation formulas based on normal CDF / threshold
  const calcMetrics = (t) => {
    // Normal samples (500): Loss < t -> True Negative (TN), Loss >= t -> False Positive (FP)
    const fpRatio = Math.max(0, Math.min(1, (0.035 - t) / 0.018));
    const fp = Math.round(500 * fpRatio * 0.4);
    const tn = 500 - fp;

    // Anomaly samples (500): Loss >= t -> True Positive (TP), Loss < t -> False Negative (FN)
    const tpRatio = Math.max(0, Math.min(1, (0.042 - t) / 0.020));
    const tp = Math.round(500 * tpRatio);
    const fn = 500 - tp;

    const precision = tp + fp > 0 ? (tp / (tp + fp)).toFixed(2) : '1.00';
    const recall = (tp / 500).toFixed(2);
    const f1 = (tp + fp > 0 && parseFloat(precision) + parseFloat(recall) > 0)
      ? ((2 * parseFloat(precision) * parseFloat(recall)) / (parseFloat(precision) + parseFloat(recall))).toFixed(2)
      : '0.00';

    return { tp, fp, tn, fn, precision, recall, f1 };
  };

  const metrics = calcMetrics(threshold);
  const naiveThreshold = 0.0325; // mean(0.0243) + 2*std(0.0041)

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Activity size={20} color="#FF7043" />
          <h3 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: 700 }}>
            Simulador de Detecção de Anomalias & Limiar (Threshold) de Reconstrução
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className={`btn-interactive ${threshold === naiveThreshold ? 'active' : ''}`}
            onClick={() => setThreshold(naiveThreshold)}
          >
            Threshold Treino (μ + 2σ = 0.0325)
          </button>
          <button
            className={`btn-interactive ${threshold === 0.0270 ? 'active' : ''}`}
            onClick={() => setThreshold(0.0270)}
          >
            Threshold Sensibilidade (Recall ≥ 95%)
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px', width: '100%' }}>
        {/* Slider Controls */}
        <div style={{ width: '100%', background: '#F8FAFC', padding: '14px 20px', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.9rem', fontWeight: 600 }}>
            <span>Limiar de Corte (Threshold MSE): <strong style={{ color: '#0A345D', fontSize: '1.1rem' }}>{threshold.toFixed(4)}</strong></span>
            <span>Amostras Teste: <strong style={{ color: '#1BB5D8' }}>500 Normais | 500 Anômalas</strong></span>
          </div>
          <input
            type="range"
            min="0.0180"
            max="0.0400"
            step="0.0005"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
            style={{ width: '100%', accentColor: '#FF7043', cursor: 'pointer' }}
          />
        </div>

        {/* Live Metrics Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', width: '100%' }}>
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#0369A1', fontWeight: 600 }}>PRECISÃO (PRECISION)</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#0A345D', margin: '2px 0' }}>{metrics.precision}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>TP / (TP + FP)</div>
          </div>

          <div style={{ background: parseFloat(metrics.recall) >= 0.90 ? '#F0FDF4' : '#FEF2F2', border: `1px solid ${parseFloat(metrics.recall) >= 0.90 ? '#BBF7D0' : '#FECACA'}`, padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: parseFloat(metrics.recall) >= 0.90 ? '#15803D' : '#B91C1C', fontWeight: 600 }}>RECALL / SENSIBILIDADE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: parseFloat(metrics.recall) >= 0.90 ? '#166534' : '#991B1B', margin: '2px 0' }}>{metrics.recall}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>TP / 500 Anomalias</div>
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#6B21A8', fontWeight: 600 }}>F1-SCORE</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#581C87', margin: '2px 0' }}>{metrics.f1}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Média Harmônica</div>
          </div>

          <div style={{ background: metrics.fn > 100 ? '#FFF7ED' : '#F0FDF4', border: `1px solid ${metrics.fn > 100 ? '#FFEDD5' : '#BBF7D0'}`, padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: metrics.fn > 100 ? '#C2410C' : '#15803D', fontWeight: 600 }}>FALSOS NEGATIVOS</div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: metrics.fn > 100 ? '#9A3412' : '#166534', margin: '2px 0' }}>{metrics.fn}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B' }}>Anomalias Perdidas</div>
          </div>
        </div>

        {/* Simulated Distribution Graphic Representation */}
        <div style={{ width: '100%', background: '#061F38', borderRadius: '8px', padding: '14px', color: '#FFF', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: '#64D9EF', marginBottom: '8px' }}>
            <span>🟩 Distribuição Erro Normais (Média ~0.025)</span>
            <span>🟥 Distribuição Erro Anomalias (Média ~0.031)</span>
          </div>

          {/* Simple Visual Distribution Bar */}
          <div style={{ height: '36px', width: '100%', background: '#1E293B', borderRadius: '6px', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', left: '10%', width: '45%', height: '100%', background: 'rgba(34,197,94,0.4)', borderRadius: '4px' }} />
            <div style={{ position: 'absolute', left: '40%', width: '50%', height: '100%', background: 'rgba(239,68,68,0.4)', borderRadius: '4px' }} />
            
            {/* Threshold Vertical Line */}
            <div
              style={{
                position: 'absolute',
                left: `${((threshold - 0.018) / 0.022) * 100}%`,
                top: 0,
                width: '3px',
                height: '100%',
                background: '#FF7043',
                boxShadow: '0 0 8px #FF7043',
                transition: 'left 0.1s ease'
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#94A3B8', marginTop: '6px' }}>
            <span>0.0180 (Erro Baixo)</span>
            <span>Limiar Atual: {threshold.toFixed(4)}</span>
            <span>0.0400 (Erro Alto)</span>
          </div>
        </div>

        {/* Pedagogical Takeaway */}
        <div style={{ fontSize: '0.82rem', color: '#334155', background: '#F8FAFC', padding: '10px 14px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
          💡 <strong>Lição Prática:</strong> Calcular $\mu + 2\sigma$ apenas no conjunto de treino normal ignora o erro real das anomalias. Ajustar o threshold em validação para garantir Sensibilidade/Recall alto ($\ge 95\%$) previne a perda crítica de anomalias na triagem!
        </div>
      </div>
    </div>
  );
}
