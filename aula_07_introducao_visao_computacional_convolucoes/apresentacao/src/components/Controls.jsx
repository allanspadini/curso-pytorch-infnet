import React from 'react';

export default function Controls({ 
  currentSlide, 
  totalSlides, 
  onPrev, 
  onNext, 
  isAutoplay, 
  onToggleAutoplay,
  onToggleFullscreen
}) {
  return (
    <div className="controls-bar">
      <button 
        className="ctrl-btn" 
        onClick={onPrev} 
        disabled={currentSlide === 1}
        title="Slide Anterior (Seta Esquerda / PageUp)"
      >
        ◀
      </button>

      <span className="slide-counter-badge">
        {currentSlide} / {totalSlides}
      </span>

      <button 
        className="ctrl-btn" 
        onClick={onNext} 
        disabled={currentSlide === totalSlides}
        title="Próximo Slide (Seta Direita / Espaço / PageDown)"
      >
        ▶
      </button>

      <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      <button 
        className="ctrl-btn" 
        onClick={onToggleAutoplay}
        style={{ color: isAutoplay ? '#64D9EF' : '#FFFFFF' }}
        title="Modo Apresentação Automática (Autoplay)"
      >
        {isAutoplay ? '⏸' : '▶️'}
      </button>

      <button 
        className="ctrl-btn" 
        onClick={onToggleFullscreen}
        title="Tela Cheia (Tecla F)"
      >
        ⛶
      </button>
    </div>
  );
}
