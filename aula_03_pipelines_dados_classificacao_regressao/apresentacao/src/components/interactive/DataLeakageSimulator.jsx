import React, { useState } from 'react';

export default function DataLeakageSimulator() {
  const [leakMode, setLeakMode] = useState(true); // true = With Leakage, false = Robust Pipeline
  const [pipelineStep, setPipelineStep] = useState(0); // 0: Raw Data, 1: Processed, 2: Evaluated

  const rawSamples = [
    { id: 1, age: 25, income: 45000, target: 0, set: 'Treino' },
    { id: 2, age: 42, income: 82000, target: 1, set: 'Treino' },
    { id: 3, age: 31, income: 54000, target: 0, set: 'Treino' },
    { id: 4, age: 55, income: 120000, target: 1, set: 'Treino' },
    { id: 5, age: 22, income: 31000, target: 0, set: 'Teste (Inédito)' },
    { id: 6, age: 48, income: 95000, target: 1, set: 'Teste (Inédito)' },
  ];

  const handleToggleMode = (isLeak) => {
    setLeakMode(isLeak);
    setPipelineStep(0);
  };

  return (
    <div style={{ background: '#081D33', border: '1px solid #1E3A5F', borderRadius: '14px', padding: '20px', color: '#FFFFFF' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
        <div>
          <h3 style={{ fontFamily: 'Outfit, sans-serif', fontSize: '1.25rem', color: '#64D9EF', margin: 0 }}>
            🧪 Sandbox Interativo: Vazamento de Dados no Pré-Processamento
          </h3>
          <p style={{ fontSize: '0.9rem', color: '#94A3B8', margin: '4px 0 0 0' }}>
            Compare o impacto de escalar features antes vs depois da divisão Treino/Teste
          </p>
        </div>

        <div style={{ display: 'flex', gap: '8px' }}>
          <button 
            onClick={() => handleToggleMode(true)}
            style={{
              background: leakMode ? '#FF7043' : 'rgba(255, 112, 67, 0.15)',
              color: leakMode ? '#FFFFFF' : '#FF7043',
              border: '1px solid #FF7043',
              borderRadius: '8px',
              padding: '8px 14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            ⚠️ Modo Com Vazamento (Errado)
          </button>
          <button 
            onClick={() => handleToggleMode(false)}
            style={{
              background: !leakMode ? '#7CB342' : 'rgba(124, 179, 66, 0.15)',
              color: !leakMode ? '#FFFFFF' : '#7CB342',
              border: '1px solid #7CB342',
              borderRadius: '8px',
              padding: '8px 14px',
              fontWeight: '700',
              cursor: 'pointer',
              fontSize: '0.85rem'
            }}
          >
            ✅ Modo Robusto (Sem Vazamento)
          </button>
        </div>
      </div>

      {/* Step Indicator Flow */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginBottom: '16px' }}>
        <button 
          onClick={() => setPipelineStep(0)}
          style={{
            background: pipelineStep >= 0 ? 'rgba(27, 181, 216, 0.2)' : 'rgba(255,255,255,0.05)',
            border: `1px solid ${pipelineStep === 0 ? '#1BB5D8' : '#334155'}`,
            borderRadius: '8px',
            padding: '10px',
            color: '#FFFFFF',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#64D9EF', fontWeight: '700' }}>PASSO 1</div>
          <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>Dados Brutos ({rawSamples.length} amostras)</div>
        </button>

        <button 
          onClick={() => setPipelineStep(1)}
          style={{
            background: pipelineStep >= 1 ? (leakMode ? 'rgba(255, 112, 67, 0.2)' : 'rgba(124, 179, 66, 0.2)') : 'rgba(255,255,255,0.05)',
            border: `1px solid ${pipelineStep === 1 ? (leakMode ? '#FF7043' : '#7CB342') : '#334155'}`,
            borderRadius: '8px',
            padding: '10px',
            color: '#FFFFFF',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: leakMode ? '#FF7043' : '#AED581', fontWeight: '700' }}>PASSO 2</div>
          <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>
            {leakMode ? 'StandardScaler (No Dataset Inteiro)' : 'Train/Test Split ➔ StandardScaler'}
          </div>
        </button>

        <button 
          onClick={() => setPipelineStep(2)}
          style={{
            background: pipelineStep >= 2 ? (leakMode ? 'rgba(255, 112, 67, 0.3)' : 'rgba(124, 179, 66, 0.3)') : 'rgba(255,255,255,0.05)',
            border: `1px solid ${pipelineStep === 2 ? (leakMode ? '#FF7043' : '#7CB342') : '#334155'}`,
            borderRadius: '8px',
            padding: '10px',
            color: '#FFFFFF',
            textAlign: 'left',
            cursor: 'pointer'
          }}
        >
          <div style={{ fontSize: '0.75rem', color: '#FFFFFF', fontWeight: '700' }}>PASSO 3</div>
          <div style={{ fontSize: '0.88rem', fontWeight: '600' }}>Métricas & Produção Real</div>
        </button>
      </div>

      {/* Main Content Area */}
      <div style={{ background: '#041221', borderRadius: '10px', padding: '16px', border: '1px solid #1E293B' }}>
        {pipelineStep === 0 && (
          <div>
            <div style={{ fontSize: '0.9rem', color: '#CBD5E1', marginBottom: '10px' }}>
              📋 Conjunto completo de dados bancários (4 para treino, 2 para teste):
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
              {rawSamples.map(sample => (
                <div key={sample.id} style={{ background: '#0F2942', padding: '10px', borderRadius: '8px', border: '1px solid #1E3A5F' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '0.8rem', color: '#64D9EF', fontWeight: '700' }}>ID #{sample.id}</span>
                    <span style={{ fontSize: '0.75rem', padding: '2px 6px', borderRadius: '4px', background: sample.set.includes('Treino') ? 'rgba(27, 181, 216, 0.2)' : 'rgba(255, 112, 67, 0.2)', color: sample.set.includes('Treino') ? '#64D9EF' : '#FF7043' }}>
                      {sample.set}
                    </span>
                  </div>
                  <div style={{ fontSize: '0.85rem' }}>Idade: <strong>{sample.age} anos</strong></div>
                  <div style={{ fontSize: '0.85rem' }}>Renda: <strong>R$ {sample.income.toLocaleString()}</strong></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {pipelineStep === 1 && (
          <div>
            {leakMode ? (
              <div style={{ borderLeft: '4px solid #FF7043', paddingLeft: '12px', marginBottom: '14px' }}>
                <div style={{ color: '#FF7043', fontWeight: '700', fontSize: '0.95rem' }}>
                  🚨 VAZAMENTO DETECTADO! `.fit()` executado antes de dividir o dataset!
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '4px' }}>
                  O scaler calculou a média global $\mu = 71.166$ e $\sigma = 32.500$ <strong>incluindo a renda das amostras de teste (R$ 95k)</strong>. As estatísticas do teste contaminaram a normalização dos dados de treino!
                </div>
              </div>
            ) : (
              <div style={{ borderLeft: '4px solid #7CB342', paddingLeft: '12px', marginBottom: '14px' }}>
                <div style={{ color: '#7CB342', fontWeight: '700', fontSize: '0.95rem' }}>
                  🛡️ PIPELINE ISOLADO! `.fit()` executado estritamente no Treino!
                </div>
                <div style={{ fontSize: '0.85rem', color: '#CBD5E1', marginTop: '4px' }}>
                  O scaler calculou a média de treino $\mu_{train} = 75.250$ usando <strong>apenas as 4 amostras de treino</strong>. As amostras de teste foram transformadas estritamente com `.transform()`.
                </div>
              </div>
            )}

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div style={{ background: '#0B2545', padding: '12px', borderRadius: '8px', border: '1px solid #1BB5D8' }}>
                <div style={{ fontWeight: '700', color: '#64D9EF', fontSize: '0.88rem', marginBottom: '6px' }}>
                  Features de Treino Normalizadas
                </div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#E2E8F0' }}>
                  {leakMode ? 'x_train = [-0.80, 0.33, -0.52, 1.50]' : 'x_train = [-0.93, 0.20, -0.65, 1.38]'}
                </div>
              </div>

              <div style={{ background: leakMode ? 'rgba(255, 112, 67, 0.15)' : '#0B2545', padding: '12px', borderRadius: '8px', border: `1px solid ${leakMode ? '#FF7043' : '#7CB342'}` }}>
                <div style={{ fontWeight: '700', color: leakMode ? '#FF7043' : '#AED581', fontSize: '0.88rem', marginBottom: '6px' }}>
                  Features de Teste Normalizadas {leakMode && '⚠️ (Contaminadas)'}
                </div>
                <div style={{ fontFamily: 'Fira Code, monospace', fontSize: '0.8rem', color: '#E2E8F0' }}>
                  {leakMode ? 'x_test = [-1.23, 0.73]  <-- Média real vazou!' : 'x_test = [-1.36, 0.60]  <-- Isolamento total'}
                </div>
              </div>
            </div>
          </div>
        )}

        {pipelineStep === 2 && (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', alignItems: 'center' }}>
            <div style={{ background: leakMode ? 'rgba(255, 112, 67, 0.15)' : 'rgba(124, 179, 66, 0.15)', padding: '16px', borderRadius: '10px', border: `2px solid ${leakMode ? '#FF7043' : '#7CB342'}` }}>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '600' }}>RESULTADO DA AVALIAÇÃO</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: leakMode ? '#FF7043' : '#7CB342', margin: '4px 0' }}>
                {leakMode ? 'Acurácia Teste: 99.4%' : 'Acurácia Teste: 84.2%'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                {leakMode ? ' Ilusão de alta performance! O modelo memorizou padrões indiretos do conjunto de teste.' : ' Métrica honesta e realista, pronta para generalizar.'}
              </div>
            </div>

            <div style={{ background: '#0F2942', padding: '16px', borderRadius: '10px', border: '1px solid #1E3A5F' }}>
              <div style={{ fontSize: '0.85rem', color: '#94A3B8', fontWeight: '600' }}>DESEMPENHO EM PRODUÇÃO REAL</div>
              <div style={{ fontSize: '1.8rem', fontWeight: '800', color: leakMode ? '#F43F5E' : '#38BDF8', margin: '4px 0' }}>
                {leakMode ? 'Acurácia Produção: 64.1%' : 'Acurácia Produção: 83.8%'}
              </div>
              <div style={{ fontSize: '0.82rem', color: '#CBD5E1' }}>
                {leakMode ? '🚨 DESASTRE DE DEPLOY! Queda drástica de 35% por conta do vazamento prévio.' : ' Estabilidade mantida! O modelo performou exatamente como esperado no ambiente real.'}
              </div>
            </div>
          </div>
        )}
      </div>

      <div style={{ marginTop: '14px', textAlign: 'center' }}>
        <button 
          onClick={() => setPipelineStep((prev) => (prev + 1) % 3)}
          style={{ background: '#1BB5D8', color: '#0A345D', border: 'none', borderRadius: '20px', padding: '8px 22px', fontWeight: '800', cursor: 'pointer', fontSize: '0.88rem' }}
        >
          {pipelineStep === 2 ? '🔄 Reiniciar Simulação' : `Próximo Passo ➔ (Passo ${pipelineStep + 2})`}
        </button>
      </div>
    </div>
  );
}
