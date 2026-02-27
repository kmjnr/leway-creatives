"use client";

import { motion } from "framer-motion";

export default function Philosophy() {
  return (
    <section className="py-24 md:py-32 bg-background" aria-label="Our philosophy">
      <div className="container mx-auto px-6 max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-extrabold text-foreground leading-tight mb-8">
            Most Businesses and Personal Brands Are{" "}
            <span className="text-primary">Half-Blind</span>
          </h2>
          <p className="font-body text-lg md:text-xl text-muted-foreground leading-relaxed">
            Designers care about pixels. Copywriters care about words. But here's
            the cold truth:{" "}
            <strong className="text-foreground">
              Design without copy is a Ferrari without an engine.
            </strong>{" "}
            Copy without design is a Ferrari hidden in a garage. At LEWAY
            Creatives, you get both — the engine and the showroom.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
