import Link from "next/link";
import WorkCard from "@/components/ui/WorkCard";
import { featuredProjects, moreProjects } from "@/data/work";

export default function Work() {
  return (
    <section id="work" aria-label="Selected work" className="bg-leway-paper">
      <div className="container py-24 md:py-32">
        <div className="max-w-2xl">
          <h2 className="font-display text-h2 text-leway-dark">Selected work.</h2>
          <p className="font-body text-lead text-leway-dark/70 mt-5">
            Ten builds — four client sites in development, six live products.
            Every screenshot is the real thing, taken from the deployment.
          </p>
        </div>

        {/* Client builds, large — each links straight to the live site. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-14 mt-14 md:mt-20">
          {featuredProjects.map((project) => (
            <WorkCard key={project.slug} project={project} to="external" size="lg" />
          ))}
        </div>

        {/* Everything else, smaller */}
        <h3 className="font-display text-h3 text-leway-dark mt-20 md:mt-28">Also built.</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 mt-8">
          {moreProjects.map((project) => (
            <WorkCard key={project.slug} project={project} to="external" size="sm" />
          ))}
        </div>

        <p className="mt-12">
          <Link
            href="/work"
            className="font-body text-base text-leway-green-ink underline decoration-leway-green-ink/40 underline-offset-4 hover:decoration-leway-green-ink transition-colors"
          >
            Read how each one was built
          </Link>
        </p>
      </div>
    </section>
  );
}
