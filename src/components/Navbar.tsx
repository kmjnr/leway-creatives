import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "FAQ", href: "#faq" },
];

const scrollTo = (id: string) => {
  const el = document.querySelector(id);
  el?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-accent/95 backdrop-blur-md border-b border-white/5">
      <nav
        className="container mx-auto flex items-center justify-between px-6 py-4 max-w-7xl"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <a
          href="/"
          className="font-display text-xl font-extrabold tracking-tight text-accent-foreground"
          aria-label="LEWAY Creatives Home"
        >
          LEWAY<span className="text-primary">.</span>
        </a>

        {/* Desktop links */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <li key={l.href}>
              <button
                onClick={() => scrollTo(l.href)}
                className="font-body text-sm text-accent-foreground/70 hover:text-accent-foreground transition-colors"
              >
                {l.label}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={() => scrollTo("#contact")}
              className="rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground transition-transform hover:scale-105 hover:shadow-lg hover:shadow-primary/25"
            >
              Book a Session
            </button>
          </li>
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden text-accent-foreground"
          onClick={() => setOpen(!open)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-0 z-40 bg-accent flex flex-col items-center justify-center gap-8 md:hidden"
          >
            <button
              className="absolute top-5 right-6 text-accent-foreground"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X size={28} />
            </button>
            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(l.href), 100);
                }}
                className="font-display text-2xl font-bold text-accent-foreground"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollTo("#contact"), 100);
              }}
              className="rounded-full bg-primary px-8 py-3 text-lg font-bold text-primary-foreground"
            >
              Book a Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
