import { ReactNode } from "react";

/**
 * Responsive stage container where the interactive game renders.
 * Keeps a fixed aspect ratio on desktop and stretches on mobile.
 */
export const GameStage = ({ children }: { children: ReactNode }) => (
  <div
    className="relative w-full max-w-4xl mx-auto rounded-lg overflow-hidden bg-background border border-primary-foreground/10 shadow-2xl aspect-[4/3] md:aspect-[16/9]"
    role="region"
    aria-label="Common-Sense Swing game stage"
  >
    {children}
  </div>
);
