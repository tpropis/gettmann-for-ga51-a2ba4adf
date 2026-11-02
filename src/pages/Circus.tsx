import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { motion, useAnimationControls, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, MapPin, Volume2, VolumeX } from "lucide-react";
import Seo from "@/components/Seo";
import { Button } from "@/components/ui/button";
import { circusIssues, circusVoteMessage, circusVoterUrl, hasSourcedRecord, nextCircusCount } from "@/data/circus";
import { playCircusHonk } from "@/lib/circusHonk";

const Circus = () => {
  const [count, setCount] = useState(0);
  const [muted, setMuted] = useState(false);
  const [burst, setBurst] = useState(0);
  const audio = useRef<AudioContext | null>(null);
  const countRef = useRef(0);
  const controls = useAnimationControls();
  const reducedMotion = useReducedMotion();
  const complete = count === circusIssues.length;

  useEffect(() => () => { void audio.current?.close(); }, []);

  const honk = () => {
    if (countRef.current >= circusIssues.length) return;
    countRef.current = nextCircusCount(countRef.current);
    setCount(countRef.current);
    if (!reducedMotion) {
      setBurst((value) => value + 1);
      void controls.start({ scaleX: [1, 1.2, 0.88, 1], scaleY: [1, 0.78, 1.14, 1], transition: { duration: 0.45 } });
    }
    if (!muted) {
      try {
        audio.current ??= new AudioContext();
        const context = audio.current;
        void context.resume().then(() => playCircusHonk(context)).catch(() => setMuted(true));
      } catch { setMuted(true); }
    }
  };

  return (
    <main className="circus-page relative min-h-screen overflow-hidden bg-background text-foreground flex flex-col">
      <Seo title="The Circus in HD51 | Keith Gettmann" description="HD51 campaign satire from Keith Gettmann." path="/circus" noindex />
      <div className="circus-stripes pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto w-full max-w-6xl flex-1 px-5 pt-20 pb-10 md:px-8 md:pt-16">
        <Button variant="ghost" size="icon" className="absolute right-5 top-4 h-11 w-11 text-foreground hover:bg-card" aria-label={muted ? "Unmute honk" : "Mute honk"} title={muted ? "Unmute honk" : "Mute honk"} onClick={() => setMuted((value) => !value)}>
          {muted ? <VolumeX /> : <Volume2 />}
        </Button>
        <motion.header initial={reducedMotion ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-6xl font-bold leading-tight text-balance">Honk if you're tired of<br className="hidden md:block" /> the circus in HD51.</h1>
          <p className="mt-5 text-lg text-muted-foreground">Click the nose. See the record.</p>
        </motion.header>

        <div className="relative mx-auto mt-10 w-full max-w-sm">
          <motion.div animate={reducedMotion || complete ? { y: 0 } : { y: [0, -7, 0] }} transition={reducedMotion || complete ? { duration: 0 } : { duration: 3.5, repeat: Infinity, ease: "easeInOut" }} className="relative">
            <div className="circus-portrait overflow-hidden rounded-lg border border-border aspect-[4/5]">
              <img src={`${import.meta.env.BASE_URL}circus/esther-panitch.jpg`} alt="Rep. Esther Panitch — portrait with a satirical clown-nose overlay" className="h-full w-full object-cover" />
            </div>
            <motion.div animate={controls} className="absolute left-1/2 top-[39%] -translate-x-1/2 w-[220px] h-[220px] max-w-[65%]">
              <Button onClick={honk} disabled={complete} aria-label={complete ? "All issues revealed" : "Honk and reveal next issue"} className="circus-nose-button h-full w-full disabled:opacity-100 focus-visible:ring-accent" variant="ghost">
                <svg viewBox="0 0 220 220" aria-hidden="true">
                  <defs><radialGradient id="circus-nose-fill" cx="32%" cy="25%" r="76%"><stop offset="0" className="circus-nose-light" /><stop offset="0.42" className="circus-nose-red" /><stop offset="1" className="circus-nose-dark" /></radialGradient></defs>
                  <ellipse cx="110" cy="193" rx="82" ry="16" className="circus-nose-shadow" />
                  <circle cx="110" cy="104" r="91" fill="url(#circus-nose-fill)" />
                  <ellipse cx="77" cy="60" rx="28" ry="13" transform="rotate(-32 77 60)" className="circus-nose-glint" />
                </svg>
              </Button>
            </motion.div>
          </motion.div>
          {!reducedMotion && burst > 0 && <div key={burst} aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2">
            {Array.from({ length: 16 }, (_, index) => {
              const angle = index * Math.PI * 2 / 16;
              return <motion.span key={index} className="circus-confetti absolute h-2 w-1.5 rounded-sm" initial={{ x: 0, y: 0, opacity: 1 }} animate={{ x: Math.cos(angle) * 150, y: Math.sin(angle) * 130 + 80, opacity: 0, rotate: index * 75 }} transition={{ duration: 0.8, ease: "easeOut" }} />;
            })}
          </div>}
          <p className="mt-4 text-center text-xs uppercase tracking-widest text-muted-foreground">Campaign satire · Esther Panitch</p>
        </div>

        <div aria-live="polite" aria-atomic="false" className="mt-10 grid gap-4 md:grid-cols-3">
          {circusIssues.slice(0, count).map((item, index) => (
            <motion.article key={item.issue} initial={reducedMotion ? false : { opacity: 0, y: -45, rotate: index % 2 ? 4 : -4 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ type: "spring", stiffness: 180, damping: 19 }} className="rounded-lg border border-border bg-card p-6 text-card-foreground">
              <h2 className="font-heading text-2xl font-bold">{item.issue}</h2>
              <p className="mt-5 text-sm font-semibold">Panitch's record:</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{hasSourcedRecord(item) ? item.record : "Awaiting sourced details."}</p>
              {hasSourcedRecord(item) && <Button asChild variant="link" className="mt-1 h-11 px-0 text-accent"><a href={item.source} target="_blank" rel="noopener noreferrer">Source <ArrowUpRight /></a></Button>}
              <p className="mt-5 text-sm font-semibold">Keith's fix:</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.fix || "Statement forthcoming."}</p>
            </motion.article>
          ))}
        </div>
        {complete && <motion.section initial={reducedMotion ? false : { opacity: 0, y: -30 }} animate={{ opacity: 1, y: 0 }} transition={{ type: "spring", stiffness: 160, damping: 20 }} className="mt-8 border-y border-border py-8 text-center">
          <h2 className="font-heading text-2xl md:text-3xl font-bold">{circusVoteMessage}</h2>
          <Button asChild size="lg" className="mt-5 min-h-11 bg-accent text-accent-foreground hover:bg-accent/90"><a href={circusVoterUrl} target="_blank" rel="noopener noreferrer"><MapPin /> Find my polling place</a></Button>
        </motion.section>}
      </div>
      <footer className="relative border-t border-border px-5 py-6 text-center">
        <Button asChild variant="link" className="h-11 text-foreground"><Link to="/"><ArrowLeft /> Back to home</Link></Button>
        <p className="mt-2 text-sm font-semibold text-muted-foreground">Paid for by KeithforGA LLC</p>
      </footer>
    </main>
  );
};

export default Circus;