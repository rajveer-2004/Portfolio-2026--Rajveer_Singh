import { useEffect, useRef, useState, useCallback } from 'react';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const rippleRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(false);

  const onMove = useCallback((e) => {
    pos.current = { x: e.clientX, y: e.clientY };
    if (dotRef.current) {
      dotRef.current.style.left = `${e.clientX}px`;
      dotRef.current.style.top = `${e.clientY}px`;
    }
  }, []);

  const onClick = useCallback((e) => {
    if (!rippleRef.current) return;
    const el = rippleRef.current;
    el.style.left = `${e.clientX}px`;
    el.style.top = `${e.clientY}px`;
    el.classList.remove('ripple-burst');
    void el.offsetWidth;
    el.classList.add('ripple-burst');
  }, []);

  useEffect(() => {
    // Check if touch device
    if ('ontouchstart' in window) return;

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);

    // Hover detection
    const onOver = (e) => {
      if (e.target.closest('a, button, [role="button"], .cursor-hover')) {
        setHovering(true);
      }
    };
    const onOut = (e) => {
      if (e.target.closest('a, button, [role="button"], .cursor-hover')) {
        setHovering(false);
      }
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    // Ring follow with lag
    let raf;
    const followRing = () => {
      ringPos.current.x += (pos.current.x - ringPos.current.x) * 0.15;
      ringPos.current.y += (pos.current.y - ringPos.current.y) * 0.15;
      if (ringRef.current) {
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top = `${ringPos.current.y}px`;
      }
      raf = requestAnimationFrame(followRing);
    };
    raf = requestAnimationFrame(followRing);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, [onMove, onClick]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) return null;

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div
        ref={ringRef}
        className={`cursor-ring ${hovering ? 'cursor-ring--hover' : ''}`}
      />
      <div ref={rippleRef} className="cursor-ripple" />
    </>
  );
}
