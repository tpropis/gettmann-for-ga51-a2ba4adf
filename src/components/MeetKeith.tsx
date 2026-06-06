import { motion } from "framer-motion";
import { Shield, GraduationCap, TrendingUp, Home, Users, Compass } from "lucide-react";
import keithPortrait from "@/assets/keith_fountain_clean.jpg";
import keithDog from "@/assets/keith_dog.jpg";
import keithFamily from "@/assets/family_pic.jpg";

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
  <section id="meet-keith" className="py-10 md:py-14 bg-background">
    <div className="container mx-auto max-w-[1100px]">
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
        className="lg:hidden mt-8"
      >
        <div className="relative overflow-hidden rounded-lg shadow-lg ring-1 ring-border/40">
          <img
            src={keithPortrait}
            alt="Keith Gettmann official portrait"
            className="w-full h-full object-cover"
            style={{ aspectRatio: '16/10', objectPosition: '50% 8%' }}
            loading="lazy"
          />
          <div className="absolute top-0 left-0 w-8 h-1 bg-accent" />
          <div className="absolute top-0 left-0 w-1 h-8 bg-accent" />
        </div>
        <div className="grid grid-cols-2 gap-3 mt-3">
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={keithDog}
              alt="Keith Gettmann with his dog"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '4/3', objectPosition: '55% 20%' }}
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-md">
            <img
              src={keithFamily}
              alt="Keith Gettmann with his family"
              className="w-full h-full object-cover"
              style={{ aspectRatio: '4/3' }}
              loading="lazy"
            />
          </div>
        </div>
        <p className="text-[10px] text-muted-foreground tracking-wider uppercase font-semibold leading-tight mt-3 text-center">
          Keith Gettmann · Candidate for District 51
        </p>
      </motion.div>

      <div className="mt-8 lg:mt-10 grid lg:grid-cols-[1.4fr_1fr] gap-8 lg:gap-12 items-start">
        {/* Mission Statement Column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <h3 className="font-heading text-3xl md:text-4xl font-bold text-primary uppercase tracking-tight leading-tight">
            Keith's Vision for District&nbsp;51
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
                className="flex gap-5 py-4 first:pt-0"
              >
                <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                  <p.icon className="w-5 h-5 text-accent" />
                </div>
                <div>
                  <h4 className="font-heading text-base md:text-lg font-bold text-primary uppercase tracking-wide">
                    {p.title}
                  </h4>
                  <p className="text-muted-foreground mt-1.5 leading-relaxed text-sm md:text-base">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <a
            href="#get-involved"
            className="inline-block bg-accent text-accent-foreground font-heading text-base font-bold px-8 py-3.5 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20 uppercase"
          >
            Join the Campaign
          </a>

          {/* Why Keith Gettmann */}
          <div className="pt-4">
            <div className="w-full h-px bg-border mb-7" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight mb-6">
              Why Keith Gettmann
            </h3>

            <div className="space-y-4">
              {[
                {
                  icon: Home,
                  title: "Rooted in Georgia",
                  text: "Keith was born, raised, and educated in Georgia. He and his family have built their lives here, and his commitment to District 51 comes from a lifetime of relationships, community involvement, and pride in the place he calls home.",
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
                  className="bg-secondary border border-border/50 rounded-lg p-5 flex gap-4"
                >
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/5 flex items-center justify-center mt-0.5">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary uppercase tracking-wide">
                      {card.title}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1.5 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="w-full h-px bg-border my-7" />

            <p className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-tight text-center leading-snug">
              Real Leadership. Local Roots.<br />A Stronger District&nbsp;51.
            </p>

            <div className="mt-6 text-center">
              <a
                href="#get-involved"
                className="inline-block bg-accent text-accent-foreground font-heading text-base font-bold px-8 py-3.5 rounded-md hover:brightness-90 transition-all tracking-wide shadow-lg shadow-accent/20 uppercase"
              >
                Support Keith
              </a>
            </div>
          </div>
        </motion.div>

        {/* Photos Column — Desktop only */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="hidden lg:block space-y-5 lg:sticky lg:top-28"
        >
          <div className="relative overflow-hidden rounded-lg shadow-xl ring-1 ring-border/40">
            <img
              src={keithPortrait}
              alt="Keith Gettmann official portrait"
              className="w-full object-cover"
              style={{ aspectRatio: '4/5', objectPosition: '50% 8%' }}
              loading="lazy"
            />
            {/* Subtle gold corner accent */}
            <div className="absolute top-0 left-0 w-12 h-1 bg-accent" />
            <div className="absolute top-0 left-0 w-1 h-12 bg-accent" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="overflow-hidden rounded-lg shadow-md ring-1 ring-border/40">
              <img
                src={keithDog}
                alt="Keith Gettmann with his dog"
                className="w-full h-full object-cover"
                style={{ aspectRatio: '1/1', objectPosition: '60% 35%' }}
                loading="lazy"
              />
            </div>
            <div className="overflow-hidden rounded-lg shadow-md bg-background">
              <img
                src={keithFamily}
                alt="Keith Gettmann with his family"
                className="w-full h-full object-contain"
                style={{ aspectRatio: '1/1' }}
                loading="lazy"
              />
            </div>
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
