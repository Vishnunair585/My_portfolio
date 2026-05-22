import { useRef, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";

export function MagneticButton({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const handleMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current; if (!el) return;
    const r = el.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "translate(0,0)"; };
  return (
    <div onMouseMove={handleMove} onMouseLeave={reset} className="inline-block">
      <motion.div
        ref={ref}
        className={className}
        style={{ transition: "transform 0.12s cubic-bezier(0.22,1,0.36,1)" }}
        whileTap={{ scale: 0.98 }}
        transition={{ duration: 0.08, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}
