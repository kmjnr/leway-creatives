import { Mail, MessageCircle } from "lucide-react";

const serviceLinks = [
  "Web Design Kenya & Worldwide",
  "ATS Resume Writing",
  "SEO Copywriting",
  "Graphic Design",
  "Social Media Content",
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-background border-t border-overlay/5" aria-label="Site footer">
      <div className="container mx-auto px-6 max-w-6xl py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand */}
          <div>
            <a href="/" className="font-display text-xl font-extrabold text-foreground">
              LEWAY<span className="text-primary">.</span>
            </a>
            <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
              Elite web design & psychological copywriting. Kenya & Worldwide.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-2">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href="#services"
                    className="font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-foreground mb-4 text-sm uppercase tracking-wider">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="mailto:hello@lewaycreatives.com"
                  className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail size={14} />
                  hello@lewaycreatives.com
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/254741408647"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 font-body text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-overlay/5 py-5">
        <div className="container mx-auto px-6 max-w-6xl flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-xs text-muted-foreground/70">© {year} LEWAY Creatives. All rights reserved.</p>
          <div className="flex gap-4">
            <a href="#" className="font-body text-xs text-muted-foreground/70 hover:text-primary transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="font-body text-xs text-muted-foreground/70 hover:text-primary transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
