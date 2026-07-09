import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";
import { motion } from "framer-motion";
import { ArrowRight, Users, MessageCircle, Vote } from "lucide-react";
import { trackDonateClick } from "@/lib/analytics";
import { winredUrl } from "@/lib/winred";
import plusoneVideo from "@/assets/plusonesite.mp4.asset.json";
import plusoneLogo from "@/assets/plusone-simple.png.asset.json";

const scrollToHow = (e: React.MouseEvent) => {
  e.preventDefault();
  document
    .getElementById("how-plusone-works")
    ?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const steps = [
  {
    Icon: Users,
    title: "Find One",
    body: "Think of one person who stayed home in 2024 but cares about the future of our community.",
  },
  {
    Icon: MessageCircle,
    title: "Talk to One",
    body: "Start one real conversation. No speech. No script. Just neighbor to neighbor.",
  },
  {
    Icon: Vote,
    title: "Bring One",
    body: "Encourage them to vote in 2026 and help them make a plan to show up.",
  },
];

const PlusOne = () => {
  return (
    <>
      <Seo
        title="PlusOne in 51 | Keith Gettmann for Georgia House District 51"
        description="PlusOne in 51 is Keith Gettmann's neighbor-to-neighbor mission to bring more voters into the process in Georgia House District 51."
        path="/plusone"
      />
      <CampaignHeader />

      <main className="bg-background">
        {/* HERO */}
        <section className="relative bg-primary pt-32 md:pt-36 pb-16 md:pb-20 overflow-hidden">
          <div className="container mx-auto px-4 max-w-4xl text-center">
            <motion.img
              src={plusoneLogo.url}
              alt="PlusOne in 51"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mx-auto w-full max-w-md md:max-w-lg mb-8 bg-background/95 rounded-lg p-6 md:p-8 shadow-2xl"
            />
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-heading text-4xl md:text-6xl font-bold text-primary-foreground uppercase tracking-tight"
            >
              Be a PlusOne in 51
            </motion.h1>
            <div className="w-16 h-[3px] bg-accent mx-auto mt-5" />
            <p className="font-heading text-lg md:text-2xl text-accent mt-5 uppercase tracking-wide">
              One Neighbor. One Vote. One Victory.
            </p>
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed max-w-2xl mx-auto mt-6">
              PlusOne in 51 is Keith Gettmann's neighbor-to-neighbor mission for Georgia House
              District 51. The idea is simple: find one person who did not vote in 2024 and
              personally encourage them to vote in 2026.
            </p>
          </div>
        </section>

        {/* VIDEO + DESCRIPTION + BUTTONS */}
        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="rounded-xl overflow-hidden shadow-2xl border border-border/40 bg-primary aspect-video">
              <video
                controls
                playsInline
                preload="metadata"
                className="w-full h-full"
              >
                <source src={plusoneVideo.url} type="video/mp4" />
                Your browser does not support this video.
              </video>
            </div>

            <div className="mt-10 space-y-5 text-foreground/85 text-base md:text-lg leading-relaxed max-w-3xl mx-auto">
              <p>
                In 2024, thousands of voters in House District 51 stayed home. If just a small
                number of them vote in 2026, we can change the direction of this district.
              </p>
              <p>
                PlusOne in 51 asks every supporter to think of one person they already know — a
                neighbor, friend, family member, church member, co-worker, or someone they see
                at the pool, farmers market, ball game, or community event — and start one real
                conversation.
              </p>
              <p className="font-heading text-primary font-semibold text-lg md:text-xl">
                One neighbor can add one more vote. One conversation can make the difference.
              </p>
            </div>

            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={winredUrl("plusone_hero_donate51", 51)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackDonateClick("plusone_hero", "Donate $51 for District 51", {
                    amount: 51,
                    provider: "winred",
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading text-base font-bold px-8 py-4 rounded-md hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/30 uppercase"
              >
                Donate $51 for District 51
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="#how-plusone-works"
                onClick={scrollToHow}
                className="inline-flex items-center justify-center gap-2 border-2 border-primary text-primary font-heading text-base font-bold px-8 py-4 rounded-md hover:bg-primary hover:text-primary-foreground transition-colors tracking-wide uppercase"
              >
                Learn More
              </a>
            </div>
          </div>
        </section>

        {/* HOW PLUSONE WORKS */}
        <section id="how-plusone-works" className="py-20 md:py-24 bg-secondary/40">
          <div className="container mx-auto px-4 max-w-5xl">
            <div className="text-center">
              <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary uppercase tracking-tight">
                How PlusOne Works
              </h2>
              <div className="w-16 h-[3px] bg-accent mx-auto mt-4" />
            </div>

            <div className="mt-12 grid md:grid-cols-3 gap-6">
              {steps.map(({ Icon, title, body }, i) => (
                <motion.div
                  key={title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-background rounded-lg p-7 border border-border/50 shadow-md text-center"
                >
                  <div className="w-14 h-14 rounded-full bg-accent/15 text-accent flex items-center justify-center mx-auto mb-5">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-wide">
                    {title}
                  </h3>
                  <div className="w-10 h-[2px] bg-accent mx-auto mt-3 mb-4" />
                  <p className="text-foreground/75 leading-relaxed">{body}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* WHY IT MATTERS */}
        <section className="py-20 md:py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary uppercase tracking-tight leading-tight">
              One neighbor can add one more vote.
            </h2>
            <div className="w-16 h-[3px] bg-accent mx-auto mt-5" />
            <div className="mt-8 space-y-5 text-foreground/80 text-base md:text-lg leading-relaxed">
              <p>
                Campaigns are not won by signs, ads, or mailers alone. They are won when people
                talk to people they already know and trust.
              </p>
              <p>
                If every supporter brings one new voter into the process, House District 51 can
                move forward with common-sense, pro-family leadership.
              </p>
            </div>
            <p className="font-heading text-2xl md:text-3xl font-bold text-accent uppercase tracking-wide mt-10">
              Who is your one?
            </p>
          </div>
        </section>

        {/* FINAL CTA */}
        <section className="py-20 md:py-24 bg-primary">
          <div className="container mx-auto px-4 max-w-3xl text-center">
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-primary-foreground uppercase tracking-tight">
              Be Keith's PlusOne in 51
            </h2>
            <div className="w-16 h-[3px] bg-accent mx-auto mt-5" />
            <p className="text-primary-foreground/85 text-base md:text-lg leading-relaxed mt-6">
              Vote. Volunteer. Donate. One neighbor at a time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href={winredUrl("plusone_final_donate51", 51)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackDonateClick("plusone_final", "Donate $51", {
                    amount: 51,
                    provider: "winred",
                  })
                }
                className="inline-flex items-center justify-center gap-2 bg-accent text-accent-foreground font-heading text-base font-bold px-8 py-4 rounded-md hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/30 uppercase"
              >
                Donate $51
                <ArrowRight className="w-4 h-4" />
              </a>
              <a
                href="/#meet-keith"
                className="inline-flex items-center justify-center gap-2 border-2 border-primary-foreground/80 text-primary-foreground font-heading text-base font-bold px-8 py-4 rounded-md hover:bg-primary-foreground hover:text-primary transition-colors tracking-wide uppercase"
              >
                Learn More About Keith
              </a>
            </div>
          </div>
        </section>
      </main>

      <CampaignFooter />
    </>
  );
};

export default PlusOne;
