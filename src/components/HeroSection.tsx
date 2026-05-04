import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import keithHero from "@/assets/keith_hero_v2.jpg";
import seal from "@/assets/hero_seal.png";
import { trackDonateClick } from "@/lib/analytics";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-[88vh] lg:min-h-[92vh] bg-primary overflow-hidden"
    >
      {/* Solid navy base */}
      <div className="absolute inset-0 bg-primary" />

      {/* Gold seal — soft ornament tucked into the far bottom-right corner, never overlapping the portrait */}
      <div
        className="absolute pointer-events-none select-none hidden xl:block"
        style={{
          bottom: "-18%",
          right: "-14%",
          width: "min(560px, 36vw)",
          aspectRatio: "1 / 1",
          opacity: 0.08,
          filter: "blur(1px)",
        }}
        aria-hidden="true"
      >
        <img src={seal} alt="" className="w-full h-full object-contain" />
      </div>

      {/* Keith portrait — anchored bottom-right, never cropped at the head */}
      <div className="absolute inset-y-0 right-0 w-full md:w-[65%] lg:w-[58%] xl:w-[55%]">
        <img
          src={keithHero}
          alt="Keith Gettmann, Republican candidate for Georgia State House District 51"
          className="w-full h-full object-cover object-[center_top] md:object-[60%_top]"
          loading="eager"
        />
        {/* Left-edge feather so the portrait blends into the navy panel */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(90deg,
              hsl(var(--primary)) 0%,
              hsl(var(--primary) / 0.85) 12%,
              hsl(var(--primary) / 0.35) 28%,
              hsl(var(--primary) / 0) 50%)`,
          }}
        />
        {/* Subtle bottom vignette to ground the portrait */}
        <div
          className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
          style={{
            background: `linear-gradient(180deg, hsl(var(--primary) / 0) 0%, hsl(var(--primary) / 0.55) 100%)`,
          }}
        />
      </div>

      {/* Mobile-only top-to-bottom navy overlay for text legibility */}
      <div
        className="absolute inset-0 md:hidden pointer-events-none"
        style={{
          background: `linear-gradient(180deg, hsl(var(--primary) / 0.95) 0%, hsl(var(--primary) / 0.55) 55%, hsl(var(--primary) / 0.85) 100%)`,
        }}
      />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 max-w-[1100px] min-h-[88vh] lg:min-h-[92vh] flex items-center py-20 lg:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          {/* Top Label */}
          <p className="font-heading text-sm sm:text-base font-semibold text-accent tracking-[0.24em] uppercase mb-4">
            Republican for State House • District 51
          </p>

          {/* Main Headline */}
          <h1 className="font-heading uppercase leading-[0.88] tracking-normal text-primary-foreground font-bold text-5xl sm:text-6xl md:text-[5.4rem] lg:text-[6.8rem] xl:text-[7.4rem]">
            Keith
            <br />
            <span className="text-accent">Gettmann</span>
          </h1>

          {/* Gold accent line */}
          <span className="block w-20 h-[4px] bg-accent mt-5 mb-5" aria-hidden="true" />

          {/* Subheadline */}
          <p className="text-lg sm:text-xl md:text-2xl text-primary-foreground/90 font-body leading-relaxed max-w-xl">
            Fighting for safer communities, stronger schools, and lower costs for Georgia families.
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <a
              href="#donate"
              onClick={() => trackDonateClick("hero", "Donate Now")}
              className="group inline-flex items-center justify-center gap-3 bg-accent text-accent-foreground font-heading text-base font-bold px-9 py-4 rounded-md hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/40 uppercase"
            >
              Donate Now
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </a>
            <a
              href="#get-involved"
              className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/80 text-primary-foreground font-heading text-base font-bold px-9 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-colors tracking-wide uppercase"
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
