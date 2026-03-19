import { useMemo } from 'react';

export default function Particles() {
  const particles = useMemo(() => {
    return Array.from({ length: 250 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: (12 + Math.random() * 18) / 4, // speed factor 4x
      delay: Math.random() * 15,
    }));
  }, []);

  return (
    <div className="particles-fullpage">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: '-5%',
            width: `${p.size}px`,
            height: `${p.size}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
