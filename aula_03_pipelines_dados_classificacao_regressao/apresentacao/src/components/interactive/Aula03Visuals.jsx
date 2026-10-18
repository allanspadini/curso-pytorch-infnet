import React, { useState } from 'react';
import MathView from '../MathView';

const StepBar = ({ steps, current, onChange }) => (
  <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '12px', flexWrap: 'wrap' }}>
    {steps.map((label, idx) => {
      const active = idx === current;
      const done = idx < current;
      return (
        <button
          key={idx}
          onClick={() => onChange(idx)}
          style={{
            padding: '6px 14px',
            borderRadius: '20px',
            border: `2px solid ${active ? '#1BB5D8' : done ? '#7CB342' : '#CBD5E1'}`,
            background: active ? '#0A345D' : done ? 'rgba(124, 179, 66, 0.12)' : '#FFFFFF',
            color: active ? '#FFFFFF' : done ? '#2E7D32' : '#475569',
            fontWeight: '700',
            fontSize: '0.82rem',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <span>{done ? '✓' : idx + 1}.</span>
          <span>{label}</span>
        </button>
      );
    })}
    <button
      onClick={() => onChange((current + 1) % steps.length)}
      style={{
        padding: '6px 14px',
        borderRadius: '20px',
        border: 'none',
        background: '#1BB5D8',
        color: '#0A345D',
        fontWeight: '800',
        fontSize: '0.82rem',
        cursor: 'pointer'
      }}
    >
      {current === steps.length - 1 ? '↺ Reiniciar' : '▶ Avançar Etapa'}
    </button>
  </div>
);

const CaptionBar = ({ badge, text, color = '#0A345D' }) => (
  <div style={{
    marginTop: '10px',
    padding: '10px 18px',
    background: '#F8FAFC',
    borderLeft: `5px solid ${color}`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    boxShadow: '0 2px 6px rgba(10,52,93,0.06)'
  }}>
    <span style={{
      background: color,
      color: '#FFF',
      padding: '3px 10px',
      borderRadius: '12px',
      fontSize: '0.75rem',
      fontWeight: '800',
      letterSpacing: '0.4px',
      whiteSpace: 'nowrap'
    }}>
      {badge}
    </span>
    <span style={{ fontSize: '0.98rem', fontWeight: '600', color: '#1E293B' }}>
      {text}
    </span>
  </div>
);

/* ============================================================================
   SLIDE 2: ROADMAP VISUAL PROGRESSIVO
============================================================================ */
export function RoadmapVisual() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const stages = [
    { num: '01', title: 'Split Seguro', sub: 'Zero Leakage', color: '#FF7043', icon: '🛡️', caption: 'Isolamento estrito entre Treino, Validação e Teste antes de qualquer cálculo.' },
    { num: '02', title: 'Classe Dataset', sub: '__len__ & __getitem__', color: '#1BB5D8', icon: '📦', caption: 'Encapsulamento padronizado de tensores para leitura sob demanda.' },
    { num: '03', title: 'DataLoader', sub: 'Mini-Batch & Shuffle', color: '#0E4E8A', icon: '🔀', caption: 'Fatiamento em lotes estocásticos para alimentar a GPU sem estourar memória.' },
    { num: '04', title: 'Classificação', sub: 'CrossEntropyLoss', color: '#AB47BC', icon: '🎯', caption: 'Saída multiclasse em logits brutos para prever satisfação de clientes.' },
    { num: '05', title: 'Regressão', sub: 'MSE, MAE, RMSE, R²', color: '#7CB342', icon: '📈', caption: 'Predição de valores contínuos em dólares validada contra baseline.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={stages.map(s => s.title)} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px', background: '#061F38' }}>
        <svg viewBox="0 0 1000 300" style={{ width: '100%', maxHeight: '320px' }}>
          {/* Connecting pipe */}
          <line x1="110" y1="145" x2="890" y2="145" stroke="#1E3A5F" strokeWidth="8" strokeLinecap="round" />
          <line
            x1="110"
            y1="145"
            x2={110 + step * 195}
            y2="145"
            stroke="#1BB5D8"
            strokeWidth="8"
            strokeLinecap="round"
            style={{ transition: 'all 0.4s ease' }}
          />

          {stages.map((st, idx) => {
            const cx = 110 + idx * 195;
            const visible = idx <= step;
            const current = idx === step;
            return (
              <g
                key={idx}
                onClick={() => setStep(idx)}
                style={{ cursor: 'pointer', opacity: visible ? 1 : 0.25, transition: 'all 0.35s ease' }}
              >
                {current && (
                  <circle cx={cx} cy="145" r="68" fill="none" stroke={st.color} strokeWidth="3" strokeDasharray="6 4" />
                )}
                <circle
                  cx={cx}
                  cy="145"
                  r={current ? 56 : 48}
                  fill={visible ? '#0A345D' : '#0F2942'}
                  stroke={visible ? st.color : '#334155'}
                  strokeWidth={current ? '5' : '3'}
                />
                <text x={cx} y="138" textAnchor="middle" fontSize="26">{st.icon}</text>
                <text x={cx} y="168" textAnchor="middle" fill="#64D9EF" fontSize="13" fontWeight="800" fontFamily="Fira Code">
                  ETAPA {st.num}
                </text>
                <text x={cx} y="232" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800" fontFamily="Outfit">
                  {st.title}
                </text>
                <rect x={cx - 72} y="246" width="144" height="24" rx="12" fill={st.color} opacity={visible ? 0.9 : 0.3} />
                <text x={cx} y="262" textAnchor="middle" fill="#FFFFFF" fontSize="11" fontWeight="700">
                  {st.sub}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${stages[step].num}`} text={stages[step].caption} color={stages[step].color} />
    </div>
  );
}

/* ============================================================================
   SLIDE 3: REGRA DE OURO DO PARTICIONAMENTO (ANIMAÇÃO DE BARRAS / SPLIT)
============================================================================ */
export function SplitRuleDiagram() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Erro: Fit Antes do Split', '2. Correto: Split 70/15/15 Primeiro', '3. Fit no Treino → Transform'];
  const captions = [
    'ERRADO: Calcular μ e σ no dataset inteiro faz o Teste contaminar o Treino (Data Leakage).',
    'PASSO 1 CORRETO: Particionar os dados brutos primeiro e trancar Validação e Teste.',
    'PASSO 2 CORRETO: Ajustar (.fit_transform) só no Treino e aplicar (.transform) nos demais.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 310" style={{ width: '100%', maxHeight: '325px' }}>
          {step === 0 && (
            <g>
              <text x="480" y="38" textAnchor="middle" fill="#FF7043" fontSize="18" fontWeight="800" fontFamily="Outfit">
                ⚠️ ABORDAGEM INGÊNUA (COM CONTAMINAÇÃO)
              </text>
              {/* Single monolithic bar */}
              <rect x="80" y="65" width="800" height="70" rx="12" fill="#1E3A5F" stroke="#FF7043" strokeWidth="3" />
              <text x="480" y="106" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">
                DATASET INTEIRO (100% — Treino + Teste Misturados)
              </text>

              {/* Scaler box */}
              <line x1="480" y1="135" x2="480" y2="185" stroke="#FF7043" strokeWidth="4" />
              <rect x="270" y="185" width="420" height="58" rx="10" fill="rgba(255,112,67,0.2)" stroke="#FF7043" strokeWidth="2.5" />
              <text x="480" y="212" textAnchor="middle" fill="#FF7043" fontSize="15" fontWeight="800" fontFamily="Fira Code">
                scaler.fit_transform(df_inteiro)
              </text>
              <text x="480" y="232" textAnchor="middle" fill="#FECDD3" fontSize="12" fontWeight="600">
                Média μ e Desvio σ contêm informação futura do Teste!
              </text>

              {/* Contamination arrows */}
              <path d="M 760 135 Q 760 214 690 214" fill="none" stroke="#FF7043" strokeWidth="3" strokeDasharray="6 4" />
              <text x="795" y="180" fill="#FF7043" fontSize="13" fontWeight="800">Vazamento!</text>
            </g>
          )}

          {step >= 1 && (
            <g>
              <text x="480" y="34" textAnchor="middle" fill="#7CB342" fontSize="18" fontWeight="800" fontFamily="Outfit">
                ✅ PIPELINE PROFISSIONAL ISOLADO
              </text>

              {/* Train 70% */}
              <rect x="70" y="55" width="520" height="72" rx="10" fill="#0E4E8A" stroke="#1BB5D8" strokeWidth="3" />
              <text x="330" y="88" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800">TREINO (70%)</text>
              <text x="330" y="112" textAnchor="middle" fill="#64D9EF" fontSize="12" fontWeight="700">Aprendizado de Pesos & Estatísticas</text>

              {/* Val 15% */}
              <rect x="610" y="55" width="135" height="72" rx="10" fill="#0F2942" stroke="#AB47BC" strokeWidth="2.5" />
              <text x="677" y="88" textAnchor="middle" fill="#E9D5FF" fontSize="15" fontWeight="800">VALIDAÇÃO</text>
              <text x="677" y="110" textAnchor="middle" fill="#C084FC" fontSize="12" fontWeight="700">🔒 15%</text>

              {/* Test 15% */}
              <rect x="760" y="55" width="135" height="72" rx="10" fill="#0F2942" stroke="#7CB342" strokeWidth="2.5" />
              <text x="827" y="88" textAnchor="middle" fill="#DCFCE7" fontSize="15" fontWeight="800">TESTE CEGO</text>
              <text x="827" y="110" textAnchor="middle" fill="#86EFAC" fontSize="12" fontWeight="700">🔒 15%</text>
            </g>
          )}

          {step === 2 && (
            <g>
              {/* Fit arrow from Train only */}
              <line x1="330" y1="127" x2="330" y2="178" stroke="#1BB5D8" strokeWidth="4" />
              <rect x="170" y="178" width="320" height="56" rx="10" fill="#0A345D" stroke="#1BB5D8" strokeWidth="3" />
              <text x="330" y="203" textAnchor="middle" fill="#64D9EF" fontSize="14" fontWeight="800" fontFamily="Fira Code">
                .fit_transform(X_train)
              </text>
              <text x="330" y="223" textAnchor="middle" fill="#FFFFFF" fontSize="12">
                Extrai μ_train e σ_train
              </text>

              {/* Horizontal pipe sending fixed mu/sigma to Val and Test */}
              <path d="M 490 206 L 827 206" stroke="#7CB342" strokeWidth="3.5" strokeDasharray="7 4" />
              <line x1="677" y1="127" x2="677" y2="250" stroke="#AB47BC" strokeWidth="3" />
              <line x1="827" y1="127" x2="827" y2="250" stroke="#7CB342" strokeWidth="3" />

              <rect x="605" y="246" width="145" height="44" rx="8" fill="#1E1B4B" stroke="#AB47BC" strokeWidth="2" />
              <text x="677" y="273" textAnchor="middle" fill="#E9D5FF" fontSize="12" fontWeight="700" fontFamily="Fira Code">
                .transform(X_val)
              </text>

              <rect x="755" y="246" width="145" height="44" rx="8" fill="#052E16" stroke="#7CB342" strokeWidth="2" />
              <text x="827" y="273" textAnchor="middle" fill="#BBF7D0" fontSize="12" fontWeight="700" fontFamily="Fira Code">
                .transform(X_test)
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar
        badge={step === 0 ? 'VAZAMENTO' : `PASSO ${step}`}
        text={captions[step]}
        color={step === 0 ? '#FF7043' : '#7CB342'}
      />
    </div>
  );
}

/* ============================================================================
   SLIDE 5: ANATOMIA DA CLASSE DATASET (DIAGRAMA ARQUITETURAL PROGRESSIVO)
============================================================================ */
export function DatasetAnatomyDiagram() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. __init__(self, X, y)', '2. __len__(self)', '3. __getitem__(self, idx)'];
  const captions = [
    'Converte arrays em Tensores PyTorch (X: float32, y: long/float32) na memória.',
    'Informa ao PyTorch o número exato N de amostras disponíveis.',
    'Busca pelo índice idx e entrega o par (X[idx], y[idx]) sob demanda.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 300" style={{ width: '100%', maxHeight: '320px' }}>
          {/* Class container frame */}
          <rect x="40" y="20" width="880" height="260" rx="14" fill="#081D33" stroke="#1E3A5F" strokeWidth="2" />
          <text x="65" y="48" fill="#64D9EF" fontSize="15" fontWeight="800" fontFamily="Fira Code">
            class CustomDataset(torch.utils.data.Dataset):
          </text>

          {/* Step 0: __init__ Tensor Table */}
          <g style={{ opacity: step >= 0 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="65" y="70" width="265" height="190" rx="10" fill="#0B2545" stroke={step === 0 ? '#1BB5D8' : '#334155'} strokeWidth="3" />
            <text x="197" y="96" textAnchor="middle" fill="#1BB5D8" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              1. __init__(self, X, y)
            </text>
            {[0, 1, 2, 3].map(r => (
              <g key={r} transform={`translate(85, ${112 + r * 32})`}>
                <rect
                  x="0"
                  y="0"
                  width="155"
                  height="25"
                  rx="4"
                  fill={step === 2 && r === 2 ? 'rgba(27,181,216,0.35)' : '#0F2942'}
                  stroke={step === 2 && r === 2 ? '#64D9EF' : '#1E3A5F'}
                />
                <text x="77" y="17" textAnchor="middle" fill="#E2E8F0" fontSize="11" fontFamily="Fira Code">
                  X[{r}] = [0.{r + 2}, -1.{r}]
                </text>
                <rect
                  x="165"
                  y="0"
                  width="60"
                  height="25"
                  rx="4"
                  fill={step === 2 && r === 2 ? 'rgba(124,179,66,0.35)' : '#1E293B'}
                  stroke={step === 2 && r === 2 ? '#7CB342' : '#334155'}
                />
                <text x="195" y="17" textAnchor="middle" fill="#AED581" fontSize="11" fontFamily="Fira Code">
                  y[{r}]={r % 2}
                </text>
              </g>
            ))}
          </g>

          {/* Step 1: __len__ */}
          <g style={{ opacity: step >= 1 ? 1 : 0.18, transition: 'all 0.3s' }}>
            <rect x="365" y="70" width="230" height="190" rx="10" fill="#0B2545" stroke={step === 1 ? '#7CB342' : '#334155'} strokeWidth="3" />
            <text x="480" y="96" textAnchor="middle" fill="#AED581" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              2. __len__(self)
            </text>
            {/* Visual vertical ruler */}
            <line x1="410" y1="120" x2="410" y2="232" stroke="#7CB342" strokeWidth="3" />
            <line x1="400" y1="120" x2="420" y2="120" stroke="#7CB342" strokeWidth="3" />
            <line x1="400" y1="232" x2="420" y2="232" stroke="#7CB342" strokeWidth="3" />
            <rect x="435" y="148" width="140" height="56" rx="8" fill="rgba(124,179,66,0.18)" stroke="#7CB342" />
            <text x="505" y="174" textAnchor="middle" fill="#FFFFFF" fontSize="18" fontWeight="800" fontFamily="Outfit">
              N = len(X)
            </text>
            <text x="505" y="194" textAnchor="middle" fill="#AED581" fontSize="11" fontFamily="Fira Code">
              return self.X.shape[0]
            </text>
          </g>

          {/* Step 2: __getitem__ */}
          <g style={{ opacity: step >= 2 ? 1 : 0.18, transition: 'all 0.3s' }}>
            <rect x="630" y="70" width="265" height="190" rx="10" fill="#0B2545" stroke={step === 2 ? '#FF7043' : '#334155'} strokeWidth="3" />
            <text x="762" y="96" textAnchor="middle" fill="#FF7043" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              3. __getitem__(idx=2)
            </text>
            <rect x="655" y="122" width="215" height="45" rx="8" fill="#0F2942" stroke="#64D9EF" strokeWidth="2" />
            <text x="762" y="149" textAnchor="middle" fill="#64D9EF" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              self.X[2] ➔ tensor([0.4, -1.2])
            </text>
            <rect x="655" y="182" width="215" height="45" rx="8" fill="#0F2942" stroke="#7CB342" strokeWidth="2" />
            <text x="762" y="209" textAnchor="middle" fill="#AED581" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              self.y[2] ➔ tensor(0)
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge={`MÉTODO ${step + 1}`} text={captions[step]} color="#1BB5D8" />
    </div>
  );
}

/* ============================================================================
   SLIDE 6: DATALOADER — TRAJETÓRIA DO GRADIENTE (BATCH VS MINI-BATCH)
============================================================================ */
export function BatchGradientTrajectoryChart() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Superfície de Erro (Loss)', '2. Batch Completo (Lento/Preso)', '3. Mini-Batch DataLoader (Ágil)'];
  const captions = [
    'A superfície de perda possui vales rasos (mínimos locais) e o mínimo global ótimo.',
    'Passar o dataset inteiro de uma vez exige muita VRAM, dá 1 passo por época e trava em mínimos locais.',
    'O DataLoader divide em mini-batches: atualiza dezenas de vezes por época e o ruído estocástico escapa de armadilhas!'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 300" style={{ width: '100%', maxHeight: '320px' }}>
          {/* Loss landscape curve */}
          <path
            d="M 70 60 Q 170 250 270 190 Q 350 140 430 205 Q 590 310 730 120 Q 800 40 870 80"
            fill="none"
            stroke="#64D9EF"
            strokeWidth="4"
          />

          {/* Local Minimum Label */}
          <circle cx="235" cy="202" r="7" fill="#FF7043" />
          <text x="235" y="232" textAnchor="middle" fill="#FF7043" fontSize="13" fontWeight="800">
            Mínimo Local (Armadilha)
          </text>

          {/* Global Minimum Label */}
          <circle cx="575" cy="245" r="9" fill="#7CB342" />
          <text x="575" y="275" textAnchor="middle" fill="#7CB342" fontSize="14" fontWeight="800">
            🎯 Mínimo Global Ótimo
          </text>

          {/* Starting point */}
          <circle cx="95" cy="95" r="8" fill="#FFFFFF" stroke="#1BB5D8" strokeWidth="3" />
          <text x="115" y="82" fill="#FFFFFF" fontSize="12" fontWeight="700">Pesos Iniciais</text>

          {/* Step 1: Full Batch Trajectory */}
          {step >= 1 && (
            <g>
              <path
                d="M 95 95 L 145 162 L 195 196 L 235 202"
                fill="none"
                stroke="#FF7043"
                strokeWidth="3.5"
                strokeDasharray="6 4"
              />
              <circle cx="145" cy="162" r="5" fill="#FF7043" />
              <circle cx="195" cy="196" r="5" fill="#FF7043" />
              <rect x="65" y="242" width="290" height="40" rx="8" fill="rgba(255,112,67,0.18)" stroke="#FF7043" />
              <text x="210" y="267" textAnchor="middle" fill="#FF7043" fontSize="13" fontWeight="800">
                Batch Inteiro: 1 passo/época (Preso)
              </text>
            </g>
          )}

          {/* Step 2: Mini-Batch SGD Trajectory */}
          {step >= 2 && (
            <g>
              <path
                d="M 95 95 L 160 175 L 230 198 L 315 155 L 385 182 L 475 232 L 535 248 L 575 245"
                fill="none"
                stroke="#7CB342"
                strokeWidth="4"
              />
              {[
                [160, 175], [230, 198], [315, 155], [385, 182], [475, 232], [535, 248], [575, 245]
              ].map(([px, py], i) => (
                <circle key={i} cx={px} cy={py} r="5" fill="#AED581" stroke="#061F38" strokeWidth="1.5" />
              ))}
              <rect x="580" y="45" width="330" height="58" rx="10" fill="rgba(124,179,66,0.18)" stroke="#7CB342" strokeWidth="2" />
              <text x="745" y="70" textAnchor="middle" fill="#AED581" fontSize="14" fontWeight="800">
                Mini-Batch (batch_size = 32)
              </text>
              <text x="745" y="90" textAnchor="middle" fill="#FFFFFF" fontSize="12">
                Salta o mínimo local e converge rápido!
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 1 ? '#FF7043' : '#7CB342'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 9: ARQUITETURA MULTITAREFA (CLASSIFICAÇÃO VS REGRESSÃO)
============================================================================ */
export function TaskHeadComparisonDiagram() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Extrator Comum (MLP)', '2. Cabeça de Classificação (3 Classes)', '3. Cabeça de Regressão (1 Valor)'];
  const captions = [
    'O tronco oculto da MLP transforma os atributos tabulares X em representações não-lineares h.',
    'Classificação: Camada final nn.Linear(H, 3) emite 3 Logits brutos avaliados por nn.CrossEntropyLoss().',
    'Regressão: Camada final nn.Linear(H, 1) emite 1 escalar contínuo ($) avaliado por nn.MSELoss().'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 300" style={{ width: '100%', maxHeight: '320px' }}>
          {/* Backbone */}
          <rect x="45" y="85" width="160" height="130" rx="12" fill="#0B2545" stroke="#1BB5D8" strokeWidth="3" />
          <text x="125" y="135" textAnchor="middle" fill="#64D9EF" fontSize="16" fontWeight="800" fontFamily="Outfit">
            Entradas X
          </text>
          <text x="125" y="162" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontFamily="Fira Code">
            (batch, in_features)
          </text>

          <line x1="205" y1="150" x2="270" y2="150" stroke="#1BB5D8" strokeWidth="4" />

          <rect x="270" y="70" width="210" height="160" rx="12" fill="#0A345D" stroke="#64D9EF" strokeWidth="3" />
          <text x="375" y="130" textAnchor="middle" fill="#FFFFFF" fontSize="17" fontWeight="800" fontFamily="Outfit">
            Camadas Ocultas
          </text>
          <text x="375" y="156" textAnchor="middle" fill="#64D9EF" fontSize="13" fontFamily="Fira Code">
            Linear + ReLU
          </text>
          <text x="375" y="182" textAnchor="middle" fill="#94A3B8" fontSize="12">
            Vetor Latente h
          </text>

          {/* Branch 1: Classification */}
          <g style={{ opacity: step >= 1 ? 1 : 0.18, transition: 'all 0.35s' }}>
            <path d="M 480 120 L 570 75" stroke="#AB47BC" strokeWidth="4" />
            <rect x="570" y="22" width="345" height="112" rx="12" fill="#1E1B4B" stroke="#AB47BC" strokeWidth="3" />
            <text x="742" y="50" textAnchor="middle" fill="#E9D5FF" fontSize="15" fontWeight="800" fontFamily="Outfit">
              🎯 CLASSIFICAÇÃO MULTICLASSE
            </text>
            <text x="742" y="76" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="Fira Code">
              nn.Linear(H, 3) ➔ [z₀, z₁, z₂] (Logits)
            </text>
            <rect x="630" y="90" width="225" height="30" rx="6" fill="#AB47BC" />
            <text x="742" y="110" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              Loss: nn.CrossEntropyLoss()
            </text>
          </g>

          {/* Branch 2: Regression */}
          <g style={{ opacity: step >= 2 ? 1 : 0.18, transition: 'all 0.35s' }}>
            <path d="M 480 180 L 570 225" stroke="#7CB342" strokeWidth="4" />
            <rect x="570" y="166" width="345" height="112" rx="12" fill="#052E16" stroke="#7CB342" strokeWidth="3" />
            <text x="742" y="194" textAnchor="middle" fill="#DCFCE7" fontSize="15" fontWeight="800" fontFamily="Outfit">
              📈 REGRESSÃO CONTÍNUA
            </text>
            <text x="742" y="220" textAnchor="middle" fill="#FFFFFF" fontSize="13" fontFamily="Fira Code">
              nn.Linear(H, 1) ➔ ŷ ∈ ℝ (Escalar $)
            </text>
            <rect x="630" y="234" width="225" height="30" rx="6" fill="#7CB342" />
            <text x="742" y="254" textAnchor="middle" fill="#052E16" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              Loss: nn.MSELoss()
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge={`ARQUITETURA ${step + 1}`} text={captions[step]} color={step === 1 ? '#AB47BC' : '#7CB342'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 10: ENTROPIA CRUZADA (GRÁFICO PROGRESSIVO LOGITS -> SOFTMAX -> -LOG)
============================================================================ */
export function CrossEntropyVisualChart() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Logits Brutos (z)', '2. Softmax Interno (p̂)', '3. Penalidade -log(p̂_y)'];
  const captions = [
    'A última camada nn.Linear entrega Logits brutos (sem Softmax manual na rede!).',
    'Internamente, a CrossEntropyLoss aplica Log-Sum-Exp para obter probabilidades estáveis.',
    'A perda penaliza logaritmicamente quando a probabilidade da classe correta (c=0) é baixa.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '16px', flex: 1, alignItems: 'stretch' }}>
        <div className="content-card" style={{ background: '#061F38', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
          <svg viewBox="0 0 620 270" style={{ width: '100%', maxHeight: '275px' }}>
            {/* Step 0: Logits Bar Chart */}
            <g style={{ opacity: step >= 0 ? 1 : 0.2 }}>
              <text x="105" y="28" textAnchor="middle" fill="#64D9EF" fontSize="13" fontWeight="800">1. Logits (z)</text>
              <rect x="35" y="55" width="38" height="110" rx="4" fill="#1BB5D8" />
              <text x="54" y="48" textAnchor="middle" fill="#FFF" fontSize="11" fontFamily="Fira Code">2.4</text>
              <rect x="85" y="135" width="38" height="30" rx="4" fill="#475569" />
              <text x="104" y="128" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="Fira Code">0.3</text>
              <rect x="135" y="165" width="38" height="35" rx="4" fill="#FF7043" />
              <text x="154" y="215" textAnchor="middle" fill="#FF7043" fontSize="11" fontFamily="Fira Code">-1.2</text>
              <line x1="25" y1="165" x2="185" y2="165" stroke="#64748B" strokeWidth="1.5" />
            </g>

            {/* Step 1: Probabilities */}
            <g style={{ opacity: step >= 1 ? 1 : 0.15, transition: 'all 0.3s' }}>
              <text x="305" y="28" textAnchor="middle" fill="#7CB342" fontSize="13" fontWeight="800">2. Probabilidades (p̂)</text>
              <rect x="235" y="65" width="38" height="125" rx="4" fill="#7CB342" />
              <text x="254" y="57" textAnchor="middle" fill="#AED581" fontSize="11" fontWeight="800">84%</text>
              <rect x="285" y="172" width="38" height="18" rx="4" fill="#475569" />
              <text x="304" y="165" textAnchor="middle" fill="#CBD5E1" fontSize="11">13%</text>
              <rect x="335" y="184" width="38" height="6" rx="3" fill="#475569" />
              <text x="354" y="177" textAnchor="middle" fill="#CBD5E1" fontSize="11">3%</text>
              <line x1="225" y1="190" x2="385" y2="190" stroke="#64748B" strokeWidth="1.5" />
            </g>

            {/* Step 2: -log(p) curve */}
            <g style={{ opacity: step >= 2 ? 1 : 0.15, transition: 'all 0.3s' }}>
              <text x="510" y="28" textAnchor="middle" fill="#FF7043" fontSize="13" fontWeight="800">3. Curva -log(p̂_y)</text>
              <line x1="430" y1="210" x2="595" y2="210" stroke="#94A3B8" strokeWidth="2" />
              <line x1="430" y1="45" x2="430" y2="210" stroke="#94A3B8" strokeWidth="2" />
              <path d="M 438 50 Q 460 175 590 208" fill="none" stroke="#FF7043" strokeWidth="3.5" />
              <circle cx="562" cy="202" r="6" fill="#7CB342" stroke="#FFF" strokeWidth="2" />
              <text x="535" y="185" fill="#AED581" fontSize="11" fontWeight="800">L = 0.17</text>
              <text x="510" y="232" textAnchor="middle" fill="#CBD5E1" fontSize="11">p̂_y ➔ 1.0</text>
            </g>
          </svg>
        </div>

        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '14px' }}>
          <div className="math-box" style={{ fontSize: '1.05rem', padding: '14px', margin: 0 }}>
            <MathView math="\mathcal{L}_{CE} = -\log\left(\frac{e^{z_y}}{\sum_j e^{z_j}}\right)" block={true} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.9rem' }}>
            <div className="badge-tag badge-cyan">z_y : Logit da classe real</div>
            <div className="badge-tag badge-green">Sem Softmax explícito na rede</div>
            <div className="badge-tag badge-orange">Log-Sum-Exp evita overflow</div>
          </div>
        </div>
      </div>

      <CaptionBar badge={`PASSO ${step + 1}`} text={captions[step]} color="#1BB5D8" />
    </div>
  );
}

/* ============================================================================
   SLIDE 11: CASO DO SEGURO SAÚDE (DISTRIBUIÇÃO ASSIMÉTRICA PROGRESSIVA)
============================================================================ */
export function InsuranceDistributionChart() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Atributos Biométricos (X)', '2. Assimetria de Custos ($)', '3. Efeito Fumante + BMI'];
  const captions = [
    'Variáveis de entrada X: Idade, IMC (BMI), Filhos, Fumante (yes/no) e Região.',
    'O alvo Y (Charges $) possui forte cauda longa à direita: média de $13.270 e picos acima de $60.000.',
    'Pacientes fumantes com IMC elevado concentram os custos extremos na cauda direita.'
  ];

  const histBars = [
    { x: 90, h: 155, label: '$5k', group: 'base' },
    { x: 155, h: 125, label: '$10k', group: 'base' },
    { x: 220, h: 90, label: '$15k', group: 'base' },
    { x: 285, h: 60, label: '$20k', group: 'mid' },
    { x: 350, h: 45, label: '$30k', group: 'Mid' },
    { x: 415, h: 52, label: '$40k', group: 'high' },
    { x: 480, h: 35, label: '$50k', group: 'high' },
    { x: 545, h: 18, label: '$60k+', group: 'high' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 290" style={{ width: '100%', maxHeight: '310px' }}>
          {/* Left Panel: Features X */}
          <rect x="35" y="25" width="245" height="235" rx="12" fill="#0B2545" stroke="#1BB5D8" strokeWidth="2.5" />
          <text x="157" y="55" textAnchor="middle" fill="#64D9EF" fontSize="15" fontWeight="800" fontFamily="Outfit">
            Entradas Tabulares (X)
          </text>
          {[
            ['🎂 Idade', '18 a 64 anos'],
            ['⚖️ BMI (IMC)', '16.0 a 53.1'],
            ['👶 Dependentes', '0 a 5 filhos'],
            ['🚬 Smoker', 'yes / no (One-Hot)']
          ].map(([k, v], i) => (
            <g key={i} transform={`translate(52, ${74 + i * 42})`}>
              <rect x="0" y="0" width="210" height="34" rx="6" fill="#0F2942" stroke={step === 2 && i >= 1 && i !== 2 ? '#FF7043' : '#1E3A5F'} />
              <text x="12" y="22" fill="#FFFFFF" fontSize="12" fontWeight="700">{k}</text>
              <text x="200" y="22" textAnchor="end" fill="#64D9EF" fontSize="11" fontFamily="Fira Code">{v}</text>
            </g>
          ))}

          {/* Right Panel: Histogram of Charges Y */}
          <g style={{ opacity: step >= 1 ? 1 : 0.18, transition: 'all 0.35s' }}>
            <text x="615" y="38" textAnchor="middle" fill="#FFFFFF" fontSize="16" fontWeight="800" fontFamily="Outfit">
              Distribuição do Alvo Contínuo: Custos Médicos ($)
            </text>
            <line x1="330" y1="230" x2="900" y2="230" stroke="#94A3B8" strokeWidth="2" />

            {histBars.map((b, idx) => {
              const isHigh = idx >= 5;
              const barColor = step === 2 && isHigh ? '#FF7043' : '#1BB5D8';
              return (
                <g key={idx} transform={`translate(${260 + b.x}, 0)`}>
                  <rect
                    x="0"
                    y={230 - b.h}
                    width="46"
                    height={b.h}
                    rx="5"
                    fill={barColor}
                    opacity={0.88}
                  />
                  <text x="23" y="250" textAnchor="middle" fill="#CBD5E1" fontSize="11" fontFamily="Fira Code">
                    {b.label}
                  </text>
                </g>
              );
            })}

            {/* Mean marker */}
            <line x1="460" y1="55" x2="460" y2="230" stroke="#7CB342" strokeWidth="3" strokeDasharray="6 4" />
            <text x="468" y="72" fill="#AED581" fontSize="12" fontWeight="800">
              Média = $13.270
            </text>
          </g>

          {/* Step 2: Highlight Smoker + High BMI */}
          {step === 2 && (
            <g>
              <rect x="650" y="75" width="245" height="68" rx="10" fill="rgba(255,112,67,0.2)" stroke="#FF7043" strokeWidth="2" />
              <text x="772" y="102" textAnchor="middle" fill="#FF7043" fontSize="13" fontWeight="800">
                🔥 Cauda Extrema ($35k – $60k+)
              </text>
              <text x="772" y="124" textAnchor="middle" fill="#FFFFFF" fontSize="12">
                Smoker = yes + BMI &gt; 30
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 2 ? '#FF7043' : '#1BB5D8'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 12: MÉTRICAS DE REGRESSÃO (MAE, RMSE, R² CONSTRUÍDOS VISUALMENTE)
============================================================================ */
export function RegressionMetricsChart() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. MAE (Erro Absoluto)', '2. RMSE (Penaliza Outliers)', '3. R² (Variância Explicada)'];
  const captions = [
    'MAE mede a distância vertical média |y - ŷ| diretamente na moeda original ($).',
    'RMSE eleva os erros ao quadrado antes da raiz: um único erro grande pesa muito mais!',
    'R² compara o erro da nossa rede com a linha horizontal da média simples (ȳ).'
  ];

  const formulas = [
    'MAE = \\frac{1}{N}\\sum |y_i - \\hat{y}_i|',
    'RMSE = \\sqrt{\\frac{1}{N}\\sum (y_i - \\hat{y}_i)^2}',
    'R^2 = 1 - \\frac{\\sum (y_i - \\hat{y}_i)^2}{\\sum (y_i - \\bar{y})^2}'
  ];

  const pts = [
    { x: 110, yReal: 195, yHat: 205 },
    { x: 210, yReal: 155, yHat: 170 },
    { x: 320, yReal: 145, yHat: 132 },
    { x: 430, yReal: 42, yHat: 95 } // Outlier point
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '16px', flex: 1 }}>
        <div className="content-card" style={{ background: '#061F38', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
          <svg viewBox="0 0 580 265" style={{ width: '100%', maxHeight: '275px' }}>
            {/* Axes */}
            <line x1="55" y1="230" x2="530" y2="230" stroke="#64748B" strokeWidth="2" />
            <line x1="55" y1="25" x2="55" y2="230" stroke="#64748B" strokeWidth="2" />

            {/* Step 2: Mean horizontal baseline */}
            {step === 2 && (
              <g>
                <line x1="55" y1="135" x2="520" y2="135" stroke="#AB47BC" strokeWidth="2.5" strokeDasharray="7 4" />
                <text x="485" y="126" fill="#E9D5FF" fontSize="12" fontWeight="800">Média ȳ</text>
              </g>
            )}

            {/* Regression Line */}
            <line x1="75" y1="218" x2="500" y2="70" stroke="#1BB5D8" strokeWidth="3.5" />
            <text x="485" y="60" fill="#64D9EF" fontSize="12" fontWeight="800">Predição ŷ</text>

            {/* Residuals / Squares */}
            {pts.map((p, i) => {
              const diff = Math.abs(p.yHat - p.yReal);
              const topY = Math.min(p.yReal, p.yHat);
              return (
                <g key={i}>
                  {step === 1 && (
                    <rect
                      x={p.x}
                      y={topY}
                      width={diff}
                      height={diff}
                      fill="rgba(255,112,67,0.28)"
                      stroke="#FF7043"
                      strokeWidth="1.5"
                    />
                  )}
                  <line
                    x1={p.x}
                    y1={p.yReal}
                    x2={p.x}
                    y2={p.yHat}
                    stroke="#FF7043"
                    strokeWidth="3"
                  />
                  <circle cx={p.x} cy={p.yReal} r="6.5" fill="#7CB342" stroke="#FFF" strokeWidth="1.5" />
                  <circle cx={p.x} cy={p.yHat} r="5" fill="#1BB5D8" />
                </g>
              );
            })}
          </svg>
        </div>

        <div className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '16px' }}>
          <div className="math-box" style={{ fontSize: '1.15rem', padding: '18px', margin: 0 }}>
            <MathView math={formulas[step]} block={true} />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div className="badge-tag badge-green">● Ponto Verde: Valor Real (y)</div>
            <div className="badge-tag badge-cyan">● Reta Azul: Predição da MLP (ŷ)</div>
            <div className="badge-tag badge-orange">┃ Segmento Laranja: Resíduo (Erro)</div>
          </div>
        </div>
      </div>

      <CaptionBar badge={steps[step].split(' ')[1]} text={captions[step]} color="#1BB5D8" />
    </div>
  );
}

/* ============================================================================
   SLIDE 13: BASELINES NÃO-TRIVIAIS (COMPARAÇÃO VISUAL DUMMY VS MLP)
============================================================================ */
export function BaselineComparisonChart() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Classificação: Chute Majoritário', '2. Regressão: Chute na Média (R²=0)', '3. Ganho Real da Rede Neural'];
  const captions = [
    'Se 70% dos clientes pertencem à classe majoritária, um modelo cego atinge 70% de acurácia sem aprender nada!',
    'Na regressão, prever sempre a média global ȳ gera R² = 0.0 (erro alto de $9.100).',
    'A MLP só comprova aprendizado quando supera com folga o baseline não-trivial no Teste Cego.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 290" style={{ width: '100%', maxHeight: '310px' }}>
          {/* Left Chart: Classification Baseline vs MLP */}
          <g style={{ opacity: step >= 0 ? 1 : 0.2 }}>
            <rect x="40" y="20" width="420" height="245" rx="12" fill="#0B2545" stroke="#1BB5D8" strokeWidth="2" />
            <text x="250" y="48" textAnchor="middle" fill="#64D9EF" fontSize="15" fontWeight="800" fontFamily="Outfit">
              Classificação (Acurácia no Teste)
            </text>

            {/* Dummy Bar */}
            <rect x="110" y="105" width="95" height="125" rx="6" fill="#64748B" />
            <text x="157" y="96" textAnchor="middle" fill="#CBD5E1" fontSize="15" fontWeight="800">70%</text>
            <text x="157" y="248" textAnchor="middle" fill="#94A3B8" fontSize="12" fontWeight="700">Baseline Dummy</text>

            {/* MLP Bar */}
            {step >= 2 && (
              <g>
                <rect x="275" y="65" width="95" height="165" rx="6" fill="#7CB342" />
                <text x="322" y="56" textAnchor="middle" fill="#AED581" fontSize="16" fontWeight="800">92% (+22%)</text>
                <text x="322" y="248" textAnchor="middle" fill="#AED581" fontSize="12" fontWeight="800">Nossa MLP</text>
              </g>
            )}
            <line x1="80" y1="230" x2="420" y2="230" stroke="#475569" strokeWidth="2" />
          </g>

          {/* Right Chart: Regression Baseline vs MLP */}
          <g style={{ opacity: step >= 1 ? 1 : 0.18, transition: 'all 0.35s' }}>
            <rect x="500" y="20" width="420" height="245" rx="12" fill="#0B2545" stroke="#FF7043" strokeWidth="2" />
            <text x="710" y="48" textAnchor="middle" fill="#FF7043" fontSize="15" fontWeight="800" fontFamily="Outfit">
              Regressão Insurance (Erro MAE em $)
            </text>

            {/* Dummy Mean Error Bar */}
            <rect x="570" y="75" width="95" height="155" rx="6" fill="#FF7043" />
            <text x="617" y="66" textAnchor="middle" fill="#FF7043" fontSize="14" fontWeight="800">$9.100 (R²=0)</text>
            <text x="617" y="248" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontWeight="700">Média Global ȳ</text>

            {/* MLP Error Bar */}
            {step >= 2 && (
              <g>
                <rect x="745" y="180" width="95" height="50" rx="6" fill="#1BB5D8" />
                <text x="792" y="170" textAnchor="middle" fill="#64D9EF" fontSize="14" fontWeight="800">$2.450 (R²=0.86)</text>
                <text x="792" y="248" textAnchor="middle" fill="#64D9EF" fontSize="12" fontWeight="800">Nossa MLP</text>
              </g>
            )}
            <line x1="540" y1="230" x2="880" y2="230" stroke="#475569" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 2 ? '#7CB342' : '#FF7043'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 15: SÍNTESE & CHECKLIST VISUAL DO PROJETO 1
============================================================================ */
export function PipelineChecklistVisual() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const items = [
    { title: '1. Split Estratificado', sub: 'train_test_split', icon: '✂️', color: '#1BB5D8', desc: 'Dividir Treino (70%), Validação (15%) e Teste (15%) antes de qualquer estatística.' },
    { title: '2. Fit Só no Treino', sub: 'StandardScaler', icon: '🔒', color: '#7CB342', desc: 'Ajustar escaladores exclusivamente no Treino para eliminar Data Leakage.' },
    { title: '3. Dataset & DataLoader', sub: 'shuffle=True', icon: '⚙️', color: '#AB47BC', desc: 'Empacotar tensores na classe Dataset e iterar em mini-batches estocásticos.' },
    { title: '4. Métricas vs Baseline', sub: 'Teste Cego', icon: '🏆', color: '#FF7043', desc: 'Comprovar ganho real sobre o preditor majoritário ou média global.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={items.map(i => i.title)} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 280" style={{ width: '100%', maxHeight: '300px' }}>
          {items.map((it, idx) => {
            const x = 45 + idx * 225;
            const active = idx <= step;
            return (
              <g key={idx} onClick={() => setStep(idx)} style={{ cursor: 'pointer', opacity: active ? 1 : 0.22, transition: 'all 0.3s' }}>
                {idx < 3 && (
                  <line x1={x + 195} y1="140" x2={x + 225} y2="140" stroke={idx < step ? '#7CB342' : '#334155'} strokeWidth="5" />
                )}
                <rect
                  x={x}
                  y="45"
                  width="195"
                  height="190"
                  rx="14"
                  fill="#0B2545"
                  stroke={idx === step ? it.color : '#1E3A5F'}
                  strokeWidth={idx === step ? '4' : '2'}
                />
                <text x={x + 97} y="98" textAnchor="middle" fontSize="34">{it.icon}</text>
                <text x={x + 97} y="142" textAnchor="middle" fill="#FFFFFF" fontSize="15" fontWeight="800" fontFamily="Outfit">
                  {it.title}
                </text>
                <rect x={x + 25} y="162" width="145" height="28" rx="14" fill={it.color} />
                <text x={x + 97} y="181" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {it.sub}
                </text>
                {active && (
                  <text x={x + 97} y="218" textAnchor="middle" fill="#AED581" fontSize="12" fontWeight="800">
                    ✓ Verificado
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <CaptionBar badge={`CHECKLIST ${step + 1}/4`} text={items[step].desc} color={items[step].color} />
    </div>
  );
}

/* ============================================================================
   SLIDE 16: PRÓXIMOS PASSOS (AULA 04 — ESTABILIDADE, INICIALIZAÇÃO & DROPOUT)
============================================================================ */
export function NextClassPreviewVisual() {
  const [step, setStep] = useState(() => (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1' ? 2 : 0));
  const steps = ['1. Inicialização Xavier & He', '2. BatchNorm & LayerNorm', '3. Regularização com Dropout'];
  const captions = [
    'Aula 04: Como calibrar a variância inicial dos pesos para evitar explosão ou sumiço do gradiente.',
    'Normalização interna das camadas para acelerar a convergência em redes profundas.',
    'Desligamento aleatório de neurônios (Inverted Dropout) para combater o overfitting.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#061F38', padding: '16px' }}>
        <svg viewBox="0 0 960 280" style={{ width: '100%', maxHeight: '300px' }}>
          {/* Card 1: Weight Init */}
          <g onClick={() => setStep(0)} style={{ cursor: 'pointer', opacity: step >= 0 ? 1 : 0.2 }}>
            <rect x="40" y="25" width="270" height="230" rx="14" fill="#0B2545" stroke={step === 0 ? '#1BB5D8' : '#1E3A5F'} strokeWidth="3" />
            <text x="175" y="58" textAnchor="middle" fill="#64D9EF" fontSize="15" fontWeight="800" fontFamily="Outfit">
              1. Xavier & Kaiming He
            </text>
            <path d="M 75 190 Q 175 60 275 190" fill="none" stroke="#1BB5D8" strokeWidth="3.5" />
            <path d="M 115 190 Q 175 130 235 190" fill="none" stroke="#FF7043" strokeWidth="2.5" strokeDasharray="5 4" />
            <text x="175" y="225" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontFamily="Fira Code">
              Var(W) = 2 / n_in
            </text>
          </g>

          {/* Card 2: BatchNorm */}
          <g onClick={() => setStep(1)} style={{ cursor: 'pointer', opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="345" y="25" width="270" height="230" rx="14" fill="#0B2545" stroke={step === 1 ? '#7CB342' : '#1E3A5F'} strokeWidth="3" />
            <text x="480" y="58" textAnchor="middle" fill="#AED581" fontSize="15" fontWeight="800" fontFamily="Outfit">
              2. BatchNorm1d / LayerNorm
            </text>
            <circle cx="425" cy="145" r="34" fill="rgba(255,112,67,0.2)" stroke="#FF7043" strokeWidth="2.5" />
            <text x="425" y="149" textAnchor="middle" fill="#FF7043" fontSize="11" fontWeight="700">Deslocado</text>
            <text x="480" y="150" textAnchor="middle" fill="#FFF" fontSize="18">➔</text>
            <circle cx="535" cy="145" r="34" fill="rgba(124,179,66,0.2)" stroke="#7CB342" strokeWidth="2.5" />
            <text x="535" y="149" textAnchor="middle" fill="#AED581" fontSize="11" fontWeight="700">μ=0, σ=1</text>
            <text x="480" y="225" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontFamily="Fira Code">
              Estabilidade Interna
            </text>
          </g>

          {/* Card 3: Dropout */}
          <g onClick={() => setStep(2)} style={{ cursor: 'pointer', opacity: step >= 2 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="650" y="25" width="270" height="230" rx="14" fill="#0B2545" stroke={step === 2 ? '#AB47BC' : '#1E3A5F'} strokeWidth="3" />
            <text x="785" y="58" textAnchor="middle" fill="#E9D5FF" fontSize="15" fontWeight="800" fontFamily="Outfit">
              3. Inverted Dropout
            </text>
            {[0, 1, 2].map(i => (
              <g key={i} transform={`translate(${720 + i * 65}, 140)`}>
                <circle cx="0" cy="0" r="22" fill={i === 1 ? '#1E293B' : '#0A345D'} stroke={i === 1 ? '#FF7043' : '#64D9EF'} strokeWidth="2.5" strokeDasharray={i === 1 ? '4 3' : 'none'} />
                <text x="0" y="5" textAnchor="middle" fill={i === 1 ? '#FF7043' : '#FFF'} fontSize="13" fontWeight="800">
                  {i === 1 ? '✕' : 'h'}
                </text>
              </g>
            ))}
            <text x="785" y="225" textAnchor="middle" fill="#CBD5E1" fontSize="12" fontFamily="Fira Code">
              nn.Dropout(p=0.3)
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge={`PRÓXIMA AULA`} text={captions[step]} color="#1BB5D8" />
    </div>
  );
}
