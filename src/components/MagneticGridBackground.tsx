import React, { useEffect, useRef } from 'react';

interface Point {
  originX: number;
  originY: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
}

export const MagneticGridBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    // Disable on touch devices or reduced-motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (prefersReducedMotion || isTouch) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates (default off-screen)
    let mouseX = -9999;
    let mouseY = -9999;
    let targetMouseX = -9999;
    let targetMouseY = -9999;

    const spacing = 44; // Grid cell spacing in px for crisp cyber mesh
    let points: Point[][] = [];
    let cols = 0;
    let rows = 0;

    const initGrid = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      cols = Math.ceil(width / spacing) + 2;
      rows = Math.ceil(height / spacing) + 2;

      points = [];
      for (let r = 0; r < rows; r++) {
        const rowPoints: Point[] = [];
        for (let c = 0; c < cols; c++) {
          const originX = (c - 0.5) * spacing;
          const originY = (r - 0.5) * spacing;
          rowPoints.push({
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
          });
        }
        points.push(rowPoints);
      }
    };

    initGrid();

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    const handleMouseLeave = () => {
      targetMouseX = -9999;
      targetMouseY = -9999;
    };

    const handleResize = () => {
      initGrid();
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);

    const repulsionRadius = 180; // Influence radius around cursor
    const repulsionStrength = 60; // Maximum magnetic displacement in px
    const spring = 0.09; // Spring stiffness
    const friction = 0.82; // Damping

    const render = () => {
      // Smoothly interpolate mouse coordinates for fluid trailing response
      mouseX += (targetMouseX - mouseX) * 0.2;
      mouseY += (targetMouseY - mouseY) * 0.2;

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, width, height);

      // High-visibility base grid lines
      const baseLineColor = isDark
        ? 'rgba(255, 255, 255, 0.08)' // Clear, crisp cyber grid in dark mode
        : 'rgba(15, 23, 42, 0.09)'; // Clear, high-contrast blueprint grid in light mode

      const activeGlowLineColor = isDark
        ? 'rgba(204, 255, 0, 0.55)'
        : 'rgba(4, 120, 87, 0.45)';

      const nodeBaseColor = isDark
        ? 'rgba(255, 255, 255, 0.14)'
        : 'rgba(15, 23, 42, 0.15)';

      const nodeActiveColor = isDark
        ? 'rgba(204, 255, 0, 0.95)'
        : 'rgba(4, 120, 87, 0.95)';

      // 1. Update point physics (Magnetic Repulsion)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Compute distance to mouse
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.hypot(dx, dy);

          let targetX = p.originX;
          let targetY = p.originY;

          // If mouse is near, apply strong magnetic repulsion force (poles repel)
          if (dist < repulsionRadius && dist > 0) {
            const force = 1 - dist / repulsionRadius;
            const push = force * repulsionStrength;
            const angle = Math.atan2(dy, dx);

            targetX = p.originX + Math.cos(angle) * push;
            targetY = p.originY + Math.sin(angle) * push;
          }

          // Spring physics back to target
          const ax = (targetX - p.x) * spring;
          const ay = (targetY - p.y) * spring;

          p.vx = (p.vx + ax) * friction;
          p.vy = (p.vy + ay) * friction;

          p.x += p.vx;
          p.y += p.vy;
        }
      }

      // 2. Render continuous horizontal grid lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r][c - 1];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = baseLineColor;
        ctx.stroke();
      }

      // 3. Render continuous vertical grid lines
      for (let c = 0; c < cols; c++) {
        ctx.beginPath();
        for (let r = 0; r < rows; r++) {
          const p = points[r][c];
          if (r === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r - 1][c];
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = baseLineColor;
        ctx.stroke();
      }

      // 4. Highlight active distorted grid lines near cursor
      if (mouseX > -100 && mouseX < width + 100 && mouseY > -100 && mouseY < height + 100) {
        ctx.lineWidth = 1.6;
        ctx.strokeStyle = activeGlowLineColor;

        // Active horizontal segments
        for (let r = 0; r < rows; r++) {
          for (let c = 1; c < cols; c++) {
            const p = points[r][c];
            const prev = points[r][c - 1];
            const dist = Math.min(
              Math.hypot(p.x - mouseX, p.y - mouseY),
              Math.hypot(prev.x - mouseX, prev.y - mouseY)
            );
            if (dist < repulsionRadius * 0.9) {
              ctx.beginPath();
              ctx.moveTo(prev.x, prev.y);
              const midX = (prev.x + p.x) / 2;
              const midY = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
              ctx.stroke();
            }
          }
        }

        // Active vertical segments
        for (let c = 0; c < cols; c++) {
          for (let r = 1; r < rows; r++) {
            const p = points[r][c];
            const prev = points[r - 1][c];
            const dist = Math.min(
              Math.hypot(p.x - mouseX, p.y - mouseY),
              Math.hypot(prev.x - mouseX, prev.y - mouseY)
            );
            if (dist < repulsionRadius * 0.9) {
              ctx.beginPath();
              ctx.moveTo(prev.x, prev.y);
              const midX = (prev.x + p.x) / 2;
              const midY = (prev.y + p.y) / 2;
              ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
              ctx.stroke();
            }
          }
        }

        // Multi-stop magnetic field aura around cursor
        const auraGradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          5,
          mouseX,
          mouseY,
          repulsionRadius
        );
        if (isDark) {
          auraGradient.addColorStop(0, 'rgba(204, 255, 0, 0.15)');
          auraGradient.addColorStop(0.4, 'rgba(0, 229, 255, 0.05)');
          auraGradient.addColorStop(1, 'transparent');
        } else {
          auraGradient.addColorStop(0, 'rgba(4, 120, 87, 0.12)');
          auraGradient.addColorStop(0.4, 'rgba(59, 130, 246, 0.04)');
          auraGradient.addColorStop(1, 'transparent');
        }

        ctx.fillStyle = auraGradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, repulsionRadius, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw grid intersection node points
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          const dist = Math.hypot(p.x - mouseX, p.y - mouseY);

          if (dist < repulsionRadius) {
            const alpha = 1 - dist / repulsionRadius;

            // Outer node glow
            ctx.beginPath();
            ctx.arc(p.x, p.y, 3 * alpha + 1.2, 0, Math.PI * 2);
            ctx.fillStyle = isDark
              ? `rgba(204, 255, 0, ${alpha * 0.3})`
              : `rgba(4, 120, 87, ${alpha * 0.25})`;
            ctx.fill();

            // Active node core
            ctx.beginPath();
            ctx.arc(p.x, p.y, 1.4 * alpha + 0.8, 0, Math.PI * 2);
            ctx.fillStyle = nodeActiveColor;
            ctx.fill();
          } else {
            // Subtle resting micro-node at intersection
            ctx.beginPath();
            ctx.arc(p.originX, p.originY, 0.8, 0, Math.PI * 2);
            ctx.fillStyle = nodeBaseColor;
            ctx.fill();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[1]"
    />
  );
};
