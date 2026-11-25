import React, { useRef, useState } from 'react';

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  children: React.ReactNode;
}

export const MagneticButton: React.FC<MagneticButtonProps> = ({
  strength = 0.22,
  className = '',
  children,
  onMouseMove,
  onMouseLeave,
  ...rest
}) => {
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const handleMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!prefersReduced && btnRef.current) {
      const rect = btnRef.current.getBoundingClientRect();
      const dx = (e.clientX - (rect.left + rect.width / 2)) * strength;
      const dy = (e.clientY - (rect.top + rect.height / 2)) * strength;
      setOffset({ x: dx, y: dy });
    }
    onMouseMove?.(e);
  };

  const handleLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setOffset({ x: 0, y: 0 });
    onMouseLeave?.(e);
  };

  return (
    <button
      ref={btnRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{
        transform: `translate3d(${offset.x}px, ${offset.y}px, 0)`,
        transition:
          offset.x === 0 && offset.y === 0
            ? 'transform 280ms cubic-bezier(0.16, 1, 0.3, 1), background-color 200ms ease, color 200ms ease, border-color 200ms ease'
            : 'background-color 200ms ease, color 200ms ease, border-color 200ms ease',
      }}
      className={className}
      {...rest}
    >
      {children}
    </button>
  );
};
