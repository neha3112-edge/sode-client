import { cache } from "react";
import { request } from "@/services/request";
import { getAssetPath } from "@/lib/utils";
import UniversityClientView from "@/components/website/UniversityClientView";

export const revalidate = 900;

const getUniversityData = cache(async (slug) => {
  if (!slug) return null;
  try {
    const res = await request.dynamicRead({
      entity: "universities",
      endPoint: "v1/list",
      id: encodeURIComponent(slug),
      revalidate: 900,
    });
    return res?.result || res || null;
  } catch (err) {
    console.error(`[Server Component] Error pre-fetching university ${slug}:`, err.message);
    return null;
  }
});

export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug;

  if (!slug) {
    return {
      title: "University Details | mysode",
      description: "Explore top accredited online & distance universities.",
    };
  }

  try {
    const data = await getUniversityData(slug);

    if (!data) {
      return {
        title: "University Not Found | mysode",
        description: "The requested university page could not be found.",
      };
    }

    const uni = (data && typeof data.universityId === "object" ? data.universityId : data) || {};
    const uniName = uni.name || data.tagline || "University";
    const title = data.metaTitle || `${uniName} - Courses, Fees, Admissions & Ranking | mysode`;
    const description =
      data.metaDescription ||
      data.aboutSection?.description?.slice(0, 160) ||
      `Explore ${uniName} online & distance learning programmes, fee structure, approvals, placement opportunities, and admissions.`;
    const keywords = data.metaKeywords || `${uniName}, ${uniName} admission, ${uniName} online courses, ${uniName} fees`;
    const rawImage =
      uni.bannerImg?.url ||
      uni.bannerImg ||
      data?.heroMedia?.url ||
      data?.heroMedia ||
      uni.image?.url ||
      uni.image;
    const ogImage = rawImage ? getAssetPath(rawImage) : "https://mysode.com/og-image.jpg";
    const canonical = `https://mysode.com/universities/${data.slug || slug}`;

    return {
      title,
      description,
      keywords,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: "mysode",
        images: [
          {
            url: ogImage,
            width: 1200,
            height: 630,
            alt: uniName,
          },
        ],
        type: "website",
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [ogImage],
      },
    };
  } catch (error) {
    return {
      title: "University Details | mysode",
      description: "Explore top accredited online & distance universities.",
    };
  }
}

export default async function UniversityDetailPage({ params }) {
  const resolvedParams = await params;
  const slug = resolvedParams?.slug || "";

  const initialData = await getUniversityData(slug);

  return <UniversityClientView initialData={initialData} slug={slug} />;
}
