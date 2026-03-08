import { motion } from "framer-motion";
import { Shield, GraduationCap, TrendingUp, Home, Users, Compass } from "lucide-react";
import keithBody from "@/assets/keith_body.jpg";
import wifePic from "@/assets/wife.jpg";

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
  <section id="meet-keith" className="py-24 md:py-32 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-primary uppercase tracking-tight text-center">
          Meet Keith
        </h2>
        <div className="w-20 h-1 bg-accent mx-auto mt-4" />
      </motion.div>

      <div className="mt-16 grid lg:grid-cols-2 gap-16 items-start">
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

          <p className="text-xl md:text-2xl font-heading font-semibold text-accent leading-snug">
            "Protect our families. Strengthen our communities. Secure the future of North Georgia."
          </p>

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
                  <p className="text-foreground/70 mt-1 leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <blockquote className="border-l-4 border-accent pl-6 py-4 bg-campaign-light rounded-r-lg">
            <p className="text-xl font-body italic text-primary font-semibold leading-relaxed">
              "I'm running to serve the people of District 51 with integrity, common sense, and strong leadership."
            </p>
            <cite className="text-sm text-muted-foreground mt-3 block not-italic font-bold uppercase tracking-wide">
              — Keith Gettmann
            </cite>
          </blockquote>

          <a
            href="#get-involved"
            className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded hover:bg-campaign-red-dark transition-colors tracking-wide shadow-lg shadow-accent/20"
          >
            Join the Campaign
          </a>

          {/* Why Keith Gettmann */}
          <div className="pt-4">
            <div className="w-full h-px bg-border mb-8" />
            <h3 className="font-heading text-2xl md:text-3xl font-bold text-primary uppercase tracking-tight mb-6">
              Why Keith Gettmann
            </h3>

            <div className="space-y-5">
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
                  className="bg-primary/[0.03] border border-border rounded-lg p-5 flex gap-5"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-primary/10 flex items-center justify-center mt-0.5">
                    <card.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-primary uppercase tracking-wide">
                      {card.title}
                    </h4>
                    <p className="text-sm text-foreground/70 mt-1.5 leading-relaxed">
                      {card.text}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="w-full h-px bg-border my-8" />

            <p className="font-heading text-xl md:text-2xl font-bold text-primary uppercase tracking-tight text-center leading-snug">
              Real Leadership. Local Roots.<br />A Stronger District&nbsp;51.
            </p>

            <div className="mt-6 text-center">
              <a
                href="#get-involved"
                className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded hover:bg-campaign-red-dark transition-colors tracking-wide shadow-lg shadow-accent/20"
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
          className="space-y-5"
        >
          <div className="overflow-hidden rounded-lg shadow-xl">
            <img
              src={keithBody}
              alt="Keith Gettmann portrait"
              className="w-full object-cover"
              style={{ objectPosition: '50% 10%', aspectRatio: '3/4' }}
              loading="lazy"
            />
          </div>
          <div className="overflow-hidden rounded-lg shadow-lg">
            <img
              src={wifePic}
              alt="Keith Gettmann with his wife"
              className="w-full"
              loading="lazy"
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MeetKeith;
