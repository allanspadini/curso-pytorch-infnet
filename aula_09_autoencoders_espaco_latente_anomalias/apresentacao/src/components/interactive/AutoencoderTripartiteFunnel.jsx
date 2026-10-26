import React from 'react';
import { Image as ImageIcon, CheckCircle2 } from 'lucide-react';

export const AutoencoderTripartiteFunnel = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #061F38 0%, #0A345D 100%)',
      borderRadius: '10px',
      padding: '12px 18px',
      boxShadow: '0 6px 18px rgba(6, 31, 56, 0.25)',
      border: '1px solid rgba(100, 217, 239, 0.25)',
      color: '#FFFFFF',
      display: 'flex',
      flexDirection: 'column',
      gap: '8px'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '110px'
      }}>
        {/* Step 1: Input X */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '125px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '2px solid #64D9EF',
            borderRadius: '8px',
            padding: '10px 8px',
            textAlign: 'center',
            width: '100%',
            boxShadow: '0 0 12px rgba(100, 217, 239, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#64D9EF', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Etapa 1
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFF', margin: '4px 0 2px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <ImageIcon size={16} color="#64D9EF" />
              Input X
            </div>
            <div style={{ fontSize: '0.68rem', color: '#94A3B8', fontFamily: 'Fira Code, monospace', fontWeight: '500' }}>
              1x64x64
            </div>
            <div style={{ fontSize: '0.62rem', color: '#64D9EF', marginTop: '1px' }}>
              (4.096 px)
            </div>
          </div>
        </div>

        {/* SVG Funnel Banner (Steps 2, 3, 4) */}
        <div style={{ flex: 1, margin: '0 10px', height: '110px', position: 'relative' }}>
          <svg width="100%" height="110" viewBox="0 0 520 110" preserveAspectRatio="xMidYMid meet" style={{ overflow: 'visible' }}>
            <defs>
              {/* Encoder Gradient */}
              <linearGradient id="triEncoderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1BB5D8" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#0E4E8A" stopOpacity="0.95" />
              </linearGradient>
              {/* Bottleneck Gradient */}
              <linearGradient id="triBottleneckGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#AB47BC" />
                <stop offset="100%" stopColor="#7B1FA2" />
              </linearGradient>
              {/* Decoder Gradient */}
              <linearGradient id="triDecoderGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0E4E8A" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#7CB342" stopOpacity="0.85" />
              </linearGradient>
              <filter id="glowBottleneck" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
            </defs>

            {/* Stage 2: Encoder Funnel */}
            <polygon points="10,6  190,30  190,80  10,104" fill="url(#triEncoderGrad)" rx="4" />
            <text x="100" y="50" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
              2. ENCODER
            </text>
            <text x="100" y="65" fill="#64D9EF" fontSize="9" textAnchor="middle" fontFamily="Fira Code, monospace">
              Conv2d + Downsampling
            </text>

            {/* Connection Line 1 */}
            <line x1="190" y1="55" x2="208" y2="55" stroke="#64D9EF" strokeWidth="2" strokeDasharray="3 3" />

            {/* Stage 3: Bottleneck Z */}
            <rect x="210" y="24" width="100" height="62" rx="8" fill="url(#triBottleneckGrad)" stroke="#E1BEE7" strokeWidth="1.5" filter="url(#glowBottleneck)" />
            <text x="260" y="47" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              3. BOTTLENECK
            </text>
            <text x="260" y="60" fill="#F3E5F5" fontSize="10" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code, monospace">
              Vetor Z = 32
            </text>
            <text x="260" y="72" fill="#E1BEE7" fontSize="8" textAnchor="middle">
              (Gargalo Latente)
            </text>

            {/* Connection Line 2 */}
            <line x1="310" y1="55" x2="328" y2="55" stroke="#AED581" strokeWidth="2" strokeDasharray="3 3" />

            {/* Stage 4: Decoder Funnel */}
            <polygon points="330,30  510,6  510,104  330,80" fill="url(#triDecoderGrad)" />
            <text x="420" y="50" fill="#FFFFFF" fontSize="12" fontWeight="bold" textAnchor="middle">
              4. DECODER
            </text>
            <text x="420" y="65" fill="#AED581" fontSize="9" textAnchor="middle" fontFamily="Fira Code, monospace">
              ConvTranspose / Upsample
            </text>
          </svg>
        </div>

        {/* Step 5: Output X_hat */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '125px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(124, 179, 66, 0.15)',
            border: '2px solid #7CB342',
            borderRadius: '8px',
            padding: '10px 8px',
            textAlign: 'center',
            width: '100%',
            boxShadow: '0 0 12px rgba(124, 179, 66, 0.2)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100px'
          }}>
            <div style={{ fontSize: '0.65rem', color: '#AED581', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Etapa 5
            </div>
            <div style={{ fontSize: '0.92rem', fontWeight: '800', color: '#FFF', margin: '4px 0 2px 0', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckCircle2 size={16} color="#7CB342" />
              Output X̂
            </div>
            <div style={{ fontSize: '0.68rem', color: '#C8E6C9', fontFamily: 'Fira Code, monospace', fontWeight: '500' }}>
              1x64x64
            </div>
            <div style={{ fontSize: '0.62rem', color: '#AED581', marginTop: '1px' }}>
              (Reconstruído)
            </div>
          </div>
        </div>
      </div>

      {/* MSE Loss Comparison Badge Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '6px',
        padding: '5px 14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.74rem'
      }}>
        <span style={{ color: '#E2E8F0' }}>
          Função Objetivo: <strong style={{ color: '#64D9EF' }}>Loss(X, X̂) = ||X - X̂||²</strong> (MSE Pixel a Pixel)
        </span>
        <span style={{
          background: 'rgba(124, 179, 66, 0.25)',
          color: '#AED581',
          padding: '2px 10px',
          borderRadius: '10px',
          fontWeight: '700',
          fontSize: '0.68rem',
          border: '1px solid rgba(124, 179, 66, 0.35)'
        }}>
          Taxa de Compressão: 4096 ➔ 32 (128 : 1)
        </span>
      </div>
    </div>
  );
};
