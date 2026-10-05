import React from 'react';
import { X } from 'lucide-react';

export default function NotesDrawer({ notes, currentSlideTitle, onClose }) {
  return (
    <div className="notes-drawer">
      <div className="notes-header">
        <div>{currentSlideTitle}</div>
        <button onClick={onClose} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
          <X size={18} />
        </button>
      </div>
      <div className="notes-content">
        <p style={{ whiteSpace: 'pre-wrap' }}>{notes || 'Nenhuma fala do apresentador registrada para este slide.'}</p>
      </div>
    </div>
  );
}
