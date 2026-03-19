"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
    const [isVisible, setIsVisible] = useState(false);
    const cursorRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);

    // Position state mutated directly, no React re-renders, tracks at 60fps
    const mousePos = useRef({ x: -100, y: -100 });

    useEffect(() => {
        // Check if it's a touch device, if so, disable the cursor
        if (window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        setIsVisible(true);

        const updateCursor = () => {
            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0)`;
            }
            rafRef.current = requestAnimationFrame(updateCursor);
        };

        // Start RAF loop
        rafRef.current = requestAnimationFrame(updateCursor);

        const moveCursor = (e: MouseEvent) => {
            mousePos.current.x = e.clientX - 10;
            mousePos.current.y = e.clientY - 10;
        };

        // Use capturing phase so this runs top-down through the DOM hierarchy
        // Without bubbling up wildly and triggering repeatedly
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

            if (cursorRef.current) {
                if (shouldHover) {
                    cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(3)`;
                    cursorRef.current.style.opacity = "0.8";
                } else {
                    cursorRef.current.style.transform = `translate3d(${mousePos.current.x}px, ${mousePos.current.y}px, 0) scale(1)`;
                    cursorRef.current.style.opacity = "1";
                }
            }
        };

        const handleMouseLeaveGlobal = () => {
            if (cursorRef.current) cursorRef.current.style.display = "none";
        };
        const handleMouseEnterGlobal = () => {
            if (cursorRef.current) cursorRef.current.style.display = "block";
        };

        // Passive true optimizations
        window.addEventListener("mousemove", moveCursor, { passive: true });
        // Third argument 'true' captures the event on the way DOWN the DOM tree
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
        <div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none rounded-full z-[9999] mix-blend-difference hidden md:block transition-[scale,opacity] duration-300 ease-out"
            style={{
                width: 20,
                height: 20,
                backgroundColor: "#22C55E", // Bright accent green
                willChange: "transform",
            }}
        />
    );
}
