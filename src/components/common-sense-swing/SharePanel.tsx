import { ReactNode } from "react";

/**
 * Share panel (Web Share API + clipboard fallback live in the game logic).
 */
export const SharePanel = ({ children }: { children: ReactNode }) => (
  <section
    className="w-full max-w-4xl mx-auto mt-4 rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 md:p-6 flex flex-wrap items-center justify-center gap-3"
    aria-label="Share your result"
  >
    {children}
  </section>
);
