# Fix the logo in text/social link previews

## What's wrong

When keithforga.com is texted or shared, iMessage/Facebook fetch the page's
`og:image`. That tag currently points to `public/web-app-manifest-512x512.png`,
which is the old red yard-sign artwork. The site itself uses the navy/gold
`KEITH GETTMANN — STATE HOUSE` mark (`src/assets/logo_trans.svg`), so the
preview looks off-brand.

The same file is also used for the PWA icons and `apple-touch-icon.png`, so the
red sign shows up when someone saves the site to a phone home screen too.

## Plan

1. Build a proper share card at 1200x630 (the size iMessage, Facebook, and
   X expect) from the official navy/gold logo: navy background, centered logo,
   gold accent rule. Save as `public/og-image.png`.
2. Rebuild the square icons from the same navy/gold logo, padded not stretched:
   - `public/web-app-manifest-512x512.png`
   - `public/web-app-manifest-192x192.png`
   - `public/apple-touch-icon.png`
   - `public/favicon-96x96.png`
3. Point metadata at the new share card:
   - `index.html`: `og:image` and `twitter:image` -> `/og-image.png`, plus
     `og:image:width`/`height`.
   - `src/components/Seo.tsx`: change `DEFAULT_IMAGE` to `/og-image.png` so
     every route (including /plusone and /hack51) inherits it.
4. Verify by fetching the built page and confirming the tag resolves to the
   new image, and visually check the rendered card.

## Note on caching

Apple and Facebook cache link previews per URL. After this ships, an old
preview can stick around for a while on a thread that already fetched it;
sharing the link fresh (or with a trailing `?v=2`) shows the new card
immediately.

## Also worth deciding

Do you want the red yard-sign design kept anywhere on the site (it matches
printed signs), or should the navy/gold mark be the only logo everywhere? The
plan above assumes navy/gold everywhere.
