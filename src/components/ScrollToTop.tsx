"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const visibleRef = useRef(false);
  const rafScheduled = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (rafScheduled.current) return;
      rafScheduled.current = true;
      requestAnimationFrame(() => {
        rafScheduled.current = false;
        const next = window.scrollY > 600;
        if (next !== visibleRef.current) {
          visibleRef.current = next;
          setVisible(next);
        }
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-[92px] right-5 z-50 flex h-12 w-12 items-center justify-center rounded-full bg-leway-dark text-leway-paper shadow-overlay-sm transition-transform hover:scale-105"
          aria-label="Scroll back to top"
        >
          <ArrowUp size={20} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
