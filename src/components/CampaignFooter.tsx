import logo from "@/assets/logo_trans.svg";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";
import { trackEvent, trackDonateClick } from "@/lib/analytics";
import { winredUrl } from "@/lib/winred";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Meet Keith", href: "#meet-keith" },
  { label: "Issues", href: "#issues" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Donate", href: winredUrl("footer"), external: true },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { Icon: Facebook, href: "https://www.facebook.com/profile.php?id=61564223962233", label: "Facebook" },
  { Icon: Instagram, href: "https://www.instagram.com/keithforgeorgia/", label: "Instagram" },
];

const CampaignFooter = () => (
  <footer id="contact" className="bg-primary pt-10 md:pt-12 pb-6">
    <div className="container mx-auto max-w-[1100px]">
      {/* Gold divider at top */}
      <div className="w-14 h-[2px] bg-accent mx-auto mb-8" />

      <div className="grid md:grid-cols-3 gap-8 lg:gap-10">
        {/* Logo & brand */}
        <div>
          <img src={logo} alt="Keith Gettmann for Georgia House" className="h-14 mb-4" />
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Keith Gettmann is running for Georgia House District 51 to protect families, strengthen communities, and fight for the future of our district.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <h3 className="font-heading text-sm font-bold text-primary-foreground uppercase tracking-[0.18em] mb-4">
            Quick Links
          </h3>
          <nav className="space-y-2.5">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target={link.external ? "_blank" : undefined}
                rel={link.external ? "noopener noreferrer" : undefined}
                onClick={
                  link.label === "Donate"
                    ? () => trackDonateClick("footer", "Donate")
                    : undefined
                }
                className="block text-primary-foreground/55 hover:text-primary-foreground text-sm transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact & social */}
        <div>
          <h3 className="font-heading text-sm font-bold text-primary-foreground uppercase tracking-[0.18em] mb-4">
            Contact
          </h3>
          <div className="space-y-3">
            <a
              href="mailto:Keith@KeithforGA.com"
              className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
            >
              <Mail className="h-4 w-4 text-accent flex-shrink-0" />
              Keith@KeithforGA.com
            </a>
            <a
              href="tel:+14702613103"
              className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
            >
              <Phone className="h-4 w-4 text-accent flex-shrink-0" />
              (470) 261-3103
            </a>
            <div className="flex items-start gap-3 text-primary-foreground/60 text-sm">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0 mt-0.5" />
              <span>Mail checks to:<br />Keith for GA LLC<br />20 Saddleview Run<br />Sandy Springs, GA 30350</span>
            </div>
          </div>

          <div className="mt-5">
            <div className="text-primary-foreground/70 text-xs uppercase tracking-[0.18em] font-bold mb-3">
              Follow Keith
            </div>
            <div className="flex flex-col gap-2.5">
              {socialLinks.map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  onClick={() =>
                    trackEvent("social_link_click", {
                      network: label.toLowerCase(),
                      location: "footer",
                      url: href,
                    })
                  }
                  className="inline-flex items-center gap-3 text-primary-foreground/80 hover:text-accent text-sm font-medium transition-colors group"
                >
                  <span className="w-9 h-9 rounded-full bg-accent flex items-center justify-center group-hover:bg-primary-foreground transition-colors">
                    <Icon className="h-4 w-4 text-primary" />
                  </span>
                  {label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary-foreground/10 mt-8 pt-5">
        <p className="text-center text-primary-foreground/45 text-xs md:text-sm font-medium mb-3">
          Paid for by Keith for GA LLC. Not authorized by any candidate or candidate's committee.
        </p>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-2 text-primary-foreground/35 text-xs">
          <span>© 2026 Keith for GA LLC. All rights reserved.</span>
          <a href="/privacy" className="hover:text-primary-foreground/60 transition-colors">Privacy Policy</a>
          <a href="/terms" className="hover:text-primary-foreground/60 transition-colors">Terms</a>
          <a
            href="/common-sense-swing"
            aria-label="Common Sense Swing"
            className="text-primary-foreground/10 hover:text-primary-foreground/60 transition-colors select-none"
          >
            ·
          </a>
        </div>
      </div>
    </div>
  </footer>
);

export default CampaignFooter;
