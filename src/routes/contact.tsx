import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { PageTransition } from "@/components/PageTransition";
import { MagneticButton } from "@/components/MagneticButton";
import { LineHoverLink } from "@/components/ui/line-hover-link";
import { InteractiveTextParticles } from "@/components/InteractiveTextParticles";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Vishnu M" },
      { name: "description", content: "Let's connect and build something rare." },
    ],
  }),
  component: Contact,
});

const socials = [
  { label: "Instagram", href: "https://www.instagram.com/sugar_genius585_/" },
  { label: "GitHub", href: "https://github.com/Vishnunair585" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/vishnu585" },
];

export function Contact() {
  return (
    <PageTransition>
      <section className="flex min-h-screen flex-col justify-between px-6 pb-12 pt-40 md:px-12 md:pt-48">
        <div>
          <div className="text-xs uppercase tracking-[0.4em] text-muted-foreground">◍ Contact — 04</div>
          <h1 className="hero-text mt-8 text-[15vw] text-foreground md:text-[10vw] text-glow leading-[0.9]">
            Let's connect<br />
            and build something <span className="italic text-accent">rare</span>.
          </h1>
        </div>

        <div className="mt-20 grid gap-16 md:grid-cols-12">
          <div className="md:col-span-7">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">General</div>
            <MagneticButton className="mt-4">
              <LineHoverLink href="mailto:vishnumnair595@gmail.com" className="display text-2xl text-foreground hover:text-accent md:text-4xl break-all">
                vishnumnair595@gmail.com
              </LineHoverLink>
            </MagneticButton>

            <div className="mt-12 text-xs uppercase tracking-[0.3em] text-muted-foreground">Phone</div>
            <MagneticButton className="mt-4">
              <LineHoverLink href="tel:+916369750957" className="display text-2xl text-foreground hover:text-accent md:text-4xl">
                +91 6369750957
              </LineHoverLink>
            </MagneticButton>
          </div>

          <div className="md:col-span-4 md:col-start-9">
            <div className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Elsewhere</div>
            <div className="mt-6 flex flex-col gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground">
              {socials.map((s) => (
                <LineHoverLink
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-foreground transition-colors hover:text-accent"
                >
                  {s.label} ↗
                </LineHoverLink>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16 h-64 w-full md:h-[350px] lg:h-[450px] mx-auto px-0 flex justify-center items-center">
          <InteractiveTextParticles text="VISHNU" className="w-full h-full" />
        </div>

        <div className="mt-20 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/10 pt-6 text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
          <span>© 2026 Reserved</span>
          
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="flex items-center gap-2 text-foreground hover:text-accent transition-colors"
          >
            Move to Top ↑
          </button>

          <span>Website created by Vishnu</span>
        </div>
      </section>
    </PageTransition>
  );
}
