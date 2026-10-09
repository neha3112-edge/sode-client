import { API_BASE_URL, getFetchCacheOptions } from "@/config";
import { getAssetPath } from "@/lib/utils";

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

export function constructMetadata(pageMeta) {
  // If NO pageMeta exists in backend for this path, strictly return noindex, nofollow
  if (!pageMeta) {
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
  const rawRobots = pageMeta.robots ? String(pageMeta.robots).trim().toLowerCase() : "";
  const isExplicitlyIndexed = Boolean(
    rawRobots &&
    rawRobots.includes("index") &&
    !rawRobots.includes("noindex")
  );
  const isNoFollow = rawRobots.includes("nofollow") || !isExplicitlyIndexed;

  const robots = {
    index: isExplicitlyIndexed,
    follow: !isNoFollow,
    googleBot: {
      index: isExplicitlyIndexed,
      follow: !isNoFollow,
    },
  };

  const title = pageMeta.metaTitle || pageMeta.title;
  const description = pageMeta.metaDescription || pageMeta.description;
  const keywords = pageMeta.metaKeywords || pageMeta.keywords;
  const rawCanonical = pageMeta.canonicalUrl || pageMeta.ogUrl;
  const canonical = rawCanonical ? ensureTrailingSlash(rawCanonical) : undefined;

  const authorName = pageMeta.authorName;
  const publisherName = pageMeta.publisher;
  const publisherUrl = pageMeta.publisherUrl;

  const ogTitle = pageMeta.ogTitle || pageMeta.metaTitle || pageMeta.title;
  const ogDescription = pageMeta.ogDescription || pageMeta.metaDescription || pageMeta.description;
  const ogSiteName = pageMeta.ogSiteName;
  const ogType = pageMeta.ogType;

  const rawOg = pageMeta.ogImage;
  const ogUrl = typeof rawOg === "string" ? rawOg : rawOg?.url || rawOg?.path;
  const ogImageUrl = ogUrl ? getAssetPath(ogUrl) : undefined;
  const ogImageAlt = rawOg?.alt || rawOg?.name || ogTitle || title;

  const twitterCard = pageMeta.twitterCard;
  const twitterTitle = pageMeta.twitterTitle || ogTitle || title;
  const twitterDescription = pageMeta.twitterDescription || ogDescription || description;

  const rawTwitter = pageMeta.twitterImage || pageMeta.ogImage;
  const twitterUrl = typeof rawTwitter === "string" ? rawTwitter : rawTwitter?.url || rawTwitter?.path;
  const twitterImageUrl = twitterUrl ? getAssetPath(twitterUrl) : undefined;

  const twitterSite = pageMeta.twitterSite;
  const twitterCreator = pageMeta.twitterCreator;

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
    metadata.openGraph = {};
    if (ogTitle) metadata.openGraph.title = ogTitle;
    if (ogDescription) metadata.openGraph.description = ogDescription;
    if (canonical) metadata.openGraph.url = canonical;
    if (ogSiteName) metadata.openGraph.siteName = ogSiteName;
    if (ogType) metadata.openGraph.type = ogType;
    if (ogImageUrl) {
      metadata.openGraph.images = [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          ...(ogImageAlt ? { alt: ogImageAlt } : {}),
        },
      ];
    }
  }

  if (twitterTitle || twitterDescription || twitterImageUrl || twitterSite || twitterCreator || twitterCard) {
    metadata.twitter = {};
    if (twitterCard) metadata.twitter.card = twitterCard;
    if (twitterTitle) metadata.twitter.title = twitterTitle;
    if (twitterDescription) metadata.twitter.description = twitterDescription;
    if (twitterSite) metadata.twitter.site = twitterSite;
    if (twitterCreator) metadata.twitter.creator = twitterCreator;
    if (twitterImageUrl) metadata.twitter.images = [twitterImageUrl];
  }

  if (publisherUrl) {
    metadata.other = {
      publisher: publisherUrl,
    };
  }

  return metadata;
}
