import { useFadeIn } from '../hooks/useFadeIn';
import { useMagnetic } from '../hooks/useMagnetic';

const EXPERIENCES = [
  {
    title: 'Software Developer Intern',
    company: 'Corporate Cruise',
    period: 'Jun – Aug 2025',
    description:
      'Wrote backend modules in JavaScript, built REST APIs, handled auth flows, and integrated third-party APIs. Got very comfortable with things breaking in production.',
  },
];

export default function Experience() {
  const { ref, visible } = useFadeIn();
  const magnetic = useMagnetic(20);

  return (
    <section id="experience" className="py-28 px-6">
      <div
        ref={ref}
        className={`max-w-3xl mx-auto fade-section ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase gradient-text mb-3">
            Experience
          </p>
          <h2
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold inline-block"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Where I've <span className="gradient-text">worked</span>
          </h2>
        </div>

        <div className={`stagger-in ${visible ? 'visible' : ''}`}>
          {EXPERIENCES.map((exp, i) => (
            <div key={i} className="glass-card p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-3">
                <h3 className="text-lg font-semibold" style={{ fontFamily: 'var(--font-heading)' }}>
                  {exp.title}
                </h3>
                <span className="text-xs font-medium px-3 py-1 rounded-full w-fit" style={{ background: 'var(--bg-card)', border: '1px solid var(--accent-border)', color: 'var(--text-muted)' }}>
                  {exp.period}
                </span>
              </div>
              <p className="text-sm font-medium mb-3" style={{ color: 'var(--accent)' }}>
                {exp.company}
              </p>
              <p className="text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                {exp.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
