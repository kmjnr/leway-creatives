import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Philosophy from "@/components/Philosophy";
import Services from "@/components/Services";
import RealityCheck from "@/components/RealityCheck";
import HowItWorks from "@/components/HowItWorks";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

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
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "application/ld+json";
    script.textContent = JSON.stringify(jsonLd);
    document.head.appendChild(script);
    return () => {
      document.head.removeChild(script);
    };
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Philosophy />
        <Services />
        <RealityCheck />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <ContactForm />
      </main>
      <Footer />
    </>
  );
};

export default Index;
