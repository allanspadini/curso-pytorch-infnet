import React, { useState, useMemo } from 'react';
import { Thermometer, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

export default function CalibrationVisualizer() {
  const [temperature, setTemperature] = useState(1.0); // T=1.0 uncalibrated, T=1.8 well calibrated, T=0.5 severe overconfidence
  const [baseOverconfidence, setBaseOverconfidence] = useState(true);

  // 10 Bins de confiança e acurácia real correspondente
  const binsData = useMemo(() => {
    const rawConfidences = [0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 0.98];
    // Modelo original tem acurácia real menor que a confiança (overconfidence típico de DL)
    const baseAccuracies = [0.08, 0.15, 0.22, 0.31, 0.40, 0.48, 0.56, 0.65, 0.74, 0.82];

    return rawConfidences.map((rawConf, idx) => {
      const realAcc = baseAccuracies[idx];
      // Ajuste de probabilidade via Temperature Scaling aproximada
      // Se T > 1, suaviza (reduz confiança para classes altas)
      // Se T < 1, aguça (aumenta confiança)
      let calibratedConf = rawConf;
      if (temperature !== 1.0) {
        // Logit transform: z = log(p / (1-p)) -> z_scaled = z / T -> p_scaled = sigmoid(z_scaled)
        const logit = Math.log(Math.max(0.01, Math.min(0.99, rawConf)) / (1 - Math.max(0.01, Math.min(0.99, rawConf))));
        const scaledLogit = logit / temperature;
        calibratedConf = 1 / (1 + Math.exp(-scaledLogit));
      }

      const gap = Math.abs(calibratedConf - realAcc);
      return {
        bin: idx + 1,
        binLabel: `${(idx * 10)} - ${(idx + 1) * 10}%`,
        conf: calibratedConf,
        acc: realAcc,
        gap: gap
      };
    });
  }, [temperature]);

  // Expected Calibration Error (ECE) = média ponderada dos gaps
  const ece = useMemo(() => {
    const sumGap = binsData.reduce((acc, curr) => acc + curr.gap, 0);
    return (sumGap / binsData.length) * 100;
  }, [binsData]);

  return (
    <div className="sim-container" style={{ gridTemplateColumns: '320px 1fr', height: '100%' }}>
      {/* Painel de Controle */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.9rem' }}>
          <Thermometer size={16} color="#FF7043" /> Temperature Scaling ($T$)
        </div>

        <div className="control-group">
          <label>
            <span>Temperatura ($T$):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: temperature === 1.0 ? '#64748B' : temperature > 1.0 ? '#0284C7' : '#DC2626' }}>
              T = {temperature.toFixed(2)} {temperature === 1.0 ? '(Padrão)' : temperature > 1.0 ? '(Calibrado)' : '(Superconfiante)'}
            </span>
          </label>
          <input
            type="range"
            min="0.3"
            max="3.0"
            step="0.05"
            value={temperature}
            onChange={(e) => setTemperature(parseFloat(e.target.value))}
          />
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#94A3B8' }}>
            <span>0.3 (Aguçado)</span>
            <span>1.0 (Original)</span>
            <span>3.0 (Suavizado)</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '6px', marginTop: '4px' }}>
          <button
            onClick={() => setTemperature(1.0)}
            style={{ flex: 1, padding: '5px', fontSize: '0.7rem', borderRadius: '4px', border: '1px solid #CBD5E1', background: '#F1F5F9', cursor: 'pointer' }}
          >
            Reset (T=1.0)
          </button>
          <button
            onClick={() => setTemperature(1.75)}
            style={{ flex: 1, padding: '5px', fontSize: '0.7rem', fontWeight: 700, borderRadius: '4px', border: '1px solid #0284C7', background: '#E0F2FE', color: '#0369A1', cursor: 'pointer' }}
          >
            Ótimo (T=1.75)
          </button>
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '10px', marginTop: '6px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
            PyTorch Implementation:
          </div>
          <pre style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: '#0369A1', background: '#F8FAFC', padding: '6px', borderRadius: '4px', overflowX: 'auto' }}>
{`# Temperature Scaling pós-treino
logits = model(x)
scaled_logits = logits / temperature
probs = torch.softmax(scaled_logits, dim=-1)`}
          </pre>
          <div style={{ fontSize: '0.68rem', color: '#64748B', marginTop: '4px' }}>
            ⚡ <b>Propriedade Chave:</b> Preserva 100% da acurácia e Top-1 rank, ajustando apenas a confiabilidade probabilística!
          </div>
        </div>
      </div>

      {/* Painel de Visualização: Diagrama de Confiabilidade (Reliability Diagram) */}
      <div className="sim-display-panel" style={{ overflowY: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#0A345D' }}>Diagrama de Confiabilidade (Reliability Curve)</span>
            <span style={{ fontSize: '0.75rem', color: '#64748B', marginLeft: '8px' }}>Acurácia Real vs Confiança Predita</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: ece < 5 ? '#DCFCE7' : ece < 12 ? '#FEF3C7' : '#FEE2E2', padding: '4px 10px', borderRadius: '20px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#475569' }}>ECE (Expected Calibration Error):</span>
            <span style={{ fontSize: '0.95rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: ece < 5 ? '#15803D' : ece < 12 ? '#B45309' : '#B91C1C' }}>
              {ece.toFixed(2)}%
            </span>
          </div>
        </div>

        {/* Gráfico SVG de Barras de Confiabilidade */}
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <svg viewBox="0 0 450 180" style={{ width: '100%', height: 'auto', flex: 1 }}>
            {/* Linha Diagonal Perfeita (Calibração Ideal y = x) */}
            <line x1="40" y1="150" x2="420" y2="20" stroke="#94A3B8" strokeWidth="1.5" strokeDasharray="4 4" />
            <text x="415" y="15" fill="#64748B" fontSize="8" textAnchor="end">Calibração Perfeita (y = x)</text>

            {/* Eixos */}
            <line x1="40" y1="150" x2="430" y2="150" stroke="#64748B" strokeWidth="1.5" />
            <line x1="40" y1="150" x2="40" y2="15" stroke="#64748B" strokeWidth="1.5" />

            <text x="235" y="168" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="600">Confiança Média Predita</text>
            <text x="12" y="85" textAnchor="middle" fill="#475569" fontSize="8.5" fontWeight="600" transform="rotate(-90 12 85)">Acurácia Real</text>

            {/* Bins e Gaps */}
            {binsData.map((b, i) => {
              const xPos = 40 + (i * 38) + 4;
              const barWidth = 30;
              const accHeight = b.acc * 130;
              const confHeight = b.conf * 130;
              const isOverconfident = b.conf > b.acc;

              return (
                <g key={i}>
                  {/* Barra de Acurácia Real (Azul) */}
                  <rect
                    x={xPos}
                    y={150 - accHeight}
                    width={barWidth}
                    height={accHeight}
                    fill="#0284C7"
                    opacity="0.85"
                    rx="2"
                  />

                  {/* Barra de Gap de Calibração (Vermelho/Rosa) */}
                  {b.gap > 0.02 && (
                    <rect
                      x={xPos}
                      y={isOverconfident ? 150 - confHeight : 150 - accHeight}
                      width={barWidth}
                      height={Math.abs(confHeight - accHeight)}
                      fill={isOverconfident ? '#EF4444' : '#F59E0B'}
                      opacity="0.5"
                      rx="1"
                    />
                  )}

                  {/* Ponto de Confiança */}
                  <circle
                    cx={xPos + barWidth / 2}
                    cy={150 - confHeight}
                    r="3.5"
                    fill="#0A345D"
                    stroke="#FFFFFF"
                    strokeWidth="1"
                  />

                  {/* Label do Bin */}
                  <text x={xPos + barWidth / 2} y="160" textAnchor="middle" fill="#64748B" fontSize="6.5">
                    {i + 1}
                  </text>
                </g>
              );
            })}
          </svg>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.72rem', color: '#475569', marginTop: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#0284C7', borderRadius: '2px' }}></span> Acurácia Real
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#EF4444', opacity: 0.6, borderRadius: '2px' }}></span> Gap de Superconfiança (Erro)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '7px', height: '7px', background: '#0A345D', borderRadius: '50%' }}></span> Confiança Média
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
