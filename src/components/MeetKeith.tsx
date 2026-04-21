import { motion } from "framer-motion";
import { Shield, GraduationCap, TrendingUp, Home, Users, Compass } from "lucide-react";
import keithPortrait from "@/assets/keith_portrait_dark.jpeg";
import keithFamily from "@/assets/keith_wife_dog.jpeg";

const pillars = [
  {
    icon: Shield,
    title: "Protect Our Communities",
    desc: "Support law enforcement, keep neighborhoods safe, and ensure families feel secure in District 51.",
  },
  {
    icon: GraduationCap,
    title: "Strengthen Local Schools",
    desc: "Support parents, teachers, and students so every child has the opportunity to succeed.",
  },
  {
    icon: TrendingUp,
    title: "Grow the Local Economy",
    desc: "Support small businesses, protect local jobs, and keep Georgia a place where opportunity thrives.",
  },
];

const MeetKeith = () => (
  <section id="meet-keith" className="py-16 md:py-24 bg-background">
    <div className="container mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
          Meet Keith
        </h2>
        <div className="section-divider" />
      </motion.div>

      {/* Mobile-only compact photo intro */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="lg:hidden mt-10 grid grid-cols-5 gap-3"
      >
        <div className="col-span-3 relative overflow-hidden rounded-lg shadow-lg ring-1 ring-border/40">
          <img
            src={keithPortrait}
            alt="Keith Gettmann official portrait"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '4/5', objectPosition: '50% 20%' }}
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-8 h-1 bg-accent" />
          <div className="absolute top-0 left-0 w-1 h-8 bg-accent" />
        </div>
        <div className="col-span-2 flex flex-col gap-3">
          <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-border/40 flex-1">
            <img
              src={keithFamily}
              alt="Keith Gettmann with his wife and family dog"
              className="w-full h-full object-cover"
              style={{ objectPosition: '50% 30%' }}
              loading="lazy"
            />
          </div>
          <p className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold leading-tight">
            Keith Gettmann<br/>
            <span className="text-muted-foreground/70">Candidate · District 51</span>
          </p>
        </div>
      </motion.div>

      <div className="mt-10 lg:mt-12 grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-start">
        {/* Mission Statement Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-8"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight leading-tight">
            Keith's Mission for District&nbsp;51
          </h3>

          <blockquote className="border-l-4 border-accent pl-6 py-4 bg-secondary rounded-r-lg space-y-3">
            <p className="text-lg md:text-xl font-heading font-semibold text-primary leading-snug">
              "Protect our families. Strengthen our communities. Secure the future of District 51."
            </p>
            <p className="text-base text-muted-foreground leading-relaxed">
              Every family deserves safety, opportunity, and a community they can count on. This campaign is about delivering exactly that.
            </p>
          </blockquote>

          <div className="space-y-0 divide-y divide-border">
            {pillars.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex gap-5 py-6 first:pt-0"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center">
                  <p.icon className="w-6 h-6 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading text-lg font-bold text-primary uppercase tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-muted-foreground mt-2 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="#get-involved"
            className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
          >
            Join the Campaign
          </a>

          {/* Why Keith Gettmann */}
          <div className="pt-6">
            <div className="w-full h-px bg-border mb-10" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight mb-8">
              Why Keith Gettmann
            </h3>

            <div className="space-y-6">
              {[
                {
                  icon: Home,
                  title: "Rooted in District 51",
                  text: "Keith and his family have called North Georgia home for years. He understands the challenges facing local families because he lives them every day. His commitment to District 51 comes from a lifetime of relationships, community involvement, and pride in the place he calls home.",
                },
                {
                  icon: Users,
                  title: "A Family Man",
                  text: "Keith believes strong families are the foundation of strong communities. As a husband, father, grandfather of 11, and neighbor, he understands the importance of safe neighborhoods, strong schools, and a community that looks out for one another.",
                },
                {
                  icon: Compass,
                  title: "Common-Sense Leadership",
                  text: "Keith believes leadership should be about listening, solving problems, and putting people first. He's running to bring practical solutions and strong representation to the people of District 51.",
                },
              ].map((card, i) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                  className="bg-secondary border border-border/50 rounded-lg p-6 flex gap-5"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/5 flex items-center justify-center mt-0.5">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary uppercase tracking-wide">
                      {card.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="w-full h-px bg-border my-10" />

            <p className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-tight text-center leading-snug">
              Real Leadership. Local Roots.<br />A Stronger District&nbsp;51.
            </p>

            <div className="mt-8 text-center">
              <a
                href="#get-involved"
                className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20"
              >
                Support Keith
              </a>
            </div>
          </div>
        </motion.div>

        {/* Photos Column */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="space-y-5 lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl ring-1 ring-border/40">
            <img
              src={keithPortrait}
              alt="Keith Gettmann official portrait"
              className="w-full object-cover"
              style={{ aspectRatio: '4/5', objectPosition: '50% 20%' }}
              loading="lazy"
            />
            {/* Subtle gold corner accent */}
            <div className="absolute top-0 left-0 w-12 h-1 bg-accent" />
            <div className="absolute top-0 left-0 w-1 h-12 bg-accent" />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-border/40">
            <img
              src={keithFamily}
              alt="Keith Gettmann with his wife and family dog"
              className="w-full object-cover"
              style={{ aspectRatio: '5/4', objectPosition: '50% 30%' }}
              loading="lazy"
            />
          </div>
          <p className="text-xs text-muted-foreground text-center tracking-wider uppercase font-medium">
            Keith Gettmann · Candidate for District 51
          </p>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MeetKeith;
