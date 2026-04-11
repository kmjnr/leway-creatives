"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";
import Marquee from "@/components/ui/Marquee";

const scrollTo = (id: string) => {
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
};

export default function Hero() {
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: headingRef, isVisible: headingVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });
  const { ref: mobileStatsRef, isVisible: mobileStatsVisible } = useScrollReveal<HTMLDivElement>({ margin: "-40px" });

  return (
    <section
      className="relative w-full min-h-screen bg-leway-dark text-leway-light overflow-hidden flex flex-col noise-bg-dark font-body select-none pt-20 md:pt-24"
      aria-label="Hero"
    >

      {/* Background radial gradients for atmosphere */}
      <div className="absolute top-0 left-0 w-full h-[150%] pointer-events-none opacity-50 mix-blend-screen"
        style={{
          background: "radial-gradient(circle at 70% 20%, rgba(34, 197, 94, 0.15) 0%, transparent 40%), radial-gradient(circle at 10% 70%, rgba(201, 168, 76, 0.08) 0%, transparent 35%)"
        }}
      />

      <div className="flex-1 flex flex-col justify-center px-6 md:px-12 lg:px-20 z-10 pt-8 pb-16 md:pt-10 md:pb-20">
        <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 relative items-center">

          {/* Desktop stat cards sidebar — hidden on mobile */}
          <div
            ref={statsRef}
            className={`lg:col-span-2 hidden lg:flex flex-col justify-center items-end gap-6 relative z-10 ${statsVisible ? "animate-reveal-scale" : "opacity-0"}`}
          >
            {[
              { label: "Projects Delivered", value: "23+" },
              { label: "Global Presence", value: "6 Countries" },
              { label: "Client Satisfaction", value: "100%" },
            ].map((stat, i) => (
              <div key={i} className="bg-[#0B1F0F]/80 backdrop-blur-md border border-white/5 px-6 py-8 rounded-2xl w-[220px] shadow-2xl hover:-translate-x-2 transition-transform duration-500 relative overflow-hidden group">
                <div className="absolute inset-0 bg-[#22C55E] opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
                <p className="font-display text-4xl text-[#C9A84C] mb-2">{stat.value}</p>
                <p className="font-ui uppercase tracking-widest text-xs text-white/50">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="lg:col-span-10 flex flex-col gap-8 relative z-10">
            <div
              ref={headingRef}
              className={headingVisible ? "animate-reveal-up" : "opacity-0"}
            >
              <h2 className="font-ui uppercase tracking-widest text-[#C9A84C] text-[11px] mb-8 flex items-center gap-4">
                <span className="w-8 h-[1px] bg-[#C9A84C]"></span>
                WE ARE LEWAY CREATIVES
              </h2>

              <h1 className="font-display text-[2.75rem] sm:text-6xl md:text-[5.5rem] lg:text-[7.5rem] leading-[1] md:leading-[0.95] font-normal tracking-tight text-white mb-8 md:mb-10 max-w-5xl">
                Your Brand <br />
                Looks Like An <br />
                <span className="relative inline-block mt-2 md:mt-4 mb-2 pl-8 md:pl-0">
                  <span className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-leway-green opacity-80 text-2xl md:text-5xl">→</span>
                  <em className="italic text-white font-medium px-1 md:px-2">Amateur.</em>
                  <span className="absolute bottom-1 left-0 w-full h-[2px] md:h-[5px] bg-leway-green/40 -z-10"></span>
                </span>
                <br />
                <span className="text-white/80">Let's Fix That.</span>
              </h1>

              <p className="font-body text-lg md:text-xl text-leway-light/70 max-w-xl leading-relaxed">
                Most agencies do design OR copy. We do both — and we find your clients before you even pick up the phone. One team. One strategy. Three weapons: <strong className="text-white font-medium">Design, Copy, and Leads.</strong>
              </p>
            </div>

            <div
              ref={ctaRef}
              className={`flex flex-col gap-6 mt-2 ${ctaVisible ? "animate-reveal-up" : "opacity-0"}`}
              style={{ animationDelay: "0.2s" }}
            >
              <button
                onClick={() => scrollTo("#contact")}
                className="group relative overflow-hidden bg-leway-green w-full sm:w-auto sm:self-start px-8 py-4 md:py-5 text-leway-dark font-ui font-bold uppercase tracking-widest text-sm transition-all hover:scale-[1.02] text-center"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get My Free Audit
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
              </button>

              {/* Mobile stat cards — visible only below lg */}
              <div
                ref={mobileStatsRef}
                className={`grid grid-cols-3 gap-3 lg:hidden ${mobileStatsVisible ? "animate-reveal-up" : "opacity-0"}`}
                style={{ animationDelay: "0.3s" }}
              >
                {[
                  { label: "Projects", value: "23+" },
                  { label: "Countries", value: "6" },
                  { label: "Satisfaction", value: "100%" },
                ].map((stat, i) => (
                  <div key={i} className="bg-[#0B1F0F]/80 backdrop-blur-md border border-white/5 px-3 py-4 rounded-xl shadow-lg relative overflow-hidden text-center">
                    <p className="font-display text-2xl text-[#C9A84C] mb-1">{stat.value}</p>
                    <p className="font-ui uppercase tracking-wider text-xs text-white/50 leading-tight">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      <div className="w-full mt-auto relative z-10 bg-[#22C55E]">
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-white/30"></div>
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-black/20"></div>
        <Marquee speed={30} className="py-6 font-ui uppercase tracking-widest text-sm text-[#0B1F0F] font-bold">
          <span className="mx-4">Award-Winning Web Design</span>
          <span className="mx-4 text-white">✦</span>
          <span className="mx-4">Conversion Copywriting</span>
          <span className="mx-4 text-white">✦</span>
          <span className="mx-4">B2B Lead Generation</span>
          <span className="mx-4 text-white">✦</span>
          <span className="mx-4 text-[#0B1F0F]">Global Reach</span>
          <span className="mx-4 text-white">✦</span>
        </Marquee>
      </div>

    </section>
  );
}
