import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import Seo from "@/components/Seo";
import { MatrixRain, TerminalLine, CrashScreen, RevealCard, CommonIssues } from "@/components/wake-up-51";
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

interface ScanStep {
  text: string;
  result: string;
  bar?: boolean;
}

const SCAN_STEPS: ScanStep[] = [
  { text: "ESTABLISHING SECURE UPLINK :: DISTRICT 51", result: "CONNECTED" },
  { text: "SCANNING HOUSEHOLD COSTS: GROCERIES, RENT, UTILITIES", result: "STILL RISING" },
  { text: "PULLING PROPERTY TAX ASSESSMENT HISTORY", result: "REASSESSED AGAIN" },
  { text: "AUDITING STATE INCOME TAX WITHHOLDING", result: "OVERPAID" },
  { text: "ANALYZING TRAFFIC: GA-400 / ROSWELL RD CORRIDOR", result: "GRIDLOCK" },
  { text: "REQUESTING SCHOOL TRANSPARENCY + PARENTAL RIGHTS FILES", result: "ACCESS DENIED" },
  { text: "TESTING WATER QUALITY + ENVIRONMENTAL SAFETY REPORTS", result: "INCOMPLETE" },
  { text: "CHECKING PUBLIC SAFETY STAFFING LEVELS", result: "UNDERFUNDED" },
  { text: "DOWNLOADING COMMON SENSE FROM STATE CAPITOL", result: "SOURCE NOT FOUND", bar: true },
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

const WakeUp51 = () => {
  const reducedMotion = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("boot");
  const [stepIndex, setStepIndex] = useState(0);
  const [barValue, setBarValue] = useState(0);
  const [glitch, setGlitch] = useState(false);
  const timers = useRef<number[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  }, []);

  const skipToPayoff = useCallback(() => {
    clearTimers();
    setStepIndex(SCAN_STEPS.length);
    setBarValue(100);
    setPhase("crash");
  }, [clearTimers]);

  const startScan = useCallback(() => {
    trackEvent("wakeup51_start", { path: "/wake-up-51" });
    if (reducedMotion) {
      setStepIndex(SCAN_STEPS.length);
      setBarValue(100);
      setPhase("crash");
      return;
    }
    setPhase("scan");
    setStepIndex(0);
    setBarValue(0);
  }, [reducedMotion]);

  const replay = useCallback(() => {
    clearTimers();
    setStepIndex(0);
    setBarValue(0);
    setGlitch(false);
    setPhase("boot");
  }, [clearTimers]);

  // Drive the scan sequence.
  useEffect(() => {
    if (phase !== "scan") return;
    if (stepIndex >= SCAN_STEPS.length) {
      const t = window.setTimeout(() => {
        setGlitch(true);
        const t2 = window.setTimeout(() => setPhase("crash"), 700);
        timers.current.push(t2);
      }, 500);
      timers.current.push(t);
      return;
    }
    const t = window.setTimeout(() => setStepIndex((i) => i + 1), 900);
    timers.current.push(t);
  }, [phase, stepIndex]);

  // Fake progress bar animation.
  useEffect(() => {
    if (phase !== "scan") return;
    const id = window.setInterval(() => {
      setBarValue((v) => (v >= 99 ? 99 : v + Math.random() * 9));
    }, 90);
    return () => window.clearInterval(id);
  }, [phase]);

  // Auto-advance from the crash screen to the reveal.
  useEffect(() => {
    if (phase !== "crash") return;
    const t = window.setTimeout(() => setPhase("reveal"), reducedMotion ? 1200 : 3200);
    timers.current.push(t);
    return () => window.clearTimeout(t);
  }, [phase, reducedMotion]);

  useEffect(() => clearTimers, [clearTimers]);

  // Any key starts the sequence from the boot screen.
  useEffect(() => {
    if (phase !== "boot") return;
    const onKey = () => startScan();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, startScan]);

  const visibleSteps = useMemo(
    () => SCAN_STEPS.slice(0, Math.min(stepIndex + 1, SCAN_STEPS.length)),
    [stepIndex]
  );

  return (
    <>
      <Seo
        title="Wake Up, District 51 | Keith Gettmann for Georgia"
        description="A message for Georgia House District 51 from the Keith Gettmann campaign."
        path="/wake-up-51"
        noindex
      />

      <main className="relative min-h-dvh w-full overflow-hidden bg-terminal-bg font-body">
        {(phase === "boot" || phase === "scan") && (
          <>
            <MatrixRain active={!reducedMotion} />

            {/* Scanline overlay */}
            {!reducedMotion && (
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 opacity-25"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to bottom, rgba(0,0,0,0) 0px, rgba(0,0,0,0) 2px, rgba(0,0,0,0.5) 3px)",
                }}
              />
            )}

            <div
              className={`relative z-10 flex min-h-dvh flex-col px-5 py-8 sm:px-10 sm:py-12 ${
                glitch ? "animate-pulse" : ""
              }`}
            >
              {phase === "boot" ? (
                <button
                  type="button"
                  onClick={startScan}
                  className="flex flex-1 flex-col items-center justify-center gap-6 text-center focus-visible:outline-none"
                >
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.3em] text-terminal-green-dim sm:text-xs">
                    keithforga.secure.node // district-51
                  </span>
                  <span className="font-mono text-[0.7rem] uppercase tracking-[0.25em] text-accent">
                    unsecured session detected
                  </span>

                  <span className="font-mono text-lg text-terminal-green sm:text-2xl">
                    press any key to continue
                    <span className="ml-1 animate-pulse">_</span>
                  </span>
                  <span className="max-w-xs font-mono text-[0.65rem] leading-relaxed text-terminal-green-dim">
                    (this is a joke. nothing is collected.)
                  </span>
                </button>
              ) : (
                <>
                  <div className="mb-6 font-mono text-[0.7rem] uppercase tracking-[0.3em] text-accent">
                    access granted // running district 51 diagnostic
                  </div>

                  <div className="space-y-3">
                    {visibleSteps.map((step, i) => (
                      <TerminalLine
                        key={step.text}
                        text={step.text}
                        result={step.result}
                        bar={step.bar && i === stepIndex ? barValue : undefined}
                        done={i < stepIndex}
                      />
                    ))}
                  </div>
                </>
              )}

              {phase === "scan" && (
                <div className="mt-auto pt-8 text-center">
                  <button
                    type="button"
                    onClick={skipToPayoff}
                    className="rounded-full border border-terminal-green-dim px-5 py-2 font-mono text-[0.7rem] uppercase tracking-[0.2em] text-terminal-green-dim transition-colors hover:border-accent hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
                  >
                    skip
                  </button>
                </div>
              )}
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
