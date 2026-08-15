import { useEffect, useRef } from "react";

/**
 * Background "character rain" canvas for the hidden Wake Up 51 page.
 * Purely decorative — hidden from assistive tech and skipped when the
 * visitor prefers reduced motion.
 */
export const MatrixRain = ({ active = true }: { active?: boolean }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let frame = 0;
    let raf = 0;
    let columns = 0;
    let drops: number[] = [];
    const fontSize = 16;
    const glyphs = "51GETTMANNKEITH0123456789ヲァウエカサタナハマヤ".split("");

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      columns = Math.ceil(canvas.width / fontSize);
      drops = Array.from({ length: columns }, () => Math.random() * -50);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      frame += 1;
      if (frame % 2 === 0) {
        ctx.fillStyle = "rgba(10, 10, 10, 0.12)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = `${fontSize}px monospace`;
        for (let i = 0; i < columns; i += 1) {
          const char = glyphs[Math.floor(Math.random() * glyphs.length)];
          ctx.fillStyle =
            Math.random() > 0.97 ? "rgba(220, 176, 74, 0.75)" : "rgba(52, 235, 108, 0.4)";
          ctx.fillText(char, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i] += 1;
        }
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full opacity-40"
    />
  );
};
