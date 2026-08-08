"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, X, Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Eyebrow } from "@/components/ui/Eyebrow";

const navLinks = [
  { label: "Services", href: "/#services" },
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

const serviceItems = [
  { label: "Web Design & Development", sublabel: "Get Clients Online" },
  { label: "Content & Copywriting", sublabel: "Words That Convert" },
  { label: "Marketing Design", sublabel: "Look the Part" },
  { label: "Lead Generation", sublabel: "Fill Your Pipeline" },
  { label: "Career & Personal Branding", sublabel: "Get Hired or Noticed" },
];

function scrollTo(id: string, pathname: string) {
  const hash = id.replace("/", "");
  if (pathname !== "/") { window.location.href = id; return; }
  document.querySelector(hash)?.scrollIntoView({ behavior: "smooth" });
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLLIElement>(null);
  const rafRef = useRef(false);
  const scrolledRef = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current) return;
      rafRef.current = true;
      requestAnimationFrame(() => {
        rafRef.current = false;
        const next = window.scrollY > 20;
        if (next !== scrolledRef.current) {
          scrolledRef.current = next;
          setScrolled(next);
        }
      });
    };
    const onClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    document.addEventListener("mousedown", onClickOutside);
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      document.removeEventListener("mousedown", onClickOutside);
    };
  }, []);

  // Lock scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <>
      {/* ── Floating Pill Navbar ───────────────────────────── */}
      <header className="fixed top-0 left-0 right-0 z-[200] flex justify-center pt-4 md:pt-5 px-4 pointer-events-none">
        <nav
          className={`pointer-events-auto w-full max-w-5xl flex items-center justify-between gap-4 px-4 md:px-6 h-14 md:h-16 rounded-full transition-all duration-500 ${
            scrolled
              ? "bg-white/95 backdrop-blur-md shadow-badge border border-black/5"
              : "bg-white/80 backdrop-blur-sm shadow-sm border border-black/5"
          }`}
          aria-label="Main navigation"
        >
          {/* Logo */}
          <Link href="/" className="flex-shrink-0" aria-label="LEWAY Creatives Home">
            <Image
              src="/images/leway_creatives_logo.png"
              alt="LEWAY Creatives"
              width={120}
              height={36}
              className="h-7 md:h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Links */}
          <ul className="hidden md:flex items-center gap-1">
            {/* Services dropdown */}
            <li ref={servicesRef} className="relative">
              <button
                onClick={() => setServicesOpen((o) => !o)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-medium text-leway-dark/70 hover:text-leway-dark hover:bg-black/5 transition-all duration-200 font-body"
              >
                Services
                <ChevronDown
                  size={14}
                  className={`transition-transform duration-200 ${servicesOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {servicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 8, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: [0.32, 0.72, 0, 1] }}
                    className="absolute top-full left-1/2 -translate-x-1/2 mt-3 w-72 bg-leway-forest rounded-2xl shadow-hover border border-white/10 p-2 overflow-hidden"
                  >
                    {serviceItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setServicesOpen(false);
                          scrollTo("/#services", pathname);
                        }}
                        className="flex flex-col w-full px-4 py-3 rounded-xl text-left transition-colors hover:bg-white/10 group"
                      >
                        <span className="font-body text-sm font-medium text-white group-hover:text-white">
                          {item.label}
                        </span>
                        <Eyebrow as="span" className="text-white/50 mt-0.5">
                          {item.sublabel}
                        </Eyebrow>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </li>

            {navLinks.slice(1).map((l) => (
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href, pathname)}
                  className="px-4 py-2 rounded-full text-sm font-medium text-leway-dark/70 hover:text-leway-dark hover:bg-black/5 transition-all duration-200 font-body"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>

          {/* CTA */}
          <div className="hidden md:inline-flex btn-ripple-wave">
            <button
              onClick={() => scrollTo("/#contact", pathname)}
              className="flex items-center gap-2 bg-leway-green text-leway-dark text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-leway-green/90 active:scale-[0.98] transition-all duration-200 font-body"
            >
              Start a Project
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-full bg-black/5 text-leway-dark"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </nav>
      </header>

      {/* ── Mobile Full-Screen Overlay ─────────────────────── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[190] bg-leway-forest flex flex-col md:hidden"
          >
            <div className="flex-1 flex flex-col items-center justify-center gap-6 px-8 overflow-y-auto">
              {navLinks.map((l, i) => (
                <motion.button
                  key={l.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                  onClick={() => { setOpen(false); setTimeout(() => scrollTo(l.href, pathname), 100); }}
                  className="font-display text-4xl font-semibold text-white hover:text-leway-green transition-colors"
                >
                  {l.label}
                </motion.button>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.4 }}
                className="mt-6 btn-ripple-wave"
              >
                <button
                  onClick={() => { setOpen(false); setTimeout(() => scrollTo("/#contact", pathname), 100); }}
                  className="bg-leway-green text-leway-dark font-semibold px-8 py-4 rounded-full text-lg hover:bg-leway-green/90 transition-colors font-body"
                >
                  Start a Project →
                </button>
              </motion.div>
            </div>

            <div className="p-8 text-center">
              <p className="text-sm text-white/40 font-body">connect@lewaycreatives.com</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}