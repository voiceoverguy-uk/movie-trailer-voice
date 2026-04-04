import React, { useState } from 'react';
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

const STORAGE_KEY = 'mtv_custom_profile';
const NAME_PATTERN = /^[a-zA-Z\s\-']+$/;

function pickThreeUniqueNames(names) {
  const shuffled = [...names].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, 3);
}

export default function ProfileSelect({ onSelect }) {
  const [fading, setFading] = useState(false);
  const [selectedNames] = useState(() => pickThreeUniqueNames(PROFILE_NAMES));
  const [modalOpen, setModalOpen] = useState(false);
  const [inputName, setInputName] = useState('');
  const [inputError, setInputError] = useState('');

  const handleSelect = (profileName) => {
    setFading(true);
    setTimeout(() => onSelect(profileName), 800);
  };

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
    if (trimmed.length > 16) {
      setInputError('Name must be 16 characters or fewer.');
      return;
    }
    if (!NAME_PATTERN.test(trimmed)) {
      setInputError('Only letters, spaces, hyphens and apostrophes are allowed.');
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

  return (
    <div className={`profile-select-container ${fading ? 'fade-out' : 'fade-in'}`}>
      <div className="profile-top-bar">
        <img src="/mtv-logo-transparent.png" alt="Movie Trailer Voice" className="profile-logo-wordmark" />
      </div>

      <div className="profile-select-content">
        <h1 className="profile-heading">What You Watching?</h1>
        <div className="profiles-row">
          {selectedNames.map((name, idx) => (
            <div
              key={name}
              className={`profile-card slide-up slide-up-delay-${idx}`}
              onClick={() => handleSelect(name)}
            >
              <div className="profile-avatar" style={{ background: TILE_COLORS[idx] }}>
                <span className="display-font profile-icon">{name[0]}</span>
              </div>
              <span className="profile-name">{name}</span>
            </div>
          ))}

          <div className="profile-card add-profile-card slide-up slide-up-delay-3" onClick={openModal}>
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

      {modalOpen && (
        <div className="profile-modal-backdrop" onClick={closeModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="profile-modal-title">Create Your Profile</h2>
            <input
              className={`profile-modal-input ${inputError ? 'has-error' : ''}`}
              type="text"
              placeholder="Your name"
              value={inputName}
              maxLength={20}
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
