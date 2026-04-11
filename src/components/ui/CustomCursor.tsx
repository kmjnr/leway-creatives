"use client";

import { useEffect, useRef, useState } from "react";

// Brand gold color — used for the cursor arrow fill
const CURSOR_COLOR = "#C9A84C";

// SVG arrow cursor path (standard OS arrow pointing top-left)
// Drawn at 24×24 viewBox, no external assets needed
const ARROW_PATH =
    "M 4 2 L 4 20 L 8.5 15.5 L 12.5 22 L 14.5 21 L 10.5 14.5 L 17 14.5 Z";

// Convergence threshold — stop RAF when values are within this range of target
const EPSILON = 0.005;
const LERP = 0.18;

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<SVGSVGElement>(null);
    const rafRef = useRef<number | null>(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const scale = useRef(1);
    const targetScale = useRef(1);
    const opacity = useRef(1);
    const targetOpacity = useRef(1);
    const isAnimating = useRef(false);
    const lastTarget = useRef<EventTarget | null>(null);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        setIsVisible(true);

        const startLoop = () => {
            if (isAnimating.current) return;
            isAnimating.current = true;
            rafRef.current = requestAnimationFrame(updateCursor);
        };

        const updateCursor = () => {
            const el = cursorRef.current;
            if (!el) {
                isAnimating.current = false;
                return;
            }

            const scaleDelta = Math.abs(targetScale.current - scale.current);
            const opacityDelta = Math.abs(targetOpacity.current - opacity.current);

            if (scaleDelta > EPSILON || opacityDelta > EPSILON) {
                scale.current += (targetScale.current - scale.current) * LERP;
                opacity.current += (targetOpacity.current - opacity.current) * LERP;
            } else {
                // Snap to target — converged
                scale.current = targetScale.current;
                opacity.current = targetOpacity.current;
            }

            el.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${scale.current})`;
            el.style.opacity = String(opacity.current);

            // Only continue the loop if values haven't converged
            if (scaleDelta > EPSILON || opacityDelta > EPSILON) {
                rafRef.current = requestAnimationFrame(updateCursor);
            } else {
                isAnimating.current = false;
            }
        };

        const moveCursor = (e: MouseEvent) => {
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
            // Direct position update — no need for a loop for position changes
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${scale.current})`;
            }
        };

        const handleMouseEnterCapture = (e: MouseEvent) => {
            const target = e.target;
            // Skip if we already processed this element
            if (target === lastTarget.current) return;
            lastTarget.current = target;

            const el = target as HTMLElement;
            if (!el || !el.closest) return;

            const shouldHover =
                el.closest("a") ||
                el.closest("button") ||
                el.closest("[role='button']") ||
                el.tagName.toLowerCase() === "input" ||
                el.tagName.toLowerCase() === "textarea" ||
                el.closest("[data-cursor-hover]");

            if (shouldHover) {
                targetScale.current = 1.6;
                targetOpacity.current = 0.8;
            } else {
                targetScale.current = 1;
                targetOpacity.current = 1;
            }
            // Restart the animation loop for scale/opacity change
            startLoop();
        };

        const handleMouseLeaveGlobal = () => {
            if (cursorRef.current) cursorRef.current.style.display = "none";
        };
        const handleMouseEnterGlobal = () => {
            if (cursorRef.current) cursorRef.current.style.display = "block";
        };

        window.addEventListener("mousemove", moveCursor, { passive: true });
        document.addEventListener("mouseenter", handleMouseEnterCapture, true);
        document.addEventListener("mouseleave", handleMouseLeaveGlobal);
        document.addEventListener("mouseenter", handleMouseEnterGlobal);

        return () => {
            window.removeEventListener("mousemove", moveCursor);
            document.removeEventListener("mouseenter", handleMouseEnterCapture, true);
            document.removeEventListener("mouseleave", handleMouseLeaveGlobal);
            document.removeEventListener("mouseenter", handleMouseEnterGlobal);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, []);

    if (!isVisible) return null;

    return (
        <svg
            ref={cursorRef}
            width="24"
            height="24"
            viewBox="0 0 24 24"
            className="fixed top-0 left-0 pointer-events-none z-[9999] hidden md:block"
            aria-hidden="true"
            focusable="false"
            style={{ willChange: "transform" }}
        >
            {/* Arrow fill */}
            <path
                d={ARROW_PATH}
                fill={CURSOR_COLOR}
            />
            {/* Crisp dark outline for visibility on any background */}
            <path
                d={ARROW_PATH}
                fill="none"
                stroke="#0B1F0F"
                strokeWidth="1.2"
                strokeLinejoin="round"
            />
        </svg>
    );
}
