import { motion } from "framer-motion";

const WhereToVote = () => (
  <section className="py-16 md:py-24 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto text-center"
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight">
          Where to Vote
        </h2>
        <div className="section-divider" />
        <p className="text-muted-foreground text-lg mt-6 leading-relaxed">
          Make sure you're ready to vote in District 51. Check your registration
          status and polling location using Georgia's official voter portal.
        </p>
        <a
          href="https://mvp.sos.ga.gov/s/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-10 bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
        >
          Check Where I Vote
        </a>
      </motion.div>
    </div>
  </section>
);

export default WhereToVote;
