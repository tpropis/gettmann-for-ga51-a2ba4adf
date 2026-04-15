import { Heart, GraduationCap, Shield, DollarSign } from "lucide-react";
import { motion } from "framer-motion";

const items = [
  { icon: Heart, label: "Family First" },
  { icon: GraduationCap, label: "Strong Schools" },
  { icon: Shield, label: "Safe Communities" },
  { icon: DollarSign, label: "Lower Taxes" },
];

const TrustBar = () => (
  <section className="bg-primary py-8 border-t border-primary-foreground/5">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="flex flex-wrap justify-center gap-10 md:gap-20"
      >
        {items.map((item) => (
          <div key={item.label} className="flex items-center gap-3">
            <item.icon className="h-5 w-5 text-accent" />
            <span className="font-heading text-primary-foreground/90 text-base font-semibold uppercase tracking-[0.15em]">
              {item.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default TrustBar;
