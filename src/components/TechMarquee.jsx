const ROW1 = [
  { name: 'JavaScript', icon: 'js' },
  { name: 'React', icon: 'react' },
  { name: 'Node.js', icon: 'nodejs' },
  { name: 'Express.js', icon: 'express' },
  { name: 'MongoDB', icon: 'mongodb' },
  { name: 'MySQL', icon: 'mysql' },
  { name: 'Python', icon: 'python' },
];

const ROW2 = [
  { name: 'HTML5', icon: 'html' },
  { name: 'CSS3', icon: 'css' },
  { name: 'Git', icon: 'git' },
  { name: 'GitHub', icon: 'github' },
  { name: 'Postman', icon: 'postman' },
  { name: 'SQL', icon: 'mysql' },
  { name: 'C++', icon: 'cpp' },
];

function MarqueeRow({ items, direction = 'left' }) {
  // Duplicate 3x for seamless loop
  const tripled = [...items, ...items, ...items];

  return (
    <div
      className="tech-marquee-row"
      style={{
        padding: '8px 0',
      }}
    >
      <div className={`tech-marquee-track ${direction === 'right' ? 'reverse' : ''}`}>
        {tripled.map((item, i) => (
          <span key={`${item.name}-${i}`} className="tech-marquee-item">
            <img
              src={`https://skillicons.dev/icons?i=${item.icon}&theme=dark`}
              alt={item.name}
              width={24}
              height={24}
              loading="lazy"
            />
            <span>{item.name}</span>
            <span className="tech-marquee-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

export default function TechMarquee() {
  return (
    <section
      className="tech-marquee-section"
      aria-label="Tech Stack"
      style={{ margin: 0, padding: '8px 0', opacity: 1 }}
    >
      <MarqueeRow items={ROW1} direction="left" />
      <MarqueeRow items={ROW2} direction="right" />
    </section>
  );
}
