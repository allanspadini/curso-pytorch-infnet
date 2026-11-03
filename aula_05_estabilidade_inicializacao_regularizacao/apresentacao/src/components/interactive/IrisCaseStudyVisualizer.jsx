import React, { useState } from 'react';
import { FileSpreadsheet, Code2, CheckCircle2, TrendingDown, Layers, Sparkles } from 'lucide-react';

export default function IrisCaseStudyVisualizer() {
  const [tab, setTab] = useState('notebook'); // 'spreadsheet' vs 'notebook'
  const [exp, setExp] = useState('bn_dropout'); // 'sem_norm', 'bn', 'bn_dropout'

  const experiments = {
    sem_norm: {
      label: '1. Sem Normalização',
      color: '#DC2626',
      badge: 'CONVERGÊNCIA INSTÁVEL',
      acc: '86.7%',
      epochs: '50 épocas',
      desc: 'Gradientes oscilam fortemente nas primeiras 20 épocas. A loss de treino cai devagar e estagna em patamar alto.',
      lossPoints: [0.95, 0.78, 0.65, 0.58, 0.52, 0.49, 0.46, 0.44, 0.43, 0.41]
    },
    bn: {
      label: '2. Com BatchNorm1d',
      color: '#0284C7',
      badge: 'CONVERGÊNCIA RÁPIDA',
      acc: '96.0%',
      epochs: '18 épocas',
      desc: 'A fixação de média 0 e variância 1 acelera radicalmente o aprendizado. A loss despenca suavemente já nas primeiras 5 épocas.',
      lossPoints: [0.95, 0.42, 0.25, 0.18, 0.14, 0.11, 0.09, 0.08, 0.07, 0.06]
    },
    bn_dropout: {
      label: '3. BatchNorm + Dropout (0.3)',
      color: '#16A34A',
      badge: 'MELHOR GENERALIZAÇÃO',
      acc: '98.3%',
      epochs: '25 épocas',
      desc: 'Combinação perfeita: BatchNorm garante gradientes estáveis enquanto Dropout fecha o gap de validação sem sobreajustar.',
      lossPoints: [0.95, 0.45, 0.28, 0.19, 0.15, 0.12, 0.10, 0.08, 0.06, 0.05]
    }
  };

  const currentExp = experiments[exp];

  const toSvgPath = (points, width = 360, height = 150) => {
    return points.map((p, idx) => {
      const x = 30 + (idx / (points.length - 1)) * (width - 50);
      const y = height - 20 - (p / 1.0) * (height - 40);
      return `${idx === 0 ? 'M' : 'L'} ${x.toFixed(1)} ${Math.max(10, y).toFixed(1)}`;
    }).join(' ');
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Tab Switcher */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={() => setTab('notebook')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: tab === 'notebook' ? '2px solid var(--infnet-cyan)' : '1px solid #CBD5E1',
              background: tab === 'notebook' ? 'linear-gradient(135deg, #EFF6FF, #E0F2FE)' : '#FFFFFF',
              color: tab === 'notebook' ? '#0369A1' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <Code2 size={16} /> Experimentos PyTorch (Curvas Empíricas de Loss)
          </button>
          <button
            onClick={() => setTab('spreadsheet')}
            style={{
              padding: '8px 16px',
              borderRadius: '10px',
              border: tab === 'spreadsheet' ? '2px solid #16A34A' : '1px solid #CBD5E1',
              background: tab === 'spreadsheet' ? 'linear-gradient(135deg, #F0FDF4, #DCFCE7)' : '#FFFFFF',
              color: tab === 'spreadsheet' ? '#15803D' : '#64748B',
              fontWeight: '800',
              cursor: 'pointer',
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FileSpreadsheet size={16} /> Planilha Interativa (simulacao_mlp_iris.xlsx)
          </button>
        </div>

        <span style={{ fontSize: '0.8rem', color: '#64748B', fontWeight: '600' }}>
          Dataset: <strong>Iris (150 amostras, 3 classes)</strong>
        </span>
      </div>

      {/* Main Content Area */}
      {tab === 'notebook' ? (
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '18px 22px',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
          display: 'grid',
          gridTemplateColumns: '1.2fr 0.8fr',
          gap: '20px',
          flex: 1,
          alignItems: 'center'
        }}>
          {/* Left: Curves & Experiment Selector */}
          <div style={{
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            borderRadius: '12px',
            padding: '16px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}>
            <div style={{ display: 'flex', gap: '6px', marginBottom: '12px' }}>
              {Object.keys(experiments).map(key => (
                <button
                  key={key}
                  onClick={() => setExp(key)}
                  style={{
                    padding: '6px 10px',
                    borderRadius: '8px',
                    border: exp === key ? `2px solid ${experiments[key].color}` : '1px solid #CBD5E1',
                    background: exp === key ? '#FFFFFF' : 'transparent',
                    color: exp === key ? experiments[key].color : '#64748B',
                    fontWeight: exp === key ? '800' : '600',
                    fontSize: '0.78rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {experiments[key].label.split('. ')[1]}
                </button>
              ))}
            </div>

            {/* SVG Loss Curve */}
            <div style={{ height: '140px', position: 'relative' }}>
              <svg viewBox="0 0 360 140" style={{ width: '100%', height: '100%' }}>
                <line x1="30" y1="120" x2="340" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
                <line x1="30" y1="15" x2="30" y2="120" stroke="#CBD5E1" strokeWidth="1.5" />
                <text x="340" y="132" textAnchor="end" fill="#64748B" fontSize="9">Épocas de Treinamento</text>
                <text x="25" y="18" textAnchor="end" fill="#64748B" fontSize="9">Loss</text>

                {/* Reference line for baseline */}
                <line x1="30" y1="40" x2="340" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="3 3" />

                <path
                  d={toSvgPath(currentExp.lossPoints, 360, 140)}
                  fill="none"
                  stroke={currentExp.color}
                  strokeWidth="3"
                />
              </svg>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', marginTop: '6px' }}>
              <span style={{ color: currentExp.color, fontWeight: '800' }}>
                Loss Final: {currentExp.lossPoints[currentExp.lossPoints.length - 1].toFixed(2)}
              </span>
              <span style={{ color: '#475569', fontWeight: '600' }}>
                Velocidade: {currentExp.epochs}
              </span>
            </div>
          </div>

          {/* Right: Technical Stats Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{
              background: '#FFFFFF',
              border: `1.5px solid ${currentExp.color}`,
              borderRadius: '12px',
              padding: '14px 16px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <span style={{
                  background: currentExp.color + '18',
                  color: currentExp.color,
                  padding: '3px 8px',
                  borderRadius: '6px',
                  fontSize: '0.72rem',
                  fontWeight: '800'
                }}>
                  {currentExp.badge}
                </span>
                <span style={{ fontSize: '1.1rem', fontWeight: '800', color: currentExp.color }}>
                  {currentExp.acc} Acerto
                </span>
              </div>
              <p style={{ margin: 0, fontSize: '0.84rem', color: '#334155', lineHeight: '1.45' }}>
                {currentExp.desc}
              </p>
            </div>

            <div style={{ background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px' }}>
              <div style={{ fontSize: '0.78rem', fontWeight: '800', color: '#0A345D', marginBottom: '4px' }}>
                Conclusão Científica:
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: '#64748B', lineHeight: '1.4' }}>
                Normalizar com BatchNorm1d triplicou a velocidade de convergência e o Dropout evitou que a rede memorizasse ruídos das amostras de treino.
              </p>
            </div>
          </div>
        </div>
      ) : (
        /* SPREADSHEET VISUALIZATION TAB */
        <div style={{
          background: '#FFFFFF',
          border: '1px solid #E2E8F0',
          borderRadius: '16px',
          padding: '18px 22px',
          boxShadow: '0 4px 16px rgba(10, 52, 93, 0.05)',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '20px',
          flex: 1,
          alignItems: 'center'
        }}>
          {/* Simulated Excel Sheet */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '14px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#15803D', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FileSpreadsheet size={16} /> Estrutura Matricial das Células (simulacao_mlp_iris.xlsx)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr 1fr', gap: '4px', fontSize: '0.75rem', fontFamily: 'Fira Code, monospace' }}>
              <div style={{ background: '#E2E8F0', padding: '4px', textAlign: 'center', fontWeight: '700' }}>#</div>
              <div style={{ background: '#E2E8F0', padding: '4px', textAlign: 'center', fontWeight: '700' }}>A (X₁)</div>
              <div style={{ background: '#E2E8F0', padding: '4px', textAlign: 'center', fontWeight: '700' }}>B (X₂)</div>
              <div style={{ background: '#E2E8F0', padding: '4px', textAlign: 'center', fontWeight: '700' }}>C (ŷ)</div>

              <div style={{ background: '#F1F5F9', padding: '4px', textAlign: 'center' }}>1</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>5.1</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>3.5</div>
              <div style={{ background: '#DCFCE7', padding: '4px', textAlign: 'center', color: '#15803D', fontWeight: '700' }}>Setosa</div>

              <div style={{ background: '#F1F5F9', padding: '4px', textAlign: 'center' }}>2</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>6.4</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>3.2</div>
              <div style={{ background: '#EFF6FF', padding: '4px', textAlign: 'center', color: '#0369A1', fontWeight: '700' }}>Versicolor</div>

              <div style={{ background: '#F1F5F9', padding: '4px', textAlign: 'center' }}>3</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>6.9</div>
              <div style={{ background: '#FFF', padding: '4px', textAlign: 'center' }}>3.1</div>
              <div style={{ background: '#FEF3C7', padding: '4px', textAlign: 'center', color: '#B45309', fontWeight: '700' }}>Virginica</div>
            </div>
          </div>

          {/* 2D Planar Boundaries in Excel */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '12px', padding: '14px' }}>
            <div style={{ fontSize: '0.82rem', fontWeight: '800', color: '#0A345D', marginBottom: '8px' }}>
              Por que a Planilha Importa?
            </div>
            <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '0.82rem', color: '#334155', lineHeight: '1.5' }}>
              <li>Permite inspecionar cada multiplicação de matrizes <strong>sem uma linha de código</strong>.</li>
              <li>Comprova visualmente que uma única reta não consegue separar Versicolor de Virginica.</li>
              <li>Demonstra na prática a necessidade de camadas ocultas e ativações não-lineares.</li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
