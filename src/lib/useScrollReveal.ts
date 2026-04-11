"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealOptions {
    /** Margin around the root (IntersectionObserver rootMargin). Default: "-60px" */
    margin?: string;
    /** Fire only once. Default: true */
    once?: boolean;
}

/**
 * Lightweight replacement for framer-motion's `whileInView`.
 * Returns a ref and a boolean — apply the ref to the container element,
 * then conditionally apply a CSS animation class when `isVisible` is true.
 *
 * Usage:
 * ```tsx
 * const { ref, isVisible } = useScrollReveal();
 * <div ref={ref} className={isVisible ? "animate-reveal-up" : "opacity-0"}>
 * ```
 */
export function useScrollReveal<T extends HTMLElement = HTMLElement>(
    options?: ScrollRevealOptions
) {
    const { margin = "-60px", once = true } = options ?? {};
    const ref = useRef<T>(null);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    if (once) observer.disconnect();
                } else if (!once) {
                    setIsVisible(false);
                }
            },
            { rootMargin: margin, threshold: 0 }
        );

        observer.observe(el);
        return () => observer.disconnect();
    }, [margin, once]);

    return { ref, isVisible };
}
