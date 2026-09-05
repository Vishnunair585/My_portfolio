import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Vishnu M" },
      { name: "description", content: "Selected projects by Vishnu M — Full Stack, ML & Web Development." },
    ],
  }),
  component: Projects,
});

const projects = [
  {
    n: "01",
    title: "Influence Quality Auditor",
    link: "https://github.com/Vishnunair585/Influence-Quality-Auditor",
    year: "2026",
    tags: "Streamlit · Scikit-learn · Machine Learning",
    description:
      "Anomaly detection system that identifies suspicious or low-quality social media accounts using behavioral analytics and machine learning. Leverages behavioral patterns, statistical anomalies, and unsupervised ML (Isolation Forest) for explainable detection.",
  },
  {
    n: "02",
    title: "Spotify Clone",
    link: "https://github.com/Vishnunair585/Spotify",
    year: "2025",
    tags: "Web Development",
    description:
      "A responsive, production-grade Spotify-inspired web app featuring core music playback capabilities and interactive UI controls.",
  },
  {
    n: "03",
    title: "AIRank — AI Tool Optimal Output Prediction System",
    link: "https://github.com/Vishnunair585/AI-Rank",
    year: "2026",
    tags: "Python · Linear Regression · Machine Learning",
    description:
      "Predictive system using linear regression to optimize AI tool output quality and performance metrics.",
  },
];

export function Projects() {
  return (
    <PageTransition>
      <section className="px-6 pb-20 pt-40 md:px-12 md:pt-48">
        <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">◍ Index — 02</div>
        <h1 className="hero-text mt-8 text-[16vw] text-foreground md:text-[11vw] text-glow">Projects</h1>
      </section>

      <section className="px-6 pb-32 md:px-12">
        <div className="grid grid-cols-12 gap-4 border-b border-white/10 pb-4 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <div className="col-span-1">No.</div>
          <div className="col-span-5 md:col-span-4">Project</div>
          <div className="col-span-4 hidden md:block">Description</div>
          <div className="col-span-3 md:col-span-2">Tags</div>
          <div className="col-span-3 text-right md:col-span-1">Year</div>
        </div>

        {projects.map((p, i) => (
          <motion.a
            key={p.n}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05, duration: 0.6 }}
            className="group grid grid-cols-12 items-center gap-4 border-b border-white/10 py-8 transition-colors hover:bg-white/[0.02]"
          >
            <div className="col-span-1 text-xs text-muted-foreground">{p.n}</div>
            <div className="col-span-5 md:col-span-4">
              <span className="display text-3xl text-foreground transition-colors group-hover:text-accent md:text-5xl">
                {p.title}
              </span>
            </div>
            <div className="col-span-4 hidden text-sm text-muted-foreground md:block">{p.description}</div>
            <div className="col-span-3 text-[10px] uppercase tracking-[0.25em] text-muted-foreground md:col-span-2">
              {p.tags}
            </div>
            <div className="col-span-3 text-right text-sm text-muted-foreground md:col-span-1">{p.year}</div>
          </motion.a>
        ))}
      </section>
    </PageTransition>
  );
}
