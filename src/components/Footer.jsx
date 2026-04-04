import React from 'react';
import './Footer.css';

const MICROSITES = [
  { label: 'VoiceOfGod.co.uk',  href: 'https://www.voiceofgod.co.uk' },
  { label: 'PathéVoice.co.uk',  href: 'https://www.pathevoice.co.uk' },
  { label: 'SantaGuy.co.uk',    href: 'https://www.santaguy.co.uk' },
];

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-left">
          <img src="/mtv-logo-transparent.png" alt="Movie Trailer Voice" className="footer-logo" />
        </div>

        <div className="footer-center">
          <div className="footer-microsites">
            {MICROSITES.map((site, i) => (
              <React.Fragment key={site.href}>
                {i > 0 && <span className="footer-dot">·</span>}
                <a href={site.href} target="_blank" rel="noopener noreferrer">{site.label}</a>
              </React.Fragment>
            ))}
          </div>
          <p className="footer-copy">© {new Date().getFullYear()} Guy Harris / Movie Trailer Voice. All rights reserved.</p>
        </div>

        <div className="footer-right">
          <a href="https://www.voiceoverguy.co.uk" target="_blank" rel="noopener noreferrer" className="footer-v-link" aria-label="VoiceoverGuy website">
            <img src="/v-logo-transparent.png" alt="VoiceoverGuy" className="footer-v-logo" />
            <span className="footer-v-label">VoiceoverGuy</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
