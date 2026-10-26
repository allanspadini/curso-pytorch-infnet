import React from 'react';
import { ArrowRight, Split, Activity, LineChart, Target, Lock } from 'lucide-react';

export const ClinicalWorkflowStepsDiagram = () => {
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
      {/* 5-Step Visual Flow for Threshold Workflow */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        minHeight: '110px'
      }}>
        {/* Step 1: Labeled Validation Split */}
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
              Passo 1
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0' }}>
              Split Validação
            </div>
            {/* SVG Split Set Icon */}
            <svg width="56" height="30" viewBox="0 0 56 30">
              <rect x="2" y="5" width="23" height="20" rx="3" fill="#15803D" stroke="#7CB342" strokeWidth="1" />
              <text x="13" y="18" fill="#FFF" fontSize="7" fontWeight="bold" textAnchor="middle">Normais</text>

              <rect x="31" y="5" width="23" height="20" rx="3" fill="#B91C1C" stroke="#FF7043" strokeWidth="1" />
              <text x="42" y="18" fill="#FFF" fontSize="7" fontWeight="bold" textAnchor="middle">Anômalos</text>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#64D9EF', marginTop: '2px' }}>Amostras Rotuladas</span>
          </div>
        </div>

        <ArrowRight size={14} color="#64D9EF" />

        {/* Step 2: MSE Inference Calculation */}
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
              Inferência MSE
            </div>
            {/* SVG Error calculation distribution */}
            <svg width="56" height="30" viewBox="0 0 56 30">
              <path d="M 4 24 Q 16 24, 20 6 Q 25 24, 30 24" fill="none" stroke="#7CB342" strokeWidth="1.5" />
              <path d="M 28 24 Q 40 24, 44 10 Q 50 24, 54 24" fill="none" stroke="#FF7043" strokeWidth="1.5" />
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#64D9EF', marginTop: '2px' }}>Erro de Reconstrução</span>
          </div>
        </div>

        <ArrowRight size={14} color="#1BB5D8" />

        {/* Step 3: ROC & PR Curves Plot */}
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
              Curvas ROC & PR
            </div>
            {/* SVG ROC Curve Plot */}
            <svg width="56" height="30" viewBox="0 0 56 30">
              <rect x="2" y="2" width="52" height="26" rx="3" fill="#0B0F19" stroke="#AB47BC" strokeWidth="0.8" />
              <path d="M 6 24 C 8 8, 20 8, 50 6" fill="none" stroke="#E1BEE7" strokeWidth="2" />
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#E1BEE7', marginTop: '2px' }}>Sensibilidade vs FPR</span>
          </div>
        </div>

        <ArrowRight size={14} color="#AB47BC" />

        {/* Step 4: Fix Target Recall (Recall >= 95%) */}
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
              Meta Recall ≥ 95%
            </div>
            {/* SVG Target Recall Badge */}
            <svg width="56" height="30" viewBox="0 0 56 30">
              <circle cx="28" cy="15" r="11" fill="#2E7D32" stroke="#7CB342" strokeWidth="1.5" />
              <text x="28" y="18" fill="#FFF" fontSize="8" fontWeight="bold" textAnchor="middle">≥95%</text>
            </svg>
            <span style={{ fontSize: '0.6rem', color: '#AED581', marginTop: '2px' }}>Mitiga Falsos Negativos</span>
          </div>
        </div>

        <ArrowRight size={14} color="#7CB342" />

        {/* Step 5: Lock Threshold for Production */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '4px',
          width: '120px',
          zIndex: 2
        }}>
          <div style={{
            background: 'rgba(27, 181, 216, 0.18)',
            border: '2px solid #64D9EF',
            borderRadius: '8px',
            padding: '8px',
            textAlign: 'center',
            width: '100%',
            minHeight: '95px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            boxShadow: '0 0 12px rgba(100, 217, 239, 0.3)'
          }}>
            <div style={{ fontSize: '0.62rem', color: '#64D9EF', fontWeight: '700', textTransform: 'uppercase' }}>
              Passo 5
            </div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#FFF', margin: '3px 0', display: 'flex', alignItems: 'center', gap: '3px' }}>
              <Lock size={12} color="#64D9EF" />
              Limiar Travado
            </div>
            <div style={{
              fontSize: '0.7rem',
              fontWeight: '800',
              color: '#0A345D',
              background: '#64D9EF',
              padding: '2px 6px',
              borderRadius: '4px',
              marginTop: '2px'
            }}>
              T_final Calibrado
            </div>
            <span style={{ fontSize: '0.6rem', color: '#64D9EF', marginTop: '2px', fontWeight: '700' }}>Pronto pra Produção</span>
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
          Workflow Rigoroso: <strong style={{ color: '#64D9EF' }}>Ajuste de Threshold no Conjunto de Validação Misto</strong>
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
          Garantia de Sensibilidade Diagnóstica (Recall ≥ 95%)
        </span>
      </div>
    </div>
  );
};
