import { motion } from "framer-motion";
import familyPic from "@/assets/family_pic.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[560px] md:min-h-[78vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={familyPic}
          alt="Keith Gettmann with his family"
          className="w-full h-full object-cover scale-x-[-1] object-[8%_15%] sm:object-[12%_18%] md:object-[18%_20%] lg:object-[55%_20%]"
          loading="eager"
        />
        {/* Subtle dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/65 to-primary/25" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/35 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto pt-28 pb-16 md:pt-32 md:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-xl"
        >
          {/* Headline */}
          <h1 className="font-heading uppercase leading-[0.95] tracking-tight">
            <span className="block text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-primary-foreground">
              Keith Gettmann
            </span>
            {/* Gold accent line */}
            <span className="block w-16 h-1 bg-accent mt-4 mb-3" aria-hidden="true" />
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-accent tracking-[0.2em]">
              FOR STATE HOUSE
            </span>
            <span className="block text-base sm:text-lg md:text-xl font-semibold text-primary-foreground/90 tracking-[0.22em] mt-1.5">
              DISTRICT 51
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-6 text-base md:text-lg text-primary-foreground/90 font-body font-light leading-relaxed max-w-md">
            Protecting Families. Defending Freedom. Fighting for District 51.
          </p>

          {/* CTA Buttons */}
          <div className="mt-7 flex flex-wrap gap-3">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-sm md:text-base font-bold px-7 py-3 rounded-md hover:brightness-90 transition-all tracking-wide shadow-md shadow-accent/25 uppercase"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="border-2 border-primary-foreground/80 text-primary-foreground font-heading text-sm md:text-base font-bold px-7 py-3 rounded-md hover:bg-primary-foreground/10 transition-colors tracking-wide uppercase"
            >
              Join the Campaign
            </a>
          </div>

          {/* Supporting line */}
          <p className="mt-8 text-primary-foreground/60 font-body text-xs tracking-[0.18em] uppercase font-medium max-w-md">
            Strong schools · Safe communities · Lower taxes · Election integrity
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
