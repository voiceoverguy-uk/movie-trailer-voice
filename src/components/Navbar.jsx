import React, { useState, useEffect } from 'react';
import './Navbar.css';

const STORAGE_KEY = 'mtv_custom_profile';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [customProfile, setCustomProfile] = useState(() => localStorage.getItem(STORAGE_KEY));

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleStorage = () => setCustomProfile(localStorage.getItem(STORAGE_KEY));
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, []);

  const clearProfile = () => {
    localStorage.removeItem(STORAGE_KEY);
    setCustomProfile(null);
  };

  const navLinks = [
    { name: 'Trailers', href: '#trailers' },
    { name: 'Other Suggestions', href: '#other-suggestions' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`navbar ${scrolled ? 'navbar-scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-left">
          <a href="#" className="navbar-logo">
            <img src="/mtv-logo.jpg" alt="Movie Trailer Voice" className="navbar-wordmark" />
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
            <div className="navbar-profile-badge desktop-only">
              <div className="navbar-profile-avatar">
                <span className="navbar-profile-initial display-font">{customProfile[0].toUpperCase()}</span>
              </div>
              <div className="navbar-profile-info">
                <span className="navbar-profile-name">{customProfile}</span>
                <button className="navbar-profile-clear" onClick={clearProfile}>Not you?</button>
              </div>
            </div>
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
          {customProfile && (
            <li>
              <button className="mobile-clear-profile" onClick={() => { clearProfile(); setMobileMenuOpen(false); }}>
                Not you, {customProfile}?
              </button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
}
