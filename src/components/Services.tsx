"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

const services = [
  { num: '01', eyebrow: 'Get Clients Online', title: 'Web Design & Development', description: 'Conversion-engineered websites that turn visitors into paying clients. Every pixel and interaction is intentional.', items: ['Landing Pages', 'Full Website Design', 'Portfolio Sites', 'CMS Integration'], image: '/images/service_web_design.png' },
  { num: '02', eyebrow: 'Words That Convert', title: 'Copywriting', description: 'Strategic copy that persuades, builds trust, and drives action across every channel.', items: ['Social Media Content', 'Blog & Article Writing', 'Email Campaigns', 'Website Copy'], image: '/images/service_content.png' },
  { num: '03', eyebrow: 'Look the Part', title: 'Brand Identity', description: 'Visual identity systems that make competitors nervous and clients remember you.', items: ['Logo Design', 'Brand Guidelines', 'Marketing Collateral', 'Print Design'], image: '/images/service_marketing.png' },
  { num: '04', eyebrow: 'Fill Your Pipeline', title: 'Lead Generation', description: 'We find your ideal clients before you pick up the phone.', items: ['Prospect List Building', 'B2B Research', 'LinkedIn Outreach Setup', 'Contact Verification'], image: '/images/service_lead_gen.png' },
  { num: '05', eyebrow: 'Get Noticed', title: 'Personal Branding', description: 'Build the online presence that gets you hired, followed, and remembered.', items: ['LinkedIn Optimisation', 'CV Writing', 'Personal Brand Strategy', 'Portfolio Curation'], image: '/images/service_career.png' },
];

function ServiceItem({
  service,
  index,
  isLast,
  autoIndex,
  setAutoIndex,
  manualIndices,
  setManualIndices,
}: any) {
  const ref = useRef<HTMLDivElement>(null);
  
  // An item is open if it is the currently scrolled-to item OR the user manually clicked it
  const isOpen = autoIndex === index || manualIndices.includes(index);

  // Trigger when the element crosses the middle 10% of the viewport.
  // A tighter margin ensures we don't trigger multiple items at once.
  const isInView = useInView(ref, { margin: "-45% 0px -45% 0px" });
  const wasInView = useRef(false);

  useEffect(() => {
    // Only trigger when transitioning from out-of-view to in-view to prevent infinite loops
    if (isInView && !wasInView.current) {
      setAutoIndex(index);
    }
    wasInView.current = isInView;
  }, [isInView, index, setAutoIndex]);

  const toggleService = () => {
    if (autoIndex === index) {
      // User explicitly wants to close the item that was auto-opened by scrolling
      setAutoIndex(-1);
    } else if (manualIndices.includes(index)) {
      // User explicitly wants to close a manually opened item
      setManualIndices((prev: number[]) => prev.filter((i) => i !== index));
    } else {
      // User explicitly opens an item
      setManualIndices((prev: number[]) => [...prev, index]);
    }
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
      className={`border-t border-leway-dark/10 ${isLast ? "border-b" : ""}`}
    >
      <button
        onClick={toggleService}
        className="w-full py-8 flex flex-col md:flex-row md:items-center gap-4 text-left group"
      >
        <div className="flex items-start md:items-center gap-6 md:gap-12 flex-1 w-full">
          <span className="font-ui text-sm text-leway-dark/30 hidden md:block w-6">
            {service.num}
          </span>

          <div className="flex flex-col gap-1 md:gap-2 flex-1">
            <Eyebrow className="text-leway-green">
              {service.eyebrow}
            </Eyebrow>
            <h3 className="font-display text-2xl md:text-3xl text-leway-dark group-hover:text-leway-green transition-colors duration-300">
              {service.title}
            </h3>
          </div>
        </div>

        <div className="flex items-center justify-between w-full md:w-1/2 gap-6">
          <div className="flex-1 hidden md:block">
            {!isOpen && (
              <p className="font-body text-sm text-leway-dark/60 pr-4 line-clamp-2">
                {service.description}
              </p>
            )}
          </div>

          <div className="flex items-center justify-between w-full md:w-auto">
            <span className="font-ui text-sm text-leway-dark/30 md:hidden">
              {service.num}
            </span>
            <div
              className={`w-10 h-10 rounded-full border border-leway-dark/10 flex items-center justify-center transition-transform duration-300 ${
                isOpen
                  ? "rotate-180 bg-leway-dark text-leway-light border-leway-dark"
                  : "text-leway-dark group-hover:bg-leway-dark/5"
              }`}
            >
              <ChevronDown size={18} strokeWidth={1.5} />
            </div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pb-8 flex flex-col md:flex-row gap-8 md:gap-12 md:pl-[4.5rem]">
              <div className="flex-1 flex flex-col gap-6 pt-2">
                <p className="font-body text-base text-leway-dark/70 leading-relaxed">
                  {service.description}
                </p>
                <div>
                  <ul className="flex flex-col gap-3">
                    {service.items.map((item: string) => (
                      <li
                        key={item}
                        className="flex items-center gap-3 font-body text-sm text-leway-dark/60"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-leway-green flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="flex-1 relative min-h-[250px] md:min-h-[300px] group z-0">
                {/* Wireframe offset stroke */}
                <div className="absolute inset-0 translate-x-3 translate-y-3 rounded-[2rem] border-2 border-leway-gold -z-10 transition-transform duration-500 group-hover:translate-x-4 group-hover:translate-y-4" />

                <div className="absolute inset-0 rounded-[2rem] overflow-hidden shadow-hover">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Services() {
  // Index 0 starts auto-expanded by default
  const [autoIndex, setAutoIndex] = useState<number>(0);
  
  // Tracks any services the user explicitly clicks to expand
  const [manualIndices, setManualIndices] = useState<number[]>([]);

  return (
    <section
      id="services"
      className="relative py-[clamp(4rem,3rem+5vw,8rem)] bg-leway-light overflow-hidden"
    >
      <div className="container mx-auto px-6 max-w-7xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="mb-12 md:mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl text-leway-dark max-w-2xl">
            Our Services
          </h2>
          <p className="font-body text-base md:text-lg text-leway-dark/60 mt-4 max-w-lg leading-relaxed">
            Five ways we help you grow online. One team. One strategy. Every deliverable designed to win business.
          </p>
        </motion.div>

        {/* Accordion List */}
        <div className="flex flex-col">
          {services.map((service, index) => (
            <ServiceItem
              key={service.num}
              service={service}
              index={index}
              isLast={index === services.length - 1}
              autoIndex={autoIndex}
              setAutoIndex={setAutoIndex}
              manualIndices={manualIndices}
              setManualIndices={setManualIndices}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
