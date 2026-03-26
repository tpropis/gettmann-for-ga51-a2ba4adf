/**
 * District 51 Community Issues Data
 *
 * Data structure designed for easy migration to an admin backend.
 * To connect to Airtable or a custom CMS, replace the static `issueData`
 * array with an async fetch from your API and pass the result into
 * the map component via props or React Query.
 *
 * Airtable example (replace static array):
 *   const { data } = useQuery(['issues'], () =>
 *     fetch('/api/issues').then(r => r.json())
 *   );
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type IssueStatus =
  | "Critical"
  | "Ongoing"
  | "In Progress"
  | "Resolved"
  | "Monitoring";

export type IssueType = "point" | "zone";

export type Category =
  | "Traffic"
  | "Public Safety"
  | "Schools"
  | "Development"
  | "Taxes"
  | "Quality of Life"
  | "Small Business";

export interface IssueData {
  id: string;
  type: IssueType;
  category: Category;
  areaName: string;
  topIssue: string;
  summary: string;
  whyIndependentsCare: string;
  suggestedMessageAngle: string;
  status: IssueStatus;
  sourceCount: number;
  /** [longitude, latitude] — required for type "point" */
  coordinates?: [number, number];
  /** Outer ring polygon coordinates — required for type "zone" */
  polygonCoordinates?: [number, number][];
}

// ─── Category Configuration ───────────────────────────────────────────────────

export const CATEGORIES: Category[] = [
  "Traffic",
  "Public Safety",
  "Schools",
  "Development",
  "Taxes",
  "Quality of Life",
  "Small Business",
];

export const CATEGORY_CONFIG: Record<
  Category,
  { color: string; bgColor: string; textColor: string; label: string; emoji: string }
> = {
  Traffic: {
    color: "#EA580C",
    bgColor: "#FFF7ED",
    textColor: "#7C2D12",
    label: "Traffic",
    emoji: "🚦",
  },
  "Public Safety": {
    color: "#2563EB",
    bgColor: "#EFF6FF",
    textColor: "#1E3A8A",
    label: "Public Safety",
    emoji: "🛡",
  },
  Schools: {
    color: "#7C3AED",
    bgColor: "#F5F3FF",
    textColor: "#4C1D95",
    label: "Schools",
    emoji: "🎓",
  },
  Development: {
    color: "#059669",
    bgColor: "#ECFDF5",
    textColor: "#064E3B",
    label: "Development",
    emoji: "🏗",
  },
  Taxes: {
    color: "#DC2626",
    bgColor: "#FEF2F2",
    textColor: "#7F1D1D",
    label: "Taxes",
    emoji: "💰",
  },
  "Quality of Life": {
    color: "#D97706",
    bgColor: "#FFFBEB",
    textColor: "#78350F",
    label: "Quality of Life",
    emoji: "⭐",
  },
  "Small Business": {
    color: "#4F46E5",
    bgColor: "#EEF2FF",
    textColor: "#312E81",
    label: "Small Business",
    emoji: "🏪",
  },
};

// ─── Issue Data ────────────────────────────────────────────────────────────────

