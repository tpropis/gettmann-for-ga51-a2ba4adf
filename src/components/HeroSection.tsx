import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import keithHero from "@/assets/keith_hero_clean.jpg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen bg-primary overflow-hidden"
    >
      {/* Background Image - Positioned to show Keith on the right */}
      <div className="absolute inset-0">
        <img
          src={keithHero}
          alt="Keith Gettmann"
          className="w-full h-full object-cover object-[65%_center]"
          loading="eager"
        />
        {/* Dark navy overlay for text readability - 60% on left, gradient to lighter on right */}
        <div 
          className="absolute inset-0"
          style={{
            background: `linear-gradient(90deg, 
              rgba(0, 48, 86, 0.85) 0%, 
              rgba(0, 48, 86, 0.75) 35%, 
              rgba(0, 48, 86, 0.4) 55%, 
              rgba(0, 48, 86, 0.1) 70%, 
              transparent 100%)`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 min-h-screen flex items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          {/* Top Label */}
          <p className="font-heading text-xs sm:text-sm font-semibold text-accent tracking-[0.2em] uppercase mb-4">
            Republican for State House • District 51
          </p>

          {/* Main Headline */}
          <h1 className="font-heading uppercase leading-[0.95] tracking-tight text-primary-foreground font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
            Keith
            <br />
            <span className="text-accent">Gettmann</span>
          </h1>

          {/* Gold accent line */}
          <span className="block w-16 h-[3px] bg-accent mt-6 mb-6" aria-hidden="true" />

          {/* Subheadline */}
          <p className="text-base sm:text-lg text-primary-foreground/90 font-body leading-relaxed max-w-lg">
            Fighting for safer communities, stronger schools, and lower costs for Georgia families.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#donate"
              className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading text-sm font-bold px-8 py-4 rounded-md hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/40 uppercase"
            >
              Donate Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/80 text-primary-foreground font-heading text-sm font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-colors tracking-wide uppercase"
            >
              Join the Campaign
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
