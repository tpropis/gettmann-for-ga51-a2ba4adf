# Hero Redesign: Message-First Layout

## Goal
Replace the current loss-margin-first hero with a voter-facing message-first hero that keeps Keith's name visible but makes the voter benefit the headline.

## Proposed Hero Copy
- **Top label:** Republican for Georgia State House • District 51
- **H1:** Lower taxes. Safer neighborhoods. Schools that answer to parents.
- **Subhead:** Keith Gettmann — Republican for Georgia State House District 51.
- **CTAs:** "See the plan" and "Chip in $51" (keep existing buttons and tracking)

## Changes

### 1. Rewrite `src/components/HeroSection.tsx`
- Replace the first-person loss-margin H1 with the message-first H1 above.
- Move name/office to the subheadline.
- Remove the Fannie Mae / RTC / FDIC career paragraph from the hero.
- Preserve the existing portrait, navy overlay, gold seal, and mobile gradient.
- Keep the WinRed donation link and `trackDonateClick` analytics intact.

### 2. Repurpose the loss-margin line in `src/components/DonationSection.tsx`
- Add a short urgency line above the amount buttons:
  "This seat was decided by just 4,599 votes. Your support can change that."
- Keep the "Paid for by Keith for GA LLC" disclaimer and secure-contribution note.

### 3. Move career credentials into `src/components/MeetKeith.tsx`
- Add a compact "Why He's Ready" card or paragraph in the existing "Why Keith Gettmann" section using the existing hero copy about Fannie Mae, the Resolution Trust Corporation, the FDIC, and closing the books on institutions that spent money they didn't have.
- This keeps the credibility content on the site without leading with it.

## Scope Guardrails
- No new pages, no layout changes outside the hero copy hierarchy, no image swaps.
- Existing colors, fonts, and animations stay the same.
- All donation analytics and UTM tracking remain unchanged.

## Verification
- Run `bun run build`.
- Check desktop and mobile hero text legibility in preview.
- Confirm donation CTA still routes to WinRed with the correct amount.
