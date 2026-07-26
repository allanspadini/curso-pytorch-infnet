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
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: '24px', height: '100%', alignItems: 'center' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', height: '340px' }}>
        {/* Outer Circle: IA */}
        <div 
          onClick={() => setActiveZone('ai')}
          style={{
            width: '320px',
            height: '320px',
            borderRadius: '50%',
            background: 'rgba(10, 52, 93, 0.15)',
            border: activeZone === 'ai' ? '4px solid #0A345D' : '2px dashed #0A345D',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            paddingTop: '16px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <span style={{ fontWeight: '800', color: '#0A345D', fontSize: '0.95rem' }}>Inteligência Artificial (IA)</span>

          {/* Middle Circle: ML */}
          <div 
            onClick={(e) => { e.stopPropagation(); setActiveZone('ml'); }}
            style={{
              width: '230px',
              height: '230px',
              borderRadius: '50%',
              background: 'rgba(2, 132, 199, 0.25)',
              border: activeZone === 'ml' ? '4px solid #0284C7' : '2px dashed #0284C7',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'flex-start',
              paddingTop: '14px',
              cursor: 'pointer',
              marginTop: '12px',
              transition: 'all 0.2s ease'
            }}
          >
            <span style={{ fontWeight: '800', color: '#0284C7', fontSize: '0.9rem' }}>Machine Learning</span>

            {/* Inner Circle: DL */}
            <div 
              onClick={(e) => { e.stopPropagation(); setActiveZone('dl'); }}
              style={{
                width: '140px',
                height: '140px',
                borderRadius: '50%',
                background: activeZone === 'dl' ? '#1BB5D8' : 'rgba(27, 181, 216, 0.8)',
                boxShadow: activeZone === 'dl' ? '0 0 20px rgba(27, 181, 216, 0.6)' : 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: '800',
                fontSize: '0.9rem',
                textAlign: 'center',
                cursor: 'pointer',
                marginTop: '10px',
                padding: '8px',
                transition: 'all 0.2s ease'
              }}
            >
              Deep Learning
            </div>
          </div>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '12px' }}>
          💡 Clique nas camadas do diagrama para explorar cada conceito!
        </span>
      </div>

      {/* Info Card */}
      <div className="content-card" style={{ borderColor: current.color, height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ display: 'inline-block', background: current.bg, color: current.color, padding: '4px 12px', borderRadius: '20px', fontWeight: '800', fontSize: '0.85rem', width: 'fit-content', marginBottom: '12px' }}>
          MÓDULO SELECIONADO
        </div>
        <h3 style={{ color: current.color, fontSize: '1.5rem', fontWeight: '700', marginBottom: '12px' }}>
          {current.title}
        </h3>
        <p style={{ fontSize: '0.98rem', lineHeight: '1.6', color: '#334155', marginBottom: '16px' }}>
          {current.desc}
        </p>

        <div style={{ background: '#F8FAFC', borderRadius: '8px', padding: '12px 16px', border: '1px solid #E2E8F0' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: '700', color: '#0A345D', display: 'block', marginBottom: '8px' }}>
            Exemplos Principais:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {current.examples.map((item, idx) => (
              <span key={idx} style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: '600', color: '#1E293B' }}>
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
