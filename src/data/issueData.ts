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
    areaName: "SR-400 Express Lanes — Spalding Woods Impact",
    topIssue: "24/7 construction through 2031 next to HD51 neighborhoods",
    summary:
      "GDOT's $4.6B SR-400 express lanes project begins heavy construction April 2026. Spalding Woods and Talbot Colony residents face years of noise, a 50-foot retaining wall, and tree clearing — with little advance notice from the state.",
    whyIndependentsCare:
      "Mayor Paul called it 'an intolerable situation' for families living alongside the highway. Residents say GDOT left a door hanger on some homes as the only notice before crews started clearing trees.",
    suggestedMessageAngle:
      "A $4.6 billion project shouldn't be managed with a door hanger. District 51 families deserve a real seat at the table before construction walls loom outside their windows.",
    status: "Critical",
    sourceCount: 6,
    coordinates: [-84.3432, 33.9960],
  },
  {
    id: "traffic-2",
    type: "point",
    category: "Traffic",
    areaName: "Hammond Drive Widening — Stalled Funding",
    topIssue: "17,500 cars/day on a 2-lane road; $2M widening request pending",
    summary:
      "Hammond Drive carries 17,500 vehicles a day — more than its 2-lane capacity can handle. The city has sought a $1.1M loan and $900K grant from the State Road and Tollway Authority to widen it to 4 lanes, but funding has not been secured.",
    whyIndependentsCare:
      "This is a documented bottleneck with a price tag and a plan. Families sit in preventable gridlock every morning while state funding sits unclaimed.",
    suggestedMessageAngle:
      "We know the problem. We have the plan. We need a rep who will go get the money.",
    status: "Ongoing",
    sourceCount: 4,
    coordinates: [-84.3310, 33.9590],
  },
  {
    id: "traffic-3",
    type: "point",
    category: "Traffic",
    areaName: "Lake Forest Drive Culvert Failure",
    topIssue: "Road closure after Hurricane Helene; 8,000 daily drivers rerouted",
    summary:
      "Hurricane Helene (Sept 2024) caused a culvert failure on Lake Forest Drive, one of HD51's key collector roads. GDOT data shows ~8,000 motorists use it daily. The closure forced traffic onto already-congested Roswell Road.",
    whyIndependentsCare:
      "One storm exposed how fragile our road infrastructure is. Aging culverts and drainage systems put residents at risk every hurricane season.",
    suggestedMessageAngle:
      "When one storm closes a road 8,000 people use every day, that's not bad luck — that's deferred maintenance. It's time to invest before the next storm hits.",
    status: "In Progress",
    sourceCount: 3,
    coordinates: [-84.3462, 33.9748],
  },

  // ── PUBLIC SAFETY ─────────────────────────────────────────────────────────────
  {
    id: "safety-1",
    type: "point",
    category: "Public Safety",
    areaName: "Police Staffing — 62% Below GA Average",
    topIssue: "1.5 officers per 1,000 residents vs. Georgia average of 4.0",
    summary:
      "Sandy Springs has 147 sworn officers serving 108,000+ residents — 62% below the Georgia average officer-to-resident ratio. The department logged over 100,000 calls for service in 2024.",
    whyIndependentsCare:
      "Fewer officers means longer response times. In an emergency, seconds matter. This isn't a budget problem — it's a prioritization problem fixable at the state level.",
    suggestedMessageAngle:
      "Our community funds the positions. The state needs to help us fill them. A rep who fights for recruitment incentives makes every family safer.",
    status: "Critical",
    sourceCount: 5,
    coordinates: [-84.3320, 34.0005],
  },
  {
    id: "safety-2",
    type: "point",
    category: "Public Safety",
    areaName: "Police Chase Policy Controversy",
    topIssue: "41 pursuits in 2024 — more than Alpharetta, Dunwoody & Roswell combined",
    summary:
      "Sandy Springs expanded its vehicle pursuit policy in 2024, leading to 41 chases — more than double 2023's count and more than the combined total of three neighboring cities. The policy was expanded again in 2025 to include motorcycles.",
    whyIndependentsCare:
      "High-speed pursuits through residential neighborhoods put innocent bystanders at risk. Residents deserve a transparent public debate before a policy this aggressive becomes the norm.",
    suggestedMessageAngle:
      "Public safety means protecting everyone — including bystanders. Our community deserves an honest conversation about the risks of this policy, not a quiet expansion.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3188, 34.0052],
  },
  {
    id: "safety-3",
    type: "point",
    category: "Public Safety",
    areaName: "Hurricane Helene Emergency Response",
    topIssue: "2,300 homes lost power; middle-of-night evacuation alerts in Sept 2024",
    summary:
      "Hurricane Helene (Sept 26–27, 2024) hit Sandy Springs hard: 37 trees down, Nancy Creek flooded Windsor Pkwy bridge, firefighters evacuated 14 Rickenbacker Road homes at 2am, and 2,300 homes lost power. The Chattahoochee flooded the Morgan Falls Dam pier.",
    whyIndependentsCare:
      "A text alert at 2:33am to 17 residents to 'Leave NOW' is not a resilience plan. As storms intensify, HD51 needs real flood infrastructure investment — not last-minute door-to-door warnings.",
    suggestedMessageAngle:
      "Our neighbors were woken up at 2am and told to flee. That's a failure of preparation, not just bad weather. We can do better.",
    status: "Ongoing",
    sourceCount: 6,
    coordinates: [-84.3448, 33.9812],
  },

  // ── SCHOOLS ───────────────────────────────────────────────────────────────────
  {
    id: "schools-1",
    type: "point",
    category: "Schools",
    areaName: "Spalding Drive Elementary — Closure",
    topIssue: "Board voted Feb 2025 to close a high-performing school over parent outcry",
    summary:
      "Fulton County Schools voted February 20, 2025 to close Spalding Drive Charter Elementary for the 2025–26 school year, citing low enrollment and aging facilities. Parents packed Riverwood's cafeteria in protest, calling it a 'high-performing school' being eliminated without justification.",
    whyIndependentsCare:
      "Parents say the closure will overcrowd receiving schools, force kids across dangerous intersections, and destabilize a community that built itself around this school. The district used 'contradictory models' to justify the decision.",
    suggestedMessageAngle:
      "You don't fix a school by closing it. Parents fought hard and were ignored. A rep who shows up before the vote — not after — makes the difference.",
    status: "Critical",
    sourceCount: 8,
    coordinates: [-84.3498, 33.9712],
  },
  {
    id: "schools-2",
    type: "point",
    category: "Schools",
    areaName: "Sandy Springs School Redistricting 2025",
    topIssue: "Hundreds of families rerouted; bus routes cross dangerous intersections",
    summary:
      "To absorb students from the Spalding Drive closure, Fulton County proposed sending students to Woodland and Heards Ferry Elementary — with new bus routes crossing the high-accident Dalrymple/Roswell Road intersection. A bus driver shortage compounds the logistics nightmare.",
    whyIndependentsCare:
      "Redistricting forces families into longer commutes, disrupts established friendships, and adds bus routes through intersections already flagged as dangerous. The district's own data showed overcrowding at receiving schools.",
    suggestedMessageAngle:
      "When the solution to one school's problems creates safety risks at the next school, you need a rep who reads the whole plan — not just the headline.",
    status: "In Progress",
    sourceCount: 6,
    coordinates: [-84.3350, 33.9762],
  },
  {
    id: "schools-3",
    type: "point",
    category: "Schools",
    areaName: "Fulton County Schools — Enrollment Decline",
    topIssue: "Down 207 students in 2024–25; 3,300+ projected loss over 5 years",
    summary:
      "Sandy Springs area Fulton County Schools enrollment fell by 207 students in 2024–25, and the district projects a loss of 3,300+ students over the next five years. This is driving school closures and redistrictings that destabilize neighborhoods.",
    whyIndependentsCare:
      "Declining enrollment means fewer resources, more closures, and redrawing of boundaries that affect property values and community identity. The trend needs a policy response, not just reactive school closures.",
    suggestedMessageAngle:
      "Closing schools is a symptom. Families leaving the district is the disease. We need a rep focused on why families are choosing to go elsewhere.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3098, 33.9850],
  },

  // ── DEVELOPMENT ───────────────────────────────────────────────────────────────
  {
    id: "dev-1",
    type: "point",
    category: "Development",
    areaName: "Develop Fulton Authority Dispute",
    topIssue: "City reclaims control after county tried to greenlight projects without approval",
    summary:
      "In January 2026 Sandy Springs voted unanimously to require the Fulton County Development Authority (Develop Fulton) to get city approval before acquiring property or offering tax incentives within city limits. The move followed a specific project — 'The Reserve at Ridgewood' — that was nearly approved without city sign-off.",
    whyIndependentsCare:
      "When a county authority can cut tax deals in your city without your elected officials' consent, residents lose control over what gets built and what gets subsidized.",
    suggestedMessageAngle:
      "Local control means local decisions. Sandy Springs residents should decide what gets built here — not a county authority acting behind closed doors.",
    status: "In Progress",
    sourceCount: 5,
    coordinates: [-84.3162, 33.9702],
  },
  {
    id: "dev-2",
    type: "point",
    category: "Development",
    areaName: "High-Density Apartment Development Backlash",
    topIssue: "Residents oppose new apartments; city faces 'luxury housing problem'",
    summary:
      "Sandy Springs Mayor Rusty Paul acknowledged the city has a 'significant negative reaction to any new apartment development' but that capital markets keep pushing multifamily over single-family. The city is losing starter homes as developers convert sites to rental-only.",
    whyIndependentsCare:
      "Young families can't buy into a community where every new project is a luxury rental. Without a diverse housing stock, teachers, first responders, and young professionals get priced out.",
    suggestedMessageAngle:
      "A city where only the wealthy can buy a home isn't a community — it's a zip code. We need housing policy that works for everyone, not just investors.",
    status: "Ongoing",
    sourceCount: 4,
    coordinates: [-84.3258, 33.9675],
  },
  {
    id: "dev-3",
    type: "point",
    category: "Development",
    areaName: "SR-400 Tree Clearing Without Notice",
    topIssue: "Thousands of trees felled; residents got a door hanger as only warning",
    summary:
      "As part of the SR-400 express lanes project, contractors began clearing thousands of trees in Sandy Springs. Council members noted that residents received only a door hanger before clearing began — no formal public meetings, no final design shared with neighborhoods.",
    whyIndependentsCare:
      "Tree loss is permanent. Once mature trees along a highway corridor are gone, they take decades to replace. Residents deserve more than a door hanger before their neighborhood's canopy disappears.",
    suggestedMessageAngle:
      "They cleared thousands of trees and left a note on the door. Our community deserves better communication than that from a $4.6 billion project.",
    status: "Critical",
    sourceCount: 4,
    coordinates: [-84.3420, 33.9920],
  },

  // ── TAXES ─────────────────────────────────────────────────────────────────────
  {
    id: "taxes-1",
    type: "point",
    category: "Taxes",
    areaName: "Sandy Springs Property Tax Increase — No Rollback",
    topIssue: "City raised taxes 2.19% in 2024 by not adopting the rollback rate",
    summary:
      "Sandy Springs collected 2.19% more in property taxes in 2024 by simply not adopting the state-required rollback millage rate. The city charter caps the rate at 4.731 mills, but skipping the rollback is a de-facto tax increase without a vote.",
    whyIndependentsCare:
      "Georgia law requires 3 public hearings when a rollback isn't adopted — but most homeowners don't know that. A quiet 2% increase compounds year over year for families on fixed incomes.",
    suggestedMessageAngle:
      "A tax increase without a vote is still a tax increase. Residents deserve straight talk about what their bill is going up and why.",
    status: "Ongoing",
    sourceCount: 5,
    coordinates: [-84.3205, 33.9882],
  },
  {
    id: "taxes-2",
    type: "point",
    category: "Taxes",
    areaName: "Fulton County 3.74% Property Tax Hike — 2024",
    topIssue: "County raised millage above rollback; schools also raised rates",
    summary:
      "Fulton County adopted a 3.74% property tax increase in 2024. Separately, the Fulton County School Board also set rates above the rollback millage. Combined with the city's increase, Sandy Springs homeowners faced a triple-layer tax hike in a single year.",
    whyIndependentsCare:
      "With three taxing authorities all skipping rollbacks in the same year, the cumulative hit on homeowners can easily top 6–8%. Long-term residents — especially retirees — have no way to absorb that.",
    suggestedMessageAngle:
      "Three separate taxing authorities all raising rates in the same year is not a coincidence — it's a failure of coordination and accountability.",
    status: "Critical",
    sourceCount: 5,
    coordinates: [-84.3098, 33.9822],
  },
  {
    id: "taxes-3",
    type: "point",
    category: "Taxes",
    areaName: "SR-400 Dynamic Toll Lanes — 50-Year Private Contract",
    topIssue: "$4.6B deal gives private company toll pricing control through 2075",
    summary:
      "GDOT handed SR 400 Peach State Partners a 56-year, $4.6 billion contract to build and operate the new SR-400 express lanes. The company will set dynamic toll prices based on real-time demand — meaning HD51 commuters pay whatever the market will bear, with no public oversight of pricing.",
    whyIndependentsCare:
      "Commuters who can't afford peak-hour tolls will be pushed onto already-congested local roads. Privatizing a public highway for 56 years means no elected official can change the pricing structure.",
    suggestedMessageAngle:
      "Turning our main highway into a private toll road for 56 years isn't an infrastructure investment — it's handing commuters a bill they can never vote away.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3395, 33.9998],
  },

  // ── QUALITY OF LIFE ───────────────────────────────────────────────────────────
  {
    id: "qol-1",
    type: "point",
    category: "Quality of Life",
    areaName: "Nancy Creek Flooding — Windsor Pkwy",
    topIssue: "Bridge closed during Helene; creek hit 14.3 ft — 3.3 ft above flood stage",
    summary:
      "Nancy Creek reached 14.3 feet during Hurricane Helene in September 2024 — 3.3 feet above flood stage — closing the Windsor Parkway bridge. Firefighters went door-to-door evacuating Rickenbacker Road residents in the middle of the night.",
    whyIndependentsCare:
      "Nancy Creek runs through the heart of HD51. Climate patterns mean more intense storms. Without drainage infrastructure investment, this will happen again — and the next storm may be worse.",
    suggestedMessageAngle:
      "When a creek hits 14 feet and closes a bridge, that's not a freak event — that's a warning. We need flood infrastructure investment before the next storm, not after.",
    status: "Ongoing",
    sourceCount: 5,
    coordinates: [-84.3380, 33.9840],
  },
  {
    id: "qol-2",
    type: "point",
    category: "Quality of Life",
    areaName: "Chattahoochee River Flood Risk",
    topIssue: "Morgan Falls Dam pier flooded; Chattahoochee corridor homes at risk",
    summary:
      "Helene flooded the pier below Morgan Falls Dam and brought water into the adjacent dog park parking lot. Sandy Springs enforces the Metropolitan River Protection Act but aging development along the 2,000-ft river corridor faces increasing flood exposure.",
    whyIndependentsCare:
      "The Chattahoochee is HD51's most valuable natural asset. Flood risk along the corridor threatens property values, park access, and drinking water quality for the entire metro area.",
    suggestedMessageAngle:
      "The Chattahoochee is too important to manage reactively. We need proactive investment in flood mitigation, not just FEMA maps and crossed fingers.",
    status: "Ongoing",
    sourceCount: 4,
    coordinates: [-84.3218, 33.9658],
  },
  {
    id: "qol-3",
    type: "point",
    category: "Quality of Life",
    areaName: "Path 400 Trail — Northern Extension Stalled",
    topIssue: "$2.3M in allocated GDOT funds sitting unused for 14+ months",
    summary:
      "The PATH 400 multi-use trail has $2.3M in allocated GDOT funds for a northern extension connecting to the Big Creek Greenway. The project has been stuck in design review for over 14 months with no public explanation from GDOT or city officials.",
    whyIndependentsCare:
      "Connected trails increase property values, reduce car trips, and improve public health. The money is already there. Someone just has to move it.",
    suggestedMessageAngle:
      "The funding exists. The community wants it. What's missing is a rep willing to cut through the bureaucratic red tape.",
    status: "In Progress",
    sourceCount: 5,
    coordinates: [-84.3450, 33.9900],
  },

  // ── SMALL BUSINESS ────────────────────────────────────────────────────────────
  {
    id: "biz-1",
    type: "point",
    category: "Small Business",
    areaName: "Sandy Springs Payroll Transparency Fight",
    topIssue: "City withheld all employee names from payroll records; AG had to intervene",
    summary:
      "Sandy Springs was the only city in its coverage area to refuse releasing payroll data under Georgia's Open Records Act in 2024. After Appen Media filed for the data to analyze $41M+ in annual salaries, the city redacted every employee name. The Georgia Attorney General's office had to step in to compel release.",
    whyIndependentsCare:
      "If a city spends $41M of taxpayer money on salaries and fights tooth and nail to hide who got paid, residents have no way to know if funds are being used responsibly.",
    suggestedMessageAngle:
      "Transparency isn't optional for a government that spends $41 million of your money on salaries. If you have nothing to hide, open the books.",
    status: "Ongoing",
    sourceCount: 5,
    coordinates: [-84.3285, 33.9762],
  },
  {
    id: "biz-2",
    type: "point",
    category: "Small Business",
    areaName: "Semi-Truck Traffic on Residential Roads",
    topIssue: "City reviewing ordinance after heavy trucks damage neighborhood streets",
    summary:
      "Sandy Springs City Council took up new trucking regulations in early 2026 after residents complained about heavy semi-trucks using local residential roads as cut-throughs, damaging pavement and creating safety hazards near schools and neighborhoods.",
    whyIndependentsCare:
      "Residential streets aren't built for 80,000-lb loads. Every semi that cuts through a neighborhood accelerates road deterioration and raises repair costs that taxpayers ultimately foot.",
    suggestedMessageAngle:
      "Your street isn't a truck route. We need enforceable regulations that keep heavy freight on highways and out of neighborhoods.",
    status: "In Progress",
    sourceCount: 3,
    coordinates: [-84.3142, 33.9782],
  },
  {
    id: "biz-3",
    type: "point",
    category: "Small Business",
    areaName: "Sandy Springs Housing Cost Squeeze on Workforce",
    topIssue: "Teachers, nurses, and first responders can't afford to live in the city they serve",
    summary:
      "Sandy Springs' mayor acknowledged the city faces a 'luxury housing problem' — new construction skews heavily toward high-end rentals and condos, pricing out the workforce that keeps the city running. The city is losing the housing types young families want to buy.",
    whyIndependentsCare:
      "When teachers commute 45 minutes because they can't afford to live here, school quality suffers. When first responders can't afford the city, response times grow. A diverse workforce needs a diverse housing market.",
    suggestedMessageAngle:
      "A city where the people who teach your kids and fight your fires can't afford a home isn't healthy. We need housing policy that works for working people — not just investors.",
    status: "Monitoring",
    sourceCount: 4,
    coordinates: [-84.3058, 33.9722],
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
