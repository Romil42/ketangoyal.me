export type JourneyEra = {
  id: string;
  number: string; // "01"..."09" — numbering is meaningful here, it's a real chronology
  title: string;
  period: string;
  summary: string;
  highlights: string[];
  status?: "shipped" | "paused" | "in-progress" | "ongoing";
};

export const journeyEras: JourneyEra[] = [
  {
    id: "curiosity",
    number: "01",
    title: "Curiosity",
    period: "2020",
    summary:
      "It started with YouTube. I didn't know anything about content or copyright, so I found out by publishing — including a few copyright strikes I had to learn from directly. Then crypto and NFTs. I studied the space, made my own NFTs, and listed them on OpenSea. None of it was a business yet. It was just finding out what happens when you actually do the thing instead of reading about it.",
    highlights: [
      "Ran YouTube channels, learned copyright the hard way",
      "Studied crypto and NFTs, minted and listed on OpenSea",
    ],
    status: "paused",
  },
  {
    id: "learning-to-build",
    number: "02",
    title: "Learning to Build",
    period: "2024",
    summary:
      "I completed my B.Tech in Computer Science and Engineering in 2024. I joined ShopClues in March that year knowing HTML, CSS, Bootstrap, and a little JavaScript. No real DSA, no system design, limited backend exposure. The work was in PHP, so I learned PHP on the job and shipped with it. Around the same time, Qoo10-related work needed Next.js and TypeScript, so I picked those up too. This is the point where 'learning to code' turned into 'learning to ship.'",
    highlights: [
      "Started as a ShopClues trainee with a front-end-only skill set",
      "Learned PHP on the job to deliver production work",
      "Picked up Next.js and TypeScript for Qoo10-related work",
    ],
    status: "shipped",
  },
  {
    id: "first-business-experiment",
    number: "03",
    title: "First Business Experiment",
    period: "2024",
    summary:
      "When circumstances shifted to working from home, I used the extra time to look at something completely different: clothing dropshipping. The Vibed Vines V1 was Placeit mockups, a ChatGPT-generated logo, an Instagram page, and a handful of designs — real research into what dropshipping actually takes. When my circumstances changed again, I paused it. That pause is part of the record, not a footnote.",
    highlights: [
      "The Vibed Vines V1 — Placeit mockups, logo, Instagram presence",
      "Researched dropshipping mechanics firsthand",
      "Paused when priorities shifted",
    ],
    status: "paused",
  },
  {
    id: "becoming-an-engineer",
    number: "04",
    title: "Becoming an Engineer",
    period: "March 2025 — September 2025",
    summary:
      "Back at ShopClues in March 2025 as a Software Engineer, the work changed from learning technologies to running production systems: bug fixing, load-time issues, layout problems, GTM implementation, existing codebases, backend behavior, SQL queries. This is where engineering stopped being tutorials and started being systems that real users depended on. I also worked on SmartStore during this period, and built Aegis Squad on the side before leaving in September 2025.",
    highlights: [
      "Production bug fixing, performance and layout work",
      "GTM implementation across existing codebases",
      "Backend and SQL work on live systems",
      "Worked on SmartStore",
      "Built Aegis Squad while still employed",
    ],
    status: "shipped",
  },
  {
    id: "trying-entrepreneurship-properly",
    number: "05",
    title: "Trying Entrepreneurship, Properly",
    period: "2025",
    summary:
      "After leaving ShopClues, I didn't just start freelancing — I went back to The Vibed Vines. V2 was a different scale entirely: five-plus collections, 100+ SKUs, a real Shopify storefront, an Instagram grid system, product mockups, and reels. The point was never 'look at my fashion brand.' It was understanding what it actually takes to build and run a consumer brand end to end. When time ran out again, I paused it a second time — and that's fine.",
    highlights: [
      "The Vibed Vines V2 — 5+ collections, 100+ SKUs",
      "Built a full Shopify storefront and content system",
      "Ran an Instagram grid, product mockups, and reels",
      "Paused a second time when time ran out",
    ],
    status: "paused",
  },
  {
    id: "studying-business",
    number: "06",
    title: "Studying Business Itself",
    period: "2025",
    summary:
      "My curiosity moved from startups to business fundamentals: import/export, FMCG, oil extraction, spice manufacturing, manufacturing economics, importing from China, wholesale markets, corporate structures. I physically visited wholesale markets around Delhi looking for opportunities — trying to understand how money actually moves through a business, from sourcing to margins to distribution to retail.",
    highlights: [
      "Studied import/export, FMCG, and manufacturing economics",
      "Researched sourcing from China and wholesale supply chains",
      "Visited wholesale markets around Delhi in person",
    ],
    status: "ongoing",
  },
  {
    id: "experimenting-with-ai",
    number: "07",
    title: "Experimenting with AI",
    period: "2025 →",
    summary:
      "Not 'AI expert' — experiments. I built an automated YouTube pipeline using Claude for scripting, Google AI Studio for voice, Pexels for media, and Suno for music, and a finance-typography page as another test of what one person can build with the current generation of tools. That expanded into working with GPT, Claude, Gemini, Sora, Runway, Higgsfield, Lovable, Replit, and Emergent — testing how far a single builder can go.",
    highlights: [
      "Automated YouTube pipeline: Claude, Google AI Studio, Pexels, Suno",
      "Built a finance-typography experiment",
      "Tested GPT, Claude, Gemini, Sora, Runway, Higgsfield, Lovable, Replit, Emergent",
    ],
    status: "ongoing",
  },
  {
    id: "building-kraftt",
    number: "08",
    title: "Building Kraftt",
    period: "2025 →",
    summary:
      "By this point I'd seen technology, e-commerce, consumer brands, content, AI, retail, traditional business, wholesale markets, and manufacturing up close. One observation kept showing up: technology is moving fast, but a huge number of smaller businesses — especially outside major metros — aren't really part of that shift. Kraftt Digital exists to close that gap for the businesses everything else in this journey was, in hindsight, preparing me to help.",
    highlights: [
      "Founded Kraftt Digital to help smaller businesses build a real digital presence",
      "Direct continuation of the engineering, commerce, and business research above",
    ],
    status: "in-progress",
  },
  {
    id: "now",
    number: "09",
    title: "Now",
    period: "August 2026",
    summary:
      "Building Kraftt, documenting what I'm learning, and figuring out what comes next. The story is still in progress.",
    highlights: ["Running Kraftt Digital", "Writing down what's working and what isn't"],
    status: "ongoing",
  },
];
