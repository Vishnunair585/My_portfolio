import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { PageTransition } from "@/components/PageTransition";
import { GraduationCap, Trophy, Award, Code2, Briefcase, Rocket, Brain, Sparkles } from "lucide-react";
import vishnuImg from "@/assets/vishnu.jpeg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Vishnu M" },
      { name: "description", content: "The journey so far — education, milestones and certifications of Vishnu M." },
    ],
  }),
  component: About,
});

type Milestone = {
  year: string;
  title: string;
  subtitle?: string;
  detail?: string;
  Icon: React.ComponentType<{ className?: string; style?: React.CSSProperties }>;
  accent: string;
  certificate?: string;
};

const milestones: Milestone[] = [
  {
    year: "2024 — 2028",
    title: "Coimbatore Institute of Technology",
    subtitle: "B.E. Computer Science & Engineering",
    detail: "CGPA till 3rd semester — 9.08",
    Icon: GraduationCap,
    accent: "oklch(0.7 0.22 230)",
  },
  {
    year: "2025",
    title: "Smart India Hackathon 2025",
    subtitle: "Internal Hackathon Winners",
    Icon: Rocket,
    accent: "oklch(0.7 0.25 25)",
  },
  {
    year: "2025",
    title: "SBC Code Class — Second Runner Up",
    subtitle: "10-Week DSA Competition · Student Developers Cell",
    Icon: Trophy,
    accent: "oklch(0.78 0.18 90)",
    certificate: "/certificates/SDC_CodeClash.jpeg",
  },
  {
    year: "—",
    title: "Python Foundational Certificate",
    subtitle: "Infosys SpringBoard",
    Icon: Code2,
    accent: "oklch(0.7 0.22 230)",
    certificate: "/certificates/Python_Foundation_Certificate.pdf",
  },
  {
    year: "—",
    title: "Data Analytics Job Simulation",
    subtitle: "Deloitte",
    Icon: Brain,
    accent: "oklch(0.72 0.2 160)",
    certificate: "/certificates/Deloitte_certificate.pdf",
  },
  {
    year: "—",
    title: "Software Engineer Intern Certificate",
    subtitle: "HackerRank",
    Icon: Briefcase,
    accent: "oklch(0.72 0.2 160)",
    certificate: "/certificates/Software_Engineer_Intern.pdf",
  },
  {
    year: "2026",
    title: "L&T KreaTech 2026",
    subtitle: "Participation",
    Icon: Sparkles,
    accent: "oklch(0.7 0.25 330)",
    certificate: "/certificates/L_T_Createch.pdf",
  },
  {
    year: "2026",
    title: "TATA Crucible Quiz 2026",
    subtitle: "Participation",
    Icon: Award,
    accent: "oklch(0.7 0.25 25)",
    certificate: "/certificates/TATA_Crucible.pdf",
  },
];

function About() {
  const trackRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <PageTransition>
      <section className="px-6 pb-16 pt-40 md:px-12 md:pt-48">
        <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">◍ About — 02</div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start mt-12">
          {/* Text Content - Left side */}
          <div className="md:col-span-2">
            <h1 className="display max-w-4xl text-2xl leading-relaxed text-foreground md:text-3xl">
              I&rsquo;m Vishnu — born in Kerala, raised in Tamil Nadu, and driven by curiosity for technology and creativity.
            </h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="mt-8 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              I enjoy building digital experiences, solving problems, and turning ideas into real projects through code.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg"
            >
              Nothing beats the satisfaction of debugging for hours and finally seeing that 'Accepted' message on the screen.
            </motion.p>
          </div>

          {/* Photo - Right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative md:col-span-1 md:self-start md:-mt-10"
          >
            <div className="relative mx-auto aspect-[3/4] w-full overflow-hidden rounded-[2rem] border border-foreground/10">
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-60"
                style={{ background: "var(--gradient-organic)" }}
              />
              <img
                src={vishnuImg}
                alt="Vishnu M portrait"
                className="h-full w-full object-cover"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="px-6 pb-40 md:px-12">
        <div className="mb-12 flex items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Timeline</div>
            <h2 className="hero-text mt-4 text-[12vw] leading-[0.9] text-foreground md:text-[5.5vw] text-glow">
              My journey<span className="italic text-accent"> so far…</span>
            </h2>
          </div>
        </div>

        <div ref={trackRef} className="relative mx-auto max-w-5xl">
          {/* Spine */}
          <div className="absolute left-6 top-0 h-full w-px bg-white/10 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-6 top-0 w-px bg-gradient-to-b from-accent via-accent/60 to-transparent md:left-1/2 md:-translate-x-1/2"
          />

          <ul className="space-y-16 md:space-y-24">
            {milestones.map((m, i) => {
              const Icon = m.Icon;
              const isLeft = i % 2 === 0;
              return (
                <li key={i} className="relative">
                  <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className={`relative grid grid-cols-[48px_1fr] gap-4 md:grid-cols-2 md:gap-12`}
                  >
                    {/* Node */}
                    <div className="absolute left-6 -translate-x-1/2 md:left-1/2">
                      <motion.div
                        whileHover={{ scale: 1.25 }}
                        className="relative flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-background/90 backdrop-blur transition-shadow"
                        style={{ boxShadow: `0 0 30px -4px ${m.accent}` }}
                      >
                        <Icon className="h-5 w-5" style={{ color: m.accent }} />
                        <span
                          className="absolute inset-0 -z-10 rounded-full opacity-50 blur-xl"
                          style={{ background: m.accent }}
                        />
                      </motion.div>
                    </div>

                    {/* Spacer for mobile node column */}
                    <div className="md:hidden" />

                    {/* Card — desktop alternates sides */}
                    <div className={`md:col-start-${isLeft ? 1 : 2} md:row-start-1 ${isLeft ? "md:pr-16 md:text-right" : "md:pl-16"}`}>
                      <motion.div
                        whileHover={{ y: -4 }}
                        className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 backdrop-blur transition-colors hover:border-accent/50 hover:bg-white/[0.04]"
                      >
                        <div
                          className="text-[10px] uppercase tracking-[0.3em]"
                          style={{ color: m.accent }}
                        >
                          {m.year}
                        </div>
                        <div className="display mt-3 text-xl leading-tight text-foreground md:text-2xl">
                          {m.title}
                        </div>
                        {m.subtitle && (
                          <div className="mt-2 text-sm text-muted-foreground">{m.subtitle}</div>
                        )}
                        {m.detail && (
                          <div className="mt-3 inline-block rounded-full border border-accent/30 bg-accent/5 px-3 py-1 text-xs text-accent">
                            {m.detail}
                          </div>
                        )}
                        {m.certificate && (
                          <a
                            href={m.certificate}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.06] px-4 py-3 text-xs uppercase tracking-[0.25em] text-foreground transition-colors hover:border-accent hover:bg-accent/10 hover:text-accent"
                          >
                            View Certificate
                          </a>
                        )}
                      </motion.div>
                    </div>

                    {/* Empty opposite cell on desktop to preserve grid */}
                    <div className={`hidden md:block ${isLeft ? "md:col-start-2" : "md:col-start-1"}`} />
                  </motion.div>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </PageTransition>
  );
}
