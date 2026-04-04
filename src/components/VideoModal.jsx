import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { getYouTubeId } from '../data/videos';
import './VideoModal.css';

export default function VideoModal({ clip, onClose }) {
  const videoId = getYouTubeId(clip.url);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return createPortal(
    <div className="vmodal-backdrop" onClick={onClose}>
      <div className="vmodal-content" onClick={e => e.stopPropagation()}>
        <button className="vmodal-close" onClick={onClose} aria-label="Close">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="vmodal-player">
          {videoId ? (
            <iframe
              src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
              title={clip.title}
              allow="autoplay; encrypted-media; picture-in-picture; fullscreen"
              allowFullScreen
            />
          ) : (
            <div className="vmodal-no-video">Video unavailable</div>
          )}
        </div>
        <div className="vmodal-footer">
          <span className="vmodal-title">{clip.title}</span>
          <a
            href={clip.url}
            target="_blank"
            rel="noopener noreferrer"
            className="vmodal-yt-link"
          >
            Watch on YouTube
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>
              <polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
            </svg>
          </a>
        </div>
      </div>
    </div>,
    document.body
  );
}
