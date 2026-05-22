import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vishnu M — Full Stack Developer & Competitive Programmer" },
      { name: "description", content: "Vishnu M — Full Stack developer & competitive programmer. Open to collaborations." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageTransition>
      <section className="relative flex min-h-screen flex-col justify-center items-center px-6 pb-20 pt-32 md:px-12 md:pt-40">
        <div className="flex flex-col items-center text-center max-w-3xl">
          {/* Main heading */}
          <h1 className="hero-text text-foreground">
            <motion.span
              className="block text-[5.5vw] leading-[0.9] text-muted-foreground md:text-[3.5vw]"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block", overflow: "hidden" }}
            >
              <span className="inline-block">Hey there, I am,</span>
            </motion.span>
            <motion.span
              className="block text-[14vw] leading-[0.9] text-glow md:text-[10vw]"
              initial={{ y: "110%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.45, duration: 1, ease: [0.22, 1, 0.36, 1] }}
              style={{ display: "block", overflow: "hidden" }}
            >
              <span className="inline-block">Vishnu M</span>
            </motion.span>
          </h1>

          {/* Bio text */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="mt-10 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            I am a <span className="text-foreground font-semibold">Full Stack developer</span> and <span className="text-foreground font-semibold">competitive programmer</span>. Actively upskilling in <span className="text-foreground">scalable systems &amp; AI</span> and I am open to collaborations, networking and tech discussions.
          </motion.p>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="mt-12 flex flex-col sm:flex-row gap-6 sm:gap-20 items-center justify-center"
          >
            {/* Download Resume Button */}
            <MagneticButton className="group inline-flex items-center gap-4 rounded-full border border-foreground/30 px-6 py-4 text-xs uppercase tracking-[0.3em] backdrop-blur hover:border-accent transition-colors">
              <a href="/Vishnu_Resume.pdf" download="Vishnu_M_Resume.pdf" className="flex items-center gap-4">
                Download Resume
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)]" />
              </a>
            </MagneticButton>

            {/* Learn More Button */}
            <MagneticButton className="group inline-flex items-center gap-4 rounded-full border border-accent/50 bg-accent/5 px-6 py-4 text-xs uppercase tracking-[0.3em] backdrop-blur hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
              <Link to="/about" className="flex items-center gap-4">
                Want to know more about me?
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)]" />
              </Link>
            </MagneticButton>
          </motion.div>
        </div>
      </section>
    </PageTransition>
  );
}