export const issueData: IssueData[] = [
  // ── TRAFFIC ──────────────────────────────────────────────────────────────────
  {
    id: "traffic-1",
    type: "point",
    category: "Traffic",
    areaName: "GA-400 / I-285 Interchange",
    topIssue: "Daily gridlock costing commuters 45+ minutes",
    summary:
      "The Tom Moreland Interchange sees over 285,000 vehicles daily. District 51 residents sit in backups as far north as Northridge Rd every morning and evening.",
    whyIndependentsCare:
      "Congestion costs an estimated $1,800/year per Sandy Springs commuter in lost time and fuel. This directly hits family budgets regardless of political affiliation.",
    suggestedMessageAngle:
      "Hardworking families shouldn't lose an hour of their day stuck at an interchange that hasn't been meaningfully improved since the 1990s.",
    status: "Critical",
    sourceCount: 7,
    coordinates: [-84.3398, 33.9285],
  },
  {
    id: "traffic-2",
    type: "zone",
    category: "Traffic",
    areaName: "Hammond Drive Corridor",
    topIssue: "2-mile AM peak backup toward Perimeter Center",
    summary:
      "Hammond Drive between Roswell Road and Peachtree Dunwoody Rd backs up daily. A 2021 GDOT study recommended signal retiming and a protected bike/pedestrian lane but no funding was allocated.",
    whyIndependentsCare:
      "Parents driving kids to school and workers starting their day are stuck in preventable gridlock. Signal optimization costs roughly $50K — a fraction of what delays cost residents annually.",
    suggestedMessageAngle:
      "We have the study. We have the solution. What we've lacked is a representative willing to fight for the funding.",
    status: "Ongoing",
    sourceCount: 4,
    polygonCoordinates: [
      [-84.4050, 33.9565],
      [-84.3200, 33.9565],
      [-84.3200, 33.9510],
      [-84.4050, 33.9510],
      [-84.4050, 33.9565],
    ],
  },
  {
    id: "traffic-3",
    type: "point",
    category: "Traffic",
    areaName: "Roswell Road @ Abernathy Intersection",
    topIssue: "Six-block backup caused by outdated signal timing",
    summary:
      "Peak-hour queues extend six blocks north due to a signal timing plan that hasn't been updated since 2016. GDOT owns the signal but the City of Sandy Springs has made no formal request for retiming.",
    whyIndependentsCare:
      "A simple timing adjustment — typically done at no cost on city request — could cut queue length by 40%. That's a quick win that costs nothing.",
    suggestedMessageAngle:
      "Sometimes fixing a problem just means picking up the phone and asking. Our residents deserve a rep who'll make that call.",
    status: "In Progress",
    sourceCount: 3,
    coordinates: [-84.3804, 33.9626],
  },

  // ── PUBLIC SAFETY ─────────────────────────────────────────────────────────────
  {
    id: "safety-1",
    type: "zone",
    category: "Public Safety",
    areaName: "Perimeter Center Area",
    topIssue: "Vehicle break-ins up 34% year-over-year",
    summary:
      "The Perimeter Center retail and office district has seen a sharp spike in smash-and-grab vehicle thefts and organized retail crime. Sandy Springs PD reports the precinct is understaffed for patrol density.",
    whyIndependentsCare:
      "Crime in a commercial hub hurts everyone — businesses lose customers, employees feel unsafe, and property owners bear higher insurance costs. This isn't a partisan issue.",
    suggestedMessageAngle:
      "A thriving Perimeter Center means more tax revenue for Sandy Springs. Safe streets are an economic investment, not just a police budget line.",
    status: "Critical",
    sourceCount: 6,
    polygonCoordinates: [
      [-84.3600, 33.9450],
      [-84.3150, 33.9450],
      [-84.3150, 33.9130],
      [-84.3600, 33.9130],
      [-84.3600, 33.9450],
    ],
  },
  {
    id: "safety-2",
    type: "point",
    category: "Public Safety",
    areaName: "North Springs / Lake Forrest Dr",
    topIssue: "Residential speeding — no enforcement presence",
    summary:
      "Residents have documented 50+ mph speeds on a 35 mph residential corridor near North Springs MARTA. Three speeding-related accidents occurred in 2023. No traffic calming study has been requested.",
    whyIndependentsCare:
      "Children walk to school along this corridor. Pedestrian safety transcends politics — it's a basic quality-of-life issue every neighborhood deserves addressed.",
    suggestedMessageAngle:
      "We measure our priorities by what we protect. Slowing down traffic where kids walk to school should be non-negotiable.",
    status: "Ongoing",
    sourceCount: 5,
    coordinates: [-84.3578, 34.0012],
  },
  {
    id: "safety-3",
    type: "point",
    category: "Public Safety",
    areaName: "Sandy Springs Police — Northern Precinct",
    topIssue: "12 officer vacancies leaving north end underserved",
    summary:
      "Sandy Springs PD's northern precinct currently has 12 funded-but-unfilled officer positions. Average response times in northern zip codes are 8.4 minutes vs the 5.9-minute city average.",
    whyIndependentsCare:
      "Longer response times in any neighborhood put families at risk. This is a public safety equity issue — your safety shouldn't depend on which street you live on.",
    suggestedMessageAngle:
      "We fund these positions. They just go unfilled. A representative fighting for officer recruitment support at the state level makes a real difference.",
    status: "Ongoing",
    sourceCount: 4,
    coordinates: [-84.3680, 33.9820],
  },

  // ── SCHOOLS ───────────────────────────────────────────────────────────────────
  {
    id: "schools-1",
    type: "point",
    category: "Schools",
    areaName: "Riverwood International Charter School",
    topIssue: "Overcrowded at 126% capacity — 2,400 students",
    summary:
      "Riverwood International Charter School serves 2,400+ students in a facility designed for 1,900. Portable classrooms line the parking lot. Expansion requests to Fulton County have stalled for three years.",
    whyIndependentsCare:
      "Overcrowded schools produce worse outcomes regardless of school quality. District 51 families chose this school for its academic excellence — that reputation erodes when class sizes balloon.",
    suggestedMessageAngle:
      "Our kids' classroom conditions reflect our community's values. We can do better than portables in parking lots for one of Georgia's top schools.",
    status: "Critical",
    sourceCount: 8,
    coordinates: [-84.3495, 33.9625],
  },
  {
    id: "schools-2",
    type: "zone",
    category: "Schools",
    areaName: "Dunwoody HS Attendance Boundary",
    topIssue: "Rezoning plan displaces 400+ District 51 families",
    summary:
      "Fulton County Schools' 2024 capacity rebalancing proposal would move roughly 400 District 51 students currently zoned for Riverwood to Dunwoody HS — adding significant commutes for affected families.",
    whyIndependentsCare:
      "School assignment affects property values, family routines, and student outcomes. Parents deserve a voice at the table when bureaucrats redraw the lines.",
    suggestedMessageAngle:
      "This decision affects 400 families and was announced with 30 days' notice. Residents deserve real input, not rubber-stamp hearings.",
    status: "Monitoring",
    sourceCount: 5,
    polygonCoordinates: [
      [-84.3460, 33.9820],
      [-84.3020, 33.9820],
      [-84.3020, 33.9420],
      [-84.3460, 33.9420],
      [-84.3460, 33.9820],
    ],
  },
  {
    id: "schools-3",
    type: "point",
    category: "Schools",
    areaName: "District 51 STEM Funding Gap",
    topIssue: "Schools receive $340 less per student than metro average",
    summary:
      "State funding formulas leave Fulton County schools — including District 51's public schools — $340 per-student below the Atlanta metro average for STEM resources, lab equipment, and AP coursework funding.",
    whyIndependentsCare:
      "STEM skills drive the economy our kids will enter. Underfunding their preparation today means a less competitive Georgia workforce tomorrow.",
    suggestedMessageAngle:
      "Georgia's funding formula is punishing our kids because our district's property values inflate state calculations. That's a fixable policy problem, not an inevitability.",
    status: "Ongoing",
    sourceCount: 6,
    coordinates: [-84.3598, 33.9415],
  },

  // ── DEVELOPMENT ───────────────────────────────────────────────────────────────
  {
    id: "dev-1",
    type: "point",
    category: "Development",
    areaName: "City Springs Mixed-Use Development",
    topIssue: "New 15-story tower changing neighborhood scale",
    summary:
      "A proposed 15-story mixed-use building adjacent to City Springs (the Sandy Springs civic center) has drawn significant resident opposition over height, parking impacts, and architectural compatibility.",
    whyIndependentsCare:
      "Smart growth and neighborhood character aren't partisan issues. Residents across the spectrum want development that fits the community — not developer timelines.",
    suggestedMessageAngle:
      "Growth is healthy. Unchecked development without community consent is something else. Sandy Springs deserves growth on residents' terms.",
    status: "In Progress",
    sourceCount: 9,
    coordinates: [-84.3733, 33.9304],
  },
  {
    id: "dev-2",
    type: "point",
    category: "Development",
    areaName: "Perimeter CID Upzoning Proposal",
    topIssue: "14 parcels proposed for 40+ unit high-density residential",
    summary:
      "The Perimeter Community Improvement District has backed a rezoning proposal that would convert 14 commercial parcels to residential uses of 40+ units each. Critics argue it bypasses standard community input procedures.",
    whyIndependentsCare:
      "High-density residential in an already-congested commercial hub will worsen traffic and strain schools without guaranteed community benefit in return.",
    suggestedMessageAngle:
      "More density without more infrastructure is a tax on existing residents. We need development that pays its own way.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3380, 33.9280],
  },
  {
    id: "dev-3",
    type: "point",
    category: "Development",
    areaName: "Hammond Drive Corridor Redevelopment Plan",
    topIssue: "Developer-driven corridor plan lacks community voice",
    summary:
      "A consultant-driven redevelopment study for Hammond Drive was commissioned by a private landowner coalition with minimal public notice. Community meetings were held after initial designs were complete.",
    whyIndependentsCare:
      "When private interests set the terms for public infrastructure, residents get stuck with the costs. Public corridors should have public input from day one.",
    suggestedMessageAngle:
      "The order matters: community first, consultants second. We'll flip that script.",
    status: "Ongoing",
    sourceCount: 3,
    coordinates: [-84.3750, 33.9540],
  },

  // ── TAXES ─────────────────────────────────────────────────────────────────────
  {
    id: "taxes-1",
    type: "point",
    category: "Taxes",
    areaName: "Fulton County Property Reassessments",
    topIssue: "Average home reassessed +23%; appeal backlog 8+ months",
    summary:
      "Fulton County's 2023 reassessment cycle saw average District 51 home values jump 23%, driving property tax bills up sharply. The appeals backlog has stretched to 8+ months, leaving homeowners in limbo.",
    whyIndependentsCare:
      "Rising property taxes price out long-term residents and small landlords. Many District 51 homeowners — especially retirees on fixed incomes — cannot absorb these increases.",
    suggestedMessageAngle:
      "You shouldn't need a lawyer to challenge your tax bill. The appeals process needs to work at the speed families need it to.",
    status: "Critical",
    sourceCount: 11,
    coordinates: [-84.3733, 33.9700],
  },
  {
    id: "taxes-2",
    type: "point",
    category: "Taxes",
    areaName: "MARTA Transit Tax Expansion",
    topIssue: "Proposed 1-cent sales tax increase for Perimeter transit hub",
    summary:
      "MARTA is seeking a 1-cent sales tax referendum to fund a major transit hub at Perimeter Center. Proponents say it reduces traffic; opponents question the cost-benefit given District 51's car-dependent geography.",
    whyIndependentsCare:
      "A sales tax falls proportionally harder on lower-income residents. Before voting yes, residents deserve an honest accounting of who benefits and who pays.",
    suggestedMessageAngle:
      "Transit investment can be smart — but only when the numbers are transparent and the community had a real say.",
    status: "Monitoring",
    sourceCount: 5,
    coordinates: [-84.3507, 33.9302],
  },
  {
    id: "taxes-3",
    type: "point",
    category: "Taxes",
    areaName: "Sandy Springs City Budget Growth",
    topIssue: "Budget up $4.2M over prior year with no visible service gain",
    summary:
      "Sandy Springs' FY2025 budget increased $4.2M (6.1%) over the prior year. Residents report no corresponding improvement in park maintenance, road condition, or city services — raising questions about spending priorities.",
    whyIndependentsCare:
      "Taxpayers of every stripe want to know where their money goes. Fiscal transparency isn't left or right — it's basic accountability.",
    suggestedMessageAngle:
      "More money in the budget should mean better services for families. Right now we're seeing more of one and less of the other.",
    status: "Ongoing",
    sourceCount: 4,
    coordinates: [-84.3750, 33.9304],
  },

  // ── QUALITY OF LIFE ───────────────────────────────────────────────────────────
  {
    id: "qol-1",
    type: "point",
    category: "Quality of Life",
    areaName: "Morgan Falls Overlook Park",
    topIssue: "Facilities maintenance deferred 2+ years",
    summary:
      "Morgan Falls Overlook Park — a key Sandy Springs recreational asset — has had restroom facilities, trailhead signage, and picnic shelters in disrepair for over two years. Work orders have been submitted repeatedly with no resolution.",
    whyIndependentsCare:
      "Parks are a shared resource every family uses. Deferred maintenance signals that leadership doesn't see green space as a priority — which affects quality of life and property values.",
    suggestedMessageAngle:
      "A community that takes care of its parks takes care of its families. Two years is too long to wait for a working restroom.",
    status: "Ongoing",
    sourceCount: 3,
    coordinates: [-84.3945, 33.9685],
  },
  {
    id: "qol-2",
    type: "point",
    category: "Quality of Life",
    areaName: "Bull Sluice Lake Water Quality",
    topIssue: "Algae blooms reported; no Fulton County testing in 18 months",
    summary:
      "Residents have documented recurring algae blooms at Bull Sluice Lake, a popular kayaking and recreation spot on the Chattahoochee. Fulton County's last formal water quality test was 18 months ago.",
    whyIndependentsCare:
      "Unmonitored water quality is a public health issue. Families — especially children — use this water. Regular testing is a basic duty of responsible government.",
    suggestedMessageAngle:
      "When we stop monitoring our public resources, we stop protecting our families. Regular testing costs little; ignoring it costs much more.",
    status: "Critical",
    sourceCount: 5,
    coordinates: [-84.3280, 33.9635],
  },
  {
    id: "qol-3",
    type: "zone",
    category: "Quality of Life",
    areaName: "Path 400 Trail Extension",
    topIssue: "$2.3M in GDOT funds sitting unused; trail dead-ends",
    summary:
      "The PATH 400 multi-use trail has $2.3M in allocated GDOT funds for a northern extension that would connect to the Big Creek Greenway. The project has stalled in design review for 14 months without public explanation.",
    whyIndependentsCare:
      "Connected trails drive health outcomes, reduce car trips, and increase property values. Money is already allocated — someone just needs to move the project forward.",
    suggestedMessageAngle:
      "The funding exists. The community wants it. What's missing is a rep willing to cut through the bureaucratic red tape.",
    status: "In Progress",
    sourceCount: 6,
    polygonCoordinates: [
      [-84.3455, 33.9960],
      [-84.3360, 33.9960],
      [-84.3360, 33.9090],
      [-84.3455, 33.9090],
      [-84.3455, 33.9960],
    ],
  },

  // ── SMALL BUSINESS ────────────────────────────────────────────────────────────
  {
    id: "biz-1",
    type: "zone",
    category: "Small Business",
    areaName: "Roswell Road Business Corridor",
    topIssue: "28% commercial vacancy rate; 3 restaurants closed in 90 days",
    summary:
      "The Roswell Road retail corridor from I-285 to Abernathy Road now shows a 28% commercial vacancy rate — the highest in a decade. Three locally-owned restaurants closed in the last 90 days, citing permitting delays and declining foot traffic.",
    whyIndependentsCare:
      "Local businesses are the economic backbone of a neighborhood. Vacancies lower property values, reduce tax revenue, and hollow out community character.",
    suggestedMessageAngle:
      "Empty storefronts mean lost tax revenue and lost community. We need policies that make Sandy Springs the kind of place small businesses want to put down roots.",
    status: "Critical",
    sourceCount: 7,
    polygonCoordinates: [
      [-84.3840, 33.9720],
      [-84.3680, 33.9720],
      [-84.3680, 33.9120],
      [-84.3840, 33.9120],
      [-84.3840, 33.9720],
    ],
  },
  {
    id: "biz-2",
    type: "point",
    category: "Small Business",
    areaName: "Sandy Springs Permitting & Licensing",
    topIssue: "Average 6-week permit delay cited by departing businesses",
    summary:
      "Sandy Springs city permit timelines average 6 weeks for routine business licenses — twice the national best-practice benchmark. Five businesses explicitly cited permitting in exit interviews conducted by the Sandy Springs Chamber.",
    whyIndependentsCare:
      "Bureaucratic friction doesn't discriminate — it hurts the restaurant owner, the hair salon, and the contractor equally. Streamlined permitting is pro-business and pro-community.",
    suggestedMessageAngle:
      "Government should work at the speed of business, not the other way around. Six weeks for a business license is six weeks a family isn't earning.",
    status: "Ongoing",
    sourceCount: 5,
    coordinates: [-84.3733, 33.9380],
  },
  {
    id: "biz-3",
    type: "point",
    category: "Small Business",
    areaName: "Live/Work Zoning Gap — South Sandy Springs",
    topIssue: "Current code prohibits mixed-use boutique retail",
    summary:
      "Sandy Springs' zoning code still reflects 1980s-era separation of uses, preventing the type of live-work and ground-floor retail that drives vibrant neighborhoods in comparable communities. Reform proposals have stalled in planning committee for two years.",
    whyIndependentsCare:
      "Mixed-use zoning creates the kind of walkable, economically diverse neighborhoods families and businesses want. The code needs to catch up to where the community wants to go.",
    suggestedMessageAngle:
      "Our zoning code is stuck in the past. Updating it is the single biggest thing we can do to invite the businesses our community is asking for.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3600, 33.9200],
  },
];

