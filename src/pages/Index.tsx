import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import HeroSection from "@/components/HeroSection";
import MeetKeith from "@/components/MeetKeith";

import PolicyPositions from "@/components/PolicyPositions";
import DonationSection from "@/components/DonationSection";
import GetInvolved from "@/components/GetInvolved";
import WhereToVote from "@/components/WhereToVote";
import CommunityCouncilSection from "@/components/CommunityCouncilSection";
import CampaignFooter from "@/components/CampaignFooter";

const Index = () => {
  return (
    <>
      <Seo
        title="Keith Gettmann for Georgia State House District 51"
        description="Republican candidate Keith Gettmann is running for Georgia State House District 51 — safer communities, stronger schools, lower taxes, and common-sense leadership."
        path="/"
      />
      <CampaignHeader />
      <HeroSection />
      <MeetKeith />
      
      <PolicyPositions />
      <DonationSection />
      <GetInvolved />
      <CommunityCouncilSection />
      <WhereToVote />
      <CampaignFooter />
    </>
  );
};

export default Index;
