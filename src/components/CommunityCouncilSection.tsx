import { motion } from "framer-motion";
import { MessageSquareHeart, ArrowRight } from "lucide-react";

const CommunityCouncilSection = () => {
  return (
    <section id="community-council" className="py-10 md:py-12 bg-campaign-light">
      <div className="container mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto text-center"
        >
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-accent/10 ring-1 ring-accent/30 mb-5">
            <MessageSquareHeart className="w-7 h-7 text-accent" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase tracking-tight">
            Your Voice Matters
          </h2>
          <div className="w-16 h-[3px] bg-accent mx-auto mt-4 mb-5" />
          <p className="text-base md:text-lg text-foreground/75 font-body mb-6 leading-relaxed max-w-xl mx-auto">
            Share your concerns, ideas, and priorities directly with Keith — and help shape the future of District 51.
          </p>
          <a
            href="/community-council"
            className="inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading text-base font-bold px-8 py-3.5 rounded-md hover:brightness-95 transition-all tracking-wide shadow-lg shadow-accent/25 uppercase"
          >
            Share Your Input
            <ArrowRight className="w-5 h-5" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default CommunityCouncilSection;
