import React, { useState } from 'react';
import './ProfileSelect.css';

const profiles = [
  { name: 'Epic', icon: 'E', color: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
  { name: 'Dark', icon: 'D', color: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  { name: 'Action', icon: 'A', color: 'linear-gradient(135deg, #cb2d3e, #ef473a)' },
];

export default function ProfileSelect({ onSelect }) {
  const [fading, setFading] = useState(false);

  const handleSelect = (profileName) => {
    setFading(true);
    setTimeout(() => {
      onSelect(profileName);
    }, 800);
  };

  return (
    <div className={`profile-select-container ${fading ? 'fade-out' : 'fade-in'}`}>
      <div className="profile-top-bar">
        <img src="/mtv-logo.jpg" alt="Movie Trailer Voice" className="profile-logo-wordmark" />
      </div>

      <div className="profile-select-content">
        <h1 className="profile-heading">What You Watching?</h1>
        <div className="profiles-row">
          {profiles.map((p, idx) => (
            <div
              key={p.name}
              className={`profile-card slide-up slide-up-delay-${idx}`}
              onClick={() => handleSelect(p.name)}
            >
              <div className="profile-avatar" style={{ background: p.color }}>
                <span className="display-font profile-icon">{p.icon}</span>
              </div>
              <span className="profile-name">{p.name}</span>
            </div>
          ))}

          <div className="profile-card add-profile-card slide-up slide-up-delay-3">
            <div className="profile-avatar add-profile-avatar">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                <line x1="12" y1="4" x2="12" y2="20"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
              </svg>
            </div>
            <span className="profile-name">Add Profile</span>
          </div>
        </div>
      </div>
    </div>
  );
}
