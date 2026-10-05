import React from 'react';

export default function OverviewModal({ slides, currentSlide, onSelectSlide, onClose }) {
  return (
    <div className="overview-overlay" onClick={onClose}>
      <div className="overview-header" onClick={e => e.stopPropagation()}>
        <h3> Visão Geral dos Slides da Aula 04</h3>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '1.5rem' }}
        >
          ✕
        </button>
      </div>

      <div className="overview-grid" onClick={e => e.stopPropagation()}>
        {slides.map((slide, index) => {
          const slideNum = index + 1;
          const isActive = slideNum === currentSlide;
          return (
            <div 
              key={slide.id || index} 
              className={`overview-item ${isActive ? 'active' : ''}`}
              onClick={() => {
                onSelectSlide(slideNum);
                onClose();
              }}
            >
              <div className="overview-num">Slide {slideNum}</div>
              <div className="overview-title">{slide.title || 'Sem título'}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
