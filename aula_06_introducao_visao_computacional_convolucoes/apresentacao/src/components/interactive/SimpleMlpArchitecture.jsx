import React, { useState } from 'react';

export default function SimpleMlpArchitecture() {
  const [activeStep, setActiveStep] = useState(2);
  const [selectedNode, setSelectedNode] = useState('y');
  const [isPulsing, setIsPulsing] = useState(false);

  const triggerForwardPulse = () => {
    setIsPulsing(true);
    setTimeout(() => setIsPulsing(false), 1200);
  };

  const nodeDetails = {
    x1: {
      title: 'Entrada x₁',
      layer: 'Camada de Entrada (2 Neurônios)',
      formula: 'x₁ = 0.80',
      badge: '#0284C7',
      desc: 'Primeira variável de entrada. Em visão, pode representar a intensidade luminosa de um pixel ou uma feature contínua.'
    },
    x2: {
      title: 'Entrada x₂',
      layer: 'Camada de Entrada (2 Neurônios)',
      formula: 'x₂ = 0.40',
      badge: '#0284C7',
      desc: 'Segunda variável de entrada. Representa o valor do segundo atributo ou pixel vizinho fornecido à rede.'
    },
    h1: {
      title: 'Neurônio Oculto h₁',
      layer: 'Camada Oculta (2 Neurônios)',
      formula: 'h₁ = f(w₁₁ · x₁ + w₂₁ · x₂ + b₁)',
      badge: '#1BB5D8',
      desc: 'Multiplica cada entrada pelo seu peso, soma o bias b₁ e passa pela função de ativação f para gerar o valor de h₁.'
    },
    h2: {
      title: 'Neurônio Oculto h₂',
      layer: 'Camada Oculta (2 Neurônios)',
      formula: 'h₂ = f(w₁₂ · x₁ + w₂₂ · x₂ + b₂)',
      badge: '#1BB5D8',
      desc: 'Combina as entradas com os pesos w₁₂ e w₂₂, soma o bias b₂ e aplica a função f para detectar outro padrão independente.'
    },
    y: {
      title: 'Neurônio de Saída ŷ',
      layer: 'Camada de Saída (1 Neurônio)',
      formula: 'ŷ = f(v₁ · h₁ + v₂ · h₂ + b_o)',
      badge: '#7CB342',
      desc: 'Pega as respostas de h₁ e h₂, multiplica pelos pesos v₁ e v₂, soma o bias b_o e aplica f para dar a resposta final estimada ŷ.'
    }
  };

  const activeInfo = nodeDetails[selectedNode];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      {/* Diagram Viewport */}
      <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #CBD5E1', padding: '18px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
          <div>
            <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0E7490', background: 'rgba(27,181,216,0.15)', padding: '3px 10px', borderRadius: '12px' }}>
              TOPOLOGIA CLÁSSICA (2 ➔ 2 ➔ 1)
            </span>
            <h4 style={{ color: '#0A345D', fontSize: '1.1rem', fontWeight: '800', marginTop: '4px' }}>
              Perceptron Multicamadas (MLP) Simples
            </h4>
          </div>

          <div style={{ display: 'flex', gap: '6px' }}>
            {['1. Entradas', '2. Oculta', '3. Saída'].map((label, idx) => (
              <button
                key={idx}
                onClick={() => setActiveStep(idx)}
                style={{
                  padding: '5px 12px',
                  borderRadius: '16px',
                  border: activeStep === idx ? '2px solid #0A345D' : '1px solid #CBD5E1',
                  background: activeStep === idx ? '#E0F2FE' : '#F8FAFC',
                  color: activeStep === idx ? '#0A345D' : '#64748B',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}
              >
                {label}
              </button>
            ))}
            <button
              onClick={triggerForwardPulse}
              style={{
                padding: '5px 12px',
                borderRadius: '16px',
                border: 'none',
                background: '#1BB5D8',
                color: '#FFF',
                fontWeight: '800',
                fontSize: '0.78rem',
                cursor: 'pointer',
                boxShadow: '0 2px 8px rgba(27,181,216,0.35)'
              }}
            >
              ⚡ Simular Forward
            </button>
          </div>
        </div>

        {/* SVG Network */}
        <svg viewBox="0 0 520 280" style={{ width: '100%', height: '230px', background: '#F8FAFC', borderRadius: '10px', border: '1px solid #E2E8F0', marginTop: '8px' }}>
          {/* Synapses: Input to Hidden */}
          <line x1="90" y1="90" x2="260" y2="90" stroke={isPulsing || activeStep >= 1 ? '#0284C7' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 1 ? '4' : 'none'} />
          <line x1="90" y1="90" x2="260" y2="190" stroke={isPulsing || activeStep >= 1 ? '#0284C7' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 1 ? '4' : 'none'} />
          <line x1="90" y1="190" x2="260" y2="90" stroke={isPulsing || activeStep >= 1 ? '#0284C7' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 1 ? '4' : 'none'} />
          <line x1="90" y1="190" x2="260" y2="190" stroke={isPulsing || activeStep >= 1 ? '#0284C7' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 1 ? '4' : 'none'} />

          {/* Weight Labels (Input -> Hidden) */}
          <text x="165" y="80" fontSize="11" fill="#0E4E8A" fontWeight="bold">w₁₁</text>
          <text x="145" y="115" fontSize="11" fill="#0E4E8A" fontWeight="bold">w₁₂</text>
          <text x="145" y="165" fontSize="11" fill="#0E4E8A" fontWeight="bold">w₂₁</text>
          <text x="165" y="200" fontSize="11" fill="#0E4E8A" fontWeight="bold">w₂₂</text>

          {/* Synapses: Hidden to Output */}
          <line x1="260" y1="90" x2="430" y2="140" stroke={isPulsing || activeStep >= 2 ? '#7CB342' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 2 ? '4' : 'none'} />
          <line x1="260" y1="190" x2="430" y2="140" stroke={isPulsing || activeStep >= 2 ? '#7CB342' : '#CBD5E1'} strokeWidth={isPulsing ? '3.5' : '2'} strokeDasharray={activeStep < 2 ? '4' : 'none'} />

          {/* Weight Labels (Hidden -> Output) */}
          <text x="340" y="105" fontSize="11" fill="#2E7D32" fontWeight="bold">v₁</text>
          <text x="340" y="175" fontSize="11" fill="#2E7D32" fontWeight="bold">v₂</text>

          {/* Input Nodes */}
          {[
            { id: 'x1', label: 'x₁', cy: 90, sub: 'Entrada 1' },
            { id: 'x2', label: 'x₂', cy: 190, sub: 'Entrada 2' }
          ].map(node => (
            <g key={node.id} onClick={() => setSelectedNode(node.id)} style={{ cursor: 'pointer' }}>
              <circle cx="90" cy={node.cy} r="25" fill={selectedNode === node.id ? '#0A345D' : '#0284C7'} stroke="#FFFFFF" strokeWidth="3" />
              <text x="90" y={node.cy + 5} fill="#FFFFFF" fontSize="15" fontWeight="bold" textAnchor="middle">{node.label}</text>
              <text x="90" y={node.cy + 36} fill="#64748B" fontSize="10" textAnchor="middle">{node.sub}</text>
            </g>
          ))}

          {/* Hidden Nodes */}
          {[
            { id: 'h1', label: 'h₁', cy: 90, sub: 'Oculto 1' },
            { id: 'h2', label: 'h₂', cy: 190, sub: 'Oculto 2' }
          ].map(node => (
            <g key={node.id} onClick={() => setSelectedNode(node.id)} style={{ cursor: 'pointer', opacity: activeStep >= 1 ? 1 : 0.4 }}>
              <circle cx="260" cy={node.cy} r="27" fill={selectedNode === node.id ? '#0A345D' : '#1BB5D8'} stroke="#FFFFFF" strokeWidth="3" />
              <text x="260" y={node.cy + 5} fill="#FFFFFF" fontSize="15" fontWeight="bold" textAnchor="middle">{node.label}</text>
              <text x="260" y={node.cy + 38} fill="#64748B" fontSize="10" textAnchor="middle">{node.sub}</text>
            </g>
          ))}

          {/* Output Node */}
          <g onClick={() => setSelectedNode('y')} style={{ cursor: 'pointer', opacity: activeStep >= 2 ? 1 : 0.4 }}>
            <circle cx="430" cy="140" r="29" fill={selectedNode === 'y' ? '#0A345D' : '#7CB342'} stroke="#FFFFFF" strokeWidth="3" />
            <text x="430" y="146" fill="#FFFFFF" fontSize="17" fontWeight="bold" textAnchor="middle">ŷ</text>
            <text x="430" y="180" fill="#64748B" fontSize="10" textAnchor="middle">Saída Única</text>
          </g>
        </svg>

        {/* Bottom Legend */}
        <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 10px', fontSize: '0.85rem', fontWeight: '700', color: '#475569' }}>
          <span>Entradas (2)</span>
          <span>Camada Oculta (2)</span>
          <span>Saída Estimada (1)</span>
        </div>
      </div>

      {/* Node Detail Card */}
      <div className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '22px' }}>
        <div>
          <span className="card-header-badge" style={{ background: 'rgba(10,52,93,0.1)', color: '#0A345D', marginBottom: '10px' }}>
            {activeInfo.layer}
          </span>
          <h3 style={{ color: '#0A345D', fontSize: '1.35rem', fontWeight: '800', marginBottom: '8px' }}>
            {activeInfo.title}
          </h3>
          <p style={{ fontSize: '0.94rem', color: '#334155', lineHeight: '1.5', marginBottom: '14px' }}>
            {activeInfo.desc}
          </p>

          <div style={{ background: '#F1F5F9', borderLeft: `4px solid ${activeInfo.badge}`, padding: '12px', borderRadius: '8px', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#64748B', marginBottom: '4px' }}>
              EXPRESSÃO MATEMÁTICA LOCAL:
            </div>
            <div style={{ fontFamily: 'Fira Code, monospace', fontWeight: '700', color: '#0A345D', fontSize: '0.9rem' }}>
              {activeInfo.formula}
            </div>
          </div>
        </div>

        <div style={{ background: '#EFF6FF', borderRadius: '8px', padding: '10px 14px', border: '1px solid #BFDBFE' }}>
          <div style={{ fontSize: '0.82rem', color: '#1E40AF', fontWeight: '600' }}>
            💡 <strong>Conceito Central:</strong> Em uma rede densa com 2 entradas e 1 saída, todas as conexões entre camadas vizinhas possuem pesos livres ajustados durante o treinamento.
          </div>
        </div>
      </div>
    </div>
  );
}
