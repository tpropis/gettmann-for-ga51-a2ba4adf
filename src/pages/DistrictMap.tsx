import CampaignHeader from "@/components/CampaignHeader";
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
      <CampaignHeader />
      <District51Map />
    </div>
  );
}
