import React, { useState } from 'react';
import MathView from '../MathView';

export default function ErrorNormVisualizer() {
  const [target, setTarget] = useState(0.8);
  const [estimate, setEstimate] = useState(0.2);
  const [metric, setMetric] = useState('l2'); // 'l1', 'l2', 'sq'

  const diff = target - estimate;
  const absDiff = Math.abs(diff);
  const sqDiff = diff * diff;
  const l2Norm = Math.sqrt(sqDiff);

  let currentNorm = absDiff;
  let formulaText = '\\|y - \\hat{y}\\| = |' + target.toFixed(2) + ' - ' + estimate.toFixed(2) + '| = ' + absDiff.toFixed(2);
  if (metric === 'sq') {
    currentNorm = sqDiff;
    formulaText = '(y - \\hat{y})^2 = (' + target.toFixed(2) + ' - ' + estimate.toFixed(2) + ')^2 = ' + sqDiff.toFixed(2);
  } else if (metric === 'l2') {
    currentNorm = l2Norm;
    formulaText = '\\|y - \\hat{y}\\|_2 = \\sqrt{(' + diff.toFixed(2) + ')^2} = ' + l2Norm.toFixed(2);
  }

  // Severity color
  let color = '#7CB342'; // green
  let statusText = 'Excelente! Estimativa quase perfeita (Norma baixa)';
  if (absDiff > 0.3 && absDiff <= 0.6) {
    color = '#FFB300'; // yellow/amber
    statusText = 'Atenção: Desvio moderado, requer ajuste médio nos pesos';
  } else if (absDiff > 0.6) {
    color = '#FF7043'; // orange/red
    statusText = 'Alerta: Erro alto! A norma aciona uma forte correção nos pesos';
  }

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
            📏 Demonstrador Visual da Norma do Erro: A Régua de Distância
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Mova os controles para ver como a Norma mede a gravidade da diferença entre a estimativa e o real.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setMetric('l1')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              background: metric === 'l1' ? '#1BB5D8' : '#E2E8F0',
              color: metric === 'l1' ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Norma L1 (Absoluta)
          </button>
          <button
            onClick={() => setMetric('l2')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              background: metric === 'l2' ? '#1BB5D8' : '#E2E8F0',
              color: metric === 'l2' ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Norma L2 (Euclidiana)
          </button>
          <button
            onClick={() => setMetric('sq')}
            style={{
              padding: '6px 14px',
              borderRadius: '20px',
              border: 'none',
              background: metric === 'sq' ? '#1BB5D8' : '#E2E8F0',
              color: metric === 'sq' ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            Erro Quadrático (MSE)
          </button>
        </div>
      </div>

      {/* Interactive Controls & Ruler */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '20px' }}>
        {/* Sliders Box */}
        <div style={{ background: '#FFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700', color: '#0A345D', fontSize: '0.95rem' }}>🎯 Valor Real Desejado (y):</span>
              <span style={{ fontWeight: '800', color: '#7CB342', fontSize: '1rem' }}>{(target * 100).toFixed(0)}% ({target.toFixed(2)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={target}
              onChange={(e) => setTarget(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#7CB342' }}
            />
          </div>

          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span style={{ fontWeight: '700', color: '#0A345D', fontSize: '0.95rem' }}>🤖 Palpite do Modelo (ŷ):</span>
              <span style={{ fontWeight: '800', color: '#1BB5D8', fontSize: '1rem' }}>{(estimate * 100).toFixed(0)}% ({estimate.toFixed(2)})</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={estimate}
              onChange={(e) => setEstimate(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: '#1BB5D8' }}
            />
          </div>

          {/* Math Box */}
          <div style={{ background: '#F1F5F9', padding: '12px', borderRadius: '8px', textAlign: 'center', border: '1px solid #CBD5E1' }}>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontWeight: '600', display: 'block', marginBottom: '4px' }}>CÁLCULO DA NORMA EM TEMPO REAL:</span>
            <MathView math={formulaText} block={false} />
          </div>
        </div>

        {/* Visual Ruler & Gauge */}
        <div style={{ background: '#FFF', padding: '18px', borderRadius: '12px', border: '1px solid #E2E8F0', display: 'flex', flexDirection: 'column', gap: '16px', justifyContent: 'center' }}>
          {/* Target vs Estimate Visual Line */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#64748B', marginBottom: '6px', fontWeight: '700' }}>
              <span>0% (Sem Churn)</span>
              <span>RÉGUA DE DISTÂNCIA</span>
              <span>100% (Churn)</span>
            </div>
            <div style={{ position: 'relative', height: '40px', background: '#E2E8F0', borderRadius: '20px', overflow: 'hidden' }}>
              {/* Distance Span */}
              <div
                style={{
                  position: 'absolute',
                  top: '0',
                  bottom: '0',
                  left: `${Math.min(target, estimate) * 100}%`,
                  width: `${absDiff * 100}%`,
                  background: color,
                  opacity: 0.3,
                  transition: 'all 0.3s ease'
                }}
              />
              {/* Target Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  bottom: '4px',
                  left: `calc(${target * 100}% - 4px)`,
                  width: '8px',
                  background: '#7CB342',
                  borderRadius: '4px',
                  zIndex: 2
                }}
                title="Valor Real (y)"
              />
              {/* Estimate Marker */}
              <div
                style={{
                  position: 'absolute',
                  top: '4px',
                  bottom: '4px',
                  left: `calc(${estimate * 100}% - 4px)`,
                  width: '8px',
                  background: '#1BB5D8',
                  borderRadius: '4px',
                  zIndex: 2
                }}
                title="Estimativa (ŷ)"
              />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.85rem', fontWeight: '700' }}>
              <span style={{ color: '#1BB5D8' }}>Palpite ŷ: {(estimate * 100).toFixed(0)}%</span>
              <span style={{ color: color, background: 'rgba(0,0,0,0.05)', padding: '2px 8px', borderRadius: '4px' }}>Distância: {(absDiff * 100).toFixed(0)}%</span>
              <span style={{ color: '#7CB342' }}>Meta y: {(target * 100).toFixed(0)}%</span>
            </div>
          </div>

          {/* Magnitude Bar Gauge */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D', marginBottom: '4px' }}>
              <span>VELOCÍMETRO DA NORMA DO ERRO:</span>
              <span style={{ color: color }}>{currentNorm.toFixed(3)}</span>
            </div>
            <div style={{ height: '14px', background: '#E2E8F0', borderRadius: '7px', overflow: 'hidden' }}>
              <div
                style={{
                  height: '100%',
                  width: `${Math.min(currentNorm * 100, 100)}%`,
                  background: color,
                  transition: 'all 0.3s ease'
                }}
              />
            </div>
          </div>

          {/* Correction Impulse Banner */}
          <div style={{ padding: '10px 14px', borderRadius: '8px', background: `${color}15`, borderLeft: `5px solid ${color}`, display: 'flex', alignItems: 'center', justifyBetween: 'space-between' }}>
            <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#0A345D' }}>
              {statusText}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
