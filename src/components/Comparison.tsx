"use client";

import { motion } from "framer-motion";

export default function Comparison() {
  return (
    <section className="relative py-32 bg-background text-leway-dark overflow-hidden noise-bg clip-diagonal-bottom z-10">
      <div className="container mx-auto px-6 max-w-7xl relative z-10">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 md:mb-20 gap-6 md:gap-8">
          <div className="max-w-3xl">
            <h2 className="font-ui uppercase tracking-widest text-[#8A9E8E] text-[11px] mb-6 md:mb-8 flex items-center gap-4">
              <span className="w-8 h-[2px] bg-[#0D6B35]"></span>
              THEM VS US
            </h2>
            <h3 className="font-display text-4xl md:text-7xl lg:text-[5.5rem] font-medium leading-[1.05]">
              Why Other <br /> <span className="italic text-leway-dark">Agencies Fail</span>
            </h3>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-0 relative border-t border-b border-leway-dark/10 group">

          <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-leway-dark/10 -translate-x-1/2 z-20"></div>

          {/* Left panel: Them */}
          <div className="p-6 md:p-10 lg:p-16 flex flex-col justify-center relative transition-opacity duration-500 border-b lg:border-b-0 border-leway-dark/10">
            <p className="font-ui tracking-widest uppercase text-leway-dark/40 text-xs mb-8 md:mb-12">The Standard Agency</p>
            <ul className="flex flex-col gap-6 md:gap-10">
              <li className="font-body text-lg md:text-xl lg:text-2xl text-leway-dark/80 font-light flex gap-4 md:gap-6 items-center"><span className="text-leway-dark/20 text-sm shrink-0">—</span> Design OR Copy (Never Both)</li>
              <li className="font-body text-lg md:text-xl lg:text-2xl text-leway-dark/80 font-light flex gap-4 md:gap-6 items-center"><span className="text-leway-dark/20 text-sm shrink-0">—</span> Slow, bloated timelines</li>
              <li className="font-body text-lg md:text-xl lg:text-2xl text-leway-dark/80 font-light flex gap-4 md:gap-6 items-center"><span className="text-leway-dark/20 text-sm shrink-0">—</span> Focuses on "pretty" pixels</li>
              <li className="font-body text-lg md:text-xl lg:text-2xl text-leway-dark/80 font-light flex gap-4 md:gap-6 items-center"><span className="text-leway-dark/20 text-sm shrink-0">—</span> Handed off to juniors</li>
              <li className="font-body text-lg md:text-xl lg:text-2xl text-leway-dark/80 font-light flex gap-4 md:gap-6 items-center"><span className="text-leway-dark/20 text-sm shrink-0">—</span> Premium prices for basic work</li>
            </ul>
          </div>

          {/* Right panel: Us (LEWAY) with Hover Reveal Cards */}
          <div className="p-10 lg:p-16 flex flex-col justify-center bg-transparent relative overflow-hidden">
            <p className="font-ui tracking-widest uppercase text-leway-dark text-xs mb-12 z-10">LEWAY Creatives</p>
            <div className="flex flex-col gap-4 z-10">

              <div className="group/card relative bg-transparent hover:bg-[#22C55E] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 border border-leway-dark/5 hover:border-[#22C55E] shadow-none hover:shadow-2xl cursor-default">
                <h4 className="font-display text-2xl md:text-3xl text-leway-dark font-medium transition-colors">Design + Copy + Leads</h4>
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <p className="overflow-hidden font-body text-leway-dark/70 group-hover/card:text-leway-dark/90 pt-0 group-hover/card:pt-4 text-lg">We provide comprehensive marketing weapons under one single roof.</p>
                </div>
              </div>

              <div className="group/card relative bg-transparent hover:bg-[#22C55E] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 border border-leway-dark/5 hover:border-[#22C55E] shadow-none hover:shadow-2xl cursor-default">
                <h4 className="font-display text-2xl md:text-3xl text-leway-dark font-medium transition-colors">Fast, sprint-based delivery</h4>
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <p className="overflow-hidden font-body text-leway-dark/70 group-hover/card:text-leway-dark/90 pt-0 group-hover/card:pt-4 text-lg">No bloated timelines. Clear goals and rapid execution from day one.</p>
                </div>
              </div>

              <div className="group/card relative bg-transparent hover:bg-[#22C55E] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 border border-leway-dark/5 hover:border-[#22C55E] shadow-none hover:shadow-2xl cursor-default">
                <h4 className="font-display text-2xl md:text-3xl text-leway-dark font-medium transition-colors">Obsessed with conversion</h4>
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <p className="overflow-hidden font-body text-leway-dark/70 group-hover/card:text-leway-dark/90 pt-0 group-hover/card:pt-4 text-lg">Every pixel and word is strategically placed to turn clicks into clients.</p>
                </div>
              </div>

              <div className="group/card relative bg-transparent hover:bg-[#22C55E] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 border border-leway-dark/5 hover:border-[#22C55E] shadow-none hover:shadow-2xl cursor-default">
                <h4 className="font-display text-2xl md:text-3xl text-leway-dark font-medium transition-colors">Direct senior talent</h4>
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <p className="overflow-hidden font-body text-leway-dark/70 group-hover/card:text-leway-dark/90 pt-0 group-hover/card:pt-4 text-lg">No junior hand-offs. You work directly with experienced directors.</p>
                </div>
              </div>

              <div className="group/card relative bg-transparent hover:bg-[#22C55E] p-6 rounded-xl transition-all duration-300 hover:-translate-y-2 border border-leway-dark/5 hover:border-[#22C55E] shadow-none hover:shadow-2xl cursor-default">
                <h4 className="font-display text-2xl md:text-3xl text-leway-dark font-medium transition-colors">Accessible, ROI-driven pricing</h4>
                <div className="grid grid-rows-[0fr] group-hover/card:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                  <p className="overflow-hidden font-body text-leway-dark/70 group-hover/card:text-leway-dark/90 pt-0 group-hover/card:pt-4 text-lg">Transparent pricing designed to yield positive returns quickly.</p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}