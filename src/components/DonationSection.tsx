import { useState } from "react";
import { Shield } from "lucide-react";
import { motion } from "framer-motion";

const amounts = [25, 50, 100, 250];
const PAYPAL_LINK = "https://www.paypal.com/ncp/payment/9TFN22CKFFVFW";

const DonationSection = () => {
  const [selected, setSelected] = useState<number>(100);

  return (
    <section id="donate" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-background rounded-xl p-8 md:p-10 shadow-2xl text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground uppercase tracking-tight">
            Support Keith Gettmann
          </h2>
          <p className="text-muted-foreground mt-3 text-base md:text-lg max-w-md mx-auto">
            Help us reach more voters, grow the campaign, and fight for District 51.
          </p>

          {/* Amount buttons */}
          <div className="grid grid-cols-4 gap-3 mt-8">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => setSelected(amt)}
                className={`font-heading text-lg font-bold py-3 rounded-lg transition-all ${
                  selected === amt
                    ? "bg-accent text-accent-foreground ring-2 ring-accent ring-offset-2"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* CTA */}
          <a
            href={PAYPAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full bg-accent text-accent-foreground font-heading text-xl font-bold py-4 rounded-lg text-center mt-8 hover:brightness-110 transition-all tracking-wide shadow-lg"
          >
            DONATE {selected ? `$${selected}` : ""} WITH PAYPAL
          </a>

          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
            <Shield className="h-4 w-4" />
            <span>Secure payment powered by PayPal</span>
          </div>
        </motion.div>

        <p className="text-center text-primary-foreground/50 text-xs mt-6">
          Paid for by Friends of Keith Gettmann
        </p>
      </div>
    </section>
  );
};

export default DonationSection;
