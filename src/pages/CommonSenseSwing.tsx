/*
 * CUSTOM GAME IMPLEMENTATION — PRESERVE CLAUDE CODE LOGIC
 *
 * This file is the foundation shell for the hidden "/common-sense-swing"
 * campaign mini-game. The layout, reusable components, and campaign
 * branding are established here. The interactive gameplay (physics,
 * scenario flow, scoring, share behavior, sound, reduced-motion handling,
 * end-screen CTAs) will be implemented by Claude Code inside the marked
 * region below. Do not replace the game with generic placeholder
 * animations or a random character — preserve the Claude Code logic
 * when it is added.
 *
 * Route is intentionally NOT linked from the main navigation or footer.
 */

import { useState } from "react";
import { Share2, RotateCcw } from "lucide-react";
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
import { trackDonateClick } from "@/lib/analytics";

const CommonSenseSwing = () => {
  // Foundation-level state. Full game state machine belongs to Claude Code.
  const [score] = useState(0);
  const [status] = useState("Ready to play.");
  const [showResults] = useState(false);

  return (
    <GamePageShell>
      <GameHeader
        title="Common-Sense Swing"
        intro="A quick, hidden campaign game about balance, judgment, and the everyday decisions that shape Georgia House District 51."
      />

      <main className="flex-1 w-full container mx-auto max-w-5xl px-4 py-6 md:py-10">
        {/* ============================================================
            CLAUDE CODE GAME REGION — BEGIN
            The interactive game (stage contents, controls, scoring,
            scenarios, share logic, results) is implemented here.
            Preserve this region when editing the shell.
            ============================================================ */}

        <GameStage>
          {/* Claude Code renders the interactive scene inside this stage. */}
          <div className="absolute inset-0 flex items-center justify-center">
            <p className="text-muted-foreground text-sm md:text-base px-6 text-center">
              Game stage ready. Interactive experience will render here.
            </p>
          </div>
        </GameStage>

        <GameControls>
          {/* Claude Code renders control buttons / on-screen keys here. */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-heading uppercase tracking-wide text-accent-foreground text-sm hover:brightness-95 transition"
            disabled
            aria-disabled="true"
          >
            <RotateCcw className="h-4 w-4" />
            Start
          </button>
        </GameControls>

        <ScoreStatus score={score} status={status} />

        <ResultsPanel open={showResults}>
          {/* Claude Code renders final score, breakdown, and CTAs here. */}
          <h2 className="font-heading uppercase text-2xl md:text-3xl font-bold text-primary">
            Your Result
          </h2>
          <div className="w-12 h-[3px] bg-accent mt-3 mb-4" />
          <p className="text-muted-foreground">
            Results content is rendered by the game logic.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={winredUrl("common_sense_swing_end")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() =>
                trackDonateClick("common_sense_swing", "Donate (game end)", {
                  provider: "winred",
                })
              }
              className="inline-flex items-center gap-2 rounded-md bg-accent px-5 py-2.5 font-heading uppercase tracking-wide text-accent-foreground text-sm hover:brightness-95 transition"
            >
              Donate
            </a>
          </div>
        </ResultsPanel>

        <SharePanel>
          {/* Claude Code wires up Web Share API + clipboard fallback here. */}
          <button
            type="button"
            className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-transparent px-4 py-2 text-sm font-heading uppercase tracking-wide text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
            disabled
            aria-disabled="true"
          >
            <Share2 className="h-4 w-4" />
            Share result
          </button>
        </SharePanel>

        {/* ============================================================
            CLAUDE CODE GAME REGION — END
            ============================================================ */}

        <div className="mt-8 flex justify-center">
          <BackToSiteButton />
        </div>

        <CampaignDisclaimer />
      </main>
    </GamePageShell>
  );
};

export default CommonSenseSwing;
