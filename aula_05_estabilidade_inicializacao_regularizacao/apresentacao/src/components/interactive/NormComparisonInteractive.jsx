import React, { useState } from 'react';
import { Layers, Split, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function NormComparisonInteractive() {
  const [normType, setNormType] = useState('batchnorm'); // 'batchnorm' vs 'layernorm'
  const [isTrainMode, setIsTrainMode] = useState(true);
  const [batchSize, setBatchSize] = useState(4); // 4 vs 1

  // Matrix of activations: N samples x C features
  const rawMatrix = [
    [2.5,  0.8, -1.2, 3.0],
    [1.1, -0.4,  0.5, 0.2],
    [3.8,  1.9, -0.8, 4.1],
    [0.2, -1.5,  2.1, 1.0],
  ];

  const currentMatrix = rawMatrix.slice(0, batchSize);

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
      {/* Top Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem', color: 'var(--infnet-dark-blue)', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Layers size={22} color="var(--infnet-cyan)" /> Simulador Numérico: BatchNorm1d vs LayerNorm
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#64748B', margin: '2px 0 0 0' }}>
            Observe as células destacadas de onde a Média (μ) e Variância (σ²) são calculadas
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => setNormType('batchnorm')}
            style={{
              background: normType === 'batchnorm' ? '#0284C7' : '#F1F5F9',
              color: normType === 'batchnorm' ? '#FFFFFF' : '#0369A1',
              border: `1.5px solid ${normType === 'batchnorm' ? '#0284C7' : '#CBD5E1'}`,
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Split size={14} /> BatchNorm1d (Eixo Batch N)
          </button>
          <button 
            onClick={() => setNormType('layernorm')}
            style={{
              background: normType === 'layernorm' ? '#16A34A' : '#F1F5F9',
              color: normType === 'layernorm' ? '#FFFFFF' : '#15803D',
              border: `1.5px solid ${normType === 'layernorm' ? '#16A34A' : '#CBD5E1'}`,
              borderRadius: '8px',
              padding: '6px 14px',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.82rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={14} /> LayerNorm (Eixo Features C)
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <div style={{
        display: 'flex',
        gap: '12px',
        alignItems: 'center',
        background: '#F8FAFC',
        border: '1px solid #E2E8F0',
        padding: '8px 14px',
        borderRadius: '10px'
      }}>
        <span style={{ fontSize: '0.82rem', color: '#475569', fontWeight: '700' }}>Tamanho do Batch:</span>
        <button 
          onClick={() => setBatchSize(4)}
          style={{
            background: batchSize === 4 ? '#0A345D' : '#FFFFFF',
            color: batchSize === 4 ? '#FFFFFF' : '#475569',
            border: '1px solid #CBD5E1',
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            cursor: 'pointer',
            fontWeight: batchSize === 4 ? '700' : '500'
          }}
        >
          N = 4 (Normal)
        </button>
        <button 
          onClick={() => setBatchSize(1)}
          style={{
            background: batchSize === 1 ? '#D84315' : '#FFFFFF',
            color: batchSize === 1 ? '#FFFFFF' : '#D84315',
            border: `1px solid ${batchSize === 1 ? '#D84315' : '#CBD5E1'}`,
            borderRadius: '6px',
            padding: '4px 10px',
            fontSize: '0.78rem',
            cursor: 'pointer',
            fontWeight: batchSize === 1 ? '700' : '500'
          }}
        >
          N = 1 (Amostra Isolada)
        </button>

        {normType === 'batchnorm' && (
          <>
            <div style={{ width: '1px', height: '16px', background: '#CBD5E1', margin: '0 4px' }} />
            <button 
              onClick={() => setIsTrainMode(!isTrainMode)}
              style={{
                background: isTrainMode ? '#16A34A' : '#7E22CE',
                color: '#FFF',
                border: 'none',
                borderRadius: '6px',
                padding: '4px 10px',
                fontSize: '0.78rem',
                cursor: 'pointer',
                fontWeight: '700'
              }}
            >
              {isTrainMode ? 'Modo Treino (Stats do Batch Atual)' : 'Modo Eval (Running Stats Congeladas)'}
            </button>
          </>
        )}
      </div>

      {/* Matrix Display */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '8px',
        flex: 1,
        alignItems: 'center'
      }}>
        {currentMatrix.map((row, rIdx) => (
          row.map((val, cIdx) => {
            const isHighlighted = normType === 'batchnorm' ? cIdx === 0 : rIdx === 0;
            const bg = isHighlighted 
              ? (normType === 'batchnorm' ? '#E0F2FE' : '#DCFCE7') 
              : '#F8FAFC';
            const border = isHighlighted
              ? (normType === 'batchnorm' ? '#0284C7' : '#16A34A')
              : '#E2E8F0';

            return (
              <div 
                key={`${rIdx}-${cIdx}`}
                style={{
                  background: bg,
                  border: `1.5px solid ${border}`,
                  borderRadius: '10px',
                  padding: '10px',
                  textAlign: 'center',
                  boxShadow: isHighlighted ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  transition: 'all 0.25s ease'
                }}
              >
                <div style={{ fontSize: '0.72rem', color: '#64748B', marginBottom: '2px', fontWeight: '600' }}>
                  Amostra #{rIdx + 1} | Feature #{cIdx + 1}
                </div>
                <div style={{
                  fontFamily: 'Fira Code, monospace',
                  fontSize: '1.05rem',
                  fontWeight: '800',
                  color: val > 0 ? '#0A345D' : '#D84315'
                }}>
                  {val > 0 ? `+${val.toFixed(1)}` : val.toFixed(1)}
                </div>
              </div>
            );
          })
        ))}
      </div>

      {/* Bottom Math Explanation Alert */}
      <div style={{
        background: normType === 'batchnorm' ? '#EFF6FF' : '#F0FDF4',
        border: `1px solid ${normType === 'batchnorm' ? '#BFDBFE' : '#BBF7D0'}`,
        borderRadius: '10px',
        padding: '10px 14px'
      }}>
        {normType === 'batchnorm' ? (
          <div style={{ fontSize: '0.84rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            {batchSize === 1 ? (
              <>
                <AlertTriangle color="#D84315" size={20} style={{ flexShrink: 0 }} />
                <span>
                  <strong style={{ color: '#D84315' }}>ALERTA CRÍTICO:</strong> Quando o Batch Size = 1 no treino, a variância do batch é exatamente zero (σ² = 0). O BatchNorm falha pois não há outros dados para calcular dispersão!
                </span>
              </>
            ) : (
              <>
                <CheckCircle2 color="#0284C7" size={20} style={{ flexShrink: 0 }} />
                <span>
                  <strong>BatchNorm1d:</strong> Normaliza <strong>verticalmente</strong> através das {batchSize} amostras para cada coluna de feature isoladamente.
                </span>
              </>
            )}
          </div>
        ) : (
          <div style={{ fontSize: '0.84rem', color: '#1E293B', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <CheckCircle2 color="#16A34A" size={20} style={{ flexShrink: 0 }} />
            <span>
              <strong>LayerNorm:</strong> Normaliza <strong>horizontalmente</strong> ao longo das 4 features de cada amostra individual. Funciona perfeitamente mesmo com Batch Size = 1!
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
