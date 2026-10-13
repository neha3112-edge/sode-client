import { API_BASE_URL, getFetchCacheOptions } from "@/config";

const getMediaUrl = (obj) => {
  if (!obj) return undefined;
  const raw = typeof obj === "string" ? obj : obj?.url || obj?.path || obj?.src || undefined;
  if (!raw || typeof raw !== "string") return undefined;
  const trimmed = raw.trim();
  if (!trimmed) return undefined;
  if (trimmed.startsWith("http://") || trimmed.startsWith("https://")) {
    return trimmed;
  }
  if (trimmed.startsWith("//")) {
    return `https:${trimmed}`;
  }
  const base = (
    process.env.NEXT_PUBLIC_SITE_URL ||
    SITE_URL ||
    (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://mysode.com")
  ).replace(/\/+$/, "");
  return trimmed.startsWith("/") ? `${base}${trimmed}` : `${base}/${trimmed}`;
};

export const SITE_NAME = process.env.NEXT_PUBLIC_SITE_NAME || "";
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "";

export function ensureTrailingSlash(url) {
  if (!url || typeof url !== "string") return url;
  if (/\.[a-zA-Z0-9]+$/.test(url)) return url;
  const [base, queryOrHash] = url.split(/([?#].*)/s);
  const cleanBase = base.endsWith("/") ? base : `${base}/`;
  return queryOrHash ? `${cleanBase}${queryOrHash}` : cleanBase;
}

export async function getPageMetaData(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  try {
    const res = await fetch(
      `${API_BASE_URL}pagemeta/website-read?path=${encodeURIComponent(cleanPath)}`,
      getFetchCacheOptions(300, "pagemeta")
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data?.success && data?.result) {
      return data.result;
    }

    return null;
  } catch (error) {
    console.warn(`Error fetching PageMeta for ${cleanPath}:`, error?.message);
    return null;
  }
}

export function constructMetadata(pageMeta, fallbacks = {}) {
  const hasPageMeta = Boolean(pageMeta);
  const metaObj = pageMeta || {};

  // If NO pageMeta exists and NO fallbacks provided, return noindex
  if (!hasPageMeta && (!fallbacks || Object.keys(fallbacks).length === 0)) {
    return {
      robots: {
        index: false,
        follow: false,
        googleBot: {
          index: false,
          follow: false,
        },
      },
    };
  }

  // 🔒 STRICT SEO: Only index if PageMeta explicitly enables "index" (and NOT "noindex")
  // If pageMeta doesn't exist but dynamic page fallbacks exist (e.g. blog post), default to indexed
  const rawRobots = metaObj.robots ? String(metaObj.robots).trim().toLowerCase() : "";
  const isExplicitlyIndexed = hasPageMeta
    ? Boolean(rawRobots && rawRobots.includes("index") && !rawRobots.includes("noindex"))
    : true;
  const isNoFollow = hasPageMeta ? (rawRobots.includes("nofollow") || !isExplicitlyIndexed) : false;

  const robots = {
    index: isExplicitlyIndexed,
    follow: !isNoFollow,
    googleBot: {
      index: isExplicitlyIndexed,
      follow: !isNoFollow,
    },
  };

  const title = metaObj.metaTitle || metaObj.title || fallbacks.title;
  const description = metaObj.metaDescription || metaObj.description || fallbacks.description;
  const keywords = metaObj.metaKeywords || metaObj.keywords || fallbacks.keywords;
  const rawCanonical = metaObj.canonicalUrl || metaObj.ogUrl || fallbacks.canonicalUrl;
  const canonical = rawCanonical ? ensureTrailingSlash(rawCanonical) : undefined;

  const authorName = metaObj.authorName || fallbacks.authorName;
  const publisherName = metaObj.publisher || fallbacks.publisher;
  const publisherUrl = metaObj.publisherUrl || fallbacks.publisherUrl;

  const ogTitle = metaObj.ogTitle || metaObj.metaTitle || metaObj.title || fallbacks.ogTitle || title;
  const ogDescription = metaObj.ogDescription || metaObj.metaDescription || metaObj.description || fallbacks.ogDescription || description;
  const ogSiteName = metaObj.ogSiteName || fallbacks.ogSiteName || SITE_NAME;
  const ogType = metaObj.ogType || fallbacks.ogType || "article";

  // OG Image logic:
  // 1. Agar meta se ogImage aayi hai -> meta wali show hogi
  // 2. Agar meta se nahi aayi -> blog ki coverImage show hogi
  const rawOg = metaObj.ogImage || fallbacks.ogImage || fallbacks.coverImage;
  const ogImageUrl = rawOg ? getMediaUrl(rawOg) : undefined;
  const ogImageAlt = rawOg?.alt || rawOg?.name || ogTitle || title;

  const twitterCard = metaObj.twitterCard || fallbacks.twitterCard || "summary_large_image";
  const twitterTitle = metaObj.twitterTitle || ogTitle || title;
  const twitterDescription = metaObj.twitterDescription || ogDescription || description;

  const rawTwitter = metaObj.twitterImage || metaObj.ogImage || fallbacks.twitterImage || fallbacks.ogImage || fallbacks.coverImage;
  const twitterImageUrl = rawTwitter ? getMediaUrl(rawTwitter) : undefined;

  const twitterSite = metaObj.twitterSite || fallbacks.twitterSite;
  const twitterCreator = metaObj.twitterCreator || fallbacks.twitterCreator;

  const metadata = {
    robots,
  };

  if (title) metadata.title = title;
  if (description) metadata.description = description;
  if (keywords) metadata.keywords = keywords;
  if (canonical) metadata.alternates = { canonical };

  if (authorName) {
    metadata.authors = [{ name: authorName }];
    metadata.creator = authorName;
  }
  if (publisherName) {
    metadata.publisher = publisherName;
  }

  if (ogTitle || ogDescription || ogImageUrl || ogSiteName || ogType) {
    metadata.openGraph = {
      ...(ogTitle ? { title: ogTitle } : {}),
      ...(ogDescription ? { description: ogDescription } : {}),
      ...(canonical ? { url: canonical } : {}),
      ...(ogSiteName ? { siteName: ogSiteName } : {}),
      ...(ogType ? { type: ogType } : {}),
      ...(ogImageUrl
        ? {
            images: [
              {
                url: ogImageUrl,
                width: 1200,
                height: 630,
                ...(ogImageAlt ? { alt: ogImageAlt } : {}),
              },
            ],
          }
        : {}),
    };
  }

  if (twitterTitle || twitterDescription || twitterImageUrl || twitterSite || twitterCreator || twitterCard) {
    metadata.twitter = {
      card: twitterCard,
      ...(twitterTitle ? { title: twitterTitle } : {}),
      ...(twitterDescription ? { description: twitterDescription } : {}),
      ...(twitterSite ? { site: twitterSite } : {}),
      ...(twitterCreator ? { creator: twitterCreator } : {}),
      ...(twitterImageUrl ? { images: [twitterImageUrl] } : {}),
    };
  }

  if (publisherUrl) {
    metadata.other = {
      publisher: publisherUrl,
    };
  }

  return metadata;
}
