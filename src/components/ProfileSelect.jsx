import React, { useState, useEffect, useCallback } from 'react';
import './ProfileSelect.css';

const PROFILE_NAMES = [
  "Tom", "Ryan", "Brad", "Leonardo", "Christian", "Morgan", "Denzel", "Samuel",
  "Robert", "Al", "Jack", "Harrison", "Matt", "Ben", "Joaquin", "Keanu",
  "Will", "Chris", "Daniel", "Cillian", "Colin", "Hugh", "Russell", "Stanley",
  "Steven", "Martin", "Quentin", "Ridley", "Alfred", "Francis", "James", "Peter",
  "George", "Ron", "Clint", "Katharine", "Audrey", "Grace", "Marilyn", "Meryl",
  "Julia", "Sandra", "Nicole", "Kate", "Emma", "Emily", "Scarlett", "Natalie",
  "Charlize", "Angelina", "Cate", "Jodie", "Helen", "Olivia", "Viola", "Frances",
  "Greta", "Sofia", "Patty", "Nora", "Jane", "Barbra", "Ava", "Drew", "Cameron",
  "Sigourney", "Salma", "Rachel", "Keira", "Saoirse", "Margot", "Zendaya",
  "Florence", "Dakota", "Reese",
];

const TILE_COLORS = [
  'linear-gradient(135deg, #1f1c2c, #928dab)',
  'linear-gradient(135deg, #0f2027, #203a43, #2c5364)',
  'linear-gradient(135deg, #cb2d3e, #ef473a)',
];

const CUSTOM_TILE_COLOR = 'linear-gradient(135deg, #6a3093, #a044ff)';
const STORAGE_KEY = 'mtv_custom_profile';
const NAME_PATTERN = /^[a-zA-Z\-']+$/;
const AUTO_SECONDS = 10;

function pickThreeUniqueNames(names) {
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function ProfileSelect({ onSelect }) {
  const [fading, setFading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');
  const [timeLeft, setTimeLeft] = useState(AUTO_SECONDS);

  const [displayedNames] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    const randoms = pickThreeUniqueNames(PROFILE_NAMES);
    if (saved) {
      const others = randoms.filter(n => n.toLowerCase() !== saved.toLowerCase());
      return [saved, others[0], others[1]];
    }
    return randoms;
  });

  const savedName = localStorage.getItem(STORAGE_KEY);

  const handleSelect = useCallback((profileName) => {
    setFading(true);
    setTimeout(() => onSelect(profileName), 800);
  }, [onSelect]);

  useEffect(() => {
    if (modalOpen || fading) return;
    if (timeLeft <= 0) {
      handleSelect(displayedNames[0]);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, modalOpen, fading, handleSelect, displayedNames]);

  const openModal = () => {
    setInputName('');
    setInputError('');
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputName('');
    setInputError('');
  };

  const handleContinue = () => {
    const trimmed = inputName.trim();
    if (!trimmed) return;
    if (trimmed.length > 11) {
      setInputError('First name must be 11 characters or fewer.');
      return;
    }
    if (!NAME_PATTERN.test(trimmed)) {
      setInputError('First names only — letters, hyphens and apostrophes allowed.');
      return;
    }
    localStorage.setItem(STORAGE_KEY, trimmed);
    closeModal();
    handleSelect(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleContinue();
    if (e.key === 'Escape') closeModal();
  };

  const progressPct = (timeLeft / AUTO_SECONDS) * 100;

  return (
    <div className={`profile-select-container ${fading ? 'fade-out' : 'fade-in'}`}>
      <div className="profile-top-bar">
        <img src="/mtv-logo.jpg" alt="Movie Trailer Voice" className="profile-logo-wordmark" />
      </div>

      <div className="profile-select-content">
        <h1 className="profile-heading">What You Watching?</h1>
        <div className="profiles-row">
          {displayedNames.map((name, idx) => {
            const isCustom = name === savedName;
            const color = isCustom ? CUSTOM_TILE_COLOR : TILE_COLORS[idx];
            return (
              <div
                key={name}
                className={`profile-card slide-up slide-up-delay-${idx}`}
                onClick={() => handleSelect(name)}
              >
                <div className="profile-avatar" style={{ background: color }}>
                  <span className="display-font profile-icon">{name[0]}</span>
                </div>
                <span className="profile-name">{name}</span>
              </div>
            );
          })}

          <div className="profile-card add-profile-card slide-up slide-up-delay-3" onClick={openModal}>
            <div className="profile-avatar add-profile-avatar">
              <svg width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                <line x1="12" y1="4" x2="12" y2="20"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
              </svg>
            </div>
            <span className="profile-name">{savedName ? 'Change Name' : 'Add Profile'}</span>
          </div>
        </div>
      </div>

      <div className="auto-advance-bar">
        <div
          className="auto-advance-progress"
          style={{ width: `${progressPct}%` }}
        />
      </div>

      {modalOpen && (
        <div className="profile-modal-backdrop" onClick={closeModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="profile-modal-title">Create Your Profile</h2>
            <input
              className={`profile-modal-input ${inputError ? 'has-error' : ''}`}
              type="text"
              placeholder="Your name"
              value={inputName}
              maxLength={11}
              autoFocus
              onChange={(e) => { setInputName(e.target.value); setInputError(''); }}
              onKeyDown={handleKeyDown}
            />
            {inputError && <p className="profile-modal-error">{inputError}</p>}
            <button
              className="profile-modal-btn"
              onClick={handleContinue}
              disabled={!inputName.trim()}
            >
              Continue
            </button>
            <button className="profile-modal-cancel" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
