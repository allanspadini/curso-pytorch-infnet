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
import AutogradGraphVisualizer from './components/interactive/AutogradGraphVisualizer';
import TrainingLoopStepByStep from './components/interactive/TrainingLoopStepByStep';
import LearningRateLab from './components/interactive/LearningRateLab';
import SaasChurnMlpSimulator from './components/interactive/SaasChurnMlpSimulator';
import QuizWidget from './components/interactive/QuizWidget';
import ErrorNormVisualizer from './components/interactive/ErrorNormVisualizer';
import ErrorNormCancellationDemo from './components/interactive/ErrorNormCancellationDemo';

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

  // Toggle Fullscreen
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
      case 'ErrorNormVisualizer':
        return <ErrorNormVisualizer />;
      case 'ErrorNormCancellationDemo':
        return <ErrorNormCancellationDemo />;
      case 'AutogradGraphVisualizer':
        return <AutogradGraphVisualizer />;
      case 'TrainingLoopStepByStep':
        return <TrainingLoopStepByStep />;
      case 'LearningRateLab':
        return <LearningRateLab />;
      case 'SaasChurnMlpSimulator':
        return <SaasChurnMlpSimulator />;
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
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '36px', alignItems: 'center', height: '100%' }}>
              <div style={{ background: 'var(--infnet-dark-blue)', padding: '24px', borderRadius: '16px', textAlign: 'center', color: '#FFF', boxShadow: 'var(--shadow-md)' }}>
                <img 
                  src={getAssetUrl(slide.photo)} 
                  alt={slide.name} 
                  style={{ width: '150px', height: '150px', borderRadius: '50%', objectFit: 'cover', border: '4px solid var(--infnet-cyan)', margin: '0 auto 16px' }}
                />
                <h3 style={{ fontSize: '1.4rem', fontFamily: 'Outfit, sans-serif', color: '#FFF' }}>{slide.name}</h3>
                <p style={{ color: 'var(--infnet-cyan-light)', fontWeight: '600', fontSize: '0.95rem', marginTop: '4px' }}>{slide.role}</p>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {slide.highlights.map((h, idx) => (
                  <div key={idx} className="content-card" style={{ padding: '20px 24px', display: 'flex', gap: '20px', alignItems: 'center' }}>
                    <div className="card-header-badge" style={{ marginBottom: 0, minWidth: '130px', textAlign: 'center' }}>
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
          </div>
        );

      case 'roadmap':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div className="grid-4" style={{ height: 'calc(100% - 60px)', alignItems: 'center' }}>
              {slide.steps.map((st) => (
                <div key={st.num} className="content-card" style={{ display: 'flex', flexDirection: 'column', gap: '14px', position: 'relative', overflow: 'hidden' }}>
                  <div style={{ fontSize: '3rem', fontWeight: '900', color: 'rgba(27, 181, 216, 0.25)', position: 'absolute', top: '10px', right: '16px', fontFamily: 'Outfit, sans-serif' }}>
                    {st.num}
                  </div>
                  <div style={{ background: 'var(--infnet-dark-blue)', color: '#FFF', width: '36px', height: '36px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.9rem' }}>
                    {st.num}
                  </div>
                  <div className="card-title" style={{ fontSize: '1.35rem', marginBottom: 0 }}>{st.title}</div>
                  <div className="card-text" style={{ fontSize: '1.05rem' }}>{st.desc}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'comparison':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div className="grid-2">
              <div className="content-card" style={{ borderTop: '6px solid var(--infnet-cyan)' }}>
                <div className="card-header-badge">{slide.cardLeft.badge}</div>
                <div className="card-title">{slide.cardLeft.title}</div>
                <ul className="styled-list" style={{ marginTop: '16px' }}>
                  {slide.cardLeft.items.map((it, idx) => <li key={idx}>{it}</li>)}
                </ul>
              </div>

              <div className="content-card" style={{ borderTop: '6px solid var(--infnet-green-accent)' }}>
                <div className="card-header-badge" style={{ background: 'rgba(124, 179, 66, 0.15)', color: '#33691E' }}>{slide.cardRight.badge}</div>
                <div className="card-title">{slide.cardRight.title}</div>
                <ul className="styled-list" style={{ marginTop: '16px' }}>
                  {slide.cardRight.items.map((it, idx) => <li key={idx}>{it}</li>)}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'flow':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {slide.steps.map((st, idx) => {
                const isMath = st.formula && (
                  st.formula.includes('\\') || 
                  st.formula.includes('=') || 
                  st.formula.includes('^') || 
                  st.formula.includes('_') || 
                  st.formula.includes('|') ||
                  st.formula.includes('\\nabla') ||
                  st.formula.includes('\\eta')
                );
                return (
                  <div key={idx} className="content-card" style={{ padding: '20px 28px', borderLeft: '6px solid var(--infnet-cyan)', display: 'grid', gridTemplateColumns: '260px 1.4fr 1.6fr', gap: '20px', alignItems: 'center' }}>
                    <div style={{ fontWeight: '800', color: 'var(--infnet-dark-blue)', fontSize: '1.15rem' }}>
                      {st.step}
                    </div>
                    <div style={{ background: '#F1F5F9', padding: '10px 16px', borderRadius: '8px', fontFamily: 'Fira Code, monospace', fontWeight: '600', color: '#0A345D', fontSize: '0.95rem' }}>
                      {isMath ? <MathView math={st.formula} block={false} /> : st.formula}
                    </div>
                    <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.5' }}>
                      {st.desc}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case 'formula':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div className="math-box" style={{ background: '#FFF', border: '2px solid var(--infnet-cyan)', boxShadow: 'var(--shadow-md)', padding: '28px' }}>
                <MathView math={slide.formula} block={true} />
              </div>

              <div className="grid-3">
                {slide.variables?.map((v, idx) => (
                  <div key={idx} className="content-card" style={{ padding: '20px' }}>
                    <div style={{ fontFamily: 'Fira Code, monospace', fontWeight: '800', color: 'var(--infnet-cyan)', fontSize: '1.1rem', marginBottom: '8px' }}>
                      <MathView math={v.name} block={false} />
                    </div>
                    <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.5' }}>
                      {v.desc}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'image-text':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            <div className="grid-2" style={{ alignItems: 'center' }}>
              <div className="content-card" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', padding: '20px' }}>
                <img 
                  src={getAssetUrl(slide.imageSrc)} 
                  alt={slide.imageAlt}
                  style={{ maxWidth: '100%', maxHeight: '380px', borderRadius: '12px', objectFit: 'contain' }} 
                />
              </div>

              <div className="content-card">
                <ul className="styled-list">
                  {slide.bullets?.map((b, idx) => (
                    <li key={idx} dangerouslySetInnerHTML={{ __html: b.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') }} />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        );

      case 'custom':
        return (
          <div>
            <Header title={slide.title} subtitle={slide.subtitle} />
            {renderInteractiveComponent(slide.component)}
          </div>
        );

      default:
        return <div>Slide Type Desconhecido</div>;
    }
  };

  return (
    <div className={`app-container ${isFullscreen ? 'is-fullscreen' : ''}`} ref={containerRef}>
      <div className="slide-viewport">
        <main className="slide-body">
          {renderSlideContent()}
        </main>

        {/* Footer Navigation Bar */}
        {slide.type !== 'title' && (
          <Footer
            currentSlide={currentSlideIndex + 1}
            totalSlides={totalSlides}
            onOpenNotes={() => setShowNotes(true)}
            onOpenOverview={() => setShowOverview(true)}
          />
        )}

        {/* Floating Controls */}
        <Controls
          currentSlide={currentSlideIndex + 1}
          totalSlides={totalSlides}
          onNext={nextSlide}
          onPrev={prevSlide}
          isPlaying={isPlaying}
          onTogglePlay={() => setIsPlaying(!isPlaying)}
          onToggleFullscreen={toggleFullscreen}
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
          onSelectSlide={(idx) => setCurrentSlideIndex(idx - 1)}
        />
      </div>
    </div>
  );
}
