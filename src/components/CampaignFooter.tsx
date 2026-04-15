import logo from "@/assets/logo_trans.svg";
import { Facebook, Twitter, Instagram, Youtube, Phone, Mail, MapPin } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Meet Keith", href: "#meet-keith" },
  { label: "Issues", href: "#issues" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { Icon: Facebook, href: "#", label: "Facebook — link coming soon" },
  { Icon: Twitter, href: "#", label: "Twitter/X — link coming soon" },
  { Icon: Instagram, href: "#", label: "Instagram — link coming soon" },
  { Icon: Youtube, href: "#", label: "YouTube — link coming soon" },
];

const CampaignFooter = () => (
  <footer id="contact" className="bg-primary pt-24 pb-10">
    <div className="container mx-auto px-4">
      {/* Gold divider at top */}
      <div className="w-20 h-[3px] bg-accent mx-auto mb-16" />

      <div className="grid md:grid-cols-3 gap-14 lg:gap-20">
        {/* Logo & brand */}
        <div>
          <img src={logo} alt="Keith Gettmann for Georgia House" className="h-20 mb-6" />
          <p className="text-primary-foreground/60 text-sm leading-relaxed max-w-xs">
            Keith Gettmann is running for Georgia House District 51 to protect families, strengthen communities, and fight for the future of our district.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <h3 className="font-heading text-lg font-bold text-primary-foreground uppercase tracking-wider mb-6">
            Quick Links
          </h3>
          <nav className="space-y-3">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-primary-foreground/50 hover:text-primary-foreground text-sm transition-colors font-medium tracking-wide"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact & social */}
        <div>
          <h3 className="font-heading text-lg font-bold text-primary-foreground uppercase tracking-wider mb-6">
            Contact
          </h3>
          <div className="space-y-4">
            <a
              href="mailto:Keith@KeithforGA.com"
              className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
            >
              <Mail className="h-4 w-4 text-accent flex-shrink-0" />
              Keith@KeithforGA.com
            </a>
            <a
              href="tel:+16782318730"
              className="flex items-center gap-3 text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
            >
              <Phone className="h-4 w-4 text-accent flex-shrink-0" />
              (678) 231-8730
            </a>
            <div className="flex items-center gap-3 text-primary-foreground/60 text-sm">
              <MapPin className="h-4 w-4 text-accent flex-shrink-0" />
              Sandy Springs, GA 30350
            </div>
          </div>

          <div className="flex gap-3 mt-8">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                className="w-10 h-10 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Icon className="h-5 w-5 text-primary-foreground/60 group-hover:text-accent-foreground transition-colors" />
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="border-t border-primary-foreground/5 mt-20 pt-8">
        <p className="text-center text-primary-foreground/40 text-sm font-medium mb-4">
          Paid for by Keith for GA LLC. Not authorized by any candidate or candidate's committee.
        </p>
        <div className="flex flex-wrap justify-center gap-6 text-primary-foreground/30 text-xs">
          <span>© 2026 Keith for GA LLC. All rights reserved.</span>
          <a href="#" className="hover:text-primary-foreground/50 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground/50 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default CampaignFooter;
