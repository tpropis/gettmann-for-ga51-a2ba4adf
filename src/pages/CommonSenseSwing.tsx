import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { Volume2, VolumeX, Pause, Play, RotateCcw, Share2, ArrowLeft } from "lucide-react";
import logo from "@/assets/logo_trans.svg";
import { winredUrl } from "@/lib/winred";
import { trackDonateClick } from "@/lib/analytics";

/* --------- Types --------- */
type Phase = "intro" | "balance" | "scenarios" | "end";

type Scenario = {
  q: string;
  answers: { label: string; kind: "left" | "conservative" | "reckless" }[];
};

const SCENARIOS: Scenario[] = [
  {
    q: "Families are being squeezed by rising property taxes. What should state leaders do?",
    answers: [
      { label: "Create a new statewide subsidy program funded through additional taxes.", kind: "left" },
      { label: "Control spending, protect homeowners, and require transparency before taxes increase.", kind: "conservative" },
      { label: "Eliminate every local property tax immediately without identifying replacement funding.", kind: "reckless" },
    ],
  },
  {
    q: "Parents want more confidence in their children's schools.",
    answers: [
      { label: "Move more decisions away from parents and into centralized agencies.", kind: "left" },
      { label: "Strengthen parental involvement, transparency, accountability, and local control.", kind: "conservative" },
      { label: "Eliminate all public education funding.", kind: "reckless" },
    ],
  },
  {
    q: "Residents are concerned about crime and neighborhood safety.",
    answers: [
      { label: "Reduce law-enforcement resources before effective alternatives are established.", kind: "left" },
      { label: "Support law enforcement while requiring strong training, accountability, and measurable results.", kind: "conservative" },
      { label: "Expand enforcement authority without oversight or accountability.", kind: "reckless" },
    ],
  },
  {
    q: "Local businesses are struggling with high costs and unnecessary regulation.",
    answers: [
      { label: "Add more regulatory requirements and government-run programs.", kind: "left" },
      { label: "Reduce unnecessary red tape, maintain competitive taxes, and help local businesses grow.", kind: "conservative" },
      { label: "Remove every regulation regardless of public safety consequences.", kind: "reckless" },
    ],
  },
  {
    q: "Residents feel ignored by elected officials.",
    answers: [
      { label: "Let party organizations and state agencies determine local priorities.", kind: "left" },
      { label: "Listen directly to residents through the Community Council and publish clear priorities.", kind: "conservative" },
      { label: "Stop seeking public input after Election Day.", kind: "reckless" },
    ],
  },
];

/* --------- Character (illustrated SVG) --------- */
const KeithFigure = ({ tilt = 0 }: { tilt?: number }) => (
  <svg viewBox="0 0 100 160" width="100%" height="100%" style={{ transform: `rotate(${tilt}deg)`, transformOrigin: "50% 0%" }}>
    {/* rope grip arms */}
    <path d="M50 8 L38 32 L44 42" stroke="#0f2547" strokeWidth="4" fill="none" strokeLinecap="round" />
    <path d="M50 8 L62 32 L56 42" stroke="#0f2547" strokeWidth="4" fill="none" strokeLinecap="round" />
    {/* head */}
    <circle cx="50" cy="52" r="14" fill="#f2d3b3" stroke="#0f2547" strokeWidth="1.5" />
    {/* hair */}
    <path d="M36 50 Q38 38 50 36 Q62 38 64 50 Q60 44 50 44 Q40 44 36 50 Z" fill="#3b2a1a" />
    {/* eyes */}
    <circle cx="45" cy="53" r="1.2" fill="#0f2547" />
    <circle cx="55" cy="53" r="1.2" fill="#0f2547" />
    {/* smile */}
    <path d="M45 59 Q50 62 55 59" stroke="#0f2547" strokeWidth="1.3" fill="none" strokeLinecap="round" />
    {/* neck */}
    <rect x="46" y="64" width="8" height="6" fill="#f2d3b3" />
    {/* suit */}
    <path d="M30 70 L50 66 L70 70 L74 120 L26 120 Z" fill="#0f2547" stroke="#08192e" strokeWidth="1" />
    {/* shirt */}
    <path d="M44 68 L50 78 L56 68 L54 95 L46 95 Z" fill="#ffffff" />
    {/* gold tie */}
    <path d="M48 74 L52 74 L54 78 L52 96 L50 100 L48 96 L46 78 Z" fill="#dbb04a" stroke="#a5842f" strokeWidth="0.6" />
    {/* lapel gold pin */}
    <circle cx="42" cy="82" r="1.4" fill="#dbb04a" />
    {/* legs */}
    <rect x="36" y="118" width="12" height="30" fill="#1a2a3e" />
    <rect x="52" y="118" width="12" height="30" fill="#1a2a3e" />
    {/* shoes */}
    <ellipse cx="42" cy="150" rx="8" ry="4" fill="#111" />
    <ellipse cx="58" cy="150" rx="8" ry="4" fill="#111" />
  </svg>
);

