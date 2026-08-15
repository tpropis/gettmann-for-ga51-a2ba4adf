import { useEffect, useState } from "react";

/**
 * The payoff: a crash-screen styled panel with the campaign message.
 * Styled like a system stop screen, but the copy makes the joke obvious.
 */
export const CrashScreen = ({ glitch = true }: { glitch?: boolean }) => {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    if (!glitch) {
      setPct(100);
      return;
    }
    const id = window.setInterval(() => {
      setPct((v) => (v >= 100 ? 100 : Math.min(100, v + 4 + Math.random() * 9)));
    }, 110);
    return () => window.clearInterval(id);
  }, [glitch]);

  return (
    <div className="flex min-h-dvh w-full flex-col justify-center bg-crash-blue px-6 py-12 text-primary-foreground sm:px-12">
      <div className="mx-auto w-full max-w-2xl">
        <div
          className={`font-mono text-6xl leading-none sm:text-7xl ${glitch ? "animate-pulse" : ""}`}
          aria-hidden="true"
        >
          :(
        </div>

        <p className="mt-6 font-mono text-sm leading-relaxed text-primary-foreground/90 sm:text-base">
          Your district ran into a problem and needs to be restarted.
          <br />
          Collecting some error info, then a message from your neighbor.
        </p>

        <div className="mt-4 flex items-center gap-3">
          <span className="relative block h-[6px] w-48 overflow-hidden rounded-sm bg-primary-foreground/25 sm:w-64">
            <span
              className="absolute inset-y-0 left-0 bg-primary-foreground/90"
              style={{ width: `${pct}%` }}
            />
          </span>
          <span className="font-mono text-xs tabular-nums text-primary-foreground/80">
            {Math.round(pct)}% complete
          </span>
        </div>

        <h1 className="mt-10 font-mono text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
          Wake up, District 51.
        </h1>
        <p className="mt-3 font-mono text-xl font-bold uppercase tracking-tight text-accent sm:text-3xl md:text-4xl">
          Vote Keith Gettmann.
        </p>

        <dl className="mt-10 space-y-1 font-mono text-[0.7rem] leading-relaxed text-primary-foreground/70 sm:text-xs">
          <div>
            <dt className="inline">Stop code: </dt>
            <dd className="inline">COMMON_SENSE_NOT_FOUND_AT_STATE_CAPITOL</dd>
          </div>
          <div>
            <dt className="inline">Failed module: </dt>
            <dd className="inline">business_as_usual.sys</dd>
          </div>
          <div>
            <dt className="inline">Recommended action: </dt>
            <dd className="inline">vote — Nov 3, 2026</dd>
          </div>
        </dl>
      </div>
    </div>
  );
};
