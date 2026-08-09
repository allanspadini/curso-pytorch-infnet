import React, { useState } from 'react';
import MathView from '../MathView';

export default function AutogradGraphVisualizer() {
  const [x, setX] = useState(2.0);
  const [w, setW] = useState(3.0);
  const [b, setB] = useState(1.0);
  const [targetY, setTargetY] = useState(0.0);
  const [activeStep, setActiveStep] = useState('forward'); // 'forward' or 'backward'

  // Forward calculations
  // 1. Combination z = w*x + b
  const z = w * x + b;
  // 2. Network Output \hat{y} = z
  const yHat = z;
  // 3. Loss / Error Norm L = (\hat{y} - y)^2
  const diff = yHat - targetY;
  const loss = diff * diff;

  // Analytical Gradients (Backpropagation / Autograd for Trainable Parameters w and b)
  // dL/d\hat{y} = 2 * (\hat{y} - y)
  // d\hat{y}/dz = 1
  // dz/dw = x, dz/db = 1
  // dL/dw = (dL/d\hat{y}) * (dz/dw) = 2 * diff * x
  // dL/db = (dL/d\hat{y}) * (dz/db) = 2 * diff * 1
  const dL_dyHat = 2 * diff;
  const dL_dw = dL_dyHat * x;
  const dL_db = dL_dyHat * 1;

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
            ⚡ Grafo de Computação (DAG): Da Entrada à Saída (ŷ) e à Função de Perda (L)
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Ajuste a entrada (x), peso (w) e meta real (y) para ver o cálculo dos gradientes dos parâmetros treináveis.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={() => setActiveStep('forward')}
            style={{ 
              padding: '6px 16px', 
              borderRadius: '20px', 
              border: 'none', 
              background: activeStep === 'forward' ? '#1BB5D8' : '#E2E8F0',
              color: activeStep === 'forward' ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Passagem Direta (Forward →)
          </button>
          <button 
            onClick={() => setActiveStep('backward')}
            style={{ 
              padding: '6px 16px', 
              borderRadius: '20px', 
              border: 'none', 
              background: activeStep === 'backward' ? '#FF7043' : '#E2E8F0',
              color: activeStep === 'backward' ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer'
            }}
          >
            Retropropagação (Backward ←)
          </button>
        </div>
      </div>

      {/* Sliders Area */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', background: '#FFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            Entrada (x): <span>{x.toFixed(1)}</span>
          </label>
          <input type="range" min="-5" max="5" step="0.5" value={x} onChange={(e) => setX(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#1BB5D8' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#7CB342' }}>
            Peso (w): <span>{w.toFixed(1)}</span>
          </label>
          <input type="range" min="-5" max="5" step="0.5" value={w} onChange={(e) => setW(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#7CB342' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#AB47BC' }}>
            Viés (b): <span>{b.toFixed(1)}</span>
          </label>
          <input type="range" min="-5" max="5" step="0.5" value={b} onChange={(e) => setB(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#AB47BC' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#FF7043' }}>
            Meta Real (y): <span>{targetY.toFixed(1)}</span>
          </label>
          <input type="range" min="-5" max="5" step="0.5" value={targetY} onChange={(e) => setTargetY(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#FF7043' }} />
        </div>
      </div>

      {/* DAG Node Graph Layout */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFF', padding: '20px', borderRadius: '12px', border: '1px solid #E2E8F0', position: 'relative' }}>
        
        {/* Leaf Nodes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {/* Input x Node (Fixed feature data, not trainable) */}
          <div style={{ border: '2px solid #1BB5D8', background: '#E0F7FA', padding: '10px 14px', borderRadius: '10px', minWidth: '130px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#0A345D', fontWeight: '700' }}>Entrada (x)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#0A345D' }}>x = {x.toFixed(1)}</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '600', marginTop: '2px' }}>
              Dado Fixo (Não Treinável)
            </div>
          </div>

          {/* Weight w Node (Trainable) */}
          <div style={{ border: '2px solid #7CB342', background: '#F1F8E9', padding: '10px 14px', borderRadius: '10px', minWidth: '130px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#33691E', fontWeight: '700' }}>Peso w (requires_grad)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#33691E' }}>w = {w.toFixed(1)}</div>
            {activeStep === 'backward' ? (
              <div style={{ fontSize: '0.78rem', color: '#FF7043', fontWeight: '800', marginTop: '2px' }}>
                w.grad = {dL_dw.toFixed(1)}
              </div>
            ) : (
              <div style={{ fontSize: '0.7rem', color: '#7CB342', fontWeight: '600', marginTop: '2px' }}>
                Parâmetro Treinável
              </div>
            )}
          </div>

          {/* Bias b Node (Trainable) */}
          <div style={{ border: '2px solid #AB47BC', background: '#F3E5F5', padding: '10px 14px', borderRadius: '10px', minWidth: '130px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.75rem', color: '#4A148C', fontWeight: '700' }}>Viés b (requires_grad)</div>
            <div style={{ fontSize: '1.1rem', fontWeight: '800', color: '#4A148C' }}>b = {b.toFixed(1)}</div>
            {activeStep === 'backward' ? (
              <div style={{ fontSize: '0.78rem', color: '#FF7043', fontWeight: '800', marginTop: '2px' }}>
                b.grad = {dL_db.toFixed(1)}
              </div>
            ) : (
              <div style={{ fontSize: '0.7rem', color: '#AB47BC', fontWeight: '600', marginTop: '2px' }}>
                Parâmetro Treinável
              </div>
            )}
          </div>
        </div>

        {/* Arrow 1 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ fontSize: '1.6rem', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', fontWeight: '900', transition: 'transform 0.3s ease', transform: activeStep === 'backward' ? 'scaleX(-1)' : 'scaleX(1)' }}>
            ➔
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', background: activeStep === 'forward' ? 'rgba(27, 181, 216, 0.1)' : 'rgba(255, 112, 67, 0.1)', padding: '2px 6px', borderRadius: '8px' }}>
            {activeStep === 'forward' ? 'Forward (→)' : 'Backward (←)'}
          </span>
        </div>

        {/* Intermediate Node z */}
        <div style={{ border: '2px solid #0A345D', background: '#F8FAFC', padding: '14px 18px', borderRadius: '12px', minWidth: '130px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#64748B', fontWeight: '700' }}>Soma Ponderada (z)</div>
          <div style={{ fontSize: '0.9rem', fontWeight: '700', color: '#0A345D', margin: '2px 0' }}>
            z = w·x + b
          </div>
          <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0A345D' }}>{z.toFixed(1)}</div>
        </div>

        {/* Arrow 2 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ fontSize: '1.6rem', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', fontWeight: '900', transition: 'transform 0.3s ease', transform: activeStep === 'backward' ? 'scaleX(-1)' : 'scaleX(1)' }}>
            ➔
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', background: activeStep === 'forward' ? 'rgba(27, 181, 216, 0.1)' : 'rgba(255, 112, 67, 0.1)', padding: '2px 6px', borderRadius: '8px' }}>
            {activeStep === 'forward' ? 'Forward (→)' : 'Backward (←)'}
          </span>
        </div>

        {/* Network Output Node (\hat{y}) */}
        <div style={{ border: '2px solid #1BB5D8', background: '#E0F7FA', padding: '14px 18px', borderRadius: '12px', minWidth: '140px', textAlign: 'center' }}>
          <div style={{ fontSize: '0.75rem', color: '#006064', fontWeight: '800' }}>Saída da Rede (ŷ)</div>
          <div style={{ fontSize: '0.85rem', color: '#00838F', fontWeight: '600' }}>Palpite Estimado</div>
          <div style={{ fontSize: '1.3rem', fontWeight: '800', color: '#006064', marginTop: '2px' }}>ŷ = {yHat.toFixed(1)}</div>
          {activeStep === 'backward' && (
            <div style={{ fontSize: '0.75rem', color: '#FF7043', fontWeight: '700', marginTop: '2px' }}>
              dL/dŷ = {dL_dyHat.toFixed(1)}
            </div>
          )}
        </div>

        {/* Arrow 3 */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
          <div style={{ fontSize: '1.6rem', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', fontWeight: '900', transition: 'transform 0.3s ease', transform: activeStep === 'backward' ? 'scaleX(-1)' : 'scaleX(1)' }}>
            ➔
          </div>
          <span style={{ fontSize: '0.7rem', fontWeight: '800', color: activeStep === 'forward' ? '#1BB5D8' : '#FF7043', background: activeStep === 'forward' ? 'rgba(27, 181, 216, 0.1)' : 'rgba(255, 112, 67, 0.1)', padding: '2px 6px', borderRadius: '8px' }}>
            {activeStep === 'forward' ? 'Forward (→)' : 'Backward (←)'}
          </span>
        </div>

        {/* Loss Node (L) */}
        <div style={{ border: '3px solid #FF7043', background: '#FFF3E0', padding: '16px 20px', borderRadius: '14px', minWidth: '150px', textAlign: 'center', boxShadow: '0 4px 14px rgba(255,112,67,0.25)' }}>
          <div style={{ fontSize: '0.75rem', color: '#E65100', fontWeight: '800' }}>Nó de Perda / Loss (L)</div>
          <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#D84315', margin: '2px 0' }}>
            L = (ŷ - y)²
          </div>
          <div style={{ fontSize: '1.4rem', fontWeight: '800', color: '#D84315' }}>L = {loss.toFixed(1)}</div>
          {activeStep === 'backward' && (
            <div style={{ fontSize: '0.75rem', color: '#E65100', fontWeight: '800', marginTop: '4px' }}>
              Loss.backward() acionado!
            </div>
          )}
        </div>
      </div>

      {/* Explanatory Math Summary */}
      <div style={{ background: '#0A345D', color: '#FFF', padding: '16px 20px', borderRadius: '10px', fontSize: '0.88rem', lineHeight: '1.5' }}>
        <strong>🔍 Gradientes dos Parâmetros Treináveis (w e b):</strong>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '8px' }}>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '6px' }}>
            <MathView math="\frac{\partial L}{\partial w} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial z}{\partial w} = 2(\hat{y} - y) \cdot x" block={false} />
            <div style={{ color: '#64D9EF', fontWeight: '800', marginTop: '4px', fontSize: '0.95rem' }}>w.grad = {dL_dw.toFixed(2)} (Ajusta o Peso)</div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.1)', padding: '10px 14px', borderRadius: '6px' }}>
            <MathView math="\frac{\partial L}{\partial b} = \frac{\partial L}{\partial \hat{y}} \cdot \frac{\partial z}{\partial b} = 2(\hat{y} - y) \cdot 1" block={false} />
            <div style={{ color: '#64D9EF', fontWeight: '800', marginTop: '4px', fontSize: '0.95rem' }}>b.grad = {dL_db.toFixed(2)} (Ajusta o Viés)</div>
          </div>
        </div>
        <p style={{ color: '#94A3B8', fontSize: '0.8rem', marginTop: '8px', margin: '8px 0 0 0' }}>
          💡 <em>Nota Didática: A entrada <strong>x</strong> é um dado fixo da amostra do dataset. Ela não possui gradiente de treino e nunca é alterada pelo otimizador.</em>
        </p>
      </div>
    </div>
  );
}
