/*
 * Common-Sense Swing — hidden campaign mini-game.
 *
 * Premise: American politics has swung to the extremes. Your job is to
 * stop the pendulum in the "Common Sense" middle — where left and right
 * meet — across five real district scenarios. Get too far in either
 * direction and the policy misfires. Land in the center and both sides win.
 */

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Share2, RotateCcw, Play, Square, Trophy } from "lucide-react";
import {
  GamePageShell,
  GameHeader,
  GameStage,
  GameControls,
  ScoreStatus,
  ResultsPanel,
  SharePanel,
  BackToSiteButton,
  CampaignDisclaimer,
} from "@/components/common-sense-swing";
import { winredUrl } from "@/lib/winred";
import { trackDonateClick, trackEvent } from "@/lib/analytics";

/* ------------------------------------------------------------------ */
/* Scenarios — District 51 flavored. Each has a left/center/right take. */
/* ------------------------------------------------------------------ */

type Scenario = {
  topic: string;
  prompt: string;
  farLeft: string;
  left: string;
  center: string;
  right: string;
  farRight: string;
};

const SCENARIOS: Scenario[] = [
  {
    topic: "Public Schools",
    prompt: "How should we fund and improve District 51 schools?",
    farLeft: "Abolish testing, blank check — no accountability.",
    left: "More funding, stronger teacher pay.",
    center: "Fund what works. Pay teachers well AND measure results.",
    right: "School choice with strong local standards.",
    farRight: "Defund public schools entirely.",
  },
  {
    topic: "Traffic & Roads",
    prompt: "GA-400 and 141 are choking. What's the fix?",
    farLeft: "Ban cars. Bikes only.",
    left: "Massive transit expansion, tax the drivers.",
    center: "Smart signals, targeted widening, and real transit options.",
    right: "Build more lanes, cut permitting red tape.",
    farRight: "Toll everything. Privatize the roads.",
  },
  {
    topic: "Public Safety",
    prompt: "How do we keep neighborhoods safe without overreach?",
    farLeft: "Defund the police.",
    left: "Reform training, invest in mental-health response.",
    center: "Well-trained officers + community partnerships that work.",
    right: "Back the blue, tougher sentencing.",
    farRight: "Militarize every department.",
  },
  {
    topic: "Housing Costs",
    prompt: "Young families can't afford to stay in the district.",
    farLeft: "Statewide rent control on everything.",
    left: "Subsidize affordable units, cap rent hikes.",
    center: "Cut red tape so builders build — and protect neighborhoods.",
    right: "Deregulate zoning. Let the market work.",
    farRight: "Zero rules. Anyone builds anything anywhere.",
  },
  {
    topic: "Taxes & Spending",
    prompt: "Georgia's budget is tight. What's the play?",
    farLeft: "Tax the rich into oblivion.",
    left: "Raise revenue, expand services.",
    center: "Fiscal discipline with smart investment in people.",
    right: "Cut spending, cut taxes.",
    farRight: "Abolish the income tax. Slash everything.",
  },
];

/* ------------------------------------------------------------------ */
/* Zone math — pendulum position is 0..1 across the meter.            */
/* ------------------------------------------------------------------ */

type Zone = "farLeft" | "left" | "center" | "right" | "farRight";

// Zone thresholds (fractions of the meter width).
const ZONES = {
  farLeftEnd: 0.15,
  leftEnd: 0.4,
  rightStart: 0.6,
  farRightStart: 0.85,
};

const zoneAt = (p: number): Zone => {
  if (p < ZONES.farLeftEnd) return "farLeft";
  if (p < ZONES.leftEnd) return "left";
  if (p <= ZONES.rightStart) return "center";
  if (p <= ZONES.farRightStart) return "right";
  return "farRight";
};

const scoreForZone = (z: Zone, distFromCenter: number): number => {
  switch (z) {
    case "center": {
      // 0..1 where 0 is dead-center. Bullseye bonus <0.03.
      if (distFromCenter < 0.03) return 150;
      return 100;
    }
    case "left":
    case "right":
      return 50;
    default:
      return 0;
  }
};

