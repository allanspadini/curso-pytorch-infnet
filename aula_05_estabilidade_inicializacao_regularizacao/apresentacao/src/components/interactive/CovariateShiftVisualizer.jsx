import React, { useState } from 'react';
import { Activity, ShieldCheck, AlertTriangle, ArrowRight, RotateCcw, Target, Sparkles } from 'lucide-react';

export default function CovariateShiftVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: '1. O Alvo Móvel (Sem Normalização)',
      badge: 'DERIVA INTERNA',
      badgeColor: '#D84315',
      desc: 'Conforme a Camada 1 atualiza seus pesos, a distribuição das suas saídas oscila violentamente. A Camada 2 precisa aprender a perseguir um alvo que nunca para no mesmo lugar.',
      mean1: -1.8,
      std1: 2.2,
      mean2: 2.5,
      std2: 3.8,
      status: 'Instabilidade severa entre épocas'
    },
    {
      title: '2. Efeito Cascata em Redes Profundas',
      badge: 'PROPAGAÇÃO DO CAOS',
      badgeColor: '#FF7043',
      desc: 'Pequenas variações na camada inicial são multiplicadas sucessivamente por cada matriz de pesos. Nas camadas profundas, as ativações colapsam ou explodem para valores gigantescos.',
      mean1: -0.4,
      std1: 1.5,
      mean2: 4.2,
      std2: 6.5,
      status: 'Gradientes oscilantes e lentidão'
    },
    {
      title: '3. A Ancoragem: Normalização Z-Score',
      badge: 'DISTRIBUIÇÃO PADRONIZADA',
      badgeColor: '#0284C7',
      desc: 'A camada de normalização subtrai a média μ e divide pelo desvio σ. A entrada de cada camada é fixada rigidamente em média 0 e variância 1!',
      mean1: 0.0,
      std1: 1.0,
      mean2: 0.0,
      std2: 1.0,
      status: 'μ = 0, σ² = 1 ancorados com sucesso'
    },
    {
      title: '4. Restauração de Capacidade (γ e β)',
      badge: 'PARÂMETROS APRENDÍVEIS',
      badgeColor: '#2E7D32',
      desc: 'Para que a rede não fique limitada à média zero, o PyTorch aprende escala (γ) e deslocamento (β): y = γ·x̂ + β. A rede decide autonomamente a melhor escala ideal!',
      mean1: 0.8,
      std1: 1.4,
      mean2: 0.8,
      std2: 1.4,
      status: 'Estabilidade ótima com total flexibilidade'
    }
  ];

  const current = steps[step];

  // Helper para desenhar a curva gaussiana no SVG
  const generateGaussianPath = (mean, std, width = 300, height = 150, offsetX = 0) => {
    const points = [];
    const scaleX = 25;
    const centerX = width / 2 + mean * scaleX + offsetX;
    for (let x = 0; x <= width; x += 4) {
      const realX = (x - centerX) / (std * scaleX);
      const y = Math.exp(-0.5 * realX * realX) / (std * Math.sqrt(2 * Math.PI));
      const pixelY = height - 15 - y * height * 1.8 * Math.min(1.2, std);
      points.push(`${x},${Math.max(10, pixelY)}`);
    }
    return `M 0,${height - 15} L ` + points.join(' L ') + ` L ${width},${height - 15} Z`;
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Stepper Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: step === idx ? '2px solid var(--infnet-cyan)' : '1px solid #E2E8F0',
              background: step === idx ? 'linear-gradient(135deg, #F0FDF4, #EFF6FF)' : '#FFFFFF',
              color: step === idx ? 'var(--infnet-dark-blue)' : '#64748B',
              fontWeight: step === idx ? '700' : '500',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '0.72rem', color: s.badgeColor, fontWeight: '800' }}>ETAPA {idx + 1}</span>
            <span style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.title.split('. ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Main Visual Card */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '18px 22px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        flex: 1
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: current.badgeColor + '20',
              color: current.badgeColor,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800'
            }}>
              {current.badge}
            </span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--infnet-dark-blue)' }}>{current.title}</strong>
          </div>
          <span style={{
            fontSize: '0.82rem',
            color: step >= 2 ? '#2E7D32' : '#D84315',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {step >= 2 ? <ShieldCheck size={16} /> : <AlertTriangle size={16} />}
            {current.status}
          </span>
        </div>

        {/* Visual Comparison Area (Two epochs side by side) */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '16px',
          flex: 1,
          alignItems: 'center'
        }}>
          {/* Época 1 */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '0.82rem', color: '#0E4E8A' }}>
                ÉPOCA t (Lote Inicial)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'Fira Code, monospace' }}>
                μ = {current.mean1.toFixed(1)}, σ = {current.std1.toFixed(1)}
              </span>
            </div>
            <div style={{ height: '140px', position: 'relative' }}>
              <svg viewBox="0 0 320 140" style={{ width: '100%', height: '100%' }}>
                {/* Axes */}
                <line x1="20" y1="125" x2="300" y2="125" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="160" y1="15" x2="160" y2="130" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                <text x="160" y="137" textAnchor="middle" fill="#64748B" fontSize="9">0 (Centro)</text>

                {/* Distribution curve */}
                <path
                  d={generateGaussianPath(current.mean1, current.std1, 320, 140)}
                  fill={step >= 2 ? 'rgba(2, 132, 199, 0.25)' : 'rgba(216, 67, 21, 0.25)'}
                  stroke={step >= 2 ? '#0284C7' : '#D84315'}
                  strokeWidth="2.5"
                />
              </svg>
            </div>
          </div>

          {/* Época 2 (Deslocamento ou Estabilidade) */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: '800', fontSize: '0.82rem', color: step >= 2 ? '#2E7D32' : '#C62828' }}>
                ÉPOCA t + 5 (Após Atualizações)
              </span>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontFamily: 'Fira Code, monospace' }}>
                μ = {current.mean2.toFixed(1)}, σ = {current.std2.toFixed(1)}
              </span>
            </div>
            <div style={{ height: '140px', position: 'relative' }}>
              <svg viewBox="0 0 320 140" style={{ width: '100%', height: '100%' }}>
                {/* Axes */}
                <line x1="20" y1="125" x2="300" y2="125" stroke="#94A3B8" strokeWidth="1.5" />
                <line x1="160" y1="15" x2="160" y2="130" stroke="#CBD5E1" strokeWidth="1" strokeDasharray="3 3" />
                <text x="160" y="137" textAnchor="middle" fill="#64748B" fontSize="9">0 (Centro)</text>

                {/* Distribution curve */}
                <path
                  d={generateGaussianPath(current.mean2, current.std2, 320, 140)}
                  fill={step >= 2 ? 'rgba(46, 125, 50, 0.25)' : 'rgba(239, 68, 68, 0.25)'}
                  stroke={step >= 2 ? '#2E7D32' : '#DC2626'}
                  strokeWidth="2.5"
                />

                {step < 2 && (
                  <g>
                    <path d="M 120 40 L 220 40" stroke="#D84315" strokeWidth="2.5" markerEnd="url(#arrow)" />
                    <text x="170" y="32" textAnchor="middle" fill="#D84315" fontSize="10" fontWeight="800">
                      Deriva Descontrolada!
                    </text>
                  </g>
                )}
              </svg>
            </div>
          </div>
        </div>

        {/* Bottom Educational Callout */}
        <div style={{
          background: step >= 2 ? '#F0FDF4' : '#FFF7ED',
          borderLeft: `4px solid ${current.badgeColor}`,
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.8rem', fontWeight: '800', color: current.badgeColor, marginBottom: '2px' }}>
              ANALOGIA PEDAGÓGICA (O ALVO MÓVEL):
            </div>
            <div style={{ fontSize: '0.86rem', color: '#1E293B', lineHeight: '1.4' }}>
              {current.desc}
            </div>
          </div>
          <button
            onClick={() => setStep((prev) => (prev + 1) % steps.length)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              marginLeft: '14px'
            }}
          >
            {step === steps.length - 1 ? <RotateCcw size={14} /> : <ArrowRight size={14} />}
            {step === steps.length - 1 ? 'Reiniciar' : 'Avançar Passo'}
          </button>
        </div>
      </div>
    </div>
  );
}
