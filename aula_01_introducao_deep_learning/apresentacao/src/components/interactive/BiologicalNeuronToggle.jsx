import React, { useState } from 'react';

export default function BiologicalNeuronToggle() {
  const [viewMode, setViewMode] = useState('compare'); // 'compare', 'biological', 'artificial'
  const [activePart, setActivePart] = useState('dendrites'); // 'dendrites', 'soma', 'axon', 'synapses'

  const parts = {
    dendrites: {
      bioTitle: 'Dendritos (Recepção de Sinais)',
      artTitle: 'Entradas de Dados (x₁, x₂, ..., x∭)',
      desc: 'Ramificações celulares que captam neurotransmissores e impulsos elétricos vindos de outros neurônios.',
      analogy: 'Correspondem aos atributos brutos de entrada (ex: dosagem de creatina, horas de treino).',
      color: '#1BB5D8'
    },
    synapses: {
      bioTitle: 'Sinapses (Força Conectiva)',
      artTitle: 'Pesos Sinápticos (w₁, w₂, ..., w∭)',
      desc: 'Junções químicas cuja eficiência de transmissão é fortalecida ou enfraquecida pelo aprendizado (plasticidade).',
      analogy: 'Correspondem aos pesos matemáticos (w) que amplificam ou atenuam cada sinal de entrada.',
      color: '#AB47BC'
    },
    soma: {
      bioTitle: 'Corpo Celular / Soma (Integração)',
      artTitle: 'Somatório Ponderado (z = ∑ wᵢxᵢ + b)',
      desc: 'Núcleo e citoplasma que integram todas as variações de potencial elétrico recebidas das sinapses.',
      analogy: 'Corresponde ao cálculo linear central: multiplica entradas pelos pesos e adiciona o viés (bias b).',
      color: '#0A345D'
    },
    axon: {
      bioTitle: 'Axônio & Limiar de Ação (Disparo)',
      artTitle: 'Função de Ativação & Saída (ŷ = f(z))',
      desc: 'Fio condutor elétrico que spira um "potencial de ação" apenas quando o potencial no soma ultrapassa um limiar.',
      analogy: 'Corresponde à função de ativação f(z) (ex: Sigmoid, ReLU) que determina o nível de disparo do neurônio.',
      color: '#7CB342'
    }
  };

  const current = parts[activePart];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Mode selector buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setViewMode('compare')}
            style={{
              background: viewMode === 'compare' ? '#0A345D' : '#F1F5F9',
              color: viewMode === 'compare' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🔄 Comparação Lado a Lado
          </button>
          <button
            onClick={() => setViewMode('biological')}
            style={{
              background: viewMode === 'biological' ? '#1BB5D8' : '#F1F5F9',
              color: viewMode === 'biological' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🧠 Neurônio Biológico Humano
          </button>
          <button
            onClick={() => setViewMode('artificial')}
            style={{
              background: viewMode === 'artificial' ? '#7CB342' : '#F1F5F9',
              color: viewMode === 'artificial' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '20px',
              fontWeight: '700',
              fontSize: '0.85rem',
              cursor: 'pointer'
            }}
          >
            🤖 Perceptron Artificial
          </button>
        </div>

        <span style={{ fontSize: '0.82rem', color: '#64748B', fontWeight: '600' }}>
          💡 Clique nas regiões da ilustração para ver a analogia!
        </span>
      </div>

      {/* Main Visual Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'center', flex: 1 }}>
        {/* SVG Interactive Neuron Viewer */}
        <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%', justifyContent: 'center' }}>
          {(viewMode === 'compare' || viewMode === 'biological') && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0A345D', marginBottom: '8px' }}>
                {viewMode === 'compare' ? '🧠 Neurônio Biológico vs 🤖 Modelo Matemático' : '🧠 Anatomia do Neurônio Humano Biológico'}
              </div>

              {/* Vector SVG Diagram of Biological Human Neuron */}
              <svg width="420" height="230" viewBox="0 0 420 230" style={{ background: '#F8FAFC', borderRadius: '8px', border: '1px solid #E2E8F0' }}>
                {/* Dendrites */}
                <g onClick={() => setActivePart('dendrites')} style={{ cursor: 'pointer' }}>
                  <path d="M 20 40 Q 60 70 90 90 M 15 110 Q 50 110 90 110 M 20 180 Q 60 140 90 130" stroke={activePart === 'dendrites' ? '#1BB5D8' : '#64748B'} strokeWidth="4" fill="none" strokeLinecap="round" />
                  <circle cx="20" cy="40" r="5" fill="#1BB5D8" />
                  <circle cx="15" cy="110" r="5" fill="#1BB5D8" />
                  <circle cx="20" cy="180" r="5" fill="#1BB5D8" />
                  <text x="15" y="25" fill="#1BB5D8" fontSize="11" fontWeight="bold">Dendritos (Entradas xᵢ)</text>
                </g>

                {/* Synapses connections */}
                <g onClick={() => setActivePart('synapses')} style={{ cursor: 'pointer' }}>
                  <circle cx="60" cy="65" r="8" fill={activePart === 'synapses' ? '#AB47BC' : '#CBD5E1'} stroke="#AB47BC" strokeWidth="2" />
                  <circle cx="50" cy="110" r="8" fill={activePart === 'synapses' ? '#AB47BC' : '#CBD5E1'} stroke="#AB47BC" strokeWidth="2" />
                  <circle cx="60" cy="155" r="8" fill={activePart === 'synapses' ? '#AB47BC' : '#CBD5E1'} stroke="#AB47BC" strokeWidth="2" />
                  <text x="45" y="185" fill="#AB47BC" fontSize="10" fontWeight="bold">Sinapses (Pesos wᵢ)</text>
                </g>

                {/* Soma / Cell Body */}
                <g onClick={() => setActivePart('soma')} style={{ cursor: 'pointer' }}>
                  <path d="M 90 80 C 130 50 150 90 140 120 C 150 150 120 170 90 140 C 70 120 70 90 90 80 Z" fill={activePart === 'soma' ? '#0A345D' : '#38BDF8'} opacity="0.85" stroke="#0A345D" strokeWidth="3" />
                  <circle cx="110" cy="110" r="14" fill="#0A345D" stroke="#FFFFFF" strokeWidth="2" />
                  <text x="110" y="114" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Núcleo</text>
                  <text x="90" y="45" fill="#0A345D" fontSize="11" fontWeight="bold">Soma (Somatório z)</text>
                </g>

                {/* Axon */}
                <g onClick={() => setActivePart('axon')} style={{ cursor: 'pointer' }}>
                  <line x1="140" y1="110" x2="350" y2="110" stroke={activePart === 'axon' ? '#7CB342' : '#94A3B8'} strokeWidth="6" strokeLinecap="round" />
                  {/* Myelin Sheath blocks */}
                  <rect x="160" y="98" width="35" height="24" rx="4" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="210" y="98" width="35" height="24" rx="4" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="260" y="98" width="35" height="24" rx="4" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Axon Terminals */}
                  <path d="M 350 110 L 390 80 M 350 110 L 395 110 M 350 110 L 390 140" stroke="#7CB342" strokeWidth="3" fill="none" />
                  <circle cx="390" cy="80" r="4" fill="#7CB342" />
                  <circle cx="395" cy="110" r="4" fill="#7CB342" />
                  <circle cx="390" cy="140" r="4" fill="#7CB342" />

                  <text x="210" y="85" fill="#7CB342" fontSize="11" fontWeight="bold" textAnchor="middle">Axônio (Ativação ŷ)</text>
                </g>
              </svg>
            </div>
          )}

          {viewMode === 'artificial' && (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '0.9rem', fontWeight: '800', color: '#0A345D', marginBottom: '8px' }}>
                🤖 Diagrama do Perceptron Artificial
              </div>
              <img 
                src="/imagens/perceptron_generico.jpg" 
                alt="Perceptron Genérico" 
                style={{ maxWidth: '100%', maxHeight: '200px', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
          )}
        </div>

        {/* Selected Part Analogies Card */}
        <div className="content-card" style={{ borderColor: current.color, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '10px' }}>
            {Object.keys(parts).map(pKey => (
              <button
                key={pKey}
                onClick={() => setActivePart(pKey)}
                style={{
                  background: activePart === pKey ? parts[pKey].color : '#F1F5F9',
                  color: activePart === pKey ? '#FFFFFF' : '#475569',
                  border: 'none',
                  padding: '4px 10px',
                  borderRadius: '12px',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  cursor: 'pointer'
                }}
              >
                {pKey === 'dendrites' ? 'Dendritos' : pKey === 'synapses' ? 'Sinapses' : pKey === 'soma' ? 'Soma' : 'Axônio'}
              </button>
            ))}
          </div>

          <span className="card-header-badge" style={{ background: `${current.color}20`, color: current.color }}>
            🧠 BIOLÓGICO: {current.bioTitle}
          </span>
          <h3 style={{ color: '#0A345D', fontSize: '1.3rem', fontWeight: '800', marginBottom: '6px' }}>
            🤖 {current.artTitle}
          </h3>

          <p style={{ fontSize: '0.95rem', color: '#334155', lineHeight: '1.45', marginBottom: '12px' }}>
            <strong>Estrutura Biológica:</strong> {current.desc}
          </p>

          <div style={{ background: '#F8FAFC', borderLeft: `4px solid ${current.color}`, padding: '10px 14px', borderRadius: '6px', fontSize: '0.9rem', color: '#0A345D' }}>
            <strong>💡 Analogia Matemática:</strong> {current.analogy}
          </div>
        </div>
      </div>
    </div>
  );
}
