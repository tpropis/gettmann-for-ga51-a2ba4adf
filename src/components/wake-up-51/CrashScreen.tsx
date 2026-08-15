/**
 * The payoff: a crash-screen styled panel with the campaign message.
 * Deliberately over the top so it reads instantly as a joke.
 */
export const CrashScreen = ({ glitch = true }: { glitch?: boolean }) => (
  <div className="flex h-full w-full flex-col items-center justify-center bg-crash-blue px-6 py-12 text-center text-primary-foreground">
    <div
      className={`font-mono text-5xl sm:text-6xl ${glitch ? "animate-pulse" : ""}`}
      aria-hidden="true"
    >
      :(
    </div>

    <h1 className="mt-8 font-mono text-2xl font-bold uppercase leading-tight tracking-tight sm:text-4xl md:text-5xl">
      Wake up, District 51.
    </h1>
    <p className="mt-3 font-mono text-xl font-bold uppercase tracking-tight text-accent sm:text-3xl md:text-4xl">
      Vote Keith Gettmann.
    </p>

    <p className="mt-8 max-w-md font-mono text-[0.7rem] leading-relaxed text-primary-foreground/70 sm:text-xs">
      FATAL_ERROR: COMMON_SENSE_NOT_FOUND_AT_STATE_CAPITOL
      <br />
      Attempting recovery… 100% complete
    </p>
  </div>
);
