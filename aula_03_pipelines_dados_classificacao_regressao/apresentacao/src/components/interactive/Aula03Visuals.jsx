import React, { useState } from 'react';
import MathView from '../MathView';

const usePdfStep = (maxStep) => {
  return useState(() =>
    typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('pdf') === '1'
      ? maxStep
      : 0
  );
};

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
            border: `2px solid ${active ? '#0284C7' : done ? '#7CB342' : '#CBD5E1'}`,
            background: active ? '#E0F2FE' : done ? '#F0FDF4' : '#FFFFFF',
            color: active ? '#0A345D' : done ? '#15803D' : '#475569',
            fontWeight: '800',
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
        border: '1.5px solid #0284C7',
        background: '#1BB5D8',
        color: '#FFFFFF',
        fontWeight: '800',
        fontSize: '0.82rem',
        cursor: 'pointer'
      }}
    >
      {current === steps.length - 1 ? '↺ Reiniciar' : '▶ Avançar Etapa'}
    </button>
  </div>
);

const CaptionBar = ({ badge, text, color = '#0284C7' }) => (
  <div style={{
    marginTop: '10px',
    padding: '10px 18px',
    background: '#F8FAFC',
    border: '1px solid #E2E8F0',
    borderLeft: `5px solid ${color}`,
    borderRadius: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
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
    <span style={{ fontSize: '0.96rem', fontWeight: '600', color: '#1E293B' }}>
      {text}
    </span>
  </div>
);

/* ============================================================================
   SLIDE 2: REGRA DE OURO DO PARTICIONAMENTO (TEMA CLARO)
============================================================================ */
export function SplitRuleDiagram() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Erro: Fit Antes do Split', '2. Correto: Split 70/15/15 Primeiro', '3. Fit no Treino → Transform'];
  const captions = [
    'ERRADO: Calcular μ e σ no dataset inteiro faz o Teste contaminar o Treino (Data Leakage).',
    'PASSO 1 CORRETO: Particionar os dados brutos primeiro e trancar Validação e Teste.',
    'PASSO 2 CORRETO: Ajustar (.fit_transform) só no Treino e aplicar (.transform) nos demais.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 300" style={{ width: '100%', maxHeight: '320px' }}>
          {step === 0 && (
            <g>
              <text x="480" y="34" textAnchor="middle" fill="#D84315" fontSize="18" fontWeight="800" fontFamily="Outfit">
                ⚠️ ABORDAGEM INGÊNUA (COM CONTAMINAÇÃO)
              </text>
              <rect x="80" y="60" width="800" height="68" rx="12" fill="#FFF7ED" stroke="#FF7043" strokeWidth="3" />
              <text x="480" y="100" textAnchor="middle" fill="#9A3412" fontSize="18" fontWeight="800">
                DATASET INTEIRO (100% — Treino + Teste Misturados)
              </text>

              <line x1="480" y1="128" x2="480" y2="180" stroke="#FF7043" strokeWidth="4" />
              <rect x="270" y="180" width="420" height="62" rx="10" fill="#FFEDD5" stroke="#FF7043" strokeWidth="2.5" />
              <text x="480" y="206" textAnchor="middle" fill="#C2410C" fontSize="15" fontWeight="800" fontFamily="Fira Code">
                scaler.fit_transform(df_inteiro)
              </text>
              <text x="480" y="228" textAnchor="middle" fill="#7C2D12" fontSize="12" fontWeight="600">
                Média μ e Desvio σ contêm informação futura do Teste!
              </text>

              <path d="M 760 128 Q 760 210 690 210" fill="none" stroke="#EA580C" strokeWidth="3" strokeDasharray="6 4" />
              <text x="800" y="175" fill="#C2410C" fontSize="13" fontWeight="800">Vazamento!</text>
            </g>
          )}

          {step >= 1 && (
            <g>
              <text x="480" y="32" textAnchor="middle" fill="#15803D" fontSize="18" fontWeight="800" fontFamily="Outfit">
                ✅ PIPELINE PROFISSIONAL ISOLADO
              </text>

              {/* Train 70% */}
              <rect x="70" y="52" width="520" height="72" rx="10" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
              <text x="330" y="84" textAnchor="middle" fill="#0A345D" fontSize="18" fontWeight="800">TREINO (70%)</text>
              <text x="330" y="108" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="700">Aprendizado de Pesos & Estatísticas</text>

              {/* Val 15% */}
              <rect x="610" y="52" width="135" height="72" rx="10" fill="#F3E8FF" stroke="#9333EA" strokeWidth="2.5" />
              <text x="677" y="84" textAnchor="middle" fill="#6B21A8" fontSize="15" fontWeight="800">VALIDAÇÃO</text>
              <text x="677" y="106" textAnchor="middle" fill="#7E22CE" fontSize="12" fontWeight="700">🔒 15%</text>

              {/* Test 15% */}
              <rect x="760" y="52" width="135" height="72" rx="10" fill="#DCFCE7" stroke="#16A34A" strokeWidth="2.5" />
              <text x="827" y="84" textAnchor="middle" fill="#166534" fontSize="15" fontWeight="800">TESTE CEGO</text>
              <text x="827" y="106" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="700">🔒 15%</text>
            </g>
          )}

          {step === 2 && (
            <g>
              <line x1="330" y1="124" x2="330" y2="174" stroke="#0284C7" strokeWidth="4" />
              <rect x="170" y="174" width="320" height="58" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
              <text x="330" y="199" textAnchor="middle" fill="#0284C7" fontSize="14" fontWeight="800" fontFamily="Fira Code">
                .fit_transform(X_train)
              </text>
              <text x="330" y="220" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="600">
                Extrai μ_train e σ_train
              </text>

              <path d="M 490 203 L 827 203" stroke="#16A34A" strokeWidth="3.5" strokeDasharray="7 4" />
              <line x1="677" y1="124" x2="677" y2="244" stroke="#9333EA" strokeWidth="3" />
              <line x1="827" y1="124" x2="827" y2="244" stroke="#16A34A" strokeWidth="3" />

              <rect x="605" y="242" width="145" height="44" rx="8" fill="#FAF5FF" stroke="#9333EA" strokeWidth="2" />
              <text x="677" y="269" textAnchor="middle" fill="#6B21A8" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                .transform(X_val)
              </text>

              <rect x="755" y="242" width="145" height="44" rx="8" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
              <text x="827" y="269" textAnchor="middle" fill="#166534" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                .transform(X_test)
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar
        badge={step === 0 ? 'VAZAMENTO' : `PASSO ${step}`}
        text={captions[step]}
        color={step === 0 ? '#FF7043' : '#16A34A'}
      />
    </div>
  );
}

/* ============================================================================
   SLIDE 4: ANATOMIA DA CLASSE DATASET (TEMA CLARO)
============================================================================ */
export function DatasetAnatomyDiagram() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. __init__(self, X, y)', '2. __len__(self)', '3. __getitem__(self, idx)'];
  const captions = [
    'Converte arrays em Tensores PyTorch (X: float32, y: long/float32) na memória.',
    'Informa ao PyTorch o número exato N de amostras disponíveis.',
    'Busca pelo índice idx e entrega o par (X[idx], y[idx]) sob demanda.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 295" style={{ width: '100%', maxHeight: '315px' }}>
          <rect x="35" y="16" width="890" height="262" rx="14" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="2" />
          <text x="60" y="44" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Fira Code">
            class CustomDataset(torch.utils.data.Dataset):
          </text>

          {/* Step 0: __init__ */}
          <g style={{ opacity: step >= 0 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="60" y="64" width="270" height="194" rx="10" fill="#F0F9FF" stroke={step === 0 ? '#0284C7' : '#CBD5E1'} strokeWidth="2.5" />
            <text x="195" y="90" textAnchor="middle" fill="#0369A1" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              1. __init__(self, X, y)
            </text>
            {[0, 1, 2, 3].map(r => (
              <g key={r} transform={`translate(80, ${106 + r * 33})`}>
                <rect
                  x="0"
                  y="0"
                  width="158"
                  height="26"
                  rx="5"
                  fill={step === 2 && r === 2 ? '#BAE6FD' : '#FFFFFF'}
                  stroke={step === 2 && r === 2 ? '#0284C7' : '#94A3B8'}
                />
                <text x="79" y="17" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="700" fontFamily="Fira Code">
                  X[{r}] = [0.{r + 2}, -1.{r}]
                </text>
                <rect
                  x="166"
                  y="0"
                  width="62"
                  height="26"
                  rx="5"
                  fill={step === 2 && r === 2 ? '#BBF7D0' : '#F0FDF4'}
                  stroke={step === 2 && r === 2 ? '#16A34A' : '#86EFAC'}
                />
                <text x="197" y="17" textAnchor="middle" fill="#166534" fontSize="11" fontWeight="700" fontFamily="Fira Code">
                  y[{r}]={r % 2}
                </text>
              </g>
            ))}
          </g>

          {/* Step 1: __len__ */}
          <g style={{ opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="365" y="64" width="230" height="194" rx="10" fill="#F0FDF4" stroke={step === 1 ? '#16A34A' : '#CBD5E1'} strokeWidth="2.5" />
            <text x="480" y="90" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              2. __len__(self)
            </text>
            <line x1="410" y1="115" x2="410" y2="230" stroke="#16A34A" strokeWidth="3" />
            <line x1="400" y1="115" x2="420" y2="115" stroke="#16A34A" strokeWidth="3" />
            <line x1="400" y1="230" x2="420" y2="230" stroke="#16A34A" strokeWidth="3" />
            <rect x="435" y="142" width="142" height="58" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
            <text x="506" y="168" textAnchor="middle" fill="#0A345D" fontSize="18" fontWeight="800" fontFamily="Outfit">
              N = len(X)
            </text>
            <text x="506" y="188" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="700" fontFamily="Fira Code">
              return self.X.shape[0]
            </text>
          </g>

          {/* Step 2: __getitem__ */}
          <g style={{ opacity: step >= 2 ? 1 : 0.2, transition: 'all 0.3s' }}>
            <rect x="630" y="64" width="270" height="194" rx="10" fill="#FFF7ED" stroke={step === 2 ? '#EA580C' : '#CBD5E1'} strokeWidth="2.5" />
            <text x="765" y="90" textAnchor="middle" fill="#C2410C" fontSize="14" fontWeight="800" fontFamily="Fira Code">
              3. __getitem__(idx=2)
            </text>
            <rect x="655" y="118" width="220" height="46" rx="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="765" y="146" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              self.X[2] ➔ tensor([0.4, -1.2])
            </text>
            <rect x="655" y="178" width="220" height="46" rx="8" fill="#FFFFFF" stroke="#16A34A" strokeWidth="2" />
            <text x="765" y="206" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              self.y[2] ➔ tensor(0)
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge={`MÉTODO ${step + 1}`} text={captions[step]} color="#0284C7" />
    </div>
  );
}

/* ============================================================================
   SLIDE 5: DATALOADER — TRAJETÓRIA DO GRADIENTE (TEMA CLARO)
============================================================================ */
export function BatchGradientTrajectoryChart() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Superfície de Erro (Loss)', '2. Batch Completo (Lento/Preso)', '3. Mini-Batch DataLoader (Ágil)'];
  const captions = [
    'A superfície de perda possui vales rasos (mínimos locais) e o mínimo global ótimo.',
    'Passar o dataset inteiro de uma vez exige muita VRAM, dá 1 passo por época e trava em mínimos locais.',
    'O DataLoader divide em mini-batches: atualiza dezenas de vezes por época e o ruído estocástico escapa de armadilhas!'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 295" style={{ width: '100%', maxHeight: '315px' }}>
          {/* Loss curve */}
          <path
            d="M 70 55 Q 170 245 270 185 Q 350 135 430 200 Q 590 305 730 115 Q 800 35 870 75"
            fill="none"
            stroke="#0A345D"
            strokeWidth="4"
          />

          <circle cx="235" cy="197" r="7" fill="#EA580C" />
          <text x="235" y="226" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="800">
            Mínimo Local (Armadilha)
          </text>

          <circle cx="575" cy="240" r="9" fill="#16A34A" />
          <text x="575" y="270" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="800">
            🎯 Mínimo Global Ótimo
          </text>

          <circle cx="95" cy="90" r="8" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          <text x="118" y="78" fill="#0A345D" fontSize="13" fontWeight="800">Pesos Iniciais</text>

          {step >= 1 && (
            <g>
              <path
                d="M 95 90 L 145 157 L 195 191 L 235 197"
                fill="none"
                stroke="#EA580C"
                strokeWidth="3.5"
                strokeDasharray="6 4"
              />
              <circle cx="145" cy="157" r="5" fill="#EA580C" />
              <circle cx="195" cy="191" r="5" fill="#EA580C" />
              <rect x="65" y="238" width="295" height="38" rx="8" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
              <text x="212" y="262" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="800">
                Batch Inteiro: 1 passo/época (Preso)
              </text>
            </g>
          )}

          {step >= 2 && (
            <g>
              <path
                d="M 95 90 L 160 170 L 230 193 L 315 150 L 385 177 L 475 227 L 535 243 L 575 240"
                fill="none"
                stroke="#16A34A"
                strokeWidth="4"
              />
              {[
                [160, 170], [230, 193], [315, 150], [385, 177], [475, 227], [535, 243], [575, 240]
              ].map(([px, py], i) => (
                <circle key={i} cx={px} cy={py} r="5.5" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.5" />
              ))}
              <rect x="575" y="40" width="335" height="58" rx="10" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2" />
              <text x="742" y="65" textAnchor="middle" fill="#15803D" fontSize="14" fontWeight="800">
                Mini-Batch (batch_size = 32)
              </text>
              <text x="742" y="85" textAnchor="middle" fill="#1E293B" fontSize="12" fontWeight="600">
                Salta o mínimo local e converge rápido!
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 1 ? '#EA580C' : '#16A34A'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 8: ARQUITETURA MULTITAREFA (CLASSIFICAÇÃO VS REGRESSÃO — TEMA CLARO)
============================================================================ */
export function TaskHeadComparisonDiagram() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Extrator Comum (MLP)', '2. Cabeça de Classificação (3 Classes)', '3. Cabeça de Regressão (1 Valor)'];
  const captions = [
    'O tronco oculto da MLP transforma os atributos tabulares X em representações não-lineares h.',
    'Classificação: Camada final nn.Linear(H, 3) emite 3 Logits brutos avaliados por nn.CrossEntropyLoss().',
    'Regressão: Camada final nn.Linear(H, 1) emite 1 escalar contínuo ($) avaliado por nn.MSELoss().'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 295" style={{ width: '100%', maxHeight: '315px' }}>
          <rect x="45" y="82" width="160" height="130" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="3" />
          <text x="125" y="132" textAnchor="middle" fill="#0A345D" fontSize="16" fontWeight="800" fontFamily="Outfit">
            Entradas X
          </text>
          <text x="125" y="158" textAnchor="middle" fill="#475569" fontSize="12" fontFamily="Fira Code">
            (batch, in_features)
          </text>

          <line x1="205" y1="147" x2="270" y2="147" stroke="#0284C7" strokeWidth="4" />

          <rect x="270" y="67" width="210" height="160" rx="12" fill="#E0F2FE" stroke="#0284C7" strokeWidth="3" />
          <text x="375" y="125" textAnchor="middle" fill="#0A345D" fontSize="17" fontWeight="800" fontFamily="Outfit">
            Camadas Ocultas
          </text>
          <text x="375" y="152" textAnchor="middle" fill="#0369A1" fontSize="13" fontWeight="700" fontFamily="Fira Code">
            Linear + ReLU
          </text>
          <text x="375" y="178" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="600">
            Vetor Latente h
          </text>

          {/* Branch 1: Classification */}
          <g style={{ opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.35s' }}>
            <path d="M 480 118 L 570 72" stroke="#9333EA" strokeWidth="4" />
            <rect x="570" y="20" width="345" height="112" rx="12" fill="#FAF5FF" stroke="#9333EA" strokeWidth="3" />
            <text x="742" y="48" textAnchor="middle" fill="#6B21A8" fontSize="15" fontWeight="800" fontFamily="Outfit">
              🎯 CLASSIFICAÇÃO MULTICLASSE
            </text>
            <text x="742" y="74" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              nn.Linear(H, 3) ➔ [z₀, z₁, z₂] (Logits)
            </text>
            <rect x="630" y="88" width="225" height="30" rx="6" fill="#9333EA" />
            <text x="742" y="108" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              Loss: nn.CrossEntropyLoss()
            </text>
          </g>

          {/* Branch 2: Regression */}
          <g style={{ opacity: step >= 2 ? 1 : 0.2, transition: 'all 0.35s' }}>
            <path d="M 480 178 L 570 222" stroke="#16A34A" strokeWidth="4" />
            <rect x="570" y="164" width="345" height="112" rx="12" fill="#F0FDF4" stroke="#16A34A" strokeWidth="3" />
            <text x="742" y="192" textAnchor="middle" fill="#166534" fontSize="15" fontWeight="800" fontFamily="Outfit">
              📈 REGRESSÃO CONTÍNUA
            </text>
            <text x="742" y="218" textAnchor="middle" fill="#1E293B" fontSize="13" fontWeight="700" fontFamily="Fira Code">
              nn.Linear(H, 1) ➔ ŷ ∈ ℝ (Escalar $)
            </text>
            <rect x="630" y="232" width="225" height="30" rx="6" fill="#16A34A" />
            <text x="742" y="252" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
              Loss: nn.MSELoss()
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge={`ARQUITETURA ${step + 1}`} text={captions[step]} color={step === 1 ? '#9333EA' : '#16A34A'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 9: ENTROPIA CRUZADA (TEMA CLARO)
============================================================================ */
export function CrossEntropyVisualChart() {
  const [step, setStep] = usePdfStep(2);
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
        <div className="content-card" style={{ background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
          <svg viewBox="0 0 620 265" style={{ width: '100%', maxHeight: '270px' }}>
            {/* Step 0: Logits */}
            <g style={{ opacity: step >= 0 ? 1 : 0.2 }}>
              <text x="105" y="26" textAnchor="middle" fill="#0A345D" fontSize="13" fontWeight="800">1. Logits (z)</text>
              <rect x="35" y="52" width="38" height="110" rx="4" fill="#0284C7" />
              <text x="54" y="45" textAnchor="middle" fill="#0A345D" fontSize="11" fontWeight="800" fontFamily="Fira Code">2.4</text>
              <rect x="85" y="132" width="38" height="30" rx="4" fill="#94A3B8" />
              <text x="104" y="125" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700" fontFamily="Fira Code">0.3</text>
              <rect x="135" y="162" width="38" height="35" rx="4" fill="#FF7043" />
              <text x="154" y="212" textAnchor="middle" fill="#C2410C" fontSize="11" fontWeight="800" fontFamily="Fira Code">-1.2</text>
              <line x1="25" y1="162" x2="185" y2="162" stroke="#64748B" strokeWidth="1.5" />
            </g>

            {/* Step 1: Probabilities */}
            <g style={{ opacity: step >= 1 ? 1 : 0.18, transition: 'all 0.3s' }}>
              <text x="305" y="26" textAnchor="middle" fill="#15803D" fontSize="13" fontWeight="800">2. Probabilidades (p̂)</text>
              <rect x="235" y="62" width="38" height="125" rx="4" fill="#16A34A" />
              <text x="254" y="54" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="800">84%</text>
              <rect x="285" y="169" width="38" height="18" rx="4" fill="#94A3B8" />
              <text x="304" y="162" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">13%</text>
              <rect x="335" y="181" width="38" height="6" rx="3" fill="#94A3B8" />
              <text x="354" y="174" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">3%</text>
              <line x1="225" y1="187" x2="385" y2="187" stroke="#64748B" strokeWidth="1.5" />
            </g>

            {/* Step 2: -log(p) curve */}
            <g style={{ opacity: step >= 2 ? 1 : 0.18, transition: 'all 0.3s' }}>
              <text x="510" y="26" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="800">3. Curva -log(p̂_y)</text>
              <line x1="430" y1="205" x2="595" y2="205" stroke="#64748B" strokeWidth="2" />
              <line x1="430" y1="42" x2="430" y2="205" stroke="#64748B" strokeWidth="2" />
              <path d="M 438 48 Q 460 172 590 203" fill="none" stroke="#EA580C" strokeWidth="3.5" />
              <circle cx="562" cy="197" r="6" fill="#16A34A" stroke="#FFFFFF" strokeWidth="2" />
              <text x="535" y="180" fill="#15803D" fontSize="11" fontWeight="800">L = 0.17</text>
              <text x="510" y="228" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700">p̂_y ➔ 1.0</text>
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

      <CaptionBar badge={`PASSO ${step + 1}`} text={captions[step]} color="#0284C7" />
    </div>
  );
}

/* ============================================================================
   SLIDE 10: CASO DO SEGURO SAÚDE (TEMA CLARO)
============================================================================ */
export function InsuranceDistributionChart() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Atributos Biométricos (X)', '2. Assimetria de Custos ($)', '3. Efeito Fumante + BMI'];
  const captions = [
    'Variáveis de entrada X: Idade, IMC (BMI), Filhos, Fumante (yes/no) e Região.',
    'O alvo Y (Charges $) possui forte cauda longa à direita: média de $13.270 e picos acima de $60.000.',
    'Pacientes fumantes com IMC elevado concentram os custos extremos na cauda direita.'
  ];

  const histBars = [
    { x: 90, h: 150, label: '$5k' },
    { x: 155, h: 120, label: '$10k' },
    { x: 220, h: 88, label: '$15k' },
    { x: 285, h: 58, label: '$20k' },
    { x: 350, h: 42, label: '$30k' },
    { x: 415, h: 50, label: '$40k' },
    { x: 480, h: 34, label: '$50k' },
    { x: 545, h: 18, label: '$60k+' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 285" style={{ width: '100%', maxHeight: '305px' }}>
          <rect x="35" y="20" width="245" height="235" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2.5" />
          <text x="157" y="48" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
            Entradas Tabulares (X)
          </text>
          {[
            ['🎂 Idade', '18 a 64 anos'],
            ['⚖️ BMI (IMC)', '16.0 a 53.1'],
            ['👶 Dependentes', '0 a 5 filhos'],
            ['🚬 Smoker', 'yes / no (One-Hot)']
          ].map(([k, v], i) => (
            <g key={i} transform={`translate(52, ${68 + i * 42})`}>
              <rect x="0" y="0" width="210" height="34" rx="6" fill="#F8FAFC" stroke={step === 2 && i >= 1 && i !== 2 ? '#EA580C' : '#CBD5E1'} strokeWidth="2" />
              <text x="12" y="22" fill="#0A345D" fontSize="12" fontWeight="700">{k}</text>
              <text x="200" y="22" textAnchor="end" fill="#0369A1" fontSize="11" fontWeight="700" fontFamily="Fira Code">{v}</text>
            </g>
          ))}

          <g style={{ opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.35s' }}>
            <text x="615" y="34" textAnchor="middle" fill="#0A345D" fontSize="16" fontWeight="800" fontFamily="Outfit">
              Distribuição do Alvo Contínuo: Custos Médicos ($)
            </text>
            <line x1="330" y1="225" x2="900" y2="225" stroke="#64748B" strokeWidth="2" />

            {histBars.map((b, idx) => {
              const isHigh = idx >= 5;
              const barColor = step === 2 && isHigh ? '#FF7043' : '#0284C7';
              return (
                <g key={idx} transform={`translate(${260 + b.x}, 0)`}>
                  <rect x="0" y={225 - b.h} width="46" height={b.h} rx="5" fill={barColor} />
                  <text x="23" y="246" textAnchor="middle" fill="#334155" fontSize="11" fontWeight="700" fontFamily="Fira Code">
                    {b.label}
                  </text>
                </g>
              );
            })}

            <line x1="460" y1="50" x2="460" y2="225" stroke="#16A34A" strokeWidth="3" strokeDasharray="6 4" />
            <text x="468" y="68" fill="#15803D" fontSize="12" fontWeight="800">
              Média = $13.270
            </text>
          </g>

          {step === 2 && (
            <g>
              <rect x="650" y="70" width="245" height="66" rx="10" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2" />
              <text x="772" y="96" textAnchor="middle" fill="#C2410C" fontSize="13" fontWeight="800">
                🔥 Cauda Extrema ($35k – $60k+)
              </text>
              <text x="772" y="118" textAnchor="middle" fill="#7C2D12" fontSize="12" fontWeight="700">
                Smoker = yes + BMI &gt; 30
              </text>
            </g>
          )}
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 2 ? '#EA580C' : '#0284C7'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 11: MÉTRICAS DE REGRESSÃO (MAE, RMSE, R² — TEMA CLARO)
============================================================================ */
export function RegressionMetricsChart() {
  const [step, setStep] = usePdfStep(2);
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
    { x: 430, yReal: 42, yHat: 95 }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div style={{ display: 'grid', gridTemplateColumns: '1.35fr 0.65fr', gap: '16px', flex: 1 }}>
        <div className="content-card" style={{ background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '14px' }}>
          <svg viewBox="0 0 580 260" style={{ width: '100%', maxHeight: '270px' }}>
            <line x1="55" y1="225" x2="530" y2="225" stroke="#64748B" strokeWidth="2" />
            <line x1="55" y1="25" x2="55" y2="225" stroke="#64748B" strokeWidth="2" />

            {step === 2 && (
              <g>
                <line x1="55" y1="135" x2="520" y2="135" stroke="#9333EA" strokeWidth="2.5" strokeDasharray="7 4" />
                <text x="485" y="126" fill="#6B21A8" fontSize="12" fontWeight="800">Média ȳ</text>
              </g>
            )}

            <line x1="75" y1="215" x2="500" y2="68" stroke="#0284C7" strokeWidth="3.5" />
            <text x="485" y="58" fill="#0369A1" fontSize="12" fontWeight="800">Predição ŷ</text>

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
                      fill="rgba(255,112,67,0.22)"
                      stroke="#EA580C"
                      strokeWidth="1.5"
                    />
                  )}
                  <line x1={p.x} y1={p.yReal} x2={p.x} y2={p.yHat} stroke="#EA580C" strokeWidth="3" />
                  <circle cx={p.x} cy={p.yReal} r="6.5" fill="#16A34A" stroke="#FFFFFF" strokeWidth="1.5" />
                  <circle cx={p.x} cy={p.yHat} r="5" fill="#0284C7" />
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

      <CaptionBar badge={steps[step].split(' ')[1]} text={captions[step]} color="#0284C7" />
    </div>
  );
}

/* ============================================================================
   SLIDE 12: BASELINES NÃO-TRIVIAIS (TEMA CLARO)
============================================================================ */
export function BaselineComparisonChart() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Classificação: Chute Majoritário', '2. Regressão: Chute na Média (R²=0)', '3. Ganho Real da Rede Neural'];
  const captions = [
    'Se 70% dos clientes pertencem à classe majoritária, um modelo cego atinge 70% de acurácia sem aprender nada!',
    'Na regressão, prever sempre a média global ȳ gera R² = 0.0 (erro alto de $9.100).',
    'A MLP só comprova aprendizado quando supera com folga o baseline não-trivial no Teste Cego.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 285" style={{ width: '100%', maxHeight: '305px' }}>
          {/* Left Chart */}
          <g style={{ opacity: step >= 0 ? 1 : 0.2 }}>
            <rect x="40" y="18" width="420" height="245" rx="12" fill="#FFFFFF" stroke="#0284C7" strokeWidth="2" />
            <text x="250" y="46" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
              Classificação (Acurácia no Teste)
            </text>

            <rect x="110" y="102" width="95" height="125" rx="6" fill="#94A3B8" />
            <text x="157" y="92" textAnchor="middle" fill="#334155" fontSize="15" fontWeight="800">70%</text>
            <text x="157" y="246" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">Baseline Dummy</text>

            {step >= 2 && (
              <g>
                <rect x="275" y="62" width="95" height="165" rx="6" fill="#16A34A" />
                <text x="322" y="52" textAnchor="middle" fill="#15803D" fontSize="16" fontWeight="800">92% (+22%)</text>
                <text x="322" y="246" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="800">Nossa MLP</text>
              </g>
            )}
            <line x1="80" y1="227" x2="420" y2="227" stroke="#64748B" strokeWidth="2" />
          </g>

          {/* Right Chart */}
          <g style={{ opacity: step >= 1 ? 1 : 0.2, transition: 'all 0.35s' }}>
            <rect x="500" y="18" width="420" height="245" rx="12" fill="#FFFFFF" stroke="#EA580C" strokeWidth="2" />
            <text x="710" y="46" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
              Regressão Insurance (Erro MAE em $)
            </text>

            <rect x="570" y="72" width="95" height="155" rx="6" fill="#FF7043" />
            <text x="617" y="62" textAnchor="middle" fill="#C2410C" fontSize="14" fontWeight="800">$9.100 (R²=0)</text>
            <text x="617" y="246" textAnchor="middle" fill="#475569" fontSize="12" fontWeight="700">Média Global ȳ</text>

            {step >= 2 && (
              <g>
                <rect x="745" y="177" width="95" height="50" rx="6" fill="#0284C7" />
                <text x="792" y="167" textAnchor="middle" fill="#0369A1" fontSize="14" fontWeight="800">$2.450 (R²=0.86)</text>
                <text x="792" y="246" textAnchor="middle" fill="#0369A1" fontSize="12" fontWeight="800">Nossa MLP</text>
              </g>
            )}
            <line x1="540" y1="227" x2="880" y2="227" stroke="#64748B" strokeWidth="2" />
          </g>
        </svg>
      </div>

      <CaptionBar badge={`ETAPA ${step + 1}`} text={captions[step]} color={step === 2 ? '#16A34A' : '#EA580C'} />
    </div>
  );
}

/* ============================================================================
   SLIDE 14: SÍNTESE & CHECKLIST VISUAL DO PROJETO 1 (TEMA CLARO)
============================================================================ */
export function PipelineChecklistVisual() {
  const [step, setStep] = usePdfStep(3);
  const items = [
    { title: '1. Split Estratificado', sub: 'train_test_split', icon: '✂️', color: '#0284C7', desc: 'Dividir Treino (70%), Validação (15%) e Teste (15%) antes de qualquer estatística.' },
    { title: '2. Fit Só no Treino', sub: 'StandardScaler', icon: '🔒', color: '#16A34A', desc: 'Ajustar escaladores exclusivamente no Treino para eliminar Data Leakage.' },
    { title: '3. Dataset & DataLoader', sub: 'shuffle=True', icon: '⚙️', color: '#9333EA', desc: 'Empacotar tensores na classe Dataset e iterar em mini-batches estocásticos.' },
    { title: '4. Métricas vs Baseline', sub: 'Teste Cego', icon: '🏆', color: '#EA580C', desc: 'Comprovar ganho real sobre o preditor majoritário ou média global.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={items.map(i => i.title)} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 275" style={{ width: '100%', maxHeight: '295px' }}>
          {items.map((it, idx) => {
            const x = 45 + idx * 225;
            const active = idx <= step;
            return (
              <g key={idx} onClick={() => setStep(idx)} style={{ cursor: 'pointer', opacity: active ? 1 : 0.25, transition: 'all 0.3s' }}>
                {idx < 3 && (
                  <line x1={x + 195} y1="138" x2={x + 225} y2="138" stroke={idx < step ? '#16A34A' : '#CBD5E1'} strokeWidth="5" />
                )}
                <rect
                  x={x}
                  y="42"
                  width="195"
                  height="190"
                  rx="14"
                  fill="#FFFFFF"
                  stroke={idx === step ? it.color : '#CBD5E1'}
                  strokeWidth={idx === step ? '3.5' : '2'}
                />
                <text x={x + 97} y="95" textAnchor="middle" fontSize="34">{it.icon}</text>
                <text x={x + 97} y="138" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
                  {it.title}
                </text>
                <rect x={x + 25} y="158" width="145" height="28" rx="14" fill={it.color} />
                <text x={x + 97} y="177" textAnchor="middle" fill="#FFFFFF" fontSize="12" fontWeight="800" fontFamily="Fira Code">
                  {it.sub}
                </text>
                {active && (
                  <text x={x + 97} y="214" textAnchor="middle" fill="#15803D" fontSize="12" fontWeight="800">
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
   SLIDE 15: PRÓXIMOS PASSOS (AULA 04 — TEMA CLARO)
============================================================================ */
export function NextClassPreviewVisual() {
  const [step, setStep] = usePdfStep(2);
  const steps = ['1. Inicialização Xavier & He', '2. BatchNorm & LayerNorm', '3. Regularização com Dropout'];
  const captions = [
    'Aula 04: Como calibrar a variância inicial dos pesos para evitar explosão ou sumiço do gradiente.',
    'Normalização interna das camadas para acelerar a convergência em redes profundas.',
    'Desligamento aleatório de neurônios (Inverted Dropout) para combater o overfitting.'
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <StepBar steps={steps} current={step} onChange={setStep} />

      <div className="content-card" style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '16px' }}>
        <svg viewBox="0 0 960 275" style={{ width: '100%', maxHeight: '295px' }}>
          {/* Card 1: Weight Init */}
          <g onClick={() => setStep(0)} style={{ cursor: 'pointer', opacity: step >= 0 ? 1 : 0.25 }}>
            <rect x="40" y="22" width="270" height="230" rx="14" fill="#FFFFFF" stroke={step === 0 ? '#0284C7' : '#CBD5E1'} strokeWidth="3" />
            <text x="175" y="55" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
              1. Xavier & Kaiming He
            </text>
            <path d="M 75 188 Q 175 58 275 188" fill="none" stroke="#0284C7" strokeWidth="3.5" />
            <path d="M 115 188 Q 175 128 235 188" fill="none" stroke="#EA580C" strokeWidth="2.5" strokeDasharray="5 4" />
            <text x="175" y="222" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="700" fontFamily="Fira Code">
              Var(W) = 2 / n_in
            </text>
          </g>

          {/* Card 2: BatchNorm */}
          <g onClick={() => setStep(1)} style={{ cursor: 'pointer', opacity: step >= 1 ? 1 : 0.25, transition: 'all 0.3s' }}>
            <rect x="345" y="22" width="270" height="230" rx="14" fill="#FFFFFF" stroke={step === 1 ? '#16A34A' : '#CBD5E1'} strokeWidth="3" />
            <text x="480" y="55" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
              2. BatchNorm1d / LayerNorm
            </text>
            <circle cx="425" cy="142" r="34" fill="#FFF7ED" stroke="#EA580C" strokeWidth="2.5" />
            <text x="425" y="146" textAnchor="middle" fill="#C2410C" fontSize="11" fontWeight="800">Deslocado</text>
            <text x="480" y="147" textAnchor="middle" fill="#0A345D" fontSize="18" fontWeight="800">➔</text>
            <circle cx="535" cy="142" r="34" fill="#F0FDF4" stroke="#16A34A" strokeWidth="2.5" />
            <text x="535" y="146" textAnchor="middle" fill="#15803D" fontSize="11" fontWeight="800">μ=0, σ=1</text>
            <text x="480" y="222" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="700" fontFamily="Fira Code">
              Estabilidade Interna
            </text>
          </g>

          {/* Card 3: Dropout */}
          <g onClick={() => setStep(2)} style={{ cursor: 'pointer', opacity: step >= 2 ? 1 : 0.25, transition: 'all 0.3s' }}>
            <rect x="650" y="22" width="270" height="230" rx="14" fill="#FFFFFF" stroke={step === 2 ? '#9333EA' : '#CBD5E1'} strokeWidth="3" />
            <text x="785" y="55" textAnchor="middle" fill="#0A345D" fontSize="15" fontWeight="800" fontFamily="Outfit">
              3. Inverted Dropout
            </text>
            {[0, 1, 2].map(i => (
              <g key={i} transform={`translate(${720 + i * 65}, 138)`}>
                <circle cx="0" cy="0" r="22" fill={i === 1 ? '#FFF7ED' : '#E0F2FE'} stroke={i === 1 ? '#EA580C' : '#0284C7'} strokeWidth="2.5" strokeDasharray={i === 1 ? '4 3' : 'none'} />
                <text x="0" y="5" textAnchor="middle" fill={i === 1 ? '#C2410C' : '#0A345D'} fontSize="13" fontWeight="800">
                  {i === 1 ? '✕' : 'h'}
                </text>
              </g>
            ))}
            <text x="785" y="222" textAnchor="middle" fill="#334155" fontSize="12" fontWeight="700" fontFamily="Fira Code">
              nn.Dropout(p=0.3)
            </text>
          </g>
        </svg>
      </div>

      <CaptionBar badge="PRÓXIMA AULA" text={captions[step]} color="#0284C7" />
    </div>
  );
}
