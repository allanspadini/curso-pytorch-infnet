import React, { useState } from 'react';

export default function GradientFlowSimulator() {
  const [initStrategy, setInitStrategy] = useState('kaiming'); // 'zeros', 'exploding', 'vanishing', 'xavier', 'kaiming'
  const [depth, setDepth] = useState(10); // 5 vs 10 layers
  const [isPropagating, setIsPropagating] = useState(false);

  const getGradientNorms = () => {
    const norms = [];
    let currentNorm = 1.0;
    
    for (let l = depth; l >= 1; l--) {
      if (initStrategy === 'zeros') {
        norms.unshift(0.0);
      } else if (initStrategy === 'exploding') {
        norms.unshift(Math.min(9999.0, Math.pow(1.8, (depth - l + 1))));
      } else if (initStrategy === 'vanishing') {
        norms.unshift(Math.max(0.00001, Math.pow(0.35, (depth - l + 1))));
      } else if (initStrategy === 'xavier') {
        norms.unshift(1.0 + (Math.sin(l) * 0.1));
      } else { // kaiming
        norms.unshift(1.02 + (Math.cos(l) * 0.05));
      }
    }
    return norms;
  };

  const gradientNorms = getGradientNorms();

  const handleTriggerBackprop = () => {
    setIsPropagating(true);
    setTimeout(() => setIsPropagating(false), 1200);
  };

  return (
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', color: '#64D9EF', margin: 0 }}>
            ⚡ Simulação de Fluxo de Gradientes & Inicialização de Pesos
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
            Inspecione a propagação do sinal de gradiente através das camadas da rede
          </p>
        </div>

        <button 
          onClick={handleTriggerBackprop}
          disabled={isPropagating}
          style={{
            background: isPropagating ? '#AB47BC' : '#1BB5D8',
            color: isPropagating ? '#FFF' : '#0A345D',
            border: 'none',
            borderRadius: '20px',
            padding: '8px 18px',
            fontWeight: '800',
            cursor: isPropagating ? 'wait' : 'pointer',
            fontSize: '0.85rem'
          }}
        >
          {isPropagating ? '⚡ Propagando...' : '⚡ Disparar Backpropagation'}
        </button>
      </div>

      {/* Selectors */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '14px', flexWrap: 'wrap' }}>
        {[
          { id: 'zeros', label: 'Pesos Zerados (Zeros Init)', color: '#94A3B8' },
          { id: 'exploding', label: 'Exploding Gradients (> 1.0)', color: '#FF7043' },
          { id: 'vanishing', label: 'Vanishing Gradients (< 1.0)', color: '#AB47BC' },
          { id: 'xavier', label: 'Xavier Uniform (nn.init)', color: '#1BB5D8' },
          { id: 'kaiming', label: 'Kaiming Normal (ReLU)', color: '#7CB342' },
        ].map(item => (
          <button 
            key={item.id}
            onClick={() => setInitStrategy(item.id)}
            style={{
              background: initStrategy === item.id ? item.color : 'rgba(255,255,255,0.05)',
              color: initStrategy === item.id ? (item.id === 'xavier' ? '#0A345D' : '#FFF') : '#CBD5E1',
              border: `1px solid ${item.color}`,
              borderRadius: '6px',
              padding: '6px 12px',
              fontSize: '0.8rem',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Network Layers Visualizer */}
      <div style={{ background: '#041221', padding: '16px', borderRadius: '10px', border: '1px solid #1E293B', marginBottom: '12px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Entrada (Camada 1)</span>
          <span style={{ fontSize: '0.8rem', color: '#64D9EF', fontWeight: '700' }}>← Direção do Backpropagation</span>
          <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Saída (Loss)</span>
        </div>

        <div style={{ display: 'flex', gap: '6px', alignItems: 'flex-end', height: '110px' }}>
          {gradientNorms.map((norm, idx) => {
            const layerNum = idx + 1;
            const barHeight = Math.min(100, Math.max(8, (norm / 2.0) * 100));
            const isExploding = norm > 1.5;
            const isVanishing = norm < 0.01;

            return (
              <div 
                key={idx} 
                style={{ 
                  flex: 1, 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  height: '100%',
                  justifyContent: 'flex-end' 
                }}
              >
                <div style={{ fontSize: '0.68rem', fontFamily: 'Fira Code, monospace', color: isExploding ? '#FF7043' : (isVanishing ? '#94A3B8' : '#7CB342'), marginBottom: '4px' }}>
                  {norm > 999 ? 'NaN' : norm.toFixed(2)}
                </div>

                <div 
                  style={{
                    width: '100%',
                    height: `${barHeight}%`,
                    background: isExploding ? '#FF7043' : (isVanishing ? '#475569' : (initStrategy === 'kaiming' ? '#7CB342' : '#1BB5D8')),
                    borderRadius: '4px 4px 0 0',
                    transition: 'all 0.3s ease',
                    boxShadow: isExploding ? '0 0 12px #FF7043' : 'none'
                  }}
                />

                <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '4px' }}>
                  L{layerNum}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Dynamic Summary */}
      <div style={{ fontSize: '0.84rem', color: '#CBD5E1' }}>
        {initStrategy === 'zeros' && '❌ Com pesos zerados, todas as derivadas são idênticas. A rede sofre de simetria e não aprende nada!'}
        {initStrategy === 'exploding' && '💥 Exploding Gradients: O gradiente multiplica acumulativamente por fatores > 1.0 a cada camada, estourando para NaN no otimizador! Solução: Clip Grad Norm + Kaiming Init.'}
        {initStrategy === 'vanishing' && '🥶 Vanishing Gradients: As derivadas tendem a 0 nas camadas profundas (ex: Sigmoide saturada). As primeiras camadas da rede param de atualizar!'}
        {initStrategy === 'xavier' && '✨ Xavier Uniform: Mantém a variância constante em redes com Tanh/Sigmoid ($\text{Var}(W) = 2 / (n_{in} + n_{out})$).'}
        {initStrategy === 'kaiming' && '🚀 Kaiming Normal (He): Compensação perfeita para ativações ReLU que desativam 50% dos neurônios ($\text{Var}(W) = 2 / n_{in}$). Estabilidade total em redes profundas!'}
      </div>
    </div>
  );
}
