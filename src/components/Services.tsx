"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { Globe, Palette, PenTool, UserCheck, Crosshair, ArrowRight } from "lucide-react";

type ServiceImage = { src: string; alt: string; link?: string };

const categories = [
  {
    id: "web",
    icon: Globe,
    title: "Web Design & Development",
    badge: "Get Clients Online",
    description: "We don\u2019t just build websites \u2014 we engineer conversion machines. Every pixel, every word, every interaction is designed to turn visitors into paying customers.",
    services: [
      { name: "Landing Pages", desc: "High-converting pages built to maximize traffic and conversion for your marketing campaigns." },
      { name: "Complete Website Design", desc: "Custom-designed websites that are responsive, user-friendly, and aligned with your brand identity." },
      { name: "Personal Portfolio Websites", desc: "Professional portfolio sites to showcase your skills, projects, and achievements beautifully." },
    ],
    image: "/images/service_web_design.png"
  },
  {
    id: "content",
    icon: PenTool,
    title: "Content & Copywriting",
    badge: "Get Found & Trusted",
    description: "Words that sell, stories that stick. We craft copy that doesn\u2019t just inform \u2014 it persuades, converts, and builds lasting brand authority across every channel.",
    services: [
      { name: "Social Media Content", desc: "We write the copy AND create the visuals for every post \u2014 so your social media looks sharp and reads even sharper." },
      { name: "Social Media Management", desc: "Content scheduling, posting, and engagement strategies to grow your online presence consistently." },
      { name: "Blog & Article Writing", desc: "SEO-optimised articles and blogs tailored to your brand\u2019s goals \u2014 written to rank and written to convert." },
      { name: "Email & Newsletter Copywriting", desc: "Compelling email campaigns that nurture your leads, build trust, and drive consistent conversions." },
      { name: "Ebook Writing & Design", desc: "We write the content AND design the layout \u2014 a complete lead-magnet ebook, done for you from start to finish." },
    ],
    image: "/images/service_content.png"
  },
  {
    id: "graphic",
    icon: Palette,
    title: "Marketing Design",
    badge: "Look the Part",
    description: "Visual identity that demands attention. From scroll-stopping ads to brand systems that make competitors nervous \u2014 we design assets that work as hard as you do.",
    services: [
      { name: "Ads & Social Banners", desc: "Scroll-stopping visuals for Meta, LinkedIn, and Google ads \u2014 designed to boost click-through rates." },
      { name: "Flyer & Poster Design", desc: "Catchy promotional materials for both online and print marketing campaigns." },
      { name: "Logo & Brand Identity", desc: "Distinctive, scalable logos and cohesive brand systems \u2014 colours, fonts, and guidelines that make your business instantly recognisable." },
      { name: "Presentation Design", desc: "Sleek, branded presentations for pitches, investor decks, reports, and webinars." },
    ],
    image: "/images/service_marketing.png"
  },
  {
    id: "leadgen",
    icon: Crosshair,
    title: "Lead Generation",
    badge: "Fill Your Pipeline",
    description: "We find your ideal clients before you even pick up the phone. Verified contact lists, deep prospect research, and outreach setup \u2014 so your pipeline is never empty and your time is never wasted.",
    services: [
      { name: "Prospect & Contact List Building", desc: "Targeted lists of verified leads \u2014 emails, LinkedIn profiles, and decision-maker contacts built specifically for your niche and ideal client profile." },
      { name: "B2B Research & Data", desc: "Company research, market research, niche research, and web research to help you understand and reach your ideal buyers with precision." },
      { name: "LinkedIn & Email Outreach Setup", desc: "We set up your outreach sequences \u2014 the messaging, the targeting, and the follow-up flow \u2014 so you can start conversations with qualified prospects." },
      { name: "Sales Lead Lists", desc: "Targeted B2B lead lists, segmented by industry, company size, or geography \u2014 ready to import into your CRM or outreach tool." },
    ],
    image: "/images/service_lead_gen.png"
  },
  {
    id: "career",
    icon: UserCheck,
    title: "Career & Personal Branding",
    badge: "Get Hired or Noticed",
    description: "Your skills are world-class. Your online presence should say so. We build personal brands that open doors \u2014 whether you\u2019re chasing a promotion, a new role, or high-profile clients.",
    services: [
      { name: "LinkedIn Profile Optimisation", desc: "Professional profile revamps to attract recruiters and build authority." },
      { name: "Resume/CV Writing", desc: "Professionally written resumes designed to pass Applicant Tracking Systems and stand out to recruiters." },
      { name: "Personal Portfolio Websites", desc: "Professional portfolio sites to showcase your skills, projects, and achievements beautifully." },
      { name: "Personal Brand Strategy", desc: "We define your positioning, your message, and your content direction \u2014 so you become the obvious choice in your industry." },
    ],
    image: "/images/service_career.png"
  },
];

