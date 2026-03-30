"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="flex min-h-screen items-center justify-center bg-background">
            <div className="text-center">
                <h1 className="mb-4 font-display text-4xl font-bold text-leway-dark">404</h1>
                <p className="mb-6 font-body text-lg text-leway-dark/60">
                    Sorry, this page doesn&apos;t exist.
                </p>
                <Link
                    href="/"
                    className="font-ui uppercase tracking-widest text-sm text-leway-green hover:underline"
                >
                    ← Back to Home
                </Link>
            </div>
        </div>
    );
}
