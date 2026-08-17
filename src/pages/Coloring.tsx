import { useEffect, useRef, useState } from "react";
import { Facebook, Instagram, Share2, Download, ArrowDown, Check } from "lucide-react";
import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";
import CrayonRequestModal from "@/components/coloring/CrayonRequestModal";
import { trackEvent } from "@/lib/analytics";
// Self-hosted files in /public/coloring — served by your own site (Netlify), not a CDN.
const ccOriginal = { url: "/coloring/Keith_Gettmann_Color_Code_Page.png" };
const qrOriginal = { url: "/coloring/Keith_Gettmann_QR_Challenge_Page.png" };
const ccPreview = { url: "/coloring/color-code-preview.webp" };
const qrPreview = { url: "/coloring/qr-challenge-preview.webp" };
const signAsset = { url: "/coloring/crayon-sign-bright.jpg" };

const assetUrl = (u: string) => u;

const PAGE_URL = "https://keithforga.com/coloring";
const FACEBOOK_URL = "https://www.facebook.com/profile.php?id=61564223962233";
const INSTAGRAM_URL = "https://www.instagram.com/keithforgeorgia/";

const Crayon = ({ children }: { children: React.ReactNode }) => (
  <span className="relative inline-block">
    <span className="relative z-10">{children}</span>
    <span
      aria-hidden="true"
      className="absolute left-0 right-0 -bottom-0.5 h-[6px] bg-accent/45 rounded-full -rotate-1"
    />
  </span>
);

const Aside = ({ children }: { children: React.ReactNode }) => (
  <p className="font-body italic text-accent text-sm md:text-base -rotate-1">{children}</p>
);

const cards = [
  {
    id: "color-code",
    eyebrow: "Coloring Page #1",
    title: "The Color Code",
    preview: assetUrl(ccPreview.url),
    alt: "Keith Gettmann Georgia House District 51 printable color-code coloring page",
    file: assetUrl(ccOriginal.url),
    filename: "Keith_Gettmann_Color_Code_Page.png",
    button: "Download the Color Code",
    event: "color_code_download",
  },
  {
    id: "qr-challenge",
    eyebrow: "Coloring Page #2",
    title: "Can You Make It Scan?",
    preview: assetUrl(qrPreview.url),
    alt: "Keith Gettmann printable QR code coloring challenge for KeithForGA.com",
    file: assetUrl(qrOriginal.url),
    filename: "Keith_Gettmann_QR_Challenge_Page.png",
    button: "Download the QR Challenge",
    event: "qr_challenge_download",
  },
];

const steps = [
  { n: "1", title: "Download it", copy: "Pick your page." },
  { n: "2", title: "Color it", copy: "Follow the code or completely ignore it." },
  { n: "3", title: "Fridge it", copy: "Put your finished masterpiece on the refrigerator." },
  { n: "4", title: "Snap it", copy: "Take a picture of your artwork on the fridge." },
  { n: "5", title: "Share it", copy: "Post the picture on Facebook or Instagram and tag Keith." },
];

