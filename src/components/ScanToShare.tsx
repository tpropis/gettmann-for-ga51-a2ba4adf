import { motion } from "framer-motion";
import { Smartphone, Camera, Share2, Copy, Check } from "lucide-react";
import { useState } from "react";
import qrCode from "@/assets/keithforga-qr.png";
import { trackEvent } from "@/lib/analytics";

const SITE_URL = "https://keithforga.com";

const STEPS = [
  {
    icon: Smartphone,
    title: "Open your camera",
    body: "Use the built-in camera app on any iPhone or Android phone — no extra app needed.",
  },
  {
    icon: Camera,
    title: "Point at the code",
    body: "Hold your phone steady about six inches away until the link appears on screen.",
  },
  {
    icon: Share2,
    title: "Tap and share",
    body: "Tap the link to open the campaign site, then pass it along to a neighbor in District 51.",
  },
];

const ScanToShare = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SITE_URL);
      setCopied(true);
      trackEvent("qr_link_copied", { url: SITE_URL });
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable — the URL is visible on screen as a fallback */
    }
  };

  return (
    <section id="scan-to-share" className="py-16 md:py-24 bg-primary">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <div className="text-center">
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground uppercase tracking-tight">
              Scan &amp; Share
            </h2>
            <div className="section-divider" />
            <p className="text-primary-foreground/80 text-lg mt-6 leading-relaxed max-w-2xl mx-auto">
              Word of mouth wins local races. Scan this code with your phone to
              pull up the campaign site, then text it to friends and neighbors in
              District 51.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-2 md:items-center">
            {/* QR code */}
            <div className="flex flex-col items-center">
              <div className="rounded-xl bg-background p-5 shadow-2xl">
                <img
                  src={qrCode}
                  alt="QR code that opens KeithForGA.com, the campaign website for Keith Gettmann, Georgia State House District 51"
                  width={320}
                  height={320}
                  loading="lazy"
                  className="h-64 w-64 sm:h-80 sm:w-80"
                />
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="mt-5 inline-flex items-center gap-2 rounded-md border border-accent/50 px-5 py-2.5 font-heading text-sm font-bold uppercase tracking-wide text-accent transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {copied ? (
                  <Check className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                ) : (
                  <Copy className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                )}
                {copied ? "Link copied" : "Copy link instead"}
              </button>
              <p className="mt-2 font-body text-sm text-primary-foreground/60">
                keithforga.com
              </p>
            </div>

            {/* Instructions */}
            <ol className="space-y-6">
              {STEPS.map((step, i) => (
                <li key={step.title} className="flex gap-4">
                  <span className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-full bg-accent/15 text-accent">
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold uppercase tracking-wide text-primary-foreground">
                      <span className="text-accent">{i + 1}.</span> {step.title}
                    </h3>
                    <p className="mt-1 font-body leading-relaxed text-primary-foreground/75">
                      {step.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ScanToShare;
