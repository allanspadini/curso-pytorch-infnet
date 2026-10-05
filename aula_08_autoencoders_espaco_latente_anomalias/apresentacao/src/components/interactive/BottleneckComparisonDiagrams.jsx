import React from 'react';
import { Filter, Copy, AlertTriangle, CheckCircle, ArrowRight } from 'lucide-react';

export const EffectiveCompressionDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E9 100%)',
      border: '1px solid #A5D6A7',
      borderRadius: '10px',
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 2px 6px rgba(124, 179, 66, 0.1)'
    }}>
      <div style={{
        background: '#FFFFFF',
        padding: '8px 10px',
        borderRadius: '8px',
        border: '1px dashed #81C784',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* SVG Funnel for Effective Compression */}
        <svg width="100%" height="75" viewBox="0 0 280 75" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="effEncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1BB5D8" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#0A345D" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="effZGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#7CB342" />
              <stop offset="100%" stopColor="#388E3C" />
            </linearGradient>
            <linearGradient id="effDecGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#0A345D" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#7CB342" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Input block */}
          <rect x="5" y="8" width="30" height="58" rx="4" fill="#0A345D" />
          <text x="20" y="34" fill="#64D9EF" fontSize="9" fontWeight="bold" textAnchor="middle">Input</text>
          <text x="20" y="46" fill="#FFFFFF" fontSize="8" textAnchor="middle">4096</text>

          {/* Encoder funnel narrowing down */}
          <polygon points="38,8  105,26  105,48  38,58" fill="url(#effEncGrad)" />
          <text x="70" y="36" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Encoder 🗜️</text>

          {/* Bottleneck Z - Narrow compressed bar */}
          <rect x="108" y="24" width="64" height="26" rx="6" fill="url(#effZGrad)" stroke="#FFF" strokeWidth="1.5" />
          <text x="140" y="36" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Z = 128</text>
          <text x="140" y="45" fill="#DCEDC8" fontSize="7" textAnchor="middle">Gargalo (32:1)</text>

          {/* Decoder funnel expanding back */}
          <polygon points="175,26  242,8  242,58  175,48" fill="url(#effDecGrad)" />
          <text x="208" y="36" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Decoder 📢</text>

          {/* Output block */}
          <rect x="245" y="8" width="30" height="58" rx="4" fill="#2E7D32" />
          <text x="260" y="34" fill="#DCEDC8" fontSize="9" fontWeight="bold" textAnchor="middle">Output</text>
          <text x="260" y="46" fill="#FFFFFF" fontSize="8" textAnchor="middle">4096</text>
        </svg>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(124, 179, 66, 0.15)',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '0.72rem',
        color: '#1B5E20',
        fontWeight: '600'
      }}>
        <CheckCircle size={14} color="#2E7D32" />
        <span>Gargalo Estreito: Força filtragem de ruído e abstração semântica.</span>
      </div>
    </div>
  );
};

export const OverparametrizedDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF3E0 0%, #FFE0B2 100%)',
      border: '1px solid #FFCCBC',
      borderRadius: '10px',
      padding: '10px 12px',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px',
      boxShadow: '0 2px 6px rgba(255, 112, 67, 0.1)'
    }}>
      <div style={{
        background: '#FFFFFF',
        padding: '8px 10px',
        borderRadius: '8px',
        border: '1px dashed #FFAB91',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* SVG Funnel for Overparameterization (No Bottleneck) */}
        <svg width="100%" height="75" viewBox="0 0 280 75" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="overEncGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#FF7043" stopOpacity="0.85" />
              <stop offset="100%" stopColor="#D84315" stopOpacity="0.95" />
            </linearGradient>
            <linearGradient id="overZGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#E65100" />
              <stop offset="100%" stopColor="#BF360C" />
            </linearGradient>
            <linearGradient id="overDecGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#D84315" stopOpacity="0.95" />
              <stop offset="100%" stopColor="#FF7043" stopOpacity="0.85" />
            </linearGradient>
          </defs>

          {/* Input block */}
          <rect x="5" y="16" width="30" height="42" rx="4" fill="#0A345D" />
          <text x="20" y="34" fill="#64D9EF" fontSize="9" fontWeight="bold" textAnchor="middle">Input</text>
          <text x="20" y="45" fill="#FFFFFF" fontSize="8" textAnchor="middle">4096</text>

          {/* Encoder expanding outwards instead of narrowing */}
          <polygon points="38,16  105,4  105,70  38,58" fill="url(#overEncGrad)" />
          <text x="70" y="36" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Encoder 📈</text>

          {/* Overexpanded Bottleneck Z (Z >= Input) */}
          <rect x="108" y="2" width="64" height="70" rx="6" fill="url(#overZGrad)" stroke="#FFF" strokeWidth="1.5" />
          <text x="140" y="32" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Z = 8192</text>
          <text x="140" y="44" fill="#FFCCBC" fontSize="7" fontWeight="bold" textAnchor="middle">⚠️ Sem Gargalo</text>
          <text x="140" y="54" fill="#FFE0B2" fontSize="6.5" textAnchor="middle">(Z &gt; Input)</text>

          {/* Decoder narrowing back */}
          <polygon points="175,4  242,16  242,58  175,70" fill="url(#overDecGrad)" />
          <text x="208" y="36" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">Decoder 📢</text>

          {/* Output block */}
          <rect x="245" y="16" width="30" height="42" rx="4" fill="#D84315" />
          <text x="260" y="34" fill="#FFE0B2" fontSize="9" fontWeight="bold" textAnchor="middle">Cópia</text>
          <text x="260" y="45" fill="#FFFFFF" fontSize="8" textAnchor="middle">4096</text>
        </svg>
      </div>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '4px',
        background: 'rgba(255, 112, 67, 0.12)',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '0.7rem',
        color: '#BF360C'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '700' }}>
          <AlertTriangle size={13} color="#D84315" />
          <span>Sem Regulação: Cópia cega (função identidade).</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#2E7D32', fontWeight: '600' }}>
          <span style={{ background: '#E8F5E9', padding: '1px 5px', borderRadius: '4px', border: '1px solid #A5D6A7', fontSize: '0.65rem' }}>
            💡 Aplicação Prática
          </span>
          <span>Com Regulação L1 (Sparse AE) ou Ruído ➔ Dicionário de Atributos Rico (V1).</span>
        </div>
      </div>
    </div>
  );
};
