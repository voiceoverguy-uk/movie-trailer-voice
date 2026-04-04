import React, { useEffect, useRef } from 'react';
import './Sections.css';

export default function ContactSection() {
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
    <section id="contact" className="content-section fade-up-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-card">
          <h2 className="section-heading display-font">Book This Voice</h2>
          <p className="contact-subtext">Ready to make your next trailer unforgettable?</p>
          <div className="contact-actions">
            <a href="mailto:movie@voiceoverguy.co.uk" className="btn btn-primary">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                <polyline points="22,6 12,13 2,6"></polyline>
              </svg>
              Send an Enquiry
            </a>
            <a href="https://www.youtube.com/user/voiceoverguyharris" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
              YouTube Channel
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
