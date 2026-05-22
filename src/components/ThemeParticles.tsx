import { type CSSProperties, useEffect, useMemo, useState } from "react";

type Particle = {
  id: number;
  left: string;
  top: string;
  size: number;
  delay: number;
  duration: number;
  hue: number;
};

const PARTICLE_COUNT = 20;

export function ThemeParticles() {
  const [isLight, setIsLight] = useState(false);

  const particles = useMemo<Particle[]>(() => {
    return Array.from({ length: PARTICLE_COUNT }, (_, id) => ({
      id,
      left: `${10 + Math.random() * 80}%`,
      top: `${5 + Math.random() * 85}%`,
      size: 10 + Math.random() * 18,
      delay: Math.random() * 4,
      duration: 4 + Math.random() * 4,
      hue: 220 + Math.random() * 140,
    }));
  }, []);

  useEffect(() => {
    const update = () => setIsLight(document.documentElement.classList.contains("light"));
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {particles.map((particle) => {
        const style = {
          left: particle.left,
          top: particle.top,
          width: `${particle.size}px`,
          height: `${particle.size}px`,
          animationDelay: `${particle.delay}s`,
          animationDuration: `${particle.duration}s`,
          "--butterfly-color": `hsl(${particle.hue}, 85%, 65%)`,
        } as CSSProperties;

        if (isLight) {
          return (
            <div key={particle.id} className="butterfly" style={style}>
              <span className="butterfly-wing left" />
              <span className="butterfly-wing right" />
              <span className="butterfly-body" />
            </div>
          );
        }

        return <div key={particle.id} className="firefly" style={style} />;
      })}
    </div>
  );
}
