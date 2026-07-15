import logo from "@/assets/logo_trans.svg";

type Props = {
  title: string;
  intro: string;
};

/**
 * Header area: campaign logo, game title, and short intro copy.
 */
export const GameHeader = ({ title, intro }: Props) => (
  <header className="w-full border-b border-primary-foreground/10 bg-primary">
    <div className="container mx-auto max-w-5xl px-4 py-6 md:py-8 flex flex-col items-center text-center">
      <img src={logo} alt="Keith Gettmann for Georgia" className="h-10 md:h-12 w-auto mb-4" />
      <h1 className="font-heading uppercase tracking-tight text-3xl md:text-5xl font-bold text-primary-foreground">
        {title}
      </h1>
      <div className="w-16 h-[3px] bg-accent mt-3" />
      <p className="mt-4 text-primary-foreground/80 text-base md:text-lg max-w-2xl leading-relaxed">
        {intro}
      </p>
    </div>
  </header>
);
