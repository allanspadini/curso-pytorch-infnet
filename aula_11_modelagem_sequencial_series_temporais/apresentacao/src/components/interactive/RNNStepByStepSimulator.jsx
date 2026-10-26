import React, { useState, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, RotateCcw, ArrowRight, TrendingUp, Repeat, Layers, CheckCircle2 } from 'lucide-react';
import MathView from '../MathView';

export default function RNNStepByStepSimulator() {
  const [currentStep, setCurrentStep] = useState(2); // 0-indexed: 2 is t=3 (0.75)
  const [isPlaying, setIsPlaying] = useState(false);
  const [viewMode, setViewMode] = useState('folded'); // 'folded' (loop) or 'unrolled'

  // Time series sequence values (t=1..8)
  const sequenceData = [
    { t: 1, x: 0.15, label: 't=1' },
    { t: 2, x: 0.40, label: 't=2' },
    { t: 3, x: 0.75, label: 't=3' }, // Matches StatQuest 0.75
    { t: 4, x: 0.25, label: 't=4' },
    { t: 5, x: 0.45, label: 't=5' },
    { t: 6, x: 0.85, label: 't=6' },
    { t: 7, x: 0.50, label: 't=7' },
    { t: 8, x: 0.70, label: 't=8' }
  ];

  // Model parameters (StatQuest numerical example)
  const w1 = 1.8;   // Input weight
  const w2 = -0.5;  // Recurrent hidden weight
  const w3 = 1.1;   // Output weight
  const b1 = 0.0;   // Hidden bias
  const b2 = 0.0;   // Output bias

  // Precompute all steps through time
  const computedSteps = [];
  let prevH = 0.0;

  for (let i = 0; i < sequenceData.length; i++) {
    const xt = sequenceData[i].x;
    const inputContrib = xt * w1;
    const recContrib = prevH * w2;
    const sumVal = inputContrib + recContrib + b1;
    const ht = Math.max(0, sumVal); // ReLU activation
    const yt = ht * w3 + b2;

    computedSteps.push({
      t: sequenceData[i].t,
      xt,
      prevH,
      inputContrib,
      recContrib,
      sumVal,
      ht,
      yt
    });

    prevH = ht;
  }

  // Current step computations
  const step = computedSteps[currentStep];

  // Auto-play effect
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentStep((prev) => (prev + 1) % sequenceData.length);
      }, 2400);
    }
    return () => clearInterval(timer);
  }, [isPlaying, sequenceData.length]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', height: '100%', justifyContent: 'space-between' }}>
      
      {/* Top Controls Bar */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#F8FAFC', padding: '6px 14px', borderRadius: '8px', border: '1px solid #CBD5E1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#0A345D', marginRight: '6px' }}>
            Passo Temporal:
          </span>
          {computedSteps.map((s, idx) => (
            <button
              key={s.t}
              onClick={() => { setCurrentStep(idx); setIsPlaying(false); }}
              style={{
                padding: '3px 10px',
                borderRadius: '6px',
                border: idx === currentStep ? '2px solid #1BB5D8' : '1px solid #CBD5E1',
                background: idx === currentStep ? '#0A345D' : '#FFFFFF',
                color: idx === currentStep ? '#FFFFFF' : '#475569',
                fontSize: '0.75rem',
                fontWeight: 700,
                cursor: 'pointer',
                transition: 'all 0.15s'
              }}
            >
              t = {s.t} ({s.xt.toFixed(2)})
            </button>
          ))}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #1BB5D8',
              background: isPlaying ? '#FF7043' : '#1BB5D8',
              color: '#FFFFFF',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {isPlaying ? <Pause size={13} /> : <Play size={13} />}
            {isPlaying ? 'Pausar' : 'Animar Passos'}
          </button>

          <button
            onClick={() => { setCurrentStep(0); setIsPlaying(false); }}
            style={{
              padding: '4px 8px',
              borderRadius: '6px',
              border: '1px solid #CBD5E1',
              background: '#FFFFFF',
              color: '#64748B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
            title="Reiniciar para t=1"
          >
            <RotateCcw size={13} />
          </button>

          <div style={{ width: '1px', height: '20px', background: '#CBD5E1', margin: '0 4px' }} />

          <button
            onClick={() => setViewMode(viewMode === 'folded' ? 'unrolled' : 'folded')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid #0A345D',
              background: viewMode === 'unrolled' ? '#0A345D' : '#FFFFFF',
              color: viewMode === 'unrolled' ? '#FFFFFF' : '#0A345D',
              fontSize: '0.72rem',
              fontWeight: 700,
              cursor: 'pointer'
            }}
          >
            {viewMode === 'folded' ? <Repeat size={13} /> : <Layers size={13} />}
            {viewMode === 'folded' ? 'Ver Desenrolada' : 'Ver Loop Recorrente'}
          </button>
        </div>
      </div>

      {/* Main Diagram Area */}
      {viewMode === 'folded' ? (
        /* StatQuest-style Single Cell with Recurrent Loop */
        <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '14px 20px', position: 'relative', boxShadow: '0 4px 12px rgba(10,52,93,0.05)' }}>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0A345D', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Cálculo Interno do Neurônio Recorrente no Timestep t = {step.t}
            </span>
            <span style={{ fontSize: '0.72rem', background: '#E0F2FE', color: '#0369A1', padding: '2px 8px', borderRadius: '4px', fontWeight: 700 }}>
              Pesos Fixos Compartilhados: w₁={w1}, w₂={w2}, w₃={w3}
            </span>
          </div>

          {/* Architecture Flow Diagram */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', position: 'relative', padding: '12px 0 24px 0' }}>
            
            {/* Input Box */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0E7490' }}>Input (x_{'{t}'})</span>
              <div style={{ background: '#E0F2FE', border: '2.5px solid #0284C7', borderRadius: '8px', padding: '8px 14px', fontSize: '1.05rem', fontWeight: 800, color: '#0369A1', minWidth: '70px', textAlign: 'center', boxShadow: '0 2px 6px rgba(2,132,199,0.2)' }}>
                {step.xt.toFixed(2)}
              </div>
            </div>

            {/* w1 Weight Box */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0284C7' }}>w₁</span>
              <div style={{ background: '#F0F9FF', border: '1.5px solid #38BDF8', borderRadius: '6px', padding: '4px 8px', fontSize: '0.78rem', fontWeight: 700, color: '#0369A1' }}>
                × {w1}
              </div>
              <span style={{ fontSize: '0.66rem', color: '#0369A1', fontWeight: 600 }}>={step.inputContrib.toFixed(2)}</span>
            </div>

            <ArrowRight size={18} color="#0284C7" />

            {/* Summation Node */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#475569' }}>Soma + b₁</span>
              <div style={{ background: '#F8FAFC', border: '2px solid #64748B', borderRadius: '8px', padding: '8px 12px', fontSize: '0.82rem', fontWeight: 800, color: '#1E293B', textAlign: 'center', minWidth: '95px' }}>
                sum <span style={{ color: '#0284C7', fontSize: '0.76rem' }}>+ {b1.toFixed(1)}</span>
                <div style={{ fontSize: '0.72rem', color: '#475569', fontWeight: 700, marginTop: '2px', borderTop: '1px dashed #CBD5E1', paddingTop: '2px' }}>
                  = {step.sumVal.toFixed(2)}
                </div>
              </div>
            </div>

            <ArrowRight size={18} color="#0284C7" />

            {/* Activation Function Box (ReLU/Tanh) */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px', position: 'relative' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#0A345D' }}>Ativação (ReLU)</span>
              <div style={{ background: '#FFFFFF', border: '2.5px solid #0284C7', borderRadius: '8px', padding: '6px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '85px', height: '65px', position: 'relative', boxShadow: '0 4px 10px rgba(10,52,93,0.1)' }}>
                {/* Mini ReLU SVG Curve */}
                <svg width="40" height="24" viewBox="0 0 40 24">
                  <line x1="2" y1="20" x2="38" y2="20" stroke="#CBD5E1" strokeWidth="1.5" />
                  <line x1="20" y1="2" x2="20" y2="22" stroke="#CBD5E1" strokeWidth="1.5" />
                  <path d="M 4 20 L 20 20 L 36 4" fill="none" stroke="#0284C7" strokeWidth="2.5" strokeLinecap="round" />
                </svg>
                <div style={{ fontSize: '0.75rem', fontWeight: 800, color: '#0A345D', marginTop: '2px' }}>
                  h_{step.t} = {step.ht.toFixed(2)}
                </div>
              </div>
            </div>

            {/* Output Weight w3 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16A34A' }}>w₃</span>
              <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '6px', padding: '4px 8px', fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>
                × {w3}
              </div>
            </div>

            <ArrowRight size={18} color="#16A34A" />

            {/* Output Bias b2 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700, color: '#16A34A' }}>b₂</span>
              <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '6px', padding: '4px 8px', fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>
                + {b2.toFixed(1)}
              </div>
            </div>

            <ArrowRight size={18} color="#16A34A" />

            {/* Final Output Box */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
              <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>Output (ŷ_{'{t}'})</span>
              <div style={{ background: '#DCFCE7', border: '2.5px solid #16A34A', borderRadius: '8px', padding: '8px 14px', fontSize: '1.05rem', fontWeight: 800, color: '#166534', minWidth: '70px', textAlign: 'center', boxShadow: '0 2px 6px rgba(22,163,74,0.2)' }}>
                {step.yt.toFixed(2)}
              </div>
            </div>

          </div>

          {/* Recurrent Feedback Loop Bar (Bottom Curve) */}
          <div style={{ background: '#F8FAFC', border: '1.5px dashed #0A345D', borderRadius: '8px', padding: '6px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 auto', maxWidth: '85%' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Repeat size={16} color="#0A345D" />
              <span style={{ fontSize: '0.74rem', fontWeight: 700, color: '#0A345D' }}>
                Loop de Memória (Feedback Recorrente):
              </span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.76rem' }}>
              <span style={{ color: '#475569' }}>
                Memória do passo anterior <MathView math={`h_{${step.t-1}}`} /> = <strong>{step.prevH.toFixed(2)}</strong>
              </span>
              <span style={{ background: '#EFF6FF', border: '1px solid #93C5FD', padding: '2px 8px', borderRadius: '4px', fontWeight: 800, color: '#1D4ED8' }}>
                × w₂ ({w2}) = {step.recContrib.toFixed(2)}
              </span>
              <span style={{ color: '#0A345D', fontWeight: 700 }}>
                ➔ Entra somando no passo atual!
              </span>
            </div>
          </div>

        </div>
      ) : (
        /* Unrolled View (Steps t-1, t, t+1 side-by-side) */
        <div style={{ background: '#FFFFFF', border: '1.5px solid #CBD5E1', borderRadius: '10px', padding: '14px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
          {[
            Math.max(0, currentStep - 1),
            currentStep,
            Math.min(computedSteps.length - 1, currentStep + 1)
          ].map((idx, pos) => {
            const s = computedSteps[idx];
            const isCurrent = idx === currentStep;
            return (
              <div
                key={pos}
                style={{
                  background: isCurrent ? '#F0F9FF' : '#F8FAFC',
                  border: isCurrent ? '2px solid #0284C7' : '1px solid #CBD5E1',
                  borderRadius: '8px',
                  padding: '10px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '6px'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '0.74rem', fontWeight: 800, color: isCurrent ? '#0369A1' : '#64748B' }}>
                    Timestep t = {s.t} {isCurrent && '★ (Ativo)'}
                  </span>
                  <span style={{ fontSize: '0.68rem', background: '#E2E8F0', padding: '1px 6px', borderRadius: '4px' }}>
                    x_{s.t} = {s.xt.toFixed(2)}
                  </span>
                </div>

                <div style={{ fontSize: '0.72rem', color: '#334155', lineHeight: '1.4' }}>
                  <div>• Entrada: <MathView math={`${s.xt.toFixed(2)} \\times ${w1} = ${s.inputContrib.toFixed(2)}`} /></div>
                  <div>• Recorrência: <MathView math={`h_{${s.t-1}} \\times (${w2}) = ${s.recContrib.toFixed(2)}`} /></div>
                  <div>• Estado: <strong style={{ color: '#0A345D' }}><MathView math={`h_{${s.t}} = ${s.ht.toFixed(2)}`} /></strong></div>
                  <div>• Saída: <strong style={{ color: '#166534' }}><MathView math={`\\hat{y}_{${s.t}} = ${s.yt.toFixed(2)}`} /></strong></div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Bottom Area: Mini Time-Series Chart & Math Breakdown */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '12px' }}>
        
        {/* Time-Series Chart */}
        <div style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A345D', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <TrendingUp size={14} color="#0284C7" /> Série Temporal de Entrada vs Previsão
            </span>
            <span style={{ fontSize: '0.68rem', color: '#64748B' }}>
              Ponto Atual: <strong style={{ color: '#0284C7' }}>x_{step.t} = {step.xt.toFixed(2)}</strong> | Previsão: <strong style={{ color: '#16A34A' }}>ŷ_{step.t} = {step.yt.toFixed(2)}</strong>
            </span>
          </div>

          {/* SVG Line Chart */}
          <svg width="100%" height="85" viewBox="0 0 420 85" style={{ overflow: 'visible' }}>
            {/* Grid lines */}
            <line x1="30" y1="15" x2="400" y2="15" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="45" x2="400" y2="45" stroke="#F1F5F9" strokeWidth="1" />
            <line x1="30" y1="70" x2="400" y2="70" stroke="#CBD5E1" strokeWidth="1.5" />

            {/* Y Axis Labels */}
            <text x="20" y="18" fontSize="8" fill="#94A3B8" textAnchor="end">1.0</text>
            <text x="20" y="48" fontSize="8" fill="#94A3B8" textAnchor="end">0.5</text>
            <text x="20" y="73" fontSize="8" fill="#94A3B8" textAnchor="end">0.0</text>

            {/* Plot Historical Line */}
            {computedSteps.map((pt, i) => {
              if (i === 0) return null;
              const prevPt = computedSteps[i - 1];
              const x1 = 45 + (i - 1) * 48;
              const y1 = 70 - prevPt.xt * 55;
              const x2 = 45 + i * 48;
              const y2 = 70 - pt.xt * 55;
              const isPastOrCurrent = i <= currentStep;

              return (
                <line
                  key={i}
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke={isPastOrCurrent ? '#0284C7' : '#CBD5E1'}
                  strokeWidth={isPastOrCurrent ? 2.5 : 1.5}
                  strokeDasharray={isPastOrCurrent ? 'none' : '3 3'}
                />
              );
            })}

            {/* Plot Points & Timestep markers */}
            {computedSteps.map((pt, i) => {
              const cx = 45 + i * 48;
              const cy = 70 - pt.xt * 55;
              const isCurrent = i === currentStep;

              return (
                <g key={i}>
                  {/* Vertical Timestep Guide */}
                  <line x1={cx} y1="15" x2={cx} y2="70" stroke={isCurrent ? '#0284C7' : '#F1F5F9'} strokeWidth={isCurrent ? 1.5 : 1} strokeDasharray="2 2" />
                  
                  {/* Point Circle */}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isCurrent ? 6 : 3.5}
                    fill={isCurrent ? '#0284C7' : '#94A3B8'}
                    stroke="#FFFFFF"
                    strokeWidth="1.5"
                  />

                  {/* Highlight Ring for Current */}
                  {isCurrent && (
                    <circle cx={cx} cy={cy} r="9" fill="none" stroke="#38BDF8" strokeWidth="1.5" opacity="0.7" />
                  )}

                  {/* Predicted Next Point Indicator */}
                  {isCurrent && (
                    <g>
                      {/* Prediction Arrow */}
                      <path
                        d={`M ${cx} ${cy} Q ${cx + 24} ${cy - 12} ${cx + 40} ${70 - step.yt * 55}`}
                        fill="none"
                        stroke="#16A34A"
                        strokeWidth="2"
                        strokeDasharray="3 2"
                      />
                      <circle
                        cx={cx + 40}
                        cy={70 - step.yt * 55}
                        r="5"
                        fill="#16A34A"
                        stroke="#FFFFFF"
                        strokeWidth="1.5"
                      />
                      <text x={cx + 40} y={70 - step.yt * 55 - 7} fontSize="8" fill="#166534" fontWeight="800" textAnchor="middle">
                        ? ({step.yt.toFixed(2)})
                      </text>
                    </g>
                  )}

                  {/* X Axis Label */}
                  <text x={cx} y="82" fontSize="8" fill={isCurrent ? '#0A345D' : '#64748B'} fontWeight={isCurrent ? '800' : '500'} textAnchor="middle">
                    {pt.t}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Exact Arithmetic Breakdown */}
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <span style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0A345D', marginBottom: '6px' }}>
            Aritmética do Timestep {step.t}:
          </span>
          <div style={{ fontSize: '0.75rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '3px' }}>
            <div>
              <span style={{ color: '#0369A1', fontWeight: 700 }}>1. Entrada:</span> <MathView math={`${step.xt.toFixed(2)} \\times ${w1} = \\mathbf{${step.inputContrib.toFixed(2)}}`} />
            </div>
            <div>
              <span style={{ color: '#0A345D', fontWeight: 700 }}>2. Memória:</span> <MathView math={`${step.prevH.toFixed(2)} \\times (${w2}) = \\mathbf{${step.recContrib.toFixed(2)}}`} />
            </div>
            <div>
              <span style={{ color: '#9A3412', fontWeight: 700 }}>3. Soma:</span> <MathView math={`${step.inputContrib.toFixed(2)} + (${step.recContrib.toFixed(2)}) = \\mathbf{${step.sumVal.toFixed(2)}}`} />
            </div>
            <div>
              <span style={{ color: '#166534', fontWeight: 700 }}>4. Saída:</span> <MathView math={`\\text{ReLU}(${step.sumVal.toFixed(2)}) \\times ${w3} = \\mathbf{${step.yt.toFixed(2)}}`} />
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
