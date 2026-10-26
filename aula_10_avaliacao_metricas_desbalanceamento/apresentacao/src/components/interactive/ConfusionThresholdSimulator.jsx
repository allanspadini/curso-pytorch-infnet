import React, { useState, useMemo } from 'react';
import { Sliders, DollarSign, TrendingUp, AlertTriangle, ShieldCheck } from 'lucide-react';

export default function ConfusionThresholdSimulator() {
  const [threshold, setThreshold] = useState(0.50);
  const [imbalancePreset, setImbalancePreset] = useState('fraud'); // 'fraud' (2%), 'medical' (10%), 'balanced' (50%)
  const [costFP, setCostFP] = useState(15); // Custo de bloquear transação legítima
  const [costFN, setCostFN] = useState(400); // Custo de não detectar fraude
  const [benefitTP, setBenefitTP] = useState(300); // Valor recuperado

  const totalSamples = 2000;

  // Dados sintéticos pré-calculados baseados na distribuição de probabilidades
  const stats = useMemo(() => {
    let posCount = 40; // 2% fraud
    if (imbalancePreset === 'medical') posCount = 200; // 10%
    if (imbalancePreset === 'balanced') posCount = 1000; // 50%
    const negCount = totalSamples - posCount;

    // Gerar estimativas realistas de TP, FP, FN, TN variando com o limiar
    // Positivos seguem distribuição Beta(4, 2), Negativos seguem Beta(1.5, 6)
    // Para simplificar e garantir 60fps determinístico e preciso:
    const recallVal = Math.max(0, Math.min(1, Math.pow(1 - threshold, 0.75)));
    const fprVal = Math.max(0, Math.min(1, Math.pow(1 - threshold, 3.2)));

    const tp = Math.round(posCount * recallVal);
    const fn = posCount - tp;
    const fp = Math.round(negCount * fprVal);
    const tn = negCount - fp;

    const precision = (tp + fp) > 0 ? tp / (tp + fp) : 1;
    const recall = (tp + fn) > 0 ? tp / (tp + fn) : 0;
    const f1 = (precision + recall) > 0 ? (2 * precision * recall) / (precision + recall) : 0;
    const f2 = (precision + recall) > 0 ? (5 * precision * recall) / (4 * precision + recall) : 0;
    const f05 = (precision + recall) > 0 ? (1.25 * precision * recall) / (0.25 * precision + recall) : 0;

    const totalProfit = (tp * benefitTP) - (fp * costFP) - (fn * costFN);

    return { posCount, negCount, tp, fp, fn, tn, precision, recall, f1, f2, f05, totalProfit };
  }, [threshold, imbalancePreset, costFP, costFN, benefitTP]);

  return (
    <div className="sim-container" style={{ gridTemplateColumns: '320px 1fr', height: '100%' }}>
      {/* Controles */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.9rem' }}>
          <Sliders size={16} color="#1BB5D8" /> Ajuste de Limiar & Custos
        </div>

        <div className="control-group">
          <label>
            <span>Limiar de Decisão (Threshold):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284C7' }}>{threshold.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="0.01"
            max="0.99"
            step="0.01"
            value={threshold}
            onChange={(e) => setThreshold(parseFloat(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94A3B8' }}>
            <span>0.0 (Sensibilidade Máx)</span>
            <span>1.0 (Especificidade Máx)</span>
          </div>
        </div>

        <div className="control-group">
          <label>Cenário de Aplicação:</label>
          <div style={{ display: 'flex', gap: '4px' }}>
            <button
              onClick={() => setImbalancePreset('fraud')}
              style={{
                flex: 1,
                padding: '5px',
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: imbalancePreset === 'fraud' ? '#EF4444' : '#CBD5E1',
                background: imbalancePreset === 'fraud' ? '#FEE2E2' : '#FFFFFF',
                color: imbalancePreset === 'fraud' ? '#991B1B' : '#475569',
                cursor: 'pointer'
              }}
            >
              Fraude (2%)
            </button>
            <button
              onClick={() => setImbalancePreset('medical')}
              style={{
                flex: 1,
                padding: '5px',
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: imbalancePreset === 'medical' ? '#F59E0B' : '#CBD5E1',
                background: imbalancePreset === 'medical' ? '#FEF3C7' : '#FFFFFF',
                color: imbalancePreset === 'medical' ? '#92400E' : '#475569',
                cursor: 'pointer'
              }}
            >
              Saúde (10%)
            </button>
            <button
              onClick={() => setImbalancePreset('balanced')}
              style={{
                flex: 1,
                padding: '5px',
                fontSize: '0.7rem',
                fontWeight: 600,
                borderRadius: '4px',
                border: '1px solid',
                borderColor: imbalancePreset === 'balanced' ? '#10B981' : '#CBD5E1',
                background: imbalancePreset === 'balanced' ? '#DCFCE7' : '#FFFFFF',
                color: imbalancePreset === 'balanced' ? '#065F46' : '#475569',
                cursor: 'pointer'
              }}
            >
              Balanceado (50%)
            </button>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #E2E8F0', paddingTop: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#334155', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <DollarSign size={14} color="#10B981" /> Matriz de Custos de Negócio
          </div>
          
          <div className="control-group" style={{ marginBottom: '6px' }}>
            <label>
              <span>Custo Falso Positivo (FP):</span>
              <span style={{ color: '#EA580C', fontWeight: 700 }}>${costFP}</span>
            </label>
            <input type="range" min="1" max="100" step="1" value={costFP} onChange={(e) => setCostFP(parseInt(e.target.value))} />
          </div>

          <div className="control-group">
            <label>
              <span>Custo Falso Negativo (FN):</span>
              <span style={{ color: '#DC2626', fontWeight: 700 }}>${costFN}</span>
            </label>
            <input type="range" min="50" max="1000" step="25" value={costFN} onChange={(e) => setCostFN(parseInt(e.target.value))} />
          </div>
        </div>
      </div>

      {/* Painel de Resultados */}
      <div className="sim-display-panel" style={{ overflowY: 'auto' }}>
        {/* Métricas Principais em Linha */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
          <div className="metric-val-box">
            <div className="metric-label">Precisão</div>
            <div className="metric-num" style={{ color: '#0284C7' }}>{(stats.precision * 100).toFixed(1)}%</div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">Recall (Sensib.)</div>
            <div className="metric-num" style={{ color: '#16A34A' }}>{(stats.recall * 100).toFixed(1)}%</div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">F1-Score</div>
            <div className="metric-num" style={{ color: '#7C3AED' }}>{stats.f1.toFixed(3)}</div>
          </div>
          <div className="metric-val-box">
            <div className="metric-label">F₂-Score (Recall)</div>
            <div className="metric-num" style={{ color: '#D97706' }}>{stats.f2.toFixed(3)}</div>
          </div>
          <div className="metric-val-box" style={{ background: stats.totalProfit >= 0 ? '#ECFDF5' : '#FEF2F2' }}>
            <div className="metric-label">Lucro Líquido</div>
            <div className="metric-num" style={{ color: stats.totalProfit >= 0 ? '#059669' : '#DC2626', fontSize: '1rem' }}>
              ${stats.totalProfit.toLocaleString()}
            </div>
          </div>
        </div>

        {/* Matriz de Confusão Visual */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '6px', textAlign: 'center' }}>
              Matriz de Confusão Dinâmica (N = {totalSamples})
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '70px 1fr 1fr', gap: '6px', fontSize: '0.75rem', textAlign: 'center' }}>
              <div></div>
              <div style={{ fontWeight: 700, color: '#64748B' }}>Pred. Neg (0)</div>
              <div style={{ fontWeight: 700, color: '#64748B' }}>Pred. Pos (1)</div>

              <div style={{ fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Real Neg (0)</div>
              <div style={{ background: '#F1F5F9', padding: '8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                <div style={{ fontSize: '0.68rem', color: '#64748B' }}>TN (Verd. Negativo)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#334155' }}>{stats.tn}</div>
              </div>
              <div style={{ background: '#FFF7ED', padding: '8px', borderRadius: '4px', border: '1px solid #FDBA74' }}>
                <div style={{ fontSize: '0.68rem', color: '#C2410C' }}>FP (Alarme Falso)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#EA580C' }}>{stats.fp}</div>
                <div style={{ fontSize: '0.65rem', color: '#9A3412' }}>-${stats.fp * costFP}</div>
              </div>

              <div style={{ fontWeight: 700, color: '#64748B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Real Pos (1)</div>
              <div style={{ background: '#FEF2F2', padding: '8px', borderRadius: '4px', border: '1px solid #FCA5A5' }}>
                <div style={{ fontSize: '0.68rem', color: '#B91C1C' }}>FN (Perda Crítica)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#DC2626' }}>{stats.fn}</div>
                <div style={{ fontSize: '0.65rem', color: '#7F1D1D' }}>-${stats.fn * costFN}</div>
              </div>
              <div style={{ background: '#F0FDF4', padding: '8px', borderRadius: '4px', border: '1px solid #86EFAC' }}>
                <div style={{ fontSize: '0.68rem', color: '#15803D' }}>TP (Acerto Positivo)</div>
                <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#16A34A' }}>{stats.tp}</div>
                <div style={{ fontSize: '0.65rem', color: '#14532D' }}>+${stats.tp * benefitTP}</div>
              </div>
            </div>
          </div>

          {/* Gráfico SVG de Trade-off Precision vs Recall & Lucro */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
              Impacto do Threshold no Negócio
            </div>
            
            <svg viewBox="0 0 280 130" style={{ width: '100%', height: 'auto', flex: 1 }}>
              {/* Eixos */}
              <line x1="25" y1="110" x2="265" y2="110" stroke="#CBD5E1" strokeWidth="1.5" />
              <line x1="25" y1="110" x2="25" y2="10" stroke="#CBD5E1" strokeWidth="1.5" />

              {/* Curva de Recall (Verde decrescente) */}
              <path d="M 25 15 Q 120 40 265 110" fill="none" stroke="#16A34A" strokeWidth="2" />
              {/* Curva de Precisão (Azul crescente) */}
              <path d="M 25 95 Q 100 85 265 15" fill="none" stroke="#0284C7" strokeWidth="2" />

              {/* Linha vertical do threshold selecionado */}
              <line
                x1={25 + threshold * 240}
                y1="10"
                x2={25 + threshold * 240}
                y2="110"
                stroke="#DC2626"
                strokeWidth="2"
                strokeDasharray="3 3"
              />
              <circle cx={25 + threshold * 240} cy={110 - stats.recall * 95} r="4" fill="#16A34A" />
              <circle cx={25 + threshold * 240} cy={110 - stats.precision * 95} r="4" fill="#0284C7" />

              <text x="30" y="122" fill="#64748B" fontSize="8">Threshold 0.0</text>
              <text x="235" y="122" fill="#64748B" fontSize="8">1.0</text>
              <text x={Math.min(210, Math.max(30, 25 + threshold * 240))} y="8" fill="#DC2626" fontSize="8.5" fontWeight="700" textAnchor="middle">
                T = {threshold.toFixed(2)}
              </text>
            </svg>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#0284C7', borderRadius: '50%' }}></span> Precisão
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#16A34A', borderRadius: '50%' }}></span> Recall
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', background: '#DC2626', borderRadius: '50%' }}></span> Limiar
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
