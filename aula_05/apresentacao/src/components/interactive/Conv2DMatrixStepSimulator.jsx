import React, { useState, useEffect } from 'react';

export default function Conv2DMatrixStepSimulator() {
  // 5x5 Input Image Matrix
  const inputMatrix = [
    [10,  10,  10, 100, 100],
    [10,  10,  10, 100, 100],
    [10,  10,  10, 100, 100],
    [10,  10,  10, 100, 100],
    [10,  10,  10, 100, 100]
  ];

  const kernels = {
    sobelVert: {
      name: 'Sobel Vertical (Detecção de Linha Vertical)',
      matrix: [
        [-1, 0, 1],
        [-2, 0, 2],
        [-1, 0, 1]
      ],
      desc: 'Mapeia transições bruscas entre colunas de esquerda para a direita.'
    },
    sobelHoriz: {
      name: 'Sobel Horizontal (Detecção de Linha Horizontal)',
      matrix: [
        [-1, -2, -1],
        [ 0,  0,  0],
        [ 1,  2,  1]
      ],
      desc: 'Mapeia transições bruscas de linhas de cima para baixo.'
    },
    edge: {
      name: 'Detecção de Bordas Gerais (Laplaciano)',
      matrix: [
        [ 0, -1,  0],
        [-1,  4, -1],
        [ 0, -1,  0]
      ],
      desc: 'Destaca qualquer contraste significativo em todas as direções.'
    }
  };

  const [selectedKernelKey, setSelectedKernelKey] = useState('sobelVert');
  const [step, setStep] = useState(0); // 0 to 8 (3x3 positions in 5x5 matrix)
  const [isPlaying, setIsPlaying] = useState(false);

  const currentKernel = kernels[selectedKernelKey].matrix;
  const H_in = 5;
  const W_in = 5;
  const K_h = 3;
  const K_w = 3;
  const H_out = H_in - K_h + 1; // 3
  const W_out = W_in - K_w + 1; // 3

  const maxSteps = H_out * W_out; // 9 steps

  const currentRow = Math.floor(step / W_out);
  const currentCol = step % W_out;

  // Calculate feature map 3x3
  const featureMap = [];
  for (let r = 0; r < H_out; r++) {
    const row = [];
    for (let c = 0; c < W_out; c++) {
      let sum = 0;
      for (let kr = 0; kr < K_h; kr++) {
        for (let kc = 0; kc < K_w; kc++) {
          sum += inputMatrix[r + kr][c + kc] * currentKernel[kr][kc];
        }
      }
      row.push(sum);
    }
    featureMap.push(row);
  }

  // Calculate detailed products for current step window
  const stepProducts = [];
  let currentStepSum = 0;
  for (let kr = 0; kr < K_h; kr++) {
    for (let kc = 0; kc < K_w; kc++) {
      const imgVal = inputMatrix[currentRow + kr][currentCol + kc];
      const kVal = currentKernel[kr][kc];
      const prod = imgVal * kVal;
      currentStepSum += prod;
      stepProducts.push({ imgVal, kVal, prod });
    }
  }

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStep((prev) => {
          if (prev >= maxSteps - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 900);
    }
    return () => clearInterval(interval);
  }, [isPlaying, maxSteps]);

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Simulador Matricial 2D</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Operação de Convolução 2D Passo a Passo
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            className="btn-interactive"
            onClick={() => { setStep(0); setIsPlaying(!isPlaying); }}
          >
            {isPlaying ? '⏸ Pausar' : '▶️ Animar Convolução 2D'}
          </button>
          <button 
            className="btn-interactive"
            onClick={() => setStep(0)}
          >
            🔄 Resetar
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '14px' }}>
        {/* Kernel Selection & Controls */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: '#F8FAFC', padding: '10px 16px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <strong style={{ color: '#0A345D', fontSize: '0.88rem' }}>Filtro (Kernel 3x3):</strong>
            {Object.keys(kernels).map((key) => (
              <button 
                key={key}
                onClick={() => { setSelectedKernelKey(key); setStep(0); setIsPlaying(false); }}
                className={`btn-interactive ${selectedKernelKey === key ? 'active' : ''}`}
                style={{ fontSize: '0.8rem' }}
              >
                {kernels[key].name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              Posição: Linha <strong>{currentRow}</strong>, Coluna <strong>{currentCol}</strong> (Passo {step + 1}/{maxSteps})
            </span>
            <button 
              className="btn-interactive"
              disabled={step === 0}
              onClick={() => setStep((p) => Math.max(0, p - 1))}
            >
              ◀
            </button>
            <button 
              className="btn-interactive"
              disabled={step === maxSteps - 1}
              onClick={() => setStep((p) => Math.min(maxSteps - 1, p + 1))}
            >
              ▶
            </button>
          </div>
        </div>

        {/* 3 Matrices Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'auto auto auto 1fr', gap: '20px', alignItems: 'center', width: '100%' }}>
          {/* 1. Input Image 5x5 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0A345D', marginBottom: '6px' }}>
              Entrada Imagem (5×5)
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(5, 36px)', 
              gap: '3px',
              padding: '8px',
              background: '#061F38',
              borderRadius: '8px'
            }}>
              {inputMatrix.map((row, r) => 
                row.map((val, c) => {
                  const isInsideKernelWindow = 
                    r >= currentRow && r < currentRow + K_h &&
                    c >= currentCol && c < currentCol + K_w;
                  
                  return (
                    <div 
                      key={`${r}-${c}`}
                      style={{
                        width: '36px',
                        height: '36px',
                        backgroundColor: isInsideKernelWindow ? '#FF7043' : `rgb(${val}, ${val}, ${val})`,
                        color: isInsideKernelWindow ? '#FFFFFF' : (val > 128 ? '#000000' : '#FFFFFF'),
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '3px',
                        border: isInsideKernelWindow ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.15)',
                        transform: isInsideKernelWindow ? 'scale(1.05)' : 'scale(1)',
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

          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#1BB5D8' }}>✱</div>

          {/* 2. Kernel Matrix 3x3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0A345D', marginBottom: '6px' }}>
              Kernel / Filtro (3×3)
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 36px)', 
              gap: '3px',
              padding: '8px',
              background: '#0A345D',
              borderRadius: '8px',
              border: '2px solid #1BB5D8'
            }}>
              {currentKernel.map((row, kr) => 
                row.map((kVal, kc) => (
                  <div 
                    key={`${kr}-${kc}`}
                    style={{
                      width: '36px',
                      height: '36px',
                      background: 'rgba(255,255,255,0.15)',
                      color: '#64D9EF',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-mono)',
                      borderRadius: '3px'
                    }}
                  >
                    {kVal}
                  </div>
                ))
              )}
            </div>
          </div>

          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#7CB342' }}>➔</div>

          {/* 3. Output Feature Map 3x3 */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ fontWeight: '700', fontSize: '0.85rem', color: '#0A345D', marginBottom: '6px' }}>
              Feature Map Resultante (3×3)
            </div>
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(3, 36px)', 
              gap: '3px',
              padding: '8px',
              background: '#061F38',
              borderRadius: '8px',
              border: '2px solid #7CB342'
            }}>
              {featureMap.map((row, fr) => 
                row.map((fVal, fc) => {
                  const isCurrentTarget = fr === currentRow && fc === currentCol;
                  const isCalculated = (fr * W_out + fc) <= step;

                  return (
                    <div 
                      key={`${fr}-${fc}`}
                      style={{
                        width: '36px',
                        height: '36px',
                        background: isCurrentTarget ? '#7CB342' : isCalculated ? 'rgba(124,179,66,0.2)' : 'rgba(255,255,255,0.05)',
                        color: isCurrentTarget ? '#FFFFFF' : isCalculated ? '#7CB342' : 'rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        fontFamily: 'var(--font-mono)',
                        borderRadius: '3px',
                        border: isCurrentTarget ? '2px solid #FFFFFF' : '1px solid rgba(255,255,255,0.1)',
                        transition: 'all 0.15s ease'
                      }}
                    >
                      {isCalculated ? fVal : '?'}
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Dynamic Formula Display */}
        <div style={{ background: '#0A345D', padding: '12px 16px', borderRadius: '8px', color: '#FFFFFF', fontSize: '0.84rem', fontFamily: 'var(--font-mono)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <span style={{ color: '#64D9EF' }}>Soma dos Produtos na Janela Atual:</span>{' '}
            {stepProducts.map((p, idx) => (
              <span key={idx}>
                ({p.imgVal}×{p.kVal}){idx < stepProducts.length - 1 ? ' + ' : ''}
              </span>
            ))}
          </div>
          <div style={{ background: '#7CB342', color: '#FFFFFF', padding: '4px 12px', borderRadius: '4px', fontWeight: '700', fontSize: '0.95rem' }}>
            = {currentStepSum}
          </div>
        </div>
      </div>
    </div>
  );
}
