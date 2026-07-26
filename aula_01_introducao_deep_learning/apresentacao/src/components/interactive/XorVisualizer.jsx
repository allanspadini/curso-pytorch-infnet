import React, { useState } from 'react';

export default function XorVisualizer() {
  const [mode, setMode] = useState('linear'); // 'linear' or 'mlp'

  const points = [
    { x1: 0, x2: 0, label: 0, color: '#EF4444' },
    { x1: 0, x2: 1, label: 1, color: '#7CB342' },
    { x1: 1, x2: 0, label: 1, color: '#7CB342' },
    { x1: 1, x2: 1, label: 0, color: '#EF4444' }
  ];

  const width = 320;
  const height = 260;
  const margin = 40;

  const scaleX = (x) => margin + x * (width - 2 * margin);
  const scaleY = (y) => height - margin - y * (height - 2 * margin);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '24px', alignItems: 'center' }}>
      {/* Explanation & Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '14px' }}>
          <h4 style={{ color: '#0A345D', fontSize: '1rem', fontWeight: '700', marginBottom: '8px' }}>
            Tabela Verdade da Função XOR
          </h4>
          <table style={{ width: '100%', fontSize: '0.85rem', textAlign: 'center', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#E2E8F0', color: '#0A345D' }}>
                <th style={{ padding: '4px' }}>Entrada x₁</th>
                <th style={{ padding: '4px' }}>Entrada x₂</th>
                <th style={{ padding: '4px' }}>Saída XOR (y)</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '4px' }}>{p.x1}</td>
                  <td style={{ padding: '4px' }}>{p.x2}</td>
                  <td style={{ padding: '4px', fontWeight: '800', color: p.color }}>{p.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mode Buttons */}
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setMode('linear')}
            style={{
              flex: 1,
              background: mode === 'linear' ? '#EF4444' : '#F1F5F9',
              color: mode === 'linear' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🔴 Perceptron Único (Linear)
          </button>

          <button
            onClick={() => setMode('mlp')}
            style={{
              flex: 1,
              background: mode === 'mlp' ? '#7CB342' : '#F1F5F9',
              color: mode === 'mlp' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '10px',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🟢 MLP com Ativação (Não-Linear)
          </button>
        </div>

        <div className="content-card" style={{ padding: '14px', borderColor: mode === 'linear' ? '#EF4444' : '#7CB342' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '800', color: mode === 'linear' ? '#EF4444' : '#7CB342' }}>
            {mode === 'linear' ? '❌ FALHA DE SEPARAÇÃO' : '✅ SOLUÇÃO PERFEITA'}
          </span>
          <p style={{ fontSize: '0.9rem', marginTop: '6px', color: '#334155', lineHeight: '1.45' }}>
            {mode === 'linear' 
              ? 'Nenhuma reta no espaço 2D consegue separar os pontos verdes dos vermelhos simultaneamente! A acurácia máxima de um neurônio único é de apenas 50%.' 
              : 'Ao adicionar uma camada oculta com funções de ativação não-lineares, a rede "curva" o espaço de decisão, permitindo separar qualquer padrão complexo!'}
          </p>
        </div>
      </div>

      {/* SVG Canvas Plot */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h4 style={{ color: '#0A345D', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px' }}>
          {mode === 'linear' ? 'Fronteira Linear (Reta Rígida)' : 'Fronteira Não-Linear (Curva da MLP)'}
        </h4>

        <svg width={width} height={height} style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          {/* Axis */}
          <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2" />
          <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2" />

          {/* Labels */}
          <text x={width - margin} y={height - 15} fill="#64748B" fontSize="11" textAnchor="end">Entrada x₁</text>
          <text x={15} y={margin - 10} fill="#64748B" fontSize="11" textAnchor="start">Entrada x₂</text>

          {mode === 'linear' ? (
            /* Failing straight line */
            <line x1={scaleX(-0.2)} y1={scaleY(1.2)} x2={scaleX(1.2)} y2={scaleY(-0.2)} stroke="#EF4444" strokeWidth="3" strokeDasharray="6,6" />
          ) : (
            /* Curved decision boundary path */
            <path 
              d={`M ${scaleX(-0.2)} ${scaleY(0.4)} Q ${scaleX(0.5)} ${scaleY(0.6)} ${scaleX(1.2)} ${scaleY(0.4)} M ${scaleX(0.4)} ${scaleY(-0.2)} Q ${scaleX(0.6)} ${scaleX(0.5)} ${scaleX(0.4)} ${scaleY(1.2)}`} 
              fill="none" 
              stroke="#7CB342" 
              strokeWidth="4" 
            />
          )}

          {/* XOR Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={scaleX(p.x1)} cy={scaleY(p.x2)} r="14" fill={p.color} stroke="#FFFFFF" strokeWidth="3" />
              <text x={scaleX(p.x1)} y={scaleY(p.x2) + 4} fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
                {p.label}
              </text>
              <text x={scaleX(p.x1)} y={scaleY(p.x2) + 26} fill="#64748B" fontSize="10" textAnchor="middle">
                ({p.x1},{p.x2})
              </text>
            </g>
          ))}
        </svg>

        <div style={{ display: 'flex', gap: '16px', marginTop: '12px', fontSize: '0.8rem', fontWeight: '600' }}>
          <span style={{ color: '#EF4444' }}>● Classe 0 (0,0 e 1,1)</span>
          <span style={{ color: '#7CB342' }}>● Classe 1 (0,1 e 1,0)</span>
        </div>
      </div>
    </div>
  );
}
