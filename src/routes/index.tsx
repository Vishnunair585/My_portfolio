import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MagneticButton } from "@/components/MagneticButton";
import { PortraitReveal } from "@/components/PortraitReveal";
import { NameAnimation } from "@/components/NameAnimation";
import { About } from "./about";
import { Projects } from "./projects";
import { Achievements } from "./achievements";
import { Contact } from "./contact";

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
        <PortraitReveal />
        <div className="hero-copy hero-copy-left">
          <motion.p initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5, duration: 0.8 }}>
            I am a <strong>Full Stack developer</strong> and competitive programmer. Actively upskilling in scalable systems &amp; AI.
          </motion.p>
          <MagneticButton className="hero-copy-button"><a href="/Vishnu_Resume.pdf" download="Vishnu_M_Resume.pdf">Download Resume <span>●</span></a></MagneticButton>
        </div>
        <div className="hero-copy hero-copy-right">
          <motion.p initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.65, duration: 0.8 }}>
            Open to collaborations, networking and meaningful tech discussions.
          </motion.p>
          <MagneticButton className="hero-copy-button"><Link to="/about">Want to know more about me? <span>●</span></Link></MagneticButton>
        </div>
      </section>

      <div id="about"><About /></div>
      <div id="projects"><Projects /></div>
      <div id="achievements"><Achievements /></div>
      <div id="contact"><Contact /></div>
      <NameAnimation />
    </PageTransition>
  );
}
