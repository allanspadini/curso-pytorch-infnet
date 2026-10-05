import React, { useState, useEffect, useRef } from 'react';
import { slidesData } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
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

  const isPrintMode = new URLSearchParams(window.location.search).get('print') === 'true';

  const [currentSlideIndex, setCurrentSlideIndex] = useState(getInitialSlideIndex);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slidesData.length;
  const slide = slidesData[currentSlideIndex];
  const containerRef = useRef(null);

  useEffect(() => {
    if (!isPrintMode) {
      const url = new URL(window.location.href);
      url.searchParams.set('slide', (currentSlideIndex + 1).toString());
      window.history.replaceState({}, '', url.toString());
    }
  }, [currentSlideIndex, isPrintMode]);

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
      }, 7000);
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

  const renderSlideContentFor = (slideItem) => {
    if (!slideItem) return null;

    switch (slideItem.type) {
      case 'title':
        return (
          <div className="title-slide-container">
            <div className="title-slide-box">
              <h1>{slideItem.title}</h1>
              <div className="title-subtitle">{slideItem.subtitle}</div>
            </div>
            <div className="title-slide-info">
              <div>Instrutor: <span className="inst-name">{slideItem.instructor}</span></div>
              <div className="course-name">{slideItem.course}</div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-start', gap: '12px' }}>
            {slideItem.visual && (
              <div style={{ width: '100%' }}>
                {slideItem.visual}
              </div>
            )}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${slideItem.steps?.length || 5}, 1fr)`, gap: '12px' }}>
              {slideItem.steps?.map((step, idx) => (
                <div key={idx} className="content-card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '14px 16px' }}>
                  <div>
                    <span className="card-header-badge" style={{ background: 'rgba(27,181,216,0.15)', color: '#0E7490' }}>
                      Passo {step.num}
                    </span>
                    <h3 className="card-title" style={{ fontSize: '0.98rem', marginTop: '4px' }}>{step.title}</h3>
                  </div>
                  <p className="card-text" style={{ fontSize: '0.8rem', color: '#64748B', marginTop: '4px', lineHeight: '1.3' }}>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="grid-2">
            <div className="content-card" style={{ borderTop: '4px solid #FF7043', display: 'flex', flexDirection: 'column' }}>
              <span className="card-header-badge" style={{ background: 'rgba(255,112,67,0.15)', color: '#D84315' }}>
                {slideItem.cardLeft.badge}
              </span>
              <h3 className="card-title">{slideItem.cardLeft.title}</h3>
              {slideItem.cardLeft.visual && (
                <div style={{ margin: '8px 0' }}>
                  {slideItem.cardLeft.visual}
                </div>
              )}
              <ul className="styled-list">
                {slideItem.cardLeft.bullets?.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>

            <div className="content-card" style={{ borderTop: '4px solid #7CB342', display: 'flex', flexDirection: 'column' }}>
              <span className="card-header-badge" style={{ background: 'rgba(124,179,66,0.15)', color: '#2E7D32' }}>
                {slideItem.cardRight.badge}
              </span>
              <h3 className="card-title">{slideItem.cardRight.title}</h3>
              {slideItem.cardRight.visual && (
                <div style={{ margin: '8px 0' }}>
                  {slideItem.cardRight.visual}
                </div>
              )}
              <ul className="styled-list">
                {slideItem.cardRight.bullets?.map((b, idx) => (
                  <li key={idx}>{b}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div style={{ height: '100%', width: '100%' }}>
            {slideItem.component}
          </div>
        );

      default:
        return (
          <div className="content-card">
            <h2>{slideItem.title}</h2>
            <p>{slideItem.subtitle}</p>
          </div>
        );
    }
  };

  if (isPrintMode) {
    return (
      <div className="print-mode-container">
        {slidesData.map((slideItem, index) => (
          <div key={slideItem.id || index} className="print-slide-page">
            <div className="slide-viewport">
              <Header 
                title={slideItem.type !== 'title' ? slideItem.title : undefined} 
                subtitle={slideItem.type !== 'title' ? slideItem.subtitle : undefined} 
              />
              
              <main className="slide-body">
                {renderSlideContentFor(slideItem)}
              </main>

              <Footer
                currentSlide={index + 1}
                totalSlides={totalSlides}
              />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`app-container ${isFullscreen ? 'is-fullscreen' : ''}`}>
      <div className="slide-viewport">
        <Header 
          title={slide?.type !== 'title' ? slide?.title : undefined} 
          subtitle={slide?.type !== 'title' ? slide?.subtitle : undefined} 
        />
        
        <main className="slide-body">
          {renderSlideContentFor(slide)}
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
