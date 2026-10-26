import React, { useState } from 'react';
import MathView from '../MathView';
import { 
  Database, 
  Split, 
  Sparkles, 
  ShieldAlert, 
  ShieldCheck, 
  ArrowRight, 
  RefreshCw, 
  Zap, 
  RotateCcw, 
  Target, 
  TrendingUp, 
  Layers, 
  CheckCircle2, 
  FileCode2, 
  Cpu, 
  SlidersHorizontal,
  ChevronRight,
  Play
} from 'lucide-react';

/* =========================================================================
   1. VISUALIZADOR DE PARTICIONAMENTO TREINO / TESTE (PREVENÇÃO DE LEAKAGE)
   ========================================================================= */
export function DataSplitVisualizer() {
  const [step, setStep] = useState(0);

  const steps = [
    {
      title: "1. Dataset Bruto Completo",
      badge: "INGESTÃO INICIAL",
      badgeColor: "#0E4E8A",
      desc: "Todo o conjunto de dados carregado na memória (ex: 1.338 linhas de seguro saúde ou 350 clientes). Não toque em médias ou desvios ainda!",
      trainPercent: 100,
      testPercent: 0,
      fitTarget: "Nenhum (aguardando split)",
      status: "neutral"
    },
    {
      title: "2. Particionamento Cego (Split 80/20)",
      badge: "ISOLAMENTO ESTATÍSTICO",
      badgeColor: "#1BB5D8",
      desc: "Separação estrita dos dados em Treino (80%) e Teste Cego (20%). O conjunto de teste é colocado em uma 'gaveta blindada' simulando dados futuros de produção.",
      trainPercent: 80,
      testPercent: 20,
      fitTarget: "Conjuntos isolados",
      status: "neutral"
    },
    {
      title: "3. Ajuste do Scaler Estritamente no Treino",
      badge: "FIT_TRANSFORM APENAS NO TREINO",
      badgeColor: "#7CB342",
      desc: "Calculamos a média (μ) e desvio padrão (σ) EXCLUSIVAMENTE nas 80% amostras de treino. O conjunto de teste permanece totalmente invisível.",
      trainPercent: 80,
      testPercent: 20,
      fitTarget: "scaler.fit_transform(X_train)",
      status: "success"
    },
    {
      title: "4. Aplicação Transparente no Teste",
      badge: "TRANSFORM SEM FIT",
      badgeColor: "#FF7043",
      desc: "Aplicamos o scaler no Teste usando a média e desvio aprendidos no Treino (scaler.transform). Se você fizesse .fit_transform no teste, ocorreria Data Leakage!",
      trainPercent: 80,
      testPercent: 20,
      fitTarget: "scaler.transform(X_test)",
      status: "success"
    }
  ];

  const current = steps[step];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', height: '100%' }}>
      {/* Stepper Buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setStep(idx)}
            style={{
              padding: '10px 14px',
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
              gap: '4px'
            }}
          >
            <span style={{ fontSize: '0.75rem', color: s.badgeColor, fontWeight: '800' }}>ETAPA {idx + 1}</span>
            <span style={{ fontSize: '0.88rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {s.title.split('. ')[1]}
            </span>
          </button>
        ))}
      </div>

      {/* Main Diagram */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        flex: 1
      }}>
        {/* Visual Partition Bar */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '0.85rem', fontWeight: '600' }}>
            <span style={{ color: '#0E4E8A' }}>
              Treino ({current.trainPercent}%) {step >= 2 && '• μ e σ calculados aqui'}
            </span>
            <span style={{ color: '#FF7043' }}>
              Teste Cego ({current.testPercent}%) {step >= 3 && '• Apenas transformado'}
            </span>
          </div>

          <div style={{ height: '36px', width: '100%', borderRadius: '10px', overflow: 'hidden', display: 'flex', background: '#F1F5F9', border: '1px solid #CBD5E1' }}>
            <div style={{
              width: `${current.trainPercent}%`,
              background: 'linear-gradient(90deg, #0A345D, #1BB5D8)',
              color: '#FFF',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: '700',
              fontSize: '0.9rem',
              transition: 'all 0.5s ease'
            }}>
              {current.trainPercent > 0 && `X_train, y_train (${current.trainPercent}%)`}
            </div>
            {current.testPercent > 0 && (
              <div style={{
                width: `${current.testPercent}%`,
                background: 'linear-gradient(90deg, #FF7043, #D84315)',
                color: '#FFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700',
                fontSize: '0.9rem',
                transition: 'all 0.5s ease'
              }}>
                X_test, y_test ({current.testPercent}%)
              </div>
            )}
          </div>
        </div>

        {/* Step Explanation Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '20px', flex: 1, alignItems: 'stretch' }}>
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #E2E8F0',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span style={{
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: current.badgeColor + '20',
                  color: current.badgeColor,
                  fontWeight: '800',
                  fontSize: '0.8rem'
                }}>
                  {current.badge}
                </span>
                <span style={{ fontWeight: '700', color: 'var(--infnet-dark-blue)', fontSize: '1.05rem' }}>
                  {current.title}
                </span>
              </div>
              <p style={{ color: '#334155', fontSize: '0.95rem', lineHeight: '1.5', margin: 0 }}>
                {current.desc}
              </p>
            </div>

            <div style={{
              marginTop: '16px',
              padding: '12px 14px',
              borderRadius: '8px',
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.88rem',
              color: '#0A345D'
            }}>
              <strong>Operação PyTorch/Scikit:</strong> {current.fitTarget}
            </div>
          </div>

          {/* Rule of Gold Alert Box */}
          <div style={{
            background: step === 3 ? '#F0FDF4' : '#FFF7ED',
            border: step === 3 ? '1px solid #86EFAC' : '1px solid #FED7AA',
            borderRadius: '12px',
            padding: '18px 20px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between'
          }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: step === 3 ? '#166534' : '#C2410C', fontWeight: '800', fontSize: '0.95rem', marginBottom: '8px' }}>
                {step === 3 ? <ShieldCheck size={20} /> : <ShieldAlert size={20} />}
                {step === 3 ? 'PREVENÇÃO DE DATA LEAKAGE' : 'REGRA DE OURO INVIOLÁVEL'}
              </div>
              <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.45', margin: 0 }}>
                {step === 3 
                  ? 'Ao usar scaler.transform(X_test), o modelo só conhece a média e desvio do treino. Em produção, novos clientes serão normalizados exatamente por essa mesma regra!'
                  : 'NUNCA chame scaler.fit() ou fit_transform() no dataset inteiro ou no conjunto de teste. O teste DEVE ser cego e simular os dados de amanhã que o modelo nunca viu.'}
              </p>
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '12px' }}>
              <button
                disabled={step === 0}
                onClick={() => setStep(prev => prev - 1)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: '1px solid #CBD5E1',
                  background: '#FFFFFF',
                  cursor: step === 0 ? 'not-allowed' : 'pointer',
                  opacity: step === 0 ? 0.5 : 1,
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                ◀ Anterior
              </button>
              <button
                disabled={step === steps.length - 1}
                onClick={() => setStep(prev => prev + 1)}
                style={{
                  flex: 1,
                  padding: '8px 12px',
                  borderRadius: '8px',
                  border: 'none',
                  background: 'var(--infnet-dark-blue)',
                  color: '#FFF',
                  cursor: step === steps.length - 1 ? 'not-allowed' : 'pointer',
                  opacity: step === steps.length - 1 ? 0.5 : 1,
                  fontWeight: '600',
                  fontSize: '0.85rem'
                }}
              >
                Próximo ▶
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   2. VISUALIZADOR DO CICLO CANÔNICO DE TREINAMENTO (AS 5 ETAPAS DO PYTORCH)
   ========================================================================= */
export function TrainingCycleVisualizer() {
  const [activeStep, setActiveStep] = useState(0);

  const cycleSteps = [
    {
      num: 1,
      title: "Forward Pass",
      code: "y_pred = model(X_batch)",
      badge: "PROPAGAÇÃO DIRETA",
      color: "#0E4E8A",
      desc: "Os tensores do mini-batch (X) atravessam as camadas lineares e funções de ativação. A rede produz previsões brutas (logits ou valores contínuos).",
      action: "Calcula ativações e mantém o grafo de operações dinâmico na memória RAM/GPU."
    },
    {
      num: 2,
      title: "Cálculo da Função de Perda",
      code: "loss = criterion(y_pred, y_batch)",
      badge: "ERRO ESCALAR",
      color: "#7E22CE",
      desc: "A função de perda (CrossEntropyLoss ou MSELoss) compara as previsões da rede com os rótulos reais (y) e retorna um tensor escalar de erro.",
      action: "Mede quão longe o modelo está da verdade no mini-batch atual."
    },
    {
      num: 3,
      title: "Zerar Gradientes Antigos",
      code: "optimizer.zero_grad()",
      badge: "LIMPEZA OBRIGATÓRIA",
      color: "#D84315",
      desc: "O PyTorch por padrão ACUMULA gradientes a cada backward(). Se não zerarmos com zero_grad(), o gradiente do batch atual será somado ao anterior!",
      action: "Zera o tensor param.grad de todos os pesos antes de calcular os novos gradientes."
    },
    {
      num: 4,
      title: "Backward Pass (Autograd)",
      code: "loss.backward()",
      badge: "DIFERENCIAÇÃO AUTOMÁTICA",
      color: "#1BB5D8",
      desc: "O mecanismo Autograd percorre o grafo computacional de trás para frente pela Regra da Cadeia, calculando a derivada parcial dLoss/dW para cada parâmetro.",
      action: "Popula o atributo .grad de cada peso da rede neural."
    },
    {
      num: 5,
      title: "Atualização dos Pesos",
      code: "optimizer.step()",
      badge: "PASSO DO OTIMIZADOR",
      color: "#2E7D32",
      desc: "O otimizador (SGD, Adam ou AdamW) pega os gradientes recém-calculados e ajusta os pesos pela fórmula: W = W - taxa_aprendizado * gradiente.",
      action: "Os parâmetros do modelo dão um passo em direção ao ponto de menor perda."
    }
  ];

  const current = cycleSteps[activeStep];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>
      {/* Step Selector Horizontal Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '8px' }}>
        {cycleSteps.map((s, idx) => (
          <button
            key={idx}
            onClick={() => setActiveStep(idx)}
            style={{
              padding: '10px 8px',
              borderRadius: '10px',
              border: activeStep === idx ? `2px solid ${s.color}` : '1px solid #E2E8F0',
              background: activeStep === idx ? '#F8FAFC' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
              transition: 'all 0.2s ease',
              boxShadow: activeStep === idx ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <span style={{
              width: '24px',
              height: '24px',
              borderRadius: '50%',
              background: activeStep === idx ? s.color : '#E2E8F0',
              color: activeStep === idx ? '#FFF' : '#64748B',
              fontSize: '0.8rem',
              fontWeight: '800',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              {s.num}
            </span>
            <span style={{
              fontSize: '0.82rem',
              fontWeight: activeStep === idx ? '800' : '600',
              color: activeStep === idx ? 'var(--infnet-dark-blue)' : '#64748B',
              textAlign: 'center'
            }}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      {/* Interactive Main Area */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '22px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 1fr',
        gap: '22px',
        flex: 1,
        boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)'
      }}>
        {/* Left Column: Flow Diagram + Active Code */}
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '16px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <span style={{
                padding: '4px 10px',
                borderRadius: '6px',
                background: current.color + '20',
                color: current.color,
                fontWeight: '800',
                fontSize: '0.8rem'
              }}>
                PASSO {current.num} DE 5
              </span>
              <h3 style={{ margin: 0, color: 'var(--infnet-dark-blue)', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
                {current.title}
              </h3>
            </div>

            {/* Code Box with Syntax Styling */}
            <div style={{
              background: '#0A345D',
              borderRadius: '10px',
              padding: '16px 20px',
              color: '#FFFFFF',
              fontFamily: 'Fira Code, monospace',
              fontSize: '1.05rem',
              border: `2px solid ${current.color}`,
              boxShadow: '0 4px 12px rgba(10,52,93,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <span>{current.code}</span>
              <span style={{ fontSize: '0.75rem', background: 'rgba(255,255,255,0.15)', padding: '3px 8px', borderRadius: '4px' }}>
                PyTorch
              </span>
            </div>

            <p style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.5', marginTop: '16px', marginBottom: '8px' }}>
              {current.desc}
            </p>
          </div>

          <div style={{
            background: '#F1F5F9',
            borderRadius: '10px',
            padding: '12px 16px',
            borderLeft: `4px solid ${current.color}`,
            fontSize: '0.88rem',
            color: '#1E293B'
          }}>
            <strong>O que acontece internamente:</strong> {current.action}
          </div>
        </div>

        {/* Right Column: Complete Mini-Batch Loop Code Structure */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '16px 20px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{ fontWeight: '800', color: 'var(--infnet-dark-blue)', fontSize: '0.92rem', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileCode2 size={18} color="var(--infnet-cyan)" />
              O LOOP SAGRADO DE TREINAMENTO (POR ÉPOCA)
            </div>

            <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.86rem', lineHeight: '1.8', color: '#334155' }}>
              <div style={{ color: '#64748B' }}># 1. Modo de Treino</div>
              <div style={{ color: '#0E4E8A', fontWeight: '700' }}>model.train()</div>
              <div style={{ color: '#64748B', marginTop: '6px' }}># 2. Iteração pelos Mini-batches</div>
              <div>for X_batch, y_batch in train_loader:</div>
              <div style={{ paddingLeft: '16px', background: activeStep === 0 ? '#E0F2FE' : 'transparent', borderRadius: '4px' }}>
                <span style={{ color: activeStep === 0 ? '#0E4E8A' : '#64748B', fontWeight: activeStep === 0 ? '800' : 'normal' }}>
                  1. y_pred = model(X_batch)
                </span>
              </div>
              <div style={{ paddingLeft: '16px', background: activeStep === 1 ? '#F3E8FF' : 'transparent', borderRadius: '4px' }}>
                <span style={{ color: activeStep === 1 ? '#7E22CE' : '#64748B', fontWeight: activeStep === 1 ? '800' : 'normal' }}>
                  2. loss = criterion(y_pred, y_batch)
                </span>
              </div>
              <div style={{ paddingLeft: '16px', background: activeStep === 2 ? '#FFEDD5' : 'transparent', borderRadius: '4px' }}>
                <span style={{ color: activeStep === 2 ? '#D84315' : '#64748B', fontWeight: activeStep === 2 ? '800' : 'normal' }}>
                  3. optimizer.zero_grad()
                </span>
              </div>
              <div style={{ paddingLeft: '16px', background: activeStep === 3 ? '#E0F2FE' : 'transparent', borderRadius: '4px' }}>
                <span style={{ color: activeStep === 3 ? '#0284C7' : '#64748B', fontWeight: activeStep === 3 ? '800' : 'normal' }}>
                  4. loss.backward()
                </span>
              </div>
              <div style={{ paddingLeft: '16px', background: activeStep === 4 ? '#DCFCE7' : 'transparent', borderRadius: '4px' }}>
                <span style={{ color: activeStep === 4 ? '#166534' : '#64748B', fontWeight: activeStep === 4 ? '800' : 'normal' }}>
                  5. optimizer.step()
                </span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
            <button
              onClick={() => setActiveStep(prev => (prev === 0 ? 4 : prev - 1))}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #CBD5E1',
                background: '#FFFFFF',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              ◀ Passo Anterior
            </button>
            <button
              onClick={() => setActiveStep(prev => (prev === 4 ? 0 : prev + 1))}
              style={{
                flex: 1,
                padding: '8px',
                borderRadius: '8px',
                border: 'none',
                background: 'var(--infnet-dark-blue)',
                color: '#FFF',
                fontWeight: '700',
                fontSize: '0.82rem',
                cursor: 'pointer'
              }}
            >
              Próximo Passo ▶
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   3. VISUALIZADOR COMPARATIVO: CLASSIFICAÇÃO VS REGRESSÃO NO PYTORCH
   ========================================================================= */
export function ClassificationVsRegressionVisualizer() {
  const [selectedTask, setSelectedTask] = useState('both'); // 'both' | 'classification' | 'regression'
  
  // Interactive state for Classification Graphic (test sample position)
  const [classPoint, setClassPoint] = useState({ x: 95, y: 125 }); // default in Class 0 region
  
  // Interactive state for Regression Graphic (X query point)
  const [regX, setRegX] = useState(160); // X coordinate in SVG space

  // Classification logic for interactive sample
  // Boundary line equation approx: y_bound = 175 - 0.45 * x
  const isClass1 = classPoint.y < (175 - 0.45 * classPoint.x);
  const classLogits = isClass1 
    ? { c0: -1.65, c1: 2.84, pred: "Classe 1 (Comprador / Alta Satisfação)", color: "#FF7043" }
    : { c0: 2.91, c1: -1.42, pred: "Classe 0 (Não-comprador / Baixa Satisfação)", color: "#0E4E8A" };

  // Regression logic for interactive sample
  // Curve equation approx: y = 160 - 0.42 * x + 0.0003 * x^2
  // Real-world value mapping: x from 40..280 (ages 20..65), y to costs R$ 1.500 .. R$ 12.000
  const normX = Math.max(40, Math.min(280, regX));
  const curveY = 162 - 0.48 * normX + 0.00025 * Math.pow(normX, 1.5);
  const estimatedAge = Math.round(20 + ((normX - 40) / 240) * 45);
  const estimatedCost = Math.round(1800 + Math.pow((normX - 35) / 240, 1.6) * 9800);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Task Toggle Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
        <button
          onClick={() => setSelectedTask('both')}
          style={{
            padding: '7px 18px',
            borderRadius: '20px',
            border: selectedTask === 'both' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
            background: selectedTask === 'both' ? '#F0F9FF' : '#FFF',
            fontWeight: '700',
            color: selectedTask === 'both' ? '#0A345D' : '#64748B',
            cursor: 'pointer',
            fontSize: '0.86rem'
          }}
        >
          Visão Comparativa (Gráficos Lado a Lado)
        </button>
        <button
          onClick={() => setSelectedTask('classification')}
          style={{
            padding: '7px 18px',
            borderRadius: '20px',
            border: selectedTask === 'classification' ? '2px solid #0E4E8A' : '1px solid #CBD5E1',
            background: selectedTask === 'classification' ? '#EFF6FF' : '#FFF',
            fontWeight: '700',
            color: selectedTask === 'classification' ? '#0E4E8A' : '#64748B',
            cursor: 'pointer',
            fontSize: '0.86rem'
          }}
        >
          Foco: Classificação (Fronteira de Decisão)
        </button>
        <button
          onClick={() => setSelectedTask('regression')}
          style={{
            padding: '7px 18px',
            borderRadius: '20px',
            border: selectedTask === 'regression' ? '2px solid #2E7D32' : '1px solid #CBD5E1',
            background: selectedTask === 'regression' ? '#F0FDF4' : '#FFF',
            fontWeight: '700',
            color: selectedTask === 'regression' ? '#2E7D32' : '#64748B',
            cursor: 'pointer',
            fontSize: '0.86rem'
          }}
        >
          Foco: Regressão (Ajuste de Curva Contínua)
        </button>
      </div>

      {/* Comparison Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: selectedTask === 'both' ? '1fr 1fr' : '1fr',
        gap: '16px',
        flex: 1
      }}>
        {/* =========================================================
            CARD 1: CLASSIFICAÇÃO (GRÁFICO DE FRONTEIRA + SPECS)
           ========================================================= */}
        {(selectedTask === 'both' || selectedTask === 'classification') && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '2px solid #BFDBFE',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(14, 78, 138, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: '#DBEAFE', color: '#1E40AF', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>
                  OBJETIVO: SEPARAR REGIÕES (DISCRETO)
                </span>
                <Target size={20} color="#1E40AF" />
              </div>

              <h3 style={{ margin: '0 0 6px 0', color: 'var(--infnet-dark-blue)', fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem' }}>
                Classificação: Fronteira de Decisão
              </h3>

              {/* Interactive SVG Chart for Classification */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <svg
                  viewBox="0 0 320 160"
                  style={{ width: '100%', maxHeight: '150px', cursor: 'crosshair', userSelect: 'none' }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const scaleX = 320 / rect.width;
                    const scaleY = 160 / rect.height;
                    const clickX = Math.round((e.clientX - rect.left) * scaleX);
                    const clickY = Math.round((e.clientY - rect.top) * scaleY);
                    if (clickX >= 35 && clickX <= 295 && clickY >= 15 && clickY <= 145) {
                      setClassPoint({ x: clickX, y: clickY });
                    }
                  }}
                >
                  <defs>
                    <linearGradient id="gradClass0" x1="0" y1="1" x2="0" y2="0">
                      <stop offset="0%" stopColor="#DBEAFE" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#EFF6FF" stopOpacity="0.1" />
                    </linearGradient>
                    <linearGradient id="gradClass1" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#FFEDD5" stopOpacity="0.45" />
                      <stop offset="100%" stopColor="#FFF7ED" stopOpacity="0.1" />
                    </linearGradient>
                  </defs>

                  {/* Decision Region Polygons */}
                  {/* Region Class 0 (bottom-left) */}
                  <polygon points="35,145 295,145 295,42 35,159" fill="url(#gradClass0)" />
                  {/* Region Class 1 (top-right) */}
                  <polygon points="35,15 295,15 295,42 35,159" fill="url(#gradClass1)" />

                  {/* Axis lines */}
                  <line x1="35" y1="145" x2="295" y2="145" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="35" y1="15" x2="35" y2="145" stroke="#94A3B8" strokeWidth="1.5" />

                  {/* Axis labels */}
                  <text x="290" y="156" fill="#64748B" fontSize="10" fontWeight="600" textAnchor="end">Feature X₁ (Idade)</text>
                  <text x="38" y="24" fill="#64748B" fontSize="10" fontWeight="600">Feature X₂ (Gasto)</text>

                  {/* Decision Boundary Line */}
                  <line x1="35" y1="159" x2="295" y2="42" stroke="#1BB5D8" strokeWidth="3" strokeDasharray="5,4" />
                  <text x="190" y="80" fill="#0284C7" fontSize="9" fontWeight="800" transform="rotate(-23 190 80)">
                    Fronteira de Decisão f(X)=0
                  </text>

                  {/* Class 0 Data Points (Blue Circles) */}
                  {[
                    [55, 135], [75, 120], [90, 138], [68, 105], [115, 130], 
                    [130, 115], [85, 95], [145, 100], [160, 125], [105, 110]
                  ].map(([px, py], i) => (
                    <circle key={`c0-${i}`} cx={px} cy={py} r="4.5" fill="#0E4E8A" stroke="#FFFFFF" strokeWidth="1.2" />
                  ))}

                  {/* Class 1 Data Points (Orange Diamonds/Squares) */}
                  {[
                    [170, 55], [205, 40], [230, 65], [250, 45], [185, 75], 
                    [265, 30], [220, 80], [275, 55], [240, 25], [210, 60]
                  ].map(([px, py], i) => (
                    <rect key={`c1-${i}`} x={px-4} y={py-4} width="8" height="8" rx="1.5" fill="#FF7043" stroke="#FFFFFF" strokeWidth="1.2" transform={`rotate(45 ${px} ${py})`} />
                  ))}

                  {/* Interactive Query Point (Star) */}
                  <circle cx={classPoint.x} cy={classPoint.y} r="8" fill="#7E22CE" stroke="#FFFFFF" strokeWidth="2.5" />
                  <circle cx={classPoint.x} cy={classPoint.y} r="12" fill="none" stroke="#7E22CE" strokeWidth="1.5" strokeDasharray="3 3" opacity="0.8" />
                  <text x={classPoint.x + 12} y={classPoint.y - 4} fill="#7E22CE" fontSize="10" fontWeight="800">
                    Novo Dado ★
                  </text>
                </svg>

                {/* Interactive Feedback Bar */}
                <div style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem'
                }}>
                  <span style={{ color: '#64748B' }}>
                    👆 <em>Clique no gráfico para mover o ponto</em>
                  </span>
                  <span style={{ color: classLogits.color, fontWeight: '800' }}>
                    Predição: {classLogits.pred}
                  </span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '10px' }}>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Camada Saída:</strong> <code style={{ color: '#1E40AF' }}>nn.Linear(dim, C)</code>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Ativação:</strong> Nenhuma (Logits brutos)
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Função de Perda:</strong> <code style={{ color: '#1E40AF' }}>CrossEntropyLoss</code>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Métricas:</strong> Acurácia, F1, Matriz Confusão
                </div>
              </div>
            </div>
          </div>
        )}

        {/* =========================================================
            CARD 2: REGRESSÃO (GRÁFICO DE CURVA + RESÍDUOS + SPECS)
           ========================================================= */}
        {(selectedTask === 'both' || selectedTask === 'regression') && (
          <div style={{
            background: '#FFFFFF',
            borderRadius: '16px',
            border: '2px solid #BBF7D0',
            padding: '16px 18px',
            boxShadow: '0 4px 16px rgba(46, 125, 50, 0.08)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '12px'
          }}>
            <div>
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span style={{ background: '#DCFCE7', color: '#166534', padding: '3px 8px', borderRadius: '6px', fontWeight: '800', fontSize: '0.75rem' }}>
                  OBJETIVO: ESTIMAR QUANTIDADE (CONTÍNUO)
                </span>
                <TrendingUp size={20} color="#166534" />
              </div>

              <h3 style={{ margin: '0 0 6px 0', color: 'var(--infnet-dark-blue)', fontFamily: 'Outfit, sans-serif', fontSize: '1.15rem' }}>
                Regressão: Curva Contínua & Resíduos
              </h3>

              {/* Interactive SVG Chart for Regression */}
              <div style={{
                background: '#F8FAFC',
                border: '1px solid #CBD5E1',
                borderRadius: '12px',
                padding: '8px 10px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
              }}>
                <svg
                  viewBox="0 0 320 160"
                  style={{ width: '100%', maxHeight: '150px', cursor: 'ew-resize', userSelect: 'none' }}
                  onClick={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const scaleX = 320 / rect.width;
                    const clickX = Math.round((e.clientX - rect.left) * scaleX);
                    if (clickX >= 40 && clickX <= 280) {
                      setRegX(clickX);
                    }
                  }}
                >
                  <defs>
                    <linearGradient id="gradRegressionArea" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#2E7D32" stopOpacity="0.2" />
                      <stop offset="100%" stopColor="#DCFCE7" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>

                  {/* Axis lines */}
                  <line x1="35" y1="145" x2="295" y2="145" stroke="#94A3B8" strokeWidth="1.5" />
                  <line x1="35" y1="15" x2="35" y2="145" stroke="#94A3B8" strokeWidth="1.5" />

                  {/* Axis labels */}
                  <text x="290" y="156" fill="#64748B" fontSize="10" fontWeight="600" textAnchor="end">Entrada X (Idade)</text>
                  <text x="38" y="24" fill="#64748B" fontSize="10" fontWeight="600">Alvo Contínuo ŷ (Custo R$)</text>

                  {/* Scatter Data Points and Residual Lines (error = y - y_pred) */}
                  {[
                    { x: 55, y: 135, cy: 136 },
                    { x: 75, y: 115, cy: 126 },
                    { x: 105, y: 125, cy: 112 },
                    { x: 130, y: 92, cy: 100 },
                    { x: 165, y: 88, cy: 84 },
                    { x: 195, y: 65, cy: 70 },
                    { x: 225, y: 62, cy: 56 },
                    { x: 250, y: 38, cy: 45 },
                    { x: 275, y: 32, cy: 35 }
                  ].map((pt, i) => (
                    <g key={`reg-pt-${i}`}>
                      {/* Red dashed vertical residual line */}
                      <line
                        x1={pt.x}
                        y1={pt.y}
                        x2={pt.x}
                        y2={pt.cy}
                        stroke="#EF4444"
                        strokeWidth="1.5"
                        strokeDasharray="2,2"
                      />
                      {/* Real Data Point */}
                      <circle cx={pt.x} cy={pt.y} r="4" fill="#0A345D" stroke="#FFFFFF" strokeWidth="1" />
                    </g>
                  ))}

                  {/* Smooth Fitted Continuous Curve: y = f(X) */}
                  <path
                    d="M 40,144 Q 130,105 200,68 T 285,32"
                    fill="none"
                    stroke="#2E7D32"
                    strokeWidth="3.5"
                  />

                  {/* Residual Callout */}
                  <text x="135" y="82" fill="#DC2626" fontSize="8" fontWeight="700">
                    Resíduo (y - ŷ)
                  </text>

                  {/* Interactive Query Point on the Curve */}
                  <line
                    x1={normX}
                    y1={15}
                    x2={normX}
                    y2={145}
                    stroke="#7E22CE"
                    strokeWidth="1.2"
                    strokeDasharray="3,3"
                    opacity="0.7"
                  />
                  <circle cx={normX} cy={curveY} r="6" fill="#7E22CE" stroke="#FFFFFF" strokeWidth="2" />
                  <text x={normX > 200 ? normX - 70 : normX + 10} y={curveY - 6} fill="#7E22CE" fontSize="9" fontWeight="800">
                    ŷ = f({estimatedAge} anos)
                  </text>
                </svg>

                {/* Interactive Feedback Bar */}
                <div style={{
                  width: '100%',
                  marginTop: '4px',
                  padding: '6px 10px',
                  borderRadius: '6px',
                  background: '#FFFFFF',
                  border: '1px solid #E2E8F0',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  fontSize: '0.78rem'
                }}>
                  <span style={{ color: '#64748B' }}>
                    Idade: <strong>{estimatedAge} anos</strong>
                  </span>
                  <span style={{ color: '#166534', fontWeight: '800' }}>
                    Custo Previsto: R$ {estimatedCost.toLocaleString('pt-BR')},00
                  </span>
                </div>
              </div>

              {/* Technical Specifications */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '6px', marginTop: '10px' }}>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Camada Saída:</strong> <code style={{ color: '#166534' }}>nn.Linear(dim, 1)</code>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Ativação:</strong> Nenhuma (Linear direta)
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Função de Perda:</strong> <code style={{ color: '#166534' }}>nn.MSELoss()</code>
                </div>
                <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.78rem' }}>
                  <strong style={{ color: '#0A345D' }}>Métricas:</strong> MAE, RMSE, R² (Variância)
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* =========================================================================
   4. VISUALIZADOR DE MODO TREINO VS MODO AVALIAÇÃO (TRAIN VS EVAL)
   ========================================================================= */
export function TrainVsEvalVisualizer() {
  const [mode, setMode] = useState('train'); // 'train' | 'eval'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '18px', height: '100%' }}>
      {/* Mode Toggle Bar */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: '16px' }}>
        <button
          onClick={() => setMode('train')}
          style={{
            padding: '10px 24px',
            borderRadius: '12px',
            border: mode === 'train' ? '2px solid #0E4E8A' : '1px solid #CBD5E1',
            background: mode === 'train' ? '#EFF6FF' : '#FFFFFF',
            color: mode === 'train' ? '#0E4E8A' : '#64748B',
            fontWeight: '800',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <Cpu size={18} />
          Modo Treinamento: model.train()
        </button>

        <button
          onClick={() => setMode('eval')}
          style={{
            padding: '10px 24px',
            borderRadius: '12px',
            border: mode === 'eval' ? '2px solid #2E7D32' : '1px solid #CBD5E1',
            background: mode === 'eval' ? '#F0FDF4' : '#FFFFFF',
            color: mode === 'eval' ? '#2E7D32' : '#64748B',
            fontWeight: '800',
            fontSize: '0.95rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            transition: 'all 0.2s ease'
          }}
        >
          <ShieldCheck size={18} />
          Modo Avaliação: model.eval() + torch.no_grad()
        </button>
      </div>

      {/* Main Status Panel */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '24px',
        boxShadow: '0 4px 16px rgba(10,52,93,0.05)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
        flex: 1
      }}>
        {/* Component 1: Grafo de Gradientes */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: '4px',
              background: mode === 'train' ? '#DBEAFE' : '#DCFCE7',
              color: mode === 'train' ? '#1E40AF' : '#166534',
              fontWeight: '800',
              fontSize: '0.75rem',
              marginBottom: '10px'
            }}>
              GRAFO COMPUTACIONAL
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--infnet-dark-blue)', fontSize: '1.05rem' }}>
              Autograd & Memória
            </h4>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              {mode === 'train' 
                ? 'Ativo por padrão. Cada operação guarda ativações intermediárias na RAM/VRAM para viabilizar o cálculo posterior de derivadas parciais no loss.backward().'
                : 'Desligado via with torch.no_grad(). Nenhuma ativação é armazenada para derivadas, reduzindo o consumo de memória em mais de 50% e acelerando a inferência!'}
            </p>
          </div>

          <div style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.82rem',
            padding: '8px 12px',
            borderRadius: '6px',
            background: mode === 'train' ? '#EFF6FF' : '#F0FDF4',
            color: mode === 'train' ? '#1E40AF' : '#166534',
            marginTop: '12px'
          }}>
            {mode === 'train' ? 'torch.is_grad_enabled() == True' : 'with torch.no_grad():'}
          </div>
        </div>

        {/* Component 2: Dropout */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: '4px',
              background: mode === 'train' ? '#FFEDD5' : '#DCFCE7',
              color: mode === 'train' ? '#C2410C' : '#166534',
              fontWeight: '800',
              fontSize: '0.75rem',
              marginBottom: '10px'
            }}>
              REGULARIZAÇÃO DROPOUT
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--infnet-dark-blue)', fontSize: '1.05rem' }}>
              Comportamento de Neurônios
            </h4>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              {mode === 'train'
                ? 'Desativa neurônios estocasticamente com probabilidade p (ex: 20% a 50%) em cada batch para evitar coadaptação e combater overfitting.'
                : 'TOTALMENTE DESLIGADO. Todos os neurônios operam com capacidade plena, e as saídas são automaticamente escaladas para manter a mesma média esperada.'}
            </p>
          </div>

          <div style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.82rem',
            padding: '8px 12px',
            borderRadius: '6px',
            background: mode === 'train' ? '#FFF7ED' : '#F0FDF4',
            color: mode === 'train' ? '#C2410C' : '#166534',
            marginTop: '12px'
          }}>
            {mode === 'train' ? 'nn.Dropout(p): Ativo (aleatório)' : 'nn.Dropout(p): Desativado (identidade)'}
          </div>
        </div>

        {/* Component 3: BatchNorm / Normalização */}
        <div style={{
          background: '#F8FAFC',
          borderRadius: '12px',
          border: '1px solid #E2E8F0',
          padding: '18px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}>
          <div>
            <div style={{
              display: 'inline-block',
              padding: '3px 8px',
              borderRadius: '4px',
              background: mode === 'train' ? '#F3E8FF' : '#DCFCE7',
              color: mode === 'train' ? '#7E22CE' : '#166534',
              fontWeight: '800',
              fontSize: '0.75rem',
              marginBottom: '10px'
            }}>
              BATCH NORMALIZATION
            </div>
            <h4 style={{ margin: '0 0 10px 0', color: 'var(--infnet-dark-blue)', fontSize: '1.05rem' }}>
              Estatísticas de Normalização
            </h4>
            <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: 0 }}>
              {mode === 'train'
                ? 'Normaliza usando a média e variância DO MINI-BATCH atual, além de atualizar as médias móveis globais (running mean e running var).'
                : 'Usa estritamente as médias móveis globais congeladas calculadas durante o treino. Garante que 1 única amostra possa ser inferida com sucesso.'}
            </p>
          </div>

          <div style={{
            fontFamily: 'Fira Code, monospace',
            fontSize: '0.82rem',
            padding: '8px 12px',
            borderRadius: '6px',
            background: mode === 'train' ? '#FAF5FF' : '#F0FDF4',
            color: mode === 'train' ? '#7E22CE' : '#166534',
            marginTop: '12px'
          }}>
            {mode === 'train' ? 'Usa média/var do batch' : 'Usa running_mean / running_var fixas'}
          </div>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   5. VISUALIZADOR DO ROTEIRO DE REPASSE DOS NOTEBOOKS DA AULA
   ========================================================================= */
