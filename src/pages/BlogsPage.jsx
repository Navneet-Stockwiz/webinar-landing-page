import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PricingLayout from "../layouts/PricingLayout.jsx";
import LightningFast from "../components/LightningFast.jsx";
import BlogChartMockup from "../components/BlogChartMockup.jsx";
import light from "../assets/webp/light.webp";
import herosectiontiny from "../assets/svg/herosectiontiny.svg";
import business from "../assets/svg/business.svg";
import {
  fetchStrykeXBlogCategories,
  fetchStrykeXBlogsPublic,
} from "../api/strykeBlogApi.js";
import { strykeBlogCardFromApiRow } from "../utils/strykeBlogNormalize.js";

/** Display order for category tabs when deriving from post rows (matches backend enum). */
const CATEGORY_ORDER = [
  "Business",
  "Improvements",
  "Our Team",
  "Market Updates",
  "Office",
];

function deriveCategoryTabsFromCards(cards) {
  const seen = new Set(
    cards.map((c) => c.category).filter((x) => x && String(x).trim())
  );
  return CATEGORY_ORDER.filter((label) => seen.has(label));
}

const SearchIcon = () => (
  <svg
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M8.25 14.25C11.5637 14.25 14.25 11.5637 14.25 8.25C14.25 4.93629 11.5637 2.25 8.25 2.25C4.93629 2.25 2.25 4.93629 2.25 8.25C2.25 11.5637 4.93629 14.25 8.25 14.25Z"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M12.75 12.75L15.75 15.75"
      stroke="white"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const CursorArrow = () => (
  <svg
    className="absolute -right-2 top-2 h-6 w-6 sm:-right-4 sm:top-4 sm:h-8 sm:w-8"
    viewBox="0 0 36 36"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M2.25 2.5L31.8 14.1L19.5 18.75L14.75 31L2.25 2.5Z"
      fill="white"
    />
  </svg>
);

const ThumbnailMockup = () => (
  <div className="relative h-16 w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#171B27] sm:h-[72px] sm:w-[96px]">
    <BlogChartMockup compact />
    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.14),transparent_42%,rgba(0,0,0,0.35))]" />
  </div>
);

const FeaturedSidebarThumb = ({ card }) =>
  card?.thumbnailUrl ? (
    <div className="relative h-16 w-[72px] shrink-0 overflow-hidden rounded-lg bg-[#071A45] sm:h-[72px] sm:w-[96px]">
      <img
        src={card.thumbnailUrl}
        alt=""
        className="h-full w-full object-cover"
      />
    </div>
  ) : (
    <ThumbnailMockup />
  );

