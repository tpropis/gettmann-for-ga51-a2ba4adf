# Issues Rebuild + Position Comparison

Two uploaded briefs, built as one pass. Everything stays on the existing navy/gold system, no new decoration, and nothing gets published that the campaign hasn't confirmed.

## 1. Issues section (replaces the current "Where Keith Stands")

Five cards, driven by one typed data array so copy can be edited without touching layout:

1. Affordability & Inflation
2. Educational Excellence
3. Constitutional Rights
4. Law & Order (no "personal" section — campaign is still writing it)
5. Homeownership

Each card: issue name, a short problem paragraph with a thin muted-red rule on its left edge, a "KEITH WILL" label with exactly three gold-chevron bullets, and an optional collapsible "Why this is personal for me" (collapsed by default, real button, `aria-expanded`, height-only animation). One "Read more" link per card in muted red. Nothing visible before expanding runs past ~70 words. Copy comes verbatim from the brief.

The existing six-card policy component is retired. Election integrity is not added.

## 2. Position Comparison section

"Where we agree. Where we don't." Three columns — Georgia Republicans, Keith Gettmann (highlighted: navy tint, gold top border, slightly wider), Rep. Esther Panitch. Agreement group renders first, then the differences.

Rows built from a typed array: five agree rows, three differ rows, exactly as supplied. The four unconfirmed rows (HB 305, HB 71, Medicaid, school choice) are left out of this build — the data shape supports them the moment Keith confirms.

Marks: navy/slate filled check for support, thin muted-red open X for oppose, gray em dash for no published position. Every mark carries an aria-label; no color-only meaning, no green/red, no tally or score. Rows expand to a one-sentence explanation plus a Read more link. Below 768px the table becomes stacked cards with three labeled rows each — no horizontal scrolling. Sourcing note in small warm gray at the bottom.

## 3. Constituent Services page

New page at `/constituent-services` with the "Call me. I'll answer." content: posted office hours in Roswell, Sandy Springs and Johns Creek, a phone line that reaches a person, a two-business-day reply standard, and quarterly town halls. Phone number and dates render as clearly marked placeholders — nothing invented. Added to the main nav immediately before Issues, in both desktop and mobile menus.

## 4. Fixes the briefs flagged

- Canonical and social preview URLs move from the staging domain to `https://www.keithforga.com`, with each page's real URL in `og:url`.
- `/coloring` gets its own social title and preview image instead of the generic homepage card.
- Donate ladder becomes $51 / $151 / $510 / $1,051 with $151 preselected; every donate CTA continues to point at the WinRed page (it already does).
- Theme navy unified to `#183050` so the site color matches the logo.

## Accessibility and layout rules honored

One h1 per page, section h2, card h3. Gold used only for chevrons, rules, and text on navy — never body copy on white. Visible focus rings everywhere. Single column below 768px with full card padding. No stock photos, counters, parallax, accent stripes, or candidate photos in the chart.

## Technical notes

- New `src/data/issues.ts` and `src/data/positionComparison.ts` hold the typed arrays.
- New components: `src/components/IssuesSection.tsx`, `src/components/PositionComparison.tsx` (plus a small row/card subcomponent), replacing `PolicyPositions.tsx` in `Index.tsx`.
- New `src/pages/ConstituentServices.tsx` with a route in `App.tsx` and a nav entry in `CampaignHeader.tsx`.
- Canonical/OG handling updated in `Seo.tsx` and `index.html`; `--campaign-navy` / `--primary` updated in `index.css` and the `theme-color` meta.
- Donation amounts updated in `DonationSection.tsx`.

## One flag before build

The comparison rows cite bills as signed in 2026 and describe Rep. Panitch's stated positions. I'll publish them exactly as supplied and cite the source line under each row, but every row should be re-checked against the General Assembly record and her site before this goes live — that is the one part of this page that can't be walked back if it's wrong.
