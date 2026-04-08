import React, { useEffect, useRef, useState } from 'react';
import './Sections.css';

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function ContactSection() {
  const sectionRef = useRef(null);
  const [form, setForm]     = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState('idle');
  const [error, setError]   = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) entry.target.classList.add('visible'); },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const wordCount = countWords(form.message);
  const canSubmit = form.name.trim() && form.email.trim() && wordCount >= 6;

  async function handleSubmit(e) {
    e.preventDefault();
    if (!canSubmit) return;
    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setStatus('sent');
    } catch (err) {
      const known = ['All fields are required.', 'Message must be at least 6 words.', 'Please enter a valid email address.', 'Failed to send message. Please try again.'];
      setError(known.includes(err.message) ? err.message : 'Failed to send message. Please try again.');
      setStatus('idle');
    }
  }

  return (
    <section id="contact" className="content-section fade-up-section" ref={sectionRef}>
      <div className="container">
        <div className="contact-card">
          <h2 className="section-heading display-font">Book This Voice</h2>
          <p className="contact-subtext">Ready to make your next trailer unforgettable?</p>

          {status === 'sent' ? (
            <div className="contact-success">
              <p className="contact-success-text display-font">In a world...</p>
              <p className="contact-success-sub">where your message will be replied to shortly...</p>
              <p className="contact-success-thanks display-font">Thank you!</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit} noValidate>
              <div className="contact-form-row">
                <input
                  className="contact-input"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  autoCapitalize="words"
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <input
                  className="contact-input"
                  type="text"
                  inputMode="email"
                  autoComplete="email"
                  placeholder="Your email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
              </div>
              <textarea
                className="contact-input contact-textarea"
                placeholder="Tell Guy about your project..."
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                rows={5}
                required
              />
              {form.message && wordCount < 6 && (
                <p className="contact-word-hint">{6 - wordCount} more word{6 - wordCount !== 1 ? 's' : ''} to go…</p>
              )}
              {error && <p className="contact-error">{error}</p>}
              <div className="contact-actions">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!canSubmit || status === 'sending'}
                >
                  {status === 'sending' ? 'Sending…' : 'Send an Enquiry'}
                </button>
                <a href="https://www.youtube.com/user/voiceoverguyharris" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
                  </svg>
                  YouTube Channel
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
