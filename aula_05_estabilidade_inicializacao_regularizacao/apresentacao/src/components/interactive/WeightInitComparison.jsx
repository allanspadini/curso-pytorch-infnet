import React, { useState } from 'react';
import { Layers, ShieldCheck, AlertTriangle, RefreshCw, Sparkles, Hash } from 'lucide-react';

export default function WeightInitComparison() {
  const [selectedInit, setSelectedInit] = useState('kaiming');
  const [seed, setSeed] = useState(0);

  const initData = {
    zeros: {
      name: 'Inicialização com Zeros',
      formula: 'W = 0.0, b = 0.0',
      sampleWeights: [0.0, 0.0, 0.0, 0.0, 0.0],
      baseVars: [0.0, 0.0, 0.0, 0.0, 0.0],
      status: 'Quebra de Simetria Falhou',
      statusColor: '#D84315',
      desc: 'Todos os neurônios têm pesos exatamente iguais. Nenhuma representação ou especialização é possível.'
    },
    default_rand: {
      name: 'Aleatória Não-Escalada N(0, 1)',
      formula: 'W ~ N(0, 1) — Sem calibrar com fan-in',
      sampleWeights: [-1.42, +0.87, +1.95, -0.63, +1.12],
      baseVars: [1.08, 3.42, 12.80, 48.50, 182.30],
      status: 'Explosão Exponencial das Ativações',
      statusColor: '#D84315',
      desc: 'Sem a divisão pela raiz do número de conexões (fan-in), a variância acumula a cada multiplicação matricial e o sinal explode!'
    },
    xavier: {
      name: 'Xavier / Glorot (Uniforme)',
      formula: 'Var(W) = 2 / (n_in + n_out) — Ideal para Tanh / Sigmoid',
      sampleWeights: [-0.21, +0.18, -0.09, +0.24, -0.15],
      baseVars: [1.02, 0.97, 1.03, 0.99, 1.01],
      status: 'Estável: Variância Preservada ~ 1.0',
      statusColor: '#0284C7',
      desc: 'Mantém a energia do sinal constante em toda a profundidade da rede para funções simétricas em torno da origem.'
    },
    kaiming: {
      name: 'He / Kaiming (Normal)',
      formula: 'Var(W) = 2 / n_in — Ideal para ReLU / LeakyReLU',
      sampleWeights: [-0.28, +0.35, -0.14, +0.22, -0.31],
      baseVars: [1.04, 0.98, 1.02, 0.96, 1.01],
      status: 'Recomendado para ReLU: Dobra a Energia Inicial',
      statusColor: '#2E7D32',
      desc: 'Compensa a perda de 50% dos sinais ceifados pela ReLU (metade negativa nula), mantendo a variância estável ~ 1.0.'
    }
  };

  const current = initData[selectedInit];

  // Simula flutuações estocásticas realistas quando o usuário clica em sortear lote
  const getSimulatedVar = (base, layerIdx) => {
    if (selectedInit === 'zeros') return 0.0;
    if (selectedInit === 'default_rand') {
      const jitter = (Math.sin(seed * 7 + layerIdx) * 0.15);
      return Math.max(0.1, base * (1 + jitter));
    }
    // Para Xavier e Kaiming, a variância flutua realisticamente em torno de ~1.0 de forma estocástica e não-ordenada
    const jitter = (Math.sin(seed * 11 + layerIdx * 3.7) * 0.06);
    return Math.max(0.7, base + jitter);
  };

  const getRandomizedWeights = () => {
    if (selectedInit === 'zeros') return [0.0, 0.0, 0.0, 0.0, 0.0];
    return current.sampleWeights.map((w, i) => {
      const delta = (Math.sin(seed * 5 + i * 2.3) * 0.04);
      return Number((w + delta).toFixed(2));
    });
  };

  return (
    <div style={{
      background: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '16px',
      padding: '20px 24px',
      boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
      display: 'flex',
      flexDirection: 'column',
      gap: '14px',
      height: '100%'
    }}>
      {/* Top Bar: Selector & Simulation Button */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ margin: 0, color: 'var(--infnet-dark-blue)', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
          <Layers size={22} color="var(--infnet-cyan)" /> Comparador de Inicialização de Pesos
        </h3>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {Object.keys(initData).map(key => (
            <button
              key={key}
              onClick={() => setSelectedInit(key)}
              style={{
                padding: '6px 12px',
                borderRadius: '8px',
                border: selectedInit === key ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
                background: selectedInit === key ? 'linear-gradient(135deg, #F0FDF4, #EFF6FF)' : '#FFFFFF',
                color: selectedInit === key ? 'var(--infnet-dark-blue)' : '#64748B',
                cursor: 'pointer',
                fontSize: '0.82rem',
                fontWeight: selectedInit === key ? '800' : '600',
                transition: 'all 0.2s ease'
              }}
            >
              {key === 'zeros' ? 'Zeros' : key === 'default_rand' ? 'N(0, 1)' : key === 'xavier' ? 'Xavier' : 'Kaiming He'}
            </button>
          ))}
          <button
            onClick={() => setSeed(prev => prev + 1)}
            style={{
              padding: '6px 12px',
              borderRadius: '8px',
              border: '1px solid #0E4E8A',
              background: '#0E4E8A',
              color: '#FFFFFF',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
            title="Sortear um novo lote estocástico para observar a flutuação amostral real"
          >
            <RefreshCw size={13} /> Sortear Novo Lote
          </button>
        </div>
      </div>

      {/* Main Grid: Left = Variance Bars; Right = Weights vs Variances Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '20px', alignItems: 'stretch', flex: 1 }}>
        {/* Left: Layer Variance Simulator */}
        <div style={{
          background: '#F8FAFC',
          padding: '16px 20px',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <h4 style={{ margin: 0, fontSize: '0.92rem', color: 'var(--infnet-dark-blue)', fontWeight: '800' }}>
                Variância Amostral das Ativações: Var(a)
              </h4>
              <span style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '600', background: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', border: '1px solid #E2E8F0' }}>
                Meta Saudável: ≈ 1.00
              </span>
            </div>
            <p style={{ margin: '0 0 14px 0', fontSize: '0.78rem', color: '#64748B', lineHeight: '1.4' }}>
              A variância <strong>não tem ordem fixa</strong>; ela flutua realisticamente em torno de 1.0 dependendo das amostras do lote.
            </p>

            {[1, 2, 3, 4, 5].map((layer, idx) => {
              const varVal = getSimulatedVar(current.baseVars[idx], idx);
              const widthPercent = Math.min(100, (varVal / 3) * 100);

              return (
                <div key={layer} style={{ marginBottom: '10px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '3px', color: '#334155' }}>
                    <span style={{ fontWeight: '600' }}>Camada {layer}</span>
                    <span>
                      Var(a) = <strong style={{ color: varVal > 2.5 ? '#D84315' : varVal === 0 ? '#64748B' : '#2E7D32' }}>
                        {varVal.toFixed(2)}
                      </strong>
                    </span>
                  </div>
                  <div style={{ background: '#E2E8F0', height: '11px', borderRadius: '6px', overflow: 'hidden' }}>
                    <div style={{
                      height: '100%',
                      width: `${selectedInit === 'default_rand' ? Math.min(100, varVal * 4) : widthPercent}%`,
                      background: varVal > 2.5 ? '#FF7043' : varVal === 0 ? '#94A3B8' : 'linear-gradient(90deg, #1BB5D8, #7CB342)',
                      transition: 'all 0.35s ease'
                    }} />
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.75rem', color: '#475569', background: '#FFFFFF', padding: '6px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <Sparkles size={14} color="#0284C7" />
            <span>Xavier e He evitam que Var(a) exploda para &gt; 100 ou caia para 0.00.</span>
          </div>
        </div>

        {/* Right: Concrete Weights Samples vs Diagnosis */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', justifyContent: 'space-between' }}>
          {/* Formula & Method */}
          <div style={{ background: '#EFF6FF', border: '1px solid #BFDBFE', padding: '12px 16px', borderRadius: '10px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: 'var(--infnet-dark-blue)', fontSize: '0.95rem', fontWeight: '800' }}>
              {current.name}
            </h4>
            <code style={{ background: '#FFFFFF', padding: '4px 8px', borderRadius: '6px', color: '#0E4E8A', fontSize: '0.8rem', fontWeight: '700', border: '1px solid #DBEAFE', display: 'block', marginBottom: '8px' }}>
              {current.formula}
            </code>

            {/* Weights Samples Box */}
            <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 10px' }}>
              <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0A345D', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Hash size={13} color="#0E4E8A" /> Exemplos de Pesos Reais Sorteados (W):
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {getRandomizedWeights().map((w, i) => (
                  <span
                    key={i}
                    style={{
                      fontFamily: 'Fira Code, monospace',
                      fontSize: '0.78rem',
                      fontWeight: '700',
                      padding: '2px 6px',
                      borderRadius: '4px',
                      background: w === 0 ? '#F1F5F9' : w > 0 ? '#ECFDF5' : '#FEF2F2',
                      color: w === 0 ? '#64748B' : w > 0 ? '#047857' : '#B91C1C',
                      border: `1px solid ${w === 0 ? '#CBD5E1' : w > 0 ? '#A7F3D0' : '#FECACA'}`
                    }}
                  >
                    {w > 0 ? `+${w.toFixed(2)}` : w.toFixed(2)}
                  </span>
                ))}
              </div>
              <span style={{ fontSize: '0.72rem', color: '#64748B', display: 'block', marginTop: '4px' }}>
                {selectedInit === 'zeros' 
                  ? '⚠️ Pesos idênticos causam colapso de simetria.' 
                  : '✓ Os pesos são aleatórios (sem ordem), com média 0.'}
              </span>
            </div>
          </div>

          {/* Status & Diagnostic */}
          <div style={{
            background: selectedInit === 'kaiming' || selectedInit === 'xavier' ? '#F0FDF4' : '#FEF2F2',
            border: `1px solid ${selectedInit === 'kaiming' || selectedInit === 'xavier' ? '#86EFAC' : '#FCA5A5'}`,
            padding: '12px 14px',
            borderRadius: '10px',
            display: 'flex',
            alignItems: 'flex-start',
            gap: '10px'
          }}>
            {selectedInit === 'kaiming' || selectedInit === 'xavier' ? (
              <ShieldCheck color="#2E7D32" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            ) : (
              <AlertTriangle color="#D84315" size={24} style={{ flexShrink: 0, marginTop: '2px' }} />
            )}
            <div>
              <strong style={{ color: current.statusColor, fontSize: '0.88rem', display: 'block', marginBottom: '3px' }}>
                {current.status}
              </strong>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#334155', lineHeight: '1.4' }}>
                {current.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
