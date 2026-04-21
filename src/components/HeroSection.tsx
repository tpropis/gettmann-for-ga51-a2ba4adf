import { motion } from "framer-motion";
import keithHero from "@/assets/keith_suit_navytie.jpeg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[640px] md:min-h-[88vh] flex items-center overflow-hidden bg-primary"
    >
      {/* Background image — solo candidate, right-anchored */}
      <div className="absolute inset-0">
        {/* Mobile: image as low-opacity backdrop, text takes priority */}
        <img
          src={keithHero}
          alt="Keith Gettmann, Republican candidate for Georgia State House District 51"
          className="hidden md:block w-full h-full object-cover object-[center_top] md:object-[75%_15%] lg:object-[78%_18%]"
          loading="eager"
        />
        {/* Mobile-only image, positioned to show face cleanly */}
        <img
          src={keithHero}
          alt=""
          aria-hidden="true"
          className="md:hidden w-full h-full object-cover object-[center_8%] scale-110"
          loading="eager"
        />

        {/* Mobile overlay — heavy navy for text legibility */}
        <div className="md:hidden absolute inset-0 bg-primary/80" />
        {/* Desktop overlay — left-to-right gradient so face stays visible on right */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-primary via-primary/85 from-0% via-45% to-transparent to-75%" />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-primary/50 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto py-24 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Top label */}
          <p className="font-heading text-[11px] sm:text-xs md:text-sm font-semibold text-accent tracking-[0.24em] md:tracking-[0.28em] uppercase">
            Republican for State House
            <span className="mx-2 text-accent/60">•</span>
            District 51
          </p>

          {/* Main headline */}
          <h1 className="mt-4 font-heading uppercase leading-[0.92] tracking-tight text-primary-foreground font-bold text-[2.75rem] sm:text-6xl md:text-7xl lg:text-[5.5rem]">
            Keith Gettmann
          </h1>

          {/* Gold accent line */}
          <span className="block w-14 h-[3px] bg-accent mt-5" aria-hidden="true" />

          {/* Subheadline */}
          <p className="mt-5 text-base sm:text-lg md:text-xl text-primary-foreground/90 font-body font-light leading-relaxed max-w-xl">
            Fighting for safer communities, stronger schools, and lower costs for Georgia families.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-sm md:text-base font-bold px-8 py-3.5 rounded-md hover:brightness-95 transition-all tracking-wide shadow-lg shadow-accent/30 uppercase text-center"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="border-2 border-primary-foreground/90 text-primary-foreground font-heading text-sm md:text-base font-bold px-8 py-3.5 rounded-md hover:bg-primary-foreground hover:text-primary transition-colors tracking-wide uppercase text-center"
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
