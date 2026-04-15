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
    <section className="py-20 md:py-28 bg-primary">
      <div className="container mx-auto px-4 max-w-xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary-foreground uppercase tracking-tight text-center">
            Stay Updated with Keith's Campaign
          </h2>
          <div className="w-20 h-[3px] bg-accent mx-auto mt-4" />
        </motion.div>

        <form onSubmit={handleSubmit} className="mt-10 space-y-4">
          <input
            type="email"
            required
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-5 py-4 border border-primary-foreground/20 rounded-md font-body text-base bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
          <input
            type="text"
            placeholder="ZIP Code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            className="w-full px-5 py-4 border border-primary-foreground/20 rounded-md font-body text-base bg-primary-foreground/5 text-primary-foreground placeholder:text-primary-foreground/40 focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground font-heading text-lg font-bold py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
          >
            Join the Movement
          </button>
        </form>
      </div>
    </section>
  );
};

export default EmailSignup;
