export type TerminalLineKind =
  | "cmd"
  | "out"
  | "ok"
  | "warn"
  | "err"
  | "dim"
  | "hex"
  | "bar";

interface TerminalLineProps {
  kind: TerminalLineKind;
  /** Text for the line. For `cmd` lines this arrives progressively while typing. */
  text: string;
  /** Optional trailing status tag, e.g. [ OK ]. */
  tag?: string;
  /** Fake timestamp prefix, e.g. 00:00:03.412 */
  stamp?: string;
  /** Progress value 0-100 for `bar` lines. */
  progress?: number;
  /** Show the blinking caret at the end of this line. */
  caret?: boolean;
}

const kindClass: Record<TerminalLineKind, string> = {
  cmd: "text-terminal-green",
  out: "text-terminal-green/80",
  ok: "text-terminal-green",
  warn: "text-terminal-amber",
  err: "text-terminal-red",
  dim: "text-terminal-green-dim",
  hex: "text-terminal-cyan/70",
  bar: "text-terminal-green/80",
};

const tagClass: Record<string, string> = {
  ok: "text-terminal-green border-terminal-green/40",
  warn: "text-terminal-amber border-terminal-amber/40",
  err: "text-terminal-red border-terminal-red/40",
  dim: "text-terminal-green-dim border-terminal-green-dim/40",
};

/**
 * One line in the fake "scan" session.
 * All content is campaign-parody copy — no real device or visitor data.
 */
export const TerminalLine = ({
  kind,
  text,
  tag,
  stamp,
  progress,
  caret,
}: TerminalLineProps) => (
  <div className="flex items-start gap-2 whitespace-pre-wrap break-words font-mono text-[0.7rem] leading-[1.55] sm:text-[0.8rem] md:text-[0.85rem]">
    {stamp && (
      <span className="hidden shrink-0 select-none text-terminal-green-dim sm:inline">
        [{stamp}]
      </span>
    )}

    <span className="min-w-0 flex-1">
      {kind === "cmd" && (
        <span className="select-none text-terminal-cyan">
          root@d51-node:~#{" "}
        </span>
      )}
      {kind === "out" && <span className="select-none text-terminal-green-dim">  </span>}
      {kind === "err" && <span className="select-none text-terminal-red">  ! </span>}
      {kind === "warn" && <span className="select-none text-terminal-amber">  ~ </span>}

      <span className={kindClass[kind]}>{text}</span>

      {tag && (
        <span
          className={`ml-2 inline-block rounded-sm border px-1.5 py-px align-middle text-[0.6rem] font-bold uppercase tracking-wider ${
            tagClass[
              kind === "err" ? "err" : kind === "warn" ? "warn" : kind === "dim" ? "dim" : "ok"
            ]
          }`}
        >
          {tag}
        </span>
      )}

      {typeof progress === "number" && (
        <span className="mt-1 flex items-center gap-2">
          <span className="relative block h-[6px] w-40 overflow-hidden rounded-sm bg-terminal-green-dim/25 sm:w-64">
            <span
              className="absolute inset-y-0 left-0 bg-terminal-green"
              style={{ width: `${Math.min(100, Math.max(0, progress))}%` }}
            />
          </span>
          <span className="font-mono text-[0.62rem] tabular-nums text-terminal-green-dim">
            {Math.round(progress)}%
          </span>
        </span>
      )}

      {caret && (
        <span className="ml-0.5 inline-block h-[0.9em] w-[0.55em] translate-y-[0.12em] animate-pulse bg-terminal-green align-middle" />
      )}
    </span>
  </div>
);
