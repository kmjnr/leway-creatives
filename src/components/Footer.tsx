import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";

const serviceLinks = [
  "Web Design & Development",
  "Content & Copywriting",
  "Marketing Design",
  "Lead Generation",
  "Career & Personal Branding",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background-dark text-leway-light border-t border-white/5 relative z-10" aria-label="Site footer">
      <div className="container mx-auto px-6 max-w-7xl py-24">
        <div className="grid gap-16 md:gap-12 md:grid-cols-12">

          {/* Brand Info */}
          <div className="md:col-span-5 lg:col-span-6 flex flex-col gap-6">
            <Link href="/" className="inline-block group w-fit">
              <span className="font-display font-medium text-3xl md:text-4xl tracking-tighter text-white group-hover:opacity-80 transition-opacity">
                LEWAY<span className="text-leway-green">.</span>
              </span>
            </Link>
            <p className="font-body text-base lg:text-lg text-leway-light/60 font-light max-w-sm leading-relaxed">
              Design, Copywriting, and Lead Generation for businesses that out-perform their competition. Based in Kenya, Partnering Worldwide.
            </p>
          </div>

          {/* Services */}
          <div className="md:col-span-4 lg:col-span-3">
            <h4 className="font-ui font-bold text-white mb-6 text-xs uppercase tracking-[0.2em]">Services</h4>
            <ul className="space-y-4">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/#services"
                    className="font-body text-sm text-leway-light/60 hover:text-leway-green transition-colors"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="md:col-span-3 lg:col-span-3">
            <h4 className="font-ui font-bold text-white mb-6 text-xs uppercase tracking-[0.2em]">Connect</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="mailto:hello@lewaycreatives.com"
                  className="flex items-center gap-3 font-body text-sm text-leway-light/60 hover:text-leway-green transition-colors group"
                >
                  <Mail size={16} className="text-leway-light/60 group-hover:text-leway-green transition-colors" />
                  hello@lewaycreatives.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254741408647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 font-body text-sm text-leway-light/60 hover:text-leway-green transition-colors group"
                >
                  <MessageCircle size={16} className="text-leway-light/60 group-hover:text-leway-green transition-colors" />
                  +254 741 408 647
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      <div className="border-t border-white/5 py-8">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="font-body text-xs text-leway-light/60 font-light text-center md:text-left">
            © {year} LEWAY Creatives. All rights reserved. Let's build something great.
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link href="/privacy-policy" className="font-body text-xs text-leway-light/60 hover:text-leway-green transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms-and-conditions" className="font-body text-xs text-leway-light/60 hover:text-leway-green transition-colors">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
