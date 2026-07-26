import React from 'react';
import { X } from 'lucide-react';

export default function NotesDrawer({ isOpen, onClose, currentSlideData }) {
  if (!isOpen) return null;

  return (
    <div className="notes-drawer">
      <div className="notes-header">
        <span>🎙️ Falas do Apresentador (Slide {currentSlideData.id})</span>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#FFF', cursor: 'pointer' }}
        >
          <X size={20} />
        </button>
      </div>

      <div className="notes-content">
        <h4>{currentSlideData.title}</h4>
        {currentSlideData.subtitle && (
          <div style={{ fontSize: '0.85rem', color: '#1BB5D8', fontWeight: '600', marginBottom: '16px' }}>
            {currentSlideData.subtitle}
          </div>
        )}

        <div style={{ background: '#F8FAFC', borderLeft: '4px solid #0A345D', padding: '14px', borderRadius: '4px', fontSize: '0.95rem', lineHeight: '1.6', color: '#1E293B' }}>
          "{currentSlideData.notes}"
        </div>

        <div style={{ marginTop: '24px', fontSize: '0.8rem', color: '#64748B' }}>
          💡 Tip: Utilize estas notas como roteiro de narração para cada slide.
        </div>
      </div>
    </div>
  );
}
