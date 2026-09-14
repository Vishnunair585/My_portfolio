import * as React from "react";
import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

type Coords = { x: number; y: number };

export interface CreepyButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  coverClassName?: string;
}

export function CreepyButton({ children, className, coverClassName, onClick, ...props }: CreepyButtonProps) {
  const eyesRef = useRef<HTMLSpanElement>(null);
  const [eyeCoords, setEyeCoords] = useState<Coords>({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const updateEyes = (event: React.MouseEvent<HTMLButtonElement> | React.TouchEvent<HTMLButtonElement>) => {
    const point = "touches" in event ? event.touches[0] : event;
    const eyes = eyesRef.current;
    if (!eyes || !point) return;
    const rect = eyes.getBoundingClientRect();
    const dx = point.clientX - (rect.left + rect.width / 2);
    const dy = point.clientY - (rect.top + rect.height / 2);
    const angle = Math.atan2(-dy, dx) + Math.PI / 2;
    const distance = Math.hypot(dx, dy);
    setEyeCoords({
      x: (Math.sin(angle) * Math.min(distance, 180)) / 180,
      y: (Math.cos(angle) * Math.min(distance, 75)) / 75,
    });
  };

  const resetEyes = () => {
    setEyeCoords({ x: 0, y: 0 });
    setIsHovered(false);
  };

  const pupilStyle = {
    transform: `translate(calc(-50% + ${eyeCoords.x * 50}%), calc(-50% + ${eyeCoords.y * 50}%))`,
  };

  return (
    <button
      {...props}
      className={cn("relative min-w-[9em] cursor-pointer select-none rounded-xl bg-black outline-none", "focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2", className)}
      onClick={onClick}
      onMouseMove={(event) => { updateEyes(event); setIsHovered(true); }}
      onTouchMove={updateEyes}
      onMouseLeave={resetEyes}
      onFocus={() => setIsHovered(true)}
      onBlur={resetEyes}
    >
      <span ref={eyesRef} className="pointer-events-none absolute bottom-2 right-4 z-0 flex h-3 items-center gap-1.5">
        {[0, 1].map((eye) => (
          <motion.span
            key={eye}
            className="relative h-3 w-3 overflow-hidden rounded-full bg-white"
            animate={{ height: ["0.75rem", "0.75rem", "0rem", "0.75rem"] }}
            transition={{ duration: 3, times: [0, 0.92, 0.96, 1], repeat: Infinity, ease: "linear" }}
          >
            <span className="absolute left-1/2 top-1/2 h-1.5 w-1.5 rounded-full bg-black transition-transform duration-75" style={pupilStyle} />
          </motion.span>
        ))}
      </span>

      <motion.span
        className={cn("absolute inset-0 flex items-center justify-center rounded-xl bg-blue-500 px-4 py-2 font-bold tracking-wider text-white", "origin-[1.25em_50%] shadow-[inset_0_0_0_0.125em_rgba(0,0,0,1)]", coverClassName)}
        animate={{ rotate: isHovered ? -12 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 20, mass: 0.8 }}
      >
        {children}
      </motion.span>
      <span className="block min-w-[9em] px-4 py-2 font-bold tracking-wider opacity-0">{children}</span>
    </button>
  );
}

export default CreepyButton;
