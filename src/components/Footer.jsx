import React from 'react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-content">
        <div className="footer-left">
          <img src="/mtv-logo.jpg" alt="Movie Trailer Voice" className="footer-logo" />
        </div>
        <div className="footer-links">
          <a href="#about">About</a>
          <a href="#contact">Contact</a>
          <a href="https://www.youtube.com/user/voiceoverguyharris" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
        <div className="footer-right">
          <a href="https://www.voiceoverguy.co.uk" target="_blank" rel="noopener noreferrer" className="footer-v-link" aria-label="VoiceoverGuy website">
            <img src="/v-logo-transparent.png" alt="VoiceoverGuy" className="footer-v-logo" />
            <span className="footer-v-label">VoiceoverGuy</span>
          </a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Guy Harris / Movie Trailer Voice. All rights reserved.</p>
      </div>
    </footer>
  );
}
