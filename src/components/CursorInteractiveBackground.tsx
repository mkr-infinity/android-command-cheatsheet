import React, { useEffect, useRef } from 'react';

export const CursorInteractiveBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Avoid running on touch devices or if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch || !bgRef.current) return;

    let rafId: number | null = null;
    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let currentX = targetX;
    let currentY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(updateGlow);
      }
    };

    const updateGlow = () => {
      // Smooth interpolation for fluid cyber glow
      currentX += (targetX - currentX) * 0.18;
      currentY += (targetY - currentY) * 0.18;

      if (bgRef.current) {
        bgRef.current.style.setProperty('--cursor-x', `${Math.round(currentX)}px`);
        bgRef.current.style.setProperty('--cursor-y', `${Math.round(currentY)}px`);
      }

      const diff = Math.abs(targetX - currentX) + Math.abs(targetY - currentY);
      if (diff > 0.5) {
        rafId = requestAnimationFrame(updateGlow);
      } else {
        rafId = null;
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div
      ref={bgRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden transition-opacity duration-300"
      style={{
        background: `radial-gradient(600px circle at var(--cursor-x, 50vw) var(--cursor-y, 30vh), var(--cursor-glow-color, rgba(226, 249, 82, 0.045)), transparent 65%)`,
      }}
    >
      <style>{`
        :root {
          --cursor-glow-color: rgba(0, 0, 0, 0.035);
        }
        html.dark {
          --cursor-glow-color: rgba(226, 249, 82, 0.045);
        }
      `}</style>
    </div>
  );
};
