import logo from "@/assets/logo_trans.png";
import { Facebook, Twitter, Instagram, Youtube } from "lucide-react";

const footerLinks = [
  { label: "Home", href: "#home" },
  { label: "Meet Keith", href: "#meet-keith" },
  { label: "Issues", href: "#issues" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "Donate", href: "#donate" },
  { label: "Contact", href: "#contact" },
];

const CampaignFooter = () => (
  <footer id="contact" className="bg-primary py-16">
    <div className="container mx-auto px-4">
      <div className="grid md:grid-cols-3 gap-12">
        {/* Logo & disclaimer */}
        <div>
          <img src={logo} alt="Keith Gettmann for Georgia House" className="h-16 mb-6" />
          <p className="text-primary-foreground/50 text-sm leading-relaxed">
            Paid for by Keith Gettmann for Georgia. All rights reserved.
          </p>
        </div>

        {/* Nav links */}
        <div>
          <h3 className="font-heading text-lg font-bold text-primary-foreground uppercase tracking-wider mb-4">
            Quick Links
          </h3>
          <nav className="space-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Contact & social */}
        <div>
          <h3 className="font-heading text-lg font-bold text-primary-foreground uppercase tracking-wider mb-4">
            Contact
          </h3>
          <a
            href="mailto:info@keithgettmann.com"
            className="text-primary-foreground/60 hover:text-primary-foreground text-sm transition-colors"
          >
            info@keithgettmann.com
          </a>

          <div className="flex gap-4 mt-6">
            {[Facebook, Twitter, Instagram, Youtube].map((Icon, i) => (
              <a
                key={i}
                href="#"
                className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-accent transition-colors"
              >
                <Icon className="h-5 w-5 text-primary-foreground" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-t border-primary-foreground/10 mt-12 pt-6 flex flex-wrap justify-between text-primary-foreground/40 text-xs">
        <span>© 2026 Keith Gettmann for Georgia. All rights reserved.</span>
        <div className="flex gap-4">
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Privacy Policy</a>
          <a href="#" className="hover:text-primary-foreground/60 transition-colors">Terms</a>
        </div>
      </div>
    </div>
  </footer>
);

export default CampaignFooter;
