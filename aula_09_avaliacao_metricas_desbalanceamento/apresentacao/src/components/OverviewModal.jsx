import React from 'react';
import { X } from 'lucide-react';

export default function OverviewModal({ slides, currentSlide, onSelectSlide, onClose }) {
  return (
    <div className="overview-overlay">
      <div className="overview-header">
        <h2>Visão Geral dos Slides</h2>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={24} />
        </button>
      </div>

      <div className="overview-grid">
        {slides.map((s, idx) => (
          <div
            key={s.id || idx}
            className={`overview-item ${currentSlide === idx + 1 ? 'active' : ''}`}
            onClick={() => {
              onSelectSlide(idx + 1);
              onClose();
            }}
          >
            <div className="overview-num">Slide {idx + 1}</div>
            <div className="overview-title">{s.title || `Slide ${idx + 1}`}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
