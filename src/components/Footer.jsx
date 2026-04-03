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
          <a href="https://www.youtube.com/@VoiceoverGuy" target="_blank" rel="noopener noreferrer">YouTube</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} Guy Harris / Movie Trailer Voice. All rights reserved.</p>
      </div>
    </footer>
  );
}
