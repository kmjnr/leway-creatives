"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Globe, Palette, PenTool, UserCheck, Crosshair } from "lucide-react";

// ---------------------------------------------------------------------------
// Data — all copy sourced directly from brand strategy
// ---------------------------------------------------------------------------
const services = [
  {
    id: "web",
    num: "01",
    icon: Globe,
    title: "Web Design & Development",
    badge: "Get Clients Online",
    description:
      "We don't just build websites — we engineer conversion machines. Every pixel, every word, every interaction is designed to turn visitors into paying customers.",
    items: [
      "Landing Pages",
      "Complete Website Design",
      "Personal Portfolio Websites",
    ],
    image: "/images/service_web_design.png",
    imageAlt:
      "Custom web design and development for high-converting websites — Leway Creatives",
  },
  {
    id: "content",
    num: "02",
    icon: PenTool,
    title: "Content & Copywriting",
    badge: "Get Found & Trusted",
    description:
      "Words that sell, stories that stick. We craft copy that doesn't just inform — it persuades, converts, and builds lasting brand authority across every channel.",
    items: [
      "Social Media Content",
      "Blog & Article Writing",
      "Email & Newsletter Copywriting",
      "Ebook Writing & Design",
    ],
    image: "/images/service_content.png",
    imageAlt:
      "Professional content writing and copywriting services — Leway Creatives",
  },
  {
    id: "graphic",
    num: "03",
    icon: Palette,
    title: "Marketing Design",
    badge: "Look the Part",
    description:
      "Visual identity that demands attention. From scroll-stopping ads to brand systems that make competitors nervous — we design assets that work as hard as you do.",
    items: [
      "Ads & Social Banners",
      "Logo & Brand Identity",
      "Flyer & Poster Design",
      "Presentation Design",
    ],
    image: "/images/service_marketing.png",
    imageAlt:
      "Marketing design, logo, and brand identity services — Leway Creatives",
  },
  {
    id: "leadgen",
    num: "04",
    icon: Crosshair,
    title: "Lead Generation",
    badge: "Fill Your Pipeline",
    description:
      "We find your ideal clients before you even pick up the phone. Verified contact lists, deep prospect research, and outreach setup — so your pipeline is never empty.",
    items: [
      "Prospect & Contact List Building",
      "B2B Research & Data",
      "LinkedIn & Email Outreach Setup",
      "Sales Lead Lists",
    ],
    image: "/images/service_lead_gen.png",
    imageAlt:
      "B2B lead generation and prospect research services — Leway Creatives",
  },
  {
    id: "career",
    num: "05",
    icon: UserCheck,
    title: "Career & Personal Branding",
    badge: "Get Hired or Noticed",
    description:
      "Your skills are world-class. Your online presence should say so. We build personal brands that open doors — whether you're chasing a promotion, a new role, or high-profile clients.",
    items: [
      "LinkedIn Profile Optimisation",
      "Resume / CV Writing",
      "Personal Portfolio Websites",
      "Personal Brand Strategy",
    ],
    image: "/images/service_career.png",
    imageAlt:
      "Career coaching, LinkedIn optimisation, and personal branding services — Leway Creatives",
  },
] as const;

