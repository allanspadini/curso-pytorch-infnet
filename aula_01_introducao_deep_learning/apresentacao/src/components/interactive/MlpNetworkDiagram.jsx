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
    h1: { title: 'Neurônio Oculto h₁', layer: 'Camada Oculta', formula: 'h₁ = σ(w₁₁x₁ + w₂₁x₂ + w₃₁x₃ + b₁)', desc: 'Extrai um detector de características não-lineares a partir das combinações de entrada.' },
    h2: { title: 'Neurônio Oculto h₂', layer: 'Camada Oculta', formula: 'h₂ = σ(w₁₂x₁ + w₂₂x₂ + w₃₂x₃ + b₂)', desc: 'Extrai uma segunda representação independente para capturar padrões complexos.' },
    y:  { title: 'Neurônio de Saída ŷ', layer: 'Camada de Saída', formula: 'ŷ = σ(v₁h₁ + v₂h₂ + b_o)', desc: 'Combina as representações não-lineares aprendidas por h₁ e h₂ para gerar a probabilidade final de Alta Performance.' }
  };

  const current = nodeInfo[activeNode];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '28px', height: '100%', alignItems: 'stretch' }}>
      {/* Network SVG Viewport */}
      <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #CBD5E1', padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', marginBottom: '16px', alignItems: 'center' }}>
          <h4 style={{ color: '#0A345D', fontSize: '1.18rem', fontWeight: '800' }}>
            Arquitetura Multi-Layer Perceptron (MLP)
          </h4>
          <button 
            onClick={triggerAnimation}
            style={{ background: '#1BB5D8', color: '#FFF', border: 'none', padding: '10px 18px', borderRadius: '24px', fontWeight: '800', fontSize: '0.95rem', cursor: 'pointer', boxShadow: '0 4px 12px rgba(27, 181, 216, 0.35)' }}
          >
            ⚡ Simular Propagação (Forward Pass)
          </button>
        </div>

        <svg width="100%" height="auto" viewBox="0 0 440 330" style={{ background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0', maxHeight: '350px' }}>
          {/* Synapse Lines (Inputs -> Hidden) */}
          <line x1="70" y1="65" x2="220" y2="105" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />
          <line x1="70" y1="65" x2="220" y2="225" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />

          <line x1="70" y1="165" x2="220" y2="105" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />
          <line x1="70" y1="165" x2="220" y2="225" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />

          <line x1="70" y1="265" x2="220" y2="105" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />
          <line x1="70" y1="265" x2="220" y2="225" stroke={isAnimating ? "#1BB5D8" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />

          {/* Synapse Lines (Hidden -> Output) */}
          <line x1="220" y1="105" x2="370" y2="165" stroke={isAnimating ? "#7CB342" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />
          <line x1="220" y1="225" x2="370" y2="165" stroke={isAnimating ? "#7CB342" : "#CBD5E1"} strokeWidth={isAnimating ? "4" : "2.5"} />

          {/* Input Layer Nodes */}
          {[
            { id: 'x1', label: 'x₁', cy: 65 },
            { id: 'x2', label: 'x₂', cy: 165 },
            { id: 'x3', label: 'x₃', cy: 265 }
          ].map(node => (
            <g key={node.id} onClick={() => setActiveNode(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx="70" cy={node.cy} r="24" fill={activeNode === node.id ? '#0A345D' : '#0284C7'} stroke="#FFFFFF" strokeWidth="3.5" />
              <text x="70" y={node.cy + 6} fill="#FFFFFF" fontSize="16" fontWeight="bold" textAnchor="middle">{node.label}</text>
            </g>
          ))}

          {/* Hidden Layer Nodes */}
          {[
            { id: 'h1', label: 'h₁', cy: 105 },
            { id: 'h2', label: 'h₂', cy: 225 }
          ].map(node => (
            <g key={node.id} onClick={() => setActiveNode(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx="220" cy={node.cy} r="28" fill={activeNode === node.id ? '#0A345D' : '#1BB5D8'} stroke="#FFFFFF" strokeWidth="3.5" />
              <text x="220" y={node.cy + 6} fill="#FFFFFF" fontSize="17" fontWeight="bold" textAnchor="middle">{node.label}</text>
            </g>
          ))}

          {/* Output Layer Node */}
          <g onClick={() => setActiveNode('y')} style={{ cursor: 'pointer' }}>
            <circle cx="370" cy="165" r="30" fill={activeNode === 'y' ? '#0A345D' : '#7CB342'} stroke="#FFFFFF" strokeWidth="3.5" />
            <text x="370" y="171" fill="#FFFFFF" fontSize="18" fontWeight="bold" textAnchor="middle">ŷ</text>
          </g>
        </svg>

        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%', marginTop: '16px', fontSize: '1.05rem', fontWeight: '800', color: '#64748B' }}>
          <span>Entrada (3 Neurônios)</span>
          <span>Oculta (2 Neurônios)</span>
          <span>Saída (1 Neurônio)</span>
        </div>
      </div>

      {/* Selected Node Details Card */}
      <div className="content-card" style={{ borderColor: '#0A345D', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '30px' }}>
        <span className="card-header-badge" style={{ fontSize: '1.05rem', marginBottom: '14px' }}>{current.layer}</span>
        <h3 style={{ color: '#0A345D', fontSize: '1.65rem', fontWeight: '800', marginBottom: '12px' }}>
          {current.title}
        </h3>
        <p style={{ fontSize: '1.18rem', color: '#334155', lineHeight: '1.55', marginBottom: '20px' }}>
          {current.desc}
        </p>

        <div className="math-box" style={{ margin: 0, fontSize: '1.18rem', padding: '16px 20px', borderLeftWidth: '5px' }}>
          {current.formula}
        </div>
      </div>
    </div>
  );
}
