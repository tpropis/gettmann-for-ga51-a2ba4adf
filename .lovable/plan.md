## Goal
Consolidate policy content into a single "Where Keith Stands" section and remove the redundant "The Issues" section, while preserving Public Safety as a topic.

## Changes

1. **Add a 6th policy card: Public Safety** to `src/components/PolicyPositions.tsx`
   - Icon: `ShieldCheck` from lucide-react
   - Title: "Public Safety & Rule of Law"
   - Summary: short blurb on backing law enforcement, safe neighborhoods, and secure communities in HD 51
   - Body: 1–2 paragraphs adapted from the tone of the existing Issues "Public Safety" card (support for police, victims' rights, accountability, safe schools). Content will stay consistent with the existing campaign voice — no new factual claims.

2. **Remove "The Issues" section** from the homepage
   - In `src/pages/Index.tsx`, remove the `<IssuesSection />` render and its import
   - Leave `src/components/IssuesSection.tsx` file in place (unused) so it can be restored easily if desired — or delete it; I'll delete it to keep the codebase clean unless you want it kept.

3. **No other layout, styling, or analytics changes.** Section ordering stays the same minus the removed block.

## Open question
Public Safety card placement — insert it as the **first** card (since safety is foundational), or **last** (after Environment)? Default: first.

## Files
- edit `src/components/PolicyPositions.tsx` (add card)
- edit `src/pages/Index.tsx` (remove IssuesSection)
- delete `src/components/IssuesSection.tsx`
