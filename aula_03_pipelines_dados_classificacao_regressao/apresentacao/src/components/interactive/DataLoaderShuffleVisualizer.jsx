import React, { useState } from 'react';

export default function DataLoaderShuffleVisualizer() {
  const [shuffle, setShuffle] = useState(true);
  const [epoch, setEpoch] = useState(1);

  const baseDataset = [
    { id: 1, label: 0 }, { id: 2, label: 0 }, { id: 3, label: 0 },
    { id: 4, label: 0 }, { id: 5, label: 0 }, { id: 6, label: 0 },
    { id: 7, label: 1 }, { id: 8, label: 1 }, { id: 9, label: 1 },
    { id: 10, label: 1 }, { id: 11, label: 1 }, { id: 12, label: 1 }
  ];

  const getBatches = () => {
    let items = [...baseDataset];
    if (shuffle) {
      const seed = epoch * 7;
      items = items.sort((a, b) => Math.sin(a.id * seed) - Math.sin(b.id * seed));
    }
    return [items.slice(0, 4), items.slice(4, 8), items.slice(8, 12)];
  };

  const batches = getBatches();

  return (
    <div style={{ background: '#061F38', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '16px', color: '#FFFFFF', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px', alignItems: 'center', fontSize: '0.85rem', fontWeight: '700' }}>
          <span style={{ color: '#64D9EF' }}>■ Classe 0 (Azul)</span>
          <span style={{ color: '#FF7043' }}>■ Classe 1 (Laranja)</span>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setShuffle(!shuffle)}
            style={{
              background: shuffle ? '#7CB342' : '#FF7043',
              color: '#FFFFFF',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            {shuffle ? '✅ shuffle=True' : '⚠️ shuffle=False'}
          </button>

          <button
            onClick={() => setEpoch(e => e + 1)}
            style={{
              background: '#1BB5D8',
              color: '#0A345D',
              border: 'none',
              borderRadius: '20px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem'
            }}
          >
            🔄 Sortear Época #{epoch}
          </button>
        </div>
      </div>

      {/* SVG Batch & Gradient Vector Diagram */}
      <svg viewBox="0 0 920 245" style={{ width: '100%', maxHeight: '260px' }}>
        {batches.map((batch, bIdx) => {
          const xBase = 55 + bIdx * 290;
          const c0 = batch.filter(x => x.label === 0).length;
          const c1 = batch.filter(x => x.label === 1).length;
          const angle = shuffle ? 0 : (c0 === 4 ? -35 : c1 === 4 ? 35 : 0);

          return (
            <g key={bIdx} transform={`translate(${xBase}, 20)`}>
              <rect x="0" y="0" width="245" height="195" rx="12" fill="#0B2545" stroke={shuffle ? '#1BB5D8' : '#FF7043'} strokeWidth="2.5" />
              <text x="122" y="28" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="Outfit">
                Mini-Batch #{bIdx + 1}
              </text>

              {/* 4 sample blocks */}
              {batch.map((item, i) => (
                <g key={item.id} transform={`translate(${18 + i * 54}, 45)`}>
                  <rect
                    x="0"
                    y="0"
                    width="46"
                    height="46"
                    rx="8"
                    fill={item.label === 0 ? '#1BB5D8' : '#FF7043'}
                  />
                  <text x="23" y="28" textAnchor="middle" fill="#FFF" fontSize="13" fontWeight="800" fontFamily="Fira Code">
                    #{item.id}
                  </text>
                </g>
              ))}

              {/* Gradient Vector Compass */}
              <text x="122" y="122" textAnchor="middle" fill="#94A3B8" fontSize="11" fontWeight="700">
                Direção do Gradiente (∇L)
              </text>
              <g transform={`translate(122, 155) rotate(${angle})`}>
                <line x1="-45" y1="0" x2="45" y2="0" stroke={shuffle ? '#7CB342' : '#FF7043'} strokeWidth="4" />
                <polygon points="45,-6 58,0 45,6" fill={shuffle ? '#7CB342' : '#FF7043'} />
              </g>
              <text x="122" y="184" textAnchor="middle" fill={shuffle ? '#AED581' : '#FF7043'} fontSize="12" fontWeight="800">
                {c0} Classe 0 | {c1} Classe 1
              </text>
            </g>
          );
        })}
      </svg>

      <div style={{
        background: '#081D33',
        borderLeft: `4px solid ${shuffle ? '#7CB342' : '#FF7043'}`,
        padding: '8px 14px',
        borderRadius: '6px',
        fontSize: '0.88rem',
        fontWeight: '600',
        color: '#E2E8F0'
      }}>
        {shuffle
          ? '✨ shuffle=True: Lotes misturados mantêm o vetor gradiente apontando de forma estável para o mínimo global.'
          : '⚠️ shuffle=False: Lotes puros de uma só classe jogam o gradiente em zigue-zague extremo!'}
      </div>
    </div>
  );
}
