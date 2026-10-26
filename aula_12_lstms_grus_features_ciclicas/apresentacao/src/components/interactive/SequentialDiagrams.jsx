import React from 'react';
import { 
  Clock, Database, Layers, ArrowRight, TrendingUp, AlertTriangle, 
  CheckCircle2, Cpu, Repeat, GitBranch, ShoppingCart, Calendar,
  BarChart2, ShieldAlert, Zap, Split, Activity, RefreshCw
} from 'lucide-react';
import MathView from '../MathView';

// 1. Nature of Sequential Data Diagram
export function SequenceNatureDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #64748B' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="card-header-badge" style={{ background: 'rgba(100,116,139,0.15)', color: '#475569' }}>
            Hipótese Clássica (I.I.D.)
          </span>
        </div>
        <h3 className="card-title">Dados Tabulares & Estáticos</h3>
        <p className="card-text" style={{ marginBottom: '12px' }}>
          Amostras são <strong>Independentes e Identicamente Distribuídas</strong>. Embaralhar as linhas do dataset não altera em nada o aprendizado.
        </p>

        <div style={{ background: '#F8FAFC', border: '1px dashed #CBD5E1', borderRadius: '8px', padding: '12px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Cliente A (Idade 34, Renda 5k)</span>
            <span style={{ fontSize: '0.72rem', background: '#E2E8F0', padding: '2px 8px', borderRadius: '4px' }}>y = Não Churn</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#FFFFFF', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#334155' }}>Cliente B (Idade 52, Renda 12k)</span>
            <span style={{ fontSize: '0.72rem', background: '#E2E8F0', padding: '2px 8px', borderRadius: '4px' }}>y = Churn</span>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#64748B', textAlign: 'center', fontStyle: 'italic' }}>
            Sem relação temporal ou causal entre Linha 1 e Linha 2
          </div>
        </div>

        <ul className="styled-list" style={{ marginTop: '12px' }}>
          <li>Exemplos: Regressão Logística, Random Forest, MLPs padrão.</li>
          <li>A ordem temporal das amostras é ignorada e descartada.</li>
        </ul>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #1BB5D8' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
          <span className="card-header-badge" style={{ background: 'rgba(27,181,216,0.15)', color: '#0E7490' }}>
            Dependência Temporal
          </span>
        </div>
        <h3 className="card-title">Dados Sequenciais (Time Series & NLP)</h3>
        <p className="card-text" style={{ marginBottom: '12px' }}>
          A ordem dos elementos carrega <strong>significado intrínseco</strong>. O valor em <MathView math="x_t" /> depende diretamente do histórico <MathView math="x_{t-1}, x_{t-2}, \dots" />.
        </p>

        <div style={{ background: 'linear-gradient(145deg, #F0FDF4 0%, #F0F9FF 100%)', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '12px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '4px' }}>
            <div style={{ textAlign: 'center', background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #BAE6FD', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: '#0E7490', fontWeight: 700 }}>t - 2</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0A345D' }}>120 un.</div>
            </div>
            <ArrowRight size={14} color="#0E7490" />
            <div style={{ textAlign: 'center', background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '1px solid #BAE6FD', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: '#0E7490', fontWeight: 700 }}>t - 1</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0A345D' }}>145 un.</div>
            </div>
            <ArrowRight size={14} color="#0E7490" />
            <div style={{ textAlign: 'center', background: '#FFFFFF', padding: '6px 8px', borderRadius: '6px', border: '2px solid #1BB5D8', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: '#0E7490', fontWeight: 700 }}>t (Hoje)</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0E7490' }}>190 un.</div>
            </div>
            <ArrowRight size={14} color="#7CB342" />
            <div style={{ textAlign: 'center', background: '#DCFCE7', padding: '6px 8px', borderRadius: '6px', border: '1px solid #86EFAC', flex: 1 }}>
              <div style={{ fontSize: '0.68rem', color: '#166534', fontWeight: 700 }}>t + 1 (?)</div>
              <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#166534' }}>y = ?</div>
            </div>
          </div>
          <div style={{ fontSize: '0.74rem', color: '#0369A1', textAlign: 'center', marginTop: '8px', fontWeight: 600 }}>
            Autocorrelação, Tendência e Sazonalidade contínuas
          </div>
        </div>

        <ul className="styled-list" style={{ marginTop: '12px' }}>
          <li>Exemplos: Demanda de estoque, cotações, áudio, texto, sensores IoT.</li>
          <li>Exige redes com <strong>estado oculto de memória (<MathView math="h_t" />)</strong>.</li>
        </ul>
      </div>
    </div>
  );
}

// 2. Limitations of Standard MLPs Diagram
export function MLPLimitationsDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Gargalo 1: Vetores Fixos
        </span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>Rigidez Dimensional</h3>
        <p className="card-text" style={{ fontSize: '0.82rem' }}>
          MLPs exigem que a camada de entrada tenha dimensão estritamente fixa <MathView math="x \in \mathbb{R}^D" />.
        </p>
        <div style={{ margin: '10px 0', background: '#FFF7ED', padding: '10px', borderRadius: '6px', border: '1px solid #FFEDD5', fontSize: '0.78rem', color: '#9A3412' }}>
          Como passar uma série de 7 dias hoje e de 30 dias amanhã sem truncar ou usar padding excessivo?
        </div>
        <ul className="styled-list">
          <li>Impossibilita lidar naturalmente com sequências dinâmicas.</li>
          <li>Padding desperdiça computação e memória.</li>
        </ul>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Gargalo 2: Sem Invariância
        </span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>Perda de Invariância Temporal</h3>
        <p className="card-text" style={{ fontSize: '0.82rem' }}>
          Se concatenarmos <MathView math="[x_1, x_2, \dots, x_T]" /> em um vetor longo, cada posição terá seu próprio peso dedicado.
        </p>
        <div style={{ margin: '10px 0', background: '#FFF7ED', padding: '10px', borderRadius: '6px', border: '1px solid #FFEDD5', fontSize: '0.78rem', color: '#9A3412' }}>
          Um pico de vendas na Segunda-feira não é generalizado para a Sexta-feira porque os pesos são distintos!
        </div>
        <ul className="styled-list">
          <li>Falta de compartilhamento de pesos no tempo.</li>
          <li>Necessidade de reaprender o mesmo padrão em cada timestep.</li>
        </ul>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Gargalo 3: Explosão de Pesos
        </span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>Explosão de Parâmetros</h3>
        <p className="card-text" style={{ fontSize: '0.82rem' }}>
          Ao aumentar o horizonte de contexto <MathView math="T" />, o número de parâmetros da primeira camada cresce linearmente com <MathView math="T \times D \times H" />.
        </p>
        <div style={{ margin: '10px 0', background: '#FFF7ED', padding: '10px', borderRadius: '6px', border: '1px solid #FFEDD5', fontSize: '0.78rem', color: '#9A3412' }}>
          Em sequências de áudio ou texto de 500 passos, a MLP torna-se inviável e sofre de overfitting instantâneo.
        </div>
        <ul className="styled-list">
          <li>Overfitting em pequenos datasets.</li>
          <li>Incapacidade de extrapolação temporal.</li>
        </ul>
      </div>
    </div>
  );
}

// 3. Vanilla RNN Unrolling Diagram
export function VanillaRNNUnrollDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '14px' }}>
        <div className="content-card" style={{ padding: '14px', background: '#F8FAFC' }}>
          <span className="card-header-badge pill-cyan">Representação Dobrada</span>
          <h4 style={{ fontSize: '0.95rem', color: '#0A345D', margin: '4px 0' }}>O Loop de Recorrência</h4>
          <p style={{ fontSize: '0.78rem', color: '#475569' }}>
            A mesma célula processa a sequência inteira, atualizando o vetor <MathView math="h_t" /> a cada passo.
          </p>

          <div style={{ textAlign: 'center', padding: '10px', background: '#FFFFFF', borderRadius: '8px', border: '1px solid #CBD5E1', margin: '8px 0' }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#0A345D' }}>
              <MathView math="h_t = \tanh(W_{hh} h_{t-1} + W_{xh} x_t + b_h)" displayMode={true} />
            </div>
            <div style={{ fontSize: '0.76rem', fontWeight: 600, color: '#0E7490', marginTop: '4px' }}>
              <MathView math="y_t = W_{hy} h_t + b_y" displayMode={true} />
            </div>
          </div>

          <div style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.3' }}>
            <strong>Pesos Compartilhados:</strong> <MathView math="W_{xh}, W_{hh}, W_{hy}" /> são rigorosamente os mesmos em todos os instantes <MathView math="t" />.
          </div>
        </div>

        <div className="content-card" style={{ padding: '14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <span className="card-header-badge pill-green">Desenrolamento Temporal (Unrolling through Time)</span>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around', margin: '10px 0' }}>
            
            {/* Step t-1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                <MathView math="y_{t-1}" />
              </div>
              <div style={{ width: '2px', height: '12px', background: '#0369A1' }} />
              <div style={{ background: '#0A345D', color: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>RNN Cell</div>
                <div style={{ fontSize: '0.68rem', color: '#64D9EF' }}><MathView math="h_{t-1}" /></div>
              </div>
              <div style={{ width: '2px', height: '12px', background: '#0369A1' }} />
              <div style={{ background: '#F1F5F9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #CBD5E1' }}>
                <MathView math="x_{t-1}" />
              </div>
            </div>

            {/* Recurrence Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1BB5D8' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}><MathView math="W_{hh}" /></span>
              <ArrowRight size={24} />
            </div>

            {/* Step t */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#E0F2FE', color: '#0369A1', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                <MathView math="y_t" />
              </div>
              <div style={{ width: '2px', height: '12px', background: '#0369A1' }} />
              <div style={{ background: '#0E7490', color: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 10px rgba(14,116,144,0.3)', border: '2px solid #64D9EF' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>RNN Cell</div>
                <div style={{ fontSize: '0.68rem', color: '#FFFFFF' }}><MathView math="h_t" /></div>
              </div>
              <div style={{ width: '2px', height: '12px', background: '#0369A1' }} />
              <div style={{ background: '#F1F5F9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #CBD5E1' }}>
                <MathView math="x_t" />
              </div>
            </div>

            {/* Recurrence Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', color: '#1BB5D8' }}>
              <span style={{ fontSize: '0.7rem', fontWeight: 700 }}><MathView math="W_{hh}" /></span>
              <ArrowRight size={24} />
            </div>

            {/* Step t+1 */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
              <div style={{ background: '#DCFCE7', color: '#166534', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700 }}>
                <MathView math="y_{t+1}" />
              </div>
              <div style={{ width: '2px', height: '12px', background: '#166534' }} />
              <div style={{ background: '#0A345D', color: '#FFFFFF', padding: '12px 16px', borderRadius: '8px', textAlign: 'center', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>RNN Cell</div>
                <div style={{ fontSize: '0.68rem', color: '#64D9EF' }}><MathView math="h_{t+1}" /></div>
              </div>
              <div style={{ width: '2px', height: '12px', background: '#166534' }} />
              <div style={{ background: '#F1F5F9', color: '#334155', padding: '4px 10px', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 700, border: '1px solid #CBD5E1' }}>
                <MathView math="x_{t+1}" />
              </div>
            </div>

          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', fontSize: '0.76rem', color: '#475569', display: 'flex', justifyContent: 'space-between' }}>
            <span><strong>Memória Recursiva:</strong> <MathView math="h_t" /> carrega a síntese de todo o passado até o instante <MathView math="t" />.</span>
            <span style={{ color: '#0E7490', fontWeight: 600 }}>Complexidade: <MathView math="\mathcal{O}(T)" /></span>
          </div>
        </div>
      </div>
    </div>
  );
}

// 4. Backpropagation Through Time (BPTT) & O Gargalo Temporal
export function BPTTFlowDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Retropropagação no Tempo
        </span>
        <h3 className="card-title">Como Funciona o BPTT?</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>
          Para que a rede aprenda relações temporais, o erro calculado no final da sequência viaja de volta por todos os passos anteriores:
        </p>

        <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '8px', padding: '10px 12px', margin: '8px 0' }}>
          <div style={{ fontSize: '0.74rem', fontWeight: 700, color: '#C2410C', marginBottom: '6px', textAlign: 'center' }}>
            Fluxo do Erro Voltando no Tempo (Backprop Temporal)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', fontSize: '0.78rem', fontWeight: 700, color: '#0A345D' }}>
            <span style={{ background: '#FEE2E2', color: '#991B1B', padding: '3px 8px', borderRadius: '4px', fontSize: '0.75rem' }}>Erro <MathView math="\mathcal{L}_T" /></span>
            <span style={{ color: '#EA580C' }}>➔</span>
            <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 6px', borderRadius: '4px' }}><MathView math="h_T" /></span>
            <span style={{ color: '#EA580C', fontSize: '0.7rem' }}>✖ <MathView math="W_{hh}" /></span>
            <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 6px', borderRadius: '4px' }}><MathView math="h_{T-1}" /></span>
            <span style={{ color: '#EA580C', fontSize: '0.7rem' }}>...</span>
            <span style={{ color: '#EA580C', fontSize: '0.7rem' }}>✖ <MathView math="W_{hh}" /></span>
            <span style={{ background: '#FFFFFF', border: '1px solid #CBD5E1', padding: '3px 6px', borderRadius: '4px' }}><MathView math="h_1" /></span>
          </div>
          <div style={{ fontSize: '0.72rem', color: '#9A3412', textAlign: 'center', marginTop: '6px', fontStyle: 'italic' }}>
            O sinal atravessa sucessivas multiplicações da mesma matriz de pesos <MathView math="W_{hh}" />
          </div>
        </div>

        <ul className="styled-list" style={{ marginTop: '8px' }}>
          <li><strong>Pesos Compartilhados:</strong> A mesma matriz <MathView math="W_{hh}" /> é reutilizada a cada passo de tempo.</li>
          <li><strong>Multiplicações Sucessivas:</strong> Em 20 passos, o sinal é multiplicado ~20 vezes seguidas no caminho de volta.</li>
          <li><strong>Perda de Sinal:</strong> A perda calculada no passo 30 tem extrema dificuldade de atualizar o estado no passo 1.</li>
        </ul>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #0A345D' }}>
        <span className="card-header-badge" style={{ background: 'rgba(10,52,93,0.15)', color: '#0A345D' }}>
          As Duas Patologias
        </span>
        <h3 className="card-title">Vanishing vs Exploding Gradients</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 700, fontSize: '0.82rem' }}>
              <AlertTriangle size={15} /> 1. Vanishing Gradients (Desvanecimento)
            </div>
            <p style={{ fontSize: '0.76rem', color: '#7F1D1D', marginTop: '4px', lineHeight: '1.35' }}>
              Se os pesos de <MathView math="W_{hh}" /> forem atenuantes (<MathView math="< 1.0" />), o gradiente decai exponencialmente para zero: <MathView math="0.5^{10} \approx 0.00097" />. A rede torna-se <strong>incapaz de lembrar do passado além de 5 a 10 timesteps</strong>.
            </p>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', borderRadius: '8px', padding: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#92400E', fontWeight: 700, fontSize: '0.82rem' }}>
              <Zap size={15} /> 2. Exploding Gradients & Clipping
            </div>
            <p style={{ fontSize: '0.76rem', color: '#78350F', marginTop: '4px', lineHeight: '1.35' }}>
              Se os pesos forem amplificadores (<MathView math="> 1.0" />), o gradiente explode para <MathView math="\text{NaN}" /> ou <MathView math="\infty" />.
            </p>
            <div className="code-box" style={{ padding: '6px 10px', fontSize: '0.72rem', marginTop: '6px' }}>
              <span className="cm"># Remédio contra explosão:</span><br/>
              torch.nn.utils.<span className="fn">clip_grad_norm_</span>(model.<span className="fn">parameters</span>(), max_norm=<span className="num">1.0</span>)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// 5. LSTM Architecture & Conveyor Belt Diagram (Slide 7: Macro Visual Dual Highway)
