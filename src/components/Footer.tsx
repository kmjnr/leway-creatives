import { Mail, MessageCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Eyebrow } from "@/components/ui/Eyebrow";

const serviceLinks = [
  "Web Design & Development",
  "Content & Copywriting",
  "Marketing Design",
  "Lead Generation",
  "Career & Personal Branding",
];

const quickLinks = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQ", href: "/#faq" },
];

const legalLinks = [
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms-and-conditions" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-leway-light border-t border-black/8 relative z-10" aria-label="Site footer">
      <div className="container mx-auto px-6 max-w-7xl py-16 md:py-20">
        <div className="grid gap-12 md:gap-8 md:grid-cols-12">

          {/* Brand */}
          <div className="md:col-span-5 flex flex-col gap-5">
            <Link href="/" className="inline-block w-fit" aria-label="LEWAY Creatives Home">
              <Image
                src="/images/leway_creatives_logo.png"
                alt="LEWAY Creatives"
                width={140}
                height={40}
                className="h-8 md:h-9 w-auto"
              />
            </Link>
            <p className="font-body text-base text-leway-dark/60 max-w-xs leading-relaxed">
              Premium web design, copywriting & lead generation — built to make your brand the obvious choice.
            </p>

            {/* GET IN TOUCH eyebrow + contact icons */}
            <Eyebrow className="text-leway-green mt-1">
              Get in touch
            </Eyebrow>
            <div className="flex items-center gap-3">
              <a
                href="mailto:connect@lewaycreatives.com"
                className="w-12 h-12 rounded-full bg-leway-stone flex items-center justify-center text-leway-dark/60 hover:bg-leway-green hover:text-leway-dark transition-all duration-200"
                aria-label="Email LEWAY Creatives"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://wa.me/254741408647"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full bg-leway-stone flex items-center justify-center text-leway-dark/60 hover:bg-leway-green hover:text-leway-dark transition-all duration-200"
                aria-label="WhatsApp LEWAY Creatives"
              >
                <MessageCircle size={20} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="md:col-span-4">
            <Eyebrow as="h4" className="text-leway-dark/40 mb-5">Services</Eyebrow>
            <ul className="space-y-3">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <Link
                    href="/#services"
                    className="font-body text-sm text-leway-dark/70 hover:text-leway-dark transition-colors py-1"
                  >
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-3">
            <Eyebrow as="h4" className="text-leway-dark/40 mb-5">Company</Eyebrow>
            <ul className="space-y-3">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-leway-dark/70 hover:text-leway-dark transition-colors py-1"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-black/8 py-5">
        <div className="container mx-auto px-6 max-w-7xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-leway-dark/40">
            © {year} LEWAY Creatives. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="font-body text-xs text-leway-dark/40 hover:text-leway-dark transition-colors py-1"
              >
                {l.label}
              </Link>
            ))}
            <span className="font-body text-xs text-leway-dark/40">·</span>
            <p className="font-body text-xs text-leway-dark/40">
              Based in Kenya · Partnering Worldwide
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
