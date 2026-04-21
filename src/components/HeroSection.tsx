import { motion } from "framer-motion";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import keithHero from "@/assets/keith_suit_bluetie.jpeg";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative bg-primary overflow-hidden pt-24 md:pt-0"
    >
      {/* Soft radial accent */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, hsl(var(--accent)) 0%, transparent 45%)",
        }}
      />

      <div className="container mx-auto relative">
        <div className="grid md:grid-cols-12 gap-8 md:gap-12 items-center min-h-[92vh] md:min-h-[88vh] py-10 md:py-0">
          {/* TEXT COLUMN */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7 order-2 md:order-1"
          >
            {/* Eyebrow pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-accent/40 bg-accent/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <p className="font-heading text-[10.5px] sm:text-xs font-semibold text-accent tracking-[0.22em] uppercase">
                Republican • Georgia State House • District 51
              </p>
            </div>

            {/* Headline */}
            <h1 className="mt-5 font-heading uppercase leading-[0.92] tracking-tight text-primary-foreground font-bold text-[2.75rem] sm:text-6xl md:text-[4.25rem] lg:text-[5rem] xl:text-[5.75rem]">
              Keith
              <br />
              <span className="text-accent">Gettmann</span>
            </h1>

            {/* Gold accent line */}
            <span className="block w-16 h-[3px] bg-accent mt-6" aria-hidden="true" />

            {/* Subheadline — friendlier */}
            <p className="mt-5 text-base sm:text-lg md:text-xl text-primary-foreground/90 font-body leading-relaxed max-w-xl">
              A neighbor, family man, and proven leader fighting for{" "}
              <span className="text-primary-foreground font-semibold">safer communities</span>,{" "}
              <span className="text-primary-foreground font-semibold">stronger schools</span>, and{" "}
              <span className="text-primary-foreground font-semibold">lower costs</span> for Georgia families.
            </p>

            {/* CTA Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-3">
              <a
                href="#donate"
                className="group inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading text-sm md:text-base font-bold px-8 py-4 rounded-md hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/40 uppercase"
              >
                Donate Now
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
              </a>
              <a
                href="#get-involved"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/80 text-primary-foreground font-heading text-sm md:text-base font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-colors tracking-wide uppercase"
              >
                Join the Campaign
              </a>
            </div>

            {/* Trust strip */}
            <div className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-primary-foreground/80 text-xs sm:text-sm font-body">
              <span className="inline-flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-accent" />
                Lifelong North Georgia
              </span>
              <span className="hidden sm:inline text-primary-foreground/30">|</span>
              <span className="inline-flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                Husband, Father, Grandfather of 11
              </span>
            </div>
          </motion.div>

          {/* PHOTO COLUMN — friendly outdoor portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="md:col-span-5 order-1 md:order-2 relative flex justify-center md:justify-end"
          >
            <div className="relative w-full max-w-[320px] sm:max-w-[380px] md:max-w-none">
              {/* Decorative frame */}
              <div
                aria-hidden="true"
                className="absolute -top-3 -right-3 w-full h-full rounded-2xl border-2 border-accent hidden md:block"
              />
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-primary-foreground/10">
                <img
                  src={keithHero}
                  alt="Keith Gettmann, candidate for Georgia State House District 51"
                  className="w-full h-[420px] sm:h-[500px] md:h-[580px] lg:h-[640px] object-cover object-[center_15%]"
                  loading="eager"
                />
                {/* Subtle bottom gradient for caption legibility */}
                <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-primary/85 via-primary/40 to-transparent" />
                {/* Name caption */}
                <div className="absolute bottom-4 left-5 right-5">
                  <p className="font-heading text-primary-foreground text-sm md:text-base font-bold uppercase tracking-wider">
                    Keith Gettmann
                  </p>
                  <p className="text-primary-foreground/85 text-[11px] md:text-xs font-body">
                    Candidate · Georgia House District 51
                  </p>
                </div>
                {/* Gold corner accent */}
                <div className="absolute top-0 left-0 w-12 h-1 bg-accent" />
                <div className="absolute top-0 left-0 w-1 h-12 bg-accent" />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
