"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { z } from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, ArrowLeft, ChevronDown, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

const SERVICE_OPTIONS = [
  "Web Design & Development",
  "Content & Copywriting",
  "Marketing Design",
  "Lead Generation",
  "Career & Personal Branding",
  "Full Growth Package (All Services)",
  "Not Sure Yet \u2014 I Need Advice",
] as const;

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  email: z.string().trim().email("Enter a valid email").max(255),
  whatsapp: z.string().trim().min(8, "Enter a valid WhatsApp number").max(20),
  services: z.array(z.string()).optional(),
  service: z.string().trim().min(1, "Describe what you need").max(1000)
});

type FormData = z.infer<typeof schema>;

const getFollowingMonth = () => {
  const now = new Date();
  const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  return nextMonth.toLocaleString("en-US", { month: "long" });
};
const followingMonth = getFollowingMonth();

export default function ContactForm() {
  const [submitted, setSubmitted] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors }
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues: { services: [] } });

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        const json = await res.json().catch(() => ({}));
        throw new Error(json.error || "Something went wrong. Please try again.");
      }
      setSubmitted(data.name);
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong. Please try again.";
      setSubmitError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="relative pt-20 pb-32 md:pt-32 md:pb-40 lg:pt-40 lg:pb-52 bg-background-dark text-leway-light overflow-hidden bg-radial-dark noise-bg-dark clip-diagonal-top z-20">
      <div className="container mx-auto px-6 max-w-7xl relative z-10 pt-6 md:pt-10">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-start">

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:w-5/12 lg:sticky lg:top-40"
          >
            <h2 className="font-ui uppercase tracking-widest text-[#C9A84C] text-[11px] mb-6 flex items-center gap-4">
              <span className="w-8 h-[1px] bg-[#C9A84C]"></span>
              YOUR MOVE
            </h2>
            <h3 className="font-display text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-medium leading-[1]">
              Ready to <br />
              <span className="italic text-white">Dominate?</span>
            </h3>
            <p className="font-body text-lg md:text-xl text-leway-light/70 mt-6 md:mt-8 mb-8 md:mb-12 tracking-wide font-light max-w-sm leading-relaxed">
              The market is crowded. Your competitors are noisy. Let's make you the only logical choice.
            </p>

            <div className="p-8 border border-white/5 bg-white/[0.02] backdrop-blur-md inline-block shadow-2xl relative">
              <span className="font-ui text-[0.8125rem] tracking-[0.2em] uppercase text-leway-gold mb-3 block">— Status</span>
              <p className="font-display font-medium text-white text-2xl pr-4">Taking new clients for <span className="text-leway-green italic">{followingMonth}</span>.</p>
              {/* Blinking indicator */}
              <div className="absolute top-8 right-8 w-2 h-2 rounded-full bg-leway-green animate-pulse"></div>
            </div>
          </motion.div>

          {/* Form Area */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:w-7/12 w-full max-w-2xl mx-auto"
          >
            <div className="rounded-none md:border border-white/5 md:bg-white/[0.01] md:backdrop-blur-sm p-0 md:p-14 shadow-none md:shadow-2xl">

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="flex flex-col items-center text-center py-20"
                  >
                    <CheckCircle2 size={80} className="text-leway-green mb-8 stroke-1" />
                    <h3 className="font-display text-4xl font-medium text-white mb-4">
                      Message Received
                    </h3>
                    <p className="font-body text-xl text-paper/60 mb-10 font-light max-w-md leading-relaxed">
                      Thanks, <strong>{submitted}</strong>. We've received your
                      details. We are analyzing your request and will reach out shortly.
                    </p>
                    <button
                      onClick={() => setSubmitted(null)}
                      className="group font-ui tracking-widest uppercase text-sm text-leway-green flex items-center gap-4 transition-all"
                    >
                      <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                      Back to Form
                    </button>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-10"
                    noValidate
                  >
                    <div>
                      <label htmlFor="name" className="font-ui uppercase tracking-widest text-[0.8125rem] text-leway-light/60 mb-2 block">Name</label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        {...register("name")}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none text-white px-0 py-4 text-2xl md:text-3xl focus-visible:ring-0 focus-visible:border-[#C9A84C] placeholder:text-white/20 transition-colors font-display"
                      />
                      {errors.name && <p className="text-sm text-leway-gold mt-2 font-ui uppercase tracking-widest">{errors.name.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="font-ui uppercase tracking-widest text-[0.8125rem] text-leway-light/60 mb-2 block">Email</label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="best@email.com"
                        {...register("email")}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none text-white px-0 py-4 text-2xl md:text-3xl focus-visible:ring-0 focus-visible:border-[#C9A84C] placeholder:text-white/20 transition-colors font-display"
                      />
                      {errors.email && <p className="text-sm text-leway-gold mt-2 font-ui uppercase tracking-widest">{errors.email.message}</p>}
                    </div>

                    <div>
                      <label htmlFor="whatsapp" className="font-ui uppercase tracking-widest text-[0.8125rem] text-leway-light/60 mb-2 block">WhatsApp Number</label>
                      <Input
                        id="whatsapp"
                        type="tel"
                        placeholder="+254..."
                        {...register("whatsapp")}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none text-white px-0 py-4 text-2xl md:text-3xl focus-visible:ring-0 focus-visible:border-[#C9A84C] placeholder:text-white/20 transition-colors font-display"
                      />
                      {errors.whatsapp && <p className="text-sm text-leway-gold mt-2 font-ui uppercase tracking-widest">{errors.whatsapp.message}</p>}
                    </div>

                    <div>
                      <label className="font-ui uppercase tracking-widest text-[0.8125rem] text-leway-light/60 mb-2 block">
                        Services You're Interested In <span className="text-leway-light/30 ml-2">(Optional)</span>
                      </label>
                      <Controller
                        control={control}
                        name="services"
                        render={({ field }) => {
                          const selected = field.value || [];
                          const toggle = (val: string) => {
                            const next = selected.includes(val)
                              ? selected.filter((s) => s !== val)
                              : [...selected, val];
                            field.onChange(next);
                          };
                          return (
                            <div ref={dropdownRef} className="relative z-50">
                              <button
                                type="button"
                                onClick={() => setDropdownOpen((o) => !o)}
                                className="flex w-full items-center justify-between border-b border-white/20 bg-transparent px-0 py-4 text-xl md:text-2xl text-white transition-colors hover:border-leway-green font-display text-left"
                              >
                                <span className={selected.length ? "text-white" : "text-white/20"}>
                                  {selected.length ? `${selected.length} Selected` : "Select services..."}
                                </span>
                                <ChevronDown size={20} className={`text-white/50 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
                              </button>
                              <AnimatePresence>
                                {dropdownOpen && (
                                  <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute w-full mt-2 border border-white/10 bg-[#0F2714] shadow-2xl z-50 p-2"
                                  >
                                    {SERVICE_OPTIONS.map((opt) => (
                                      <button
                                        key={opt}
                                        type="button"
                                        onClick={() => toggle(opt)}
                                        className="flex w-full items-center gap-4 px-4 py-4 text-base md:text-lg text-white/80 transition-colors hover:bg-white/5 hover:text-white font-body font-light text-left"
                                      >
                                        <span className={`flex h-5 w-5 shrink-0 items-center justify-center border ${selected.includes(opt) ? "border-leway-green bg-leway-green text-forest" : "border-white/20 rounded-sm"}`}>
                                          {selected.includes(opt) && <Check size={14} strokeWidth={3} />}
                                        </span>
                                        {opt}
                                      </button>
                                    ))}
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          );
                        }}
                      />
                    </div>

                    <div>
                      <label htmlFor="service" className="font-ui uppercase tracking-widest text-[0.8125rem] text-leway-light/60 mb-2 block">
                        What service are you looking for?
                      </label>
                      <Textarea
                        id="service"
                        placeholder="Tell us about your project..."
                        rows={4}
                        {...register("service")}
                        className="bg-transparent border-0 border-b border-white/20 rounded-none text-white px-0 py-4 text-xl md:text-2xl focus-visible:ring-0 focus-visible:border-[#C9A84C] placeholder:text-white/20 transition-colors font-display resize-none"
                      />
                      {errors.service && <p className="text-sm text-leway-gold mt-2 font-ui uppercase tracking-widest">{errors.service.message}</p>}
                    </div>

                    {submitError && (
                      <p className="text-sm text-leway-gold bg-leway-gold/10 p-4 border border-leway-gold/20 font-ui tracking-widest uppercase text-center">{submitError}</p>
                    )}

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative overflow-hidden bg-leway-green px-8 py-6 text-leway-dark font-ui font-bold uppercase tracking-[0.2em] text-sm md:text-base transition-all hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed disabled:scale-100 mt-4 outline-none focus-visible:ring-2 ring-leway-green ring-offset-2 ring-offset-forest"
                    >
                      <span className="relative z-10">{isSubmitting ? "TRANSMITTING..." : "SUBMIT INQUIRY"}</span>
                      <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}