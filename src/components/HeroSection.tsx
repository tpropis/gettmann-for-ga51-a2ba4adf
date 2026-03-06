import { motion } from "framer-motion";
import familyPic from "@/assets/family_pic.jpg";

const HeroSection = () => {
  return (
    <section id="home" className="relative min-h-[92vh] flex items-center overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <img
          src={familyPic}
          alt="Keith Gettmann with family"
          className="w-full h-full object-cover object-center"
          style={{ objectPosition: '50% 30%' }}
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/95 via-primary/80 to-primary/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
      </div>

      <div className="relative container mx-auto px-4 pt-36 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-2xl"
        >
          <h1 className="font-heading text-5xl md:text-7xl font-bold text-primary-foreground uppercase leading-[1.05] tracking-tight">
            Keith Gettmann
            <span className="block text-3xl md:text-4xl mt-3 font-semibold text-accent">
              for Georgia House
            </span>
          </h1>

          <p className="mt-8 text-xl md:text-2xl text-primary-foreground font-body font-light leading-relaxed max-w-xl">
            Protecting Families. Defending Freedom. Fighting for District 51.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href="#donate"
              className="bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-campaign-red-dark transition-colors tracking-wide shadow-lg shadow-accent/25"
            >
              Donate Now
            </a>
            <a
              href="#get-involved"
              className="bg-primary-foreground/10 border-2 border-primary-foreground text-primary-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-primary-foreground/20 transition-colors tracking-wide"
            >
              Join the Campaign
            </a>
            <a
              href="#meet-keith"
              className="bg-primary-foreground/10 border-2 border-primary-foreground/50 text-primary-foreground/90 font-heading text-lg font-bold px-8 py-4 rounded hover:bg-primary-foreground/20 transition-colors tracking-wide"
            >
              Meet Keith
            </a>
          </div>

          <p className="mt-10 text-primary-foreground/70 font-body text-sm tracking-wide uppercase font-medium">
            Focused on strong schools, safe communities, lower taxes, and election integrity.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