// ─── GeoJSON Helpers ──────────────────────────────────────────────────────────

/** Computes the centroid of a polygon's outer ring. */
function polygonCentroid(coords: [number, number][]): [number, number] {
  const n = coords.length;
  const lng = coords.reduce((s, c) => s + c[0], 0) / n;
  const lat = coords.reduce((s, c) => s + c[1], 0) / n;
  return [lng, lat];
}

/**
 * Returns a GeoJSON FeatureCollection of *point* features for all issues
 * whose category is in `activeCategories`.
 *
 * Zone issues are represented by their centroid so they participate in
 * marker clustering alongside point issues.
 */
export function getPointsGeoJSON(
  activeCategories: Set<Category>
): { type: "FeatureCollection"; features: object[] } {
  const features = issueData
    .filter((issue) => activeCategories.has(issue.category))
    .map((issue) => {
      let coords: [number, number];
      if (issue.type === "point" && issue.coordinates) {
        coords = issue.coordinates;
      } else if (issue.type === "zone" && issue.polygonCoordinates) {
        coords = polygonCentroid(issue.polygonCoordinates);
      } else {
        return null;
      }
      return {
        type: "Feature",
        geometry: { type: "Point", coordinates: coords },
        properties: {
          ...issue,
          categoryColor: CATEGORY_CONFIG[issue.category].color,
          polygonCoordinates: undefined, // strip from point features
        },
      };
    })
    .filter(Boolean);

  return { type: "FeatureCollection", features };
}

/**
 * Returns a GeoJSON FeatureCollection of *polygon* features for zone issues
 * whose category is in `activeCategories`.
 */
export function getZonesGeoJSON(
  activeCategories: Set<Category>
): { type: "FeatureCollection"; features: object[] } {
  const features = issueData
    .filter(
      (issue) =>
        issue.type === "zone" &&
        issue.polygonCoordinates &&
        activeCategories.has(issue.category)
    )
    .map((issue) => ({
      type: "Feature",
      geometry: {
        type: "Polygon",
        coordinates: [issue.polygonCoordinates!],
      },
      properties: {
        ...issue,
        categoryColor: CATEGORY_CONFIG[issue.category].color,
        polygonCoordinates: undefined,
      },
    }));

  return { type: "FeatureCollection", features };
}