const zoneLabel = (z: Zone) =>
  ({
    farLeft: "Far Left",
    left: "Left",
    center: "Common Sense",
    right: "Right",
    farRight: "Far Right",
  }[z]);

const feedback = (z: Zone, s: Scenario) => {
  switch (z) {
    case "center":
      return `Bullseye. ${s.center}`;
    case "left":
      return `Reasonable left take. ${s.left}`;
    case "right":
      return `Reasonable right take. ${s.right}`;
    case "farLeft":
      return `Too far left. ${s.farLeft}`;
    case "farRight":
      return `Too far right. ${s.farRight}`;
  }
};

/* ------------------------------------------------------------------ */
/* Tiers based on total score across 5 rounds (max 750).              */
/* ------------------------------------------------------------------ */

const tierFor = (score: number) => {
  if (score >= 600)
    return {
      title: "Bridge-Builder",
      body: "You govern from the middle where things actually get done. Keith would hire you.",
    };
  if (score >= 400)
    return {
      title: "Common-Sense Voter",
      body: "You lean, but you listen. That's how District 51 wins.",
    };
  if (score >= 200)
    return {
      title: "Purple Streak",
      body: "You've got range. A little more center and you'd be unstoppable.",
    };
  return {
    title: "Extremist Warning",
    body: "The pendulum won you. Politics needs fewer swings, more balance.",
  };
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

type Phase = "idle" | "swinging" | "locked" | "done";

const CommonSenseSwing = () => {
  const [round, setRound] = useState(0); // 0..4
  const [phase, setPhase] = useState<Phase>("idle");
  const [position, setPosition] = useState(0.5); // 0..1
  const [score, setScore] = useState(0);
  const [breakdown, setBreakdown] = useState<
    { topic: string; zone: Zone; points: number; note: string }[]
  >([]);
  const [lockedInfo, setLockedInfo] = useState<{
    zone: Zone;
    points: number;
    note: string;
  } | null>(null);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [copied, setCopied] = useState(false);

  const rafRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const on = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", on);
    return () => mq.removeEventListener?.("change", on);
  }, []);

  const scenario = SCENARIOS[Math.min(round, SCENARIOS.length - 1)];
  const isDone = phase === "done";

  // Round difficulty: speed increases per round.
  const speed = useMemo(() => 1.1 + round * 0.35, [round]); // radians/sec ish

  /* --------------- Pendulum animation loop --------------- */
  useEffect(() => {
    if (phase !== "swinging") return;

    if (reducedMotion) {
      // Static mode: cycle discrete positions slowly so users can tap intentionally.
      startTimeRef.current = performance.now();
      const id = window.setInterval(() => {
        const t = (performance.now() - startTimeRef.current) / 1000;
        const p = 0.5 + 0.45 * Math.sin(t * speed * 0.6);
        setPosition(p);
      }, 120);
      return () => window.clearInterval(id);
    }

    startTimeRef.current = performance.now();
    const tick = () => {
      const t = (performance.now() - startTimeRef.current) / 1000;
      // Sinusoidal sweep across 0.02..0.98 for near full width.
      const p = 0.5 + 0.48 * Math.sin(t * speed);
      setPosition(p);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [phase, speed, reducedMotion]);

  /* --------------- Actions --------------- */
  const startSwing = useCallback(() => {
    setLockedInfo(null);
    setPhase("swinging");
    trackEvent("css_round_start", { round: round + 1 });
  }, [round]);

  const lockIn = useCallback(() => {
    setPhase("locked");
    const z = zoneAt(position);
    const dist = Math.abs(position - 0.5) * 2; // 0..~1
    const pts = scoreForZone(z, dist);
    const note = feedback(z, scenario);
    setLockedInfo({ zone: z, points: pts, note });
    setScore((s) => s + pts);
    setBreakdown((b) => [...b, { topic: scenario.topic, zone: z, points: pts, note }]);
    trackEvent("css_round_lock", { round: round + 1, zone: z, points: pts });
  }, [position, round, scenario]);

  const nextRound = useCallback(() => {
    if (round >= SCENARIOS.length - 1) {
      setPhase("done");
      trackEvent("css_game_complete", { score });
      return;
    }
    setRound((r) => r + 1);
    setPhase("idle");
    setLockedInfo(null);
    setPosition(0.5);
  }, [round, score]);

  const resetGame = useCallback(() => {
    setRound(0);
    setPhase("idle");
    setPosition(0.5);
    setScore(0);
    setBreakdown([]);
    setLockedInfo(null);
    setCopied(false);
  }, []);

  /* --------------- Keyboard (Space) --------------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code !== "Space" && e.key !== " ") return;
      // Avoid stealing space from inputs.
      const t = e.target as HTMLElement | null;
      if (t && ("INPUT" === t.tagName || "TEXTAREA" === t.tagName)) return;
      e.preventDefault();
      if (phase === "idle") startSwing();
      else if (phase === "swinging") lockIn();
      else if (phase === "locked") nextRound();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [phase, startSwing, lockIn, nextRound]);

  /* --------------- Sharing --------------- */
  const tier = tierFor(score);
  const shareText = `I scored ${score}/750 on Common-Sense Swing — "${tier.title}". Can you land in the middle? Play at`;
  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}/common-sense-swing`
      : "";

  const onShare = async () => {
    trackEvent("css_share_click", { score });
    const data = { title: "Common-Sense Swing", text: shareText, url: shareUrl };
    try {
      // @ts-expect-error - navigator.share is not typed everywhere
      if (navigator.share) {
        // @ts-expect-error
        await navigator.share(data);
        return;
      }
    } catch {
      /* user canceled — fall through */
    }
    try {
      await navigator.clipboard.writeText(`${shareText} ${shareUrl}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  };

  /* --------------- Status text --------------- */
  const status = (() => {
    if (phase === "idle") return `Round ${round + 1} of 5 — press Start (or Space).`;
    if (phase === "swinging") return "Tap Stop (or Space) when the pendulum is in the middle.";
    if (phase === "locked" && lockedInfo)
      return `${zoneLabel(lockedInfo.zone)} — +${lockedInfo.points} pts`;
    return "Game complete.";
  })();

  /* --------------- Render --------------- */
  return (
    <GamePageShell>
      <GameHeader
        title="Common-Sense Swing"
        intro="American politics keeps swinging to the extremes. Your job: stop the pendulum in the middle — where left and right actually agree. Five rounds. Real District 51 issues."
      />

      <main className="flex-1 w-full container mx-auto max-w-5xl px-4 py-6 md:py-10">
        <GameStage>
          <Stage
            scenario={scenario}
            round={round}
            phase={phase}
            position={position}
            lockedInfo={lockedInfo}
            score={score}
            isDone={isDone}
          />
        </GameStage>

        <GameControls>
          {phase === "idle" && !isDone && (
            <button
              type="button"
              onClick={startSwing}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-heading uppercase tracking-wide text-accent-foreground text-sm hover:brightness-95 transition"
            >
              <Play className="h-4 w-4" />
              Start swing
            </button>
          )}
          {phase === "swinging" && (
            <button
              type="button"
              onClick={lockIn}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-6 py-3 font-heading uppercase tracking-wide text-accent-foreground text-base hover:brightness-95 transition shadow-lg animate-pulse"
            >
              <Square className="h-4 w-4" />
              Stop
            </button>
          )}
          {phase === "locked" && (
            <button
              type="button"
              onClick={nextRound}
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-heading uppercase tracking-wide text-accent-foreground text-sm hover:brightness-95 transition"
            >
              {round >= SCENARIOS.length - 1 ? "See results" : "Next round"}
            </button>
          )}
          {isDone && (
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/30 bg-transparent px-5 py-2.5 font-heading uppercase tracking-wide text-primary-foreground text-sm hover:bg-primary-foreground/10 transition"
            >
              <RotateCcw className="h-4 w-4" />
              Play again
            </button>
          )}
        </GameControls>

        <ScoreStatus score={score} status={status} />

        <ResultsPanel open={isDone}>
          <div className="flex items-start gap-4">
            <div className="hidden md:flex items-center justify-center w-14 h-14 rounded-full bg-accent/15 text-accent shrink-0">
              <Trophy className="h-7 w-7" />
            </div>
            <div className="flex-1">
              <h2 className="font-heading uppercase text-2xl md:text-3xl font-bold text-primary">
                {tier.title}
              </h2>
              <div className="w-12 h-[3px] bg-accent mt-3 mb-4" />
              <p className="text-foreground/80 leading-relaxed">{tier.body}</p>
              <p className="mt-3 text-sm text-muted-foreground">
                Final score: <span className="font-bold text-foreground">{score}</span> / 750
              </p>
            </div>
          </div>

          <ul className="mt-6 space-y-2">
            {breakdown.map((b, i) => (
              <li
                key={i}
                className="flex items-center justify-between gap-3 rounded-md border border-border/60 bg-background px-3 py-2 text-sm"
              >
                <span className="font-heading uppercase tracking-wide text-foreground/80">
                  {i + 1}. {b.topic}
                </span>
                <span className="flex items-center gap-3">
                  <span className="text-muted-foreground">{zoneLabel(b.zone)}</span>
                  <span
                    className={
                      b.points >= 100
                        ? "text-accent font-bold"
                        : b.points > 0
                        ? "text-foreground font-semibold"
                        : "text-destructive font-semibold"
                    }
                  >
                    +{b.points}
                  </span>
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-md bg-primary/5 border border-primary/10 p-4 text-sm text-foreground/80">
            <strong className="text-primary">Keith's take:</strong> Left and right aren't enemies —
            they're neighbors. Real progress in District 51 lives in that middle. If this game made
            you smile, chip in and help build a smarter House.
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={winredUrl("common_sense_swing_end")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackDonateClick("common_sense_swing", "Donate (game end)", {
                  provider: "winred",
                  score,
                })
              }
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-heading uppercase tracking-wide text-accent-foreground text-sm hover:brightness-95 transition"
            >
              Donate to Keith
            </a>
            <button
              type="button"
              onClick={resetGame}
              className="inline-flex items-center gap-2 rounded-md border border-border px-5 py-2.5 font-heading uppercase tracking-wide text-foreground text-sm hover:bg-muted transition"
            >
              <RotateCcw className="h-4 w-4" />
              Play again
            </button>
          </div>
        </ResultsPanel>

        {isDone && (
          <SharePanel>
            <p className="w-full text-center text-primary-foreground/70 text-sm mb-1">
              Challenge a friend to beat your score.
            </p>
            <button
              type="button"
              onClick={onShare}
              className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-transparent px-4 py-2 text-sm font-heading uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10 transition-colors"
            >
              <Share2 className="h-4 w-4" />
              {copied ? "Link copied!" : "Share result"}
            </button>
          </SharePanel>
        )}

        <div className="mt-8 flex justify-center">
          <BackToSiteButton />
        </div>

        <CampaignDisclaimer />
      </main>
    </GamePageShell>
  );
};

/* ------------------------------------------------------------------ */
/* Stage — the pendulum meter + scenario copy                         */
/* ------------------------------------------------------------------ */

const Stage = ({
  scenario,
  round,
  phase,
  position,
  lockedInfo,
  score,
  isDone,
}: {
  scenario: Scenario;
  round: number;
  phase: Phase;
  position: number;
  lockedInfo: { zone: Zone; points: number; note: string } | null;
  score: number;
  isDone: boolean;
}) => {
  const pct = `${(position * 100).toFixed(2)}%`;

  if (isDone) {
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center bg-gradient-to-b from-background to-muted">
        <div className="w-16 h-16 rounded-full bg-accent/20 flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-accent" />
        </div>
        <p className="font-heading uppercase text-xs tracking-widest text-muted-foreground">
          Final score
        </p>
        <p className="font-heading text-5xl md:text-6xl font-bold text-primary mt-1">{score}</p>
        <p className="text-muted-foreground text-sm mt-2">out of 750</p>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 flex flex-col p-4 md:p-6 bg-gradient-to-b from-background to-muted">
      {/* Scenario card */}
      <div className="mb-3 md:mb-4">
        <p className="font-heading uppercase text-[10px] md:text-xs tracking-widest text-accent">
          Round {round + 1} of 5 · {scenario.topic}
        </p>
        <h2 className="font-heading text-lg md:text-2xl text-foreground mt-1 leading-tight">
          {scenario.prompt}
        </h2>
      </div>

      {/* Meter */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="relative w-full">
          {/* Zone bar */}
          <div className="relative h-10 md:h-12 w-full rounded-full overflow-hidden border border-border shadow-inner flex">
            <div
              className="h-full bg-destructive/80"
              style={{ width: `${ZONES.farLeftEnd * 100}%` }}
              title="Far Left"
            />
            <div
              className="h-full bg-blue-500/70"
              style={{ width: `${(ZONES.leftEnd - ZONES.farLeftEnd) * 100}%` }}
              title="Left"
            />
            <div
              className="h-full bg-accent"
              style={{ width: `${(ZONES.rightStart - ZONES.leftEnd) * 100}%` }}
              title="Common Sense"
            />
            <div
              className="h-full bg-red-500/70"
              style={{ width: `${(ZONES.farRightStart - ZONES.rightStart) * 100}%` }}
              title="Right"
            />
            <div
              className="h-full bg-destructive/80"
              style={{ width: `${(1 - ZONES.farRightStart) * 100}%` }}
              title="Far Right"
            />
          </div>

          {/* Center tick */}
          <div className="absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-primary/70 pointer-events-none" />

          {/* Pendulum indicator */}
          <div
            className="absolute -top-2 md:-top-3 -translate-x-1/2 pointer-events-none transition-transform"
            style={{ left: pct }}
          >
            <div className="w-1 md:w-1.5 h-14 md:h-16 bg-primary rounded-full shadow-lg" />
            <div className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-primary border-2 border-accent shadow-md -mt-1 mx-auto" />
          </div>
        </div>

        {/* Zone labels */}
        <div className="mt-8 md:mt-10 grid grid-cols-5 text-[9px] md:text-[11px] font-heading uppercase tracking-wider text-muted-foreground">
          <span className="text-left">Far Left</span>
          <span className="text-center">Left</span>
          <span className="text-center text-accent font-bold">Common Sense</span>
          <span className="text-center">Right</span>
          <span className="text-right">Far Right</span>
        </div>
      </div>

      {/* Feedback */}
      <div className="mt-4 min-h-[3.5rem] md:min-h-[4rem]">
        {phase === "locked" && lockedInfo ? (
          <div
            className={`rounded-md border p-3 text-sm md:text-base ${
              lockedInfo.zone === "center"
                ? "border-accent/60 bg-accent/10 text-foreground"
                : lockedInfo.points > 0
                ? "border-border bg-background text-foreground"
                : "border-destructive/40 bg-destructive/10 text-foreground"
            }`}
          >
            <span className="font-heading uppercase tracking-wide text-xs md:text-sm">
              {zoneLabel(lockedInfo.zone)} · +{lockedInfo.points}
            </span>
            <p className="mt-1 leading-snug">{lockedInfo.note}</p>
          </div>
        ) : phase === "swinging" ? (
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Aim for the <span className="text-accent font-bold">gold</span> zone. Tap Stop or press{" "}
            <kbd className="px-1.5 py-0.5 rounded border border-border bg-background text-xs">
              Space
            </kbd>
            .
          </p>
        ) : (
          <p className="text-center text-muted-foreground text-sm md:text-base">
            Left and right both have a point. The trick is finding where they meet.
          </p>
        )}
      </div>
    </div>
  );
};

export default CommonSenseSwing;
