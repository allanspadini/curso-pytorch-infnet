import React from 'react';

export default function Header({ title, subtitle }) {
  return (
    <header style={{ position: 'relative', width: '100%', height: '60px' }}>
      <svg className="odp-header-wave" viewBox="0 0 1366 65" fill="none" preserveAspectRatio="none">
        <path d="M0 0H1366V45C1200 60 1000 35 800 50C600 65 400 40 0 55V0Z" fill="#1BB5D8" fillOpacity="0.15" />
        <path d="M0 0H1366V35C1150 50 950 25 750 40C550 55 350 30 0 45V0Z" fill="#0A345D" fillOpacity="0.08" />
      </svg>
      
      {title && (
        <div className="slide-title-header">
          <h2>{title}</h2>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      )}

      <img src="./infnet_logo.png" alt="Infnet" className="odp-logo" onError={(e) => { e.target.style.display = 'none'; }} />
    </header>
  );
}
