import React, { useState } from 'react';

export default function GrayMatrixExploration() {
  const [flattenMode, setFlattenMode] = useState(false);
  const [hoveredCell, setHoveredCell] = useState(null);

  // 6x6 sample grayscale image grid (0 = Black, 255 = White)
  const matrix = [
    [ 20,  20,  255, 255,  20,  20],
    [ 20, 200,  255, 255, 200,  20],
    [ 20, 200,   20,  20, 200,  20],
    [ 20, 200,   20,  20, 200,  20],
    [ 20, 200,  255, 255, 200,  20],
    [ 20,  20,  255, 255,  20,  20],
  ];

  const flattened = matrix.flat();

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Visualizador Interativo</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Matriz de Pixels 0-255 & O Efeito do Flattening (Estiramento)
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            className={`btn-interactive ${!flattenMode ? 'active' : ''}`}
            onClick={() => setFlattenMode(false)}
          >
            🖼️ Visão Matricial 2D (6x6)
          </button>
          <button 
            className={`btn-interactive ${flattenMode ? 'active' : ''}`}
            onClick={() => setFlattenMode(true)}
          >
            📏 Vetor Estirado 1D (36)
          </button>
        </div>
      </div>

      <div className="interactive-body">
        {!flattenMode ? (
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {/* 2D Matrix Grid */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', color: '#0A345D' }}>
                Matriz de Imagem 2D (6×6 pixels)
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(6, 48px)', 
                gap: '4px',
                padding: '12px',
                background: '#061F38',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
              }}>
                {matrix.map((row, r) => 
                  row.map((val, c) => {
                    const isHovered = hoveredCell && hoveredCell.r === r && hoveredCell.c === c;
                    return (
                      <div 
                        key={`${r}-${c}`}
                        onMouseEnter={() => setHoveredCell({ r, c, val })}
                        onMouseLeave={() => setHoveredCell(null)}
                        style={{
                          width: '48px',
                          height: '48px',
                          backgroundColor: `rgb(${val}, ${val}, ${val})`,
                          color: val > 128 ? '#000000' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                          borderRadius: '4px',
                          border: isHovered ? '3px solid #1BB5D8' : '1px solid rgba(255,255,255,0.2)',
                          cursor: 'pointer',
                          transform: isHovered ? 'scale(1.15)' : 'scale(1)',
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

            {/* Info Card */}
            <div style={{ width: '320px', background: '#F8FAFC', padding: '18px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
              <h4 style={{ color: '#0A345D', marginTop: 0, marginBottom: '10px' }}>
                🔍 Detalhes do Pixel
              </h4>
              {hoveredCell ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
                  <div><strong>Linha:</strong> {hoveredCell.r} | <strong>Coluna:</strong> {hoveredCell.c}</div>
                  <div><strong>Intensidade (0-255):</strong> <span className="highlight-tag">{hoveredCell.val}</span></div>
                  <div>
                    <strong>Tom:</strong> {hoveredCell.val === 255 ? 'Branco Puro' : hoveredCell.val === 20 ? 'Preto/Escuro' : 'Cinza Médio'}
                  </div>
                  <div style={{ marginTop: '8px', padding: '8px', background: '#E2E8F0', borderRadius: '6px', fontSize: '0.8rem', color: '#475569' }}>
                    💡 Em escala de cinza, 0 representa absência total de luz (preto) e 255 representa brilho máximo (branco).
                  </div>
                </div>
              ) : (
                <p style={{ color: '#64748B', fontSize: '0.88rem', margin: 0 }}>
                  Passe o cursor sobre qualquer célula da matriz para inspecionar seu valor de brilho e coordenadas.
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Flatten 1D Vector view */
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', gap: '16px' }}>
            <div style={{ textAlign: 'center', maxWidth: '700px' }}>
              <span className="badge-tag badge-orange">Aviso de Perda Espacial</span>
              <h4 style={{ color: '#0A345D', margin: '6px 0' }}>
                Estiramento (Flatten) para Redes Neurais Densas (MLP)
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#64748B', margin: 0 }}>
                Ao converter a matriz 2D (6×6) em um único vetor 1D de 36 entradas, os pixels vizinhos verticais perdem seu contato espacial direto.
              </p>
            </div>

            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              gap: '4px', 
              justify: 'center', 
              maxWidth: '850px',
              padding: '16px',
              background: '#061F38',
              borderRadius: '10px'
            }}>
              {flattened.map((val, idx) => (
                <div 
                  key={idx}
                  style={{
                    width: '38px',
                    height: '38px',
                    backgroundColor: `rgb(${val}, ${val}, ${val})`,
                    color: val > 128 ? '#000000' : '#FFFFFF',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    fontFamily: 'var(--font-mono)',
                    borderRadius: '4px',
                    border: '1px solid rgba(255,255,255,0.2)'
                  }}
                >
                  <span>{val}</span>
                  <span style={{ fontSize: '0.55rem', opacity: 0.7 }}>[{idx}]</span>
                </div>
              ))}
            </div>

            <div style={{ background: '#FFFBEB', borderLeft: '4px solid #F59E0B', padding: '12px 16px', borderRadius: '6px', maxWidth: '800px', fontSize: '0.88rem', color: '#92400E' }}>
              <strong>Por que precisamos de Convoluções?</strong> Se transladarmos uma imagem apenas 1 pixel para o lado, todos os 36 índices do vetor mudam drasticamente, confundindo uma rede totalmente conectada (MLP). As convoluções resolvem isso operando em pequenas janelas locais 2D!
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
