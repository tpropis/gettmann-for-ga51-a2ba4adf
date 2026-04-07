import { motion } from "framer-motion";
import familyPic from "@/assets/family_pic.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[700px] md:min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image — full bleed, faces preserved */}
      <div className="absolute inset-0">
        <img
          src={familyPic}
          alt="Keith Gettmann with his family"
          className="w-full h-full object-cover scale-x-[-1] object-[70%_20%] sm:object-[60%_20%] md:object-[55%_20%]"
          loading="eager"
        />
        {/* Left-side gradient — lighter to let the family shine through */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary/75 via-primary/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/25 via-transparent to-transparent" />
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
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary-foreground">
              Keith
            </span>
            <span className="block text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-bold text-primary-foreground">
              Gettmann
            </span>
            {/* Gold accent line */}
            <span className="block w-24 h-1 bg-accent mt-5 mb-4" aria-hidden="true" />
            <span className="block text-2xl sm:text-3xl md:text-4xl font-semibold text-accent tracking-widest">
              FOR GEORGIA HOUSE
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mt-10 text-xl md:text-2xl text-primary-foreground font-body font-light leading-relaxed max-w-xl">
            Protecting Families. Defending Freedom.
            <br />
            Fighting for District 51.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded hover:brightness-110 transition-all tracking-wide shadow-lg shadow-accent/30 uppercase"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="border-2 border-primary-foreground text-primary-foreground font-heading text-lg font-bold px-10 py-4 rounded hover:bg-primary-foreground/15 transition-colors tracking-wide uppercase"
            >
              Join the Campaign
            </a>
            <a
              href="#meet-keith"
              className="border-2 border-primary-foreground/60 text-primary-foreground/90 font-heading text-lg font-bold px-10 py-4 rounded hover:bg-primary-foreground/15 transition-colors tracking-wide uppercase"
            >
              Meet Keith
            </a>
          </div>

          {/* Supporting line */}
          <p className="mt-12 text-primary-foreground/70 font-body text-sm tracking-widest uppercase font-medium max-w-lg">
            Focused on strong schools, safe communities, lower taxes, and election integrity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
