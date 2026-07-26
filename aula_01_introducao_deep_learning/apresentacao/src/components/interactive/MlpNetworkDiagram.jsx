import React, { useState } from 'react';

export default function MlpNetworkDiagram() {
  const [activeNode, setActiveNode] = useState('h1');
  const [isAnimating, setIsAnimating] = useState(false);

  const triggerAnimation = () => {
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 1500);
  };

  const nodeInfo = {
    x1: { title: 'Entrada x₁ (Creatina)', layer: 'Camada de Entrada', formula: 'Valor bruto: 5.0 g', desc: 'Sinal de entrada representando a dosagem diária de suplementação.' },
    x2: { title: 'Entrada x₂ (Treino)', layer: 'Camada de Entrada', formula: 'Valor bruto: 12.0 h', desc: 'Sinal de entrada representando a carga horária semanal de treinos.' },
    x3: { title: 'Entrada x₃ (Sono)', layer: 'Camada de Entrada', formula: 'Valor bruto: 8.0 h', desc: 'Sinal de entrada representando a qualidade da recuperação do atleta.' },
    h1: { title: 'Neurônio Oculto h₁', layer: 'Camada Oculta', formula: 'h₁ = σ(w₁₁x₁ + w₂₁x₂ + w₃₁x₃ + b₁)', desc: 'Extrai um detector de características combinações lineares não-lineares das entradas.' },
    h2: { title: 'Neurônio Oculto h₂', layer: 'Camada Oculta', formula: 'h₂ = σ(w₁₂x₁ + w₂₂x₂ + w₃₂x₃ + b₂)', desc: 'Extrai uma segunda representação independente para capturar padrões complexos.' },
    y:  { title: 'Neurônio de Saída ŷ', layer: 'Camada de Saída', formula: 'ŷ = σ(v₁h₁ + v₂h₂ + b_o)', desc: 'Combina as representações não-lineares aprendidas por h₁ e h₂ para gerar a probabilidade final de Alta Performance.' }
  };

  const current = nodeInfo[activeNode];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'center' }}>
      {/* Network SVG Viewport */}
      <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '12px' }}>
          <h4 style={{ color: '#0A345D', fontSize: '1rem', fontWeight: '700' }}>
            Arquitetura Multi-Layer Perceptron (MLP)
          </h4>
          <button 
            onClick={triggerAnimation}
            style={{ background: '#1BB5D8', color: '#FFF', border: 'none', padding: '6px 14px', borderRadius: '20px', fontWeight: '700', fontSize: '0.8rem', cursor: 'pointer' }}
          >
            ⚡ Simular Propagação (Forward Pass)
          </button>
        </div>

        <svg width="380" height="250" style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
          {/* Synapse Lines (Inputs -> Hidden) */}
          <line x1="60" y1="50" x2="190" y2="80" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />
          <line x1="60" y1="50" x2="190" y2="170" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />

          <line x1="60" y1="125" x2="190" y2="80" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />
          <line x1="60" y1="125" x2="190" y2="170" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />

          <line x1="60" y1="200" x2="190" y2="80" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />
          <line x1="60" y1="200" x2="190" y2="170" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />

          {/* Synapse Lines (Hidden -> Output) */}
          <line x1="190" y1="80" x2="320" y2="125" stroke={isAnimating ? "#7CB342" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />
          <line x1="190" y1="170" x2="320" y2="125" stroke={isAnimating ? "#7CB342" : "#CBD5E1"} strokeWidth={isAnimating ? "3" : "2"} />

          {/* Input Layer Nodes */}
          {[
            { id: 'x1', label: 'x₁', cy: 50 },
            { id: 'x2', label: 'x₂', cy: 125 },
            { id: 'x3', label: 'x₃', cy: 200 }
          ].map(node => (
            <g key={node.id} onClick={() => setActiveNode(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx="60" cy={node.cy} r="18" fill={activeNode === node.id ? '#0A345D' : '#0284C7'} stroke="#FFFFFF" strokeWidth="3" />
              <text x="60" y={node.cy + 5} fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">{node.label}</text>
            </g>
          ))}

          {/* Hidden Layer Nodes */}
          {[
            { id: 'h1', label: 'h₁', cy: 80 },
            { id: 'h2', label: 'h₂', cy: 170 }
          ].map(node => (
            <g key={node.id} onClick={() => setActiveNode(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx="190" cy={node.cy} r="22" fill={activeNode === node.id ? '#0A345D' : '#1BB5D8'} stroke="#FFFFFF" strokeWidth="3" />
              <text x="190" y={node.cy + 5} fill="#FFFFFF" fontSize="13" fontWeight="bold" textAnchor="middle">{node.label}</text>
            </g>
          ))}

          {/* Output Layer Node */}
          <g onClick={() => setActiveNode('y')} style={{ cursor: 'pointer' }}>
            <circle cx="320" cy="125" r="24" fill={activeNode === 'y' ? '#0A345D' : '#7CB342'} stroke="#FFFFFF" strokeWidth="3" />
            <text x="320" y="125 + 5" fill="#FFFFFF" fontSize="14" fontWeight="bold" textAnchor="middle">ŷ</text>
          </g>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '12px', fontSize: '0.8rem', fontWeight: '700', color: '#64748B' }}>
          <span>Entrada (3)</span>
          <span>Oculta (2)</span>
          <span>Saída (1)</span>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="content-card" style={{ borderColor: '#0A345D', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <span className="card-header-badge">{current.layer}</span>
        <h3 style={{ color: '#0A345D', fontSize: '1.4rem', fontWeight: '700', marginBottom: '8px' }}>
          {current.title}
        </h3>
        <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.5', marginBottom: '16px' }}>
          {current.desc}
        </p>

        <div className="math-box" style={{ margin: 0, fontSize: '0.95rem', padding: '12px' }}>
          {current.formula}
        </div>
      </div>
    </div>
  );
}
