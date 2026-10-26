import React, { useState } from 'react';
import { ArrowRight, ArrowDownRight, Layers, Repeat, Sparkles, CheckCircle2, Sliders } from 'lucide-react';
import MathView from '../MathView';

export default function RNNUnrolledStepDiagram() {
  const [activeStep, setActiveStep] = useState(2); // 1, 2, or 3
  const [showValues, setShowValues] = useState(true);

  // Concrete numerical values (StatQuest example)
  const w1 = 1.8;
  const w2 = -0.5;
  const w3 = 1.1;
  const b1 = 0.0;
  const b2 = 0.0;

  // Step 1 data
  const x1 = 0.20;
  const h0 = 0.0;
  const in1 = x1 * w1; // 0.36
  const rec1 = h0 * w2; // 0.0
  const sum1 = in1 + rec1 + b1; // 0.36
  const h1 = Math.max(0, sum1); // 0.36
  const y1 = h1 * w3 + b2; // 0.40

  // Step 2 data
  const x2 = 0.45;
  const in2 = x2 * w1; // 0.81
  const rec2 = h1 * w2; // -0.18
  const sum2 = in2 + rec2 + b1; // 0.63
  const h2 = Math.max(0, sum2); // 0.63
  const y2 = h2 * w3 + b2; // 0.69

  // Step 3 data
  const x3 = 0.75;
  const in3 = x3 * w1; // 1.35
  const rec3 = h2 * w2; // -0.315
  const sum3 = in3 + rec3 + b1; // 1.035
  const h3 = Math.max(0, sum3); // 1.035
  const y3 = h3 * w3 + b2; // 1.14

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      
      {/* Top Controls & Explanation Banner */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0A345D' }}>
            Visualização Desenrolada (Unrolled through Time):
          </span>
          <span style={{ fontSize: '0.72rem', color: '#64748B' }}>
            A saída da ativação de cada passo desce via <MathView math="w_2" /> para alimentar a soma do passo seguinte
          </span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setShowValues(!showValues)}
            style={{
              padding: '3px 10px',
              borderRadius: '6px',
              border: '1px solid #0E7490',
              background: showValues ? '#E0F2FE' : '#FFFFFF',
              color: '#0369A1',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {showValues ? 'Exibir Símbolos (x, h, y)' : 'Exibir Valores Numéricos'}
          </button>

          <div style={{ display: 'flex', gap: '4px' }}>
            {[1, 2, 3].map((stepNum) => (
              <button
                key={stepNum}
                onClick={() => setActiveStep(stepNum)}
                style={{
                  padding: '3px 8px',
                  borderRadius: '5px',
                  border: activeStep === stepNum ? '2px solid #1BB5D8' : '1px solid #CBD5E1',
                  background: activeStep === stepNum ? '#0A345D' : '#FFFFFF',
                  color: activeStep === stepNum ? '#FFFFFF' : '#475569',
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  cursor: 'pointer'
                }}
              >
                Passo {stepNum}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Visual: Two / Three Unrolled Rows with Connecting Curved Arrows */}
      <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '12px 18px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '14px', boxShadow: '0 4px 12px rgba(10,52,93,0.05)' }}>
        
        {/* ROW 1: Timestep t=1 */}
        <div style={{ position: 'relative', background: activeStep === 1 ? '#F0F9FF' : '#FAFAFA', border: activeStep === 1 ? '1.5px solid #0284C7' : '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0A345D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Passo 1 (t = 1) • Estado Inicial: <MathView math="h_0 = 0.0" />
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
              Pesos: <MathView math={`w_1=${w1}, w_2=${w2}, w_3=${w3}`} />
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            
            {/* Input 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0E7490' }}>Input</span>
              <div style={{ background: '#E0F2FE', border: '2px solid #0284C7', borderRadius: '6px', padding: '4px 10px', fontSize: '0.85rem', fontWeight: 800, color: '#0369A1', minWidth: '60px', textAlign: 'center' }}>
                {showValues ? x1.toFixed(2) : <MathView math="x_1" />}
              </div>
            </div>

            {/* w1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#0284C7' }}>w₁</span>
              <div style={{ background: '#F0F9FF', border: '1px solid #38BDF8', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#0369A1' }}>
                × {w1}
              </div>
            </div>

            <ArrowRight size={15} color="#0284C7" />

            {/* Sum 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#475569' }}>b₁</span>
              <div style={{ background: '#F8FAFC', border: '1.5px solid #64748B', borderRadius: '6px', padding: '4px 8px', fontSize: '0.76rem', fontWeight: 800, color: '#1E293B', textAlign: 'center' }}>
                sum <span style={{ color: '#0284C7' }}>+ {b1.toFixed(1)}</span>
                {showValues && <div style={{ fontSize: '0.68rem', color: '#475569' }}>={sum1.toFixed(2)}</div>}
              </div>
            </div>

            <ArrowRight size={15} color="#0284C7" />

            {/* Activation 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#0A345D' }}>Ativação</span>
              <div style={{ background: '#FFFFFF', border: '2px solid #0284C7', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '6px', height: '42px', boxShadow: '0 2px 6px rgba(10,52,93,0.08)' }}>
                <svg width="24" height="18" viewBox="0 0 40 24">
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="20" y1="2" x2="20" y2="22" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M 4 20 L 20 20 L 36 4" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0A345D' }}>
                  {showValues ? `h₁ = ${h1.toFixed(2)}` : <MathView math="h_1" />}
                </div>
              </div>
            </div>

            {/* w3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A' }}>w₃</span>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>
                × {w3}
              </div>
            </div>

            <ArrowRight size={15} color="#16A34A" />

            {/* b2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A' }}>b₂</span>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>
                + {b2.toFixed(1)}
              </div>
            </div>

            <ArrowRight size={15} color="#16A34A" />

            {/* Output 1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16A34A' }}>Output</span>
              <div style={{ background: '#DCFCE7', border: '2px solid #16A34A', borderRadius: '6px', padding: '4px 10px', fontSize: '0.85rem', fontWeight: 800, color: '#166534', minWidth: '60px', textAlign: 'center' }}>
                {showValues ? y1.toFixed(2) : <MathView math="\hat{y}_1" />}
              </div>
            </div>

          </div>
        </div>

        {/* RECURRENT LINK FROM ROW 1 TO ROW 2 */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px', margin: '-6px 0', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', background: '#EFF6FF', border: '1.5px solid #38BDF8', borderRadius: '20px', padding: '3px 14px', gap: '8px', boxShadow: '0 2px 6px rgba(2,132,199,0.15)', zIndex: 3 }}>
            <span style={{ fontSize: '0.72rem', color: '#0369A1', fontWeight: 700 }}>
              Memória <MathView math="h_1" /> ({h1.toFixed(2)}) flui para o Passo 2:
            </span>
            <span style={{ background: '#FFFFFF', border: '1px solid #93C5FD', padding: '1px 6px', borderRadius: '4px', fontSize: '0.72rem', fontWeight: 800, color: '#1D4ED8' }}>
              × {w2} (w₂) = {rec2.toFixed(2)}
            </span>
            <span style={{ color: '#0284C7', fontWeight: 800 }}>⬇ entra no `sum` do Passo 2</span>
          </div>
        </div>

        {/* ROW 2: Timestep t=2 */}
        <div style={{ position: 'relative', background: activeStep === 2 ? '#F0F9FF' : '#FAFAFA', border: activeStep === 2 ? '1.5px solid #0284C7' : '1px solid #E2E8F0', borderRadius: '8px', padding: '8px 12px' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 800, color: '#0A345D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Passo 2 (t = 2) • Recebe <MathView math="h_1" /> como Contexto do Passado
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
              Mesmos Pesos: <MathView math={`w_1=${w1}, w_2=${w2}, w_3=${w3}`} />
            </span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            
            {/* Input 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#0E7490' }}>Input</span>
              <div style={{ background: '#E0F2FE', border: '2px solid #0284C7', borderRadius: '6px', padding: '4px 10px', fontSize: '0.85rem', fontWeight: 800, color: '#0369A1', minWidth: '60px', textAlign: 'center' }}>
                {showValues ? x2.toFixed(2) : <MathView math="x_2" />}
              </div>
            </div>

            {/* w1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#0284C7' }}>w₁</span>
              <div style={{ background: '#F0F9FF', border: '1px solid #38BDF8', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#0369A1' }}>
                × {w1}
              </div>
            </div>

            <ArrowRight size={15} color="#0284C7" />

            {/* Sum 2 (Receives w1*x2 + w2*h1) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#475569' }}>b₁ + h₁·w₂</span>
              <div style={{ background: '#FFFBEB', border: '1.5px solid #F59E0B', borderRadius: '6px', padding: '4px 8px', fontSize: '0.76rem', fontWeight: 800, color: '#92400E', textAlign: 'center' }}>
                sum <span style={{ color: '#0284C7' }}>+ {b1.toFixed(1)}</span>
                {showValues && <div style={{ fontSize: '0.68rem', color: '#92400E' }}>={sum2.toFixed(2)}</div>}
              </div>
            </div>

            <ArrowRight size={15} color="#0284C7" />

            {/* Activation 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#0A345D' }}>Ativação</span>
              <div style={{ background: '#FFFFFF', border: '2px solid #0284C7', borderRadius: '6px', padding: '4px 8px', display: 'flex', alignItems: 'center', gap: '6px', height: '42px', boxShadow: '0 2px 6px rgba(10,52,93,0.08)' }}>
                <svg width="24" height="18" viewBox="0 0 40 24">
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#CBD5E1" strokeWidth="2" />
                  <line x1="20" y1="2" x2="20" y2="22" stroke="#CBD5E1" strokeWidth="2" />
                  <path d="M 4 20 L 20 20 L 36 4" fill="none" stroke="#0284C7" strokeWidth="3" strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0A345D' }}>
                  {showValues ? `h₂ = ${h2.toFixed(2)}` : <MathView math="h_2" />}
                </div>
              </div>
            </div>

            {/* w3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A' }}>w₃</span>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>
                × {w3}
              </div>
            </div>

            <ArrowRight size={15} color="#16A34A" />

            {/* b2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
              <span style={{ fontSize: '0.66rem', fontWeight: 700, color: '#16A34A' }}>b₂</span>
              <div style={{ background: '#F0FDF4', border: '1px solid #86EFAC', borderRadius: '4px', padding: '2px 6px', fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>
                + {b2.toFixed(1)}
              </div>
            </div>

            <ArrowRight size={15} color="#16A34A" />

            {/* Output 2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.68rem', fontWeight: 700, color: '#16A34A' }}>Output</span>
              <div style={{ background: '#DCFCE7', border: '2px solid #16A34A', borderRadius: '6px', padding: '4px 10px', fontSize: '0.85rem', fontWeight: 800, color: '#166534', minWidth: '60px', textAlign: 'center' }}>
                {showValues ? y2.toFixed(2) : <MathView math="\hat{y}_2" />}
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* Bottom Insights: 3 Educational Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A345D', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Repeat size={14} color="#0284C7" /> 1. Pesos Compartilhados
          </div>
          <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: '1.35' }}>
            Os pesos <MathView math="w_1, w_2, w_3" /> são rigorosamente os mesmos em todas as etapas temporais. A rede não cria novos neurônios, ela reutiliza a mesma fórmula!
          </div>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A345D', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Layers size={14} color="#16A34A" /> 2. O Elo de Ligação (<MathView math="h_t" />)
          </div>
          <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: '1.35' }}>
            O vetor de estado oculto <MathView math="h_t" /> é o único canal de comunicação que viaja entre o passado e o futuro, resumindo todo o histórico até aquele instante.
          </div>
        </div>

        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '8px 12px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A345D', marginBottom: '3px', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <Sparkles size={14} color="#FF7043" /> 3. Deep Neural Net no Tempo
          </div>
          <div style={{ fontSize: '0.72rem', color: '#475569', lineHeight: '1.35' }}>
            Ao desenrolar a rede no tempo, percebemos que uma RNN para uma sequência de 30 dias se comporta como uma rede densa de 30 camadas profundas conectadas!
          </div>
        </div>
      </div>

    </div>
  );
}
