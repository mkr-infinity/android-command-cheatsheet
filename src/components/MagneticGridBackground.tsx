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

    const spacing = 46; // Grid cell spacing in px
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

    const repulsionRadius = 175; // Influence radius around cursor
    const repulsionStrength = 58; // Maximum displacement in px
    const spring = 0.085; // Spring return stiffness
    const friction = 0.81; // Damping

    const render = () => {
      // Smoothly interpolate mouse coordinates for fluid chaser feel
      mouseX += (targetMouseX - mouseX) * 0.18;
      mouseY += (targetMouseY - mouseY) * 0.18;

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, width, height);

      // Colors adapted for dark vs light mode
      const baseLineColor = isDark
        ? 'rgba(255, 255, 255, 0.032)'
        : 'rgba(15, 23, 42, 0.045)';
      const nodeColor = isDark
        ? 'rgba(204, 255, 0, 0.85)'
        : 'rgba(4, 120, 87, 0.85)';

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

          // If mouse is near, apply magnetic repulsion force (poles repel)
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

      // 2. Render horizontal grid lines with active magnetic illumination
      for (let r = 0; r < rows; r++) {
        for (let c = 1; c < cols; c++) {
          const prev = points[r][c - 1];
          const curr = points[r][c];

          const distToMouse = Math.min(
            Math.hypot(prev.x - mouseX, prev.y - mouseY),
            Math.hypot(curr.x - mouseX, curr.y - mouseY)
          );

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          ctx.lineTo(curr.x, curr.y);

          if (distToMouse < repulsionRadius) {
            const factor = 1 - distToMouse / repulsionRadius;
            ctx.strokeStyle = isDark
              ? `rgba(204, 255, 0, ${0.035 + factor * 0.28})`
              : `rgba(4, 120, 87, ${0.045 + factor * 0.24})`;
            ctx.lineWidth = 1 + factor * 0.8;
          } else {
            ctx.strokeStyle = baseLineColor;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // 3. Render vertical grid lines with active magnetic illumination
      for (let c = 0; c < cols; c++) {
        for (let r = 1; r < rows; r++) {
          const prev = points[r - 1][c];
          const curr = points[r][c];

          const distToMouse = Math.min(
            Math.hypot(prev.x - mouseX, prev.y - mouseY),
            Math.hypot(curr.x - mouseX, curr.y - mouseY)
          );

          ctx.beginPath();
          ctx.moveTo(prev.x, prev.y);
          const midX = (prev.x + curr.x) / 2;
          const midY = (prev.y + curr.y) / 2;
          ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          ctx.lineTo(curr.x, curr.y);

          if (distToMouse < repulsionRadius) {
            const factor = 1 - distToMouse / repulsionRadius;
            ctx.strokeStyle = isDark
              ? `rgba(204, 255, 0, ${0.035 + factor * 0.28})`
              : `rgba(4, 120, 87, ${0.045 + factor * 0.24})`;
            ctx.lineWidth = 1 + factor * 0.8;
          } else {
            ctx.strokeStyle = baseLineColor;
            ctx.lineWidth = 1;
          }
          ctx.stroke();
        }
      }

      // 4. Draw magnetic node dots with glowing highlights & cursor magnetic core
      if (mouseX > -100 && mouseX < width + 100 && mouseY > -100 && mouseY < height + 100) {
        // Multi-stop magnetic repulsion field aura around cursor
        const auraGradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          5,
          mouseX,
          mouseY,
          repulsionRadius
        );
        if (isDark) {
          auraGradient.addColorStop(0, 'rgba(204, 255, 0, 0.16)');
          auraGradient.addColorStop(0.35, 'rgba(0, 229, 255, 0.05)');
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

        // Node glow points
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = points[r][c];
            const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
            if (dist < repulsionRadius) {
              const alpha = 1 - dist / repulsionRadius;

              // Outer node aura
              ctx.beginPath();
              ctx.arc(p.x, p.y, 3 * alpha + 1, 0, Math.PI * 2);
              ctx.fillStyle = isDark
                ? `rgba(204, 255, 0, ${alpha * 0.28})`
                : `rgba(4, 120, 87, ${alpha * 0.22})`;
              ctx.fill();

              // Sharp central pin dot
              ctx.beginPath();
              ctx.arc(p.x, p.y, 1.2 * alpha + 0.6, 0, Math.PI * 2);
              ctx.fillStyle = nodeColor;
              ctx.fill();
            }
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
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};
