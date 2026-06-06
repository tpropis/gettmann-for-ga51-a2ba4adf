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
      <CampaignHeader />
      <HeroSection />
      <MeetKeith />
      <IssuesSection />
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
