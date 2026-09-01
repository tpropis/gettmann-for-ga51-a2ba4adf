export type Position = "support" | "oppose" | "none";

export type ComparisonRow = {
  id: string;
  issue: string;
  detail: string; // one sentence, shown on expand
  source: string; // citation line, always visible in small type
  gop: Position;
  keith: Position;
  panitch: Position;
  group: "agree" | "differ";
  readMoreHref?: string;
};

export const comparisonRows: ComparisonRow[] = [
  {
    id: "hb1283",
    issue: "Family Justice Centers for domestic violence survivors (HB 1283)",
    detail:
      "The bill supports centers where survivors reach police, prosecutors and advocates in one place; Keith would fund one in North Fulton, which still has none open.",
    source: "Passed the House and Senate with no negative votes. Signed May 2026.",
    gop: "support",
    keith: "support",
    panitch: "support",
    group: "agree",
    readMoreHref: "/#issues",
  },
  {
    id: "hb1379",
    issue: "Disclosure of foreign funding in Georgia public schools (HB 1379)",
    detail:
      "Schools must disclose foreign gifts and contracts; Keith would extend the same published-not-on-request standard to curriculum and budgets.",
    source: "Signed May 2026. Co-sponsored by Rep. Panitch.",
    gop: "support",
    keith: "support",
    panitch: "support",
    group: "agree",
    readMoreHref: "/#issues",
  },
  {
    id: "hb123",
    issue:
      "Aligning Georgia's intellectual disability standard in death penalty cases (HB 123)",
    detail:
      "The bill brings Georgia's burden of proof in line with the rest of the country; Keith supports due process protections without exception.",
    source: "House 172–0. Senate 53–1. Signed by Gov. Kemp.",
    gop: "support",
    keith: "support",
    panitch: "support",
    group: "agree",
  },
  {
    id: "hb460",
    issue: "Confidential attorney access for incarcerated Georgians (HB 460)",
    detail:
      "The bill protects privileged attorney communication in custody; Keith treats it as a basic constitutional guarantee, not a partisan question.",
    source: "House 172–0.",
    gop: "support",
    keith: "support",
    panitch: "support",
    group: "agree",
  },
  {
    id: "hb30",
    issue: "Defining antisemitism in Georgia law (HB 30)",
    detail:
      "The bill gives prosecutors a working definition when charging hate-motivated crimes; Keith supports it as written.",
    source: "Passed with bipartisan support.",
    gop: "support",
    keith: "support",
    panitch: "support",
    group: "agree",
  },
  {
    id: "sb33",
    issue: "Capping homestead assessment increases statewide (SB 33, the HOME Act)",
    detail:
      "The cap limits how fast a homestead assessment can rise; Keith would defend it through the term in which it takes effect.",
    source:
      "Signed May 11, 2026. Rep. Panitch states on her campaign site that she fought the majority's property tax relief.",
    gop: "support",
    keith: "support",
    panitch: "oppose",
    group: "differ",
    readMoreHref: "/#issues",
  },
  {
    id: "hb463",
    issue: "Reducing Georgia's income tax rate toward 3.99% (HB 463)",
    detail:
      "The schedule steps the state rate down each year; Keith would hold the reduction on schedule rather than pause it.",
    source: "Rate moved from 5.19% to 4.99% effective January 1, 2026.",
    gop: "support",
    keith: "support",
    panitch: "oppose",
    group: "differ",
    readMoreHref: "/#issues",
  },
  {
    id: "lhost",
    issue:
      "Letting counties fund deeper homestead exemptions by local referendum (LHOST)",
    detail:
      "Counties could ask voters to fund a larger exemption locally; Keith supports leaving that decision with local voters.",
    source: "Local ballots permitted beginning 2028 under SB 33.",
    gop: "support",
    keith: "support",
    panitch: "oppose",
    group: "differ",
    readMoreHref: "/#issues",
  },
];
