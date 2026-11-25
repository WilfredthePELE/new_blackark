import React, { useEffect, useRef } from 'react';

interface LiquidGradientCanvasProps {
  className?: string;
  intensity?: number;
}

export const LiquidGradientCanvas: React.FC<LiquidGradientCanvasProps> = ({
  className = '',
  intensity = 1,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const pointerRef = useRef({ x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let animId = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      width = Math.max(1, Math.floor(rect.width * dpr * 0.5));
      height = Math.max(1, Math.floor(rect.height * dpr * 0.5));
      canvas.width = width;
      canvas.height = height;
    };

    resize();
    window.addEventListener('resize', resize);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        pointerRef.current.tx = (e.clientX - rect.left) / rect.width;
        pointerRef.current.ty = (e.clientY - rect.top) / rect.height;
      }
    };

    const onScroll = () => {
      const rect = canvas.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, rect.top / window.innerHeight));
      scrollRef.current = progress;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });

    const start = performance.now();

    const draw = (now: number) => {
      const t = prefersReduced ? 0 : (now - start) * 0.00035;
      pointerRef.current.x += (pointerRef.current.tx - pointerRef.current.x) * 0.04;
      pointerRef.current.y += (pointerRef.current.ty - pointerRef.current.y) * 0.04;

      const scrollShift = prefersReduced ? 0 : scrollRef.current * 0.08;

      ctx.fillStyle = '#080808';
      ctx.fillRect(0, 0, width, height);

      const blobs = [
        {
          x: 0.28 + Math.sin(t * 1.1) * 0.14 + (pointerRef.current.x - 0.5) * 0.09,
          y: 0.38 + Math.cos(t * 0.9) * 0.12 + (pointerRef.current.y - 0.5) * 0.09 + scrollShift,
          r: 0.48,
          c1: `rgba(255, 102, 1, ${0.42 * intensity})`,
          c2: 'rgba(255, 102, 1, 0)',
        },
        {
          x: 0.72 + Math.cos(t * 0.85) * 0.15,
          y: 0.52 + Math.sin(t * 1.15) * 0.14 - scrollShift * 0.7,
          r: 0.5,
          c1: `rgba(255, 34, 0, ${0.34 * intensity})`,
          c2: 'rgba(255, 34, 0, 0)',
        },
        {
          x: 0.5 + Math.sin(t * 0.6 + 1.8) * 0.18,
          y: 0.68 + Math.cos(t * 0.7 + 1.2) * 0.12,
          r: 0.44,
          c1: `rgba(153, 153, 153, ${0.14 * intensity})`,
          c2: 'rgba(153, 153, 153, 0)',
        },
      ];

      ctx.globalCompositeOperation = 'screen';
      for (const b of blobs) {
        const cx = b.x * width;
        const cy = b.y * height;
        const rad = Math.max(width, height) * b.r;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
        grad.addColorStop(0, b.c1);
        grad.addColorStop(1, b.c2);
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, width, height);
      }
      ctx.globalCompositeOperation = 'source-over';

      const vGrad = ctx.createLinearGradient(0, 0, 0, height);
      vGrad.addColorStop(0, '#080808');
      vGrad.addColorStop(0.18, 'rgba(8,8,8,0)');
      vGrad.addColorStop(0.82, 'rgba(8,8,8,0)');
      vGrad.addColorStop(1, '#080808');
      ctx.fillStyle = vGrad;
      ctx.fillRect(0, 0, width, height);

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
    };
  }, [intensity]);

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none block h-full w-full ${className}`}
      aria-hidden="true"
    />
  );
};
