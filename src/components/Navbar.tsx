import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { to: "/", label: "Home", num: "01" },
  { to: "/about", label: "About", num: "02" },
  { to: "/projects", label: "Projects", num: "03" },
  { to: "/achievements", label: "Achievements", num: "04" },
  { to: "/contact", label: "Contact", num: "05" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 mix-blend-difference">
        <div className="flex items-center justify-between px-6 py-6 md:px-12 md:py-8">
          <Link to="/" className="display nav-name-particles text-sm font-bold tracking-[0.3em] text-white">
            VISHNU<span className="text-accent">.</span>M
          </Link>
          <div className="flex items-center gap-5">
            <ThemeToggle />
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              className="group flex items-center gap-3 text-xs font-medium uppercase tracking-[0.25em] text-white"
            >
              <span>{open ? "Close" : "Menu"}</span>
              <span className="relative h-3 w-8">
                <span className={`absolute left-0 top-1 h-px w-full bg-white transition-transform duration-500 ${open ? "translate-y-[5px] rotate-45" : ""}`} />
                <span className={`absolute left-0 bottom-1 h-px w-full bg-white transition-transform duration-500 ${open ? "-translate-y-[5px] -rotate-45" : ""}`} />
              </span>
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "circle(0% at 100% 0%)" }}
            animate={{ clipPath: "circle(150% at 100% 0%)" }}
            exit={{ clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-30 flex flex-col justify-center bg-background px-6 md:px-20"
          >
            <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-organic)" }} />
            <nav className="flex flex-col gap-2 md:gap-4">
              {links.map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ y: 80, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.25 + i * 0.08, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="group flex items-baseline gap-6 border-b border-white/10 py-3 text-foreground hover:text-accent"
                  >
                    <span className="text-xs tracking-widest text-muted-foreground">{l.num}</span>
                    <span className="hero-text text-[8vw] leading-none md:text-[5vw]">{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
              className="mt-12 flex flex-wrap items-center justify-between gap-4 text-xs uppercase tracking-[0.25em] text-muted-foreground"
            >
              <span>vishnumnair595@gmail.com</span>
              <span>Tamil Nadu, India</span>
              <span>© 2026</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
