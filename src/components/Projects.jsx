import { useState } from 'react';
import { useFadeIn } from '../hooks/useFadeIn';
import { useMagnetic } from '../hooks/useMagnetic';

const PROJECTS = [
  {
    title: 'Transactly',
    description: 'A backend wallet system I built to actually understand how money moves in apps. Auth, transactions, edge cases — all handled via REST APIs. Postman was open the entire time.',
    github: 'https://github.com/rajveer-2004/digital-wallet',
    gradient: 'rgba(30, 27, 75, 0.75)',
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800',
    ticker: 'NODE.JS · EXPRESS.JS · MONGODB · JAVASCRIPT · REST API · POSTMAN',
    span: true,
  },
  {
    title: 'PhytoSense',
    description: "A web app that lets you upload a photo of a plant and find out if it's diseased. I built the frontend and wired it up to an ML backend. Turns out plant detection is harder than it looks.",
    github: 'https://github.com/rajveer-2004/Phyto-Sense',
    gradient: 'rgba(6, 78, 59, 0.75)',
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=800',
    ticker: 'REACT.JS · HTML5 · CSS3 · JAVASCRIPT · ML INTEGRATION · RESPONSIVE UI',
    span: false,
  },
  {
    title: 'OLAP Sales Analysis',
    description: 'Built an analytical system in MySQL to slice through sales data and find trends. Designed the schema from scratch, wrote optimized queries, and made reports that actually made sense.',
    github: 'https://github.com/rajveer-2004/olap-sales-mysql',
    gradient: 'rgba(120, 53, 15, 0.75)',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
    ticker: 'MYSQL · SQL · STORED PROCEDURES · STAR SCHEMA · OLAP · QUERY OPTIMIZATION',
    span: false,
  },
];

function GithubIcon() {
  return (
    <svg fill="currentColor" viewBox="0 0 24 24">
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

function Marquee({ text }) {
  const doubled = `${text} · ${text} · `;
  return (
    <div className="marquee-wrapper">
      <div className="marquee-track">
        <span>{doubled}</span>
        <span>{doubled}</span>
      </div>
    </div>
  );
}

export default function Projects() {
  const { ref, visible } = useFadeIn();
  const magnetic = useMagnetic(20);
  const [activeModal, setActiveModal] = useState(null);

  return (
    <section id="projects" className="py-28 px-6 relative">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto fade-section ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase gradient-text mb-3"
             style={{ fontFamily: 'var(--font-body)' }}>
            Portfolio
          </p>
          <h2
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            className="inline-block"
            style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', lineHeight: 1.1 }}
          >
            Featured <span className="gradient-text">Projects</span>
          </h2>
        </div>

        {/* Bento Grid */}
        <div className="bento-grid">
          {PROJECTS.map((project) => (
            <div
              key={project.title}
              className="bento-card"
              style={{
                gridRow: project.span ? 'span 2' : 'span 1',
                minHeight: project.span ? '580px' : '280px',
              }}
            >
              {/* Full bleed cover image bg */}
              <div 
                className="bento-card-bg" 
                style={{ 
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }} 
              />

              {/* Color overlay matching the gradient */}
              <div 
                className="bento-card-color-overlay" 
                style={{ backgroundColor: project.gradient }} 
              />

              {/* Glassmorphism Blur Overlay (Hidden on Hover) */}
              <div className="bento-card-blur-overlay" />

              {/* Fades in on Hover Content Wrapper */}
              <div className="bento-card-content-hover">
                {/* Title Pill */}
                <div className="bento-card-title-pill">
                  <p className="bento-card-title">{project.title}</p>
                </div>

                <Marquee text={project.ticker} />

                {/* Description */}
                <div className="bento-card-description-container">
                  <p className="bento-card-desc">{project.description}</p>
                  <button 
                    className="read-more-btn cursor-hover"
                    onClick={() => setActiveModal(project)}
                  >
                    Read more →
                  </button>
                </div>

                {/* GitHub Icon */}
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bento-card-github cursor-hover"
                  aria-label={`${project.title} GitHub`}
                >
                  <GithubIcon />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal Overlay */}
      {activeModal && (
        <div className="project-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="project-modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="project-modal-close cursor-hover" onClick={() => setActiveModal(null)}>
              ✕
            </button>
            <h3 className="project-modal-title">{activeModal.title}</h3>
            <p className="project-modal-desc">{activeModal.description}</p>
            <a 
              href={activeModal.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-block mt-6 px-6 py-2 rounded-full cursor-hover"
              style={{ background: 'var(--accent)', color: '#fff', fontSize: '14px', fontWeight: '500' }}
            >
              View on GitHub
            </a>
          </div>
        </div>
      )}
    </section>
  );
}
