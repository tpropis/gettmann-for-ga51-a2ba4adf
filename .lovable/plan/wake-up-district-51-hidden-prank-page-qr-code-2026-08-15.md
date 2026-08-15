# "Wake Up, District 51" — Hidden Prank Page + QR Code

A hidden, unlinked page that plays a clearly theatrical fake-hacker sequence and lands on a bold "WAKE UP, DISTRICT 51 — VOTE KEITH GETTMANN" payoff. Plus a printable QR code that points to it.

## The experience

Route: `/wake-up-51` (not in nav, footer, or sitemap; excluded from search engines)

1. **Boot** — Black screen, green monospace terminal, blinking cursor. One line: `press any key to continue`.
2. **Fake scan (about 8 seconds)** — Lines type out one at a time, obvious jokes so nobody thinks it is real:
   - `SCANNING DEVICE FOR VOTER APATHY..... 97% DETECTED`
   - `LOCATING YOUR MISSING BALLOT..... NOT FOUND`
   - `ACCESSING PROPERTY TAX TRAUMA..... CONFIRMED`
   - `DOWNLOADING COMMON SENSE..... 3 BYTES REMAINING`
   - `ENCRYPTING SCHOOL BOARD MEETING MINUTES..... FAILED`
   - Fake progress bars, glitch flicker, Matrix-style character rain behind the text.
3. **Blue screen** — Classic Windows-style blue crash screen, big white monospace text:
   `WAKE UP, DISTRICT 51.` / `VOTE KEITH GETTMANN.`
4. **Reveal card** — Campaign navy/gold card slides in with:
   - "Relax — nothing was collected. This was a joke."
   - Buttons: Meet Keith, Donate (WinRed), Share, Replay
   - "Paid for by Keith for GA LLC" disclaimer

Skip button visible the whole time; reduced-motion users get a static version of the payoff instead of glitch/typing effects.

## Safety guardrails

- No input fields, no permission prompts, no requests for personal info of any kind.
- No real device or location data echoed back — every "found" item is a campaign joke.
- Disclaimer copy on screen, so any screenshot of the payoff also shows it is a parody.
- `noindex` meta so the page never appears in search results.

## QR code

- Generated as a high-resolution PNG plus an SVG (vector, safe for print at any size) pointing at the live page URL.
- Two versions: plain black-on-white for reliable scanning, and a navy/gold branded version with a short caption line ("Scan if you dare — District 51").
- Delivered as downloadable files you can drop into flyers, yard signs, or door hangers.

## Technical notes

- New `src/pages/WakeUp51.tsx` plus small components under `src/components/wake-up-51/` (TerminalLine, MatrixRain, BlueScreenPayoff, RevealCard), following the pattern used by the existing hidden game page.
- Lazy route added in `src/App.tsx` above the catch-all; nothing else in routing changes.
- Uses existing design tokens (`primary`, `accent`, `font-heading`) — the terminal green is added as a scoped token in `index.css`, not hardcoded.
- Donate link uses the existing `winredUrl()` helper with a `wakeup51` source tag so scans are trackable.
- `Seo` component used with `noindex`; sitemap and `robots.txt` left untouched (page stays out of both).
- QR files generated with a Node QR library and written to downloadable artifacts; the page URL is the published domain.
