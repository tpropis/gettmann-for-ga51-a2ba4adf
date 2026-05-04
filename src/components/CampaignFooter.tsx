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
              <span>Mail checks to:<br />20 Saddleview Run<br />Sandy Springs, GA 30350</span>
            </div>
          </div>

          <div className="flex gap-2.5 mt-6">
            {socialLinks.map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                title={label}
                className="w-9 h-9 rounded-full bg-primary-foreground/5 flex items-center justify-center hover:bg-accent transition-colors group"
              >
                <Icon className="h-4 w-4 text-primary-foreground/60 group-hover:text-accent-foreground transition-colors" />
              </a>
            ))}
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
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default CampaignFooter;
