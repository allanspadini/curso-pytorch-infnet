import React, { useState, useEffect, useRef } from 'react';
import { slidesData } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import MathView from './components/MathView';
import { getAssetUrl } from './utils/assetHelper';

export default function App() {
  const getInitialSlideIndex = () => {
    const params = new URLSearchParams(window.location.search);
    const slideParam = params.get('slide');
    if (slideParam) {
      const parsed = parseInt(slideParam, 10) - 1;
      if (!isNaN(parsed) && parsed >= 0 && parsed < slidesData.length) {
        return parsed;
      }
    }
    return 0;
  };

  const [currentSlideIndex, setCurrentSlideIndex] = useState(getInitialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slidesData.length;
  const slide = slidesData[currentSlideIndex];
  const containerRef = useRef(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    url.searchParams.set('slide', (currentSlideIndex + 1).toString());
    window.history.replaceState({}, '', url.toString());
  }, [currentSlideIndex]);

  useEffect(() => {
    const handleFSChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };
    document.addEventListener('fullscreenchange', handleFSChange);
    document.addEventListener('webkitfullscreenchange', handleFSChange);
    return () => {
      document.removeEventListener('fullscreenchange', handleFSChange);
      document.removeEventListener('webkitfullscreenchange', handleFSChange);
    };
  }, []);

  const nextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') {
        e.preventDefault();
        nextSlide();
      } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
        e.preventDefault();
        prevSlide();
      } else if (e.key === 'Home') {
        e.preventDefault();
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setCurrentSlideIndex(totalSlides - 1);
      } else if (e.key.toLowerCase() === 'n') {
        e.preventDefault();
        setShowNotes((prev) => !prev);
      } else if (e.key.toLowerCase() === 'g') {
        e.preventDefault();
        setShowOverview((prev) => !prev);
      } else if (e.key.toLowerCase() === 'f') {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  useEffect(() => {
    let interval = null;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= totalSlides - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 6000);
    }
    return () => clearInterval(interval);
  }, [isPlaying, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      if (containerRef.current?.requestFullscreen) {
        containerRef.current.requestFullscreen();
      } else if (containerRef.current?.webkitRequestFullscreen) {
        containerRef.current.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  };

  const renderSlideContent = () => {
    if (!slide) return null;

    switch (slide.type) {
      case 'title':
        return (
          <div className="title-slide-container">
            <div className="title-slide-box">
              <h1>{slide.title}</h1>
              <div className="title-subtitle">{slide.subtitle}</div>
            </div>
            <div className="title-slide-info">
              <div>Instrutor: <span className="inst-name">{slide.instructor}</span></div>
              <div className="course-name">{slide.course}</div>
            </div>
          </div>
        );

      case 'instructor':
        return (
          <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '36px', alignItems: 'center', flex: 1 }}>
            <div style={{ background: 'var(--infnet-dark-blue)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: '#FFF', boxShadow: 'var(--shadow-md)' }}>
              <img 
                src={getAssetUrl(slide.photo || '/allan_spadini.jpg')} 
                alt={slide.name} 
                style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--infnet-cyan)', margin: '0 auto 16px', display: 'block' }}
              />
              <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', color: '#FFF' }}>{slide.name}</h3>
              <p style={{ color: 'var(--infnet-cyan-light)', fontWeight: '600', fontSize: '0.95rem', marginTop: '4px' }}>{slide.role}</p>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slide.highlights?.map((h, idx) => (
                <div key={idx} className="content-card" style={{ padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div className="card-header-badge" style={{ marginBottom: 0, minWidth: '140px', textAlign: 'center' }}>
                    {h.badge}
                  </div>
                  <div>
                    <div style={{ fontWeight: '800', color: 'var(--infnet-dark-blue)', fontSize: '1.15rem' }}>{h.title}</div>
                    <div style={{ color: '#475569', fontSize: '1rem', marginTop: '4px' }}>{h.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${slide.steps?.length || 4}, 1fr)`, gap: '16px' }}>
              {slide.steps?.map((step, idx) => (
                <div key={idx} className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', gap: '12px' }}>
                  <div>
                    <span className="card-header-badge">{step.num}</span>
                    <h3 className="card-title" style={{ fontSize: '1.2rem' }}>{step.title}</h3>
                  </div>
                  <p className="card-text" style={{ fontSize: '0.98rem', color: '#475569' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, justifyContent: 'center' }}>
            <div className="math-box" style={{ background: '#FFF', border: '2px solid var(--infnet-cyan)', boxShadow: 'var(--shadow-md)', padding: '24px' }}>
              <MathView math={slide.formula} block={true} />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(slide.variables?.length || 3, 4)}, 1fr)`, gap: '16px' }}>
              {slide.variables?.map((v, idx) => {
                const isLatex = v.name.includes('\\') || v.name.includes('_') || v.name.includes('^');
                return (
                  <div key={idx} className="content-card" style={{ padding: '20px' }}>
                    <div style={{ fontFamily: 'Fira Code, monospace', fontWeight: '800', color: 'var(--infnet-cyan)', fontSize: '1.1rem', marginBottom: '8px' }}>
                      {isLatex ? <MathView math={v.name} block={false} /> : v.name}
                    </div>
                    <div style={{ color: '#334155', fontSize: '0.98rem', lineHeight: '1.5' }}>
                      {v.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'image-text':
        return (
          <div className="image-text-layout">
            <div className="slide-image-frame">
              <img src={getAssetUrl(slide.image)} alt={slide.title} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slide.badge && <span className="badge-tag badge-cyan">{slide.badge}</span>}
              <ul className="styled-list">
                {slide.bullets?.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="grid-2">
            <div className="content-card" style={{ borderTop: '4px solid #FF7043' }}>
              <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#D84315' }}>
                {slide.cardLeft.badge}
              </span>
              <h3 className="card-title">{slide.cardLeft.title}</h3>
              <ul className="styled-list">
                {slide.cardLeft.bullets?.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="content-card" style={{ borderTop: '4px solid #7CB342' }}>
              <span className="card-header-badge" style={{ background: 'rgba(124,179,66,0.15)', color: '#2E7D32' }}>
                {slide.cardRight.badge}
              </span>
              <h3 className="card-title">{slide.cardRight.title}</h3>
              <ul className="styled-list">
                {slide.cardRight.bullets?.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div style={{ flex: 1, overflowY: 'auto' }}>
            {slide.component}
          </div>
        );

      default:
        return (
          <div className="content-card">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
          </div>
        );
    }
  };

  return (
    <div ref={containerRef} className={`app-container ${isFullscreen ? 'is-fullscreen' : ''}`}>
      <div className="slide-viewport">
        <main className="slide-body">
          <Header 
            title={slide?.type !== 'title' ? slide?.title : undefined} 
            subtitle={slide?.type !== 'title' ? slide?.subtitle : undefined} 
          />
          {renderSlideContent()}
        </main>

        <Footer
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          onOpenNotes={() => setShowNotes(true)}
          onOpenOverview={() => setShowOverview(true)}
        />

        <Controls
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          onPrev={prevSlide}
          onNext={nextSlide}
          isAutoplay={isPlaying}
          onToggleAutoplay={() => setIsPlaying((prev) => !prev)}
          onToggleFullscreen={toggleFullscreen}
        />

        {showNotes && (
          <NotesDrawer
            notes={slide?.notes}
            currentSlideTitle={`Slide ${currentSlideIndex + 1}: ${slide?.title}`}
            onClose={() => setShowNotes(false)}
          />
        )}

        {showOverview && (
          <OverviewModal
            slides={slidesData}
            currentSlide={currentSlideIndex + 1}
            onSelectSlide={(idx) => setCurrentSlideIndex(idx - 1)}
            onClose={() => setShowOverview(false)}
          />
        )}
      </div>
    </div>
  );
}

