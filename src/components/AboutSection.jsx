import React, { useEffect, useRef } from 'react';
import './Sections.css';

export default function AboutSection() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" className="content-section fade-up-section" ref={sectionRef}>
      <div className="container">
        <div className="about-content">
          <h2 className="section-heading display-font">The Voice Behind The Screen</h2>
          <p className="about-text">
            A voice behind some of gaming and entertainment's most memorable trailers. Commanding, cinematic, British or American. If your project needs gravitas, power, or a knowing wink, Guy delivers.
          </p>
          <a href="#contact" className="btn btn-primary">Book The Voice</a>
        </div>
      </div>
    </section>
  );
}
