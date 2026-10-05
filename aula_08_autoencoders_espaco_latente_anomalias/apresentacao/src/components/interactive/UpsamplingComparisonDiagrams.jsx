import React from 'react';
import { AlertTriangle, CheckCircle, Grid, Layers, Sparkles } from 'lucide-react';

export const ConvTransposeDiagram = () => {
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
        {/* SVG Diagram for ConvTranspose2d */}
        <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="ctGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#AB47BC" />
              <stop offset="100%" stopColor="#FF7043" />
            </linearGradient>
          </defs>

          {/* Input 2x2 Low-Res Grid */}
          <g transform="translate(10, 15)">
            <rect x="0" y="0" width="40" height="40" fill="#1E293B" rx="4" />
            <rect x="2" y="2" width="17" height="17" fill="#64D9EF" />
            <rect x="21" y="2" width="17" height="17" fill="#1BB5D8" />
            <rect x="2" y="21" width="17" height="17" fill="#0A345D" />
            <rect x="21" y="21" width="17" height="17" fill="#AB47BC" />
            <text x="20" y="53" fill="#64748B" fontSize="8" textAnchor="middle">Input 2x2</text>
          </g>

          {/* Arrow with ConvTranspose Kernel operation */}
          <g transform="translate(60, 20)">
            <line x1="0" y1="15" x2="45" y2="15" stroke="#D84315" strokeWidth="2" strokeDasharray="3 3" />
            <polygon points="45,10 55,15 45,20" fill="#D84315" />
            <text x="25" y="8" fill="#D84315" fontSize="8" fontWeight="bold" textAnchor="middle">ConvTranspose</text>
            <text x="25" y="27" fill="#64748B" fontSize="7" textAnchor="middle">Insere Zeros + Kernel</text>
          </g>

          {/* Output 4x4 Grid showing Checkerboard Patterns */}
          <g transform="translate(130, 8)">
            <rect x="0" y="0" width="60" height="60" fill="#061F38" rx="4" stroke="#FF7043" strokeWidth="1.5" />
            {/* Checkerboard cells with uneven overlap */}
            <rect x="3" y="3" width="12" height="12" fill="#FF7043" opacity="0.9" />
            <rect x="17" y="3" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="31" y="3" width="12" height="12" fill="#FF7043" opacity="0.95" />
            <rect x="45" y="3" width="12" height="12" fill="#FFAB91" opacity="0.3" />

            <rect x="3" y="17" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="17" y="17" width="12" height="12" fill="#D84315" opacity="0.95" />
            <rect x="31" y="17" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="45" y="17" width="12" height="12" fill="#D84315" opacity="0.9" />

            <rect x="3" y="31" width="12" height="12" fill="#FF7043" opacity="0.9" />
            <rect x="17" y="31" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="31" y="31" width="12" height="12" fill="#FF7043" opacity="0.95" />
            <rect x="45" y="31" width="12" height="12" fill="#FFAB91" opacity="0.3" />

            <rect x="3" y="45" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="17" y="45" width="12" height="12" fill="#D84315" opacity="0.9" />
            <rect x="31" y="45" width="12" height="12" fill="#FFAB91" opacity="0.3" />
            <rect x="45" y="45" width="12" height="12" fill="#D84315" opacity="0.95" />

            <text x="30" y="69" fill="#D84315" fontSize="8" fontWeight="bold" textAnchor="middle">Output 4x4</text>
          </g>

          {/* Checkerboard Pattern Callout Badge */}
          <g transform="translate(202, 18)">
            <rect x="0" y="0" width="72" height="38" rx="6" fill="#FFF" stroke="#FFAB91" strokeWidth="1" />
            <text x="36" y="14" fill="#D84315" fontSize="8" fontWeight="bold" textAnchor="middle">Artefato ⚠️</text>
            <text x="36" y="25" fill="#BF360C" fontSize="7" textAnchor="middle">Tabuleiro de</text>
            <text x="36" y="33" fill="#BF360C" fontSize="7" textAnchor="middle">Xadrez</text>
          </g>
        </svg>
      </div>

      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        background: 'rgba(255, 112, 67, 0.15)',
        padding: '6px 10px',
        borderRadius: '6px',
        fontSize: '0.72rem',
        color: '#BF360C',
        fontWeight: '600'
      }}>
        <AlertTriangle size={14} color="#D84315" />
        <span>Risco: Sobreposição desigual de stride gera padrões de tabuleiro de xadrez.</span>
      </div>
    </div>
  );
};

