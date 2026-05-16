import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PricingLayout from "../layouts/PricingLayout.jsx";
import LightningFast from "../components/LightningFast.jsx";
import BlogChartMockup from "../components/BlogChartMockup.jsx";
import light from "../assets/webp/light.webp";
import business from "../assets/svg/business.svg";
import { fetchStrykeXBlogBySlug } from "../api/strykeBlogApi.js";
import { strykeBlogDetailFromApiRow } from "../utils/strykeBlogNormalize.js";
import NotFound from "./NotFound.jsx";

const BlogHeroMedia = ({ thumbnailUrl, visual }) => {
  if (thumbnailUrl) {
    return (
      <img
        src={thumbnailUrl}
        alt=""
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

const BlogPostPage = () => {
  const { slug } = useParams();
  /** undefined = loading; null = not found; object = CMS row */
  const [remoteRow, setRemoteRow] = useState(undefined);

  useEffect(() => {
    if (!slug) {
      setRemoteRow(null);
      return;
    }
    let cancelled = false;
    setRemoteRow(undefined);
    fetchStrykeXBlogBySlug(slug)
      .then((row) => {
        if (!cancelled) setRemoteRow(row);
      })
      .catch(() => {
        if (!cancelled) setRemoteRow(null);
      });
    return () => {
      cancelled = true;
    };
  }, [slug]);

  const cmsPost =
    remoteRow != null ? strykeBlogDetailFromApiRow(remoteRow) : null;
  const post = cmsPost;

  if (remoteRow === undefined) {
    return (
      <PricingLayout>
        <section className="relative min-h-screen overflow-hidden bg-[#01041A] px-4 pb-24 pt-24 text-white sm:pt-28 lg:pt-32 md:px-20 lg:px-32 xl:px-40">
          <div className="relative z-10 mx-auto w-full max-w-[1180px] py-24 text-center text-white/70">
            Loading…
          </div>
        </section>
      </PricingLayout>
    );
  }

  if (!post) {
    return <NotFound />;
  }

  const heroVisual = post.detailVisual ?? post.visual ?? "chart";
  const thumb = post.thumbnailUrl;

  return (
    <PricingLayout>
      <section className="relative min-h-screen overflow-hidden bg-[#01041A] px-4 pb-24 pt-24 text-white sm:pt-28 lg:pt-32 md:px-20 lg:px-32 xl:px-40">
        <div
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[min(780px,85vh)] overflow-hidden"
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

        <div className="relative z-10 mx-auto w-full max-w-[1180px]">
          <Link
            to="/blogs"
            className="mb-6 inline-flex text-sm font-medium text-white/70 transition hover:text-white sm:mb-8"
          >
            ← Back to blogs
          </Link>

          <div className="grid items-start gap-6 sm:gap-8 lg:grid-cols-2 lg:gap-12 xl:gap-14">
            <div className="relative isolate aspect-[16/10] w-full shrink-0 overflow-hidden rounded-lg bg-[#071A45] sm:aspect-[5/3]">
              <div className="absolute inset-0 overflow-hidden">
                <BlogHeroMedia thumbnailUrl={thumb} visual={heroVisual} />
              </div>
            </div>

            <div className="flex min-w-0 flex-col gap-4">
              <span className="inline-flex w-fit items-center rounded-full border border-white bg-transparent px-4 py-2 text-xs font-semibold leading-none text-white">
                {post.heroBadge ?? post.category}
              </span>
              <h1 className="max-w-[540px] text-2xl font-semibold leading-[1.15] tracking-[-0.03em] text-white sm:text-[1.625rem] md:text-[1.875rem] md:leading-[1.18] lg:text-[2rem] lg:leading-[1.2] 2xl:text-[2.25rem] 2xl:leading-[1.2]">
                {post.heroTitle}
              </h1>
              <div className="flex max-w-[540px] flex-col gap-4">
                {post.introParagraphs.map((para, index) => (
                  <p
                    key={index}
                    className="text-[15px] font-medium leading-[1.45] tracking-[-0.015em] text-[#FFFFFFBF] md:text-base"
                  >
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>

          <div className="my-8 border-t border-white/15 sm:my-10 md:my-12" />

          <div className="relative flex w-full max-w-[820px] flex-col gap-4 bg-[#01041A] 2xl:max-w-none">
            {post.bodyParagraphs.map((para, index) => (
              <p
                key={index}
                className="text-[15px] font-medium leading-[1.6] tracking-[-0.01em] text-[#FFFFFFBF] md:text-base"
              >
                {para}
              </p>
            ))}
          </div>
        </div>
      </section>
      <LightningFast />
    </PricingLayout>
  );
};

export default BlogPostPage;
