import type { Metadata } from 'next';
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
        images: [{ url: 'https://lovable.dev/opengraph-image-p98pqg.png' }],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Web Design & Creative Strategy | LEWAY Creatives',
        description: 'Elite web design + psychological copywriting. Kenya & Worldwide.',
        images: ['https://lovable.dev/opengraph-image-p98pqg.png'],
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
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
