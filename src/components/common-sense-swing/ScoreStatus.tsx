type Props = {
  score: number;
  status: string;
};

/**
 * Score + live status readout. `status` is announced to screen readers.
 */
export const ScoreStatus = ({ score, status }: Props) => (
  <div className="w-full max-w-4xl mx-auto mt-4 flex items-center justify-between gap-4 rounded-md bg-background/5 border border-primary-foreground/10 px-4 py-3">
    <div className="font-heading uppercase tracking-wide text-primary-foreground/70 text-sm">
      Score
      <span className="ml-2 text-accent text-xl font-bold">{score}</span>
    </div>
    <div
      className="text-primary-foreground/80 text-sm md:text-base"
      aria-live="polite"
      aria-atomic="true"
    >
      {status}
    </div>
  </div>
);
