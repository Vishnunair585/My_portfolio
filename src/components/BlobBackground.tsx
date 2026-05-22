import { motion } from "framer-motion";

export function BlobBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <motion.div
        className="blob"
        style={{
          width: 700, height: 700, top: "-15%", left: "-10%",
          background: "oklch(0.55 0.25 270 / 0.45)",
        }}
        animate={{ x: [0, 80, -40, 0], y: [0, 60, -30, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob"
        style={{
          width: 800, height: 800, bottom: "-20%", right: "-15%",
          background: "oklch(0.55 0.22 220 / 0.5)",
        }}
        animate={{ x: [0, -60, 40, 0], y: [0, -50, 30, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="blob"
        style={{
          width: 500, height: 500, top: "40%", left: "50%",
          background: "oklch(0.6 0.2 300 / 0.3)",
        }}
        animate={{ x: [0, 50, -50, 0], y: [0, -40, 40, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Particles */}
      {Array.from({ length: 24 }).map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-white/50"
          style={{
            top: `${(i * 37) % 100}%`,
            left: `${(i * 53) % 100}%`,
            boxShadow: "0 0 12px oklch(0.7 0.22 230 / 0.9)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 6 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}
