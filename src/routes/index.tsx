import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MagneticButton } from "@/components/MagneticButton";
import { TypingKeyboard } from "@/components/TypingKeyboard";
import { LineHoverLink } from "@/components/ui/line-hover-link";
import { About } from "@/routes/about";
import { Projects } from "@/routes/projects";
import { Achievements } from "@/routes/achievements";
import { Contact } from "@/routes/contact";
import { InteractiveParticles } from "@/components/InteractiveParticles";

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
      <section id="home" className="relative grid min-h-screen items-center gap-10 px-6 pb-20 pt-32 md:grid-cols-[minmax(0,0.9fr)_minmax(360px,1.1fr)] md:px-12 md:pt-40 lg:gap-16">
        <div className="flex max-w-3xl flex-col items-start text-left -translate-y-12 md:-translate-y-24">
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
              <span className="inline-block">Vishnu</span>
            </motion.span>
          </h1>

          {/* Bio text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.8 }}
            className="w-full max-w-xl h-auto min-h-[140px]"
          >
            <TypingKeyboard
              autoTypeText="I am a Full Stack developer and competitive programmer. Actively upskilling in scalable systems & AI and I am open to collaborations, networking and tech discussions"
              scale={0.75}
            />
          </motion.div>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.8 }}
            className="-mt-16 flex flex-col sm:flex-row gap-4 sm:gap-6 items-start justify-start w-full"
          >
            {/* Download Resume Button */}
            <MagneticButton className="group inline-flex items-center gap-4 rounded-full border border-foreground/30 px-6 py-4 text-xs uppercase tracking-[0.3em] backdrop-blur hover:border-accent transition-colors">
              <LineHoverLink href="/Vishnu_SDE_Resume.pdf" download="Vishnu_SDE_Resume.pdf" className="flex items-center gap-4">
                Download Resume
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)]" />
              </LineHoverLink>
            </MagneticButton>

            {/* Learn More Button */}
            <MagneticButton className="group inline-flex items-center gap-4 rounded-full border border-accent/50 bg-accent/5 px-6 py-4 text-xs uppercase tracking-[0.3em] backdrop-blur hover:border-accent hover:bg-accent/10 transition-colors cursor-pointer">
              <LineHoverLink href="#about" className="flex items-center gap-4">
                Want to know more about me?
                <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_20px_var(--color-accent)]" />
              </LineHoverLink>
            </MagneticButton>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.55, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-[min(85vh,800px)] min-h-[500px] w-full overflow-hidden scale-[1.15] translate-x-20 -translate-y-32"
        >
          <InteractiveParticles src="/particle-subject.png" maxDimension={750} size={1.8} className="absolute inset-0 max-h-[85vh]" />
        </motion.div>
      </section>

      <div id="about" className="scroll-mt-8">
        <About />
      </div>
      <div id="projects" className="scroll-mt-8">
        <Projects />
      </div>
      <div id="achievements" className="scroll-mt-8">
        <Achievements />
      </div>
      <div id="contact" className="scroll-mt-8">
        <Contact />
      </div>
    </PageTransition>
  );
}
