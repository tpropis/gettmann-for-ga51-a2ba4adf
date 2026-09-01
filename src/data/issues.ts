export type Issue = {
  id: string;
  name: string;
  problem: string;
  commitments: { text: string; note?: string }[]; // exactly 3
  personal?: string[]; // paragraphs; omit to hide
  readMoreHref: string;
};

export const issues: Issue[] = [
  {
    id: "affordability",
    name: "Affordability & Inflation",
    problem:
      "Everything costs more and your paycheck didn't move. Meanwhile your assessment climbs every year and your bill climbs with it — without anyone taking a vote.",
    commitments: [
      {
        text: "Defend the assessment cap.",
        note: "It takes effect in 2027 — the term he'd serve.",
      },
      { text: "Hold the income tax cut on schedule to 3.99%." },
      { text: "Name the old program before funding a new one." },
    ],
    personal: [
      "I spent my career at the FDIC and the Resolution Trust Corporation. When a bank or a savings and loan failed, I was one of the people who came in afterward and closed the books.",
      "That teaches you something you don't forget. Every promise made with money somebody doesn't have gets paid for later, by somebody who wasn't in the room. Usually a family. I read a state budget the same way now, because I've seen whose pocket it comes out of.",
    ],
    readMoreHref: "/#get-involved",
  },
  {
    id: "education",
    name: "Educational Excellence",
    problem:
      "Parents pay for the schools and can't easily see inside them. Finding out what your child is taught means filing a request and waiting.",
    commitments: [
      {
        text: "Post the curriculum online.",
        note: "Every course, every grade. Published, not on request.",
      },
      { text: "Put every school budget on one page, in plain language." },
      { text: "Answer parents in ten days, with a name attached." },
    ],
    personal: [
      "I'm a parent and a grandparent. I've been on the other side of that conversation — you ask a straightforward question about your own child's classroom and get handed a process instead of an answer.",
      "I don't think most teachers or principals want it that way. The system was built for the people inside it. That's fixable, and fixing it is exactly what a state representative can do.",
    ],
    readMoreHref: "/#get-involved",
  },
  {
    id: "constitutional-rights",
    name: "Constitutional Rights",
    problem:
      "Rights are easy to defend in the abstract and hard to defend one decision at a time. Here it's concrete: who decides what gets built on your street, and whether you get a real hearing when the state comes after your property.",
    commitments: [
      {
        text: "Keep zoning with Roswell, Sandy Springs and Johns Creek.",
        note: "Not the state.",
      },
      { text: "Require disclosure before approval. Every time." },
      { text: "Defend property rights and due process without apology." },
    ],
    personal: [
      "My father fought in three wars so free people could stay free. I grew up watching what happened where they didn't — bread lines on the evening news, empty shelves, and a wall with guards standing on top of it facing inward. Not to keep enemies out. To keep its own citizens from leaving.",
      "Then it was gone. Nobody argued it away. It ran out of food, ran out of freedom, and ran out of people willing to stay.",
      "I don't need a lecture on economics. I watched the demonstration.",
    ],
    readMoreHref: "/#get-involved",
  },
  {
    id: "law-and-order",
    name: "Law & Order",
    problem:
      "Fulton loses officers and paramedics to neighboring counties over pay. Georgia passed the Family Justice Center Act this year with zero votes against it — and Fulton still doesn't have one open.",
    commitments: [
      {
        text: "Fund a Family Justice Center in North Fulton.",
        note: "A law is not a building.",
      },
      { text: "Pay first responders enough to keep them here." },
      { text: "Publish 911 response times by ZIP code." },
    ],
    readMoreHref: "/#get-involved",
  },
  {
    id: "homeownership",
    name: "Homeownership",
    problem:
      "A house here used to be reachable on a normal income and keepable on a fixed one. It's neither now — young families can't buy in, retirees are taxed toward selling, and investment firms outbid both.",
    commitments: [
      { text: "Keep seniors in homes they already paid for." },
      { text: "Stop investment firms from outbidding families." },
      { text: "Make the first house reachable again." },
    ],
    personal: [
      "My whole career was housing. Fannie Mae. The Resolution Trust Corporation. The FDIC.",
      "When the music stopped, I was one of the people who came in and sorted through what was left. That means I sat with the paperwork of families who lost their houses because somebody upstream made promises the math couldn't keep. Not numbers on a page. Addresses.",
      "Sherry and I live here. We're not passing through. I've watched neighbors who paid their homes off thirty years ago get pushed toward selling by a bill nobody voted on.",
      "I don't have an opinion about the housing market. I have a work history in it.",
    ],
    readMoreHref: "/#get-involved",
  },
];
