// Centralized WinRed donation URL builder.
// Every donate CTA on the site should route through this so UTM parameters
// remain consistent for Campaign Nucleus source tracking.
const WINRED_BASE = "https://secure.winred.com/keithforga-llc/donate";

export const winredUrl = (utmContent: string, amount?: number) => {
  const params = new URLSearchParams();
  if (amount) params.set("amount", String(amount));
  params.set("utm_source", "keithforga");
  params.set("utm_medium", "website");
  params.set("utm_campaign", "general_donate");
  params.set("utm_content", utmContent);
  return `${WINRED_BASE}?${params.toString()}`;
};
