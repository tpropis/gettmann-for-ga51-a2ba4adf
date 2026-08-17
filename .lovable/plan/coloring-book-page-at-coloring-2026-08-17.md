# Coloring Book page at /coloring

A hidden-but-findable Easter egg page built from the two print-ready PNGs you uploaded, tied together by "COLOR IT. FRIDGE IT. SHARE IT."

## Route and discoverability

- New page at `/coloring` (primary URL: `https://keithforga.com/coloring`).
- Not added to the main navigation.
- One subtle footer text link, "Coloring Book", placed in the existing secondary footer link row alongside Privacy Policy and Terms, with a crayon-style underline on hover.
- Added to `public/sitemap.xml`.

## Assets

- Both uploaded PNGs are used exactly as delivered — no regeneration, redraw, crop, or QR alteration.
- Originals uploaded to the CDN and served as-is by the Download buttons (`download` attribute, full 2550 x 3300 PNG).
- Separate lightweight preview derivatives (resized from the same files, no re-drawing) used for on-page display, lazy-loaded below the fold.
- Social preview for the page uses the Color Code page artwork, letterboxed on a clean background so nothing is distorted.

## Page sections

1. **Hero** — short. Eyebrow "THE VERY HUMAN SIDE OF DISTRICT 51", stacked headline COLOR IT. / FRIDGE IT. / SHARE IT., supporting copy, crayon-style line "This part is definitely not AI.", CTA "Choose Your Coloring Page ↓" that smooth-scrolls to the downloads.
2. **PICK YOUR CHALLENGE** — two cards. Side-by-side on desktop, horizontal swipe carousel with "1 of 2 / 2 of 2" pagination dots on mobile; keyboard-navigable.
   - Card 1: COLORING PAGE #1 / THE COLOR CODE, 1=Red 2=Blue 3=Yellow 4=Green legend, "There are technically instructions. Following them is optional.", button DOWNLOAD THE COLOR CODE, microcopy "8.5 x 11 · 300 DPI · Print Ready".
   - Card 2: COLORING PAGE #2 / CAN YOU MAKE IT SCAN?, "YES. IT CAN ACTUALLY WORK." highlight, the four coloring instructions, badge "DIFFICULTY: BRAVE", button DOWNLOAD THE QR CHALLENGE, same microcopy.
3. **NO CRAYONS? / WE'LL BRING THE WHOLE BOX.** — compact callout with a "Request Crayons" button opening a lightweight modal form (guardian name, email, optional phone, ZIP, short message). No links to voting, donating, or support; framed purely as a community activity.
4. **THE FRIDGE CHALLENGE** — light fridge-door panel, small magnet shapes, one slightly rotated page preview held by tape, then the 5 numbered steps (Download it, Color it, Fridge it, Snap it, Share it), closing with "YOUR FRIDGE COULD MAKE THE CAMPAIGN FEED." plus the "we may repost some favorites" clarification.
5. **SHOW KEITH WHAT YOU MADE** — buttons "Find Keith on Facebook" and "Find Keith on Instagram" using the exact URLs already in the site footer (no new or guessed accounts), a Facebook "Share This Challenge" sharer link for `https://keithforga.com/coloring`, a native Web Share "Share the Coloring Book" button with copy-link fallback, and "Post yours with #ColorWithKeith".
6. **READY?** — final stacked COLOR IT. / FRIDGE IT. / SHARE IT. with "Download a Page" and "Follow Keith" buttons.

Two to three understated crayon-style asides scattered through the page (e.g. "Actual crayons required.", "Refrigerator space recommended.").

## Design

Existing campaign navy/gold tokens, Oswald headings, Source Sans body, existing header/footer and button styles — with light playful accents (crayon underlines, small stars, paper edges, slight rotations). Mobile-first: large tap targets, no email gate, one-tap downloads.

## SEO

- Title: Keith Gettmann Coloring Book | Georgia House District 51
- Meta description: Download free Keith Gettmann coloring pages, take the QR Code Challenge, put your masterpiece on the fridge and share it with the campaign.
- Canonical and og:url: `https://keithforga.com/coloring`
- OG title: Color It. Fridge It. Share It. | Keith Gettmann
- OG description: Download a coloring page or try the QR Code Challenge. Can you color it accurately enough to make it scan?

## Analytics

Uses the existing GA4 wrapper (`src/lib/analytics.ts`) — no new platform. Events: `color_page_view`, `color_code_download`, `qr_challenge_download`, `crayons_request_click`, `color_facebook_click`, `color_instagram_click`, `color_share_click`.

## Technical notes

- New `src/pages/Coloring.tsx` plus small components under `src/components/coloring/`; lazy route in `src/App.tsx`.
- Crayon request form reuses the existing Netlify form POST pattern from `GetInvolved.tsx` (new form name `crayon-request`), so submissions land with the other campaign forms.
- Files touched: `src/App.tsx`, `src/components/CampaignFooter.tsx` (one link), `public/sitemap.xml`, new coloring files and asset pointers. No other pages changed.
- Note: the `/coloring` URL and the QR page's `keithforga.com` target resolve once the custom domain is connected in project settings; on the Lovable domain the route works at `/coloring` too.