export function LSTMArchitectureDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', justifyContent: 'space-between' }}>
      
      {/* Top Visual Comparison: RNN (Destructive) vs LSTM (Dual Highway) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: '14px' }}>
        
        {/* Vanilla RNN: The Broken Phone */}
        <div style={{ background: '#FFF1F2', border: '1.5px solid #FECDD3', borderRadius: '10px', padding: '12px 14px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#9F1239', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              Vanilla RNN • Trilha Única Frágil
            </span>
            <span style={{ fontSize: '1.1rem' }}>☎️</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', margin: '10px 0' }}>
            <div style={{ background: '#FFFFFF', border: '1.5px solid #FDA4AF', borderRadius: '6px', padding: '6px 10px', fontSize: '0.76rem', fontWeight: 700, color: '#9F1239' }}>
              h₀ (Início)
            </div>
            <span style={{ color: '#E11D48', fontWeight: 800 }}>✖ W</span>
            <div style={{ background: '#FFFFFF', border: '1.5px solid #FDA4AF', borderRadius: '6px', padding: '6px 10px', fontSize: '0.76rem', fontWeight: 700, color: '#9F1239', opacity: 0.6 }}>
              h₅ (Fraco)
            </div>
            <span style={{ color: '#E11D48', fontWeight: 800 }}>✖ W</span>
            <div style={{ background: '#FDA4AF', borderRadius: '6px', padding: '6px 10px', fontSize: '0.76rem', fontWeight: 800, color: '#881337' }}>
              h₁₀ ≈ 0 (Sumiu!)
            </div>
          </div>

          <div style={{ background: '#FFE4E6', borderRadius: '6px', padding: '6px 10px', fontSize: '0.72rem', color: '#9F1239', textAlign: 'center', fontWeight: 600 }}>
            ⚠️ Multiplicações repetidas destroem o sinal em menos de 10 passos.
          </div>
        </div>

        {/* LSTM: The Dual Track Highway */}
        <div style={{ background: 'linear-gradient(135deg, #F0FDF4 0%, #F0F9FF 100%)', border: '2px solid #38BDF8', borderRadius: '10px', padding: '12px 16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0369A1', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
              LSTM • Arquitetura de Duas Trilhas
            </span>
            <span style={{ background: '#16A34A', color: '#FFFFFF', fontSize: '0.65rem', fontWeight: 800, padding: '2px 8px', borderRadius: '12px' }}>
              100+ Passos
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', margin: '6px 0' }}>
            {/* Track 1: Cell State */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1.5px solid #86EFAC', borderRadius: '6px', padding: '6px 10px' }}>
              <span style={{ fontSize: '0.9rem' }}>🛣️</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#166534' }}>Trilha Superior (Cell State C_t): "Esteira Rolante"</div>
                <div style={{ fontSize: '0.68rem', color: '#15803D' }}>Memória de Longo Prazo que flui sem atrito multiplicativo</div>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#16A34A', fontFamily: 'var(--font-mono)' }}>C_{'{t-1}'} ➔ C_t</span>
            </div>

            {/* Track 2: Hidden State */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#FFFFFF', border: '1.5px solid #BAE6FD', borderRadius: '6px', padding: '6px 10px' }}>
              <span style={{ fontSize: '0.9rem' }}>⚡</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.74rem', fontWeight: 800, color: '#0369A1' }}>Trilha Inferior (Hidden State h_t): "Memória de Trabalho"</div>
                <div style={{ fontSize: '0.68rem', color: '#0284C7' }}>Filtro de curto prazo para a decisão do momento atual</div>
              </div>
              <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0284C7', fontFamily: 'var(--font-mono)' }}>h_{'{t-1}'} ➔ h_t</span>
            </div>
          </div>

          <div style={{ fontSize: '0.7rem', color: '#0E7490', textAlign: 'center', fontWeight: 700 }}>
            ✅ A esteira rolante permite que memórias viajem centenas de passos intactas!
          </div>
        </div>

      </div>

      {/* Center Schematic: The Anatomy of the LSTM Highway */}
      <div style={{ background: '#FFFFFF', border: '1px solid #E2E8F0', borderRadius: '10px', padding: '12px 18px', display: 'flex', flexDirection: 'column', gap: '8px', boxShadow: '0 2px 6px rgba(0,0,0,0.03)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.78rem', fontWeight: 800, color: '#0A345D' }}>
            Esquema Visual da Célula LSTM: Como a Informação Flui
          </span>
          <span style={{ fontSize: '0.7rem', color: '#64748B' }}>
            3 Válvulas Inteligentes conectadas à Esteira Principal
          </span>
        </div>

        {/* Visual Workflow Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr auto 1fr', alignItems: 'center', gap: '8px', padding: '8px 0' }}>
          
          {/* Step 1: Input past */}
          <div style={{ background: '#F8FAFC', border: '1.5px solid #CBD5E1', borderRadius: '8px', padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.68rem', color: '#64748B', fontWeight: 700 }}>Passado</div>
            <div style={{ fontSize: '0.85rem', fontWeight: 800, color: '#0A345D', margin: '3px 0' }}>C_{'{t-1}'}</div>
            <div style={{ fontSize: '0.64rem', color: '#475569' }}>Memória acumulada</div>
          </div>

          <ArrowRight size={18} color="#0A345D" />

          {/* Step 2: Forget Gate (Multiply) */}
          <div style={{ background: '#FFF7ED', border: '2px solid #FB923C', borderRadius: '8px', padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.66rem', color: '#C2410C', fontWeight: 800 }}>1. LIXEIRA (✖)</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#EA580C', margin: '2px 0' }}>Forget Gate</div>
            <div style={{ fontSize: '0.64rem', color: '#9A3412' }}>Apaga o inútil</div>
          </div>

          <ArrowRight size={18} color="#EA580C" />

          {/* Step 3: Input Gate (Add) */}
          <div style={{ background: '#F0F9FF', border: '2px solid #38BDF8', borderRadius: '8px', padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.66rem', color: '#0369A1', fontWeight: 800 }}>2. RECEPÇÃO (➕)</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#0284C7', margin: '2px 0' }}>Input Gate</div>
            <div style={{ fontSize: '0.64rem', color: '#075985' }}>Soma novidades</div>
          </div>

          <ArrowRight size={18} color="#0284C7" />

          {/* Step 4: Output Gate (Decision) */}
          <div style={{ background: '#FAF5FF', border: '2px solid #C084FC', borderRadius: '8px', padding: '10px 8px', textAlign: 'center' }}>
            <div style={{ fontSize: '0.66rem', color: '#7E22CE', fontWeight: 800 }}>3. FILTRO (👁️)</div>
            <div style={{ fontSize: '0.82rem', fontWeight: 800, color: '#9333EA', margin: '2px 0' }}>Output Gate</div>
            <div style={{ fontSize: '0.64rem', color: '#6B21A8' }}>Gera resposta h_t</div>
          </div>

        </div>
      </div>

      {/* Bottom Takeaway Badge */}
      <div style={{ background: '#0A345D', borderRadius: '8px', padding: '8px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', color: '#FFFFFF' }}>
        <div style={{ fontSize: '0.76rem', color: '#64748B' }}>
          <strong style={{ color: '#64D9EF' }}>💡 Resumo Visual:</strong> A esteira não multiplica matrizes destrutivas — ela apenas limpa (✖) e soma (➕) dados!
        </div>
        <div style={{ fontSize: '0.72rem', color: '#CBD5E1' }}>
          Próximo: Veja o mecanismo interno de cada portão ➔
        </div>
      </div>

    </div>
  );
}

// 6. LSTM Gates Detailed Flow Diagram (Slide 8: Visual Gate Valves)
export function LSTMGatesFlowDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%', justifyContent: 'space-between' }}>
      
      {/* Top Banner: The 3 Gates as Logical Valves */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)', padding: '8px 16px', borderRadius: '8px', color: '#FFFFFF' }}>
        <div style={{ fontSize: '0.84rem', fontWeight: 700, color: '#64D9EF' }}>
          Como os 3 Portões Funcionam como Válvulas de Controle (0% a 100% de Abertura)
        </div>
        <div style={{ fontSize: '0.72rem', background: 'rgba(255,255,255,0.15)', padding: '3px 10px', borderRadius: '12px' }}>
          Função Sigmoid (σ) = Válvula Reguladora
        </div>
      </div>

      {/* 3 Step-by-Step Graphical Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
        
        {/* Step 1: Forget Gate */}
        <div className="content-card" style={{ borderTop: '4px solid #FF7043', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C', fontSize: '0.66rem' }}>
                Etapa 1 • Limpeza
              </span>
              <span style={{ fontSize: '1.1rem' }}>🗑️</span>
            </div>
            
            <h4 style={{ fontSize: '0.95rem', color: '#0A345D', margin: '2px 0' }}>Forget Gate (f_t)</h4>
            <div style={{ fontSize: '0.74rem', color: '#C2410C', fontWeight: 700, margin: '4px 0' }}>
              "O que devo esquecer?"
            </div>

            {/* Visual Valve Indicator */}
            <div style={{ background: '#FFF7ED', border: '1px solid #FED7AA', borderRadius: '6px', padding: '8px', margin: '6px 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#9A3412', fontWeight: 700 }}>
                <span>0 = Apaga Tudo</span>
                <span>1 = Mantém Tudo</span>
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', margin: '4px 0', overflow: 'hidden' }}>
                <div style={{ width: '85%', height: '100%', background: '#EA580C', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '0.66rem', color: '#C2410C', fontWeight: 600 }}>Multiplica a esteira: C_novo = f_t ✖ C_antigo</div>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#475569' }}>
            <strong>Exemplo:</strong> Se o cliente cancelou o plano, zera os dados antigos desse cliente.
          </div>
        </div>

        {/* Step 2: Input Gate & Candidate */}
        <div className="content-card" style={{ borderTop: '4px solid #1BB5D8', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="card-header-badge pill-cyan" style={{ fontSize: '0.66rem' }}>
                Etapa 2 • Gravação
              </span>
              <span style={{ fontSize: '1.1rem' }}>📥</span>
            </div>
            
            <h4 style={{ fontSize: '0.95rem', color: '#0A345D', margin: '2px 0' }}>Input Gate (i_t)</h4>
            <div style={{ fontSize: '0.74rem', color: '#0E7490', fontWeight: 700, margin: '4px 0' }}>
              "O que devo anotar de novo?"
            </div>

            {/* Visual Addition Indicator */}
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '6px', padding: '8px', margin: '6px 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#0369A1', fontWeight: 700 }}>
                <span>Prepara Novo Fato</span>
                <span>➕ Soma na Esteira</span>
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', margin: '4px 0', overflow: 'hidden' }}>
                <div style={{ width: '70%', height: '100%', background: '#0284C7', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '0.66rem', color: '#0369A1', fontWeight: 600 }}>Soma direta: C_final = C_repassado ➕ Novo_dado</div>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#475569' }}>
            <strong>Exemplo:</strong> Detectou o início da Black Friday? Adiciona esse pico de vendas à esteira.
          </div>
        </div>

        {/* Step 3: Output Gate */}
        <div className="content-card" style={{ borderTop: '4px solid #AB47BC', padding: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
              <span className="card-header-badge pill-purple" style={{ fontSize: '0.66rem' }}>
                Etapa 3 • Decisão
              </span>
              <span style={{ fontSize: '1.1rem' }}>📤</span>
            </div>
            
            <h4 style={{ fontSize: '0.95rem', color: '#0A345D', margin: '2px 0' }}>Output Gate (o_t)</h4>
            <div style={{ fontSize: '0.74rem', color: '#7E22CE', fontWeight: 700, margin: '4px 0' }}>
              "O que devo falar agora?"
            </div>

            {/* Visual Filter Indicator */}
            <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', borderRadius: '6px', padding: '8px', margin: '6px 0', textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#7E22CE', fontWeight: 700 }}>
                <span>Lê a Esteira (C_t)</span>
                <span>Filtra p/ Saída</span>
              </div>
              <div style={{ height: '8px', background: '#E2E8F0', borderRadius: '4px', margin: '4px 0', overflow: 'hidden' }}>
                <div style={{ width: '90%', height: '100%', background: '#9333EA', borderRadius: '4px' }} />
              </div>
              <div style={{ fontSize: '0.66rem', color: '#7E22CE', fontWeight: 600 }}>Emite estado visível: h_t = o_t ✖ tanh(C_t)</div>
            </div>
          </div>

          <div style={{ background: '#F8FAFC', padding: '6px 8px', borderRadius: '4px', fontSize: '0.7rem', color: '#475569' }}>
            <strong>Exemplo:</strong> Extrai da esteira apenas o necessário para prever a venda de amanhã.
          </div>
        </div>

      </div>

      {/* Bottom Summary Pipeline */}
      <div style={{ background: '#F0FDF4', border: '1.5px solid #86EFAC', borderRadius: '8px', padding: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CheckCircle2 size={20} color="#16A34A" />
          <div style={{ fontSize: '0.76rem', color: '#166534', fontWeight: 700 }}>
            Fluxo Completo em 1 Frase: A LSTM joga fora o lixo antigo (1), anota os fatos novos (2) e resume a decisão do momento (3)!
          </div>
        </div>
        <span style={{ fontSize: '0.72rem', background: '#DCFCE7', color: '#15803D', padding: '4px 10px', borderRadius: '12px', fontWeight: 800 }}>
          Engenharia Pura
        </span>
      </div>

    </div>
  );
}

// 6. GRU Architecture Diagram
export function GRUArchitectureDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #1BB5D8' }}>
        <span className="card-header-badge pill-cyan">Arquitetura Simplificada (Cho et al., 2014)</span>
        <h3 className="card-title">Gated Recurrent Unit (GRU)</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '10px' }}>
          Elimina o <MathView math="C_t" /> separado, utilizando apenas o estado oculto <MathView math="h_t" /> e <strong>apenas 2 portões</strong>:
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0369A1' }}>
              1. Reset Gate (<MathView math="r_t" />):
            </div>
            <div style={{ fontSize: '0.74rem', color: '#075985', marginTop: '2px' }}>
              <MathView math="r_t = \sigma(W_r [h_{t-1}, x_t] + b_r)" />
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
              Decide o quanto do estado anterior <MathView math="h_{t-1}" /> deve ser ignorado.
            </div>
          </div>

          <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#166534' }}>
              2. Update Gate (<MathView math="z_t" />):
            </div>
            <div style={{ fontSize: '0.74rem', color: '#14532D', marginTop: '2px' }}>
              <MathView math="z_t = \sigma(W_z [h_{t-1}, x_t] + b_z)" />
            </div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>
              Combina as funções dos portões Forget e Input da LSTM em um único mecanismo.
            </div>
          </div>

          <div style={{ background: '#FAF5FF', border: '1px solid #E9D5FF', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#7E22CE' }}>
              3. Interpolação Convexa do Estado (<MathView math="h_t" />):
            </div>
            <div style={{ fontSize: '0.74rem', color: '#6B21A8', marginTop: '2px' }}>
              <MathView math="h_t = (1 - z_t) \odot h_{t-1} + z_t \odot \tilde{h}_t" />
            </div>
          </div>
        </div>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
        <span className="card-header-badge pill-green">Vantagens & Trade-offs</span>
        <h3 className="card-title">Por que usar GRU na Prática?</h3>

        <ul className="styled-list" style={{ marginTop: '8px' }}>
          <li>
            <strong>25% menos parâmetros:</strong> Apenas 3 conjuntos de matrizes de pesos (vs 4 na LSTM), resultando em treinamento mais rápido e menor consumo de VRAM na GPU.
          </li>
          <li>
            <strong>Menos propensa a overfitting:</strong> Excelente desempenho em séries temporais menores e com menos histórico.
          </li>
          <li>
            <strong>Um único estado (<MathView math="h_t" />):</strong> Simplifica o pipeline de exportação (ONNX / TorchScript) e inferência em tempo real.
          </li>
          <li>
            <strong>Desempenho empírico:</strong> Em muitas tarefas de previsão de demanda e NLP leve, empata ou supera a LSTM.
          </li>
        </ul>

        <div style={{ marginTop: '14px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '10px 14px', borderRadius: '8px' }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>
            Regra Geral de Seleção:
          </div>
          <div style={{ fontSize: '0.74rem', color: '#475569', marginTop: '4px' }}>
            Comece sempre testando a <strong>GRU</strong> pela velocidade de iteração. Se a sequência for muito longa (100+ passos) e com dependências complexas de contagem, escale para a <strong>LSTM</strong>.
          </div>
        </div>
      </div>
    </div>
  );
}

// 7. PyTorch Tensor Shapes Diagram
export function PyTorchTensorShapesDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #0A345D' }}>
        <span className="card-header-badge pill-cyan">Formato dos Tensores</span>
        <h3 className="card-title">Entrada com <MathView math="\text{batch\_first=True}" /></h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '10px' }}>
          No PyTorch moderno, sempre configuramos <MathView math="\text{batch\_first=True}" /> para consistência com CNNs e Transformers:
        </p>

        <div style={{ background: '#0F172A', color: '#E2E8F0', padding: '12px', borderRadius: '8px', fontFamily: 'var(--font-mono)', fontSize: '0.78rem' }}>
          <span className="cm"># Tensor de Entrada X:</span><br/>
          <span style={{ color: '#64D9EF', fontWeight: 700 }}>(batch_size, seq_len, input_size)</span><br/><br/>
          <span className="cm"># Exemplo prático (Forecasting):</span><br/>
          <span className="kw">N</span> = 64  <span className="cm"># Janelas de lojas/itens</span><br/>
          <span className="kw">L</span> = 30  <span className="cm"># 30 dias de histórico</span><br/>
          <span className="kw">D</span> = 5   <span className="cm"># Vendas + 4 features calendário</span><br/>
          x = torch.<span className="fn">randn</span>(64, 30, 5)
        </div>

        <div style={{ fontSize: '0.76rem', color: '#475569', marginTop: '10px' }}>
          <strong>Atenção:</strong> Por padrão histórico no PyTorch, <MathView math="\text{batch\_first=False}" /> espera <MathView math="(\text{seq\_len}, \text{batch}, \text{input\_size})" />. Lembre-se sempre de explicitar <MathView math="\text{batch\_first=True}" />!
        </div>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
        <span className="card-header-badge pill-green">Saídas da Camada Recorrente</span>
        <h3 className="card-title">O que a LSTM / GRU Retorna</h3>

        <div className="code-box" style={{ fontSize: '0.74rem', marginBottom: '8px' }}>
          <span className="cm"># Chamada no Forward:</span><br/>
          output, (hn, cn) = self.<span className="fn">lstm</span>(x)<br/>
          <span className="cm"># No caso de GRU:</span><br/>
          output, hn = self.<span className="fn">gru</span>(x)
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>1. output:</strong> <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>(N, L, H)</span><br/>
            Contém o <MathView math="h_t" /> de <strong>todos os timesteps</strong> da sequência. Usado em tarefas Many-to-Many ou com mecanismos de Attention.
          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>2. hn (Hidden final):</strong> <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>(num_layers * dir, N, H)</span><br/>
            Contém o estado oculto apenas do <strong>último timestep</strong>. Para Many-to-One, usamos <MathView math="\text{hn}[-1]" /> ou <MathView math="\text{output}[:, -1, :]" />.
          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>3. cn (Cell final - só LSTM):</strong> <span style={{ color: '#0E7490', fontFamily: 'var(--font-mono)' }}>(num_layers * dir, N, H)</span><br/>
            Contém a memória de longo prazo no fim da sequência.
          </div>
        </div>
      </div>
    </div>
  );
}

// 8. Topologies Diagram
export function TopologiesDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '10px', height: '100%' }}>
      
      {/* 1-to-1 */}
      <div className="content-card" style={{ padding: '12px', borderTop: '3px solid #64748B' }}>
        <span className="card-header-badge" style={{ background: 'rgba(100,116,139,0.15)', color: '#475569', fontSize: '0.65rem' }}>
          Estático
        </span>
        <h4 style={{ fontSize: '0.86rem', color: '#0A345D', margin: '3px 0' }}>One-to-One</h4>
        <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.3' }}>
          Classificação tabular padrão ou regressão simples sem histórico temporal.
        </p>
        <div style={{ background: '#F8FAFC', padding: '8px', borderRadius: '6px', textAlign: 'center', margin: '8px 0', border: '1px solid #CBD5E1' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#334155' }}>[Imagem] ➔ [Gato]</div>
        </div>
        <div style={{ fontSize: '0.68rem', color: '#64748B' }}>Rede Densa / CNN padrão.</div>
      </div>

      {/* 1-to-Many */}
      <div className="content-card" style={{ padding: '12px', borderTop: '3px solid #1BB5D8' }}>
        <span className="card-header-badge pill-cyan" style={{ fontSize: '0.65rem' }}>
          Geração
        </span>
        <h4 style={{ fontSize: '0.86rem', color: '#0A345D', margin: '3px 0' }}>One-to-Many</h4>
        <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.3' }}>
          Uma entrada única gera uma sequência temporal de saídas.
        </p>
        <div style={{ background: '#F0F9FF', padding: '8px', borderRadius: '6px', textAlign: 'center', margin: '8px 0', border: '1px solid #BAE6FD' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#0369A1' }}>[Imagem] ➔ ["Um", "cão", "corre"]</div>
        </div>
        <div style={{ fontSize: '0.68rem', color: '#0E7490' }}>Image Captioning, Geração Musical.</div>
      </div>

      {/* Many-to-1 */}
      <div className="content-card" style={{ padding: '12px', borderTop: '3px solid #7CB342' }}>
        <span className="card-header-badge pill-green" style={{ fontSize: '0.65rem' }}>
          Forecasting / Sentimento
        </span>
        <h4 style={{ fontSize: '0.86rem', color: '#0A345D', margin: '3px 0' }}>Many-to-One</h4>
        <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.3' }}>
          Uma sequência temporal gera um único valor ou classe no final.
        </p>
        <div style={{ background: '#F0FDF4', padding: '8px', borderRadius: '6px', textAlign: 'center', margin: '8px 0', border: '1px solid #BBF7D0' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#166534' }}>[30 dias vendas] ➔ [Demanda D+1]</div>
        </div>
        <div style={{ fontSize: '0.68rem', color: '#15803D' }}><strong>Nosso foco hoje!</strong></div>
      </div>

      {/* Many-to-Many */}
      <div className="content-card" style={{ padding: '12px', borderTop: '3px solid #AB47BC' }}>
        <span className="card-header-badge pill-purple" style={{ fontSize: '0.65rem' }}>
          Seq2Seq / Alinhado
        </span>
        <h4 style={{ fontSize: '0.86rem', color: '#0A345D', margin: '3px 0' }}>Many-to-Many</h4>
        <p style={{ fontSize: '0.72rem', color: '#64748B', lineHeight: '1.3' }}>
          Sequência de entrada gera sequência de saída (sincronizada ou seq2seq).
        </p>
        <div style={{ background: '#FAF5FF', padding: '8px', borderRadius: '6px', textAlign: 'center', margin: '8px 0', border: '1px solid #E9D5FF' }}>
          <div style={{ fontSize: '0.72rem', fontWeight: 700, color: '#7E22CE' }}>[Frase PT] ➔ [Frase EN]</div>
        </div>
        <div style={{ fontSize: '0.68rem', color: '#7E22CE' }}>Tradução, NER, Previsão Multi-step.</div>
      </div>

    </div>
  );
}

// 9. Demand Forecasting SaaS Diagram
export function DemandForecastingSaaSDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #0A345D' }}>
        <span className="card-header-badge pill-cyan">Caso Prático Real</span>
        <h3 className="card-title">Store Item Demand Forecasting</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '10px' }}>
          Dataset oficial de varejo com <strong>10 lojas</strong> e <strong>50 produtos</strong> ao longo de 5 anos de transações diárias (500 séries temporais simultâneas).
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#991B1B' }}>
              Custo do Erro por Ruptura (Stockout):
            </div>
            <div style={{ fontSize: '0.72rem', color: '#7F1D1D', marginTop: '2px' }}>
              Subestimar a demanda significa cliente sem produto na prateleira, venda perdida e frustração do consumidor.
            </div>
          </div>

          <div style={{ background: '#FFFBEB', border: '1px solid #FDE68A', padding: '8px 12px', borderRadius: '6px' }}>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#92400E' }}>
              Custo do Erro por Excesso (Overstock):
            </div>
            <div style={{ fontSize: '0.72rem', color: '#78350F', marginTop: '2px' }}>
              Superestimar a demanda gera capital de giro parado, custos de armazenagem e obsolescência/perecibilidade de itens.
            </div>
          </div>
        </div>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
        <span className="card-header-badge pill-green">Padrões Complexos da Série Temporal</span>
        <h3 className="card-title">O que a Rede Neural Precisa Aprender</h3>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', margin: '8px 0' }}>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>1. Sazonalidade Semanal</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Picos consistentes aos sábados e domingos; quedas nas terças.</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>2. Sazonalidade Anual</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Explosão de vendas no Natal, Black Friday e meses de férias.</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>3. Tendência de Longo Prazo</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Crescimento contínuo ano a ano à medida que a loja expande.</div>
          </div>
          <div style={{ background: '#F8FAFC', padding: '8px 10px', borderRadius: '6px', border: '1px solid #E2E8F0' }}>
            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0A345D' }}>4. Ruído e Eventos Raros</div>
            <div style={{ fontSize: '0.7rem', color: '#64748B', marginTop: '2px' }}>Variações diárias estocásticas e promoções relâmpago.</div>
          </div>
        </div>

        <div style={{ background: '#F0FDF4', padding: '8px 12px', borderRadius: '6px', border: '1px solid #BBF7D0', fontSize: '0.74rem', color: '#166534' }}>
          <strong>Vantagem de LSTMs/GRUs:</strong> Conseguem modelar não-linearidades complexas e interações cruzadas entre múltiplas features sem exigir decomposição manual ARIMA clássica.
        </div>
      </div>
    </div>
  );
}

// 10. Sliding Window Feature Engineering Diagram
export function SlidingWindowDiagram() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
      <div className="content-card" style={{ padding: '14px', borderTop: '4px solid #1BB5D8' }}>
        <span className="card-header-badge pill-cyan">Transformação em Aprendizado Supervisionado</span>
        <h3 className="card-title">Mecanismo de Janela Deslizante (Sliding Window)</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>
          Convertemos uma série temporal contínua 1D em tensores 3D com formato <MathView math="(N, L, D)" /> e alvos <MathView math="(N, H)" />:
        </p>

        {/* Visual Sliding Window track */}
        <div style={{ background: '#F8FAFC', border: '1px solid #CBD5E1', borderRadius: '8px', padding: '12px', margin: '6px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', overflowX: 'auto' }}>
            
            {/* Context Days (Lookback) */}
            <div style={{ display: 'flex', gap: '3px', background: '#E0F2FE', padding: '6px', borderRadius: '6px', border: '1.5px solid #0284C7' }}>
              {[1, 2, 3, 4, 5, 6, 7].map((d) => (
                <div key={d} style={{ width: '32px', height: '36px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #BAE6FD' }}>
                  <span style={{ fontSize: '0.62rem', color: '#0369A1' }}>D{d}</span>
                  <span style={{ fontSize: '0.72rem', fontWeight: 800, color: '#0A345D' }}>{20 + d * 3}</span>
                </div>
              ))}
            </div>

            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#0369A1', padding: '0 6px' }}>
              Janela de Contexto (Lookback <MathView math="L = 7" />)
            </div>

            <ArrowRight size={18} color="#166534" />

            {/* Target Day */}
            <div style={{ background: '#DCFCE7', padding: '6px', borderRadius: '6px', border: '1.5px solid #16A34A' }}>
              <div style={{ width: '36px', height: '36px', background: '#FFFFFF', borderRadius: '4px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '1px solid #86EFAC' }}>
                <span style={{ fontSize: '0.62rem', color: '#166534' }}>D8</span>
                <span style={{ fontSize: '0.76rem', fontWeight: 800, color: '#15803D' }}>45</span>
              </div>
            </div>

            <div style={{ fontSize: '0.76rem', fontWeight: 700, color: '#166534', padding: '0 6px' }}>
              Alvo (Target <MathView math="y" />)
            </div>

          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px', marginTop: '8px' }}>
          <div style={{ background: '#F0F9FF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.74rem' }}>
            <strong style={{ color: '#0369A1' }}>1. Features de Calendário:</strong><br/>
            Codificação cíclica de dia da semana e mês com <MathView math="\sin" /> e <MathView math="\cos" />:
            <div style={{ fontSize: '0.68rem', color: '#0C4A6E', marginTop: '2px' }}>
              <MathView math="\sin(2\pi \cdot \text{day} / 7), \cos(2\pi \cdot \text{day} / 7)" />
            </div>
          </div>

          <div style={{ background: '#F0FDF4', padding: '8px 10px', borderRadius: '6px', fontSize: '0.74rem' }}>
            <strong style={{ color: '#166534' }}>2. Lags & Médias Móveis:</strong><br/>
            Média dos últimos 7 dias (<MathView math="\text{MA}_7" />) e vendas no mesmo dia da semana anterior (<MathView math="\text{lag}_7" />).
          </div>

          <div style={{ background: '#FAF5FF', padding: '8px 10px', borderRadius: '6px', fontSize: '0.74rem' }}>
            <strong style={{ color: '#7E22CE' }}>3. Normalização por Item:</strong><br/>
            Ajustar <MathView math="\text{MinMaxScaler}" /> individualmente por produto/loja para evitar dominância de produtos de alto volume.
          </div>
        </div>
      </div>
    </div>
  );
}

// 11. Multi-layer, Bidirectional & Recurrent Regularization
export function DeepBiRNNLayerDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #0A345D' }}>
        <span className="card-header-badge pill-cyan">Deep RNN & Empilhamento</span>
        <h3 className="card-title">Camadas Recorrentes Múltiplas (<MathView math="\text{num\_layers} \ge 2" />)</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>
          Assim como redes neurais convolucionais têm camadas profundas para aprender hierarquias visuais (bordas ➔ texturas ➔ partes), LSTMs empilhadas aprendem hierarquias temporais:
        </p>

        <ul className="styled-list">
          <li><strong>Camada 1:</strong> Captura dinâmicas rápidas e ruídos diários.</li>
          <li><strong>Camada 2:</strong> Captura ciclos semanais e tendências médias.</li>
          <li><strong>Camada 3:</strong> Modela sazonalidades amplas e tendências anuais.</li>
        </ul>

        <div className="code-box" style={{ marginTop: '10px', fontSize: '0.72rem' }}>
          self.lstm = nn.<span className="fn">LSTM</span>(<br/>
          &nbsp;&nbsp;input_size=<span className="num">5</span>, hidden_size=<span className="num">64</span>,<br/>
          &nbsp;&nbsp;num_layers=<span className="num">2</span>, batch_first=<span className="kw">True</span>,<br/>
          &nbsp;&nbsp;dropout=<span className="num">0.2</span> <span className="cm"># Dropout entre camadas!</span><br/>
          )
        </div>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Atenção com Séries Temporais!
        </span>
        <h3 className="card-title">Bidirectional RNN: Quando NÃO Usar</h3>
        <p className="card-text" style={{ fontSize: '0.82rem', marginBottom: '8px' }}>
          A camada <MathView math="\text{bidirectional=True}" /> processa a sequência no sentido horário (<MathView math="t=1 \to T" />) e anti-horário (<MathView math="t=T \to 1" />).
        </p>

        <div style={{ background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '8px', padding: '10px', margin: '6px 0' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#991B1B', fontWeight: 700, fontSize: '0.8rem' }}>
            <AlertTriangle size={15} /> Proibido em Forecasting em Tempo Real!
          </div>
          <p style={{ fontSize: '0.74rem', color: '#7F1D1D', marginTop: '4px', lineHeight: '1.35' }}>
            Em previsão de vendas futuras, o futuro ainda <strong>não existe</strong> no momento da inferência! Usar BiLSTM causaria vazamento causal grave.
          </p>
        </div>

        <div style={{ background: '#F0FDF4', border: '1px solid #BBF7D0', borderRadius: '8px', padding: '10px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#166534', fontWeight: 700, fontSize: '0.8rem' }}>
            <CheckCircle2 size={15} /> Onde BiLSTM é excelente?
          </div>
          <p style={{ fontSize: '0.74rem', color: '#14532D', marginTop: '4px', lineHeight: '1.35' }}>
            Em Processamento de Linguagem Natural (NLP), tradução, reconhecimento de voz e bioinformática (sequenciamento de DNA), onde o texto completo já está disponível.
          </p>
        </div>
      </div>
    </div>
  );
}

// 12. Demand Metrics Diagram
export function DemandMetricsDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '14px', height: '100%' }}>
      
      {/* WAPE */}
      <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
        <span className="card-header-badge pill-green">Padrão-Ouro no Varejo</span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>WAPE (Weighted MAPE)</h3>
        <p className="card-text" style={{ fontSize: '0.8rem' }}>
          Weighted Absolute Percentage Error (também conhecido como MAD/Mean ratio):
        </p>

        <div className="formula-highlight-card" style={{ padding: '8px', margin: '8px 0' }}>
          <div style={{ fontSize: '0.95rem' }}>
            <MathView math="\text{WAPE} = \frac{\sum_{t=1}^N |y_t - \hat{y}_t|}{\sum_{t=1}^N y_t}" displayMode={true} />
          </div>
        </div>

        <ul className="styled-list" style={{ fontSize: '0.78rem' }}>
          <li>Pondera o erro pelo volume total de vendas.</li>
          <li><strong>Imune à divisão por zero:</strong> funciona perfeitamente com dias de venda zero (<MathView math="y_t = 0" />).</li>
          <li>Fácil comunicação com diretores de Supply Chain.</li>
        </ul>
      </div>

      {/* MAPE */}
      <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
        <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#C2410C' }}>
          Cuidado com Divisão por Zero
        </span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>MAPE</h3>
        <p className="card-text" style={{ fontSize: '0.8rem' }}>
          Mean Absolute Percentage Error tradicional:
        </p>

        <div className="formula-highlight-card" style={{ padding: '8px', margin: '8px 0' }}>
          <div style={{ fontSize: '0.95rem' }}>
            <MathView math="\text{MAPE} = \frac{1}{N} \sum_{t=1}^N \left| \frac{y_t - \hat{y}_t}{y_t} \right|" displayMode={true} />
          </div>
        </div>

        <ul className="styled-list" style={{ fontSize: '0.78rem' }}>
          <li>Explode para <MathView math="\infty" /> quando há dias sem nenhuma venda (<MathView math="y_t = 0" />).</li>
          <li>Pune desproporcionalmente erros em produtos de baixíssimo volume (cauda longa).</li>
        </ul>
      </div>

      {/* RMSE */}
      <div className="content-card" style={{ borderTop: '4px solid #1BB5D8' }}>
        <span className="card-header-badge pill-cyan">Sensível a Grandes Erros</span>
        <h3 className="card-title" style={{ fontSize: '1.02rem' }}>RMSE & Huber Loss</h3>
        <p className="card-text" style={{ fontSize: '0.8rem' }}>
          Root Mean Squared Error para penalizar desvios extremos:
        </p>

        <div className="formula-highlight-card" style={{ padding: '8px', margin: '8px 0' }}>
          <div style={{ fontSize: '0.95rem' }}>
            <MathView math="\text{RMSE} = \sqrt{\frac{1}{N} \sum_{t=1}^N (y_t - \hat{y}_t)^2}" displayMode={true} />
          </div>
        </div>

        <ul className="styled-list" style={{ fontSize: '0.78rem' }}>
          <li>Penaliza com rigor desvios que causariam rupturas catastróficas de estoque.</li>
          <li>Durante o treino no PyTorch, usamos <MathView math="\text{SmoothL1Loss}" /> (Huber) para evitar que outliers estraguem os gradientes.</li>
        </ul>
      </div>

    </div>
  );
}

// 13. PyTorch Best Practices Diagram
export function PyTorchBestPracticesDiagram() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', height: '100%' }}>
      <div className="content-card" style={{ borderTop: '4px solid #0A345D' }}>
        <span className="card-header-badge pill-cyan">Checklist de Engenharia PyTorch</span>
        <h3 className="card-title">Padrão-Ouro para Treinamento Sequencial</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '6px' }}>
          <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>1. Inicialização e Reset de Estados:</strong><br/>
            Se processar amostras independentes no batch, reinicialize o estado oculto <MathView math="h_0 = 0" /> a cada lote (comportamento automático se não passar <MathView math="h_0" />).
          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>2. Gradient Clipping Obrigatório:</strong><br/>
            Sempre execute <MathView math="\text{torch.nn.utils.clip\_grad\_norm\_(model.parameters(), 1.0)}" /> antes de <MathView math="\text{optimizer.step()}" />.
          </div>

          <div style={{ background: '#F8FAFC', padding: '8px 12px', borderRadius: '6px', border: '1px solid #E2E8F0', fontSize: '0.76rem' }}>
            <strong style={{ color: '#0A345D' }}>3. Divisão Temporal Estrita (No Leakage):</strong><br/>
            O conjunto de validação e teste DEVE ser sempre o bloco cronológico futuro (ex: últimos 90 dias). Nunca use <MathView math="\text{train\_test\_split}" /> aleatório!
          </div>
        </div>
      </div>

      <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
        <span className="card-header-badge pill-green">Estrutura de Classe PyTorch Típica</span>
        <h3 className="card-title">Módulo LSTM para Forecasting</h3>

        <div className="code-box" style={{ fontSize: '0.72rem', lineHeight: '1.45' }}>
          <span className="kw">class</span> <span className="fn">DemandLSTM</span>(nn.<span className="fn">Module</span>):<br/>
          &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">__init__</span>(self, input_dim, hidden_dim, num_layers):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;super().<span className="fn">__init__</span>()<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.lstm = nn.<span className="fn">LSTM</span>(<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;input_dim, hidden_dim, num_layers,<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;batch_first=<span className="kw">True</span>, dropout=<span className="num">0.2</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;self.fc = nn.<span className="fn">Linear</span>(hidden_dim, <span className="num">1</span>)<br/><br/>
          &nbsp;&nbsp;<span className="kw">def</span> <span className="fn">forward</span>(self, x):<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;out, (hn, _) = self.<span className="fn">lstm</span>(x)<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="cm"># Usamos o último estado oculto:</span><br/>
          &nbsp;&nbsp;&nbsp;&nbsp;last_hidden = out[:, -<span className="num">1</span>, :]<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;<span className="kw">return</span> self.<span className="fn">fc</span>(last_hidden)
        </div>
      </div>
    </div>
  );
}

