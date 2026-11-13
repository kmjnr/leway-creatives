import FaqList from "@/components/ui/FaqList";
import { faqs } from "@/data/faqs";
import { site } from "@/data/site";

export default function FAQ() {
  return (
    <section id="faq" aria-label="Frequently asked questions" className="bg-leway-paper">
      <div className="container py-24 md:py-32">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-28">
              <h2 className="font-display text-h2 text-leway-dark">Questions, answered.</h2>
              <p className="font-body text-lead text-leway-dark/70 mt-5 max-w-[34ch]">
                The practical things, before any money changes hands.
              </p>
              <a
                href={`mailto:${site.email}`}
                className="inline-flex font-body text-base text-leway-green-ink mt-7 py-3 underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
              >
                Ask something else
              </a>
            </div>
          </div>

          <div className="lg:col-span-8">
            <FaqList items={faqs} idPrefix="home-faq" />
          </div>
        </div>
      </div>
    </section>
  );
}
