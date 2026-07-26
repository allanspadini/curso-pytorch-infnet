import React, { useState } from 'react';
import { getAssetUrl } from '../../utils/assetHelper';

export default function BiologicalNeuronToggle() {
  const [viewMode, setViewMode] = useState('biological'); // 'biological', 'artificial'
  const [activePart, setActivePart] = useState('dendrites'); // 'dendrites', 'soma', 'axon', 'synapses'

  const parts = {
    dendrites: {
      bioTitle: 'Dendritos (Recepção de Sinais)',
      artTitle: 'Entradas de Dados (x₁, x₂, ..., xₙ)',
      desc: 'Ramificações celulares que captam neurotransmissores e impulsos elétricos vindos de outros neurônios.',
      analogy: 'Correspondem aos atributos brutos de entrada (ex: dosagem de creatina, horas de treino).',
      color: '#1BB5D8',
      bgBadge: 'rgba(27, 181, 216, 0.15)'
    },
    synapses: {
      bioTitle: 'Sinapses (Força Conectiva)',
      artTitle: 'Pesos Sinápticos (w₁, w₂, ..., wₙ)',
      desc: 'Junções químicas cuja eficiência de transmissão é fortalecida ou enfraquecida pelo aprendizado (plasticidade).',
      analogy: 'Correspondem aos pesos matemáticos (w) que amplificam ou atenuam cada sinal de entrada.',
      color: '#AB47BC',
      bgBadge: 'rgba(171, 71, 188, 0.15)'
    },
    soma: {
      bioTitle: 'Corpo Celular / Soma (Integração)',
      artTitle: 'Somatório Ponderado (z = ∑ wᵢxᵢ + b)',
      desc: 'Núcleo e citoplasma que integram todas as variações de potencial elétrico recebidas das sinapses.',
      analogy: 'Corresponde ao cálculo linear central: multiplica entradas pelos pesos e adiciona o viés (bias b).',
      color: '#0A345D',
      bgBadge: 'rgba(10, 52, 93, 0.15)'
    },
    axon: {
      bioTitle: 'Axônio & Limiar de Ação (Disparo)',
      artTitle: 'Função de Ativação & Saída (ŷ = f(z))',
      desc: 'Fio condutor elétrico que dispara um "potencial de ação" apenas quando o potencial no soma ultrapassa um limiar.',
      analogy: 'Corresponde à função de ativação f(z) (ex: Sigmoid, ReLU) que determina o nível de disparo do neurônio.',
      color: '#7CB342',
      bgBadge: 'rgba(124, 179, 66, 0.15)'
    }
  };

  const current = parts[activePart];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%', height: '100%' }}>
      {/* Mode selector buttons */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={() => setViewMode('biological')}
            style={{
              background: viewMode === 'biological' ? '#1BB5D8' : '#F1F5F9',
              color: viewMode === 'biological' ? '#FFFFFF' : '#334155',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '24px',
              fontWeight: '800',
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'biological' ? '0 4px 14px rgba(27, 181, 216, 0.35)' : 'none',
              transition: 'all 0.15s ease'
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
              padding: '10px 22px',
              borderRadius: '24px',
              fontWeight: '800',
              fontSize: '1.05rem',
              cursor: 'pointer',
              boxShadow: viewMode === 'artificial' ? '0 4px 14px rgba(124, 179, 66, 0.35)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            🤖 Perceptron Artificial
          </button>
        </div>

        <span style={{ fontSize: '1.02rem', color: '#64748B', fontWeight: '700' }}>
          💡 Clique nas partes do neurônio para ver a analogia!
        </span>
      </div>

      {/* Main Visual Section */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '24px', alignItems: 'stretch', flex: 1 }}>
        {/* SVG Interactive Neuron Viewer */}
        <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #CBD5E1', padding: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
          {viewMode === 'biological' ? (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0A345D', marginBottom: '12px' }}>
                🧠 Anatomia do Neurônio Humano Biológico
              </div>

              {/* Vector SVG Diagram of Biological Human Neuron */}
              <svg viewBox="0 0 420 230" style={{ width: '100%', height: 'auto', maxHeight: '310px', background: '#F8FAFC', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
                {/* Dendrites */}
                <g onClick={() => setActivePart('dendrites')} style={{ cursor: 'pointer' }}>
                  <path d="M 20 40 Q 60 70 90 90 M 15 110 Q 50 110 90 110 M 20 180 Q 60 140 90 130" stroke={activePart === 'dendrites' ? '#1BB5D8' : '#64748B'} strokeWidth="5" fill="none" strokeLinecap="round" />
                  <circle cx="20" cy="40" r="7" fill="#1BB5D8" />
                  <circle cx="15" cy="110" r="7" fill="#1BB5D8" />
                  <circle cx="20" cy="180" r="7" fill="#1BB5D8" />
                  <text x="10" y="22" fill="#1BB5D8" fontSize="12" fontWeight="bold">Dendritos (Entradas xᵢ)</text>
                </g>

                {/* Synapses connections */}
                <g onClick={() => setActivePart('synapses')} style={{ cursor: 'pointer' }}>
                  <circle cx="60" cy="65" r="9" fill={activePart === 'synapses' ? '#AB47BC' : '#E2E8F0'} stroke="#AB47BC" strokeWidth="2.5" />
                  <circle cx="50" cy="110" r="9" fill={activePart === 'synapses' ? '#AB47BC' : '#E2E8F0'} stroke="#AB47BC" strokeWidth="2.5" />
                  <circle cx="60" cy="155" r="9" fill={activePart === 'synapses' ? '#AB47BC' : '#E2E8F0'} stroke="#AB47BC" strokeWidth="2.5" />
                  <text x="40" y="185" fill="#AB47BC" fontSize="11" fontWeight="bold">Sinapses (Pesos wᵢ)</text>
                </g>

                {/* Soma / Cell Body */}
                <g onClick={() => setActivePart('soma')} style={{ cursor: 'pointer' }}>
                  <path d="M 90 80 C 130 50 150 90 140 120 C 150 150 120 170 90 140 C 70 120 70 90 90 80 Z" fill={activePart === 'soma' ? '#0A345D' : '#7DD3FC'} opacity="0.9" stroke="#0A345D" strokeWidth="3.5" />
                  <circle cx="110" cy="110" r="15" fill="#0A345D" stroke="#FFFFFF" strokeWidth="2.5" />
                  <text x="110" y="114" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">Núcleo</text>
                  <text x="85" y="45" fill="#0A345D" fontSize="12" fontWeight="bold">Soma (Somatório z)</text>
                </g>

                {/* Axon */}
                <g onClick={() => setActivePart('axon')} style={{ cursor: 'pointer' }}>
                  <line x1="140" y1="110" x2="350" y2="110" stroke={activePart === 'axon' ? '#7CB342' : '#94A3B8'} strokeWidth="7" strokeLinecap="round" />
                  {/* Myelin Sheath blocks */}
                  <rect x="160" y="96" width="38" height="28" rx="5" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="210" y="96" width="38" height="28" rx="5" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />
                  <rect x="260" y="96" width="38" height="28" rx="5" fill="#7CB342" stroke="#FFFFFF" strokeWidth="2" />

                  {/* Axon Terminals */}
                  <path d="M 350 110 L 390 80 M 350 110 L 395 110 M 350 110 L 390 140" stroke="#7CB342" strokeWidth="3.5" fill="none" />
                  <circle cx="390" cy="80" r="5" fill="#7CB342" />
                  <circle cx="395" cy="110" r="5" fill="#7CB342" />
                  <circle cx="390" cy="140" r="5" fill="#7CB342" />

                  <text x="210" y="82" fill="#7CB342" fontSize="12" fontWeight="bold" textAnchor="middle">Axônio (Ativação ŷ)</text>
                </g>
              </svg>
            </div>
          ) : (
            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <div style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0A345D', marginBottom: '12px' }}>
                🤖 Diagrama do Perceptron Artificial
              </div>
              <img 
                src={getAssetUrl('/imagens/perceptron_generico.jpg')} 
                alt="Perceptron Genérico" 
                style={{ maxWidth: '100%', maxHeight: '280px', objectFit: 'contain', borderRadius: '10px' }}
              />
            </div>
          )}
        </div>

        {/* Selected Part Analogies Card */}
        <div className="content-card" style={{ borderColor: current.color, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '28px' }}>
          <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
            {Object.keys(parts).map(pKey => (
              <button
                key={pKey}
                onClick={() => setActivePart(pKey)}
                style={{
                  background: activePart === pKey ? parts[pKey].color : '#F1F5F9',
                  color: activePart === pKey ? '#FFFFFF' : '#475569',
                  border: 'none',
                  padding: '8px 16px',
                  borderRadius: '16px',
                  fontSize: '0.95rem',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.15s ease'
                }}
              >
                {pKey === 'dendrites' ? 'Dendritos' : pKey === 'synapses' ? 'Sinapses' : pKey === 'soma' ? 'Soma' : 'Axônio'}
              </button>
            ))}
          </div>

          <span className="card-header-badge" style={{ background: current.bgBadge, color: current.color, fontSize: '1.05rem', marginBottom: '12px' }}>
            🧠 BIOLÓGICO: {current.bioTitle}
          </span>
          <h3 style={{ color: '#0A345D', fontSize: '1.5rem', fontWeight: '800', marginBottom: '10px', lineHeight: '1.25' }}>
            🤖 {current.artTitle}
          </h3>

          <p style={{ fontSize: '1.12rem', color: '#334155', lineHeight: '1.5', marginBottom: '16px' }}>
            <strong>Estrutura Biológica:</strong> {current.desc}
          </p>

          <div style={{ background: '#F8FAFC', borderLeft: `5px solid ${current.color}`, padding: '14px 18px', borderRadius: '8px', fontSize: '1.08rem', color: '#0A345D', fontWeight: '500', lineHeight: '1.5' }}>
            <strong>💡 Analogia Matemática:</strong> {current.analogy}
          </div>
        </div>
      </div>
    </div>
  );
}
