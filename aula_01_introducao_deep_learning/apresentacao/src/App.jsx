import React, { useState, useEffect, useRef } from 'react';
import { slidesData } from './data/slidesData';
import Header from './components/Header';
import Footer from './components/Footer';
import Controls from './components/Controls';
import NotesDrawer from './components/NotesDrawer';
import OverviewModal from './components/OverviewModal';
import MathView from './components/MathView';
import { getAssetUrl } from './utils/assetHelper';

// Interactive Components
import BiologicalNeuronToggle from './components/interactive/BiologicalNeuronToggle';
import VennDiagram from './components/interactive/VennDiagram';
import PerceptronSimulator from './components/interactive/PerceptronSimulator';
import ActivationPlotter from './components/interactive/ActivationPlotter';
import XorVisualizer from './components/interactive/XorVisualizer';
import MlpNetworkDiagram from './components/interactive/MlpNetworkDiagram';
import QuizWidget from './components/interactive/QuizWidget';

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
        setCurrentSlideIndex(0);
      } else if (e.key === 'End') {
        setCurrentSlideIndex(totalSlides - 1);
      } else if (e.key === 'g' || e.key === 'G') {
        setShowOverview((prev) => !prev);
      } else if (e.key === 'n' || e.key === 'N') {
        setShowNotes((prev) => !prev);
      } else if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [totalSlides]);

  // Autoplay timer
  useEffect(() => {
    let timer;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => {
          if (prev >= totalSlides - 1) {
            setIsPlaying(false);
            return prev;
          }
          return prev + 1;
        });
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying, totalSlides]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  };

  // Render Interactive Component by Name
  const renderInteractiveComponent = (name) => {
    switch (name) {
      case 'BiologicalNeuronToggle':
        return <BiologicalNeuronToggle />;
      case 'VennDiagram':
        return <VennDiagram />;
      case 'PerceptronSimulator':
        return <PerceptronSimulator />;
      case 'ActivationPlotter':
        return <ActivationPlotter />;
      case 'XorVisualizer':
        return <XorVisualizer />;
      case 'MlpNetworkDiagram':
        return <MlpNetworkDiagram />;
      case 'QuizWidget':
        return <QuizWidget />;
      default:
        return null;
    }
  };

  // Slide Body Content Renderer
  const renderSlideContent = () => {
    switch (slide.type) {
      case 'title':
        return (
          <div className="title-slide-container">
            <div className="title-slide-box">
              <h1>{slide.title}</h1>
              <div className="title-subtitle">{slide.subtitle}</div>
            </div>

            <div className="title-slide-info">
              <div className="inst-name">{slide.institution}</div>
              <div className="course-name">{slide.stage}</div>
              <div style={{ fontSize: '0.9rem', color: '#64748B', marginTop: '8px' }}>
                Data: {slide.date}
              </div>
            </div>
          </div>
        );

      case 'instructor':
        return (
          <div className="grid-2" style={{ gridTemplateColumns: '0.85fr 1.15fr', alignItems: 'stretch' }}>
            <div className="content-card" style={{ textAlign: 'center', borderColor: '#0A345D', padding: '28px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(180deg, #FFFFFF 0%, #F0F9FF 100%)' }}>
              <img 
                src={getAssetUrl(slide.photo || "/allan_spadini.jpg")} 
                alt={slide.name} 
                style={{
                  width: '145px',
                  height: '145px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #1BB5D8',
                  boxShadow: '0 8px 24px rgba(10, 52, 93, 0.2)',
                  marginBottom: '16px'
                }}
              />
              <h3 style={{ color: '#0A345D', fontSize: '1.85rem', fontWeight: '800', marginBottom: '6px' }}>
                {slide.name}
              </h3>
              <div style={{ color: '#1BB5D8', fontWeight: '700', fontSize: '1.25rem' }}>
                {slide.role}
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', justifyContent: 'center' }}>
              {slide.highlights.map((hl, idx) => (
                <div key={idx} className="content-card" style={{ padding: '16px 22px', borderColor: '#1BB5D8' }}>
                  <span className="card-header-badge" style={{ background: 'rgba(27, 181, 216, 0.14)', color: '#0A345D', marginBottom: '8px' }}>
                    {hl.badge}
                  </span>
                  <h4 style={{ color: '#0A345D', fontSize: '1.28rem', fontWeight: '800', margin: '3px 0' }}>
                    {hl.title}
                  </h4>
                  <p style={{ fontSize: '1.05rem', color: '#334155', lineHeight: '1.5' }}>
                    {hl.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'roadmap':
        return (
          <div className="grid-2">
            {slide.steps.map((st, idx) => (
              <div key={idx} className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                <span className="card-header-badge">ETAPA {st.num}</span>
                <h3 className="card-title">{st.title}</h3>
                <p className="card-text">{st.desc}</p>
              </div>
            ))}
          </div>
        );

      case 'image-text':
        return (
          <div className="grid-2" style={{ gridTemplateColumns: '0.9fr 1.1fr', alignItems: 'center' }}>
            <div style={{ background: '#FFF', borderRadius: '12px', border: '1px solid #CBD5E1', padding: '16px', display: 'flex', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
              <img 
                src={getAssetUrl(slide.imageSrc)} 
                alt={slide.imageAlt} 
                style={{ maxWidth: '100%', maxHeight: '380px', objectFit: 'contain', borderRadius: '8px' }}
              />
            </div>
            <div>
              <ul className="styled-list">
                {slide.bulletPoints.map((pt, idx) => (
                  <li key={idx}>{pt}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div className="grid-2">
            <div className="content-card" style={{ borderColor: '#0A345D' }}>
              <span className="card-header-badge" style={{ background: '#E0F2FE', color: '#0369A1' }}>
                {slide.cardLeft.badge}
              </span>
              <h3 className="card-title">{slide.cardLeft.title}</h3>
              <ul className="styled-list" style={{ marginTop: '12px' }}>
                {slide.cardLeft.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>

            <div className="content-card" style={{ borderColor: '#1BB5D8' }}>
              <span className="card-header-badge" style={{ background: '#CCFBF1', color: '#0F766E' }}>
                {slide.cardRight.badge}
              </span>
              <h3 className="card-title">{slide.cardRight.title}</h3>
              <ul className="styled-list" style={{ marginTop: '12px' }}>
                {slide.cardRight.items.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>
            </div>
          </div>
        );

      case 'math-focus':
        return (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%', justifyContent: 'flex-start', paddingTop: '10px' }}>
            <div className="math-box" style={{ fontSize: '2.1rem', padding: '24px 32px', borderLeftWidth: '8px', marginBottom: '8px' }}>
              <MathView math={slide.equation} displayMode={true} />
            </div>

            <div className="grid-3" style={{ flex: 1 }}>
              {slide.explanations.map((exp, idx) => (
                <div key={idx} className="content-card" style={{ padding: '28px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                  <span style={{ fontSize: '1.28rem', fontWeight: '800', color: '#0A345D', display: 'block', marginBottom: '12px' }}>
                    {exp.term}
                  </span>
                  <p style={{ fontSize: '1.2rem', color: '#334155', lineHeight: '1.55' }}>
                    {exp.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        );

      case 'grid-cards':
        return (
          <div className="grid-3" style={{ alignItems: 'stretch', height: '100%' }}>
            {slide.cards.map((c, idx) => (
              <div key={idx} className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', padding: '28px', justifyContent: 'center' }}>
                <span className="card-header-badge" style={{ fontSize: '1.05rem' }}>{c.badge}</span>
                <h3 className="card-title" style={{ fontSize: '1.5rem', lineHeight: '1.3' }}>{c.title}</h3>
                <p className="card-text" style={{ fontSize: '1.2rem', lineHeight: '1.55' }}>{c.text}</p>
              </div>
            ))}
          </div>
        );

      case 'flow':
        return (
          <div className="grid-2" style={{ alignItems: 'stretch', height: '100%' }}>
            {slide.steps.map((st, idx) => (
              <div key={idx} className="content-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', borderColor: '#1BB5D8', padding: '32px' }}>
                <span className="card-header-badge" style={{ fontSize: '1.15rem', padding: '8px 18px' }}>{st.step}</span>
                <div className="math-box" style={{ fontSize: '1.85rem', margin: '20px 0', padding: '22px' }}>
                  {st.formula}
                </div>
                <p className="card-text" style={{ fontSize: '1.3rem', lineHeight: '1.6' }}>{st.desc}</p>
              </div>
            ))}
          </div>
        );

      case 'custom':
        return renderInteractiveComponent(slide.component);

      default:
        return null;
    }
  };

  return (
    <div className={`app-container ${isFullscreen ? 'is-fullscreen' : ''}`} ref={containerRef}>
      <div className="slide-viewport">
        {/* Top ODP-styled Header (hidden on title slide) */}
        <Header 
          title={slide.type !== 'title' ? slide.title : null} 
          subtitle={slide.type !== 'title' ? slide.subtitle : null}
        />

        {/* Slide Main Content */}
        <main className="slide-body">
          {renderSlideContent()}
        </main>

        {/* Slide Footer */}
        <Footer 
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          onOpenNotes={() => setShowNotes(true)}
          onOpenOverview={() => setShowOverview(true)}
        />
      </div>

      {/* Floating Bottom Navigation Controls */}
      <Controls 
        currentSlide={currentSlideIndex + 1}
        totalSlides={totalSlides}
        onPrev={prevSlide}
        onNext={nextSlide}
        onToggleOverview={() => setShowOverview(prev => !prev)}
        onToggleNotes={() => setShowNotes(prev => !prev)}
        onToggleFullscreen={toggleFullscreen}
        isPlaying={isPlaying}
        onTogglePlay={() => setIsPlaying(prev => !prev)}
      />

      {/* Speaker Notes Drawer */}
      <NotesDrawer 
        isOpen={showNotes} 
        onClose={() => setShowNotes(false)}
        currentSlideData={slide}
      />

      {/* Slide Overview Grid Modal */}
      <OverviewModal 
        isOpen={showOverview}
        onClose={() => setShowOverview(false)}
        slides={slidesData}
        currentSlide={currentSlideIndex + 1}
        onSelectSlide={(num) => setCurrentSlideIndex(num - 1)}
      />
    </div>
  );
}
