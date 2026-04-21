// Lightweight GA4 wrapper for the Pushcard (and other pages).
// Loads gtag.js on demand using VITE_GA4_MEASUREMENT_ID.
// Safe no-op if the ID is missing (e.g. in dev/preview without it set).

const MEASUREMENT_ID = import.meta.env.VITE_GA4_MEASUREMENT_ID as string | undefined;

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag: (...args: unknown[]) => void;
  }
}

let initialized = false;

export const initAnalytics = () => {
  if (initialized) return;
  if (typeof window === "undefined") return;
  if (!MEASUREMENT_ID) {
    // No measurement ID configured — silently no-op.
    return;
  }

  // Inject gtag.js
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${MEASUREMENT_ID}`;
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", MEASUREMENT_ID, { send_page_view: false });

  initialized = true;
};

export const trackEvent = (
  name: string,
  params: Record<string, unknown> = {}
) => {
  if (typeof window === "undefined") return;
  if (!MEASUREMENT_ID || !window.gtag) {
    // Fallback: log in dev so we can verify in console
    if (import.meta.env.DEV) {
      // eslint-disable-next-line no-console
      console.log("[analytics]", name, params);
    }
    return;
  }
  window.gtag("event", name, params);
};
