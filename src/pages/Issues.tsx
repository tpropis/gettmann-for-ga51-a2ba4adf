import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import IssuesSection from "@/components/IssuesSection";
import CampaignFooter from "@/components/CampaignFooter";

const Issues = () => {
  return (
    <>
      <Seo
        title="The Five Issues | Keith Gettmann for Georgia State House District 51"
        description="Where Keith Gettmann stands: affordability, educational excellence, constitutional rights, law and order, and homeownership for Georgia House District 51."
        path="/issues"
      />
      <CampaignHeader />
      <main className="pt-24 md:pt-28">
        <IssuesSection />
      </main>
      <CampaignFooter />
    </>
  );
};

export default Issues;
