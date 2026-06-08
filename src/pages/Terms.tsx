import { Link } from "react-router-dom";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";

const Terms = () => (
  <>
    <CampaignHeader />
    <main className="bg-background py-16 md:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h1 className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight">
          Terms &amp; Conditions
        </h1>
        <div className="w-16 h-[3px] bg-accent mt-3 mb-8" />

        <div className="space-y-5 text-muted-foreground leading-relaxed text-base">
          <p>
            By using this website and submitting any forms or opting in to the
            SMS program operated by Keith for GA LLC, you agree to the terms
            below.
          </p>

          <h2 className="font-heading text-xl font-bold text-primary uppercase tracking-wide pt-4">
            SMS / Text Messaging Program
          </h2>
          <p>
            By entering your phone number and selecting to opt in, you consent
            to join a recurring SMS/MMS text messaging program that will
            provide alerts, donation requests, updates, and other important
            information. By participating, you agree to the terms &amp; privacy
            policy for auto dialed messages from Keith for GA to the phone
            number you provide. Msg &amp; data rates may apply. Msg frequency
            varies. Reply HELP for help or STOP to opt-out at any time. SMS
            information is not rented, sold, or shared.
          </p>

          <h2 className="font-heading text-xl font-bold text-primary uppercase tracking-wide pt-4">
            Use of the Site
          </h2>
          <p>
            Content on this site is provided for informational purposes related
            to the Keith Gettmann campaign for Georgia House District 51. You
            agree not to misuse the site or attempt to interfere with its
            normal operation.
          </p>

          <h2 className="font-heading text-xl font-bold text-primary uppercase tracking-wide pt-4">
            Contact
          </h2>
          <p>
            Questions can be sent to{" "}
            <a
              href="mailto:keith@keithforga.com"
              className="text-accent hover:underline"
            >
              keith@keithforga.com
            </a>
            .
          </p>

          <p className="pt-6 italic">
            All the above categories exclude text messaging originator opt-in
            data and consent; this information will not be shared with any
            third parties.
          </p>

          <p className="pt-6 text-sm">
            See also our{" "}
            <Link to="/privacy" className="text-accent hover:underline">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </div>
    </main>
    <CampaignFooter />
  </>
);

export default Terms;
