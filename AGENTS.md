# Project conventions

- Serve PlusOne media from `public/plusone/` using Vite's base URL so every deployment owns its logo and video without depending on another host; keep the video web-optimized below the repository's per-file size limit.
- Keep the circus experience lazy-loaded and separate from normal campaign navigation, with source-gated issue data and an origin-local honk audio file played only on click so unverified claims and audio never run automatically.