const heroLine =
  "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowl winning Dynasty? Dive deep into leadership.";

/** Article body mock: typo “Bowt”, capital “Into”, repeats 3 / 4 / 3. */
const bodyLine =
  "Like to know the secrets of transforming a 2-14 team into a 3x Super Bowt winning Dynasty? Dive deep Into leadership.";

const defaultBodyParagraphs = [
  Array.from({ length: 3 }, () => bodyLine).join(" "),
  Array.from({ length: 4 }, () => bodyLine).join(" "),
  Array.from({ length: 3 }, () => bodyLine).join(" "),
];

/** Matches article hero mock: dense first block, second block. */
const defaultHeroIntroParagraphs = [
  `${heroLine} ${heroLine} ${heroLine}`,
  heroLine,
];

export const blogCards = [
  {
    id: 1,
    slug: "bill-walsh-leadership-lessons",
    visual: "business",
    detailVisual: "chart",
    category: "Business",
    overlayTitle: "Unlocking Business Efficiency with SaaS Solutions",
    listTitle: "Bill Walsh leadership lessons",
    heroTitle: "Revolutionizing industries through SaaS implementation",
    listExcerpt: heroLine,
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
  {
    id: 2,
    slug: "design-systems-at-scale",
    visual: "office",
    category: "Office",
    overlayTitle: "How hybrid teams stay aligned",
    listTitle: "Design systems that scale with your org",
    heroTitle: "Design systems that scale with your org",
    listExcerpt:
      "Practical patterns for keeping UI consistent as your product grows across teams, time zones, and release trains.",
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
  {
    id: 3,
    slug: "reading-the-tape",
    visual: "chart",
    detailVisual: "chart",
    category: "Market Updates",
    heroBadge: "Business",
    overlayTitle: "Volatility and opportunity this quarter",
    listTitle: "Reading the tape without the noise",
    heroTitle: "Reading the tape without the noise",
    listExcerpt:
      "A grounded look at momentum, breadth, and risk so you can size trades without chasing every headline.",
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
  {
    id: 4,
    slug: "safer-releases",
    visual: "market",
    category: "Improvements",
    overlayTitle: "Shipping faster with safer releases",
    listTitle: "From fragile deploys to boring Fridays",
    heroTitle: "From fragile deploys to boring Fridays",
    listExcerpt:
      "Feature flags, canaries, and observability habits that turn release day into just another merge.",
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
  {
    id: 5,
    slug: "futures-overnight",
    visual: "chart",
    detailVisual: "chart",
    category: "Market Updates",
    overlayTitle: "Energy and commodities watchlist",
    listTitle: "What moved futures overnight",
    heroTitle: "What moved futures overnight",
    listExcerpt:
      "Key levels, inventory prints, and currency crosses worth watching before the opening bell.",
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
  {
    id: 6,
    slug: "async-decision-making",
    visual: "market",
    category: "Our Team",
    overlayTitle: "Inside Stryke culture",
    listTitle: "How we run async decision-making",
    heroTitle: "How we run async decision-making",
    listExcerpt:
      "Docs-first rituals and meeting hygiene that keep ICs unblocked while leadership stays in the loop.",
    introParagraphs: defaultHeroIntroParagraphs,
    bodyParagraphs: defaultBodyParagraphs,
  },
];

export function getBlogPostBySlug(slug) {
  return blogCards.find((post) => post.slug === slug);
}
