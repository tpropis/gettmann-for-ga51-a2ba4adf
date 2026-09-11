import Seo from "@/components/Seo";
import CampaignHeader from "@/components/CampaignHeader";
import CampaignFooter from "@/components/CampaignFooter";
import { DoorOpen, Phone, MessageCircle, Coffee } from "lucide-react";

const items = [
  {
    icon: DoorOpen,
    title: "Knock on my door",
    body:
      "I live right here in District 51. If something is wrong, you shouldn't have to drive to Atlanta to be heard.",
    placeholder: "District office address: to be posted",
  },
  {
    icon: Phone,
    title: "Just call me",
    body:
      "Not a form. Not a queue. A real number that reaches a real person who answers for District 51.",
    placeholder: "Phone number: to be posted",
  },
  {
    icon: MessageCircle,
    title: "DM me",
    body:
      "Shoot me a message on Facebook or Instagram. I read them, and if you need help, I'll respond directly.",
  },
  {
    icon: Coffee,
    title: "Let's grab coffee",
    body:
      "Regular office hours in Roswell, Sandy Springs and Johns Creek — posted dates and places, no appointment needed.",
    placeholder: "Dates and locations: to be posted",
  },
];

const ConstituentServices = () => {
  return (
    <>
      <Seo
        title="Constituent Services | Keith Gettmann for Georgia House District 51"
        description="Keith Gettmann is your neighbor in District 51. Call, message, or stop by — real constituent service starts with showing up."
        path="/constituent-services"
      />
      <CampaignHeader />

      <main className="pt-[76px] md:pt-[88px]">
        <section className="bg-primary py-16 md:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <h1 className="font-heading text-4xl md:text-5xl font-bold text-primary-foreground tracking-tight">
              I'm your neighbor. Act like it.
            </h1>
            <div className="w-16 h-[3px] bg-accent mt-5" />
            <p className="mt-5 text-primary-foreground/85 text-base md:text-lg leading-relaxed max-w-xl">
              Knock on my door. Call me. Send me a DM. Constituent service isn't a department — it's a
              relationship, and it starts with showing up before the election and staying reachable after it.
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
