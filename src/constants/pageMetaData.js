import { API_BASE_URL, getFetchCacheOptions } from "@/config";
import { getAssetPath } from "@/lib/utils";

export const SITE_NAME = "SODE";
export const SITE_URL = "https://sode.co.in";

export async function getPageMetaData(path = "/") {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  try {
    const res = await fetch(
      `${API_BASE_URL}pagemeta/website-read?path=${encodeURIComponent(cleanPath)}`,
      getFetchCacheOptions(300, "pagemeta")
    );

    if (!res.ok) return null;

    const data = await res.json();
    if (data && data.success && data.result) {
      const item = data.result;
      const title = item.metaTitle || item.title || "";
      const description = item.metaDescription || item.description || "";
      const keywords = item.metaKeywords || item.keywords || "";
      const rawImage =
        item.ogImage?.url ||
        item.ogImage?.path ||
        item.featuredImage?.url ||
        item.featuredImage?.path ||
        (typeof item.ogImage === "string" ? item.ogImage : null);
      const ogImage = rawImage ? getAssetPath(rawImage) : null;

      return {
        title,
        metaTitle: title,
        description,
        metaDescription: description,
        keywords,
        metaKeywords: keywords,
        canonicalUrl: item.canonicalUrl || `${SITE_URL}${cleanPath}`,
        ogTitle: item.ogTitle || title || "",
        ogDescription: item.ogDescription || description || "",
        ogImage,
        twitterCard: item.twitterCard || "summary_large_image",
        robots: item.robots || (item.noIndex ? "noindex, nofollow" : "index, follow"),
        noIndex: Boolean(item.noIndex),
        schemaMarkup: item.schemaMarkup || item.script || null,
        script: item.script || item.schemaMarkup || null,
      };
    }

    return null;
  } catch (error) {
    console.warn(`Error fetching PageMeta for ${cleanPath}:`, error?.message);
    return null;
  }
}

export function constructMetadata(pageMeta, fallback = {}) {
  const title = pageMeta?.metaTitle || pageMeta?.title || fallback.title || "";
  const description = pageMeta?.metaDescription || pageMeta?.description || fallback.description || "";
  const keywords = pageMeta?.metaKeywords || pageMeta?.keywords || fallback.keywords || "";
  const canonical = pageMeta?.canonicalUrl || fallback.canonicalUrl || fallback.canonical || `${SITE_URL}/`;
  const ogTitle = pageMeta?.ogTitle || title;
  const ogDescription = pageMeta?.ogDescription || description;
  const ogImage = pageMeta?.ogImage || fallback.ogImage || fallback.image || null;
  const robots = pageMeta?.robots || (pageMeta?.noIndex ? "noindex, nofollow" : "index, follow");

  const metadata = {
    robots,
    alternates: {
      canonical,
    },
    openGraph: {
      url: canonical,
      siteName: SITE_NAME,
      type: fallback.ogType || "website",
    },
    twitter: {
      card: pageMeta?.twitterCard || "summary_large_image",
    },
  };

  if (title) {
    metadata.title = title;
    metadata.openGraph.title = ogTitle || title;
    metadata.twitter.title = ogTitle || title;
  }

  if (description) {
    metadata.description = description;
    metadata.openGraph.description = ogDescription || description;
    metadata.twitter.description = ogDescription || description;
  }

  if (keywords) {
    metadata.keywords = keywords;
  }

  if (ogImage) {
    metadata.openGraph.images = [{ url: ogImage, width: 1200, height: 630, alt: title || SITE_NAME }];
    metadata.twitter.images = [ogImage];
  }

  return metadata;
}
