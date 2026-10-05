import React, { useState } from 'react';
import { Layers, ShieldCheck, AlertTriangle } from 'lucide-react';

export default function WeightInitComparison() {
  const [selectedInit, setSelectedInit] = useState('kaiming');

  const initData = {
    zeros: {
      name: 'Inicialização com Zeros',
      formula: 'W = 0',
      varLayer1: '0.00',
      varLayer5: '0.00',
      status: 'Quebra de Simetria Falhou',
      statusColor: '#FF7043',
      desc: 'Todos os neurônios recebem exatamente os mesmos gradientes. A rede não aprende representações distintas.'
    },
    default_rand: {
      name: 'Aleatória Não-Escalada N(0, 1)',
      formula: 'W ~ N(0, 1)',
      varLayer1: '1.05',
      varLayer5: '124.80',
      status: 'Explosão de Ativações',
      statusColor: '#FF7043',
      desc: 'Conforme o número de camadas aumenta, a variância das ativações cresce exponencialmente, causando gradientes explosivos.'
    },
    xavier: {
      name: 'Xavier / Glorot (Uniforme)',
      formula: 'W ~ U(-√(6/(n_in + n_out)), √(6/(n_in + n_out)))',
      varLayer1: '1.01',
      varLayer5: '0.98',
      status: 'Estável para Tanh / Sigmoid',
      statusColor: '#1BB5D8',
      desc: 'Preserva a variância das ativações e gradientes constante entre camadas para funções de ativação simétricas.'
    },
    kaiming: {
      name: 'He / Kaiming (Normal)',
      formula: 'W ~ N(0, √(2 / n_in))',
      varLayer1: '1.02',
      varLayer5: '1.01',
      status: 'Recomendado para ReLU / LeakyReLU',
      statusColor: '#7CB342',
      desc: 'Compensa a metade nula da função ReLU dobrando a variância inicial, garantindo sinal forte mesmo em redes profundas.'
    }
  };

  const current = initData[selectedInit];

  return (
    <div style={{
      background: 'rgba(6, 31, 56, 0.85)',
      border: '1px solid rgba(27, 181, 216, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      color: '#FFFFFF'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1BB5D8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.15rem' }}>
          <Layers size={20} /> Comparador de Métodos de Inicialização de Pesos
        </h3>
        <div style={{ display: 'flex', gap: '6px' }}>
          {Object.keys(initData).map(key => (
            <button
              key={key}
              onClick={() => setSelectedInit(key)}
              style={{
                padding: '6px 10px',
                borderRadius: '6px',
                border: selectedInit === key ? '2px solid #1BB5D8' : '1px solid rgba(255,255,255,0.2)',
                background: selectedInit === key ? 'rgba(27, 181, 216, 0.2)' : 'transparent',
                color: selectedInit === key ? '#64D9EF' : '#A0AEC0',
                cursor: 'pointer',
                fontSize: '0.8rem',
                fontWeight: 'bold'
              }}
            >
              {key.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', alignItems: 'center' }}>
        {/* Layer Variance Simulator */}
        <div style={{ background: '#041527', padding: '15px', borderRadius: '8px', border: '1px solid #1A365D' }}>
          <h4 style={{ margin: '0 0 10px 0', fontSize: '0.9rem', color: '#64D9EF' }}>Variância das Ativações por Camada (Rede com 5 Camadas)</h4>

          {[1, 2, 3, 4, 5].map(layer => {
            let varVal = 1.0;
            if (selectedInit === 'zeros') varVal = 0.0;
            else if (selectedInit === 'default_rand') varVal = Math.pow(2.2, layer - 1);
            else if (selectedInit === 'xavier') varVal = 0.98 + (layer * 0.01);
            else if (selectedInit === 'kaiming') varVal = 1.0 + (layer * 0.005);

            const widthPercent = Math.min(100, (varVal / 10) * 100);

            return (
              <div key={layer} style={{ marginBottom: '8px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '2px', color: '#A0AEC0' }}>
                  <span>Camada {layer}</span>
                  <span>Var: <strong>{varVal.toFixed(2)}</strong></span>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.05)', height: '10px', borderRadius: '5px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${widthPercent}%`,
                    background: varVal > 5 ? '#FF7043' : varVal === 0 ? '#718096' : '#7CB342',
                    transition: 'all 0.3s'
                  }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Info Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{ background: 'rgba(10, 52, 93, 0.6)', padding: '12px', borderRadius: '8px' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#1BB5D8', fontSize: '1rem' }}>{current.name}</h4>
            <code style={{ background: '#041527', padding: '3px 8px', borderRadius: '4px', color: '#FFD54F', fontSize: '0.85rem' }}>
              {current.formula}
            </code>
          </div>

          <div style={{
            background: `rgba(${selectedInit === 'kaiming' || selectedInit === 'xavier' ? '124, 179, 66' : '255, 112, 67'}, 0.15)`,
            border: `1px solid ${current.statusColor}`,
            padding: '12px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            {selectedInit === 'kaiming' || selectedInit === 'xavier' ? (
              <ShieldCheck color={current.statusColor} size={24} />
            ) : (
              <AlertTriangle color={current.statusColor} size={24} />
            )}
            <div>
              <strong style={{ color: current.statusColor, fontSize: '0.9rem' }}>{current.status}</strong>
              <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#CBD5E0' }}>{current.desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
