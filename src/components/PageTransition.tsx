import { motion } from "framer-motion";
import type { ReactNode } from "react";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  x: `${(index % 6) * 18 + 5}%`,
  y: `${Math.floor(index / 6) * 24 + 14}%`,
}));

export function PageTransition({ children }: { children: ReactNode }) {
  return (
    <div className="relative overflow-hidden">
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 z-20"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ delay: 0.48, duration: 0.45, ease: "easeOut" }}
      >
        {particles.map((particle) => (
          <motion.span
            key={particle.id}
            className="route-particle"
            initial={{ left: particle.x, top: particle.y, scale: 0.3, opacity: 0 }}
            animate={{ left: "50%", top: "44%", scale: [0.3, 1, 0.1], opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.72, delay: particle.id * 0.012, ease: [0.22, 1, 0.36, 1] }}
          />
        ))}
      </motion.div>
      <motion.div
        className="route-content typewriter-reveal"
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.26, duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
