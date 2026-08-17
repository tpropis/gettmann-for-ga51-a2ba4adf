# Add "Keep Coloring Till the Wax Runs Out" to /coloring

## Goal
Add the playful tagline "Keep coloring till the wax runs out" to the `/coloring` page so it feels like a natural part of the existing copy.

## Placement
Insert it in the **Crayons section** (`No crayons? We'll bring the whole box.`) as a secondary line, because the idea of running out of wax pairs directly with the request-crayons offer. It also doubles as a subtle closing nudge that kids should color until their crayons are worn down.

## Implementation
- File: `src/pages/Coloring.tsx`
- Replace the supporting paragraph in the Crayons section with copy that ends with "Keep coloring till the wax runs out."
- Keep the existing crayon-style aside and "Request Crayons" button unchanged.
- Preserve navy/gold brand styling and all existing tracking events.

## Verification
- Build the project and confirm the Crayons section still renders cleanly on desktop and mobile.
- Confirm no other text or tracking is affected.
