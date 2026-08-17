# Crayon Request: its own dedicated form

Keep the "Request Crayons" button and link exactly where they are. Clicking it opens a form that is only about crayons — no volunteer questions, no email-list signup, no SMS opt-in.

## What the form asks

- Parent / guardian name (required)
- Email (required)
- Mailing address: street, city, ZIP (required) — so crayons and pages can actually be sent
- Phone (optional, "just in case we need to reach you about delivery")
- How many kids are coloring (small number field, optional)
- Short note (optional)

Nothing else. No "join the campaign" checkbox, no volunteer interests, no SMS consent block.

## Behavior

- Submits to the same campaign email pipeline the other forms use, but under its own dedicated form name so crayon requests arrive as their own clearly labeled notification, separate from supporter and volunteer submissions.
- Includes the same spam honeypot the other forms use.
- Basic validation: required fields, valid email, ZIP length, character limits on the note.
- On success, shows the crayon-specific confirmation already on the page ("Got it — the campaign will be in touch. Go ahead and print your page in the meantime.") and clears the fields.
- On failure, shows an error toast so nothing is silently lost.
- Keeps the existing click tracking for the Request Crayons button and adds a submit event.
- Styling stays navy/gold with the existing crayon accents.

## Technical notes

- Update `src/components/coloring/CrayonRequestModal.tsx`: add the address and kid-count fields, drop nothing volunteer-related (there is none today), add `bot-field` honeypot, and keep the `crayon-request` form name.
- Add the matching hidden static form definition for `crayon-request` in `index.html` with the new field names so the host detects and emails it.
- No changes to `GetInvolved`, the footer link, or the coloring page layout beyond wiring the submit tracking.
