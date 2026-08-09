import React, { useState } from 'react';

export default function SaasChurnMlpSimulator() {
  // Customer SaaS Input State
  const [tempoContrato, setTempoContrato] = useState(6);      // 1 to 48 months
  const [faturamento, setFaturamento] = useState(149.90);     // $29.90 to $299.90
  const [chamadosSuporte, setChamadosSuporte] = useState(7);  // 0 to 10 calls
  const [diasInativo, setDiasInativo] = useState(18);        // 0 to 30 days

  // Standardize inputs (Z-score mock)
  const normContrato = (tempoContrato - 24) / 12;
  const normFaturamento = (faturamento - 150) / 75;
  const normSuporte = (chamadosSuporte - 4) / 2.5;
  const normInativo = (diasInativo - 10) / 8;

  // Hidden Layer (8 Neurons with ReLU activation)
  // W_hidden weights synthetic simulation
  const hiddenLinear = [
    normSuporte * 0.8 + normInativo * 0.6 - normContrato * 0.4,
    normSuporte * 1.1 + normInativo * 0.9,
    normContrato * 0.9 - normInativo * 0.7,
    normFaturamento * 0.5 - normSuporte * 0.6,
    normInativo * 1.2 + normSuporte * 0.4 - 0.2,
    -normContrato * 1.0 - normSuporte * 0.5,
    normSuporte * 0.7 + normInativo * 0.8 + normFaturamento * 0.3,
    normInativo * 0.9 - normContrato * 0.8
  ];

  const hiddenRelu = hiddenLinear.map(val => Math.max(0, val));

  // Output Layer (1 Neuron with Sigmoid activation)
  const zOutput = hiddenRelu.reduce((acc, curr, idx) => acc + curr * (idx % 2 === 0 ? 0.35 : 0.25), -0.5);
  const probChurn = 1 / (1 + Math.exp(-zOutput));
  const probPercent = Math.round(probChurn * 100);

  // Risk Status
  let riskLabel = 'BAIXO RISCO DE CHURN';
  let riskBg = '#DCFCE7';
  let riskColor = '#15803D';
  let riskBorder = '#86EFAC';

  if (probPercent >= 40 && probPercent < 70) {
    riskLabel = 'MÉDIO RISCO DE CHURN';
    riskBg = '#FEF9C3';
    riskColor = '#A16207';
    riskBorder = '#FDE047';
  } else if (probPercent >= 70) {
    riskLabel = 'ALTO RISCO DE CHURN!';
    riskBg = '#FEE2E2';
    riskColor = '#B91C1C';
    riskBorder = '#FCA5A5';
  }

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '22px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '18px' }}>
      <div>
        <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
          🏢 Simulador da MLP de Churn de Clientes SaaS (Telco)
        </h3>
        <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
          Altere as métricas do cliente abaixo e veja a ativação da camada oculta (ReLU) e a predição da camada de saída (Sigmoid).
        </p>
      </div>

      {/* Customer Sliders Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', background: '#FFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            Tempo Contrato: <span>{tempoContrato}m</span>
          </label>
          <input type="range" min="1" max="48" value={tempoContrato} onChange={(e) => setTempoContrato(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#1BB5D8' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            Faturamento: <span>R$ {faturamento.toFixed(0)}</span>
          </label>
          <input type="range" min="29.9" max="299.9" step="10" value={faturamento} onChange={(e) => setFaturamento(parseFloat(e.target.value))} style={{ width: '100%', accentColor: '#7CB342' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            Chamados Suporte: <span>{chamadosSuporte}</span>
          </label>
          <input type="range" min="0" max="10" value={chamadosSuporte} onChange={(e) => setChamadosSuporte(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#FF7043' }} />
        </div>
        <div>
          <label style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: '700', color: '#0A345D' }}>
            Dias Inativo: <span>{diasInativo}d</span>
          </label>
          <input type="range" min="0" max="30" value={diasInativo} onChange={(e) => setDiasInativo(parseInt(e.target.value))} style={{ width: '100%', accentColor: '#AB47BC' }} />
        </div>
      </div>

      {/* Network Layers Visualizer */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.6fr 1fr', gap: '16px', alignItems: 'center', background: '#FFF', padding: '20px', borderRadius: '14px', border: '1px solid #E2E8F0' }}>
        
        {/* Layer 1: Inputs */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0A345D', textAlign: 'center', textTransform: 'uppercase' }}>Entrada (4 Features)</div>
          <div style={{ background: '#E0F7FA', border: '1px solid #1BB5D8', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Contrato: {tempoContrato}m</div>
          <div style={{ background: '#F1F8E9', border: '1px solid #7CB342', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Faturam.: R$ {faturamento.toFixed(0)}</div>
          <div style={{ background: '#FBE9E7', border: '1px solid #FF7043', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Suporte: {chamadosSuporte} cham.</div>
          <div style={{ background: '#F3E5F5', border: '1px solid #AB47BC', padding: '6px 10px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: '600' }}>Inativo: {diasInativo}d</div>
        </div>

        {/* Layer 2: Hidden Layer (8 Neurons) */}
        <div>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0A345D', textAlign: 'center', textTransform: 'uppercase', marginBottom: '8px' }}>Camada Oculta (8 Neurônios ReLU)</div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '8px' }}>
            {hiddenRelu.map((val, idx) => {
              const isActive = val > 0;
              return (
                <div 
                  key={idx}
                  style={{
                    background: isActive ? '#E0F2FE' : '#F1F5F9',
                    border: isActive ? '2px solid #0284C7' : '1px solid #CBD5E1',
                    borderRadius: '8px',
                    padding: '8px',
                    textAlign: 'center',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div style={{ fontSize: '0.7rem', color: '#64748B', fontWeight: '700' }}>h{idx + 1}</div>
                  <div style={{ fontSize: '0.85rem', fontWeight: '800', color: isActive ? '#0369A1' : '#94A3B8' }}>
                    {val.toFixed(2)}
                  </div>
                  <div style={{ fontSize: '0.6rem', color: isActive ? '#0284C7' : '#94A3B8', fontWeight: '700', marginTop: '2px' }}>
                    {isActive ? 'ATIVADO' : 'INATIVO'}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layer 3: Output (Sigmoid & Prediction) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center' }}>
          <div style={{ fontSize: '0.75rem', fontWeight: '800', color: '#0A345D', textAlign: 'center', textTransform: 'uppercase' }}>Saída (Sigmoid)</div>
          <div style={{ background: riskBg, border: `2px solid ${riskBorder}`, padding: '16px', borderRadius: '12px', textAlign: 'center', width: '100%' }}>
            <div style={{ fontSize: '0.75rem', color: riskColor, fontWeight: '800' }}>PROBABILIDADE DE CHURN</div>
            <div style={{ fontSize: '2.2rem', fontWeight: '900', color: riskColor, margin: '4px 0' }}>
              {probPercent}%
            </div>
            <div style={{ background: riskColor, color: '#FFF', padding: '4px 8px', borderRadius: '12px', fontSize: '0.7rem', fontWeight: '800' }}>
              {riskLabel}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
