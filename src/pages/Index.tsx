import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import HeroSection from "@/components/HeroSection";
import MeetKeith from "@/components/MeetKeith";

import IssuesSection from "@/components/IssuesSection";
import PositionComparison from "@/components/PositionComparison";
import DonationSection from "@/components/DonationSection";
import GetInvolved from "@/components/GetInvolved";
import WhereToVote from "@/components/WhereToVote";
import CommunityCouncilSection from "@/components/CommunityCouncilSection";
import ScanToShare from "@/components/ScanToShare";
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
      
      <IssuesSection />
      <PositionComparison />
      <DonationSection />
      <GetInvolved />
      <CommunityCouncilSection />
      <WhereToVote />
      <ScanToShare />
      <CampaignFooter />
    </>
  );
};

export default Index;
