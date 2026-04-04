import React, { useEffect, useMemo } from 'react';
import Navbar from './Navbar';
import HeroCarousel from './HeroCarousel';
import VideoRow from './VideoRow';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { heroClips, profileHeroMap, movieTrailerRow, bMovieRow, gameTrailersRow, otherSuggestionsRow } from '../data/videos';
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
  return { ...row, videos: shuffle(row.videos) };
}

export default function HomePage({ selectedProfile, onSwitchProfile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialHeroIndex = profileHeroMap[selectedProfile] !== undefined ? profileHeroMap[selectedProfile] : 0;

  const rows = useMemo(() => ({
    trailers: shuffledRow(movieTrailerRow),
    gameTrailers: shuffledRow(gameTrailersRow),
    otherSuggestions: shuffledRow(otherSuggestionsRow),
    bMovie: shuffledRow(bMovieRow),
  }), []);

  return (
    <div className="home-page fade-in">
      <Navbar onSwitchProfile={onSwitchProfile} />
      <HeroCarousel heroClips={heroClips} initialIndex={initialHeroIndex} />
      <div className="main-content">
        <VideoRow id="trailers" row={rows.trailers} />
        <VideoRow id="game-trailers" row={rows.gameTrailers} />
        <VideoRow id="other-suggestions" row={rows.otherSuggestions} />
        <VideoRow id="b-movie" row={rows.bMovie} />
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
