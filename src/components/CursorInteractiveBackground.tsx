import React, { useEffect, useRef } from 'react';

export const CursorInteractiveBackground: React.FC = () => {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{
        background: `radial-gradient(650px circle at var(--cursor-x, 50vw) var(--cursor-y, 30vh), var(--cursor-glow-color, rgba(226, 249, 82, 0.05)), transparent 65%)`,
      }}
    >
      <style>{`
        :root {
          --cursor-glow-color: rgba(4, 120, 87, 0.05);
        }
        html.dark {
          --cursor-glow-color: rgba(226, 249, 82, 0.06);
        }
      `}</style>
    </div>
  );
};
