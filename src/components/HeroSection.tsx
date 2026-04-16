import { motion } from "framer-motion";
import familyPic from "@/assets/family_pic.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[700px] md:min-h-[92vh] flex items-center overflow-hidden">
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

      <div className="relative container mx-auto px-4 pt-40 pb-28 md:pt-44 md:pb-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          {/* Headline */}
          <h1 className="font-heading uppercase leading-none tracking-tight">
            <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-primary-foreground">
              Keith
            </span>
            <span className="block text-7xl sm:text-8xl md:text-9xl lg:text-[10rem] font-bold text-primary-foreground">
              Gettmann
            </span>
            {/* Gold accent line */}
            <span className="block w-28 h-1 bg-accent mt-6 mb-5" aria-hidden="true" />
            <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-accent tracking-[0.2em]">
              FOR GEORGIA HOUSE
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-12 text-xl md:text-2xl text-primary-foreground/90 font-body font-light leading-relaxed max-w-xl">
            Protecting Families. Defending Freedom.
            <br />
            Fighting for District 51.
          </p>

          {/* CTA Buttons */}
          <div className="mt-12 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/25 uppercase"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="bg-primary-foreground text-primary font-heading text-lg font-bold px-10 py-4 rounded-md hover:bg-primary-foreground/90 transition-all tracking-wide shadow-lg uppercase"
            >
              Join the Campaign
            </a>
            <a
              href="#issues"
              className="border-2 border-primary-foreground/80 text-primary-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:bg-primary-foreground/10 transition-colors tracking-wide uppercase"
            >
              The Issues
            </a>
          </div>

          {/* Supporting line */}
          <p className="mt-14 text-primary-foreground/60 font-body text-sm tracking-[0.15em] uppercase font-medium max-w-lg">
            Focused on strong schools, safe communities, lower taxes, and election integrity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
