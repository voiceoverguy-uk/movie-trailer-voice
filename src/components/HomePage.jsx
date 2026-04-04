import React, { useEffect } from 'react';
import Navbar from './Navbar';
import HeroCarousel from './HeroCarousel';
import VideoRow from './VideoRow';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';
import Footer from './Footer';
import { heroClips, profileHeroMap, movieTrailerRow, bMovieRow, gameTrailersRow, otherSuggestionsRow } from '../data/videos';
import './HomePage.css';

export default function HomePage({ selectedProfile }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const initialHeroIndex = profileHeroMap[selectedProfile] !== undefined ? profileHeroMap[selectedProfile] : 0;

  return (
    <div className="home-page fade-in">
      <Navbar />
      <HeroCarousel heroClips={heroClips} initialIndex={initialHeroIndex} />
      <div className="main-content">
        <VideoRow id="trailers" row={movieTrailerRow} />
        <VideoRow id="b-movie" row={bMovieRow} />
        <VideoRow id="game-trailers" row={gameTrailersRow} />
        <VideoRow id="other-suggestions" row={otherSuggestionsRow} />
        <AboutSection />
        <ContactSection />
      </div>
      <Footer />
    </div>
  );
}
