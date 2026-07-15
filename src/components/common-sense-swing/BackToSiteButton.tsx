import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

/**
 * Returns visitor to the main campaign site without leaving via nav.
 */
export const BackToSiteButton = () => (
  <Link
    to="/"
    className="inline-flex items-center gap-2 rounded-md border border-primary-foreground/20 bg-transparent px-4 py-2 text-sm font-heading uppercase tracking-wide text-primary-foreground/80 hover:bg-primary-foreground/10 transition-colors"
  >
    <ArrowLeft className="h-4 w-4" />
    Back to site
  </Link>
);
