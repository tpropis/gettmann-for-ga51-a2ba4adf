import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, X, ChevronDown, ChevronRight } from "lucide-react";
import { comparisonRows, type ComparisonRow, type Position } from "@/data/positionComparison";

const positionLabel: Record<Position, string> = {
  support: "Supports",
  oppose: "Opposes",
  none: "No published position",
};

const Mark = ({ value }: { value: Position }) => {
  if (value === "support") {
    return (
      <span
        role="img"
        aria-label={positionLabel.support}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-primary text-primary-foreground"
      >
        <Check size={14} strokeWidth={3} aria-hidden="true" />
      </span>
    );
  }
  if (value === "oppose") {
    return (
      <span
        role="img"
        aria-label={positionLabel.oppose}
        className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-campaign-red text-campaign-red"
      >
        <X size={14} strokeWidth={2} aria-hidden="true" />
      </span>
    );
  }
  return (
    <span
      role="img"
      aria-label={positionLabel.none}
      className="inline-flex h-6 w-6 items-center justify-center text-campaign-slate"
    >
      —
    </span>
  );
};

const columns = [
  { key: "gop" as const, label: "Georgia Republicans" },
  { key: "keith" as const, label: "Keith Gettmann" },
  { key: "panitch" as const, label: "Rep. Panitch" },
];

const RowBlock = ({ row }: { row: ComparisonRow }) => {
  const [open, setOpen] = useState(false);
  const panelId = `cmp-${row.id}`;

  const details = (contentId: string) => (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={contentId}
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          transition={{ duration: 0.25, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="pt-3 space-y-2">
            <p className="text-base leading-relaxed text-foreground/90">{row.detail}</p>
            {row.readMoreHref && (
              <a
                href={row.readMoreHref}
                className="inline-flex items-center gap-1 font-body text-base font-semibold text-campaign-red hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
              >
                Read more
                <ChevronRight size={16} aria-hidden="true" />
              </a>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <>
      {/* Desktop row */}
      <div className="hidden md:grid grid-cols-[minmax(0,1.6fr)_1fr_1.15fr_1fr] items-start gap-4 border-t border-border py-5">
        <div>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls={panelId}
            className="flex items-start gap-2 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
          >
            <ChevronDown
              size={18}
              className={`mt-1 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              aria-hidden="true"
            />
            <span className="font-semibold text-primary text-base leading-snug">
              {row.issue}
            </span>
          </button>
          <p className="mt-2 pl-7 text-sm text-campaign-slate leading-relaxed">{row.source}</p>
          <div className="pl-7">{details}</div>
        </div>
        {columns.map((col) => (
          <div
            key={col.key}
            className={`flex justify-center pt-1 ${
              col.key === "keith" ? "bg-primary/5 rounded-md py-2" : ""
            }`}
          >
            <Mark value={row[col.key]} />
          </div>
        ))}
      </div>

      {/* Mobile card */}
      <div className="md:hidden border border-border rounded-lg p-5">
        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls={`${panelId}-m`}
          className="flex items-start gap-2 text-left w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded"
        >
          <ChevronDown
            size={18}
            className={`mt-1 shrink-0 text-accent transition-transform duration-200 ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
          <span className="font-semibold text-primary text-base leading-snug">{row.issue}</span>
        </button>

        <dl className="mt-4 space-y-1">
          {columns.map((col) => (
            <div
              key={col.key}
              className={`flex items-center justify-between gap-4 px-3 py-2 rounded-md ${
                col.key === "keith" ? "bg-primary/5" : ""
              }`}
            >
              <dt className="text-base text-foreground/90">{col.label}</dt>
              <dd>
                <Mark value={row[col.key]} />
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-3 text-sm text-campaign-slate leading-relaxed">{row.source}</p>
        <div id={`${panelId}-m`}>{details}</div>
      </div>
    </>
  );
};

const Group = ({ title, group }: { title: string; group: "agree" | "differ" }) => {
  const rows = comparisonRows.filter((r) => r.group === group);
  if (rows.length === 0) return null;

  return (
    <div className="mt-10">
      <h3 className="font-heading text-lg font-bold uppercase tracking-[0.14em] text-campaign-slate">
        {title}
      </h3>

      {/* Desktop column headers */}
      <div className="hidden md:grid grid-cols-[minmax(0,1.6fr)_1fr_1.15fr_1fr] gap-4 mt-4">
        <span className="sr-only">Issue</span>
        {columns.map((col) => (
          <div
            key={col.key}
            className={`text-center font-body text-sm font-semibold uppercase tracking-wider ${
              col.key === "keith"
                ? "text-primary border-t-2 border-accent pt-2"
                : "text-campaign-slate pt-2"
            }`}
          >
            {col.label}
          </div>
        ))}
      </div>

      <div className="mt-2 space-y-4 md:space-y-0">
        {rows.map((row) => (
          <RowBlock key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
};

const PositionComparison = () => {
  return (
    <section id="comparison" className="py-16 md:py-24 bg-secondary">
      <div className="container mx-auto max-w-4xl px-4">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight"
        >
          Where we agree. Where we don't.
        </motion.h2>
        <div className="w-16 h-[3px] bg-accent mt-4" />
        <p className="mt-4 text-base md:text-[17px] text-foreground/90 leading-relaxed max-w-2xl">
          District 51 deserves a straight comparison. Most of the record is agreement —
          the differences are few, specific, and traceable to a bill.
        </p>

        <Group title="Where all three agree" group="agree" />
        <Group title="Where we differ" group="differ" />

        <p className="mt-10 text-sm text-campaign-slate leading-relaxed">
          Positions are drawn from Georgia General Assembly records and from each
          candidate's published campaign materials. Where a candidate has taken no public
          position, this chart says so rather than guessing.
        </p>
      </div>
    </section>
  );
};

export default PositionComparison;
