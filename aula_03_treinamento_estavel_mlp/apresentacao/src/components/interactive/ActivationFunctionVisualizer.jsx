import React, { useState } from 'react';
import { Activity, Info, Zap } from 'lucide-react';

export default function ActivationFunctionVisualizer() {
  const [selectedFunc, setSelectedFunc] = useState('relu');
  const [xVal, setXVal] = useState(1.5);

  const calculateFunc = (fn, x) => {
    switch (fn) {
      case 'relu':
        return { y: Math.max(0, x), dy: x > 0 ? 1 : 0 };
      case 'leaky_relu':
        return { y: x > 0 ? x : 0.1 * x, dy: x > 0 ? 1 : 0.1 };
      case 'tanh':
        const t = Math.tanh(x);
        return { y: t, dy: 1 - t * t };
      case 'sigmoid':
        const s = 1 / (1 + Math.exp(-x));
        return { y: s, dy: s * (1 - s) };
      default:
        return { y: x, dy: 1 };
    }
  };

  const { y, dy } = calculateFunc(selectedFunc, xVal);

  // Generate SVG path for [-5, 5]
  const generatePath = (fn, isDeriv = false) => {
    const points = [];
    for (let x = -5; x <= 5; x += 0.1) {
      const res = calculateFunc(fn, x);
      const val = isDeriv ? res.dy : res.y;
      // Map x from [-5, 5] to [20, 380]
      const px = 200 + (x / 5) * 160;
      // Map y from [-3, 3] to [180, 20]
      const py = 100 - (val / 3) * 70;
      points.push(`${px.toFixed(1)},${py.toFixed(1)}`);
    }
    return points.join(' L ');
  };

  const metadata = {
    relu: {
      title: 'ReLU (Rectified Linear Unit)',
      formula: 'f(x) = max(0, x)',
      range: '[0, +∞)',
      pros: 'Cálculo super rápido, elimina gradiente desvanecente para x > 0.',
      cons: 'Problema de neurônios mortos (Dead ReLU) para x < 0.',
      color: '#1BB5D8'
    },
    leaky_relu: {
      title: 'LeakyReLU (slope = 0.1)',
      formula: 'f(x) = max(0.1x, x)',
      range: '(-∞, +∞)',
      pros: 'Evita neurônios mortos permitindo pequeno fluxo de gradiente para x < 0.',
      cons: 'Hiperparâmetro α precisa ser configurado se não for fixo.',
      color: '#7CB342'
    },
    tanh: {
      title: 'Tanh (Tangente Hiperbólica)',
      formula: 'f(x) = (e^x - e^-x) / (e^x + e^-x)',
      range: '(-1, 1)',
      pros: 'Centrada no zero, facilita otimização em camadas intermediárias.',
      cons: 'Satura para |x| grande, causando gradiente desvanecente.',
      color: '#AB47BC'
    },
    sigmoid: {
      title: 'Sigmoid (Logística)',
      formula: 'f(x) = 1 / (1 + e^-x)',
      range: '(0, 1)',
      pros: 'Excelente para interpretar saídas como probabilidades binárias.',
      cons: 'Gradiente desvanecente severo nas pontas (max deriv = 0.25).',
      color: '#FF7043'
    }
  };

  const currentMeta = metadata[selectedFunc];

  return (
    <div style={{
      background: 'rgba(6, 31, 56, 0.85)',
      border: '1px solid rgba(27, 181, 216, 0.3)',
      borderRadius: '12px',
      padding: '20px',
      color: '#FFFFFF'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px' }}>
        <h3 style={{ margin: 0, color: '#1BB5D8', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem' }}>
          <Activity size={20} /> Visualizador Interativo de Funções de Ativação
        </h3>
        <div style={{ display: 'flex', gap: '8px' }}>
          {Object.keys(metadata).map(fn => (
            <button
              key={fn}
              onClick={() => setSelectedFunc(fn)}
              style={{
                padding: '6px 12px',
                borderRadius: '6px',
                border: selectedFunc === fn ? '2px solid #1BB5D8' : '1px solid rgba(255,255,255,0.2)',
                background: selectedFunc === fn ? 'rgba(27, 181, 216, 0.2)' : 'transparent',
                color: selectedFunc === fn ? '#64D9EF' : '#A0AEC0',
                cursor: 'pointer',
                fontWeight: 'bold',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
            >
              {fn.toUpperCase().replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', alignItems: 'center' }}>
        {/* SVG Plot */}
        <div style={{ background: '#041527', borderRadius: '8px', padding: '10px', position: 'relative' }}>
          <svg viewBox="0 0 400 200" style={{ width: '100%', height: '220px' }}>
            {/* Grid lines */}
            <line x1="20" y1="100" x2="380" y2="100" stroke="#1A365D" strokeWidth="1" />
            <line x1="200" y1="10" x2="200" y2="190" stroke="#1A365D" strokeWidth="1" />
            <text x="370" y="115" fill="#718096" fontSize="10">x</text>
            <text x="205" y="20" fill="#718096" fontSize="10">y</text>

            {/* Function Curve */}
            <path
              d={`M ${generatePath(selectedFunc, false)}`}
              fill="none"
              stroke={currentMeta.color}
              strokeWidth="3"
            />
            {/* Derivative Curve */}
            <path
              d={`M ${generatePath(selectedFunc, true)}`}
              fill="none"
              stroke="#FFD54F"
              strokeWidth="1.5"
              strokeDasharray="4 4"
            />

            {/* Selected Point Indicator */}
            <circle
              cx={200 + (xVal / 5) * 160}
              cy={100 - (y / 3) * 70}
              r="6"
              fill={currentMeta.color}
              stroke="#FFFFFF"
              strokeWidth="2"
            />
          </svg>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginTop: '5px', fontSize: '0.8rem' }}>
            <span style={{ color: currentMeta.color, fontWeight: 'bold' }}>─ Curva f(x)</span>
            <span style={{ color: '#FFD54F', fontWeight: 'bold' }}>┈ Derivada f'(x)</span>
          </div>

          <div style={{ marginTop: '10px' }}>
            <label style={{ fontSize: '0.85rem', color: '#A0AEC0', display: 'flex', justifyContent: 'space-between' }}>
              <span>Entrada (x): <strong>{xVal.toFixed(2)}</strong></span>
              <span>Saída f(x): <strong style={{ color: currentMeta.color }}>{y.toFixed(3)}</strong> | Gradiente f'(x): <strong style={{ color: '#FFD54F' }}>{dy.toFixed(3)}</strong></span>
            </label>
            <input
              type="range"
              min="-5"
              max="5"
              step="0.1"
              value={xVal}
              onChange={e => setXVal(parseFloat(e.target.value))}
              style={{ width: '100%', accentColor: currentMeta.color, cursor: 'pointer' }}
            />
          </div>
        </div>

        {/* Property Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div style={{ background: 'rgba(10, 52, 93, 0.6)', padding: '12px', borderRadius: '8px', borderLeft: `4px solid ${currentMeta.color}` }}>
            <h4 style={{ margin: '0 0 4px 0', color: currentMeta.color, fontSize: '1rem' }}>{currentMeta.title}</h4>
            <code style={{ background: '#041527', padding: '2px 6px', borderRadius: '4px', color: '#64D9EF', fontSize: '0.85rem' }}>
              {currentMeta.formula}
            </code>
            <p style={{ margin: '6px 0 0 0', fontSize: '0.8rem', color: '#CBD5E0' }}>Intervalo: <strong>{currentMeta.range}</strong></p>
          </div>

          <div style={{ background: 'rgba(124, 179, 66, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(124, 179, 66, 0.3)' }}>
            <span style={{ color: '#7CB342', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Zap size={14} /> Vantagens:
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#E2E8F0' }}>{currentMeta.pros}</p>
          </div>

          <div style={{ background: 'rgba(255, 112, 67, 0.1)', padding: '10px', borderRadius: '8px', border: '1px solid rgba(255, 112, 67, 0.3)' }}>
            <span style={{ color: '#FF7043', fontWeight: 'bold', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Info size={14} /> Limitações:
            </span>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.8rem', color: '#E2E8F0' }}>{currentMeta.cons}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
