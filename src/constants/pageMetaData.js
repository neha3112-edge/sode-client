import { API_BASE_URL } from "@/config";
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
};

export async function getPageMetaData(path = "/") {
  try {
    const res = await fetch(
      `${API_BASE_URL}pagemeta/website-read?path=${encodeURIComponent(path)}`,
      {
        next: {
          revalidate: 300, // Revalidate cache every 5 minutes (300 seconds)
        },
      }
    );

    if (!res.ok) return DEFAULT_META;

    const data = await res.json();
    if (data && data.success && data.result) {
      const item = data.result;
      return {
        title: item.title || DEFAULT_META.title,
        description: item.description || DEFAULT_META.description,
        keywords: item.keywords || DEFAULT_META.keywords,
        canonicalUrl: item.canonicalUrl || `${SITE_URL}${path}`,
        ogTitle: item.ogTitle || item.title || DEFAULT_META.ogTitle,
        ogDescription: item.ogDescription || item.description || DEFAULT_META.ogDescription,
        ogImage: item.ogImage || DEFAULT_META.ogImage,
        twitterCard: item.twitterCard || DEFAULT_META.twitterCard,
      };
    }

    return DEFAULT_META;
  } catch (error) {
    console.warn(`Error fetching PageMeta for ${path}:`, error?.message);
    return DEFAULT_META;
  }
}
