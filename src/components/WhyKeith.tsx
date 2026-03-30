import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";

const points = [
  "Family-centered leadership rooted in real values",
  "Principled conservative who won't play political games",
  "Ready to fight for District 51 on day one",
  "Focused on real issues — education, safety, affordability",
  "Community-driven and committed to common sense",
  "Trustworthy, grounded, and electable",
];

const WhyKeith = () => (
  <section className="py-20 md:py-28 bg-primary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground uppercase tracking-tight text-center">
          Why Keith
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4" />
      </motion.div>

      <div className="mt-14 max-w-2xl mx-auto">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 py-4 border-b border-primary-foreground/10 last:border-b-0"
          >
            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-primary-foreground/90 text-lg">{point}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="#donate"
          className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-campaign-gold-dark transition-colors tracking-wide"
        >
          Support Keith Today
        </a>
      </div>
    </div>
  </section>
);

export default WhyKeith;
