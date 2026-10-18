import React, { useState } from 'react';

export default function DataLeakageSimulator() {
  const [leakMode, setLeakMode] = useState(true);
  const [step, setStep] = useState(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0
  );

  const steps = ['1. Amostras no Eixo ($)', '2. Cálculo de μ e σ', '3. Teste vs Produção Real'];

  const handleToggleMode = (isLeak) => {
    setLeakMode(isLeak);
    setStep(0);
  };

  return (
    <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '14px', padding: '16px', color: '#1E293B', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => handleToggleMode(true)}
            style={{
              background: leakMode ? '#FF7043' : '#FFF7ED',
              color: leakMode ? '#FFFFFF' : '#C2410C',
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
              background: !leakMode ? '#16A34A' : '#F0FDF4',
              color: !leakMode ? '#FFFFFF' : '#15803D',
              border: '1.5px solid #16A34A',
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
                background: step === idx ? '#E0F2FE' : '#FFFFFF',
                color: step === idx ? '#0A345D' : '#475569',
                border: `1.5px solid ${step === idx ? '#0284C7' : '#CBD5E1'}`,
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

      <svg viewBox="0 0 920 250" style={{ width: '100%', maxHeight: '265px', background: '#FFFFFF', borderRadius: '10px', border: '1px solid #E2E8F0' }}>
        {step < 2 ? (
          <g>
            <line x1="80" y1="165" x2="840" y2="165" stroke="#64748B" strokeWidth="3" />
            <text x="460" y="225" textAnchor="middle" fill="#475569" fontSize="13" fontWeight="700">
              Eixo da Feature: Renda Anual (R$ 30k ➔ R$ 120k)
            </text>

            {[
              { x: 160, val: '45k' },
              { x: 280, val: '54k' },
              { x: 470, val: '82k' },
              { x: 640, val: '105k' }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy="165" r="11" fill="#0284C7" stroke="#FFFFFF" strokeWidth="2" />
                <text x={pt.x} y="194" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {pt.val}
                </text>
              </g>
            ))}

            {[
              { x: 110, val: '31k' },
              { x: 780, val: '120k (Teste)' }
            ].map((pt, i) => (
              <g key={i}>
                <circle cx={pt.x} cy="165" r="11" fill="#FF7043" stroke="#FFFFFF" strokeWidth="2" />
                <text x={pt.x} y="194" textAnchor="middle" fill="#C2410C" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {pt.val}
                </text>
              </g>
            ))}

            <circle cx="310" cy="30" r="7" fill="#0284C7" />
            <text x="325" y="34" fill="#0A345D" fontSize="13" fontWeight="700">Amostras de Treino</text>
            <circle cx="505" cy="30" r="7" fill="#FF7043" />
            <text x="520" y="34" fill="#C2410C" fontSize="13" fontWeight="700">Amostras de Teste (Inédito)</text>

            {step === 1 && (
              <g>
                {leakMode ? (
                  <g>
                    <path d="M 95 160 Q 455 20 805 160" fill="rgba(255,112,67,0.16)" stroke="#EA580C" strokeWidth="3.5" />
                    <line x1="455" y1="65" x2="455" y2="165" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="5 4" />
                    <text x="455" y="56" textAnchor="middle" fill="#C2410C" fontSize="14" fontWeight="800">
                      🚨 μ_global (Contaminado pelo Teste 120k!)
                    </text>
                  </g>
                ) : (
                  <g>
                    <path d="M 145 160 Q 390 35 660 160" fill="rgba(22,163,74,0.15)" stroke="#16A34A" strokeWidth="3.5" />
                    <line x1="390" y1="75" x2="390" y2="165" stroke="#16A34A" strokeWidth="2.5" strokeDasharray="5 4" />
                    <text x="390" y="64" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="800">
                      🛡️ μ_train (Calculado Só nos Pontos Azuis)
                    </text>
                  </g>
                )}
              </g>
            )}
          </g>
        ) : (
          <g>
            <line x1="150" y1="205" x2="770" y2="205" stroke="#64748B" strokeWidth="2.5" />

            <rect
              x="260"
              y={leakMode ? 38 : 65}
              width="130"
              height={leakMode ? 167 : 140}
              rx="8"
              fill={leakMode ? '#FF7043' : '#0284C7'}
            />
            <text x="325" y={leakMode ? 28 : 55} textAnchor="middle" fill="#0A345D" fontSize="17" fontWeight="800">
              {leakMode ? '99.4% (Ilusão)' : '84.2%'}
            </text>
            <text x="325" y="230" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="700">
              Acurácia na Validação/Teste
            </text>

            <rect
              x="530"
              y={leakMode ? 105 : 67}
              width="130"
              height={leakMode ? 100 : 138}
              rx="8"
              fill={leakMode ? '#E11D48' : '#16A34A'}
            />
            <text x="595" y={leakMode ? 94 : 57} textAnchor="middle" fill="#0A345D" fontSize="17" fontWeight="800">
              {leakMode ? '64.1% (-35%)' : '83.8% (Estável)'}
            </text>
            <text x="595" y="230" textAnchor="middle" fill="#334155" fontSize="14" fontWeight="700">
              Acurácia em Produção Real
            </text>
          </g>
        )}
      </svg>

      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderLeft: `4px solid ${leakMode ? '#FF7043' : '#16A34A'}`,
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '0.88rem',
        fontWeight: '600',
        color: '#1E293B'
      }}>
        {leakMode
          ? '⚠️ Com vazamento: a curva de normalização enxerga os extremos do teste e cria falsa acurácia.'
          : '✅ Sem vazamento: o escalador aprende apenas no treino e mantém a mesma performance em produção.'}
      </div>
    </div>
  );
}
