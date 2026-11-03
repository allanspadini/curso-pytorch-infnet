import React, { useState } from 'react';
import { ToggleLeft, ToggleRight, AlertTriangle, ShieldCheck, Zap, Sliders, Cpu, Lock } from 'lucide-react';

export default function TrainEvalModeVisualizer() {
  const [mode, setMode] = useState('train'); // 'train' vs 'eval'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', height: '100%' }}>
      {/* Switch Control Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h3 style={{ margin: 0, color: 'var(--infnet-dark-blue)', fontSize: '1.15rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sliders size={22} color="var(--infnet-cyan)" /> A Chave Operacional de Estado no PyTorch
          </h3>
          <p style={{ margin: '2px 0 0 0', fontSize: '0.82rem', color: '#64748B' }}>
            Alterne o modo da rede para inspecionar a mutação de comportamento do BatchNorm e do Dropout
          </p>
        </div>

        <div style={{ display: 'flex', background: '#F1F5F9', padding: '4px', borderRadius: '12px', border: '1px solid #CBD5E1' }}>
          <button
            onClick={() => setMode('train')}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'train' ? '#D84315' : 'transparent',
              color: mode === 'train' ? '#FFFFFF' : '#64748B',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Zap size={15} /> model.train()
          </button>
          <button
            onClick={() => setMode('eval')}
            style={{
              padding: '6px 16px',
              borderRadius: '8px',
              border: 'none',
              background: mode === 'eval' ? '#16A34A' : 'transparent',
              color: mode === 'eval' ? '#FFFFFF' : '#64748B',
              fontWeight: '800',
              fontSize: '0.85rem',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              transition: 'all 0.2s ease'
            }}
          >
            <Lock size={15} /> model.eval()
          </button>
        </div>
      </div>

      {/* Main Visual Arena */}
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
        alignItems: 'stretch'
      }}>
        {/* Module 1: BatchNorm Behavior */}
        <div style={{
          background: mode === 'train' ? '#FFF7ED' : '#F0FDF4',
          border: `1.5px solid ${mode === 'train' ? '#FDBA74' : '#86EFAC'}`,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{
                background: mode === 'train' ? '#FFEDD5' : '#DCFCE7',
                color: mode === 'train' ? '#C2410C' : '#15803D',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                CAMADA: nn.BatchNorm1d
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: mode === 'train' ? '#D84315' : '#16A34A' }}>
                {mode === 'train' ? '● Estatísticas Dinâmicas' : '🔒 Estatísticas Congeladas'}
              </span>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--infnet-dark-blue)', marginBottom: '4px' }}>
                {mode === 'train' ? 'Cálculo sobre o Mini-Batch Atual' : 'Uso de Médias Móveis Globais'}
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                {mode === 'train' 
                  ? 'Calcula μ e σ² das amostras do lote em tempo real. Atualiza running_mean e running_var acumuladas.' 
                  : 'Não calcula estatísticas das amostras de teste! Aplica running_mean e running_var aprendidas durante o treino.'}
              </p>
            </div>

            <div style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.78rem',
              background: mode === 'train' ? '#FEF2F2' : '#F0FDF4',
              color: mode === 'train' ? '#991B1B' : '#166534',
              padding: '8px 10px',
              borderRadius: '6px',
              border: `1px solid ${mode === 'train' ? '#FECACA' : '#BBF7D0'}`
            }}>
              {mode === 'train' 
                ? 'x_norm = (x - mean_batch) / sqrt(var_batch + eps)' 
                : 'x_norm = (x - running_mean) / sqrt(running_var + eps)'}
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <Cpu size={14} color="var(--infnet-cyan)" />
            <span>{mode === 'train' ? 'Gera leve ruído amostral benéfico' : 'Predição 100% determinística e reproduzível'}</span>
          </div>
        </div>

        {/* Module 2: Dropout Behavior */}
        <div style={{
          background: mode === 'train' ? '#FFF7ED' : '#F0FDF4',
          border: `1.5px solid ${mode === 'train' ? '#FDBA74' : '#86EFAC'}`,
          borderRadius: '12px',
          padding: '16px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          transition: 'all 0.3s ease'
        }}>
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span style={{
                background: mode === 'train' ? '#FFEDD5' : '#DCFCE7',
                color: mode === 'train' ? '#C2410C' : '#15803D',
                padding: '3px 8px',
                borderRadius: '6px',
                fontSize: '0.75rem',
                fontWeight: '800'
              }}>
                CAMADA: nn.Dropout(p=0.5)
              </span>
              <span style={{ fontSize: '0.78rem', fontWeight: '700', color: mode === 'train' ? '#D84315' : '#16A34A' }}>
                {mode === 'train' ? '⚡ Máscara Bernoulli Ativa' : '✓ Desligado (By-pass)'}
              </span>
            </div>

            <div style={{
              background: '#FFFFFF',
              border: '1px solid #CBD5E1',
              borderRadius: '8px',
              padding: '12px',
              marginBottom: '12px'
            }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: 'var(--infnet-dark-blue)', marginBottom: '4px' }}>
                {mode === 'train' ? 'Estocástico (Neurônios Zerados)' : 'Determinístico (Todos os Neurônios 100%)'}
              </div>
              <p style={{ margin: 0, fontSize: '0.82rem', color: '#475569', lineHeight: '1.45' }}>
                {mode === 'train' 
                  ? '50% dos neurônios são desligados aleatoriamente. Neurônios sobreviventes recebem amplificação de 1/(1-p) = 2.0x.' 
                  : 'Nenhum neurônio é desligado! O sinal passa intacto com escala 1.0x direta: y = x sem computação extra.'}
              </p>
            </div>

            <div style={{
              fontFamily: 'Fira Code, monospace',
              fontSize: '0.78rem',
              background: mode === 'train' ? '#FEF2F2' : '#F0FDF4',
              color: mode === 'train' ? '#991B1B' : '#166534',
              padding: '8px 10px',
              borderRadius: '6px',
              border: `1px solid ${mode === 'train' ? '#FECACA' : '#BBF7D0'}`
            }}>
              {mode === 'train' 
                ? 'y = (mask * x) / (1 - p)   # Inverted Dropout' 
                : 'y = x                       # Identidade pura'}
            </div>
          </div>

          <div style={{ fontSize: '0.78rem', color: '#64748B', display: 'flex', alignItems: 'center', gap: '6px', marginTop: '10px' }}>
            <ShieldCheck size={14} color="#16A34A" />
            <span>{mode === 'train' ? 'Previne co-adaptação e sobreajuste' : 'Avaliação rápida sem custo em produção'}</span>
          </div>
        </div>
      </div>

      {/* Bottom Critical Alert */}
      <div style={{
        background: '#FEF2F2',
        border: '1px solid #FECACA',
        borderLeft: '5px solid #DC2626',
        borderRadius: '8px',
        padding: '10px 14px',
        display: 'flex',
        alignItems: 'center',
        gap: '10px'
      }}>
        <AlertTriangle color="#DC2626" size={22} style={{ flexShrink: 0 }} />
        <div style={{ fontSize: '0.82rem', color: '#7F1D1D', lineHeight: '1.4' }}>
          <strong>O Bug Silencioso Mais Comum:</strong> Se você esquecer de chamar <code>model.eval()</code> antes de validar ou testar, o Dropout continuará apagando metade dos neurônios aleatoriamente a cada predição e o BatchNorm falhará em amostras isoladas!
        </div>
      </div>
    </div>
  );
}
