import React, { useState, useMemo } from 'react';
import { BarChart3, RefreshCw, CheckCircle2, XCircle } from 'lucide-react';

export default function BootstrapSimulator() {
  const [numResamples, setNumResamples] = useState(1000);
  const [sampleSize, setSampleSize] = useState(500);
  const [modelEffectDelta, setModelEffectDelta] = useState(0.025); // +2.5% real gain
  const [seedVariation, setSeedVariation] = useState(0.035); // Variância / ruído do teste

  // Gerar distribuição Bootstrap determinística/reativa
  const bootstrapStats = useMemo(() => {
    // Gerar N réplicas da diferença de métricas (F1_B - F1_A)
    const diffs = [];
    for (let i = 0; i < numResamples; i++) {
      // Box-Muller para distribuição normal de diferenças
      const u1 = Math.random();
      const u2 = Math.random();
      const z = Math.sqrt(-2.0 * Math.log(u1 || 0.0001)) * Math.cos(2.0 * Math.PI * u2);
      const diff = modelEffectDelta + z * (seedVariation / Math.sqrt(sampleSize / 100));
      diffs.push(diff);
    }

    diffs.sort((a, b) => a - b);

    const meanDiff = diffs.reduce((acc, v) => acc + v, 0) / diffs.length;
    const lowerCI = diffs[Math.floor(numResamples * 0.025)];
    const upperCI = diffs[Math.floor(numResamples * 0.975)];
    
    // Proporção de diferenças <= 0 (Empirical one-tailed p-value)
    const nonPositiveCount = diffs.filter(d => d <= 0).length;
    const pValue = nonPositiveCount / numResamples;
    const isSignificant = lowerCI > 0;

    // Criar 15 bins para histograma
    const minVal = diffs[0];
    const maxVal = diffs[diffs.length - 1];
    const binCount = 15;
    const binWidth = (maxVal - minVal) / binCount;
    const histogram = Array(binCount).fill(0).map((_, idx) => {
      const binStart = minVal + idx * binWidth;
      const binEnd = binStart + binWidth;
      const count = diffs.filter(d => d >= binStart && (idx === binCount - 1 ? d <= binEnd : d < binEnd)).length;
      return {
        binStart,
        binEnd,
        mid: (binStart + binEnd) / 2,
        count,
        isNegative: binEnd <= 0
      };
    });

    const maxCount = Math.max(...histogram.map(h => h.count));

    return { meanDiff, lowerCI, upperCI, pValue, isSignificant, histogram, maxCount };
  }, [numResamples, sampleSize, modelEffectDelta, seedVariation]);

  return (
    <div className="sim-container" style={{ gridTemplateColumns: '320px 1fr', height: '100%' }}>
      {/* Controles */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.9rem' }}>
          <BarChart3 size={16} color="#7C3AED" /> Comparação com Bootstrap (95% CI)
        </div>

        <div className="control-group">
          <label>
            <span>Ganho Real do Modelo B:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#059669' }}>
              +{(modelEffectDelta * 100).toFixed(1)}%
            </span>
          </label>
          <input
            type="range"
            min="-0.01"
            max="0.06"
            step="0.005"
            value={modelEffectDelta}
            onChange={(e) => setModelEffectDelta(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Tamanho do Test Set ($N$):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284C7' }}>{sampleSize} amostras</span>
          </label>
          <input
            type="range"
            min="100"
            max="2000"
            step="100"
            value={sampleSize}
            onChange={(e) => setSampleSize(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Ruído / Variância da Seed:</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#EA580C' }}>{(seedVariation * 100).toFixed(1)}%</span>
          </label>
          <input
            type="range"
            min="0.01"
            max="0.08"
            step="0.005"
            value={seedVariation}
            onChange={(e) => setSeedVariation(parseFloat(e.target.value))}
          />
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px', marginTop: '4px' }}>
          <div style={{ fontSize: '0.72rem', color: '#475569' }}>
            💡 <b>Regra de Ouro:</b> Se o intervalo de 95% contiver o valor <b>0.0%</b>, o ganho observado pode ser mero fruto de sorte na inicialização ou no split!
          </div>
        </div>
      </div>

      {/* Painel de Resultados */}
      <div className="sim-display-panel" style={{ overflowY: 'auto' }}>
        {/* Banner de Conclusão */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '8px 14px',
          borderRadius: '8px',
          background: bootstrapStats.isSignificant ? '#DCFCE7' : '#FEF2F2',
          border: `1px solid ${bootstrapStats.isSignificant ? '#86EFAC' : '#FCA5A5'}`
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {bootstrapStats.isSignificant ? (
              <CheckCircle2 size={20} color="#15803D" />
            ) : (
              <XCircle size={20} color="#DC2626" />
            )}
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: 800, color: bootstrapStats.isSignificant ? '#14532D' : '#991B1B' }}>
                {bootstrapStats.isSignificant ? 'Diferença Estatisticamente Significativa' : 'Diferença NÃO Significativa (Risco de Ruído)'}
              </div>
              <div style={{ fontSize: '0.72rem', color: bootstrapStats.isSignificant ? '#166534' : '#7F1D1D' }}>
                95% CI: [{(bootstrapStats.lowerCI * 100).toFixed(2)}%, {(bootstrapStats.upperCI * 100).toFixed(2)}%] • p-valor empírico: {bootstrapStats.pValue.toFixed(3)}
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 600 }}>Diferença Média (Δ)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)', color: '#0A345D' }}>
              +{(bootstrapStats.meanDiff * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* Histograma da Distribuição de Diferenças Bootstrap */}
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
            Distribuição Empírica de Reamostragem (B = {numResamples} iterações)
          </div>

          <svg viewBox="0 0 450 150" style={{ width: '100%', height: 'auto', flex: 1 }}>
            {/* Eixo Zero */}
            {(() => {
              const minV = bootstrapStats.histogram[0].binStart;
              const maxV = bootstrapStats.histogram[bootstrapStats.histogram.length - 1].binEnd;
              if (minV <= 0 && maxV >= 0) {
                const zeroX = 40 + ((0 - minV) / (maxV - minV)) * 380;
                return (
                  <g>
                    <line x1={zeroX} y1="10" x2={zeroX} y2="130" stroke="#DC2626" strokeWidth="2" strokeDasharray="3 3" />
                    <text x={zeroX} y="8" fill="#DC2626" fontSize="7.5" fontWeight="700" textAnchor="middle">Δ = 0 (Sem ganho)</text>
                  </g>
                );
              }
              return null;
            })()}

            {/* Eixo X */}
            <line x1="30" y1="130" x2="430" y2="130" stroke="#94A3B8" strokeWidth="1.5" />

            {/* Barras do Histograma */}
            {bootstrapStats.histogram.map((bin, i) => {
              const barHeight = (bin.count / (bootstrapStats.maxCount || 1)) * 100;
              const xPos = 40 + i * (380 / bootstrapStats.histogram.length);
              const barW = (380 / bootstrapStats.histogram.length) - 2;

              return (
                <rect
                  key={i}
                  x={xPos}
                  y={130 - barHeight}
                  width={barW}
                  height={barHeight}
                  fill={bin.isNegative ? '#EF4444' : '#0284C7'}
                  opacity="0.85"
                  rx="2"
                />
              );
            })}
          </svg>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', fontSize: '0.72rem', color: '#475569', marginTop: '4px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#0284C7', borderRadius: '2px' }}></span> Réplicas com Ganho (Modelo B {'>'} A)
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '10px', height: '10px', background: '#EF4444', borderRadius: '2px' }}></span> Réplicas com Perda (Modelo B {'≤'} A)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
