import React, { useState, useEffect } from 'react';
import './Navbar.css';

const STORAGE_KEY = 'mtv_custom_profile';
const AVATAR_KEY  = 'mtv_custom_avatar';

export default function Navbar({ onSwitchProfile }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customProfile, setCustomProfile] = useState(() => localStorage.getItem(STORAGE_KEY));
  const [customAvatar,  setCustomAvatar]  = useState(() => localStorage.getItem(AVATAR_KEY));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorage = () => {
      setCustomProfile(localStorage.getItem(STORAGE_KEY));
      setCustomAvatar(localStorage.getItem(AVATAR_KEY));
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(AVATAR_KEY);
    setCustomProfile(null);
    setCustomAvatar(null);
  };

  const navLinks = [
    { name: 'Movie Trailers', href: '#trailers' },
    { name: 'Game Trailers', href: '#game-trailers' },
    { name: 'B-Movie', href: '#b-movie' },
    { name: 'Full Collection', href: '#full-collection' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="#" className="navbar-logo">
            <img src="/mtv-logo-transparent.png" alt="Movie Trailer Voice" className="navbar-wordmark" />
          </a>
          <ul className="navbar-links desktop-only">
            {navLinks.map((link) => (
              <li key={link.name}>
                <a href={link.href}>{link.name}</a>
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-right">
          {customProfile && (
            <button className="navbar-profile-badge" onClick={onSwitchProfile} aria-label="Switch profile">
              <div className="navbar-profile-avatar">
                {customAvatar ? (
                  <img src={customAvatar} alt={customProfile} className="navbar-profile-avatar-img" />
                ) : (
                  <span className="navbar-profile-initial display-font">{customProfile[0].toUpperCase()}</span>
                )}
              </div>
              <div className="navbar-profile-info">
                <span className="navbar-profile-name">{customProfile}</span>
              </div>
            </button>
          )}
          <button
            className="hamburger mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
            <div className={`hamburger-line ${mobileMenuOpen ? 'open' : ''}`}></div>
          </button>
        </div>
      </div>

      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} onClick={() => setMobileMenuOpen(false)}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
