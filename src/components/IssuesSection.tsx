import { useState } from "react";
import { ShieldCheck, GraduationCap, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const issues = [
  {
    icon: ShieldCheck,
    title: "Public Safety",
    description:
      "Strong communities require well-supported law enforcement and safe neighborhoods.",
    details:
      "Keith backs our police and first responders, supports recruitment and retention, and stands for the rule of law so families across District 51 feel secure at home, at school, and on the road.",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Parents deserve transparency, accountability, and a real voice in their children's education.",
    details:
      "Keith will fight for parental rights, local control of schools, and high academic standards — making sure every child in District 51 has the opportunity to succeed.",
  },
  {
    icon: TrendingUp,
    title: "Economy / Lower Taxes",
    description:
      "Families need relief from rising costs and government overreach.",
    details:
      "Keith will push for lower taxes, responsible budgets, and a pro-growth environment that supports small businesses and lets families keep more of what they earn.",
  },
];

const IssuesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="issues" className="py-20 md:py-28 bg-secondary">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
            The Issues
          </h2>
          <div className="section-divider" />
          <p className="text-center text-muted-foreground mt-5 max-w-xl mx-auto text-lg leading-relaxed">
            Keith is focused on what matters most to the families of District 51.
          </p>
        </motion.div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {issues.map((issue, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-background rounded-lg p-8 shadow-sm hover:shadow-xl transition-shadow border border-border/50 group flex flex-col"
              >
                <div className="w-14 h-14 rounded-full bg-primary/5 flex items-center justify-center mb-5 group-hover:bg-accent/10 transition-colors">
                  <issue.icon className="h-7 w-7 text-primary group-hover:text-accent transition-colors" />
                </div>
                <h3 className="font-heading text-xl font-bold text-primary uppercase tracking-wide">
                  {issue.title}
                </h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">
                  {issue.description}
                </p>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <p className="mt-4 text-muted-foreground leading-relaxed border-l-2 border-accent pl-4">
                        {issue.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="mt-5 inline-flex items-center gap-2 self-start font-heading text-sm font-bold text-primary uppercase tracking-wider hover:text-accent transition-colors"
                >
                  {isOpen ? "Show Less" : "Learn More"}
                  <ChevronDown
                    className={`w-4 h-4 transition-transform ${isOpen ? "rotate-180" : ""}`}
                  />
                </button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default IssuesSection;
