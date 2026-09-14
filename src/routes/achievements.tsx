import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import {
  SiLeetcode,
  SiCodeforces,
  SiCodechef,
  SiGit,
  SiGithub,
  SiMysql,
  SiFirebase,
  SiLinux,
  SiReact,
  SiScikitlearn,
  SiPandas,
  SiNumpy,
  SiC,
  SiCplusplus,
  SiPython,
  SiJavascript,
  SiTypescript,
  SiHtml5,
  SiCss as SiCss3,
  SiTableau,
  SiStreamlit,
} from "react-icons/si";
import { FaJava, FaCode, FaChartBar } from "react-icons/fa";
import { VscVscode } from "react-icons/vsc";
import { ExternalLink } from "lucide-react";
import { MaskedAvatars } from "@/components/MaskedAvatars";

export const Route = createFileRoute("/achievements")({
  head: () => ({
    meta: [
      { title: "Achievements — Vishnu M" },
      {
        name: "description",
        content:
          "Coding profiles and skills — live syncing with Codolio and an interactive accomplishments view.",
      },
    ],
  }),
  component: Achievements,
});

const profiles = [
  {
    name: "Codolio",
    handle: "Sugar_Genius585_",
    url: "https://codolio.com/profile/Sugar_Genius585_",
    icon: FaCode,
    label: "Coding Portfolio",
  },
  {
    name: "LeetCode",
    handle: "vishnu585",
    url: "https://leetcode.com/u/vishnu585/",
    icon: SiLeetcode,
    label: "LeetCode",
  },
  {
    name: "Codeforces",
    handle: "Sugar_genius585",
    url: "https://codeforces.com/profile/Sugar_genius585",
    icon: SiCodeforces,
    label: "Codeforces",
  },
  {
    name: "CodeChef",
    handle: "sugar_genius",
    url: "https://www.codechef.com/users/sugar_genius",
    icon: SiCodechef,
    label: "CodeChef",
  },
];


const skills = [
  { name: "Git", icon: SiGit, color: "#F05032" },
  { name: "GitHub", icon: SiGithub, color: "#ffffff" },
  { name: "VS Code", icon: VscVscode, color: "#007ACC" },
  { name: "MySQL", icon: SiMysql, color: "#4479A1" },
  { name: "Firebase", icon: SiFirebase, color: "#FFCA28" },
  { name: "Linux", icon: SiLinux, color: "#FCC624" },
  { name: "React.js", icon: SiReact, color: "#61DAFB" },
  { name: "Scikit-Learn", icon: SiScikitlearn, color: "#F7931E" },
  { name: "Pandas", icon: SiPandas, color: "#150458" },
  { name: "NumPy", icon: SiNumpy, color: "#013243" },
  { name: "C", icon: SiC, color: "#A8B9CC" },
  { name: "C++", icon: SiCplusplus, color: "#00599C" },
  { name: "Python", icon: SiPython, color: "#3776AB" },
  { name: "JavaScript", icon: SiJavascript, color: "#F7DF1E" },
  { name: "Java", icon: FaJava, color: "#ED8B00" },
  { name: "HTML", icon: SiHtml5, color: "#E34F26" },
  { name: "CSS", icon: SiCss3, color: "#1572B6" },
  { name: "Tableau", icon: FaChartBar, color: "#0082C7" },
  { name: "Streamlit", icon: SiStreamlit, color: "#FF4B4B" },
  { name: "TypeScript", icon: SiTypescript, color: "#3178C6" },
];

