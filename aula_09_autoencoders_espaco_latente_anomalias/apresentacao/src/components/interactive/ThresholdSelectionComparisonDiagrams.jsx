import React from 'react';
import { AlertTriangle, CheckCircle, TrendingUp, Sliders, ShieldAlert } from 'lucide-react';

export const NaiveThresholdDiagram = () => {
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
        {/* SVG Diagram for Naive Gaussian Threshold (mu + 2sigma) */}
        <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="naiveGaussGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1BB5D8" stopOpacity="0.5" />
              <stop offset="100%" stopColor="#1BB5D8" stopOpacity="0.05" />
            </linearGradient>
            <linearGradient id="fnOverlapGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#FF3D00" stopOpacity="0.6" />
              <stop offset="100%" stopColor="#FF3D00" stopOpacity="0.1" />
            </linearGradient>
          </defs>

          {/* Normal Error Gaussian Curve */}
          <path d="M 10 65 Q 45 65, 65 15 Q 85 65, 120 65 Z" fill="url(#naiveGaussGrad)" stroke="#1BB5D8" strokeWidth="2" />
          <line x1="65" y1="15" x2="65" y2="65" stroke="#1BB5D8" strokeWidth="1" strokeDasharray="2 2" />
          <text x="65" y="74" fill="#0A345D" fontSize="8" fontWeight="bold" textAnchor="middle">μ (Média Treino)</text>

          {/* Static Naive Threshold line at mu + 2sigma */}
          <line x1="105" y1="5" x2="105" y2="68" stroke="#D84315" strokeWidth="2.5" strokeDasharray="4 2" />
          <text x="105" y="10" fill="#D84315" fontSize="7.5" fontWeight="bold" textAnchor="middle">T = μ + 2σ</text>

          {/* Overlapping Anomaly Error Distribution (Unchecked by naive threshold) */}
          <path d="M 80 65 Q 120 65, 140 30 Q 165 65, 230 65 Z" fill="url(#fnOverlapGrad)" stroke="#FF3D00" strokeWidth="1.5" />

          {/* Shaded Area of Missed Anomalies (False Negatives) */}
          <path d="M 80 65 Q 105 65, 105 50 L 105 65 Z" fill="#FF3D00" opacity="0.4" />

          {/* Callout Badge for High False Negatives */}
          <g transform="translate(160, 15)">
            <rect x="0" y="0" width="110" height="42" rx="6" fill="#FFF" stroke="#FFAB91" strokeWidth="1.5" />
            <text x="55" y="14" fill="#D84315" fontSize="8" fontWeight="bold" textAnchor="middle">⚠️ Falsos Negativos</text>
            <text x="55" y="26" fill="#BF360C" fontSize="7" textAnchor="middle">Anomalias não detectadas</text>
            <text x="55" y="35" fill="#BF360C" fontSize="6.5" textAnchor="middle">(Treino não viu defeitos)</text>
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
        <span>Risco: Fixar μ + 2σ no treino assume gaussiana e ignora a distribuição real dos defeitos.</span>
      </div>
    </div>
  );
};

export const RobustThresholdDiagram = () => {
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
        {/* SVG Diagram for Robust Validation ROC / PR Curve Thresholding */}
        <svg width="100%" height="80" viewBox="0 0 280 80" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id="rocCurveGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#1BB5D8" />
              <stop offset="100%" stopColor="#7CB342" />
            </linearGradient>
          </defs>

          {/* Mini ROC Curve Box */}
          <g transform="translate(10, 8)">
            <rect x="0" y="0" width="105" height="58" rx="5" fill="#061F38" stroke="#1BB5D8" strokeWidth="1" />
            <line x1="10" y1="50" x2="95" y2="50" stroke="#64748B" strokeWidth="1" />
            <line x1="10" y1="10" x2="10" y2="50" stroke="#64748B" strokeWidth="1" />
            <text x="52" y="66" fill="#64748B" fontSize="6.5" textAnchor="middle">1 - Especificidade (FPR)</text>

            {/* ROC Curve Trace */}
            <path d="M 10 50 C 12 12, 35 12, 95 10" fill="none" stroke="url(#rocCurveGrad)" strokeWidth="2.5" />
            <line x1="10" y1="50" x2="95" y2="10" stroke="#475569" strokeWidth="1" strokeDasharray="2 2" />

            {/* Target Operating Point Marker (Recall >= 95%) */}
            <circle cx="28" cy="14" r="4" fill="#7CB342" stroke="#FFF" strokeWidth="1.5" />
            <line x1="28" y1="14" x2="28" y2="50" stroke="#7CB342" strokeWidth="1" strokeDasharray="2 2" />
            <text x="35" y="24" fill="#AED581" fontSize="7" fontWeight="bold">Recall ≥ 95%</text>
          </g>

          {/* Arrow pointing from ROC validation to Threshold */}
          <g transform="translate(120, 26)">
            <line x1="0" y1="10" x2="24" y2="10" stroke="#2E7D32" strokeWidth="2" />
            <polygon points="24,6 32,10 24,14" fill="#2E7D32" />
            <text x="16" y="2" fill="#2E7D32" fontSize="6.5" fontWeight="bold" textAnchor="middle">Validação</text>
          </g>

          {/* Calibrated Threshold Output Box */}
          <g transform="translate(160, 10)">
            <rect x="0" y="0" width="112" height="55" rx="6" fill="#FFF" stroke="#A7F3D0" strokeWidth="1.5" />
            <text x="56" y="14" fill="#15803D" fontSize="8" fontWeight="bold" textAnchor="middle">Limiar Calibrado (T)</text>
            <text x="56" y="26" fill="#2E7D32" fontSize="7" textAnchor="middle">Ajustado em Conjunto Misto</text>
            <text x="56" y="36" fill="#15803D" fontSize="7.5" fontWeight="bold" textAnchor="middle">Sensibilidade Alta ✓</text>
            <text x="56" y="46" fill="#2E7D32" fontSize="6.5" textAnchor="middle">Segurança Médica/Industrial</text>
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
        <span>Vantagem: Usa validação com anomalias para fixar o Recall alvo exigido para produção.</span>
      </div>
    </div>
  );
};
