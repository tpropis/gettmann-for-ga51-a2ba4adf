import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, MessageSquareHeart, ArrowLeft } from "lucide-react";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";
import Seo from "@/components/Seo";

const topicOptions = ["Local Issue", "Policy Idea", "Community Event", "Other"];

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

const CommunityCouncil = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    zip: "",
    topic: "",
    message: "",
  });
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "community-council",
          subject: "COMMUNITY COUNCIL SUBMISSION – keithforga.com",
          name: form.name.trim(),
          email: form.email.trim(),
          zip: form.zip.trim(),
          topic: form.topic,
          message: form.message.trim(),
        }),
      });
      setDone(true);
      setForm({ name: "", email: "", zip: "", topic: "", message: "" });
    } catch {
      // no-op
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Seo
        title="Community Council | Keith Gettmann for Georgia"
        description="Residents of Georgia State House District 51 can share concerns, ideas, and priorities directly with Keith Gettmann through the Community Council form."
        path="/community-council"
      />
      <CampaignHeader />
      <main className="bg-campaign-light min-h-screen pt-32 md:pt-40 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <a
              href="/"
              className="inline-flex items-center gap-2 text-primary/70 hover:text-primary font-body text-sm font-semibold uppercase tracking-wider mb-6 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </a>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-10"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-5">
                <MessageSquareHeart className="w-8 h-8 text-primary" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary mb-4 uppercase tracking-tight">
                Community Council
              </h1>
              <div className="w-20 h-1 bg-accent mx-auto mb-6" />
              <div className="text-left md:text-center text-foreground/80 font-body space-y-4 leading-relaxed">
                <p>
                  The Community Council is a place for residents of District 51 to share concerns,
                  ideas, and priorities directly with their House Representative.
                </p>
                <p>
                  Whether it's a local issue, policy suggestion, or community initiative — your
                  voice matters.
                </p>
                <p>
                  This platform is designed to keep communication open, direct, and focused on what
                  matters most to our community.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
              className="bg-white rounded-lg shadow-xl border border-primary/10 p-6 md:p-10"
            >
              {done ? (
                <div className="text-center py-8">
                  <CheckCircle2 className="w-14 h-14 text-accent mx-auto mb-4" />
                  <h2 className="font-heading text-2xl font-bold text-primary mb-2 uppercase">
                    Thank You
                  </h2>
                  <p className="text-foreground/70 font-body">
                    Your input has been received. Keith reads every submission personally.
                  </p>
                </div>
              ) : (
                <form
                  name="community-council"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <input type="hidden" name="form-name" value="community-council" />
                  <input
                    type="hidden"
                    name="subject"
                    value="COMMUNITY COUNCIL SUBMISSION – keithforga.com"
                  />
                  <p className="hidden">
                    <label>
                      Don't fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label htmlFor="cc-name" className="block text-sm font-semibold text-primary mb-1.5 font-body uppercase tracking-wide">
                      Name
                    </label>
                    <input
                      type="text"
                      id="cc-name"
                      name="name"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full h-11 px-3 rounded-md border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="cc-email" className="block text-sm font-semibold text-primary mb-1.5 font-body uppercase tracking-wide">
                        Email
                      </label>
                      <input
                        type="email"
                        id="cc-email"
                        name="email"
                        required
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full h-11 px-3 rounded-md border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                      />
                    </div>
                    <div>
                      <label htmlFor="cc-zip" className="block text-sm font-semibold text-primary mb-1.5 font-body uppercase tracking-wide">
                        Zip Code
                      </label>
                      <input
                        type="text"
                        id="cc-zip"
                        name="zip"
                        required
                        value={form.zip}
                        onChange={(e) => setForm({ ...form, zip: e.target.value })}
                        className="w-full h-11 px-3 rounded-md border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="cc-topic" className="block text-sm font-semibold text-primary mb-1.5 font-body uppercase tracking-wide">
                      Topic
                    </label>
                    <select
                      id="cc-topic"
                      name="topic"
                      required
                      value={form.topic}
                      onChange={(e) => setForm({ ...form, topic: e.target.value })}
                      className="w-full h-11 px-3 rounded-md border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition"
                    >
                      <option value="" disabled>
                        Select a topic…
                      </option>
                      {topicOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label htmlFor="cc-message" className="block text-sm font-semibold text-primary mb-1.5 font-body uppercase tracking-wide">
                      Message
                    </label>
                    <textarea
                      id="cc-message"
                      name="message"
                      required
                      rows={6}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-3 py-2 rounded-md border border-primary/20 bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent transition resize-y"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-accent text-accent-foreground font-heading text-base font-bold px-6 py-3.5 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20 uppercase disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? "Submitting…" : "Submit Your Input"}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>
      <CampaignFooter />
    </>
  );
};

export default CommunityCouncil;
