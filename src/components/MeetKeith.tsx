import { motion } from "framer-motion";
import keithBody from "@/assets/keith_body.jpg";
import wifePic from "@/assets/wife.jpg";

const MeetKeith = () => (
  <section id="meet-keith" className="py-20 md:py-28 bg-background">
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

      <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="space-y-6"
        >
          <p className="text-lg text-foreground/80 leading-relaxed">
            Keith Gettmann is a husband, father, and dedicated community leader who has called Georgia home for decades. With a deep commitment to the families and neighborhoods of District 51, Keith is stepping up to serve — not for personal gain, but because he believes our community deserves principled, common-sense leadership.
          </p>
          <p className="text-lg text-foreground/80 leading-relaxed">
            Rooted in faith, family, and a strong work ethic, Keith understands the real challenges facing Georgia families today — from rising costs and school accountability to public safety and government overreach. He's ready to fight for the values that make our communities strong.
          </p>

          <blockquote className="border-l-4 border-accent pl-6 py-2 my-8">
            <p className="text-xl font-body italic text-primary font-medium">
              "I'm running to protect our families, strengthen our communities, and fight for the future of District 51."
            </p>
            <cite className="text-sm text-muted-foreground mt-2 block not-italic font-semibold">
              — Keith Gettmann
            </cite>
          </blockquote>

          <a
            href="#get-involved"
            className="inline-block bg-accent text-accent-foreground font-heading text-lg font-bold px-8 py-4 rounded hover:bg-campaign-red-dark transition-colors tracking-wide"
          >
            Join Keith's Campaign
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="grid grid-cols-2 gap-4"
        >
          <img
            src={keithBody}
            alt="Keith Gettmann portrait"
            className="rounded-lg shadow-xl w-full h-80 object-cover object-top col-span-2"
            loading="lazy"
          />
          <img
            src={wifePic}
            alt="Keith Gettmann with his wife"
            className="rounded-lg shadow-lg w-full h-52 object-cover col-span-2"
            loading="lazy"
          />
        </motion.div>
      </div>
    </div>
  </section>
);

export default MeetKeith;
