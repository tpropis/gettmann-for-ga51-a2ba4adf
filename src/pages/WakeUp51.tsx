import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Seo from "@/components/Seo";
import {
  MatrixRain,
  TerminalLine,
  CrashScreen,
  RevealCard,
  CommonIssues,
} from "@/components/wake-up-51";
import type { TerminalLineKind } from "@/components/wake-up-51/TerminalLine";
import { trackEvent } from "@/lib/analytics";

/**
 * Hidden "Wake Up, District 51" parody page.
 *
 * SAFETY RULES — do not change without a good reason:
 *  - No input fields, no permission prompts, no requests for personal data.
 *  - No real device, browser, or location data is read or echoed back.
 *  - Every "discovered" item is obvious campaign satire.
 *  - The payoff and reveal card always state that nothing was collected.
 */

type Phase = "scan" | "crash" | "reveal";

interface ScriptLine {
  kind: TerminalLineKind;
  text: string;
  tag?: string;
  /** Pause after this line lands, in ms. */
  pause?: number;
}

/** Fake session script. Reads like a real intrusion sweep; every finding is satire. */
const SCRIPT: ScriptLine[] = [
  { kind: "dim", text: "d51-sweep 4.2.1 (build 20260814) — session log begins", pause: 220 },
  { kind: "cmd", text: "./sweep --target district-51 --deep", pause: 240 },
  { kind: "out", text: "resolving node cluster ......... 7 hosts", pause: 130 },
  { kind: "out", text: "handshake tls1.3 / chacha20-poly1305", tag: "ok", pause: 200 },
  { kind: "hex", text: "0x4b45 4954 4820 4745 5454 4d41 4e4e  ..K.EITH.GETT", pause: 90 },
  { kind: "hex", text: "0x5354 4154 4520 484f 5553 4520 3531  ..STATE.HOUSE.51", pause: 260 },

  { kind: "cmd", text: "scan --module household-costs", pause: 200 },
  { kind: "out", text: "indexing groceries, rent, utilities, insurance", pause: 160 },
  { kind: "warn", text: "12 of 12 categories trending upward", tag: "still rising", pause: 300 },

  { kind: "cmd", text: "fetch assessments --county fulton --years 5", pause: 200 },
  { kind: "out", text: "parcel records .............. 5 cycles", pause: 150 },
  { kind: "err", text: "property tax assessment raised again", tag: "reassessed", pause: 300 },

  { kind: "cmd", text: "audit withholding --state GA", pause: 200 },
  { kind: "warn", text: "state income tax overpayment detected", tag: "overpaid", pause: 280 },

  { kind: "cmd", text: "trace route --corridor ga400,roswell-rd", pause: 200 },
  { kind: "out", text: "hop 1  ga-400 nb ............. 41 min", pause: 110 },
  { kind: "out", text: "hop 2  roswell rd ............ 27 min", pause: 110 },
  { kind: "err", text: "corridor throughput degraded", tag: "gridlock", pause: 300 },

  { kind: "cmd", text: "request school-records --transparency --parental-rights", pause: 200 },
  { kind: "err", text: "permission denied (403) on 4 of 4 requests", tag: "access denied", pause: 300 },

  { kind: "cmd", text: "sample water-quality --reports latest", pause: 200 },
  { kind: "warn", text: "environmental safety filings incomplete", tag: "incomplete", pause: 280 },

  { kind: "cmd", text: "query public-safety --staffing", pause: 200 },
  { kind: "err", text: "sworn officer positions unfilled", tag: "underfunded", pause: 320 },

  { kind: "cmd", text: "wget capitol.ga.gov/common-sense.pkg", pause: 200 },
  { kind: "bar", text: "downloading common_sense.pkg", pause: 240 },
  { kind: "err", text: "404 — source not found at state capitol", tag: "failed", pause: 260 },
  { kind: "dim", text: "unwinding session ...", pause: 200 },
  { kind: "err", text: "segmentation fault (core dumped)", pause: 260 },
];

const usePrefersReducedMotion = () => {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
};

/** Monotonic-looking fake timestamp for a line index. */
const stampFor = (i: number) => {
  const ms = 380 + i * 617 + ((i * 97) % 240);
  const s = Math.floor(ms / 1000);
  return `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}.${String(
    ms % 1000
  ).padStart(3, "0")}`;
};

