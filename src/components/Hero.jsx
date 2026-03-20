import { useState, useEffect } from 'react';
import { useMagnetic } from '../hooks/useMagnetic';

const PHRASES = [
  'A Full Stack Developer.',
  'A Data Analyst.',
  'A Backend Engineer.',
  'A Problem Solver.',
];

function CrossfadeText() {
  const [activeIdx, setActiveIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % PHRASES.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full">
      {/* "I am" label */}
      <p
        className="text-center mb-2"
        style={{
          fontSize: '14px',
          color: 'var(--text-light)',
          letterSpacing: '0.2em',
          fontFamily: 'var(--font-body)',
          fontWeight: 500,
          textTransform: 'uppercase',
        }}
      >
        I am
      </p>

      {/* Crossfade container */}
      <div className="crossfade-container" style={{ height: 'clamp(52px, 8vw, 100px)' }}>
        {/* Spotlight glow */}
        <div className={`crossfade-spotlight ${activeIdx >= 0 ? 'active' : ''}`} />

        {PHRASES.map((phrase, i) => (
          <span
            key={phrase}
            className={`crossfade-phrase ${i === activeIdx ? 'active' : ''}`}
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(48px, 7vw, 96px)',
              color: 'var(--text)',
              lineHeight: 1.1,
              letterSpacing: '0.02em',
            }}
          >
            {phrase}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function Hero() {
  const magnetic = useMagnetic(20);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 overflow-hidden"
    >

      <div className="max-w-4xl w-full text-center relative z-10">
        {/* Badge */}
        <div
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full backdrop-blur-sm mb-8"
          style={{ border: '1px solid var(--border)', background: 'var(--bg-card)' }}
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="text-xs font-medium tracking-wide" style={{ color: 'var(--text-muted)' }}>
            Available for opportunities
          </span>
        </div>

        <h1
          ref={magnetic.ref}
          onMouseMove={magnetic.onMouseMove}
          onMouseLeave={magnetic.onMouseLeave}
          className="mb-6"
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(56px, 9vw, 120px)',
            lineHeight: 1,
            letterSpacing: '0.02em',
          }}
        >
          Hey, I'm{' '}
          <span className="gradient-text">Rajveer.</span>
        </h1>

        <CrossfadeText />

        <p className="text-base sm:text-lg max-w-xl mx-auto mt-8 mb-12 leading-relaxed" style={{ color: 'var(--text-light)' }}>
          I build things for the web and make sense of messy data.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#projects"
            className="btn-glow inline-flex items-center gap-2 px-8 py-3.5 text-white font-semibold rounded-full hover:scale-105 transition-transform"
            style={{ background: 'linear-gradient(135deg, var(--accent), #06b6d4)', boxShadow: '0 8px 24px var(--accent-glow)' }}
          >
            See my work
          </a>
          <a
            href="/resume.pdf"
            download="Rajveer_Singh_Resume.pdf"
            className="inline-flex items-center gap-2 px-8 py-3.5 font-semibold rounded-full transition-all hover:scale-105"
            style={{ border: '1px solid var(--border-hover)', color: 'var(--text)' }}
          >
            Download Resume
          </a>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="flex flex-col items-center gap-2"
        style={{
          position: 'absolute',
          bottom: '32px',
          left: '50%',
          transform: 'translateX(-50%)',
          opacity: scrolled ? 0 : 1,
          pointerEvents: scrolled ? 'none' : 'auto',
          transition: 'opacity 0.5s ease',
        }}
      >
        <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--text-light)' }}>Scroll</span>
        <div className="w-5 h-8 rounded-full flex justify-center pt-1.5" style={{ border: '2px solid var(--text-light)' }}>
          <div className="w-1 h-2 rounded-full animate-bounce" style={{ background: 'var(--accent)' }} />
        </div>
      </div>
    </section>
  );
}
