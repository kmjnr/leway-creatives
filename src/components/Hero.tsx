"use client";

import Image from "next/image";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { Squiggle } from "@/components/ui/Squiggle";
import { CtaButton } from "@/components/ui/CtaButton";

const scrollTo = (id: string) =>
  document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });

export default function Hero() {
  // Motion values for 3D tilt & parallax
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for fluid motion
  const mouseX = useSpring(x, { stiffness: 180, damping: 20 });
  const mouseY = useSpring(y, { stiffness: 180, damping: 20 });

  // 3D rotation parameters
  const rotateX = useTransform(mouseY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], [-12, 12]);

  // Parallax offsets for floating badges
  const badge1X = useTransform(mouseX, [-0.5, 0.5], [-18, 18]);
  const badge1Y = useTransform(mouseY, [-0.5, 0.5], [-18, 18]);

  const badge2X = useTransform(mouseX, [-0.5, 0.5], [22, -22]);
  const badge2Y = useTransform(mouseY, [-0.5, 0.5], [22, -22]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const posX = (e.clientX - rect.left) / rect.width - 0.5;
    const posY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(posX);
    y.set(posY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative w-full min-h-[100dvh] bg-leway-dark text-white flex flex-col overflow-hidden"
      aria-label="Hero"
    >
      {/* ── Background Decorative Layer (Pure CSS, GPU-Accelerated, Zero CLS) ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
        {/* Subtle Animated Architectural Grid */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.15) 1px, transparent 0)`,
            backgroundSize: '36px 36px',
            maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
          }}
        />

        {/* Ambient Signal Green Light Glow Orb (Top Right) */}
        <div
          className="absolute -top-32 -right-20 w-[55vw] h-[55vw] max-w-2xl max-h-2xl rounded-full animate-pulse"
          style={{ 
            background: "radial-gradient(circle, rgba(34,197,94,0.18) 0%, rgba(34,197,94,0.02) 60%, transparent 70%)",
            animationDuration: "8s"
          }}
        />

        {/* Ambient Soft Gold/Forest Light Glow Orb (Bottom Left) */}
        <div
          className="absolute -bottom-20 -left-20 w-[45vw] h-[45vw] max-w-xl max-h-xl rounded-full"
          style={{ 
            background: "radial-gradient(circle, rgba(200,166,90,0.10) 0%, transparent 70%)"
          }}
        />

        {/* Micro Light Particles (GPU Composited) */}
        <div className="absolute top-1/4 left-1/6 w-1.5 h-1.5 rounded-full bg-leway-green/40 blur-[1px] animate-ping" style={{ animationDuration: "3s" }} />
        <div className="absolute top-3/4 left-1/3 w-2 h-2 rounded-full bg-leway-gold/30 blur-[1px] animate-pulse" style={{ animationDuration: "5s" }} />
        <div className="absolute top-1/3 right-1/4 w-1.5 h-1.5 rounded-full bg-white/40 blur-[1px] animate-pulse" style={{ animationDuration: "4s" }} />
      </div>

      {/* ── Main Split Layout ──────────────────────────── */}
      <div className="flex-1 container mx-auto max-w-7xl px-6 pt-32 pb-12 md:pt-36 md:pb-16 flex flex-col lg:flex-row items-center gap-10 lg:gap-16 relative z-10">

        {/* Left: Text Content */}
        <div className="flex-1 flex flex-col gap-6 md:gap-8 max-w-xl">

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          >
            <Eyebrow className="text-leway-green font-semibold flex items-center gap-2">
              <Sparkles size={13} className="text-leway-gold animate-pulse" />
              LEWAY CREATIVES · KENYA & WORLDWIDE
            </Eyebrow>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
            className="font-display text-3xl sm:text-5xl lg:text-7xl text-white leading-[1.05] tracking-tight"
          >
            We Make Your Brand{" "}
            <span className="relative inline-block text-white">
              Feel Unforgettable.
              {/* Organic wavy underline */}
              <Squiggle color="#22C55E" />
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="font-body text-lg text-white/70 leading-relaxed max-w-md"
          >
            Design, copywriting, and lead generation — all under one roof. We build brands that win trust and convert strangers into loyal clients.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2 lg:mt-0 order-3 lg:order-none w-full sm:w-auto"
          >
            <CtaButton
              id="hero-cta-contact"
              onClick={() => scrollTo("#contact")}
            >
              Start a Project
            </CtaButton>

            <button
              onClick={() => scrollTo("#services")}
              className="font-body text-sm text-white/70 hover:text-white underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors py-2 text-center w-full sm:w-auto lg:text-left"
            >
              See our services
            </button>
          </motion.div>
        </div>

        {/* Right: Visual with 3D Parallax Tilt */}
        <motion.div
          initial={{ opacity: 0, x: 32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
          className="flex-shrink-0 w-full lg:w-[45%] xl:w-[42%] relative [perspective:1000px] order-2 lg:order-none"
        >
          {/* Main 3D Tilted Card */}
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden bg-leway-forest border border-white/15 shadow-[12px_12px_0px_0px_#C8A65A] transition-all duration-300 group hover:shadow-[16px_16px_0px_0px_#C8A65A]"
          >
            <Image
              src="/images/leway_hero_image.webp"
              alt="LEWAY Creatives — approachable creative professionals"
              fill
              priority
              unoptimized
              sizes="(max-width: 1024px) 100vw, 45vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Subtle inner gradient sheen */}
            <div className="absolute inset-0 bg-gradient-to-t from-leway-dark/60 via-transparent to-transparent pointer-events-none" />
          </motion.div>

          {/* Floating Glass Micro-Card 1 (Top Left) */}
          <motion.div
            style={{ x: badge1X, y: badge1Y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -top-4 -left-4 sm:-top-6 sm:-left-8 z-20 bg-leway-dark/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-4 py-3 hidden sm:flex items-center gap-3 pointer-events-none"
          >
            <span className="w-8 h-8 rounded-full bg-leway-green/20 flex items-center justify-center flex-shrink-0 text-leway-green">
              <CheckCircle2 size={16} />
            </span>
            <div>
              <p className="font-display text-xs font-bold text-white">100% Strategy-Led</p>
              <p className="font-body text-[10px] text-white/60">Zero copy-paste templates</p>
            </div>
          </motion.div>

          {/* Floating Glass Micro-Card 2 (Bottom Right) */}
          <motion.div
            style={{ x: badge2X, y: badge2Y }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="absolute -bottom-4 -right-4 sm:-bottom-6 sm:-right-6 z-20 bg-leway-dark/80 backdrop-blur-xl border border-white/20 shadow-2xl rounded-2xl px-4 py-3 hidden sm:flex items-center gap-3 pointer-events-none"
          >
            <span className="w-2.5 h-2.5 rounded-full bg-leway-green animate-pulse" />
            <div>
              <p className="font-display text-xs font-bold text-white">Active Pipelines</p>
              <p className="font-ui text-[10px] tracking-wider uppercase text-leway-green">US · UK · CA · AU · KE</p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
