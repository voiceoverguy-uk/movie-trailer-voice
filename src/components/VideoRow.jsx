import React, { useRef } from 'react';
import VideoCard from './VideoCard';
import './VideoRow.css';

export default function VideoRow({ id, row }) {
  const rowRef = useRef(null);

  const scroll = (direction) => {
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current;
      const scrollAmount = clientWidth * 0.75;
      rowRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div id={id} className="video-row-container">
      <h2 className="video-row-title display-font">{row.title}</h2>
      <div className="video-row-wrapper">
        <button 
          className="row-nav-arrow prev" 
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        
        <div className="video-row" ref={rowRef}>
          {row.clips.map((clip, idx) => (
            <VideoCard key={`${clip.url}-${idx}`} clip={clip} />
          ))}
        </div>

        <button 
          className="row-nav-arrow next" 
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
}
