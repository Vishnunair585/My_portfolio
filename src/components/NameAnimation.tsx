import { motion } from "framer-motion";

const letters = "VISHNU M".split("");

export function NameAnimation() {
  return (
    <section className="name-animation" aria-label="Vishnu">
      <div className="name-animation-word" aria-hidden="true">
        {letters.map((letter, index) => (
          <motion.span
            key={`${letter}-${index}`}
            initial={{ y: "110%", rotateX: -90, opacity: 0 }}
            whileInView={{ y: 0, rotateX: 0, opacity: 1 }}
            viewport={{ once: true, amount: 0.65 }}
            transition={{ delay: index * 0.08, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          >
            {letter}
          </motion.span>
        ))}
      </div>
    </section>
  );
}