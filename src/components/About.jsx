import { useFadeIn } from '../hooks/useFadeIn';
import { useMagnetic } from '../hooks/useMagnetic';

const STATS = [
  { value: '3', label: 'Projects' },
  { value: '1', label: 'Internship' },
  { value: "'26", label: 'NIT Delhi', subtitle: 'B.Tech ECE' },
];

export default function About() {
  const { ref, visible } = useFadeIn();
  const magnetic = useMagnetic(20);

  return (
    <section id="about" className="py-28 px-6">
      <div
        ref={ref}
        className={`max-w-5xl mx-auto fade-section ${visible ? 'visible' : ''}`}
      >
        {/* Two-column layout — vertically centered */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '3rem',
            alignItems: 'center',
          }}
          className="about-grid"
        >
          {/* Left column: heading + bio */}
          <div>
            <h2
              ref={magnetic.ref}
              onMouseMove={magnetic.onMouseMove}
              onMouseLeave={magnetic.onMouseLeave}
              className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 inline-block"
              style={{ fontFamily: 'var(--font-heading)', color: '#fff' }}
            >
              A bit about{' '}
              <span style={{ color: '#6366f1' }}>me</span>
            </h2>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '15px',
                lineHeight: 1.75,
                maxWidth: '520px',
              }}
            >
              I'm a final year ECE student at NIT Delhi who somehow ended up
              loving code more than circuits. I spend most of my time building
              backends, breaking things, fixing them, and occasionally turning
              spreadsheets into something actually useful. When I'm not coding
              I'm probably losing at Valorant or shooting photos for the college
              media club.
            </p>
          </div>

          {/* Right column: 3 stacked horizontal banner stat cards */}
          <div
            className={`stagger-in ${visible ? 'visible' : ''}`}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                className="glass-card group"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                  padding: '20px 24px',
                }}
              >
                {/* Vertical indigo accent bar */}
                <div
                  style={{
                    width: '3px',
                    height: '40px',
                    background: '#6366f1',
                    borderRadius: '2px',
                    flexShrink: 0,
                  }}
                />
                {/* Value */}
                <span
                  style={{
                    fontFamily: "'Bebas Neue', var(--font-heading)",
                    fontSize: '36px',
                    color: '#6366f1',
                    lineHeight: 1,
                    flexShrink: 0,
                  }}
                >
                  {stat.value}
                </span>
                {/* Label */}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', var(--font-body)",
                      fontSize: '14px',
                      color: 'rgba(255,255,255,0.6)',
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </span>
                  {stat.subtitle && (
                    <span
                      style={{
                        fontFamily: "'Plus Jakarta Sans', var(--font-body)",
                        fontSize: '11px',
                        color: 'rgba(255,255,255,0.35)',
                      }}
                    >
                      {stat.subtitle}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
