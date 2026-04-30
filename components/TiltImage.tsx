"use client";

import { useRef, useState, useCallback } from "react";

interface TiltImageProps {
  children: React.ReactNode;
  className?: string;
}

export default function TiltImage({ children, className = "" }: TiltImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const maxRotation = 15;

  const updateTilt = useCallback(
    (clientX: number, clientY: number) => {
      const el = containerRef.current;
      if (!el) return;

      cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        // Normalize to -1..1
        const normalX = (clientX - centerX) / (rect.width / 2);
        const normalY = (clientY - centerY) / (rect.height / 2);

        // Clamp
        const clampedX = Math.max(-1, Math.min(1, normalX));
        const clampedY = Math.max(-1, Math.min(1, normalY));

        // rotateY follows X axis, rotateX follows inverted Y axis
        setTilt({
          x: -clampedY * maxRotation,
          y: clampedX * maxRotation,
        });
      });
    },
    [maxRotation]
  );

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      updateTilt(e.clientX, e.clientY);
    },
    [updateTilt]
  );

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      if (touch) {
        updateTilt(touch.clientX, touch.clientY);
      }
    },
    [updateTilt]
  );

  const handleEnter = useCallback(() => setIsHovering(true), []);

  const handleLeave = useCallback(() => {
    setIsHovering(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  // Shine position based on tilt
  const shineX = 50 + tilt.y * 2;
  const shineY = 50 + tilt.x * 2;

  return (
    <div
      ref={containerRef}
      className={`relative ${className}`}
      style={{ perspective: "1000px" }}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleLeave}
    >
      <div
        className="relative w-full h-full"
        style={{
          transform: `rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`,
          transformStyle: "preserve-3d",
          transition: isHovering
            ? "transform 0.1s ease-out"
            : "transform 0.6s ease-out",
        }}
      >
        {children}

        {/* Shine overlay */}
        <div
          className="pointer-events-none absolute inset-0 rounded-xl"
          style={{
            background: `radial-gradient(circle at ${shineX}% ${shineY}%, rgba(255,255,255,0.2) 0%, transparent 60%)`,
            opacity: isHovering ? 1 : 0,
            transition: "opacity 0.3s ease-out",
          }}
        />
      </div>
    </div>
  );
}
