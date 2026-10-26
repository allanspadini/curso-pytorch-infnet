import React from 'react';
import { ShieldCheck, CheckCircle2, RefreshCw, Database } from 'lucide-react';

export const AnomalyDetectionStepsDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #061F38 0%, #0A345D 100%)',
      borderRadius: '10px',
      padding: '14px 20px',
      boxShadow: '0 6px 18px rgba(6, 31, 56, 0.25)',
      border: '1px solid rgba(124, 179, 66, 0.3)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {/* Header Banner: Premisa Central */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(124, 179, 66, 0.12)',
        padding: '6px 12px',
        borderRadius: '6px',
        border: '1px solid rgba(124, 179, 66, 0.25)',
        fontSize: '0.78rem'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700', color: '#AED581' }}>
          <ShieldCheck size={16} color="#7CB342" />
          Premissa Fundamental: Treinamento Exclusivamente com Imagens Normais
        </div>
        <span style={{ fontSize: '0.7rem', color: '#C8E6C9', background: '#2E7D32', padding: '2px 8px', borderRadius: '10px', fontWeight: '700' }}>
          Sem Exemplos de Defeito no Treino
        </span>
      </div>

      {/* Main Flow: Entrada Normal ➔ Autoencoder ➔ Reconstrução Perfeita */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        padding: '12px 16px',
        borderRadius: '8px',
        border: '1px dashed #A5D6A7'
      }}>
        {/* 1. Entrada de Dados Normais */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '130px' }}>
          <div style={{
            background: '#0A345D',
            color: '#FFF',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <Database size={13} color="#64D9EF" />
            Entrada (X Normal)
          </div>
          {/* SVG Sample Normal Gear / Image */}
          <div style={{ marginTop: '8px' }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <rect width="70" height="70" rx="6" fill="#0B0F19" />
              {/* Outer clean green gear/disk */}
              <circle cx="35" cy="35" r="26" fill="#1E293B" stroke="#7CB342" strokeWidth="3" />
              <circle cx="35" cy="35" r="14" fill="#0A345D" stroke="#64D9EF" strokeWidth="2" />
              <circle cx="35" cy="35" r="5" fill="#7CB342" />
            </svg>
          </div>
          <span style={{ fontSize: '0.65rem', color: '#2E7D32', fontWeight: '700', marginTop: '4px' }}>
            ✓ 100% Saudável / Sem Falhas
          </span>
        </div>

        {/* 2. Pipeline do Autoencoder Funnel */}
        <div style={{ flex: 1, margin: '0 12px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ fontSize: '0.7rem', color: '#0A345D', fontWeight: '700', marginBottom: '4px' }}>
            Aprendizado do Manifold Normal: f(X) ➔ X̂
          </div>
          <svg width="100%" height="55" viewBox="0 0 240 55" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="normEncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1BB5D8" />
                <stop offset="100%" stopColor="#0A345D" />
              </linearGradient>
              <linearGradient id="normZGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7CB342" />
                <stop offset="100%" stopColor="#2E7D32" />
              </linearGradient>
              <linearGradient id="normDecGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A345D" />
                <stop offset="100%" stopColor="#7CB342" />
              </linearGradient>
            </defs>

            {/* Encoder */}
            <polygon points="10,5 75,18 75,37 10,50" fill="url(#normEncGrad)" />
            <text x="42" y="30" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">Encoder</text>

            {/* Bottleneck Z */}
            <rect x="80" y="16" width="80" height="23" rx="4" fill="url(#normZGrad)" stroke="#FFF" strokeWidth="1" />
            <text x="120" y="30" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">Espaço Latente Z</text>

            {/* Decoder */}
            <polygon points="165,18 230,5 230,50 165,37" fill="url(#normDecGrad)" />
            <text x="198" y="30" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">Decoder</text>
          </svg>
          <span style={{ fontSize: '0.65rem', color: '#64748B', fontStyle: 'italic' }}>
            Ajusta pesos para reconstruir perfeitamente o padrão normal
          </span>
        </div>

        {/* 3. Reconstrução Perfeita */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '130px' }}>
          <div style={{
            background: '#E8F5E9',
            border: '1px solid #A5D6A7',
            color: '#2E7D32',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <CheckCircle2 size={13} color="#2E7D32" />
            Reconstrução (X̂)
          </div>
          {/* SVG Reconstructed Normal Sample */}
          <div style={{ marginTop: '8px' }}>
            <svg width="70" height="70" viewBox="0 0 70 70">
              <rect width="70" height="70" rx="6" fill="#0B0F19" />
              <circle cx="35" cy="35" r="26" fill="#1E293B" stroke="#7CB342" strokeWidth="3" />
              <circle cx="35" cy="35" r="14" fill="#0A345D" stroke="#64D9EF" strokeWidth="2" />
              <circle cx="35" cy="35" r="5" fill="#7CB342" />
            </svg>
          </div>
          <span style={{ fontSize: '0.65rem', color: '#2E7D32', fontWeight: '700', marginTop: '4px' }}>
            Erro MSE ≈ 0 (Reconstrução Fiel)
          </span>
        </div>
      </div>
    </div>
  );
};
