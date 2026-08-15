interface TerminalLineProps {
  text: string;
  /** Result tag rendered in gold at the end of the line. */
  result?: string;
  /** Show a fake progress bar under the line. */
  bar?: number;
  done?: boolean;
}

/**
 * One typed-out line in the fake "scan" sequence.
 * All content is campaign-parody copy — no real device or visitor data.
 */
export const TerminalLine = ({ text, result, bar, done }: TerminalLineProps) => (
  <div className="font-mono text-[0.78rem] leading-relaxed sm:text-sm md:text-base">
    <span className="text-terminal-green-dim">&gt;&nbsp;</span>
    <span className="text-terminal-green">{text}</span>
    {result && done && <span className="ml-2 font-bold text-accent">{result}</span>}
    {!done && <span className="ml-1 animate-pulse text-terminal-green">_</span>}
    {typeof bar === "number" && (
      <div className="mt-1 ml-4 flex items-center gap-2">
        <div className="h-1.5 w-40 overflow-hidden rounded-full bg-terminal-green-dim/40 sm:w-56">
          <div
            className="h-full rounded-full bg-terminal-green transition-[width] duration-150 ease-linear"
            style={{ width: `${Math.min(100, Math.max(0, bar))}%` }}
          />
        </div>
        <span className="font-mono text-[0.65rem] text-terminal-green-dim">
          {Math.round(bar)}%
        </span>
      </div>
    )}
  </div>
);
