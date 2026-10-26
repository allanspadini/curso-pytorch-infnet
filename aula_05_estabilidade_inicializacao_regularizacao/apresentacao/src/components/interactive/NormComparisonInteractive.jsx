import React, { useState } from 'react';

export default function NormComparisonInteractive() {
  const [normType, setNormType] = useState('batchnorm'); // 'batchnorm' vs 'layernorm'
  const [isTrainMode, setIsTrainMode] = useState(true);
  const [batchSize, setBatchSize] = useState(4); // 4 vs 1

  // Matrix of activations: N samples x C features
  const rawMatrix = [
    [2.5,  0.8, -1.2, 3.0],
    [1.1, -0.4,  0.5, 0.2],
    [3.8,  1.9, -0.8, 4.1],
    [0.2, -1.5,  2.1, 1.0],
  ];

  const currentMatrix = rawMatrix.slice(0, batchSize);

  return (
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', color: '#64D9EF', margin: 0 }}>
            🧮 Comparador Visual: BatchNorm1d vs LayerNorm
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
            Inspecione a dimensão de cálculo de Média ($\mu$) e Variância ($\sigma^2$)
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setNormType('batchnorm')}
            style={{
              background: normType === 'batchnorm' ? '#1BB5D8' : 'rgba(27, 181, 216, 0.15)',
              color: normType === 'batchnorm' ? '#0A345D' : '#64D9EF',
              border: '1px solid #1BB5D8',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            BatchNorm1d (Eixo Batch N)
          </button>
          <button 
            onClick={() => setNormType('layernorm')}
            style={{
              background: normType === 'layernorm' ? '#7CB342' : 'rgba(124, 179, 66, 0.15)',
              color: normType === 'layernorm' ? '#FFFFFF' : '#7CB342',
              border: '1px solid #7CB342',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            LayerNorm (Eixo Features C)
          </button>
        </div>
      </div>

      {/* Controls row */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '14px', background: '#041221', padding: '10px 14px', borderRadius: '8px' }}>
        <span style={{ fontSize: '0.85rem', color: '#CBD5E1', fontWeight: '600' }}>Tamanho do Batch:</span>
        <button 
          onClick={() => setBatchSize(4)}
          style={{ background: batchSize === 4 ? '#0E4E8A' : 'transparent', color: '#FFF', border: '1px solid #1E3A5F', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          N = 4 (Normal)
        </button>
        <button 
          onClick={() => setBatchSize(1)}
          style={{ background: batchSize === 1 ? '#FF7043' : 'transparent', color: '#FFF', border: '1px solid #FF7043', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer' }}
        >
          N = 1 (Mini-batch Unitário)
        </button>

        {normType === 'batchnorm' && (
          <>
            <div style={{ width: '1px', height: '18px', background: '#334155', margin: '0 4px' }} />
            <button 
              onClick={() => setIsTrainMode(!isTrainMode)}
              style={{ background: isTrainMode ? '#7CB342' : '#AB47BC', color: '#FFF', border: 'none', borderRadius: '6px', padding: '4px 10px', fontSize: '0.8rem', cursor: 'pointer', fontWeight: '700' }}
            >
              {isTrainMode ? 'Modo Treino (Stats do Batch)' : 'Modo Eval (Running Mean/Var)'}
            </button>
          </>
        )}
      </div>

      {/* Matrix Display */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px', marginBottom: '14px' }}>
        {currentMatrix.map((row, rIdx) => (
          row.map((val, cIdx) => {
            const isHighlight = normType === 'batchnorm' ? true : true;
            return (
              <div 
                key={`${rIdx}-${cIdx}`}
                style={{
                  background: normType === 'batchnorm' ? 'rgba(27, 181, 216, 0.12)' : 'rgba(124, 179, 66, 0.12)',
                  border: `1.5px solid ${normType === 'batchnorm' ? '#1BB5D8' : '#7CB342'}`,
                  borderRadius: '8px',
                  padding: '10px',
                  textAlign: 'center'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginBottom: '2px' }}>
                  Amostra #{rIdx + 1} | Feat #{cIdx + 1}
                </div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '1.05rem', fontWeight: '700', color: val > 0 ? '#64D9EF' : '#FF7043' }}>
                  {val.toFixed(1)}
                </div>
              </div>
            );
          })
        ))}
      </div>

      {/* Math Explanation Alert */}
      <div style={{ background: '#041221', borderRadius: '8px', padding: '12px', border: '1px solid #1E293B' }}>
        {normType === 'batchnorm' ? (
          <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
            <strong style={{ color: '#64D9EF' }}>BatchNorm1d:</strong> Normaliza <strong>VERTICALMENTE</strong> pelas amostras do batch ($N$) para cada feature ($C$). 
            {batchSize === 1 && <span style={{ color: '#FF7043', fontWeight: '800' }}> ⚠️ AVISO: Quando Batch Size = 1, a variância é ZERO ($\sigma^2 = 0$), causando divisão por zero ou colapso no treino!</span>}
          </div>
        ) : (
          <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
            <strong style={{ color: '#AED581' }}>LayerNorm:</strong> Normaliza <strong>HORIZONTALMENTE</strong> pelas features ($C$) dentro de cada amostra individual ($N$). 
            {batchSize === 1 ? <span style={{ color: '#AED581', fontWeight: '800' }}> ✅ Funciona perfeitamente com Batch Size = 1 pois não depende de outros exemplos no mini-batch!</span> : ' Totalmente independente do tamanho do batch! Ideal para sequências e NLP.'}
          </div>
        )}
      </div>
    </div>
  );
}
