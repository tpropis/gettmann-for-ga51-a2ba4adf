import CampaignHeader from "@/components/CampaignHeader";
import HeroSection from "@/components/HeroSection";
import MeetKeith from "@/components/MeetKeith";
import IssuesSection from "@/components/IssuesSection";
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
      <DonationSection />
      <GetInvolved />
      <WhereToVote />
      <CampaignFooter />
    </>
  );
};

export default Index;
