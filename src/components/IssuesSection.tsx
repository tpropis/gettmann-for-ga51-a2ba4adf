import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight } from "lucide-react";
import { issues, type Issue } from "@/data/issues";

const IssueCard = ({ issue }: { issue: Issue }) => {
  const [open, setOpen] = useState(false);
  const panelId = `personal-${issue.id}`;

  return (
    <article className="bg-background border border-border rounded-lg p-6 md:p-8">
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary tracking-tight">
        {issue.name}
      </h3>

      <p className="mt-4 pl-4 border-l-2 border-campaign-red text-foreground/90 text-base md:text-[17px] leading-relaxed">
        {issue.problem}
      </p>

      <p className="mt-6 font-body text-sm font-semibold uppercase tracking-[0.14em] text-campaign-slate">
        Keith Will
      </p>

      <ul className="mt-3 space-y-2.5">
        {issue.commitments.map((c) => (
          <li key={c.text} className="flex gap-2.5">
            <span aria-hidden="true" className="text-accent font-bold leading-relaxed">
              ›
            </span>
            <span className="text-base leading-relaxed">
              <span className="font-semibold text-primary">{c.text}</span>
              {c.note && (
                <span className="ml-1.5 text-[15px] font-normal text-campaign-slate">
                  {c.note}
                </span>
              )}
            </span>
          </li>
        ))}
      </ul>

      {issue.personal && (
        <>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="mt-6 flex items-center gap-2 font-body text-base font-semibold text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            <ChevronDown
              size={18}
              className={`text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
            Why this is personal for me
          </button>

          <AnimatePresence initial={false}>
            {open && (
              <motion.div
                id={panelId}
                initial={{ height: 0 }}
                animate={{ height: "auto" }}
                exit={{ height: 0 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <div className="mt-4 rounded-md bg-muted p-5 space-y-4">
                  {issue.personal.map((p, i) => (
                    <p
                      key={i}
                      className="italic text-foreground/90 text-base leading-relaxed"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}

      <a
        href={issue.readMoreHref}
        className="mt-6 inline-flex items-center gap-1 font-body text-base font-semibold text-campaign-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
      >
        Read more
        <ChevronRight size={16} aria-hidden="true" />
      </a>
    </article>
  );
};

const IssuesSection = () => {
  return (
    <section id="issues" className="py-16 md:py-24 bg-background">
      <div className="container mx-auto max-w-3xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight"
        >
          Five Issues
        </motion.h2>
        <div className="w-16 h-[3px] bg-accent mt-4" />

        <div className="mt-10 space-y-8 md:space-y-10">
          {issues.map((issue) => (
            <IssueCard key={issue.id} issue={issue} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default IssuesSection;