export const InterpolationConvDiagram = () => {
  return (
    <div style={{
      background: 'linear-gradient(135deg, #F0FDF4 0%, #DCFCE7 100%)',
      border: '1px solid #A7F3D0',
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
        border: '1px dashed #86EFAC',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* SVG Diagram for nn.Upsample + nn.Conv2d showing expansion then dimension adjustment */}
        <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
          {/* Stage 1: Input 2x2 Grid */}
          <g transform="translate(6, 20)">
            <rect x="0" y="0" width="30" height="30" fill="#1E293B" rx="4" />
            <rect x="2" y="2" width="12" height="12" fill="#64D9EF" />
            <rect x="16" y="2" width="12" height="12" fill="#1BB5D8" />
            <rect x="2" y="16" width="12" height="12" fill="#0A345D" />
            <rect x="16" y="16" width="12" height="12" fill="#7CB342" />
            <text x="15" y="42" fill="#64748B" fontSize="7.5" textAnchor="middle">Input 2x2</text>
          </g>

          {/* Arrow 1: nn.Upsample */}
          <g transform="translate(39, 22)">
            <line x1="0" y1="12" x2="20" y2="12" stroke="#0E7490" strokeWidth="1.5" />
            <polygon points="20,9 27,12 20,15" fill="#0E7490" />
            <text x="13" y="6" fill="#0E7490" fontSize="6.5" fontWeight="bold" textAnchor="middle">Upsample</text>
          </g>

          {/* Stage 2: Large Expanded Grid (e.g. 6x6 / Oversampled) */}
          <g transform="translate(70, 5)">
            <rect x="0" y="0" width="54" height="54" fill="#061F38" rx="4" stroke="#64D9EF" strokeWidth="1.5" />
            {/* 6x6 Interpolated grid cells */}
            {[0, 8, 16, 24, 32, 40].map((x) =>
              [0, 8, 16, 24, 32, 40].map((y) => (
                <rect key={`${x}-${y}`} x={x + 3} y={y + 3} width="6" height="6" fill="#64D9EF" opacity={0.3 + (x + y) / 100} />
              ))
            )}
            <text x="27" y="66" fill="#0E7490" fontSize="7.5" fontWeight="bold" textAnchor="middle">Interpolação Maior (6x6)</text>
          </g>

          {/* Arrow 2: nn.Conv2d (Ajuste para Dimensão Exata + Suavização) */}
          <g transform="translate(128, 22)">
            <line x1="0" y1="12" x2="22" y2="12" stroke="#2E7D32" strokeWidth="1.5" />
            <polygon points="22,9 29,12 22,15" fill="#2E7D32" />
            <text x="14" y="6" fill="#2E7D32" fontSize="6.5" fontWeight="bold" textAnchor="middle">Conv2d</text>
            <text x="14" y="22" fill="#64748B" fontSize="6" textAnchor="middle">Ajuste Exato</text>
          </g>

          {/* Stage 3: Exact Target Output Grid 4x4 */}
          <g transform="translate(162, 10)">
            <rect x="0" y="0" width="44" height="44" fill="#061F38" rx="4" stroke="#7CB342" strokeWidth="1.5" />
            {/* Smooth 4x4 continuous cells */}
            <rect x="2" y="2" width="18" height="18" fill="#388E3C" opacity="0.9" />
            <rect x="23" y="2" width="18" height="18" fill="#66BB6A" opacity="0.9" />
            <rect x="2" y="23" width="18" height="18" fill="#2E7D32" opacity="0.9" />
            <rect x="23" y="23" width="18" height="18" fill="#81C784" opacity="0.9" />
            <text x="22" y="56" fill="#2E7D32" fontSize="7.5" fontWeight="bold" textAnchor="middle">Saída Exata (4x4)</text>
          </g>

          {/* Clean Output Badge */}
          <g transform="translate(216, 16)">
            <rect x="0" y="0" width="58" height="40" rx="6" fill="#FFF" stroke="#A7F3D0" strokeWidth="1" />
            <text x="29" y="14" fill="#15803D" fontSize="7.5" fontWeight="bold" textAnchor="middle">Sem Xadrez</text>
            <text x="29" y="25" fill="#15803D" fontSize="6.5" textAnchor="middle">Dimensão Exata</text>
            <text x="29" y="34" fill="#15803D" fontSize="8" textAnchor="middle">✓</text>
          </g>
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
        <span>Vantagem: Interpolação expande a resolução e a Conv2d ajusta a dimensão exata e suaviza feições.</span>
      </div>
    </div>
  );
};
