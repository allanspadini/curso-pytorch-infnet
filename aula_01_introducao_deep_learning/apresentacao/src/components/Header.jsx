import React from 'react';
import { getAssetUrl } from '../utils/assetHelper';

export default function Header({ title, subtitle, showLogo = true }) {
  return (
    <>
      {/* Top Cyan Wave Accent SVG matching Template de Slides para Aulas.odp */}
      <svg className="odp-header-wave" viewBox="0 0 1366 70" preserveAspectRatio="none" fill="none">
        <path 
          d="M0 0 H1366 V35 Q1100 65 800 35 Q500 5 200 45 Q100 55 0 35 Z" 
          fill="url(#wave-gradient)" 
          opacity="0.85" 
        />
        <defs>
          <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#1BB5D8" stopOpacity="0.4" />
            <stop offset="50%" stopColor="#64D9EF" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#1BB5D8" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>

      {/* Official Instituto Infnet Logo top-right */}
      {showLogo && (
        <img 
          src={getAssetUrl('/infnet_logo.png')} 
          alt="Instituto Infnet 1994" 
          className="odp-logo"
        />
      )}

      {/* Slide Header Title */}
      {title && (
        <div className="slide-title-header">
          <h2>{title}</h2>
          {subtitle && <div className="subtitle">{subtitle}</div>}
        </div>
      )}
    </>
  );
}
