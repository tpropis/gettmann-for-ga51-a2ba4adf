import { CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { trackDonateClick } from "@/lib/analytics";

const points = [
  "Family-centered leadership rooted in real values",
  "Principled conservative who won't play political games",
  "Ready to fight for District 51 on day one",
  "Focused on real issues — education, safety, affordability",
  "Community-driven and committed to common sense",
  "Trustworthy, grounded, and electable",
];

const WhyKeith = () => (
  <section className="py-24 md:py-36 bg-primary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary-foreground uppercase tracking-tight text-center">
          Why Keith
        </h2>
        <div className="w-20 h-[3px] bg-accent mx-auto mt-4" />
      </motion.div>

      <div className="mt-16 max-w-2xl mx-auto">
        {points.map((point, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="flex items-start gap-4 py-5 border-b border-primary-foreground/10 last:border-b-0"
          >
            <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-0.5" />
            <span className="text-primary-foreground/85 text-lg leading-relaxed">{point}</span>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-14">
        <a
          href="#donate"
          className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
        >
          Support Keith Today
        </a>
      </div>
    </div>
  </section>
);

export default WhyKeith;
