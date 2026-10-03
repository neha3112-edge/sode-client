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
        (typeof item.ogImage === "string" ? item.ogImage : null);
      const ogImage = rawImage ? (rawImage.startsWith("http") ? rawImage : getAssetPath(rawImage)) : null;
      const ogImageAlt = item.ogImage?.alt || item.ogImage?.name || title || "Distance Education School image";

      const rawTwitterImage =
        item.twitterImage?.url ||
        item.twitterImage?.path ||
        (typeof item.twitterImage === "string" ? item.twitterImage : null) ||
        rawImage;
      const twitterImage = rawTwitterImage ? (rawTwitterImage.startsWith("http") ? rawTwitterImage : getAssetPath(rawTwitterImage)) : null;

      return {
        title,
        metaTitle: title,
        description,
        metaDescription: description,
        keywords,
        metaKeywords: keywords,
        canonicalUrl: item.canonicalUrl || item.ogUrl || `${SITE_URL}${cleanPath}`,
        authorName: item.authorName || "Distance Education School",
        publisher: item.publisher || "Distance Education School",
        publisherUrl: item.publisherUrl || "https://distanceeducationschool.com/",
        ogType: item.ogType || "website",
        ogSiteName: item.ogSiteName || "Distance Education School",
        ogTitle: item.ogTitle || title || "",
        ogDescription: item.ogDescription || description || "",
        ogImage,
        ogImageAlt,
        twitterCard: item.twitterCard || "summary_large_image",
        twitterTitle: item.twitterTitle || item.ogTitle || title || "",
        twitterDescription: item.twitterDescription || item.ogDescription || description || "",
        twitterImage,
        twitterSite: item.twitterSite || "@distanceeduschl",
        twitterCreator: item.twitterCreator || "@distanceeduschl",
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
  const authorName = pageMeta?.authorName || fallback.author || "Distance Education School";
  const publisherName = pageMeta?.publisher || fallback.publisher || "Distance Education School";
  const publisherUrl = pageMeta?.publisherUrl || fallback.publisherUrl || "https://distanceeducationschool.com/";

  const ogTitle = pageMeta?.ogTitle || title;
  const ogDescription = pageMeta?.ogDescription || description;
  const ogSiteName = pageMeta?.ogSiteName || fallback.siteName || "Distance Education School";
  const ogType = pageMeta?.ogType || fallback.ogType || "website";
  const ogImage = pageMeta?.ogImage || fallback.ogImage || fallback.image || null;
  const ogImageAlt = pageMeta?.ogImageAlt || fallback.ogImageAlt || title || ogSiteName;

  const twitterCard = pageMeta?.twitterCard || "summary_large_image";
  const twitterTitle = pageMeta?.twitterTitle || ogTitle || title;
  const twitterDescription = pageMeta?.twitterDescription || ogDescription || description;
  const twitterImage = pageMeta?.twitterImage || ogImage;
  const twitterSite = pageMeta?.twitterSite || "@distanceeduschl";
  const twitterCreator = pageMeta?.twitterCreator || "@distanceeduschl";

  const robots = pageMeta?.robots || (pageMeta?.noIndex ? "noindex, nofollow" : "index, follow");

  const metadata = {
    authors: [{ name: authorName }],
    creator: authorName,
    publisher: publisherName,
    robots,
    alternates: {
      canonical,
    },
    openGraph: {
      title: ogTitle || title,
      description: ogDescription || description,
      url: canonical,
      siteName: ogSiteName,
      type: ogType,
    },
    twitter: {
      card: twitterCard,
      title: twitterTitle || title,
      description: twitterDescription || description,
      site: twitterSite,
      creator: twitterCreator,
    },
    other: {
      publisher: publisherUrl,
    },
  };

  if (title) {
    metadata.title = title;
  }

  if (description) {
    metadata.description = description;
  }

  if (keywords) {
    metadata.keywords = keywords;
  }

  if (ogImage) {
    metadata.openGraph.images = [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: ogImageAlt,
      },
    ];
  }

  if (twitterImage) {
    metadata.twitter.images = [twitterImage];
  }

  return metadata;
}
