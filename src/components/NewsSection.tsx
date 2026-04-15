import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";

const posts = [
  {
    title: "Keith Meets with Local Families",
    date: "February 28, 2026",
    excerpt: "Keith spent the afternoon visiting families across District 51, listening to concerns about education, affordability, and community safety.",
  },
  {
    title: "Fighting for Safe Communities",
    date: "February 15, 2026",
    excerpt: "Keith outlined his plan to support local law enforcement and invest in safer neighborhoods at a community town hall event.",
  },
  {
    title: "Campaign Kickoff Builds Momentum",
    date: "January 20, 2026",
    excerpt: "Over 200 supporters turned out for Keith's official campaign kickoff, marking a strong start to the race for District 51.",
  },
];

const NewsSection = () => (
  <section id="news" className="py-24 md:py-36 bg-background">
    <div className="container mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-primary uppercase tracking-tight text-center">
          Campaign News
        </h2>
        <div className="section-divider" />
      </motion.div>

      <div className="mt-16 grid md:grid-cols-3 gap-8">
        {posts.map((post, i) => (
          <motion.article
            key={post.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="bg-secondary rounded-lg p-8 hover:shadow-xl transition-shadow border border-border/50"
          >
            <div className="flex items-center gap-2 text-muted-foreground text-sm mb-4">
              <CalendarDays className="h-4 w-4" />
              {post.date}
            </div>
            <h3 className="font-heading text-xl font-bold text-primary uppercase tracking-wide">
              {post.title}
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">{post.excerpt}</p>
            <a href="#" className="inline-block mt-5 text-accent font-semibold hover:underline text-sm tracking-wide">
              Read More →
            </a>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default NewsSection;
