import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo_trans.png";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Meet Keith", href: "#meet-keith" },
  { label: "Issues", href: "#issues" },
  { label: "Get Involved", href: "#get-involved" },
  { label: "News", href: "#news" },
  { label: "Contact", href: "#contact" },
];

const CampaignHeader = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-primary/95 backdrop-blur-md shadow-lg py-1"
          : "bg-primary py-3"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <a href="#home" className="flex-shrink-0 mr-10">
          <img
            src={logo}
            alt="Keith Gettmann for Georgia House"
            className={`transition-all duration-300 ${scrolled ? "h-[72px] md:h-[80px]" : "h-[100px] md:h-[120px]"}`}
          />
        </a>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-primary-foreground/80 hover:text-primary-foreground font-body text-sm font-semibold uppercase tracking-wider transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#donate"
            className="bg-accent text-accent-foreground font-heading text-lg font-bold px-7 py-3 rounded hover:bg-campaign-red-dark transition-colors tracking-wide shadow-lg shadow-accent/20"
          >
            Donate
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden text-primary-foreground p-2"
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary overflow-hidden"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-foreground/80 hover:text-primary-foreground font-body text-base font-semibold uppercase tracking-wider py-2 border-b border-primary-foreground/10"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="#donate"
                onClick={() => setMenuOpen(false)}
                className="bg-accent text-accent-foreground font-heading text-lg font-bold px-6 py-3 rounded text-center hover:bg-campaign-red-dark transition-colors mt-2 shadow-lg shadow-accent/20"
              >
                Donate
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
};

export default CampaignHeader;
