import React from 'react';
import { Target, ArrowRight, Layers, FileImage, ShieldCheck, RefreshCw } from 'lucide-react';

export const SupervisedDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #FFF5F2 0%, #FFECE5 100%)',
      border: '1px solid #FFCCBC',
      borderRadius: '10px',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: '0 2px 6px rgba(255, 112, 67, 0.08)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: '#FFFFFF',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px dashed #FFAB91'
      }}>
        {/* Entrada X */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#0A345D',
            color: '#FFF',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '4px 10px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <FileImage size={13} color="#64D9EF" />
            Entrada (X)
          </div>
          <span style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '2px' }}>ex: Imagem 28x28</span>
        </div>

        <ArrowRight size={16} color="#FF7043" />

        {/* Modelo */}
        <div style={{
          background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)',
          color: '#FFF',
          padding: '6px 12px',
          borderRadius: '8px',
          textAlign: 'center',
          boxShadow: '0 2px 4px rgba(10,52,93,0.2)'
        }}>
          <div style={{ fontSize: '0.72rem', fontWeight: '700', color: '#64D9EF' }}>Modelo Superv.</div>
          <div style={{ fontSize: '0.65rem', color: '#94A3B8' }}>f(X) ➔ Ŷ</div>
        </div>

        <ArrowRight size={16} color="#FF7043" />

        {/* Predição Y_hat */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#FFF3E0',
            border: '1px solid #FFE0B2',
            color: '#E65100',
            fontSize: '0.75rem',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '6px'
          }}>
            Predição (Ŷ)
          </div>
          <span style={{ fontSize: '0.65rem', color: '#64748B', marginTop: '2px' }}>ex: Classe "Gato"</span>
        </div>
      </div>

      {/* Alvo Y & Loss comparison */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(255, 112, 67, 0.1)',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(255, 112, 67, 0.3)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: '#D84315',
            color: '#FFF',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 4px rgba(216, 67, 21, 0.3)'
          }}>
            <Target size={14} color="#FFF" />
            ALVO CRÍTICO: Rótulo Y
          </div>
          <span style={{ fontSize: '0.7rem', color: '#BF360C', fontWeight: '600' }}>
            (Fornecido externamente)
          </span>
        </div>

        <div style={{
          fontSize: '0.68rem',
          fontWeight: '700',
          color: '#D84315',
          background: '#FFF',
          padding: '3px 8px',
          borderRadius: '4px',
          border: '1px solid #FFAB91'
        }}>
          Loss(Ŷ, Y)
        </div>
      </div>
    </div>
  );
};

export const AutoencoderFunnelDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #F1F8E9 0%, #E8F5E9 100%)',
      border: '1px solid #C8E6C9',
      borderRadius: '10px',
      padding: '12px 14px',
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      boxShadow: '0 2px 6px rgba(124, 179, 66, 0.08)'
    }}>
      {/* Visual SVG Funnel */}
      <div style={{
        background: '#FFFFFF',
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px dashed #A5D6A7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Entrada X */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#0A345D',
            color: '#FFF',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '6px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <FileImage size={12} color="#64D9EF" />
            Entrada (X)
          </div>
          <span style={{ fontSize: '0.62rem', color: '#2E7D32', fontWeight: '700', marginTop: '3px' }}>
            Serve de ALVO (Y=X)
          </span>
        </div>

        {/* Funnel Graphic SVG */}
        <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 8px' }}>
          <svg width="240" height="80" viewBox="0 0 240 80" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="encoderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1BB5D8" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#0A345D" stopOpacity="0.9" />
              </linearGradient>
              <linearGradient id="bottleneckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AB47BC" />
                <stop offset="100%" stopColor="#7B1FA2" />
              </linearGradient>
              <linearGradient id="decoderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0A345D" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#7CB342" stopOpacity="0.85" />
              </linearGradient>
            </defs>

            {/* Encoder Trapezoid */}
            <polygon points="10,5  80,22  80,58  10,75" fill="url(#encoderGrad)" rx="3" />
            <text x="42" y="44" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              Encoder 🗜️
            </text>

            {/* Arrow Encoder -> Z */}
            <line x1="80" y1="40" x2="90" y2="40" stroke="#0A345D" strokeWidth="2" />

            {/* Bottleneck Z Rect */}
            <rect x="92" y="20" width="56" height="40" rx="6" fill="url(#bottleneckGrad)" stroke="#FFF" strokeWidth="1.5" />
            <text x="120" y="38" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              Gargalo (Z)
            </text>
            <text x="120" y="49" fill="#E1BEE7" fontSize="8" textAnchor="middle">
              Latente
            </text>

            {/* Arrow Z -> Decoder */}
            <line x1="148" y1="40" x2="158" y2="40" stroke="#0A345D" strokeWidth="2" />

            {/* Decoder Trapezoid */}
            <polygon points="160,22  230,5  230,75  160,58" fill="url(#decoderGrad)" />
            <text x="195" y="44" fill="#FFFFFF" fontSize="10" fontWeight="bold" textAnchor="middle">
              Decoder 📢
            </text>
          </svg>
        </div>

        {/* Reconstrução X_hat */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{
            background: '#E8F5E9',
            border: '1px solid #A5D6A7',
            color: '#2E7D32',
            fontSize: '0.72rem',
            fontWeight: '700',
            padding: '4px 8px',
            borderRadius: '6px'
          }}>
            Reconstrução (X̂)
          </div>
          <span style={{ fontSize: '0.62rem', color: '#64748B', marginTop: '3px' }}>f(X) ≈ X</span>
        </div>
      </div>

      {/* Auto-supervision Loss comparison */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(124, 179, 66, 0.12)',
        padding: '8px 12px',
        borderRadius: '8px',
        border: '1px solid rgba(124, 179, 66, 0.35)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div style={{
            background: '#2E7D32',
            color: '#FFF',
            padding: '5px 10px',
            borderRadius: '20px',
            fontSize: '0.72rem',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '5px',
            boxShadow: '0 2px 4px rgba(46, 125, 50, 0.3)'
          }}>
            <RefreshCw size={13} color="#FFF" />
            AUTO-SUPERVISIONADO: Alvo Y = X
          </div>
          <span style={{ fontSize: '0.7rem', color: '#1B5E20', fontWeight: '600' }}>
            (Sem necessidade de rótulo humano!)
          </span>
        </div>

        <div style={{
          fontSize: '0.68rem',
          fontWeight: '700',
          color: '#2E7D32',
          background: '#FFF',
          padding: '3px 8px',
          borderRadius: '4px',
          border: '1px solid #A5D6A7'
        }}>
          MSE(X, X̂)
        </div>
      </div>
    </div>
  );
};
