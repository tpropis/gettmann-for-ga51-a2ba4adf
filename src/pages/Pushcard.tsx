import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { Shield, TrendingDown, GraduationCap, HandCoins, Users, BookOpen, ArrowRight } from "lucide-react";
import keithPhoto from "@/assets/keith_pushcard.jpg";
import logo from "@/assets/logo_trans.svg";
import { initAnalytics, trackEvent } from "@/lib/analytics";
import { winredUrl } from "@/lib/winred";

const fadeUp = {
  hidden: { opacity: 0, y: 14 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: 0.15 + i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Pushcard = () => {
  // Subtle parallax tilt
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 60, damping: 18 });
  const rotateY = useSpring(ry, { stiffness: 60, damping: 18 });
  const tiltX = useTransform(rotateX, (v) => `${v}deg`);
  const tiltY = useTransform(rotateY, (v) => `${v}deg`);

  // Throttle for tilt event (5s)
  const lastTiltAt = useRef(0);
  const TILT_THROTTLE_MS = 5000;
  const TILT_THRESHOLD = 1.2; // deg of meaningful movement

  const reportTilt = (source: "pointer" | "device", magnitude: number) => {
    const now = Date.now();
    if (magnitude < TILT_THRESHOLD) return;
    if (now - lastTiltAt.current < TILT_THROTTLE_MS) return;
    lastTiltAt.current = now;
    trackEvent("pushcard_tilt", {
      source,
      magnitude: Number(magnitude.toFixed(2)),
    });
  };

  useEffect(() => {
    document.title = "Keith Gettmann · A Personal Note";

    // Init GA4 + fire view
    initAnalytics();
    const referrer = typeof document !== "undefined" ? document.referrer : "";
    const utmSource = new URLSearchParams(window.location.search).get("utm_source");
    trackEvent("pushcard_view", {
      page: "/card",
      referrer,
      utm_source: utmSource ?? "qr",
      viewport: `${window.innerWidth}x${window.innerHeight}`,
    });

    const handleOrient = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      const x = Math.max(-3, Math.min(3, (e.beta - 45) / 10));
      const y = Math.max(-3, Math.min(3, e.gamma / 10));
      rx.set(-x);
      ry.set(y);
      reportTilt("device", Math.max(Math.abs(x), Math.abs(y)));
    };
    const handleMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const rxVal = ((cy - e.clientY) / cy) * 2.2;
      const ryVal = ((e.clientX - cx) / cx) * 2.2;
      ry.set(ryVal);
      rx.set(rxVal);
      reportTilt("pointer", Math.max(Math.abs(rxVal), Math.abs(ryVal)));
    };
    window.addEventListener("deviceorientation", handleOrient);
    window.addEventListener("pointermove", handleMove);
    return () => {
      window.removeEventListener("deviceorientation", handleOrient);
      window.removeEventListener("pointermove", handleMove);
    };
  }, [rx, ry]);

  return (
    <main
      className="min-h-screen w-full relative overflow-x-hidden"
      style={{
        background:
          "radial-gradient(130% 90% at 50% 0%, hsl(var(--primary) / 0.92) 0%, hsl(var(--primary)) 55%, #08111f 100%)",
      }}
    >
      {/* Soft ambient glow */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-accent/15 blur-3xl" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[360px] h-[360px] rounded-full bg-accent/10 blur-3xl" />
      </div>

      {/* Initial dim/blur veil that lifts */}
      <motion.div
        initial={{ opacity: 1, backdropFilter: "blur(8px)" }}
        animate={{ opacity: 0, backdropFilter: "blur(0px)" }}
        transition={{ duration: 1.1, delay: 0.3, ease: "easeOut" }}
        className="pointer-events-none absolute inset-0 bg-black/30 z-20"
      />

      <div className="relative z-10 mx-auto max-w-[380px] px-4 pt-8 pb-10">
        {/* THE CARD */}
        <motion.article
          initial={{ opacity: 0, y: 80, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.95, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          style={{
            rotateX: tiltX as unknown as number,
            rotateY: tiltY as unknown as number,
            transformPerspective: 1200,
          }}
          className="relative rounded-[22px] bg-[hsl(36_28%_97%)] overflow-hidden"
        >
          {/* Card shadow stack for realism */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-[22px] pointer-events-none"
            style={{
              boxShadow:
                "0 1px 0 rgba(255,255,255,0.6) inset, 0 0 0 1px rgba(0,0,0,0.04), 0 30px 60px -20px rgba(0,0,0,0.55), 0 12px 28px -10px rgba(0,0,0,0.4)",
            }}
          />

          {/* Subtle paper texture */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.05] pointer-events-none mix-blend-multiply"
            style={{
              backgroundImage:
                "radial-gradient(rgba(0,0,0,0.4) 0.5px, transparent 0.5px)",
              backgroundSize: "3px 3px",
            }}
          />

          {/* Gold top edge */}
          <div className="h-[3px] w-full bg-gradient-to-r from-accent/40 via-accent to-accent/40" />

          {/* Light sweep gloss — fires once after landing */}
          <motion.div
            aria-hidden
            initial={{ x: "-120%", opacity: 0 }}
            animate={{ x: "130%", opacity: [0, 0.55, 0] }}
            transition={{ delay: 1.4, duration: 1.4, ease: "easeInOut" }}
            className="pointer-events-none absolute inset-y-0 w-1/2 z-30"
            style={{
              background:
                "linear-gradient(115deg, transparent 0%, rgba(255,255,255,0.0) 30%, rgba(255,255,255,0.55) 50%, rgba(255,255,255,0.0) 70%, transparent 100%)",
              filter: "blur(2px)",
            }}
          />

          {/* Photo */}
          <div className="px-4 pt-4 relative">
            <div className="relative overflow-hidden rounded-[14px] ring-1 ring-black/5 shadow-[0_6px_18px_-8px_rgba(0,0,0,0.35)]">
              <img
                src={keithPhoto}
                alt="Keith Gettmann"
                className="w-full object-cover"
                style={{ aspectRatio: "5/4", objectPosition: "50% 28%" }}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/4 bg-gradient-to-t from-black/15 to-transparent" />
            </div>
          </div>

          {/* Name block */}
          <motion.header
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="px-6 pt-5 text-center"
          >
            <p className="font-heading text-[9.5px] font-semibold tracking-[0.24em] text-accent uppercase">
              Republican <span className="text-primary/30 mx-1">•</span> Georgia House District 51
            </p>
            <h1 className="font-heading text-[28px] font-bold tracking-tight text-primary uppercase mt-2 leading-none">
              Keith Gettmann
            </h1>
            <span className="mx-auto mt-3 block h-[2px] w-9 bg-accent" aria-hidden />
            <p className="mt-3 text-[14.5px] italic text-primary/70 font-body leading-snug">
              "I wanted to personally share why I'm running."
            </p>
          </motion.header>

          {/* Main message */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={0}
            className="mx-6 mt-5 rounded-[12px] bg-primary/[0.04] border border-primary/10 px-5 py-4 text-center"
          >
            <p className="font-heading text-[14px] font-bold uppercase text-primary tracking-wide leading-[1.7]">
              Safer Communities.
              <br />
              Lower Taxes.
              <br />
              <span className="text-accent">A Stronger Future for Georgia Families.</span>
            </p>
          </motion.div>

          {/* Trust points */}
          <div className="px-7 mt-5">
            <ul className="space-y-2">
              {[
                "Georgia Conservative",
                "Business-Minded Leadership",
                "Focused on Safe Communities & Strong Schools",
              ].map((t, i) => (
                <motion.li
                  key={t}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={i}
                  className="flex items-start gap-2.5 text-[13.5px] text-primary/80 font-body leading-snug"
                >
                  <span className="mt-[7px] inline-block h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                  <span>{t}</span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider label */}
          <div className="mx-6 my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-primary/10" />
            <span className="text-[9.5px] tracking-[0.28em] font-semibold text-primary/45 uppercase">
              Where Keith Stands
            </span>
            <span className="h-px flex-1 bg-primary/10" />
          </div>

          {/* Issues */}
          <div className="px-6 space-y-3.5">
            {[
              { icon: Shield, title: "Safer Communities", text: "Support law enforcement and reduce crime." },
              { icon: TrendingDown, title: "Lower Taxes", text: "Let families keep more of what they earn." },
              { icon: GraduationCap, title: "Stronger Schools", text: "Focus on results and parental involvement." },
            ].map((it, i) => (
              <motion.div
                key={it.title}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.4 }}
                custom={i}
                className="flex gap-3 items-start"
              >
                <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-[10px] bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <it.icon className="w-4 h-4 text-accent" strokeWidth={2.25} />
                </div>
                <div className="flex-1 pt-0.5">
                  <h3 className="font-heading text-[12.5px] font-bold uppercase tracking-[0.08em] text-primary">
                    {it.title}
                  </h3>
                  <p className="text-[13px] text-primary/65 font-body leading-snug mt-0.5">
                    {it.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Personal closing */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-6 mt-7 rounded-[12px] bg-gradient-to-br from-primary/[0.03] to-accent/[0.06] border border-primary/10 px-5 py-5"
          >
            <p className="text-[13.5px] text-primary/80 font-body leading-relaxed">
              I'm not a career politician. I'm running because I believe our community deserves
              strong leadership, safer neighborhoods, and real results.
            </p>
            <p className="mt-3 text-[13.5px] font-semibold text-primary font-body leading-relaxed">
              I'd be honored to earn your support.
            </p>
            <p className="mt-3 font-heading text-[11px] uppercase tracking-[0.22em] text-accent">
              — Keith
            </p>
          </motion.div>

          {/* CTA intro */}
          <motion.p
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-7 text-center font-heading text-[10.5px] uppercase tracking-[0.28em] text-primary/45 font-semibold"
          >
            Get Involved
          </motion.p>

          {/* CTAs */}
          <div className="px-6 mt-3 space-y-2.5">
            <CardButton
              href={winredUrl("site_cta")}
              icon={HandCoins}
              label="Donate"
              primary
              onTap={() => trackEvent("pushcard_tap_donate", { cta: "donate" })}
            />
            <CardButton
              href="#volunteer"
              icon={Users}
              label="Volunteer"
              onTap={() => trackEvent("pushcard_tap_volunteer", { cta: "volunteer" })}
            />
            <CardButton
              href="/"
              icon={BookOpen}
              label="Learn More"
              subtle
              onTap={() => trackEvent("pushcard_tap_learn_more", { cta: "learn_more" })}
            />
          </div>

          {/* Site link */}
          <motion.a
            href="/"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-4 mx-6 flex items-center justify-center gap-1.5 text-[12px] text-primary/55 hover:text-primary font-body underline-offset-4 hover:underline transition-colors"
          >
            Explore the full site
            <ArrowRight className="w-3 h-3" />
          </motion.a>

          {/* Footer */}
          <motion.footer
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-6 px-6 pb-6 flex flex-col items-center gap-2 border-t border-primary/5 pt-5 mx-6"
          >
            <img src={logo} alt="Gettmann for Georgia" className="h-6 opacity-55" />
            <p className="text-[9.5px] tracking-[0.22em] text-primary/40 uppercase font-semibold">
              Paid for by Keith for GA LLC.
            </p>
          </motion.footer>
        </motion.article>

        {/* Tagline below card */}
        <motion.p
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="text-center text-[10.5px] tracking-[0.28em] uppercase text-primary-foreground/45 font-semibold mt-6"
        >
          A personal note from Keith
        </motion.p>
      </div>
    </main>
  );
};

const CardButton = ({
  href,
  icon: Icon,
  label,
  primary,
  subtle,
  onTap,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
  primary?: boolean;
  subtle?: boolean;
  onTap?: () => void;
}) => {
  const base =
    "group w-full flex items-center justify-center gap-2.5 rounded-[12px] px-5 py-3.5 font-heading text-[13.5px] font-bold uppercase tracking-[0.12em] transition-all duration-150 active:scale-[0.96] active:translate-y-[1px] active:brightness-95";
  const styles = primary
    ? "bg-accent text-accent-foreground shadow-[0_6px_16px_-4px_hsl(var(--accent)/0.5)]"
    : subtle
    ? "bg-transparent text-primary/70 border border-primary/15"
    : "bg-primary text-primary-foreground shadow-[0_6px_16px_-4px_hsl(var(--primary)/0.4)]";
  return (
    <a
      href={href}
      className={`${base} ${styles}`}
      onClick={onTap}
      target={/^https?:/.test(href) ? "_blank" : undefined}
      rel={/^https?:/.test(href) ? "noopener noreferrer" : undefined}
    >
      <Icon className="w-4 h-4" strokeWidth={2.25} />
      {label}
    </a>
  );
};

export default Pushcard;
