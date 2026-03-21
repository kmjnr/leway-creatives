"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

const serviceDropdownItems = [
  { label: "Web Design & Development", sublabel: "Get Clients Online", href: "/#services" },
  { label: "Content & Copywriting", sublabel: "Get Found & Trusted", href: "/#services" },
  { label: "Marketing Design", sublabel: "Look the Part", href: "/#services" },
  { label: "Lead Generation", sublabel: "Fill Your Pipeline", href: "/#services" },
  { label: "Career & Personal Branding", sublabel: "Get Hired or Noticed", href: "/#services" },
];

const scrollTo = (id: string, pathname: string) => {
  if (pathname !== "/") {
    window.location.href = id;
    return;
  }
  const el = document.querySelector(id.replace("/", ""));
  el?.scrollIntoView({ behavior: "smooth" });
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const servicesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setServicesOpen(false);
      }
    };

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", handleScroll);

    // Initial check
    handleScroll();

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[70] transition-all duration-500 ${scrolled ? "bg-[#F8F6F1]/95 backdrop-blur-xl border-b border-leway-dark/10" : "bg-gradient-to-b from-black/80 via-black/40 to-transparent border-transparent"}`}>
        <nav
          className="container mx-auto flex items-center justify-between px-6 py-4 md:py-5 max-w-7xl"
          aria-label="Main navigation">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="LEWAY Creatives Home">
            <Image
              src="/images/leway-creatives-logo.png"
              alt="LEWAY Creatives"
              className="h-8 md:h-10 w-auto group-hover:opacity-80 transition-opacity"
              width={200}
              height={48}
              priority
            />
          </Link>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-10">
            {/* Services Dropdown */}
            <li>
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setServicesOpen((o) => !o)}
                  className={`flex items-center gap-1 font-ui uppercase tracking-[0.15em] text-[11px] font-bold transition-colors ${scrolled ? "text-leway-dark/70 hover:text-leway-dark" : "text-white/70 hover:text-white"}`}
                >
                  Services
                  <ChevronDown size={14} className={`transition-transform ${servicesOpen ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {servicesOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      exit={{ opacity: 0, y: 10, filter: "blur(10px)" }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-6 w-80 rounded-none border border-white/10 bg-[#0A1A0D]/95 backdrop-blur-3xl shadow-2xl p-2"
                    >
                      {serviceDropdownItems.map((item) => (
                        <button
                          key={item.label}
                          onClick={() => {
                            setServicesOpen(false);
                            scrollTo(item.href, pathname);
                          }}
                          className="flex flex-col w-full px-5 py-4 text-left transition-colors hover:bg-white/5 border-b border-white/5 last:border-b-0 group"
                        >
                          <span className="font-display text-base font-medium text-white/90 group-hover:text-leway-green transition-colors mb-1">
                            {item.label}
                          </span>
                          <span className="font-ui tracking-widest uppercase text-[9px] text-white/40">
                            {item.sublabel}
                          </span>
                        </button>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </li>
            {navLinks.map((l) =>
              <li key={l.href}>
                <button
                  onClick={() => scrollTo(l.href, pathname)}
                  className={`font-ui uppercase tracking-[0.15em] text-[11px] font-bold transition-colors ${scrolled ? "text-leway-dark/70 hover:text-leway-dark" : "text-white/70 hover:text-white"}`}>
                  {l.label}
                </button>
              </li>
            )}
            <li>
              <button
                onClick={() => scrollTo("/#contact", pathname)}
                className={`flex items-center justify-center px-8 py-3 ui uppercase tracking-[0.15em] text-[11px] font-bold transition-colors duration-300 ${scrolled ? "bg-leway-green text-leway-dark hover:bg-leway-dark hover:text-leway-light" : "bg-white text-leway-dark hover:bg-leway-green hover:text-leway-dark"}`}>
                Let's Talk
              </button>
            </li>
          </ul>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden relative z-[80] p-1 ${scrolled ? "text-leway-dark" : "text-white"}`}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}>
            {open ? <X size={24} className="text-white" /> : <Menu size={24} />}
          </button>
        </nav>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] bg-[#0A1A0D] flex flex-col items-center justify-center gap-8 md:hidden overflow-y-auto py-20">

            <div className="flex flex-col items-center">
              <button
                onClick={() => setMobileServicesOpen((o) => !o)}
                className="flex items-center gap-2 font-display text-3xl font-medium text-white hover:text-leway-green transition-colors"
              >
                Services
                <ChevronDown size={20} className={`transition-transform ${mobileServicesOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {mobileServicesOpen && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="overflow-hidden flex flex-col items-center gap-6 mt-6"
                  >
                    {serviceDropdownItems.map((item) => (
                      <button
                        key={item.label}
                        onClick={() => {
                          setOpen(false);
                          setMobileServicesOpen(false);
                          setTimeout(() => scrollTo(item.href, pathname), 100);
                        }}
                        className="flex flex-col items-center text-center"
                      >
                        <span className="font-display text-xl font-medium text-white/70 hover:text-leway-green transition-colors">
                          {item.label}
                        </span>
                        <span className="font-ui tracking-widest uppercase text-[10px] text-white/30 mt-1">
                          {item.sublabel}
                        </span>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {navLinks.map((l) => (
              <button
                key={l.href}
                onClick={() => {
                  setOpen(false);
                  setTimeout(() => scrollTo(l.href, pathname), 100);
                }}
                className="font-display text-3xl font-medium text-white hover:text-leway-green transition-colors">
                {l.label}
              </button>
            ))}

            <button
              onClick={() => {
                setOpen(false);
                setTimeout(() => scrollTo("/#contact", pathname), 100);
              }}
              className="mt-8 bg-leway-green text-forest px-8 py-4 font-ui uppercase tracking-widest text-sm font-bold">
              Book a Session
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}