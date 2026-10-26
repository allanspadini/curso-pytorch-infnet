import React, { useState } from 'react';

export default function RGBChannelsVisualizer() {
  const [activeTab, setActiveTab] = useState('rgb');

  // Sample 4x4 RGB image pixel values [[R, G, B], ...]
  const rgbGrid = [
    [[255,   0,   0], [  0, 255,   0], [  0,   0, 255], [255, 255,   0]],
    [[255,   0, 255], [  0, 255, 255], [255, 255, 255], [  0,   0,   0]],
    [[200, 100,  50], [ 50, 200, 100], [100,  50, 200], [220, 180,  40]],
    [[ 80, 180, 240], [240,  80, 140], [140, 240,  80], [120, 120, 120]]
  ];

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Representação de Cores</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Explorador de Canais RGB & Tensores $(3, H, W)$
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button 
            className={`btn-interactive ${activeTab === 'rgb' ? 'active' : ''}`}
            onClick={() => setActiveTab('rgb')}
          >
            🎨 RGB Completo
          </button>
          <button 
            className={`btn-interactive ${activeTab === 'red' ? 'active' : ''}`}
            onClick={() => setActiveTab('red')}
            style={{ borderColor: '#EF4444', color: activeTab === 'red' ? '#FFF' : '#EF4444' }}
          >
            🔴 Canal R (Red)
          </button>
          <button 
            className={`btn-interactive ${activeTab === 'green' ? 'active' : ''}`}
            onClick={() => setActiveTab('green')}
            style={{ borderColor: '#22C55E', color: activeTab === 'green' ? '#FFF' : '#22C55E' }}
          >
            🟢 Canal G (Green)
          </button>
          <button 
            className={`btn-interactive ${activeTab === 'blue' ? 'active' : ''}`}
            onClick={() => setActiveTab('blue')}
            style={{ borderColor: '#3B82F6', color: activeTab === 'blue' ? '#FFF' : '#3B82F6' }}
          >
            🔵 Canal B (Blue)
          </button>
          <button 
            className={`btn-interactive ${activeTab === 'tensor' ? 'active' : ''}`}
            onClick={() => setActiveTab('tensor')}
          >
            🧊 Tensor (3, H, W)
          </button>
        </div>
      </div>

      <div className="interactive-body">
        {activeTab !== 'tensor' ? (
          <div style={{ display: 'flex', gap: '30px', alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {/* Grid display */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontWeight: 700, marginBottom: '8px', color: '#0A345D' }}>
                {activeTab === 'rgb' ? 'Imagem Colorida Final' : `Matriz do Canal ${activeTab.toUpperCase()}`} (4×4)
              </div>
              <div style={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(4, 54px)', 
                gap: '4px',
                padding: '12px',
                background: '#061F38',
                borderRadius: '10px'
              }}>
                {rgbGrid.map((row, r) => 
                  row.map((pixel, c) => {
                    const [redVal, greenVal, blueVal] = pixel;
                    let bgColor = `rgb(${redVal}, ${greenVal}, ${blueVal})`;
                    let textVal = `(${redVal},${greenVal},${blueVal})`;

                    if (activeTab === 'red') {
                      bgColor = `rgb(${redVal}, 0, 0)`;
                      textVal = `${redVal}`;
                    } else if (activeTab === 'green') {
                      bgColor = `rgb(0, ${greenVal}, 0)`;
                      textVal = `${greenVal}`;
                    } else if (activeTab === 'blue') {
                      bgColor = `rgb(0, 0, ${blueVal})`;
                      textVal = `${blueVal}`;
                    }

                    return (
                      <div 
                        key={`${r}-${c}`}
                        style={{
                          width: '54px',
                          height: '54px',
                          backgroundColor: bgColor,
                          color: (redVal + greenVal + blueVal) > 380 ? '#000000' : '#FFFFFF',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: activeTab === 'rgb' ? '0.55rem' : '0.8rem',
                          fontWeight: '700',
                          fontFamily: 'var(--font-mono)',
                          borderRadius: '4px',
                          border: '1px solid rgba(255,255,255,0.2)',
                          textAlign: 'center'
                        }}
                      >
                        {textVal}
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* Explanation card */}
            <div style={{ width: '360px', background: '#F8FAFC', padding: '18px', borderRadius: '10px', border: '1px solid #CBD5E1' }}>
              <h4 style={{ color: '#0A345D', marginTop: 0, marginBottom: '10px' }}>
                💡 Estrutura de Dados do PyTorch
              </h4>
              <p style={{ fontSize: '0.88rem', color: '#475569', lineHeight: 1.5, margin: 0 }}>
                No PyTorch, uma imagem colorida não é apenas uma matriz 2D, mas um <strong>Tensor Tridimensional</strong> com a convenção:
              </p>
              <div style={{ background: '#0A345D', color: '#64D9EF', padding: '10px', borderRadius: '6px', margin: '12px 0', fontFamily: 'var(--font-mono)', fontSize: '0.9rem', textAlign: 'center' }}>
                torch.Size([3, Height, Width])
              </div>
              <ul style={{ fontSize: '0.85rem', color: '#334155', paddingLeft: '18px', margin: 0 }}>
                <li><strong>Dimensão 0 (Canais=3):</strong> R, G e B</li>
                <li><strong>Dimensão 1 (Altura H):</strong> Linhas de pixels</li>
                <li><strong>Dimensão 2 (Largura W):</strong> Colunas de pixels</li>
              </ul>
            </div>
          </div>
        ) : (
          /* 3D Stack View of Tensor */
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            {['Red (R)', 'Green (G)', 'Blue (B)'].map((channelName, idx) => {
              const colors = ['#EF4444', '#22C55E', '#3B82F6'];
              return (
                <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', background: '#F8FAFC', padding: '14px', borderRadius: '8px', border: `2px solid ${colors[idx]}` }}>
                  <span style={{ color: colors[idx], fontWeight: '800', fontSize: '0.9rem', marginBottom: '8px' }}>
                    Matriz [{idx}] - {channelName}
                  </span>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 30px)', gap: '2px', background: '#061F38', padding: '6px', borderRadius: '6px' }}>
                    {rgbGrid.map((row) => 
                      row.map((pixel) => (
                        <div 
                          key={Math.random()}
                          style={{
                            width: '30px',
                            height: '30px',
                            background: idx === 0 ? `rgb(${pixel[0]},0,0)` : idx === 1 ? `rgb(0,${pixel[1]},0)` : `rgb(0,0,${pixel[2]})`,
                            color: '#FFF',
                            fontSize: '0.6rem',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontFamily: 'var(--font-mono)'
                          }}
                        >
                          {pixel[idx]}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
