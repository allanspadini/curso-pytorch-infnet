import React, { useState } from 'react';
import { Layers, ArrowRight, ShieldCheck, CheckCircle2, Split, Database } from 'lucide-react';

export default function TensorNormGeometryVisualizer() {
  const [mode, setMode] = useState('batchnorm'); // 'batchnorm' vs 'layernorm'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Mode Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setMode('batchnorm')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: mode === 'batchnorm' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: mode === 'batchnorm' ? 'linear-gradient(135deg, #EFF6FF, #E0F2FE)' : '#FFFFFF',
              color: mode === 'batchnorm' ? '#0369A1' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Split size={16} /> BatchNorm1d (Fatia Vertical / Eixo N)
          </button>
          <button
            onClick={() => setMode('layernorm')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: mode === 'layernorm' ? '2px solid var(--infnet-green-accent)' : '1px solid #CBD5E1',
              background: mode === 'layernorm' ? 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' : '#FFFFFF',
              color: mode === 'layernorm' ? '#15803D' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.88rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Layers size={16} /> LayerNorm (Fatia Horizontal / Eixo C)
          </button>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>
          Tensor 2D de Ativações: <strong>[N Amostras × C Neurônios]</strong>
        </span>
      </div>

      {/* Main Diagram Area */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'grid',
        gridTemplateColumns: '1.25fr 0.75fr',
        gap: '20px',
        flex: 1,
        alignItems: 'center'
      }}>
        {/* Left: 2D Tensor Grid Visualization */}
        <div style={{
          background: '#F8FAFC',
          border: '1px solid #CBD5E1',
          borderRadius: '12px',
          padding: '14px',
          position: 'relative',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.78rem', color: '#64748B', fontWeight: '700' }}>
            <span>Eixo das Amostras (Batch N = 4) ↓</span>
            <span>Eixo das Features (C = 4) →</span>
          </div>

          <svg viewBox="0 0 420 200" style={{ width: '100%', height: '100%' }}>
            {/* 4x4 Cells */}
            {[0, 1, 2, 3].map(row => (
              [0, 1, 2, 3].map(col => {
                const isSelected = mode === 'batchnorm' ? col === 1 : row === 1;
                const fillColor = isSelected 
                  ? (mode === 'batchnorm' ? '#BAE6FD' : '#BBF7D0')
                  : '#FFFFFF';
                const strokeColor = isSelected
                  ? (mode === 'batchnorm' ? '#0284C7' : '#16A34A')
                  : '#CBD5E1';

                return (
                  <g key={`${row}-${col}`}>
                    <rect
                      x={60 + col * 75}
                      y={20 + row * 40}
                      width="65"
                      height="32"
                      rx="6"
                      fill={fillColor}
                      stroke={strokeColor}
                      strokeWidth={isSelected ? 2.5 : 1}
                      transition="all 0.3s ease"
                    />
                    <text
                      x={60 + col * 75 + 32}
                      y={20 + row * 40 + 20}
                      textAnchor="middle"
                      fill={isSelected ? (mode === 'batchnorm' ? '#0369A1' : '#15803D') : '#64748B'}
                      fontSize="10"
                      fontWeight={isSelected ? '800' : '600'}
                      fontFamily="Fira Code, monospace"
                    >
                      x{row + 1},{col + 1}
                    </text>
                  </g>
                );
              })
            ))}

            {/* Labels on row and column */}
            {[0, 1, 2, 3].map(r => (
              <text key={r} x="45" y={20 + r * 40 + 20} textAnchor="end" fill="#64748B" fontSize="9" fontWeight="700">
                Amostra #{r + 1}
              </text>
            ))}
            {[0, 1, 2, 3].map(c => (
              <text key={c} x={60 + c * 75 + 32} y="14" textAnchor="middle" fill="#64748B" fontSize="9" fontWeight="700">
                Feat {c + 1}
              </text>
            ))}

            {/* Slicing Arrow Indicator */}
            {mode === 'batchnorm' ? (
              <g>
                <rect x="130" y="182" width="75" height="18" rx="4" fill="#0284C7" />
                <text x="167" y="195" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">
                  μ e σ nesta coluna
                </text>
              </g>
            ) : (
              <g>
                <rect x="365" y="67" width="50" height="18" rx="4" fill="#16A34A" />
                <text x="390" y="80" textAnchor="middle" fill="#FFFFFF" fontSize="9" fontWeight="800">
                  μ e σ
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Right: Technical Highlights Card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div style={{
            background: mode === 'batchnorm' ? '#EFF6FF' : '#F0FDF4',
            border: `1.5px solid ${mode === 'batchnorm' ? '#93C5FD' : '#86EFAC'}`,
            borderRadius: '12px',
            padding: '14px 16px'
          }}>
            <h4 style={{ margin: '0 0 6px 0', fontSize: '1.05rem', color: mode === 'batchnorm' ? '#0369A1' : '#15803D', fontWeight: '800' }}>
              {mode === 'batchnorm' ? 'Cálculo de BatchNorm1d' : 'Cálculo de LayerNorm'}
            </h4>
            <div style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.82rem',
              fontWeight: '700',
              background: '#FFFFFF',
              padding: '6px 10px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              marginBottom: '10px',
              color: '#0A345D'
            }}>
              {mode === 'batchnorm' 
                ? 'μ_c = (1/N) * Σ_i x[i, c]' 
                : 'μ_n = (1/C) * Σ_j x[n, j]'}
            </div>
            <ul style={{ margin: 0, paddingLeft: '18px', fontSize: '0.84rem', color: '#334155', lineHeight: '1.5' }}>
              {mode === 'batchnorm' ? (
                <>
                  <li>Normaliza através de <strong>todas as amostras do lote</strong> para uma feature específica.</li>
                  <li>Requer batch representativo (ideal &ge; 32).</li>
                  <li>Mantém médias móveis (<code>running_mean</code>) durante o treino.</li>
                  <li>Mais comum em <strong>Visão Computacional e MLPs tabulares</strong>.</li>
                </>
              ) : (
                <>
                  <li>Normaliza através de <strong>todas as features de UMA única amostra</strong>.</li>
                  <li>Comportamento 100% idêntico se batch = 1 ou batch = 1.000.</li>
                  <li>Não depende nem calcula médias móveis acumuladas.</li>
                  <li>Padrão absoluto em <strong>Transformers, LLMs e Séries Temporais</strong>.</li>
                </>
              )}
            </ul>
          </div>

          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '10px',
            padding: '10px 14px',
            fontSize: '0.8rem',
            color: '#64748B',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Database size={16} color="var(--infnet-cyan)" />
            <span>
              {mode === 'batchnorm' 
                ? 'Se N = 1 no treino, BatchNorm quebra por variância nula!' 
                : 'LayerNorm é imune a batch pequeno pois cada linha se autonormaliza.'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
