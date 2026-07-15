import { ReactNode } from "react";

/**
 * Full-width wrapper for the hidden Common-Sense Swing campaign game.
 * Applies campaign navy/gold/white palette without touching global styles.
 */
export const GamePageShell = ({ children }: { children: ReactNode }) => (
  <div className="min-h-dvh w-full bg-primary text-primary-foreground font-body flex flex-col">
    {children}
  </div>
);
