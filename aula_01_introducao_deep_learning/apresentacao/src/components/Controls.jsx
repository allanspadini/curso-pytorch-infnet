import React from 'react';
import { ChevronLeft, ChevronRight, Grid, MessageSquare, Maximize, Play, Pause } from 'lucide-react';

export default function Controls({
  currentSlide,
  totalSlides,
  onPrev,
  onNext,
  onToggleOverview,
  onToggleNotes,
  onToggleFullscreen,
  isPlaying,
  onTogglePlay
}) {
  return (
    <div className="controls-bar">
      <button 
        className="ctrl-btn" 
        onClick={onPrev} 
        disabled={currentSlide === 1}
        title="Slide Anterior (Seta Esquerda)"
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
        title="Próximo Slide (Seta Direita / Espaço)"
      >
        <ChevronRight size={20} />
      </button>

      <div style={{ width: '1px', height: '18px', background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />

      <button 
        className="ctrl-btn" 
        onClick={onTogglePlay}
        title={isPlaying ? 'Pausar Apresentação' : 'Reprodução Automática'}
      >
        {isPlaying ? <Pause size={18} /> : <Play size={18} />}
      </button>

      <button 
        className="ctrl-btn" 
        onClick={onToggleOverview}
        title="Visão Geral de Todos os Slides (G)"
      >
        <Grid size={18} />
      </button>

      <button 
        className="ctrl-btn" 
        onClick={onToggleNotes}
        title="Falas do Apresentador (N)"
      >
        <MessageSquare size={18} />
      </button>

      <button 
        className="ctrl-btn" 
        onClick={onToggleFullscreen}
        title="Tela Cheia (F)"
      >
        <Maximize size={18} />
      </button>
    </div>
  );
}
