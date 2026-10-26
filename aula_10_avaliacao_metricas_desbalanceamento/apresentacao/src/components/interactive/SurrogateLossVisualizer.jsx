import React, { useState } from 'react';
import { Zap, Activity, Cpu, Layers } from 'lucide-react';

export default function SurrogateLossVisualizer() {
  const [targetLabel, setTargetLabel] = useState(1); // y = 1
  const [focalGamma, setFocalGamma] = useState(2.0);
  const [selectedZ, setSelectedZ] = useState(0.8); // Logit de teste

  // Funções de Perda avaliadas no intervalo de Logit z [-4, 4]
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));

  // Logit z -> p -> Losses
  const p = sigmoid(selectedZ);
  const pt = targetLabel === 1 ? p : 1 - p;

  // 0-1 Hard Step Error (Métrica Discreta)
  const hardMetricError = (targetLabel === 1 && p < 0.5) || (targetLabel === 0 && p >= 0.5) ? 1.0 : 0.0;
  // Cross Entropy
  const bceLoss = -Math.log(Math.max(1e-5, pt));
  // Focal Loss
  const focalLoss = -Math.pow(1 - pt, focalGamma) * Math.log(Math.max(1e-5, pt));
  // Soft Dice (para instância única)
  const softDiceLoss = 1 - (2 * pt) / (pt * pt + 1 + 1e-5);

  return (
    <div className="sim-container" style={{ gridTemplateColumns: '320px 1fr', height: '100%' }}>
      {/* Painel de Controles */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.9rem' }}>
          <Zap size={16} color="#FF7043" /> Otimização Direta & Surrogates
        </div>

        <div className="control-group">
          <label>
            <span>Logit de Saída ($z$ da Rede):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284C7' }}>z = {selectedZ.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="-3.5"
            max="3.5"
            step="0.1"
            value={selectedZ}
            onChange={(e) => setSelectedZ(parseFloat(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94A3B8' }}>
            <span>z = -3.5 (p ≈ 0.03)</span>
            <span>z = +3.5 (p ≈ 0.97)</span>
          </div>
        </div>

        <div className="control-group">
          <label>
            <span>Focal Parameter ($\gamma$):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#7C3AED' }}>γ = {focalGamma.toFixed(1)}</span>
          </label>
          <input
            type="range"
            min="0.0"
            max="5.0"
            step="0.5"
            value={focalGamma}
            onChange={(e) => setFocalGamma(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
            γ = 0 equivale à Cross-Entropy padrão.
          </div>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', marginTop: '6px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#DC2626', marginBottom: '2px' }}>
            ⚠️ O Dilema do Gradiente Zero (∇ = 0):
          </div>
          <p style={{ fontSize: '0.68rem', color: '#475569', lineHeight: '1.3' }}>
            A métrica 0-1 (Acurácia/F1) tem derivada zero em praticamente todo lugar. Sem gradiente contínuo, o otimizador Adam/SGD não consegue guiar os pesos da rede.
          </p>
        </div>
      </div>

      {/* Painel Gráfico Comparativo */}
      <div className="sim-display-panel" style={{ overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          <div className="metric-val-box" style={{ borderTop: '3px solid #64748B' }}>
            <div className="metric-label">Probabilidade p</div>
            <div className="metric-num" style={{ color: '#0A345D' }}>{p.toFixed(3)}</div>
          </div>
          <div className="metric-val-box" style={{ borderTop: '3px solid #DC2626' }}>
            <div className="metric-label">Métrica 0-1 (Hard)</div>
            <div className="metric-num" style={{ color: '#DC2626' }}>{hardMetricError} (∇ = 0)</div>
          </div>
          <div className="metric-val-box" style={{ borderTop: '3px solid #0284C7' }}>
            <div className="metric-label">Cross-Entropy</div>
            <div className="metric-num" style={{ color: '#0284C7' }}>{bceLoss.toFixed(3)}</div>
          </div>
          <div className="metric-val-box" style={{ borderTop: '3px solid #7C3AED' }}>
            <div className="metric-label">Focal Loss (γ={focalGamma})</div>
            <div className="metric-num" style={{ color: '#7C3AED' }}>{focalLoss.toFixed(3)}</div>
          </div>
        </div>

        {/* Gráfico Curvas de Perda */}
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '2px' }}>
            Paisagem da Função de Perda vs Métrica Real (Alvo y = 1)
          </div>

          <svg viewBox="0 0 450 145" style={{ width: '100%', height: 'auto', flex: 1 }}>
            {/* Eixos */}
            <line x1="30" y1="125" x2="420" y2="125" stroke="#94A3B8" strokeWidth="1.5" />
            <line x1="225" y1="125" x2="225" y2="15" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />

            {/* Curva 1: Hard Step Function 0-1 (Vermelho Degrau) */}
            <path d="M 30 25 L 225 25 L 225 125 L 420 125" fill="none" stroke="#DC2626" strokeWidth="2.5" />

            {/* Curva 2: Cross Entropy BCE (Azul Suave) */}
            <path d="M 30 15 Q 120 40 225 80 T 420 122" fill="none" stroke="#0284C7" strokeWidth="2" />

            {/* Curva 3: Focal Loss (Roxo, downweighting easy positives) */}
            <path d="M 30 20 Q 120 50 225 100 T 420 124" fill="none" stroke="#7C3AED" strokeWidth="2" strokeDasharray="4 2" />

            {/* Ponto Atual do Logit Z */}
            {(() => {
              const xPos = 225 + (selectedZ / 3.5) * 180;
              return (
                <g>
                  <line x1={xPos} y1="15" x2={xPos} y2="125" stroke="#0A345D" strokeWidth="1.5" strokeDasharray="2 2" />
                  <circle cx={xPos} cy={125 - Math.min(105, bceLoss * 28)} r="4" fill="#0284C7" />
                  <circle cx={xPos} cy={125 - Math.min(105, focalLoss * 28)} r="4" fill="#7C3AED" />
                  <text x={xPos} y="12" fill="#0A345D" fontSize="7.5" fontWeight="700" textAnchor="middle">
                    z = {selectedZ.toFixed(1)}
                  </text>
                </g>
              );
            })()}

            <text x="35" y="138" fill="#64748B" fontSize="8">Logit z = -3.5</text>
            <text x="225" y="138" fill="#64748B" fontSize="8" textAnchor="middle">z = 0 (p = 0.5)</text>
            <text x="410" y="138" fill="#64748B" fontSize="8" textAnchor="end">z = +3.5</text>
          </svg>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.72rem', color: '#475569', marginTop: '2px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '3px', background: '#DC2626' }}></span> Métrica Degrau 0-1 (Inviável para SGD)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '3px', background: '#0284C7' }}></span> Cross-Entropy (Gradiente Rico)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '12px', height: '3px', background: '#7C3AED' }}></span> Focal Loss (Foco em Difíceis)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