export function Achievements() {
  return (
    <PageTransition>
        <section className="px-6 pb-16 pt-40 md:px-12 md:pt-48">
          <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">
            ◍ Achievements — 05
          </div>
          <h1 className="hero-text mt-8 text-[16vw] leading-[0.9] text-foreground md:text-[11vw] text-glow">
            Track my records.
          </h1>
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground md:text-lg">
            Coding portfolio, real-time sync and performance highlights across all supported platforms.
          </p>
        </section>

        {/* Coding Profiles */}
        <section className="px-6 pb-24 md:px-12">
          <div className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Coding Profiles
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            {profiles.map((p, i) => {
              const Icon = p.icon;
              return (
                <motion.a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.6 }}
                  className="group flex items-center justify-between gap-6 rounded-2xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.02] p-6 backdrop-blur transition hover:border-accent/60 hover:bg-black/[0.04] dark:hover:bg-white/[0.04]"
                >
                  <div className="flex items-center gap-5">
                    <Icon className="h-9 w-9 text-foreground transition-colors group-hover:text-accent" />
                    <div>
                      <div className="display text-2xl text-foreground">
                        {p.name}
                      </div>
                      <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
                        @{p.handle}
                      </div>
                    </div>
                  </div>
                  <ExternalLink className="h-4 w-4 text-muted-foreground transition-colors group-hover:text-accent" />
                </motion.a>
              );
            })}
          </div>
        </section>

        {/* Live Sync Preview */}
        <section className="px-6 pb-24 md:px-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
                Live Sync — Codolio
              </div>
              <h2 className="display mt-3 text-3xl text-foreground md:text-4xl">
                Real-time coding portfolio
                <span className="ml-3 inline-flex items-center gap-2 align-middle text-xs uppercase tracking-[0.3em] text-accent">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                  </span>
                  Live
                </span>
              </h2>
            </div>
            <a
              href="https://codolio.com/profile/Sugar_Genius585_"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden text-xs uppercase tracking-[0.3em] text-muted-foreground hover:text-foreground md:inline-flex md:items-center md:gap-2"
            >
              Open <ExternalLink className="h-3 w-3" />
            </a>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-black/10 dark:border-white/10 bg-black/5 dark:bg-black/40 shadow-xl dark:shadow-[0_0_80px_-20px_oklch(0.7_0.22_230_/_0.3)]"
          >
            {/* Browser-like chrome */}
            <div className="flex items-center gap-2 border-b border-black/10 dark:border-white/10 bg-black/[0.03] dark:bg-white/[0.03] px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-red-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/70" />
              <span className="h-2.5 w-2.5 rounded-full bg-green-500/70" />
              <div className="ml-4 flex-1 truncate rounded-md bg-black/40 px-3 py-1 text-[11px] text-muted-foreground">
                codolio.com/profile/Sugar_Genius585_
              </div>
            </div>
            <div className="relative aspect-[14/9] w-full bg-background md:aspect-[15/9]">
              <iframe
                src="https://codolio.com/profile/Sugar_Genius585_"
                title="Codolio live portfolio"
                loading="lazy"
                className="absolute inset-0 h-full w-full pointer-events-none"
                sandbox="allow-scripts allow-same-origin allow-popups"
              />
            </div>
          </motion.div>
          <p className="mt-4 text-xs text-muted-foreground">
            Auto-syncs with every problem solved across LeetCode, Codeforces &amp; CodeChef. If the embed is blocked by the provider,{" "}
            <a
              href="https://codolio.com/profile/Sugar_Genius585_"
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent underline-offset-4 hover:underline"
            >
              open the live page
            </a>
            .
          </p>
        </section>

        {/* Skills */}
        <section className="px-6 pb-16 md:px-12">
          <div className="mb-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Skills — Hover to reveal
          </div>
          <div className="overflow-x-auto pb-8 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <MaskedAvatars
              avatars={skills.map((skill) => ({
                name: skill.name,
                Icon: skill.icon,
                color: skill.color,
              }))}
              size={86}
              column={50}
              className="px-3 pt-16"
            />
          </div>

          <div className="mt-14 rounded-3xl border border-black/10 dark:border-white/10 bg-black/[0.02] dark:bg-white/[0.04] p-6 shadow-sm shadow-black/10 backdrop-blur md:p-8">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
              Core Concepts
            </div>
            <div className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
              <ul className="list-disc pl-5 space-y-3">
                {[
                  "Data Structures & Algorithms",
                  "Object-Oriented Programming (OOP)",
                  "Database Management Systems (DBMS)",
                  "Operating Systems",
                  "Computer Architecture",
                ].map((concept) => (
                  <li key={concept}>{concept}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      </PageTransition>
  );
}
