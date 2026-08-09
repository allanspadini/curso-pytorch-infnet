import React from 'react';
import { X } from 'lucide-react';

export default function OverviewModal({ isOpen, onClose, slides, currentSlide, onSelectSlide }) {
  if (!isOpen) return null;

  return (
    <div className="overview-overlay" onClick={onClose}>
      <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }} onClick={e => e.stopPropagation()}>
        <div className="overview-header">
          <h3>⣿ Visão Geral dos Slides ({slides.length} Slides)</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}>
            <X size={28} />
          </button>
        </div>

        <div className="overview-grid">
          {slides.map((s, idx) => {
            const isCurrent = currentSlide === idx + 1;
            return (
              <div
                key={s.id}
                className={`overview-item ${isCurrent ? 'active' : ''}`}
                onClick={() => {
                  onSelectSlide(idx + 1);
                  onClose();
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span className="overview-num">#{s.id}</span>
                  {s.component && (
                    <span style={{ fontSize: '0.65rem', background: '#1BB5D8', color: '#FFF', padding: '2px 6px', borderRadius: '10px', fontWeight: '700' }}>
                      INTERATIVO
                    </span>
                  )}
                </div>
                <div className="overview-title">{s.title}</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
