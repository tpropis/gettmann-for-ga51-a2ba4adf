import { useState } from "react";
import { Shield, Heart } from "lucide-react";
import { motion } from "framer-motion";
import { trackDonateClick } from "@/lib/analytics";

const amounts = [25, 50, 100, 250];
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/9TFN22CKFFVFW";

const DonationSection = () => {
  const [selected, setSelected] = useState<number>(100);

  return (
    <section id="donate" className="py-10 md:py-12 bg-primary">
      <div className="container mx-auto max-w-xl">
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
            Your support helps us reach more voters and win District 51.
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
          <div className="grid grid-cols-4 gap-2.5">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelected(amt)}
                className={`font-heading text-lg font-bold py-3 rounded-md transition-all ${
                  selected === amt
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/70 border border-border/50"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Primary CTA — visually dominant */}
          <a
            href={PAYPAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() =>
              trackDonateClick("donation_section", `Donate $${selected}`, {
                amount: selected,
                provider: "paypal",
              })
            }
            className="mt-6 flex items-center justify-center gap-2 w-full bg-accent text-accent-foreground font-heading text-xl md:text-2xl font-bold py-5 rounded-md text-center hover:brightness-95 transition-all tracking-wide shadow-xl shadow-accent/30 uppercase"
          >
            <Heart className="w-5 h-5 fill-current" />
            Donate {selected ? `$${selected}` : ""}
          </a>

          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-xs md:text-sm">
            <Shield className="h-4 w-4" />
            <span>Secure payment powered by PayPal</span>
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
