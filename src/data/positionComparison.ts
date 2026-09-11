export type Position = "support" | "oppose" | "none";

export type ComparisonGroup =
  | "affordability"
  | "safety"
  | "schools"
  | "rights"
  | "jobs";

export type ComparisonRow = {
  id: string;
  issue: string; // voter-facing headline, problem first
  summary: string; // 2-3 sentences, shown on expand
  voteRecord: string; // recorded vote line, always visible
  group: ComparisonGroup;
  gop: Position;
  keith: Position;
  panitch: Position;
  sourceLabel?: string;
  sourceHref?: string;
};

export const groupTitles: Record<ComparisonGroup, string> = {
  affordability: "Affordability and taxes",
  safety: "Public safety and rule of law",
  schools: "Schools, parents, kids",
  rights: "Constitutional rights",
  jobs: "Jobs and land",
};

export const groupOrder: ComparisonGroup[] = [
  "affordability",
  "safety",
  "schools",
  "rights",
  "jobs",
];

const yesNo = { gop: "support", keith: "support", panitch: "oppose" } as const;

export const comparisonRows: ComparisonRow[] = [
  {
    id: "hb463",
    issue: "Lower income taxes for working families (HB 463)",
    summary:
      "Georgia's flat income tax dropped from 5.19% to 4.99% starting January 1, 2026, with a path down to 3.99% as revenue allows. That is money left in the pockets of District 51 families. Esther Panitch voted no.",
    voteRecord: "Signed into law. Panitch voted NO.",
    group: "affordability",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/68437",
    ...yesNo,
  },
  {
    id: "sb33",
    issue: "Stop runaway property assessments (SB 33, the HOME Act)",
    summary:
      "Seniors are being taxed out of homes they have owned for decades. SB 33 makes the inflation cap on homestead assessments mandatory statewide in 2027 — no local opt-outs — and adds a local option for deeper relief. Esther Panitch voted no.",
    voteRecord: "Signed May 11, 2026. Panitch voted NO.",
    group: "affordability",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/69863",
    ...yesNo,
  },
  {
    id: "hb808",
    issue: "Bigger personal property tax exemption for small business (HB 808)",
    summary:
      "Small businesses were paying tax on tools and equipment under an exemption frozen for decades. HB 808 raised it from $7,500 to $20,000. Every single no vote came from Democrats, including Esther Panitch.",
    voteRecord: "House 125–42, Feb. 26, 2024. Panitch voted NO.",
    group: "affordability",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64545",
    ...yesNo,
  },
  {
    id: "hb500",
    issue: "Real penalties for burning a police cruiser (HB 500)",
    summary:
      "After the 2020 riots downtown, Georgia made arson of a law enforcement vehicle a standalone felony carrying 5 to 20 years and fines up to $100,000. Officers deserve that protection. Esther Panitch voted no.",
    voteRecord: "House 100–69, March 1, 2023. Panitch voted NO.",
    group: "safety",
    ...yesNo,
  },
  {
    id: "hb295",
    issue: "Hold cities accountable when they stop enforcing the law (HB 295)",
    summary:
      "When a local government has a pattern of ignoring illegal camping, panhandling, loitering and public intoxication, property owners bear the cost. HB 295 lets them sue and recover it. Esther Panitch voted no.",
    voteRecord: "Passed the House. Panitch voted NO.",
    group: "safety",
    ...yesNo,
  },
  {
    id: "sb37",
    issue: "Require sheriffs to be certified peace officers (SB 37)",
    summary:
      "Anyone asking voters to run a sheriff's office should already be POST-certified and in good standing at the time they qualify. SB 37 made that the law. Esther Panitch voted no.",
    voteRecord: "Signed May 1, 2024. Panitch voted NO.",
    group: "safety",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/63758",
    ...yesNo,
  },
  {
    id: "hb1105",
    issue: "Track and report criminal aliens in Georgia jails (HB 1105)",
    summary:
      "The Georgia Criminal Alien Track and Report Act requires local jails to check immigration status and cooperate with federal authorities. Sanctuary policies put Georgians at risk. Esther Panitch voted no.",
    voteRecord: "Signed May 1, 2024. Panitch voted NO.",
    group: "safety",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/65103",
    ...yesNo,
  },
  {
    id: "sb185",
    issue: "No taxpayer-funded inmate sex-change procedures (SB 185)",
    summary:
      "SB 185 bars state funds for sex reassignment surgery, hormone therapy and cosmetic procedures for state inmates. It passed the House 100–2 after a Democratic walkout. Esther Panitch protested it rather than protect your tax dollars.",
    voteRecord: "House 100–2. Signed May 8, 2025. Panitch opposed.",
    group: "safety",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/67450",
    ...yesNo,
  },
  {
    id: "sb233",
    issue: "School choice for kids stuck in failing schools (SB 233)",
    summary:
      "The Georgia Promise Scholarship gives eligible families up to $6,500 a year for tuition and educational expenses, aimed at students zoned for the bottom 25% of schools. No child should be trapped by a zip code. Esther Panitch voted no.",
    voteRecord: "Signed into law. Panitch voted NO.",
    group: "schools",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64535",
    ...yesNo,
  },
  {
    id: "sb351",
    issue: "Parental consent before kids join social media (SB 351)",
    summary:
      "SB 351 requires parental consent for minors under 16, age verification by platforms, school device policies and stronger cyberbullying rules. Parents, not platforms, should decide. Esther Panitch voted no.",
    voteRecord: "House 120–45, March 28, 2024. Panitch voted NO.",
    group: "schools",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64866",
    ...yesNo,
  },
  {
    id: "sb1",
    issue: "Fair competition in girls' sports (SB 1, the Riley Gaines Act)",
    summary:
      "SB 1 keeps biological males out of girls' and women's school sports and locker rooms. Georgia girls deserve a level field and their privacy. Esther Panitch voted no.",
    voteRecord: "Signed in 2025. Panitch voted NO.",
    group: "schools",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/67091",
    ...yesNo,
  },
  {
    id: "sb36",
    issue: "Protect religious liberty in Georgia (SB 36)",
    summary:
      "Georgia's Religious Freedom Restoration Act lets a citizen challenge government action that unlawfully burdens their faith, and recover attorney fees if they win. Esther Panitch voted no.",
    voteRecord: "Signed April 4, 2025. Panitch voted NO.",
    group: "rights",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/67126",
    ...yesNo,
  },
  {
    id: "hb1018",
    issue: "Stop banks from debanking lawful gun businesses (HB 1018)",
    summary:
      "The Firearms Industry Nondiscrimination Act bars financial institutions from refusing service to lawful firearms and ammunition businesses or flagging them with a special merchant code. Esther Panitch voted no.",
    voteRecord: "House 106–60. Signed April 22, 2024. Panitch voted NO.",
    group: "rights",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64980",
    ...yesNo,
  },
  {
    id: "hr780",
    issue: "Citizen-only voting in the state constitution (HR 780)",
    summary:
      "HR 780 would have let Georgians vote on writing citizen-only voting into the constitution. It passed the House 98–61 but fell short of the two-thirds needed. Esther Panitch voted no.",
    voteRecord: "House 98–61, 2024. Panitch voted NO.",
    group: "rights",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/65297",
    ...yesNo,
  },
  {
    id: "hb974",
    issue: "Publish scanned ballot images for public review (HB 974)",
    summary:
      "HB 974 requires the Secretary of State to post digital images of scanned paper ballots statewide, and the public ballot-image library is now live. Transparency should not be controversial. Esther Panitch voted no.",
    voteRecord: "Effective July 1, 2024. Panitch voted NO.",
    group: "rights",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64850",
    ...yesNo,
  },
  {
    id: "sb195",
    issue: "Cut licensing red tape for workers and veterans (SB 195)",
    summary:
      "The Freedom to Work Act and Social Work Licensure Compact make it easier for qualified Georgians — including military spouses and veterans — to get licensed and go to work. Esther Panitch voted no.",
    voteRecord: "Signed May 2, 2024. Panitch voted NO.",
    group: "jobs",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/64100",
    ...yesNo,
  },
  {
    id: "sb420",
    issue: "Keep foreign adversaries from buying Georgia land (SB 420)",
    summary:
      "SB 420 blocks agents of designated foreign adversary nations from acquiring farmland or land near military installations. That is basic security. Esther Panitch voted no.",
    voteRecord: "House 97–67. Signed by Gov. Kemp. Panitch voted NO.",
    group: "jobs",
    sourceLabel: "Georgia General Assembly vote record",
    sourceHref: "https://www.legis.ga.gov/legislation/65221",
    ...yesNo,
  },
];
