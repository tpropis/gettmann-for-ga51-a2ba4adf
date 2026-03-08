import { motion } from "framer-motion";
import keithBody from "@/assets/keith_body.jpg";
import wifePic from "@/assets/wife.jpg";

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
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-lg text-foreground/80 leading-relaxed">
            Keith Gettmann is a husband, father, and committed community leader who believes District 51 deserves principled, common-sense leadership. He's not a career politician — he's a family man who has seen firsthand how failed policies and government overreach affect real Georgia families.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Rooted in faith, family, and hard work, Keith is running to protect families, strengthen schools, support safe communities, defend election integrity, and fight for affordability for Georgia families. He is stepping forward to serve because he believes the future of District 51 is worth protecting — and worth fighting for.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Keith understands that leadership is about showing up, listening, and doing what's right — even when it isn't easy. He's ready to stand up for the people of District 51 from day one.
          </p>

          <blockquote className="border-l-4 border-accent pl-6 py-4 my-10 bg-campaign-light rounded-r-lg">
            <p className="text-xl font-body italic text-primary font-semibold leading-relaxed">
              "I'm running to protect our families, strengthen our communities, and fight for the future of District 51."
            </p>
            <cite className="text-sm text-muted-foreground mt-3 block not-italic font-bold uppercase tracking-wide">
              — Keith Gettmann
            </cite>
          </blockquote>

          <a
            href="#get-involved"
            className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-10 py-4 rounded hover:bg-campaign-red-dark transition-colors tracking-wide shadow-lg shadow-accent/20"
          >
            Join Keith's Campaign
          </a>
        </motion.div>

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
            />
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

export default MeetKeith;
