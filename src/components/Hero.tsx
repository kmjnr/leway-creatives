"use client";

import Image from "next/image";
import { useScrollReveal } from "@/lib/useScrollReveal";
import Marquee from "@/components/ui/Marquee";
import { useEffect, useState } from "react";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: mobileStatsRef, isVisible: mobileStatsVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });

  const [mousePos, setMousePos] = useState({ x: 75, y: 50 });

  useEffect(() => {
    if (window.innerWidth < 1024) return;
    
    let animationFrameId: number;
    const handleMouseMove = (e: MouseEvent) => {
      animationFrameId = requestAnimationFrame(() => {
        const x = (e.clientX / window.innerWidth) * 100;
        const y = (e.clientY / window.innerHeight) * 100;
        setMousePos({ x, y });
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section
      className="relative w-full min-h-screen bg-leway-dark text-leway-light overflow-hidden flex flex-col font-body select-none"
      aria-label="Hero"
    >
      {/* Base noise background */}
      <div className="absolute inset-0 noise-bg-dark pointer-events-none z-0" />

      {/* Global Interactive Atmosphere (Desktop only) */}
      <div
        className="absolute inset-0 pointer-events-none transition-all duration-700 ease-out z-0 hidden lg:block"
        style={{
          background: `radial-gradient(circle at ${mousePos.x}% ${mousePos.y}%, rgba(201,168,76,0.03) 0%, transparent 40%)`,
        }}
      />

      {/* ── 1. MAIN CONTENT (TEXT GRID) ─────────────────────────────────────── */}
      <div className="flex-none lg:flex-1 w-full relative z-20 flex flex-col justify-center pt-28 pb-8 lg:py-20">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 px-6 md:px-12 lg:px-20 relative items-center">

          {/* Stat cards sidebar — desktop only */}
          <div
            ref={statsRef}
            className={`lg:col-span-2 hidden lg:flex flex-col justify-center items-end gap-6 ${statsVisible ? "animate-reveal-scale" : "opacity-0"}`}
          >
            {[
              { label: "Projects Delivered", value: "23+" },
              { label: "Global Presence", value: "6 Countries" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, i) => (
              <div
                key={i}
                className="bg-[#0B1F0F]/80 backdrop-blur-md border border-white/5 px-6 py-8 rounded-2xl w-[220px] shadow-2xl hover:-translate-x-2 transition-transform duration-500 relative overflow-hidden group"
              >
                <div className="absolute inset-0 bg-[#22C55E] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <p className="font-display text-4xl text-[#C9A84C] mb-2">{stat.value}</p>
                <p className="font-ui uppercase tracking-widest text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Text column */}
          <div className="lg:col-span-6 xl:col-span-5 flex flex-col gap-6 md:gap-8 relative z-30">
            <div
              ref={headingRef}
              className={headingVisible ? "animate-reveal-up" : "opacity-0"}
            >
              <h2 className="font-ui uppercase tracking-widest text-[#C9A84C] text-[10px] sm:text-[11px] mb-4 md:mb-6 flex items-center gap-4">
                <span className="w-6 sm:w-8 h-[1px] bg-[#C9A84C]" />
                WE ARE LEWAY CREATIVES
              </h2>

              <h1 className="font-display text-[2.75rem] sm:text-5xl md:text-6xl lg:text-[6.5rem] xl:text-[7rem] leading-[1] md:leading-[0.95] font-normal tracking-tight text-white mb-6 md:mb-8 drop-shadow-xl">
                Your Brand <br />
                Looks Like An <br />
                <span className="relative inline-block mt-2 md:mt-4 mb-2 pl-8 md:pl-0">
                  <span className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-leway-green opacity-80 text-2xl md:text-5xl">→</span>
                  <em className="italic text-white font-medium px-1 md:px-2 relative z-10">Amateur.</em>
                  <span className="absolute bottom-1 left-0 w-full h-[2px] md:h-[5px] bg-leway-green/40 -z-10" />
                </span>
                <br />
                <span className="text-white/80 relative z-10">Let's Fix That.</span>
              </h1>

              <p className="font-body text-base md:text-lg lg:text-xl text-leway-light/80 max-w-lg leading-relaxed drop-shadow-md">
                Most agencies do design OR copy. We do both — and we find your clients before you even pick up the phone. One team. One strategy. Three weapons:{" "}
                <strong className="text-white font-medium">Design, Copy, and Leads.</strong>
              </p>
            </div>

            <div
              ref={ctaRef}
              className={`flex flex-col gap-6 mt-2 sm:mt-4 ${ctaVisible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <button
                id="hero-cta-audit"
                onClick={() => scrollTo("#contact")}
                className="group relative overflow-hidden bg-leway-green w-full sm:w-auto sm:self-start px-6 sm:px-8 py-4 md:py-5 text-leway-dark font-ui font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] text-center shadow-[0_0_20px_rgba(34,197,94,0.3)]"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get My Free Audit
                  <svg
                    width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2"
                    strokeLinecap="round" strokeLinejoin="round"
                    className="group-hover:translate-x-1 transition-transform"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>

              {/* Mobile/tablet stat cards */}
              <div
                ref={mobileStatsRef}
                className={`grid grid-cols-3 gap-2 sm:gap-3 lg:hidden mt-4 ${mobileStatsVisible ? "animate-reveal-up" : "opacity-0"}`}
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  { label: "Projects", value: "23+" },
                  { label: "Countries", value: "6" },
                  { label: "Satisfaction", value: "100%" },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className="bg-[#0B1F0F]/95 backdrop-blur-md border border-white/10 px-2 py-3 sm:px-3 sm:py-4 rounded-xl shadow-[0_8px_30px_rgba(0,0,0,0.5)] relative overflow-hidden text-center z-20"
                  >
                    <p className="font-display text-xl sm:text-2xl text-[#C9A84C] mb-1">{stat.value}</p>
                    <p className="font-ui uppercase tracking-wider text-[10px] sm:text-xs text-white/50 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right spacer block to reserve space for the absolute image on desktop */}
          <div className="lg:col-span-4 xl:col-span-5 hidden lg:block" aria-hidden="true" />
        </div>
      </div>

      {/* ── 2. IMAGE CONTAINER (STACKED FLOW) ─────────────────────────────────── */}
      {/* 
          Mobile/Tablet: Relative positioning. It renders *after* the text grid, 
          sitting underneath it in the normal flow. No overlap possible.
          Desktop: Absolute positioning. Pushed to the right. 
      */}
      <div
        ref={imageRef}
        className={`relative lg:absolute w-full lg:w-[48%] xl:w-[45%] max-w-[850px] h-[50vh] sm:h-[60vh] lg:h-full mt-auto lg:mt-0 right-0 bottom-0 pointer-events-none z-[5] transition-all duration-1000 ease-out ${imageVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"}`}
        aria-hidden="true"
      >
        {/* The Aura */}
        <div
          className="absolute inset-0 z-0 animate-pulse"
          style={{
            animationDuration: '4s',
            background: "radial-gradient(ellipse at 50% 50%, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.04) 50%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />

        {/* The Transparent Figure */}
        <div className="absolute inset-0 z-10">
          <Image
            src="/images/leway_hero_image.webp"
            alt="Leway Creatives Expert"
            fill
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 100vw, 45vw"
            className="object-contain object-bottom lg:object-right-bottom"
            style={{
              filter: "drop-shadow(-15px 15px 30px rgba(11,31,15,0.9)) drop-shadow(0px 0px 25px rgba(34,197,94,0.15))",
            }}
          />
        </div>

        {/* Bottom Anchor Fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-24 sm:h-32 z-20"
          style={{
            background: "linear-gradient(to top, #0B1F0F 0%, transparent 100%)"
          }}
        />
      </div>

      {/* ── 3. MARQUEE BAR ──────────────────────────────────────────────────── */}
      <div className="w-full relative z-30 bg-[#22C55E] shadow-[0_-10px_40px_rgba(34,197,94,0.15)] mt-auto lg:mt-0">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20" />
        <Marquee speed={30} className="py-4 sm:py-6 font-ui uppercase tracking-widest text-xs sm:text-sm text-[#0B1F0F] font-bold">
          <span className="mx-3 sm:mx-4">Award-Winning Web Design</span>
          <span className="mx-3 sm:mx-4 text-white">✦</span>
          <span className="mx-3 sm:mx-4">Conversion Copywriting</span>
          <span className="mx-3 sm:mx-4 text-white">✦</span>
          <span className="mx-3 sm:mx-4">B2B Lead Generation</span>
          <span className="mx-3 sm:mx-4 text-white">✦</span>
          <span className="mx-3 sm:mx-4 text-[#0B1F0F]">Global Reach</span>
          <span className="mx-3 sm:mx-4 text-white">✦</span>
        </Marquee>
      </div>

    </section>
  );
}
