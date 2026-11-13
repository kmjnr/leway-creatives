import Image from "next/image";

const quotes = [
  {
    text: "Bounce rate went from 70% to 35% in a week — and the communication never dropped.",
    name: "Mary J.",
    role: "Solopreneur",
    avatar: "/images/photography/avatar-mary.jpg",
  },
  {
    text: "The landing page they built converted 3× better than our old site from day one.",
    name: "Alan Paige",
    role: "Startup founder",
    avatar: "/images/photography/avatar-alan.jpg",
  },
  {
    text: "No other agency gave us this level of detail — context and prioritisation all the way.",
    name: "Michael N.",
    role: "Managing director",
    avatar: "/images/photography/avatar-michael.jpg",
  },
  {
    text: "Three interviews the month after they rewrote my LinkedIn.",
    name: "Alexis K.",
    role: "Job seeker",
    avatar: "/images/photography/avatar-alexis.jpg",
  },
];

export default function Testimonials() {
  return (
    <section id="proof" aria-label="What clients say" className="bg-leway-dark text-leway-paper">
      <div className="container py-24 md:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-leway-paper">In their words.</h2>
          <p className="font-body text-lead text-leway-paper/70 mt-5">
            Unedited, from the project threads.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-14 mt-14 md:mt-20">
          {quotes.map((quote) => (
            <figure key={quote.name} className="flex flex-col sm:flex-row gap-6 sm:gap-8">
              <div className="relative w-16 h-16 flex-shrink-0 overflow-hidden rounded-full bg-leway-forest">
                <Image
                  src={quote.avatar}
                  alt={`Portrait of ${quote.name}`}
                  fill
                  sizes="64px"
                  className="photo object-cover"
                />
              </div>

              <div className="min-w-0">
                <blockquote>
                  <p className="font-display text-h3 text-leway-paper max-w-[44ch]">
                    &ldquo;{quote.text}&rdquo;
                  </p>
                </blockquote>
                <figcaption className="font-body text-small text-leway-paper/75 mt-5">
                  {quote.name} · {quote.role}
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
