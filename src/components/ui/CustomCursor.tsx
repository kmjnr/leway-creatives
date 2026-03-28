"use client";

import { useEffect, useRef, useState } from "react";

// Brand gold color — used for the cursor arrow fill
const CURSOR_COLOR = "#C9A84C";

// SVG arrow cursor path (standard OS arrow pointing top-left)
// Drawn at 24×24 viewBox, no external assets needed
const ARROW_PATH =
    "M 4 2 L 4 20 L 8.5 15.5 L 12.5 22 L 14.5 21 L 10.5 14.5 L 17 14.5 Z";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<SVGSVGElement>(null);
    const rafRef = useRef<number | null>(null);

    const mousePos = useRef({ x: -100, y: -100 });
    const scale = useRef(1);
    const targetScale = useRef(1);
    const opacity = useRef(1);
    const targetOpacity = useRef(1);

    useEffect(() => {
        if (window.matchMedia("(pointer: coarse)").matches) return;

        setIsVisible(true);

        const LERP = 0.18;

        const updateCursor = () => {
            if (cursorRef.current) {
                scale.current += (targetScale.current - scale.current) * LERP;
                opacity.current += (targetOpacity.current - opacity.current) * LERP;

                cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(${scale.current})`;
                cursorRef.current.style.opacity = String(opacity.current);
            }
            rafRef.current = requestAnimationFrame(updateCursor);
        };

        rafRef.current = requestAnimationFrame(updateCursor);

        const moveCursor = (e: MouseEvent) => {
            // Offset of 0,0 so the arrow tip sits exactly at the pointer position
            mousePos.current.x = e.clientX;
            mousePos.current.y = e.clientY;
        };

        const handleMouseEnterCapture = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target || !target.closest) return;

            const shouldHover =
                target.closest("a") ||
                target.closest("button") ||
                target.closest("[role='button']") ||
                target.tagName.toLowerCase() === "input" ||
                target.tagName.toLowerCase() === "textarea" ||
                target.closest("[data-cursor-hover]");

            if (shouldHover) {
                targetScale.current = 1.6;
                targetOpacity.current = 0.8;
            } else {
                targetScale.current = 1;
                targetOpacity.current = 1;
            }
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
            // No CSS transition — RAF loop handles all animation
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
