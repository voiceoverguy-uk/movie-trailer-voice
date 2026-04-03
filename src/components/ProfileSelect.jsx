import React, { useState } from 'react';
import './ProfileSelect.css';

const profiles = [
  { name: 'Epic', icon: 'E', color: 'linear-gradient(135deg, #1f1c2c, #928dab)' },
  { name: 'Dark', icon: 'D', color: 'linear-gradient(135deg, #0f2027, #203a43, #2c5364)' },
  { name: 'Action', icon: 'A', color: 'linear-gradient(135deg, #cb2d3e, #ef473a)' },
  { name: 'Spoof', icon: 'S', color: 'linear-gradient(135deg, #ff9966, #ff5e62)' },
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
      <div className="profile-select-content">
        <img src="/mtv-logo.jpg" alt="Movie Trailer Voice" className="profile-logo" />
        <h1 className="display-font profile-heading">Who's Watching?</h1>
        <div className="profiles-grid">
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
        </div>
      </div>
    </div>
  );
}
