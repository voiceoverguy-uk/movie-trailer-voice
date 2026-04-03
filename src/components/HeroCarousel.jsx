import React, { useState, useEffect, useCallback } from 'react';
import { getHeroThumbnail, getHeroThumbnailFallback } from '../data/videos';
import './HeroCarousel.css';

export default function HeroCarousel({ heroClips, initialIndex }) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex || 0);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === heroClips.length - 1 ? 0 : prev + 1));
  }, [heroClips.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? heroClips.length - 1 : prev - 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 6000);
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="hero-carousel">
      {heroClips.map((clip, idx) => {
        const bgImg = getHeroThumbnail(clip.url);
        const fallbackImg = getHeroThumbnailFallback(clip.url);
        return (
          <div 
            key={clip.id} 
            className={`hero-slide ${idx === currentIndex ? 'active' : ''}`}
            style={{ backgroundImage: `url(${bgImg})` }}
            ref={el => {
              if (el && idx === currentIndex) {
                const img = new Image();
                img.onerror = () => { el.style.backgroundImage = `url(${fallbackImg})`; };
                img.src = bgImg;
              }
            }}
          >
            <div className="hero-overlay">
              <div className="hero-content container slide-up">
                <span className="hero-genre">{clip.genre}</span>
                <h1 className="hero-title display-font">{clip.title}</h1>
                <p className="hero-description">{clip.description}</p>
                <div className="hero-actions">
                  <a href={clip.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                    Watch Now
                  </a>
                  <a href="#about" className="btn btn-ghost">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="16" x2="12" y2="12"></line>
                      <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    More Info
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      })}

      <div className="hero-nav">
        <button onClick={prevSlide} className="hero-nav-arrow prev" aria-label="Previous">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button onClick={nextSlide} className="hero-nav-arrow next" aria-label="Next">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>

      <div className="hero-dots">
        {heroClips.map((_, idx) => (
          <button 
            key={idx} 
            className={`hero-dot ${idx === currentIndex ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
