
import dynamic from "next/dynamic";
import Hero from "@/components/Hero";

// Below-the-fold sections — loaded lazily to reduce initial JS bundle
const Philosophy = dynamic(() => import("@/components/Philosophy"));
const RealityCheck = dynamic(() => import("@/components/RealityCheck"));
const Services = dynamic(() => import("@/components/Services"));
const Comparison = dynamic(() => import("@/components/Comparison"));
const HowItWorks = dynamic(() => import("@/components/HowItWorks"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const FAQ = dynamic(() => import("@/components/FAQ"));
const ContactForm = dynamic(() => import("@/components/ContactForm"));

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["LocalBusiness", "ProfessionalService"],
      name: "LEWAY Creatives",
      description:
        "LEWAY CREATIVES combines high-end web and visual design with psychological copywriting. We build websites, resumes, and campaign assets that actually convert.",
      url: "https://lewaycreatives.com",
      priceRange: "$$",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Nairobi",
        addressCountry: "KE",
      },
      areaServed: "Worldwide",
      serviceType: [
        "Web Design",
        "Graphic Design",
        "Copywriting",
        "Resume Writing",
        "Personal Branding",
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "I'm just starting out. Is this too expensive?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We have packages for individuals and established brands. If you think professional design and copywriting is expensive, try the amateurs. It costs you customers every day.",
          },
        },
        {
          "@type": "Question",
          name: "Do you use AI?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We use AI for speed, not for thinking. The strategy is 100% human. The polish is 100% human. The tools just help us move faster.",
          },
        },
        {
          "@type": "Question",
          name: "How long does a website take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "A landing page? 2–4 days. A full site? 1–2 weeks. We move at the speed of business, not agency bureaucracy.",
          },
        },
        {
          "@type": "Question",
          name: "How many revisions do I get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every project includes 2 rounds of revisions baked into the price. Most clients nail it by round one because we get the brief right upfront. Additional rounds are available at a flat fee — no surprises.",
          },
        },
        {
          "@type": "Question",
          name: "What are your payment terms?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We require 50% upfront to kick off, and the remaining 50% on delivery. For larger projects, we offer milestone-based billing. We accept M-Pesa, bank transfer, and PayPal.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer a satisfaction guarantee?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We don't do refunds — we do results. That said, we've never had a client walk away unhappy. Our revision process ensures you get exactly what you need before we call it done.",
          },
        },
        {
          "@type": "Question",
          name: "Can you work with my existing brand guidelines?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Send us your brand kit and we'll work within your identity. If you don't have one yet, we can build that too — logos, color systems, typography, the whole package.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer ongoing support after launch?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer monthly retainer plans for content updates, website maintenance, and ongoing design work. Think of us as your creative department on speed dial.",
          },
        },
      ],
    },
    {
      "@type": "Product",
      name: "LEWAY Creatives Services",
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "5",
        reviewCount: "3",
      },
      review: [
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Mary J" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "LEWAY Creatives fixed my bounce rate. Went from 70% to 35% in a week.",
        },
        {
          "@type": "Review",
          author: { "@type": "Person", name: "Alex Kamau" },
          reviewRating: { "@type": "Rating", ratingValue: "5" },
          reviewBody:
            "Got 3 interviews the month after they rewrote my LinkedIn.",
        },
      ],
    },
  ],
};

const Index = () => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main>
        <Hero />
        <Philosophy />
        <RealityCheck />
        <Services />
        <Comparison />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
    </>
  );
};

export default Index;
