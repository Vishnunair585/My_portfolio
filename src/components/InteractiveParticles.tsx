"use client";

import { useEffect, useState } from "react";
import VishnuParticlesDark from "./VishnuParticlesDark";
import VishnuParticlesLight from "./VishnuParticlesLight";

interface InteractiveParticlesProps {
  src: string;
  maxDimension?: number;
  size?: number;
  touchRadius?: number;
  color?: string;
  className?: string;
  threshold?: number;
}

export function InteractiveParticles({
  src,
  className = "",
}: InteractiveParticlesProps) {
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      setIsLight(document.documentElement.classList.contains("light"));
    };
    checkTheme();

    // Listen for theme changes on the html element
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className={className}>
      {isLight ? (
        <VishnuParticlesLight src={src} />
      ) : (
        <VishnuParticlesDark src={src} />
      )}
    </div>
  );
}
