import React, { useState, useEffect } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
      
      {/* Mobile Drawer */}
      <div className={`mobile-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <ul className="mobile-links">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a 
                href={link.href} 
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
