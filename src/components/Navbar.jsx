import { useState, useEffect } from 'react';
import { useTheme } from '../context/ThemeContext';

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Experience', href: '#experience' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { dark, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleLinkClick = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'backdrop-blur-xl border-b py-3'
          : 'bg-transparent py-5'
      }`}
      style={{
        backgroundColor: scrolled ? 'var(--bg-nav)' : 'transparent',
        borderColor: scrolled ? 'var(--border)' : 'transparent',
      }}
    >
      <div className="flex items-center justify-between w-full" style={{ paddingLeft: '1.5rem', paddingRight: '1.5rem' }}>
        {/* Logo — flush left */}
        <a href="#hero" className="text-xl font-bold tracking-tight" style={{ fontFamily: 'var(--font-heading)' }}>
          <span className="gradient-text">RS</span>
          <span style={{ color: 'var(--accent)' }}>.</span>
        </a>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8 ml-auto">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="relative px-4 py-2 text-sm font-medium transition-colors rounded-lg"
                style={{ color: 'var(--text-muted)' }}
                onMouseEnter={(e) => (e.target.style.color = 'var(--text)')}
                onMouseLeave={(e) => (e.target.style.color = 'var(--text-muted)')}
              >
                {link.label}
              </a>
            </li>
          ))}

          {/* Theme Toggle */}
          <li>
            <button
              onClick={toggle}
              className="theme-toggle cursor-hover"
              aria-label="Toggle theme"
            >
              <span className="theme-toggle-dot" />
            </button>
          </li>
        </ul>

        {/* Mobile: toggle + hamburger */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={toggle} className="theme-toggle cursor-hover" aria-label="Toggle theme">
            <span className="theme-toggle-dot" />
          </button>
          <button
            className="flex flex-col gap-1.5 p-2 rounded-lg transition-colors"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
            <span className={`block w-5 h-0.5 transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} style={{ backgroundColor: 'var(--text)' }} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-400 ${mobileOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
        <ul
          className="flex flex-col items-center gap-2 py-6 backdrop-blur-xl border-b"
          style={{ backgroundColor: 'var(--bg-nav)', borderColor: 'var(--border)' }}
        >
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                onClick={handleLinkClick}
                className="block px-6 py-2 text-sm font-medium transition-colors"
                style={{ color: 'var(--text-muted)' }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
