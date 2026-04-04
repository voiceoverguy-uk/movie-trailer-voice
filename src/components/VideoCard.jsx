import React from 'react';
import { getThumbnail } from '../data/videos';
import './VideoCard.css';

export default function VideoCard({ clip }) {
  const thumbnail = getThumbnail(clip.url);

  return (
    <a href={clip.url} target="_blank" rel="noopener noreferrer" className="video-card">
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
        {clip.genre && <span className="video-card-genre">{clip.genre}</span>}
      </div>
    </a>
  );
}
