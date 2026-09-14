import * as React from "react";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type AvatarIcon = React.ComponentType<{ className?: string; style?: React.CSSProperties }>;

export interface MaskedAvatar {
  avatar?: string;
  name: string;
  Icon?: AvatarIcon;
  color?: string;
}

export interface MaskedAvatarsProps {
  avatars?: MaskedAvatar[];
  size?: number;
  border?: number;
  column?: number;
  movement?: number;
  transition?: number;
  ringed?: boolean;
  offset?: number;
  blurOnRest?: boolean;
  className?: string;
}

export function MaskedAvatars({
  avatars = [],
  size = 82,
  border = 8,
  column = 48,
  movement = 0.72,
  transition = 0.18,
  ringed = true,
  offset = -3,
  blurOnRest = true,
  className,
}: MaskedAvatarsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const dynamicSize = `clamp(${size - 20}px, ${size}px, ${size + 30}px)`;
  const maskImage = useMemo(() => {
    const circle = (border * 2 + size) / 2;
    const radiusX = circle - column - border;
    return `radial-gradient(${circle}px ${circle}px at ${radiusX}px 50%, transparent ${circle - 0.5}px, white ${circle}px)`;
  }, [border, column, size]);
  const transitionConfig = useMemo(() => ({ type: "spring" as const, stiffness: 260, damping: 20 }), []);

  return (
    <div
      className={cn("relative flex min-w-max items-center", className)}
      style={{ gap: `min(6vw, ${size * 0.5}px)` }}
      role="group"
      aria-label="Animated skills"
    >
      <ul
        className="m-0 grid list-none grid-flow-col content-end p-0 pt-16"
        style={{ height: column + 64, gridAutoColumns: column, transform: `translateX(${(size - column) * 0.5}px)` }}
        role="list"
      >
        {avatars.map((person, index) => {
          const isHovered = hoveredIndex === index;
          const isPreviousHovered = hoveredIndex === index - 1;
          const baseOffset = -size * 1.5;
          const moveOffset = size * movement;
          const maskPosition = isPreviousHovered
            ? `0 ${baseOffset - moveOffset}px`
            : isHovered
              ? `0 ${baseOffset + moveOffset}px`
              : `0 ${baseOffset}px`;
          const Icon = person.Icon;

          return (
            <motion.li
              key={`${person.name}-${index}`}
              className="group relative grid content-end outline-none"
              style={{
                width: dynamicSize,
                aspectRatio: "1 / 3",
                transform: `translate(${(size - column) * -0.5}px, ${(size - column) * 0.5}px)`,
                zIndex: avatars.length - index,
              }}
              tabIndex={0}
              aria-label={`Skill: ${person.name}`}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onFocus={() => setHoveredIndex(index)}
              onBlur={() => setHoveredIndex(null)}
              onTouchStart={() => setHoveredIndex(index)}
            >
              {ringed && (
                <div
                  className="absolute left-1/2 pointer-events-none text-center font-mono text-[9px] font-normal uppercase"
                  aria-hidden="true"
                  style={{
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    bottom: 0,
                    transform: `translate(-50%, ${isHovered ? -movement * 100 : 0}%)`,
                    transition: `transform ${transition}s ease-out`,
                  }}
                >
                  {person.name.split("").map((character, characterIndex) => (
                    <span
                      key={`${character}-${characterIndex}`}
                      className="absolute will-change-transform"
                      style={{
                        offsetPath: "border-box",
                        offsetDistance: `${(offset + characterIndex) * 0.75}ch`,
                        offsetAnchor: "50% 130%",
                        transform: isHovered ? "translate(0, 0)" : "translate(0, 100%)",
                        filter: isHovered || !blurOnRest ? "blur(0px)" : "blur(4px)",
                        opacity: isHovered ? 1 : 0,
                        transition: `transform ${transition}s ease-out, opacity ${transition}s ease-out, filter ${transition}s ease-out`,
                      } as React.CSSProperties}
                    >
                      {character}
                    </span>
                  ))}
                </div>
              )}

              <span
                className={cn(
                  "pointer-events-none absolute -top-12 left-1/2 z-20 -translate-x-1/2 whitespace-nowrap text-sm font-black uppercase tracking-[0.2em] text-black dark:text-white transition-all duration-200 drop-shadow-md",
                  isHovered ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
                  "group-hover:translate-y-0 group-hover:opacity-100",
                )}
              >
                {person.name}
              </span>

              <div className="absolute inset-0 grid content-end">
                <motion.span
                  className="relative inline-flex aspect-square w-full items-center justify-center overflow-hidden rounded-full border-[3px] border-background bg-muted text-foreground shadow-[0_0_24px_rgba(80,210,255,0.12)]"
                  role="img"
                  aria-label={person.name}
                  style={{
                    maskImage: index === 0 ? "none" : maskImage,
                    WebkitMaskImage: index === 0 ? "none" : maskImage,
                    maskSize: "100% 400%",
                    WebkitMaskSize: "100% 400%",
                    maskRepeat: "no-repeat",
                  }}
                  animate={{
                    maskPosition: index === 0 ? "0 0" : maskPosition,
                    y: isHovered ? `${-movement * 100}%` : "0%",
                    scale: isHovered ? 1.05 : 1,
                    opacity: hoveredIndex !== null && hoveredIndex !== index ? 0.7 : 1,
                  }}
                  transition={transitionConfig}
                >
                  {Icon ? <Icon className="h-10 w-10" style={{ color: person.color }} /> : <img src={person.avatar} alt="" className="h-full w-full object-cover" />}
                </motion.span>
              </div>
              <div className="absolute bottom-0 aspect-square w-full" />
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
