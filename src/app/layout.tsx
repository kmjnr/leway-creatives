import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Fraunces, Outfit } from 'next/font/google';
import './globals.css';
import ScrollToTop from '@/components/ScrollToTop';
import WhatsAppButton from '@/components/WhatsAppButton';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { site } from '@/data/site';
import { projects } from '@/data/work';

export const metadata: Metadata = {
    metadataBase: new URL(site.url),
    title: {
        default: `${site.name} — web design, copywriting & lead generation | Nairobi, Kenya`,
        // Every interior page supplies its own title; this adds the brand once.
        template: `%s | ${site.name}`,
    },
    description:
        `Web design, copywriting and lead generation from one senior team in Nairobi. ${projects.length} builds shown as they run, and one fixed quote before any work starts.`,
    keywords:
        'web design agency Kenya, web design Nairobi, copywriting agency, lead generation service, B2B lead generation, outsource web design, conversion landing page, LEWAY Creatives',
    authors: [{ name: site.name }],
    openGraph: {
        title: `${site.name} — web design, copy & lead generation`,
        description:
            `One senior team for the site, the words and the pipeline. ${projects.length} builds, shown as they are.`,
        type: 'website',
        url: site.url,
        siteName: site.name,
        images: [
            {
                url: site.ogImage,
                width: 1200,
                height: 630,
                alt: `${site.name} — selected work: Lifeline Group of Hospitals website`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${site.name} — web design, copy & lead generation`,
        description: 'One senior team for the site, the words and the pipeline.',
        images: [site.ogImage],
    },
};

export const viewport: Viewport = {
    themeColor: '#FAF8F2',
    colorScheme: 'light',
    width: 'device-width',
    initialScale: 1,
};

// Fraunces — display serif for headlines only
const fraunces = Fraunces({
    subsets: ['latin'],
    variable: '--font-display',
    display: 'swap',
});

// Outfit — the single text face for everything else
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
        <html lang="en" className={`${fraunces.variable} ${outfit.variable}`}>
            <body className="min-h-screen bg-leway-paper font-body text-leway-dark antialiased">
                <Script
                    id="gtm-datalayer"
                    strategy="afterInteractive"
                >{`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());`}</Script>
                <Script
                    src="https://www.googletagmanager.com/gtm.js?id=GTM-KS2CH4LL"
                    strategy="afterInteractive"
                />
                <a href="#main" className="skip-link">
                    Skip to content
                </a>
                <Navbar />
                {children}
                <Footer />
                <ScrollToTop />
                <WhatsAppButton />
            </body>
        </html>
    );
}
