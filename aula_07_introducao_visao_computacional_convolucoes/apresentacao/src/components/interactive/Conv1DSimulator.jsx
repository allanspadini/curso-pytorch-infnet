import React, { useState, useEffect } from 'react';

export default function Conv1DSimulator() {
  // Input 1D signal with 14 samples (e.g. step signal or peak)
  const inputSignal = [10, 10, 10, 10, 80, 80, 80, 20, 20, 20, 90, 90, 10, 10];
  
  const filters = {
    edge: { name: 'Detecção de Borda [-1, 0, 1]', kernel: [-1, 0, 1], desc: 'Detecta variações abruptas de intensidade.' },
    smooth: { name: 'Suavização [0.33, 0.33, 0.33]', kernel: [0.333, 0.333, 0.333], desc: 'Média móvel para filtrar ruídos soltos.' },
    sharpen: { name: 'Realce / Aguçamento [-1, 2, -1]', kernel: [-1, 2, -1], desc: 'Destaca picos e bordas finas no sinal.' }
  };

  const [selectedFilterKey, setSelectedFilterKey] = useState('edge');
  const [stepIndex, setStepIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentFilter = filters[selectedFilterKey];
  const K = currentFilter.kernel.length;
  const N = inputSignal.length;
  const outputLength = N - K + 1;

  // Calculate full output array
  const outputSignal = [];
  for (let i = 0; i <= N - K; i++) {
    let sum = 0;
    for (let j = 0; j < K; j++) {
      sum += inputSignal[i + j] * currentFilter.kernel[j];
    }
    outputSignal.push(Math.round(sum * 100) / 100);
  }

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setStepIndex((prev) => {
          if (prev >= outputLength - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 700);
    }
    return () => clearInterval(interval);
  }, [isPlaying, outputLength]);

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="badge-tag badge-cyan">Simulador Interativo 1D</span>
          <h3 style={{ margin: 0, color: '#0A345D', fontSize: '1.2rem' }}>
            Convolução 1D, Filtros & Redução de Amostras
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            className="btn-interactive"
            onClick={() => { setStepIndex(0); setIsPlaying(!isPlaying); }}
          >
            {isPlaying ? '⏸ Pausar' : '▶️ Animar Convolução'}
          </button>
          <button 
            className="btn-interactive"
            onClick={() => setStepIndex(0)}
          >
            🔄 Reiniciar
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px' }}>
        {/* Controls & Filter Selection */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: '#F8FAFC', padding: '12px 18px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <strong style={{ color: '#0A345D', fontSize: '0.9rem' }}>Selecione o Filtro:</strong>
            {Object.keys(filters).map((key) => (
              <button 
                key={key}
                onClick={() => { setSelectedFilterKey(key); setStepIndex(0); setIsPlaying(false); }}
                className={`btn-interactive ${selectedFilterKey === key ? 'active' : ''}`}
                style={{ fontSize: '0.82rem' }}
              >
                {filters[key].name}
              </button>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              Passo Atual: <strong>{stepIndex + 1} / {outputLength}</strong>
            </span>
            <input 
              type="range" 
              min="0" 
              max={outputLength - 1} 
              value={stepIndex} 
              onChange={(e) => { setStepIndex(Number(e.target.value)); setIsPlaying(false); }} 
              style={{ width: '140px', cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Visualizer Area */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '20px', width: '100%' }}>
          {/* Signal Representation */}
          <div style={{ background: '#061F38', padding: '16px', borderRadius: '10px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Input Signal Line */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64D9EF', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                <span>Sinal de Entrada ($N = {N}$ amostras)</span>
                <span>Janela Kernel $K = {K}$ em vermelho</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px' }}>
                {inputSignal.map((val, idx) => {
                  const isInKernelWindow = idx >= stepIndex && idx < stepIndex + K;
                  return (
                    <div 
                      key={idx}
                      style={{
                        flex: 1,
                        height: '54px',
                        background: isInKernelWindow ? 'rgba(255, 112, 67, 0.25)' : 'rgba(255,255,255,0.1)',
                        border: isInKernelWindow ? '2px solid #FF7043' : '1px solid rgba(255,255,255,0.15)',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span style={{ color: isInKernelWindow ? '#FF7043' : '#64D9EF' }}>{val}</span>
                      <span style={{ fontSize: '0.58rem', opacity: 0.6 }}>[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Output Feature Map Line */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#7CB342', fontSize: '0.85rem', fontWeight: '700', marginBottom: '8px' }}>
                <span>Sinal Convoluído / Feature Map ($N_{'{out}'} = {outputLength}$ amostras)</span>
                <span style={{ color: '#AED581' }}>Redução de Amostras: {N} ➔ {outputLength}</span>
              </div>
              <div style={{ display: 'flex', gap: '4px', background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '6px' }}>
                {outputSignal.map((val, idx) => {
                  const isCurrentActive = idx === stepIndex;
                  return (
                    <div 
                      key={idx}
                      style={{
                        flex: 1,
                        height: '54px',
                        background: isCurrentActive ? 'rgba(124, 179, 66, 0.4)' : idx < stepIndex ? 'rgba(124, 179, 66, 0.15)' : 'rgba(255,255,255,0.05)',
                        border: isCurrentActive ? '2px solid #7CB342' : '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isCurrentActive ? '#7CB342' : '#FFFFFF',
                        fontSize: '0.8rem',
                        fontWeight: '700',
                        opacity: idx <= stepIndex ? 1 : 0.35,
                        transition: 'all 0.2s ease'
                      }}
                    >
                      <span>{val}</span>
                      <span style={{ fontSize: '0.58rem', opacity: 0.6 }}>[{idx}]</span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Math Calculation Explanation Card */}
          <div style={{ background: '#F8FAFC', padding: '16px', borderRadius: '10px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ color: '#0A345D', marginTop: 0, marginBottom: '8px' }}>
                🧮 Cálculo do Produto Escalar
              </h4>
              <p style={{ fontSize: '0.82rem', color: '#64748B', marginBottom: '12px' }}>
                {currentFilter.desc}
              </p>
              
              <div style={{ background: '#0A345D', color: '#64D9EF', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', fontFamily: 'var(--font-mono)', marginBottom: '12px' }}>
                {currentFilter.kernel.map((k, j) => {
                  const inVal = inputSignal[stepIndex + j];
                  return (
                    <div key={j}>
                      ({inVal} × {k}) = {(inVal * k).toFixed(1)}
                    </div>
                  );
                })}
                <hr style={{ borderColor: 'rgba(255,255,255,0.2)', margin: '6px 0' }} />
                <div style={{ color: '#7CB342', fontWeight: '700' }}>
                  Resultado = {outputSignal[stepIndex]}
                </div>
              </div>
            </div>

            <div style={{ background: '#E2E8F0', padding: '10px', borderRadius: '6px', fontSize: '0.8rem', color: '#334155' }}>
              <strong>Fórmula do Tamanho da Saída:</strong><br />
              <code style={{ fontFamily: 'var(--font-mono)', color: '#0A345D' }}>
                N_out = N_in - K + 1
              </code><br />
              <code style={{ fontFamily: 'var(--font-mono)' }}>
                {outputLength} = {N} - {K} + 1
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