const WakeUp51 = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("scan");
  const [idx, setIdx] = useState(0);
  const [typed, setTyped] = useState(0);
  const [barValue, setBarValue] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const timers = useRef<number[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const skipToPayoff = useCallback(() => {
    clearTimers();
    setIdx(SCRIPT.length);
    setBarValue(100);
    setPhase("crash");
  }, [clearTimers]);

  const replay = useCallback(() => {
    clearTimers();
    setIdx(0);
    setTyped(0);
    setBarValue(0);
    setGlitch(false);
    setPhase("scan");
  }, [clearTimers]);

  useEffect(() => {
    trackEvent("wakeup51_start", { path: "/hack51" });
  }, []);

  // Drive the session: type command lines char-by-char, stream output lines.
  useEffect(() => {
    if (phase !== "scan") return;

    if (reducedMotion) {
      setIdx(SCRIPT.length);
      setBarValue(100);
      setPhase("crash");
      return;
    }

    if (idx >= SCRIPT.length) {
      const t = window.setTimeout(() => {
        setGlitch(true);
        const t2 = window.setTimeout(() => setPhase("crash"), 620);
        timers.current.push(t2);
      }, 420);
      timers.current.push(t);
      return;
    }

    const line = SCRIPT[idx];
    const advance = (delay: number) => {
      const t = window.setTimeout(() => {
        setIdx((i) => i + 1);
        setTyped(0);
        setBarValue(0);
      }, delay);
      timers.current.push(t);
    };

    if (line.kind === "cmd") {
      if (typed < line.text.length) {
        const t = window.setTimeout(
          () => setTyped((n) => n + 1),
          14 + Math.random() * 26
        );
        timers.current.push(t);
        return;
      }
      advance(line.pause ?? 220);
      return;
    }

    if (line.kind === "bar") {
      if (barValue < 100) return; // filled by the interval below
      advance(line.pause ?? 220);
      return;
    }

    advance(line.pause ?? 160);
  }, [phase, idx, typed, barValue, reducedMotion]);

  // Fake download progress for `bar` lines: stalls, then completes.
  useEffect(() => {
    if (phase !== "scan") return;
    if (SCRIPT[idx]?.kind !== "bar") return;
    const id = window.setInterval(() => {
      setBarValue((v) => {
        if (v >= 100) return 100;
        if (v > 88 && Math.random() > 0.35) return v + 0.4; // stall near the end
        return Math.min(100, v + 3 + Math.random() * 11);
      });
    }, 110);
    return () => window.clearInterval(id);
  }, [phase, idx]);

  // Keep the newest line in view.
  useEffect(() => {
    const el = logRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [idx, typed]);

  const visible = useMemo(() => SCRIPT.slice(0, Math.min(idx + 1, SCRIPT.length)), [idx]);

  return (
    <>
      <Seo
        title="Wake Up, District 51 | Keith Gettmann for Georgia"
        description="A message for Georgia House District 51 from the Keith Gettmann campaign."
        path="/hack51"
        noindex
      />

      <main className="relative min-h-dvh w-full overflow-hidden bg-terminal-bg font-body">
        {phase === "scan" && (
          <>
            <MatrixRain active={!reducedMotion} />

            {/* CRT scanlines + vignette + flicker */}
            {!reducedMotion && (
              <>
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20 opacity-[0.22]"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.65) 3px)",
                  }}
                />
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-20"
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(0,0,0,0) 45%, rgba(0,0,0,0.75) 100%)",
                  }}
                />
              </>
            )}

            <div
              className={`relative z-10 flex min-h-dvh flex-col px-4 py-5 sm:px-8 sm:py-8 ${
                glitch ? "animate-pulse" : ""
              }`}
            >
              {/* Fake terminal window chrome */}
              <div className="flex items-center justify-between border-b border-terminal-green-dim/40 pb-2 font-mono text-[0.6rem] uppercase tracking-[0.18em] text-terminal-green-dim">
                <span className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-terminal-red" />
                  d51-sweep — /dev/pts/0 — 120x40
                </span>
                <span className="hidden sm:inline">unsecured session detected</span>
              </div>

              <div className="mt-2 font-mono text-[0.62rem] leading-relaxed text-terminal-green-dim">
                Last login: today on pts/0 from 10.51.0.1
                <br />
                node: d51-node &nbsp;·&nbsp; kernel 6.9.0-common-sense &nbsp;·&nbsp; uptime 0 min
              </div>

              <div
                ref={logRef}
                className="mt-3 max-h-[62dvh] flex-1 space-y-[3px] overflow-y-auto pr-1"
              >
                {visible.map((line, i) => {
                  const isCurrent = i === idx;
                  const text =
                    line.kind === "cmd" && isCurrent ? line.text.slice(0, typed) : line.text;
                  const showTag = line.tag && (!isCurrent || line.kind !== "cmd");
                  return (
                    <TerminalLine
                      key={`${i}-${line.text}`}
                      kind={line.kind}
                      text={text}
                      tag={showTag ? line.tag : undefined}
                      stamp={stampFor(i)}
                      progress={line.kind === "bar" ? (isCurrent ? barValue : 100) : undefined}
                      caret={isCurrent}
                    />
                  );
                })}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-terminal-green-dim/40 pt-3">
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.18em] text-terminal-green-dim">
                  {Math.min(idx + 1, SCRIPT.length)}/{SCRIPT.length} tasks
                </span>
                <button
                  type="button"
                  onClick={skipToPayoff}
                  className="rounded-sm border border-terminal-green-dim px-4 py-1.5 font-mono text-[0.65rem] uppercase tracking-[0.2em] text-terminal-green-dim transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                >
                  skip
                </button>
              </div>
            </div>
          </>
        )}

        {phase === "crash" && (
          <div className="min-h-dvh">
            <CrashScreen glitch={!reducedMotion} />
          </div>
        )}

        {phase === "reveal" && (
          <div className="flex min-h-dvh flex-col items-center justify-center bg-crash-blue px-5 py-12">
            <RevealCard onReplay={replay} />
            <CommonIssues />
            <a
              href="/"
              className="mt-6 font-heading text-xs font-bold uppercase tracking-[0.2em] text-primary-foreground/60 transition-colors hover:text-accent"
            >
              ← Back to KeithforGA.com
            </a>
          </div>
        )}
      </main>
    </>
  );
};

export default WakeUp51;
