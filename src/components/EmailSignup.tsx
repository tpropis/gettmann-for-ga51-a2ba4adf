import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const EmailSignup = () => {
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("You're signed up! Watch your inbox for campaign updates.");
    setEmail("");
    setZip("");
  };

  return (
    <section className="py-16 bg-campaign-light">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight text-center">
            Stay Updated with Keith's Campaign
          </h2>
          <div className="w-20 h-1 bg-accent mx-auto mt-4" />
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-3">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded font-body text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full px-4 py-3 border border-border rounded font-body text-base focus:outline-none focus:ring-2 focus:ring-primary"
          />
          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground font-heading text-lg font-bold py-4 rounded hover:bg-primary/90 transition-colors tracking-wide"
          >
            Join the Movement
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSignup;
