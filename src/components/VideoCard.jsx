import React, { useState } from 'react';
import { getThumbnail } from '../data/videos';
import VideoModal from './VideoModal';
import './VideoCard.css';

export default function VideoCard({ clip }) {
  const [modalOpen, setModalOpen] = useState(false);
  const thumbnail = getThumbnail(clip.url);

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        className="video-card"
        data-clip-url={clip.url}
        onClick={() => setModalOpen(true)}
        onKeyDown={(e) => e.key === 'Enter' && setModalOpen(true)}
      >
        <div className="video-card-inner">
          <img src={thumbnail} alt={clip.title} className="video-card-img" loading="lazy" />
          <div className="video-card-overlay">
            <div className="video-card-play">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="video-card-caption">
          <h3 className="video-card-title">{clip.title}</h3>
        </div>
      </div>

      {modalOpen && (
        <VideoModal clip={clip} onClose={() => setModalOpen(false)} />
      )}
    </>
  );
}
