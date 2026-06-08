import { useState } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";
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

const SmsDisclosure = () => (
  <p className="text-[11px] leading-snug text-muted-foreground">
    By entering your phone number and selecting to opt in, you consent to join
    a recurring SMS/MMS text messaging program that will provide alerts,
    donation requests, updates, and other important information. By
    participating, you agree to the terms &amp; privacy policy for auto dialed
    messages from Keith for GA to the phone number you provide. Msg &amp; data
    rates may apply. Msg frequency varies. Reply HELP for help or STOP to
    opt-out at any time. SMS information is not rented, sold, or shared.{" "}
    <a href="/privacy" className="text-accent hover:underline">Privacy Policy</a>{" "}
    and{" "}
    <a href="/terms" className="text-accent hover:underline">Terms &amp; Conditions</a>.
  </p>
);

const GetInvolved = () => {
  // Supporter form
  const [supporter, setSupporter] = useState({ name: "", email: "", zip: "", phone: "", smsOptIn: false });
  const [supporterDone, setSupporterDone] = useState(false);
  const [supporterLoading, setSupporterLoading] = useState(false);

  // Volunteer form
  const [vol, setVol] = useState({ name: "", email: "", phone: "", help: "", smsOptIn: false });
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
        phone: supporter.phone.trim(),
        sms_opt_in: supporter.phone.trim() && supporter.smsOptIn ? "yes" : "no",
      });
      setSupporterDone(true);
      setSupporter({ name: "", email: "", zip: "", phone: "", smsOptIn: false });
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
        sms_opt_in: vol.smsOptIn ? "yes" : "no",
      });
      setVolDone(true);
      setVol({ name: "", email: "", phone: "", help: "", smsOptIn: false });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setVolLoading(false);
    }
  };

  const inputCls =
    "w-full px-3.5 py-2.5 border border-border rounded-md font-body text-base bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors";

  return (
    <section id="get-involved" className="py-10 md:py-14 bg-secondary">
      <div className="container mx-auto px-4 max-w-[1100px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight">
            Get Involved
          </h2>
          <div className="w-16 h-[3px] bg-accent mx-auto mt-3" />
          <p className="mt-3 text-base md:text-lg text-muted-foreground max-w-xl mx-auto leading-relaxed">
            Two ways to back the campaign. Pick what fits.
          </p>
        </motion.div>

        <div className="mt-8 grid md:grid-cols-2 gap-5 md:gap-6">
          {/* LEFT — Supporter */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-background rounded-xl border border-border/60 shadow-md p-6 md:p-7 flex flex-col"
          >
            <h3 className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-tight">
              Stay Updated
            </h3>
            <p className="text-muted-foreground mt-1.5 mb-4 leading-relaxed text-sm">
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
              <form
                name="stay-updated"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleSupporter}
                className="space-y-4 flex-1 flex flex-col"
              >
                <input type="hidden" name="form-name" value="stay-updated" />
                <p className="hidden">
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={supporter.name}
                  onChange={(e) => setSupporter({ ...supporter, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={supporter.email}
                  onChange={(e) => setSupporter({ ...supporter, email: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="text"
                  name="zip"
                  inputMode="numeric"
                  placeholder="ZIP Code"
                  value={supporter.zip}
                  onChange={(e) => setSupporter({ ...supporter, zip: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number (optional)"
                  value={supporter.phone}
                  onChange={(e) => setSupporter({ ...supporter, phone: e.target.value })}
                  className={inputCls}
                />
                <label className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    name="sms_opt_in"
                    checked={supporter.smsOptIn}
                    onChange={(e) => setSupporter({ ...supporter, smsOptIn: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-accent flex-shrink-0"
                  />
                  <span>I agree to receive text messages</span>
                </label>
                <SmsDisclosure />
                <button
                  type="submit"
                  disabled={supporterLoading}
                  className="mt-2 w-full bg-accent text-accent-foreground font-heading text-base font-bold py-3.5 rounded-md hover:brightness-90 transition-all tracking-wide shadow-md shadow-accent/20 uppercase disabled:opacity-60"
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
            className="bg-background rounded-xl border border-border/60 shadow-md p-6 md:p-7 flex flex-col"
          >
            <h3 className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-tight">
              Volunteer
            </h3>
            <p className="text-muted-foreground mt-1.5 mb-4 leading-relaxed text-sm">
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
              <form
                name="volunteer"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={handleVolunteer}
                className="space-y-4 flex-1 flex flex-col"
              >
                <input type="hidden" name="form-name" value="volunteer" />
                <p className="hidden">
                  <label>
                    Don't fill this out: <input name="bot-field" />
                  </label>
                </p>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Full Name"
                  value={vol.name}
                  onChange={(e) => setVol({ ...vol, name: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Email Address"
                  value={vol.email}
                  onChange={(e) => setVol({ ...vol, email: e.target.value })}
                  className={inputCls}
                />
                <input
                  type="tel"
                  name="phone"
                  required
                  placeholder="Phone"
                  value={vol.phone}
                  onChange={(e) => setVol({ ...vol, phone: e.target.value })}
                  className={inputCls}
                />
                <select
                  name="help"
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
                <label className="flex items-start gap-2 text-sm text-foreground cursor-pointer">
                  <input
                    type="checkbox"
                    name="sms_opt_in"
                    checked={vol.smsOptIn}
                    onChange={(e) => setVol({ ...vol, smsOptIn: e.target.checked })}
                    className="mt-1 h-4 w-4 accent-accent flex-shrink-0"
                  />
                  <span>I agree to receive text messages</span>
                </label>
                <SmsDisclosure />
                <button
                  type="submit"
                  disabled={volLoading}
                  className="mt-2 w-full bg-primary text-primary-foreground font-heading text-base font-bold py-3.5 rounded-md hover:bg-primary/90 transition-all tracking-wide shadow-md uppercase disabled:opacity-60 border-2 border-primary"
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
