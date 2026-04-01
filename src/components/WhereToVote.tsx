import { motion } from "framer-motion";

const WhereToVote = () => (
  <section className="py-20 md:py-28 bg-campaign-light">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
          Where to Vote
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4" />
        <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
          Make sure you're ready to vote in District 51. Check your registration
          status and polling location using Georgia's official voter portal.
        </p>
        <a
          href="https://mvp.sos.ga.gov/s/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-8 bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-campaign-gold-dark transition-colors tracking-wide"
        >
          Check Where I Vote
        </a>
      </motion.div>
    </div>
  </section>
);

export default WhereToVote;
