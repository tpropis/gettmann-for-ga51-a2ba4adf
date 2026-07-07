import { useState } from "react";
import { Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { trackDonateClick } from "@/lib/analytics";
import { winredUrl } from "@/lib/winred";

type AmountOption = { amount: number | "other"; label: string; utm: string };

const amounts: AmountOption[] = [
  { amount: 25, label: "$25", utm: "donation_page_25" },
  { amount: 51, label: "$51", utm: "donation_page_51" },
  { amount: 100, label: "$100", utm: "donation_page_100" },
  { amount: 250, label: "$250", utm: "donation_page_250" },
  { amount: 500, label: "$500", utm: "donation_page_500" },
  { amount: 1000, label: "$1,000", utm: "donation_page_1000" },
  { amount: 3300, label: "$3,300", utm: "donation_page_3300" },
  { amount: 6600, label: "$6,600", utm: "donation_page_6600" },
  { amount: "other", label: "Other", utm: "donation_page_other" },
];

const DonationSection = () => {
  const [selected, setSelected] = useState<AmountOption>(amounts[2]);

  const donateHref =
    selected.amount === "other"
      ? winredUrl(selected.utm)
      : winredUrl(selected.utm, selected.amount);

  return (
    <section id="donate" className="py-10 md:py-12 bg-primary">
      <div className="container mx-auto max-w-xl px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase tracking-tight">
            Support Keith Gettmann
          </h2>
          <div className="w-16 h-[3px] bg-accent mx-auto mt-4" />
          <p className="text-primary-foreground/80 mt-4 text-base md:text-lg max-w-md mx-auto leading-relaxed">
            Your donation helps us reach more voters and win House District 51.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="bg-background rounded-lg p-6 md:p-8 shadow-2xl mt-8 border border-border/30"
        >
          {/* Amount buttons */}
          <div className="grid grid-cols-3 gap-2.5">
            {amounts.map((opt) => {
              const isSelected = selected.amount === opt.amount;
              return (
                <button
                  key={opt.label}
                  onClick={() => setSelected(opt)}
                  className={`font-heading text-base md:text-lg font-bold py-3 md:py-3.5 rounded-md transition-all ${
                    isSelected
                      ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2"
                      : "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border/50"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>

          {/* Primary CTA */}
          <a
            href={donateHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackDonateClick("donation_section", `Donate ${selected.label}`, {
                amount: selected.amount,
                provider: "winred",
              })
            }
            className="mt-6 flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-heading text-xl md:text-2xl font-bold py-5 rounded-md text-center hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/30 uppercase"
          >
            <Heart className="w-5 h-5 fill-current" />
            Donate Securely
          </a>

          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-xs md:text-sm text-center">
            <Shield className="h-4 w-4 flex-shrink-0" />
            <span>Secure contribution processed through WinRed</span>
          </div>
        </motion.div>

        <p className="text-center text-primary-foreground/40 text-xs mt-6 tracking-wide">
          Paid for by Keith for GA LLC
        </p>
      </div>
    </section>
  );
};

export default DonationSection;