export default function Services() {
  const [active, setActive] = useState("web");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="services" className="py-24 md:py-32 bg-background text-leway-dark noise-bg relative z-0">
      <div className="container mx-auto px-6 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 md:mb-24 lg:mb-32"
        >
          <h2 className="font-ui uppercase tracking-widest text-[#8A9E8E] text-[11px] mb-6 md:mb-8 flex items-center gap-4">
            <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
            OUR SERVICES
          </h2>
          <h3 className="font-display text-4xl md:text-7xl lg:text-[6rem] font-medium leading-[1.05] md:leading-[1] max-w-4xl tracking-tight">
            Everything You Need to <span className="italic text-leway-dark">Win</span> Online
          </h3>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-24 items-start relative">

          {/* Mobile: Stacked category pills — full title, wraps to next line */}
          <div className="lg:hidden flex flex-wrap gap-2">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 px-4 py-2.5 border transition-all duration-300 text-xs font-ui font-bold uppercase tracking-wider ${cat.id === active
                  ? 'bg-leway-dark text-white border-leway-dark'
                  : 'bg-transparent text-leway-dark/60 border-leway-dark/20 hover:border-leway-dark/50'
                  }`}
              >
                <span className="text-[9px] opacity-50">{(index + 1).toString().padStart(2, '0')}</span>
                <span>{cat.title}</span>
              </button>
            ))}
          </div>

          {/* Desktop: Sticky sidebar */}
          <div className="hidden lg:flex lg:col-span-5 flex-col gap-8 lg:sticky lg:top-32">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`text-left group transition-all duration-500 flex flex-col gap-2 ${cat.id === active ? 'opacity-100' : 'opacity-30 hover:opacity-60'}`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-ui text-xs tracking-widest font-bold text-leway-dark/50 w-6">{(index + 1).toString().padStart(2, '0')}</span>
                  <span className="font-display text-3xl md:text-4xl lg:text-5xl leading-tight transition-transform duration-500 group-hover:translate-x-2">
                    {cat.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Right — Content area */}
          <div className="lg:col-span-7 relative min-h-[400px] md:min-h-[500px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="flex flex-col gap-8 md:gap-10"
              >
                <div className="relative w-full aspect-[16/9] rounded-xl overflow-hidden group/image border border-leway-dark/10 shadow-lg">
                  <div className="absolute inset-0 z-10 bg-black/15 transition-colors duration-500 group-hover/image:bg-transparent"></div>
                  <div className="absolute inset-0 z-10 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_0_2px_rgba(34,197,94,0.5),0_0_40px_rgba(34,197,94,0.2)] rounded-xl pointer-events-none"></div>
                  <Image src={current.image} alt={current.title} fill sizes="(max-width: 1024px) 100vw, 60vw" className="object-cover transition-transform duration-700 group-hover/image:scale-105" />
                </div>

                <div className="mb-2">
                  <p className="font-body text-xl md:text-2xl lg:text-3xl text-leway-dark/80 leading-relaxed font-light">
                    {current.description}
                  </p>
                </div>

                <div className="h-px w-full bg-leway-dark/10" />

                <div className="flex flex-col gap-6 md:gap-8">
                  <p className="font-ui tracking-widest uppercase text-xs text-leway-dark/40">Included</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 md:gap-x-12 gap-y-8 md:gap-y-10">
                    {current.services.map((s, i) => (
                      <div
                        key={s.name}
                        className="flex flex-col gap-2 group"
                      >
                        <h4 className="font-display text-lg md:text-xl font-bold text-leway-dark flex items-start gap-2">
                          <ArrowRight size={15} className="mt-1 opacity-20 group-hover:opacity-100 group-hover:translate-x-1 transition-all shrink-0" />
                          {s.name}
                        </h4>
                        <p className="font-body text-sm md:text-base text-leway-dark/60 leading-relaxed font-light">
                          {s.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
