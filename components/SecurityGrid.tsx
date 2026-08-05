import React, { useEffect, useRef } from 'react';

interface Hex {
  x: number;
  y: number;
  state: 0 | 1 | 2 | 3;
  opacity: number;
  holdTimer: number;
  speed: number;
}

const SecurityGrid: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const hexSize = 40;
    const hexHeight = hexSize * 2;
    const hexWidth = Math.sqrt(3) * hexSize;
    const verticalDistance = hexHeight * 0.75;
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let width = window.innerWidth;
    let height = window.innerHeight;
    let hexagons: Hex[] = [];
    let animationFrameId: number | null = null;

    const initializeGrid = () => {
      hexagons = [];
      const rows = Math.ceil(height / verticalDistance) + 2;
      const columns = Math.ceil(width / hexWidth) + 2;

      for (let row = 0; row < rows; row++) {
        for (let column = 0; column < columns; column++) {
          hexagons.push({
            x: column * hexWidth + (row % 2) * (hexWidth / 2) - hexWidth,
            y: row * verticalDistance - verticalDistance,
            state: 0,
            opacity: 0,
            holdTimer: 0,
            speed: 0.02 + Math.random() * 0.04,
          });
        }
      }
    };

    const drawHexagon = (x: number, y: number) => {
      ctx.beginPath();
      for (let index = 0; index < 6; index++) {
        const angle = (Math.PI / 3) * index + Math.PI / 6;
        const pointX = x + (hexSize - 2) * Math.cos(angle);
        const pointY = y + (hexSize - 2) * Math.sin(angle);
        if (index === 0) ctx.moveTo(pointX, pointY);
        else ctx.lineTo(pointX, pointY);
      }
      ctx.closePath();
    };

    const drawFrame = (updateAnimation: boolean) => {
      ctx.clearRect(0, 0, width, height);

      hexagons.forEach((hexagon) => {
        if (updateAnimation) {
          if (hexagon.state === 0 && Math.random() < 0.00005) {
            hexagon.state = 1;
          } else if (hexagon.state === 1) {
            hexagon.opacity = Math.min(1, hexagon.opacity + hexagon.speed);
            if (hexagon.opacity === 1) {
              hexagon.state = 2;
              hexagon.holdTimer = Math.random() * 40 + 20;
            }
          } else if (hexagon.state === 2) {
            hexagon.holdTimer -= 1;
            if (hexagon.holdTimer <= 0) hexagon.state = 3;
          } else if (hexagon.state === 3) {
            hexagon.opacity = Math.max(0, hexagon.opacity - hexagon.speed);
            if (hexagon.opacity === 0) hexagon.state = 0;
          }
        }

        drawHexagon(hexagon.x, hexagon.y);
        if (hexagon.state === 0) {
          ctx.strokeStyle = 'rgba(6, 182, 212, 0.1)';
          ctx.fillStyle = 'rgba(6, 182, 212, 0.005)';
          ctx.lineWidth = 1;
        } else {
          ctx.strokeStyle = `rgba(6, 182, 212, ${0.15 + hexagon.opacity * 0.4})`;
          ctx.fillStyle = `rgba(6, 182, 212, ${hexagon.opacity * 0.1})`;
          ctx.lineWidth = 1 + hexagon.opacity;
          ctx.shadowBlur = hexagon.opacity > 0.5 ? 15 * hexagon.opacity : 0;
          ctx.shadowColor = '#06b6d4';
        }

        ctx.fill();
        ctx.stroke();
        ctx.shadowBlur = 0;
      });
    };

    const animate = () => {
      drawFrame(true);
      animationFrameId = window.requestAnimationFrame(animate);
    };

    const stopAnimation = () => {
      if (animationFrameId !== null) {
        window.cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const updateMotionPreference = () => {
      stopAnimation();
      if (reducedMotionQuery.matches) drawFrame(false);
      else animationFrameId = window.requestAnimationFrame(animate);
    };

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const devicePixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * devicePixelRatio);
      canvas.height = Math.floor(height * devicePixelRatio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
      initializeGrid();
      drawFrame(false);
    };

    resize();
    updateMotionPreference();
    window.addEventListener('resize', resize);
    reducedMotionQuery.addEventListener('change', updateMotionPreference);

    return () => {
      stopAnimation();
      window.removeEventListener('resize', resize);
      reducedMotionQuery.removeEventListener('change', updateMotionPreference);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-full w-full"
    />
  );
};

export default SecurityGrid;
