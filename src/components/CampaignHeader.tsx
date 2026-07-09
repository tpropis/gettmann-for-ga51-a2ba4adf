import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo_trans.svg";
import { trackDonateClick } from "@/lib/analytics";
import { winredUrl } from "@/lib/winred";


const navLinks = [
  { label: "About", href: "/#meet-keith" },
  { label: "Issues", href: "/#issues" },
  { label: "District Map", href: "/map" },
  { label: "Have Your Say", href: "/community-council" },
  { label: "Get Involved", href: "/#get-involved" },
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
        scrolled ? "shadow-lg" : ""
      }`}
    >
      {/* Thin gold accent stripe */}
      <div className="h-[3px] bg-accent w-full" />

      {/* Main header bar */}
      <div className="transition-all duration-300 bg-primary">
        <div className="container mx-auto flex items-center justify-between">
          <a href="#home" className="flex-shrink-0">
            <img
              src={logo}
              alt="Keith Gettmann for Georgia House"
              className={`transition-all duration-300 rounded ${
                scrolled ? "h-[44px] md:h-[50px] my-1.5" : "h-[52px] md:h-[60px] my-2"
              }`}
            />
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) =>
              link.label === "District Map" ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="flex items-center gap-1.5 text-primary-foreground/70 hover:text-primary-foreground font-body text-sm font-semibold uppercase tracking-wider transition-colors px-3 py-2 rounded hover:bg-primary-foreground/5"
                >
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                  {link.label}
                </a>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-primary-foreground/70 hover:text-primary-foreground font-body text-sm font-semibold uppercase tracking-wider transition-colors px-3 py-2 rounded hover:bg-primary-foreground/5"
                >
                  {link.label}
                </a>
              )
            )}
            <a
              href="/plusone"
              aria-label="PlusOne in 51"
              className="ml-2 font-heading text-sm font-bold px-4 py-2 rounded-md border border-accent/50 text-primary-foreground hover:bg-accent/10 transition-colors tracking-wide uppercase"
            >
              Plus<span className="text-accent">One</span>
            </a>
            <a
              href={winredUrl("header")}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackDonateClick("header_desktop", "Donate")}
              className="ml-2 bg-accent text-accent-foreground font-heading text-sm font-bold px-5 py-2 rounded-md hover:brightness-90 transition-all tracking-wide shadow-md shadow-accent/20 uppercase"
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
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="lg:hidden bg-primary overflow-hidden border-t border-primary-foreground/5"
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-3">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-primary-foreground/70 hover:text-primary-foreground font-body text-base font-semibold uppercase tracking-wider py-2 border-b border-primary-foreground/5"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/plusone"
                onClick={() => setMenuOpen(false)}
                className="font-heading text-base font-bold text-primary-foreground uppercase tracking-wider py-2.5 px-4 rounded-md border border-accent/50 text-center"
              >
                Plus<span className="text-accent">One</span> in 51
              </a>
              <a
                href={winredUrl("mobile_menu")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackDonateClick("header_mobile", "Donate");
                  setMenuOpen(false);
                }}
                className="bg-accent text-accent-foreground font-heading text-lg font-bold px-6 py-3.5 rounded-md text-center hover:brightness-90 transition-all mt-2 shadow-lg shadow-accent/20 uppercase"
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
