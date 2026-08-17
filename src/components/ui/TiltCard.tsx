import React, { useRef, useState, useCallback } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number; // Maximum tilt angle in degrees (default: 12)
  scaleOnHover?: number; // Scale factor on hover (default: 1.02)
  perspective?: number; // Perspective distance in px (default: 1000)
  glareOpacity?: number; // Max glare opacity (default: 0.15)
  dataCursor?: string; // Optional cursor label attribute (e.g. "VIEW", "EXPLORE")
}

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
  scaleOnHover = 1.02,
  perspective = 1000,
  glareOpacity = 0.15,
  dataCursor,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
    transition: "transform 0.5s cubic-bezier(0.23, 1, 0.32, 1)",
  });
  const [glareStyle, setGlareStyle] = useState<React.CSSProperties>({
    opacity: 0,
    background: "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.25) 0%, transparent 60%)",
  });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const card = cardRef.current;
      if (!card) return;

      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      // Calculate relative rotation angles
      const rotateX = -((y - centerY) / centerY) * maxTilt;
      const rotateY = ((x - centerX) / centerX) * maxTilt;

      const percentX = (x / rect.width) * 100;
      const percentY = (y / rect.height) * 100;

      setStyle({
        transform: `perspective(${perspective}px) rotateX(${rotateX.toFixed(
          2
        )}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(${scaleOnHover}, ${scaleOnHover}, 1)`,
        transition: "transform 0.1s ease-out",
      });

      setGlareStyle({
        opacity: glareOpacity,
        background: `radial-gradient(circle at ${percentX.toFixed(1)}% ${percentY.toFixed(
          1
        )}%, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0.05) 40%, transparent 70%)`,
        transition: "opacity 0.2s ease, background 0.1s ease-out",
      });
    },
    [maxTilt, scaleOnHover, perspective, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: `perspective(${perspective}px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`,
      transition: "transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)",
    });
    setGlareStyle((prev) => ({
      ...prev,
      opacity: 0,
      transition: "opacity 0.5s ease-out",
    }));
  }, [perspective]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor={dataCursor}
      className={`tilt-card-container relative overflow-hidden gpu-layer ${className}`}
      style={style}
    >
      <div className="tilt-card-inner h-full w-full">{children}</div>
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-20 rounded-[inherit] transition-opacity duration-300"
        style={glareStyle}
      />
    </div>
  );
}
