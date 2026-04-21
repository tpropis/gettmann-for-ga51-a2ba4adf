import { motion } from "framer-motion";
import familyPic from "@/assets/family_pic.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[620px] md:min-h-[82vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={familyPic}
          alt="Keith Gettmann with his family"
          className="w-full h-full object-cover scale-x-[-1] object-[8%_15%] sm:object-[12%_18%] md:object-[18%_20%] lg:object-[55%_20%]"
          loading="eager"
        />
        {/* Stronger dark overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/60 to-primary/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-primary/10" />
      </div>

      <div className="relative container mx-auto pt-32 pb-20 md:pt-36 md:pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          {/* Headline */}
          <h1 className="font-heading uppercase leading-[0.95] tracking-tight">
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-[7.5rem] font-bold text-primary-foreground">
              Keith Gettmann
            </span>
            {/* Gold accent line */}
            <span className="block w-24 h-1 bg-accent mt-5 mb-4" aria-hidden="true" />
            <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-accent tracking-[0.2em]">
              FOR STATE HOUSE
            </span>
            <span className="block text-xl sm:text-2xl md:text-3xl font-semibold text-primary-foreground/90 tracking-[0.2em] mt-2">
              DISTRICT 51
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-8 text-lg md:text-xl text-primary-foreground/90 font-body font-light leading-relaxed max-w-xl">
            Protecting Families. Defending Freedom.
            <br />
            Fighting for District 51.
          </p>

          {/* CTA Buttons */}
          <div className="mt-9 flex flex-wrap gap-3">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-base md:text-lg font-bold px-8 py-3.5 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/25 uppercase"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="bg-primary-foreground text-primary font-heading text-base md:text-lg font-bold px-8 py-3.5 rounded-md hover:bg-primary-foreground/90 transition-all tracking-wide shadow-lg uppercase"
            >
              Join the Campaign
            </a>
            <a
              href="#issues"
              className="border-2 border-primary-foreground/80 text-primary-foreground font-heading text-base md:text-lg font-bold px-8 py-3.5 rounded-md hover:bg-primary-foreground/10 transition-colors tracking-wide uppercase"
            >
              The Issues
            </a>
          </div>

          {/* Supporting line */}
          <p className="mt-10 text-primary-foreground/60 font-body text-sm tracking-[0.15em] uppercase font-medium max-w-lg">
            Strong schools. Safe communities. Lower taxes. Election integrity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
