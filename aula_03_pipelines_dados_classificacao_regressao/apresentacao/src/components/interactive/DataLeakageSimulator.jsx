import React, { useState } from 'react';

export default function DataLeakageSimulator() {
  const [leakMode, setLeakMode] = useState(true);
  const [step, setStep] = useState(0);

  const steps = ['1. Amostras no Eixo ($)', '2. Cálculo de μ e σ', '3. Teste vs Produção Real'];

  const handleToggleMode = (isLeak) => {
    setLeakMode(isLeak);
    setStep(0);
  };

  return (
    <div style={{ background: '#061F38', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '16px', color: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      {/* Top Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleToggleMode(true)}
            style={{
              background: leakMode ? '#FF7043' : 'rgba(255,112,67,0.12)',
              color: leakMode ? '#FFF' : '#FF7043',
              border: '1.5px solid #FF7043',
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            ⚠️ Com Data Leakage
          </button>
          <button
            onClick={() => handleToggleMode(false)}
            style={{
              background: !leakMode ? '#7CB342' : 'rgba(124,179,66,0.12)',
              color: !leakMode ? '#FFF' : '#AED581',
              border: '1.5px solid #7CB342',
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            ✅ Isolado (Sem Leakage)
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          {steps.map((s, idx) => (
            <button
              key={idx}
              onClick={() => setStep(idx)}
              style={{
                background: step === idx ? '#1BB5D8' : 'rgba(255,255,255,0.08)',
                color: step === idx ? '#061F38' : '#CBD5E1',
                border: 'none',
                borderRadius: '16px',
                padding: '6px 12px',
                fontWeight: '800',
                fontSize: '0.8rem',
                cursor: 'pointer'
              }}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Main Progressive SVG Graphic */}
      <svg viewBox="0 0 920 250" style={{ width: '100%', maxHeight: '265px' }}>
        {step < 2 ? (
          <g>
            {/* Number line axis */}
            <line x1="80" y1="165" x2="840" y2="165" stroke="#475569" strokeWidth="3" />
            <text x="460" y="225" textAnchor="middle" fill="#94A3B8" fontSize="13" fontWeight="700">
              Eixo da Feature: Renda Anual (R$ 30k ➔ R$ 120k)
            </text>

            {/* Train points */}
            {[
              { x: 160, val: '45k' },
              { x: 280, val: '54k' },
              { x: 470, val: '82k' },
              { x: 640, val: '105k' }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy="165" r="11" fill="#1BB5D8" stroke="#FFF" strokeWidth="2" />
                <text x={pt.x} y="194" textAnchor="middle" fill="#64D9EF" fontSize="12" fontWeight="700" fontFamily="Fira Code">
                  {pt.val}
                </text>
              </g>
            ))}

            {/* Test points */}
            {[
              { x: 110, val: '31k' },
              { x: 780, val: '120k (Teste)' }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy="165" r="11" fill="#FF7043" stroke="#FFF" strokeWidth="2" />
                <text x={pt.x} y="194" textAnchor="middle" fill="#FF7043" fontSize="12" fontWeight="700" fontFamily="Fira Code">
                  {pt.val}
                </text>
              </g>
            ))}

            {/* Legend */}
            <circle cx="320" cy="30" r="7" fill="#1BB5D8" />
            <text x="335" y="34" fill="#64D9EF" fontSize="13" fontWeight="700">Amostras de Treino</text>
            <circle cx="510" cy="30" r="7" fill="#FF7043" />
            <text x="525" y="34" fill="#FF7043" fontSize="13" fontWeight="700">Amostras de Teste (Inédito)</text>

            {/* Step 1: Gaussian window / Scaler Range */}
            {step === 1 && (
              <g>
                {leakMode ? (
                  <g>
                    <path d="M 95 160 Q 455 20 805 160" fill="rgba(255,112,67,0.18)" stroke="#FF7043" strokeWidth="3.5" />
                    <line x1="455" y1="65" x2="455" y2="165" stroke="#FF7043" strokeWidth="2.5" strokeDasharray="5 4" />
                    <text x="455" y="56" textAnchor="middle" fill="#FF7043" fontSize="14" fontWeight="800">
                      🚨 μ_global (Contaminado pelo Teste 120k!)
                    </text>
                  </g>
                ) : (
                  <g>
                    <path d="M 145 160 Q 390 35 660 160" fill="rgba(124,179,66,0.18)" stroke="#7CB342" strokeWidth="3.5" />
                    <line x1="390" y1="75" x2="390" y2="165" stroke="#7CB342" strokeWidth="2.5" strokeDasharray="5 4" />
                    <text x="390" y="64" textAnchor="middle" fill="#AED581" fontSize="14" fontWeight="800">
                      🛡️ μ_train (Calculado Só nos Pontos Azuis)
                    </text>
                  </g>
                )}
              </g>
            )}
          </g>
        ) : (
          /* Step 2: Visual Bar Comparison (Test vs Production) */
          <g>
            <line x1="150" y1="205" x2="770" y2="205" stroke="#475569" strokeWidth="2.5" />

            {/* Test Accuracy Bar */}
            <rect
              x="260"
              y={leakMode ? 35 : 62}
              width="130"
              height={leakMode ? 170 : 143}
              rx="8"
              fill={leakMode ? '#FF7043' : '#1BB5D8'}
            />
            <text x="325" y={leakMode ? 25 : 52} textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="800">
              {leakMode ? '99.4% (Ilusão)' : '84.2%'}
            </text>
            <text x="325" y="230" textAnchor="middle" fill="#CBD5E1" fontSize="14" fontWeight="700">
              Acurácia na Validação/Teste
            </text>

            {/* Production Accuracy Bar */}
            <rect
              x="530"
              y={leakMode ? 105 : 64}
              width="130"
              height={leakMode ? 100 : 141}
              rx="8"
              fill={leakMode ? '#F43F5E' : '#7CB342'}
            />
            <text x="595" y={leakMode ? 94 : 54} textAnchor="middle" fill="#FFF" fontSize="18" fontWeight="800">
              {leakMode ? '64.1% (-35%)' : '83.8% (Estável)'}
            </text>
            <text x="595" y="230" textAnchor="middle" fill="#CBD5E1" fontSize="14" fontWeight="700">
              Acurácia em Produção Real
            </text>
          </g>
        )}
      </svg>

      {/* Short bottom status badge */}
      <div style={{
        background: '#081D33',
        borderLeft: `4px solid ${leakMode ? '#FF7043' : '#7CB342'}`,
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '0.88rem',
        fontWeight: '600',
        color: '#E2E8F0'
      }}>
        {leakMode
          ? '⚠️ Com vazamento: a curva de normalização enxerga os extremos do teste e cria falsa acurácia.'
          : '✅ Sem vazamento: o escalador aprende apenas no treino e mantém a mesma performance em produção.'}
      </div>
    </div>
  );
}
