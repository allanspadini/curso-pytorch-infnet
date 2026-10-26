import React, { useState } from 'react';
import { Sliders, Eye, RefreshCw, Layers, CheckCircle, AlertTriangle } from 'lucide-react';

export default function LatentBottleneckSimulator() {
  const inputPixels = 4096; // 64x64
  const [latentDim, setLatentDim] = useState(16);
  const [selectedSample, setSelectedSample] = useState('digit'); // 'digit', 'cat', 'face'

  const compressionRatio = (inputPixels / latentDim).toFixed(1);

  // Dynamic Gaussian Blur stdDeviation based on latent dimension Z
  // Z=2 -> 11px blur, Z=16 -> 3.5px blur, Z=64 -> 1px blur, Z>=256 -> 0px blur
  const calculateBlur = (z) => {
    if (z >= 256) return 0;
    // Logarithmic curve for smooth visual progression across slider
    const maxBlur = 12;
    const norm = Math.log2(z) / Math.log2(256); // 0 at Z=1, 1 at Z=256
    return Math.max(0, parseFloat((maxBlur * (1 - norm)).toFixed(2)));
  };

  const blurAmount = calculateBlur(latentDim);

  // Simulated MSE loss pixel-wise (inversely proportional to Z)
  const mseLoss = (100 / Math.sqrt(latentDim)).toFixed(2);
  const fidelityPct = Math.min(100, Math.max(10, Math.log2(latentDim) * 12.5)).toFixed(0);

  let statusBadge = {
    label: 'Compressão Ideal',
    color: '#0E7490',
    bg: 'rgba(27,181,216,0.15)',
    desc: 'Gargalo ideal (Z = 32~128): retém feições essenciais descartando ruídos.'
  };

  if (latentDim < 16) {
    statusBadge = {
      label: 'Sub-representação (Perda Extrema)',
      color: '#D84315',
      bg: 'rgba(255,112,67,0.15)',
      desc: 'Gargalo muito estreito (Z < 16): o modelo perde informação fina e gera reconstrução borrada.'
    };
  } else if (latentDim >= 1024) {
    statusBadge = {
      label: 'Sem Gargalo (Superdimensionado)',
      color: '#C2410C',
      bg: 'rgba(251,146,60,0.15)',
      desc: 'Gargalo amplo (Z >= Input): a rede decora os pixels e age como função identidade.'
    };
  }

  // Render SVG Sample graphics using internal SVG feGaussianBlur filter for guaranteed cross-browser rendering
  const renderSampleSVG = (isReconstruction = false) => {
    const filterId = isReconstruction ? `reconBlur_${latentDim}_${selectedSample}` : null;
    const filterUrl = isReconstruction && blurAmount > 0 ? `url(#${filterId})` : undefined;

    return (
      <svg width="110" height="110" viewBox="0 0 100 100" style={{ background: '#0B0F19', borderRadius: '8px' }}>
        <defs>
          {isReconstruction && blurAmount > 0 && (
            <filter id={filterId} x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation={blurAmount} />
            </filter>
          )}
        </defs>

        {/* Background Grid */}
        <pattern id="gridPattern" width="10" height="10" patternUnits="userSpaceOnUse">
          <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.5" />
        </pattern>
        <rect width="100" height="100" fill="url(#gridPattern)" />

        {/* SVG Drawing Group with SVG filter applied */}
        <g filter={filterUrl}>
          {selectedSample === 'digit' && (
            // Handwritten Digit 8
            <g stroke="#64D9EF" strokeWidth="8" strokeLinecap="round" strokeLinejoin="round" fill="none">
              <circle cx="50" cy="34" r="18" stroke="#1BB5D8" />
              <circle cx="50" cy="66" r="22" stroke="#64D9EF" />
              <path d="M 50 16 A 18 18 0 1 1 49.9 16 Z" stroke="#FFFFFF" strokeWidth="4" />
              <path d="M 50 44 A 22 22 0 1 1 49.9 44 Z" stroke="#FFFFFF" strokeWidth="4" />
            </g>
          )}

          {selectedSample === 'cat' && (
            // Cat Portrait
            <g>
              <polygon points="22,25 35,50 18,52" fill="#7CB342" stroke="#AED581" strokeWidth="3" />
              <polygon points="78,25 65,50 82,52" fill="#7CB342" stroke="#AED581" strokeWidth="3" />
              <circle cx="50" cy="58" r="28" fill="#1E293B" stroke="#7CB342" strokeWidth="4" />
              <ellipse cx="40" cy="52" rx="5" ry="7" fill="#64D9EF" />
              <ellipse cx="60" cy="52" rx="5" ry="7" fill="#64D9EF" />
              <circle cx="41" cy="50" r="2" fill="#FFF" />
              <circle cx="61" cy="50" r="2" fill="#FFF" />
              <polygon points="47,63 53,63 50,67" fill="#FF7043" />
              <line x1="25" y1="62" x2="42" y2="64" stroke="#FFF" strokeWidth="2" />
              <line x1="22" y1="69" x2="40" y2="68" stroke="#FFF" strokeWidth="2" />
              <line x1="75" y1="62" x2="58" y2="64" stroke="#FFF" strokeWidth="2" />
              <line x1="78" y1="69" x2="60" y2="68" stroke="#FFF" strokeWidth="2" />
            </g>
          )}

          {selectedSample === 'face' && (
            // Geometric Face Portrait
            <g>
              <circle cx="50" cy="50" r="40" stroke="#AB47BC" strokeWidth="4" fill="none" />
              <circle cx="50" cy="40" r="16" fill="#1BB5D8" />
              <path d="M 24 82 C 24 64, 76 64, 76 82 Z" fill="#AB47BC" />
              <circle cx="44" cy="38" r="3" fill="#FFF" />
              <circle cx="56" cy="38" r="3" fill="#FFF" />
            </g>
          )}
        </g>
      </svg>
    );
  };

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sliders size={20} color="#1BB5D8" />
          <h3 style={{ color: '#0A345D', fontSize: '1.02rem', fontWeight: 700 }}>
            Simulador 1: Dimensão do Gargalo (Bottleneck) & Reconstrução em Tempo Real
          </h3>
        </div>
        <span className="card-header-badge" style={{ background: statusBadge.bg, color: statusBadge.color }}>
          {statusBadge.label}
        </span>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '14px', width: '100%' }}>

        {/* Controls Bar: Sample selector & Slider */}
        <div style={{
          width: '100%',
          background: '#F8FAFC',
          padding: '12px 18px',
          borderRadius: '10px',
          border: '1px solid #E2E8F0',
          display: 'flex',
          flexDirection: 'column',
          gap: '12px'
        }}>
          {/* Sample Selector & Quick Presets */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ fontSize: '0.82rem', fontWeight: '700', color: '#0A345D' }}>Entrada (X):</span>
              <button
                onClick={() => setSelectedSample('digit')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: selectedSample === 'digit' ? '2px solid #1BB5D8' : '1px solid #CBD5E1',
                  background: selectedSample === 'digit' ? 'rgba(27,181,216,0.15)' : '#FFF',
                  color: selectedSample === 'digit' ? '#0A345D' : '#64748B',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}>
                🔢 Dígito "8" (MNIST)
              </button>
              <button
                onClick={() => setSelectedSample('cat')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: selectedSample === 'cat' ? '2px solid #7CB342' : '1px solid #CBD5E1',
                  background: selectedSample === 'cat' ? 'rgba(124,179,66,0.15)' : '#FFF',
                  color: selectedSample === 'cat' ? '#2E7D32' : '#64748B',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}>
                🐱 Ícone de Gato
              </button>
              <button
                onClick={() => setSelectedSample('face')}
                style={{
                  padding: '5px 12px',
                  borderRadius: '6px',
                  border: selectedSample === 'face' ? '2px solid #AB47BC' : '1px solid #CBD5E1',
                  background: selectedSample === 'face' ? 'rgba(171,71,188,0.15)' : '#FFF',
                  color: selectedSample === 'face' ? '#7B1FA2' : '#64748B',
                  fontWeight: '700',
                  fontSize: '0.78rem',
                  cursor: 'pointer'
                }}>
                👤 Retrato
              </button>
            </div>

            {/* Quick Presets */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span style={{ fontSize: '0.78rem', color: '#64748B', fontWeight: '600' }}>Testar Z:</span>
              {[2, 8, 32, 128, 1024].map((val) => (
                <button
                  key={val}
                  onClick={() => setLatentDim(val)}
                  style={{
                    padding: '4px 10px',
                    borderRadius: '6px',
                    border: latentDim === val ? '2px solid #0A345D' : '1px solid #E2E8F0',
                    background: latentDim === val ? '#0A345D' : '#FFF',
                    color: latentDim === val ? '#FFF' : '#475569',
                    fontSize: '0.75rem',
                    fontWeight: '700',
                    cursor: 'pointer'
                  }}>
                  {val === 2 ? 'Z=2 (Borrado)' : val === 128 ? 'Z=128 (Nítido)' : `Z=${val}`}
                </button>
              ))}
            </div>
          </div>

          {/* Slider */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px', fontSize: '0.88rem', fontWeight: 600 }}>
              <span>Dimensão Latente (Z): <strong style={{ color: '#0A345D', fontSize: '1.1rem', fontFamily: 'Fira Code, monospace' }}>{latentDim} valores</strong></span>
              <span>Razão de Compressão: <strong style={{ color: '#1BB5D8', fontSize: '1.1rem', fontFamily: 'Fira Code, monospace' }}>{compressionRatio} : 1</strong></span>
            </div>
            <input
              type="range"
              min="2"
              max="1024"
              step="2"
              value={latentDim}
              onChange={(e) => setLatentDim(parseInt(e.target.value, 10))}
              style={{ width: '100%', accentColor: '#1BB5D8', cursor: 'pointer' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: '#64748B', marginTop: '3px' }}>
              <span>Z = 2 (Extremamente Borrado)</span>
              <span>Z = 16 (Intermediário)</span>
              <span>Z = 64 (Boa Fidelidade)</span>
              <span>Z = 256 (Nítido 100%)</span>
              <span>Z = 1024 (Sem Gargalo)</span>
            </div>
          </div>
        </div>

        {/* Visual Pipeline with Real Input & Dynamic Blur Reconstruction */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          background: '#061F38',
          padding: '16px 20px',
          borderRadius: '10px',
          color: '#fff',
          boxShadow: '0 4px 14px rgba(6,31,56,0.3)',
          border: '1px solid rgba(100,217,239,0.2)'
        }}>
          {/* Card 1: Entrada (X) Image */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '2px solid #1BB5D8',
            borderRadius: '10px',
            padding: '10px 14px',
            minWidth: '150px',
            boxShadow: '0 0 12px rgba(27,181,216,0.2)'
          }}>
            <div style={{ fontSize: '0.75rem', color: '#64D9EF', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              Entrada (X)
            </div>
            {renderSampleSVG(false)}
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px', fontFamily: 'Fira Code, monospace' }}>
              64×64 (4096 px)
            </div>
            <div style={{ fontSize: '0.65rem', color: '#64D9EF', fontWeight: '700', marginTop: '2px' }}>
              Original Nítida
            </div>
          </div>

          {/* Encoder Arrow */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#64D9EF', fontWeight: '700' }}>Encoder 🗜️</span>
            <div style={{ width: '45px', height: '2px', background: 'linear-gradient(90deg, #1BB5D8, #0A345D)', margin: '6px 0' }} />
            <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Downsampling</span>
          </div>

          {/* Bottleneck (Z) Indicator Box */}
          <div style={{
            textAlign: 'center',
            background: 'linear-gradient(135deg, #AB47BC 0%, #7B1FA2 100%)',
            padding: '12px 18px',
            borderRadius: '10px',
            border: '2px solid #E1BEE7',
            boxShadow: '0 0 16px rgba(171, 71, 188, 0.4)',
            minWidth: '140px'
          }}>
            <div style={{ fontSize: '0.72rem', color: '#F3E5F5', fontWeight: 800, textTransform: 'uppercase' }}>
              Bottleneck (Z)
            </div>
            <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', margin: '4px 0', fontFamily: 'Fira Code, monospace' }}>
              Z = {latentDim}
            </div>
            <div style={{ fontSize: '0.7rem', color: '#E1BEE7', fontWeight: '600' }}>
              Compressão {compressionRatio}:1
            </div>
          </div>

          {/* Decoder Arrow */}
          <div style={{ textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: '0.75rem', color: '#AED581', fontWeight: '700' }}>Decoder 📢</span>
            <div style={{ width: '45px', height: '2px', background: 'linear-gradient(90deg, #0A345D, #7CB342)', margin: '6px 0' }} />
            <span style={{ fontSize: '0.65rem', color: '#94A3B8' }}>Upsampling</span>
          </div>

          {/* Card 2: Reconstrução (X_hat) Image with Dynamic SVG Blur */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            background: 'rgba(255, 255, 255, 0.05)',
            border: latentDim < 16 ? '2px solid #FF7043' : '2px solid #7CB342',
            borderRadius: '10px',
            padding: '10px 14px',
            minWidth: '150px',
            boxShadow: latentDim < 16 ? '0 0 12px rgba(255,112,67,0.3)' : '0 0 12px rgba(124,179,66,0.3)'
          }}>
            <div style={{ fontSize: '0.75rem', color: latentDim < 16 ? '#FFAB91' : '#AED581', fontWeight: 800, textTransform: 'uppercase', marginBottom: '6px' }}>
              Reconstrução (X̂)
            </div>
            {renderSampleSVG(true)}
            <div style={{ fontSize: '0.72rem', color: '#CBD5E1', marginTop: '6px', fontFamily: 'Fira Code, monospace' }}>
              Borrão: {blurAmount}px
            </div>
            <div style={{ fontSize: '0.65rem', color: latentDim < 16 ? '#FFAB91' : '#AED581', fontWeight: '700', marginTop: '2px' }}>
              {latentDim < 16 ? '⚠️ Borrado (Perda Feições)' : latentDim >= 256 ? '✓ Nítido (Fidelidade 100%)' : '✓ Reconstrução Nítida'}
            </div>
          </div>
        </div>

        {/* Bottom Metrics Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '12px',
          width: '100%'
        }}>
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#0369A1', fontWeight: '700', textTransform: 'uppercase' }}>Taxa de Compressão</span>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: '#0A345D' }}>{compressionRatio} : 1</div>
          </div>

          <div style={{ background: latentDim < 16 ? '#FFF5F2' : '#F0FDF4', border: latentDim < 16 ? '1px solid #FFCCBC' : '1px solid #BBF7D0', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: latentDim < 16 ? '#D84315' : '#15803D', fontWeight: '700', textTransform: 'uppercase' }}>Erro de Reconstrução (MSE)</span>
            <div style={{ fontSize: '1.2rem', fontWeight: '800', color: latentDim < 16 ? '#BF360C' : '#166534' }}>{mseLoss}</div>
          </div>

          <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', padding: '8px 12px', borderRadius: '8px', textAlign: 'center' }}>
            <span style={{ fontSize: '0.7rem', color: '#C2410C', fontWeight: '700', textTransform: 'uppercase' }}>Fidelidade da Imagem</span>
            <div style={{ fontSize: '1.1rem', fontWeight: '700', color: '#9A3412', marginTop: '2px' }}>
              {fidelityPct}% {latentDim < 16 ? '(Perda Fina)' : ''}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
