import React from 'react';

export default function Footer({ currentSlide, totalSlides, onOpenNotes, onOpenOverview }) {
  return (
    <footer className="slide-footer">
      <div className="footer-left">
        Redes Neurais Profundas (Deep Learning e Visão Computacional) | Instituto Infnet
      </div>

      <div className="footer-right" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <button 
          onClick={onOpenNotes}
          style={{ background: 'none', border: 'none', color: '#0A345D', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          📝 Falas do Autor
        </button>

        <button 
          onClick={onOpenOverview}
          style={{ background: 'none', border: 'none', color: '#0A345D', cursor: 'pointer', fontWeight: '600', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '4px' }}
        >
          ⣿ Geral de Slides
        </button>

        <span style={{ fontWeight: '700', color: '#0A345D' }}>
          Slide {currentSlide} / {totalSlides}
        </span>
      </div>
    </footer>
  );
}
