import React from 'react';
import { Layers, Database, Cpu, Share2, Sparkles, ArrowRight } from 'lucide-react';

export const LatentRepresentationStepsDiagram = () => {
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
      {/* 5-Step Visual Architecture Flow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '110px'
      }}>
        {/* Step 1: Raw Unlabeled Data */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.06)',
            border: '1.5px stroke #64D9EF',
            borderStyle: 'dashed',
            borderColor: '#64D9EF',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#64D9EF', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 1
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Imagens Brutas
            </div>
            {/* SVG Stack of Unlabeled Digit Badges */}
            <svg width="60" height="34" viewBox="0 0 60 34">
              <rect x="2" y="2" width="22" height="22" rx="4" fill="#1E293B" stroke="#64D9EF" strokeWidth="1" />
              <text x="13" y="17" fill="#64D9EF" fontSize="10" fontWeight="bold" textAnchor="middle">0</text>
              <rect x="18" y="6" width="22" height="22" rx="4" fill="#0A345D" stroke="#1BB5D8" strokeWidth="1" />
              <text x="29" y="21" fill="#1BB5D8" fontSize="10" fontWeight="bold" textAnchor="middle">1</text>
              <rect x="34" y="10" width="22" height="22" rx="4" fill="#061F38" stroke="#AB47BC" strokeWidth="1" />
              <text x="45" y="25" fill="#E1BEE7" fontSize="10" fontWeight="bold" textAnchor="middle">8</text>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#94A3B8', marginTop: '2px' }}>Sem Rótulos (Unlabeled)</span>
          </div>
        </div>

        <ArrowRight size={14} color="#64D9EF" />

        {/* Step 2: Autoencoder Training */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(27, 181, 216, 0.1)',
            border: '1.5px solid #1BB5D8',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#1BB5D8', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 2
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Treino f(X)=X̂
            </div>
            <svg width="64" height="30" viewBox="0 0 64 30">
              <polygon points="4,4 24,11 24,19 4,26" fill="#1BB5D8" opacity="0.8" />
              <rect x="26" y="9" width="12" height="12" rx="3" fill="#AB47BC" />
              <polygon points="40,11 60,4 60,26 40,19" fill="#7CB342" opacity="0.8" />
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#64D9EF', marginTop: '2px' }}>MSE Loss (Pixel a Pixel)</span>
          </div>
        </div>

        <ArrowRight size={14} color="#1BB5D8" />

        {/* Step 3: Latent Vector Compression Z */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(171, 71, 188, 0.15)',
            border: '1.5px solid #AB47BC',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#E1BEE7', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 3
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Compressão Z
            </div>
            {/* SVG Vector representation */}
            <svg width="60" height="30" viewBox="0 0 60 30">
              <rect x="4" y="6" width="52" height="18" rx="4" fill="#7B1FA2" stroke="#E1BEE7" strokeWidth="1" />
              <text x="30" y="18" fill="#FFF" fontSize="9" fontWeight="bold" textAnchor="middle" fontFamily="Fira Code, monospace">
                Z = [z₁, z₂... zₙ]
              </text>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#E1BEE7', marginTop: '2px' }}>Vetor Latente N-Dim</span>
          </div>
        </div>

        <ArrowRight size={14} color="#AB47BC" />

        {/* Step 4: Autonomous Clusters */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(124, 179, 66, 0.12)',
            border: '1.5px solid #7CB342',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#AED581', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 4
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Clusters Autônomos
            </div>
            {/* SVG Cluster Plot */}
            <svg width="60" height="32" viewBox="0 0 60 32">
              <rect x="2" y="2" width="56" height="28" rx="4" fill="#0B0F19" stroke="#7CB342" strokeWidth="0.8" />
              {/* Cluster A (Cyan - 1s) */}
              <circle cx="14" cy="10" r="3" fill="#64D9EF" />
              <circle cx="20" cy="14" r="2.5" fill="#64D9EF" />
              <circle cx="12" cy="18" r="2.5" fill="#64D9EF" />
              {/* Cluster B (Purple - 8s) */}
              <circle cx="44" cy="12" r="3" fill="#AB47BC" />
              <circle cx="48" cy="18" r="2.5" fill="#AB47BC" />
              <circle cx="40" cy="22" r="2.5" fill="#AB47BC" />
              {/* Cluster C (Green - 0s) */}
              <circle cx="28" cy="24" r="3" fill="#7CB342" />
              <circle cx="34" cy="22" r="2.5" fill="#7CB342" />
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#AED581', marginTop: '2px' }}>Agrupamento por Similaridade</span>
          </div>
        </div>

        <ArrowRight size={14} color="#7CB342" />

        {/* Step 5: Continuous Manifold & Generalization */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.08)',
            border: '1.5px solid #64D9EF',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#64D9EF', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 5
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Manifold Semântico
            </div>
            {/* SVG Smooth Manifold Interp */}
            <svg width="60" height="32" viewBox="0 0 60 32">
              <path d="M 6 22 Q 22 4, 30 16 T 54 10" fill="none" stroke="#64D9EF" strokeWidth="2" strokeDasharray="2 2" />
              <circle cx="6" cy="22" r="3" fill="#1BB5D8" />
              <circle cx="30" cy="16" r="3" fill="#AB47BC" />
              <circle cx="54" cy="10" r="3" fill="#7CB342" />
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#64D9EF', marginTop: '2px' }}>Interpolação Suave em Z</span>
          </div>
        </div>
      </div>

      {/* Bottom Summary Bar */}
      <div style={{
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '6px',
        padding: '5px 12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        fontSize: '0.74rem'
      }}>
        <span style={{ color: '#E2E8F0' }}>
          Resultado: <strong style={{ color: '#64D9EF' }}>Aprendizado de Representações Sem Rótulos</strong> (Self-Supervised Clustering)
        </span>
        <span style={{
          background: 'rgba(27, 181, 216, 0.25)',
          color: '#64D9EF',
          padding: '2px 10px',
          borderRadius: '10px',
          fontWeight: '700',
          fontSize: '0.68rem',
          border: '1px solid rgba(27, 181, 216, 0.35)'
        }}>
          Organização Espacial Autônoma em Z
        </span>
      </div>
    </div>
  );
};
