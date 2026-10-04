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

    // Primary responsive follower
    let currentX = targetX;
    let currentY = targetY;

    // Secondary trailing aura with subtle inertia delay
    let trailX = targetX;
    let trailY = targetY;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (rafId === null) {
        rafId = requestAnimationFrame(updateChaser);
      }
    };

    const updateChaser = () => {
      // Primary tight spring
      currentX += (targetX - currentX) * 0.2;
      currentY += (targetY - currentY) * 0.2;

      // Secondary smooth trailing inertia
      trailX += (targetX - trailX) * 0.08;
      trailY += (targetY - trailY) * 0.08;

      if (bgRef.current) {
        bgRef.current.style.setProperty('--cursor-x', `${Math.round(currentX)}px`);
        bgRef.current.style.setProperty('--cursor-y', `${Math.round(currentY)}px`);
        bgRef.current.style.setProperty('--trail-x', `${Math.round(trailX)}px`);
        bgRef.current.style.setProperty('--trail-y', `${Math.round(trailY)}px`);
      }

      const diff = Math.abs(targetX - currentX) + Math.abs(targetY - currentY) + Math.abs(targetX - trailX) + Math.abs(targetY - trailY);
      if (diff > 0.5) {
        rafId = requestAnimationFrame(updateChaser);
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
    >
      {/* Primary Responsive Cyber Glow */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{
          background: `radial-gradient(450px circle at var(--cursor-x, 50vw) var(--cursor-y, 30vh), var(--primary-cursor-glow, rgba(204, 255, 0, 0.07)), transparent 70%)`,
        }}
      />

      {/* Secondary Ambient Trailing Light Aura */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(750px circle at var(--trail-x, 50vw) var(--trail-y, 30vh), var(--trail-cursor-glow, rgba(0, 229, 255, 0.035)), transparent 65%)`,
        }}
      />

      <style>{`
        :root {
          --primary-cursor-glow: rgba(4, 120, 87, 0.07);
          --trail-cursor-glow: rgba(59, 130, 246, 0.04);
        }
        html.dark {
          --primary-cursor-glow: rgba(204, 255, 0, 0.075);
          --trail-cursor-glow: rgba(0, 229, 255, 0.04);
        }
      `}</style>
    </div>
  );
};
