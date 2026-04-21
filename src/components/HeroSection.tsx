import { motion } from "framer-motion";
import keithHero from "@/assets/keith_suit_navytie.jpeg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative bg-primary overflow-hidden pt-20 md:pt-0"
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 md:gap-10 items-center min-h-[88vh] md:min-h-[86vh]">
          {/* TEXT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="py-8 md:py-20 order-2 md:order-1"
          >
            {/* Top label */}
            <p className="font-heading text-[11px] sm:text-xs md:text-sm font-semibold text-accent tracking-[0.24em] md:tracking-[0.28em] uppercase">
              Republican for State House
              <span className="mx-2 text-accent/60">•</span>
              District 51
            </p>

            {/* Main headline */}
            <h1 className="mt-4 font-heading uppercase leading-[0.92] tracking-tight text-primary-foreground font-bold text-5xl sm:text-6xl md:text-6xl lg:text-7xl xl:text-[5.5rem]">
              Keith Gettmann
            </h1>

            {/* Gold accent line */}
            <span className="block w-14 h-[3px] bg-accent mt-5" aria-hidden="true" />

            {/* Subheadline */}
            <p className="mt-5 text-base sm:text-lg md:text-lg lg:text-xl text-primary-foreground/90 font-body font-light leading-relaxed max-w-lg">
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

          {/* PHOTO COLUMN — Keith fully visible, no overlay */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="relative order-1 md:order-2 h-[360px] sm:h-[440px] md:h-full md:min-h-[86vh]"
          >
            <img
              src={keithHero}
              alt="Keith Gettmann, Republican candidate for Georgia State House District 51"
              className="absolute inset-0 w-full h-full object-cover object-[center_15%] md:object-[center_20%]"
              loading="eager"
            />
            {/* Soft gradient on the left edge to blend image into navy bg on desktop */}
            <div className="hidden md:block absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-primary to-transparent" />
            {/* Subtle bottom fade on mobile so CTAs feel grounded */}
            <div className="md:hidden absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-primary to-transparent" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
