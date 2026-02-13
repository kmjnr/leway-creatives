import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Palette, PenTool, UserCheck, ChevronRight } from "lucide-react";

const categories = [
  {
    id: "web",
    icon: Globe,
    title: "Web Design & Development",
    services: [
      { name: "Landing Pages", desc: "High-converting pages built to maximize traffic and conversion for your marketing campaigns." },
      { name: "Complete Website Design", desc: "Custom-designed websites that are responsive, user-friendly, and aligned with your brand identity." },
      { name: "Personal Portfolio Websites", desc: "Professional portfolio sites to showcase your skills, projects, and achievements beautifully." },
    ],
  },
  {
    id: "graphic",
    icon: Palette,
    title: "Graphic & Creative Design",
    services: [
      { name: "Ads Banners", desc: "Visually engaging banners for Meta and other platforms to boost ad performance." },
      { name: "Flyer & Poster Design", desc: "Catchy promotional materials for both online and print marketing." },
      { name: "Logo Design", desc: "Unique and memorable brand logos that capture your identity." },
      { name: "Presentation Design", desc: "Sleek, branded presentations for pitches, reports, and webinars." },
      { name: "Ebook Design & Writing", desc: "Professionally designed lead-magnet ebooks that inform and convert." },
    ],
  },
  {
    id: "content",
    icon: PenTool,
    title: "Content Creation & Copywriting",
    services: [
      { name: "Social Media Content", desc: "Posts crafted to engage audiences while staying consistent with your brand voice, plus visual design." },
      { name: "Social Media Management", desc: "Content scheduling, posting, and engagement strategies to grow your online presence." },
      { name: "Blog & Article Writing", desc: "SEO-friendly articles and blogs tailored to your brand's goals and audience." },
      { name: "Email & Newsletter Copywriting", desc: "Compelling email campaigns that nurture leads and drive conversions." },
    ],
  },
  {
    id: "career",
    icon: UserCheck,
    title: "Career & Personal Branding",
    services: [
      { name: "ATS-Optimized Resumes", desc: "Professionally written resumes designed to pass Applicant Tracking Systems." },
      { name: "Creative Resume/CV Design", desc: "Beautifully designed resumes that stand out to recruiters." },
      { name: "Cover Letter Writing", desc: "Tailored, persuasive cover letters that complement your resume." },
      { name: "LinkedIn Profile Optimization", desc: "Professional profile revamps to attract recruiters and build authority." },
    ],
  },
];

export default function Services() {
  const [active, setActive] = useState("web");
  const current = categories.find((c) => c.id === active)!;

  return (
    <section id="services" className="py-24 md:py-32 bg-accent" aria-label="Our services">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-accent-foreground mb-4">
            What We <span className="text-primary">Build</span> For You
          </h2>
          <p className="font-body text-accent-foreground/60 text-lg max-w-xl mx-auto">
            Four pillars of creative firepower — each designed to move the needle.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isActive = cat.id === active;
            return (
              <button
                key={cat.id}
                onClick={() => setActive(cat.id)}
                className={`flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-semibold transition-all ${
                  isActive
                    ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                    : "bg-overlay/5 border border-overlay/10 text-accent-foreground/70 hover:border-overlay/20"
                }`}
                aria-pressed={isActive}
              >
                <Icon size={16} />
                <span className="hidden sm:inline">{cat.title}</span>
                <span className="sm:hidden">{cat.title.split(" ")[0]}</span>
              </button>
            );
          })}
        </div>

        {/* Services list */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-4 md:grid-cols-2"
          >
            {current.services.map((s) => (
              <div
                key={s.name}
                className="group rounded-2xl border border-overlay/10 bg-overlay/5 p-6 transition-all hover:border-primary/30 hover:bg-overlay/[0.08]"
              >
                <div className="flex items-start gap-3">
                  <ChevronRight
                    size={18}
                    className="text-primary mt-1 shrink-0 transition-transform group-hover:translate-x-1"
                  />
                  <div>
                    <h3 className="font-display text-lg font-bold text-accent-foreground mb-1">
                      {s.name}
                    </h3>
                    <p className="font-body text-sm text-accent-foreground/60 leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
