import { motion } from "framer-motion";
import { MessageSquareHeart, ArrowRight } from "lucide-react";

const CommunityCouncilSection = () => {
  return (
    <section id="community-council" className="py-16 md:py-22 bg-campaign-light">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
            <MessageSquareHeart className="w-8 h-8 text-primary" />
          </div>
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-tight">
            Community Council
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mb-6" />
          <p className="text-lg md:text-xl text-foreground/80 font-body mb-8 leading-relaxed">
            Share your concerns, ideas, and priorities directly with Keith.
          </p>
          <a
            href="/community-council"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading text-base md:text-lg font-bold px-8 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20 uppercase"
          >
            Submit Your Input
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityCouncilSection;