const Coloring = () => {
  const [crayonsOpen, setCrayonsOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [copied, setCopied] = useState(false);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    trackEvent("color_page_view", { path: "/coloring" });
  }, []);

  const onScrollTrack = () => {
    const el = trackRef.current;
    if (!el) return;
    setActive(Math.round(el.scrollLeft / el.clientWidth));
  };

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
    setActive(i);
  };

  const share = async () => {
    trackEvent("color_share_click", { path: "/coloring" });
    const data = {
      title: "Color With Keith",
      text: "Think you can color a QR code well enough to make it scan? Download the Keith Gettmann Coloring Book challenge.",
      url: PAGE_URL,
    };
    if (typeof navigator !== "undefined" && navigator.share) {
      try {
        await navigator.share(data);
        return;
      } catch {
        /* user dismissed — fall through */
      }
    }
    try {
      await navigator.clipboard.writeText(PAGE_URL);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      window.open(
        `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`,
        "_blank",
        "noopener,noreferrer",
      );
    }
  };

  const btnPrimary =
    "inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground font-heading font-bold uppercase tracking-[0.12em] text-sm md:text-base px-6 py-4 rounded-md hover:bg-primary/90 transition-colors min-h-[52px]";
  const btnGold =
    "inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading font-bold uppercase tracking-[0.12em] text-sm md:text-base px-6 py-4 rounded-md hover:brightness-95 transition-all min-h-[52px]";
  const btnOutline =
    "inline-flex items-center justify-center gap-2 border-2 border-primary/25 text-primary font-heading font-bold uppercase tracking-[0.12em] text-sm px-6 py-4 rounded-md hover:border-accent hover:text-primary transition-colors min-h-[52px]";

  return (
    <>
      <Seo
        title="Keith Gettmann Coloring Book | Georgia House District 51"
        description="Download free Keith Gettmann coloring pages, take the QR Code Challenge, put your masterpiece on the fridge and share it with the campaign."
        path="/coloring"
        image="https://gettmann-for-ga51.lovable.app/og-coloring.jpg"
      />
      <CampaignHeader />

      <main className="bg-background">
        {/* HERO */}
        <section className="pt-28 md:pt-36 pb-10 md:pb-14">
          <div className="container mx-auto max-w-[1100px]">
            <p className="font-heading text-[11px] md:text-xs font-bold uppercase tracking-[0.28em] text-accent">
              The Very Human Side of District 51
            </p>
            <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-primary leading-[0.95] mt-3">
              Color it.
              <br />
              Fridge it.
              <br />
              <Crayon>Share it.</Crayon>
            </h1>
            <p className="text-muted-foreground text-base md:text-lg leading-relaxed mt-5 max-w-xl">
              Some things are better made by hand. Download a Keith Gettmann
              coloring page, grab the crayons and make it your own. Then put it
              where masterpieces belong: <strong className="text-primary">the fridge.</strong>
            </p>
            <div className="mt-4">
              <Aside>This part is definitely not AI.</Aside>
            </div>
            <a href="#downloads" className={`${btnGold} mt-7 w-full sm:w-auto`}>
              Choose Your Coloring Page <ArrowDown className="h-4 w-4" />
            </a>
          </div>
        </section>

        {/* SAW THE SIGN */}
        <section className="py-12 md:py-16 bg-campaign-light border-y border-border">
          <div className="container mx-auto max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
              <div>
                <p className="font-heading text-[11px] md:text-xs font-bold uppercase tracking-[0.28em] text-accent">
                  Saw the sign?
                </p>
                <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold uppercase text-primary leading-[1.05] mt-3">
                  You're in the right place.
                </h2>
                <div className="w-14 h-[3px] bg-accent mt-4 mb-4" />
                <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
                  That piece of paper was not mass-produced. It was not generated.
                  It was drawn by hand with actual crayons — and it led you here.
                </p>
                <div className="mt-4">
                  <Aside>This is the part that definitely isn't AI.</Aside>
                </div>
                <a href="#downloads" className={`${btnGold} mt-7 w-full sm:w-auto`}>
                  Read More <ArrowDown className="h-4 w-4" />
                </a>
              </div>

              <div className="relative">
                <div className="absolute inset-0 bg-accent/10 rounded-xl rotate-1" aria-hidden="true" />
                <img
                  src={assetUrl(signAsset.url)}
                  alt="Hand-drawn crayon sign: Vote Keith Gettmann for Georgia State House District 51"
                  width={1354}
                  height={1805}
                  loading="eager"
                  decoding="async"
                  className="relative rounded-xl border-2 border-white shadow-lg w-full h-auto max-w-md mx-auto rotate-[-1deg]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOADS */}
        <section id="downloads" className="py-12 md:py-16 bg-campaign-light scroll-mt-24">
          <div className="container mx-auto max-w-[1100px]">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-primary tracking-tight">
              Pick Your Challenge
            </h2>
            <div className="w-14 h-[3px] bg-accent mt-3 mb-4" />
            <p className="text-muted-foreground max-w-xl">
              Two pages. Two completely different ways to prove you've got skills.
            </p>

            {/* mobile: swipe track / desktop: grid */}
            <div
              ref={trackRef}
              onScroll={onScrollTrack}
              className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory md:grid md:grid-cols-2 md:gap-6 md:overflow-visible [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {cards.map((c, i) => (
                <article
                  key={c.id}
                  aria-label={`${c.eyebrow}: ${c.title}`}
                  className="snap-center shrink-0 w-full md:w-auto bg-background rounded-xl border-2 border-primary/10 p-5 md:p-6 flex flex-col"
                >
                  <div className="bg-white rounded-lg border border-border p-3 shadow-sm mx-auto w-full max-w-[320px]">
                    <img
                      src={c.preview}
                      alt={c.alt}
                      width={900}
                      height={1164}
                      loading={i === 0 ? "eager" : "lazy"}
                      decoding="async"
                      className={`w-full h-auto ${i === 1 ? "rotate-[0.6deg]" : "-rotate-[0.6deg]"}`}
                    />
                  </div>

                  <p className="font-heading text-[11px] font-bold uppercase tracking-[0.24em] text-accent mt-5">
                    {c.eyebrow}
                  </p>
                  <h3 className="font-heading text-2xl md:text-3xl font-bold uppercase text-primary leading-tight mt-1">
                    {c.title}
                  </h3>

                  {c.id === "color-code" ? (
                    <div className="mt-3 space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        Red. Blue. Yellow. Green. Follow the color code — or ignore
                        it completely and create your own masterpiece.
                      </p>
                      <ul className="grid grid-cols-2 gap-1.5 text-sm font-semibold text-primary">
                        {[
                          ["1", "Red", "bg-red-600"],
                          ["2", "Blue", "bg-blue-600"],
                          ["3", "Yellow", "bg-yellow-400"],
                          ["4", "Green", "bg-green-600"],
                        ].map(([n, name, dot]) => (
                          <li key={n} className="flex items-center gap-2">
                            <span className={`w-3.5 h-3.5 rounded-full ${dot}`} aria-hidden="true" />
                            {n} = {name}
                          </li>
                        ))}
                      </ul>
                      <Aside>There are technically instructions. Following them is optional.</Aside>
                    </div>
                  ) : (
                    <div className="mt-3 space-y-3">
                      <p className="text-muted-foreground leading-relaxed">
                        This one is different. The outlined design is the actual QR
                        pattern for <strong className="text-primary">KeithForGA.com</strong>. Color the
                        right areas accurately enough and your finished drawing
                        becomes a working QR code.
                      </p>
                      <p className="font-heading font-bold uppercase tracking-[0.14em] text-primary bg-accent/25 inline-block px-3 py-1.5 rounded">
                        Yes. It can actually work.
                      </p>
                      <ul className="text-muted-foreground text-sm space-y-1.5">
                        <li>Choose the darkest crayon in the box.</li>
                        <li>Fill every outlined section completely.</li>
                        <li>Leave the blank areas blank.</li>
                        <li>Stay inside the lines.</li>
                        <li>Then grab a phone and see what happens.</li>
                      </ul>
                      <span className="inline-block font-heading text-[11px] font-bold uppercase tracking-[0.2em] text-primary-foreground bg-primary px-3 py-1.5 rounded-full">
                        Difficulty: Brave
                      </span>
                    </div>
                  )}

                  <div className="mt-auto pt-5">
                    <a
                      href={c.file}
                      download={c.filename}
                      onClick={() => trackEvent(c.event, { path: "/coloring", file: c.filename })}
                      className={`${btnPrimary} w-full`}
                    >
                      <Download className="h-4 w-4" /> {c.button}
                    </a>
                    <p className="text-xs text-muted-foreground text-center mt-2 tracking-wide">
                      8.5 × 11 · 300 DPI · Print Ready
                    </p>
                  </div>
                </article>
              ))}
            </div>

            {/* pagination (mobile) */}
            <div className="flex md:hidden items-center justify-center gap-3 mt-5">
              {cards.map((c, i) => (
                <button
                  key={c.id}
                  onClick={() => goTo(i)}
                  aria-label={`Show coloring page ${i + 1} of 2`}
                  aria-current={active === i}
                  className={`h-2.5 rounded-full transition-all ${
                    active === i ? "w-7 bg-primary" : "w-2.5 bg-primary/25"
                  }`}
                />
              ))}
              <span className="ml-1 font-heading text-xs font-bold uppercase tracking-[0.2em] text-muted-foreground">
                {active + 1} of 2
              </span>
            </div>
          </div>
        </section>

        {/* CRAYONS */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-[1100px]">
            <div className="rounded-xl border-2 border-dashed border-accent/50 bg-accent/5 p-6 md:p-8 text-center">
              <p className="font-heading text-xl md:text-2xl font-bold uppercase tracking-[0.12em] text-muted-foreground">
                No crayons?
              </p>
              <h2 className="font-heading text-3xl md:text-5xl font-bold uppercase text-primary leading-[1.05] mt-2">
                We'll bring the whole box.
              </h2>
              <p className="text-muted-foreground max-w-xl mx-auto mt-4 leading-relaxed">
                Because apparently "I didn't have the right color" isn't getting
                anyone out of this assignment.
              </p>
              <p className="text-primary font-semibold mt-2">
                Need crayons for the kids? Let the campaign know.
              </p>
              <button
                onClick={() => {
                  trackEvent("crayons_request_click", { path: "/coloring" });
                  setCrayonsOpen(true);
                }}
                className={`${btnGold} mt-6 w-full sm:w-auto`}
              >
                Request Crayons
              </button>
            </div>
          </div>
        </section>

        {/* FRIDGE CHALLENGE */}
        <section className="py-12 md:py-16 bg-gradient-to-b from-muted/60 to-background border-y border-border">
          <div className="container mx-auto max-w-[1100px]">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-start">
              <div>
                <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-primary tracking-tight">
                  The Fridge Challenge
                </h2>
                <div className="w-14 h-[3px] bg-accent mt-3 mb-4" />
                <p className="text-muted-foreground leading-relaxed">
                  Once you're finished, don't file your masterpiece away. Put it
                  where great art belongs.
                </p>
                <p className="font-heading text-4xl md:text-5xl font-bold uppercase text-primary mt-3">
                  The fridge.
                </p>
                <div className="mt-4">
                  <Aside>Refrigerator space recommended.</Aside>
                </div>
              </div>

              {/* fridge door panel */}
              <div className="relative rounded-xl bg-[linear-gradient(180deg,hsl(0_0%_97%),hsl(0_0%_92%))] border border-border p-6 md:p-8 shadow-inner">
                <span className="absolute top-4 left-5 w-4 h-4 rounded-full bg-red-600/80" aria-hidden="true" />
                <span className="absolute top-5 right-8 w-3.5 h-3.5 rounded-full bg-blue-600/80" aria-hidden="true" />
                <span className="absolute bottom-5 left-8 w-3 h-3 rounded-full bg-green-600/80" aria-hidden="true" />
                <div className="relative mx-auto max-w-[240px] rotate-[-2deg]">
                  <span
                    className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-5 bg-accent/40 rotate-2 rounded-[2px]"
                    aria-hidden="true"
                  />
                  <img
                    src={assetUrl(ccPreview.url)}
                    alt="Keith Gettmann Georgia House District 51 printable color-code coloring page"
                    width={900}
                    height={1164}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-auto bg-white p-2 shadow-lg border border-border"
                  />
                </div>
              </div>
            </div>

            <ol className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4 mt-10">
              {steps.map((s) => (
                <li key={s.n} className="bg-background rounded-lg border border-border p-4">
                  <span className="font-heading text-3xl font-bold text-accent leading-none">{s.n}</span>
                  <h3 className="font-heading text-lg font-bold uppercase text-primary tracking-wide mt-1">
                    {s.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1 leading-relaxed">{s.copy}</p>
                </li>
              ))}
            </ol>

            <div className="mt-8 text-center">
              <p className="font-heading text-2xl md:text-3xl font-bold uppercase text-primary leading-tight">
                Your fridge could make the campaign feed.
              </p>
              <p className="text-sm text-muted-foreground mt-2 max-w-lg mx-auto">
                We may repost some of our favorite refrigerator masterpieces on
                Keith's social media.
              </p>
            </div>
          </div>
        </section>

        {/* SOCIAL */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto max-w-[1100px]">
            <h2 className="font-heading text-3xl md:text-4xl font-bold uppercase text-primary tracking-tight">
              Show Keith What You Made
            </h2>
            <div className="w-14 h-[3px] bg-accent mt-3 mb-4" />
            <p className="text-muted-foreground">Take a picture. Post it. Tag Keith.</p>
            <div className="mt-2">
              <Aside>Bonus points if we can see the refrigerator.</Aside>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mt-7 max-w-2xl">
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("color_facebook_click", { path: "/coloring" })}
                className={btnPrimary}
              >
                <Facebook className="h-4 w-4" /> Find Keith on Facebook
              </a>
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("color_instagram_click", { path: "/coloring" })}
                className={btnPrimary}
              >
                <Instagram className="h-4 w-4" /> Find Keith on Instagram
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(PAGE_URL)}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("color_share_click", { path: "/coloring", method: "facebook" })}
                className={btnOutline}
              >
                <Facebook className="h-4 w-4" /> Share This Challenge
              </a>
              <button onClick={share} className={btnOutline} aria-label="Share the Coloring Book">
                {copied ? <Check className="h-4 w-4" /> : <Share2 className="h-4 w-4" />}
                {copied ? "Link copied" : "Share the Coloring Book"}
              </button>
            </div>

            <p className="text-muted-foreground mt-6">
              Post your fridge masterpiece and tag Keith so we can find it. Post
              yours with <strong className="text-primary">#ColorWithKeith</strong>{" "}
              <span className="text-sm">(#KeithForGA works too.)</span>
            </p>
          </div>
        </section>

        {/* ENDING */}
        <section className="py-14 md:py-20 bg-primary">
          <div className="container mx-auto max-w-[1100px] text-center">
            <p className="font-heading text-sm font-bold uppercase tracking-[0.28em] text-accent">Ready?</p>
            <h2 className="font-heading text-4xl sm:text-5xl md:text-6xl font-bold uppercase text-primary-foreground leading-[0.95] mt-3">
              Color it.
              <br />
              Fridge it.
              <br />
              Share it.
            </h2>
            <p className="text-primary-foreground/70 mt-5 max-w-lg mx-auto">
              District 51 could use a little more refrigerator art.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center mt-7">
              <a href="#downloads" className={btnGold}>
                Download a Page
              </a>
              <a
                href={FACEBOOK_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("color_facebook_click", { path: "/coloring", location: "footer_cta" })}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/30 text-primary-foreground font-heading font-bold uppercase tracking-[0.12em] text-sm px-6 py-4 rounded-md hover:border-accent hover:text-accent transition-colors min-h-[52px]"
              >
                Follow Keith
              </a>
            </div>
          </div>
        </section>
      </main>

      <CampaignFooter />
      <CrayonRequestModal open={crayonsOpen} onClose={() => setCrayonsOpen(false)} />
    </>
  );
};

export default Coloring;
