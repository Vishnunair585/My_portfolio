import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface DiaTextRevealProps {
  text: string;
  colors?: string[];
  duration?: number;
  delay?: number;
  repeat?: boolean;
  repeatDelay?: number;
  startOnView?: boolean;
  once?: boolean;
  className?: string;
}

const defaultColors = ["#f0abfc", "#f472b6", "#fb923c", "#facc15", "#a3e635"];

export function DiaTextReveal({
  text,
  colors = defaultColors,
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
}: DiaTextRevealProps) {
  const textRef = useRef<HTMLSpanElement>(null);
  const [active, setActive] = useState(!startOnView);
  const [hasPlayed, setHasPlayed] = useState(!startOnView);
  const gradient = colors.length > 0 ? colors.join(", ") : defaultColors.join(", ");
  const cycleDuration = duration + repeatDelay;

  useEffect(() => {
    if (!startOnView) {
      return;
    }

    const element = textRef.current;
    if (!element) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) {
          if (!once) {
            setActive(false);
            setHasPlayed(false);
          }
          return;
        }
        if (once && hasPlayed) {
          return;
        }
        setActive(true);
        setHasPlayed(true);
      },
      { threshold: 0.2 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [hasPlayed, once, startOnView]);

  return (
    <span
      ref={textRef}
      className={cn(
        "dia-text-reveal",
        active && "dia-text-reveal--active",
        active && repeat && "dia-text-reveal--repeat",
        className,
      )}
      style={
        {
          "--dia-gradient": `linear-gradient(90deg, transparent 0%, transparent 22%, ${gradient}, transparent 78%, transparent 100%)`,
          "--dia-duration": `${duration}s`,
          "--dia-cycle-duration": `${cycleDuration}s`,
          "--dia-delay": `${delay}s`,
        } as React.CSSProperties
      }
      onAnimationEnd={() => {
        if (!repeat) {
          setActive(false);
        }
      }}
    >
      {text}
    </span>
  );
}