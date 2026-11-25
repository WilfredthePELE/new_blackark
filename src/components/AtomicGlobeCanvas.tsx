import React, { useEffect, useRef } from 'react';

interface AtomicGlobeCanvasProps {
  className?: string;
}

interface HubCity {
  name: string;
  lat: number;
  lng: number;
}

const COMMERCE_HUBS: HubCity[] = [
  { name: 'New York', lat: 40.71, lng: -74.0 },
  { name: 'London', lat: 51.5, lng: -0.12 },
  { name: 'Berlin', lat: 52.52, lng: 13.4 },
  { name: 'Tokyo', lat: 35.68, lng: 139.69 },
  { name: 'Sydney', lat: -33.86, lng: 151.2 },
];

const CORRIDOR_PAIRS = [
  [0, 1], // NY -> London
  [1, 2], // London -> Berlin
  [2, 3], // Berlin -> Tokyo
  [3, 4], // Tokyo -> Sydney
  [0, 3], // NY -> Tokyo
];

function latLngToVec(lat: number, lng: number) {
  const phi = ((90 - lat) * Math.PI) / 180;
  const theta = ((lng + 180) * Math.PI) / 180;
  return {
    x: -Math.sin(phi) * Math.cos(theta),
    y: Math.cos(phi),
    z: Math.sin(phi) * Math.sin(theta),
  };
}