// 14. Roadmap Summary Diagram
export function RoadmapSummaryDiagram() {
  const steps = [
    { num: 1, title: 'Fundamentos & Neurônio', desc: 'Perceptron, tensores, autograd e forward pass na planilha.' },
    { num: 2, title: 'MLPs & Treinamento', desc: 'Backprop, estabilidade, otimizadores e regularização.' },
    { num: 3, title: 'Visão Computacional', desc: 'Convoluções 2D, pooling, canais e autoencoders.' },
    { num: 4, title: 'Avaliação & Métricas', desc: 'Matriz de confusão, custos de negócio e calibração.' },
    { num: 5, title: 'Sequências (LSTMs/GRUs)', desc: 'Memória temporal, portões e previsão de demanda em e-commerce.' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'space-between' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px' }}>
        {steps.map((s, idx) => (
          <div 
            key={idx} 
            className="content-card" 
            style={{ 
              padding: '12px', 
              borderTop: idx === 4 ? '4px solid #1BB5D8' : '4px solid #CBD5E1',
              background: idx === 4 ? 'linear-gradient(145deg, #F0F9FF 0%, #FFFFFF 100%)' : '#FFFFFF'
            }}
          >
            <span className={`card-header-badge ${idx === 4 ? 'pill-cyan' : ''}`} style={{ fontSize: '0.65rem' }}>
              Módulo {s.num} {idx === 4 && '• Atual'}
            </span>
            <h4 style={{ fontSize: '0.85rem', color: idx === 4 ? '#0A345D' : '#475569', margin: '4px 0' }}>{s.title}</h4>
            <p style={{ fontSize: '0.74rem', color: '#64748B', lineHeight: '1.3' }}>{s.desc}</p>
          </div>
        ))}
      </div>

      <div style={{ background: 'linear-gradient(135deg, #0A345D 0%, #061F38 100%)', color: '#FFFFFF', borderRadius: '10px', padding: '16px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div>
          <h3 style={{ fontSize: '1.05rem', color: '#64D9EF', fontFamily: 'var(--font-heading)' }}>
            Pronto para a Prática em Código!
          </h3>
          <p style={{ fontSize: '0.82rem', color: '#CBD5E1', marginTop: '2px' }}>
            Vamos ao Jupyter Notebook <code>aula_08_lstm_gru_demand_forecasting.ipynb</code> treinar modelos completos no PyTorch com dados da Kaggle.
          </p>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'rgba(27,181,216,0.2)', border: '1px solid #1BB5D8', padding: '8px 16px', borderRadius: '8px', fontWeight: 700, fontSize: '0.82rem', color: '#64D9EF' }}>
          <TrendingUp size={16} /> Hands-on PyTorch ➔
        </div>
      </div>
    </div>
  );
}
