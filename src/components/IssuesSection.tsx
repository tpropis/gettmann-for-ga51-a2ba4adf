import { GraduationCap, DollarSign, ShieldCheck, Scale } from "lucide-react";
import { motion } from "framer-motion";

const issues = [
  {
    icon: GraduationCap,
    title: "Education",
    description: "Parents deserve transparency, accountability, and a voice in their children's education. Keith will fight for local control, parental rights, and high standards in every classroom.",
  },
  {
    icon: DollarSign,
    title: "Affordability",
    description: "Georgia families need relief from inflation, higher costs, and government overreach. Keith will push for lower taxes, responsible budgets, and policies that let families keep more of what they earn.",
  },
  {
    icon: ShieldCheck,
    title: "Election Integrity",
    description: "Secure elections and restored voter confidence are essential to our democracy. Keith supports common-sense safeguards that protect every legal vote.",
  },
  {
    icon: Scale,
    title: "Public Safety",
    description: "Strong communities require support for law enforcement and safe neighborhoods. Keith backs our police, prosecutors, and the rule of law to keep families protected.",
  },
];

const IssuesSection = () => (
  <section id="issues" className="py-24 md:py-36 bg-secondary">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
          The Issues
        </h2>
        <div className="section-divider" />
        <p className="text-center text-muted-foreground mt-6 max-w-xl mx-auto text-lg leading-relaxed">
          Keith is focused on the issues that matter most to the families of District 51.
        </p>
      </motion.div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {issues.map((issue, i) => (
          <motion.div
            key={issue.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-background rounded-lg p-10 shadow-sm hover:shadow-xl transition-shadow border border-border/50 group"
          >
            <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-6 group-hover:bg-accent/10 transition-colors">
              <issue.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
            </div>
            <h3 className="font-heading text-xl font-bold text-primary uppercase tracking-wide">
              {issue.title}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              {issue.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default IssuesSection;
