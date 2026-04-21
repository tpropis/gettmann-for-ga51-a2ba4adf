import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect } from "react";
import { Shield, TrendingDown, GraduationCap, Heart, HandCoins, Users, ArrowRight } from "lucide-react";
import keithPhoto from "@/assets/keith_pushcard.jpg";
import logo from "@/assets/logo_trans.svg";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

const Pushcard = () => {
  // Subtle parallax tilt based on device orientation / pointer
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 80, damping: 20 });
  const rotateY = useSpring(ry, { stiffness: 80, damping: 20 });
  const tiltX = useTransform(rotateX, (v) => `${v}deg`);
  const tiltY = useTransform(rotateY, (v) => `${v}deg`);

  useEffect(() => {
    document.title = "Keith Gettmann · A Personal Note";
    const handleOrient = (e: DeviceOrientationEvent) => {
      if (e.beta === null || e.gamma === null) return;
      // clamp small range
      const x = Math.max(-4, Math.min(4, (e.beta - 45) / 8));
      const y = Math.max(-4, Math.min(4, e.gamma / 8));
      rx.set(-x);
      ry.set(y);
    };
    const handleMove = (e: PointerEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      ry.set(((e.clientX - cx) / cx) * 3);
      rx.set(((cy - e.clientY) / cy) * 3);
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
          "radial-gradient(120% 80% at 50% 0%, hsl(var(--primary) / 0.85) 0%, hsl(var(--primary)) 55%, #0a1428 100%)",
      }}
    >
      {/* Soft blurred ambient orbs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-accent/20 blur-3xl" />
        <div className="absolute top-1/3 -right-24 w-80 h-80 rounded-full bg-primary-foreground/5 blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto max-w-md px-4 pt-10 pb-10">
        {/* THE CARD */}
        <motion.article
          initial={{ opacity: 0, y: 60, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          style={{
            rotateX: tiltX as unknown as number,
            rotateY: tiltY as unknown as number,
            transformPerspective: 1000,
          }}
          className="relative rounded-3xl bg-[hsl(36_30%_98%)] shadow-[0_30px_80px_-20px_rgba(0,0,0,0.55),0_10px_30px_-10px_rgba(0,0,0,0.35)] ring-1 ring-black/5 overflow-hidden"
        >
          {/* Gold top edge */}
          <div className="h-1 w-full bg-gradient-to-r from-accent/60 via-accent to-accent/60" />

          {/* Photo */}
          <div className="px-5 pt-5">
            <div className="relative overflow-hidden rounded-2xl ring-1 ring-black/5 shadow-md">
              <img
                src={keithPhoto}
                alt="Keith Gettmann"
                className="w-full object-cover"
                style={{ aspectRatio: "4/3", objectPosition: "50% 30%" }}
                loading="eager"
                fetchPriority="high"
              />
              <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/15 to-transparent" />
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
            <p className="font-heading text-[10px] font-semibold tracking-[0.22em] text-accent uppercase">
              Republican · Georgia House District 51
            </p>
            <h1 className="font-heading text-3xl font-bold tracking-tight text-primary uppercase mt-1.5 leading-none">
              Keith Gettmann
            </h1>
            <span className="mx-auto mt-3 block h-[2px] w-10 bg-accent" aria-hidden />
            <p className="mt-3 text-[15px] italic text-primary/70 font-body leading-snug">
              "I wanted to personally share this with you."
            </p>
          </motion.header>

          {/* Slogan */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            custom={0}
            className="mx-6 mt-5 rounded-xl bg-primary/5 border border-primary/10 px-5 py-4 text-center"
          >
            <p className="font-heading text-[15px] font-bold uppercase text-primary tracking-wide leading-relaxed">
              Protect Our Families.
              <br />
              Lower Taxes.
              <br />
              <span className="text-accent">Put Georgia First.</span>
            </p>
          </motion.div>

          {/* Trust points */}
          <div className="px-6 mt-5">
            <ul className="space-y-2.5">
              {[
                "Georgia Conservative",
                "Business-Minded Leadership",
                "Safe Communities & Strong Schools",
              ].map((t, i) => (
                <motion.li
                  key={t}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, amount: 0.5 }}
                  custom={i}
                  className="flex items-center gap-3 text-[14px] text-primary/85 font-body"
                >
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent" />
                  {t}
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Divider */}
          <div className="mx-6 my-6 flex items-center gap-3">
            <span className="h-px flex-1 bg-primary/10" />
            <span className="text-[10px] tracking-[0.25em] font-semibold text-primary/40 uppercase">
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
                className="flex gap-3.5 items-start"
              >
                <div className="flex-shrink-0 mt-0.5 w-9 h-9 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center">
                  <it.icon className="w-4 h-4 text-accent" strokeWidth={2.25} />
                </div>
                <div>
                  <h3 className="font-heading text-[13px] font-bold uppercase tracking-wide text-primary">
                    {it.title}
                  </h3>
                  <p className="text-[13.5px] text-primary/65 font-body leading-snug mt-0.5">
                    {it.text}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Personal note */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.4 }}
            className="mx-6 mt-7 rounded-xl bg-gradient-to-br from-primary/[0.03] to-accent/[0.05] border border-primary/10 px-5 py-5"
          >
            <p className="text-[14px] text-primary/80 font-body leading-relaxed">
              I'm not a career politician. I'm running because I care about our community,
              our families, and our future.
            </p>
            <p className="mt-2.5 text-[14px] font-semibold text-primary font-body leading-relaxed">
              I'd be honored to earn your support.
            </p>
            <p className="mt-3 font-heading text-[12px] uppercase tracking-[0.2em] text-accent">
              — Keith
            </p>
          </motion.div>

          {/* CTAs */}
          <div className="px-6 mt-6 space-y-2.5">
            <CardButton href="#donate" icon={HandCoins} label="Donate" primary />
            <CardButton href="#volunteer" icon={Users} label="Volunteer" />
            <CardButton href="/" icon={Heart} label="Learn More" subtle />
          </div>

          {/* Footer / logo */}
          <motion.footer
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-7 px-6 pb-6 flex flex-col items-center gap-2"
          >
            <img src={logo} alt="Gettmann for Georgia" className="h-7 opacity-60" />
            <p className="text-[10px] tracking-[0.22em] text-primary/40 uppercase font-semibold">
              Paid for by Gettmann for Georgia
            </p>
          </motion.footer>
        </motion.article>

        {/* Tagline below card */}
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="text-center text-[12px] tracking-[0.22em] uppercase text-primary-foreground/55 font-semibold mt-6"
        >
          A quick note from Keith
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
}: {
  href: string;
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  primary?: boolean;
  subtle?: boolean;
}) => {
  const base =
    "group w-full flex items-center justify-center gap-2.5 rounded-xl px-5 py-3.5 font-heading text-[14px] font-bold uppercase tracking-wider transition-all active:scale-[0.97] active:brightness-95";
  const styles = primary
    ? "bg-accent text-accent-foreground shadow-lg shadow-accent/30"
    : subtle
    ? "bg-transparent text-primary/70 border border-primary/15"
    : "bg-primary text-primary-foreground shadow-md shadow-primary/20";
  return (
    <a href={href} className={`${base} ${styles}`}>
      <Icon className="w-4 h-4" strokeWidth={2.25} />
      {label}
      <ArrowRight className="w-3.5 h-3.5 opacity-60 transition-transform group-hover:translate-x-0.5" />
    </a>
  );
};

export default Pushcard;
