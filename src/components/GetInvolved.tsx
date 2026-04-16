import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

const helpOptions = [
  "Door Knocking",
  "Phone Banking",
  "Hosting an Event",
  "Yard Signs",
  "General Volunteer",
];

const SUCCESS_MSG = "Thanks for joining the campaign. We'll be in touch soon.";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

const postToNetlify = (formName: string, data: Record<string, string>) =>
  fetch("/", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: encode({ "form-name": formName, ...data }),
  });

const GetInvolved = () => {
  // Supporter form
  const [supporter, setSupporter] = useState({ name: "", email: "", zip: "" });
  const [supporterDone, setSupporterDone] = useState(false);
  const [supporterLoading, setSupporterLoading] = useState(false);

  // Volunteer form
  const [vol, setVol] = useState({ name: "", email: "", phone: "", help: "" });
  const [volDone, setVolDone] = useState(false);
  const [volLoading, setVolLoading] = useState(false);

  const handleSupporter = async (e: React.FormEvent) => {
    e.preventDefault();
    setSupporterLoading(true);
    try {
      await postToNetlify("stay-updated", {
        name: supporter.name.trim(),
        email: supporter.email.trim(),
        zip: supporter.zip.trim(),
      });
      setSupporterDone(true);
      setSupporter({ name: "", email: "", zip: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setSupporterLoading(false);
    }
  };

  const handleVolunteer = async (e: React.FormEvent) => {
    e.preventDefault();
    setVolLoading(true);
    try {
      await postToNetlify("volunteer", {
        name: vol.name.trim(),
        email: vol.email.trim(),
        phone: vol.phone.trim(),
        help: vol.help,
      });
      setVolDone(true);
      setVol({ name: "", email: "", phone: "", help: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setVolLoading(false);
    }
  };

  const inputCls =
    "w-full px-4 py-3 border border-border rounded-md font-body text-base bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors";

  return (
    <section id="get-involved" className="py-24 md:py-32 bg-secondary">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight">
            Get Involved
          </h2>
          <div className="w-20 h-[3px] bg-accent mx-auto mt-4" />
          <p className="mt-6 text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Two ways to back the campaign. Pick what fits.
          </p>
        </motion.div>

        <div className="mt-14 grid md:grid-cols-2 gap-6 md:gap-8">
          {/* LEFT — Supporter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl border border-border/60 shadow-md p-8 md:p-10 flex flex-col"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mt-2 mb-6 leading-relaxed">
              Get updates from the campaign.
            </p>

            {supporterDone ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
                <p className="text-primary font-heading font-semibold text-lg leading-relaxed max-w-sm">
                  {SUCCESS_MSG}
                </p>
              </div>
            ) : (
              <form onSubmit={handleSupporter} className="space-y-4 flex-1 flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={supporter.name}
                  onChange={(e) => setSupporter({ ...supporter, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={supporter.email}
                  onChange={(e) => setSupporter({ ...supporter, email: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  inputMode="numeric"
                  placeholder="ZIP Code"
                  value={supporter.zip}
                  onChange={(e) => setSupporter({ ...supporter, zip: e.target.value })}
                  className={inputCls}
                />
                <button
                  type="submit"
                  disabled={supporterLoading}
                  className="mt-auto w-full bg-accent text-accent-foreground font-heading text-lg font-bold py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-md shadow-accent/20 uppercase disabled:opacity-60"
                >
                  {supporterLoading ? "Submitting..." : "Join the Campaign"}
                </button>
              </form>
            )}
          </motion.div>

          {/* RIGHT — Volunteer */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-background rounded-xl border border-border/60 shadow-md p-8 md:p-10 flex flex-col"
          >
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight">
              Volunteer
            </h3>
            <p className="text-muted-foreground mt-2 mb-6 leading-relaxed">
              Help us win. Join the team.
            </p>

            {volDone ? (
              <div className="flex-1 flex flex-col items-center justify-center text-center py-8">
                <CheckCircle2 className="h-12 w-12 text-accent mb-4" />
                <p className="text-primary font-heading font-semibold text-lg leading-relaxed max-w-sm">
                  {SUCCESS_MSG}
                </p>
              </div>
            ) : (
              <form onSubmit={handleVolunteer} className="space-y-4 flex-1 flex flex-col">
                <input
                  type="text"
                  required
                  placeholder="Full Name"
                  value={vol.name}
                  onChange={(e) => setVol({ ...vol, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="email"
                  required
                  placeholder="Email Address"
                  value={vol.email}
                  onChange={(e) => setVol({ ...vol, email: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="tel"
                  required
                  placeholder="Phone"
                  value={vol.phone}
                  onChange={(e) => setVol({ ...vol, phone: e.target.value })}
                  className={inputCls}
                />
                <select
                  required
                  value={vol.help}
                  onChange={(e) => setVol({ ...vol, help: e.target.value })}
                  className={`${inputCls} text-foreground`}
                >
                  <option value="">How would you like to help?</option>
                  {helpOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
                <button
                  type="submit"
                  disabled={volLoading}
                  className="mt-auto w-full bg-primary text-primary-foreground font-heading text-lg font-bold py-4 rounded-md hover:bg-primary/90 transition-all tracking-wide shadow-md uppercase disabled:opacity-60 border-2 border-primary"
                >
                  {volLoading ? "Submitting..." : "Sign Up to Volunteer"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GetInvolved;
