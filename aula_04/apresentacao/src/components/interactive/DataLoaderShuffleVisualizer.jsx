import React, { useState } from 'react';

export default function DataLoaderShuffleVisualizer() {
  const [shuffle, setShuffle] = useState(true);
  const [epoch, setEpoch] = useState(1);
  const [selectedBatch, setSelectedBatch] = useState(null);

  // Initial dataset sorted strictly by class (0 vs 1)
  const baseDataset = [
    { id: 1, label: 0, title: 'Transação A (Legítima)' },
    { id: 2, label: 0, title: 'Transação B (Legítima)' },
    { id: 3, label: 0, title: 'Transação C (Legítima)' },
    { id: 4, label: 0, title: 'Transação D (Legítima)' },
    { id: 5, label: 0, title: 'Transação E (Legítima)' },
    { id: 6, label: 0, title: 'Transação F (Legítima)' },
    { id: 7, label: 1, title: 'Transação G (Fraude)' },
    { id: 8, label: 1, title: 'Transação H (Fraude)' },
    { id: 9, label: 1, title: 'Transação I (Fraude)' },
    { id: 10, label: 1, title: 'Transação J (Fraude)' },
    { id: 11, label: 1, title: 'Transação K (Fraude)' },
    { id: 12, label: 1, title: 'Transação L (Fraude)' },
  ];

  const getBatches = () => {
    let items = [...baseDataset];
    if (shuffle) {
      // Deterministic visual shuffle based on epoch
      const seed = epoch * 7;
      items = items.sort((a, b) => (Math.sin(a.id * seed) - Math.sin(b.id * seed)));
    }
    // Batch size = 4
    const batches = [];
    for (let i = 0; i < items.length; i += 4) {
      batches.push(items.slice(i, i + 4));
    }
    return batches;
  };

  const batches = getBatches();

  return (
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', color: '#64D9EF', margin: 0 }}>
            🔀 DataLoader Batching & Shuffle Visualizer
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
            Impacto da aleatorização de batches no treinamento de Redes Neurais
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <button 
            onClick={() => setShuffle(!shuffle)}
            style={{
              background: shuffle ? '#7CB342' : '#FF7043',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            {shuffle ? '✅ shuffle=True (Recomendado Treino)' : '⚠️ shuffle=False (Ordenado)'}
          </button>

          <button 
            onClick={() => setEpoch(e => e + 1)}
            style={{
              background: '#1BB5D8',
              color: '#0A345D',
              border: 'none',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            🚀 Nova Época (Época {epoch})
          </button>
        </div>
      </div>

      {/* Batches Visualization */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '14px' }}>
        {batches.map((batch, bIdx) => {
          const class0Count = batch.filter(x => x.label === 0).length;
          const class1Count = batch.filter(x => x.label === 1).length;
          const isSelected = selectedBatch === bIdx;

          return (
            <div 
              key={bIdx}
              onClick={() => setSelectedBatch(bIdx)}
              style={{
                background: isSelected ? '#0F3459' : '#041221',
                border: `2px solid ${isSelected ? '#64D9EF' : (shuffle ? '#1E3A5F' : '#FF7043')}`,
                borderRadius: '10px',
                padding: '12px',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{ fontWeight: '800', color: '#64D9EF', fontSize: '0.88rem' }}>Batch #{bIdx + 1}</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.1)', padding: '2px 6px', borderRadius: '4px' }}>
                  {batch.length} amostras
                </span>
              </div>

              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px' }}>
                {batch.map(item => (
                  <div 
                    key={item.id}
                    title={item.title}
                    style={{
                      flex: 1,
                      height: '24px',
                      borderRadius: '4px',
                      background: item.label === 0 ? '#1BB5D8' : '#FF7043',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.7rem',
                      fontWeight: '800'
                    }}
                  >
                    #{item.id}
                  </div>
                ))}
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: '#CBD5E1' }}>
                <span style={{ color: '#64D9EF' }}>Legítima: {class0Count}</span>
                <span style={{ color: '#FF7043' }}>Fraude: {class1Count}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Diagnostic Alert Box */}
      <div style={{ background: shuffle ? 'rgba(124, 179, 66, 0.12)' : 'rgba(255, 112, 67, 0.12)', border: `1px solid ${shuffle ? '#7CB342' : '#FF7043'}`, borderRadius: '8px', padding: '12px' }}>
        <div style={{ color: shuffle ? '#7CB342' : '#FF7043', fontWeight: '700', fontSize: '0.88rem', marginBottom: '4px' }}>
          {shuffle ? '✨ Convergência Suave (SGD com Variância Controlada)' : '⚠️ Instabilidade e Viés Sequencial de Gradiente'}
        </div>
        <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
          {shuffle 
            ? 'Com shuffle=True, cada batch mistura amostras de todas as classes. Os gradientes apontam para o mínimo global médio de maneira uniforme a cada iteração!' 
            : 'Sem shuffle, o Batch 1 tem 100% Legítimas e o Batch 3 tem 100% Fraudes! O modelo atualiza pesos alternando agressivamente para um lado e para o outro, destruindo o aprendizado!'}
        </div>
      </div>
    </div>
  );
}
