import { useRef, useCallback } from 'react';

export function useMagnetic(maxShift = 20) {
  const ref = useRef(null);

  const onMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      // skip touch
      if ('ontouchstart' in window) return;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const maxDist = Math.max(rect.width, rect.height);
      const factor = Math.min(dist / maxDist, 1);
      const tx = (dx / maxDist) * maxShift * factor;
      const ty = (dy / maxDist) * maxShift * factor;
      el.style.transform = `translate(${tx}px, ${ty}px)`;
      el.style.transition = 'transform 0.1s ease-out';
    },
    [maxShift]
  );

  const onMouseLeave = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = 'translate(0, 0)';
    el.style.transition = 'transform 0.4s cubic-bezier(0.23, 1, 0.32, 1)';
  }, []);

  return { ref, onMouseMove, onMouseLeave };
}
