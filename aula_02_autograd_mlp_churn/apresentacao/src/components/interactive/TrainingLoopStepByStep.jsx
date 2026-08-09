import React, { useState } from 'react';
import { Play, RotateCcw, ArrowRight } from 'lucide-react';

export default function TrainingLoopStepByStep() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  const steps = [
    {
      num: 1,
      name: 'otimizador.zero_grad()',
      title: '1. Zerar Gradientes Acumulados',
      desc: 'Por padrão, o PyTorch acumula gradientes em `.grad` em cada chamada backward. Zeramos os gradientes anteriores antes de iniciar uma nova época para evitar acúmulo indesejado.',
      code: 'otimizador.zero_grad()',
      state: { weight: 'w = 2.50', grad: 'grad = 0.00 (Zered!)', loss: 'Loss anterior limpa' },
      badgeBg: '#1BB5D8'
    },
    {
      num: 2,
      name: 'pred = modelo(X)',
      title: '2. Passagem Direta (Forward Pass)',
      desc: 'Passamos o batch de dados de entrada X pela rede neural para calcular o valor predito (ŷ = f(X)). O PyTorch constrói o grafo de computação dinâmico.',
      code: 'predicoes = modelo(X_tensor)',
      state: { weight: 'w = 2.50', grad: 'grad = 0.00', loss: 'Calculando predição ŷ...' },
      badgeBg: '#64D9EF'
    },
    {
      num: 3,
      name: 'perda = criterio(pred, Y)',
      title: '3. Cálculo da Função de Perda (Loss)',
      desc: 'Comparamos a predição ŷ com o valor real Y através de uma métrica de erro (ex: BCELoss para classificação binária). Quanto menor o loss, melhor o modelo.',
      code: 'perda = criterio(predicoes, Y_real)',
      state: { weight: 'w = 2.50', grad: 'grad = 0.00', loss: 'Loss = 0.6842 ⚠️' },
      badgeBg: '#FF7043'
    },
    {
      num: 4,
      name: 'perda.backward()',
      title: '4. Backpropagation (Autograd)',
      desc: 'O PyTorch percorre o grafo de computação no sentido inverso (backward) calculando a derivada da Loss em relação a cada peso treinável (∂Loss/∂w).',
      code: 'perda.backward()',
      state: { weight: 'w = 2.50', grad: 'grad = +1.42 ⚡ (Calculado!)', loss: 'Loss = 0.6842' },
      badgeBg: '#AB47BC'
    },
    {
      num: 5,
      name: 'otimizador.step()',
      title: '5. Atualização dos Pesos (Optimizer Step)',
      desc: 'O otimizador ajusta cada parâmetro usando o gradiente e a taxa de aprendizado (w_novo = w - lr * grad). A perda na próxima época será menor!',
      code: 'otimizador.step()  # w = 2.50 - (0.1 * 1.42) = 2.358',
      state: { weight: 'w = 2.358 ✅ (Ajustado!)', grad: 'grad = +1.42', loss: 'Próxima Loss ➔ 0.5120 ↓' },
      badgeBg: '#7CB342'
    }
  ];

  const currentStep = steps[currentStepIndex];

  const handleNext = () => {
    setCurrentStepIndex((prev) => (prev + 1) % steps.length);
  };

  const handleReset = () => {
    setCurrentStepIndex(0);
  };

  return (
    <div style={{ background: '#F8FAFC', borderRadius: '16px', padding: '24px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ color: '#0A345D', fontSize: '1.2rem', fontFamily: 'Outfit, sans-serif' }}>
            🔄 O Ciclo Sagrado de Treinamento em 5 Passos do PyTorch
          </h3>
          <p style={{ color: '#64748B', fontSize: '0.9rem' }}>
            Clique no botão de avanço para executar passo a passo uma iteração do loop de treinamento.
          </p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <button 
            onClick={handleReset}
            style={{ padding: '8px 14px', borderRadius: '8px', border: '1px solid #CBD5E1', background: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontWeight: '600', color: '#64748B' }}
          >
            <RotateCcw size={16} /> Reiniciar
          </button>
          <button 
            onClick={handleNext}
            style={{ padding: '8px 20px', borderRadius: '8px', border: 'none', background: '#0A345D', color: '#FFF', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700', boxShadow: '0 4px 12px rgba(10,52,93,0.2)' }}
          >
            Avançar Passo <ArrowRight size={18} />
          </button>
        </div>
      </div>

      {/* Steps Pipeline Bar */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => {
          const isActive = idx === currentStepIndex;
          const isPassed = idx < currentStepIndex;
          return (
            <div 
              key={s.num}
              onClick={() => setCurrentStepIndex(idx)}
              style={{ 
                background: isActive ? s.badgeBg : isPassed ? '#E2E8F0' : '#FFF',
                color: isActive ? '#FFF' : isPassed ? '#0A345D' : '#94A3B8',
                padding: '12px 10px',
                borderRadius: '10px',
                border: isActive ? `2px solid ${s.badgeBg}` : '1px solid #CBD5E1',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                fontWeight: isActive ? '800' : '600',
                boxShadow: isActive ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
              }}
            >
              <div style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Passo {s.num}</div>
              <div style={{ fontSize: '0.85rem', marginTop: '4px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.name}</div>
            </div>
          );
        })}
      </div>

      {/* Active Step Details */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '20px', background: '#FFF', padding: '24px', borderRadius: '14px', border: '1px solid #E2E8F0', boxShadow: '0 4px 14px rgba(0,0,0,0.04)' }}>
        <div>
          <span style={{ background: currentStep.badgeBg, color: '#FFF', padding: '4px 12px', borderRadius: '12px', fontSize: '0.8rem', fontWeight: '800' }}>
            PASSO {currentStep.num} DE 5
          </span>
          <h4 style={{ color: '#0A345D', fontSize: '1.4rem', marginTop: '10px', fontFamily: 'Outfit, sans-serif' }}>
            {currentStep.title}
          </h4>
          <p style={{ color: '#334155', fontSize: '1.05rem', lineHeight: '1.6', marginTop: '10px' }}>
            {currentStep.desc}
          </p>

          <div style={{ marginTop: '16px', background: '#061F38', color: '#64D9EF', padding: '14px 18px', borderRadius: '10px', fontFamily: 'Fira Code, monospace', fontSize: '1.05rem', fontWeight: '600' }}>
            # Código PyTorch em execução:<br />
            <span style={{ color: '#FFF' }}>{currentStep.code}</span>
          </div>
        </div>

        {/* Live Tensor State Visualizer */}
        <div style={{ background: '#F1F5F9', borderRadius: '12px', padding: '20px', border: '1px solid #CBD5E1', display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
          <h5 style={{ color: '#0A345D', fontSize: '0.95rem', fontWeight: '800', borderBottom: '2px solid #CBD5E1', paddingBottom: '8px' }}>
            📊 Estado do Grafo & Tensores
          </h5>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontFamily: 'Fira Code, monospace', fontSize: '0.95rem' }}>
            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #7CB342' }}>
              <strong>Parâmetro (w):</strong> {currentStep.state.weight}
            </div>
            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #AB47BC' }}>
              <strong>Gradiente (w.grad):</strong> {currentStep.state.grad}
            </div>
            <div style={{ background: '#FFF', padding: '10px 14px', borderRadius: '8px', borderLeft: '4px solid #FF7043' }}>
              <strong>Perda (Loss):</strong> {currentStep.state.loss}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
