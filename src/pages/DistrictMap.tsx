import CampaignHeader from "@/components/CampaignHeader";
import { CommunityMap } from "@/components/map/CommunityMap";
import { MapPin, ExternalLink } from "lucide-react";

export default function DistrictMap() {
  return (
    <div className="min-h-screen bg-campaign-light flex flex-col">
      <CampaignHeader />

      {/* Page header bar */}
      <div
        className="flex-shrink-0 border-b border-campaign-navy/10"
        style={{
          paddingTop: "73px", // account for fixed header
          background: "linear-gradient(180deg, hsl(213 50% 28%) 0%, hsl(213 50% 20%) 100%)",
        }}
      >
        <div className="container mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center flex-shrink-0">
                <MapPin size={15} className="text-accent" />
              </div>
              <div>
                <h1 className="font-heading text-base font-bold text-white uppercase tracking-wider leading-none">
                  District 51 Community Issues Map
                </h1>
                <p className="text-[11px] text-white/50 mt-0.5 font-body">
                  Sandy Springs · Fulton County, Georgia
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <p className="text-[11px] text-white/50 hidden md:block max-w-xs leading-relaxed">
              Click any marker or zone to learn more. Use filters to explore
              issues by category.
            </p>
            <a
              href="/#issues"
              className="flex items-center gap-1.5 text-white/70 hover:text-white text-xs font-semibold transition-colors"
            >
              <ExternalLink size={12} />
              <span>Keith's Platform</span>
            </a>
          </div>
        </div>
      </div>

      {/* Map fills remaining viewport */}
      <div className="flex-1 relative overflow-hidden min-h-0">
        <CommunityMap />
      </div>
    </div>
  );
}
