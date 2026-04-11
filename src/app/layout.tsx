import type { Metadata } from 'next';
import { Fraunces, Syne, Outfit } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CustomCursor from '@/components/ui/CustomCursor';

export const metadata: Metadata = {
    title: 'Web Design, Copywriting & Lead Generation | LEWAY Creatives | Kenya & Worldwide',
    description: 'LEWAY Creatives delivers conversion-focused web design, copywriting, and B2B lead generation for businesses worldwide. World-class work at accessible rates. Serving clients in the US, UK, Canada, Australia, and Kenya. Get your free audit.',
    keywords: 'web design agency, copywriting agency, lead generation service, B2B lead generation, outsource copywriting, affordable web design, prospect list building, contact list building, web design Kenya, copywriting Kenya, web design Nairobi, outsource web design, remote copywriting agency, conversion landing page design, LinkedIn lead generation, LEWAY Creatives',
    authors: [{ name: 'LEWAY Creatives' }],
    alternates: {
        canonical: 'https://lewaycreatives.com',
    },
    openGraph: {
        title: 'Web Design + Copywriting + Lead Gen | LEWAY Creatives',
        description: 'World-class web design, copywriting, and lead generation \u2014 at a fraction of Western agency rates. Serving the US, UK, Canada, Australia & Kenya. One team. Real results.',
        type: 'website',
        url: 'https://lewaycreatives.com',
        images: [{
            url: 'https://lewaycreatives.com/images/leway-creatives-web-design-agency-kenya.webp',
            width: 1200,
            height: 630,
            alt: 'LEWAY Creatives \u2014 Web Design, Copywriting & Lead Generation Agency',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web Design + Copy + Lead Gen | LEWAY Creatives',
        description: 'World-class web design, copywriting, and lead generation \u2014 at a fraction of Western agency rates. Serving the US, UK, Canada, Australia & Kenya.',
        images: ['https://lewaycreatives.com/images/leway-creatives-web-design-agency-kenya.webp'],
    },
};

const fraunces = Fraunces({
    subsets: ['latin'],
    axes: ['opsz'],
    variable: '--font-display',
    display: 'swap',
});

const syne = Syne({
    subsets: ['latin'],
    variable: '--font-ui',
    display: 'swap',
});

const outfit = Outfit({
    subsets: ['latin'],
    variable: '--font-body',
    display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${fraunces.variable} ${syne.variable} ${outfit.variable} dark`}>
            <body className="antialiased font-body min-h-screen bg-background text-foreground tracking-wide selection:bg-primary selection:text-primary-foreground relative">
                <CustomCursor />
                <Navbar />
                {children}
                <Footer />
                <ScrollToTop />
                <WhatsAppButton />
            </body>
        </html>
    );
}
