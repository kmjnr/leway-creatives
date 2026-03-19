import { ReactNode } from "react";

interface MarqueeProps {
    children: ReactNode;
    speed?: number;
    className?: string;
}

export default function Marquee({ children, speed = 20, className = "" }: MarqueeProps) {
    return (
        <div className={`relative flex w-full overflow-hidden ${className}`}>
            <div
                className="flex shrink-0 min-w-full animate-marquee items-center justify-around gap-8 pl-8"
                style={{ "--duration": `${speed}s` } as React.CSSProperties}
            >
                {children}
            </div>
            <div
                className="flex shrink-0 min-w-full animate-marquee items-center justify-around gap-8 pl-8"
                style={{ "--duration": `${speed}s` } as React.CSSProperties}
                aria-hidden="true"
            >
                {children}
            </div>
        </div>
    );
}