const AuthorAvatar = ({ url, name }) => {
  const initial = (name && name.trim()[0]) || "S";
  if (url) {
    return (
      <img
        src={url}
        alt=""
        className="h-8 w-8 shrink-0 rounded-full object-cover"
      />
    );
  }
  return (
    <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-[linear-gradient(135deg,#EAE7D9,#667D8D_48%,#211815)] text-[11px] font-bold text-white/90">
      {initial.toUpperCase()}
    </div>
  );
};

const LearnMoreArrow = () => (
  <svg
    className="h-3.5 w-3.5 shrink-0 sm:h-[18px] sm:w-[18px]"
    viewBox="0 0 18 18"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M3.75 9H14.25"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
    <path
      d="M9.75 4.5L14.25 9L9.75 13.5"
      stroke="white"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const BlogCardHero = ({ thumbnailUrl, visual, alt = "" }) => {
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt={alt}
        className="absolute inset-0 object-cover object-center"
        draggable={false}
      />
    );
  }

  if (visual === "business") {
    return (
      <img
        src={business}
        alt=""
        className="absolute inset-0 object-cover object-center"
        draggable={false}
      />
    );
  }

  if (visual === "office") {
    return (
      <div className="absolute inset-0 h-full w-full bg-[linear-gradient(135deg,#F8DDAE_0%,#7B4B21_48%,#151D2C_100%)]">
        <div className="grid h-full grid-cols-5 gap-3 p-6 opacity-80">
          {Array.from({ length: 10 }, (_, index) => (
            <div
              key={index}
              className="rounded-sm bg-[linear-gradient(180deg,rgba(255,255,255,0.65),rgba(255,255,255,0.05))]"
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 h-full w-full [&_svg]:h-full [&_svg]:w-full [&_svg]:object-cover">
      <BlogChartMockup />
    </div>
  );
};

/** Latest published post (hero). */
function sortByNewest(cards) {
  return [...cards].sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
}

const FEATURED_SIDEBAR_MAX = 4;

function rowIsFeatured(row) {
  if (!row) return false;
  return Number(row.is_featured) === 1;
}

/** Admin-marked featured for sidebar (up to 4). Includes hero when it is starred. */
function pickMarkedFeaturedCards(cards, max = FEATURED_SIDEBAR_MAX) {
  return sortByNewest(cards.filter((c) => c.isFeatured && c.slug)).slice(0, max);
}

/** Original static layout: next newest posts after hero when none are starred. */
function pickFallbackSidebarCards(cards, heroSlug, max = FEATURED_SIDEBAR_MAX) {
  return sortByNewest(cards)
    .filter((c) => c.slug && c.slug !== heroSlug)
    .slice(0, max);
}

function resolveFeaturedSidebarCards(cards, apiRows, heroSlug) {
  const featuredSlugs = new Set(
    (apiRows || []).filter(rowIsFeatured).map((r) => r.slug).filter(Boolean)
  );
  const withFeaturedFlag = cards.map((c) => ({
    ...c,
    isFeatured: c.isFeatured || featuredSlugs.has(c.slug),
  }));
  const marked = pickMarkedFeaturedCards(withFeaturedFlag);
  if (marked.length > 0) return marked;
  return pickFallbackSidebarCards(withFeaturedFlag, heroSlug);
}

function filterBlogCards(cards, search, categoryLabel) {
  let out = cards;
  if (categoryLabel && categoryLabel !== "View All") {
    out = out.filter((c) => c.category === categoryLabel);
  }
  const q = search.trim().toLowerCase();
  if (q) {
    out = out.filter(
      (c) =>
        String(c.listTitle || "")
          .toLowerCase()
          .includes(q) ||
        String(c.listExcerpt || "")
          .toLowerCase()
          .includes(q) ||
        String(c.category || "")
          .toLowerCase()
          .includes(q) ||
        String(c.overlayTitle || "")
          .toLowerCase()
          .includes(q)
    );
  }
  return out;
}

const BlogListingCard = ({ card }) => {
  const authorName = card.authorName?.trim() || "Jennifer Lopez";
  const authorRole = card.authorRole?.trim() || "Human resources";

  return (
    <article className="group flex h-full min-h-0 flex-col overflow-hidden pb-6">
      <div className="relative isolate aspect-[16/10] w-full max-h-[220px] shrink-0 overflow-hidden rounded-md bg-[#071A45] sm:aspect-[5/3] sm:max-h-[245px] md:h-[245px] md:max-h-none">
        <BlogCardHero
          thumbnailUrl={card.thumbnailUrl}
          visual={card.visual}
          alt={card.listTitle || ""}
        />
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(1,4,26,0)_24%,rgba(1,4,26,0.28)_52%,rgba(1,4,26,0.88)_100%)] transition-opacity duration-300 group-hover:opacity-0" />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 w-full translate-y-full transition-transform duration-300 ease-out will-change-transform group-hover:pointer-events-auto group-hover:translate-y-0 group-focus-within:pointer-events-auto group-focus-within:translate-y-0">
          <div className="flex w-full flex-col items-start gap-1.5 bg-[rgba(6,34,84,0.6)] px-3 py-2 backdrop-blur-sm supports-[backdrop-filter]:bg-[rgba(6,34,84,0.48)]">
            <span className="inline-flex rounded-full border border-white/70 bg-black/25 px-2 py-0.5 text-[10px] font-semibold leading-none text-white">
              {card.category}
            </span>
            <h3 className="line-clamp-3 max-w-full text-sm font-semibold leading-[1.35] tracking-[-0.03em] text-white sm:max-w-[310px] sm:text-base">
              {card.overlayTitle}
            </h3>
          </div>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col gap-3 pt-3">
        <h4 className="text-lg font-semibold leading-tight tracking-[-0.03em] text-white sm:text-xl md:text-2xl">
          {card.listTitle}
        </h4>
        <p className="text-sm font-medium leading-[1.45] tracking-[-0.02em] text-[#FFFFFFBF]">
          {card.listExcerpt}
        </p>
        <div className="mt-auto flex flex-row items-center justify-between gap-3 border-t border-white/10 pt-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <AuthorAvatar url={card.authorAvatarUrl} name={authorName} />
            <div className="min-w-0">
              <p className="truncate text-base font-semibold leading-none tracking-[-0.03em] text-white sm:text-lg md:text-2xl">
                {authorName}
              </p>
              <p className="mt-1 text-xs font-normal leading-none text-[#FFFFFFBF]">
                {authorRole}
              </p>
            </div>
          </div>
          <Link
            to={`/blogs/${card.slug}`}
            className="ml-3 flex shrink-0 items-center gap-1.5 text-xs font-medium text-white transition hover:opacity-80 sm:gap-2 sm:text-sm"
          >
            Learn More
            <LearnMoreArrow />
          </Link>
        </div>
      </div>
    </article>
  );
};

const BlogsPage = () => {
  const [apiRows, setApiRows] = useState(null);
  const [categoryTabsFromApi, setCategoryTabsFromApi] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("View All");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const [list, cats] = await Promise.all([
          fetchStrykeXBlogsPublic(),
          fetchStrykeXBlogCategories().catch(() => null),
        ]);
        if (cancelled) return;
        setApiRows(Array.isArray(list) ? list : []);
        setCategoryTabsFromApi(
          Array.isArray(cats) && cats.length > 0 ? cats : null
        );
      } catch {
        if (!cancelled) {
          setApiRows([]);
          setCategoryTabsFromApi(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const baseCards = useMemo(() => {
    if (apiRows === null) return [];
    return apiRows.map(strykeBlogCardFromApiRow).filter(Boolean);
  }, [apiRows]);

  const tabLabels = useMemo(() => {
    const rest =
      categoryTabsFromApi && categoryTabsFromApi.length > 0
        ? categoryTabsFromApi
        : deriveCategoryTabsFromCards(baseCards);
    if (rest.length > 0) return ["View All", ...rest];
    return ["View All", ...CATEGORY_ORDER];
  }, [categoryTabsFromApi, baseCards]);

  useEffect(() => {
    if (!tabLabels.includes(activeCategory)) {
      setActiveCategory("View All");
    }
  }, [tabLabels, activeCategory]);

  const isLoading = apiRows === null;

  const sortedCards = useMemo(() => sortByNewest(baseCards), [baseCards]);
  const heroCard = sortedCards[0] ?? null;
  const featuredCards = useMemo(
    () => resolveFeaturedSidebarCards(sortedCards, apiRows, heroCard?.slug),
    [sortedCards, apiRows, heroCard?.slug]
  );
  const hasAdminFeatured = useMemo(
    () =>
      sortedCards.some((c) => c.isFeatured) ||
      (apiRows || []).some(rowIsFeatured),
    [sortedCards, apiRows]
  );

  const filteredGrid = useMemo(
    () => filterBlogCards(baseCards, searchQuery, activeCategory),
    [baseCards, searchQuery, activeCategory]
  );

  return (
    <PricingLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#01041A] px-4 pb-24 pt-24 text-white sm:pt-28 lg:pt-32 md:px-20 lg:px-32 xl:px-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(880px,92vh)] overflow-hidden"
          aria-hidden
        >
          <img
            src={light}
            alt=""
            className="absolute inset-x-0 top-0 h-[620px] w-full object-cover opacity-75 mix-blend-screen"
          />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(83,132,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(83,132,255,0.12)_1px,transparent_1px)] bg-[length:48px_48px] opacity-70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_12%,rgba(54,112,255,0.42),transparent_34%),linear-gradient(90deg,#01041A_0%,rgba(1,4,26,0)_18%,rgba(1,4,26,0)_82%,#01041A_100%)]" />
        </div>

        <div className="relative z-10 mx-auto flex w-full max-w-[1180px] flex-col items-center gap-6 sm:gap-8">
          <button
            type="button"
            className="relative isolate rounded-full bg-[linear-gradient(319.13deg,#007AFF_-14.94%,#81F0FF_101.57%)] p-[2px] text-sm font-semibold leading-none text-white sm:text-base md:text-2xl"
          >
            <span className="absolute -inset-2 -z-10 rounded-full bg-[linear-gradient(99.74deg,#3FADFF_-19.84%,#336CDC_46.67%,#47B4B4_114.56%)] opacity-80 blur-xl sm:-inset-3" />
            <span className="block rounded-full bg-[linear-gradient(99.74deg,#3FADFF_-19.84%,#336CDC_46.67%,#47B4B4_114.56%)] px-4 py-1.5 sm:px-5 sm:py-2">
              Read our blogs
            </span>
            <CursorArrow />
          </button>

          <div className="relative w-full text-center font-semibold text-white">
            <h1 className="font-degular text-[32px] leading-[1.05] sm:text-[40px] md:text-[48px] lg:text-[64px] lg:leading-[100%]">
              Trade Smarter
            </h1>
            <div className="relative mt-1 flex flex-wrap items-center justify-center gap-2 sm:mt-2 sm:gap-4">
              <span className="font-degular text-[32px] leading-[1.05] sm:text-[40px] md:text-[48px] lg:text-[64px]">
                Read
              </span>
              <img
                src={herosectiontiny}
                alt=""
                className="h-8 w-auto object-contain sm:h-10 md:h-12"
              />
              <span className="font-degular text-[32px] leading-[1.05] sm:text-[40px] md:text-[48px] lg:text-[64px]">
                Sharper
              </span>
            </div>
          </div>

          <label
            className="flex h-11 w-full max-w-[410px] items-center gap-2 rounded-lg px-3 text-white sm:h-12 sm:gap-3 sm:px-4"
            style={{
              background: "#FFFFFF24",
              backdropFilter: "blur(5.900000095367432px)",
            }}
          >
            <SearchIcon />
            <input
              type="search"
              placeholder="Search Blog"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-base font-medium text-white placeholder:text-white/75 outline-none sm:text-lg md:text-xl"
            />
          </label>

          <div className="grid w-full items-start gap-8 lg:grid-cols-[1.35fr_0.95fr]">
            {isLoading ? (
              <div className="flex min-h-[300px] w-full items-center justify-center rounded-md border border-white/10 bg-[#071A45] md:min-h-[375px]">
                <p className="text-base font-medium text-white/70">
                  Loading blogs…
                </p>
              </div>
            ) : heroCard ? (
              <Link
                to={`/blogs/${heroCard.slug}`}
                className="group relative block w-full overflow-hidden rounded-md bg-[#071A45] shadow-[0_18px_60px_rgba(0,108,255,0.28)] transition hover:opacity-95 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[5/3] max-h-[300px] sm:max-h-[340px] md:max-h-[375px]"
              >
                <div className="absolute inset-0 overflow-hidden">
                  <BlogCardHero
                    thumbnailUrl={heroCard.thumbnailUrl}
                    visual={heroCard.visual}
                    alt={heroCard.listTitle || ""}
                  />
                </div>
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(1,4,26,0)_28%,rgba(1,4,26,0.45)_58%,#062254_100%)]" />
                <div className="absolute inset-x-0 bottom-0 flex flex-col items-start gap-2 p-4 sm:gap-3 sm:p-5">
                  <span className="inline-flex rounded-full border border-white/80 bg-[#0C285C]/80 px-2 py-0.5 text-[10px] font-medium leading-none text-white sm:px-2.5 sm:py-1 sm:text-[11px]">
                    {heroCard.imageTag || heroCard.category}
                  </span>
                  <h2 className="max-w-[520px] text-xl font-semibold leading-[1.35] tracking-[-0.03em] text-white sm:text-2xl md:text-[34px] md:leading-[1.45]">
                    {heroCard.overlayTitle || heroCard.listTitle}
                  </h2>
                </div>
              </Link>
            ) : (
              <div className="flex min-h-[300px] w-full flex-col items-center justify-center gap-2 rounded-md border border-dashed border-white/20 bg-[#071A45] p-8 text-center md:min-h-[375px]">
                <p className="text-lg font-semibold text-white">
                  No published blogs yet
                </p>
                <p className="max-w-md text-sm text-white/65">
                  New posts from the admin will appear here automatically.
                </p>
              </div>
            )}

            <aside className="flex w-full min-h-0 flex-col gap-4 pt-2 lg:min-h-[300px] lg:pt-2 md:min-h-[375px]">
              <h3 className="text-[1.75rem] font-semibold leading-none tracking-[-0.02em] text-white sm:text-3xl">
                Other featured posts
              </h3>
              {featuredCards.length > 0 ? (
                <nav
                  className="flex w-full flex-col"
                  aria-label="Other featured posts"
                >
                  {featuredCards.map((card, index) => (
                    <Link
                      key={card.slug || card.id}
                      to={`/blogs/${card.slug}`}
                      className={`group flex w-full items-center gap-4 py-5 text-left transition hover:opacity-90 ${
                        index > 0 ? "border-t border-white/15" : ""
                      }`}
                    >
                      <FeaturedSidebarThumb card={card} />
                      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
                        <span className="block text-lg font-semibold leading-[1.25] tracking-[-0.025em] text-white sm:text-xl line-clamp-2">
                          {card.listTitle}
                        </span>
                        {card.listExcerpt ? (
                          <span className="block text-sm font-medium leading-[1.35] tracking-[-0.02em] text-[#FFFFFFBF] line-clamp-2">
                            {card.listExcerpt}
                          </span>
                        ) : null}
                      </span>
                    </Link>
                  ))}
                </nav>
              ) : !isLoading ? (
                <p className="py-4 text-sm text-white/60">
                  {hasAdminFeatured
                    ? "Featured posts will appear here (latest post is shown in the main hero)."
                    : "Mark up to 4 posts with the star in admin, or publish more blogs."}
                </p>
              ) : null}
            </aside>
          </div>
        </div>

        <div className="relative z-10 mx-auto mt-12 w-full max-w-[1180px] bg-[#01041A] md:mt-20">
          {/* Category tabs — hidden for now
          <div className="-mx-4 flex items-center gap-6 overflow-x-auto overflow-y-hidden border-b border-white/20 px-4 pb-px sm:gap-8 md:mx-0 md:px-0">
            {tabLabels.map((category) => (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                className={`relative shrink-0 pb-4 text-sm font-medium transition sm:text-base ${
                  activeCategory === category
                    ? "text-white"
                    : "text-white/65 hover:text-white"
                }`}
              >
                {category}
                {activeCategory === category && (
                  <span className="absolute inset-x-0 bottom-[-1px] h-[3px] rounded-full bg-white" />
                )}
              </button>
            ))}
          </div>
          */}

          <div className="mt-8 grid items-stretch gap-x-4 gap-y-10 sm:gap-x-6 sm:gap-y-12 md:grid-cols-2 xl:grid-cols-3">
            {isLoading ? (
              <p className="col-span-full py-12 text-center text-base text-white/70">
                Loading…
              </p>
            ) : filteredGrid.length > 0 ? (
              filteredGrid.map((card) => (
                <BlogListingCard
                  key={card.slug || card.id}
                  card={card}
                />
              ))
            ) : (
              <p className="col-span-full py-12 text-center text-base text-white/65">
                No posts match your filters. Try another category or search.
              </p>
            )}
          </div>
        </div>
      </section>
      <LightningFast />
    </PricingLayout>
  );
};

export default BlogsPage;
