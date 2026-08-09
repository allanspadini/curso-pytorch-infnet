import React, { useState } from 'react';

export default function PoolingSimulator() {
  const [poolingType, setPoolingType] = useState('max'); // 'max' or 'avg'
  const [activeRegion, setActiveRegion] = useState(0); // 0, 1, 2, 3 quadrants

  // 4x4 input feature map
  const matrix4x4 = [
    [12, 20, 30,  0],
    [ 8, 85,  4, 16],
    [50,  2, 90, 75],
    [14, 44, 28, 60]
  ];

  // Quadrants coordinates (top-left row, top-left col)
  const quadrants = [
    { r: 0, c: 0, label: 'Quadrante 1 (Sup. Esquerdo)' },
    { r: 0, c: 2, label: 'Quadrante 2 (Sup. Direito)' },
    { r: 2, c: 0, label: 'Quadrante 3 (Inf. Esquerdo)' },
    { r: 2, c: 2, label: 'Quadrante 4 (Inf. Direito)' }
  ];

  const currentQ = quadrants[activeRegion];

  // Get 2x2 values for current quadrant
  const poolVals = [
    matrix4x4[currentQ.r][currentQ.c],
    matrix4x4[currentQ.r][currentQ.c + 1],
    matrix4x4[currentQ.r + 1][currentQ.c],
    matrix4x4[currentQ.r + 1][currentQ.c + 1]
  ];

  const maxResult = Math.max(...poolVals);
  const avgResult = Math.round((poolVals.reduce((a, b) => a + b, 0) / 4) * 10) / 10;

  // Calculate full 2x2 output feature map
  const output2x2 = quadrants.map((q) => {
    const vals = [
      matrix4x4[q.r][q.c],
      matrix4x4[q.r][q.c + 1],
      matrix4x4[q.r + 1][q.c],
      matrix4x4[q.r + 1][q.c + 1]
    ];
    return poolingType === 'max' 
      ? Math.max(...vals) 
      : Math.round((vals.reduce((a, b) => a + b, 0) / 4) * 10) / 10;
  });

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Subamostragem & Invariância</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Simulador de Pooling (Max Pooling vs Average Pooling 2x2, Stride 2)
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className={`btn-interactive ${poolingType === 'max' ? 'active' : ''}`}
            onClick={() => setPoolingType('max')}
          >
            🔥 Max Pooling (Máximo)
          </button>
          <button 
            className={`btn-interactive ${poolingType === 'avg' ? 'active' : ''}`}
            onClick={() => setPoolingType('avg')}
          >
            ⚖️ Average Pooling (Média)
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px' }}>
        {/* Quadrant Selector */}
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#F8FAFC', padding: '10px 16px', borderRadius: '8px', border: '1px solid #CBD5E1', width: '100%', justifyContent: 'space-between' }}>
          <span style={{ fontSize: '0.88rem', color: '#0A345D', fontWeight: '700' }}>
            Selecione a Região de Pooling 2x2:
          </span>
          <div style={{ display: 'flex', gap: '8px' }}>
            {quadrants.map((q, idx) => (
              <button 
                key={idx}
                className={`btn-interactive ${activeRegion === idx ? 'active' : ''}`}
                onClick={() => setActiveRegion(idx)}
                style={{ fontSize: '0.8rem' }}
              >
                {q.label}
              </button>
            ))}
          </div>
        </div>

        {/* Visual Grids */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 320px', gap: '24px', alignItems: 'center', width: '100%' }}>
          {/* Input Feature Map 4x4 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0A345D', marginBottom: '6px' }}>
              Feature Map de Entrada (4×4)
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(4, 44px)', 
              gap: '4px',
              padding: '10px',
              background: '#061F38',
              borderRadius: '8px'
            }}>
              {matrix4x4.map((row, r) => 
                row.map((val, c) => {
                  const isSelected = 
                    r >= currentQ.r && r <= currentQ.r + 1 &&
                    c >= currentQ.c && c <= currentQ.c + 1;
                  const isMaxWinner = isSelected && val === maxResult && poolingType === 'max';

                  return (
                    <div 
                      key={`${r}-${c}`}
                      style={{
                        width: '44px',
                        height: '44px',
                        backgroundColor: isMaxWinner ? '#FF7043' : isSelected ? '#1BB5D8' : 'rgba(255,255,255,0.1)',
                        color: '#FFFFFF',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.85rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '4px',
                        border: isSelected ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.1)',
                        transform: isMaxWinner ? 'scale(1.12)' : 'scale(1)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {val}
                    </div>
                  );
                })
              )}
            </div>
          </div>

          <div style={{ fontSize: '1.6rem', fontWeight: '800', color: '#1BB5D8' }}>➔</div>

          {/* Output Map 2x2 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0A345D', marginBottom: '6px' }}>
              Saída Subamostrada (2×2)
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(2, 50px)', 
              gap: '4px',
              padding: '10px',
              background: '#061F38',
              borderRadius: '8px',
              border: '2px solid #7CB342'
            }}>
              {output2x2.map((outVal, idx) => {
                const isActive = idx === activeRegion;
                return (
                  <div 
                    key={idx}
                    style={{
                      width: '50px',
                      height: '50px',
                      background: isActive ? '#7CB342' : 'rgba(124,179,66,0.2)',
                      color: '#FFFFFF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '800',
                      fontFamily: 'var(--font-mono)',
                      borderRadius: '4px',
                      border: isActive ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.1)'
                    }}
                  >
                    {outVal}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Explanation Card */}
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
            <h4 style={{ color: '#0A345D', marginTop: 0, marginBottom: '8px' }}>
              📊 Operação na Região Atual
            </h4>
            <div style={{ fontSize: '0.85rem', color: '#475569', marginBottom: '10px' }}>
              Valores na janela 2×2: <strong>[{poolVals.join(', ')}]</strong>
            </div>
            
            {poolingType === 'max' ? (
              <div style={{ background: '#0A345D', color: '#FF7043', padding: '10px', borderRadius: '6px', fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}>
                Max([{poolVals.join(', ')}]) = <strong>{maxResult}</strong>
                <div style={{ color: '#CBD5E1', fontSize: '0.75rem', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                  Retém a característica mais forte (maior ativação) e descarta o restante.
                </div>
              </div>
            ) : (
              <div style={{ background: '#0A345D', color: '#64D9EF', padding: '10px', borderRadius: '6px', fontSize: '0.84rem', fontFamily: 'var(--font-mono)' }}>
                Avg([{poolVals.join(', ')}]) = ({poolVals.join('+')})/4 = <strong>{avgResult}</strong>
                <div style={{ color: '#CBD5E1', fontSize: '0.75rem', marginTop: '6px', fontFamily: 'var(--font-body)' }}>
                  Suaviza as ativações calculando a intensidade média da região.
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
