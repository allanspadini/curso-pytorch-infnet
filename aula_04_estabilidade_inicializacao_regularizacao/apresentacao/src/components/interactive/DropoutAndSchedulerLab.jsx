import React, { useState } from 'react';

export default function DropoutAndSchedulerLab() {
  const [activeTab, setActiveTab] = useState('dropout'); // 'dropout' vs 'scheduler'
  const [isTrainMode, setIsTrainMode] = useState(true);
  const [droppedNodes, setDroppedNodes] = useState([false, true, false, true, false, false]);
  const [lrStep, setLrStep] = useState(1);

  const toggleDropoutMask = () => {
    // Random mask generator for 6 hidden neurons
    const newMask = Array.from({ length: 6 }, () => Math.random() < 0.5);
    setDroppedNodes(newMask);
  };

  const getLrValue = () => {
    if (lrStep === 1) return 0.01;
    if (lrStep === 2) return 0.001;
    if (lrStep === 3) return 0.0001;
    return 0.00001;
  };

  return (
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.2rem', color: '#64D9EF', margin: 0 }}>
            🛡️ Laboratório: Regularização (Dropout) e LR Schedulers
          </h3>
          <p style={{ fontSize: '0.85rem', color: '#94A3B8', margin: '2px 0 0 0' }}>
            Simulação prática de Inverted Dropout e Decaimento de Taxa de Aprendizado
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setActiveTab('dropout')}
            style={{
              background: activeTab === 'dropout' ? '#1BB5D8' : 'rgba(27, 181, 216, 0.15)',
              color: activeTab === 'dropout' ? '#0A345D' : '#64D9EF',
              border: '1px solid #1BB5D8',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            1. Mecanismo de Dropout (p=0.5)
          </button>

          <button 
            onClick={() => setActiveTab('scheduler')}
            style={{
              background: activeTab === 'scheduler' ? '#FF7043' : 'rgba(255, 112, 67, 0.15)',
              color: activeTab === 'scheduler' ? '#FFFFFF' : '#FF7043',
              border: '1px solid #FF7043',
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            2. LR Decay Schedule
          </button>
        </div>
      </div>

      {activeTab === 'dropout' ? (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', background: '#041221', padding: '10px 14px', borderRadius: '8px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <button 
                onClick={() => setIsTrainMode(!isTrainMode)}
                style={{
                  background: isTrainMode ? '#FF7043' : '#7CB342',
                  color: '#FFF',
                  border: 'none',
                  borderRadius: '6px',
                  padding: '6px 12px',
                  fontWeight: '800',
                  fontSize: '0.82rem',
                  cursor: 'pointer'
                }}
              >
                {isTrainMode ? 'Modo model.train() (Ativo)' : 'Modo model.eval() (Desativado)'}
              </button>

              {isTrainMode && (
                <button 
                  onClick={toggleDropoutMask}
                  style={{ background: '#0E4E8A', color: '#FFF', border: 'none', borderRadius: '6px', padding: '6px 12px', fontSize: '0.82rem', cursor: 'pointer' }}
                >
                  🎲 Gerar Nova Máscara Estocástica
                </button>
              )}
            </div>

            <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
              Fator de Escala (Inverted Dropout): <strong>{isTrainMode ? '1 / (1 - 0.5) = 2.0x' : '1.0x (Nenhum)'}</strong>
            </div>
          </div>

          {/* Neural Net Layer Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '10px', marginBottom: '12px' }}>
            {droppedNodes.map((isDropped, idx) => {
              const activeInMode = isTrainMode ? !isDropped : true;

              return (
                <div 
                  key={idx}
                  style={{
                    background: activeInMode ? 'rgba(27, 181, 216, 0.15)' : 'rgba(255, 112, 67, 0.15)',
                    border: `2px solid ${activeInMode ? '#1BB5D8' : '#FF7043'}`,
                    borderRadius: '10px',
                    padding: '12px 8px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '1.2rem', marginBottom: '4px' }}>
                    {activeInMode ? '⚡' : '❌'}
                  </div>
                  <div style={{ fontWeight: '700', fontSize: '0.82rem', color: activeInMode ? '#64D9EF' : '#FF7043' }}>
                    Neurônio #{idx + 1}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: '#94A3B8', marginTop: '4px' }}>
                    {activeInMode ? (isTrainMode ? 'Ativo (2.0x)' : 'Ativo (1.0x)') : 'ZERADO (0.0)'}
                  </div>
                </div>
              );
            })}
          </div>

          <div style={{ fontSize: '0.82rem', color: '#CBD5E1', background: '#041221', padding: '10px', borderRadius: '8px' }}>
            💡 <strong>Por que Inverted Dropout no PyTorch?</strong> Multiplicar por $\frac{1}{1-p}$ durante o treino garante que a soma esperada das ativações se mantenha idêntica no teste (`eval()`), eliminando a necessidade de alterar os pesos durante a inferência!
          </div>
        </div>
      ) : (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', background: '#041221', padding: '10px 14px', borderRadius: '8px' }}>
            <span style={{ fontSize: '0.85rem', color: '#CBD5E1' }}>
              Taxa de Aprendizado Atual: <strong style={{ color: '#FF7043', fontFamily: 'Fira Code, monospace', fontSize: '1.05rem' }}>lr = {getLrValue()}</strong>
            </span>

            <div style={{ display: 'flex', gap: '6px' }}>
              {[1, 2, 3, 4].map(step => (
                <button 
                  key={step}
                  onClick={() => setLrStep(step)}
                  style={{
                    background: lrStep === step ? '#FF7043' : 'transparent',
                    color: '#FFF',
                    border: '1px solid #FF7043',
                    borderRadius: '6px',
                    padding: '4px 10px',
                    fontSize: '0.8rem',
                    cursor: 'pointer'
                  }}
                >
                  Fase {step}
                </button>
              ))}
            </div>
          </div>

          {/* Loss Curve Graphic Representation */}
          <div style={{ background: '#041221', padding: '16px', borderRadius: '10px', border: '1px solid #1E293B', marginBottom: '12px' }}>
            <div style={{ fontSize: '0.8rem', color: '#94A3B8', marginBottom: '10px' }}>
              Trajetória de Perda no Espaço de Parâmetros (Loss Bowl):
            </div>
            
            <div style={{ height: '90px', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <svg width="100%" height="80" viewBox="0 0 400 80" fill="none">
                <path d="M 10 10 Q 200 90 390 10" stroke="#1E3A5F" strokeWidth="3" fill="none" />
                <circle 
                  cx={lrStep === 1 ? 60 : (lrStep === 2 ? 140 : (lrStep === 3 ? 185 : 200))} 
                  cy={lrStep === 1 ? 32 : (lrStep === 2 ? 52 : (lrStep === 3 ? 62 : 64))} 
                  r="9" 
                  fill="#FF7043" 
                  style={{ transition: 'all 0.4s ease' }}
                />
              </svg>
            </div>
          </div>

          <div style={{ fontSize: '0.82rem', color: '#CBD5E1', background: '#041221', padding: '10px', borderRadius: '8px' }}>
            {lrStep === 1 && '🚀 LR = 0.01 (Alta): Passos largos no início do treino para explorar rapidamente a superfície de perda.'}
            {lrStep === 2 && '📉 LR = 0.001 (Média): Redução após plateau. O modelo entra no vale de convergência sem oscilar.'}
            {lrStep === 3 && '🎯 LR = 0.0001 (Baixa): Ajuste fino dos pesos. Aproximação precisa do mínimo global.'}
            {lrStep === 4 && '✨ LR = 0.00001 (Mínimo): Convergência perfeita travada no fundo do vale de perda!'}
          </div>
        </div>
      )}
    </div>
  );
}
