"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { services } from "@/data/services";
import { site } from "@/data/site";
import { cn } from "@/lib/utils";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Work", href: "/work" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/** A nav item is current on its own route and every route beneath it. */
function isCurrent(pathname: string, href: string) {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const servicesRef = useRef<HTMLDivElement>(null);

  // Lock scroll behind the mobile menu.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Any navigation closes whatever was open.
  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [pathname]);

  // Escape closes the services panel and returns focus to its trigger.
  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setServicesOpen(false);
      servicesRef.current?.querySelector("button")?.focus();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [servicesOpen]);

  // Escape closes the mobile menu.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[200] bg-leway-paper">
        <nav
          aria-label="Main navigation"
          className="container flex h-[72px] items-center justify-between gap-6"
        >
          <Link href="/" aria-label={`${site.name} home`} className="flex-shrink-0">
            <Image
              src="/images/leway_creatives_logo.png"
              alt={site.name}
              width={120}
              height={36}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop links — real hrefs, so they work without JS. */}
          <ul className="hidden md:flex items-center gap-1">
            {navLinks.map((link) =>
              link.href === "/services" ? (
                <li key={link.href}>
                  <div
                    ref={servicesRef}
                    className="relative"
                    onMouseEnter={() => setServicesOpen(true)}
                    onMouseLeave={() => setServicesOpen(false)}
                  >
                    <div className="flex items-center">
                      <Link
                        href="/services"
                        className={cn(
                          "inline-flex items-center h-11 pl-4 pr-1 rounded-l-pill font-body text-base transition-colors",
                          isCurrent(pathname, "/services")
                            ? "text-leway-dark"
                            : "text-leway-dark/75 hover:text-leway-dark",
                        )}
                      >
                        Services
                      </Link>
                      <button
                        type="button"
                        onClick={() => setServicesOpen((o) => !o)}
                        aria-expanded={servicesOpen}
                        aria-controls="services-menu"
                        className="inline-flex items-center justify-center h-11 w-8 pr-3 rounded-r-pill text-leway-dark/70 hover:text-leway-dark transition-colors"
                      >
                        <span className="sr-only">
                          {servicesOpen ? "Hide the service list" : "Show the service list"}
                        </span>
                        <ChevronDown
                          size={15}
                          aria-hidden="true"
                          className={cn(
                            "transition-transform duration-200",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>

                    {/* The panel is always in the DOM; visibility is the only change. */}
                    <div
                      id="services-menu"
                      hidden={!servicesOpen}
                      className="absolute left-0 top-full pt-2 w-[22rem]"
                    >
                      <div className="rounded-card bg-leway-paper p-2 shadow-overlay">
                        <ul>
                          {services.map((service) => (
                            <li key={service.slug}>
                              <Link
                                href={`/services/${service.slug}`}
                                className="block px-4 py-3 min-h-[44px] rounded-card font-body text-base text-leway-dark/80 hover:text-leway-dark hover:bg-leway-dark/5 transition-colors"
                              >
                                {service.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href="/services"
                          className="block px-4 py-3 min-h-[44px] mt-1 rounded-card bg-leway-paper-2 font-body text-base text-leway-dark hover:bg-leway-mint transition-colors"
                        >
                          Timelines and from-prices
                        </Link>
                      </div>
                    </div>
                  </div>
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={isCurrent(pathname, link.href) ? "page" : undefined}
                    className={cn(
                      "inline-flex items-center h-11 px-4 rounded-pill font-body text-base transition-colors",
                      isCurrent(pathname, link.href)
                        ? "text-leway-dark bg-leway-dark/5"
                        : "text-leway-dark/75 hover:text-leway-dark hover:bg-leway-dark/5",
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              ),
            )}
          </ul>

          <Link
            href="/contact"
            className="hidden md:inline-flex items-center h-11 px-6 rounded-pill bg-leway-green text-leway-dark text-base font-semibold hover:bg-[#1EB857] active:scale-[0.98] transition-colors"
          >
            Start a project
          </Link>

          {/* Mobile menu trigger */}
          <button
            type="button"
            onClick={() => setOpen(true)}
            className="md:hidden flex items-center justify-center w-11 h-11 rounded-pill text-leway-dark"
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <Menu size={22} aria-hidden="true" />
          </button>
        </nav>
      </header>

      {/* Mobile menu — flat pine field, large type, one action. */}
      {open && (
        <div
          id="mobile-menu"
          className="fixed inset-0 z-[210] bg-leway-dark text-leway-paper flex flex-col md:hidden overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="flex h-[72px] items-center justify-between px-6 flex-shrink-0">
            <Image
              src="/images/leway_creatives_logo.png"
              alt={site.name}
              width={120}
              height={36}
              className="h-8 w-auto brightness-0 invert"
            />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="flex items-center justify-center w-11 h-11 rounded-pill text-leway-paper"
              aria-label="Close menu"
              autoFocus
            >
              <X size={22} aria-hidden="true" />
            </button>
          </div>

          <nav
            aria-label="Mobile navigation"
            className="flex-1 flex flex-col justify-center gap-1 px-8 py-6"
          >
            <Link
              href="/"
              className="font-display text-4xl py-2 text-leway-paper hover:text-leway-green transition-colors"
            >
              Home
            </Link>
            <Link
              href="/work"
              className="font-display text-4xl py-2 text-leway-paper hover:text-leway-green transition-colors"
            >
              Work
            </Link>

            <Link
              href="/services"
              className="font-display text-4xl py-2 text-leway-paper hover:text-leway-green transition-colors"
            >
              Services
            </Link>
            {/* Two columns keeps the menu inside one screen on small phones. */}
            <ul className="grid grid-cols-2 gap-x-4 gap-y-0.5 pl-1 mb-2">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="inline-flex py-3 font-body text-small text-leway-paper/70 hover:text-leway-paper transition-colors"
                  >
                    {service.short}
                  </Link>
                </li>
              ))}
            </ul>

            <Link
              href="/about"
              className="font-display text-4xl py-2 text-leway-paper hover:text-leway-green transition-colors"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="font-display text-4xl py-2 text-leway-paper hover:text-leway-green transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="mt-6 inline-flex w-fit items-center h-14 px-8 rounded-pill bg-leway-green text-leway-dark font-semibold text-lg"
            >
              Start a project
            </Link>
          </nav>

          <div className="px-8 pb-6 flex flex-col gap-1">
            <a
              href={`mailto:${site.email}`}
              className="inline-flex items-center min-h-[44px] font-body text-small text-leway-paper/70 underline underline-offset-4 hover:text-leway-paper transition-colors"
            >
              {site.email}
            </a>
            <a
              href={site.whatsappProject}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center min-h-[44px] font-body text-small text-leway-paper/70 underline underline-offset-4 hover:text-leway-paper transition-colors"
            >
              WhatsApp {site.phoneDisplay}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </div>
        </div>
      )}
    </>
  );
}
