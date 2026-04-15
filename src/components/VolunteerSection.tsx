import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";

const helpOptions = [
  "Door Knocking",
  "Phone Banking",
  "Hosting an Event",
  "Yard Signs",
  "General Volunteer",
];

const VolunteerSection = () => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", zip: "", help: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Thank you for volunteering! We'll be in touch soon.");
    setForm({ name: "", email: "", phone: "", zip: "", help: "" });
  };

  return (
    <section id="get-involved" className="py-24 md:py-36 bg-background">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
            Join Keith's Campaign Team
          </h2>
          <div className="section-divider" />
          <p className="text-center text-muted-foreground mt-6 text-lg leading-relaxed">
            Be part of the movement to protect District 51.
          </p>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-14 space-y-5"
        >
          <input
            type="text"
            required
            placeholder="Full Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full px-5 py-4 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
          <div className="grid sm:grid-cols-2 gap-5">
            <input
              type="email"
              required
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-5 py-4 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({ ...form, phone: e.target.value })}
              className="w-full px-5 py-4 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
            />
          </div>
          <input
            type="text"
            placeholder="ZIP Code"
            value={form.zip}
            onChange={(e) => setForm({ ...form, zip: e.target.value })}
            className="w-full px-5 py-4 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors"
          />
          <select
            value={form.help}
            onChange={(e) => setForm({ ...form, help: e.target.value })}
            className="w-full px-5 py-4 border border-border rounded-md font-body text-base focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent bg-background text-foreground transition-colors"
          >
            <option value="">How would you like to help?</option>
            {helpOptions.map((opt) => (
              <option key={opt} value={opt}>{opt}</option>
            ))}
          </select>

          <button
            type="submit"
            className="w-full bg-accent text-accent-foreground font-heading text-xl font-bold py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
          >
            Sign Up to Volunteer
          </button>
        </motion.form>
      </div>
    </section>
  );
};

export default VolunteerSection;
