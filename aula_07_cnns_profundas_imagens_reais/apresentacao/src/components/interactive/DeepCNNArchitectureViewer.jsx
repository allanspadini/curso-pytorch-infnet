import React, { useState } from 'react';
import { Layers, Eye, ShieldCheck, Cpu } from 'lucide-react';

export default function DeepCNNArchitectureViewer() {
  const [selectedBlock, setSelectedBlock] = useState(0);

  const blocks = [
    {
      name: 'Entrada RGB',
      tensor: '3 × 128 × 128',
      desc: 'Imagem foliar colorida padronizada com transforms e Data Augmentation.',
      details: 'Formato NCHW: Batch, 3 canais de cor (Red, Green, Blue), 128 pixels de altura e largura.',
      color: '#1BB5D8'
    },
    {
      name: 'Bloco Convolucional 1',
      tensor: '32 × 64 × 64',
      desc: 'Conv2d(3, 32, k=3, p=1) + BatchNorm2d + ReLU + MaxPool2d(2)',
      details: 'Detecta bordas primitivas, contrastes de manchas e contornos de folhas. O pooling corta resolução pela metade.',
      color: '#0A345D'
    },
    {
      name: 'Bloco Convolucional 2',
      tensor: '64 × 32 × 32',
      desc: 'Conv2d(32, 64, k=3, p=1) + BatchNorm2d + ReLU + MaxPool2d(2)',
      details: 'Combina bordas em texturas foliares, nervuras e padrões de necrose. Dobra o número de canais para 64.',
      color: '#7CB342'
    },
    {
      name: 'Bloco Convolucional 3',
      tensor: '128 × 16 × 16',
      desc: 'Conv2d(64, 128, k=3, p=1) + BatchNorm2d + ReLU + MaxPool2d(2)',
      details: 'Captura conceitos semânticos complexos de patologias específicas (ferrugem, queima bacteriana, míldio).',
      color: '#AB47BC'
    },
    {
      name: 'Cabeça Densa (Classificador)',
      tensor: '128×16×16 (32.768) → 512 → Classes',
      desc: 'Flatten + Linear(32768, 512) + Dropout(0.4) + Linear(512, N)',
      details: 'O Dropout desliga 40% das ativações para impedir memorização. A saída produz logits para nn.CrossEntropyLoss().',
      color: '#FF7043'
    }
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      height: '100%',
      justifyContent: 'center'
    }}>
      {/* Pipeline Blocks Horizontal */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: '12px'
      }}>
        {blocks.map((b, idx) => {
          const isSelected = selectedBlock === idx;
          return (
            <div
              key={idx}
              onClick={() => setSelectedBlock(idx)}
              style={{
                background: isSelected ? 'rgba(27, 181, 216, 0.1)' : '#FFFFFF',
                border: isSelected ? `2px solid ${b.color}` : '1px solid #E2E8F0',
                borderRadius: '12px',
                padding: '14px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: isSelected ? '0 4px 14px rgba(0,0,0,0.1)' : '0 1px 3px rgba(0,0,0,0.05)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: '140px'
              }}
            >
              <div>
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: '700',
                  color: b.color,
                  background: `${b.color}20`,
                  padding: '3px 8px',
                  borderRadius: '12px',
                  marginBottom: '8px'
                }}>
                  Etapa 0{idx + 1}
                </span>
                <h4 style={{ fontSize: '0.95rem', color: '#0A345D', marginBottom: '6px' }}>{b.name}</h4>
              </div>
              <div style={{
                fontSize: '0.85rem',
                fontFamily: 'monospace',
                background: '#F1F5F9',
                padding: '4px 6px',
                borderRadius: '6px',
                color: '#334155'
              }}>
                {b.tensor}
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Block Detail Card */}
      <div style={{
        background: '#FFFFFF',
        borderLeft: `5px solid ${blocks[selectedBlock].color}`,
        borderRadius: '12px',
        padding: '20px 24px',
        boxShadow: '0 4px 15px rgba(0,0,0,0.06)',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Layers size={22} color={blocks[selectedBlock].color} />
          <h3 style={{ fontSize: '1.25rem', color: '#0A345D', margin: 0 }}>
            {blocks[selectedBlock].name}
          </h3>
          <span style={{
            fontSize: '0.85rem',
            fontFamily: 'monospace',
            background: '#F8FAFC',
            border: '1px solid #CBD5E1',
            padding: '2px 8px',
            borderRadius: '6px',
            color: '#0F172A',
            marginLeft: 'auto'
          }}>
            Dimensão: {blocks[selectedBlock].tensor}
          </span>
        </div>
        <p style={{ fontSize: '1rem', color: '#334155', fontWeight: '600', margin: 0 }}>
          {blocks[selectedBlock].desc}
        </p>
        <p style={{ fontSize: '0.95rem', color: '#64748B', lineHeight: '1.5', margin: 0 }}>
          {blocks[selectedBlock].details}
        </p>
      </div>
    </div>
  );
}
