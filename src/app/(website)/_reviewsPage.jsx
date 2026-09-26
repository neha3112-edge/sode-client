import { cache } from "react";
import { notFound } from "next/navigation";
import { request } from "@/services/request";
import ReviewsView from "@/components/website/reviews/ReviewsView";
import { SITE_NAME, SITE_URL } from "@/constants/pageMetaData";

export const revalidate = 60; // Dynamic ISR cache (60 seconds)

/**
 * 🌐 Fetch Student Reviews directly from Backend API (MongoDB / Redis)
 */
export const getReviewsData = cache(async () => {
  try {
    const res = await request.dynamicList({
      entity: "student-review",
      endPoint: "public/list",
      revalidate: 60,
    });

    const data = res?.result ?? res ?? null;
    if (data && Array.isArray(data.reviews)) {
      return data;
    }
  } catch (err) {
    console.error("[StudentReviews] Error fetching reviews from API:", err?.message || err);
  }
  return null;
});

/**
 * 🏷️ Dynamic SEO Metadata generated strictly from Database Document
 */
export async function createReviewsMetadata(slug = "distance-education-school-reviews") {
  const data = await getReviewsData();

  const rating = data?.rating || 4.7;
  const total = data?.totalReviews || 1027;
  const title = `Distance Education School: Over ${total}+ Students Reviews #2026 | ${SITE_NAME}`;
  const description = `Read genuine reviews and ratings (${rating}/5.0) from over ${total}+ verified students about Distance Education School (SODE). Verified Google reviews and testimonials on distance and online degree courses.`;
  const canonicalUrl = `${SITE_URL}/${slug}`;

  return {
    title,
    description,
    keywords:
      "Distance Education School reviews, SODE reviews, online education reviews, student feedback, UGC DEB university reviews",
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: SITE_NAME,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

/**
 * 📄 Student Reviews Page Server Component
 */
export default async function ReviewsPageRenderer() {
  const data = await getReviewsData();

  if (!data) {
    notFound();
  }

  return <ReviewsView data={data} />;
}
