import React, { useState } from 'react';
import { Layers, Grid, Zap, ShieldCheck } from 'lucide-react';

export default function DenseVsConvAutoencoder() {
  const [selectedArch, setSelectedArch] = useState('conv');

  return (
    <div className="interactive-container">
      <div className="interactive-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Layers size={20} color="#1BB5D8" />
          <h3 style={{ color: '#0A345D', fontSize: '1.05rem', fontWeight: 700 }}>
            Comparativo de Arquitetura: Denso (MLP) vs. Convolucional (Conv2D)
          </h3>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button
            className={`btn-interactive ${selectedArch === 'dense' ? 'active' : ''}`}
            onClick={() => setSelectedArch('dense')}
          >
            Autoencoder Denso (MLP)
          </button>
          <button
            className={`btn-interactive ${selectedArch === 'conv' ? 'active' : ''}`}
            onClick={() => setSelectedArch('conv')}
          >
            ConvAutoencoder (Conv2D)
          </button>
        </div>
      </div>

      <div className="interactive-body" style={{ flexDirection: 'column', gap: '16px', width: '100%' }}>
        {selectedArch === 'dense' ? (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#FFF7ED', border: '1px solid #FFEDD5', borderRadius: '8px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Zap color="#FF7043" size={24} />
              <div>
                <strong style={{ color: '#9A3412', fontSize: '0.95rem' }}>Abordagem Densa (Linear)</strong>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Converte a imagem 2D (ex: 28x28 = 784) em um vetor 1D plano (`Flatten`). Cada pixel é tratado como uma variável isolada.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="content-card" style={{ borderLeft: '4px solid #FF7043' }}>
                <h4 style={{ color: '#0A345D', fontSize: '0.95rem', marginBottom: '8px' }}>⚠️ Problemas do Estiramento (Flattening)</h4>
                <ul className="styled-list" style={{ fontSize: '0.85rem' }}>
                  <li>Perda completa da matriz e vizinhança espacial 2D.</li>
                  <li>Explosão de parâmetros na primeira camada linear ($784 \times 512 + 512 = 401.920$ pesos só na entrada).</li>
                  <li>Incapaz de generalizar para pequenas translações ou rotações da imagem.</li>
                </ul>
              </div>

              <div className="content-card" style={{ borderLeft: '4px solid #AB47BC' }}>
                <h4 style={{ color: '#0A345D', fontSize: '0.95rem', marginBottom: '8px' }}>📊 Estatísticas Simuladas (MNIST)</h4>
                <div style={{ fontSize: '0.88rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Total de Parâmetros: <strong style={{ color: '#FF7043' }}>~550.000</strong></div>
                  <div>Preservação Espacial: <strong style={{ color: '#EF4444' }}>Baixa (1D apenas)</strong></div>
                  <div>Custo Computacional: <strong style={{ color: '#FF7043' }}>Alto em imagens grandes</strong></div>
                  <div>Qualidade de Reconstrução: <strong style={{ color: '#F59E0B' }}>Média / Borrada</strong></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div style={{ background: '#F0F9FF', border: '1px solid #BAE6FD', borderRadius: '8px', padding: '14px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <ShieldCheck color="#1BB5D8" size={24} />
              <div>
                <strong style={{ color: '#0E7490', fontSize: '0.95rem' }}>Abordagem Convolucional (Conv2D)</strong>
                <p style={{ fontSize: '0.85rem', color: '#64748B' }}>
                  Mantém a estrutura matricial da imagem `(C, H, W)`. Usa filtros convolucionais para downsampling e convoluções transpostas (`ConvTranspose2d`) para upsampling.
                </p>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
              <div className="content-card" style={{ borderLeft: '4px solid #1BB5D8' }}>
                <h4 style={{ color: '#0A345D', fontSize: '0.95rem', marginBottom: '8px' }}>✨ Vantagens Estruturais</h4>
                <ul className="styled-list" style={{ fontSize: '0.85rem' }}>
                  <li>Preserva totalmente a hierarquia topológica e espacial 2D.</li>
                  <li>Compartilhamento de pesos (*weight sharing*): drástica redução na contagem de parâmetros.</li>
                  <li>Upsampling limpo com `ConvTranspose2d` ou `Upsample + Conv2d`.</li>
                </ul>
              </div>

              <div className="content-card" style={{ borderLeft: '4px solid #7CB342' }}>
                <h4 style={{ color: '#0A345D', fontSize: '0.95rem', marginBottom: '8px' }}>📊 Estatísticas Simuladas (MNIST)</h4>
                <div style={{ fontSize: '0.88rem', color: '#1E293B', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div>Total de Parâmetros: <strong style={{ color: '#7CB342' }}>~45.000 (12x menor!)</strong></div>
                  <div>Preservação Espacial: <strong style={{ color: '#10B981' }}>Excelente (Matriz 2D)</strong></div>
                  <div>Custo Computacional: <strong style={{ color: '#10B981' }}>Altamente Eficiente</strong></div>
                  <div>Qualidade de Reconstrução: <strong style={{ color: '#10B981' }}>Nítida e Precisa</strong></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Visual Architecture Schematic */}
        <div style={{ width: '100%', background: '#F8FAFC', padding: '12px 20px', borderRadius: '8px', border: '1px solid #E2E8F0', fontSize: '0.82rem', color: '#334155' }}>
          <strong>Arquitetura Convolucional Típica:</strong><br />
          <code>Input (1x28x28) ➔ Conv2d(16, s=2) ➔ Conv2d(32, s=2) ➔ Bottleneck (Z=32) ➔ ConvTranspose2d(16) ➔ ConvTranspose2d(1) ➔ Output (1x28x28)</code>
        </div>
      </div>
    </div>
  );
}
