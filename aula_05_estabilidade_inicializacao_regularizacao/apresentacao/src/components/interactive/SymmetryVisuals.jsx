import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  Zap, 
  TrendingDown, 
  Layers, 
  Activity,
  Split,
  Compass
} from 'lucide-react';

/* =========================================================================
   1. VISUALIZADOR 1: O COLAPSO DE SIMETRIA (PESOS ZERADOS: W = 0)
   ========================================================================= */
export function SymmetryCollapseVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '1. Pesos Nulos',
      badge: 'INICIALIZAÇÃO W = 0',
      badgeColor: '#64748B',
      title: 'Todos os pesos e bias iniciam exatamente em zero',
      desc: 'Em regressão linear simples y = wx + b, começar em zero funciona. Em redes neurais profundas, todas as sinapses partem com w = 0.0.',
      status: 'Aguardando fluxo de sinal...'
    },
    {
      label: '2. Forward Idêntico',
      badge: 'ATIVAÇÕES DUPLICADAS',
      badgeColor: '#FF7043',
      title: 'Todos os neurônios produzem a mesma saída z = 0',
      desc: 'Para qualquer entrada (x₁, x₂), a combinação linear z = Σ wᵢxᵢ resulta em 0. As ativações a = σ(0) ou ReLU(0) são 100% idênticas em toda a camada.',
      status: 'a₁ = a₂ = a₃ (Sem diferenciação)'
    },
    {
      label: '3. Backward Idêntico',
      badge: 'GRADIENTES GÊMEOS',
      badgeColor: '#D84315',
      title: 'O erro retropropagado é rigorosamente o mesmo',
      desc: 'Pela regra da cadeia, ∂L/∂w = ∂L/∂z · x. Como todos os z e pesos de saída são iguais, todos os neurônios recebem o mesmo gradiente ∇w.',
      status: '∇w₁ = ∇w₂ = ∇w₃ (Sem especialização)'
    },
    {
      label: '4. Colapso da Camada',
      badge: 'COLAPSO REPRESENTACIONAL',
      badgeColor: '#C62828',
      title: 'A camada inteira se comporta como se tivesse apenas 1 neurônio',
      desc: 'Ao atualizar W ← W - η∇W, todos os neurônios continuam iguais para sempre. Ter 1.000 neurônios nesta camada equivale a ter exatamente um!',
      status: 'Capacidade efetiva = 1 neurônio redundante'
    }
  ];

  const current = steps[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Stepper Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: step === idx ? '2px solid var(--infnet-orange)' : '1px solid #E2E8F0',
              background: step === idx ? 'linear-gradient(135deg, #FFF7ED, #FEF2F2)' : '#FFFFFF',
              color: step === idx ? '#C62828' : '#64748B',
              fontWeight: step === idx ? '700' : '500',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '0.72rem', color: s.badgeColor, fontWeight: '800' }}>PASSO {idx + 1}</span>
            <span style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.label.split('. ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Main Visual Arena */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1
      }}>
        {/* Top Status Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: current.badgeColor + '20',
              color: current.badgeColor,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.5px'
            }}>
              {current.badge}
            </span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--infnet-dark-blue)' }}>{current.title}</strong>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#D84315', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <AlertTriangle size={16} /> {current.status}
          </span>
        </div>

        {/* SVG Network Canvas */}
        <div style={{
          flex: 1,
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #CBD5E1',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '260px'
        }}>
          <svg viewBox="0 0 760 250" style={{ width: '100%', height: '100%', maxHeight: '270px' }}>
            <defs>
              <linearGradient id="collapseGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#94A3B8" />
                <stop offset="100%" stopColor="#CBD5E1" />
              </linearGradient>
              <marker id="arrow" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#D84315" />
              </marker>
              <filter id="shadowGlow" x="-20%" y="-20%" width="140%" height="140%">
                <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="rgba(216, 67, 21, 0.25)" />
              </filter>
            </defs>

            {/* SYNAPSE CONNECTIONS: Input to Hidden */}
            {/* From x1 (110, 80) */}
            <line x1="130" y1="80" x2="310" y2="55" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />
            <line x1="130" y1="80" x2="310" y2="125" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />
            <line x1="130" y1="80" x2="310" y2="195" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />

            {/* From x2 (110, 170) */}
            <line x1="130" y1="170" x2="310" y2="55" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />
            <line x1="130" y1="170" x2="310" y2="125" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />
            <line x1="130" y1="170" x2="310" y2="195" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} strokeDasharray={step === 0 ? "4 4" : "none"} />

            {/* CONNECTIONS: Hidden to Output */}
            <line x1="370" y1="55" x2="550" y2="125" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} />
            <line x1="370" y1="125" x2="550" y2="125" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} />
            <line x1="370" y1="195" x2="550" y2="125" stroke={step >= 2 ? '#FF7043' : '#CBD5E1'} strokeWidth={step >= 2 ? 3 : 2} />

            {/* CONNECTIONS: Output to Loss */}
            <line x1="610" y1="125" x2="680" y2="125" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />

            {/* BACKWARD GRADIENT FLOW ARROWS (Step 2 and 3) */}
            {step >= 2 && (
              <g className="animate-draw">
                {/* Backprop arrows */}
                <path d="M 670 115 L 620 115" stroke="#D84315" strokeWidth="3" markerEnd="url(#arrow)" />
                <path d="M 540 110 L 380 55" stroke="#D84315" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <path d="M 540 125 L 380 125" stroke="#D84315" strokeWidth="2.5" markerEnd="url(#arrow)" />
                <path d="M 540 140 L 380 195" stroke="#D84315" strokeWidth="2.5" markerEnd="url(#arrow)" />

                <text x="460" y="80" fill="#D84315" fontSize="11" fontWeight="700">∇w = idêntico</text>
                <text x="460" y="175" fill="#D84315" fontSize="11" fontWeight="700">∇w = idêntico</text>
              </g>
            )}

            {/* SYNAPSE LABELS in Step 0 & 1 */}
            {step <= 1 && (
              <g fontSize="10" fill="#64748B" fontWeight="600">
                <rect x="200" y="58" width="38" height="16" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
                <text x="219" y="70" textAnchor="middle">w = 0</text>
                <rect x="200" y="105" width="38" height="16" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
                <text x="219" y="117" textAnchor="middle">w = 0</text>
                <rect x="200" y="152" width="38" height="16" rx="4" fill="#FFFFFF" stroke="#CBD5E1" />
                <text x="219" y="164" textAnchor="middle">w = 0</text>
              </g>
            )}

            {/* STEP 3 COLLAPSE BOUNDING BOX */}
            {step === 3 && (
              <g filter="url(#shadowGlow)">
                <rect 
                  x="290" 
                  y="20" 
                  width="100" 
                  height="210" 
                  rx="14" 
                  fill="rgba(255, 112, 67, 0.08)" 
                  stroke="#FF7043" 
                  strokeWidth="2.5" 
                  strokeDasharray="6 4" 
                />
                <rect x="295" y="6" width="90" height="20" rx="6" fill="#C62828" />
                <text x="340" y="20" textAnchor="middle" fill="#FFFFFF" fontSize="10" fontWeight="800">
                  1 NEURÔNIO SÓ!
                </text>
              </g>
            )}

            {/* INPUT NODES */}
            <g transform="translate(110, 80)">
              <circle r="22" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">x₁</text>
              <text x="0" y="-28" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Entrada 1</text>
            </g>

            <g transform="translate(110, 170)">
              <circle r="22" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">x₂</text>
              <text x="0" y="32" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Entrada 2</text>
            </g>

            {/* HIDDEN NODES (h1, h2, h3) */}
            {[
              { id: 'h₁', y: 55, num: 1 },
              { id: 'h₂', y: 125, num: 2 },
              { id: 'h₃', y: 195, num: 3 }
            ].map(h => (
              <g key={h.id} transform={`translate(340, ${h.y})`}>
                <circle 
                  r="24" 
                  fill={step >= 1 ? '#FFF7ED' : '#FFFFFF'} 
                  stroke={step >= 2 ? '#D84315' : step >= 1 ? '#FF7043' : '#CBD5E1'} 
                  strokeWidth={step >= 1 ? 3 : 2} 
                />
                <text x="0" y="-2" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">{h.id}</text>
                <text x="0" y="12" textAnchor="middle" fill={step >= 1 ? '#D84315' : '#64748B'} fontSize="9" fontWeight="700">
                  {step >= 1 ? 'a = 0.5' : 'w = 0'}
                </text>
                {step >= 2 && (
                  <text x="40" y="4" fill="#D84315" fontSize="10" fontWeight="800">
                    δ = -0.32
                  </text>
                )}
              </g>
            ))}

            {/* HIDDEN LAYER TITLE */}
            <text x="340" y="16" textAnchor="middle" fill="var(--infnet-dark-blue)" fontSize="11" fontWeight="800">
              Camada Oculta (3 Neurônios)
            </text>

            {/* OUTPUT NODE */}
            <g transform="translate(580, 125)">
              <circle r="24" fill="#FFFFFF" stroke="#1BB5D8" strokeWidth="2.5" />
              <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">ŷ</text>
              <text x="0" y="-30" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Saída</text>
            </g>

            {/* LOSS NODE */}
            <g transform="translate(710, 125)">
              <rect x="-24" y="-18" width="48" height="36" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
              <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Loss L</text>
            </g>

            {/* STEP 3 COLLAPSE EQUALITY OVERLAY */}
            {step === 3 && (
              <g transform="translate(340, 240)">
                <rect x="-110" y="-10" width="220" height="22" rx="6" fill="#FEE2E2" stroke="#EF4444" />
                <text x="0" y="5" textAnchor="middle" fill="#991B1B" fontSize="11" fontWeight="800">
                  h₁(x) ≡ h₂(x) ≡ h₃(x) (100% CÓPIAS)
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Educational Callout */}
        <div style={{
          background: step === 3 ? '#FEF2F2' : '#F8FAFC',
          borderLeft: `4px solid ${current.badgeColor}`,
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: current.badgeColor, marginBottom: '2px' }}>
              DIAGNÓSTICO TEÓRICO:
            </div>
            <div style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: '1.4' }}>
              {current.desc}
            </div>
          </div>
          <button
            onClick={() => setStep((prev) => (prev + 1) % steps.length)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              marginLeft: '14px'
            }}
          >
            {step === steps.length - 1 ? <RotateCcw size={14} /> : <ArrowRight size={14} />}
            {step === steps.length - 1 ? 'Reiniciar' : 'Avançar Passo'}
          </button>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. VISUALIZADOR 2: A QUEBRA DE SIMETRIA (INICIALIZAÇÃO CALIBRADA)
   ========================================================================= */
