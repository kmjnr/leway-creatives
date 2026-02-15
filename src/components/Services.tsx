import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Palette, PenTool, UserCheck, ChevronRight, ChevronLeft, ImageIcon } from "lucide-react";
import metaAdGraphicDesign from "@/assets/images/meta-ad-graphic-design--headphones.webp";

const categories = [
  {
    id: "web",
    icon: Globe,
    title: "Web Design & Development",
    description: "We don't just build websites — we engineer conversion machines. Every pixel, every word, every interaction is designed to turn visitors into paying customers.",
    images: [] as string[],
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
    description: "Visual identity that demands attention. From scroll-stopping ads to brand systems that make competitors nervous — we design assets that work as hard as you do.",
    images: [metaAdGraphicDesign],
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
    description: "Words that sell, stories that stick. We craft copy that doesn't just inform — it persuades, converts, and builds lasting brand authority across every channel.",
    images: [] as string[],
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
    description: "Your career materials should open doors, not collect dust. We build personal brands that get interviews, attract opportunities, and position you as the obvious choice.",
    images: [] as string[],
    services: [
      { name: "ATS-Optimized Resumes", desc: "Professionally written resumes designed to pass Applicant Tracking Systems." },
      { name: "Creative Resume/CV Design", desc: "Beautifully designed resumes that stand out to recruiters." },
      { name: "Cover Letter Writing", desc: "Tailored, persuasive cover letters that complement your resume." },
      { name: "LinkedIn Profile Optimization", desc: "Professional profile revamps to attract recruiters and build authority." },
    ],
  },
];

function ImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const next = useCallback(() => {
    setCurrentIndex((i) => (i + 1) % images.length);
  }, [images.length]);

  const prev = useCallback(() => {
    setCurrentIndex((i) => (i - 1 + images.length) % images.length);
  }, [images.length]);

  // Placeholder state when no images
  if (images.length === 0) {
    return (
      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-overlay/10 bg-overlay/5">
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3">
          <div className="rounded-xl bg-primary/10 p-4">
            <ImageIcon size={32} className="text-primary" />
          </div>
          <p className="font-body text-sm text-accent-foreground/40">{title} showcase</p>
        </div>
        {/* Decorative grid */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(circle, hsl(var(--overlay)) 1px, transparent 1px)`,
            backgroundSize: "24px 24px",
          }}
        />
      </div>
    );
  }

  return (
    <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-overlay/10">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={images[currentIndex]}
          alt={`${title} example ${currentIndex + 1}`}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.4 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </AnimatePresence>

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-accent/80 backdrop-blur-sm p-2 text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-accent/80 backdrop-blur-sm p-2 text-accent-foreground/80 hover:text-accent-foreground transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} />
          </button>
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentIndex(i)}
                className={`h-1.5 rounded-full transition-all ${
                  i === currentIndex ? "w-6 bg-primary" : "w-1.5 bg-overlay/40"
                }`}
                aria-label={`Go to image ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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

        {/* Split content: Image left, services right */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
            className="grid gap-8 lg:grid-cols-2 items-start"
          >
            {/* Left — Image / Carousel */}
            <div className="relative">
              <ImageCarousel images={current.images} title={current.title} />
              {/* Glow behind image */}
              <div className="absolute -inset-4 -z-10 rounded-3xl bg-primary/5 blur-2xl" />
            </div>

            {/* Right — Description + Services */}
            <div className="flex flex-col gap-6">
              {/* Category header */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="rounded-lg bg-primary/10 p-2">
                    <current.icon size={20} className="text-primary" />
                  </div>
                  <h3 className="font-display text-xl md:text-2xl font-bold text-accent-foreground">
                    {current.title}
                  </h3>
                </div>
                <p className="font-body text-accent-foreground/60 leading-relaxed">
                  {current.description}
                </p>
              </div>

              {/* Divider */}
              <div className="h-px bg-overlay/10" />

              {/* Services list */}
              <div className="flex flex-col gap-3">
                {current.services.map((s, i) => (
                  <motion.div
                    key={s.name}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.08 }}
                    className="group rounded-xl border border-overlay/10 bg-overlay/5 p-4 transition-all hover:border-primary/30 hover:bg-overlay/[0.08]"
                  >
                    <div className="flex items-start gap-3">
                      <ChevronRight
                        size={16}
                        className="text-primary mt-0.5 shrink-0 transition-transform group-hover:translate-x-1"
                      />
                      <div>
                        <h4 className="font-display text-sm font-bold text-accent-foreground mb-0.5">
                          {s.name}
                        </h4>
                        <p className="font-body text-xs text-accent-foreground/50 leading-relaxed">
                          {s.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
