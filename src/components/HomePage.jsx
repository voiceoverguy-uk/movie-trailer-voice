import React, { useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import HeroCarousel from './HeroCarousel';
import VideoRow from './VideoRow';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { heroClips, profileHeroMap, movieTrailerRow, bMovieRow, gameTrailersRow, fullCollectionRow } from '../data/videos';
import './HomePage.css';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function shuffledRow(row) {
  return { ...row, clips: shuffle(row.clips) };
}

export default function HomePage({ selectedProfile, onSwitchProfile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { shuffledHeroClips, initialHeroIndex } = useMemo(() => {
    const profileName = selectedProfile?.name ?? selectedProfile ?? '';
    const preferredId = heroClips[profileHeroMap[profileName]]?.id;
    const shuffled = shuffle(heroClips);
    const idx = preferredId ? Math.max(shuffled.findIndex(c => c.id === preferredId), 0) : 0;
    return { shuffledHeroClips: shuffled, initialHeroIndex: idx };
  }, []);

  const rows = useMemo(() => ({
    trailers: shuffledRow(movieTrailerRow),
    gameTrailers: shuffledRow(gameTrailersRow),
    bMovie: shuffledRow(bMovieRow),
    fullCollection: shuffledRow(fullCollectionRow),
  }), []);

  return (
    <div className="home-page fade-in">
      <Navbar selectedProfile={selectedProfile} onSwitchProfile={onSwitchProfile} />
      <HeroCarousel heroClips={shuffledHeroClips} initialIndex={initialHeroIndex} />
      <div className="main-content">
        <VideoRow id="trailers" row={rows.trailers} />
        <VideoRow id="game-trailers" row={rows.gameTrailers} />
        <VideoRow id="b-movie" row={rows.bMovie} />
        <VideoRow id="full-collection" row={rows.fullCollection} />
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
