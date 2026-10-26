import React, { useState } from 'react';
import { Sliders, RefreshCw, Zap, CheckCircle2, Shield, ArrowRight } from 'lucide-react';
import MathView from '../MathView';

export default function LSTMGateExplorer() {
  const [xt, setXt] = useState(1.2);
  const [prevH, setPrevH] = useState(0.5);
  const [prevC, setPrevC] = useState(2.0);
  const [bfBias, setBfBias] = useState(1.0); // positive default forget bias

  // Sigmoid and Tanh helpers
  const sigmoid = (z) => 1 / (1 + Math.exp(-z));
  const tanh = (z) => Math.tanh(z);

  // Compute Gate Values
  const zf = 0.8 * xt + 1.2 * prevH + bfBias;
  const ft = sigmoid(zf); // Forget Gate [0, 1]

  const zi = 1.0 * xt + 0.6 * prevH;
  const it = sigmoid(zi); // Input Gate [0, 1]

  const zc = 1.2 * xt + 0.8 * prevH;
  const cTilde = tanh(zc); // Candidate [-1, 1]

  // Cell state update (Linear highway)
  const cRetained = ft * prevC;
  const cAdded = it * cTilde;
  const ct = cRetained + cAdded;

  // Output gate
  const zo = 0.7 * xt + 0.9 * prevH + 0.2;
  const ot = sigmoid(zo); // Output Gate [0, 1]

  // Final hidden state
  const tanhCt = tanh(ct);
  const ht = ot * tanhCt;

  // Presets
  const applyPreset = (type) => {
    if (type === 'spike') {
      setXt(2.5);
      setPrevH(0.4);
      setPrevC(1.5);
      setBfBias(1.5);
    } else if (type === 'reset') {
      setXt(-1.5);
      setPrevH(-1.0);
      setPrevC(3.0);
      setBfBias(-2.5); // Forces forget gate near 0
    } else if (type === 'stable') {
      setXt(0.2);
      setPrevH(0.1);
      setPrevC(1.0);
      setBfBias(1.0);
    }
  };

  return (
    <div className="sim-container">
      {/* Controls */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderBottom: '1px solid #E2E8F0', paddingBottom: '8px' }}>
          <Sliders size={18} color="#0A345D" />
          <h3 style={{ fontSize: '0.92rem', color: '#0A345D', margin: 0 }}>Tensores de Entrada na Célula</h3>
        </div>

        <div className="control-group">
          <label>
            <span>Entrada Atual (<MathView math="x_t" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{xt.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="-3.0"
            max="3.0"
            step="0.1"
            value={xt}
            onChange={(e) => setXt(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
            Valor da série temporal / features no timestep <MathView math="t" />.
          </div>
        </div>

        <div className="control-group">
          <label>
            <span>Estado Oculto Anterior (<MathView math="h_{t-1}" />):</span>
            <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>{prevH.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="-2.0"
            max="2.0"
            step="0.1"
            value={prevH}
            onChange={(e) => setPrevH(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Memória da Célula Anterior (<MathView math="C_{t-1}" />):</span>
            <span style={{ color: '#166534', fontFamily: 'var(--font-mono)' }}>{prevC.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="-4.0"
            max="4.0"
            step="0.1"
            value={prevC}
            onChange={(e) => setPrevC(parseFloat(e.target.value))}
          />
        </div>

        <div className="control-group">
          <label>
            <span>Bias do Forget Gate (<MathView math="b_f" />):</span>
            <span style={{ color: '#C2410C', fontFamily: 'var(--font-mono)' }}>{bfBias.toFixed(2)}</span>
          </label>
          <input
            type="range"
            min="-3.0"
            max="3.0"
            step="0.2"
            value={bfBias}
            onChange={(e) => setBfBias(parseFloat(e.target.value))}
          />
          <div style={{ fontSize: '0.68rem', color: '#64748B' }}>
            Dica de ouro (Jozefowicz 2015): Iniciar <MathView math="b_f = 1.0" /> evita esquecimento prematuro!
          </div>
        </div>

        {/* Presets */}
        <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <div style={{ fontSize: '0.7rem', fontWeight: 700, color: '#64748B', textTransform: 'uppercase' }}>Cenários de Negócio:</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button className="btn-interactive" style={{ fontSize: '0.7rem' }} onClick={() => applyPreset('spike')}>
              🔥 Pico de Vendas (Black Friday)
            </button>
            <button className="btn-interactive" style={{ fontSize: '0.7rem' }} onClick={() => applyPreset('reset')}>
              🧹 Quebra Estrutural (Reset Memória)
            </button>
            <button className="btn-interactive" style={{ fontSize: '0.7rem' }} onClick={() => applyPreset('stable')}>
              🌱 Demanda Estável
            </button>
          </div>
        </div>
      </div>

      {/* Display Panel */}
      <div className="sim-display-panel" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        
        {/* Top Input Vector Banner */}
        <div style={{ background: 'linear-gradient(135deg, #0A345D 0%, #0E4E8A 100%)', borderRadius: '8px', padding: '6px 12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#64D9EF', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Entradas do Timestep t:
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ background: '#0284C7', color: '#FFFFFF', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 800, border: '1px solid #38BDF8' }}>
                Entrada Atual: <MathView math={`x_t = ${xt.toFixed(2)}`} />
              </span>
              <span style={{ color: '#64D9EF', fontWeight: 800 }}>+</span>
              <span style={{ background: '#061F38', color: '#93C5FD', padding: '2px 8px', borderRadius: '4px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #1E40AF' }}>
                Memória Imediata: <MathView math={`h_{t-1} = ${prevH.toFixed(2)}`} />
              </span>
            </div>
          </div>

          <div style={{ fontSize: '0.68rem', color: '#BAE6FD', fontWeight: 600 }}>
            ➔ Entram conjuntamente nos 4 portões abaixo
          </div>
        </div>

        {/* 4 Gates Breakdown Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
          
          {/* Forget Gate */}
          <div style={{ background: '#FFF7ED', border: '1.5px solid #FED7AA', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#C2410C', fontWeight: 800 }}>1. Forget Gate (<MathView math="f_t" />)</div>
              <div style={{ fontSize: '0.62rem', color: '#9A3412', margin: '2px 0', fontFamily: 'var(--font-mono)' }}>
                <MathView math={`\\sigma(0.8 x_t + 1.2 h_{t-1} + b_f)`} />
              </div>
              <div style={{ fontSize: '0.64rem', color: '#C2410C', fontWeight: 600, background: '#FFFFFF', padding: '2px 4px', borderRadius: '4px', border: '1px solid #FFEDD5', margin: '3px 0' }}>
                <MathView math={`\\sigma(${zf.toFixed(2)})`} /> = <strong style={{ color: '#9A3412', fontSize: '0.85rem' }}>{ft.toFixed(3)}</strong>
              </div>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#EA580C', fontWeight: 600 }}>
              Retém {(ft * 100).toFixed(0)}% de <MathView math="C_{t-1}" />
            </div>
          </div>

          {/* Input Gate */}
          <div style={{ background: '#F0F9FF', border: '1.5px solid #BAE6FD', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#0369A1', fontWeight: 800 }}>2. Input Gate (<MathView math="i_t" />)</div>
              <div style={{ fontSize: '0.62rem', color: '#075985', margin: '2px 0', fontFamily: 'var(--font-mono)' }}>
                <MathView math={`\\sigma(1.0 x_t + 0.6 h_{t-1})`} />
              </div>
              <div style={{ fontSize: '0.64rem', color: '#0369A1', fontWeight: 600, background: '#FFFFFF', padding: '2px 4px', borderRadius: '4px', border: '1px solid #E0F2FE', margin: '3px 0' }}>
                <MathView math={`\\sigma(${zi.toFixed(2)})`} /> = <strong style={{ color: '#075985', fontSize: '0.85rem' }}>{it.toFixed(3)}</strong>
              </div>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#0284C7', fontWeight: 600 }}>
              Permite {(it * 100).toFixed(0)}% da entrada
            </div>
          </div>

          {/* Candidate (New info from xt) */}
          <div style={{ background: '#F0FDF4', border: '2px solid #86EFAC', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: '0 2px 6px rgba(22,163,74,0.1)' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '3px' }}>
                <span>✨ Candidato (<MathView math="\tilde{C}_t" />)</span>
              </div>
              <div style={{ fontSize: '0.62rem', color: '#15803D', margin: '2px 0', fontFamily: 'var(--font-mono)' }}>
                <MathView math={`\\tanh(1.2 x_t + 0.8 h_{t-1})`} />
              </div>
              <div style={{ fontSize: '0.64rem', color: '#166534', fontWeight: 600, background: '#FFFFFF', padding: '2px 4px', borderRadius: '4px', border: '1px solid #DCFCE7', margin: '3px 0' }}>
                <MathView math={`\\tanh(${zc.toFixed(2)})`} /> = <strong style={{ color: '#14532D', fontSize: '0.85rem' }}>{cTilde.toFixed(3)}</strong>
              </div>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#16A34A', fontWeight: 700 }}>
              📥 Novo fato gerado por <MathView math="x_t" />
            </div>
          </div>

          {/* Output Gate */}
          <div style={{ background: '#FAF5FF', border: '1.5px solid #E9D5FF', borderRadius: '6px', padding: '6px 8px', textAlign: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '0.68rem', color: '#7E22CE', fontWeight: 800 }}>3. Output Gate (<MathView math="o_t" />)</div>
              <div style={{ fontSize: '0.62rem', color: '#6B21A8', margin: '2px 0', fontFamily: 'var(--font-mono)' }}>
                <MathView math={`\\sigma(0.7 x_t + 0.9 h_{t-1} + 0.2)`} />
              </div>
              <div style={{ fontSize: '0.64rem', color: '#7E22CE', fontWeight: 600, background: '#FFFFFF', padding: '2px 4px', borderRadius: '4px', border: '1px solid #F3E8FF', margin: '3px 0' }}>
                <MathView math={`\\sigma(${zo.toFixed(2)})`} /> = <strong style={{ color: '#581C87', fontSize: '0.85rem' }}>{ot.toFixed(3)}</strong>
              </div>
            </div>
            <div style={{ fontSize: '0.62rem', color: '#9333EA', fontWeight: 600 }}>
              Filtro para emitir <MathView math="h_t" />
            </div>
          </div>

        </div>

        {/* Central Visual: Cell State Highway */}
        <div style={{ background: 'linear-gradient(145deg, #F8FAFC 0%, #EFF6FF 100%)', border: '2px solid #93C5FD', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0A345D' }}>
              🛣️ A Rodovia Linear da Cell State (<MathView math="C_t" />):
            </span>
            <span style={{ fontSize: '0.72rem', background: '#DBEAFE', color: '#1E40AF', padding: '2px 8px', borderRadius: '12px', fontWeight: 700 }}>
              Operação Aditiva: <MathView math="C_t = f_t \odot C_{t-1} + i_t \odot \tilde{C}_t" />
            </span>
          </div>

          {/* Equation Breakdown in Boxes */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', padding: '4px 0' }}>
            
            {/* Term 1: Retained Past */}
            <div style={{ background: '#FFFFFF', border: '1.5px solid #FED7AA', borderRadius: '6px', padding: '6px 10px', textAlign: 'center', minWidth: '150px' }}>
              <div style={{ fontSize: '0.66rem', color: '#C2410C', fontWeight: 700 }}>1. Passado Retido (<MathView math="f_t \cdot C_{t-1}" />)</div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#C2410C', fontFamily: 'var(--font-mono)', margin: '2px 0' }}>
                {ft.toFixed(2)} × {prevC.toFixed(2)} = {cRetained.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#EA580C' }}>Memória antiga filtrada</div>
            </div>

            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A345D' }}>+</span>

            {/* Term 2: Injected Current Input (xt) */}
            <div style={{ background: '#FFFFFF', border: '2px solid #38BDF8', borderRadius: '6px', padding: '6px 10px', textAlign: 'center', minWidth: '170px', boxShadow: '0 2px 8px rgba(2,132,199,0.15)' }}>
              <div style={{ fontSize: '0.66rem', color: '#0369A1', fontWeight: 800 }}>
                2. Injeção de <MathView math="x_t" /> (<MathView math="i_t \cdot \tilde{C}_t" />)
              </div>
              <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#0369A1', fontFamily: 'var(--font-mono)', margin: '2px 0' }}>
                {it.toFixed(2)} × {cTilde.toFixed(2)} = {cAdded.toFixed(2)}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#0284C7', fontWeight: 700 }}>
                Entrada atual somada na esteira!
              </div>
            </div>

            <span style={{ fontSize: '1.3rem', fontWeight: 800, color: '#0A345D' }}>=</span>

            {/* Result: Ct */}
            <div style={{ background: '#DCFCE7', border: '2px solid #86EFAC', borderRadius: '6px', padding: '6px 12px', textAlign: 'center', minWidth: '130px' }}>
              <div style={{ fontSize: '0.66rem', color: '#166534', fontWeight: 700 }}>Nova Cell State (<MathView math="C_t" />)</div>
              <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803D', fontFamily: 'var(--font-mono)', margin: '2px 0' }}>
                {ct.toFixed(3)}
              </div>
              <div style={{ fontSize: '0.6rem', color: '#16A34A' }}>Memória atualizada</div>
            </div>

          </div>

          <div style={{ fontSize: '0.7rem', color: '#475569', textAlign: 'center', background: 'rgba(255,255,255,0.7)', padding: '3px', borderRadius: '4px' }}>
            A entrada <MathView math="x_t" /> entra somando na esteira através de <MathView math="i_t \odot \tilde{C}_t" /> sem risco de desvanecer o sinal passado!
          </div>
        </div>

        {/* Final State Output */}
        <div style={{ background: '#0A345D', color: '#FFFFFF', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '0.74rem', color: '#64D9EF', fontWeight: 700 }}>
              Estado Oculto Emitido para a Próxima Camada (<MathView math="h_t" />):
            </div>
            <div style={{ fontSize: '0.7rem', color: '#CBD5E1', marginTop: '1px' }}>
              <MathView math="h_t = o_t \odot \tanh(C_t) =" /> <span style={{ fontFamily: 'var(--font-mono)' }}>{ot.toFixed(2)} × {tanhCt.toFixed(2)}</span>
            </div>
          </div>

          <div style={{ background: '#1BB5D8', color: '#061F38', padding: '4px 14px', borderRadius: '20px', fontSize: '1.1rem', fontWeight: 800, fontFamily: 'var(--font-mono)' }}>
            h_t = {ht.toFixed(3)}
          </div>
        </div>

      </div>
    </div>
  );
}
