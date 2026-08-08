import React from "react";
import { cn } from "@/lib/utils";

interface EyebrowProps extends React.HTMLAttributes<HTMLElement> {
    as?: React.ElementType;
    children: React.ReactNode;
}

export function Eyebrow({ as: Component = "p", children, className, ...props }: EyebrowProps) {
    return (
        <Component
            className={cn(
                "font-ui text-[10px] md:text-xs tracking-widest uppercase",
                className
            )}
            {...props}
        >
            {children}
        </Component>
    );
}
