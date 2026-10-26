import React from 'react';

export default function NotesDrawer({ notes, onClose, currentSlideTitle }) {
  return (
    <div className="notes-drawer">
      <div className="notes-header">
        <span>📝 Roteiro de Narração do Professor</span>
        <button 
          onClick={onClose} 
          style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', fontSize: '1.2rem' }}
        >
          ✕
        </button>
      </div>
      <div className="notes-content">
        <h4>{currentSlideTitle}</h4>
        <hr style={{ margin: '10px 0', border: 'none', borderTop: '1px solid #E2E8F0' }} />
        <p style={{ whiteSpace: 'pre-line' }}>
          {notes || "Nenhuma nota inserida para este slide."}
        </p>
      </div>
    </div>
  );
}
