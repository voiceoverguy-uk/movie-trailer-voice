import React, { useState, useEffect, useRef } from 'react';
import './Navbar.css';
import { movieTrailerRow, gameTrailersRow, bMovieRow, fullCollectionRow } from '../data/videos';

const buildIndex = () => {
  const rows = [movieTrailerRow, gameTrailersRow, bMovieRow, fullCollectionRow];
  const seen = new Set();
  const index = [];
  for (const row of rows) {
    for (const clip of row.clips) {
      if (!seen.has(clip.title)) {
        seen.add(clip.title);
        index.push({ ...clip, rowId: row.id });
      }
    }
  }
  return index;
};

const SEARCH_INDEX = buildIndex();

export default function Navbar({ selectedProfile, onSwitchProfile }) {
  const [scrolled, setScrolled]         = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen]       = useState(false);
  const [searchQuery, setSearchQuery]     = useState('');

  const dropdownRef    = useRef(null);
  const searchRef      = useRef(null);
  const searchInputRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onMouseDown = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('mousedown', onMouseDown);
    return () => document.removeEventListener('mousedown', onMouseDown);
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') {
        setDropdownOpen(false);
        setSearchOpen(false);
        setSearchQuery('');
      }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const navLinks = [
    { name: 'Movie Trailers', href: '#trailers' },
    { name: 'Game Trailers', href: '#game-trailers' },
    { name: 'B-Movie', href: '#b-movie' },
    { name: 'Full Collection', href: '#full-collection' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const trimmedQuery = searchQuery.trim().toLowerCase();
  const searchResults = trimmedQuery.length > 0
    ? SEARCH_INDEX.filter(c => c.title.toLowerCase().includes(trimmedQuery))
    : [];

  const handleSearchResultClick = (clip) => {
    setSearchOpen(false);
    setSearchQuery('');

    const rowEl  = document.getElementById(clip.rowId);
    const cardEl = document.querySelector(`[data-clip-url="${CSS.escape(clip.url)}"]`);

    if (cardEl) {
      cardEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      cardEl.classList.remove('clip-highlight');
      void cardEl.offsetWidth;
      cardEl.classList.add('clip-highlight');
      setTimeout(() => cardEl.classList.remove('clip-highlight'), 2000);
    } else if (rowEl) {
      rowEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleManageProfile = () => {
    setDropdownOpen(false);
    onSwitchProfile();
  };

  const handleDropdownNav = (href) => {
    setDropdownOpen(false);
    const id = href.replace('#', '');
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else window.location.href = href;
  };

  const profileName = selectedProfile?.name ?? '';
  const avatarSrc   = selectedProfile?.avatarSrc ?? null;

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

          {/* ── Search ── */}
          <div className="navbar-search-wrapper" ref={searchRef}>
            <div className={`navbar-search-expand ${searchOpen ? 'open' : ''}`}>
              <button
                className="navbar-search-btn"
                onClick={() => setSearchOpen(s => !s)}
                aria-label="Search"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </button>
              {searchOpen && (
                <input
                  ref={searchInputRef}
                  type="text"
                  className="navbar-search-input"
                  placeholder="Search titles…"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              )}
            </div>

            {searchOpen && (searchResults.length > 0 || trimmedQuery.length > 0) && (
              <div className="navbar-search-results">
                {searchResults.length > 0 ? searchResults.map((clip, i) => (
                  <button
                    key={`${clip.title}-${i}`}
                    className="navbar-search-result"
                    onClick={() => handleSearchResultClick(clip)}
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <span className="navbar-search-result-title">{clip.title}</span>
                    <span className="navbar-search-result-genre">{clip.genre}</span>
                  </button>
                )) : (
                  <div className="navbar-search-empty">No results found</div>
                )}
              </div>
            )}
          </div>

          {/* ── Profile dropdown ── */}
          {profileName && (
            <div className="navbar-profile-wrapper" ref={dropdownRef}>
              <button
                className={`navbar-profile-badge ${dropdownOpen ? 'active' : ''}`}
                onClick={() => setDropdownOpen(d => !d)}
                aria-label="Profile menu"
              >
                <div className="navbar-profile-avatar">
                  {avatarSrc ? (
                    <img src={avatarSrc} alt={profileName} className="navbar-profile-avatar-img" />
                  ) : (
                    <span className="navbar-profile-initial display-font">{profileName[0].toUpperCase()}</span>
                  )}
                </div>
                <svg
                  className={`navbar-profile-chevron ${dropdownOpen ? 'open' : ''}`}
                  width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>

              {dropdownOpen && (
                <div className="navbar-dropdown">
                  <div className="navbar-dropdown-profile">
                    <div className="navbar-dropdown-avatar">
                      {avatarSrc ? (
                        <img src={avatarSrc} alt={profileName} className="navbar-profile-avatar-img" />
                      ) : (
                        <span className="navbar-profile-initial display-font">{profileName[0].toUpperCase()}</span>
                      )}
                    </div>
                    <span className="navbar-dropdown-name">{profileName}</span>
                  </div>
                  <div className="navbar-dropdown-divider" />
                  <button className="navbar-dropdown-item" onClick={handleManageProfile}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/>
                      <circle cx="9" cy="7" r="4"/>
                      <path d="M23 21v-2a4 4 0 0 0-3-3.87"/>
                      <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
                    </svg>
                    Manage Profile
                  </button>
                  <button className="navbar-dropdown-item" onClick={() => handleDropdownNav('#about')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"/>
                      <line x1="12" y1="8" x2="12" y2="12"/>
                      <line x1="12" y1="16" x2="12.01" y2="16"/>
                    </svg>
                    About
                  </button>
                  <button className="navbar-dropdown-item" onClick={() => handleDropdownNav('#contact')}>
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                      <polyline points="22,6 12,13 2,6"/>
                    </svg>
                    Contact
                  </button>
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </nav>
  );
}
