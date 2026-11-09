import React from 'react';
import MathView from '../MathView';

export default function BackpropagationExplodedView() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.15fr 0.85fr', gap: '20px', height: '100%', alignItems: 'stretch' }}>
      {/* Left Column: Intuitive Core Concept */}
      <div style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #CBD5E1', padding: '22px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxShadow: 'var(--shadow-sm)' }}>
        <div>
          <span style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0E7490', background: 'rgba(27,181,216,0.15)', padding: '3px 10px', borderRadius: '12px' }}>
            INTUIÇÃO CENTRAL DO TREINAMENTO
          </span>
          <h3 style={{ color: '#0A345D', fontSize: '1.25rem', fontWeight: '800', marginTop: '6px', marginBottom: '14px' }}>
            Como os Pesos Aprendem a Cada Época
          </h3>

          {/* Block 1: Error Difference */}
          <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderLeft: '5px solid #0284C7', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0A345D', marginBottom: '4px' }}>
              1. DIFERENÇA DIRETA (ERRO DA REDE)
            </div>
            <div style={{ fontSize: '1.25rem', color: '#0A345D', margin: '4px 0', textAlign: 'center' }}>
              <MathView math="e = y - \hat{y}" block={false} />
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', textAlign: 'center' }}>
              Erro = (Valor Conhecido no Treino) − (Valor Estimado pela Rede)
            </div>
          </div>

          {/* Block 2: Weight Update */}
          <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderLeft: '5px solid #7CB342', borderRadius: '10px', padding: '14px', marginBottom: '14px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#2E7D32', marginBottom: '4px' }}>
              2. ATUALIZAÇÃO DO PESO
            </div>
            <div style={{ fontSize: '1.25rem', color: '#0A345D', margin: '4px 0', textAlign: 'center' }}>
              <MathView math="w_{\text{novo}} = w_{\text{antigo}} + \Delta w" block={false} />
            </div>
            <div style={{ fontSize: '0.82rem', color: '#64748B', textAlign: 'center' }}>
              O peso novo é o peso anterior corrigido pelo ajuste <MathView math="\Delta w" block={false} />
            </div>
          </div>
        </div>

        {/* 3 mini cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontWeight: '800', color: '#0A345D', fontSize: '0.9rem' }}>
              <MathView math="y - \hat{y}" block={false} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
              Se o erro for zero, o peso não muda.
            </div>
          </div>

          <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontWeight: '800', color: '#0E7490', fontSize: '0.9rem' }}>
              <MathView math="\eta \text{ (LR)}" block={false} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
              Taxa de aprendizado: tamanho do passo.
            </div>
          </div>

          <div style={{ background: '#F1F5F9', borderRadius: '8px', padding: '10px', textAlign: 'center' }}>
            <div style={{ fontWeight: '800', color: '#2E7D32', fontSize: '0.9rem' }}>
              <MathView math="w_{\text{novo}}" block={false} />
            </div>
            <div style={{ fontSize: '0.75rem', color: '#475569', marginTop: '4px' }}>
              Reduz o erro na tentativa seguinte.
            </div>
          </div>
        </div>
      </div>

      {/* Right Column: Formal Calculation of Delta w in a Separate Corner */}
      <div className="content-card" style={{ border: '2px solid #1BB5D8', background: '#F0FDF4', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '20px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: '#15803D', background: '#DCFCE7', padding: '3px 8px', borderRadius: '10px' }}>
              📐 CANTO DE CÁLCULO FORMAL
            </span>
          </div>

          <h4 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: '800', marginBottom: '8px' }}>
            Como o Ajuste (Δw) é Calculado?
          </h4>

          <p style={{ fontSize: '0.84rem', color: '#334155', lineHeight: '1.45', marginBottom: '12px' }}>
            O ajuste não é um chute arbitrário: ele é derivado formalmente pela <strong>Regra da Cadeia</strong> a partir da perda:
          </p>

          {/* Formula box */}
          <div style={{ background: '#FFFFFF', border: '1px solid #86EFAC', borderRadius: '10px', padding: '12px', marginBottom: '12px', boxShadow: 'var(--shadow-sm)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: '700', color: '#15803D', marginBottom: '4px' }}>
              FÓRMULA EXATA DO AJUSTE:
            </div>
            <div style={{ fontSize: '1.05rem', color: '#0A345D', textAlign: 'center', margin: '4px 0' }}>
              <MathView math="\Delta w = - \eta \cdot \frac{\partial L}{\partial w}" block={false} />
            </div>
            <div style={{ fontSize: '0.95rem', color: '#0A345D', textAlign: 'center', margin: '4px 0' }}>
              <MathView math="\Delta w = \eta \cdot (y - \hat{y}) \cdot f'(z) \cdot x" block={false} />
            </div>
          </div>

          {/* Factors list */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '0.8rem', color: '#1E293B' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
              <span style={{ fontWeight: '800', color: '#0A345D', minWidth: '55px' }}>
                <MathView math="(y - \hat{y})" block={false} />
              </span>
              <span>Tamanho e sinal do erro cometido na saída.</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
              <span style={{ fontWeight: '800', color: '#0A345D', minWidth: '55px' }}>
                <MathView math="f'(z)" block={false} />
              </span>
              <span>Derivada da ativação: modula a sensibilidade do neurônio.</span>
            </div>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'baseline' }}>
              <span style={{ fontWeight: '800', color: '#0A345D', minWidth: '55px' }}>
                <MathView math="x" block={false} />
              </span>
              <span>Intensidade da entrada que participou da conexão.</span>
            </div>
          </div>
        </div>

        {/* PyTorch Autograd badge */}
        <div style={{ background: '#FFFFFF', borderRadius: '8px', padding: '10px', border: '1px solid #CBD5E1', marginTop: '10px' }}>
          <div style={{ fontSize: '0.78rem', color: '#0A345D', fontWeight: '700' }}>
            ⚙️ <strong>No PyTorch:</strong> O mecanismo do <code>loss.backward()</code> calcula essa derivada para milhões de conexões automaticamente!
          </div>
        </div>
      </div>
    </div>
  );
}
