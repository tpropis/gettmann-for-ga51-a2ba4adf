import { useState } from "react";
import { X } from "lucide-react";
import { toast } from "sonner";

const encode = (data: Record<string, string>) =>
  Object.keys(data)
    .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
    .join("&");

type Props = { open: boolean; onClose: () => void };

const CrayonRequestModal = ({ open, onClose }: Props) => {
  const [form, setForm] = useState({ name: "", email: "", phone: "", zip: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  if (!open) return null;

  const inputCls =
    "w-full px-3.5 py-2.5 border border-border rounded-md font-body text-base bg-background focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent transition-colors";

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: encode({
          "form-name": "crayon-request",
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          zip: form.zip.trim(),
          message: form.message.trim(),
        }),
      });
      setDone(true);
      setForm({ name: "", email: "", phone: "", zip: "", message: "" });
    } catch {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end sm:items-center justify-center bg-primary/70 px-4 py-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-label="Request crayons"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md bg-background rounded-xl border-2 border-primary/10 shadow-2xl p-5 md:p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-3 right-3 p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-muted transition-colors"
        >
          <X className="h-5 w-5" />
        </button>

        <h3 className="font-heading text-2xl font-bold text-primary uppercase tracking-tight pr-8">
          Request Crayons
        </h3>
        <div className="w-12 h-[3px] bg-accent mt-2 mb-4" />

        {done ? (
          <p className="text-muted-foreground leading-relaxed">
            Got it — the campaign will be in touch. Go ahead and print your page
            in the meantime.
          </p>
        ) : (
          <form onSubmit={submit} className="space-y-3">
            <div>
              <label htmlFor="crayon-name" className="block text-sm font-semibold text-primary mb-1">
                Parent / guardian name
              </label>
              <input
                id="crayon-name"
                required
                className={inputCls}
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
            </div>
            <div>
              <label htmlFor="crayon-email" className="block text-sm font-semibold text-primary mb-1">
                Email
              </label>
              <input
                id="crayon-email"
                type="email"
                required
                className={inputCls}
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="crayon-phone" className="block text-sm font-semibold text-primary mb-1">
                  Phone <span className="font-normal text-muted-foreground">(optional)</span>
                </label>
                <input
                  id="crayon-phone"
                  type="tel"
                  className={inputCls}
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <label htmlFor="crayon-zip" className="block text-sm font-semibold text-primary mb-1">
                  ZIP code
                </label>
                <input
                  id="crayon-zip"
                  required
                  inputMode="numeric"
                  className={inputCls}
                  value={form.zip}
                  onChange={(e) => setForm({ ...form, zip: e.target.value })}
                />
              </div>
            </div>
            <div>
              <label htmlFor="crayon-message" className="block text-sm font-semibold text-primary mb-1">
                Short message
              </label>
              <textarea
                id="crayon-message"
                rows={3}
                className={inputCls}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                placeholder="How many kids are coloring?"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary text-primary-foreground font-heading font-bold uppercase tracking-[0.12em] py-3 rounded-md hover:bg-primary/90 transition-colors disabled:opacity-60"
            >
              {loading ? "Sending…" : "Send Request"}
            </button>
            <p className="text-[11px] leading-snug text-muted-foreground">
              Just a community activity — no strings, no sign-ups, nothing to
              complete in return.
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default CrayonRequestModal;
