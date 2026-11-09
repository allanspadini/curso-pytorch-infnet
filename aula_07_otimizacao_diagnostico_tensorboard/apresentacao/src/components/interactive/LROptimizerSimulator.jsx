import React, { useState, useMemo } from 'react';
import { Gauge, FastForward, Play, RefreshCw } from 'lucide-react';

export default function LROptimizerSimulator() {
  const [schedulerType, setSchedulerType] = useState('cosine'); // 'cosine', 'onecycle', 'step', 'constant'
  const [maxLR, setMaxLR] = useState(0.001); // 1e-3
  const [totalEpochs, setTotalEpochs] = useState(30);
  const [warmupEpochs, setWarmupEpochs] = useState(5);

  // Geração da curva de LR e curva de perda teórica correspondente
  const simData = useMemo(() => {
    const points = [];
    const minLR = maxLR * 0.01;

    for (let epoch = 0; epoch <= totalEpochs; epoch++) {
      let lr = maxLR;

      if (schedulerType === 'constant') {
        lr = maxLR;
      } else if (schedulerType === 'step') {
        // Reduz 10x a cada 10 épocas
        const drops = Math.floor(epoch / 10);
        lr = maxLR * Math.pow(0.2, drops);
      } else if (schedulerType === 'cosine') {
        if (epoch < warmupEpochs && warmupEpochs > 0) {
          // Warmup Linear
          lr = minLR + (maxLR - minLR) * (epoch / warmupEpochs);
        } else {
          // Cosine Decay
          const progress = (epoch - warmupEpochs) / Math.max(1, totalEpochs - warmupEpochs);
          lr = minLR + 0.5 * (maxLR - minLR) * (1 + Math.cos(Math.PI * progress));
        }
      } else if (schedulerType === 'onecycle') {
        const peakEpoch = totalEpochs * 0.3;
        if (epoch <= peakEpoch) {
          // Subida rápida
          lr = minLR + (maxLR - minLR) * (epoch / peakEpoch);
        } else {
          // Descida de aniquilação
          const progress = (epoch - peakEpoch) / (totalEpochs - peakEpoch);
          lr = minLR + 0.5 * (maxLR - minLR) * (1 + Math.cos(Math.PI * progress));
        }
      }

      // Perda estimada com base no comportamento do scheduler
      let baseLoss = 2.5 * Math.exp(-epoch / (schedulerType === 'cosine' || schedulerType === 'onecycle' ? 8 : 14));
      if (schedulerType === 'constant') baseLoss += 0.25; // Platô subótimo

      points.push({ epoch, lr, loss: Math.max(0.12, baseLoss) });
    }

    return points;
  }, [schedulerType, maxLR, totalEpochs, warmupEpochs]);

  return (
    <div className="sim-container" style={{ gridTemplateColumns: '320px 1fr', height: '100%' }}>
      {/* Controles */}
      <div className="sim-controls-panel">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#0A345D', fontWeight: 700, fontSize: '0.9rem' }}>
          <Gauge size={16} color="#0284C7" /> Agendadores de Taxa de Aprendizado
        </div>

        <div className="control-group">
          <label>Tipo de LR Scheduler:</label>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px' }}>
            {[
              { id: 'cosine', name: 'Cosine + Warmup' },
              { id: 'onecycle', name: 'OneCycleLR' },
              { id: 'step', name: 'StepLR (Degraus)' },
              { id: 'constant', name: 'Constante' }
            ].map((sch) => (
              <button
                key={sch.id}
                onClick={() => setSchedulerType(sch.id)}
                style={{
                  padding: '6px',
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  borderRadius: '4px',
                  border: '1px solid',
                  borderColor: schedulerType === sch.id ? '#0284C7' : '#CBD5E1',
                  background: schedulerType === sch.id ? '#E0F2FE' : '#FFFFFF',
                  color: schedulerType === sch.id ? '#0369A1' : '#475569',
                  cursor: 'pointer'
                }}
              >
                {sch.name}
              </button>
            ))}
          </div>
        </div>

        {schedulerType === 'cosine' && (
          <div className="control-group">
            <label>
              <span>Épocas de Warmup:</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#0284C7' }}>{warmupEpochs} épocas</span>
            </label>
            <input
              type="range"
              min="0"
              max="10"
              step="1"
              value={warmupEpochs}
              onChange={(e) => setWarmupEpochs(parseInt(e.target.value))}
            />
          </div>
        )}

        <div className="control-group">
          <label>
            <span>Taxa Máxima (&eta;<sub>max</sub>):</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, color: '#16A34A' }}>{maxLR.toExponential(1)}</span>
          </label>
          <input
            type="range"
            min="0.0001"
            max="0.005"
            step="0.0002"
            value={maxLR}
            onChange={(e) => setMaxLR(parseFloat(e.target.value))}
          />
        </div>

        <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '6px', padding: '8px' }}>
          <div style={{ fontSize: '0.72rem', color: '#475569' }}>
            ⚡ <b>Por que Warmup?</b> Evita que gradientes iniciais ruidosos corrompam os pesos pré-treinados ou a inicialização no começo do treino.
          </div>
        </div>
      </div>

      {/* Painel Gráfico */}
      <div className="sim-display-panel" style={{ overflowY: 'auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', flex: 1 }}>
          {/* Gráfico 1: Perfil da Taxa de Aprendizado */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
              Trajetória da Taxa de Aprendizado (LR)
            </div>

            <svg viewBox="0 0 200 120" style={{ width: '100%', height: 'auto', flex: 1 }}>
              <line x1="25" y1="100" x2="185" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="25" y1="100" x2="25" y2="15" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Curva LR */}
              <polyline
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                points={simData.map(p => `${25 + (p.epoch / totalEpochs) * 160},${100 - (p.lr / (maxLR * 1.1)) * 80}`).join(' ')}
              />

              <text x="30" y="112" fill="#64748B" fontSize="7">0</text>
              <text x="180" y="112" fill="#64748B" fontSize="7" textAnchor="end">{totalEpochs} ep</text>
              <text x="25" y="12" fill="#0284C7" fontSize="7.5" fontWeight="700">η(t)</text>
            </svg>
          </div>

          {/* Gráfico 2: Convergência de Perda */}
          <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '10px', display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0A345D', marginBottom: '4px' }}>
              Curva de Perda (Loss de Treinamento)
            </div>

            <svg viewBox="0 0 200 120" style={{ width: '100%', height: 'auto', flex: 1 }}>
              <line x1="25" y1="100" x2="185" y2="100" stroke="#94A3B8" strokeWidth="1.5" />
              <line x1="25" y1="100" x2="25" y2="15" stroke="#94A3B8" strokeWidth="1.5" />

              {/* Curva Loss */}
              <polyline
                fill="none"
                stroke="#16A34A"
                strokeWidth="2.5"
                points={simData.map(p => `${25 + (p.epoch / totalEpochs) * 160},${100 - (p.loss / 2.6) * 80}`).join(' ')}
              />

              <text x="30" y="112" fill="#64748B" fontSize="7">0</text>
              <text x="180" y="112" fill="#64748B" fontSize="7" textAnchor="end">{totalEpochs} ep</text>
              <text x="25" y="12" fill="#16A34A" fontSize="7.5" fontWeight="700">Perda L</text>
            </svg>
          </div>
        </div>

        <div style={{ fontSize: '0.72rem', color: '#475569', textAlign: 'center' }}>
          💡 <b>OneCycleLR / Cosine Annealing</b> aceleram o treino em até 5x e ajudam a rede a escapar de mínimos locais rasos.
        </div>
      </div>
    </div>
  );
}
