import React from 'react';
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2 } from 'lucide-react';

export default function Controls({ 
  currentSlide, 
  totalSlides, 
  onNext, 
  onPrev, 
  isPlaying, 
  onTogglePlay,
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
        <ChevronLeft size={20} />
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
        <ChevronRight size={20} />
      </button>

      <div style={{ width: '1px', height: '20px', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      <button 
        className="ctrl-btn" 
        onClick={onTogglePlay} 
        title={isPlaying ? "Pausar Apresentação" : "Iniciar Autoplay (7s por slide)"}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button 
        className="ctrl-btn" 
        onClick={onToggleFullscreen} 
        title="Alternar Tela Cheia (Tecla F)"
      >
        <Maximize2 size={18} />
      </button>
    </div>
  );
}
