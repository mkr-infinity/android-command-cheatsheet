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

    const spacing = 48; // Grid cell spacing in px
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

    const repulsionRadius = 160; // Influence radius around cursor
    const repulsionStrength = 55; // Maximum displacement in px
    const spring = 0.08; // Spring return stiffness
    const friction = 0.82; // Damping

    const render = () => {
      // Smoothly interpolate mouse coordinates
      mouseX += (targetMouseX - mouseX) * 0.2;
      mouseY += (targetMouseY - mouseY) * 0.2;

      const isDark = document.documentElement.classList.contains('dark');

      ctx.clearRect(0, 0, width, height);

      // Colors adapted for dark vs light mode
      const baseLineColor = isDark
        ? 'rgba(255, 255, 255, 0.035)'
        : 'rgba(0, 0, 0, 0.045)';
      const activeLineColor = isDark
        ? 'rgba(226, 249, 82, 0.22)'
        : 'rgba(4, 120, 87, 0.22)';
      const nodeColor = isDark
        ? 'rgba(226, 249, 82, 0.5)'
        : 'rgba(4, 120, 87, 0.5)';

      // 1. Update point physics (Magnetic Repulsion)
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];

          // Compute distance to mouse
          const dx = p.x - mouseX;
          const dy = p.y - mouseY;
          const dist = Math.sqrt(dx * dx + dy * dy);

          let targetX = p.originX;
          let targetY = p.originY;

          // If mouse is near, apply strong magnetic repulsion force (poles repel)
          if (dist < repulsionRadius && dist > 0) {
            const force = (1 - dist / repulsionRadius);
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

      // 2. Render horizontal grid lines
      ctx.lineWidth = 1;
      for (let r = 0; r < rows; r++) {
        ctx.beginPath();
        for (let c = 0; c < cols; c++) {
          const p = points[r][c];
          if (c === 0) {
            ctx.moveTo(p.x, p.y);
          } else {
            const prev = points[r][c - 1];
            // Smooth midpoint bezier for organic curve
            const midX = (prev.x + p.x) / 2;
            const midY = (prev.y + p.y) / 2;
            ctx.quadraticCurveTo(prev.x, prev.y, midX, midY);
          }
        }
        ctx.strokeStyle = baseLineColor;
        ctx.stroke();
      }

      // 3. Render vertical grid lines
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

      // 4. Draw magnetic node dots near cursor with glowing highlight
      if (mouseX > -100 && mouseX < width + 100 && mouseY > -100 && mouseY < height + 100) {
        for (let r = 0; r < rows; r++) {
          for (let c = 0; c < cols; c++) {
            const p = points[r][c];
            const dist = Math.hypot(p.x - mouseX, p.y - mouseY);
            if (dist < repulsionRadius) {
              const alpha = (1 - dist / repulsionRadius);
              ctx.beginPath();
              ctx.arc(p.x, p.y, 1.5 * alpha + 0.5, 0, Math.PI * 2);
              ctx.fillStyle = nodeColor;
              ctx.globalAlpha = alpha;
              ctx.fill();
              ctx.globalAlpha = 1.0;
            }
          }
        }

        // Draw subtle magnetic field halo around cursor
        const gradient = ctx.createRadialGradient(
          mouseX,
          mouseY,
          10,
          mouseX,
          mouseY,
          repulsionRadius
        );
        gradient.addColorStop(0, activeLineColor);
        gradient.addColorStop(1, 'transparent');
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, repulsionRadius, 0, Math.PI * 2);
        ctx.fill();
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
      className="fixed inset-0 pointer-events-none z-0 opacity-80"
    />
  );
};
