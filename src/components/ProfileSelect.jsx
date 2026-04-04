import React, { useState, useEffect, useCallback } from 'react';
import { AVATARS } from '../data/avatars';
import { heroClips, getHeroThumbnail, getHeroThumbnailFallback } from '../data/videos';
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

const CUSTOM_TILE_COLOR = 'linear-gradient(135deg, #6a3093, #a044ff)';
const STORAGE_KEY = 'mtv_custom_profile';
const AVATAR_KEY  = 'mtv_custom_avatar';
const NAME_PATTERN = /^[a-zA-Z\-']+$/;
const AUTO_SECONDS = 20;

function pickThreeUniqueNames(names) {
  return [...names].sort(() => Math.random() - 0.5).slice(0, 3);
}

function pickUniqueAvatars(count) {
  return [...AVATARS].sort(() => Math.random() - 0.5).slice(0, count);
}

function pickTwoHeroClips() {
  return [...heroClips].sort(() => Math.random() - 0.5).slice(0, 2);
}

export default function ProfileSelect({ onSelect }) {
  const [fading, setFading]               = useState(false);
  const [modalOpen, setModalOpen]         = useState(false);
  const [inputName, setInputName]         = useState('');
  const [inputError, setInputError]       = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [timeLeft, setTimeLeft]           = useState(AUTO_SECONDS);

  const [heroClipPair] = useState(() => pickTwoHeroClips());

  const [displayedProfiles] = useState(() => {
    const savedName   = localStorage.getItem(STORAGE_KEY);
    const savedAvatar = localStorage.getItem(AVATAR_KEY);
    const randoms     = pickThreeUniqueNames(PROFILE_NAMES);
    const avatarPool  = pickUniqueAvatars(3);

    if (savedName) {
      const others = randoms.filter(n => n.toLowerCase() !== savedName.toLowerCase());
      return [
        { name: savedName,  avatarSrc: savedAvatar || null, isCustom: true },
        { name: others[0],  avatarSrc: avatarPool[0].src },
        { name: others[1],  avatarSrc: avatarPool[1].src },
      ];
    }
    return randoms.map((name, i) => ({ name, avatarSrc: avatarPool[i].src }));
  });

  const handleSelect = useCallback((profileName) => {
    setFading(true);
    setTimeout(() => onSelect(profileName), 800);
  }, [onSelect]);

  useEffect(() => {
    if (modalOpen || fading) return;
    if (timeLeft <= 0) {
      handleSelect(displayedProfiles[0].name);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, modalOpen, fading, handleSelect, displayedProfiles]);

  const openModal = () => {
    const existingAvatarSrc = localStorage.getItem(AVATAR_KEY);
    const preselected = existingAvatarSrc
      ? AVATARS.find(av => av.src === existingAvatarSrc) ?? null
      : null;
    setInputName('');
    setInputError('');
    setSelectedAvatar(preselected);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setInputName('');
    setInputError('');
    setSelectedAvatar(null);
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
    if (selectedAvatar) {
      localStorage.setItem(AVATAR_KEY, selectedAvatar.src);
    } else {
      localStorage.removeItem(AVATAR_KEY);
    }
    closeModal();
    handleSelect(trimmed);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleContinue();
    if (e.key === 'Escape') closeModal();
  };

  const progressPct = (timeLeft / AUTO_SECONDS) * 100;

  return (
    <div className={`profile-select-container ${fading ? 'fade-out' : ''}`}>

      {/* ── Cinematic hero backdrop ── */}
      <div className="profile-hero">
        <div className="profile-hero-images">
          {heroClipPair.map((clip) => (
            <img
              key={clip.id}
              src={getHeroThumbnail(clip.url)}
              onLoad={(e) => {
                /* YouTube returns a 120×90 placeholder when maxresdefault is unavailable */
                if (e.target.naturalWidth <= 120) {
                  e.target.src = getHeroThumbnailFallback(clip.url);
                }
              }}
              onError={(e) => { e.target.onerror = null; e.target.src = clip.heroImage; }}
              alt=""
              className="profile-hero-img"
              aria-hidden="true"
            />
          ))}
        </div>
        <div className="profile-hero-gradient" />
        <div className="profile-hero-logo">
          <img src="/mtv-logo-transparent.png" alt="Movie Trailer Voice" className="profile-logo-wordmark" />
        </div>
      </div>

      {/* ── Profile picker ── */}
      <div className="profile-select-content">
        <h1 className="profile-heading">What You Watching?</h1>
        <div className="profiles-row">
          {displayedProfiles.map((profile, idx) => (
            <div
              key={profile.name}
              className={`profile-card slide-up slide-up-delay-${idx}`}
              onClick={() => handleSelect(profile.name)}
            >
              <div className="profile-avatar">
                {profile.avatarSrc ? (
                  <img src={profile.avatarSrc} alt={profile.name} className="profile-avatar-img" />
                ) : (
                  <div className="profile-avatar-fallback" style={{ background: CUSTOM_TILE_COLOR }}>
                    <span className="display-font profile-icon">{profile.name[0]}</span>
                  </div>
                )}
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          ))}

          <div className="profile-card add-profile-card slide-up slide-up-delay-3" onClick={openModal}>
            <div className="profile-avatar add-profile-avatar">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                <line x1="12" y1="4" x2="12" y2="20"></line>
                <line x1="4" y1="12" x2="20" y2="12"></line>
              </svg>
            </div>
            <span className="profile-name">Add Profile</span>
          </div>
        </div>
      </div>

      {/* ── Countdown bar ── */}
      <div className="auto-advance-bar">
        <div className="auto-advance-progress" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── Add/Edit Profile modal ── */}
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

            <p className="avatar-picker-label">Pick an avatar</p>
            <div className="avatar-picker">
              {AVATARS.map((av) => (
                <button
                  key={av.id}
                  className={`avatar-option ${selectedAvatar?.id === av.id ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(av)}
                  aria-label={av.label}
                  type="button"
                >
                  <img src={av.src} alt={av.label} />
                </button>
              ))}
            </div>

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
