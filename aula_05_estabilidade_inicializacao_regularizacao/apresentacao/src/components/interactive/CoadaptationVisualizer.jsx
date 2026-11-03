import React, { useState } from 'react';
import { Network, ShieldAlert, ShieldCheck, RefreshCw, Zap, TrendingDown, Layers, HelpCircle } from 'lucide-react';

export default function CoadaptationVisualizer() {
  const [activeTab, setActiveTab] = useState('coadaptation'); // 'coadaptation' vs 'dropout'
  const [seed, setSeed] = useState(1);

  // Geração de máscaras Bernoulli pseudo-aleatórias para Camada 1 (5 neurônios) e Camada 2 (4 neurônios)
  const p = 0.4; // 40% de dropout
  const getMasks = () => {
    const m1 = [true, false, true, true, false]; // default
    const m2 = [true, true, false, true];

    if (seed === 1) return { m1, m2 };

    const gen1 = Array.from({ length: 5 }, (_, i) => Math.abs(Math.sin(seed * 7.1 + i * 3.3)) >= p);
    const gen2 = Array.from({ length: 4 }, (_, i) => Math.abs(Math.sin(seed * 11.7 + i * 5.1)) >= p);

    // Garante ao menos 2 neurônios ativos por camada para visualização rica
    if (gen1.filter(Boolean).length < 2) gen1[0] = gen1[2] = true;
    if (gen2.filter(Boolean).length < 2) gen2[1] = gen2[3] = true;

    return { m1: gen1, m2: gen2 };
  };

  const { m1, m2 } = getMasks();

  // Coordenadas dos nós na arquitetura MLP Multicamadas (viewBox 0 0 520 220)
  const inputNodes = [
    { id: 'x₁', x: 50, y: 50, label: 'Entrada 1' },
    { id: 'x₂', x: 50, y: 110, label: 'Entrada 2' },
    { id: 'x₃', x: 50, y: 170, label: 'Entrada 3' },
  ];

  const hidden1Nodes = [
    { id: 'h₁⁽¹⁾', x: 180, y: 30, idx: 0 },
    { id: 'h₂⁽¹⁾', x: 180, y: 70, idx: 1 },
    { id: 'h₃⁽¹⁾', x: 180, y: 110, idx: 2 },
    { id: 'h₄⁽¹⁾', x: 180, y: 150, idx: 3 },
    { id: 'h₅⁽¹⁾', x: 180, y: 190, idx: 4 },
  ];

  const hidden2Nodes = [
    { id: 'h₁⁽²⁾', x: 330, y: 45, idx: 0 },
    { id: 'h₂⁽²⁾', x: 330, y: 90, idx: 1 },
    { id: 'h₃⁽²⁾', x: 330, y: 135, idx: 2 },
    { id: 'h₄⁽²⁾', x: 330, y: 180, idx: 3 },
  ];

  const outputNodes = [
    { id: 'ŷ₁', x: 460, y: 80, label: 'Classe A' },
    { id: 'ŷ₂', x: 460, y: 140, label: 'Classe B' },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      {/* Top Header with Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setActiveTab('coadaptation')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: activeTab === 'coadaptation' ? '2px solid #D84315' : '1px solid #CBD5E1',
              background: activeTab === 'coadaptation' ? '#FFF7ED' : '#FFFFFF',
              color: activeTab === 'coadaptation' ? '#C2410C' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldAlert size={15} /> 1. Sem Regularização: Co-adaptação Multicamadas
          </button>
          <button
            onClick={() => setActiveTab('dropout')}
            style={{
              padding: '7px 14px',
              borderRadius: '8px',
              border: activeTab === 'dropout' ? '2px solid var(--infnet-green-accent)' : '1px solid #CBD5E1',
              background: activeTab === 'dropout' ? '#F0FDF4' : '#FFFFFF',
              color: activeTab === 'dropout' ? '#15803D' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <ShieldCheck size={15} /> 2. Com Dropout (p=0.4): Sub-Redes Autônomas
          </button>
        </div>

        {activeTab === 'dropout' ? (
          <button
            onClick={() => setSeed(s => s + 1)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              background: '#0E4E8A',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.78rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <RefreshCw size={13} /> 🎲 Sortear Nova Sub-Rede
          </button>
        ) : (
          <span style={{ fontSize: '0.78rem', color: '#D84315', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ShieldAlert size={14} /> Teia de dependência mútua ativa
          </span>
        )}
      </div>

      {/* Main Grid: Left = MLP Architecture Canvas; Right = Diagnosis */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'grid',
        gridTemplateColumns: '1.35fr 0.65fr',
        gap: '18px',
        flex: 1,
        alignItems: 'stretch'
      }}>
        {/* Left: Full Multi-Layer Perceptron SVG Canvas */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          padding: '10px 14px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          position: 'relative'
        }}>
          {/* Layer Headers */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', textAlign: 'center', fontSize: '0.72rem', fontWeight: '800', color: 'var(--infnet-dark-blue)' }}>
            <span>Entrada (3)</span>
            <span>Camada Oculta 1 (5)</span>
            <span>Camada Oculta 2 (4)</span>
            <span>Saída (2)</span>
          </div>

          <svg viewBox="0 0 520 220" style={{ width: '100%', height: '100%', maxHeight: '225px' }}>
            <defs>
              <linearGradient id="activeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1BB5D8" />
                <stop offset="100%" stopColor="#7CB342" />
              </linearGradient>
            </defs>

            {/* SYNAPSES: Layer 0 -> Layer 1 */}
            {inputNodes.map(inNode => (
              hidden1Nodes.map(h1 => {
                const isDropped = activeTab === 'dropout' && !m1[h1.idx];
                const isCoLink = activeTab === 'coadaptation' && inNode.id === 'x₂' && h1.idx === 2;

                return (
                  <line
                    key={`in-${inNode.id}-${h1.id}`}
                    x1={inNode.x}
                    y1={inNode.y}
                    x2={h1.x}
                    y2={h1.y}
                    stroke={isCoLink ? '#DC2626' : isDropped ? '#E2E8F0' : activeTab === 'dropout' ? '#93C5FD' : '#CBD5E1'}
                    strokeWidth={isCoLink ? 2.5 : isDropped ? 0.8 : 1.2}
                    opacity={isDropped ? 0.2 : 1}
                  />
                );
              })
            ))}

            {/* SYNAPSES: Layer 1 -> Layer 2 */}
            {hidden1Nodes.map(h1 => (
              hidden2Nodes.map(h2 => {
                const isDropped = activeTab === 'dropout' && (!m1[h1.idx] || !m2[h2.idx]);
                const isCoLink = activeTab === 'coadaptation' && h1.idx === 2 && (h2.idx === 1 || h2.idx === 2);

                return (
                  <line
                    key={`h1-${h1.id}-h2-${h2.id}`}
                    x1={h1.x}
                    y1={h1.y}
                    x2={h2.x}
                    y2={h2.y}
                    stroke={isCoLink ? '#DC2626' : isDropped ? '#E2E8F0' : activeTab === 'dropout' ? '#86EFAC' : '#CBD5E1'}
                    strokeWidth={isCoLink ? 2.8 : isDropped ? 0.8 : 1.2}
                    strokeDasharray={isCoLink ? '5 2' : 'none'}
                    opacity={isDropped ? 0.2 : 1}
                  />
                );
              })
            ))}

            {/* SYNAPSES: Layer 2 -> Layer 3 */}
            {hidden2Nodes.map(h2 => (
              outputNodes.map(outNode => {
                const isDropped = activeTab === 'dropout' && !m2[h2.idx];
                const isCoLink = activeTab === 'coadaptation' && (h2.idx === 1 || h2.idx === 2);

                return (
                  <line
                    key={`h2-${h2.id}-out-${outNode.id}`}
                    x1={h2.x}
                    y1={h2.y}
                    x2={outNode.x}
                    y2={outNode.y}
                    stroke={isCoLink ? '#D84315' : isDropped ? '#E2E8F0' : activeTab === 'dropout' ? '#86EFAC' : '#CBD5E1'}
                    strokeWidth={isCoLink ? 2.2 : isDropped ? 0.8 : 1.2}
                    opacity={isDropped ? 0.2 : 1}
                  />
                );
              })
            ))}

            {/* NODES: Input Layer */}
            {inputNodes.map(n => (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle r="14" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2" />
                <text x="0" y="3" textAnchor="middle" fill="#0A345D" fontSize="9" fontWeight="700">{n.id}</text>
              </g>
            ))}

            {/* NODES: Hidden Layer 1 */}
            {hidden1Nodes.map(n => {
              const active = activeTab === 'coadaptation' ? true : m1[n.idx];
              const isCulprit = activeTab === 'coadaptation' && n.idx === 2;

              return (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  <circle
                    r="13"
                    fill={isCulprit ? '#FEE2E2' : active ? '#EFF6FF' : '#F1F5F9'}
                    stroke={isCulprit ? '#DC2626' : active ? '#0284C7' : '#CBD5E1'}
                    strokeWidth={isCulprit || active ? 2 : 1}
                    strokeDasharray={!active ? '3 2' : 'none'}
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isCulprit ? '#B91C1C' : active ? '#0369A1' : '#94A3B8'}
                    fontSize="8"
                    fontWeight="800"
                  >
                    {active ? (isCulprit ? 'Erro' : `h${n.idx + 1}`) : '✕'}
                  </text>
                </g>
              );
            })}

            {/* NODES: Hidden Layer 2 */}
            {hidden2Nodes.map(n => {
              const active = activeTab === 'coadaptation' ? true : m2[n.idx];
              const isCompensator = activeTab === 'coadaptation' && (n.idx === 1 || n.idx === 2);

              return (
                <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                  <circle
                    r="13"
                    fill={isCompensator ? '#FEF2F2' : active ? '#F0FDF4' : '#F1F5F9'}
                    stroke={isCompensator ? '#DC2626' : active ? '#16A34A' : '#CBD5E1'}
                    strokeWidth={isCompensator || active ? 2 : 1}
                    strokeDasharray={!active ? '3 2' : 'none'}
                  />
                  <text
                    x="0"
                    y="3"
                    textAnchor="middle"
                    fill={isCompensator ? '#B91C1C' : active ? '#15803D' : '#94A3B8'}
                    fontSize="8"
                    fontWeight="800"
                  >
                    {active ? (isCompensator ? 'Comp.' : `h${n.idx + 1}`) : '✕'}
                  </text>
                </g>
              );
            })}

            {/* NODES: Output Layer */}
            {outputNodes.map(n => (
              <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
                <circle r="14" fill="#FFFFFF" stroke="#1BB5D8" strokeWidth="2.5" />
                <text x="0" y="3" textAnchor="middle" fill="#0A345D" fontSize="9" fontWeight="800">{n.id}</text>
              </g>
            ))}

            {/* CO-ADAPTATION ANNOTATION OVERLAY */}
            {activeTab === 'coadaptation' && (
              <g>
                <rect x="200" y="80" width="105" height="18" rx="4" fill="#FEF2F2" stroke="#EF4444" />
                <text x="252" y="92" textAnchor="middle" fill="#991B1B" fontSize="8" fontWeight="800">
                  Dependência Mútua (-3.4)
                </text>
              </g>
            )}

            {/* DROPOUT ACTIVE SUB-NETWORK CALLOUT */}
            {activeTab === 'dropout' && (
              <g>
                <rect x="195" y="195" width="130" height="18" rx="4" fill="#F0FDF4" stroke="#86EFAC" />
                <text x="260" y="207" textAnchor="middle" fill="#166534" fontSize="8" fontWeight="800">
                  Sub-Rede Ativa (Escala 1.67x)
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Explanatory Breakdown Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', justifyContent: 'space-between' }}>
          <div style={{
            background: activeTab === 'coadaptation' ? '#FFF7ED' : '#F0FDF4',
            border: `1.5px solid ${activeTab === 'coadaptation' ? '#FDBA74' : '#86EFAC'}`,
            borderRadius: '12px',
            padding: '12px 14px'
          }}>
            <div style={{ fontSize: '0.85rem', fontWeight: '800', color: activeTab === 'coadaptation' ? '#C2410C' : '#15803D', marginBottom: '4px' }}>
              {activeTab === 'coadaptation' ? 'A Armadilha do MLP Denso' : 'O Princípio da Autonomia'}
            </div>
            <p style={{ margin: 0, fontSize: '0.78rem', color: '#334155', lineHeight: '1.45' }}>
              {activeTab === 'coadaptation'
                ? 'Em um Perceptron Multicamadas sem regularização, neurônios da Camada 2 aprendem a anular erros específicos cometidos pela Camada 1. Eles não aprendem a essência dos dados, mas sim a mascarar os defeitos mútuos!'
                : 'Com o Dropout, a Camada 2 NUNCA sabe quais neurônios da Camada 1 estarão ligados. Cada neurônio da Camada 1 é forçado a extrair características robustas e úteis por conta própria!'}
            </p>
          </div>

          {/* Mathematical & Generalization Metrics Box */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '10px', padding: '10px 12px' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0A345D', marginBottom: '6px' }}>
              {activeTab === 'coadaptation' ? 'Comportamento no Treino vs Teste:' : 'Efeito Ensemble do Dropout:'}
            </div>
            {activeTab === 'coadaptation' ? (
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
                <div>Loss Treino: <strong style={{ color: '#0A345D' }}>0.04</strong></div>
                <div>Loss Val: <strong style={{ color: '#DC2626' }}>0.92 (Overfitting!)</strong></div>
              </div>
            ) : (
              <div style={{ fontSize: '0.75rem', color: '#15803D', lineHeight: '1.4' }}>
                Equivale a treinar um comitê gigante de até <strong>2⁵⁺⁴ = 512 sub-redes</strong> distintas compartilhando pesos!
              </div>
            )}
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748B', background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            💡 <em>Dica:</em> Em MLPs tabulares, use taxas moderadas de dropout ($p \in [0.2, 0.4]$) entre camadas lineares.
          </div>
        </div>
      </div>
    </div>
  );
}
