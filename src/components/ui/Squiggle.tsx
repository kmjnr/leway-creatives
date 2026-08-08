import React from "react";
import { cn } from "@/lib/utils";

interface SquiggleProps extends React.SVGProps<SVGSVGElement> {
    color?: string;
    strokeWidth?: string | number;
}

export function Squiggle({
    color = "#22C55E",
    strokeWidth = "2.5",
    className,
    ...props
}: SquiggleProps) {
    return (
        <svg
            className={cn("absolute -bottom-2 left-0 w-full", className)}
            height="8"
            viewBox="0 0 400 8"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
            {...props}
        >
            <path
                d="M2 5.5C40 1.5 100 7 160 4C220 1 280 7 340 4C360 3 380 4.5 398 5"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
            />
        </svg>
    );
}