// ---------------------------------------------------------------------------
// FeaturedCard — full-width row, horizontal split (image left | text right)
// Used exclusively for the primary flagship service: Web Design & Development
// ---------------------------------------------------------------------------
function FeaturedCard({ service }: { service: (typeof services)[number] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.article
      ref={ref}
      id={`service-${service.id}`}
      aria-label={`Service: ${service.title}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, ease: [0.25, 1, 0.5, 1] }}
      className="group relative flex flex-col md:flex-row border border-leway-dark/10 rounded-lg overflow-hidden bg-background"
    >
      {/* Hover ring — opacity only, GPU composited */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-leway-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* ── IMAGE — left 55% on desktop, full-width on mobile ── */}
      <div className="relative w-full md:w-[55%] shrink-0 aspect-[16/9] md:aspect-auto md:min-h-[380px] lg:min-h-[440px] overflow-hidden">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 768px) 100vw, 55vw"
          className="object-cover will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
          loading="eager"
          decoding="async"
          priority
        />
      </div>

      {/* ── VERTICAL DIVIDER (desktop) / HORIZONTAL DIVIDER (mobile) ── */}
      <div
        aria-hidden="true"
        className="md:hidden h-px w-full bg-leway-dark/8"
      />
      <div
        aria-hidden="true"
        className="hidden md:block w-px bg-leway-dark/8 shrink-0"
      />

      {/* ── TEXT — right 45% on desktop, full-width on mobile ── */}
      <div className="flex flex-col justify-center gap-4 p-6 md:p-10 lg:p-12 grow">
        {/* Number + Icon */}
        <div className="flex items-center justify-between">
          <span
            className="font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B8C6E]"
            aria-hidden="true"
          >
            {service.num}
          </span>
          <Icon
            size={16}
            strokeWidth={1.5}
            className="text-leway-dark/25 transition-colors duration-150 group-hover:text-[#6B8C6E]"
            aria-hidden="true"
          />
        </div>

        {/* Title */}
        <h3 className="font-display text-2xl md:text-3xl lg:text-4xl leading-tight text-leway-dark font-medium tracking-[-0.02em]">
          {service.title}
        </h3>

        {/* Badge */}
        <p className="font-body text-base italic text-[#6B8C6E] leading-snug">
          {service.badge}
        </p>

        {/* Sub-services */}
        <ul
          className="flex flex-col gap-2 mt-1"
          aria-label={`Services included in ${service.title}`}
        >
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-base text-leway-dark/65 leading-snug"
            >
              <span
                className="mt-[0.35em] shrink-0 w-[5px] h-[5px] rounded-full bg-[#6B8C6E]/50"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        {/* Description — always in DOM, opacity-only reveal */}
        <p
          className="font-body text-base text-leway-dark/40 leading-relaxed mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"
          aria-label={`More about ${service.title}`}
        >
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// ServiceCard — standard card, image on top, text below
// Used for the 4 supporting services in the 2x2 grid
// ---------------------------------------------------------------------------
function ServiceCard({
  service,
  index,
}: {
  service: (typeof services)[number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const Icon = service.icon;

  return (
    <motion.article
      ref={ref}
      id={`service-${service.id}`}
      aria-label={`Service: ${service.title}`}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: index * 0.07,
        ease: [0.25, 1, 0.5, 1],
      }}
      className="group relative flex flex-col border border-leway-dark/10 rounded-lg overflow-hidden bg-background"
    >
      {/* Hover ring */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-10 rounded-lg ring-1 ring-leway-dark/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
      />

      {/* IMAGE ZONE */}
      <div className="relative w-full aspect-[16/9] overflow-hidden shrink-0">
        <Image
          src={service.image}
          alt={service.imageAlt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 35vw"
          className="object-cover will-change-transform transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] group-hover:scale-[1.03]"
          loading="lazy"
          decoding="async"
        />
      </div>

      {/* DIVIDER */}
      <div className="h-px w-full bg-leway-dark/8" aria-hidden="true" />

      {/* TEXT ZONE */}
      <div className="flex flex-col gap-3 p-5 md:p-6 grow">
        <div className="flex items-center justify-between">
          <span
            className="font-ui text-[10px] font-bold tracking-[0.2em] uppercase text-[#6B8C6E]"
            aria-hidden="true"
          >
            {service.num}
          </span>
          <Icon
            size={14}
            strokeWidth={1.5}
            className="text-leway-dark/25 transition-colors duration-150 group-hover:text-[#6B8C6E]"
            aria-hidden="true"
          />
        </div>

        <h3 className="font-display text-xl md:text-2xl leading-tight text-leway-dark font-medium tracking-[-0.02em]">
          {service.title}
        </h3>

        <p className="font-body text-base italic text-[#6B8C6E] leading-snug">
          {service.badge}
        </p>

        <ul
          className="flex flex-col gap-1.5 mt-1"
          aria-label={`Services included in ${service.title}`}
        >
          {service.items.map((item) => (
            <li
              key={item}
              className="flex items-start gap-2 font-body text-base text-leway-dark/65 leading-snug"
            >
              <span
                className="mt-[0.3em] shrink-0 w-[5px] h-[5px] rounded-full bg-[#6B8C6E]/50"
                aria-hidden="true"
              />
              {item}
            </li>
          ))}
        </ul>

        <p
          className="font-body text-base text-leway-dark/40 leading-relaxed mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 ease-out"
          aria-label={`More about ${service.title}`}
        >
          {service.description}
        </p>
      </div>
    </motion.article>
  );
}

// ---------------------------------------------------------------------------
// Section header — semantic, accessible, SEO-friendly
// ---------------------------------------------------------------------------
function SectionHeader() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <div ref={ref} className="mb-12 md:mb-16 lg:mb-20">
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="font-ui uppercase tracking-[0.2em] text-[#6B8C6E] text-[11px] mb-5 flex items-center gap-4"
        aria-hidden="true"
      >
        <span className="w-8 h-[1.5px] bg-[#0D6B35]" />
        Our Services
      </motion.p>

      {/* h2 — the single primary heading for this section, crawled by Google */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.08, ease: [0.25, 1, 0.5, 1] }}
        className="font-display text-4xl md:text-6xl lg:text-[5.5rem] font-medium leading-[1.05] tracking-tight max-w-3xl"
      >
        Everything You Need to{" "}
        <em className="italic text-leway-dark">Win Online</em>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.18 }}
        className="mt-4 font-body text-base md:text-lg text-leway-dark/55 max-w-xl leading-relaxed"
      >
        Five specialist services. One team. Every deliverable designed to grow
        your business online.
      </motion.p>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Services section
// Layout:
//   Row 1 — FeaturedCard (Web Design, full width, horizontal split)
//   Row 2 — ServiceCard × 2 (Content & Copywriting | Marketing Design)
//   Row 3 — ServiceCard × 2 (Lead Generation | Career & Personal Branding)
// ---------------------------------------------------------------------------
export default function Services() {
  const [featured, ...rest] = services;
  // rest[0] = Content & Copywriting
  // rest[1] = Marketing Design
  // rest[2] = Lead Generation
  // rest[3] = Career & Personal Branding

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="py-24 md:py-32 bg-background noise-bg relative z-0"
    >
      <span id="services-heading" className="sr-only">
        Our Services
      </span>

      <div className="container mx-auto px-6 max-w-7xl">
        <SectionHeader />

        <div className="flex flex-col gap-4 md:gap-5">

          {/* ── ROW 1: Featured flagship service — full width ── */}
          <FeaturedCard service={featured} />

          {/* ── ROW 2: Content + Marketing — 2 equal columns ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            <ServiceCard service={rest[0]} index={1} />
            <ServiceCard service={rest[1]} index={2} />
          </div>

          {/* ── ROW 3: Lead Gen + Career — 2 equal columns ── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
            <ServiceCard service={rest[2]} index={3} />
            <ServiceCard service={rest[3]} index={4} />
          </div>

        </div>

        {/* SEO-crawlable structured content */}
        <div className="sr-only" aria-hidden="true">
          <h3>Web Design and Development Services in Kenya</h3>
          <p>Leway Creatives offers professional web design, landing pages, and complete website development to help businesses win online.</p>
          <h3>Content Writing and Copywriting Services</h3>
          <p>Expert content creation including social media content, blog writing, email copywriting, and ebook writing for brands.</p>
          <h3>Marketing Design and Brand Identity</h3>
          <p>Creative marketing design services including logo design, brand identity, social media ads, flyers, and presentation design.</p>
          <h3>B2B Lead Generation Services</h3>
          <p>Targeted prospect list building, B2B research, LinkedIn outreach setup, and sales lead lists for business growth.</p>
          <h3>Career Coaching and Personal Branding</h3>
          <p>LinkedIn profile optimisation, professional CV writing, personal portfolio websites, and personal brand strategy.</p>
        </div>
      </div>
    </section>
  );
}
