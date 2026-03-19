import { useFadeIn } from '../hooks/useFadeIn';
import { useMagnetic } from '../hooks/useMagnetic';

const SKILL_GROUPS = [
  { title: 'Languages', skills: ['JavaScript', 'Python', 'C', 'C++'] },
  { title: 'Frontend', skills: ['React.js', 'HTML5', 'CSS3'] },
  { title: 'Backend', skills: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Databases', skills: ['MySQL', 'MongoDB', 'SQL'] },
  { title: 'Data & Analysis', skills: ['Query Optimization', 'Data Validation', 'OLAP'] },
  { title: 'Tools', skills: ['Git', 'GitHub', 'Postman', 'Jira', 'Confluence'] },
];

export default function Skills() {
  const { ref, visible } = useFadeIn(0.1);
  const magnetic = useMagnetic(20);

  return (
    <section id="skills" className="py-28 px-6">
      <div
        ref={ref}
        className={`max-w-4xl mx-auto fade-section ${visible ? 'visible' : ''}`}
      >
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest uppercase gradient-text mb-3">
            Expertise
          </p>
          <h2
            ref={magnetic.ref}
            onMouseMove={magnetic.onMouseMove}
            onMouseLeave={magnetic.onMouseLeave}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold inline-block"
            style={{ fontFamily: 'var(--font-heading)' }}
          >
            Skills & <span className="gradient-text">Tools</span>
          </h2>
        </div>

        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-8 stagger-in ${visible ? 'visible' : ''}`}>
          {SKILL_GROUPS.map((group) => (
            <div key={group.title}>
              <h3
                className="text-base font-semibold mb-4"
                style={{ fontFamily: 'var(--font-heading)', color: 'var(--text)' }}
              >
                {group.title}
              </h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-sm font-medium px-4 py-2 rounded-full transition-all hover:scale-105"
                    style={{
                      background: 'var(--bg-card)',
                      border: '1px solid var(--accent-border)',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
