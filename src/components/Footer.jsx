export default function Footer() {
  return (
    <footer className="py-8 px-6" style={{ borderTop: '1px solid var(--border)' }}>
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm" style={{ color: 'var(--text-muted)' }}>
          Built by{' '}
          <span className="gradient-text font-medium">Rajveer Singh</span>
          {' '}&copy; 2025
        </p>
        <p className="text-xs" style={{ color: 'var(--text-light)' }}>
          React &amp; TailwindCSS
        </p>
      </div>
    </footer>
  );
}