export const AtomicGlobeCanvas: React.FC<AtomicGlobeCanvasProps> = ({
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const dragRef = useRef({
    active: false,
    lastX: 0,
    lastY: 0,
    rotY: 0.45,
    rotX: 0.28,
    hoverX: -999,
    hoverY: -999,
  });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const count = 950;
    const points: Array<{
      x: number;
      y: number;
      z: number;
      accent: boolean;
      size: number;
    }> = [];
    const goldenRatio = (1 + Math.sqrt(5)) / 2;

    for (let i = 0; i < count; i++) {
      const theta = (2 * Math.PI * i) / goldenRatio;
      const phi = Math.acos(1 - (2 * (i + 0.5)) / count);
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      points.push({
        x,
        y,
        z,
        accent: i % 19 === 0,
        size: 1.05 + ((i * 7) % 5) * 0.24,
      });
    }

    const hubVectors = COMMERCE_HUBS.map((h) => ({
      ...h,
      ...latLngToVec(h.lat, h.lng),
    }));

    let animId = 0;
    let w = 0;
    let h = 0;
    let dpr = 1;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = Math.max(1, Math.floor(rect.width * dpr));
      h = Math.max(1, Math.floor(rect.height * dpr));
      canvas.width = w;
      canvas.height = h;
    };

    resize();
    window.addEventListener('resize', resize);

    const project = (vx: number, vy: number, vz: number) => {
      const cosY = Math.cos(dragRef.current.rotY);
      const sinY = Math.sin(dragRef.current.rotY);
      const cosX = Math.cos(dragRef.current.rotX);
      const sinX = Math.sin(dragRef.current.rotX);

      const x1 = vx * cosY - vz * sinY;
      const z1 = vz * cosY + vx * sinY;
      const y2 = vy * cosX - z1 * sinX;
      const z2 = z1 * cosX + vy * sinX;

      const radius = Math.min(w, h) * 0.39;
      const cx = w / 2;
      const cy = h / 2;
      const depth = (z2 + 1) * 0.5;
      const scale = 0.72 + depth * 0.4;

      return {
        px: cx + x1 * radius * scale,
        py: cy + y2 * radius * scale,
        z2,
        depth,
      };
    };

    const start = performance.now();

    const draw = (now: number) => {
      const time = prefersReduced ? 0 : (now - start) * 0.001;
      if (!prefersReduced && !dragRef.current.active) {
        dragRef.current.rotY += 0.002;
      }

      ctx.clearRect(0, 0, w, h);

      const hx = dragRef.current.hoverX * dpr;
      const hy = dragRef.current.hoverY * dpr;

      // 1. Fibonacci Sphere Dots with cursor ripple
      for (let i = 0; i < points.length; i++) {
        const p = points[i];
        const { px, py, z2, depth } = project(p.x, p.y, p.z);

        const dist = Math.hypot(px - hx, py - hy);
        const ripple =
          !prefersReduced && dist < 95 * dpr
            ? (1 - dist / (95 * dpr)) * 0.85
            : 0;

        const alpha = Math.min(1, 0.1 + depth * 0.55 + ripple * 0.35);
        const dotR =
          p.size * (w / 720) * (0.7 + depth * 0.5) * (1 + ripple * 0.75);

        ctx.beginPath();
        ctx.arc(px, py, dotR, 0, Math.PI * 2);
        if (p.accent || ripple > 0.35) {
          ctx.fillStyle =
            z2 > 0
              ? `rgba(255, 102, 1, ${alpha})`
              : `rgba(255, 34, 0, ${alpha * 0.45})`;
        } else {
          ctx.fillStyle = `rgba(184, 184, 184, ${alpha})`;
        }
        ctx.fill();
      }

      // 2. Commerce Corridor Great-Circle Arcs & Pulse Signals
      for (let c = 0; c < CORRIDOR_PAIRS.length; c++) {
        const [aIdx, bIdx] = CORRIDOR_PAIRS[c];
        const a = hubVectors[aIdx];
        const b = hubVectors[bIdx];

        const steps = 28;
        ctx.beginPath();
        let started = false;
        for (let s = 0; s <= steps; s++) {
          const t = s / steps;
          let ix = a.x * (1 - t) + b.x * t;
          let iy = a.y * (1 - t) + b.y * t;
          let iz = a.z * (1 - t) + b.z * t;
          const len = Math.hypot(ix, iy, iz) || 1;
          const lift = 1 + Math.sin(t * Math.PI) * 0.14;
          ix = (ix / len) * lift;
          iy = (iy / len) * lift;
          iz = (iz / len) * lift;
          const proj = project(ix, iy, iz);
          if (proj.z2 > -0.15) {
            if (!started) {
              ctx.moveTo(proj.px, proj.py);
              started = true;
            } else {
              ctx.lineTo(proj.px, proj.py);
            }
          } else {
            started = false;
          }
        }
        ctx.strokeStyle = 'rgba(255, 102, 1, 0.28)';
        ctx.lineWidth = 1.1 * dpr;
        ctx.stroke();

        // Moving pulse dot along corridor
        if (!prefersReduced) {
          const pt = (time * 0.32 + c * 0.23) % 1;
          let mx = a.x * (1 - pt) + b.x * pt;
          let my = a.y * (1 - pt) + b.y * pt;
          let mz = a.z * (1 - pt) + b.z * pt;
          const mLen = Math.hypot(mx, my, mz) || 1;
          const mLift = 1 + Math.sin(pt * Math.PI) * 0.14;
          mx = (mx / mLen) * mLift;
          my = (my / mLen) * mLift;
          mz = (mz / mLen) * mLift;
          const mProj = project(mx, my, mz);
          if (mProj.z2 > 0) {
            ctx.beginPath();
            ctx.arc(mProj.px, mProj.py, 2.4 * dpr, 0, Math.PI * 2);
            ctx.fillStyle = '#ff6601';
            ctx.fill();
          }
        }
      }

      // 3. Hub City Beacons & Labels (only front hemisphere)
      ctx.font = `${10 * dpr}px "JetBrains Mono", monospace`;
      for (const hub of hubVectors) {
        const proj = project(hub.x, hub.y, hub.z);
        if (proj.z2 > 0.12) {
          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 3.2 * dpr, 0, Math.PI * 2);
          ctx.fillStyle = '#ff6601';
          ctx.fill();

          ctx.beginPath();
          ctx.arc(proj.px, proj.py, 7 * dpr, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 102, 1, 0.35)';
          ctx.lineWidth = 1 * dpr;
          ctx.stroke();

          ctx.fillStyle = `rgba(244, 244, 244, ${Math.min(0.95, proj.depth)})`;
          ctx.fillText(hub.name.toUpperCase(), proj.px + 9 * dpr, proj.py + 3 * dpr);
        }
      }

      if (!prefersReduced) {
        animId = requestAnimationFrame(draw);
      }
    };

    animId = requestAnimationFrame(draw);

    const onDown = (e: PointerEvent) => {
      dragRef.current.active = true;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
    };
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      dragRef.current.hoverX = e.clientX - rect.left;
      dragRef.current.hoverY = e.clientY - rect.top;

      if (!dragRef.current.active) return;
      const dx = e.clientX - dragRef.current.lastX;
      const dy = e.clientY - dragRef.current.lastY;
      dragRef.current.lastX = e.clientX;
      dragRef.current.lastY = e.clientY;
      dragRef.current.rotY += dx * 0.005;
      dragRef.current.rotX = Math.max(
        -1.1,
        Math.min(1.1, dragRef.current.rotX + dy * 0.005)
      );
    };
    const onLeave = () => {
      dragRef.current.hoverX = -999;
      dragRef.current.hoverY = -999;
    };
    const onUp = () => {
      dragRef.current.active = false;
    };

    canvas.addEventListener('pointerdown', onDown);
    canvas.addEventListener('pointerleave', onLeave);
    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerup', onUp);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      canvas.removeEventListener('pointerdown', onDown);
      canvas.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`block h-full w-full cursor-grab active:cursor-grabbing ${className}`}
      aria-hidden="true"
    />
  );
};
