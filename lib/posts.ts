export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  category: string;
  keywords: string[];
};

export const posts: Post[] = [
  {
    slug: "how-many-solar-panels-do-i-need-nigeria",
    title: "How Many Solar Panels Do I Need in Nigeria?",
    excerpt:
      "A practical guide to calculating the right number of solar panels for your home or business — based on your actual appliance load, daily sun hours, and battery autonomy needs.",
    date: "2026-04-10",
    readTime: "7 min read",
    category: "System Sizing",
    keywords: ["how many solar panels do I need Nigeria", "solar panel sizing Nigeria", "solar system size calculator"],
  },
  {
    slug: "solar-inverter-price-nigeria-2026",
    title: "Solar Inverter Prices in Nigeria (2026 Guide)",
    excerpt:
      "Up-to-date pricing for hybrid, off-grid, and grid-tie inverters from Growatt, Victron, and Voltronic — with advice on which type suits your home or business load.",
    date: "2026-04-18",
    readTime: "6 min read",
    category: "Pricing",
    keywords: ["solar inverter price Nigeria 2026", "Growatt inverter price Nigeria", "hybrid inverter Nigeria"],
  },
  {
    slug: "nepa-alternative-nigeria",
    title: "The Best NEPA Alternative for Nigerian Homes in 2026",
    excerpt:
      "Why solar is now the most cost-effective and reliable alternative to DISCOM power in Nigeria — and how to size a system that gives you true energy independence.",
    date: "2026-04-25",
    readTime: "8 min read",
    category: "Energy Independence",
    keywords: ["NEPA alternative Nigeria", "solar vs generator Nigeria", "energy independence Nigeria 2026"],
  },
  {
    slug: "lithium-vs-gel-battery-nigeria",
    title: "Lithium vs Gel Battery: Which Is Right for Your Solar System?",
    excerpt:
      "A head-to-head comparison of lithium iron phosphate (LiFePO4) and AGM gel batteries for Nigerian solar installations — covering cost, lifespan, performance, and total cost of ownership.",
    date: "2026-05-01",
    readTime: "6 min read",
    category: "Equipment",
    keywords: ["lithium vs gel battery Nigeria", "LiFePO4 battery Nigeria", "solar battery price Nigeria"],
  },
  {
    slug: "solar-installation-cost-nigeria",
    title: "Solar Installation Cost in Nigeria: A Complete 2026 Breakdown",
    excerpt:
      "What does a complete solar system actually cost in Nigeria in 2026? We break down panel, inverter, battery, and installation costs — with real price ranges for 2kVA, 5kVA, and 10kVA systems.",
    date: "2026-05-05",
    readTime: "9 min read",
    category: "Pricing",
    keywords: ["solar installation cost Nigeria 2026", "solar system price Nigeria", "how much solar panel cost Nigeria"],
  },
];

export function getPost(slug: string): Post | undefined {
  return posts.find((p) => p.slug === slug);
}