export function NotebooksRoadmapVisualizer() {
  const [selectedNb, setSelectedNb] = useState(0);

  const notebooks = [
    {
      title: "pratica_primeira_rede_iris.ipynb",
      badge: "PRÁTICA 1 • AQUECIMENTO",
      color: "#0E4E8A",
      subtitle: "Construção passo a passo de um classificador para o dataset Iris com gabarito",
      points: [
        "Dataset simples e canônico de 150 flores e 4 atributos numéricos.",
        "Exercício guiado com lacunas para preencher: forward pass, criterion e optimizer.",
        "Demonstração visual do porquê 1 única camada linear não separa classes não-lineares.",
        "Acompanha o arquivo prática_primeira_rede_iris_gabarito.ipynb com solução completa."
      ],
      dataset: "Iris (Scikit-Learn)",
      target: "Classificação em 3 classes (Setosa, Versicolor, Virginica)"
    },
    {
      title: "aula_04_pipelines_dados_simples.ipynb",
      badge: "PRÁTICA 2 • TRANSIÇÃO DIRETA",
      color: "#1BB5D8",
      subtitle: "Pipeline simplificado sem excesso de código boilerplate",
      points: [
        "Divisão Treino e Teste sem Data Leakage via Scikit-Learn.",
        "Ingestão no PyTorch com TensorDataset e DataLoader simples.",
        "Classificação Multiclasse em dados de E-commerce (3 níveis de satisfação).",
        "Regressão Contínua nos custos de seguro de saúde (insurance.csv).",
        "Avaliação direta no conjunto de teste cego calculando Acurácia e MAE/RMSE."
      ],
      dataset: "E-commerce & Insurance",
      target: "Classificação e Regressão aplicadas"
    },
    {
      title: "aula_04_pipelines_dados_classificacao_regressao.ipynb",
      badge: "PRÁTICA 3 • PIPELINE PROFISSIONAL",
      color: "#7CB342",
      subtitle: "O pipeline completo modular que serve de fundação para o Projeto 1",
      points: [
        "Classe customizada herdada de torch.utils.data.Dataset (__len__ e __getitem__).",
        "DataLoaders otimizados com batching estocástico (shuffle=True no treino).",
        "Arquitetura modular em nn.Module com forward explícito.",
        "Comparativo contra Baselines Não-Triviais (chute pela média e classe mais frequente).",
        "Curvas completas de treinamento e validação registradas época a época."
      ],
      dataset: "Datasets Industriais Reais",
      target: "Arquitetura Profissional e Avaliação com Baselines"
    }
  ];

  const current = notebooks[selectedNb];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', height: '100%' }}>
      {/* Notebook Selection Tabs */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        {notebooks.map((nb, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedNb(idx)}
            style={{
              padding: '12px 14px',
              borderRadius: '12px',
              border: selectedNb === idx ? `2px solid ${nb.color}` : '1px solid #E2E8F0',
              background: selectedNb === idx ? '#F8FAFC' : '#FFFFFF',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              textAlign: 'left',
              transition: 'all 0.2s ease',
              boxShadow: selectedNb === idx ? '0 4px 12px rgba(0,0,0,0.06)' : 'none'
            }}
          >
            <span style={{ fontSize: '0.72rem', fontWeight: '800', color: nb.color }}>
              {nb.badge}
            </span>
            <span style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.85rem', fontWeight: '700', color: 'var(--infnet-dark-blue)' }}>
              {nb.title.replace('.ipynb', '')}
            </span>
          </button>
        ))}
      </div>

      {/* Selected Notebook Details */}
      <div style={{
        background: '#FFFFFF',
        border: '1px solid #E2E8F0',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        flex: 1,
        boxShadow: '0 4px 16px rgba(10,52,93,0.05)'
      }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ background: current.color + '20', color: current.color, padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.8rem' }}>
              {current.badge}
            </span>
            <span style={{ fontSize: '0.85rem', color: '#64748B', fontFamily: 'Fira Code, monospace' }}>
              📁 {current.title}
            </span>
          </div>

          <h3 style={{ margin: '8px 0 6px 0', color: 'var(--infnet-dark-blue)', fontFamily: 'Outfit, sans-serif', fontSize: '1.3rem' }}>
            {current.subtitle}
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', margin: '16px 0' }}>
            <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
              <strong style={{ color: '#0A345D' }}>Dataset:</strong> {current.dataset}
            </div>
            <div style={{ background: '#F8FAFC', padding: '10px 14px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
              <strong style={{ color: '#0A345D' }}>Foco:</strong> {current.target}
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {current.points.map((pt, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.92rem', color: '#334155' }}>
                <CheckCircle2 size={18} color={current.color} style={{ minWidth: '18px', marginTop: '2px' }} />
                <span>{pt}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{
          marginTop: '16px',
          padding: '12px 16px',
          borderRadius: '8px',
          background: 'linear-gradient(90deg, #F0FDF4, #EFF6FF)',
          border: '1px solid #CBD5E1',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '0.88rem',
          color: '#0A345D'
        }}>
          <span><strong>Dica do Professor:</strong> Abra o notebook correspondente agora para acompanhar e executar cada célula em tempo real!</span>
        </div>
      </div>
    </div>
  );
}

/* =========================================================================
   6. VISUALIZADOR DE SÍNTESE & PRÓXIMOS PASSOS (AULA 05)
   ========================================================================= */
export function SummaryAndNextStepsVisualizer() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '22px', height: '100%' }}>
      {/* Coluna 1: Síntese da Aula 04 */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '1px solid #E2E8F0',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(10,52,93,0.05)'
      }}>
        <div>
          <span style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem' }}>
            CONSOLIDAÇÃO DE CONCEITOS
          </span>
          <h3 style={{ margin: '10px 0 14px 0', color: 'var(--infnet-dark-blue)', fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem' }}>
            Síntese da Aula 04
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#7CB342', marginTop: '7px' }} />
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                <strong>Split antes do Scaler:</strong> O conjunto de teste é cego. Nunca permita que médias ou desvios de teste vazem para o treino.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#0E4E8A', marginTop: '7px' }} />
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                <strong>As 5 etapas canônicas:</strong> Forward → Loss → zero_grad() → Backward → step() formam o coração de todo treino em PyTorch.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#1BB5D8', marginTop: '7px' }} />
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                <strong>Cabeças e Funções de Perda:</strong> CrossEntropyLoss (logits) para classificação vs MSELoss (saída linear 1D) para regressão.
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#FF7043', marginTop: '7px' }} />
              <div style={{ fontSize: '0.9rem', color: '#334155' }}>
                <strong>train() vs eval():</strong> Desative gradientes e configure camadas de regularização para uma inferência justa e eficiente.
              </div>
            </div>
          </div>
        </div>

        <div style={{
          padding: '12px 14px',
          borderRadius: '8px',
          background: '#F8FAFC',
          border: '1px solid #E2E8F0',
          fontSize: '0.85rem',
          color: '#475569'
        }}>
          🎯 <strong>Conexão com o Projeto 1:</strong> Estes pipelines compõem a estrutura básica que você utilizará para entregar a primeira avaliação prática da disciplina.
        </div>
      </div>

      {/* Coluna 2: Próxima Aula (Aula 05) */}
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        border: '2px solid #E0F2FE',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        boxShadow: '0 4px 16px rgba(27, 181, 216, 0.08)'
      }}>
        <div>
          <span style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '6px', fontWeight: '800', fontSize: '0.78rem' }}>
            PRÓXIMA PARADA • AULA 05
          </span>
          <h3 style={{ margin: '10px 0 14px 0', color: 'var(--infnet-dark-blue)', fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem' }}>
            Estabilidade de Treinamento
          </h3>

          <p style={{ color: '#475569', fontSize: '0.9rem', lineHeight: '1.5', margin: '0 0 16px 0' }}>
            Agora que dominamos o ciclo de treino e os dados, como garantimos que redes neurais mais profundas aprendam sem que os gradientes explodam ou desapareçam?
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
              <strong style={{ color: '#0A345D' }}>1. Inicializações de Pesos:</strong> Xavier Uniform vs Kaiming He e por que a inicialização errada trava o modelo na época 0.
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
              <strong style={{ color: '#0A345D' }}>2. Normalizações Modernas:</strong> BatchNorm1d vs LayerNorm mantendo as ativações em faixas estáveis.
            </div>

            <div style={{ background: '#F8FAFC', padding: '10px 12px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.88rem' }}>
              <strong style={{ color: '#0A345D' }}>3. Regularização Ativa:</strong> Dropout e Learning Rate Schedulers combatendo overfitting em campo.
            </div>
          </div>
        </div>

        <div style={{
          padding: '12px 14px',
          borderRadius: '8px',
          background: 'linear-gradient(90deg, #F0F9FF, #F8FAFC)',
          border: '1px solid #BAE6FD',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          fontSize: '0.86rem',
          color: '#0369A1'
        }}>
          <ArrowRight size={18} />
          <strong>Nos vemos na Aula 05:</strong> Estabilidade, Inicialização & Regularização!
        </div>
      </div>
    </div>
  );
}
