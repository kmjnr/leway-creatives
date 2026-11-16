"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const ContactFormIsland = dynamic(() => import("./ContactFormIsland"), {
  ssr: false,
  loading: () => <FormSkeleton />,
});

function FormSkeleton() {
  return (
    <div
      aria-hidden="true"
      className="bg-leway-forest rounded-[1.5rem] p-6 sm:p-8 lg:p-10 min-h-[560px]"
    >
      <div className="h-full min-h-[500px] rounded-card bg-leway-paper/5" />
    </div>
  );
}

/** How far below the viewport the form starts loading, in pixels. */
const PRELOAD_MARGIN = 600;

/**
 * Loads the interactive form only when the visitor approaches it. The static
 * heading and contact routes above it are server-rendered, so there is still
 * something useful here without JavaScript and the validation bundle never
 * blocks the first paint.
 *
 * A throttled scroll/resize check is used instead of IntersectionObserver:
 * it is deterministic under programmatic scrolling and deep links, and the
 * listeners are removed as soon as the form has mounted.
 */
export default function DeferredContactForm() {
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (mounted) return;
    const node = ref.current;
    if (!node) return;

    let frame = 0;

    const cleanup = () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      if (frame) cancelAnimationFrame(frame);
      frame = 0;
    };

    const check = () => {
      frame = 0;
      const rect = node.getBoundingClientRect();
      const near =
        rect.top <= window.innerHeight + PRELOAD_MARGIN &&
        rect.bottom >= -PRELOAD_MARGIN;
      if (near) {
        cleanup();
        setMounted(true);
      }
    };

    function schedule() {
      if (frame) return;
      frame = requestAnimationFrame(check);
    }

    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule, { passive: true });
    check(); // a deep link or refresh may already land beside the form

    return cleanup;
  }, [mounted]);

  return (
    <div ref={ref}>
      {mounted ? <ContactFormIsland /> : <FormSkeleton />}
    </div>
  );
}