/* --------- Page --------- */
const CommonSenseSwing = () => {
  const [phase, setPhase] = useState<Phase>("intro");
  const [muted, setMuted] = useState(true);
  const [paused, setPaused] = useState(false);
  const reducedMotion = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    []
  );

  /* Balance state */
  const [attempt, setAttempt] = useState(1);
  const [attemptScores, setAttemptScores] = useState<number[]>([]);
  const [bestBalance, setBestBalance] = useState(0);
  const angleRef = useRef(reducedMotion ? 5 : 25);
  const velRef = useRef(0);
  const [angle, setAngle] = useState(angleRef.current);
  const [stoppedInfo, setStoppedInfo] = useState<{ score: number; msg: string; angle: number } | null>(null);
  const stoppedRef = useRef(false);
  const inputRef = useRef<{ left: boolean; right: boolean }>({ left: false, right: false });
  const TARGET_ANGLE = 10; // slightly right of center
  const TARGET_WIDTH = 10;

  /* Scenario state */
  const [scenIndex, setScenIndex] = useState(0);
  const [scenScore, setScenScore] = useState(0);

  /* End */
  const [copied, setCopied] = useState(false);

  /* audio */
  const audioCtxRef = useRef<AudioContext | null>(null);
  const beep = useCallback(
    (freq: number, dur = 0.08) => {
      if (muted) return;
      try {
        if (!audioCtxRef.current) audioCtxRef.current = new AudioContext();
        const ctx = audioCtxRef.current;
        const o = ctx.createOscillator();
        const g = ctx.createGain();
        o.frequency.value = freq;
        o.type = "sine";
        g.gain.value = 0.05;
        o.connect(g).connect(ctx.destination);
        o.start();
        o.stop(ctx.currentTime + dur);
      } catch {}
    },
    [muted]
  );

  /* Keyboard */
  useEffect(() => {
    if (phase !== "balance") return;
    const down = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) inputRef.current.left = true;
      if (["ArrowRight", "d", "D"].includes(e.key)) inputRef.current.right = true;
      if (e.key === " " || e.code === "Space") {
        e.preventDefault();
        tryStop();
      }
    };
    const up = (e: KeyboardEvent) => {
      if (["ArrowLeft", "a", "A"].includes(e.key)) inputRef.current.left = false;
      if (["ArrowRight", "d", "D"].includes(e.key)) inputRef.current.right = false;
    };
    window.addEventListener("keydown", down);
    window.addEventListener("keyup", up);
    return () => {
      window.removeEventListener("keydown", down);
      window.removeEventListener("keyup", up);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase, stoppedInfo, paused]);

  /* Prevent page scroll during active balance */
  useEffect(() => {
    if (phase === "balance" && !stoppedInfo) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [phase, stoppedInfo]);

  /* Pendulum loop */
  useEffect(() => {
    if (phase !== "balance" || stoppedInfo || paused) return;
    let raf = 0;
    let last = performance.now();
    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;
      if (reducedMotion) {
        // step-based
        if (inputRef.current.left) angleRef.current -= 25 * dt;
        if (inputRef.current.right) angleRef.current += 25 * dt;
      } else {
        // pendulum: restoring toward 0, plus damping and input
        const restore = -angleRef.current * 2.2;
        const damping = -velRef.current * 0.35;
        let input = 0;
        if (inputRef.current.left) input -= 55;
        if (inputRef.current.right) input += 55;
        velRef.current += (restore + damping + input) * dt;
        angleRef.current += velRef.current * dt;
      }
      angleRef.current = Math.max(-55, Math.min(55, angleRef.current));
      setAngle(angleRef.current);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [phase, stoppedInfo, paused, reducedMotion]);

  const tryStop = useCallback(() => {
    if (stoppedRef.current) return;
    stoppedRef.current = true;
    const a = angleRef.current;
    const dist = Math.abs(a - TARGET_ANGLE);
    let score: number;
    let msg: string;
    if (dist <= TARGET_WIDTH / 2) {
      score = 100 - dist * 4;
      msg = "Grounded in common sense.";
      beep(660);
    } else if (dist <= TARGET_WIDTH) {
      score = 80 - dist * 3;
      msg = "Strong principles. Steadier execution needed.";
      beep(500);
    } else if (a < TARGET_ANGLE) {
      score = Math.max(0, 60 - dist * 2);
      msg = "Too much government. Bring decisions closer to families and communities.";
      beep(240);
    } else {
      score = Math.max(0, 60 - dist * 2);
      msg = "Principles matter. Results and responsible execution matter too.";
      beep(240);
    }
    score = Math.round(Math.max(0, Math.min(100, score)));
    setStoppedInfo({ score, msg, angle: a });
    setBestBalance((b) => Math.max(b, score));
    velRef.current = 0;
  }, [beep]);

  const nextAttempt = () => {
    if (attempt >= 3) {
      setAttemptScores((s) => [...s, stoppedInfo!.score]);
      setPhase("scenarios");
      return;
    }
    setAttemptScores((s) => [...s, stoppedInfo!.score]);
    setAttempt((a) => a + 1);
    angleRef.current = reducedMotion ? 5 : (Math.random() > 0.5 ? 30 : -30);
    velRef.current = reducedMotion ? 0 : (Math.random() - 0.5) * 20;
    setAngle(angleRef.current);
    stoppedRef.current = false;
    setStoppedInfo(null);
  };

  const chooseAnswer = (kind: "left" | "conservative" | "reckless") => {
    let s = 0;
    if (kind === "conservative") s = 20;
    else if (kind === "left") s = 5;
    else s = 0;
    setScenScore((v) => v + s);
    beep(kind === "conservative" ? 700 : 300);
    if (scenIndex + 1 >= SCENARIOS.length) {
      setPhase("end");
    } else {
      setScenIndex((i) => i + 1);
    }
  };

  const finalScore = useMemo(() => {
    if (phase !== "end") return 0;
    const balAvg = attemptScores.length ? attemptScores.reduce((a, b) => a + b, 0) / attemptScores.length : 0;
    // 60% balance, 40% scenarios (max 100 each)
    return Math.round(balAvg * 0.6 + scenScore * 0.4);
  }, [phase, attemptScores, scenScore]);

  const resultTier = (s: number) => {
    if (s >= 90) return { title: "COMMON-SENSE CHAMPION", msg: "You kept District 51 grounded in conservative principles, local leadership, and real results." };
    if (s >= 75) return { title: "STRONG AND STEADY", msg: "You stayed focused on families, accountability, and responsible conservative leadership." };
    if (s >= 50) return { title: "POLITICAL CROSSWINDS", msg: "You survived the swing, but District 51 needs a steadier hand." };
    return { title: "TOO MUCH POLITICAL THEATER", msg: "Time to get back to local priorities, conservative principles, and practical results." };
  };

  const share = async () => {
    const text = `I scored ${finalScore} in Keith Gettmann's Common-Sense Swing. Can you keep District 51 grounded?`;
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ text, url, title: "Common-Sense Swing" });
        return;
      } catch {}
    }
    try {
      await navigator.clipboard.writeText(`${text} ${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {}
  };

  const resetAll = () => {
    setPhase("intro");
    setAttempt(1);
    setAttemptScores([]);
    setBestBalance(0);
    angleRef.current = reducedMotion ? 5 : 25;
    velRef.current = 0;
    setAngle(angleRef.current);
    stoppedRef.current = false;
    setStoppedInfo(null);
    setScenIndex(0);
    setScenScore(0);
    setPaused(false);
  };

  const startBalance = () => {
    setPhase("balance");
    angleRef.current = reducedMotion ? 5 : 25;
    velRef.current = reducedMotion ? 0 : 8;
    setAngle(angleRef.current);
    stoppedRef.current = false;
    setStoppedInfo(null);
  };

  /* --------- Render --------- */
  return (
    <div className="min-h-dvh bg-primary text-primary-foreground flex flex-col">
      {/* Top bar */}
      <header className="border-b border-primary-foreground/10 bg-primary/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between py-3">
          <Link to="/" className="flex items-center gap-2" aria-label="Back to main site">
            <img src={logo} alt="Keith Gettmann for Georgia" className="h-10 md:h-12" />
          </Link>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setMuted((m) => !m)}
              className="p-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10"
              aria-label={muted ? "Unmute" : "Mute"}
            >
              {muted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
            {phase === "balance" && (
              <button
                onClick={() => setPaused((p) => !p)}
                className="p-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10"
                aria-label={paused ? "Resume" : "Pause"}
              >
                {paused ? <Play size={18} /> : <Pause size={18} />}
              </button>
            )}
            <button
              onClick={resetAll}
              className="p-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10"
              aria-label="Restart game"
            >
              <RotateCcw size={18} />
            </button>
            <Link
              to="/"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm font-heading uppercase tracking-wide px-3 py-2 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10"
            >
              <ArrowLeft size={14} /> Main Site
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto max-w-[960px] py-6 md:py-10 px-4">
        {phase === "intro" && (
          <section className="text-center">
            <div className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/40 text-accent text-xs font-heading uppercase tracking-widest mb-4">
              District 51 · Campaign Game
            </div>
            <h1 className="font-heading text-3xl md:text-5xl font-bold uppercase tracking-tight">
              Can You Keep District 51 Grounded?
            </h1>
            <div className="w-20 h-[3px] bg-accent mx-auto my-5" />
            <p className="text-base md:text-lg text-primary-foreground/80 max-w-2xl mx-auto leading-relaxed">
              Politics pulls left. Politics pulls right. District 51 needs conservative leadership focused on families, accountability, and results.
            </p>
            <div className="mt-8 grid md:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
              <div className="p-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/5">
                <div className="text-accent text-xs font-heading uppercase tracking-wider">Round 1</div>
                <div className="font-heading text-lg mt-1">Tap to Balance</div>
                <p className="text-sm text-primary-foreground/70 mt-1">Steady Keith inside the Common-Sense Conservative zone.</p>
              </div>
              <div className="p-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/5">
                <div className="text-accent text-xs font-heading uppercase tracking-wider">Round 2</div>
                <div className="font-heading text-lg mt-1">District 51 Decisions</div>
                <p className="text-sm text-primary-foreground/70 mt-1">Five real questions facing our community.</p>
              </div>
              <div className="p-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/5">
                <div className="text-accent text-xs font-heading uppercase tracking-wider">Result</div>
                <div className="font-heading text-lg mt-1">Your Common-Sense Score</div>
                <p className="text-sm text-primary-foreground/70 mt-1">Share it and challenge a neighbor.</p>
              </div>
            </div>
            <button
              onClick={startBalance}
              className="mt-8 inline-flex items-center gap-2 bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded-md hover:brightness-95 tracking-wide uppercase shadow-lg shadow-accent/20"
            >
              Start the Swing
            </button>
          </section>
        )}

        {phase === "balance" && (
          <BalanceStage
            angle={angle}
            attempt={attempt}
            bestBalance={bestBalance}
            stoppedInfo={stoppedInfo}
            targetAngle={TARGET_ANGLE}
            targetWidth={TARGET_WIDTH}
            onPressLeft={(v) => (inputRef.current.left = v)}
            onPressRight={(v) => (inputRef.current.right = v)}
            onStop={tryStop}
            onNext={nextAttempt}
            attemptCount={3}
            paused={paused}
          />
        )}

        {phase === "scenarios" && (
          <section className="max-w-2xl mx-auto">
            <div className="flex items-center justify-between mb-4">
              <div className="text-accent text-xs font-heading uppercase tracking-widest">
                Round 2 · Question {scenIndex + 1} of {SCENARIOS.length}
              </div>
              <div className="text-sm text-primary-foreground/70 font-heading">Score: {scenScore}</div>
            </div>
            <div className="h-1.5 rounded-full bg-primary-foreground/10 overflow-hidden mb-6">
              <div className="h-full bg-accent transition-all" style={{ width: `${(scenIndex / SCENARIOS.length) * 100}%` }} />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl font-bold leading-tight">
              {SCENARIOS[scenIndex].q}
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              {SCENARIOS[scenIndex].answers.map((a, i) => (
                <button
                  key={i}
                  onClick={() => chooseAnswer(a.kind)}
                  className="text-left p-4 rounded-md border border-primary-foreground/15 bg-primary-foreground/5 hover:bg-primary-foreground/10 hover:border-accent/50 transition-colors text-[16px] leading-snug"
                >
                  {a.label}
                </button>
              ))}
            </div>
          </section>
        )}

        {phase === "end" && (
          <EndScreen
            score={finalScore}
            tier={resultTier(finalScore)}
            onShare={share}
            copied={copied}
            onReplay={resetAll}
          />
        )}
      </main>

      <footer className="border-t border-primary-foreground/10 py-4 text-center text-xs text-primary-foreground/60 font-body">
        Paid for by Keith for GA LLC
      </footer>
    </div>
  );
};

/* --------- Balance stage --------- */
const BalanceStage = ({
  angle,
  attempt,
  bestBalance,
  stoppedInfo,
  targetAngle,
  targetWidth,
  onPressLeft,
  onPressRight,
  onStop,
  onNext,
  attemptCount,
  paused,
}: {
  angle: number;
  attempt: number;
  bestBalance: number;
  stoppedInfo: { score: number; msg: string; angle: number } | null;
  targetAngle: number;
  targetWidth: number;
  onPressLeft: (v: boolean) => void;
  onPressRight: (v: boolean) => void;
  onStop: () => void;
  onNext: () => void;
  attemptCount: number;
  paused: boolean;
}) => {
  const ROPE_LEN = 210;
  const CHAR_H = 150;
  const dist = Math.abs(angle - targetAngle);
  const inZone = dist <= targetWidth / 2;

  return (
    <section>
      {/* HUD */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-3 text-sm font-heading uppercase tracking-wider">
        <div className="text-accent">Attempt {attempt} / {attemptCount}</div>
        <div className="text-primary-foreground/70">Distance: {dist.toFixed(1)}°</div>
        <div className="text-primary-foreground/70">Best: {bestBalance}</div>
      </div>

      {/* Stage */}
      <div
        className="relative w-full mx-auto rounded-lg overflow-hidden border border-primary-foreground/15"
        style={{
          height: 460,
          background:
            "radial-gradient(ellipse at 50% 100%, rgba(219,176,74,0.10), transparent 60%), linear-gradient(180deg, #0a1a30 0%, #0f2547 100%)",
        }}
        aria-label="Balance stage"
      >
        {/* Subtle district texture: horizontal grid + skyline silhouette */}
        <svg className="absolute inset-0 w-full h-full opacity-30" preserveAspectRatio="none" viewBox="0 0 400 460">
          <defs>
            <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
              <path d="M0 20 L20 20" stroke="#dbb04a" strokeOpacity="0.15" strokeWidth="0.5" />
              <path d="M20 0 L20 20" stroke="#dbb04a" strokeOpacity="0.08" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
          {/* skyline */}
          <path
            d="M0 400 L0 370 L30 370 L30 340 L60 340 L60 360 L90 360 L90 320 L120 320 L120 350 L150 350 L150 300 L180 300 L180 340 L210 340 L210 315 L240 315 L240 355 L270 355 L270 330 L300 330 L300 360 L330 360 L330 340 L360 340 L360 370 L400 370 L400 460 L0 460 Z"
            fill="#0a1a30"
            opacity="0.9"
          />
        </svg>

        {/* Left/Right labels */}
        <div className="absolute left-3 top-3 text-left">
          <div className="text-[10px] font-heading uppercase tracking-widest text-blue-300/80">Left</div>
          <div className="text-xs text-primary-foreground/70">Liberal Policies</div>
          <div className="text-xs text-primary-foreground/70">More Government</div>
          <div className="text-xs text-primary-foreground/70">Centralized Control</div>
        </div>
        <div className="absolute right-3 top-3 text-right">
          <div className="text-[10px] font-heading uppercase tracking-widest text-red-300/80">Right</div>
          <div className="text-xs text-primary-foreground/70">Conservative Principles</div>
          <div className="text-xs text-primary-foreground/70">Limited Government</div>
          <div className="text-xs text-primary-foreground/70">Local Control</div>
        </div>

        {/* Anchor + target arc */}
        <div className="absolute left-1/2 top-3 -translate-x-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_10px_rgba(219,176,74,0.9)]" />

        {/* Target zone visualization: draw a fan slightly right of center */}
        <TargetFan angle={targetAngle} width={targetWidth} ropeLen={ROPE_LEN} inZone={inZone} />

        {/* Rope + character */}
        <div
          className="absolute left-1/2 top-3"
          style={{
            transformOrigin: "0 0",
            transform: `translateX(-50%) rotate(${angle}deg)`,
            transition: paused ? "transform 0.2s" : undefined,
          }}
        >
          <div className="mx-auto" style={{ width: 2, height: ROPE_LEN, background: "linear-gradient(180deg,#c6a86a,#8b6b2c)" }} />
          <div
            style={{
              position: "absolute",
              left: "50%",
              top: ROPE_LEN - 4,
              transform: "translateX(-50%)",
              width: 80,
              height: CHAR_H,
            }}
          >
            <KeithFigure />
          </div>
        </div>

        {/* Success glow */}
        {stoppedInfo && Math.abs(stoppedInfo.angle - targetAngle) <= targetWidth / 2 && (
          <div className="absolute inset-0 pointer-events-none animate-fade-in" style={{ background: "radial-gradient(circle at 55% 60%, rgba(219,176,74,0.35), transparent 55%)" }} />
        )}

        {/* Directional flash */}
        {stoppedInfo && Math.abs(stoppedInfo.angle - targetAngle) > targetWidth / 2 && (
          <div
            className="absolute inset-y-0 pointer-events-none opacity-30"
            style={{
              width: "40%",
              left: stoppedInfo.angle < targetAngle ? 0 : "auto",
              right: stoppedInfo.angle < targetAngle ? "auto" : 0,
              background:
                stoppedInfo.angle < targetAngle
                  ? "linear-gradient(90deg, rgba(59,130,246,0.35), transparent)"
                  : "linear-gradient(270deg, rgba(220,50,50,0.35), transparent)",
            }}
          />
        )}
      </div>

      {/* Target label */}
      <div className="mt-3 text-center">
        <div className="inline-block px-3 py-1 rounded-full bg-accent/15 border border-accent/40">
          <span className="text-accent font-heading text-xs uppercase tracking-widest">Common-Sense Conservative</span>
          <span className="text-primary-foreground/70 text-xs ml-2">District 51 · Families First · Local Results</span>
        </div>
      </div>

      {/* Instructions */}
      {!stoppedInfo && (
        <p className="mt-3 text-center text-sm text-primary-foreground/70">
          Use the controls to steady Keith inside the Common-Sense Conservative zone.
        </p>
      )}

      {/* Mobile controls */}
      {!stoppedInfo && (
        <div className="mt-4 grid grid-cols-3 gap-3">
          <button
            onPointerDown={() => onPressLeft(true)}
            onPointerUp={() => onPressLeft(false)}
            onPointerLeave={() => onPressLeft(false)}
            onPointerCancel={() => onPressLeft(false)}
            className="min-h-14 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider select-none"
            aria-label="Swing left"
          >
            ← Left
          </button>
          <button
            onClick={onStop}
            className="min-h-14 rounded-md bg-accent text-accent-foreground font-heading uppercase tracking-wider font-bold shadow-md shadow-accent/20"
            aria-label="Hold steady"
          >
            Hold Steady
          </button>
          <button
            onPointerDown={() => onPressRight(true)}
            onPointerUp={() => onPressRight(false)}
            onPointerLeave={() => onPressRight(false)}
            onPointerCancel={() => onPressRight(false)}
            className="min-h-14 rounded-md border border-primary-foreground/20 bg-primary-foreground/5 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider select-none"
            aria-label="Swing right"
          >
            Right →
          </button>
        </div>
      )}

      <p className="hidden md:block mt-2 text-center text-xs text-primary-foreground/50">
        Keyboard: ← / A to influence left · → / D to influence right · Space to hold steady
      </p>

      {/* Result overlay */}
      {stoppedInfo && (
        <div className="mt-4 p-5 rounded-md border border-accent/30 bg-primary-foreground/5 text-center animate-fade-in">
          <div className="text-accent text-xs font-heading uppercase tracking-widest">Attempt Result</div>
          <div className="font-heading text-3xl font-bold mt-1">{stoppedInfo.score}</div>
          <p className="mt-1 text-primary-foreground/80">{stoppedInfo.msg}</p>
          <button
            onClick={onNext}
            className="mt-4 inline-flex items-center bg-accent text-accent-foreground font-heading font-bold uppercase tracking-wide px-6 py-3 rounded-md"
          >
            {attempt >= attemptCount ? "Continue to Decisions →" : "Next Attempt →"}
          </button>
        </div>
      )}
    </section>
  );
};

const TargetFan = ({ angle, width, ropeLen, inZone }: { angle: number; width: number; ropeLen: number; inZone: boolean }) => {
  // Draw an arc at the bottom of the rope to indicate the target zone
  const R = ropeLen + 10;
  const a1 = ((angle - width / 2) - 90) * (Math.PI / 180);
  const a2 = ((angle + width / 2) - 90) * (Math.PI / 180);
  const x1 = Math.cos(a1) * R, y1 = Math.sin(a1) * R;
  const x2 = Math.cos(a2) * R, y2 = Math.sin(a2) * R;
  return (
    <svg className="absolute left-1/2 top-3 pointer-events-none" style={{ transform: "translateX(-50%)", overflow: "visible" }} width="1" height="1">
      <g>
        <path
          d={`M0 0 L ${x1} ${y1} A ${R} ${R} 0 0 1 ${x2} ${y2} Z`}
          fill={inZone ? "rgba(219,176,74,0.35)" : "rgba(219,176,74,0.18)"}
          stroke="rgba(219,176,74,0.7)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </g>
    </svg>
  );
};

/* --------- End screen --------- */
const EndScreen = ({
  score,
  tier,
  onShare,
  copied,
  onReplay,
}: {
  score: number;
  tier: { title: string; msg: string };
  onShare: () => void;
  copied: boolean;
  onReplay: () => void;
}) => (
  <section className="max-w-2xl mx-auto text-center">
    <div className="text-accent text-xs font-heading uppercase tracking-widest">Final Result</div>
    <h1 className="font-heading text-4xl md:text-6xl font-bold uppercase tracking-tight mt-2">Keep District 51 Grounded</h1>
    <div className="w-20 h-[3px] bg-accent mx-auto my-5" />
    <div className="inline-flex flex-col items-center p-6 rounded-lg border border-accent/40 bg-primary-foreground/5">
      <div className="text-xs font-heading uppercase tracking-widest text-primary-foreground/70">Your Common-Sense Score</div>
      <div className="font-heading text-6xl md:text-7xl font-bold text-accent mt-1">{score}</div>
      <div className="font-heading text-lg uppercase tracking-wider mt-2">{tier.title}</div>
      <p className="mt-2 text-primary-foreground/80 max-w-md">{tier.msg}</p>
    </div>

    <p className="mt-6 text-primary-foreground/80 leading-relaxed max-w-xl mx-auto">
      Keith Gettmann is running to bring practical, conservative, pro-family leadership to the Georgia House.
    </p>

    <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
      <a href="/#meet-keith" className="p-3 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider text-sm">Meet Keith</a>
      <a href="/#get-involved" className="p-3 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider text-sm">Join the Campaign</a>
      <a href="/community-council" className="p-3 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider text-sm">Have Your Say</a>
      <a
        href={winredUrl("common_sense_swing")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackDonateClick("common_sense_swing_end", "Donate")}
        className="p-3 rounded-md bg-accent text-accent-foreground font-heading uppercase tracking-wider text-sm font-bold shadow-md shadow-accent/20"
      >
        Donate
      </a>
    </div>

    <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
      <button
        onClick={onShare}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-accent/50 text-accent hover:bg-accent/10 font-heading uppercase tracking-wider text-sm"
      >
        <Share2 size={16} /> {copied ? "Copied!" : "Share My Score"}
      </button>
      <button
        onClick={onReplay}
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider text-sm"
      >
        <RotateCcw size={16} /> Play Again
      </button>
      <Link
        to="/"
        className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-md border border-primary-foreground/20 hover:bg-primary-foreground/10 font-heading uppercase tracking-wider text-sm"
      >
        <ArrowLeft size={16} /> Back to Main Site
      </Link>
    </div>
  </section>
);

export default CommonSenseSwing;
