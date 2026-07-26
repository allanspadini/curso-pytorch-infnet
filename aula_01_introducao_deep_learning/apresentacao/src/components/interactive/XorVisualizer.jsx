import React, { useState } from 'react';

export default function XorVisualizer() {
  const [mode, setMode] = useState('linear'); // 'linear' or 'mlp'

  const points = [
    { x1: 0, x2: 0, label: 0, color: '#EF4444' },
    { x1: 0, x2: 1, label: 1, color: '#7CB342' },
    { x1: 1, x2: 0, label: 1, color: '#7CB342' },
    { x1: 1, x2: 1, label: 0, color: '#EF4444' }
  ];

  const width = 440;
  const height = 350;
  const margin = 50;

  const scaleX = (x) => margin + x * (width - 2 * margin);
  const scaleY = (y) => height - margin - y * (height - 2 * margin);

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 1.15fr', gap: '28px', height: '100%', alignItems: 'stretch' }}>
      {/* Explanation & Controls */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', justifyContent: 'center' }}>
        <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '14px', padding: '18px' }}>
          <h4 style={{ color: '#0A345D', fontSize: '1.15rem', fontWeight: '800', marginBottom: '10px' }}>
            Tabela Verdade da Função XOR
          </h4>
          <table style={{ width: '100%', fontSize: '1.02rem', textAlign: 'center', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#E2E8F0', color: '#0A345D' }}>
                <th style={{ padding: '8px' }}>Entrada x₁</th>
                <th style={{ padding: '8px' }}>Entrada x₂</th>
                <th style={{ padding: '8px' }}>Saída XOR (y)</th>
              </tr>
            </thead>
            <tbody>
              {points.map((p, idx) => (
                <tr key={idx} style={{ borderBottom: '1px solid #E2E8F0' }}>
                  <td style={{ padding: '8px', fontWeight: '600' }}>{p.x1}</td>
                  <td style={{ padding: '8px', fontWeight: '600' }}>{p.x2}</td>
                  <td style={{ padding: '8px', fontWeight: '800', color: p.color }}>{p.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mode Buttons */}
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setMode('linear')}
            style={{
              flex: 1,
              background: mode === 'linear' ? '#EF4444' : '#F1F5F9',
              color: mode === 'linear' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '12px 16px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '1.02rem',
              cursor: 'pointer',
              boxShadow: mode === 'linear' ? '0 4px 14px rgba(239, 68, 68, 0.35)' : 'none',
              transition: 'all 0.15s ease'
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
              padding: '12px 16px',
              borderRadius: '12px',
              fontWeight: '800',
              fontSize: '1.02rem',
              cursor: 'pointer',
              boxShadow: mode === 'mlp' ? '0 4px 14px rgba(124, 179, 66, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            🟢 MLP Não-Linear (Camada Oculta)
          </button>
        </div>

        <div className="content-card" style={{ padding: '22px', borderColor: mode === 'linear' ? '#EF4444' : '#7CB342' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: '800', color: mode === 'linear' ? '#EF4444' : '#7CB342' }}>
            {mode === 'linear' ? '❌ FALHA DE SEPARAÇÃO' : '✅ SOLUÇÃO PERFEITA'}
          </span>
          <p style={{ fontSize: '1.12rem', marginTop: '10px', color: '#334155', lineHeight: '1.55' }}>
            {mode === 'linear' 
              ? 'Nenhuma reta no espaço 2D consegue separar os pontos verdes dos vermelhos simultaneamente! A acurácia máxima de um neurônio único é de apenas 50%.' 
              : 'Ao adicionar uma camada oculta com funções de ativação não-lineares, a rede "curva" o espaço de decisão, permitindo separar qualquer padrão complexo!'}
          </p>
        </div>
      </div>

      {/* SVG Canvas Plot */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #CBD5E1', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <h4 style={{ color: '#0A345D', fontSize: '1.18rem', fontWeight: '800', marginBottom: '14px', textAlign: 'center' }}>
          {mode === 'linear' ? 'Fronteira Linear (Reta Rígida)' : 'Fronteira Não-Linear (Curva da MLP)'}
        </h4>

        <svg width="100%" height="auto" viewBox={`0 0 ${width} ${height}`} style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', maxHeight: '360px' }}>
          {/* Axis */}
          <line x1={margin} y1={height - margin} x2={width - margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2.5" />
          <line x1={margin} y1={margin} x2={margin} y2={height - margin} stroke="#94A3B8" strokeWidth="2.5" />

          {/* Labels */}
          <text x={width - margin} y={height - 16} fill="#64748B" fontSize="13" fontWeight="bold" textAnchor="end">Entrada x₁</text>
          <text x={16} y={margin - 16} fill="#64748B" fontSize="13" fontWeight="bold" textAnchor="start">Entrada x₂</text>

          {mode === 'linear' ? (
            /* Failing straight line */
            <line x1={scaleX(-0.2)} y1={scaleY(1.2)} x2={scaleX(1.2)} y2={scaleY(-0.2)} stroke="#EF4444" strokeWidth="4" strokeDasharray="6,6" />
          ) : (
            /* Curved decision boundary path */
            <path 
              d={`M ${scaleX(-0.2)} ${scaleY(0.4)} Q ${scaleX(0.5)} ${scaleY(0.6)} ${scaleX(1.2)} ${scaleY(0.4)} M ${scaleX(0.4)} ${scaleY(-0.2)} Q ${scaleX(0.6)} ${scaleX(0.5)} ${scaleX(0.4)} ${scaleY(1.2)}`} 
              fill="none" 
              stroke="#7CB342" 
              strokeWidth="5" 
            />
          )}

          {/* XOR Data Points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={scaleX(p.x1)} cy={scaleY(p.x2)} r="18" fill={p.color} stroke="#FFFFFF" strokeWidth="3.5" />
              <text x={scaleX(p.x1)} y={scaleY(p.x2) + 5} fill="#FFFFFF" fontSize="15" fontWeight="bold" textAnchor="middle">
                {p.label}
              </text>
              <text x={scaleX(p.x1)} y={scaleY(p.x2) + 34} fill="#64748B" fontSize="12" fontWeight="bold" textAnchor="middle">
                ({p.x1},{p.x2})
              </text>
            </g>
          ))}
        </svg>

        <div style={{ display: 'flex', gap: '20px', marginTop: '16px', fontSize: '1.05rem', fontWeight: '800' }}>
          <span style={{ color: '#EF4444' }}>● Classe 0 (0,0 e 1,1)</span>
          <span style={{ color: '#7CB342' }}>● Classe 1 (0,1 e 1,0)</span>
        </div>
      </div>
    </div>
  );
}
