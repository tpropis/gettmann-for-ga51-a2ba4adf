# Add Research Link to Public Safety Position

## Goal
Give the "Public Safety & Rule of Law" position in "Where Keith Stands" a credible research reference without weakening the voter-facing message.

## Proposed Change

### 1. Update `src/components/PolicyPositions.tsx`
- Keep the existing "Public Safety & Rule of Law" title, summary, and body copy exactly as-is.
- Append a compact "Research" line at the end of the expanded content for that card only:
  - Label: "Read the research:"
  - Link text: placeholder for the dissertation title (e.g., "[Dissertation title or source name]")
  - Destination: a user-supplied external URL, opened in a new tab with `rel="noopener noreferrer"`.
- Style the link with existing accent/primary text and an external-link indicator (no new colors).

## Scope Guardrails
- No new pages, no navigation changes, no other policy cards touched.
- Existing "Where Keith Stands" layout, icons, and animation remain unchanged.
- The link is conditional: if no URL is provided, the line is hidden so the card still reads cleanly.

## What I Need From You
Please provide the dissertation/study title and URL so the link text and destination are accurate before we publish.
