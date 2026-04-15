import { motion } from "framer-motion";
import { Quote } from "lucide-react";

const quotes = [
  {
    text: "Keith is exactly the kind of leader District 51 needs — honest, hardworking, and committed to our families.",
    author: "Community Supporter, Sandy Springs",
  },
  {
    text: "I trust Keith to fight for our schools, our safety, and our wallets. He has my full support.",
    author: "Local Business Owner, Dunwoody",
  },
  {
    text: "Keith listens. He shows up. And he means what he says. That's rare in politics today.",
    author: "Longtime Resident, District 51",
  },
];

const SocialProof = () => (
  <section className="py-24 md:py-36 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
          Community Voices
        </h2>
        <div className="section-divider" />
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {quotes.map((q, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background rounded-lg p-8 shadow-sm border border-border/50 hover:shadow-lg transition-shadow"
          >
            <Quote className="h-8 w-8 text-accent/25 mb-5" />
            <p className="text-foreground/75 italic leading-relaxed text-lg">"{q.text}"</p>
            <p className="mt-5 text-sm font-semibold text-primary tracking-wide">— {q.author}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default SocialProof;
