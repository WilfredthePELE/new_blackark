import React, { useEffect, useRef } from 'react';
import { ASSETS } from '../data/siteData';

interface ComputerVisionVideoProps {
  paused?: boolean;
  className?: string;
}

interface TrackTarget {
  id: string;
  label: string;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  w: number;
  h: number;
  accent: boolean;
}

const TARGETS: TrackTarget[] = [
  {
    id: 'TRK-01',
    label: 'AGV-04 · 99.4%',
    baseX: 0.56,
    baseY: 0.72,
    vx: 0.032,
    vy: -0.018,
    w: 0.068,
    h: 0.075,
    accent: true,
  },
  {
    id: 'TRK-02',
    label: 'UNIT-12 · SORT',
    baseX: 0.42,
    baseY: 0.62,
    vx: -0.024,
    vy: 0.014,
    w: 0.056,
    h: 0.064,
    accent: false,
  },
  {
    id: 'TRK-03',
    label: 'BAY-B2 · CLEAR',
    baseX: 0.72,
    baseY: 0.56,
    vx: 0.018,
    vy: 0.011,
    w: 0.062,
    h: 0.068,
    accent: true,
  },
  {
    id: 'TRK-04',
    label: 'LANE-07 · SYNC',
    baseX: 0.63,
    baseY: 0.48,
    vx: -0.02,
    vy: -0.01,
    w: 0.05,
    h: 0.055,
    accent: false,
  },
];

export const ComputerVisionVideo: React.FC<ComputerVisionVideoProps> = ({
  paused = false,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pausedRef = useRef(paused);
  pausedRef.current = paused;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.src = ASSETS.heroCvSurveillance;

    let animId = 0;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let elapsed = 0;
    let lastTime = performance.now();

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, Math.floor(rect.width * dpr));
      height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const drawBracketBox = (
      x: number,
      y: number,
      w: number,
      h: number,
      label: string,
      accent: boolean
    ) => {
      const corner = Math.min(w, h) * 0.24;
      ctx.strokeStyle = accent
        ? 'rgba(255, 102, 1, 0.92)'
        : 'rgba(244, 244, 244, 0.72)';
      ctx.lineWidth = 1.4 * dpr;

      ctx.beginPath();
      // Top-left
      ctx.moveTo(x, y + corner);
      ctx.lineTo(x, y);
      ctx.lineTo(x + corner, y);
      // Top-right
      ctx.moveTo(x + w - corner, y);
      ctx.lineTo(x + w, y);
      ctx.lineTo(x + w, y + corner);
      // Bottom-right
      ctx.moveTo(x + w, y + h - corner);
      ctx.lineTo(x + w, y + h);
      ctx.lineTo(x + w - corner, y + h);
      // Bottom-left
      ctx.moveTo(x + corner, y + h);
      ctx.lineTo(x, y + h);
      ctx.lineTo(x, y + h - corner);
      ctx.stroke();

      // Tiny center crosshair
      const cx = x + w / 2;
      const cy = y + h / 2;
      ctx.beginPath();
      ctx.moveTo(cx - 4 * dpr, cy);
      ctx.lineTo(cx + 4 * dpr, cy);
      ctx.moveTo(cx, cy - 4 * dpr);
      ctx.lineTo(cx, cy + 4 * dpr);
      ctx.strokeStyle = accent
        ? 'rgba(255, 102, 1, 0.55)'
        : 'rgba(244, 244, 244, 0.35)';
      ctx.lineWidth = 1 * dpr;
      ctx.stroke();

      // Label above box
      ctx.font = `${10 * dpr}px "JetBrains Mono", monospace`;
      ctx.fillStyle = accent
        ? 'rgba(255, 102, 1, 0.95)'
        : 'rgba(244, 244, 244, 0.85)';
      ctx.fillText(label, x, y - 6 * dpr);
    };

    const render = (now: number) => {
      const dt = Math.min(0.05, (now - lastTime) * 0.001);
      lastTime = now;
      if (!pausedRef.current && !prefersReduced) {
        elapsed += dt;
      }

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      if (img.complete && img.naturalWidth > 0) {
        // Smooth camera dolly zoom & gentle pan like real optical surveillance reel
        const zoom = prefersReduced ? 1.04 : 1.06 + Math.sin(elapsed * 0.25) * 0.04;
        const panX = prefersReduced ? 0 : Math.sin(elapsed * 0.18) * width * 0.018;
        const panY = prefersReduced ? 0 : Math.cos(elapsed * 0.22) * height * 0.012;

        const imgAspect = img.naturalWidth / img.naturalHeight;
        const canvasAspect = width / height;
        let drawW = width * zoom;
        let drawH = height * zoom;

        if (canvasAspect > imgAspect) {
          drawW = width * zoom;
          drawH = drawW / imgAspect;
        } else {
          drawH = height * zoom;
          drawW = drawH * imgAspect;
        }

        const dx = (width - drawW) / 2 + panX;
        const dy = (height - drawH) / 2 + panY;

        ctx.drawImage(img, dx, dy, drawW, drawH);

        // Sweeping horizontal optical lidar scan wave
        if (!prefersReduced) {
          const scanProgress = (elapsed * 0.16) % 1;
          const scanY = scanProgress * height;
          const scanGrad = ctx.createLinearGradient(0, scanY - 48 * dpr, 0, scanY + 6 * dpr);
          scanGrad.addColorStop(0, 'rgba(255, 102, 1, 0)');
          scanGrad.addColorStop(0.88, 'rgba(255, 102, 1, 0.12)');
          scanGrad.addColorStop(1, 'rgba(255, 102, 1, 0.45)');
          ctx.fillStyle = scanGrad;
          ctx.fillRect(0, scanY - 48 * dpr, width, 54 * dpr);
        }

        // Dynamic computer-vision bounding boxes tracking floor units
        for (let i = 0; i < TARGETS.length; i++) {
          const t = TARGETS[i];
          const osc = prefersReduced ? 0 : Math.sin(elapsed * 0.65 + i * 1.4);
          const osc2 = prefersReduced ? 0 : Math.cos(elapsed * 0.45 + i * 1.1);
          const tx = dx + (t.baseX + osc * t.vx) * drawW;
          const ty = dy + (t.baseY + osc2 * t.vy) * drawH;
          const tw = t.w * drawW;
          const th = t.h * drawH;
          drawBracketBox(tx, ty, tw, th, t.label, t.accent);
        }

        // Subtle optical grid hairlines
        ctx.strokeStyle = 'rgba(244, 244, 244, 0.05)';
        ctx.lineWidth = 1 * dpr;
        ctx.beginPath();
        ctx.moveTo(width * 0.5, 0);
        ctx.lineTo(width * 0.5, height);
        ctx.moveTo(0, height * 0.5);
        ctx.lineTo(width, height * 0.5);
        ctx.stroke();
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-[#080808] ${className}`}>
      {/* Fallback image layer ensures zero blank frame while canvas initializes */}
      <img
        src={ASSETS.heroCvSurveillance}
        alt="Automated computer vision operations center optical feed"
        referrerPolicy="no-referrer"
        className="absolute inset-0 h-full w-full object-cover opacity-80"
      />
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="relative z-10 block h-full w-full"
      />
    </div>
  );
};
