import React, { useState } from 'react';

export default function VennDiagram() {
  const [activeZone, setActiveZone] = useState('dl');

  const zones = {
    ai: {
      title: 'Inteligência Artificial (IA)',
      color: '#0A345D',
      bg: '#E0F2FE',
      desc: 'O campo abrangente focado na criação de máquinas capazes de simular o comportamento inteligente humano.',
      examples: ['Sistemas Especialistas', 'Algoritmos Genéticos', 'Lógica Fuzzy', 'Machine Learning']
    },
    ml: {
      title: 'Machine Learning (ML)',
      color: '#0284C7',
      bg: '#BAE6FD',
      desc: 'Subconjunto da IA onde algoritmos aprendem regras a partir de dados em vez de serem explicitamente programados.',
      examples: ['Regressão Linear/Logística', 'Árvores de Decisão & Random Forest', 'SVM', 'K-Means']
    },
    dl: {
      title: 'Deep Learning (DL)',
      color: '#1BB5D8',
      bg: '#7DD3FC',
      desc: 'Subcampo do ML baseado em Redes Neurais Profundas com múltiplas camadas que aprendem hierarquias de representação.',
      examples: ['Perceptrons & MLPs', 'Redes Convolucionais (CNNs)', 'Transformers (GPT, BERT)', 'Autoencoders']
    }
  };

  const current = zones[activeZone];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '28px', height: '100%', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', minHeight: '460px' }}>
        {/* Outer Circle: IA */}
        <div 
          onClick={() => setActiveZone('ai')}
          style={{
            width: '450px',
            height: '450px',
            borderRadius: '50%',
            background: 'rgba(10, 52, 93, 0.12)',
            border: activeZone === 'ai' ? '5px solid #0A345D' : '3px dashed #0A345D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '20px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <span style={{ fontWeight: '800', color: '#0A345D', fontSize: '1.25rem' }}>
            Inteligência Artificial (IA)
          </span>

          {/* Middle Circle: ML */}
          <div 
            onClick={(e) => { e.stopPropagation(); setActiveZone('ml'); }}
            style={{
              width: '320px',
              height: '320px',
              borderRadius: '50%',
              background: 'rgba(2, 132, 199, 0.22)',
              border: activeZone === 'ml' ? '5px solid #0284C7' : '3px dashed #0284C7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: '18px',
              cursor: 'pointer',
              marginTop: '16px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontWeight: '800', color: '#0284C7', fontSize: '1.15rem' }}>
              Machine Learning (ML)
            </span>

            {/* Inner Circle: DL */}
            <div 
              onClick={(e) => { e.stopPropagation(); setActiveZone('dl'); }}
              style={{
                width: '190px',
                height: '190px',
                borderRadius: '50%',
                background: activeZone === 'dl' ? '#1BB5D8' : 'rgba(27, 181, 216, 0.85)',
                boxShadow: activeZone === 'dl' ? '0 0 25px rgba(27, 181, 216, 0.7)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '1.15rem',
                textAlign: 'center',
                cursor: 'pointer',
                marginTop: '14px',
                padding: '12px',
                transition: 'all 0.2s ease'
              }}
            >
              Deep Learning (DL)
            </div>
          </div>
        </div>

        <span style={{ fontSize: '0.98rem', color: '#64748B', marginTop: '16px', fontWeight: '600' }}>
          💡 Clique em qualquer círculo para detalhar o conceito!
        </span>
      </div>

      {/* Info Card */}
      <div className="content-card" style={{ borderColor: current.color, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '32px' }}>
        <div style={{ display: 'inline-block', background: current.bg, color: current.color, padding: '6px 16px', borderRadius: '20px', fontWeight: '800', fontSize: '1.05rem', width: 'fit-content', marginBottom: '14px' }}>
          MÓDULO SELECIONADO
        </div>
        <h3 style={{ color: current.color, fontSize: '1.85rem', fontWeight: '800', marginBottom: '14px' }}>
          {current.title}
        </h3>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', color: '#334155', marginBottom: '22px' }}>
          {current.desc}
        </p>

        <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px 20px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '1.05rem', fontWeight: '800', color: '#0A345D', display: 'block', marginBottom: '12px' }}>
            Exemplos Principais:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
            {current.examples.map((item, idx) => (
              <span key={idx} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '6px 14px', borderRadius: '8px', fontSize: '1.02rem', fontWeight: '600', color: '#1E293B' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
