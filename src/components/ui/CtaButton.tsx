"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface CtaButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    showArrow?: boolean;
    wrapperClassName?: string;
}

export const CtaButton = React.forwardRef<HTMLButtonElement, CtaButtonProps>(
    ({ children, className, showArrow = true, wrapperClassName, ...props }, ref) => {
        return (
            <div className={cn("btn-ripple-wave", wrapperClassName)}>
                <button
                    ref={ref}
                    className={cn(
                        "group flex items-center justify-center gap-2.5 bg-leway-green text-leway-dark font-semibold px-7 py-4 rounded-full hover:bg-leway-green/90 active:scale-[0.98] transition-all duration-200 font-body text-base w-full sm:w-auto",
                        className
                    )}
                    {...props}
                >
                    {children}
                    {showArrow && (
                        <span className="w-7 h-7 rounded-full bg-leway-dark/10 flex items-center justify-center group-hover:translate-x-0.5 transition-transform">
                            <ArrowRight size={14} />
                        </span>
                    )}
                </button>
            </div>
        );
    }
);

CtaButton.displayName = "CtaButton";
