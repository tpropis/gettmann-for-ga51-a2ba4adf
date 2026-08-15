import { Heart, Share2, RotateCcw, ArrowRight, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { winredUrl } from "@/lib/winred";
import { trackEvent, trackDonateClick } from "@/lib/analytics";

interface RevealCardProps {
  onReplay: () => void;
}

/**
 * Post-payoff card. Always states plainly that nothing was collected,
 * so even a screenshot of this page reads as parody.
 */
export const RevealCard = ({ onReplay }: RevealCardProps) => {
  const handleShare = async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    const shareData = {
      title: "Wake Up, District 51",
      text: "You have to see this. Wake up, District 51 — vote Keith Gettmann.",
      url,
    };
    trackEvent("wakeup51_share", { path: "/wake-up-51" });
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
      await navigator.clipboard.writeText(url);
      alert("Link copied — go wake somebody up.");
    } catch {
      /* user cancelled share — nothing to do */
    }
  };

  return (
    <div className="mx-auto w-full max-w-xl rounded-lg border border-accent/40 bg-primary p-6 text-primary-foreground shadow-2xl sm:p-8">
      <div className="mb-4 flex items-center justify-center gap-2 text-accent">
        <ShieldCheck className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
        <span className="font-heading text-xs font-bold uppercase tracking-[0.2em]">
          Relax — it was a joke
        </span>
      </div>

      <h2 className="text-center font-heading text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        Nothing was collected.
      </h2>
      <p className="mx-auto mt-3 max-w-md text-center text-sm leading-relaxed text-primary-foreground/70">
        No data, no tracking of your files, no hacking — just a parody. What is real: House
        District 51 needs neighbors who show up and vote. That is Keith's whole message.
      </p>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          asChild
          className="bg-accent font-heading text-base font-bold uppercase tracking-wide text-accent-foreground hover:bg-campaign-gold-dark"
        >
          <a
            href={winredUrl("wakeup51")}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackDonateClick("wakeup51", "Donate")}
          >
            <Heart className="mr-2 h-4 w-4" aria-hidden="true" />
            Donate
          </a>
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-primary-foreground/30 bg-transparent font-heading text-base font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <a href="/#meet-keith">
            Meet Keith
            <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </a>
        </Button>
      </div>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:justify-center">
        <Button
          variant="ghost"
          onClick={handleShare}
          className="font-heading text-sm font-bold uppercase tracking-wide text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <Share2 className="mr-2 h-4 w-4" aria-hidden="true" />
          Share
        </Button>
        <Button
          variant="ghost"
          onClick={onReplay}
          className="font-heading text-sm font-bold uppercase tracking-wide text-primary-foreground/70 hover:bg-primary-foreground/10 hover:text-primary-foreground"
        >
          <RotateCcw className="mr-2 h-4 w-4" aria-hidden="true" />
          Replay
        </Button>
      </div>

      <p className="mt-7 border-t border-primary-foreground/10 pt-4 text-center text-[0.7rem] leading-relaxed text-primary-foreground/45">
        Paid for by Keith for GA LLC. Not authorized by any candidate or candidate's committee.
        This page is satire and collects no visitor information.
      </p>
    </div>
  );
};
