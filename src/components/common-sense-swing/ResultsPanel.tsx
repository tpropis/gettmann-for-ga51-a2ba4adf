import { ReactNode } from "react";

type Props = {
  open: boolean;
  children: ReactNode;
};

/**
 * End-of-game results panel. Hidden until the game finishes.
 */
export const ResultsPanel = ({ open, children }: Props) => {
  if (!open) return null;
  return (
    <section
      className="w-full max-w-4xl mx-auto mt-6 rounded-lg bg-background text-foreground p-6 md:p-8 shadow-xl border border-border/30"
      aria-label="Game results"
    >
      {children}
    </section>
  );
};
