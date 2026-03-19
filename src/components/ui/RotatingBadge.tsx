export default function RotatingBadge({ className = "" }: { className?: string }) {
    return (
        <div className={`relative flex items-center justify-center ${className}`}>
            <svg
                className="animate-[spin_10s_linear_infinite]"
                width="140"
                height="140"
                viewBox="0 0 140 140"
            >
                <defs>
                    <path
                        id="textcircle"
                        d="M 70, 70 m -55, 0 a 55,55 0 1,1 110,0 a 55,55 0 1,1 -110,0"
                    />
                </defs>
                <text className="text-[12px] font-ui tracking-[0.25em] fill-current text-accent-gold uppercase font-semibold">
                    <textPath href="#textcircle" startOffset="0%">
                        • AWARD WINNING • CREATIVE AGENCY • KENYA •
                    </textPath>
                </text>
            </svg>
            <div className="absolute inset-0 flex items-center justify-center text-accent-gold">
                {/* Simple geometric or monogram mark in the center */}
                <span className="font-display font-bold text-2xl">L</span>
            </div>
        </div>
    );
}
