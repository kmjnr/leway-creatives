"use client";

import { useScrollReveal } from "@/lib/useScrollReveal";

export default function Philosophy() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ margin: "-80px" });

  return (
    <section className="relative py-24 md:py-32 bg-background text-leway-dark overflow-hidden noise-bg" id="philosophy">
      <div className="absolute top-0 right-0 pointer-events-none select-none opacity-5 md:opacity-10 leading-none">
        <span className="font-display text-[15rem] md:text-[30rem] font-bold text-leway-dark">01</span>
      </div>

      <div className="container mx-auto px-6 max-w-4xl relative z-10">
        <div
          ref={ref}
          className={`flex flex-col items-center text-center ${isVisible ? "animate-reveal-up" : "opacity-0"}`}
        >
          <h2 className="font-ui uppercase tracking-widest text-[11px] text-[#8A9E8E] mb-8 flex items-center justify-center gap-4 w-full">
            <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
            PHILOSOPHY
            <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
          </h2>

          <h3 className="font-display text-3xl md:text-5xl lg:text-7xl font-medium leading-[1.1] mb-8 md:mb-10 max-w-3xl">
            Most Businesses Are Running <span className="italic relative z-10">
              Half-Blind
              <span className="absolute bottom-1 left-0 w-full h-2 md:h-3 bg-leway-green/40 -z-10"></span>
            </span>
          </h3>

          <p className="font-body text-base md:text-xl lg:text-2xl text-leway-dark/70 leading-relaxed max-w-2xl mx-auto font-light">
            Designers care about pixels. Copywriters care about words. But here's the cold truth:<br /><br />
            <span className="font-display text-xl md:text-3xl lg:text-4xl text-leway-dark block my-6 md:my-8 italic leading-tight">"Design without copy is a Ferrari without an engine."</span>
            Copy without design is a Ferrari hidden in a garage. At LEWAY Creatives, you get both — the engine and the showroom.
          </p>
        </div>
      </div>
    </section>
  );
}
