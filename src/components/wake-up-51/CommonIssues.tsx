import { ExternalLink } from "lucide-react";
import { trackEvent } from "@/lib/analytics";

interface IssueFile {
  /** Terminal-style case ID to match the intrusion sweep. */
  id: string;
  title: string;
  status: string;
  detail: string;
  source: string;
  href: string;
}

/**
 * "Common Issues in District 51" — terminal case files shown after the reveal.
 * Every link points to an official primary source (state agency or county).
 * Do NOT add a claim here that its linked source does not itself publish.
 */
const ISSUE_FILES: IssueFile[] = [
  {
    id: "51-001",
    title: "Property taxes & assessments",
    status: "REASSESSED",
    detail:
      "Annual notices of assessment set the value your county bills against. Georgia's Department of Revenue publishes how assessments, appeals and exemptions work.",
    source: "GA Department of Revenue",
    href: "https://dor.georgia.gov/property-tax",
  },
  {
    id: "51-002",
    title: "State income tax",
    status: "WITHHELD",
    detail:
      "Georgia's individual income tax rates, brackets and filing rules are published by the Department of Revenue.",
    source: "GA Department of Revenue",
    href: "https://dor.georgia.gov/taxes/individual-taxes",
  },
  {
    id: "51-003",
    title: "Traffic & road projects",
    status: "CONGESTED",
    detail:
      "GA-400, Roswell Road and the rest of the corridor are tracked in GDOT's project and construction reporting.",
    source: "Georgia Department of Transportation",
    href: "https://www.dot.ga.gov/",
  },
  {
    id: "51-004",
    title: "Schools & parental rights",
    status: "REVIEW REQUIRED",
    detail:
      "School report cards, testing results and state education rules are published by the Georgia Department of Education.",
    source: "GA Department of Education",
    href: "https://www.gadoe.org/",
  },
  {
    id: "51-005",
    title: "Water, air & environmental safety",
    status: "MONITORED",
    detail:
      "Drinking water, air quality and permit data for Georgia communities come from the Environmental Protection Division.",
    source: "GA Environmental Protection Division",
    href: "https://epd.georgia.gov/",
  },
  {
    id: "51-006",
    title: "Public safety & crime data",
    status: "UNDERSTAFFED",
    detail:
      "Statewide crime reporting and law-enforcement data are maintained by the Georgia Bureau of Investigation.",
    source: "Georgia Bureau of Investigation",
    href: "https://gbi.georgia.gov/",
  },
  {
    id: "51-007",
    title: "Bills that hit District 51",
    status: "TRACKING",
    detail:
      "Every bill, vote and committee action at the state Capitol is posted by the Georgia General Assembly.",
    source: "Georgia General Assembly",
    href: "https://www.legis.ga.gov/",
  },
];

export const CommonIssues = () => (
  <section
    aria-labelledby="common-issues-heading"
    className="mx-auto mt-10 w-full max-w-3xl rounded-lg border border-terminal-green/30 bg-terminal-bg p-5 font-mono sm:p-7"
  >
    <p className="text-[0.65rem] uppercase tracking-[0.3em] text-accent">
      case files recovered // district-51
    </p>
    <h2
      id="common-issues-heading"
      className="mt-2 text-lg font-bold uppercase tracking-tight text-terminal-green sm:text-xl"
    >
      Common Issues in District 51
    </h2>
    <p className="mt-2 text-[0.7rem] leading-relaxed text-terminal-green-dim sm:text-xs">
      The scan was fake. These are not. Every line links to the official source so you can read
      it yourself.
    </p>

    <ul className="mt-6 space-y-4">
      {ISSUE_FILES.map((file) => (
        <li
          key={file.id}
          className="border-l-2 border-terminal-green/30 pl-4 transition-colors hover:border-accent"
        >
          <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
            <span className="text-[0.65rem] text-terminal-green-dim">&gt; {file.id}</span>
            <span className="text-sm font-bold uppercase tracking-tight text-terminal-green">
              {file.title}
            </span>
            <span className="text-[0.65rem] font-bold uppercase tracking-[0.15em] text-accent">
              [{file.status}]
            </span>
          </div>
          <p className="mt-1 text-[0.72rem] leading-relaxed text-terminal-green-dim sm:text-xs">
            {file.detail}
          </p>
          <a
            href={file.href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent("wakeup51_source_click", { issue: file.id, source: file.source })}
            className="mt-1.5 inline-flex items-center gap-1 text-[0.68rem] uppercase tracking-[0.15em] text-accent underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            source: {file.source}
            <ExternalLink className="h-3 w-3 flex-shrink-0" aria-hidden="true" />
          </a>
        </li>
      ))}
    </ul>

    <p className="mt-6 border-t border-terminal-green/20 pt-4 text-[0.65rem] leading-relaxed text-terminal-green-dim">
      Sources are official state and county agencies. Figures change — always check the source
      directly.
    </p>
  </section>
);
