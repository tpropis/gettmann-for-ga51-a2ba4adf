import CampaignHeader from "@/components/CampaignHeader";
import Seo from "@/components/Seo";
// @ts-ignore - JSX component without types
import District51Map from "@/components/District51Map.jsx";

export default function DistrictMap() {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "100vh",
        minHeight: "100vh",
        overflow: "hidden",
        background: "hsl(213 50% 20%)",
      }}
    >
      <Seo
        title="District 51 Map | Keith Gettmann for Georgia"
        description="Interactive map of Georgia State House District 51 — see the boundaries Keith Gettmann is running to represent."
        path="/map"
      />
      <CampaignHeader />
      <h1
        className="sr-only"
        style={{ position: "absolute", width: 1, height: 1, padding: 0, margin: -1, overflow: "hidden", clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0 }}
      >
        District 51 Map
      </h1>
      <District51Map />
    </div>
  );
}
