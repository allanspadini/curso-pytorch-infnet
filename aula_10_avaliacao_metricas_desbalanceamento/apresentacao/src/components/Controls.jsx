import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize } from 'lucide-react';

export default function Controls({ currentSlide, totalSlides, onPrev, onNext, isAutoplay, onToggleAutoplay, onToggleFullscreen }) {
  return (
    <div className="controls-bar">
      <button className="ctrl-btn" onClick={onPrev} disabled={currentSlide <= 1} title="Slide Anterior (Seta Esquerda / PageUp)">
        <ChevronLeft size={18} />
      </button>

      <span className="slide-counter-badge">
        {currentSlide} / {totalSlides}
      </span>

      <button className="ctrl-btn" onClick={onNext} disabled={currentSlide >= totalSlides} title="Próximo Slide (Seta Direita / Espaço / PageDown)">
        <ChevronRight size={18} />
      </button>

      <div style={{ width: '1px', height: '16px', background: 'rgba(255,255,255,0.2)' }} />

      <button className="ctrl-btn" onClick={onToggleAutoplay} title={isAutoplay ? "Pausar Autoplay" : "Iniciar Autoplay"}>
        {isAutoplay ? <Pause size={16} /> : <Play size={16} />}
      </button>

      <button className="ctrl-btn" onClick={onToggleFullscreen} title="Modo Tela Cheia (Atalho: F)">
        <Maximize size={16} />
      </button>
    </div>
  );
}
