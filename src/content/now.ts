export type NowItem = {
  id: string;
  title: string;
  description: string;
};

export const nowItems: NowItem[] = [
  {
    id: "kraftt",
    title: "Running Kraftt Digital",
    description:
      "Helping smaller businesses — especially outside major metros — build a real digital presence: websites, systems, and the basics most agencies skip.",
  },
  {
    id: "systems",
    title: "Documenting what I'm learning",
    description:
      "Writing down what worked, what failed, and what changed, instead of only publishing the highlight reel. Most of this lives on the Journey and Builds pages for now.",
  },
  {
    id: "business-fundamentals",
    title: "Studying business fundamentals",
    description:
      "Still working through import/export, manufacturing, and wholesale economics — trying to understand how money actually moves through a business before I bet on more of my own.",
  },
  {
    id: "ai-experiments",
    title: "Testing what one person can build with AI tools",
    description:
      "Ongoing experiments across scripting, voice, video, and automation tooling — not to become 'an AI expert,' but to see how far a single builder can go right now.",
  },
];

export const nowLastUpdated = "August 2026";
