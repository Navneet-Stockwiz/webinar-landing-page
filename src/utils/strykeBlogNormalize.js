/**
 * Maps CMS (admin + API) rows to the /blogs card shape.
 */
export function strykeBlogCardFromApiRow(row) {
  if (!row) return null;
  return {
    id: row._id,
    slug: row.slug,
    thumbnailUrl: row.thumbnail_url || "",
    visual: "chart",
    category: row.category,
    overlayTitle: row.image_heading,
    listTitle: row.blog_heading,
    listExcerpt: row.blog_description,
    authorName: row.author_name || "",
    authorRole: row.author_role || "",
    authorAvatarUrl: row.author_avatar_url || "",
    imageTag: row.image_tag || "",
    isFeatured: Number(row.is_featured) === 1,
    createdAt: row.createdAt ? new Date(row.createdAt).getTime() : 0,
  };
}

/**
 * Maps CMS row to the /blogs/:slug article layout (Pricing-style two-column hero + body).
 */
export function strykeBlogDetailFromApiRow(row) {
  if (!row) return null;
  const raw = String(row.learn_more || "").trim();
  let bodyParagraphs = [];
  if (raw) {
    const byBlank = raw.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
    if (byBlank.length > 1) {
      bodyParagraphs = byBlank;
    } else {
      const bySingle = raw.split(/\n/).map((p) => p.trim()).filter(Boolean);
      bodyParagraphs = bySingle.length > 1 ? bySingle : [raw];
    }
  }
  const intro = row.blog_description
    ? [String(row.blog_description).trim()]
    : [];
  return {
    slug: row.slug,
    thumbnailUrl: row.thumbnail_url || "",
    visual: "chart",
    heroBadge: row.image_tag || row.category,
    heroTitle: row.blog_heading,
    introParagraphs: intro,
    bodyParagraphs,
    authorName: row.author_name || "",
    authorRole: row.author_role || "",
    authorAvatarUrl: row.author_avatar_url || "",
  };
}
