import { API_BASE_URL, getFetchCacheOptions } from "@/config";
import { getAssetPath } from "@/lib/utils";

const SITE_NAME = "SODE";
const SITE_URL = "https://sode.co.in";

const DEFAULT_META = {
  title: "SODE | Certifications & Online Degree Courses from IITs, IIMs | DBA & MBA",
  description:
    "Certifications & Online Degree Courses from top IITs, IIMs & global universities via SODE. Enroll in our MBA, DBA & executive leadership programs.",
  keywords: "SODE, online mba, distance education, dba, iim, iit",
  canonicalUrl: `${SITE_URL}/`,
  ogTitle: "Certifications & Online Degree Courses from IITs, IIMs | DBA MBA – SODE",
  ogDescription:
    "Certifications & Online Degree Courses from top IITs, IIMs & global universities via SODE. Enroll in our MBA, DBA & executive leadership programs.",
  ogImage: getAssetPath("/assets/images/sode-homepage-og-card-image.png"),
  twitterCard: "summary_large_image",
  robots: "noindex, nofollow",
  noIndex: true,
  schemaMarkup: null,
};

export async function getPageMetaData(path = "/") {
  try {
    const res = await fetch(
      `${API_BASE_URL}pagemeta/website-read?path=${encodeURIComponent(path)}`,
      getFetchCacheOptions(300, "pagemeta")
    );

    if (!res.ok) return DEFAULT_META;

    const data = await res.json();
    if (data && data.success && data.result) {
      const item = data.result;
      const title = item.metaTitle || item.title || DEFAULT_META.title;
      const description = item.metaDescription || item.description || DEFAULT_META.description;
      const keywords = item.metaKeywords || item.keywords || DEFAULT_META.keywords;
      const ogImage =
        item.ogImage?.url ||
        item.ogImage?.path ||
        item.featuredImage?.url ||
        item.featuredImage?.path ||
        (typeof item.ogImage === "string" ? item.ogImage : null) ||
        DEFAULT_META.ogImage;

      return {
        title,
        metaTitle: title,
        description,
        metaDescription: description,
        keywords,
        metaKeywords: keywords,
        canonicalUrl: item.canonicalUrl || `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`,
        ogTitle: item.ogTitle || title || DEFAULT_META.ogTitle,
        ogDescription: item.ogDescription || description || DEFAULT_META.ogDescription,
        ogImage,
        twitterCard: item.twitterCard || DEFAULT_META.twitterCard,
        robots: item.robots || (item.noIndex ? "noindex, nofollow" : "index, follow"),
        noIndex: Boolean(item.noIndex),
        schemaMarkup: item.schemaMarkup || item.script || null,
        script: item.script || item.schemaMarkup || null,
      };
    }

    return DEFAULT_META;
  } catch (error) {
    console.warn(`Error fetching PageMeta for ${path}:`, error?.message);
    return DEFAULT_META;
  }
}
