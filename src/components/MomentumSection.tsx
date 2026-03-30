import { Users, DollarSign, CalendarDays, Home } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { icon: Users, value: "350+", label: "Volunteers Joined" },
  { icon: DollarSign, value: "$85K+", label: "Donations Raised" },
  { icon: CalendarDays, value: "40+", label: "Events Attended" },
  { icon: Home, value: "5,000+", label: "Doors Knocked" },
];

const MomentumSection = () => (
  <section className="py-20 md:py-28 bg-campaign-light">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight text-center">
          Campaign Momentum
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4" />
      </motion.div>

      <div className="mt-14 grid grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background rounded-lg p-8 text-center shadow-sm"
          >
            <stat.icon className="h-8 w-8 text-accent mx-auto mb-3" />
            <div className="font-heading text-4xl font-bold text-primary">{stat.value}</div>
            <div className="text-muted-foreground text-sm mt-1 font-semibold uppercase tracking-wide">
              {stat.label}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="text-center mt-12">
        <a
          href="#get-involved"
          className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-campaign-gold-dark transition-colors tracking-wide"
        >
          Help Build Momentum
        </a>
      </div>
    </div>
  </section>
);

export default MomentumSection;
