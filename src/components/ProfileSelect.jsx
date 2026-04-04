import React, { useState, useEffect, useCallback } from 'react';
import { AVATARS } from '../data/avatars';
import { heroClips } from '../data/videos';
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
const STORAGE_KEY  = 'mtv_custom_profile';
const AVATAR_KEY   = 'mtv_custom_avatar';
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
  const [fading, setFading]                 = useState(false);
  const [modalOpen, setModalOpen]           = useState(false);
  const [modalMode, setModalMode]           = useState('create'); // 'create' | 'edit'
  const [inputName, setInputName]           = useState('');
  const [inputError, setInputError]         = useState('');
  const [selectedAvatar, setSelectedAvatar] = useState(null);
  const [timeLeft, setTimeLeft]             = useState(AUTO_SECONDS);

  /* Custom profile — tracked in state so edits update the tile live */
  const [customProfile, setCustomProfile] = useState(() => {
    const name      = localStorage.getItem(STORAGE_KEY);
    const avatarSrc = localStorage.getItem(AVATAR_KEY);
    return name ? { name, avatarSrc } : null;
  });

  /* Celebrity tiles — fixed on mount, 2 slots when custom profile exists, 3 otherwise */
  const [celebProfiles] = useState(() => {
    const savedName  = localStorage.getItem(STORAGE_KEY);
    const randoms    = pickThreeUniqueNames(PROFILE_NAMES);
    const avatarPool = pickUniqueAvatars(3);
    const names = savedName
      ? randoms.filter(n => n.toLowerCase() !== savedName.toLowerCase()).slice(0, 2)
      : randoms.slice(0, 3);
    return names.map((name, i) => ({ name, avatarSrc: avatarPool[i].src }));
  });

  /* Hero backdrop images */
  const [heroClipPair] = useState(() => pickTwoHeroClips());

  /* ── Auto-advance timer ── */
  const handleSelect = useCallback((profileName) => {
    setFading(true);
    setTimeout(() => onSelect(profileName), 800);
  }, [onSelect]);

  useEffect(() => {
    if (modalOpen || fading) return;
    if (timeLeft <= 0) {
      const first = customProfile ?? celebProfiles[0];
      handleSelect(first.name);
      return;
    }
    const id = setTimeout(() => setTimeLeft(t => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, modalOpen, fading, handleSelect, customProfile, celebProfiles]);

  /* ── Modal helpers ── */
  const openCreateModal = () => {
    setModalMode('create');
    setInputName('');
    setInputError('');
    setSelectedAvatar(null);
    setModalOpen(true);
  };

  const openEditModal = (e) => {
    e.stopPropagation();
    const existingName      = localStorage.getItem(STORAGE_KEY) ?? '';
    const existingAvatarSrc = localStorage.getItem(AVATAR_KEY);
    const preselected = existingAvatarSrc
      ? AVATARS.find(av => av.src === existingAvatarSrc) ?? null
      : null;
    setModalMode('edit');
    setInputName(existingName);
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

  const validateName = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return { ok: false, error: '' };
    if (trimmed.length > 11) return { ok: false, error: 'First name must be 11 characters or fewer.' };
    if (!NAME_PATTERN.test(trimmed)) return { ok: false, error: 'First names only — letters, hyphens and apostrophes allowed.' };
    return { ok: true, trimmed };
  };

  const handleContinue = () => {
    const { ok, trimmed, error } = validateName(inputName);
    if (!ok) { setInputError(error); return; }

    localStorage.setItem(STORAGE_KEY, trimmed);
    const avatarSrc = selectedAvatar ? selectedAvatar.src : null;
    if (avatarSrc) {
      localStorage.setItem(AVATAR_KEY, avatarSrc);
    } else {
      localStorage.removeItem(AVATAR_KEY);
    }

    if (modalMode === 'edit') {
      /* Edit: update tile in place, stay on splash */
      setCustomProfile({ name: trimmed, avatarSrc });
      closeModal();
    } else {
      /* Create: navigate straight into the site */
      closeModal();
      handleSelect(trimmed);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleContinue();
    if (e.key === 'Escape') closeModal();
  };

  const progressPct = (timeLeft / AUTO_SECONDS) * 100;

  /* Profiles to render in the row */
  const profiles = customProfile
    ? [{ ...customProfile, isCustom: true }, ...celebProfiles.slice(0, 2)]
    : celebProfiles;

  return (
    <div className={`profile-select-container ${fading ? 'fade-out' : ''}`}>

      {/* ── Cinematic hero backdrop ── */}
      <div className="profile-hero">
        <div className="profile-hero-images">
          {heroClipPair.map((clip) => (
            <img
              key={clip.id}
              src={clip.heroImage}
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
          {profiles.map((profile, idx) => (
            <div
              key={profile.name}
              className={`profile-card slide-up slide-up-delay-${idx}`}
              onClick={() => handleSelect(profile.name)}
            >
              <div className="profile-avatar-wrap">
                <div className="profile-avatar">
                  {profile.avatarSrc ? (
                    <img src={profile.avatarSrc} alt={profile.name} className="profile-avatar-img" />
                  ) : (
                    <div className="profile-avatar-fallback" style={{ background: CUSTOM_TILE_COLOR }}>
                      <span className="display-font profile-icon">{profile.name[0]}</span>
                    </div>
                  )}
                </div>

                {/* Edit pencil — only on the custom tile */}
                {profile.isCustom && (
                  <button
                    className="profile-edit-btn"
                    onClick={openEditModal}
                    aria-label="Edit profile"
                    title="Edit profile"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
                      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
                    </svg>
                  </button>
                )}
              </div>
              <span className="profile-name">{profile.name}</span>
            </div>
          ))}

          {/* Add Profile tile */}
          <div className="profile-card add-profile-card slide-up slide-up-delay-3" onClick={openCreateModal}>
            <div className="profile-avatar">
              <div className="add-profile-avatar">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="square">
                  <line x1="12" y1="4" x2="12" y2="20"></line>
                  <line x1="4" y1="12" x2="20" y2="12"></line>
                </svg>
              </div>
            </div>
            <span className="profile-name">Add Profile</span>
          </div>
        </div>
      </div>

      {/* ── Countdown bar ── */}
      <div className="auto-advance-bar">
        <div className="auto-advance-progress" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── Modal ── */}
      {modalOpen && (
        <div className="profile-modal-backdrop" onClick={closeModal}>
          <div className="profile-modal" onClick={(e) => e.stopPropagation()}>
            <h2 className="profile-modal-title">
              {modalMode === 'edit' ? 'Edit Profile' : 'Create Your Profile'}
            </h2>

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
              {modalMode === 'edit' ? 'Save Changes' : 'Continue'}
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
