export type BuildScreenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Build = {
  id: string;
  slug: string;
  name: string;
  classification: "Professional Work" | "Business Experiment" | "Current Venture";
  period: string;
  hook: string;
  summary: string;
  role: string;
  stack: string[];
  externalUrl: string | null;
  screenshots?: BuildScreenshot[];
  learnings: string[];
};

export const builds: Build[] = [
  {
    id: "shopclues",
    slug: "shopclues",
    name: "ShopClues",
    classification: "Professional Work",
    period: "March 2024 — September 2025",
    hook: "Where I learned to work on software that was already real.",
    summary:
      "I joined ShopClues as a trainee in March 2024 knowing HTML, CSS, Bootstrap, and a little JavaScript — no real DSA, no system design, limited backend exposure. The work was in PHP, so I learned PHP to deliver it. When Qoo10-related work needed Next.js and TypeScript, I picked those up too. By my second stint, starting March 2025, the work had shifted from learning technologies to running production systems: bug fixing, load-time issues, layout problems, GTM implementation across existing codebases, backend behavior, and SQL queries against live data.",
    role: "Software Engineer",
    stack: ["PHP", "JavaScript", "Next.js", "TypeScript", "SQL", "GTM"],
    externalUrl: "https://www.shopclues.com",
    screenshots: [
      {
        src: "/images/shopclues/shopclues-desktop.png",
        alt: "ShopClues desktop homepage with navigation, search, and promotional content",
        caption:
          "The production desktop storefront, where navigation, search, and campaign-heavy content all had to work together without slowing the page down.",
      },
      {
        src: "/images/shopclues/shopclues-mobile.png",
        alt: "ShopClues mobile storefront displayed in a desktop browser",
        caption:
          "The mobile storefront experience. Responsive layout work had to preserve shopping flows while fitting a much tighter viewport.",
      },
      {
        src: "/images/shopclues/shopclues-homepage-gtm.png",
        alt: "ShopClues homepage with browser developer tools showing GTM events",
        caption:
          "Homepage GTM verification in the browser console, checking that analytics events and their data reached the expected layer.",
      },
      {
        src: "/images/shopclues/shopclues-productpage-gtm.png",
        alt: "ShopClues product page with GTM implementation being inspected",
        caption:
          "Product-page tracking under inspection. The implementation connected visible user actions with the data expected by GTM.",
      },
      {
        src: "/images/shopclues/shopclues-mobile-cartpage-gtm.png",
        alt: "ShopClues mobile cart page with GTM events being tested",
        caption:
          "Mobile cart tracking being tested at a conversion-critical step, where both the checkout experience and event payload needed to stay reliable.",
      },
    ],
    learnings: [
      "Learning a language on the job, under a real deadline, sticks differently than a tutorial",
      "Most of production engineering is reading someone else's code correctly before you write any of your own",
      "Performance and layout bugs teach you more about a framework than its documentation does",
    ],
  },
  {
    id: "smartstore",
    slug: "smartstore",
    name: "SmartStore",
    classification: "Professional Work",
    period: "2025",
    hook: "I worked on SmartStore during my time at ShopClues.",
    summary:
      "SmartStore was where the ShopClues production work got more specific — storefront tooling built for merchants rather than end shoppers. It's the clearest single example of the shift from 'I know how to build a page' to 'I know how to build a system other people depend on.'",
    role: "Developer",
    stack: ["Next.js", "TypeScript", "PHP", "SQL"],
    externalUrl: null,
    screenshots: [
      {
        src: "/images/smartstore/SmartStrore front Page.png",
        alt: "SmartStore public landing page promoting access to global and domestic marketplaces",
        caption:
          "The public SmartStore landing page introduces the platform as a gateway to domestic and global marketplaces, with clear sign-up and login paths.",
      },
      {
        src: "/images/smartstore/SmartStore Dashboard.png",
        alt: "SmartStore catalog dashboard with marketplace distribution and product status counts",
        caption:
          "The main catalog dashboard brings marketplace distribution, listing status, search, and bulk actions into one working view.",
      },
      {
        src: "/images/smartstore/SmartStore Search and Category Tree.png",
        alt: "SmartStore product search interface with a marketplace category tree",
        caption:
          "Search and category-tree controls help merchants narrow a large catalog without losing the marketplace context of each product.",
      },
      {
        src: "/images/smartstore/SmartStore Bulk Upload.png",
        alt: "SmartStore bulk-upload workflow for catalog records",
        caption:
          "The bulk-upload workflow lets merchants move many catalog records at once instead of repeating the same edit product by product.",
      },
      {
        src: "/images/smartstore/SmartStore Bulk Update.png",
        alt: "SmartStore bulk-update interface for editing multiple products",
        caption:
          "Bulk update turns repeated product maintenance into a single controlled operation, while keeping the affected records visible.",
      },
      {
        src: "/images/smartstore/SmartStore Bulk Error Handling.jpg",
        alt: "SmartStore error-handling view for a bulk catalog operation",
        caption:
          "Bulk error handling makes failed rows explicit so merchants can identify what needs correction before retrying the operation.",
      },
      {
        src: "/images/smartstore/SmartStore Linked Mark.png",
        alt: "SmartStore interface showing linked marketplace status",
        caption:
          "A clear linked-state marker shows which catalog entries are connected to a marketplace and which still need attention.",
      },
      {
        src: "/images/smartstore/SmartStore Linked Mark Popup.png",
        alt: "SmartStore linked-status details displayed in a popup",
        caption:
          "The linked-status popup adds detail without forcing the merchant away from the catalog screen they are working in.",
      },
      {
        src: "/images/smartstore/SmartStore Order Dashboard with Pagination.png",
        alt: "SmartStore order dashboard with pagination controls",
        caption:
          "Pagination keeps a growing order history usable, splitting the data into predictable pages without removing its operational context.",
      },
      {
        src: "/images/smartstore/SmartStore Order Dashboard with Queries and Search.png",
        alt: "SmartStore order dashboard with query filters and search",
        caption:
          "Query filters and search make the order dashboard practical for investigation instead of leaving merchants to scan a long table manually.",
      },
      {
        src: "/images/smartstore/SamrtStore Pagination.png",
        alt: "SmartStore catalog listing with pagination controls",
        caption:
          "Catalog pagination provides a stable way to move through inventory while retaining the current list and marketplace context.",
      },
      {
        src: "/images/smartstore/SmartStrore Support Page.png",
        alt: "SmartStore merchant support page",
        caption:
          "The support page gives merchants a dedicated route for questions and issues that cannot be resolved from the product workflow itself.",
      },
    ],
    learnings: [
      "Merchant-facing tools have a different bar than consumer pages — every edge case is someone's inventory",
      "Working inside an existing system is a different skill than starting one from scratch",
    ],
  },
  {
    id: "the-vibed-vines",
    slug: "the-vibed-vines",
    name: "The Vibed Vines",
    classification: "Business Experiment",
    period: "2024 (V1) · 2025 (V2)",
    hook: "Two attempts at the same question: what does it actually take to run a consumer brand?",
    summary:
      "V1 started when a work-from-home stretch freed up time: Placeit mockups, a ChatGPT-generated logo, an Instagram page, a handful of designs, and real research into how clothing dropshipping actually works. I paused it when circumstances changed. After leaving ShopClues, I came back to it — V2 was a different scale: five-plus collections, 100+ SKUs, a real Shopify storefront, an Instagram content grid, product mockups, and reels. Not a fashion-empire story. A story about what it costs, in time and attention, to actually operate a brand rather than just design one. I paused it a second time when time ran out, and that's part of the record too.",
    role: "Founder",
    stack: ["Shopify", "Instagram", "Placeit", "Canva"],
    externalUrl: null,
    learnings: [
      "Designing a brand and operating one are almost entirely different skill sets",
      "100+ SKUs is a fulfillment and content problem long before it's a marketing problem",
      "Pausing on purpose is a decision, not a failure — the record should say so plainly",
    ],
  },
  {
    id: "kraftt-digital",
    slug: "kraftt-digital",
    name: "Kraftt Digital",
    classification: "Current Venture",
    period: "2025 →",
    hook: "Technology is moving fast. A lot of smaller businesses aren't part of that shift.",
    summary:
      "By the time I started Kraftt, I'd seen engineering, e-commerce, consumer brands, content, AI tooling, and traditional business — including wholesale markets and manufacturing — from close enough to notice a pattern: businesses outside major metros are frequently left out of the current wave of digital adoption, not because the tools don't exist, but because nobody's built them a practical way in. Kraftt Digital is the company built to close that gap.",
    role: "Founder",
    stack: ["Next.js", "TypeScript", "Various client stacks"],
    externalUrl: "https://krafttdigital.in",
    learnings: [
      "Every prior chapter — engineering, brand-building, business research — turned out to be preparation, not a detour",
    ],
  },
];

export const buildsByClassification = (classification: Build["classification"]) =>
  builds.filter((b) => b.classification === classification);
