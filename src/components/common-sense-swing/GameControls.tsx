import { ReactNode } from "react";

/**
 * Controls area beneath the stage (buttons, sliders, on-screen keys).
 */
export const GameControls = ({ children }: { children: ReactNode }) => (
  <div
    className="w-full max-w-4xl mx-auto mt-4 flex flex-wrap items-center justify-center gap-2 md:gap-3"
    role="group"
    aria-label="Game controls"
  >
    {children}
  </div>
);