export function SymmetryBreakingVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      label: '1. Pesos Diversificados',
      badge: 'RUÍDO GAUSSIANO W ~ N(0, σ²)',
      badgeColor: '#0E4E8A',
      title: 'Cada sinapse recebe um valor aleatório distinto e calibrado',
      desc: 'Pesos pequenos com sinais positivos e negativos geram quebra imediata de simetria: w₁₁ = +0.62, w₁₂ = -0.45, w₁₃ = +0.81.',
      status: 'Sinapses com orientações únicas'
    },
    {
      label: '2. Forward Especializado',
      badge: 'RESPOSTAS DIVERSIFICADAS',
      badgeColor: '#1BB5D8',
      title: 'Cada neurônio foca em uma combinação diferente de entradas',
      desc: 'As combinações lineares divergem: z₁ = +1.2 (dispara ReLU), z₂ = -0.4 (inibe), z₃ = +0.7. Cada unidade ativa para diferentes exemplos.',
      status: 'a₁ ≠ a₂ ≠ a₃ (Detecção rica)'
    },
    {
      label: '3. Backward Independente',
      badge: 'GRADIENTES ESPECIALIZADOS',
      badgeColor: '#7CB342',
      title: 'Cada peso recebe correções em direções complementares',
      desc: 'A regra da cadeia retropropaga erros singulares para cada neurônio (∇w₁ ≠ ∇w₂ ≠ ∇w₃). Cada um corrige sua própria trajetória no espaço de perda.',
      status: 'Aprendizado descorrelacionado'
    },
    {
      label: '4. Fronteiras Complementares',
      badge: 'CAPACIDADE PLENA',
      badgeColor: '#2E7D32',
      title: 'Múltiplas retas combinam-se para separar classes complexas',
      desc: 'No plano 2D, cada neurônio traça uma reta própria de corte. A saída combina essas 3 retas em um polígono convexo que isola a classe desejada!',
      status: '100% da capacidade aproveitada'
    }
  ];

  const current = steps[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Stepper Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            style={{
              padding: '8px 12px',
              borderRadius: '10px',
              border: step === idx ? '2px solid var(--infnet-cyan)' : '1px solid #E2E8F0',
              background: step === idx ? 'linear-gradient(135deg, #F0FDF4, #EFF6FF)' : '#FFFFFF',
              color: step === idx ? 'var(--infnet-dark-blue)' : '#64748B',
              fontWeight: step === idx ? '700' : '500',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              display: 'flex',
              flexDirection: 'column',
              gap: '2px'
            }}
          >
            <span style={{ fontSize: '0.72rem', color: s.badgeColor, fontWeight: '800' }}>PASSO {idx + 1}</span>
            <span style={{ fontSize: '0.85rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.label.split('. ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Main Visual Arena */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '16px 20px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        flex: 1
      }}>
        {/* Top Status Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{
              background: current.badgeColor + '20',
              color: current.badgeColor,
              padding: '4px 10px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              fontWeight: '800',
              letterSpacing: '0.5px'
            }}>
              {current.badge}
            </span>
            <strong style={{ fontSize: '0.95rem', color: 'var(--infnet-dark-blue)' }}>{current.title}</strong>
          </div>
          <span style={{ fontSize: '0.85rem', color: '#2E7D32', fontWeight: '700', display: 'flex', alignItems: 'center', gap: '4px' }}>
            <CheckCircle2 size={16} /> {current.status}
          </span>
        </div>

        {/* SVG Network Canvas with 2D Boundary Plan in Step 4 */}
        <div style={{
          flex: 1,
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #CBD5E1',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '260px'
        }}>
          <svg viewBox="0 0 760 250" style={{ width: '100%', height: '100%', maxHeight: '270px' }}>
            <defs>
              <marker id="arrowGreen" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#2E7D32" />
              </marker>
              <marker id="arrowCyan" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                <path d="M 0 1 L 10 5 L 0 9 z" fill="#0284C7" />
              </marker>
            </defs>

            {/* If Step 3 (index 3), show Dual View: Left = Network, Right = 2D Decision Space */}
            {step === 3 ? (
              <g>
                {/* LEFT: Compact Network (x: 20 to 360) */}
                <text x="180" y="18" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800">
                  Arquitetura Neural com 3 Detectores
                </text>

                {/* Lines */}
                <line x1="60" y1="80" x2="160" y2="55" stroke="#1BB5D8" strokeWidth="2.5" />
                <line x1="60" y1="80" x2="160" y2="125" stroke="#FF7043" strokeWidth="2.5" />
                <line x1="60" y1="80" x2="160" y2="195" stroke="#7CB342" strokeWidth="2.5" />

                <line x1="60" y1="170" x2="160" y2="55" stroke="#FF7043" strokeWidth="2.5" />
                <line x1="60" y1="170" x2="160" y2="125" stroke="#1BB5D8" strokeWidth="2.5" />
                <line x1="60" y1="170" x2="160" y2="195" stroke="#AB47BC" strokeWidth="2.5" />

                <line x1="200" y1="55" x2="300" y2="125" stroke="#1BB5D8" strokeWidth="2" />
                <line x1="200" y1="125" x2="300" y2="125" stroke="#FF7043" strokeWidth="2" />
                <line x1="200" y1="195" x2="300" y2="125" stroke="#7CB342" strokeWidth="2" />

                {/* Input nodes */}
                <circle cx="50" cy="80" r="16" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2" />
                <text x="50" y="84" textAnchor="middle" fill="#0A345D" fontSize="10" fontWeight="700">x₁</text>

                <circle cx="50" cy="170" r="16" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2" />
                <text x="50" y="174" textAnchor="middle" fill="#0A345D" fontSize="10" fontWeight="700">x₂</text>

                {/* Hidden nodes */}
                <circle cx="180" cy="55" r="18" fill="#EFF6FF" stroke="#0284C7" strokeWidth="2.5" />
                <text x="180" y="59" textAnchor="middle" fill="#0369A1" fontSize="10" fontWeight="800">h₁</text>

                <circle cx="180" cy="125" r="18" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.5" />
                <text x="180" y="129" textAnchor="middle" fill="#C2410C" fontSize="10" fontWeight="800">h₂</text>

                <circle cx="180" cy="195" r="18" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />
                <text x="180" y="199" textAnchor="middle" fill="#15803D" fontSize="10" fontWeight="800">h₃</text>

                {/* Output node */}
                <circle cx="315" cy="125" r="18" fill="#FFFFFF" stroke="#0A345D" strokeWidth="2.5" />
                <text x="315" y="129" textAnchor="middle" fill="#0A345D" fontSize="10" fontWeight="800">ŷ</text>

                {/* Divider Line */}
                <line x1="380" y1="20" x2="380" y2="235" stroke="#CBD5E1" strokeWidth="1.5" strokeDasharray="4 4" />

                {/* RIGHT: 2D Feature Space (x: 410 to 730) */}
                <g transform="translate(420, 25)">
                  <text x="150" y="-5" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800">
                    Espaço de Decisão 2D: Triangulação Não-Linear
                  </text>
                  {/* Cartesian axes */}
                  <rect x="20" y="10" width="260" height="190" fill="#FFFFFF" stroke="#E2E8F0" rx="8" />
                  <line x1="30" y1="180" x2="270" y2="180" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="40" y1="20" x2="40" y2="190" stroke="#94A3B8" strokeWidth="1.5" />
                  <text x="260" y="195" fill="#64748B" fontSize="9" fontWeight="700">x₁</text>
                  <text x="28" y="24" fill="#64748B" fontSize="9" fontWeight="700">x₂</text>

                  {/* 3 Decision Hyperplanes */}
                  {/* Line 1 (h1 - blue) */}
                  <line x1="50" y1="160" x2="250" y2="70" stroke="#0284C7" strokeWidth="2.5" />
                  <text x="245" y="65" fill="#0284C7" fontSize="9" fontWeight="800">Fronteira h₁</text>

                  {/* Line 2 (h2 - orange) */}
                  <line x1="70" y1="40" x2="230" y2="175" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="5 3" />
                  <text x="215" y="185" fill="#EA580C" fontSize="9" fontWeight="800">Fronteira h₂</text>

                  {/* Line 3 (h3 - green) */}
                  <line x1="160" y1="25" x2="160" y2="180" stroke="#16A34A" strokeWidth="2.5" />
                  <text x="165" y="35" fill="#16A34A" fontSize="9" fontWeight="800">Fronteira h₃</text>

                  {/* Enclosed Polygon / Decision Area */}
                  <polygon points="120,130 160,110 160,150" fill="rgba(46, 125, 50, 0.25)" stroke="#2E7D32" strokeWidth="1.5" />
                  
                  {/* Class Samples */}
                  <circle cx="145" cy="130" r="4" fill="#2E7D32" />
                  <circle cx="138" cy="138" r="4" fill="#2E7D32" />
                  <circle cx="152" cy="122" r="4" fill="#2E7D32" />
                  <circle cx="70" cy="150" r="4" fill="#E11D48" />
                  <circle cx="210" cy="60" r="4" fill="#E11D48" />
                  <circle cx="220" cy="150" r="4" fill="#E11D48" />
                  <circle cx="90" cy="80" r="4" fill="#E11D48" />

                  <rect x="70" y="14" width="160" height="18" rx="4" fill="#F0FDF4" stroke="#86EFAC" />
                  <text x="150" y="26" textAnchor="middle" fill="#166534" fontSize="9" fontWeight="800">
                    Região Não-Linear Fechada!
                  </text>
                </g>
              </g>
            ) : (
              /* FULL NETWORK VIEW FOR STEPS 0, 1, 2 */
              <g>
                {/* CONNECTIONS Input to Hidden */}
                <line x1="130" y1="80" x2="310" y2="55" stroke="#0284C7" strokeWidth="3" />
                <line x1="130" y1="80" x2="310" y2="125" stroke="#EA580C" strokeWidth="2" strokeDasharray="4 2" />
                <line x1="130" y1="80" x2="310" y2="195" stroke="#16A34A" strokeWidth="3.5" />

                <line x1="130" y1="170" x2="310" y2="55" stroke="#EA580C" strokeWidth="2.5" />
                <line x1="130" y1="170" x2="310" y2="125" stroke="#0284C7" strokeWidth="3.5" />
                <line x1="130" y1="170" x2="310" y2="195" stroke="#9333EA" strokeWidth="2" />

                {/* CONNECTIONS Hidden to Output */}
                <line x1="370" y1="55" x2="550" y2="125" stroke="#0284C7" strokeWidth="3" />
                <line x1="370" y1="125" x2="550" y2="125" stroke="#EA580C" strokeWidth="2.5" />
                <line x1="370" y1="195" x2="550" y2="125" stroke="#16A34A" strokeWidth="3" />

                <line x1="610" y1="125" x2="680" y2="125" stroke="#CBD5E1" strokeWidth="2" strokeDasharray="3 3" />

                {/* BACKWARD FLOW ARROWS (Step 2) */}
                {step === 2 && (
                  <g className="animate-draw">
                    <path d="M 670 115 L 620 115" stroke="#2E7D32" strokeWidth="3" markerEnd="url(#arrowGreen)" />
                    <path d="M 540 110 L 380 55" stroke="#0284C7" strokeWidth="2.5" markerEnd="url(#arrowCyan)" />
                    <path d="M 540 125 L 380 125" stroke="#EA580C" strokeWidth="2.5" markerEnd="url(#arrowGreen)" />
                    <path d="M 540 140 L 380 195" stroke="#16A34A" strokeWidth="2.5" markerEnd="url(#arrowGreen)" />

                    <text x="460" y="80" fill="#0284C7" fontSize="11" fontWeight="700">∇w₁ = +0.28</text>
                    <text x="460" y="120" fill="#EA580C" fontSize="11" fontWeight="700">∇w₂ = -0.05</text>
                    <text x="460" y="175" fill="#16A34A" fontSize="11" fontWeight="700">∇w₃ = -0.42</text>
                  </g>
                )}

                {/* SYNAPSE WEIGHT BADGES in Step 0 & 1 */}
                {step <= 1 && (
                  <g fontSize="10" fontWeight="700">
                    <rect x="180" y="54" width="46" height="18" rx="4" fill="#EFF6FF" stroke="#93C5FD" />
                    <text x="203" y="67" textAnchor="middle" fill="#0369A1">+0.62</text>

                    <rect x="220" y="100" width="46" height="18" rx="4" fill="#FFF7ED" stroke="#FDBA74" />
                    <text x="243" y="113" textAnchor="middle" fill="#C2410C">-0.45</text>

                    <rect x="180" y="152" width="46" height="18" rx="4" fill="#F0FDF4" stroke="#86EFAC" />
                    <text x="203" y="165" textAnchor="middle" fill="#15803D">+0.81</text>
                  </g>
                )}

                {/* INPUT NODES */}
                <g transform="translate(110, 80)">
                  <circle r="22" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">x₁</text>
                  <text x="0" y="-28" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Entrada 1</text>
                </g>

                <g transform="translate(110, 170)">
                  <circle r="22" fill="#FFFFFF" stroke="#0E4E8A" strokeWidth="2.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">x₂</text>
                  <text x="0" y="32" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Entrada 2</text>
                </g>

                {/* HIDDEN NODES with diverse activations */}
                {[
                  { id: 'h₁', y: 55, z: '+1.2', a: '1.20', bg: '#EFF6FF', border: '#0284C7', text: '#0369A1', label: 'Detector A' },
                  { id: 'h₂', y: 125, z: '-0.4', a: '0.00', bg: '#FFF7ED', border: '#EA580C', text: '#C2410C', label: 'Detector B' },
                  { id: 'h₃', y: 195, z: '+0.7', a: '0.70', bg: '#F0FDF4', border: '#16A34A', text: '#15803D', label: 'Detector C' }
                ].map(h => (
                  <g key={h.id} transform={`translate(340, ${h.y})`}>
                    <circle 
                      r="25" 
                      fill={step >= 1 ? h.bg : '#FFFFFF'} 
                      stroke={step >= 1 ? h.border : '#CBD5E1'} 
                      strokeWidth={step >= 1 ? 3 : 2} 
                    />
                    <text x="0" y="-3" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">{h.id}</text>
                    <text x="0" y="11" textAnchor="middle" fill={step >= 1 ? h.text : '#64748B'} fontSize="9" fontWeight="800">
                      {step >= 1 ? `a = ${h.a}` : 'w ~ N'}
                    </text>
                    <rect x="36" y="-10" width="70" height="18" rx="4" fill="#FFFFFF" stroke={h.border} strokeWidth="1.5" />
                    <text x="71" y="2" textAnchor="middle" fill={h.text} fontSize="9" fontWeight="800">
                      {h.label}
                    </text>
                  </g>
                ))}

                <text x="340" y="16" textAnchor="middle" fill="var(--infnet-dark-blue)" fontSize="11" fontWeight="800">
                  Camada Oculta: 3 Detectores Especializados
                </text>

                {/* OUTPUT NODE */}
                <g transform="translate(580, 125)">
                  <circle r="24" fill="#FFFFFF" stroke="#1BB5D8" strokeWidth="2.5" />
                  <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="12" fontWeight="700">ŷ</text>
                  <text x="0" y="-30" textAnchor="middle" fill="#64748B" fontSize="10" fontWeight="600">Saída</text>
                </g>

                {/* LOSS NODE */}
                <g transform="translate(710, 125)">
                  <rect x="-24" y="-18" width="48" height="36" rx="8" fill="#F1F5F9" stroke="#94A3B8" strokeWidth="2" />
                  <text x="0" y="4" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700">Loss L</text>
                </g>
              </g>
            )}
          </svg>
        </div>

        {/* Bottom Educational Callout */}
        <div style={{
          background: '#F0FDF4',
          borderLeft: `4px solid ${current.badgeColor}`,
          padding: '10px 14px',
          borderRadius: '0 8px 8px 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: current.badgeColor, marginBottom: '2px' }}>
              VANTAGEM DA QUEBRA DE SIMETRIA:
            </div>
            <div style={{ fontSize: '0.88rem', color: '#1E293B', lineHeight: '1.4' }}>
              {current.desc}
            </div>
          </div>
          <button
            onClick={() => setStep((prev) => (prev + 1) % steps.length)}
            style={{
              padding: '6px 14px',
              borderRadius: '8px',
              background: 'var(--infnet-dark-blue)',
              color: '#FFFFFF',
              border: 'none',
              cursor: 'pointer',
              fontSize: '0.8rem',
              fontWeight: '700',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              whiteSpace: 'nowrap',
              marginLeft: '14px'
            }}
          >
            {step === steps.length - 1 ? <RotateCcw size={14} /> : <ArrowRight size={14} />}
            {step === steps.length - 1 ? 'Reiniciar' : 'Avançar Passo'}
          </button>
        </div>
      </div>
    </div>
  );
}
