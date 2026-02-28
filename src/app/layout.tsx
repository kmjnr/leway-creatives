import type { Metadata } from 'next';
import { Plus_Jakarta_Sans, Inter } from 'next/font/google';
import './globals.css';
import { Providers } from '@/components/Providers';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export const metadata: Metadata = {
    title: 'Web Design & Creative Strategy | LEWAY Creatives | Kenya & Worldwide',
    description: 'LEWAY CREATIVES combines high-end web and visual design with psychological copywriting. We build websites, resumes, and campaign assets that actually convert. Book a consultation.',
    authors: [{ name: 'LEWAY Creatives' }],
    alternates: {
        canonical: 'https://lewaycreatives.com',
    },
    openGraph: {
        title: 'Web Design & Creative Strategy | LEWAY Creatives',
        description: 'We combine elite Web Design with Psychological Copywriting to turn your visitors into obsessive buyers. Kenya & Worldwide.',
        type: 'website',
        url: 'https://lewaycreatives.com',
        images: [{
            url: 'https://lewaycreatives.com/images/leway-creatives-web-design-agency-kenya.webp',
            width: 1200,
            height: 630,
            alt: 'LEWAY Creatives — Web Design & Copywriting Agency Kenya',
        }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web Design & Creative Strategy | LEWAY Creatives',
        description: 'Elite web design + psychological copywriting. Kenya & Worldwide.',
        images: ['https://lewaycreatives.com/images/leway-creatives-web-design-agency-kenya.webp'],
    },
};

const plusJakartaSans = Plus_Jakarta_Sans({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800'],
    variable: '--font-display',
    display: 'swap',
});

const inter = Inter({
    subsets: ['latin'],
    weight: ['400', '500', '600'],
    variable: '--font-body',
    display: 'swap',
});

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning className={`${plusJakartaSans.variable} ${inter.variable}`}>
            <body className="antialiased font-body min-h-screen bg-background text-foreground">
                <Providers>
                    <Navbar />
                    {children}
                    <Footer />
                    <ScrollToTop />
                    <WhatsAppButton />
                </Providers>
            </body>
        </html>
    );
}
