# Project conventions

- Serve PlusOne media from `public/plusone/` using Vite's base URL so every deployment owns its logo and video without depending on another host; keep the video web-optimized below the repository's per-file size limit.
- Keep the circus experience lazy-loaded and separate from normal campaign navigation, with source-gated issue data and origin-local honk/background audio started only by visitor interaction; pause both on mute and unmount so claims and audio never run automatically or leak across pages.