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
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const [showOverview, setShowOverview] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const totalSlides = slidesData.length;
  const slide = slidesData[currentSlideIndex];
  const containerRef = useRef(null);

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

  // Next / Prev navigation
  const nextSlide = () => {
    setCurrentSlideIndex((prev) => Math.min(prev + 1, totalSlides - 1));
  };

  const prevSlide = () => {
    setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
  };

  // Keyboard navigation
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

  // Autoplay timer
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
      }, 5000);
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
          <div className="slide-layout title-layout">
            <div className="title-hero-content">
              <span className="badge-pill title-badge">{slide.course}</span>
              <h1 className="main-title">{slide.title}</h1>
              <p className="main-subtitle">{slide.subtitle}</p>
              <div className="title-footer-meta">
                <div className="meta-item">
                  <span className="meta-label">Instrutor</span>
                  <span className="meta-value">{slide.instructor}</span>
                </div>
                <div className="meta-item">
                  <span className="meta-label">Instituição</span>
                  <span className="meta-value">{slide.institution}</span>
                </div>
              </div>
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="slide-layout roadmap-layout">
            <div className="slide-header">
              <h2>{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>
            <div className="roadmap-grid">
              {slide.steps?.map((step, idx) => (
                <div key={idx} className="roadmap-card">
                  <div className="roadmap-number">{step.num}</div>
                  <h3 className="roadmap-title">{step.title}</h3>
                  <p className="roadmap-desc">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="slide-layout comparison-layout">
            <div className="slide-header">
              <h2>{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>
            <div className="comparison-grid">
              <div className="comparison-card left-card">
                <span className="badge-pill pill-cyan">{slide.cardLeft.tag}</span>
                <h3>{slide.cardLeft.title}</h3>
                <ul>
                  {slide.cardLeft.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="comparison-card right-card">
                <span className="badge-pill pill-green">{slide.cardRight.tag}</span>
                <h3>{slide.cardRight.title}</h3>
                <ul>
                  {slide.cardRight.items.map((item, idx) => (
                    <li key={idx}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'flow':
        return (
          <div className="slide-layout flow-layout">
            <div className="slide-header">
              <h2>{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>
            <div className="flow-steps">
              {slide.steps?.map((step, idx) => (
                <div key={idx} className="flow-step-card">
                  <div className="step-badge">{idx + 1}</div>
                  <h4>{step.title}</h4>
                  <p>{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div className="slide-layout formula-layout">
            <div className="slide-header">
              <h2>{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>
            <div className="formula-box">
              <MathView math={slide.formula} block={true} />
            </div>
            <div className="variables-list">
              {slide.variables?.map((v, idx) => (
                <div key={idx} className="var-item">
                  <span className="var-name">{v.name}</span>
                  <span className="var-desc">{v.desc}</span>
                </div>
              ))}
            </div>
          </div>
        );

      case 'custom':
        return (
          <div className="slide-layout custom-layout">
            <div className="slide-header">
              <h2>{slide.title}</h2>
              <p className="slide-subtitle">{slide.subtitle}</p>
            </div>
            <div className="custom-component-container">
              {slide.component}
            </div>
          </div>
        );

      default:
        return (
          <div className="slide-layout default-layout">
            <h2>{slide.title}</h2>
            <p>{slide.subtitle}</p>
          </div>
        );
    }
  };

  return (
    <div
      ref={containerRef}
      className={`app-container ${isFullscreen ? 'is-fullscreen' : ''}`}
    >
      <div className="slide-viewport">
        <Header title={slide?.title} subtitle={slide?.subtitle} />
        
        <main className="slide-body">
          {renderSlideContent()}
        </main>

        <Footer
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          onOpenNotes={() => setShowNotes(true)}
          onOpenOverview={() => setShowOverview(true)}
          onToggleFullscreen={toggleFullscreen}
          isFullscreen={isFullscreen}
        />

        <Controls
          onPrev={prevSlide}
          onNext={nextSlide}
          hasPrev={currentSlideIndex > 0}
          hasNext={currentSlideIndex < totalSlides - 1}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying((prev) => !prev)}
        />

        <NotesDrawer
          isOpen={showNotes}
          onClose={() => setShowNotes(false)}
          notes={slide?.notes}
          slideNumber={currentSlideIndex + 1}
        />

        <OverviewModal
          isOpen={showOverview}
          onClose={() => setShowOverview(false)}
          slides={slidesData}
          currentSlideIndex={currentSlideIndex}
          onSelectSlide={(idx) => {
            setCurrentSlideIndex(idx);
            setShowOverview(false);
          }}
        />
      </div>
    </div>
  );
}
