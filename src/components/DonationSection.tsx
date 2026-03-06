import { useState } from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";

const amounts = [25, 50, 100, 250, 500];

const DonationSection = () => {
  const [selected, setSelected] = useState<number | null>(100);
  const [custom, setCustom] = useState("");
  const [recurring, setRecurring] = useState(false);

  const activeAmount = selected ?? (custom ? Number(custom) : 0);

  return (
    <section id="donate" className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground uppercase tracking-tight text-center">
            Help Keith Fight for Georgia Families
          </h2>
          <p className="text-center text-primary-foreground/70 mt-4 text-lg max-w-xl mx-auto">
            Your support helps fuel outreach, voter contact, digital organizing, and campaign growth across District 51.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-12 bg-background rounded-lg p-8 shadow-xl"
        >
          {/* Amount buttons */}
          <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
            {amounts.map((amt) => (
              <button
                key={amt}
                onClick={() => { setSelected(amt); setCustom(""); }}
                className={`font-heading text-lg font-bold py-3 rounded transition-colors ${
                  selected === amt
                    ? "bg-accent text-accent-foreground"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >
                ${amt}
              </button>
            ))}
          </div>

          {/* Custom amount */}
          <div className="mt-4">
            <input
              type="number"
              placeholder="Custom Amount"
              value={custom}
              onChange={(e) => { setCustom(e.target.value); setSelected(null); }}
              className="w-full px-4 py-3 border border-border rounded font-body text-lg focus:outline-none focus:ring-2 focus:ring-accent"
            />
          </div>

          {/* Recurring toggle */}
          <label className="flex items-center gap-3 mt-5 cursor-pointer">
            <button
              onClick={() => setRecurring(!recurring)}
              className={`w-12 h-6 rounded-full transition-colors relative ${
                recurring ? "bg-accent" : "bg-border"
              }`}
            >
              <span
                className={`absolute top-0.5 w-5 h-5 rounded-full bg-background shadow transition-transform ${
                  recurring ? "translate-x-6" : "translate-x-0.5"
                }`}
              />
            </button>
            <span className="text-foreground font-body font-medium">Make this a monthly recurring donation</span>
          </label>

          {/* CTA */}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="block w-full bg-accent text-accent-foreground font-heading text-xl font-bold py-4 rounded text-center mt-8 hover:bg-campaign-red-dark transition-colors tracking-wide"
          >
            Donate {activeAmount > 0 ? `$${activeAmount}` : "Now"}
          </a>

          <div className="flex items-center justify-center gap-2 mt-4 text-muted-foreground text-sm">
            <Lock className="h-4 w-4" />
            <span>Secure donation — processed via campaign payment platform</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DonationSection;
