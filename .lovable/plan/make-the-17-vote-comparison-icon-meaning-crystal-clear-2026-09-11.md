# Make the 17-Vote Comparison Icon Meaning Crystal Clear

## Problem
The checkmark / X icons in the position-comparison table are not self-explanatory. Visitors cannot immediately tell whether the X means the person voted no, does not support the issue, or something else. The column labels alone ("Georgia Republicans", "Keith Gettmann", "Rep. Panitch") do not say what the mark represents.

## Goal
Make the meaning of every mark obvious at a glance, without requiring the user to read body copy or tap to expand.

## Changes

1. **Add a visual legend above the comparison**
   - Place a compact legend just below the intro paragraph and above the first group.
   - Legend items:
     - Blue-filled checkmark: "Supported / voted yes"
     - Red-outlined X: "Voted no"
   - Use the same icon components (`Mark`) so the legend matches the table.

2. **Add descriptive labels under each column header (desktop only)**
   - Under "Georgia Republicans" → "Supported"
   - Under "Keith Gettmann" → "Supports"
   - Under "Rep. Panitch" → "Voted no"
   - Keep the existing header text unchanged.

3. **Add explicit text labels inside each mobile card row**
   - Next to each icon in the mobile `dl` rows, show the word:
     - "Supported" / "Supports" / "Voted no"
   - Keep the icon for quick scanning, but the label removes all ambiguity.

4. **Keep the existing expandable details and vote-record line**
   - The source links and summary text remain as-is.

## Files to change
- `src/components/PositionComparison.tsx`

## Out of scope
- No changes to the data model in `src/data/positionComparison.ts`.
- No wording or tone changes to the 17 rows themselves.
