import React from 'react';
import { BookOpen, Grid } from 'lucide-react';

export default function Footer({ currentSlide, totalSlides, onOpenNotes, onOpenOverview }) {
  return (
    <footer className="slide-footer">
      <div className="footer-left">
        Instituto Infnet • Redes Neurais Profundas e Visão Computacional (Aula 08)
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        {onOpenNotes && (
          <button onClick={onOpenNotes} className="btn-interactive" title="Falas do Apresentador (Atalho: N)">
            <BookOpen size={14} /> Falas (N)
          </button>
        )}
        {onOpenOverview && (
          <button onClick={onOpenOverview} className="btn-interactive" title="Visão Geral dos Slides (Atalho: G)">
            <Grid size={14} /> Slides (G)
          </button>
        )}
        <div style={{ fontWeight: 600, color: '#0A345D' }}>
          Slide {currentSlide} / {totalSlides}
        </div>
      </div>
    </footer>
  );
}
