import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";
import { MapPin, Phone, Clock, Users } from "lucide-react";

const items = [
  {
    icon: MapPin,
    title: "Office hours in all three cities",
    body:
      "Roswell, Sandy Springs and Johns Creek. Posted dates, posted places, no appointment.",
    placeholder: "Dates and locations: to be posted",
  },
  {
    icon: Phone,
    title: "A phone number that reaches a person",
    body: "Not a form, not a queue. A number that gets answered.",
    placeholder: "Phone number: to be posted",
  },
  {
    icon: Clock,
    title: "Answered within two business days",
    body:
      "Every message answered within two business days — published as a standard, so you can hold me to it.",
  },
  {
    icon: Users,
    title: "Town halls four times a year",
    body: "Open to everyone in District 51.",
    placeholder: "Schedule: to be posted",
  },
];

const ConstituentServices = () => {
  return (
    <>
      <Seo
        title="Constituent Services | Keith Gettmann for Georgia House District 51"
        description="Office hours in Roswell, Sandy Springs and Johns Creek, a phone number that reaches a person, and every message answered within two business days."
        path="/constituent-services"
      />
      <CampaignHeader />

      <main className="pt-[76px] md:pt-[88px]">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
              Call me. I'll answer.
            </h1>
            <div className="w-16 h-[3px] bg-accent mt-5" />
            <p className="mt-5 text-primary-foreground/85 text-base md:text-lg leading-relaxed max-w-xl">
              Representation is a service job. Here is the standard I'm committing to,
              in writing, before the election.
            </p>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-background">
          <div className="container mx-auto max-w-3xl px-4 space-y-6">
            {items.map((item) => (
              <article
                key={item.title}
                className="border border-border rounded-lg p-6 md:p-8"
              >
                <div className="flex items-start gap-4">
                  <item.icon className="text-accent mt-1 shrink-0" size={22} aria-hidden="true" />
                  <div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-primary tracking-tight">
                      {item.title}
                    </h2>
                    <p className="mt-2 text-base md:text-[17px] leading-relaxed text-foreground/90">
                      {item.body}
                    </p>
                    {item.placeholder && (
                      <p className="mt-3 inline-block rounded border border-dashed border-border px-3 py-1.5 text-sm text-campaign-slate">
                        {item.placeholder}
                      </p>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>

      <CampaignFooter />
    </>
  );
};

export default ConstituentServices;
