import React, { useState } from 'react';
import { Eye, ScatterChart, Compass, RefreshCw } from 'lucide-react';

export default function LatentSpaceVisualizer() {
  const [bottleneckSetting, setBottleneckSetting] = useState('optimal'); // 'tight', 'optimal', 'loose'

  // Simulated 2D coordinates for 3 classes of digits (Digit 0, Digit 1, Digit 8)
  const getClusters = () => {
    if (bottleneckSetting === 'tight') {
      // Overlapping clusters due to overcompression
      return [
        { name: 'Dígito 0', color: '#1BB5D8', points: [[40, 50], [45, 52], [42, 48], [48, 55], [44, 46], [50, 50]] },
        { name: 'Dígito 1', color: '#7CB342', points: [[48, 52], [52, 54], [50, 48], [55, 58], [46, 50], [53, 52]] },
        { name: 'Dígito 8', color: '#FF7043', points: [[42, 48], [46, 45], [44, 52], [49, 50], [45, 47], [48, 49]] }
      ];
    } else if (bottleneckSetting === 'optimal') {
      // Well-separated semantic clusters
      return [
        { name: 'Dígito 0', color: '#1BB5D8', points: [[20, 30], [25, 35], [22, 28], [28, 38], [18, 32], [24, 26]] },
        { name: 'Dígito 1', color: '#7CB342', points: [[70, 75], [75, 80], [72, 70], [78, 85], [68, 74], [74, 78]] },
        { name: 'Dígito 8', color: '#FF7043', points: [[75, 25], [80, 30], [72, 22], [82, 32], [70, 26], [78, 20]] }
      ];
    } else {
      // Scattered points without clear structure (overdimensionalized)
      return [
        { name: 'Dígito 0', color: '#1BB5D8', points: [[15, 85], [30, 20], [80, 75], [50, 45], [25, 60], [70, 15]] },
        { name: 'Dígito 1', color: '#7CB342', points: [[85, 30], [20, 70], [60, 85], [40, 15], [75, 50], [15, 40]] },
        { name: 'Dígito 8', color: '#FF7043', points: [[45, 80], [75, 25], [15, 15], [85, 85], [35, 35], [65, 60]] }
      ];
    }
  };

  const clusters = getClusters();

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Compass size={20} color="#1BB5D8" />
          <h3 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: 700 }}>
            Visualização do Espaço Latente (Simulação de Projeção t-SNE em 2D)
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button
            className={`btn-interactive ${bottleneckSetting === 'tight' ? 'active' : ''}`}
            onClick={() => setBottleneckSetting('tight')}
          >
            Bottleneck Curto (Z=4)
          </button>
          <button
            className={`btn-interactive ${bottleneckSetting === 'optimal' ? 'active' : ''}`}
            onClick={() => setBottleneckSetting('optimal')}
          >
            Bottleneck Ideal (Z=32)
          </button>
          <button
            className={`btn-interactive ${bottleneckSetting === 'loose' ? 'active' : ''}`}
            onClick={() => setBottleneckSetting('loose')}
          >
            Sem Bottleneck (Z=1024)
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'row', gap: '20px', width: '100%', alignItems: 'stretch' }}>
        {/* 2D Canvas Map Simulation */}
        <div style={{ flex: 1.2, background: '#061F38', borderRadius: '10px', padding: '16px', position: 'relative', border: '1px solid #1E293B', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64D9EF', fontSize: '0.8rem', fontWeight: 600, marginBottom: '8px' }}>
            <span>Mapa t-SNE Componente 1 (X)</span>
            <span>Componente 2 (Y)</span>
          </div>

          <div style={{ flex: 1, position: 'relative', background: 'radial-gradient(circle, rgba(27,181,216,0.05) 0%, rgba(6,31,56,1) 100%)', border: '1px dashed #1E3A8A', borderRadius: '6px', overflow: 'hidden' }}>
            {clusters.map((cluster) =>
              cluster.points.map((pt, idx) => (
                <div
                  key={`${cluster.name}-${idx}`}
                  style={{
                    position: 'absolute',
                    left: `${pt[0]}%`,
                    top: `${pt[1]}%`,
                    width: '14px',
                    height: '14px',
                    borderRadius: '50%',
                    background: cluster.color,
                    boxShadow: `0 0 10px ${cluster.color}`,
                    transform: 'translate(-50%, -50%)',
                    transition: 'all 0.4s ease'
                  }}
                  title={`${cluster.name}: (${pt[0]}, ${pt[1]})`}
                />
              ))
            )}
          </div>

          {/* Legend */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '12px' }}>
            {clusters.map((c) => (
              <div key={c.name} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem', color: '#FFF' }}>
                <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: c.color }} />
                {c.name}
              </div>
            ))}
          </div>
        </div>

        {/* Analytical Feedback Card */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'center' }}>
          <div className="content-card">
            <h4 className="card-title">🔍 Análise da Projeção t-SNE</h4>
            {bottleneckSetting === 'tight' && (
              <p className="card-text">
                <strong style={{ color: '#D84315' }}>Clusters Sobrepostos:</strong> Com $Z=4$, o espaço latente é pequeno demais para separar as sutilezas de cada dígito. As representações se confundem no mesmo espaço.
              </p>
            )}
            {bottleneckSetting === 'optimal' && (
              <p className="card-text">
                <strong style={{ color: '#0E7490' }}>Agrupamento Semântico Claro:</strong> Com $Z=32$, o Autoencoder organizou autonomamente os dígitos em clusters bem separados e coesos sem necessitar de nenhum rótulo durante o treino!
              </p>
            )}
            {bottleneckSetting === 'loose' && (
              <p className="card-text">
                <strong style={{ color: '#C2410C' }}>Pontos Dispersos:</strong> Sem um gargalo efetivo ($Z=1024$), a rede memoriza dados brutos em vez de aprender abstrações semânticas. O t-SNE não consegue identificar clusters definidos.
              </p>
            )}
          </div>

          <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '12px', borderRadius: '8px', fontSize: '0.82rem', color: '#475569' }}>
            <strong>💡 Aplicação Prática:</strong> Em um Autoencoder bem treinado, podemos inspecionar o espaço latente com t-SNE para verificar se a rede agrupou corretamente os dados normais antes de implantar o detector de anomalias.
          </div>
        </div>
      </div>
    </div>
  );
}
