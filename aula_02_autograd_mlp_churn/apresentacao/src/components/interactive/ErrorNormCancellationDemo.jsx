import React, { useState } from 'react';
import MathView from '../MathView';

export default function ErrorNormCancellationDemo() {
  const [useNorm, setUseNorm] = useState(true);

  // Sample 1: Target = 1.0 (Churn), Pred = 0.4 -> diff = -0.6
  // Sample 2: Target = 0.0 (Ativo), Pred = 0.6 -> diff = +0.6
  const e1 = -0.6;
  const e2 = 0.6;

  const resultWithoutNorm = e1 + e2; // 0.0 !
  const resultWithNorm = Math.abs(e1) + Math.abs(e2); // 1.2 !

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif', margin: 0 }}>
            ⚠️ A Armadilha do Cancelamento: Por Que a Norma é Obrigatória?
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem', margin: '4px 0 0 0' }}>
            Compare o cálculo do erro sem a norma vs. com a norma em duas amostras com desvios opostos.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button
            onClick={() => setUseNorm(false)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              background: !useNorm ? '#FF7043' : '#E2E8F0',
              color: !useNorm ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ❌ Soma Sem Norma (Perigoso)
          </button>
          <button
            onClick={() => setUseNorm(true)}
            style={{
              padding: '8px 18px',
              borderRadius: '20px',
              border: 'none',
              background: useNorm ? '#7CB342' : '#E2E8F0',
              color: useNorm ? '#FFF' : '#334155',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.9rem'
            }}
          >
            ✅ Com Norma do Erro (Correto)
          </button>
        </div>
      </div>

      {/* Samples Comparison Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Sample A */}
        <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '800', color: '#0A345D' }}>Cliente A (Falta de Acesso)</span>
            <span style={{ background: '#FFE0B2', color: '#E65100', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>Cancelou (y₁ = 1.0)</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '8px' }}>
            Palpite do Modelo (ŷ₁): <strong>0.40 (40%)</strong>
          </div>
          <div style={{ background: '#FFF3E0', padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '700', color: '#D84315' }}>
            Erro Simples: (ŷ₁ - y₁) = 0.40 - 1.00 = <span style={{ color: '#C62828' }}>-0.60</span>
          </div>
        </div>

        {/* Sample B */}
        <div style={{ background: '#FFF', padding: '16px', borderRadius: '12px', border: '1px solid #E2E8F0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontWeight: '800', color: '#0A345D' }}>Cliente B (Cliente Ativo)</span>
            <span style={{ background: '#C8E6C9', color: '#2E7D32', padding: '2px 8px', borderRadius: '4px', fontSize: '0.8rem', fontWeight: '700' }}>Ativo (y₂ = 0.0)</span>
          </div>
          <div style={{ fontSize: '0.9rem', color: '#475569', marginBottom: '8px' }}>
            Palpite do Modelo (ŷ₂): <strong>0.60 (60%)</strong>
          </div>
          <div style={{ background: '#E8F5E9', padding: '8px 12px', borderRadius: '6px', fontSize: '0.9rem', fontWeight: '700', color: '#2E7D32' }}>
            Erro Simples: (ŷ₂ - y₂) = 0.60 - 0.00 = <span style={{ color: '#1565C0' }}>+0.60</span>
          </div>
        </div>
      </div>

      {/* Result Display Box */}
      <div
        style={{
          background: useNorm ? '#F1F8E9' : '#FBE9E7',
          border: `2px solid ${useNorm ? '#7CB342' : '#FF7043'}`,
          borderRadius: '12px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '12px',
          transition: 'all 0.3s ease'
        }}
      >
        <div style={{ fontSize: '1rem', fontWeight: '700', color: '#0A345D' }}>
          {useNorm ? 'CÁLCULO COM A NORMA DA DISTÂNCIA (ABSOLUTA/QUADRÁTICA):' : 'CÁLCULO DIRETO SEM NORMA (SOMA DAS DIFERENÇAS):'}
        </div>

        <div style={{ fontSize: '1.4rem', fontWeight: '800' }}>
          {useNorm ? (
            <MathView math="\\text{Erro Total} = |-0.60| + |+0.60| = 0.60 + 0.60 = 1.20" block={false} />
          ) : (
            <MathView math="\\text{Erro Total} = (-0.60) + (+0.60) = 0.00" block={false} />
          )}
        </div>

        <div
          style={{
            padding: '10px 18px',
            borderRadius: '20px',
            background: useNorm ? '#7CB342' : '#FF7043',
            color: '#FFF',
            fontWeight: '800',
            fontSize: '0.95rem'
          }}
        >
          {useNorm
            ? '✅ DIAGNÓSTICO CORRETO: Erro Total = 1.20! A rede percebe o defeito e dispara o ajuste dos pesos.'
            : '❌ ILUSÃO PERIGOSA: Erro Total = 0.00! O modelo acha que está perfeito quando errou ambos os clientes!'}
        </div>
      </div>
    </div>
  );
}
