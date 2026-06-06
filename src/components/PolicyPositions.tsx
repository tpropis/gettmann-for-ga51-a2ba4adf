import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Wallet,
  Landmark,
  HeartHandshake,
  BookOpen,
  Leaf,
  ShieldCheck,
} from "lucide-react";

const positions = [
  {
    icon: ShieldCheck,
    title: "Public Safety & Rule of Law",
    summary:
      "Backing our police, defending the rule of law, and keeping HD 51 families safe at home, at school, and on the road.",
    paragraphs: [
      "Strong communities start with safe neighborhoods and well-supported law enforcement. As your next State Representative for HD 51, I will stand with the men and women who protect us and make sure they have the resources, training, and respect they deserve.",
      "I will back our police and first responders, support recruitment and retention, defend victims’ rights, and stand firmly for the rule of law. Every family in District 51 deserves to feel secure — in their home, in their neighborhood, and in their schools.",
    ],
  },
  {
    icon: Wallet,
    title: "Affordability",
    summary:
      "Cutting wasteful spending, reducing regulations, and growing our local economy to deliver real relief to working families.",
    paragraphs: [
      "As your next State Representative for HD 51, I will fight to make life more affordable for working families in our district. Skyrocketing housing costs, rising taxes, and inflation are squeezing Georgia families, and too many are struggling to keep up.",
      "I will prioritize:",
    ],
    bullets: [
      "Cutting wasteful government spending to lower taxes and utility rates",
      "Reducing regulations that drive up housing prices so more families can buy homes",
      "Growing our local economy and bringing good-paying jobs to north Atlanta and Fulton County",
    ],
    closing:
      "Hard-working Georgians deserve a government that works for them — not against them. I’m committed to delivering real relief and restoring affordability to our communities.",
  },
  {
    icon: Landmark,
    title: "Lowering Income & Property Taxes",
    summary:
      "Meaningful tax relief, smarter local spending, and transparency that puts more money back in your pocket.",
    paragraphs: [
      "As your Republican candidate for HD 51, I strongly support meaningful reductions in both Georgia’s income and property taxes. Hard-working families and small businesses in our district are overburdened by high taxes that limit opportunity, raise the cost of living, and drive up housing expenses.",
      "I will fight to lower the state income tax rate, put more money back in your pocket, and promote faster economic growth. At the same time, we must bring greater transparency and restraint to local government spending to provide real property tax relief — especially for seniors, working families, and homeowners on fixed incomes.",
      "Lower taxes, smarter spending, and stronger communities — that’s the conservative approach our district needs.",
    ],
  },
  {
    icon: HeartHandshake,
    title: "Faith, Family & Freedom",
    summary:
      "Standing for the bedrock principles that built Georgia and America — and the constitutional freedoms that protect them.",
    paragraphs: [
      "As a Republican candidate for HD 51, I proudly stand for Faith, Family, and Freedom — the bedrock principles that built Georgia and America.",
      "I believe in protecting our God-given rights, strengthening families as the foundation of society, and defending the freedoms enshrined in our Constitution against government overreach. Whether it’s safeguarding religious liberty, supporting parents’ rights in education, or fighting for lower taxes and economic opportunity, I will always put Georgia families first.",
    ],
  },
  {
    icon: BookOpen,
    title: "Quality Education, School Choice & Parental Rights",
    summary:
      "Empowering parents, expanding school choice, and tying funding to the student — not a failing system.",
    paragraphs: [
      "As the Republican candidate for Georgia House District 51, I believe every child in our district and across Georgia deserves a high-quality education that prepares them for success in life, not a one-size-fits-all system that too often fails them.",
      "Our current public education system is failing too many Georgia families. Despite increasing spending, far too many students are falling behind in reading, math, and basic skills. Parents know this, and they are demanding better options. It’s time to put parents in the driver’s seat and tie funding to the student, not the failing system.",
      "I strongly support school vouchers and expanded school choice. Every dollar should follow the child to the educational setting that best meets their unique needs — whether that’s a traditional public school, a public charter school, a private school, or homeschooling. Competition will incentivize all schools to raise their standards, improve teaching, and focus on results rather than bureaucracy. Georgia families should not be trapped in underperforming schools simply because of their zip code. School vouchers empower working families, especially in District 51, to access the best education possible for their children.",
      "Parental rights are non-negotiable. Parents are the primary educators and decision-makers for their children — not the government, not unions, and not unelected bureaucrats. I will fight to protect parents’ rights to review curriculum, opt out of inappropriate materials, make medical and moral decisions for their minor children, and have full transparency in what is being taught in our schools.",
      "Quality education, real school choice through vouchers, and ironclad parental rights are not just policy positions for me — they are the foundation of opportunity, freedom, and stronger families. In the Georgia House, I will champion legislation that expands educational freedom, holds schools accountable for results, and ensures every child in HD 51 has the chance to reach their God-given potential.",
      "Parents know best. It’s time our laws reflect that truth.",
    ],
  },
  {
    icon: Leaf,
    title: "Environmental Health & Safety",
    summary:
      "Clean air, clean water, and a healthy environment — without sacrificing jobs, energy security, or economic growth.",
    paragraphs: [
      "As a Republican candidate for HD 51, I believe Georgia’s families deserve clean air, clean water, and a healthy environment — without sacrificing our jobs, energy security, or economic growth.",
      "I support responsible environmental stewardship that protects public health through practical, science-based solutions rather than extreme regulations that drive up costs and hurt working families. This means backing an all-of-the-above energy strategy that includes American energy production, nuclear power, and innovative technologies to reduce emissions while keeping energy affordable.",
      "In HD 51, we will prioritize clean waterways, responsible land use, and public safety by focusing on real environmental risks, supporting our farmers and businesses, and rejecting one-size-fits-all mandates from Washington. A strong economy and a healthy environment go hand in hand — we can achieve both through common sense and local control.",
    ],
  },
];

const PolicyPositions = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="policy-positions" className="py-12 md:py-16 bg-background">
      <div className="container mx-auto max-w-[1100px] px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-primary uppercase tracking-tight text-center">
            Where Keith Stands
          </h2>
          <div className="section-divider" />
          <p className="text-center text-muted-foreground mt-4 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Clear, conservative positions on the issues that matter most to District 51 families.
          </p>
        </motion.div>

        <div className="mt-10 space-y-4">
          {positions.map((p, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-secondary border border-border/50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  className="w-full flex items-center gap-4 p-5 md:p-6 text-left"
                >
                  <div className="flex-shrink-0 w-11 h-11 rounded-full bg-accent/10 flex items-center justify-center">
                    <p.icon className="w-5 h-5 text-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base md:text-lg font-bold text-primary uppercase tracking-wide">
                      {p.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                  <ChevronDown
                    className={`flex-shrink-0 w-5 h-5 text-primary transition-transform ${
                      isOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-5 md:px-6 pb-6 pl-[4.75rem] space-y-3 border-l-2 border-accent ml-6 md:ml-7 mb-2">
                        {p.paragraphs.map((para, idx) => (
                          <p
                            key={idx}
                            className="text-sm md:text-base text-muted-foreground leading-relaxed"
                          >
                            {para}
                          </p>
                        ))}
                        {p.bullets && (
                          <ul className="list-disc pl-5 space-y-1.5 text-sm md:text-base text-muted-foreground leading-relaxed">
                            {p.bullets.map((b) => (
                              <li key={b}>{b}</li>
                            ))}
                          </ul>
                        )}
                        {p.closing && (
                          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                            {p.closing}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PolicyPositions;
