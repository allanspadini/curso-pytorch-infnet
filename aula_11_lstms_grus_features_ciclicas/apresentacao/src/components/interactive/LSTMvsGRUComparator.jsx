import React, { useState } from 'react';
import { Cpu, HardDrive, Zap, CheckCircle2, ArrowRight, Layers } from 'lucide-react';
import MathView from '../MathView';

export default function LSTMvsGRUComparator() {
  const [inputSize, setInputSize] = useState(10);
  const [hiddenSize, setHiddenSize] = useState(64);
  const [numLayers, setNumLayers] = useState(2);
  const [isBidirectional, setIsBidirectional] = useState(false);

  // Exact PyTorch parameter calculations
  // For layer 1: input is inputSize. For layer 2+: input is hiddenSize * (bi ? 2 : 1)
  const dirMultiplier = isBidirectional ? 2 : 1;

  const calcParams = (multiplier) => {
    let total = 0;
    for (let l = 0; l < numLayers; l++) {
      const inDim = (l === 0) ? inputSize : (hiddenSize * dirMultiplier);
      // PyTorch weights: W_ih: (multiplier*H, inDim), W_hh: (multiplier*H, H), bias_ih: (multiplier*H), bias_hh: (multiplier*H)
      // Total per direction = multiplier * (inDim * H + H * H + 2 * H)
      const perDir = multiplier * (inDim * hiddenSize + hiddenSize * hiddenSize + 2 * hiddenSize);
      total += perDir * dirMultiplier;
    }
    return total;
  };

  const rnnParams = calcParams(1);
  const gruParams = calcParams(3);
  const lstmParams = calcParams(4);

  const gruSavings = ((lstmParams - gruParams) / lstmParams) * 100;
  const memoryLSTM = ((lstmParams * 4) / 1024).toFixed(1); // 4 bytes per float32 in KB
  const memoryGRU = ((gruParams * 4) / 1024).toFixed(1);

  return (
    <div className="sim-container">
      {/* Controls */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
          <Cpu size={18} color="#0A345D" />
          <h3 style={{ fontSize: '0.92rem', color: '#0A345D', margin: 0 }}>Dimensões dos Tensores</h3>
        </div>

        <div className="control-group">
          <label>
            <span>Dimensão de Entrada (<MathView math="D" /> / <MathView math="\text{input\_size}" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{inputSize} features</span>
          </label>
          <input
            type="range"
            min="1"
            max="64"
            step="1"
            value={inputSize}
            onChange={(e) => setInputSize(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Dimensão Oculta (<MathView math="H" /> / <MathView math="\text{hidden\_size}" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{hiddenSize}</span>
          </label>
          <input
            type="range"
            min="16"
            max="256"
            step="16"
            value={hiddenSize}
            onChange={(e) => setHiddenSize(parseInt(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Número de Camadas (<MathView math="\text{num\_layers}" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{numLayers}</span>
          </label>
          <input
            type="range"
            min="1"
            max="4"
            step="1"
            value={numLayers}
            onChange={(e) => setNumLayers(parseInt(e.target.value))}
          />
        </div>

        <div style={{ background: '#FFFFFF', padding: '10px', borderRadius: '6px', border: '1px solid #CBD5E1' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.76rem', fontWeight: 600, color: '#334155', cursor: 'pointer' }}>
            <input
              type="checkbox"
              checked={isBidirectional}
              onChange={(e) => setIsBidirectional(e.target.checked)}
            />
            <span>Bidirecional (<MathView math="\text{bidirectional=True}" />)</span>
          </label>
          {isBidirectional && (
            <div style={{ fontSize: '0.68rem', color: '#991B1B', marginTop: '4px' }}>
              ⚠️ Dobra os parâmetros e estados. Lembre-se: não use em forecasting de séries temporais em tempo real!
            </div>
          )}
        </div>

        <div style={{ marginTop: 'auto', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '10px', borderRadius: '6px' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#166534' }}>
            💡 Economia Direta com GRU:
          </div>
          <div style={{ fontSize: '0.72rem', color: '#14532D', marginTop: '2px' }}>
            A GRU economiza exatamente <strong>{gruSavings.toFixed(1)}% dos parâmetros</strong> em relação à LSTM com velocidade de treino ~20% superior.
          </div>
        </div>
      </div>

      {/* Display Panel */}
      <div className="sim-display-panel">
        {/* Architecture Comparison Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
          
          {/* Vanilla RNN */}
          <div className="content-card" style={{ borderTop: '4px solid #64748B', padding: '12px' }}>
            <span className="card-header-badge" style={{ background: 'rgba(100,116,139,0.15)', color: '#475569' }}>
              Vanilla RNN (1 Portão)
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#334155', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {rnnParams.toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#64748B' }}>pesos</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#64748B' }}>
              Memória: <strong>{((rnnParams * 4) / 1024).toFixed(1)} KB</strong>
            </div>
            <ul className="styled-list" style={{ marginTop: '8px', fontSize: '0.72rem' }}>
              <li>Altamente suscetível a vanishing gradient.</li>
              <li>Apenas para sequências curtíssimas (<MathView math="< 10" /> passos).</li>
            </ul>
          </div>

          {/* GRU */}
          <div className="content-card" style={{ borderTop: '4px solid #1BB5D8', padding: '12px', background: 'linear-gradient(145deg, #F0F9FF 0%, #FFFFFF 100%)' }}>
            <span className="card-header-badge pill-cyan">
              GRU (3 Matrizes / 2 Portões)
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#0E7490', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {gruParams.toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#0E7490' }}>pesos</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#0369A1' }}>
              Memória: <strong>{memoryGRU} KB</strong> (Economia de 25%)
            </div>
            <ul className="styled-list" style={{ marginTop: '8px', fontSize: '0.72rem' }}>
              <li>Reset & Update Gates.</li>
              <li>Treino rápido, ideal para demand forecasting e séries médias.</li>
              <li>Apenas 1 estado oculto (<MathView math="h_t" />).</li>
            </ul>
          </div>

          {/* LSTM */}
          <div className="content-card" style={{ borderTop: '4px solid #7CB342', padding: '12px' }}>
            <span className="card-header-badge pill-green">
              LSTM (4 Matrizes / 3 Portões)
            </span>
            <div style={{ fontSize: '1.35rem', fontWeight: 800, color: '#166534', fontFamily: 'var(--font-mono)', margin: '6px 0' }}>
              {lstmParams.toLocaleString()} <span style={{ fontSize: '0.72rem', color: '#166534' }}>pesos</span>
            </div>
            <div style={{ fontSize: '0.74rem', color: '#15803D' }}>
              Memória: <strong>{memoryLSTM} KB</strong>
            </div>
            <ul className="styled-list" style={{ marginTop: '8px', fontSize: '0.72rem' }}>
              <li>Forget, Input e Output Gates.</li>
              <li>Máxima expressividade para sequências muito longas (100+ passos).</li>
              <li>2 estados gerenciados: (<MathView math="h_t, C_t" />).</li>
            </ul>
          </div>

        </div>

        {/* Feature Comparison Matrix Table */}
        <div style={{ flex: 1, background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '8px' }}>
            Matriz de Decisão: Qual Arquitetura Escolher?
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.74rem' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid #CBD5E1', textAlign: 'left', color: '#475569' }}>
                <th style={{ padding: '6px 8px' }}>Critério</th>
                <th style={{ padding: '6px 8px' }}>Vanilla RNN</th>
                <th style={{ padding: '6px 8px', color: '#0E7490' }}>GRU (Recomendada)</th>
                <th style={{ padding: '6px 8px', color: '#166534' }}>LSTM</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '6px 8px', fontWeight: 600 }}>Complexidade & Pesos</td>
                <td style={{ padding: '6px 8px' }}><MathView math="1 \times" /></td>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0E7490' }}><MathView math="3 \times" /> (Mais leve)</td>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: '#166534' }}><MathView math="4 \times" /></td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '6px 8px', fontWeight: 600 }}>Horizonte de Memória</td>
                <td style={{ padding: '6px 8px', color: '#DC2626' }}>5 a 10 passos</td>
                <td style={{ padding: '6px 8px', color: '#166534' }}>50 a 100 passos</td>
                <td style={{ padding: '6px 8px', color: '#166534', fontWeight: 700 }}>100 a 200+ passos</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #E2E8F0' }}>
                <td style={{ padding: '6px 8px', fontWeight: 600 }}>Risco de Overfitting</td>
                <td style={{ padding: '6px 8px' }}>Baixo (mas não aprende)</td>
                <td style={{ padding: '6px 8px', color: '#166534' }}>Menor (ideal p/ datasets médios)</td>
                <td style={{ padding: '6px 8px', color: '#D97706' }}>Maior (exige mais dados/dropout)</td>
              </tr>
              <tr>
                <td style={{ padding: '6px 8px', fontWeight: 600 }}>Caso de Uso Ideal</td>
                <td style={{ padding: '6px 8px' }}>Fins didáticos</td>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: '#0E7490' }}>Previsão de demanda, sensores, áudio</td>
                <td style={{ padding: '6px 8px', fontWeight: 700, color: '#166534' }}>NLP complexo, tradução, genômica</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
