import { useState } from "react";
import { ShieldCheck, GraduationCap, TrendingUp, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const issues = [
  {
    icon: ShieldCheck,
    title: "Public Safety",
    description:
      "Strong communities start with safe neighborhoods and well-supported law enforcement. Keith is committed to protecting families and restoring confidence in public safety.",
    details:
      "Keith backs our police and first responders, supports recruitment and retention, and stands for the rule of law so families across District 51 feel secure at home, at school, and on the road.",
    accentClass: "group-hover:border-t-accent",
    iconBg: "bg-accent/10 group-hover:bg-accent/20",
    iconColor: "text-accent",
  },
  {
    icon: GraduationCap,
    title: "Education",
    description:
      "Parents deserve transparency, accountability, and a real voice in their children's education. Keith will fight to put families back in control.",
    details:
      "Keith will fight for parental rights, local control of schools, and high academic standards — making sure every child in District 51 has the opportunity to succeed.",
    accentClass: "group-hover:border-t-primary",
    iconBg: "bg-primary/10 group-hover:bg-primary/20",
    iconColor: "text-primary",
  },
  {
    icon: TrendingUp,
    title: "Lower Taxes & Economy",
    description:
      "Families are feeling the pressure of rising costs. Keith supports responsible spending and lower taxes to keep more money in your pocket.",
    details:
      "Keith will push for lower taxes, responsible budgets, and a pro-growth environment that supports small businesses and lets families keep more of what they earn.",
    accentClass: "group-hover:border-t-campaign-brown",
    iconBg: "bg-campaign-brown/10 group-hover:bg-campaign-brown/20",
    iconColor: "text-campaign-brown",
  },
];

const IssuesSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="issues" className="py-10 md:py-14 bg-secondary">
      <div className="container mx-auto max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase tracking-tight text-center">
            The Issues
          </h2>
          <div className="section-divider" />
          <p className="text-center text-muted-foreground mt-4 max-w-xl mx-auto text-base md:text-lg leading-relaxed">
            Keith is focused on what matters most to the families of District 51.
          </p>
        </motion.div>

        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {issues.map((issue, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={issue.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`group relative bg-background rounded-lg p-6 md:p-7 shadow-sm hover:shadow-xl transition-all border border-border/50 border-t-2 border-t-transparent ${issue.accentClass} flex flex-col text-left`}
              >
                <div className={`w-12 h-12 rounded-full ${issue.iconBg} flex items-center justify-center mb-4 transition-colors`}>
                  <issue.icon className={`h-6 w-6 ${issue.iconColor} transition-colors`} />
                </div>
                <h3 className="font-heading text-lg md:text-xl font-bold text-primary uppercase tracking-wide">
                  {issue.title}
                </h3>
                <p className="mt-2.5 text-muted-foreground leading-relaxed text-sm md:text-base">
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
                      <p className="mt-3 text-muted-foreground leading-relaxed text-sm md:text-base border-l-2 border-accent pl-4">
                        {issue.details}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>

                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="mt-4 inline-flex items-center gap-2 self-start font-heading text-xs md:text-sm font-bold text-primary uppercase tracking-wider hover:text-accent transition-colors"
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
